Ext.onReady(function() {
    Ext.QuickTips.init();   

    var store = Ext.create('Ext.data.Store', {

    fields:['numloc', 'nomloc'],
    data : [
        {"numloc":numloc1, "nomloc":nomloc1},
        {"numloc":numloc2, "nomloc":nomloc2}        
    ]
  });

    var login = new Ext.FormPanel({
        labelWidth: 80,
        frame: true,
        bodyPadding: 8,
        items: [

            {
                xtype: 'combo',
                editable: false,
                width: 300,
                id: 'undadicional',
                fieldLabel: 'Unidade',
                displayField: 'nomloc',
                valueField: 'numloc',
                store: store,
                triggerAction: 'all',
                totalProperty: 'total',
                mode: 'local',
                listeners: {
                   
                }
            },
            {
                xtype: 'button',
                id: 'btn_locad',
                text: 'Entrar',
                //hrefTarget: '_blank',
                style: {
                    marginLeft: '310px',
                    marginTop: '-50px'

                },
                handler: function() {

                  var undadicional = Ext.getCmp('undadicional').getValue(); 
                                   
                  window.location.href = 'https://novoprossiga.inec.org.br/validarUnidade.php?numloc='+undadicional;                                   
                    
               }
            }            

        ]
    });

    var win = new Ext.Window({
        layout: 'fit',
        title: 'Selecionar Unidade',
        width: 397,
        height: 110,
        closable: false,
        resizable: false,
        plain: true,
        border: false,
        items: [login]

    });
    win.show();
});