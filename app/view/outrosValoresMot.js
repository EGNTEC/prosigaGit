var cellEditing = Ext.create('Ext.grid.plugin.CellEditing', {
    clicksToEdit: 2
});

//var sm = Ext.create('Ext.selection.CheckboxModel');
Ext.define('desloc.view.outrosValoresMot', {
    extend: 'Ext.window.Window',
    alias: 'widget.outval',
    title: 'Cadastrar novos deslocamentos',
    width: 700,
    height: 500,
    align: 'stretch',
    modal: true,
    resizable: 'true',
    align: 'center',
    autoShow: true,
    autoScroll: true,
    //plain: true,
    //layout:'fit',
    id: 'outval',

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

            var qtdpsg = Ext.getCmp('qtdpsg');
            var valpsg = Ext.getCmp('valpsg');
            var hdini = Ext.getCmp('hdini');
            var hdfim = Ext.getCmp('hdfim');
            var trajeto = Ext.getCmp('trajeto');
            var pedagio = Ext.getCmp('pedagio');
            //var vlrtot = Ext.getCmp('vlrtot');
            var vlrad = Ext.getCmp('vlrad');
            //var tiptra = Ext.getCmp('tiptra');
            dt = '0/00/0000';
            Ext.getCmp('dtdes').setValue(dt);

            Ext.getCmp('trans').show();
            Ext.getCmp('dtdes').setDisabled(false);

            Ext.getCmp('dtdes').hide();
            qtdpsg.hide();
            valpsg.hide();
            hdini.hide();
            hdfim.hide();
            trajeto.hide();
            pedagio.hide();
            //vlrtot.hide();
            //tiptra.hide();
            vlrad.hide();

            //Atualiza as informações da grid outros valores
            var wGrid = Ext.getCmp('gridValAdd');
            var xStore = wGrid.getStore();

            xStore.load({
                params: {
                    numseq: vSeqpre //id
                }

            });
            //Atualiza as informações da combo transporte
            var wCombTrp = Ext.getCmp('trans');
            var StoreComb = wCombTrp.getStore();

            StoreComb.load({
                params: {
                    tiptra: vTiptrp //vTiptrp
                }

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

                var gridNov = Ext.getCmp('gridprNov');
                var sStorePr = gridNov.getStore();

                sStorePr.load({ //manda as informações para atualizar a grid dia-dia.
                    params: { numseq: vSeqpla, tiptrp: vTiptrp, numcad: vNumcad }
                });

            } //Fim do beforeclose.
    },
    items: [{
            xtype: 'form',
            labelWidth: 80,
            height: 200,
            id: 'FormAdd',
            //frame:true,
            layout: 'vbox',
            autoScroll: true,
            defaultType: 'textfield',
            monitorValid: true,
            defaults: {
                padding: 2,
                //anchor:'100%',
                margins: '3 0 0 0'
                    //width:490
            },
            items: [{
                    xtype: 'combo',
                    fieldLabel: 'Transporte',
                    name: 'trans',
                    id: 'trans',
                    emptyText: 'Selecione um Tipo',
                    store: Ext.create('desloc.store.TipTrpAddS'),
                    displayField: 'destrp',
                    valueField: 'tiptrp',
                    triggerAction: 'all',
                    mode: 'local',
                    editable: false,
                    lastQuery: '',
                    listeners: {
                        select: function() {

                            var valcombo = Ext.getCmp('trans').getValue();
                            var qtdpsg = Ext.getCmp('qtdpsg');
                            var valpsg = Ext.getCmp('valpsg');
                            var hdini = Ext.getCmp('hdini');
                            var hdfim = Ext.getCmp('hdfim');
                            var vlrtot = Ext.getCmp('vlrtot');
                            var vlrad = Ext.getCmp('vlrad');
                            var tiptra = Ext.getCmp('tiptra');
                            var trajeto = Ext.getCmp('trajeto');
                            var pedagio = Ext.getCmp('pedagio');
                            var data = Ext.getCmp('dtdes');

                            //console.log(valcombo);

                            if (valcombo == 1) {

                                hdini.show();
                                hdfim.show();
                                data.show();
                                //vlrtot.show();
                                qtdpsg.hide();
                                valpsg.hide();
                                vlrad.hide();
                                pedagio.hide();
                                trajeto.show();
                                trajeto.setMargin('-50 0 0 0');

                            } else
                            if (valcombo == 2) {

                                qtdpsg.show();
                                valpsg.show();
                                vlrad.hide();
                                data.show();
                                //vlrtot.show();
                                hdini.hide();
                                hdfim.hide();
                                pedagio.hide();
                                trajeto.show();
                                trajeto.setMargin('-50 0 0 0');

                            } else {
                                qtdpsg.hide();
                                valpsg.hide();
                                hdini.hide();
                                hdfim.hide();
                                data.show();
                                //vlrtot.hide();
                                //tiptra.hide();
                                vlrad.show();
                                trajeto.hide();
                                pedagio.show();
                                pedagio.setMargin('0 0 0 0');

                            }
                        }
                    }
                },
                {
                    xtype: 'datefield',
                    fieldLabel: 'Data de Deslocamento',
                    name: 'dtdes',
                    editable: false,
                    id: 'dtdes',
                    format: 'd/m/Y',
                    allowBlank: false,
                    margin: '-40 0 0 300',
                    listeners: {

                        change: function() {

                          var dtdes = Ext.getCmp('dtdes').getValue();
                          
                           if(niv == 1){

                           }else{
                            Ext.Ajax.request({
                                url: '/php/Prestacao/BlokFimSem.php',
                                method: 'post',
                                params: {

                                    dtdes: dtdes
                                },
                                success: function(response) {

                                    var result = Ext.JSON.decode(response.responseText);

                                    if (result == 0) {

                                        function showResults(btn) {

                                            if (btn == 'ok') {

                                                var form = Ext.getCmp('FormAdd');
                                                form.getForm().reset();

                                                Ext.getCmp('trans').show();
                                                Ext.getCmp('dtdes').hide();
                                                Ext.getCmp('qtdpsg').hide();
                                                Ext.getCmp('valpsg').hide();
                                                Ext.getCmp('hdini').hide();
                                                Ext.getCmp('hdfim').hide();
                                                Ext.getCmp('trajeto').hide();
                                                Ext.getCmp('pedagio').hide();
                                                Ext.getCmp('vlrad').hide();

                                            }
                                        }

                                        Ext.Msg.show({
                                            title: 'Mensagem',
                                            msg: 'Não é permitido inserir finais de semana.',
                                            buttons: Ext.Msg.OK,
                                            closable: false,
                                            fn: showResults
                                        });

                                    } else {


                                    }

                                }

                            });
                          }//Fim da condição para finais de semana.

                        }
                    }
                },
                {
                    xtype: 'numberfield',
                    fieldLabel: 'Qtd Passagem',
                    hideTrigger: true,
                    name: 'qtdpsg',
                    id: 'qtdpsg',
                    minValue: 0,
                    maxValue: 50,
                    allowBlank: false,
                    listeners: {
                        change: function(field, value) {
                            value = parseInt(value, 10);
                            field.setValue(value);
                        }
                    }
                },
                {
                    xtype: 'numberfield',
                    fieldLabel: 'Valor da Passagem',
                    hideTrigger: true,
                    name: 'valpsg',
                    id: 'valpsg',
                    plugins: 'textmask',
                    mask: 'R$ 9.999.990,00',
                    money: true,
                    allowBlank: false,
                    listeners: {
                        change: function(field, value) {
                            value = parseInt(value, 10);
                            //field.setValue(value);
                            if (value < 0) {

                                field.setValue(value * (-1));
                            }
                        }
                    }
                },
                {
                    xtype: 'numberfield',
                    fieldLabel: 'Hodometro Inicial',
                    hideTrigger: true,
                    name: 'hdini',
                    id: 'hdini',
                    //minValue: 0,
                    //maxValue: 10000,
                    allowBlank: false,
                    listeners: {
                        change: function(field, value) {
                            value = parseInt(value, 10);
                            field.setValue(value);
                        }, //Fim do change
                        blur: function() {

                            var hdI = Ext.getCmp('hdini').getValue();
                            var hdF = Ext.getCmp('hdfim').getValue();

                            if (hdF < hdI && hdF > 0) {

                                function showResults(btn) {

                                    if (btn == 'ok') {

                                        Ext.getCmp('hdini').setValue(0);
                                        Ext.getCmp('hdfim').setValue(0);

                                    }
                                }

                                Ext.Msg.show({
                                    title: 'Mensagem',
                                    msg: 'O hodometro final é menor que o inicial.',
                                    buttons: Ext.Msg.OK,
                                    closable: false,
                                    fn: showResults
                                });

                            }

                        }, //Fim do blur
                        specialkey: function(field, e) {

                                switch (e.getKey()) {

                                    case e.TAB:

                                        var hdI = Ext.getCmp('hdini').getValue();
                                        var hdF = Ext.getCmp('hdfim').getValue();

                                        if (hdF < hdI && hdF > 0) {

                                            function showResults(btn) {

                                                if (btn == 'ok') {

                                                    Ext.getCmp('hdini').setValue(0);
                                                    Ext.getCmp('hdfim').setValue(0);
                                                }
                                            }

                                            Ext.Msg.show({
                                                title: 'Mensagem',
                                                msg: 'O hodometro final é menor que o inicial.',
                                                buttons: Ext.Msg.OK,
                                                closable: false,
                                                fn: showResults
                                            });

                                        }

                                        break;
                                }
                            } //Fim do Specialkey
                    }
                },
                {
                    xtype: 'numberfield',
                    fieldLabel: 'Hodometro Final',
                    hideTrigger: true,
                    name: 'hdfim',
                    id: 'hdfim',
                    //minValue: 0,
                    //maxValue: 10000,
                    allowBlank: false,
                    listeners: {
                        change: function(field, value) {

                            value = parseInt(value, 10);
                            field.setValue(value);

                        }, //Fim do change
                        blur: function() {

                            var hdI = Ext.getCmp('hdini').getValue();
                            var hdF = Ext.getCmp('hdfim').getValue();

                            if (hdF < hdI && hdF > 0) {

                                function showResults(btn) {

                                    if (btn == 'ok') {

                                        Ext.getCmp('hdini').setValue(0);
                                        Ext.getCmp('hdfim').setValue(0);

                                    }
                                }

                                Ext.Msg.show({
                                    title: 'Mensagem',
                                    msg: 'O hodometro final é menor que o inicial.',
                                    buttons: Ext.Msg.OK,
                                    closable: false,
                                    fn: showResults
                                });

                            }

                        }, //Fim do blur
                        specialkey: function(field, e) {

                                switch (e.getKey()) {

                                    case e.TAB:

                                        var hdI = Ext.getCmp('hdini').getValue();
                                        var hdF = Ext.getCmp('hdfim').getValue();

                                        if (hdF < hdI && hdF > 0) {

                                            function showResults(btn) {

                                                if (btn == 'ok') {

                                                    Ext.getCmp('hdini').setValue(0);
                                                    Ext.getCmp('hdfim').setValue(0);
                                                }
                                            }

                                            Ext.Msg.show({
                                                title: 'Mensagem',
                                                msg: 'O hodometro final é menor que o inicial.',
                                                buttons: Ext.Msg.OK,
                                                closable: false,
                                                fn: showResults
                                            });

                                        }

                                        break;
                                }
                            } //Fim do Specialkey
                    }
                },
                {
                    xtype: 'numberfield',
                    fieldLabel: 'Valor',
                    hideTrigger: true,
                    name: 'vlrad',
                    id: 'vlrad',
                    plugins: 'textmask',
                    mask: 'R$ 9.999.990,00',
                    money: true,
                    allowBlank: false,
                    listeners: {
                        change: function(field, value) {
                            value = parseInt(value, 10);
                            if (value < 0) {

                                field.setValue(value * (-1));
                            }
                        }
                    }
                },
                {
                    xtype: 'textareafield',
                    fieldLabel: 'Trajeto',
                    name: 'trajeto',
                    id: 'trajeto',
                    margin: '-30 0 0 300'
                },
                {
                    xtype: 'textareafield',
                    fieldLabel: 'Pedágio',
                    name: 'pedagio',
                    id: 'pedagio',
                    margin: '-30 0 0 300'
                }

            ],
            /*bbar:[


            ]*/
        }, // Fim do form.
        {
            xtype: 'grid',
            id: 'gridValAdd',
            //selModel: sm,
            selModel: {
                selType: 'checkboxmodel',
                mode: 'MULTI'
            },
            autoScroll: true,
            layout: 'fit',
            store: Ext.create('desloc.store.ValorAdicionalS'),
            columns: [

                {
                    header: 'Id',
                    id: 'numseqAdd',
                    name: 'numseqAdd',
                    dataIndex: 'numseq',
                    hidden: true,
                    menuDisabled: true,
                    editor: {
                        // defaults to textfield if no xtype is supplied
                        allowBlank: false
                    }
                },
                {
                    header: 'Id Abertura',
                    id: 'seqpreAdd',
                    name: 'seqpreAdd',
                    dataIndex: 'seqpre',
                    hidden: true,
                    menuDisabled: true
                },
                {
                    xtype: 'datecolumn',
                    header: 'Data',
                    id: 'datprest',
                    menuDisabled: true,
                    name: 'datprest',
                    dataIndex: 'datpre',
                    width: 132,
                    renderer: Ext.util.Format.dateRenderer('d/m/Y')

                },
                {
                    header: 'Tipo',
                    id: 'desevt',
                    name: 'desevt',
                    dataIndex: 'destrp',
                    menuDisabled: true

                },
                {
                    xtype: 'numbercolumn',
                    header: 'Valor',
                    name: 'vlradic',
                    menuDisabled: true,
                    id: 'vlradic',
                    dataIndex: 'vlrdes',
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

                },
                {
                    header: 'Descrição',
                    dataIndex: 'juspre',
                    id: 'jusprest',
                    flex: 1,
                    menuDisabled: true
                }

            ],
            plugins: [cellEditing]


        } //Fim da grid

    ],
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'bottom',
        items: [

            {
                text: 'Inserir',
                iconCls: 'icon-add',
                handler: function() {
                        var Abrgrid = Ext.getCmp('gridpre'); //grid abertura prestação
                        var selectedRecords = Abrgrid.getSelectionModel().getSelection();
                        var vSeqpre = vSeqpla; //selectedRecords[0].get("numseq");
                        var vNumcad = vNumcad; //selectedRecords[0].get("numcad");
                        var vTiptrp = vTiptrp; //selectedRecords[0].get("tiptrp");
                        var vMesRef = vMesRef; //selectedRecords[0].get("mesref");

                        var grid = Ext.getCmp('gridprNov'); //grid cadastro de prestação
                        var gridAdd = Ext.getCmp('gridValAdd'); //grid de valor adicional
                        var addStore = gridAdd.getStore();

                        var sStore = grid.getStore();
                        //var valcombo = Ext.getCmp('vlradd').getValue();
                        var qtdpsg = Ext.getCmp('qtdpsg').getValue();
                        var valpsg = Ext.getCmp('valpsg').getValue();
                        var hdini = Ext.getCmp('hdini').getValue();
                        var hdfim = Ext.getCmp('hdfim').getValue();
                        //var vlrtot   = Ext.getCmp('vlrtot').getValue();
                        var vlrad = Ext.getCmp('vlrad').getValue();
                        var transp = Ext.getCmp('trans').getValue();
                        var dtdes = Ext.getCmp('dtdes').getValue();
                        var trajeto = Ext.getCmp('trajeto').getValue();
                        var pedagio = Ext.getCmp('pedagio').getValue();
                        var Btn = 1;

                        Ext.Ajax.request({
                            url: '/php/Prestacao/outrosValores.php',
                            method: 'post',
                            params: {

                                //vlradd:valcombo,
                                tiptra: transp, //tiptra:vTiptrp,
                                numseq: vSeqpre,
                                dtdes: dtdes,
                                mesref: vMesRef,
                                hdini: hdini,
                                hdfim: hdfim,
                                //id:Tnumseq,
                                trajeto: trajeto,
                                pedagio: pedagio,
                                valpsg: valpsg,
                                qtdpsg: qtdpsg,
                                vlrad: vlrad,
                                btn: Btn

                            },
                            success: function(response) {

                                var result = Ext.JSON.decode(response.responseText);

                                if (result == 0) {

                                    function showResults(btn) {

                                        if (btn == 'ok') {

                                            sStore.load({
                                                params: { numseq: vSeqpre, tiptrp: vTiptrp, numcad: vNumcad }
                                            });

                                            addStore.load({
                                                params: { numseq: vSeqpre }
                                            });

                                            var form = Ext.getCmp('FormAdd');
                                            form.getForm().reset();

                                            Ext.getCmp('trans').show();
                                            Ext.getCmp('dtdes').hide();
                                            Ext.getCmp('qtdpsg').hide();
                                            Ext.getCmp('valpsg').hide();
                                            Ext.getCmp('hdini').hide();
                                            Ext.getCmp('hdfim').hide();
                                            Ext.getCmp('trajeto').hide();
                                            Ext.getCmp('pedagio').hide();
                                            Ext.getCmp('vlrad').hide();

                                        }
                                    }

                                    Ext.Msg.show({
                                        title: 'Mensagem',
                                        msg: 'Registro cadastrado com sucesso.',
                                        buttons: Ext.Msg.OK,
                                        closable: false,
                                        fn: showResults
                                    });

                                } else
                                if (result == 2) {

                                    Ext.Msg.alert('Mensagem', 'Tipo de transporte já cadastrado para esta data.');
                                    var form = Ext.getCmp('FormAdd');
                                    form.getForm().reset();

                                    Ext.getCmp('trans').show();
                                    Ext.getCmp('dtdes').hide();
                                    Ext.getCmp('qtdpsg').hide();
                                    Ext.getCmp('valpsg').hide();
                                    Ext.getCmp('hdini').hide();
                                    Ext.getCmp('hdfim').hide();
                                    Ext.getCmp('trajeto').hide();
                                    Ext.getCmp('pedagio').hide();
                                    Ext.getCmp('vlrad').hide();

                                } else
                                if (result == 6) {

                                    Ext.Msg.alert('Mensagem', 'Pedágio já cadastrado para esta data.');
                                    var form = Ext.getCmp('FormAdd');
                                    form.getForm().reset();

                                    Ext.getCmp('trans').show();
                                    Ext.getCmp('dtdes').hide();
                                    Ext.getCmp('qtdpsg').hide();
                                    Ext.getCmp('valpsg').hide();
                                    Ext.getCmp('hdini').hide();
                                    Ext.getCmp('hdfim').hide();
                                    Ext.getCmp('trajeto').hide();
                                    Ext.getCmp('pedagio').hide();
                                    Ext.getCmp('vlrad').hide();

                                } else
                                if (result == 4) {

                                    Ext.Msg.alert('Mensagem', 'Selecione um transporte.');
                                    var form = Ext.getCmp('FormAdd');
                                    form.getForm().reset();

                                    Ext.getCmp('trans').show();
                                    Ext.getCmp('dtdes').hide();
                                    Ext.getCmp('qtdpsg').hide();
                                    Ext.getCmp('valpsg').hide();
                                    Ext.getCmp('hdini').hide();
                                    Ext.getCmp('hdfim').hide();
                                    Ext.getCmp('trajeto').hide();
                                    Ext.getCmp('pedagio').hide();
                                    Ext.getCmp('vlrad').hide();

                                } else
                                if (result == 5) {

                                    Ext.Msg.alert('Mensagem', 'Preencha todos os campos.');
                                    var form = Ext.getCmp('FormAdd');
                                    form.getForm().reset();

                                    Ext.getCmp('trans').show();
                                    Ext.getCmp('dtdes').hide();
                                    Ext.getCmp('qtdpsg').hide();
                                    Ext.getCmp('valpsg').hide();
                                    Ext.getCmp('hdini').hide();
                                    Ext.getCmp('hdfim').hide();
                                    Ext.getCmp('trajeto').hide();
                                    Ext.getCmp('pedagio').hide();
                                    Ext.getCmp('vlrad').hide();

                                } else {

                                    Ext.Msg.alert('Mensagem', 'Não foi possível cadastrar o registro.');
                                    //sStore.load();reset();
                                    Ext.getCmp('trans').show();
                                    Ext.getCmp('dtdes').hide();
                                    Ext.getCmp('qtdpsg').hide();
                                    Ext.getCmp('valpsg').hide();
                                    Ext.getCmp('hdini').hide();
                                    Ext.getCmp('hdfim').hide();
                                    Ext.getCmp('trajeto').hide();
                                    Ext.getCmp('pedagio').hide();
                                    Ext.getCmp('vlrad').hide();

                                    Ext.getCmp('trans').reset()
                                    Ext.getCmp('dtdes').reset()
                                    Ext.getCmp('qtdpsg').reset()
                                    Ext.getCmp('valpsg').reset()
                                    Ext.getCmp('hdini').reset()
                                    Ext.getCmp('hdfim').reset()
                                    Ext.getCmp('trajeto').reset()
                                    Ext.getCmp('pedagio').reset()
                                    Ext.getCmp('vlrad').reset()
                                }

                            }

                        });
                    } //Fim da função click(hendler)
            }, //Fim do botão salvar
            {
                text: 'Excluir',
                iconCls: 'icon-delete',
                handler: function() {

                    var qGrid = Ext.getCmp('gridValAdd');
                    var pStore = qGrid.getStore();
                    var pRows = qGrid.getSelectionModel().getSelection();

                    pStore.remove(pRows);

                    if (pRows.length) {
                        pStore.sync({
                            success: function() {

                                Ext.Msg.alert('Mensagem', 'Registro excluído com sucesso.');
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

                        var grid = Ext.getCmp('gridpre'); //grid cadastro de prestação
                        var selectedRecords = grid.getSelectionModel().getSelection();
                        var vSeqpla = vSeqpla; //selectedRecords[0].get("numseq");
                        var vTiptrp = vTiptrp; //selectedRecords[0].get("tiptrp");
                        var vNumcad = vNumcad; //selectedRecords[0].get("numcad");

                        var gridNov = Ext.getCmp('gridprNov');
                        var sStorePr = gridNov.getStore();

                        sStorePr.load({ //manda as informações para atualizar a grid dia-dia.
                            params: { numseq: vSeqpla, tiptrp: vTiptrp, numcad: vNumcad }
                        });

                        Ext.getCmp('outval').close();
                    }
                }
            }
        ]
    }]
});
