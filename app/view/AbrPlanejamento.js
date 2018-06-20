Ext.define('desloc.view.AbrPlanejamento',{
extend:'Ext.window.Window',
alias:'widget.abrplanform',
    title: 'Abertura de Planejamento',
    height: 190,
    width: 350,
    align: 'stretch',
    modal:true,
    resizable : 'true',
    align:'center',
    autoShow: true,
    layout:'fit',
    id:'JanAbrPlan',

    requires:[
          'Ext.util.ComponentDragger',
          'Ext.util.Region',
          'Ext.EventManager',
          'Ext.tab.Panel'
    ],
    listeners:{

       beforeclose:function(){
      //Tratamento para habilitar botão novo planejamento
       Ext.Ajax.request({
          url: '/php/Planejamento/HabBtnNov.php',
          success: function(response) {

              var result = Ext.JSON.decode(response.responseText);
              //console.log(result);
              if (result == 1) {
                  //Código...
              } else {
                  Ext.getCmp('btn_nov').setDisabled(false);
                  //sStore.load();
              }
          },
          failure: function() {
              //Ext.Msg.alert('Mensagem','Problema Na Base de Dados!');
           }
         });

      }

    },
    items:[
      {
        xtype:'form',
        id:'FormAbrPlan',
        layout:'vbox',
        defaults:{
              padding: 2,
              anchor:'100%',
              margins: '3 0 0 0'
              //width:490
         },
        items:[
            {
               xtype:'combo',
               id:'tiptrans',
               editable: false,
               name:'tiptrans',
               fieldLabel:'Tipo de Transporte',
               emptyText:'Selecione um Transporte',
               store: Ext.create('desloc.store.TipoTransS'),
               displayField:'destrp',
               valueField:'tiptrp',
               triggerAction:'all',
               mode:'local',
               listeners:{
                  select: {
                      fn: function(combo, value) {

                      var comboUso = Ext.getCmp('usuCombo').getValue();
                      var comboRef = Ext.getCmp('refplandt');

                      comboRef.setDisabled(true);
                      comboRef.setValue('');
                      comboRef.store.removeAll();

                      comboRef.store.load({
                          params: { mat: comboUso }
                      });
                      comboRef.setDisabled(false)

                      }
                    }
                }
             },
             {
               xtype:'combo',
               id:'refplandt',
               editable: false,
               name:'refplandt',
               fieldLabel:'Competência',
               emptyText:'Selecione uma Competência',
               store: Ext.create('desloc.store.MesRefS'),
               displayField:'datpla',//datpla,name
               valueField:'datpla',//datpla,value
               triggerAction:'all',
               disabled: true,
               queryMode: 'local'
               //mode: 'local'
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
              id:'btn_ins',
              text: 'Ok',
              iconCls:'icon-add',
              handler:function(){
                       var FormAbrPlan = Ext.getCmp('FormAbrPlan');
                       var pGrid  = Ext.getCmp('gridplan');
                       var sStore = pGrid.getStore();
                       var vMatcol = Ext.getCmp('usuCombo');
                       var comboUnid = Ext.getCmp('uniCombo').getValue();
                       var comboReg = Ext.getCmp('regCombo').getValue();

                       FormAbrPlan.getForm().submit({
                       method:'post',
                       url:'/php/Planejamento/InsAbrPlan.php',
                       params:{
                         mat: vMatcol.getValue(),
                         unid: comboUnid,
                         reg:  comboReg
                       },
                       //waitMsg:'Enviando dados…',
                       success:function(){
                           var pGrid = Ext.getCmp('gridplan');
                           var aStore = pGrid.getStore();
                           aStore.load({
                                       params:{
                                         mat: vMatcol.getValue(),
                                         unid: comboUnid,
                                         reg:  comboReg
                                       }
                                  });

                           Ext.getCmp('JanAbrPlan').destroy();

                        },
                       //failure:function(){ Ext.Msg.alert('Aviso', 'Já existe um planejamento para este período.'); }
                       failure:function(){ Ext.Msg.alert('Aviso', 'Não é possível abrir planejamento para esse período.');}
                     });
                  }
            }

        ]
      }
    ]

});
