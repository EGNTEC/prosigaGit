Ext.Loader.setConfig({
    enabled: true
});
var cellEditing = Ext.create('Ext.grid.plugin.CellEditing', {
    clicksToEdit: 3
});
//var sm = Ext.create('Ext.selection.CheckboxModel');
Ext.define('desloc.view.AdmPlan', {
    //renderTo: Ext.getBody(),
    extend: 'Ext.window.Window',
    alias: 'widget.admplan',
    title: 'Administração Planejamentos',
    height: 550,
    width: 920,
    //x: 5,
    //y: 10,
    autoScroll: true,
    id: 'admplan',
    //layout: 'fit',
    align: 'stretch',
    modal: true,
    maximizable:'true',
    //minimizable:true,
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
            width: 1353,
            //style: {borderColor:'#000000', borderStyle:'solid', borderWidth:'1px',backgroundColor:'#000000'},
            items: [{
                    xtype: 'form',
                    id: 'formAdmPlan',
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
                            id: 'acaoCombo',
                            width: 350,
                            fieldLabel: 'Ação',
                            emptyText: 'Escolha uma ação',
                            store: Ext.create('desloc.store.AcaoGerPlan'),
                            displayField: 'name',
                            valueField: 'value',
                            triggerAction: 'all',
                            editable: false,
                            mode: 'local',
                            style: {
                                margin: '-140 0 0 370'
                            },
                            //disabled:true,
                            lastQuery: '',
                            listeners: {

                                change: function() {

                                    var action = Ext.getCmp('acaoCombo').getValue();
                                    var trans = Ext.getCmp('tiptrans');
                                    var datfim = Ext.getCmp('dtdes');

                                    if (action == 0) {

                                        trans.show();
                                        datfim.show();
                                    } else {

                                        trans.hide();
                                        datfim.hide();
                                    }
                                }
                            }
                        },
                        {
                            xtype: 'combo',
                            id: 'acaoCombo2',
                            width: 350,
                            fieldLabel: 'Ação',
                            emptyText: 'Escolha uma ação',
                            store: Ext.create('desloc.store.AcaoGerPlan2'),
                            displayField: 'name',
                            valueField: 'value',
                            triggerAction: 'all',
                            editable: false,
                            mode: 'local',
                            style: {
                                margin: '-140 0 0 370'
                            },
                            //disabled:true,
                            lastQuery: '',
                            listeners: {
                                change: function() {

                                    var action = Ext.getCmp('acaoCombo2').getValue();
                                    var trans = Ext.getCmp('tiptrans');
                                    var datfim = Ext.getCmp('dtdes');

                                    if (action == 0) {

                                        trans.show();
                                        datfim.show();
                                    } else {

                                        trans.hide();
                                        datfim.hide();
                                    }
                                }
                            }
                        },
                        {
                            xtype: 'combo',
                            id: 'tiptrans',
                            hidden: true,
                            width: 250,
                            editable: false,
                            name: 'tiptrans',
                            fieldLabel: 'Tipo de Transporte',
                            emptyText: 'Selecione um Transporte',
                            store: Ext.create('desloc.store.TipoTransS'),
                            displayField: 'destrp',
                            valueField: 'tiptrp',
                            triggerAction: 'all',
                            mode: 'local',
                            margin: '0 0 0 370'
                        },
                        {
                            xtype: 'datefield',
                            width: 250,
                            hidden: true,
                            fieldLabel: 'Data de Finalização',
                            name: 'dtdes',
                            editable: false,
                            id: 'dtdes',
                            format: 'd/m/Y',
                            allowBlank: false,
                            margin: '-40 0 0 650'
                        }

                    ]
                }

            ]

        },
        {
            xtype: 'grid',
            id: 'gridAdm',
            height: 400,
            selModel: {
                selType: 'checkboxmodel',
                mode: 'MULTI'
            }, //sm,
            layout: 'fit',
            store: Ext.create('desloc.store.AdmPlanConsS'),
            features: [{
                ftype: 'summary'
            }],
            //autoScroll:true,
            columns: [
                /*{
                  xtype:'actionbuttoncolumn',
                  menuDisabled:true,
                  width: 36,
                  items: [{
                      iconCls:'icon-edit'
                      //tooltip: 'Sell stock',
                      //action: 'sell'
                   }],
                  listeners:{
                     click:function(){

                       }
                    }
                },*/
                {
                    header: 'Referência',
                    dataIndex: 'datpla',
                    width: 83,
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
                    width: 74,
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
                    width: 88,
                    menuDisabled: true
                },
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
                }

            ],
            plugins: [cellEditing],
            listeners: {


            }
        }

    ],

    //
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'bottom',
        items: [{
                xtype: 'button',
                text: 'Buscar',
                tooltip: 'Localizar Prestação',
                id: 'btn_busc',
                iconCls: 'icon-buscar',
                handler: function() {

                    var pGrid = Ext.getCmp('gridAdm');
                    var comboUso = Ext.getCmp('usuCombo').getValue();
                    var comboUni = Ext.getCmp('uniCombo').getValue();
                    var comboReg = Ext.getCmp('regCombo').getValue();
                    var comboAct = Ext.getCmp('acaoCombo').getValue();
                    var comboMes = Ext.getCmp('mesCombo').getValue();
                    var comboAno = Ext.getCmp('anoCombo').getValue();
                    var datfim = Ext.getCmp('dtdes').getValue();
                    var transp = Ext.getCmp('tiptrans').getValue();

                    var aStore = pGrid.getStore();
                    aStore.load({
                        params: {
                            mat: comboUso,
                            und: comboUni,
                            reg: comboReg,
                            act: comboAct,
                            mes: comboMes,
                            ano: comboAno,
                            dtf: datfim,
                            trp: transp
                        }
                    });

                }
            },
            {
                xtype: 'button',
                id: 'btn_filtro',
                text: 'Limpar Filtros',
                iconCls: 'icon-filtro',
                handler: function() {

                    var comboUso = Ext.getCmp('usuCombo').reset();
                    var comboUni = Ext.getCmp('uniCombo').reset();
                    var comboReg = Ext.getCmp('regCombo').reset();
                    var comboAct = Ext.getCmp('acaoCombo').reset();
                    var comboAct2 = Ext.getCmp('acaoCombo2').reset();
                    var comboMes = Ext.getCmp('mesCombo').reset();
                    var comboAno = Ext.getCmp('anoCombo').reset();
                    var datfim = Ext.getCmp('dtdes').reset();
                    var transp = Ext.getCmp('tiptrans').reset();
                }

            },
            {
                xtype: 'button',
                id: 'btn_process',
                text: 'Processar',
                iconCls: 'icon-accept',
                handler: function() {

                    var pGrid = Ext.getCmp('gridAdm');
                    var sStore = pGrid.getStore();
                    var selectedRecords = pGrid.getSelectionModel().getSelection();
                    var comboUso = Ext.getCmp('usuCombo').getValue();
                    var comboUni = Ext.getCmp('uniCombo').getValue();
                    var comboReg = Ext.getCmp('regCombo').getValue();
                    var comboMes = Ext.getCmp('mesCombo').getValue();
                    var comboAno = Ext.getCmp('anoCombo').getValue();
                    var datfim = Ext.getCmp('dtdes').getValue();
                    var transp = Ext.getCmp('tiptrans').getValue();

                    if(niv == 1){

                       var comboAct = Ext.getCmp('acaoCombo').getValue();
                    }else{
                       var comboAct = Ext.getCmp('acaoCombo2').getValue();
                    }

                    if (comboAct == 1 || comboAct == 2) {

                        if (selectedRecords.length) {
                            sStore.remove(selectedRecords);
                            //Envia um parametro para o arquivo de alteração.
                            Ext.apply(sStore.getProxy().extraParams, {
                                actD: comboAct
                            });
                            //Faz a alteração no banco
                            sStore.sync({
                                //success: function (conn, response, options, eOpts){
                                success: function(response) {
                                    var result = Ext.JSON.decode(response.responseText);

                                    if (result == 1) {

                                        Ext.Msg.alert('Mensagem', 'Planejamento zerado.');
                                    } else
                                    if (result == 2) {

                                        Ext.Msg.alert('Mensagem', 'Planejamento Excluído.');
                                    } else {

                                        //Ext.Msg.alert('Mensagem','Problema ao executar a ação.');
                                        Ext.Msg.alert('Mensagem', 'Ação executada com sucesso.');
                                    }

                                },
                                failure: function() {

                                    //Ext.Msg.alert('Mensagem','Problema com a base de dados.');
                                    Ext.Msg.alert('Mensagem', 'Problema ao executar a ação.');
                                }

                            });

                        }

                    } else
                    if (comboAct == 0) {

                        Ext.Ajax.request({
                            url: '/php/Planejamento/AdmPlan.php',
                            method: 'get',
                            params: {

                                mat: comboUso,
                                und: comboUni,
                                reg: comboReg,
                                act: comboAct,
                                mes: comboMes,
                                ano: comboAno,
                                dtf: datfim,
                                trp: transp

                            },
                            success: function(response) {

                                var result = Ext.JSON.decode(response.responseText);
                                //console.log(result);

                                /*if (result == 99) {

                                    Ext.Msg.alert('Mensagem', 'Escolha uma ação.');

                                } else*/
                                if (result == 0) {

                                    Ext.Msg.alert('Mensagem', 'Informe uma referência.');

                                } else
                                if (result == 1) {

                                    Ext.Msg.alert('Mensagem', 'Já existe um planejamento para esse mês.');
                                } else
                                if (result == 2) {

                                    Ext.Msg.alert('Mensagem', 'Registro inserido com sucesso.');
                                }else
                                if(result == 99){

                                   Ext.Msg.alert('Mensagem', 'Existe um planejamento ou uma prestação de contas não concluído.');

                                }

                            },
                            failure: function() {

                            }
                        });

                    } else
                    if (comboAct == 3) {

                        if (selectedRecords.length) {
                            sStore.remove(selectedRecords);
                            //Envia um parametro para o arquivo de alteração.
                            Ext.apply(sStore.getProxy().extraParams, {
                                actD: comboAct
                            });
                            //Faz a alteração no banco
                            sStore.sync({
                                //success: function (conn, response, options, eOpts){
                                success: function(response) {
                                    var result = Ext.JSON.decode(response.responseText);

                                    if (result == 1) {

                                        Ext.Msg.alert('Mensagem', 'Planejamento zerado criado.');
                                    } else
                                    if (result == 2) {

                                        Ext.Msg.alert('Mensagem', 'Planejamento Excluído.');
                                    } else {

                                        //Ext.Msg.alert('Mensagem','Problema ao executar a ação.');
                                        Ext.Msg.alert('Mensagem', 'Ação executada com sucesso.');
                                    }

                                },
                                failure: function() {

                                    //Ext.Msg.alert('Mensagem','Problema com a base de dados.');
                                    Ext.Msg.alert('Mensagem', 'Problema ao executar a ação.');
                                }

                            });
                        }
                    }
                }
            },
            {
                xtype: 'button',
                id: 'btSair',
                text: 'Sair',
                iconCls: 'icon-sair',
                style: {

                    margin: '0 0 0 0'
                },
                listeners: {
                    click: function() {

                        var pGrid = Ext.getCmp('gridAdm');
                        var aStore = pGrid.getStore();
                        aStore.load({
                            params: {
                                mes: 0,
                                ano: 0
                            }
                        });

                        Ext.getCmp('admplan').destroy();
                    }
                }
            }

        ]
    }],
    listeners: {
       beforerender:function(){

         var action1  = Ext.getCmp('acaoCombo');
         var action2  = Ext.getCmp('acaoCombo2');

         if(niv==2){

              action1.hide();
              action2.show();
         }else{

            action1.show();
            action2.hide();
         }

        },
        beforeclose: function() {

            var pGrid = Ext.getCmp('gridAdm');
            var aStore = pGrid.getStore();
            aStore.load({
                params: {
                    mes: 0,
                    ano: 0
                }
            });

            Ext.getCmp('admplan').destroy();

        }

    }

});
