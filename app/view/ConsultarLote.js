Ext.Loader.setConfig({
    enabled: true
});
var cellEditing = Ext.create('Ext.grid.plugin.CellEditing', {
    clicksToEdit: 3
});
//var sm = Ext.create('Ext.selection.CheckboxModel');

Ext.define('desloc.view.ConsultarLote', {
    //renderTo: Ext.getBody(),
    extend: 'Ext.window.Window',
    alias: 'widget.conslot',
    title: 'Consulta de Lotes',
    height: 400,
    width: 450,
    x: 300,
    y: 38,
    autoScroll: true,
    id: 'conslot',
    //layout: 'fit',
    //align: 'stretch',
    modal: true,
    //minimizable:true,
    maximizable: 'true',
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
            xtype: 'grid',
            id: 'gridconlote',
            height: 700,
            width: 1350,
            //selModel: sm,
            selModel: {
                selType: 'checkboxmodel',
                mode: 'MULTI'
            },
            layout: 'fit',
            store: Ext.create('desloc.store.ConsLoteS'),
            //store: Ext.create('desloc.store.FiltLoteS'),
            //autoScroll:true,
            columns: [

                {
                    header: 'Número do Lote',
                    dataIndex: 'numlot',
                    width: 350,
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
                id: 'btn_altlot',
                iconCls: 'icon-reabrir',
                text: 'Alterar Lote',
                handler: function() {

                    var pGrid = Ext.getCmp('gridconlote');
                    var pStore = pGrid.getStore();
                    var pRows = pGrid.getSelectionModel().getSelection();
                    numlot = pRows[0].get("numlot");

                    if (pRows.length > 1) {

                        Ext.Msg.alert('Mensagem', 'Escolha apenas um lote a ser alterarado.');
                    } else
                    if (pRows.length == 1) {

                        Ext.create('desloc.view.AltDadosLot');

                    } else {

                        Ext.Msg.alert('Mensagem', 'Nenhum lote selecionado.');
                    }

                }

            },
            {
                xtype: 'button',
                id: 'btn_dellot',
                iconCls: 'icon-del',
                text: 'Apagar Lote',
                //href: 'https://novoprossiga/teste/php/Planejamento/DelPag.php',
                handler: function() {

                    var pGrid = Ext.getCmp('gridconlote');
                    var pStore = pGrid.getStore();
                    var pRows = pGrid.getSelectionModel().getSelection();
                    numlot = pRows[0].get("numlot");

                    var btn = Ext.getCmp('btn_dellot');

                    var selected = [];
                    Ext.each(pRows, function(item) {
                        selected.push(item.data);
                    });

                    /*btn.setParams({

                        data:Ext.encode(selected)
                    });*/

                    Ext.Ajax.request({
                        url: '/php/Planejamento/DelPag.php',
                        params: {
                            data: Ext.encode(selected)
                        },
                        success: function(response, opts) {
                            var result = Ext.JSON.decode(response.responseText);

                            if (result == 0) {

                                Ext.Msg.alert('Mensagem', 'Lote deletado com sucesso.');
                                var pGrid = Ext.getCmp('gridconlote');
                                var pStore = pGrid.getStore();
                                pStore.load();
                            } else {
                                Ext.Msg.alert('Mensagem', 'Problema ao excluir lote.');
                                var pGrid = Ext.getCmp('gridconlote');
                                var pStore = pGrid.getStore();
                                pStore.load();
                            }

                        },
                        failure: function() {
                            Ext.Msg.alert('Mensagem', 'Problemas na base!');
                            //console.log('Erro no retorno da informação.');
                        }

                    });

                }
            },
            {
                xtype: 'button',
                id: 'btn_lot',
                text: 'Validar Lote',
                iconCls: 'icon-autorizar',
                handler: function() {

                    var pGrid = Ext.getCmp('gridconlote');
                    var pStore = pGrid.getStore();
                    var pRows = pGrid.getSelectionModel().getSelection();
                    numlotC = pRows[0].get("numlot");
                    /*Ext.apply(pStore.getProxy().extraParams, {
                        btn: 1
                    });
                    if (pRows.length) {
                        pStore.remove(pRows);
                        //pGrid.getSelectionModel().selectAll();
                        pStore.sync({
                            success: function() {
                                //pStore.load();
                                //numlot.load();
                                Ext.Msg.alert('Mensagem', 'Lote validado com suceso.');
                            },
                            failure: function() {
                                //pStore.load();
                                //numlot.load();
                                Ext.Msg.alert('Mensagem', 'Lote validado com suceso.');
                            }
                        });
                    }*/
                    var btn = Ext.getCmp('btn_lot');

                    var selected = [];
                    Ext.each(pRows, function(item) {
                        selected.push(item.data);
                    });

                    pStore.remove(pRows);

                    Ext.Ajax.request({
                        url: '/php/Planejamento/ValLote.php',
                        timeout: 9999999,
                        params: {
                            data: Ext.encode(selected)
                        },
                        success: function(response, opts) {
                            var result = Ext.JSON.decode(response.responseText);

                            if (result == 0) {
                                Ext.Msg.alert('Mensagem', 'Lote validado com sucesso.');
                                var pGrid = Ext.getCmp('gridconlote');
                                var pStore = pGrid.getStore();
                                pStore.load();
                            } else {
                                Ext.Msg.alert('Mensagem', 'Problema ao validar lote.');
                                var pGrid = Ext.getCmp('gridconlote');
                                var pStore = pGrid.getStore();
                                pStore.load();
                            }

                        },
                        failure: function() {
                            Ext.Msg.alert('Mensagem', 'Problemas na base!');
                            //console.log('Erro no retorno da informação.');
                        }

                    });

                }
            },
            {
                xtype: 'button',
                text: 'Sair',
                iconCls: 'icon-sair',
                listeners: {
                    click: function() {
                        Ext.getCmp('conslot').close();
                    }
                },
                style: {

                    margin: '0 0 0 0'
                }
            }
        ]
    }],
    listeners: {

        //Acrecentar funções

        beforerender: function() {

            var pGrid = Ext.getCmp('gridconlote');
            var pStore = pGrid.getStore();
            pStore.load();
        }
    }

});
