Ext.define('desloc.view.JustificativaTeto', {
    extend: 'Ext.window.Window',
    alias: 'widget.justteto',
    title: 'Informe sua justificativa',
    height: 300,
    width: 350,
    align: 'stretch',
    modal: true,
    resizable: 'true',
    align: 'center',
    autoShow: true,
    layout: 'fit',
    id: 'justificativa',

    requires: [
        'Ext.util.ComponentDragger',
        'Ext.util.Region',
        'Ext.EventManager',
        'Ext.tab.Panel'
    ],
    items: [{
        xtype: 'form',
        id: 'formJust',
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
            id: 'just'
        }]
    }],
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'bottom',
        items: [{
                xtype: 'button',
                text: 'Salvar',
                iconCls: 'icon-save',
                handler: function() {
                    var formJust = Ext.getCmp('formJust');
                    var winJust = Ext.getCmp('justificativa');
                    var justific = Ext.getCmp('just').getValue();

                    var pGrid = Ext.getCmp('gridpre');
                    var nJan = Ext.getCmp('cadprNov');
                    var pStore = pGrid.getStore();

                    var comboSts = Ext.getCmp('statusCombo');

                    Ext.Ajax.request({
                        method: 'post',
                        url: '/php/Prestacao/JustPrest.php',
                        params: {
                            id: vIdAbrt,
                            just: justific
                        },
                        //waitMsg:'Enviando dados…',
                        success: function(response) {

                            var result = Ext.JSON.decode(response.responseText);

                            if (result == 0) {

                                Ext.Msg.alert('Mensagem', 'Prestação de contas finalizada com sucesso.', function(btn, text) {
                                    if (btn == 'ok') {

                                        winJust.destroy();
                                        nJan.destroy();
                                        pStore.load({
                                            params: {
                                                sts: comboSts.getValue(),
                                                mat: Ext.getCmp('usuCombo').getValue(),
                                                btn: 0
                                            }
                                        });
                                    }
                                });
                            } else
                            if (result == 1) {

                                Ext.Msg.alert('Mensagem', 'Justifique o valor utilizado para finalizar a prestação de contas.');
                            }

                        },
                        failure: function() { Ext.Msg.alert('Mensagem', 'Erro ao cadastrar justificativa.'); }
                    });
                }
            }

        ]
    }]

});