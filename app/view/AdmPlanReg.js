Ext.Loader.setConfig({
    enabled: true
});
var cellEditing = Ext.create('Ext.grid.plugin.CellEditing', {
        clicksToEdit: 1
    });
//var sm = Ext.create('Ext.selection.CheckboxModel');

Ext.define('desloc.view.AdmPlanReg',{
	  //renderTo: Ext.getBody(),
    extend:'Ext.window.Window',
    alias:'widget.admplanreg',
    title: 'Gerenciar Afastamentos',
    height: 610,
    width:  1230,
    x:5,
    y:10,
    autoScroll:true,
    id:'admplanreg',
    //layout: 'fit',
    align: 'stretch',
    modal:true,
    //minimizable:true,
    resizable : 'true',
    maximizable:'true',
    align:'center',
    autoShow: true,

    requires:[
          'Ext.selection.CheckboxModel',
          'Ext.selection.CellModel',
          'Ext.util.ComponentDragger',
          'Ext.util.Region',
          'Ext.ux.TextMaskPlugin',
          'Ext.ux.grid.column.ActionButtonColumn',
          'Ext.EventManager',
          'Ext.tab.*',
          'Ext.grid.*',
          'Ext.data.*',
          'Ext.util.*',
          'Ext.state.*',
          'Ext.form.*'
    ],

    items:[
     {
       xtype:'container',
       layout:'fit',
       height:95,
       width:1353,
       items:[

           {
             xtype:'form',
              id:'formAdmPlan',
              //boddyPadding: 10,
              layout:'vbox',
              defaults:{
                 padding: 2,
                 anchor:'100%',
                 margins: '3 0 0 0',
                 width:750
              },
              items:[

                 {
                   xtype:'combo',
                   editable: false,
                   id:'uniCombo',
                   fieldLabel:'Unidade',
                   emptyText:'Selecione a Unidade',
                   displayField:'nomloc',
                   valueField:'numloc',
                   store: Ext.create('desloc.store.unidAdmRegS'),
                   triggerAction:'all',
                   mode:'local',
                   //lastQuery:'',
                   //disabled:true,
                   listeners: {
                      change:function(combo, value){
                       var codund = Ext.getCmp('uniCombo').getValue();
                           Tgrid = Ext.getCmp('gridAdmReg');
                           sStore = Tgrid.getStore();
                           sStore.load({
                              params:{

                                und:codund
                              }
                           });
                      }
                   }

                 }

              ]
           }

        ]

     },
     {
       xtype:'grid',
       id:'gridAdmReg',
       height: 400,
       selModel:{
          selType: 'checkboxmodel',
          mode: 'MULTI'
       }, //sm,
       layout:'fit',
       store: Ext.create('desloc.store.AdmPlanRegS'),
       features: [{
         ftype: 'summary'
       }],
       //autoScroll:true,
       columns:[
        /*{
          xtype:'actionbuttoncolumn',
          menuDisabled:true,
          width: 36,
          items: [{
              iconCls:'icon-edit'
              //tooltip: 'Sell stock',
              //action: 'sell'
           }],
          listeners:{
             click:function(){

               }
            }
        },*/
        {
          header: 'Referência',
          dataIndex:'datpla',
          width: 83,
          id:'datpla',
          menuDisabled:true,
          name:'datpla',
          summaryRenderer: function(){
            return 'Total:'
          }
        },
        { header: 'Matricula',
          dataIndex: 'numcad',
          width: 74,
          menuDisabled:true,
          hidden:false
        },
        { header: 'Nome',
          dataIndex:'nomfun',
          //flex:1,
          width: 258,
          menuDisabled:true,
          summaryType: 'count'
        },
        { header: 'Cargo',
          width: 240,
          dataIndex: 'titred',
          menuDisabled:true
        },
        { header: 'Local',
          dataIndex: 'nomloc',
          width:260,
          menuDisabled:true
        },
        { header: 'Transporte',
          dataIndex: 'trpt',
          width: 160,
          menuDisabled:true,
          editor:{

            xtype:'combo',
            editable:false,
            width:120,
            id:'tiptrpNov',
            emptyText:'Selecione o Transporte',
            store: Ext.create('desloc.store.TipoTransS'),
            displayField:'destrp',
            valueField:'destrp',//tiptrp
            triggerAction:'all',
            mode:'local',
            lastQuery:''
          }
        }

    ],
    plugins: [cellEditing],
    listeners:{


      }
    }

   ],

   //
   dockedItems: [
        {
          xtype: 'toolbar',
          dock: 'bottom',
          items: [
            {
              xtype:'button',
              id:'btn_process',
              text: 'Processar',
              iconCls:'icon-accept',
              handler:function(){
                Tgrid = Ext.getCmp('gridAdmReg');
                gStore = Tgrid.getStore();
                selectedRecords = Tgrid.getSelectionModel().getSelection();
                var codund = Ext.getCmp('uniCombo').getValue();

                   parms = [];
                         var updatedRecords = Tgrid.getStore().getUpdatedRecords();
                         Ext.each(updatedRecords,function(record){
                           parms.push(record.data);
                         });

                    if(parms.length > 0){
                              Ext.Ajax.request({
                               url : '/php/Planejamento/AdmPlanRegMod.php',
                               params : {
                                 action: 'post',
                                 records : Ext.encode(parms)
                                },
                                success: function (response, opts){
                                var result = Ext.JSON.decode(response.responseText);
                                         //console.log(result);
                                 if(result==0){

                                      Ext.Msg.alert('Mensagem','Registros processados com sucesso.',function(btn,text){

                                          if(btn=="ok"){

                                             gStore.load({
                                                params:{

                                                 und:codund
                                                }
                                              });

                                          }
                                      });
                                  }else
                                  if(result == 99){

                                     Ext.Msg.alert('Mensagem', 'Existe um planejamento ou uma prestação de contas não concluído para este colaborador.');

                                  }
                                  else{
                                      Ext.Msg.alert('Mensagem','Erro ao processar registros');
                                  }
                                },
                                failure: function(){

                                 gStore.load();
                              }

                          });
                        }

                /*if(selectedRecords.length){
                   sStore.remove(selectedRecords);
                   //Envia um parametro para o arquivo de alteração.

                   //Faz a alteração no banco
                   sStore.sync({
                     //success: function (conn, response, options, eOpts){
                      success: function(response){
                      var result = Ext.JSON.decode(response.responseText);

                        if(result==1){

                          Ext.Msg.alert('Mensagem','Planejamento zerado.');
                        }else
                        if(result==2){

                          Ext.Msg.alert('Mensagem','Planejamento Excluído.');
                        }else{

                          //Ext.Msg.alert('Mensagem','Problema ao executar a ação.');
                          Ext.Msg.alert('Mensagem','Ação executada com sucesso.');
                        }

                     },
                     failure: function(){

                        //Ext.Msg.alert('Mensagem','Problema com a base de dados.');
                        Ext.Msg.alert('Mensagem','Problema na base de dados.');
                      }

                   });

                 }*/

               }
            },
            {
               xtype:'button',
               id:'btn_filtro',
               text: 'Limpar Filtros',
               iconCls:'icon-filtro',
               handler:function(){

                 var comboUni = Ext.getCmp('uniCombo').reset();

               }

            },
            {
               xtype:'button',
               id:'btSair',
               text: 'Sair',
               iconCls:'icon-sair',
               style:{

                  margin:'0 0 0 0'
               },
               listeners:{
                   click:function(){

                    Tgrid = Ext.getCmp('gridAdmReg');
                           sStore = Tgrid.getStore();
                           sStore.load({
                              params:{

                                und:''
                              }
                           });

                    Ext.getCmp('admplanreg').destroy();
                  }
               }
            }

         ]
      }
    ],
    listeners:{
      beforeclose:function(){

        Tgrid = Ext.getCmp('gridAdmReg');
                           sStore = Tgrid.getStore();
                           sStore.load({
                              params:{

                                und:''
                              }
                           });

        Ext.getCmp('admplanreg').destroy();

     }

  }

});
