Ext.Loader.setConfig({
    enabled: true
});
var cellEditing = Ext.create('Ext.grid.plugin.CellEditing', {
    clicksToEdit: 3
});
//var sm = Ext.create('Ext.selection.CheckboxModel');

Ext.define('desloc.view.AdmValores', {
    //renderTo: Ext.getBody(),
    extend: 'Ext.window.Window',
    alias: 'widget.admvlr',
    title: 'Gerenciar Valores',
    height: 550,
    width: 920,
    //x: 5,
    //y: 10,
    autoScroll: true,
    id: 'admvlr',
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
                        }

                    ]
                }

            ]

        },
        {
            xtype: 'grid',
            id: 'gridAdm',
            height: 400,
            selModel: 'cellmodel',
            /*selModel: {
                selType: 'checkboxmodel',
                mode: 'MULTI'
            },*/ //sm,
            layout: 'fit',
            store: Ext.create('desloc.store.AdmValorS'),
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
                    dataIndex: 'datref',
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
                    dataIndex: 'matfun',
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
                    header: 'local',
                    width: 180,
                    dataIndex: 'nomloc',
                    menuDisabled: true
                },
                {
                    header: 'Planejado',
                    dataIndex: 'vlrpla',
                    menuDisabled: true,
                    //summaryType: 'sum',
                    renderer: function(val) {
                        var metodo = Ext.util.Format.maskRenderer('R$ #9.999.990,00', true);
                        if (val.length > 1) {
                            metodo = Ext.util.Format.maskRenderer('R$ #9.999.990,00', true);
                        }
                        return metodo(val);
                    }
                },
                {
                    header: 'Recebido',
                    dataIndex: 'vlrrec',
                    menuDisabled: true,
                    //summaryType: 'sum',
                    renderer: function(val) {
                        var metodo = Ext.util.Format.maskRenderer('R$ #9.999.990,00', true);
                        if (val.length > 1) {
                            metodo = Ext.util.Format.maskRenderer('R$ #9.999.990,00', true);
                        }
                        return metodo(val);
                    }
                },
                {
                    header: 'Prestado',
                    dataIndex: 'vlrpre',
                    menuDisabled: true,
                    //summaryType: 'sum',
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
                    //summaryType: 'sum',
                    renderer: function(val) {
                        var metodo = Ext.util.Format.maskRenderer('R$ #9.999.990,00', true);
                        if (val.length > 1) {
                            metodo = Ext.util.Format.maskRenderer('R$ #9.999.990,00', true);
                        }
                        return metodo(val);
                    }
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
                id: 'btn_excel',
                text: 'Exportar',
                iconCls: 'icon-excel',
                hrefTarget: "_blank",
                href: 'https://novoprossiga.inec.org.br/php/gerExcelAdVal.php',
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

                        Ext.getCmp('admvlr').destroy();
                    }
                }
            }

        ]
    }],
    listeners: {
        beforerender: function() {

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

            Ext.getCmp('admvlr').destroy();

        }

    }

});
