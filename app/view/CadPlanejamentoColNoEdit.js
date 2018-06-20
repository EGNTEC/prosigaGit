Ext.Loader.setConfig({
    enabled: true
});
var cellEditing = Ext.create('Ext.grid.plugin.CellEditing', {
    clicksToEdit: 1
});
var sm = Ext.create('Ext.selection.CheckboxModel');
var model = Ext.create('desloc.model.InsCadPlanM');
var storePlaCole = Ext.create('Ext.data.Store', {

    //autoDestroy: true,
    //autoLoad: true,
    model: 'desloc.model.InsCadPlanM',

    proxy: {
        type: 'ajax',
        //url:'/teste/php/ListCadPlan.php',

        api: {

            read: '/php/Planejamento/ListCadPlan.php',
            create: '/php/Planejamento/InsCadPlan.php',
            destroy: '/php/Planejamento/DelCadPlan.php'

        },

        reader: {
            type: 'json',
            root: 'data'
        },

        writer: {
            type: 'json',
            root: 'data',
            writerAllFields: true,
            encode: true,
            allowSingle: false
        }
    }

});

Ext.define('desloc.view.CadPlanejamentoColNoEdit', {
    //renderTo: Ext.getBody(),
    extend: 'Ext.window.Window',
    alias: 'widget.cadplancoleEd',
    width: 990, //990
    height: 550, //680
    title: 'Cadastrar Planejamento',
    iconCls: 'icon-grid',
    //x:5,
    //y:38,
    autoScroll: true,
    id: 'cadplancoleEd',
    layout: 'fit',
    align: 'stretch',
    modal: true,
    resizable: 'true',
    maximizable: 'true',
    //minimizable:'true',
    frame: true,
    autoScroll: false,
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

    items: [

        {
            xtype: 'gridpanel',
            id: 'gridplcoleEd',
            height: 490,
            selModel: 'CellModel',
            layout: 'fit',
            store: storePlaCole,
            //mouseWheelEnabled: false,
            features: [{
                ftype: 'summary'
            }],
            frame: true,
            columns: [

                {
                    header: 'Id Abertura',
                    id: 'seqplacEd',
                    name: 'seqplacEd',
                    dataIndex: 'seqpla',
                    hidden: true,
                    menuDisabled: true
                },
                {
                    header: 'Id',
                    dataIndex: 'numseq',
                    hidden: true,
                    menuDisabled: true,
                    id: 'numseqcEd'
                },
                {
                    xtype: 'datecolumn',
                    header: 'Deslocamento',
                    id: 'datdesplancEd',
                    menuDisabled: true,
                    name: 'datdescEd',
                    dataIndex: 'datdes',
                    width: 135,
                    summaryRenderer: function() {
                        return 'Total:'
                    },
                    renderer: Ext.util.Format.dateRenderer('d/m/Y')
                },
                {
                    xtype: 'numbercolumn',
                    header: 'KM',
                    name: 'qtdkmEd',
                    id: 'qtdkmplancEd',
                    dataIndex: 'qtdkm',
                    menuDisabled: true,
                    hideTrigger: true,
                    summaryType: 'sum',
                    renderer: function(valor) {
                        var metodo = Ext.util.Format.maskRenderer('', true);

                        if (valor.length > 1) {

                            metodo = Ext.util.Format.maskRenderer('', true);
                        }

                        return metodo(valor);
                    }
                },
                {
                    xtype: 'numbercolumn',
                    header: 'Valor',
                    dataIndex: 'valpass',
                    id: 'valpassplancEd',
                    name: 'valpasscEd',
                    menuDisabled: true,
                    renderer: function(valor) {
                        var metodo = Ext.util.Format.maskRenderer('R$ #9.999.990,00', true);

                        if (valor.length > 1) {

                            metodo = Ext.util.Format.maskRenderer('R$ #9.999.990,00', true);
                        }

                        return metodo(valor);
                    }
                },
                {
                    xtype: 'numbercolumn',
                    header: 'Total',
                    name: 'vlrdesplancEd',
                    menuDisabled: true,
                    id: 'vlrdesplancEd',
                    mouseWheelEnabled: false,
                    dataIndex: 'vlrdes',
                    summaryType: 'sum',
                    summaryRenderer: function(value) {

                        //return Ext.String.format('Total R$ {0}', parseFloat(value));
                        var metodo = Ext.util.Format.maskRenderer('R$ #9.999.990,00', true);
                        //metodo = Ext.util.CSS.createStyleSheet('color:red','value');
                        if (value.length > 1) {

                            metodo = Ext.util.Format.maskRenderer('R$ #9.999.990,00', true);
                        }

                        return metodo(value);

                    },
                    renderer: function(valor) {
                        var metodo = Ext.util.Format.maskRenderer('R$ #9.999.990,00', true);

                        if (valor.length > 1) {

                            metodo = Ext.util.Format.maskRenderer('R$ #9.999.990,00', true);
                        }

                        return metodo(valor);
                    },
                    //format: 'R$0,00',
                    width: 130
                        /*editor:{
                           xtype: 'numberfield'
                        }*/
                },
                {
                    header: 'Trajeto a percorrer',
                    dataIndex: 'destra',
                    id: 'destracEd',
                    flex: 1,
                    menuDisabled: true
                }

            ], //Fim das colunas da grid
            tbar: [

                {
                    xtype: 'label',
                    text: 'Matricula:',
                    style: {

                        fontWeight: 'bold'
                    }
                    //margin: '0 0 0 10'
                },
                {
                    xtype: 'label',
                    id: 'resMatricula'
                },
                {
                    xtype: 'label',
                    text: 'Nome:',
                    style: {

                        fontWeight: 'bold'
                    }
                },
                {
                    xtype: 'label',
                    id: 'resNome'
                },
                {
                    xtype: 'label',
                    text: 'Local:',
                    style: {

                        fontWeight: 'bold'
                    }
                },
                {
                    xtype: 'label',
                    id: 'resLocal'
                },
                {
                    xtype: 'label',
                    text: 'Referência:',
                    style: {

                        fontWeight: 'bold'
                    }
                },
                {
                    xtype: 'label',
                    id: 'resPeriodo'
                }

            ], //fim do elemento barra superior
            bbar: [

                {
                    xtype: 'button',
                    id: 'btSaircol',
                    text: 'Sair',
                    iconCls: 'icon-sair',
                    style: {
                        //margin: '0 0 0 700'
                    },
                    listeners: {
                        click: function() {
                            Ext.getCmp('cadplancoleEd').close();
                        }
                    }
                }

            ], //fim do elemento barra inferior
        }
    ],
    //
    /*dockedItems: [{
        xtype: 'toolbar',
        dock: 'bottom',
        items: [

        ]
    }],*/
    listeners: {

        //Acrecentar funções da janela

        beforerender: function() {

            var jPanelGridPlan = Ext.getCmp('gridplan');
            var selectedRecords = jPanelGridPlan.getSelectionModel().getSelection();
            var gStore = jPanelGridPlan.getStore();

            vValtrp = selectedRecords[0].get("vlrtrp");
            vSeqpla = selectedRecords[0].get("numseq");
            vTiptrp = selectedRecords[0].get("tiptrp");
            vNumcad = selectedRecords[0].get("numcad");
            vNomfun = selectedRecords[0].get("nomfun");
            vNomloc = selectedRecords[0].get("nomloc");
            vStspla = selectedRecords[0].get("stspla");
            vDatpla = selectedRecords[0].get("datpla");
            vdata = selectedRecords[0].get("data");
            var comboUso = Ext.getCmp('usuCombo');
            comboSts = Ext.getCmp('statusCombo');
            situacao = comboSts.getValue();

            storePlaCole.load({
                params: { numseq: vSeqpla, tiptrp: vTiptrp, numcad: vNumcad }
            });


            //var vCol4 = Ext.getCmp("valpassplanc");
            var vCol3 = Ext.getCmp("qtdkmplancEd");

            //Tratamento para setar valores no cabeçalho
            Ext.getCmp('resMatricula').setText(vNumcad);
            Ext.getCmp('resNome').setText(vNomfun);
            Ext.getCmp('resLocal').setText(vNomloc);
            Ext.getCmp('resPeriodo').setText(vDatpla);
            Ext.getCmp('btSaircol').show();

            //Tratamento Nome coluna KM / QTD PASS
            if (vTiptrp === 2) {
                //var cGrid = Ext.getCmp('gridplcole');
                //vCol4.show();
                vCol3.setText('Passagens');
            }
            //fim do tratamento

            //Tratamento para reload da grid ao abrir janela.
            /**/
            var tGrid = Ext.getCmp('gridplan');
            var tStore = tGrid.getStore();
            var usuario = Ext.getCmp('usuCombo').getValue();

            tStore.load({
                params: {
                    mat: usuario,
                    //btn:0
                    botao: 1
                }
            });
        },
        beforeclose: function() {
            //Tratamento ao fechar janela de cadastro de planejamento,
            //o reload da grid de abertura deve obedecer o valor da
            //situação.

            //Tratamento para reload da grid ao fechar janela.
            var tGrid = Ext.getCmp('gridplan');
            var tStore = tGrid.getStore();
            var usu = Ext.getCmp('usuCombo').getValue();

            tStore.load({
                params: {
                    mat: usu,
                    //btn:0
                    botao: 1
                }
            });
        },
        maximize: function(window, opts) {

            Ext.getCmp('btSaircol').setMargin('0 0 0 990');
        }

    }
});
