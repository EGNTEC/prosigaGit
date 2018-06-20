Ext.define('desloc.view.ConfirmJust', {
    extend: 'Ext.window.Window',
    alias: 'widget.confjust',
    title: 'Justificativa',
    height: 350,
    width: 450,
    align: 'stretch',
    modal: true,
    resizable: 'true',
    align: 'center',
    autoShow: true,
    layout: 'fit',
    id: 'confjust',

    requires: [
        'Ext.util.ComponentDragger',
        'Ext.util.Region',
        'Ext.EventManager',
        'Ext.tab.Panel'
    ],
    items: [{
        xtype: 'form',
        id: 'formconf',
        layout: 'fit',
        defaults: {
            padding: 2,
            anchor: '100%',
            margins: '3 0 0 0'
                //width:490
        },
        items: [{
            xtype: 'textareafield',
            name: 'just',
            id: 'just',
            //value: juspre,
            //readOnly:false
            disabled: true
        }]
    }],
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'bottom',
        items: [{
                xtype: 'button',
                id: 'justValid',
                text: 'Autorizar',
                iconCls: 'icon-accept',
                //href: 'https://novoprossiga.inec.org.br/php/Prestacao/ArqPrest.php',
                href: 'http://novoprossiga.inec.org.br/ArqPrest.php',
                handler: function() {
                        var formConf = Ext.getCmp('formconf');
                        var winConf = Ext.getCmp('confjust');

                        var pGrid = Ext.getCmp('gridpre');
                        var hJanGrid = Ext.getCmp('cadprNovGer');
                        var sStore = pGrid.getStore();

                        var comboSts = Ext.getCmp('statusCombo');
                        var justif = Ext.getCmp('just');

                        //Gerar arquivo de prestação
                        var sPanelGridGer = Ext.getCmp('gridpre');
                        var comboUso = Ext.getCmp('usuCombo').getValue();
                        var comboUnid = Ext.getCmp('uniCombo').getValue();
                        var comboReg = Ext.getCmp('regCombo').getValue();
                        var comboSts = Ext.getCmp('statusCombo').getValue();
                        var comboMes = Ext.getCmp('mesCombo').getValue();
                        var comboAno = Ext.getCmp('anoCombo').getValue();

                        var sStore = sPanelGridGer.getStore();
                        var selectedRecords = sPanelGridGer.getSelectionModel().getSelection();
                        var stpre = selectedRecords[0].get("stspre");

                        var btnQ = Ext.getCmp('justValid');

                        vId = selectedRecords[0].get("numseq");
                        vMat = selectedRecords[0].get("numcad");
                        vIdtrans = selectedRecords[0].get("tiptrp");
                        vNom = selectedRecords[0].get("nomfun");
                        vIdpla = selectedRecords[0].get("seqpla");
                        vTotkm = selectedRecords[0].get("qtdkm");
                        vTotpre = selectedRecords[0].get("vlrpre");
                        vMesref = selectedRecords[0].get("mesref");
                        //

                        formConf.getForm().submit({
                            method: 'post',
                            url: '/php/Prestacao/AceitarJust.php',
                            params: {
                                btn: 0,
                                id: vIdAbrt,
                                just: justif.getValue(),
                                niv: niv,
                                tiptrp: Vtiptrp,
                                vlrpre: vlrpre,
                                nomfun: Vnomfun,
                                destrp: Vdestrp,
                                numcad: Vnumcad,
                                sts: stpre
                            },
                            waitMsg: 'Verificando dados…',
                            success: function() {

                                /*Ext.Msg.alert('Mensagem', 'A prestação de contas foi autorizada com sucesso.', function(btn, text) {
                                    if (btn == 'ok') {

                                        winConf.destroy();
                                        hJanGrid.destroy();
                                        sStore.load({

                                            params: {

                                                mat: comboUso,
                                                unid: comboUnid,
                                                reg: comboReg,
                                                sts: comboSts,
                                                mes: comboMes,
                                                ano: comboAno
                                            }

                                        });
                                    }
                                });*/
                                function showResult(btn) {

                                    if (btn == 'ok') {

                                        winConf.destroy();
                                        hJanGrid.destroy();
                                        sStore.load({

                                            params: {

                                                mat: comboUso,
                                                unid: comboUnid,
                                                reg: comboReg,
                                                sts: comboSts,
                                                mes: comboMes,
                                                ano: comboAno
                                            }

                                        });
                                    }
                                }

                                Ext.Msg.show({
                                    title: 'Mensagem',
                                    msg: 'Prestação de contas autorizada com sucesso.',
                                    buttons: Ext.Msg.OK,
                                    closable: false,
                                    fn: showResult
                                });

                            },
                            failure: function() { Ext.Msg.alert('Mensagem', 'Problema ao confirma justificativa.'); }
                        });

                        btnQ.setParams({ id: vId, mat: vMat, idtrans: vIdtrans, nom: vNom, idpla: vIdpla, qtdkm: vTotkm, totpre: vTotpre, mesref: vMesref, colaborador: col, cargo: nomcargo });

                    } //Fim do click
            },
            {
                xtype: 'button',
                id: 'btn_val',
                text: 'Validar',
                iconCls: 'icon-accept',
                handler: function() {
                        var formConf = Ext.getCmp('formconf');
                        var winConf = Ext.getCmp('confjust');

                        var pGrid = Ext.getCmp('gridpre');
                        var hJanGrid = Ext.getCmp('cadprNovGer');
                        var sStore = pGrid.getStore();

                        var comboSts = Ext.getCmp('statusCombo');
                        var justif = Ext.getCmp('just');

                        //Gerar arquivo de prestação
                        var sPanelGridGer = Ext.getCmp('gridpre');
                        var comboUso = Ext.getCmp('usuCombo').getValue();
                        var comboUnid = Ext.getCmp('uniCombo').getValue();
                        var comboReg = Ext.getCmp('regCombo').getValue();
                        var comboSts = Ext.getCmp('statusCombo').getValue();
                        var comboMes = Ext.getCmp('mesCombo').getValue();
                        var comboAno = Ext.getCmp('anoCombo').getValue();

                        var sStore = sPanelGridGer.getStore();
                        var selectedRecords = sPanelGridGer.getSelectionModel().getSelection();
                        var stpre = selectedRecords[0].get("stspre");

                        var btnQ = Ext.getCmp('justValid');

                        vId = selectedRecords[0].get("numseq");
                        vMat = selectedRecords[0].get("numcad");
                        vIdtrans = selectedRecords[0].get("tiptrp");
                        vNom = selectedRecords[0].get("nomfun");
                        vIdpla = selectedRecords[0].get("seqpla");
                        vTotkm = selectedRecords[0].get("qtdkm");
                        vTotpre = selectedRecords[0].get("vlrpre");
                        vMesref = selectedRecords[0].get("mesref");


                        formConf.getForm().submit({
                            method: 'post',
                            url: '/php/Prestacao/AceitarJust.php',
                            params: {
                                btn: 0,
                                id: vIdAbrt,
                                just: justif.getValue(),
                                niv: niv,
                                tiptrp: Vtiptrp,
                                vlrpre: vlrpre,
                                nomfun: Vnomfun,
                                destrp: Vdestrp,
                                numcad: Vnumcad,
                                sts: stpre
                            },
                            waitMsg: 'Verificando dados…',
                            success: function() {

                                function showResult(btn) {

                                    if (btn == 'ok') {

                                        winConf.destroy();
                                        hJanGrid.destroy();
                                        Ext.getCmp('btn_autori').setDisabled(false);
                                        Ext.getCmp('btn_reab').setDisabled(false);

                                        sStore.load({

                                            params: {

                                                mat: comboUso,
                                                unid: comboUnid,
                                                reg: comboReg,
                                                sts: comboSts,
                                                mes: comboMes,
                                                ano: comboAno
                                            }

                                        });

                                        //Tratamento para verificar se existe valores acima do teto.
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
                                                           var aStore = pGrid.getStore();
                                                           aStore.load({
                                                               params: {
                                                                   mat: comboUso,
                                                                   unid: comboUnid,
                                                                   reg: comboReg,
                                                                   sts: comboSts,
                                                                   mes: comboMes,
                                                                   ano: comboAno,
                                                                   botao: bt,
                                                                   btconf: 99
                                                                }
                                                            });
                                                         }
                                                    });

                                                } else { //Se não obtiver valore acima do teto.

                                                  var aStore = pGrid.getStore();
                                                  aStore.load({
                                                      params: {
                                                          mat: comboUso,
                                                          unid: comboUnid,
                                                          reg: comboReg,
                                                          sts: comboSts,
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
                                        //Fim
                                    }
                                }

                                Ext.Msg.show({
                                    title: 'Mensagem',
                                    msg: 'Prestação de contas validada com sucesso.',
                                    buttons: Ext.Msg.OK,
                                    closable: false,
                                    fn: showResult
                                });

                            },
                            failure: function() { Ext.Msg.alert('Mensagem', 'Problema ao confirma justificativa.'); }
                        });

                        //btnQ.setParams({id:vId,mat:vMat,idtrans:vIdtrans,nom:vNom,idpla:vIdpla,qtdkm:vTotkm,totpre:vTotpre,mesref:vMesref,colaborador:col,cargo:nomcargo});

                    } //Fim do click
            },
            {

                xtype: 'button',
                id: 'justReab',
                text: 'Reabrir',
                iconCls: 'icon-delete',
                handler: function() {

                    var formConf = Ext.getCmp('formconf');
                    var winConf = Ext.getCmp('confjust');

                    var pGrid = Ext.getCmp('gridpre');
                    var hJanGrid = Ext.getCmp('cadprNovGer');
                    var sStore = pGrid.getStore();

                    var comboSts = Ext.getCmp('statusCombo');
                    var comboUso = Ext.getCmp('usuCombo').getValue();
                    var comboUnid = Ext.getCmp('uniCombo').getValue();
                    var comboReg = Ext.getCmp('regCombo').getValue();
                    var comboMes = Ext.getCmp('mesCombo').getValue();
                    var comboAno = Ext.getCmp('anoCombo').getValue();
                    var justif = Ext.getCmp('just');
                  //var comboSts = Ext.getCmp('statusCombo').getValue();

                    var sPanelGridGer = Ext.getCmp('gridpre');
                    var sStore = sPanelGridGer.getStore();
                    var selectedRecords = sPanelGridGer.getSelectionModel().getSelection();
                    var stpre = selectedRecords[0].get("stspre");

                    var confBox = Ext.MessageBox;

                    confBox.buttonText = {
                        cancel: 'cancelText',
                        no: 'Não',
                        ok: 'Ok',
                        yes: 'Sim'
                    };

                    confBox.confirm('Mensagem', 'Deseja reabrir a prestação de contas?', function(btn, text) {

                        if (btn == 'yes') {

                            formConf.getForm().submit({
                                method: 'post',
                                url: '/php/Prestacao/AceitarJust.php',
                                params: {
                                    btn: 1,
                                    id: vIdAbrt,
                                    niv: niv,
                                    just: justif.getValue(),
                                    sts: stpre
                                },
                                success: function() {

                                    Ext.Msg.alert('Mensagem', 'Prestação de contas reaberta com sucesso.', function(btn, text) {
                                        if (btn == 'ok') {

                                            //winConf.hide();
                                            //Ext.getCmp('wincadpre').hide();
                                            //sStore.load();
                                            sStore.load({
                                                params: {
                                                    sts: comboSts.getValue(),
                                                    mat: comboUso,
                                                    unid: comboUnid,
                                                    reg: comboReg
                                                }
                                            });

                                            //Tratamento para verificar se existe valores acima do teto.
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
                                                               var aStore = pGrid.getStore();
                                                               aStore.load({
                                                                   params: {
                                                                       mat: comboUso,
                                                                       unid: comboUnid,
                                                                       reg: comboReg,
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

                                                      var aStore = pGrid.getStore();
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

                                                      //Ext.getCmp('btn_autori').setDisabled(false);
                                                      //Ext.getCmp('btn_reab').setDisabled(false);
                                                    }
                                                },
                                                failure: function() {
                                                  //Ext.Msg.alert('Msg','Problema Na Base de Dados!');
                                                 }
                                              });//Fim do Ajax

                                            //Fim

                                            winConf.destroy();
                                            hJanGrid.destroy();
                                        }
                                    });
                                },
                                failure: function() { Ext.Msg.alert('Mensagem', 'Problema ao reabrir prestação.'); }
                            });

                        } else {


                        }
                    });
                }
            }
        ]
    }],
    listeners: {

        beforerender: function() {
            var sPanelGridGer = Ext.getCmp('gridpre');
            var selectedRecords = sPanelGridGer.getSelectionModel().getSelection();
            var stpre = selectedRecords[0].get("stspre");

            var comboSts = Ext.getCmp('statusCombo');
            var comboStatus = comboSts.getValue();
            Ext.getCmp('just').setValue(juspre);

            if (stpre == 2 && niv == 3) {

                Ext.getCmp('justValid').hide(); //.setDisabled(true);
                Ext.getCmp('justReab').hide(); //.setDisabled(true);
                Ext.getCmp('btn_val').hide();
            }
        },
        beforeclose:function(){
             //alert('teste');
             Ext.getCmp('confjust').destroy();
        }
    }

});
