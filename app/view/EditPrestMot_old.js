Ext.define('desloc.view.EditPrestMot',{
extend:'Ext.window.Window',
alias:'widget.editprest',
    title: 'Editar Registro',
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
    id:'editprest',

    requires:[
          'Ext.util.ComponentDragger',
          'Ext.ux.TextMaskPlugin', 
          'Ext.util.Region',
          'Ext.EventManager',
          'Ext.tab.Panel'           
    ],
    listeners:{
     //Acrecentar funções da Janela
      beforerender:function(){     
          //valcombo = 0;                     
                              
          var gcadGrid = Ext.getCmp('gridprMot');
          var selectedRecords = gcadGrid.getSelectionModel().getSelection();
          var Tnumseq = selectedRecords[0].get("numseq");
          var vTiptrp = selectedRecords[0].get("destrp");
          var dtpre = selectedRecords[0].get("datpre");
          var kmpre = selectedRecords[0].get("quilometro");
          var deslocpre = selectedRecords[0].get("juspre");
          //var vlpass = selectedRecords[0].get("valpass");
          var odoini = selectedRecords[0].get("odoini");
          var odofim = selectedRecords[0].get("odofim");
          var vlrdes = selectedRecords[0].get("vlrdes");
          var qtdpass= selectedRecords[0].get("qtdpass");

          var qtdpsg = Ext.getCmp('qtdpsg');
          var valpsg = Ext.getCmp('valpsg');                                                                      
          var hdini  = Ext.getCmp('hdini');                                                               
          var hdfim  = Ext.getCmp('hdfim');                                                                 
          //var vlrtot = Ext.getCmp('vlrtot');
          var vlrad  = Ext.getCmp('vlrad');
          var tiptra = Ext.getCmp('tiptra');
            
          //calcular o valor da passagem
          var vlpass = parseFloat(vlrdes) / parseInt(kmpre);   
          
          //Atribuir valor para formulário
           Ext.getCmp('dtdes').setValue(dtpre);
           Ext.getCmp('qtdpsg').setValue(kmpre);
           //Ext.getCmp('valpsg').setValue(vlpass);
           Ext.getCmp('trajeto').setValue(deslocpre);
           hdini.setValue(odoini);
           hdfim.setValue(odofim);
           vlrad.setValue(vlrdes);
           valpsg.setValue(vlpass);
           //valpsg.setValue(vlrdes);
           
           Ext.getCmp('trans').show();
           Ext.getCmp('dtdes').setDisabled(true);                 
           
           if(vTiptrp=="Coletivo") {

                //Ext.getCmp('trans').setValue("Coletivo");
            
                qtdpsg.show();
                valpsg.show();   
                vlrad.hide();
                //vlrtot.show();
                hdini.hide();
                hdfim.hide(); 
            
            }else
              if(vTiptrp=="Moto"){
                //Ext.getCmp('trans').setValue("Moto");
            
                hdini.show();
                hdfim.show();
                //vlrtot.show();
                qtdpsg.hide();
                valpsg.hide(); 
                vlrad.hide();
            }else
              if(vTiptrp=="Outros"){

                Ext.getCmp('trans').hide();
                qtdpsg.hide();
                valpsg.hide(); 
                hdini.hide();
                hdfim.hide();      
                vlrad.show();
            }                                                                                
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
                    fieldLabel: 'Valor da Passagem',
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
                            
                           var grid     = Ext.getCmp('gridprMot');//grid cadastro de prestação
                           var selectedRecords = grid.getSelectionModel().getSelection();
                           

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
                           var Btn      = 0;  
                      
                           Ext.Ajax.request({
                                url:'/php/Prestacao/outrosValores.php',
                                method:'post',
                                params: {
                      
                                  vlradd:valcombo, 
                                  tiptra:transp,  //tiptra:vTiptrp,
                                  //numseq:vSeqpla,
                                  dtdes:dtdes, 
                                  hdini:hdini,
                                  hdfim:hdfim,
                                  id:Tnumseq, 
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
                                      var editprest  = Ext.getCmp('editprest');
                                        form.getForm().reset();
                                        editprest.destroy();
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
                         var editprest  = Ext.getCmp('editprest');
                         
                         form.getForm().reset();
                         editprest.destroy();

                      }
                  }
             ] 
         }
     ]

});
