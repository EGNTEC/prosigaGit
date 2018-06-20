Ext.define('desloc.view.AceitarPrest',{
extend:'Ext.window.Window',
alias:'widget.aceitarpres',
    title:'Data de Finalização',
    height: 180,
    width: 250,
    align: 'stretch',
    modal:true,
    resizable : 'true',
    align:'center',
    autoShow: true,
    //layout:'fit',
    id:'autpres',

    requires:[
          'Ext.util.ComponentDragger',
          'Ext.util.Region',
          'Ext.EventManager',
          'Ext.tab.Panel'
    ],
    items:[
      {
        xtype:'form',
        id:'formlib',
        //layout:'fit',
        defaults:{
              padding: 2,
              anchor:'100%',
              margins: '3 0 0 0'
              //width:490
        },
        items:[
               /*{
                 xtype: 'textareafield',
                 name: 'just',
                 id:'just'
               }*/
               {
                 xtype: 'datefield',
                 fieldLabel: 'Data de Finalização',
                 name: 'dtdes',
                 editable:false,
                 id:'dtdes',
                 format:'d/m/Y',
                 allowBlank:false
               }
           ]
       }
    ],
    dockedItems: [
        {
          xtype: 'toolbar',
          dock: 'bottom',
          items: [
            {
              xtype:'button',
              id:'justValid',
              text: 'Validar',
              iconCls:'icon-accept',
              handler:function(){
                       var formLib = Ext.getCmp('formlib');
                       var winConf  = Ext.getCmp('autpres');

                       var pGrid  = Ext.getCmp('glipre');
                       var pRows = pGrid.getSelectionModel().getSelection();
                            //Vnumseq = selectedRecords[0].get("numseq");
                       var sStore = pGrid.getStore();

                       //var justif   = Ext.getCmp('just').getValue();
                       var datdes  = Ext.getCmp('dtdes').getValue();

                       Ext.apply(sStore.getProxy().extraParams, {
                           just: datdes
                       });

                       sStore.remove(pRows);

                       sStore.sync({
                           success: function() {

                              Ext.Msg.alert('Mensagem','Data de finalização alterada com sucesso.');
                              //pStore.load();
                              Ext.getCmp('autpres').destroy();
                            },
                            failure: function() {}
                      });
                 }
             }
          ]
        }
    ],
    beforeclose:function(){

       Ext.getCmp('autpres').destroy();
    }
});
