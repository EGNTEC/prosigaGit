Ext.Loader.setConfig({
    //enabled: true
});

var cellEditing = Ext.create('Ext.grid.plugin.CellEditing', {
    clicksToEdit: 1,
    errorSummary: false
        
});

//var sm = Ext.create('Ext.selection.CheckboxModel');

var storePrMotGer = Ext.create('Ext.data.Store', {

    //autoDestroy: true,
    //autoLoad: true,
    model: 'desloc.model.InsCadPreM',

    proxy: {
        type: 'ajax',
        //url:'/php/ListCadPlan.php',

        api: {

            read: '/php/Prestacao/ListCadPre.php',
            create: '/php/Prestacao/InsCadPre.php',
            destroy: '/php/Prestacao/DelCadPre.php'

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

Ext.define('desloc.view.CadPrestacaoNovGer', {
    //renderTo: Ext.getBody(),
    extend: 'Ext.window.Window',
    alias: 'widget.cadprNovGer',
    title: 'Cadastrar Prestação de Contas',
    iconCls: 'icon-grid',
    width: 990,
    height: 550,//650
    //x:5,
    //y:38,
    autoScroll: true,
    id: 'cadprNovGer',
    layout: 'fit',
    closable: true,
    closeAction: 'hide',
    align: 'stretch',
    modal: true,
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

    items: [{
            xtype: 'grid',
            id: 'gridprNovGer',
            height: 400,
            //selModel: sm,
            selModel: {
                selType: 'checkboxmodel',
                mode: 'MULTI'
            },
            layout: 'fit',
            store: storePrMotGer,
            autoScroll: true,
            frame: true,
            autoScroll: true,
            features: [{
                ftype: 'summary'
            }],
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

            ], //fim da barra superioir da grid
            bbar: [{
                    xtype: 'button',
                    id: 'btn_validGer',
                    text: 'Autorizar', //trocar a descrição do botão validar para autorizar
                    iconCls: 'icon-validar',
                    //href: 'https://novoprossiga.inec.org.br/php/Prestacao/ArqPrest.php',
                    href: 'http://novoprossiga.inec.org.br/ArqPrest.php',
                    handler: function() {

                            var qGrid = Ext.getCmp('gridpre');
                            var sStore = qGrid.getStore();
                            var selectedRecords = qGrid.getSelectionModel().getSelection();
                            var vSituacao = selectedRecords[0].get("dessts");
                            var vIdAbrt = selectedRecords[0].get("numseq");
                            var comboSts = Ext.getCmp('statusCombo');
                            var botao = Ext.getCmp('btn_validGer');
                            //Tratamento para geração do arquivo.

                            vId = selectedRecords[0].get("numseq");
                            vMat = selectedRecords[0].get("numcad");
                            vIdtrans = selectedRecords[0].get("tiptrp");
                            vNom = selectedRecords[0].get("nomfun");
                            vIdpla = selectedRecords[0].get("seqpla");
                            vTotkm = selectedRecords[0].get("qtdkm");
                            vTotpre = selectedRecords[0].get("vlrpre");
                            vMesref = selectedRecords[0].get("mesref");
                            //========================================
                            botao.setParams({ id: vId, mat: vMat, idtrans: vIdtrans, nom: vNom, idpla: vIdpla, qtdkm: vTotkm, totpre: vTotpre, mesref: vMesref, colaborador: col, cargo: nomcargo });
                            Ext.Ajax.request({
                                url: '/php/Prestacao/AutorPrest.php',
                                params: {
                                    action: 'post',
                                    id: vIdAbrt
                                },
                                success: function(response) {
                                    var result = Ext.JSON.decode(response.responseText);
                                    //console.log(result);
                                    if (result == 0) {

                                        Ext.Msg.alert('Mensagem', 'Prestação de contas autorizada com sucesso.', function(btn, text) {

                                            if (btn == "ok") {

                                                if (situacao == "" || situacao == "null") {
                                                    sStore.load({
                                                        params: {
                                                            sts: vStspre,
                                                            mat: usu
                                                        }
                                                    });


                                                } else {
                                                    //console.log(situacao);
                                                    sStore.load({
                                                        params: {
                                                            sts: situacao
                                                                //mat: usu
                                                        }
                                                    });
                                                }

                                                Ext.getCmp('cadprNovGer').destroy();
                                            }
                                        });

                                        //sStore.load();
                                    }
                                    if (result == 1) {

                                        Ext.Msg.alert('Mensagem', 'Erro ao alterar a prestação!');

                                    }
                                },
                                failure: function() {
                                    Ext.Msg.alert('Mensagem', 'Problemas na base!');

                                }
                            });
                            //Gerar Arquivo de prestação


                        } // Fim da função click do botão.
                },
                {
                    xtype: 'button',
                    id: 'btn_reabGer',
                    text: 'Reabrir',
                    iconCls: 'icon-reabrir',
                    handler: function() {

                        var qGrid = Ext.getCmp('gridpre');
                        var sStore = qGrid.getStore();
                        var selectedRecords = qGrid.getSelectionModel().getSelection();
                        var vSituacao = selectedRecords[0].get("dessts");
                        var vIdAbrt = selectedRecords[0].get("numseq");
                        var comboSts = Ext.getCmp('statusCombo');

                        Ext.Ajax.request({
                            url: '/php/Prestacao/ReabPrest.php',
                            params: {
                                action: 'post',
                                id: vIdAbrt
                            },
                            success: function(response) {
                                var result = Ext.JSON.decode(response.responseText);
                                //console.log(result);
                                if (result == 0) {

                                    Ext.Msg.alert('Mensagem', 'Prestação de contas reaberta com sucesso.', function(btn, text) {

                                        if (btn == "ok") {

                                            if (situacao == "" || situacao == "null") {
                                                sStore.load({
                                                    params: {
                                                        sts: vStspre,
                                                        mat: usu
                                                    }
                                                });


                                            } else {
                                                //console.log(situacao);
                                                sStore.load({
                                                    params: {
                                                        sts: situacao
                                                            //mat: usu
                                                    }
                                                });
                                            }

                                            Ext.getCmp('cadprNovGer').destroy();
                                        }
                                    });

                                    //sStore.load();

                                }
                                if (result == 1) {

                                    Ext.Msg.alert('Mensagem', 'Erro ao reabrir a prestação.');

                                }
                            },
                            failure: function() {
                                Ext.Msg.alert('Mensagem', 'Problemas na base.');

                            }
                        });
                    }
                },
                {
                    xtype: 'button',
                    text: 'Ver Justificativa',
                    tooltip: 'Justificativa',
                    id: 'btn_justGer',
                    iconCls: 'icon-zoom',
                    handler: function() {
                        var comboSts = Ext.getCmp('statusCombo');
                        var comboStatus = comboSts.getValue();
                        var qGrid = Ext.getCmp('gridpre');
                        var sStore = qGrid.getStore();
                        var selectedRecords = qGrid.getSelectionModel().getSelection();
                        vlrpre = selectedRecords[0].get("vlrpre");
                        vIdAbrt = selectedRecords[0].get("numseq");
                        juspre = selectedRecords[0].get("juspre");
                        Vstspre = selectedRecords[0].get("stspre");
                        Vtiptrp = selectedRecords[0].get("tiptrp");
                        Vnomfun = selectedRecords[0].get("nomfun");
                        Vdestrp = selectedRecords[0].get("destrp");
                        Vnumcad = selectedRecords[0].get("numcad");

                        if (juspre != null) {

                            Ext.create('desloc.view.ConfirmJust');


                            if ((niv == 3 || niv == 2) && Vstspre == 1) {

                                Ext.getCmp('justValid').show();
                                Ext.getCmp('justReab').show();
                                Ext.getCmp('btn_val').hide();
                            } else
                            if (niv == 3 && Vstspre == 2) {

                                Ext.getCmp('justValid').hide();
                                Ext.getCmp('justReab').hide();
                                Ext.getCmp('btn_val').hide();
                            } else
                            if (niv == 2 && Vstspre == 3) {

                                Ext.getCmp('justValid').hide();
                                Ext.getCmp('justReab').hide();
                                Ext.getCmp('btn_val').hide();
                            } else
                            if (niv == 2 && Vstspre == 2) {

                                //Ext.getCmp('justValid').setText('Validar');
                                Ext.getCmp('btn_val').show();
                                Ext.getCmp('justValid').hide();
                                Ext.getCmp('justReab').show();
                            }else
                             if(niv == 1 && Vstspre == 3){

                               Ext.getCmp('justValid').hide();
                               Ext.getCmp('justReab').hide();
                               Ext.getCmp('btn_val').hide();
                           }

                        } else {

                            Ext.Msg.alert('Mensagem', 'Não existe justicativa para essa prestação.');
                        }
                    }
                },
                {
                    xtype: 'button',
                    text: 'Arquivo de Prestação',
                    id: 'btn_arqprestGer',
                    name: 'btn_arqprestGer',
                    //hrefTarget : "_blank",
                    //href:'https://novoprossiga.inec.org.br/php/Prestacao/ArqPrest.php',
                    href: 'http://novoprossiga.inec.org.br/ArqPrest.php',
                    iconCls: 'icon-prest',
                    handler: function() {
                        var sPanelGridGer = Ext.getCmp('gridpre');
                        var sStore = sPanelGridGer.getStore();
                        var selectedRecords = sPanelGridGer.getSelectionModel().getSelection();
                        var btn = Ext.getCmp('btn_arqprestGer');

                        vId = selectedRecords[0].get("numseq");
                        vMat = selectedRecords[0].get("numcad");
                        vIdtrans = selectedRecords[0].get("tiptrp");
                        vNom = selectedRecords[0].get("nomfun");
                        vIdpla = selectedRecords[0].get("seqpla");
                        vTotkm = selectedRecords[0].get("qtdkm");
                        vTotpre = selectedRecords[0].get("vlrpre");
                        vMesref = selectedRecords[0].get("mesref");

                        btn.setParams({ id: vId, mat: vMat, idtrans: vIdtrans, nom: vNom, idpla: vIdpla, qtdkm: vTotkm, totpre: vTotpre, mesref: vMesref, colaborador: col, cargo: nomcargo });
                    }
                },
                {
                      xtype: 'button',
                      id: 'btn_NovoDia',
                      text: 'Novo Dia',
                      iconCls: 'icon-autorizar',
                      handler: function() {

                        Ext.create('desloc.view.NovoDia');

                     }
                },
                {
                    text: 'Sair',
                    iconCls: 'icon-sair',
                    listeners: {
                        click: function() {
                            var xGrid = Ext.getCmp('gridpre');
                            var selectedRecords = xGrid.getSelectionModel().getSelection();
                            vStspre = selectedRecords[0].get("stspre");
                            var xStore = xGrid.getStore();
                            var situacao = Ext.getCmp('statusCombo').getValue();
                            var usu = Ext.getCmp('usuCombo').getValue();
                            var reg = Ext.getCmp('regCombo').getValue();
                            var uni = Ext.getCmp('uniCombo').getValue();
                            //console.log(situacao);
                            var comboUso = Ext.getCmp('usuCombo');
                            var comboUnid = Ext.getCmp('uniCombo');
                            var comboReg = Ext.getCmp('regCombo');
                            var comboSts = Ext.getCmp('statusCombo');
                            var comboStatus = comboSts.getValue();
                            var comboMes = Ext.getCmp('mesCombo').getValue();
                            var comboAno = Ext.getCmp('anoCombo').getValue();

                            if (situacao == "" || situacao == "null") {
                                xStore.load({
                                    params: {
                                        sts: vStspre,
                                        mat: usu,
                                        btn: 1,
                                        unid:uni,
                                        reg: reg
                                    }
                                });
                            } else {
                                //console.log(situacao);
                                xStore.load({
                                    params: {
                                        sts: situacao,
                                        mat: usu,
                                        unid:uni,
                                        reg: reg,
                                        btn: 1
                                    }
                                });
                            }
                            //xStore.load();
                            //Tratamento para verificar se existe valores acima do teto.
                          if (comboStatus == 2 && niv == 2) {
                            Ext.Ajax.request({
                                url: '/php/LibTeto.php',
                                params: {
                                    action: 'post',
                                    mes: comboMes,
                                    ano: comboAno,
                                    unid: Ext.getCmp('uniCombo').getValue(),
                                    reg: codreg
                                },
                                success: function(response) {

                                    var result = Ext.JSON.decode(response.responseText);

                                    if (result > 0) {

                                      Ext.Msg.alert('Mensagem', 'Existem prestações de contas com valores acima do limite permitido. Valide-as individualmente.', function(btn, text){

                                             if(btn="ok"){
                                               var aStore = xGrid.getStore();
                                               aStore.load({
                                                   params: {
                                                       mat: comboUso.getValue(),
                                                       unid: comboUnid.getValue(),
                                                       reg: comboReg.getValue(),
                                                       sts: comboSts.getValue(),
                                                       mes: comboMes,
                                                       ano: comboAno,
                                                       botao: bt,
                                                       btconf: 99
                                                    }
                                                });
                                             }
                                        });

                                    } else { //Se não obtiver valore acima do teto.

                                      var aStore = xGrid.getStore();
                                      aStore.load({
                                          params: {
                                              mat: comboUso.getValue(),
                                              unid: comboUnid.getValue(),
                                              reg: comboReg.getValue(),
                                              sts: comboSts.getValue(),
                                              mes: comboMes,
                                              ano: comboAno,
                                              botao: bt
                                          }
                                      });
                                    }
                                },
                                failure: function() {
                                  //Ext.Msg.alert('Msg','Problema Na Base de Dados!');
                                 }
                              });//Fim do Ajax
                             }
                            //Fim

                            Ext.getCmp('cadprNovGer').destroy();
                        }
                    }
                }

            ], //fim da barra inferior da grid
            columns: [

                {
                    header: 'Id',
                    id: 'numseqGer',
                    name: 'numseqGer',
                    dataIndex: 'numseq',
                    hidden: true,
                    //menuDisabled:true,
                    editor: {
                        // defaults to textfield if no xtype is supplied
                        allowBlank: false
                    }
                },
                {
                    header: 'Id Abertura',
                    id: 'seqpreGer',
                    name: 'seqpreGer',
                    dataIndex: 'seqpre',
                    hidden: true,
                    //menuDisabled:true,
                    editor: {
                        // defaults to textfield if no xtype is supplied
                        allowBlank: false
                    }
                },
                {
                    xtype: 'datecolumn',
                    header: 'Data',
                    id: 'datpreGer',
                    align: 'center',
                    menuDisabled: true,
                    name: 'datpreGer',
                    dataIndex: 'datpre',
                    width: 130,
                    style: {

                        borderColor: '#F5F5F5',
                        textAlign: 'center'

                    },
                    hoverCls: 'black',
                    renderer: Ext.util.Format.dateRenderer('d/m/Y')
                },
                {
                    header: 'Transporte',
                    dataIndex: 'destrp',
                    align: 'center',
                    width: 135,
                    menuDisabled: true,
                    id: 'destrpGer',
                    style: {

                        borderColor: '#F5F5F5',
                        textAlign: 'center'
                    },
                    hoverCls: 'black'
                },
                {
                    //header:'D',
                    width: 136,
                    dataIndex: 'Coluna1',
                    align: 'right',
                    id: 'EstHodIniQtdGer',
                    menuDisabled: true,
                    style: {

                        borderColor: '#F5F5F5'
                    },
                    hoverCls: 'black'

                },
                {
                    xtype: 'numbercolumn',
                    //header: 'E',
                    align: 'center',
                    dataIndex: 'odoini',
                    width: 136,
                    id: 'odoiniGer',
                    name: 'odoiniGer',
                    menuDisabled: true,
                    style: {

                        borderColor: '#F5F5F5'
                    },
                    hoverCls: 'black',
                    renderer: function(val) {
                        var met = Ext.util.Format.maskRenderer('', true);

                        if (val.length > 1) {

                            met = Ext.util.Format.maskRenderer('', true);
                        }

                        return met(val);
                    }
                },
                {
                    //header:'F',
                    width: 136,
                    dataIndex: 'Coluna2',
                    align: 'right',
                    id: 'EstHodFimVlrGer',
                    menuDisabled: true,
                    style: {

                        borderColor: '#F5F5F5'
                    },
                    hoverCls: 'black'

                },
                {
                    //xtype: 'numbercolumn',
                    //header: 'G',
                    width: 136,
                    align: 'center',
                    dataIndex: 'odofim',
                    id: 'odofimGer',
                    name: 'odofimGer',
                    menuDisabled: true,
                    style: {

                        borderColor: '#F5F5F5'
                    },
                    hoverCls: 'black'
                },
                {
                    xtype: 'numbercolumn',
                    header: 'Total Km',
                    align: 'center',
                    id: 'quilometroGer',
                    dataIndex: 'quilometro',
                    style: {

                        borderColor: '#F5F5F5',
                        textAlign: 'center'
                    },
                    hoverCls: 'black',
                    renderer: function(val) {
                            var metod = Ext.util.Format.maskRenderer('', true);

                            if (val.length > 1) {

                                metod = Ext.util.Format.maskRenderer('', true);
                            }

                            return metod(val);
                        }
                        //menuDisabled:true
                },
                {
                    xtype: 'numbercolumn',
                    header: 'Valor total',
                    align: 'center',
                    name: 'vlrdesGer',
                    menuDisabled: true,
                    id: 'vlrdesGer',
                    dataIndex: 'vlrdes',
                    style: {

                        borderColor: '#F5F5F5',
                        textAlign: 'center'
                    },
                    hoverCls: 'black',
                    width: 130,
                    summaryType: 'sum',
                    summaryRenderer: function(value) {

                        //return Ext.String.format('Total R$ {0}', parseFloat(value));
                        var metodo = Ext.util.Format.maskRenderer('Total R$ #9.999.990,00', true);
                        //metodo = Ext.util.CSS.createStyleSheet('color:red','value');
                        if (value.length > 1) {

                            metodo = Ext.util.Format.maskRenderer('Total R$ #9.999.990,00', true);
                        }

                        return metodo(value);

                    },
                    renderer: function(valor) {
                        var metodo = Ext.util.Format.maskRenderer('R$ #9.999.990,00', true);

                        if (valor.length > 1) {

                            metodo = Ext.util.Format.maskRenderer('R$ #9.999.990,00', true);
                        }

                        return metodo(valor);
                    }

                }, {
                    header: 'Trajeto percorrido',
                    dataIndex: 'juspre',
                    id: 'juspreGer',
                    flex: 1,
                    menuDisabled: true,
                    style: {
                        borderColor: '#F5F5F5',
                        textAlign: 'center'
                    },
                    hoverCls: 'black'
                } //Fim da coluna descrição

            ], //fim das colunas grid
            plugins: [cellEditing],
            listeners: {

                /*beforeedit: function(editor, grid, opts) {

                    Ext.getCmp('btn_encplan').setDisabled(true);
                 }*/
            }
        }

    ],
    //
    /*dockedItems: [
         {
           xtype: 'toolbar',
           dock: 'bottom',
           items: [

           ]
        }
     ],*/
    listeners: {

        //Acrecentar funções da Janela

        beforerender: function() {

            var sPanelGridGer = Ext.getCmp('gridpre');
            var selectedRecords = sPanelGridGer.getSelectionModel().getSelection();

            vValtrp = selectedRecords[0].get("vlrtrp");
            vSeqpla = selectedRecords[0].get("numseq");
            vTiptrp = selectedRecords[0].get("tiptrp");
            vStspr = selectedRecords[0].get("stspre");
            vNomfun = selectedRecords[0].get("nomfun");
            vNumcad = selectedRecords[0].get("numcad");
            vDatpla = selectedRecords[0].get("mesref");
            vDestrp = selectedRecords[0].get("destrp");
            vjuspre = selectedRecords[0].get("juspre");
            vNomloc = selectedRecords[0].get("nomloc");

            var btn = Ext.getCmp('btn_arqprestGer');
            var comboUso = Ext.getCmp('usuCombo');
            comboSts = Ext.getCmp('statusCombo');
            situacao = comboSts.getValue();

            //Tratamento para setar valores no cabeçalho
            Ext.getCmp('resMatricula').setText(vNumcad);
            Ext.getCmp('resNome').setText(vNomfun);
            Ext.getCmp('resLocal').setText(vNomloc);
            Ext.getCmp('resPeriodo').setText(vDatpla);

            dateParm = Ext.Date.parse(vDtfim, "d/m/Y");
            dateH    = mes+'/'+dia+'/'+ano;
            dateHoje    = new Date(dateH);

            //Erro não identificado, tratamento para fluxo do processo
            //justificativa apesar de null o sistema entende diferente. 
            if (vjuspre===null) {

                vjuspre = 0;                            
            }
                        
            //Tratamento para botão inserir novo dia.
            if(niv==1){
               Ext.getCmp('btn_NovoDia').setDisabled(false);
            }else{
               Ext.getCmp('btn_NovoDia').destroy();
            }
           //Fim tratamento

            if(dateHoje > dateParm && vStspr!=4){

              Ext.getCmp('btn_validGer').setDisabled(true);
              Ext.getCmp('btn_reabGer').setDisabled(true);
              Ext.getCmp('btn_justGer').hide();
              Ext.getCmp('btn_arqprestGer').setDisabled(true);
            }
            else
            if (niv == 1 || niv == 2 || niv == 3) {

                if (vStspr == 0) { //aberto

                    Ext.getCmp('btn_validGer').setDisabled(true);
                    Ext.getCmp('btn_reabGer').setDisabled(true);
                    Ext.getCmp('btn_justGer').hide();
                    Ext.getCmp('btn_arqprestGer').hide();
                } else
                if (vStspr == 1) { //finalizado

                    Ext.getCmp('btn_validGer').setDisabled(false);
                    //Ext.getCmp('btn_reabGer').setDisabled(false);
                    Ext.getCmp('btn_arqprestGer').show();
                    Ext.getCmp('btn_arqprestGer').setDisabled(true);

                       

                    //Tratamento quando houver justificativa na prestação
                    //if (vjuspre != null || vjuspre !='') {
                      if (vjuspre != 0) {  
                        Ext.getCmp('btn_arqprestGer').hide();
                        Ext.getCmp('btn_justGer').show();
                        Ext.getCmp('btn_validGer').hide();
                        Ext.getCmp('btn_reabGer').hide();

                        if (codcargo == 6600) {
                            Ext.getCmp('btn_justGer').setDisabled(true);
                            Ext.getCmp('btn_validGer').setDisabled(true);
                            Ext.getCmp('btn_reabGer').setDisabled(true);
                        }                        

                    }else {

                        if (codcargo == 6600) {
                            Ext.getCmp('btn_justGer').setDisabled(true);
                            Ext.getCmp('btn_validGer').setDisabled(true);
                            Ext.getCmp('btn_reabGer').setDisabled(true);
                        }
                        else{                        
                            Ext.getCmp('btn_justGer').hide();
                            Ext.getCmp('btn_validGer').show();
                            Ext.getCmp('btn_reabGer').show();
                             
                        }

                        console.log('Finalizado2');
                    }

                } else
                if (vStspr >= 2) {

                    Ext.getCmp('btn_validGer').setDisabled(true);
                    Ext.getCmp('btn_reabGer').setDisabled(true);
                    Ext.getCmp('btn_arqprestGer').show();
                    Ext.getCmp('btn_arqprestGer').setDisabled(false);


                    //Tratamento quando houver justificativa na prestação
                    //if (vjuspre != null || vjuspre !='') {
                      if (vjuspre != 0) {  
                        Ext.getCmp('btn_justGer').show();
                        Ext.getCmp('btn_validGer').hide();
                        Ext.getCmp('btn_reabGer').hide();

                    } else {

                        Ext.getCmp('btn_justGer').hide();
                        Ext.getCmp('btn_validGer').show();
                        Ext.getCmp('btn_reabGer').show();
                    }

                }
            }


            //Fim do tratamento
            storePrMotGer.load({
                params: { numseq: vSeqpla, tiptrp: vTiptrp, numcad: vNumcad }
            });
        },

        beforeclose: function() {
            //Tratamento ao fechar janela de cadastro de planejamento,
            //o reload da grid de abertura deve obedecer o valor da
            //situação.
            var xGrid = Ext.getCmp('gridpre');
            var selectedRecords = xGrid.getSelectionModel().getSelection();
            vStspre = selectedRecords[0].get("stspre");
            var xStore = xGrid.getStore();
            var situacao = Ext.getCmp('statusCombo').getValue();
            var usu = Ext.getCmp('usuCombo').getValue();
            var reg = Ext.getCmp('regCombo').getValue();
            var uni = Ext.getCmp('uniCombo').getValue();
            //console.log(situacao);
            var comboUso = Ext.getCmp('usuCombo');
            var comboUnid = Ext.getCmp('uniCombo');
            var comboReg = Ext.getCmp('regCombo');
            var comboSts = Ext.getCmp('statusCombo');
            var comboStatus = comboSts.getValue();
            var comboMes = Ext.getCmp('mesCombo').getValue();
            var comboAno = Ext.getCmp('anoCombo').getValue();

            if (situacao == "" || situacao == "null") {
                xStore.load({
                    params: {
                        sts: vStspre,
                        mat: usu,
                        unid:uni,
                        reg: reg,
                        btn: 1
                    }
                });
            } else {
                //console.log(situacao);
                xStore.load({
                    params: {
                        sts: situacao,
                        mat: usu,
                        btn: 1,
                        unid:uni,
                        reg: reg

                    }
                });
            }
            //kkkkkkk
            //Tratamento para verificar se existe valores acima do teto.
          if (comboStatus == 2 && niv == 2) {
            Ext.Ajax.request({
                url: '/php/LibTeto.php',
                params: {
                    action: 'post',
                    mes: comboMes,
                    ano: comboAno,
                    unid: Ext.getCmp('uniCombo').getValue(),
                    reg: codreg
                },
                success: function(response) {

                    var result = Ext.JSON.decode(response.responseText);

                    if (result > 0) {

                      Ext.Msg.alert('Mensagem', 'Existem prestações de contas com valores acima do limite permitido. Valide-as individualmente.', function(btn, text){

                             if(btn="ok"){
                               var aStore = xGrid.getStore();
                               aStore.load({
                                   params: {
                                       mat: comboUso.getValue(),
                                       unid: comboUnid.getValue(),
                                       reg: comboReg.getValue(),
                                       sts: comboSts.getValue(),
                                       mes: comboMes,
                                       ano: comboAno,
                                       botao: bt,
                                       btconf: 99
                                    }
                                });
                             }
                        });

                    } else { //Se não obtiver valore acima do teto.

                      var aStore = xGrid.getStore();
                      aStore.load({
                          params: {
                              mat: comboUso.getValue(),
                              unid: comboUnid.getValue(),
                              reg: comboReg.getValue(),
                              sts: comboSts.getValue(),
                              mes: comboMes,
                              ano: comboAno,
                              botao: bt
                          }
                      });
                    }
                },
                failure: function() {
                  //Ext.Msg.alert('Msg','Problema Na Base de Dados!');
                 }
              });//Fim do Ajax

            }
            //Fim

            Ext.getCmp('cadprNovGer').destroy();

        }
    },
    /*bbar: [



    ]*/ // Fim da barra inferior

});

//================================================================================
//================================================================================
