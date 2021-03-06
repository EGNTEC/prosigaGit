Ext.Loader.setConfig({
    enabled: true
});
var cellEditing = Ext.create('Ext.grid.plugin.CellEditing', {
    clicksToEdit: 3
});

//var sm = Ext.create('Ext.selection.CheckboxModel');
var model = Ext.create('desloc.model.InsCadPlanM');
var storePla = Ext.create('Ext.data.Store', {

    //autoDestroy: true,
    //autoLoad: true,
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

Ext.define('desloc.view.CadPlanejamentoMotCoord', {
    //renderTo: Ext.getBody(),
    extend: 'Ext.window.Window',
    alias: 'widget.cadplancoord',
    width: 990,
    height: 550,//670
    title: 'Autorizar Planejamento',
    iconCls: 'icon-grid',
    //x:5,
    //y:38,
    autoScroll: true,
    id: 'cadplancoord',
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
            id: 'gridplC',
            height: 490,
            //selModel: sm,
            /**/
            selModel: {
                selType: 'cellmodel'
            },
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
                    menuDisabled: true

                },
                {
                    header: 'Id',
                    dataIndex: 'numseq',
                    hidden: true,
                    menuDisabled: true,
                    id: 'numseq'

                },
                {
                    xtype: 'datecolumn',
                    header: 'Deslocamento',
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
                    header: 'Km',
                    name: 'qtdkm',
                    id: 'qtdkmplan',
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
                    header: 'Vlr Passagem',
                    hidden: true,
                    dataIndex: 'valpass',
                    id: 'valpassplan',
                    name: 'valpass',
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
                    width: 130
                },
                {
                    header: 'Trajeto a percorrer',
                    dataIndex: 'destra',
                    id: 'destra',
                    flex: 1,
                    menuDisabled: true

                }

            ], //Fim das colunas da grid
            tbar: [{
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
            bbar: [ //Botões para Autorizar/Reabrir

                {
                    xtype: 'button',
                    id: 'btn_valid',
                    text: 'Autorizar', //trocar a descrição do botão validar para autorizar
                    iconCls: 'icon-validar',
                    handler: function() {

                        //var oPanelGridPlan = Ext.getCmp('gridplan');
                        //var selectedRecords = oPanelGridPlan.getSelectionModel().getSelection();
                        //vSeqpla = selectedRecords[0].get("numseq");

                        Ext.Ajax.request({
                            url: '/php/Planejamento/AutorPlan.php',
                            params: {
                                action: 'post',
                                id: vSeqpla,
                                btn: 0
                            },
                            success: function(response) {
                                var result = Ext.JSON.decode(response.responseText);
                                //console.log(result);
                                if (result == 0) {

                                    Ext.Msg.alert('Mensagem', 'Planejamento autorizado com sucesso!');
                                    //Ext.getCmp('btn_valid').setDisabled(true);
                                    var xGrid = Ext.getCmp('gridplan');
                                    var mStore = xGrid.getStore();
                                    var situacao = Ext.getCmp('statusCombo').getValue();
                                    var usu = Ext.getCmp('usuCombo').getValue();
                                    var mes = Ext.getCmp('mesCombo').getValue();
                                    var ano = Ext.getCmp('anoCombo').getValue();

                                    if (niv == 2 || niv == 1) {
                                        mStore.load({
                                            params: {
                                                sts: situacao,
                                                mat: usu,
                                                mes: mes,
                                                ano: ano,
                                                btn: 1
                                            }
                                        });
                                    } else
                                    if (niv == 3) {
                                        if (situacao == "" || situacao == "null") {
                                            mStore.load({
                                                params: {
                                                    sts: situacao,
                                                    mat: usu,
                                                    mes: mes,
                                                    ano: ano
                                                }
                                            });
                                        } else {
                                            mStore.load({
                                                params: {
                                                    sts: situacao,
                                                    mat: usu,
                                                    mes: mes,
                                                    ano: ano
                                                }
                                            });
                                        }
                                    }

                                    Ext.getCmp('cadplancoord').close();

                                }
                                if (result == 1) {

                                    Ext.Msg.alert('Mensagem', 'Erro ao alterar a planejamento!');

                                }
                            },
                            failure: function() {
                                Ext.Msg.alert('Mensagem', 'Problemas na base!');

                            }
                        });

                    }
                },
                {
                    xtype: 'button',
                    id: 'btn_reabilit',
                    text: 'Reabrir',
                    iconCls: 'icon-reabrir',
                    handler: function() {

                        Ext.Ajax.request({
                            url: '/php/Planejamento/AutorPlan.php',
                            params: {
                                action: 'post',
                                id: vSeqpla,
                                btn: 1
                            },
                            success: function(response) {
                                var result = Ext.JSON.decode(response.responseText);
                                //console.log(result);
                                if (result == 0) {

                                    Ext.Msg.alert('Mensagem', 'Planejamento reaberto com sucesso.');
                                    //Ext.getCmp('btn_valid').setDisabled(true);
                                    Ext.getCmp('cadplancoord').close();

                                }
                                if (result == 1) {

                                    Ext.Msg.alert('Mensagem', 'Erro ao reabrir o planejamento!');

                                }
                            },
                            failure: function() {
                                Ext.Msg.alert('Mensagem', 'Problemas na base!');
                            }
                        });
                    }

                },
                {
                    xtype: 'button',
                    //id:'btSair',
                    text: 'Sair',
                    iconCls: 'icon-sair',
                    style: {
                        //margin: '0 0 0 900'
                    },
                    listeners: {
                        click: function() {
                            Ext.getCmp('cadplancoord').close();
                        }
                    }
                }

            ], //fim do elemento barra inferior
            plugins: [cellEditing],
            listeners: {
                beforeedit: function(editor, grid, opts) {

                    Ext.getCmp('btn_fim').setDisabled(true);
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
        beforerender: function() {

            var oPanelGridPlan = Ext.getCmp('gridplan');
            var selectedRecords = oPanelGridPlan.getSelectionModel().getSelection();
            //var gStore = oPanelGridPlan.getStore();

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

            var vCol4 = Ext.getCmp("valpassplan");
            var vCol3 = Ext.getCmp("qtdkmplan");

            //Tratamento para setar valores no cabeçalho
            Ext.getCmp('resMatricula').setText(vNumcad);
            Ext.getCmp('resNome').setText(vNomfun);
            Ext.getCmp('resLocal').setText(vNomloc);
            Ext.getCmp('resPeriodo').setText(vDatpla);


            //Tratamento para desabilitar grid
            Ext.getCmp('gridplC').setDisabled(false);

            //Tratamento para desabilitar botão Autorizar
            //console.log(niv);
            //console.log(vStspla);

            if (niv == 3 || niv == 2 || niv == 1) {
                if (vStspla == 0) {

                    Ext.getCmp('btn_valid').setDisabled(true);
                    Ext.getCmp('btn_reabilit').setDisabled(true);
                } else
                if (vStspla == 1) {

                    if (codcargo == 6600) {

                        Ext.getCmp('btn_valid').setDisabled(true);
                        Ext.getCmp('btn_reabilit').setDisabled(true);
                    } else {
                        Ext.getCmp('btn_valid').setDisabled(false);
                        Ext.getCmp('btn_reabilit').setDisabled(false);
                    }

                } else
                if (vStspla >= 2) {

                    Ext.getCmp('btn_valid').setDisabled(true);
                    Ext.getCmp('btn_reabilit').setDisabled(true);
                }
            }
            /*else
                       if(niv==2){

                           Ext.getCmp('btn_valid').show();
                           Ext.getCmp('btn_reabilit').show();
                       }*/

            //Tratamento Nome coluna KM / QTD PASS
            if (vTiptrp == 1) {
                vCol4.hide();
                vCol3.setText('Km');
            } else
            if (vTiptrp == 2) {
                var cGrid = Ext.getCmp('gridplC');
                vCol4.show();
                vCol3.setText('Qtd Pass');
            }
            //fim do tratamento

            storePla.load({
                params: { numseq: vSeqpla, tiptrp: vTiptrp, numcad: vNumcad }
            });

            //Tratamento para reload da grid ao abrir janela.
            var xGrid = Ext.getCmp('gridplan');
            var xStore = xGrid.getStore();
            var situacao = Ext.getCmp('statusCombo').getValue();
            var usu = Ext.getCmp('usuCombo').getValue();
            var mes = Ext.getCmp('mesCombo').getValue();
            var ano = Ext.getCmp('anoCombo').getValue();
            var reg = Ext.getCmp('regCombo').getValue();
            var uni = Ext.getCmp('uniCombo').getValue();

            //console.log(situacao);

            if (niv == 2 || niv == 1) {
                xStore.load({
                    params: {
                        sts: situacao,
                        mat: usu,
                        mes: mes,
                        ano: ano,
                        unid:uni,
                        reg: reg,
                        btn: 1
                    }
                });
            } else
            if (niv == 3) {

                if (situacao == "" || situacao == "null") {
                    xStore.load({
                        params: {
                            sts: situacao,
                            mat: usu,
                            mes: mes,
                            ano: ano
                        }
                    });
                } else {
                    //console.log(situacao);
                    xStore.load({
                        params: {
                            sts: situacao,
                            mat: usu,
                            mes: mes,
                            ano: ano
                        }
                    });
                }
                //Fim do Tratamento
            }
        },

        beforeclose: function() {
            //Tratamento ao fechar janela de cadastro de planejamento,
            //o reload da grid de abertura deve obedecer o valor da
            //situação.

            var xGrid = Ext.getCmp('gridplan');
            var xStore = xGrid.getStore();
            var situacao = Ext.getCmp('statusCombo').getValue();
            var usu = Ext.getCmp('usuCombo').getValue();

            //console.log(situacao);

            //Tratamento para reload da grid ao abrir janela.
            var xGrid = Ext.getCmp('gridplan');
            var xStore = xGrid.getStore();
            var situacao = Ext.getCmp('statusCombo').getValue();
            var usu = Ext.getCmp('usuCombo').getValue();
            var mes = Ext.getCmp('mesCombo').getValue();
            var ano = Ext.getCmp('anoCombo').getValue();
            var reg = Ext.getCmp('regCombo').getValue();
            var uni = Ext.getCmp('uniCombo').getValue();

            //console.log(situacao);

            if (niv == 2 || niv == 1) {
                xStore.load({
                    params: {
                        sts: situacao,
                        mat: usu,
                        mes: mes,
                        ano: ano,
                        btn: 1,
                        unid:uni,
                        reg: reg
                    }
                });
            } else
            if (niv == 3) {

                if (situacao == "" || situacao == "null") {
                    xStore.load({
                        params: {
                            sts: situacao,
                            mat: usu,
                            mes: mes,
                            ano: ano
                        }
                    });
                } else {
                    //console.log(situacao);
                    xStore.load({
                        params: {
                            sts: situacao,
                            mat: usu,
                            mes: mes,
                            ano: ano
                        }
                    });
                }
                //Fim do Tratamento
            }
        }
    }

});
