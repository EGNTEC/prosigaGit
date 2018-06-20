Ext.Loader.setConfig({
    enabled: true
});
var cellEditing = Ext.create('Ext.grid.plugin.CellEditing', {
    clicksToEdit: 3
});
var sm = Ext.create('Ext.selection.CheckboxModel');

Ext.define('desloc.view.PrestacaoForm', {
    //renderTo: Ext.getBody(),
    extend: 'Ext.window.Window',
    alias: 'widget.presform',
    title: 'Prestação',
    height: 550,//580,
    width: 990,//1240,
    //x: 2,//5,
    //y: 1,//7,
    autoScroll: true,
    id: 'janpres',
    //layout: 'fit',
    align: 'stretch',
    modal: true,
    resizable: 'true',
    //minimizable:'true',
    maximizable:'true',
    align: 'center',
    autoShow: true,

    requires: [
        'Ext.selection.CheckboxModel',
        'Ext.ux.TextMaskPlugin',
        'Ext.ux.grid.column.ActionButtonColumn',
        'Ext.selection.CellModel',
        'Ext.util.ComponentDragger',
        'Ext.util.Region',
        'Ext.EventManager',
        'Ext.tab.Panel',
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
            autoScroll: false,
            //style: {borderColor:'#000000', borderStyle:'solid', borderWidth:'1px',backgroundColor:'#000000'},
            items: [{
                xtype: 'form',
                //backgroundColor:"#000000",
                //boddyPadding: 10,
                layout: 'vbox',
                defaults: {
                    padding: 2,
                    anchor: '100%',
                    margins: '3 0 0 0',
                    width: 950
                },

                items: [

                    {
                        xtype: 'combo',
                        editable: false,
                        id: 'regCombo',
                        fieldLabel: 'Regional',
                        //emptyText:local,//'Selecione a Regional',
                        displayField: 'regional',
                        valueField: 'numloc',
                        store: Ext.create('desloc.store.Regs'),
                        triggerAction: 'all',
                        totalProperty: 'total',
                        mode: 'local',
                        listeners:{
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
                        lastQuery: ''
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
                        mode: 'local',
                        editable: false,
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
                        selectOnTab:false,
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
                        hidden: false,
                        tabIndex: -1,
                        style: {
                            margin: '136 0 0 0'
                        }
                    }
                ]
            }]
        },
        {
            xtype: 'grid',
            id: 'gridpre',
            height: 400,
            width: 1410,
            //selModel: sm,
            selModel: {
                selType: 'checkboxmodel',
                mode: 'MULTI'
            },
            layout: 'fit',
            store: Ext.create('desloc.store.InsAbrPreS'),
            features: [{
                ftype: 'summary'
            }],
            //autoScroll:false,
            columns: [{
                    xtype: 'actionbuttoncolumn',
                    id: 'actbtnpre',
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
                            var sPanelGridPre = Ext.getCmp('gridpre');
                            var selectedRecords = sPanelGridPre.getSelectionModel().getSelection();
                            var wStore = sPanelGridPre.getStore();

                            vValtrp = selectedRecords[0].get("vlrtrp");
                            rTiptrp = selectedRecords[0].get("tiptrp");
                            vSeqpla = selectedRecords[0].get("numseq");
                            vTiptrp = selectedRecords[0].get("tiptrp");
                            vNumcad = selectedRecords[0].get("numcad");
                            vStspr = selectedRecords[0].get("stspre");
                            vNomfun = selectedRecords[0].get("nomfun");
                            vMesRef = selectedRecords[0].get("mesref");
                            vDatpla = selectedRecords[0].get("mesref");
                            vDestrp = selectedRecords[0].get("destrp");
                            vjuspre = selectedRecords[0].get("juspre");
                            vNomloc = selectedRecords[0].get("nomloc");
                            vDtfim = selectedRecords[0].get("dtfim");

                            dateParm = Ext.Date.parse(vDtfim, "d/m/Y");
                            dateH    = mes+'/'+dia+'/'+ano;
                            dateHoje    = new Date(dateH);

                            //alert(dateHoje);//Tue May 09 2017 00:00:00 GMT-0300 (BRT)
                            //alert(dateParm);//Mon May 08 2017 00:00:00 GMT-0300 (BRT)

                            //Tratamento para verificar se a prestação está na data limite de prestação

                            if (dateHoje > dateParm && vStspr!=4) {

                                Ext.Msg.alert('Mensagem', 'A data limite da prestação de contas foi ultrapassada.', function(btn, text) {

                                    //Chamar a tela de cadastro de prestação
                                    if ((niv == 3 || niv == 2 || niv == 1) && bt == 0) { //Chama a gerência

                                        Ext.create('desloc.view.CadPrestacaoNovGer');
                                         
                                        //Maximizar Janela
                                        Ext.getCmp('cadprNovGer').maximize();

                                    } else {

                                        Ext.create('desloc.view.CadPrestacaoNov');
                                        
                                        //Maximizar Janela
                                        Ext.getCmp('cadprNov').maximize();
                                    }

                                });
                            } else {

                                //Chamar a tela de cadastro de prestação
                                if ((niv == 3 || niv == 2 || niv == 1) && bt == 0) { //Chama a gerência

                                    Ext.create('desloc.view.CadPrestacaoNovGer');
                                    //Maximizar Janela
                                    Ext.getCmp('cadprNovGer').maximize();
                                    
                                } else {

                                    Ext.create('desloc.view.CadPrestacaoNov');
                                    //Maximizar Janela
                                    Ext.getCmp('cadprNov').maximize();
                                }
                            }
                        }
                    }
                },
                {
                    header: 'Referência',
                    dataIndex: 'mesref',
                    width: 90,
                    menuDisabled: true,
                    id: 'mesref',
                    name: 'mesref',
                    summaryRenderer: function() {
                        return 'Total:'
                    }
                },
                {
                    header: 'Data Limite',
                    dataIndex: 'dtfim',
                    width: 93,
                    menuDisabled: true,
                    id: 'dtfim',
                    name: 'dtfim'
                },
                {
                    header: 'Id Planejamento',
                    dataIndex: 'seqpla',
                    menuDisabled: true,
                    hidden: true
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
                    width: 258,
                    menuDisabled: true,
                    summaryType: 'count'
                },
                {
                    header: 'Cargo',
                    dataIndex: 'titred',
                    width: 180,
                    menuDisabled: true
                },
                {
                    header: 'Transporte',
                    dataIndex: 'destrp',
                    width: 90,
                    menuDisabled: true
                },
                /*{ header: 'KM / Passagens',
                  dataIndex: 'qtdkm',
                  width: 120,
                  menuDisabled:true
                },*/
                /*{ header: 'Clientes',
                  dataIndex: 'qtdcli',
                  menuDisabled:true
                },*/
                {
                    header: 'Valor',
                    dataIndex: 'vlrpre',
                    //renderer : vlrpre,
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
                    dataIndex: 'stspre',
                    menuDisabled: true,
                    hidden: true
                },
                {
                    header: 'Matricula',
                    dataIndex: 'numcad',
                    menuDisabled: true,
                    hidden: true
                },
                {
                    header: 'Justificativa',
                    dataIndex: 'juspre',
                    menuDisabled: true,
                    hidden: true
                },
                {
                    header: 'Local',
                    width: 310,
                    dataIndex: 'nomloc',
                    menuDisabled: true,
                    hidden: false
                }

            ],
            plugins: [cellEditing],
            listeners: {

            } //Final do listeners
        }
    ],

    //
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'bottom',
        items: [

          {
              xtype: 'button',
              id: 'btn_conc',
              text: 'Concluir', //alterar o texto do botão autorizar para validar
              iconCls: 'icon-autorizar',
              handler: function() {

                  var pGrid = Ext.getCmp('gridpre');
                  var sStore = pGrid.getStore();
                  var selectedRecords = pGrid.getSelectionModel().getSelection();
                  var vSituacao = selectedRecords[0].get("dessts");
                  var vIdAbrt = selectedRecords[0].get("numseq");
                  var comboSts = Ext.getCmp('statusCombo');

                  if (selectedRecords.length) {
                      sStore.remove(selectedRecords);
                      Ext.apply(sStore.getProxy().extraParams, {
                          btnRbr: 5,

                      });
                      sStore.sync({

                          success: function(conn, response, options, eOpts) {
                              var result = Ext.JSON.decode(conn.responseText, true);

                              if (!result) { // caso seja null
                                  result = {};
                                  result.success = true;
                              }

                              if (result.success) {

                                  Ext.Msg.alert('Mensagem', 'Prestação de contas concluída com sucesso.', function(btn, text) {

                                      if (btn == "ok") {

                                          sStore.load({

                                              params: {
                                                  sts: comboSts.getValue()
                                              }

                                          });

                                          Ext.getCmp('btn_valid').setDisabled(true);
                                          Ext.getCmp('btn_autori').setDisabled(true);
                                          Ext.getCmp('btn_reab').setDisabled(true);
                                      }
                                  });
                              } else {
                                  Ext.Msg.alert('Mensagem', 'Erro ao alterar,situações diferentes!');
                                  pGrid.getSelectionModel().deselectAll();
                                  sStore.load();
                              }
                          },
                          failure: function() {

                              //Ext.Msg.alert('Msg', 'Problema na base de Dados, consultar UPDATE!.');
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
                id: 'btn_autori',
                text: 'Validar', //alterar o texto do botão autorizar para validar
                iconCls: 'icon-autorizar',
                handler: function() {

                    var pGrid = Ext.getCmp('gridpre');
                    var sStore = pGrid.getStore();
                    var selectedRecords = pGrid.getSelectionModel().getSelection();
                    var vSituacao = selectedRecords[0].get("dessts");
                    var vIdAbrt = selectedRecords[0].get("numseq");
                    var comboUso = Ext.getCmp('usuCombo');
                    var comboUnid = Ext.getCmp('uniCombo');
                    var comboReg = Ext.getCmp('regCombo');
                    var comboSts = Ext.getCmp('statusCombo');
                    var comboStatus = comboSts.getValue();
                    var comboMes = Ext.getCmp('mesCombo').getValue();
                    var comboAno = Ext.getCmp('anoCombo').getValue();


                    if (selectedRecords.length) {
                        sStore.remove(selectedRecords);
                        Ext.apply(sStore.getProxy().extraParams, {
                            btnRbr: 2
                        });
                        sStore.sync({

                            success: function(conn, response, options, eOpts) {
                                var result = Ext.JSON.decode(conn.responseText, true);

                                if (!result) { // caso seja null
                                    result = {};
                                    result.success = true;
                                }

                                if (result.success) {

                                    Ext.Msg.alert('Mensagem', 'Prestação de contas validada com sucesso.', function(btn, text) {

                                        if (btn == "ok") {

                                            /*sStore.load({
                                                params: {
                                                   sts: comboSts.getValue()
                                                }

                                            });*///Fim do load do store

                                            if (comboStatus == 2 && niv == 2) {
                                                Ext.Ajax.request({
                                                    url: '/php/LibTeto.php',
                                                    params: {
                                                        action: 'post',
                                                        mes: comboMes,
                                                        ano: comboAno,
                                                        unid: Ext.getCmp('uniCombo').getValue(),
                                                        reg: codreg
                                                    },
                                                    success: function(response) {

                                                        var result = Ext.JSON.decode(response.responseText);

                                                        if (result > 0) {

                                                          Ext.Msg.alert('Mensagem', 'Existem prestações de contas com valores acima do limite permitido. Valide-as individualmente.', function(btn, text){

                                                                 if(btn="ok"){
                                                                   var aStore = pGrid.getStore();
                                                                   aStore.load({
                                                                       params: {
                                                                           mat: comboUso.getValue(),
                                                                           unid: comboUnid.getValue(),
                                                                           reg: comboReg.getValue(),
                                                                           sts: comboSts.getValue(),
                                                                           mes: comboMes,
                                                                           ano: comboAno,
                                                                           botao: bt,
                                                                           btconf: 99
                                                                        }
                                                                    });
                                                                 }
                                                            });

                                                        } else { //Se não obtiver valore acima do teto.

                                                          var aStore = pGrid.getStore();
                                                          aStore.load({
                                                              params: {
                                                                  mat: comboUso.getValue(),
                                                                  unid: comboUnid.getValue(),
                                                                  reg: comboReg.getValue(),
                                                                  sts: comboSts.getValue(),
                                                                  mes: comboMes,
                                                                  ano: comboAno,
                                                                  botao: bt
                                                              }
                                                          });

                                                          //Ext.getCmp('btn_autori').setDisabled(false);
                                                          //Ext.getCmp('btn_reab').setDisabled(false);
                                                        }
                                                    },
                                                    failure: function() {
                                                      //Ext.Msg.alert('Msg','Problema Na Base de Dados!');
                                                    }
                                                });//Fim do Ajax
                                              }//Fim da condição do situação do combo.

                                            //Ext.getCmp('btn_autori').setDisabled(false);
                                            //Ext.getCmp('btn_reab').setDisabled(false);
                                        }
                                    });
                                 } else {
                                    Ext.Msg.alert('Mensagem', 'Erro ao alterar,situações diferentes!');
                                    pGrid.getSelectionModel().deselectAll();
                                    sStore.load();
                                }
                            },
                            failure: function() {

                                //Ext.Msg.alert('Msg', 'Problema na base de Dados, consultar UPDATE!.');
                                sStore.load({

                                    params: {
                                        sts: comboSts.getValue()
                                    }

                                });//Fim do load do store
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

                    var pGrid = Ext.getCmp('gridpre');
                    var sStore = pGrid.getStore();
                    var selectedRecords = pGrid.getSelectionModel().getSelection();
                    var vSituacao = selectedRecords[0].get("dessts");
                    var vIdAbrt = selectedRecords[0].get("numseq");
                    var comboSts = Ext.getCmp('statusCombo');

                    if (selectedRecords.length) {
                        sStore.remove(selectedRecords);
                        Ext.apply(sStore.getProxy().extraParams, {
                            btnRbr: 3,

                        });
                        sStore.sync({
                               success: function(conn, response, options, eOpts) {
                               //success: function(conn, response, options, eOpts){

                                var result = Ext.JSON.decode(conn.responseText, true);
                                //var result = Ext.JSON.decode(response.responseText);

                                if (!result) { // caso seja null
                                    result = {};
                                    result.success = true;
                                }
                                //alert(result);
                                if (result.success) {

                                    Ext.Msg.alert('Mensagem', 'Prestação de contas reaberta com sucesso.', function(btn, text) {

                                        if (btn == "ok") {

                                            //comboSts.setValue("Todos");
                                            sStore.load({
                                                params: {
                                                    sts: comboSts.getValue()
                                                }
                                            });

                                            //Ext.getCmp('btn_encplan').setDisabled(true);
                                            Ext.getCmp('btn_valid').setDisabled(true);
                                            Ext.getCmp('btn_autori').setDisabled(true)
                                            Ext.getCmp('btn_reab').setDisabled(true);

                                        }

                                    });
                                } else {
                                    Ext.Msg.alert('Mensagem', 'Existe um processo em andamento para o colaborador.');
                                    pGrid.getSelectionModel().deselectAll();
                                    sStore.load({
                                        params: {
                                            sts: comboSts.getValue()
                                        }
                                    });
                                }
                            },
                            failure: function() {
                                 Ext.Msg.alert('Mensagem', 'Existe um processo em andamento para o colaborador.');
                                //Ext.Msg.alert('Mensagem', 'Problema na base de Dados, consultar UPDATE!.');
                                sStore.load();
                            }

                        });
                    }

                }

            },
            {
                xtype: 'button',
                text: 'Buscar',
                tooltip: 'Localizar Prestação',
                id: 'btn_busc',
                iconCls: 'icon-buscar',
                handler: function() {
                    var pGrid = Ext.getCmp('gridpre');
                    var comboUso = Ext.getCmp('usuCombo');
                    var comboUnid = Ext.getCmp('uniCombo');
                    var comboReg = Ext.getCmp('regCombo');
                    var comboSts = Ext.getCmp('statusCombo');
                    var comboStatus = comboSts.getValue();
                    var comboMes = Ext.getCmp('mesCombo').getValue();
                    var comboAno = Ext.getCmp('anoCombo').getValue();

                    //Tratamento para valores acima do teto quando existir,
                    //valores acima do teto o regional deverá validar primeiro estes.
                    //se situação for AUTORIZADO e nível de REGIONAL.
                    var confBox = Ext.MessageBox;

                    confBox.buttonText = {
                        cancel: 'cancelText',
                        no: 'Não',
                        ok: 'Ok',
                        yes: 'Sim'
                    };

                    if (comboStatus == 2 && (niv == 2 || niv == 1)) {

                        Ext.Ajax.request({

                            url: '/php/LibTeto.php',
                            params: {
                                action: 'post',
                                mes: comboMes,
                                ano: comboAno,
                                unid: Ext.getCmp('uniCombo').getValue(),
                                reg: comboReg.getValue()

                            },
                            success: function(response) {

                                var result = Ext.JSON.decode(response.responseText);

                                if (result > 0) {

                                    Ext.Msg.alert('Mensagem', 'Existem prestações de contas com valores acima do limite permitido. Valide-as individualmente.', function(btn, text){

                                         if(btn="ok"){

                                           var aStore = pGrid.getStore();
                                           aStore.load({
                                               params: {
                                                   mat: comboUso.getValue(),
                                                   unid: comboUnid.getValue(),
                                                   reg: comboReg.getValue(),
                                                   sts: comboSts.getValue(),
                                                   mes: comboMes,
                                                   ano: comboAno,
                                                   botao: bt,
                                                   btconf: 99
                                                }
                                           });

                                           Ext.getCmp('btn_autori').setDisabled(true);
                                           Ext.getCmp('btn_reab').setDisabled(true);

                                         }
                                    });

                                  } else { //Se não obtiver valore acima do teto.

                                    var aStore = pGrid.getStore();
                                    aStore.load({
                                        params: {
                                            mat: comboUso.getValue(),
                                            unid: comboUnid.getValue(),
                                            reg: comboReg.getValue(),
                                            sts: comboSts.getValue(),
                                            mes: comboMes,
                                            ano: comboAno,
                                            botao: bt
                                        }
                                    });
                                    Ext.getCmp('btn_autori').setDisabled(false);
                                    Ext.getCmp('btn_reab').setDisabled(false);
                                }

                            },
                            failure: function() {

                                //Ext.Msg.alert('Msg','Problema Na Base de Dados!');

                            }

                        });

                    } else {

                        var aStore = pGrid.getStore();
                        aStore.load({
                            params: {
                                mat: comboUso.getValue(),
                                unid: comboUnid.getValue(),
                                reg: comboReg.getValue(),
                                sts: comboSts.getValue(),
                                mes: comboMes,
                                ano: comboAno,
                                botao: bt
                            }
                        });
                    }

                    switch (comboStatus) {

                        case 0:

                            //Ext.getCmp('btn_encplan').setDisabled(false);
                            Ext.getCmp('btn_valid').setDisabled(true);
                            Ext.getCmp('btn_autori').setDisabled(true);
                            Ext.getCmp('btn_reab').setDisabled(true);
                            Ext.getCmp('btn_txt').setDisabled(true);
                            Ext.getCmp('btn_conc').setDisabled(true);
                            break;

                        case 1:


                            Ext.getCmp('btn_autori').setDisabled(true);
                            Ext.getCmp('btn_reab').setDisabled(true);

                            break;

                        case 2:


                            if ((codcargo == 7500 || codcargo == 7300 || codcargo == 6500) || niv == 1) {
                                Ext.getCmp('btn_autori').setDisabled(false);
                                Ext.getCmp('btn_reab').setDisabled(false);
                            } else {
                                //Ext.getCmp('btn_autori').setDisabled(true);
                                //Ext.getCmp('btn_reab').setDisabled(true);
                            }

                            break;
                        case 3:

                            Ext.getCmp('btn_autori').setDisabled(true);
                            Ext.getCmp('btn_reab').setDisabled(true);

                            if (niv == 1) {

                                Ext.getCmp('btn_conc').setDisabled(false);
                                Ext.getCmp('btn_reab').setDisabled(false);
                            }

                            break;
                        case 4:

                            if(niv==1){

                               Ext.getCmp('btn_reab').setDisabled(false);
                            }else{
                               Ext.getCmp('btn_autori').setDisabled(true);
                               Ext.getCmp('btn_conc').setDisabled(true);
                               Ext.getCmp('btn_reab').setDisabled(true);
                            }
                            break;

                        default:
                            Ext.getCmp('btn_autori').setDisabled(true);
                            Ext.getCmp('btn_reab').setDisabled(true);
                            Ext.getCmp('btn_conc').setDisabled(true);

                            break;
                    }

                }

            },
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
                        Combusu.reset();
                        Combsts.reset();
                        CombMes.reset();
                        CombAno.reset();
                    }
                }
            },
            {
                xtype: 'button',
                id: 'btn_excel',
                text: 'Exportar',
                iconCls: 'icon-excel',
                hrefTarget: "_blank",
                href: 'https://novoprossiga.inec.org.br/php/Prestacao/gerExcel.php',
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
                text: 'Sair',
                id: 'btSairPre',
                iconCls: 'icon-sair',
                style: {
                    //margin: '0 0 0 820'
                },
                listeners: {
                    click: function() {
                        var gridsld = Ext.getCmp('histsld');
                        var aStore = gridsld.getStore();
                        aStore.load();

                        var gridsit = Ext.getCmp('gsit');
                        var bStore = gridsit.getStore();
                        bStore.load();

                        var gridsubord = Ext.getCmp('gridsubord');
                        var cStore = gridsubord.getStore();
                        cStore.load();

                        Ext.getCmp('janpres').close();
                    }
                }
            }
        ]
    }],
    listeners: {
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

    }


});

//=================================================================================================================
//=================================================================================================================
