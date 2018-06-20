Ext.Loader.setConfig({
    enabled: true
});
var cellEditing = Ext.create('Ext.grid.plugin.CellEditing', {
    clicksToEdit: 3
});
//var sm = Ext.create('Ext.selection.CheckboxModel');
Ext.define('desloc.view.LocalAdicional', {
    //renderTo: Ext.getBody(),
    extend: 'Ext.window.Window',
    alias: 'widget.locad',
    title: 'Local Adicional',
    height: 550,
    width: 920,
    //x: 5,
    //y: 10,
    autoScroll: true,
    id: 'locad',
    //layout: 'fit',
    align: 'stretch',
    modal: true,
    maximizable: 'true',
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
            width: 1220,
            //style: {borderColor:'#000000', borderStyle:'solid', borderWidth:'1px',backgroundColor:'#000000'},
            items: [{
                    xtype: 'form',
                    id: 'formLocAd',
                    //boddyPadding: 10,
                    layout: 'vbox',
                    defaults: {
                        padding: 2,
                        anchor: '100%',
                        margins: '3 0 0 0',
                        width: 450
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


                                        var comboUso = Ext.getCmp('usuCombo');
                                        comboUso.setDisabled(true);
                                        comboUso.setValue('');
                                        comboUso.store.removeAll();

                                        comboUso.store.load({
                                            params: { regId: combo.getValue(), locAdd: 1 }
                                        });
                                        comboUso.setDisabled(false);

                                        //===================================

                                        var comboUnid = Ext.getCmp('uniCombo');
                                        comboUnid.setDisabled(true);
                                        comboUnid.setValue('');
                                        comboUnid.store.removeAll();

                                        comboUnid.store.load({
                                            params: { regId: combo.getValue() }
                                        });
                                        
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
                               select: {
                                  fn: function(combo, value){
                                    var comboUnid = Ext.getCmp('uniCombo');

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

                                }
                            }
                        }
                    ]
                }
            ]

        },
        {
            xtype: 'grid',
            id: 'gridLocAd',
            height: 400,
            selModel: {
                //selType: 'checkboxmodel',
                //mode: 'MULTI'
            }, //sm,
            layout: 'fit',
            store: Ext.create('desloc.store.UnidadeAdicionalS'),
            features: [{
                ftype: 'summary'
            }],
            //autoScroll:true,
            columns: [
                {
                  xtype:'actionbuttoncolumn',
                  menuDisabled:true,
                  width: 36,
                  items: [{
                      iconCls:'icon-delete'
                      //tooltip: 'Sell stock',
                      //action: 'sell'
                   }],
                  listeners:{
                     click:function(){

                            var pGrid = Ext.getCmp('gridLocAd');
                            var selectedRecords = pGrid.getSelectionModel().getSelection(); 
                            var numcad = selectedRecords[0].get('numcad');

                            Ext.Ajax.request({
                            url: '/php/DelLocalAdicional.php',
                            method: 'get',
                            params: {

                                numcad: numcad

                            },
                            success: function(response) {

                                var result = Ext.JSON.decode(response.responseText);
                                if (result == 0) {

                                    Ext.Msg.alert('Mensagem', 'Registro excluído com sucesso.');

                                } else
                                if (result == 1) {

                                    Ext.Msg.alert('Mensagem', 'Problema ao apagar local adicional.');
                                }

                            },
                            failure: function() {

                             }
                         });

                       }
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
                    header: 'Local Adicional',
                    width: 180,
                    flex:1,
                    dataIndex: 'nomloc',
                    menuDisabled: true
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

                    var pGrid = Ext.getCmp('gridLocAd');
                    var comboUso = Ext.getCmp('usuCombo').getValue();
                    var comboUni = Ext.getCmp('uniCombo').getValue();
                    var comboReg = Ext.getCmp('regCombo').getValue();
                    
                    var aStore = pGrid.getStore();
                    aStore.load({
                        params: {
                            numcad: comboUso
                        }
                    });
                }
            },
            {
                xtype: 'button',
                id: 'btn_cad',
                text: 'Cadastrar',
                iconCls: 'icon-accept',
                handler: function() {

                    var pGrid = Ext.getCmp('gridLocAd');
                    var sStore = pGrid.getStore();
                    var selectedRecords = pGrid.getSelectionModel().getSelection();
                    var comboUso = Ext.getCmp('usuCombo').getValue();
                    var comboUni = Ext.getCmp('uniCombo').getValue();
                    var comboReg = Ext.getCmp('regCombo').getValue();
                                        

                        Ext.Ajax.request({
                            url: '/php/InsLocalAdicional.php',
                            method: 'get',
                            params: {

                                numcad: comboUso,
                                unid: comboUni,
                                reg: comboReg

                            },
                            success: function(response) {

                                var result = Ext.JSON.decode(response.responseText);
                                if (result == 0) {

                                    Ext.Msg.alert('Mensagem', 'Já existe um local adicional para este colaborador.');

                                } else
                                if (result == 1) {

                                    Ext.Msg.alert('Mensagem', 'Local adicional cadastrado.');
                                }

                            },
                            failure: function() {

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

                        Ext.getCmp('locad').destroy();
                    }
                }
            }

        ]
    }],
    listeners: {
        beforerender: function() {
            

        },
        beforeclose: function() {

            Ext.getCmp('locad').destroy();

        }

    }

});