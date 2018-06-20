/*Ext.Loader.setConfig({
    enabled: true
});*/
var cellEditing = Ext.create('Ext.grid.plugin.CellEditing', {
    clicksToEdit: 1
});

//var sm = Ext.create('Ext.selection.CheckboxModel');
var model = Ext.create('desloc.model.InsCadPlanM');
var storePla = Ext.create('Ext.data.Store', {

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

Ext.define('desloc.view.CadPlanejamento', {
    //renderTo: Ext.getBody(),
    extend: 'Ext.window.Window',
    alias: 'widget.cadplan',
    width: 990,
    height: 550,//670
    title: 'Cadastrar Planejamento',
    iconCls: 'icon-grid',
    //x:5,
    //y:38,
    autoScroll: true,
    id: 'cadplan',
    layout: 'fit',
    align: 'stretch',
    modal: true,
    resizable: 'true',
    maximizable:'true',
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
            id: 'gridpl',
            height: 490,
            selModel: 'cellmodel',
            /*selModel:{
              selType: 'cellmodel'
            },*/
            layout: 'fit',
            store: storePla,
            //mouseWheelEnabled: false,
            features: [{
                ftype: 'summary'
            }],
            frame: true,
            columns: [

                {
                    header: 'Id Abertura',
                    id: 'seqpla',
                    name: 'seqpla',
                    dataIndex: 'seqpla',
                    hidden: true,
                    menuDisabled: true,
                    editor: {
                        // defaults to textfield if no xtype is supplied
                        allowBlank: false
                    }
                },
                {
                    header: 'Id',
                    dataIndex: 'numseq',
                    hidden: true,
                    menuDisabled: true,
                    id: 'numseq',
                    editor: {
                        // defaults to textfield if no xtype is supplied
                        allowBlank: false
                    }
                },
                {
                    xtype: 'datecolumn',
                    header: 'Data',
                    id: 'datdesplan',
                    menuDisabled: true,
                    name: 'datdes',
                    dataIndex: 'datdes',
                    width: 135,
                    summaryRenderer: function() {
                        return 'Total:'
                    },
                    renderer: Ext.util.Format.dateRenderer('d/m/Y')
                },
                {
                    xtype: 'numbercolumn',
                    header: 'Quilometros',
                    name: 'qtdkm',
                    id: 'qtdkmplan',
                    dataIndex: 'qtdkm',
                    menuDisabled: true,
                    hideTrigger: true,
                    summaryType: 'sum',
                    //flex: 1,
                    field: {
                        xtype: 'numberfield',
                        id: 'km',
                        //allowBlank: true,
                        minValue: 0,
                        enableKeyEvents: true,
                        hideTrigger: true,
                        mouseWheelEnabled: false,
                        keyNavEnabled: false,
                        selectOnFocus: true,
                        listeners: {

                            change: function(field, value) {
                                value = parseInt(value, 10);
                                //console.log(value);
                                field.setValue(value);
                                //if(value=='-' || value=='+')

                                //field.setValue(0);
                            },
                            /*change:function(field, value){

                               var sPanelGrid = Ext.getCmp('gridpl');
                               var sStore = sPanelGrid.getStore();
                               var selectedRecords = sPanelGrid.getSelectionModel().getSelection();
                               //var vQtkm = selectedRecords[0].get("qtdkmplan");
                               var vQtkm    = Ext.getCmp('km').getValue();
                                   vQtkmAux = vQtkm;

                            },*/

                            keyup: function(field, value) {

                                var sPanelGrid = Ext.getCmp('gridpl');
                                var sStore = sPanelGrid.getStore();
                                var selectedRecords = sPanelGrid.getSelectionModel().getSelection();
                                var rowSelected = sPanelGrid.view.getSelectionModel().getCurrentPosition().row;
                                var vQtEd = Ext.getCmp('km');
                                var vQtkmE = selectedRecords[0].get("qtdkm");
                                var vVlrdes = selectedRecords[0].get("vlrdes");
                                var vQtkm = Ext.getCmp('km').getValue();

                                var desc = selectedRecords[0].get("destra");
                                //var descE  = Ext.getCmp('Edestra').getValue();
                                var desC = Ext.getCmp('Edestra');
                                //gDescricao = desc;

                                g_QtdkmE = vQtkm;
                                g_Qtdkm = vQtkmE;
                                g_QtEd = vQtEd;
                                g_LinhAnt = rowSelected;
                                g_Desc = desc;
                                //g_DescE    = descE;
                                g_DescC = desC;
                                g_Vlr = vVlrdes;

                                //alert(g_LinhAnt);

                                //console.log(vQtkm);
                                if (vQtkm < 0) {

                                    vQtkm = vQtkm * (-1);
                                    field.setValue(vQtkm);
                                }
                                //cálculo do quilometro
                                if (vQtkm === null || vQtkm == 0) { //|| vQtkm == 0
                                    //alert(vQtkm);
                                    field.setValue(0);
                                    var Total = parseInt(0) * parseFloat(vValtrp);
                                    selectedRecords[0].set("vlrdes", parseFloat(Total));

                                    if (desc != "") {
                                        selectedRecords[0].set("destra", '');
                                    }


                                } else {

                                    var Total = parseInt(vQtkm) * parseFloat(vValtrp);
                                    selectedRecords[0].set("vlrdes", parseFloat(Total));
                                }

                            },
                            specialkey: function(field, e) {

                                var sPanelGrid = Ext.getCmp('gridpl');
                                var sStore = sPanelGrid.getStore();
                                var selectedRecords = sPanelGrid.getSelectionModel().getSelection();
                                var valOri = selectedRecords[0].get("vlrdes");
                                var seq = selectedRecords[0].get("numseq");
                                var vDesc = selectedRecords[0].get("destra");
                                var vQtkm = Ext.getCmp('km').getValue();
                                var vQtkmE = selectedRecords[0].get("qtdkm");

                                var Total = parseInt(vQtkm) * parseFloat(vValtrp);
                                selectedRecords[0].set("vlrdes", parseFloat(Total));

                                if (e.getKey() == 9 && e.shiftKey) {
                                    //return false;
                                }

                                if (e.getKey() == 27) {
                                    return false;

                                }

                                switch (e.getKey()) {

                                    /*case e.ESC:

                                        //alert(e.getKey());

                                        break;*/

                                    case e.TAB:
                                        selectedRecords[0].set("qtdkm", parseFloat(vQtkm));

                                        break;

                                    case e.ENTER:
                                        e.keyCode = e.TAB;
                                        selectedRecords[0].set("qtdkm", parseFloat(vQtkm));

                                        break;

                                }

                                //return false;
                            }, //Fim do special
                            blur: function() {
                                    var sPanelGrid = Ext.getCmp('gridpl');
                                    var sStore = sPanelGrid.getStore();
                                    var selectedRecords = sPanelGrid.getSelectionModel().getSelection();
                                    var rowSelected = sPanelGrid.view.getSelectionModel().getCurrentPosition().row;
                                    var vQtEd = Ext.getCmp('km');
                                    var vQtkmE = selectedRecords[0].get("qtdkm");
                                    var vVlrdes = selectedRecords[0].get("vlrdes");
                                    var vQtkm = Ext.getCmp('km').getValue();

                                    var desc = selectedRecords[0].get("destra");
                                    //var descE  = Ext.getCmp('Edestra').getValue();
                                    var desC = Ext.getCmp('Edestra');

                                    //g_QtdkmE = vQtkm;
                                    //g_Qtdkm = vQtkmE;
                                    //g_QtEd = vQtEd;
                                    //g_LinhAnt = rowSelected;
                                    //g_Desc = desc;
                                    //g_DescE = desc;
                                    //g_DescC = desC;
                                    //g_Vlr = vVlrdes;
                                } //Fim do blur

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
                    name: 'vlrdesplan',
                    menuDisabled: true,
                    minValue: 0,
                    id: 'vlrdesplan',
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
                    id: 'destra',
                    flex: 1,
                    menuDisabled: true,
                    editor: {
                        // defaults to textfield if no xtype is supplied
                        id: 'Edestra',
                        shiftKey: false,
                        enableKeyEvents: true,
                        allowBlank: false, //true
                        mouseWheelEnabled: false,
                        listeners: {

                            specialkey: function(field, e) {
                                //console.log('EVT: %o',e);
                                //console.log(selectedRecords[0].get("datdes"));
                                var sPanelGrid = Ext.getCmp('gridpl');
                                var sStore = sPanelGrid.getStore();
                                var selectedRecords = sPanelGrid.getSelectionModel().getSelection();
                                var vDatdes = selectedRecords[0].get("datdes");
                                var vMDif = Ext.Date.format(vDatdes, 'm/Y');
                                var vValpas = selectedRecords[0].get("vlrdes");
                                var vQtkm = selectedRecords[0].get("qtdkm");
                                var vDesc = selectedRecords[0].get("destra");
                                var desc = Ext.getCmp('Edestra');
                                var descE = Ext.getCmp('Edestra').getValue();

                                if (e.getKey() == 27) {
                                    return false;
                                }

                                switch (e.getKey()) {

                                    /*case e.ESC:

                                        //alert(descE);

                                        if (vQtkm != 0 && (descE == "" || descE == " " || vDesc == " " || vDesc == "")) {

                                            selectedRecords[0].set("qtdkm", 0);
                                            selectedRecords[0].set("vlrdes", 0);
                                            selectedRecords[0].set("destra", '');
                                            desc.setValue('');
                                        }

                                        break;*/

                                    case e.TAB:

                                        //alert(vValpas);
                                        //alert(vQtkm);
                                        //alert(descE);

                                        if (vValpas == 0 && vQtkm == 0) {

                                            desc.setValue("");
                                        }

                                        if (vValpas != 0 && vQtkm != 0 && descE == " ") {

                                            selectedRecords[0].set("qtdkm", 0);
                                            selectedRecords[0].set("vlrdes", 0);
                                            //selectedRecords[0].set("destra",'');
                                            desc.setValue("");
                                        }

                                        break;

                                    case e.ENTER:

                                        e.keyCode = e.TAB;

                                        if (vValpas == 0 && vQtkm == 0) {

                                            desc.setValue("");
                                        }

                                        if (vValpas != 0 && vQtkm != 0 && descE == " ") {

                                            selectedRecords[0].set("qtdkm", 0);
                                            selectedRecords[0].set("vlrdes", 0);
                                            selectedRecords[0].set("destra", '');
                                        }

                                        break;
                                }

                            }, //fim da função TAB
                            keyup: function() {

                                var sPanelGrid = Ext.getCmp('gridpl');
                                var selectedRecords = sPanelGrid.getSelectionModel().getSelection();
                                var rowSelected = sPanelGrid.view.getSelectionModel().getCurrentPosition().row;
                                var models = sPanelGrid.getStore().getRange();
                                var vQtEd = Ext.getCmp('km');
                                var vQtkmE = selectedRecords[0].get("qtdkm");
                                //var vQtkm  = Ext.getCmp('km').getValue();

                                var desc = selectedRecords[0].get("destra");
                                var descE = Ext.getCmp('Edestra').getValue();
                                var desC = Ext.getCmp('Edestra');

                                if (vQtkmE == 0 && (descE != "" && descE != " ")) { //Tratamento mensagem direcional para preenchimento

                                    desC.setValue("");

                                    function showResult(btn) {

                                        if (btn == 'ok') {

                                            models[rowSelected].set("destra", '');
                                        }
                                    }

                                    Ext.Msg.show({
                                        title: 'Mensagem',
                                        msg: 'Preencha primeiro os quilometros do dia.',
                                        buttons: Ext.Msg.OK,
                                        closable: false,
                                        //delay: 50,
                                        fn: showResult
                                    });
                                }

                                /*if (descE == "" || descE == null) {

                                    desC.setValue("");
                                    //selectedRecords[0].set("qtdkm", 0);
                                    //selectedRecords[0].set("vlrdes", 0);
                                }*/

                                //g_QtdkmE   = vQtkm; g_QtEd g_Desc
                                g_Qtdkm = vQtkmE;
                                g_QtEd = vQtEd;
                                g_LinhAnt = rowSelected;
                                g_Desc = descE; //desc
                                g_DescE = descE;
                                g_DescC = desC;

                            },
                            focus: function() {
                                    //var sPanelGrid = Ext.getCmp('gridpl');
                                    //var models     = sPanelGrid.getStore().getRange();
                                    //var desC       = Ext.getCmp('Edestra');


                                    /*if(g_Qtdkm==0 && g_DescE!=""){

                                       models[g_LinhAnt].set("qtdkm",0);
                                       models[g_LinhAnt].set("vlrdes",0);
                                       desC.setValue('');
                                    }*/

                                } //Fim do blur
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
                            Ext.getCmp('btn_fim').setDisabled(false);
                            var gGrid = Ext.getCmp('gridpl');
                            var gStore = gGrid.getStore();
                            var selectedRecords = gGrid.getSelectionModel().getSelection();
                            //var vNumseq = selectedRecords[0].get("numseq");
                            //var seq = selectedRecords[0].get("seqpla");

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
                                    var valTet = Ext.JSON.decode(response.responseText);
                                    //console.log('sucesso!');
                                    //console.log(valTet);
                                    //console.log(vTotGrid);

                                    if (vTotGrid > valTet) {
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
                                            //seqpla: seq
                                    },
                                    success: function(response, opts) {
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
                                            //Ext.Msg.alert('Mensagem','Registro Atualizado!');
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

                                            Ext.Msg.alert('Mensagem', 'O planejamento é superior ao Teto!', function(btn, text) {

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
                                        Ext.Msg.alert('Mensagem', 'Problemas na base!');
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

                        var pGrid = Ext.getCmp('gridplan'); //gridpl
                        var sStore = pGrid.getStore();
                        var selectedRecords = pGrid.getSelectionModel().getSelection();
                        //var vSituacao = selectedRecords[0].get("dessts");
                        //var vIdAbrt = selectedRecords[0].get("numseq");

                        Ext.Ajax.request({
                            url: '/php/Planejamento/FecharPlan.php',
                            //method:'get',
                            params: {
                                numseq: vSeqpla
                            },
                            success: function(response) {

                                var result = Ext.JSON.decode(response.responseText);
                                //console.log(result);
                                if (result == 0) {
                                    //Código...
                                    Ext.Msg.alert('Mensagem', 'Planejamento finalizado com sucesso!', function(btn, text) {

                                        if (btn == "ok") {

                                            //gStore.load();
                                            Ext.getCmp('cadplan').close();
                                        }

                                    });

                                } else {

                                    Ext.Msg.alert('Mensagem', 'Não foi possível finalizar o planejamento!');
                                    gStore.load();
                                }
                            },
                            failure: function() {

                                //Ext.Msg.alert('Mensagem','Problema Na Base de Dados!');
                            }
                        });
                    }
                },
                {
                    xtype: 'button',
                    id: 'btSairmot',
                    text: 'Sair',
                    iconCls: 'icon-sair',
                    style: {
                        //margin: '0 0 0 920'
                    },
                    listeners: {
                        click: function() {
                            Ext.getCmp('cadplan').close();
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
                    var jPanelGrid = Ext.getCmp('gridpl');
                    var models = jPanelGrid.getStore().getRange();

                    //alert(g_LinhAnt);
                    //alert(g_QtdkmE); //
                    //alert(g_Qtdkm); //
                    //alert(g_DescE);
                    //alert(g_Desc);
                    //alert(g_DescC);
                    //|| (g_Qtdkm == 0 && g_DescE!=" ")

                    if (
                        (g_Qtdkm != 0 && g_Desc == " ") || (g_Qtdkm != 0 && g_Desc == "") || //(g_Qtdkm == 0 && g_Desc != " ") ||
                        (g_QtdkmE != 0 && g_Desc == " ") || (g_QtdkmE != 0 && g_Desc == "") //|| (g_QtdkmE == 0 && g_Desc != " ")


                    ) {
                        //alert('passou');
                        //alert(g_LinhAnt);
                        //if (g_LinhAnt >= 0) {
                        //alert(g_QtdkmE);
                        //alert(g_Qtdkm);
                        //alert(g_DescE);
                        //alert(g_Desc);

                        models[g_LinhAnt].set("vlrdes", 0);
                        models[g_LinhAnt].set("qtdkm", 0);
                        models[g_LinhAnt].set("destra", '');

                        if (g_QtdkmE != 0) { //&& (g_DescE == 0 || g_DescE == "" || g_DescE == " ")
                            //alert(g_DescE);
                            g_QtEd.setValue(0);
                            g_QtdkmE = 0;
                        }

                        if (g_Desc != "") { //g_Desc != 0
                            //alert('passou');
                            g_DescC.setValue('');

                            g_DescE = "";
                        }
                        //}
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

            var sPanelGridPlan = Ext.getCmp('gridplan');
            var selectedRecords = sPanelGridPlan.getSelectionModel().getSelection();
            var gStore = sPanelGridPlan.getStore();

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

            storePla.load({
                params: { numseq: vSeqpla, tiptrp: vTiptrp, numcad: vNumcad }
            });

            var vCol4 = Ext.getCmp("valpassplan");
            var vCol3 = Ext.getCmp("qtdkmplan");

            //variaveis globais
            g_Qtdkm = 0;
            g_QtEd = 0;
            g_QtdkmE = 0;
            g_LinhAnt = 99;
            g_Desc = ""; //g_Desc = "";
            g_DescE = 0; //g_DescE = 0;
            g_DescC = 0; //g_DescC = 0;
            g_Vlr = 0;

            //Tratamento para setar valores no cabeçalho
            Ext.getCmp('resMatricula').setText(vNumcad);
            Ext.getCmp('resNome').setText(vNomfun);
            Ext.getCmp('resLocal').setText(vNomloc);
            Ext.getCmp('resPeriodo').setText(vDatpla);
            Ext.getCmp('btSairmot').show();
            //Executar porcedure da criação de planejamento

            //Tratamento para desabilitar grid
            if (vStspla == 1 || vStspla == 2 || vStspla == 3 || vStspla == 4) {

                Ext.getCmp('gridpl').setDisabled(true);
                Ext.getCmp('btn_fim').setDisabled(true);

            } else {

                Ext.getCmp('gridpl').setDisabled(false);
                Ext.getCmp('btn_fim').setDisabled(false);
            }

            //Tratamento Nome coluna KM / QTD PASS
            /*if(vTiptrp===1){
                //vCol4.hide();
                vCol3.setText('Quilometro');
            }else
             if(vTiptrp===2){
                var cGrid = Ext.getCmp('gridpl');
                vCol4.show();
                vCol3.setText('Qtd Pass');
            }*/
            //fim do tratamento

            //Tratamento para reload da grid ao abrir janela.
            /**/
            var tGrid = Ext.getCmp('gridplan');
            var tStore = tGrid.getStore();
            var usuario = Ext.getCmp('usuCombo').getValue();

            tStore.load({
                params: {
                    mat: usuario,
                    //btn: 0
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
                    //btn: 0
                    botao: 1
                }
            });
        }
    }

});
