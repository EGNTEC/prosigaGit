Ext.Loader.setConfig({
    enabled: true
});
var cellEditing = Ext.create('Ext.grid.plugin.CellEditing', {
    clicksToEdit: 3
});
//var sm = Ext.create('Ext.selection.CheckboxModel');

Ext.define('desloc.view.PlanejamentoForm', {
    //renderTo: Ext.getBody(),
    extend: 'Ext.window.Window',
    alias: 'widget.planform',
    title: 'Planejamento',
    height: 550,
    width: 990,
    //x: 2,
    //y: 1,
    autoScroll: true,
    id: 'janplan',
    //layout: 'fit',
    align: 'stretch',
    modal: true,
    //minimizable:'true',
    maximizable:'true',
    resizable: 'true',
    align: 'center',
    autoShow: true,

    requires: [
        'Ext.selection.CheckboxModel',
        'Ext.selection.CellModel',
        'Ext.util.ComponentDragger',
        'Ext.util.Region',
        'Ext.ux.TextMaskPlugin',
        'Ext.ux.grid.column.ActionButtonColumn',
        'Ext.EventManager',
        'Ext.tab.*',
        'Ext.grid.*',
        'Ext.data.*',
        'Ext.util.*',
        'Ext.state.*',
        'Ext.form.*'
    ],

    items: [{
            xtype: 'container',
            layout: 'fit',
            height: 145,
            width: 1350,
            //style: {borderColor:'#000000', borderStyle:'solid', borderWidth:'1px',backgroundColor:'#000000'},
            items: [{
                    xtype: 'form',
                    id: 'formGer',
                    //boddyPadding: 10,
                    layout: 'vbox',
                    defaults: {
                        padding: 2,
                        anchor: '100%',
                        margins: '3 0 0 0',
                        width: 750
                    },

                    items: [

                        {
                            xtype: 'combo',
                            editable: false,
                            //minChars: 1,
                            id: 'regCombo',
                            fieldLabel: 'Regional',
                            //emptyText:local,//'Selecione a Regional',
                            displayField: 'regional',
                            valueField: 'numloc',
                            store: Ext.create('desloc.store.Regs'),
                            triggerAction: 'all',
                            totalProperty: 'total',
                            mode: 'local',
                            listeners: {
                                select: {
                                    fn: function(combo, value) {

                                        var comboUnid = Ext.getCmp('uniCombo');
                                        comboUnid.setDisabled(true);
                                        comboUnid.setValue('');
                                        comboUnid.store.removeAll();

                                        comboUnid.store.load({
                                            params: { regId: combo.getValue() }
                                        });
                                        comboUnid.setDisabled(false);
                                    }
                                }
                            }
                        },
                        {
                            xtype: 'combo',
                            editable: false,
                            id: 'uniCombo',
                            fieldLabel: 'Unidade',
                            emptyText: 'Selecione a Unidade',
                            displayField: 'nomloc',
                            valueField: 'numloc',
                            store: Ext.create('desloc.store.Unids'),
                            triggerAction: 'all',
                            mode: 'local',
                            //lastQuery:'',
                            disabled: true,
                            listeners: {
                                select: {
                                    fn: function(combo, value) {

                                        var comboUso = Ext.getCmp('usuCombo');
                                        comboUso.setDisabled(true);
                                        comboUso.setValue('');
                                        comboUso.store.removeAll();

                                        comboUso.store.load({
                                            params: { uniId: combo.getValue() }
                                        });
                                        comboUso.setDisabled(false);
                                    }
                                }
                            }

                        },
                        {
                            xtype: 'combo',
                            id: 'usuCombo',
                            fieldLabel: 'Colaborador',
                            emptyText: 'Selecione um Colaborador',
                            store: Ext.create('desloc.store.Usos'),
                            displayField: 'nomfun',
                            valueField: 'numcad',
                            triggerAction: 'all',
                            editable: false,
                            mode: 'local',
                            disabled: true,
                            lastQuery: '',
                            listeners: {

                                change: function() {

                                    if (bt == 1) {

                                        //console.log('cadastro');

                                        Ext.getCmp('btn_nov').setDisabled(true);

                                    } else {

                                        //console.log('gerencia');

                                    }
                                }
                            }
                        },
                        {
                            xtype: 'combo',
                            id: 'statusCombo',
                            fieldLabel: 'Situação',
                            emptyText: 'Selecione uma Situação',
                            store: Ext.create('desloc.store.SituacaoS'),
                            displayField: 'dessts',
                            valueField: 'numsts',
                            triggerAction: 'all',
                            editable: false,
                            mode: 'local',
                            //disabled:true,
                            lastQuery: ''
                        },
                        {
                            xtype: 'combo',
                            id: 'mesCombo',
                            //width:280,
                            fieldLabel: 'Referência',
                            emptyText: 'Mês',
                            store: Ext.create('desloc.store.MesS'),
                            displayField: 'name',
                            valueField: 'value',
                            triggerAction: 'all',
                            editable: false,
                            mode: 'local',
                            //disabled:true,
                            lastQuery: ''
                        },
                        {
                            xtype: 'combo',
                            id: 'anoCombo',
                            //width:180,
                            //fieldLabel:'Ano',
                            emptyText: 'Ano',
                            store: Ext.create('desloc.store.AnoS'),
                            displayField: 'name',
                            valueField: 'value',
                            triggerAction: 'all',
                            editable: false,
                            mode: 'local',
                            /*style:{
                               margin:'-36 0 0 310'
                             },*/
                            //disabled:true,
                            lastQuery: ''
                        },
                        {
                            xtype: 'combo',
                            editable: false,
                            id: 'gambCombo',
                            tabIndex: -1,
                            hidden: false
                        }

                        /*{
                          xtype: 'datefield',
                          //anchor: '100%',
                          editable:false,
                          width:250,
                          fieldLabel: 'Data inicial',
                          name:'data_ini',
                          id:'data_ini'
                          //maxValue: new Date()  // limited to the current date or prior
                        },
                        {
                          xtype: 'datefield',
                          //anchor: '100%',
                          editable:false,
                          width:250,
                          fieldLabel: 'Data final',
                          name: 'data_fim',
                          id:'data_fim'
                        }*/
                        /*{
                         xtype:'combo',
                         id:'mesCombo',
                         fieldLabel:'Periodo',
                         emptyText:'Selecione um Periodo',
                         store: Ext.create('desloc.store.PeriodoS'),
                         displayField:'name',
                         valueField:'value',
                         triggerAction:'all',
                         editable: false,
                         mode:'local',
                         //disabled:true,
                         lastQuery:''
                        }*/
                    ]
                }
            ]
        },
        {
            xtype: 'grid',
            id: 'gridplan',
            height: 600,
            selModel: {
                selType: 'checkboxmodel',
                mode: 'MULTI'
            }, //sm,
            layout: 'fit',
            store: Ext.create('desloc.store.InsAbrPlanS'),
            features: [{
                ftype: 'summary'
            }],
            //autoScroll:true,
            columns: [{
                    xtype: 'actionbuttoncolumn',
                    menuDisabled: true,
                    width: 36,
                    items: [{
                        iconCls: 'icon-edit'
                            //tooltip: 'Sell stock',
                            //action: 'sell'
                    }],
                    listeners: {
                        click: function() {
                            //chamar tela de cadastro de planejamento
                            var sPanelGridPlan = Ext.getCmp('gridplan');
                            var selectedRecords = sPanelGridPlan.getSelectionModel().getSelection();
                            var gStore = sPanelGridPlan.getStore();

                            vSeqpla = selectedRecords[0].get("numseq");
                            vNumcad = selectedRecords[0].get("numcad");
                            vdata = selectedRecords[0].get("datpla");
                            pTiptrp = selectedRecords[0].get("tiptrp");
                            vstspla = selectedRecords[0].get("stspla");
                            var usuFilt = Ext.getCmp('usuCombo').getValue();


                            Ext.Ajax.request({
                                url: '/php/Planejamento/CriarPlan.php',
                                params: {
                                    action: 'post',
                                    numseq: vSeqpla,
                                    numcad: vNumcad,
                                    datpla: vdata
                                },
                                success: function(response) {
                                    var result = Ext.JSON.decode(response.responseText);
                                    //console.log(result);
                                    if (result == 0) {

                                        if (btn == 0) {
                                            gStore.load({
                                                params: {
                                                    btn: 0
                                                }
                                            });
                                        }

                                    } else {
                                        gStore.load();
                                    }
                                    /*gStore.load({
                                             params:{
                                               mat: usuFilt
                                             }
                                        });
                                     }*/
                                },
                                failure: function() {
                                    //Ext.Msg.alert('Mensagem', 'Problemas na base!');
                                    gStore.load();
                                }
                            });

                            if (pTiptrp == 1) {

                                if ((niv == 3 || niv == 2 || niv == 1) && bt == 0) {
                                    Ext.create('desloc.view.CadPlanejamentoMotCoord'); //para coordenadores(Proprio)

                                    //Maximizar Janela
                                      Ext.getCmp('cadplancoord').maximize();

                                } else {
                                  if(vstspla > 0){
                                   Ext.create('desloc.view.CadPlanejamentoNoEdit');//cadastro para Proprio
                                   
                                   //Maximizar Janela
                                     Ext.getCmp('cadplanedit').maximize();

                                 }else{
                                   Ext.create('desloc.view.CadPlanejamento');//cadastro para Proprio
                                   
                                   //Maximizar Janela
                                      Ext.getCmp('cadplan').maximize(); 

                                 }
                              }
                            } else
                            if (pTiptrp == 2) {

                                if ((niv == 3 || niv == 2 || niv == 1) && bt == 0) {

                                    Ext.create('desloc.view.CadPlanejamentoColCoord'); //para coordenadores(coletivo)
                                    
                                    //Maximizar Janela
                                      Ext.getCmp('cadplancoleC').maximize();

                                } else {

                                  if(vstspla > 0){

                                    Ext.create('desloc.view.CadPlanejamentoColNoEdit');

                                    //Maximizar Janela
                                      Ext.getCmp('cadplancoleEd').maximize();

                                 }else{

                                    Ext.create('desloc.view.CadPlanejamentoCol');

                                    //Maximizar Janela
                                      Ext.getCmp('cadplancole').maximize();
                                 }
                             }
                          }
                            //Ext.create('desloc.view.testeGrid');
                       }
                    }
                },
                {
                    header: 'Referência',
                    dataIndex: 'datpla',
                    width: 90,
                    id: 'datpla',
                    menuDisabled: true,
                    name: 'datpla',
                    summaryRenderer: function() {
                        return 'Total:'
                    }
                },
                {
                    header: 'Matricula',
                    dataIndex: 'numcad',
                    width: 80,
                    menuDisabled: true,
                    hidden: false
                },
                {
                    header: 'Nome',
                    dataIndex: 'nomfun',
                    //flex:1,
                    width: 258,
                    menuDisabled: true,
                    summaryType: 'count'
                },
                {
                    header: 'Cargo',
                    width: 180,
                    dataIndex: 'cargo',
                    menuDisabled: true
                },
                {
                    header: 'Transporte',
                    dataIndex: 'destrp',
                    width: 90,
                    menuDisabled: true
                },
                /*{ header: 'Km / Passagens',
                  width: 120,
                  dataIndex: 'qtdkm',
                  menuDisabled:true
                },*/
                /*{ header: 'Clientes',
                  dataIndex: 'qtdcli',
                  menuDisabled:true
                },*/
                {
                    header: 'Valor',
                    dataIndex: 'vlrpla',
                    menuDisabled: true,
                    summaryType: 'sum',
                    renderer: function(val) {
                        var metodo = Ext.util.Format.maskRenderer('R$ #9.999.990,00', true);

                        if (val.length > 1) {

                            metodo = Ext.util.Format.maskRenderer('R$ #9.999.990,00', true);
                        }

                        return metodo(val);
                    }
                },
                {
                    header: 'Situação',
                    dataIndex: 'dessts',
                    menuDisabled: true
                },
                {
                    header: 'Id Abertura',
                    dataIndex: 'numseq',
                    menuDisabled: true,
                    hidden: true
                },
                {
                    header: 'Id Transporte',
                    dataIndex: 'tiptrp',
                    menuDisabled: true,
                    hidden: true
                },
                {
                    header: 'Valor KM',
                    dataIndex: 'vlrtrp',
                    menuDisabled: true,
                    hidden: true
                },
                {
                    header: 'Id Situação',
                    dataIndex: 'stspla',
                    menuDisabled: true,
                    hidden: true
                },
                {
                    header: 'data',
                    dataIndex: 'data',
                    menuDisabled: true,
                    hidden: true
                },
                {
                    header: 'Local',
                    width: 380,
                    dataIndex: 'nomloc',
                    menuDisabled: true,
                    hidden: false
                }

            ],
            plugins: [cellEditing],
            listeners: {

                itemClick: function(grid, record, item, index, e, eOpts) {

                        var sPanelGridPlan = Ext.getCmp('gridplan');
                        var sStore = sPanelGridPlan.getStore();
                        var selectedRecords = sPanelGridPlan.getSelectionModel().getSelection();
                        var Vstspla = selectedRecords[0].get("stspla");
                        var comboSts = Ext.getCmp('statusCombo');
                        var situacao = comboSts.getValue();
                        
                }                    
            }
        }

    ],

    //
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'bottom',
        items: [{
                xtype: 'button',
                id: 'btn_nov',
                text: 'Novo',
                iconCls: 'icon-novo',
                listeners: {

                    click: function() {
                        var btnBusc = Ext.getCmp('btn_nov');
                        var colComb = Ext.getCmp('usuCombo').getValue();

                        if ((colComb === null) && (codcargo == 6600 || codcargo == 7500)) {
                            if (codcargo == 6600) {
                                Ext.Msg.alert('Mensagem', 'Não é possível abrir planejamento para o cargo: Administrativo da Unidade.');
                            } else
                            if (codcargo == 7500) {

                                Ext.Msg.alert('Mensagem', 'Não é possível abrir planejamento para o cargo:  Administrativo da Regional.');
                            }

                        } else {
                            btnBusc.setDisabled(true);
                            //Ext.create('desloc.view.AbrPlanejamento');
                            Ext.Ajax.request({
                               url: '/php/Planejamento/ValNov.php',
                               params: {
                                 mat: colComb
                               },
                               success: function(response) {

                               var result = Ext.JSON.decode(response.responseText);
                                //console.log(result);
                                  if (result == 1) {
                                     Ext.create('desloc.view.AbrPlanejamento');
                                  } else {
                                     Ext.Msg.alert('Mensagem','Não é possível cadastrar um planejamento para o período afastamento/férias.');
                                  }
                               },
                               failure: function() {
                                  //Ext.Msg.alert('Mensagem','Problema Na Base de Dados!');
                                }
                            });
                        }//Fim do else
                    }
                }

            },
            /*{
              xtype:'button',
              id:'btn_aut',//btn_valid
              text: 'Autorizar', //trocar a descrição do botão validar para autorizar
              iconCls:'icon-validar',
              handler:function(){

                 var pGrid  = Ext.getCmp('gridplan');
                 var sStore = pGrid.getStore();
                 var selectedRecords = pGrid.getSelectionModel().getSelection();
                 var vSituacao = selectedRecords[0].get("dessts");
                 var vIdAbrt = selectedRecords[0].get("numseq");
                 var comboSts = Ext.getCmp('statusCombo');

                 if (selectedRecords.length){
                    sStore.remove(selectedRecords);
                    Ext.apply(sStore.getProxy().extraParams, {
                        btnRbr: 0,

                    });
                    sStore.sync({

                    success: function (conn, response, options, eOpts){
                        var result = Ext.JSON.decode(conn.responseText, true);

                        if (!result){ // caso seja null
                             result = {};
                             result.success = true;
                        }

                        if(result.success){

                             Ext.Msg.alert('Msg','Registro Alterado com Sucesso!',function(btn,text){

                         if(btn=="ok"){

                             sStore.load({

                                params:{
                                    sts:  comboSts.getValue()
                                  }

                             });

                             Ext.getCmp('btn_aut').setDisabled(false);
                             Ext.getCmp('btn_reab').setDisabled(false);
                            }

                         });
                        }else{
                           Ext.Msg.alert('Msg','Erro ao alterar,situações diferentes!');
                           pGrid.getSelectionModel().deselectAll();
                           sStore.load({

                                params:{
                                    sts:  comboSts.getValue()
                                  }

                             });
                        }
                    },
                    failure: function () {

                        Ext.Msg.alert('Msg', 'Problema na base de Dados, consultar UPDATE!.');
                        sStore.load({

                          params:{
                            sts: comboSts.getValue()
                          }

                        });
                     }

                   });
                }

              }

            },*/
            {
                xtype: 'button',
                id: 'btn_val', //btn_autori
                text: 'Validar', //alterar o texto do botão autorizar para validar
                iconCls: 'icon-autorizar',
                handler: function() {

                    var pGrid = Ext.getCmp('gridplan');
                    var sStore = pGrid.getStore();
                    var selectedRecords = pGrid.getSelectionModel().getSelection();
                    var vSituacao = selectedRecords[0].get("dessts");
                    var vIdAbrt = selectedRecords[0].get("numseq");
                    var comboSts = Ext.getCmp('statusCombo');

                    if (selectedRecords.length) {
                        sStore.remove(selectedRecords);
                        Ext.apply(sStore.getProxy().extraParams, {
                            btnRbr: 0
                        });
                        sStore.sync({

                            success: function(conn, response, options, eOpts) {
                                var result = Ext.JSON.decode(conn.responseText, true);

                                if (!result) { // caso seja null
                                    result = {};
                                    result.success = true;
                                }

                                if (result.success) {

                                    Ext.Msg.alert('Mensagem', 'Planejamento validado com sucesso.', function(btn, text) {

                                        if (btn == "ok") {

                                            sStore.load({

                                                params: {
                                                    sts: comboSts.getValue()
                                                }

                                            });

                                            Ext.getCmp('btn_val').setDisabled(false);
                                            Ext.getCmp('btn_reab').setDisabled(false);
                                        }
                                    });
                                } else {
                                    Ext.Msg.alert('Mensagem', 'Erro ao validar planejamento.');
                                    pGrid.getSelectionModel().deselectAll();
                                    sStore.load({
                                        params: {
                                            sts: comboSts.getValue()
                                        }
                                    });
                                }
                            },
                            failure: function() {

                                Ext.Msg.alert('Mensagem', 'Problema na base de Dados, consultar o administrador.');
                                sStore.load({
                                    params: {
                                        sts: comboSts.getValue()
                                    }
                                });
                            }

                        });
                    }

                }
            },
            {
                xtype: 'button',
                id: 'btn_reab',
                text: 'Reabrir',
                iconCls: 'icon-reabrir',
                handler: function() {

                    var pGrid = Ext.getCmp('gridplan');
                    var sStore = pGrid.getStore();
                    var selectedRecords = pGrid.getSelectionModel().getSelection();
                    var vSituacao = selectedRecords[0].get("dessts");
                    var vIdAbrt = selectedRecords[0].get("numseq");
                    var comboSts = Ext.getCmp('statusCombo');


                    if (selectedRecords.length) {
                        sStore.remove(selectedRecords);
                        Ext.apply(sStore.getProxy().extraParams, {
                            btnRbr: 1,

                        });
                        sStore.sync({

                            success: function(conn, response, options, eOpts) {
                                var result = Ext.JSON.decode(conn.responseText, true);

                                if (!result) { // caso seja null
                                    result = {};
                                    result.success = true;
                                }

                                if (result.success) {

                                    Ext.Msg.alert('Mensagem', 'Planejamento reaberto com sucesso.', function(btn, text) {

                                        if (btn == "ok") {

                                            //comboSts.setValue("Todos");
                                            sStore.load({
                                                params: {
                                                    sts: comboSts.getValue()
                                                }
                                            });
                                        }

                                    });
                                } else {
                                    Ext.Msg.alert('Mensagem', 'Erro ao reabrir planejamento.');
                                    pGrid.getSelectionModel().deselectAll();
                                    sStore.load({
                                        params: {
                                            sts: comboSts.getValue()
                                        }
                                    });
                                }
                            },
                            failure: function() {

                                Ext.Msg.alert('Mensagem', 'Problema na base de Dados, consultar administrador.');
                                sStore.load();
                            }

                        });
                    }
                }
            },
            {
                xtype: 'button',
                text: 'Buscar',
                tooltip: 'Localizar Planejamentos',
                id: 'btn_busc',
                iconCls: 'icon-buscar',
                handler: function() {
                    var pGrid = Ext.getCmp('gridplan');
                    var selectedRecords = pGrid.getSelectionModel().getSelection();
                    var comboUso = Ext.getCmp('usuCombo');
                    var comboUnid = Ext.getCmp('uniCombo');
                    var comboReg = Ext.getCmp('regCombo');
                    var comboSts = Ext.getCmp('statusCombo');
                    var comboStatus = comboSts.getValue();
                    var comboMes = Ext.getCmp('mesCombo').getValue();
                    var comboAno = Ext.getCmp('anoCombo').getValue();

                    var cboUso = comboUso.getValue();
                    var cboUnid = comboUnid.getValue();
                    var cboReg = comboReg.getValue();

                    //tratamento data
                    dtHj = new Date();
                    mesHj = dtHj.getMonth();

                    var aStore = pGrid.getStore();
                    aStore.load({
                        params: {
                            mat: comboUso.getValue(),
                            unid: comboUnid.getValue(),
                            reg: comboReg.getValue(),
                            sts: comboStatus,
                            mes: comboMes,
                            ano: comboAno,
                            botao: bt
                        }
                    });

                    if (niv != 4) {

                        Ext.Ajax.request({
                            url: '/php/Planejamento/HabBtnNov.php',
                            method: 'get',
                            params: {
                                mat: comboUso.getValue()
                            },
                            success: function(response) {

                                var result = Ext.JSON.decode(response.responseText);
                                //console.log(result);
                                if (result == 1) {

                                    //Ext.Msg.alert('Msg','Existem Planejamentos em Andamento!');
                                    /*if(niv==4 && (comboStatus==null || comboStatus=="")){
                                      Ext.getCmp('btn_encplan').setDisabled(false);
                                     sStore.load();
                                    }*/
                                    //Ext.getCmp('btn_nov').setDisabled(true);
                                    Ext.getCmp('btn_nov').setDisabled(false);
                                    //sStore.load();
                                } else {

                                    //Ext.getCmp('btn_nov').show();
                                    //Ext.getCmp('btn_nov').setDisabled(false);
                                    Ext.getCmp('btn_nov').setDisabled(true);
                                }

                            },
                            failure: function() {

                                //Ext.Msg.alert('Msg','Problema Na Base de Dados!');
                            }
                        });
                    }

                    switch (comboStatus) {

                        case 0:

                            Ext.getCmp('btn_val').setDisabled(true);
                            Ext.getCmp('btn_reab').setDisabled(true);

                            break;

                        case 1:

                            Ext.getCmp('btn_val').setDisabled(true);
                            Ext.getCmp('btn_reab').setDisabled(true);
                            

                            break;

                        case 2:
                             if( (codcargo == 7500 || codcargo == 7300 || codcargo == 6500) || niv == 1) {
                                Ext.getCmp('btn_val').setDisabled(false);
                                Ext.getCmp('btn_reab').setDisabled(false);
                            } else {
                                Ext.getCmp('btn_val').setDisabled(true);
                                Ext.getCmp('btn_reab').setDisabled(true);
                            }

                            break;
                        case 3:

                            //Ext.getCmp('btn_txt').setDisabled(false);
                            //Ext.getCmp('btn_encplan').setDisabled(true);
                            //Ext.getCmp('btn_aut').setDisabled(true);
                            Ext.getCmp('btn_val').setDisabled(true);
                            Ext.getCmp('btn_reab').setDisabled(true);

                            /*if((cboReg==null || cboReg=="") ||
                              (cboUnid==null || cboUnid=="") || (cboUso==null || cboUso==""))
                            {
                              Ext.getCmp('btn_prestacao').setDisabled(true);

                             }else{
                              Ext.getCmp('btn_reab').setDisabled(false);
                              Ext.getCmp('btn_prestacao').setDisabled(false);

                             }*/
                            break;

                        default:

                            //Ext.getCmp('btn_encplan').setDisabled(true);
                            //Ext.getCmp('btn_aut').setDisabled(true);
                            Ext.getCmp('btn_val').setDisabled(true);
                            Ext.getCmp('btn_reab').setDisabled(true);

                            break;
                    }

                }

            },
            /*{

                        xtype:'button',
                        text: 'Abrir Prestação',
                        id:'btn_prestacao',
                        iconCls:'icon-prestacao',
                        handler:function(){ //inicio função click

                          var gGrid  = Ext.getCmp('gridplan');
                          var gStore = gGrid.getStore();
                          var selectedRecords = gGrid.getSelectionModel().getSelection();
                          var comboSts = Ext.getCmp('statusCombo');
                          var comboStatus = comboSts.getValue();
                          var vSeqpla = selectedRecords[0].get("numseq");
                          var vTiptrp = selectedRecords[0].get("tiptrp");
                          var vNumcad = selectedRecords[0].get("numcad");

                          Ext.Ajax.request({
                               url :'/php/Prestacao/HabPrest.php',
                               //action: 'post',
                               params : {
                                  numcad:vNumcad,
                                  numseq:vSeqpla,
                                  tiptrp:vTiptrp

                                },
                                success: function (conn, response, options, eOpts){
                                 var result = Ext.JSON.decode(conn.responseText, true);
                                         //console.log(result);
                                 if (!result){ // caso seja null
                                      result = {};
                                      result.success = true;
                                 }

                                 if(result.success){
                                     Ext.Msg.alert('Msg','Prestação de contas aberta com sucesso!');
                                         gStore.load({

                                            params:{
                                                sts:  comboSts.getValue()
                                              }

                                            });
                                          }
                                          else{
                                           Ext.Msg.alert('Msg','Já existe prestação de contas aberta para este planejamento!');
                                             gStore.load({

                                               params:{
                                                sts:  comboSts.getValue()
                                              }
                                         });
                                     }
                                },
                                failure: function(){

                                 Ext.Msg.alert('Msg', 'Já existe prestação de contas aberta para este planejamento!');
                            }

                          });


                         }//fim função click
                     },*/
            /*{

                        xtype:'button',
                        text: 'Arquivo de Importação',
                        id:'btn_txt',
                        iconCls:'icon-importar',
                        handler:function(){ //inicio função click

                          var gGrid  = Ext.getCmp('gridplan');
                          var selectedRecords = gGrid.getSelectionModel().getSelection();
                          var gStore = gGrid.getStore();
                          var comboSts = Ext.getCmp('statusCombo');
                          var comboStatus = comboSts.getValue();

                          if (selectedRecords.length){
                                gStore.remove(selectedRecords);
                                Ext.apply(gStore.getProxy().extraParams,{
                                    btnRbr: 2,

                                });
                                gStore.sync({

                                success: function (conn, response, options, eOpts){
                                    var result = Ext.JSON.decode(conn.responseText, true);

                                    if (!result){ // caso seja null
                                         result = {};
                                         result.success = true;
                                    }

                                    if(result.success){

                                         Ext.Msg.alert('Msg','Arquivo gerado, verifique a pasta!');
                                         gStore.load({

                                            params:{
                                                sts:  comboSts.getValue()
                                              }

                                         });

                                    }else{
                                       Ext.Msg.alert('Msg','Erro ao gerar arquivo!');
                                       gStore.load({

                                            params:{
                                                sts:  comboSts.getValue()
                                              }

                                         });

                                    }
                                },
                                failure: function () {

                                    Ext.Msg.alert('Msg', 'Problema na base de Dados, ao gerar arquivo!.');

                                }

                               });
                            }

                          }//fim função click
                       },*/
            {
                xtype: 'button',
                id: 'btn_filtro',
                text: 'Limpar Filtros',
                iconCls: 'icon-filtro',
                listeners: {
                    click: function() {

                        var Combreg = Ext.getCmp('regCombo');
                        var Combunid = Ext.getCmp('uniCombo');
                        var Combusu = Ext.getCmp('usuCombo');
                        var Combsts = Ext.getCmp('statusCombo');
                        var CombMes = Ext.getCmp('mesCombo');
                        var CombAno = Ext.getCmp('anoCombo');

                        Combreg.reset();
                        Combunid.reset();
                        Combsts.reset();
                        CombMes.reset();
                        CombAno.reset();
                        Combusu.setValue('');
                        Combusu.store.load({
                            params: { uniId: codund } //0
                        });
                        //Combusu.reset();
                    }
                }
            },
            {
                xtype: 'button',
                id: 'btn_excel',
                text: 'Exportar',
                iconCls: 'icon-excel',
                hrefTarget: "_blank",
                href: 'https://novoprossiga.inec.org.br/php/Planejamento/gerExcel.php',
                listeners: {
                    click: function() {

                        var comboUso = Ext.getCmp('usuCombo');
                        var comboUnid = Ext.getCmp('uniCombo');
                        var comboReg = Ext.getCmp('regCombo');
                        var comboSts = Ext.getCmp('statusCombo');
                        var comboStatus = comboSts.getValue();
                        var comboMes = Ext.getCmp('mesCombo').getValue();
                        var comboAno = Ext.getCmp('anoCombo').getValue();

                        var cboUso = comboUso.getValue();
                        var cboUnid = comboUnid.getValue();
                        var cboReg = comboReg.getValue();

                        var btnEx = Ext.getCmp('btn_excel');

                        btnEx.setParams({

                            mat: comboUso.getValue(),
                            unid: comboUnid.getValue(),
                            reg: comboReg.getValue(),
                            sts: comboStatus,
                            mes: comboMes,
                            ano: comboAno,
                            codreg: codreg, //codigo regional session
                            codund: codund, //codigo unidade session
                            codniv: niv, //codigo nivel   session
                            matricula: mat, //codigo matricula session
                            colaborador: col //codigo nome ssession
                        });
                    }
                }
            },
            {
                xtype: 'button',
                id: 'btSair',
                text: 'Sair',
                iconCls: 'icon-sair',
                style: {

                    //margin: '0 0 0 980'
                },
                listeners: {
                    click: function() {

                        //Ext.getCmp('gridplan').getSelectionModel().deselectAll();
                        var gridsld = Ext.getCmp('histsld');
                        var aStore = gridsld.getStore();
                        aStore.load();

                        var gridsit = Ext.getCmp('gsit');
                        var bStore = gridsit.getStore();
                        bStore.load();

                        Ext.getCmp('janplan').close();

                        var gridsubord = Ext.getCmp('gridsubord');
                        var cStore = gridsubord.getStore();
                        cStore.load();
                    }
                }
            }
        ]
    }],
    listeners: {
        beforerender: function(){


        },
        beforeclose: function() {

            var gridsld = Ext.getCmp('histsld');
            var aStore = gridsld.getStore();
            aStore.load();

            var gridsit = Ext.getCmp('gsit');
            var bStore = gridsit.getStore();
            bStore.load();

            var gridsubord = Ext.getCmp('gridsubord');
            var cStore = gridsubord.getStore();
            cStore.load();

        },
        minimize: function (window, opts) {
                window.collapse();
                window.setWidth(160);
                window.alignTo(Ext.getBody(), 'bl-bl')
        }

    }/*,
    tools: [{
            type: 'restore',
            handler: function (evt, toolEl, owner, tool) {
                var window = owner.up('window');
                window.setWidth(1360);
                window.setHeight(650);
                window.setX(2);
                window.setY(1);
                window.expand('', true);
                //window.center();
            }
        }]*/
});
