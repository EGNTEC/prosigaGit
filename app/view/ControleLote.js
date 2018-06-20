Ext.Loader.setConfig({
    enabled: true
});
var cellEditing = Ext.create('Ext.grid.plugin.CellEditing', {
    clicksToEdit: 2
});
//var sm = Ext.create('Ext.selection.CheckboxModel');

Ext.define('desloc.view.ControleLote', {
    //renderTo: Ext.getBody(),
    extend: 'Ext.window.Window',
    alias: 'widget.contlot',
    title: 'Administração de Lotes',
    height: 550,
    width: 900,
    //x: 5,
    //y: 8,//38
    autoScroll: true,
    id: 'contlot',
    //layout: 'fit',
    align: 'stretch',
    modal: true,
    //minimizable:true,
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
            height: 160,
            width:1370,
            //style: {borderColor:'#000000', borderStyle:'solid', borderWidth:'1px',backgroundColor:'#000000'},
            items: [{
                xtype: 'form',
                //boddyPadding: 10,
                layout: 'vbox',
                defaults: {
                    padding: 2,
                    anchor: '100%',
                    margins: '3 0 0 0',
                    width: 490
                },

                items: [

                    {
                        xtype: 'combo',
                        editable: false,
                        width: 290,
                        minChars: 1,
                        id: 'regCombo',
                        fieldLabel: 'Regional',
                        emptyText: 'Selecione a Regional',
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
                        width: 265,
                        id: 'uniCombo',
                        fieldLabel: 'Unidade',
                        emptyText: 'Selecione a Unidade',
                        displayField: 'nomloc',
                        valueField: 'numloc',
                        store: Ext.create('desloc.store.Unids'),
                        triggerAction: 'all',
                        mode: 'local',
                        style: {
                            margin: '-36 0 0 300'
                        },
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
                        id: 'mesCombo',
                        width: 195,
                        fieldLabel: 'Referência',
                        emptyText: 'Mês',
                        store: Ext.create('desloc.store.MesS'),
                        displayField: 'name',
                        valueField: 'value',
                        triggerAction: 'all',
                        editable: false,
                        mode: 'local',
                        style: {
                            //margin:'-69 0 0 260'
                        },
                        //disabled:true,
                        lastQuery: ''
                    },
                    {
                        xtype: 'combo',
                        id: 'anoCombo',
                        width: 80,
                        //fieldLabel:'Ano',
                        emptyText: 'Ano',
                        store: Ext.create('desloc.store.AnoS'),
                        displayField: 'name',
                        valueField: 'value',
                        triggerAction: 'all',
                        editable: false,
                        mode: 'local',
                        style: {
                            margin: '-35 0 0 210'
                        },
                        //disabled:true,
                        lastQuery: ''
                    },
                    {
                        xtype: 'checkboxfield',
                        boxLabel: 'Mostrar somente valores zerados.',
                        //name:'topping',
                        //inputValue:'1',
                        id: 'checkbox1',
                        style: {
                            margin: '0 0 0 103'
                        }
                    },
                    {
                        xtype: 'checkboxfield',
                        boxLabel: 'Valores com saldos positivos.',
                        id: 'checkSld',
                        style: {
                            margin: '0 0 0 103'
                        }
                    }
                    /*,
                    {
                      xtype:'combo',
                      id:'usuCombo',
                      fieldLabel:'Colaborador',
                      emptyText:'Selecione um Colaborador',
                      store: Ext.create('desloc.store.Usos'),
                      displayField:'nomfun',
                      valueField:'numcad',
                      triggerAction:'all',
                      editable: true,
                      mode:'local',
                      disabled:true,
                      lastQuery:''
                    },
                    {
                      xtype:'combo',
                      id:'statusCombo',
                      fieldLabel:'Situação',
                      emptyText:'Selecione uma Situação',
                      store: Ext.create('desloc.store.SituacaoS'),
                      displayField:'dessts',
                      valueField:'numsts',
                      triggerAction:'all',
                      mode:'local',
                      //disabled:true,
                      lastQuery:''
                    }*/

                ]
            }]

        },
        {
            xtype: 'grid',
            id: 'gridlote',
            height: 400,
            //selModel: sm,
            selModel: {
              selType: 'checkboxmodel',
              mode: 'MULTI'
            },
            layout: 'fit',
            store: Ext.create('desloc.store.DadosLoteS'),
            features: [{
                ftype: 'summary'
            }],
            autoScroll: true,
            columns: [

                {
                    header: 'Id',
                    dataIndex: 'numseq',
                    menuDisabled: true,
                    hidden: true
                },
                {
                    header: 'transporte',
                    dataIndex: 'tiptrp',
                    menuDisabled: true,
                    hidden: true
                },
                {
                    header: 'Referência',
                    dataIndex: 'mesref',
                    width: 80,
                    menuDisabled: true,
                    summaryRenderer: function() {
                        return 'Total:'
                    }
                },
                {
                    header: 'Matricula',
                    dataIndex: 'numcad',
                    width: 75,
                    id: 'mat',
                    menuDisabled: true,
                    name: 'mat'
                },
                {
                    header: 'Fornecedor',
                    dataIndex: 'codfor',
                    width: 75,
                    id: 'codfor',
                    menuDisabled: true,
                    name: 'codfor'
                },
                {
                    header: 'Nome',
                    dataIndex: 'nomfun',
                    //flex:1,
                    width: 258,
                    menuDisabled: true,
                    hidden: false,
                    summaryType: 'count'
                },
                {
                    header: 'Transporte',
                    dataIndex: 'destrans',
                    width: 85,
                    menuDisabled: true,
                    hidden: false
                },
                {
                    header: 'Planejado',
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
                    header: 'Saldo',
                    dataIndex: 'vlrsld',
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
                    header: 'A depositar',
                    dataIndex: 'vlrpag',
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
                    header: 'Banco',
                    width: 56,
                    dataIndex: 'codban',
                    menuDisabled: true
                },
                {
                    header: 'Agência',
                    width: 65,
                    dataIndex: 'codage',
                    menuDisabled: true
                },
                {
                    header: 'Conta',
                    width: 70,
                    dataIndex: 'numcta',
                    menuDisabled: true
                },
                {
                    header: 'Local',
                    width: 210,
                    dataIndex: 'nomloc',
                    menuDisabled: true
                }

            ],
            plugins: [cellEditing]
        }

    ],
    //
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'bottom',
        items: [{
                xtype: 'button',
                id: 'btn_loc',
                text: 'Buscar',
                iconCls: 'icon-buscar',
                handler: function(){

                    var pGrid = Ext.getCmp('gridlote');
                    var selectedRecords = pGrid.getSelectionModel().getSelection();
                    var comboUnid = Ext.getCmp('uniCombo');
                    var comboReg = Ext.getCmp('regCombo');
                    var check = Ext.getCmp('checkbox1').getValue();
                    var checksl = Ext.getCmp('checkSld').getValue();
                    //var checkslPos = Ext.getCmp('checkSldPos').getValue();
                    var mesC = Ext.getCmp('mesCombo').getValue();
                    var anoC = Ext.getCmp('anoCombo').getValue();
                    //console.log(check);
                    var aStore = pGrid.getStore();
                    aStore.load({
                       params: {
                            btn:0,
                            unid: comboUnid.getValue(),
                            reg: comboReg.getValue(),
                            mes: mesC,
                            ano: anoC,
                            check: check, //true=marcado,false=desmarcado
                            checkSld: checksl //true=marcado,false=desmarcado

                        }
                    });
                }

            },
            {
                xtype: 'button',
                id: 'btn_filtro',
                text: 'Limpar Filtros',
                iconCls: 'icon-filtro',
                listeners: {
                    click: function() {

                        var Combreg  = Ext.getCmp('regCombo');
                        var Combunid = Ext.getCmp('uniCombo');
                        var MesComb  = Ext.getCmp('mesCombo');
                        var AnoComb  = Ext.getCmp('anoCombo');

                        Combreg.reset();
                        Combunid.reset();
                        MesComb.reset();
                        AnoComb.reset();

                    }
                }
            },
            {
                xtype: 'button',
                id: 'btn_gerarq',
                text: 'Gerar Arquivo',
                iconCls: 'icon-validar',
                hrefTarget: "_blank",
                //href: 'https://novoprossiga/php/Planejamento/DocPagamento.php',
                handler: function() {

                    var pGrid = Ext.getCmp('gridlote');
                    var selectedRecords = pGrid.getSelectionModel().getSelection();
                    var comboUnid = Ext.getCmp('uniCombo');
                    var comboReg = Ext.getCmp('regCombo');
                    var check = Ext.getCmp('checkbox1').getValue();
                    var checksl = Ext.getCmp('checkSld').getValue();
                    //var checkslPos = Ext.getCmp('checkSldPos').getValue();
                    var mesC = Ext.getCmp('mesCombo').getValue();
                    var anoC = Ext.getCmp('anoCombo').getValue();
                    //console.log(check);
                    var aStore = pGrid.getStore();

                    var btnEx = Ext.getCmp('btn_gerarq');

                    Ext.create('desloc.view.DadosPagPreVisu');
                }

            },
            {
                xtype: 'button',
                text: 'Zerar Planejamento',
                iconCls: 'icon-delete',
                listeners: {
                    click: function() {

                        var pGrid = Ext.getCmp('gridlote');
                        var selectedRecords = pGrid.getSelectionModel().getSelection();
                        var idabr = selectedRecords[0].get("numseq");
                        var mat = selectedRecords[0].get("numcad");
                        var idtrans = selectedRecords[0].get("tiptrp");
                        var confBox = Ext.MessageBox;

                        confBox.buttonText = {
                            cancel: 'cancelText',
                            no: 'Não',
                            ok: 'Ok',
                            yes: 'Sim'
                        };

                        confBox.confirm('Mensagem', 'Deseja zerar realmente esse planejamento?', function(btn, text) {

                            if (btn == 'yes') {

                                Ext.Ajax.request({
                                    url: '/php/Planejamento/zerarplan.php',
                                    method: 'get',
                                    params: {
                                        numseq: idabr,
                                        mat: mat,
                                        trans: idtrans
                                    },
                                    success: function(response) {

                                        var result = Ext.JSON.decode(response.responseText);
                                        //console.log(result);
                                        var pGrid = Ext.getCmp('gridlote');
                                        var comboUnid = Ext.getCmp('uniCombo');
                                        var comboReg = Ext.getCmp('regCombo');
                                        var check = Ext.getCmp('checkbox1').getValue();
                                        var aStore = pGrid.getStore();

                                        if (result == 0) {
                                            Ext.Msg.alert('Mensagem', 'Valor do planejamento zerado!');

                                            aStore.load({
                                                params: {
                                                    unid: comboUnid.getValue(),
                                                    reg: comboReg.getValue(),
                                                    check: check //true=marcado,false=desmarcado
                                                }
                                            });
                                        } else {

                                            Ext.Msg.alert('Mensagem', 'Erro ao zerar planejamento!');
                                            aStore.load({
                                                params: {
                                                    unid: comboUnid.getValue(),
                                                    reg: comboReg.getValue(),
                                                    check: check //true=marcado,false=desmarcado
                                                }
                                            });
                                        }

                                    },
                                    failure: function() {}
                                });

                            } else {


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

                    var pGrid = Ext.getCmp('gridlote');
                    var sStore = pGrid.getStore();
                    var selectedRecords = pGrid.getSelectionModel().getSelection();

                    if (selectedRecords.length) {
                        sStore.remove(selectedRecords);
                        Ext.apply(sStore.getProxy().extraParams, {
                            btnRbr: 3,

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

                                        if (btn == "ok"){

                                        }

                                    });
                                } else {
                                    Ext.Msg.alert('Mensagem', 'Erro ao alterar.');
                                    pGrid.getSelectionModel().deselectAll();
                                }
                            },
                            failure: function() {

                                Ext.Msg.alert('Mensagem', 'Problema na base de Dados, consultar UPDATE!.');
                                sStore.load();
                            }
                        });
                    }
                }
            },
            {
                xtype: 'button',
                id: 'btn_exclote',
                text: 'Exportar',
                iconCls: 'icon-excel',
                hrefTarget: "_blank",
                href: 'https://novoprossiga.inec.org.br/php/Planejamento/ExcelLote.php',
                listeners: {
                    click: function(){

                        var comboUnid = Ext.getCmp('uniCombo').getValue();
                        var comboReg = Ext.getCmp('regCombo').getValue();
                        var comboCheck = Ext.getCmp('checkbox1').getValue();

                        var btnEx = Ext.getCmp('btn_exclote');

                        btnEx.setParams({

                            unid: comboUnid,
                            reg: comboReg,
                            check: comboCheck
                        });
                    }
                }
            },
            {
                xtype: 'button',
                text: 'Sair',
                iconCls: 'icon-sair',
                listeners: {
                    click: function() {
                        Ext.getCmp('contlot').close();
                    }
                },
                style: {

                    margin: '0 0 0 500'
                }
            }
        ]
    }],
    listeners: {

        beforerender:function(){

          var sPGrid = Ext.getCmp('gridlote');
          var sPStore = sPGrid.getStore();

          sPStore.load({
              params: {btn: 0}
          });

        }
    }

});
