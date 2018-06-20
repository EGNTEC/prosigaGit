Ext.onReady(function() {
    Ext.QuickTips.init();

    var store = Ext.create('Ext.data.Store', {

    fields:['numprg', 'nomprg'],
    data : [
        {"numprg":4002, "nomprg":'Crediamigo'},
        {"numprg":4003, "nomprg":'Agroamigo'}        
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
                id: 'programa',
                fieldLabel: 'Programa',
                displayField: 'nomprg',
                valueField: 'numprg',
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

                  var programa = Ext.getCmp('programa').getValue(); 
                                   
                  window.location.href = 'https://novoprossiga.inec.org.br/validarPrograma.php?programa='+programa;                                   
                    
               }
            }
        ]
    });

    var win = new Ext.Window({
        layout: 'fit',
        title: 'Selecionar Programa',
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