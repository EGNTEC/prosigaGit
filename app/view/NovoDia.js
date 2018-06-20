var cellEditing = Ext.create('Ext.grid.plugin.CellEditing', {
    clicksToEdit: 2
});

//var sm = Ext.create('Ext.selection.CheckboxModel');
Ext.define('desloc.view.NovoDia', {
    extend: 'Ext.window.Window',
    alias: 'widget.novodia',
    title: 'Cadastrar novos dias',
    width: 250,
    height: 400,
    align: 'stretch',
    modal: true,
    resizable: 'true',
    align: 'center',
    autoShow: true,
    autoScroll: true,
    //plain: true,
    //layout:'fit',
    id: 'novodia',

    requires: [
        'Ext.util.ComponentDragger',
        'Ext.util.Region',
        'Ext.ux.TextMaskPlugin',
        'Ext.EventManager',
        'Ext.tab.Panel',
        'Ext.ux.grid.column.ActionButtonColumn',
        'Ext.grid.*',
        'Ext.util.*',
    ],
    listeners: {
        //Acrecentar funções da Janela
        beforerender: function() {

            var grid = Ext.getCmp('gridpre'); //grid cadastro de prestação
            var selectedRecords = grid.getSelectionModel().getSelection();
            var vTrp = vTiptrp; //selectedRecords[0].get("tiptrp");
            var vSeqpre = vSeqpla;
            var vNumcad = vNumcad;
            var vMesRef = vMesRef;

            var gridAdd = Ext.getCmp('gridNovoDia');
            var addStore = gridAdd.getStore();
            addStore.load({
                params: { numseq: vSeqpre }
            });


        }, //Fim do beforerender
        beforeclose: function() {

                var Abrgrid = Ext.getCmp('gridpre'); //grid abertura prestação
                var sStore = Abrgrid.getStore();
                var selectedRecords = Abrgrid.getSelectionModel().getSelection();
                var vSeqpre = vSeqpla; //selectedRecords[0].get("numseq");
                var vNumcad = vNumcad; //selectedRecords[0].get("numcad");
                var vTiptrp = vTiptrp; //selectedRecords[0].get("tiptrp");
                var vMesRef = vMesRef; //selectedRecords[0].get("mesref");

                var gridNov = Ext.getCmp('gridprNovGer');
                var sStorePr = gridNov.getStore();

                sStorePr.load({ //manda as informações para atualizar a grid dia-dia.
                    params: { numseq: vSeqpla, tiptrp: vTiptrp, numcad: vNumcad }
                });

                Ext.getCmp('novodia').destroy();

            } //Fim do beforeclose.
    },
    items:[
           {
            xtype: 'grid',
            id: 'gridNovoDia',
            //selModel: sm,
            selModel: {
                selType: 'checkboxmodel',
                mode: 'MULTI'
            },
            autoScroll: true,
            layout: 'fit',
            store: Ext.create('desloc.store.NovoDiaS'),
            columns: [

              {
                  header: 'Id Abertura',
                  id: 'seqp',
                  name: 'seqp',
                  dataIndex: 'seqpre',
                  hidden: true,
                  menuDisabled: true
              },
              {
                  xtype: 'datecolumn',
                  header: 'Dias não cadastrados',
                  id: 'datp',
                  menuDisabled: true,
                  name: 'datp',
                  dataIndex: 'datpre',
                  width: 150,
                  renderer: Ext.util.Format.dateRenderer('d/m/Y')
                }
            ],
            plugins: [cellEditing]
        } //Fim da grid
    ],
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'bottom',
        items:[
               {
                text: 'Incluir',
                iconCls: 'icon-add',
                handler: function() {

                    var qGrid = Ext.getCmp('gridNovoDia');
                    var pStore = qGrid.getStore();
                    var pRows = qGrid.getSelectionModel().getSelection();

                    pStore.remove(pRows);

                    if (pRows.length) {
                        pStore.sync({
                            success: function() {

                                Ext.Msg.alert('Mensagem', 'Registro inserido com sucesso.');
                                pStore.load();
                            },
                            failure: function() {}
                        });
                    } else {
                        Ext.Msg.alert('Mensagem', 'Selecione um registro.');
                    }
                }
            },
            {
                text: 'Sair',
                iconCls: 'icon-sair',
                listeners: {
                    click: function() {

                      var Abrgrid = Ext.getCmp('gridpre'); //grid abertura prestação
                      var sStore = Abrgrid.getStore();
                      var selectedRecords = Abrgrid.getSelectionModel().getSelection();
                      var vSeqpre = vSeqpla; //selectedRecords[0].get("numseq");
                      var vNumcad = vNumcad; //selectedRecords[0].get("numcad");
                      var vTiptrp = vTiptrp; //selectedRecords[0].get("tiptrp");
                      var vMesRef = vMesRef; //selectedRecords[0].get("mesref");

                      var gridNov = Ext.getCmp('gridprNovGer');
                      var sStorePr = gridNov.getStore();

                      sStorePr.load({ //manda as informações para atualizar a grid dia-dia.
                          params: { numseq: vSeqpla, tiptrp: vTiptrp, numcad: vNumcad }
                      });

                       Ext.getCmp('novodia').destroy();
                    }
                }
            }
        ]
    }]
});
