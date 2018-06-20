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
    autoLoad: true,
    model: 'desloc.model.InsCadPlanM',

    proxy: {
        type: 'ajax',
        //url:'/php/ListCadPlan.php',

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

Ext.define('desloc.view.CadPlanejamentoCol', {
    //renderTo: Ext.getBody(),
    extend: 'Ext.window.Window',
    alias: 'widget.cadplancole',
    width: 990,//990
    height: 550,//680
    title: 'Cadastrar Planejamento',
    iconCls: 'icon-grid',
    //x:5,
    //y:38,
    autoScroll: true,
    id: 'cadplancole',
    layout: 'fit',
    align: 'stretch',
    modal: true,
    resizable: 'true',
    maximizable:'true',
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
            id: 'gridplcole',
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
                    id: 'seqplac',
                    name: 'seqplac',
                    dataIndex: 'seqpla',
                    hidden: true,
                    menuDisabled: true,
                    editor: {
                        //defaults to textfield if no xtype is supplied
                        allowBlank: false
                    }
                },
                {
                    header: 'Id',
                    dataIndex: 'numseq',
                    hidden: true,
                    menuDisabled: true,
                    id: 'numseqc',
                    editor: {
                        // defaults to textfield if no xtype is supplied
                        allowBlank: false
                    }
                },
                {
                    xtype: 'datecolumn',
                    header: 'Deslocamento',
                    id: 'datdesplanc',
                    menuDisabled: true,
                    name: 'datdesc',
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
                    name: 'qtdkm',
                    id: 'qtdkmplanc',
                    dataIndex: 'qtdkm',
                    menuDisabled: true,
                    hideTrigger: true,
                    summaryType: 'sum',
                    //flex: 1,
                    editor: {
                        xtype: 'numberfield',
                        id: 'kmc',
                        allowBlank: false,
                        minValue: 0,
                        //step: 0,
                        enableKeyEvents: true,
                        hideTrigger: true,
                        keyNavEnabled: false,
                        mouseWheelEnabled: false,
                        selectOnFocus: true,
                        sortable: true,
                        mouseWheelEnabled: false,
                        //maxValue: 1000,
                        listeners: {

                            change: function(field, value) {
                                value = parseInt(value, 10);
                                field.setValue(value);

                            },

                            keyup: function() {

                                var jPanelGrid = Ext.getCmp('gridplcole');
                                var sStore = jPanelGrid.getStore();
                                var selectedRecords = jPanelGrid.getSelectionModel().getSelection();
                                var rowSelected = jPanelGrid.view.getSelectionModel().getCurrentPosition().row;
                                var vDatdes = selectedRecords[0].get("datdesc");
                                var vFSem = Ext.Date.format(vDatdes, 'N');
                                var vMDif = Ext.Date.format(vDatdes, 'm/Y');
                                var seqnum = selectedRecords[0].get("numseq");
                                var vQtkmC = Ext.getCmp('kmc').getValue();
                                //var vDescCmp = Ext.getCmp('des').getValue();
                                var vQtkmE = Ext.getCmp('kmc');
                                var vDescE = Ext.getCmp('des');
                                var vQtdkm = selectedRecords[0].get("qtdkm");
                                var vQtPassC = selectedRecords[0].get("valpass");
                                var vDesc = selectedRecords[0].get("destra");
                                //gDescricao = vDesc;
                                //alert(vQtkmC); g_QtdkmE
                                g_QtdkmC = vQtdkm;
                                g_Qtdkm = vQtkmC;
                                g_Valpass = vQtPassC;
                                g_LinhAnt = rowSelected;
                                g_QtdkmE = vQtkmE;
                                g_Desc = vDesc;
                                g_DescE = vDescE;
                                //g_DescCmp = vDescCmp;

                                //alert(g_Qtdkm);
                                if (g_Qtdkm == null) {
                                    g_Qtdkm = 0;
                                    //alert(g_Qtdkm);
                                }

                                // Tratamento para evitar valores negativos(Qtd passagem)
                                if (vQtkmC < 0) {

                                    vQtkmC = vQtkmC * (-1);
                                    field.setValue(vQtkmC);
                                }

                                //cálculo do deslocamento
                                if (vQtkmC === null || vQtkmC == 0) {
                                    vQtkmE.setValue(0);
                                    //console.log(vQtkmC);

                                    //var Total = parseInt(0) * parseFloat(vQtPassC);
                                    var Total = 0;
                                    selectedRecords[0].set("vlrdes", parseFloat(Total));
                                    //selectedRecords[0].set("valpass", 0);
                                    //selectedRecords[0].set("destra", ".");

                                } else {

                                    var Total = parseInt(vQtkmC) * parseFloat(vQtPassC);
                                    selectedRecords[0].set("vlrdes", parseFloat(Total));
                                }


                            }, //Fim do keyup
                            specialkey: function(field, e) {

                                    var jPanelGrid = Ext.getCmp('gridplcole');
                                    var sStore = jPanelGrid.getStore();
                                    var selectedRecords = jPanelGrid.getSelectionModel().getSelection();
                                    //var rowSelected = jPanelGrid.view.getSelectionModel().getCurrentPosition().row;
                                    var vDatdes = selectedRecords[0].get("datdesc");
                                    var vFSem = Ext.Date.format(vDatdes, 'N');
                                    var vMDif = Ext.Date.format(vDatdes, 'm/Y');
                                    var seqnum = selectedRecords[0].get("numseq");
                                    var vQtkmC = Ext.getCmp('kmc').getValue();
                                    var vQtkmE = Ext.getCmp('kmc');
                                    var vQtdkm = selectedRecords[0].get("qtdkm");
                                    var vQtPassC = selectedRecords[0].get("valpass");

                                    var models = jPanelGrid.getStore().getRange();

                                    if (e.getKey() == 9 && e.shiftKey) {
                                        //return false;
                                    }

                                    if (e.getKey() == 27) {
                                        return false;
                                        Ext.getCmp('cadplancole').close();
                                    }

                                    switch (e.getKey()) {

                                        //case e.ESC:

                                        /*g_Qtdkm = g_QtdkmC;

                                        var Total = parseInt(vQtdkm) * parseFloat(vQtPassC);
                                        selectedRecords[0].set("vlrdes", parseFloat(Total));
                                        selectedRecords[0].set("destra", gDescricao);

                                        /*Ext.Ajax.request({
                                            url: '/php/Planejamento/esc.php', gDescricao
                                            params: {
                                                action: 'post',
                                                id: seqnum
                                            },
                                            success: function(response, opts) {
                                                var result = Ext.JSON.decode(response.responseText);
                                                var km = result[0].km;
                                                //var val = result[0].valor;
                                                var valpas = result[0].valpass;

                                                //console.log('sucesso!');

                                                val = vQtPassC * km;

                                                selectedRecords[0].set("vlrdes", parseFloat(val));
                                                selectedRecords[0].set("qtdkm", parseFloat(km));
                                                selectedRecords[0].set("valpass", parseFloat(valpas));

                                            },
                                            failure: function() {
                                                //Ext.Msg.alert('Mensagem','Problemas na base!');
                                                //console.log('Erro no retorno da informação.');

                                            }

                                        });*/

                                        //break;

                                        case e.TAB:

                                            //alert(vQtPassC);
                                            //alert(vQtkmC);
                                            //alert(g_Valpass);
                                            //alert(g_Qtdkm);
                                            //alert(vQtdkm);
                                            //alert(g_LinhAnt);

                                            if ((g_Valpass > 0 && g_Qtdkm == null)) {

                                                var tot = parseInt(vQtdkm) * parseFloat(g_Valpass);

                                                models[g_LinhAnt].set("vlrdes", parseFloat(tot));
                                                models[g_LinhAnt].set("qtdkm", parseInt(vQtdkm));
                                                models[g_LinhAnt].set("valpass", parseFloat(g_Valpass));
                                            }


                                            if ((vQtPassC == 0 && vQtdkm != 0)) {
                                                //alert('Passou');
                                                selectedRecords[0].set("vlrdes", 0);
                                                selectedRecords[0].set("qtdkm", 0);
                                                selectedRecords[0].set("valpass", 0);

                                            }

                                            // Tratamento para evitar valores negativos(Qtd passagem)
                                            if (vQtkmC < 0) {

                                                vQtkmC = vQtkmC * (-1);
                                                //field.setValue(vQtkmC);
                                            }

                                            break;

                                        case e.ENTER:

                                            e.keyCode = e.TAB;
                                            //return false;

                                            if ((g_Valpass > 0 && g_Qtdkm == null)) {

                                                var tot = parseInt(vQtdkm) * parseFloat(g_Valpass);

                                                models[g_LinhAnt].set("vlrdes", parseFloat(tot));
                                                models[g_LinhAnt].set("qtdkm", parseInt(vQtdkm));
                                                models[g_LinhAnt].set("valpass", parseFloat(g_Valpass));
                                            }

                                            if ((vQtPassC == 0 && vQtdkm != 0)) {
                                                //alert('Passou');
                                                selectedRecords[0].set("vlrdes", 0);
                                                selectedRecords[0].set("qtdkm", 0);
                                                selectedRecords[0].set("valpass", 0);
                                            }
                                            // Tratamento para evitar valores negativos(Qtd passagem)
                                            if (vQtkmC < 0) {

                                                vQtkmC = vQtkmC * (-1);
                                                //field.setValue(vQtkmC);
                                            }

                                            break;
                                    }

                                } //Fim do special
                                ,
                            blur: function() {

                                var jPanelGrid = Ext.getCmp('gridplcole');
                                var sStore = jPanelGrid.getStore();
                                var selectedRecords = jPanelGrid.getSelectionModel().getSelection();
                                var vDatdes = selectedRecords[0].get("datdesc");
                                var vFSem = Ext.Date.format(vDatdes, 'N');
                                var vMDif = Ext.Date.format(vDatdes, 'm/Y');
                                var seqnum = selectedRecords[0].get("numseq");
                                var vQtkmC = Ext.getCmp('kmc').getValue();
                                var vQtkmE = Ext.getCmp('kmc');
                                var vQtdkm = selectedRecords[0].get("qtdkm");
                                var vQtPassC = selectedRecords[0].get("valpass");

                                var models = jPanelGrid.getStore().getRange();

                                //alert(g_LinhAnt);
                                //alert(g_Valpass);
                                //alert(g_Qtdkm);
                                //alert(g_QtdkmE);

                                /*if((g_Qtdkm!=0 && g_Valpass==0) || (g_Qtdkm!=0 && g_Valpass!=0 && g_Desc==" ")){

                          models[g_LinhAnt].set("vlrdes",0);
                          models[g_LinhAnt].set("valpass",0);
                          models[g_LinhAnt].set("qtdkm",0);

                          if(g_Qtdkm!=0){

                             g_QtdkmE.setValue(0);
                          }

                       }*/
                            }, //Fim do blur
                            focus: function() {

                                var jPanelGrid = Ext.getCmp('gridplcole');
                                var sStore = jPanelGrid.getStore();
                                var selectedRecords = jPanelGrid.getSelectionModel().getSelection();
                                var rowSelected = jPanelGrid.view.getSelectionModel().getCurrentPosition().row;
                                var vDatdes = selectedRecords[0].get("datdesc");
                                var vFSem = Ext.Date.format(vDatdes, 'N');
                                var vMDif = Ext.Date.format(vDatdes, 'm/Y');
                                var seqnum = selectedRecords[0].get("numseq");
                                var vQtkmC = Ext.getCmp('kmc').getValue();
                                //var vDescCmp = Ext.getCmp('des').getValue();
                                var vQtkmE = Ext.getCmp('kmc');
                                var vDescE = Ext.getCmp('des');
                                var vQtdkm = selectedRecords[0].get("qtdkm");
                                var vQtPassC = selectedRecords[0].get("valpass");
                                var vDesc = selectedRecords[0].get("destra");
                                gDescricao = vDesc;
                                //alert(vQtkmC); g_QtdkmE
                                g_QtdkmC = vQtdkm;
                                g_Qtdkm = vQtkmC;
                                g_Valpass = vQtPassC;
                                g_LinhAnt = rowSelected;
                                g_QtdkmE = vQtkmE;
                                g_Desc = vDesc;
                                g_DescE = vDescE;
                            }
                        }
                    },
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
                    id: 'valpassplanc',
                    name: 'valpassc',
                    menuDisabled: true,
                    editor: {
                        xtype: 'numberfield',
                        id: 'passc',
                        plugins: 'textmask',
                        mask: 'R$ #9.999.990,00', //R$ #9.999.990,00
                        money: true,
                        minValue: 0,
                        maxValue: 10000,
                        allowBlank: false,
                        enableKeyEvents: true,
                        hideTrigger: true,
                        keyNavEnabled: false,
                        mouseWheelEnabled: false,
                        selectOnFocus: true,
                        listeners: {
                            keyup: function() {

                                var jPanelGrid = Ext.getCmp('gridplcole');
                                var sStore = jPanelGrid.getStore();
                                var selectedRecords = jPanelGrid.getSelectionModel().getSelection();
                                var rowSelected = jPanelGrid.view.getSelectionModel().getCurrentPosition().row;
                                var vQtkmCol = selectedRecords[0].get("qtdkm");
                                var vQtPassCol = Ext.getCmp('passc').getValue();
                                //var vDescCmp = Ext.getCmp('des').getValue();
                                var vQtPas = Ext.getCmp('passc');
                                var vQtPassC = selectedRecords[0].get("valpass");
                                var vDesc = selectedRecords[0].get("destra");
                                var vDescE = Ext.getCmp('des');

                                g_LinhAnt = rowSelected;
                                g_Qtdkm = vQtkmCol;
                                g_Valpass = vQtPassCol;
                                g_QtdkmE = vQtkmCol;
                                g_ValpassE = vQtPassC;
                                g_CvlrSet = vQtPas;
                                g_Desc = vDesc;
                                g_DescE = vDescE;
                                //g_DescCmp = vDescCmp;

                                //gDescricao = vDesc;

                                // Tratamento para evitar valores negativos(vlr passagem)
                                if (vQtPassCol < 0) {

                                    vQtPassCol = vQtPassCol * (-1);
                                    //field.setValue(vQtPassCol);
                                }

                                //cálculo do deslocamento
                                if (vQtPassCol === null || vQtPassCol == 0) {
                                    vQtPas.setValue('');

                                    var Total = 0;
                                    selectedRecords[0].set("vlrdes", parseFloat(Total));

                                } else {

                                    var Total = parseInt(vQtkmCol) * parseFloat(vQtPassCol);
                                    selectedRecords[0].set("vlrdes", parseFloat(Total));
                                }

                            }, //Fim do keyup
                            specialkey: function(field, e) {

                                    var jPanelGrid = Ext.getCmp('gridplcole');
                                    var sStore = jPanelGrid.getStore();
                                    var selectedRecords = jPanelGrid.getSelectionModel().getSelection();
                                    var vDatdes = selectedRecords[0].get("datdesc");
                                    var vFSem = Ext.Date.format(vDatdes, 'N');
                                    var vMDif = Ext.Date.format(vDatdes, 'm/Y');
                                    var seqnum = selectedRecords[0].get("numseq");
                                    //var vQtkmC = Ext.getCmp('kmc').getValue();
                                    var vQtPas = Ext.getCmp('passc').getValue(); //valor editado.
                                    var vQtPasE = Ext.getCmp('passc');
                                    var vQtk = selectedRecords[0].get("qtdkm");
                                    var vQtPassC = selectedRecords[0].get("valpass"); //valor grid.
                                    var vVlrDe = selectedRecords[0].get("vlrdes");
                                    var vDesT = selectedRecords[0].get("destra");

                                    var vQtPC = Ext.getCmp('passc');

                                    if (e.getKey() == 27) {
                                        return false;
                                        Ext.getCmp('cadplancole').close();
                                    }

                                    switch (e.getKey()) {

                                        //case e.ESC:

                                        /*g_Valpass = g_ValpassE;

                                        var Total = parseInt(vQtk) * parseFloat(vQtPassC);
                                        selectedRecords[0].set("vlrdes", parseFloat(Total));
                                        selectedRecords[0].set("destra", gDescricao);*/

                                        //if (vQtPas === null && vQtk > 0) {

                                        /*var Tot = parseFloat(vQtPassC) * parseInt(vQtk);
                                        selectedRecords[0].set("valpass", parseFloat(vQtPassC));
                                        selectedRecords[0].set("qtdkm", parseInt(vQtk));
                                        selectedRecords[0].set("vlrdes", parseFloat(Tot));
                                        */
                                        /*Ext.Ajax.request({
                                            url: '/php/Planejamento/esc.php',
                                            params: {
                                                action: 'post',
                                                id: seqnum
                                            },
                                            success: function(response, opts) {
                                                var result = Ext.JSON.decode(response.responseText);
                                                var km = result[0].km;
                                                //var val = result[0].valor;
                                                var valpas = result[0].valpass;

                                                //console.log('sucesso!');

                                                val = vQtPassC * km;

                                                selectedRecords[0].set("vlrdes", parseFloat(val));
                                                selectedRecords[0].set("qtdkm", parseFloat(km));
                                                selectedRecords[0].set("valpass", parseFloat(valpas));

                                            },
                                            failure: function() {
                                                //Ext.Msg.alert('Mensagem','Problemas na base!');
                                                //console.log('Erro no retorno da informação.');

                                            }

                                        });*/
                                        // }

                                        // break;

                                        case e.TAB:

                                            //alert(vQtPas);
                                            //alert(vQtk);
                                            //alert(vQtPassC);

                                            if (vQtPas == 0 && vQtk != 0) {

                                                selectedRecords[0].set("vlrdes", 0);
                                                selectedRecords[0].set("qtdkm", 0);
                                                selectedRecords[0].set("valpass", 0);
                                                selectedRecords[0].set("destra", '');
                                            }

                                            if (vQtPas === null && vQtk > 0) {

                                                var Tot = parseFloat(vQtPassC) * parseInt(vQtk);
                                                selectedRecords[0].set("valpass", parseFloat(vQtPassC));
                                                selectedRecords[0].set("qtdkm", parseInt(vQtk));
                                                selectedRecords[0].set("vlrdes", parseFloat(Tot));
                                            }

                                            if ((vQtPassC > 0 && vQtk == 0) /*|| (vQtk != 0 && vQtPas==0)*/ ) {

                                                selectedRecords[0].set("vlrdes", 0);
                                                selectedRecords[0].set("qtdkm", 0);
                                                selectedRecords[0].set("valpass", 0);
                                            }

                                            //Tratamento para evitar valores negativos(Qtd passagem)
                                            if (vQtPas < 0) {

                                                vQtPas = vQtPas * (-1);
                                                //field.setValue(vQtkmC);
                                            } else
                                            //Tratamento para evitar valor null
                                            if (vQtPas === null || vQtPas == 0) {

                                                var Total = 0;
                                                //selectedRecords[0].set("vlrdes",parseFloat(Total));
                                            }

                                            //selectedRecords[0].set("valpass",parseFloat(vQtPas));

                                            break;

                                        case e.ENTER:

                                            e.keyCode = e.TAB;
                                            //return false;

                                            if (vQtPas == 0 && vQtk != 0) {

                                                selectedRecords[0].set("vlrdes", 0);
                                                selectedRecords[0].set("qtdkm", 0);
                                                selectedRecords[0].set("valpass", 0);
                                                selectedRecords[0].set("destra", '');
                                            }

                                            if (vQtPas === null && vQtk > 0) {

                                                var Tot = parseFloat(vQtPassC) * parseInt(vQtk);
                                                selectedRecords[0].set("valpass", parseFloat(vQtPassC));
                                                selectedRecords[0].set("qtdkm", parseInt(vQtk));
                                                selectedRecords[0].set("vlrdes", parseFloat(Tot));
                                            }

                                            if ((vQtPassC > 0 && vQtk == 0) /*|| (vQtk != 0 && vQtPas==0)*/ ) {

                                                selectedRecords[0].set("vlrdes", 0);
                                                selectedRecords[0].set("qtdkm", 0);
                                                selectedRecords[0].set("valpass", 0);
                                            }

                                            //Tratamento para evitar valores negativos(Qtd passagem)
                                            if (vQtPas < 0) {

                                                vQtPas = vQtPas * (-1);
                                                //field.setValue(vQtkmC);
                                            } else
                                            //Tratamento para evitar valor null
                                            if (vQtPas === null || vQtPas == 0) {

                                                var Total = 0;
                                                //selectedRecords[0].set("vlrdes",parseFloat(Total));
                                            }

                                            break;
                                    }

                                } //Fim do special
                                ,
                            blur: function() {

                                    var jPanelGrid = Ext.getCmp('gridplcole');
                                    var sStore = jPanelGrid.getStore();
                                    var selectedRecords = jPanelGrid.getSelectionModel().getSelection();
                                    var seqnum = selectedRecords[0].get("numseq");
                                    var vQtPas = Ext.getCmp('passc').getValue();
                                    var vQtk = selectedRecords[0].get("qtdkm");
                                    var vQtPassC = selectedRecords[0].get("valpass");
                                    var vQtPC = Ext.getCmp('passc');
                                    var models = jPanelGrid.getStore().getRange();

                                    //alert(g_Valpass);
                                    //alert(g_Qtdkm);

                                    if (g_Valpass === null && g_Qtdkm > 0) {

                                        //alert(g_ValpassE);
                                        //alert(g_Qtdkm);

                                        var Tot = parseFloat(g_ValpassE) * parseInt(g_Qtdkm);
                                        models[g_LinhAnt].set("valpass", parseFloat(g_ValpassE));
                                        models[g_LinhAnt].set("qtdkm", parseInt(g_Qtdkm));
                                        models[g_LinhAnt].set("vlrdes", parseFloat(Tot));

                                    }

                                    /*if((g_Valpass != 0 && g_Qtdkm == 0) || (g_Qtdkm != 0 && g_Valpass==0)
                                        || (g_Valpass != 0 && g_Qtdkm == 0 && g_Desc==" ")

                                     ){

                                         models[g_LinhAnt].set("vlrdes",0);
                                         models[g_LinhAnt].set("qtdkm",0);
                                         models[g_LinhAnt].set("valpass",0);

                                         if(g_Valpass!=0){

                                            g_CvlrSet.setValue(0);
                                         }
                                     }*/
                                } //Fim do blur

                        }
                    },
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
                    name: 'vlrdesplanc',
                    menuDisabled: true,
                    id: 'vlrdesplanc',
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
                    id: 'destrac',
                    flex: 1,
                    menuDisabled: true,
                    editor: {
                        id: 'des',
                        allowBlank: true,
                        mouseWheelEnabled: false,
                        enableKeyEvents: true,
                        listeners: {

                            specialkey: function(field, e) {

                                    var jPanelGrid = Ext.getCmp('gridplcole');
                                    var sStore = jPanelGrid.getStore();
                                    var selectedRecords = jPanelGrid.getSelectionModel().getSelection();
                                    var models = jPanelGrid.getStore().getRange();
                                    var rowSelected = jPanelGrid.view.getSelectionModel().getCurrentPosition().row;
                                    //var vQtPas = Ext.getCmp('passc').getValue(); //valor editado.
                                    var vQtk = selectedRecords[0].get("qtdkm");
                                    var vQtPassC = selectedRecords[0].get("valpass"); //valor grid.
                                    var vVlrDe = selectedRecords[0].get("vlrdes");
                                    var vDesT = selectedRecords[0].get("destra");
                                    var vDescCmp = Ext.getCmp('des').getValue();
                                    var desc = Ext.getCmp('des');

                                    if (e.getKey() == 27) {
                                        return false;
                                        Ext.getCmp('cadplancole').close();
                                    }

                                    switch (e.getKey()) {

                                        /*case e.ESC:

                                            //g_Qtdkm = g_QtdkmC;

                                            if (vQtk != 0 && (vDescCmp == "" || vDescCmp == " " ||
                                                    vDesT == " " || vDesT == "")) {

                                                selectedRecords[0].set("qtdkm", 0);
                                                selectedRecords[0].set("vlrdes", 0);
                                                selectedRecords[0].set("destra", '');
                                                selectedRecords[0].set("valpass");
                                                desc.setValue('');
                                            }

                                            break;*/

                                        case e.TAB:

                                            g_Desc = vDescCmp;

                                            if (vQtk > 0 && vQtPassC > 0 && (vDescCmp == " " || vDescCmp == " ")) {

                                                selectedRecords[0].set("vlrdes", 0);
                                                selectedRecords[0].set("valpass", 0);
                                                selectedRecords[0].set("qtdkm", 0);
                                                //selectedRecords[0].set("destra","");
                                                Ext.getCmp('des').setValue("");

                                            }

                                            if (vQtk == 0 && vQtPassC > 0) {

                                                selectedRecords[0].set("vlrdes", 0);
                                                selectedRecords[0].set("valpass", 0);
                                                selectedRecords[0].set("qtdkm", 0);
                                                //selectedRecords[0].set("destra","");
                                                Ext.getCmp('des').setValue("");
                                            }
                                            if (vQtk == 0 && vQtPassC == 0) {

                                                Ext.getCmp('des').setValue("");
                                            }

                                            break;

                                        case e.ENTER:

                                            e.keyCode = e.TAB;

                                            g_Desc = vDescCmp;

                                            if (vQtk > 0 && vQtPassC > 0 && (vDescCmp == " " || vDescCmp == " ")) {

                                                selectedRecords[0].set("vlrdes", 0);
                                                selectedRecords[0].set("valpass", 0);
                                                selectedRecords[0].set("qtdkm", 0);
                                                //selectedRecords[0].set("destra","");
                                                Ext.getCmp('des').setValue("");

                                            }

                                            if (vQtk == 0 && vQtPassC > 0) {

                                                selectedRecords[0].set("vlrdes", 0);
                                                selectedRecords[0].set("valpass", 0);
                                                selectedRecords[0].set("qtdkm", 0);
                                                //selectedRecords[0].set("destra","");
                                                Ext.getCmp('des').setValue("");
                                            }
                                            if (vQtk == 0 && vQtPassC == 0) {

                                                Ext.getCmp('des').setValue("");
                                            }

                                            break;

                                    }

                                } //fim do specialkey
                                ,
                            focus: function() {

                                var jPanelGrid = Ext.getCmp('gridplcole');
                                var selectedRecords = jPanelGrid.getSelectionModel().getSelection();
                                var models = jPanelGrid.getStore().getRange();
                                var rowSelected = jPanelGrid.view.getSelectionModel().getCurrentPosition().row;
                                var vDescCmp = Ext.getCmp('des').getValue();

                                //alert(g_LinhAnt);
                                //alert(g_Valpass);
                                //alert(g_Qtdkm);
                                //alert(g_QtdkmE);
                                //g_Desc = vDescCmp;

                                //g_LinhAnt = rowSelected;


                                /*if(g_Valpass == 0 && g_Qtdkm == 0){

                                    models[g_LinhAnt].set("vlrdes",parseFloat(0));
                                    models[g_LinhAnt].set("qtdkm",parseInt(0));
                                    models[g_LinhAnt].set("valpass",parseFloat(0));
                                    models[g_LinhAnt].set("destra",'');
                                }*/

                            }, //fim do focus
                            keyup: function() {
                                var jPanelGrid = Ext.getCmp('gridplcole');
                                var sStore = jPanelGrid.getStore();
                                var selectedRecords = jPanelGrid.getSelectionModel().getSelection();
                                var rowSelected = jPanelGrid.view.getSelectionModel().getCurrentPosition().row;
                                var models = jPanelGrid.getStore().getRange();
                                var vDatdes = selectedRecords[0].get("datdesc");
                                var seqnum = selectedRecords[0].get("numseq");
                                //var vQtkmC   = Ext.getCmp('kmc').getValue();
                                var vQtkmE = Ext.getCmp('kmc');
                                var vDescE = Ext.getCmp('des');
                                var vDescC = Ext.getCmp('des').getValue();
                                var vQtdkm = selectedRecords[0].get("qtdkm");
                                var vQtPassC = selectedRecords[0].get("valpass");
                                var vDesc = selectedRecords[0].get("destra");

                                //Tratamento para orientação do prenchimento
                                if ((
                                        (vQtdkm == 0 && vQtPassC == 0) ||
                                        (vQtdkm > 0 && vQtPassC == 0) ||
                                        (vQtdkm == 0 && vQtPassC > 0)) && (vDescC != "" && vDescC != " ")) {

                                    vDescE.setValue("");
                                    selectedRecords[0].set("qtdkm", 0);
                                    selectedRecords[0].set("valpass", 0);

                                    function showResult(btn) {

                                        if (btn == 'ok') {

                                            models[rowSelected].set("destra", '');
                                        }
                                    }

                                    Ext.Msg.show({
                                        title: 'Mensagem',
                                        msg: 'Preencha primeiro a quantidade e o valor da passagem do dia.',
                                        buttons: Ext.Msg.OK,
                                        closable: false,
                                        fn: showResult
                                    });
                                }

                                /*if (vDescC == "") {

                                    vDescE.setValue("");
                                    selectedRecords[0].set("valpass", 0);
                                    selectedRecords[0].set("qtdkm", 0);
                                    selectedRecords[0].set("vlrdes", 0);

                                }*/

                                //alert(g_LinhAnt); g_Des

                                //g_Qtdkm   = vQtkmC;
                                g_Valpass = vQtPassC;
                                g_LinhAnt = rowSelected;
                                g_QtdkmE = vQtdkm; //vQtkmE
                                g_Desc = vDescC; //vDesc;
                                g_DescE = vDescE;
                                g_DescCmp = vDescC;
                                g_Qtdkm = vQtdkm;
                            }
                        }
                    }
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
                    text: 'Salvar',
                    iconCls: 'icon-save',
                    listeners: {

                        click: function() {
                            //Ext.Msg.alert('Mensagem', 'Planejamento salvo com sucesso.');
                            //Ext.getCmp('btn_fim').setDisabled(false);
                            var gGrid = Ext.getCmp('gridplcole');
                            var gStore = gGrid.getStore();
                            var selectedRecords = gGrid.getSelectionModel().getSelection();
                            //var vNumseq = selectedRecords[0].get("numseqc");

                            var vTotGrid = gStore.sum('vlrdes');
                            //console.log(parseFloat(vTotGrid));

                            //Retorna o valor do Teto e desabilita o BTN Finalizar.
                            Ext.Ajax.request({
                                url: '/php/teto.php',
                                params: {
                                    action: 'post',
                                    id: vTiptrp
                                },
                                success: function(response, opts) {
                                    var valTeto = Ext.JSON.decode(response.responseText);
                                    //console.log('sucesso!');
                                    //console.log(valTeto);
                                    //console.log(vTotGrid);

                                    if (vTotGrid > valTeto) {
                                        Ext.getCmp('btn_fim').setDisabled(true);

                                    } else {

                                        Ext.getCmp('btn_fim').setDisabled(false);
                                    }

                                },
                                failure: function() {
                                    //Ext.Msg.alert('Mensagem','Problemas na base!');
                                    console.log('Erro no retorno da informação.');
                                }

                            });
                            // Fim da Regra

                            gGrid.getSelectionModel().deselectAll();

                            parms = [];
                            var updatedRecords = gGrid.getStore().getUpdatedRecords();
                            Ext.each(updatedRecords, function(record) {
                                parms.push(record.data);
                            });

                            if (parms.length > 0) {
                                //console.log('um');
                                Ext.Ajax.request({
                                    url: '/php/Planejamento/updateCadPlan.php',
                                    params: {
                                        action: 'post',
                                        records: Ext.encode(parms),
                                        totgrid: vTotGrid,
                                        tiptrp: vTiptrp
                                    },
                                    success: function(response, opts) {
                                        var result = Ext.JSON.decode(response.responseText);
                                        console.log(result);
                                        if (result == 0) {

                                            Ext.Msg.alert('Mensagem', 'O valor total do planejamento está superior ao limite permitido. Ajuste seu planejamento.', function(btn, text) {

                                                if (btn == "ok") {

                                                    //gStore.load();
                                                }
                                            });

                                        } else
                                        if (result == 2) {

                                            gStore.load();
                                            Ext.Msg.alert('Mensagem', 'Planejamento salvo com sucesso.');
                                        } else
                                        if (result == 3) {
                                            Ext.getCmp('btn_fim').setDisabled(true);
                                            Ext.Msg.alert('Mensagem', 'Existe(m) dia(s) preenchido(s) incorretamente.');

                                        }
                                    },

                                    failure: function() {
                                        Ext.getCmp('btn_fim').setDisabled(true);
                                        Ext.Msg.alert('Mensagem', 'Problemas na base!');
                                        gStore.load();
                                    }
                                });
                            }
                            //========================================================
                            Ext.apply(gStore.getProxy().extraParams, {
                                numseq: vSeqpla,
                                tiptrp: vTiptrp
                            });

                            parms1 = [];
                            var newRecords = gGrid.getStore().getNewRecords();
                            Ext.each(newRecords, function(record) {
                                parms1.push(record.data);
                            });
                            if (parms1.length > 0) {
                                //console.log('dois');
                                Ext.Ajax.request({
                                    url: '/php/Planejamento/InsCadPlan.php',
                                    params: {
                                        action: 'post',
                                        records: Ext.encode(parms1),
                                        numseq: vSeqpla,
                                        tiptrp: vTiptrp,
                                        totgrid: vTotGrid
                                    },
                                    success: function(response) {
                                        var result = Ext.JSON.decode(response.responseText);
                                        //console.log(result);
                                        if (result == 0) {

                                            Ext.Msg.alert('Mensagem', 'O valor total do planejamento está superior ao limite permitido. Ajuste seu planejamento.', function(btn, text) {

                                                if (btn == "ok") {

                                                    //gStore.load();
                                                }
                                            });
                                        } else
                                        if (result == 1) {
                                            Ext.Msg.alert('Mensagem', 'Você incluiu o mesmo dia mais de uma vez. O sistema excluiu uma das datas!');
                                            gStore.load();

                                        } else
                                        if (result == 2) {
                                            gStore.load();
                                            //Ext.Msg.alert('Mensagem','Registro Atualizado!');
                                            Ext.Msg.alert('Mensagem', 'Planejamento salvo com sucesso.');

                                        }
                                    },
                                    failure: function() {
                                        Ext.Msg.alert('Mensagem', 'Erro ao executar a ação, consulte o administrador.');
                                        gStore.load();
                                    }

                                });

                            }
                        }
                    }
                },
                {
                    text: 'Finalizar', //O botão Fechar será renomeado para Finalizar
                    id: 'btn_fim',
                    iconCls: 'icon-fechar',
                    handler: function() {

                        var gGrid = Ext.getCmp('gridplcole');
                        var gStore = gGrid.getStore();
                        var selectedRecords = gGrid.getSelectionModel().getSelection();
                        //var vNumseq = selectedRecords[0].get("numseqc");

                        //var vTotGrid = gStore.sum('vlrdes');

                        Ext.Ajax.request({
                            url: '/php/Planejamento/FecharPlan.php',
                            params: {
                                action: 'post',
                                numseq: vSeqpla,
                                tiptrp: vTiptrp
                            },
                            success: function(response) {
                                var result = Ext.JSON.decode(response.responseText);
                                //console.log(result);
                                if (result == 0) {

                                    Ext.Msg.alert('Mensagem', 'Planejamento finalizado com sucesso.', function(btn, text) {

                                        if (btn == "ok") {

                                            //gStore.load();
                                            Ext.getCmp('cadplancole').close();
                                        }

                                    });

                                } else {

                                    Ext.Msg.alert('Mensagem', 'Não foi possível finalizar o planejamento.');
                                }
                            },
                            failure: function() {
                                Ext.Msg.alert('Mensagem', 'Problemas na base!');
                                gStore.load();
                            }

                        });
                    }
                },
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
                            Ext.getCmp('cadplancole').close();
                        }
                    }
                }

            ], //fim do elemento barra inferior
            plugins: [cellEditing],
            listeners: {
                beforeedit: function(editor, grid, opts) {

                    Ext.getCmp('btn_fim').setDisabled(true);

                },
                select: function() {
                    var jPanelGrid = Ext.getCmp('gridplcole');
                    var models = jPanelGrid.getStore().getRange();


                    //alert(g_LinhAnt);
                    //alert(g_Valpass);
                    //alert(g_QtdkmC);
                    //alert(g_Qtdkm);
                    //alert(g_Desc);
                    //alert(g_DescCmp);//g_DescE--
                    //alert(g_CvlrSet);
                    //if (g_Qtdkm == null) {
                    //g_Qtdkm = g_QtdkmC;
                    //alert(g_Qtdkm);}

                    if (
                        (g_Valpass != 0 && g_Qtdkm == 0) || (g_Qtdkm != 0 && g_Valpass == 0) ||
                        (g_Valpass == 0 && g_Qtdkm == 0 && g_Desc != "") ||
                        (g_Valpass > 0 && g_Qtdkm > 0 && g_Desc == " ") ||
                        (g_Valpass > 0 && g_Qtdkm > 0 && g_Desc == "")


                    ) {

                        //alert(g_Valpass);
                        //alert(g_Qtdkm);
                        //alert(g_Desc);

                        models[g_LinhAnt].set("vlrdes", 0);
                        models[g_LinhAnt].set("qtdkm", 0);
                        models[g_LinhAnt].set("valpass", 0);
                        models[g_LinhAnt].set("destra", '');

                        if (g_Valpass != 0) { //g_CvlrSet
                            g_CvlrSet.setValue(0);
                            g_Valpass = 0;
                        }

                        /*if (g_DescCmp != 0) {
                            g_DescE.setValue('');
                            //g_Desc = '';
                        }*/

                        if (g_Qtdkm != 0) { //g_QtdkmC
                            g_QtdkmE.setValue(0);

                            g_Qtdkm = 0;
                        }
                    }
                }
            }
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
            var vCol3 = Ext.getCmp("qtdkmplanc");

            //Tratamento para setar valores no cabeçalho
            Ext.getCmp('resMatricula').setText(vNumcad);
            Ext.getCmp('resNome').setText(vNomfun);
            Ext.getCmp('resLocal').setText(vNomloc);
            Ext.getCmp('resPeriodo').setText(vDatpla);
            Ext.getCmp('btSaircol').show();
            //Variaveis globais

            g_Qtdkm = 0; //celula editada
            g_QtdkmE = 0; //campo
            g_QtdkmC = 0; //valor da linha
            g_Valpass = 0;
            g_LinhAnt = 99;
            g_ValpassE = 0;
            g_CvlrSet = 0;
            g_Desc = ''; //g_Desc = '';
            g_DescE = 0;
            g_DescCmp = 0;


            //Tratamento para desabilitar grid
            if (vStspla == 1 || vStspla == 2 || vStspla == 3 || vStspla == 4) {

                Ext.getCmp('gridplcole').setDisabled(true);
                Ext.getCmp('btn_fim').setDisabled(true);

            } else {

                Ext.getCmp('gridplcole').setDisabled(false);
                Ext.getCmp('btn_fim').setDisabled(false);
            }

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
        maximize:function(window, opts){

            Ext.getCmp('btSaircol').setMargin('0 0 0 990');
        }

    }
});
