Ext.define('desloc.view.outrosValores',{
extend:'Ext.window.Window',
alias:'widget.outval',
    title: 'Cadastrar novos valores',
    width:330,
    height:300,
    align: 'stretch',
    modal:true,
    resizable : 'true',
    align:'center',
    autoShow: true,
    autoScroll:true,
    plain: true,
    layout:'fit',
    id:'outval',

    requires:[
          'Ext.util.ComponentDragger', 
          'Ext.util.Region',
          'Ext.ux.TextMaskPlugin',
          'Ext.EventManager',
          'Ext.tab.Panel'           
    ],
    listeners:{
     //Acrecentar funções da Janela
      beforerender:function(){
                                   
          //valcombo = 0;                     
                                       
          var qtdpsg = Ext.getCmp('qtdpsg');
          var valpsg = Ext.getCmp('valpsg');                                                                      
          var hdini  = Ext.getCmp('hdini');                                                               
          var hdfim  = Ext.getCmp('hdfim');                                                                 
          //var vlrtot = Ext.getCmp('vlrtot');
          var vlrad  = Ext.getCmp('vlrad');
          //var tiptra = Ext.getCmp('tiptra');
            dt = '0/00/0000';
          Ext.getCmp('dtdes').setValue(dt);
          
          Ext.getCmp('trans').hide();
          Ext.getCmp('dtdes').setDisabled(false); 
          
          qtdpsg.hide();
          valpsg.hide();
          hdini.hide();
          hdfim.hide();
          //vlrtot.hide();
          //tiptra.hide();
          vlrad.show();                                                                      
      }
    },          
    items:[
      {
        xtype:'form',
        labelWidth:80,
        id:'FormAdd',
        frame:true,
        layout:'vbox',
        defaultType:'textfield',
        monitorValid:true,
        defaults:{
              padding: 2,
              anchor:'100%',
              margins: '3 0 0 0'
              //width:490
         }, 
        items:[
                 {   
                    xtype: 'combo',
                    fieldLabel:'Transporte',
                    name:'trans',
                    id:'trans',
                    emptyText:'Selecione um Tipo',
                    store: Ext.create('desloc.store.TipoTransS'),
                    displayField:'destrp',
                    valueField:'tiptrp',
                    triggerAction:'all',
                    mode:'local',
                    listeners:{
                       select:function(){
                          var valcombo = Ext.getCmp('trans').getValue();
                          var qtdpsg = Ext.getCmp('qtdpsg');
                          var valpsg = Ext.getCmp('valpsg');                                                                      
                          var hdini  = Ext.getCmp('hdini');                                                               
                          var hdfim  = Ext.getCmp('hdfim');                                                                 
                          var vlrtot = Ext.getCmp('vlrtot');
                          var vlrad  = Ext.getCmp('vlrad');
                          var tiptra = Ext.getCmp('tiptra'); 
                                 //console.log(valcombo);
                    
                           if(valcombo==1) {
                    
                             hdini.show();
                             hdfim.show();
                             //vlrtot.show();
                             qtdpsg.hide();
                             valpsg.hide(); 
                             vlrad.hide();
                    
                           }else{
                             
                             qtdpsg.show();
                             valpsg.show();   
                             vlrad.hide();
                             //vlrtot.show();
                             hdini.hide();
                             hdfim.hide();
                
                           }
                       }
                   }
                 },
                 {    
                    xtype: 'datefield',
                    fieldLabel: 'Data de Deslocamento',
                    name: 'dtdes',
                    id:'dtdes',
                    format:'d/m/Y',
                    allowBlank:false
                 },
                 {   
                    xtype: 'numberfield',
                    fieldLabel: 'Qtd Passagem',
                    name: 'qtdpsg',
                    id:'qtdpsg',
                    minValue: 0,
                    maxValue: 50,
                    allowBlank:false
                 },
                 {
                    xtype: 'numberfield',
                    fieldLabel:'Valor da Passagem',
                    name: 'valpsg',
                    id: 'valpsg',
                    plugins:'textmask',
                    mask: 'R$ #9.999.990,00',
                    money: true,
                    minValue: 0,
                    maxValue: 1000,
                    allowBlank:false
                 },
                 {
                    xtype: 'numberfield',
                    fieldLabel: 'Hodometro Inicial',
                    name: 'hdini',
                    id: 'hdini',
                    minValue: 0,
                    maxValue: 10000,
                    allowBlank:false
                 },
                 {
                    xtype: 'numberfield',
                    fieldLabel: 'Hodometro Final',
                    name: 'hdfim',
                    id: 'hdfim',
                    minValue: 0,
                    maxValue: 10000,
                    allowBlank:false
                 },
                 {
                    xtype: 'numberfield',
                    fieldLabel: 'Valor',
                    name: 'vlrad',
                    id: 'vlrad',
                    plugins:'textmask',
                    mask: 'R$ #9.999.990,00',
                    money: true,
                    allowBlank:false
                 },
                 {
                    xtype: 'textareafield',
                    fieldLabel: 'Trajeto',
                    name: 'trajeto',
                    id:'trajeto'
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
                     text:'Salvar',
                     iconCls:'icon-save',
                     handler:function(){
                           var Abrgrid = Ext.getCmp('gridpre'); //grid abertura prestação
                           var selectedRecords = Abrgrid.getSelectionModel().getSelection(); 
                           var vSeqpre = selectedRecords[0].get("numseq");
                           var vNumcad = selectedRecords[0].get("numcad");
                           var vTiptrp = selectedRecords[0].get("tiptrp");

                           var grid     = Ext.getCmp('gridpr');//grid cadastro de prestação

                           var sStore   = grid.getStore();
                           //var valcombo = Ext.getCmp('vlradd').getValue();
                           var qtdpsg   = Ext.getCmp('qtdpsg').getValue();
                           var valpsg   = Ext.getCmp('valpsg').getValue();                                                                      
                           var hdini    = Ext.getCmp('hdini').getValue();                                                               
                           var hdfim    = Ext.getCmp('hdfim').getValue();                                                                 
                           //var vlrtot   = Ext.getCmp('vlrtot').getValue();
                           var vlrad    = Ext.getCmp('vlrad').getValue();
                           var transp   = Ext.getCmp('trans').getValue();
                           var dtdes    = Ext.getCmp('dtdes').getValue();
                           var trajeto  = Ext.getCmp('trajeto').getValue();
                           var Btn      = 1;
                      
                           Ext.Ajax.request({
                                url:'/php/Prestacao/outrosValores.php',
                                method:'post',
                                params: {
                      
                                  //vlradd:valcombo, 
                                  tiptra:vTiptrp,  //tiptra:vTiptrp,
                                  numseq:vSeqpre,
                                  dtdes:dtdes, 
                                  hdini:hdini,
                                  hdfim:hdfim,
                                  //id:Tnumseq, 
                                  trajeto:trajeto,
                                  valpsg:valpsg,
                                  qtdpsg:qtdpsg,
                                  vlrad:vlrad,
                                  btn:Btn
                      
                                 },
                                 success: function(conn, response, options, eOpts){
                                
                                  var result = Ext.JSON.decode(conn.responseText, true); 
                             
                                  if (!result){ // caso seja null
                                     result = {};
                                     result.success = true;
                                 } 
                             
                              if(result.success){   
                                              
                                Ext.Msg.alert('Mensagem','Registro cadastrado com Sucesso!',function(btn,text){
                           
                                   if(btn=="ok"){
                                      
                                      sStore.load({
                                          params: {numseq: vSeqpre, tiptrp:vTiptrp, numcad:vNumcad }
                                       });

                                      var form = Ext.getCmp('FormAdd');    
                                      var outval  = Ext.getCmp('outval');
                                        form.getForm().reset();
                                        outval.destroy();
                                   }
                              });
                             
                              }else{
                                 
                                 Ext.Msg.alert('Mensagem','Não foi possível cadastrar o registro!');
                                 sStore.load();
                              }
                                   
                            }
                          
                          });
                       } //Fim da função click(hendler)
                   },
                   {
                      text:'Fechar',
                      iconCls:'icon-fechar',
                      handler:function(){

                         var form = Ext.getCmp('FormAdd');
                         var outval  = Ext.getCmp('outval');

                         form.getForm().reset();
                         outval.destroy();
                      }
                  }
             ] 
         }
     ]

});
