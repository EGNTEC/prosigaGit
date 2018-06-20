Ext.Loader.setConfig({
    enabled: true
});
var cellEditing = Ext.create('Ext.grid.plugin.CellEditing', {
    clicksToEdit: 3
});
//var sm = Ext.create('Ext.selection.CheckboxModel');
Ext.define('desloc.view.AltDadosLot', {
    //renderTo: Ext.getBody(),
    extend: 'Ext.window.Window',
    alias: 'widget.altlot',
    title: 'Excluir Colaborador do Lote',
    height: 580,//600
    width: 999,
    //x: 5,
    //y: 5,
    autoScroll: true,
    id: 'altlot',
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

    items: [
        /*{
                    xtype: 'container',
                    layout: 'fit',
                    height: 50,
                    style: { borderColor: '#000000', borderStyle: 'solid', borderWidth: '1px', backgroundColor: '#000000' },
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
                                    minChars: 1,
                                    id: 'lotCombo',
                                    fieldLabel: 'Nº Lote',
                                    emptyText: 'Selecione o lote', //'Selecione o lote',
                                    displayField: 'numlot',
                                    valueField: 'numlot',
                                    store: Ext.create('desloc.store.FiltLoteS'),
                                    triggerAction: 'all',
                                    totalProperty: 'total',
                                    mode: 'local',
                                    listeners: {

                                        change: function() {
                                            var lotCombo = Ext.getCmp('lotCombo').getValue();
                                            var pGrid = Ext.getCmp('gridaltlote');
                                            var aStore = pGrid.getStore();

                                            pGrid.getSelectionModel().selectAll();

                                            aStore.load({

                                                params: {

                                                    numlot: lotCombo
                                                }

                                            });

                                        }
                                    }
                                }
                            ]
                        }

                    ]

            },*/
        {
            xtype: 'grid',
            id: 'gridaltlote',
            height: 490,
            //selModel: sm,
            selModel: {
                selType: 'checkboxmodel',
                mode: 'MULTI'
            },
            layout: 'fit',
            store: Ext.create('desloc.store.ConsLoteS'),
            //autoScroll:true,
            columns: [

                {
                    header: 'Nº Lote',
                    dataIndex: 'numlot',
                    width: 120,
                    menuDisabled: true
                },
                {
                    header: 'Título',
                    dataIndex: 'numtit',
                    flex: 1,
                    width: 58,
                    menuDisabled: true
                        //hidden:false
                },
                {
                    header: 'Matricula',
                    dataIndex: 'numcad',
                    width: 74,
                    //id:'datpla',
                    menuDisabled: true
                },
                {
                    header: 'Nome',
                    dataIndex: 'nomfun',
                    flex: 1,
                    width: 158,
                    menuDisabled: true
                        //hidden:false
                },
                {
                    header: 'Referência',
                    dataIndex: 'datpla',
                    flex: 1,
                    width: 58,
                    menuDisabled: true
                        //hidden:false
                },
                {
                    header: 'Vencimento',
                    dataIndex: 'ventit',
                    flex: 1,
                    width: 58,
                    menuDisabled: true
                        //hidden:false
                },
                {
                    header: 'Valor',
                    dataIndex: 'vlrpag',
                    menuDisabled: true,
                    renderer: function(val) {
                        var metodo = Ext.util.Format.maskRenderer('R$ #9.999.990,00', true);

                        if (val.length > 1) {

                            metodo = Ext.util.Format.maskRenderer('R$ #9.999.990,00', true);
                        }

                        return metodo(val);
                    }
                },
                {
                    header: 'Transporte',
                    dataIndex: 'tiptrp',
                    menuDisabled: true,
                    hidden: true
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
                id: 'btn_dellt',
                text: 'Excluir',
                iconCls: 'icon-del',
                handler: function() {
                    var pGrid = Ext.getCmp('gridaltlote');
                    var pStore = pGrid.getStore();

                    var pRows = pGrid.getSelectionModel().getSelection();

                    Ext.apply(pStore.getProxy().extraParams, {
                        btn: 0
                    });

                    if (pRows.length) {
                        pStore.remove(pRows);
                        //pGrid.getSelectionModel().selectAll();
                        pStore.sync({

                            success: function() {
                                //numlot.reset();
                                Ext.Msg.alert('Mensagem', 'Título excluído com sucesso.');
                                var pGrid = Ext.getCmp('gridaltlote');
                                var pStore = pGrid.getStore();
                                pStore.load({
                                  params: {
                                    numlot: numlotalt
                                   }
                               });
                            },
                            failure: function() {
                                //numlot.reset();
                                Ext.Msg.alert('Mensagem', 'Lote excluído com sucesso.');
                                var pGrid = Ext.getCmp('gridaltlote');
                                var pStore = pGrid.getStore();
                                pStore.load({
                                  params: {
                                    numlot: numlotalt
                                   }
                               });
                            }

                        });
                    }
                }
            },
            {
              xtype: 'button',
              id: 'btn_ValLot',
              text: 'Validar',
              iconCls: 'icon-validar',
              handler: function() {

                var pGrid = Ext.getCmp('gridaltlote');
                var selectedRecords = pGrid.getSelectionModel().getSelection();

                var aStore = pGrid.getStore();

                var btnEx = Ext.getCmp('btn_ValLot');

                var selected = [];
                Ext.each(selectedRecords, function (item) {
                   //selected.push(item.data);
                   selected.push(item.data.numseq);
               });

               Ext.Ajax.request({
               url: '/php/Planejamento/ValidaLoteIndiv.php',
               method: 'POST',
               params: {data:Ext.encode(selected)},
               success: function(response) {
                 var result = Ext.JSON.decode(response.responseText);

                   if(result == 0){

                        function showResult(btn){
                            if (btn == 'ok'){

                              aStore.load({
                                params: {
                                  numlot: numlotalt
                                 }
                              });
                           }
                        }

                        Ext.Msg.show({
                            title: 'Mensagem',
                            msg: 'Colaborador Validado.',
                            buttons: Ext.Msg.OK,
                            closable: false,
                            fn: showResult
                        });
                   }

               },
               failure: function() {
                   Ext.Msg.alert('Mensagem','Problema ao validar colaborador.');
                   pStore.load({
                     params: {
                       numlot: numlotalt
                      }
                   });
                }

               });
             }
            },
            {
                xtype: 'button',
                text: 'Sair',
                iconCls:'icon-sair',
                listeners: {
                    click: function() {
                        var pGrid = Ext.getCmp('gridconlote');
                        var pStore = pGrid.getStore();
                        pStore.load();

                        Ext.getCmp('altlot').destroy();
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

            var pGrid = Ext.getCmp('gridaltlote');
            var jGrid = Ext.getCmp('gridconlote');

            var selectedRecords = jGrid.getSelectionModel().getSelection();
            numlotalt = selectedRecords[0].get("numlot");
            var pStore = pGrid.getStore();

            pStore.load({

                params: {

                    numlot: numlotalt
                }
            });
        },
        beforeclose: function(){

            var pGrid = Ext.getCmp('gridconlote');
            var pStore = pGrid.getStore();
            pStore.load();

            Ext.getCmp('altlot').destroy();
        }
    }

});
