Ext.Loader.setConfig({
    enabled: true
});
var cellEditing = Ext.create('Ext.grid.plugin.CellEditing', {
    clicksToEdit: 3
});
//var sm = Ext.create('Ext.selection.CheckboxModel');

Ext.define('desloc.view.SitPlanejamento', {
    //renderTo: Ext.getBody(),
    extend: 'Ext.window.Window',
    alias: 'widget.sitpla',
    title: 'Alterar Situação do Planejamento',
    height: 550,
    width: 320,
    //x: 5,
    //y: 10,
    autoScroll: true,
    id: 'sitpla',
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
            width:  320,
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
                        }
                    ]
                }
            ]
        }
        //colocar o próximo form
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
                    var comboMes = Ext.getCmp('mesCombo').getValue();
                    var comboAno = Ext.getCmp('anoCombo').getValue();

                    var aStore = pGrid.getStore();
                    aStore.load({
                        params: {
                            mat: comboUso,
                            und: comboUni,
                            reg: comboReg,
                            mes: comboMes,
                            ano: comboAno
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
                    var comboMes = Ext.getCmp('mesCombo').reset();
                    var comboAno = Ext.getCmp('anoCombo').reset();
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
                        Ext.getCmp('sitpla').destroy();
                    }
                }
            }

        ]
    }],
    listeners: {
        beforerender: function() {

        },
        beforeclose: function() {
            Ext.getCmp('sitpla').destroy();
        }

    }

});
