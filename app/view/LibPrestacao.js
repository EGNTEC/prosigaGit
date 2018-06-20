Ext.Loader.setConfig({
    enabled: true
});
var cellEditing = Ext.create('Ext.grid.plugin.CellEditing', {
        clicksToEdit: 3
});
//var sm = Ext.create('Ext.selection.CheckboxModel');

Ext.define('desloc.view.LibPrestacao',{
	  //renderTo: Ext.getBody(),
    extend:'Ext.window.Window',
    alias:'widget.libpre',
    title: 'Liberar Prestação Acima da Data Limite',
    height: 350,
    width:  880,
    autoScroll:true,
    id:'libpre',
    //layout: 'fit',
    align: 'stretch',
    modal:true,
    //minimizable:true,
    maximizable:'true',
    resizable : 'true',
    align:'center',
    autoShow: true,

    requires:[
          'Ext.selection.CheckboxModel',
          'Ext.selection.CellModel',
          'Ext.util.ComponentDragger',
          'Ext.util.Region',
          'Ext.EventManager',
          'Ext.tab.Panel',
          'Ext.grid.*',
          'Ext.data.*',
          'Ext.util.*',
          'Ext.state.*',
          'Ext.form.*'
    ],
    items:[

       {
         xtype:'grid',
         id:'glipre',
         height: 700,
         //selModel: sm,
         width:1350,
         selModel:{
           selType: 'checkboxmodel',
           mode: 'MULTI'
         },
         layout:'fit',
         store: Ext.create('desloc.store.LiPreS'),
         columns: [
              {
                header: 'id',
                dataIndex:'numseq',
                menuDisabled:true,
                hidden:true
              },
              {
                header: 'Referência',
                dataIndex:'datpla',
                //id:'datpla',
                menuDisabled:true,
                editor :
                {
                  xtype : 'datefield',
                  format : 'd/m/Y',
                  allowBlank : false
                },
                renderer : Ext.util.Format.dateRenderer('d/m/Y')
              },
              {
                header: 'Data Limite',
                dataIndex:'dtfim',
                //id:'datpla',
                menuDisabled:true,
                editor :
                {
                  xtype : 'datefield',
                  format : 'd/m/Y',
                  allowBlank : false
                },
                renderer : Ext.util.Format.dateRenderer('d/m/Y')
              },
              {
                header: 'Matricula',
                dataIndex:'numcad',
                menuDisabled:true
              },
              {
                header: 'Nome',
                dataIndex:'nomfun',
                width:200,
                menuDisabled:true
              },
              {
                header: 'Local',
                dataIndex:'nomloc',
                flex:1,
                menuDisabled:true
              }
           ]
        }
    ],
    dockedItems:[
               {
                 xtype: 'toolbar',
                 dock: 'bottom',
                 items:[
                    {
                      xtype:'button',
                      id:'btn_lib',
                      text: 'Liberar',
                      iconCls:'icon-liberar',
                      handler:function(){

                        var sPanelGrid = Ext.getCmp('glipre');
                        var sStore = sPanelGrid.getStore();
                        var selectedRecords = sPanelGrid.getSelectionModel().getSelection();
                            Vnumseq = selectedRecords[0].get("numseq");
                        //sStore.load();

                       if(selectedRecords.length > 1){

                          Ext.MessageBox.alert('Mensagem','Não é permitido informar data de finalização.');
                          //sPanelGrid.getSelectionModel().deselectAll();
                      }

                       Ext.MessageBox.alert('Mensagem','Informe uma data de finalização.',function(btn,text){

                          if(btn=='ok'){

                            Ext.create('desloc.view.AceitarPrest');
                          }

                        });

                       }//fim da função click
                     },//Fim do botão liberar.
                     {
                         xtype: 'button',
                         id: 'btn_excel',
                         text: 'Exportar',
                         iconCls: 'icon-excel',
                         hrefTarget: "_blank",
                         href: 'https://novoprossiga.inec.org.br/php/gerExcelLib.php',
                         listeners: {
                             click: function() {
                                 btnEx.setParams({ });
                             }
                         }
                     }//Fim do botão exportar
                  ]
               }
          ]
 });
