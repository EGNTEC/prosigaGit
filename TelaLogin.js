Ext.onReady(function() {
    Ext.QuickTips.init();

    var login = new Ext.FormPanel({
        labelWidth: 80,
        frame: true,
        //title:'Acessar Sistema',
        defaultType: 'textfield',
        bodyPadding: 8,
        monitorValid: true,
        items: [

            {
                xtype: 'textfield',
                fieldLabel: 'Usuario',
                name: 'username',
                margin: '10 0 0 0',
                id: 'user',
                enableKeyEvents: true,
                allowBlank: false,
                listeners: {

                    specialkey: function(field, e) {
                        switch (e.getKey()) {
                            case e.ENTER:
                                e.keyCode = e.TAB;
                                break;
                        }

                    }
                }
            },
            {
                xtype: 'textfield',
                fieldLabel: 'Senha',
                name: 'password',
                margin: '30 0 0 0',
                id: 'pass',
                inputType: 'password',
                allowBlank: false,
                listeners: {
                    specialkey: function(field, e) {

                        if (e.keyCode == e.ENTER) {

                            login.getForm().submit({
                                method: 'post',
                                url: '/php/autent.php',
                                //waitMsg:'Enviando dados…',
                                success: function() {
                                    var redirect = 'principal.php';
                                    window.location.replace(redirect);

                                },
                                failure: function() { Ext.Msg.alert('Aviso', 'Erro ao logar.'); }
                            });
                        }

                    }
                }
            }
        ],
        buttons: [{
            text: 'Entrar',
            handler: function() {
                login.getForm().submit({
                    method: 'post',
                    url: '/php/autent.php',
                    waitMsg: 'Enviando dados…',
                    success: function() {

                        var redirect = 'principal.php';
                        window.location.replace(redirect);
                    },
                    failure: function() { Ext.Msg.alert('Aviso', 'Erro ao logar.'); }
                });

            }

        }]

    });

    var win = new Ext.Window({
        layout: 'fit',
        title: 'Acessar Sistema',
        width: 300,
        height: 210,
        closable: false,
        resizable: false,
        plain: true,
        border: false,
        items: [login]

    });
    win.show();
});