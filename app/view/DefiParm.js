Ext.define('desloc.view.DefiParm',{
extend:'Ext.window.Window',
alias:'widget.definirparm',
    title: 'Definir Parâmetros',
    height: 190,
    width: 350,
    align: 'stretch',
    modal:true,
    resizable : 'true',
    align:'center',
    autoShow: true,
    layout:'fit',
    id:'JanDefParm',
    clozable:true,

    requires:[
          'Ext.util.ComponentDragger', 
          'Ext.util.Region',
          'Ext.ux.TextMaskPlugin',
          'Ext.EventManager',
          'Ext.tab.Panel'           
    ],
    items:[
      {
        xtype:'form',
        id:'FormDefParm',
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
               id:'tipparm',
               name:'tipparm',
               fieldLabel:'Tipo de Parâmetro',
               emptyText:'Selecione um Parâmetro',
               store: Ext.create('desloc.store.ParametroS'),
               displayField:'name',
               valueField:'value',
               triggerAction:'all',
               mode:'local',
               listeners:{

                 change:function(){

                     var Combparm = Ext.getCmp('tipparm').getValue();

                     switch(Combparm){

                        case 1:
                          Ext.getCmp('vlrteto').hide();
                          Ext.getCmp('vlrdia').show();
                          Ext.getCmp('tipprg').show();       
                          break;
                        case 2:
                          Ext.getCmp('vlrteto').show();
                          Ext.getCmp('vlrdia').hide();
                          Ext.getCmp('tipprg').show();        
                          break;
                        case 3:
                          Ext.getCmp('vlrteto').show();
                          Ext.getCmp('vlrdia').hide(); 
                          Ext.getCmp('tipprg').show();       
                          break;
                          
                        default:
                          Ext.getCmp('vlrteto').hide();
                          Ext.getCmp('vlrdia').hide();
                          Ext.getCmp('tipprg').show();       
                     }
                 }
              }
             },
             {
               xtype:'combo',
               id:'tipprg',
               name:'tipprg',
               fieldLabel:'Tipo do Programa',
               emptyText:'Selecione um Programa',
               store: Ext.create('desloc.store.ProgS'),
               displayField:'name',
               valueField:'value',
               triggerAction:'all',
               mode:'local'
             },
             {
               fieldLabel: 'Vigência',
               name: 'dtvig',
               xtype: 'datefield'
             },
             {
               xtype: 'textfield',
               plugins:'textmask',
               name:'vlrteto',
               id:'vlrteto',
               fieldLabel:'Novo valor',
               mask: 'R$ #9.999.990,00',
               money: true,
               hidden:true
             },
             {
               xtype: 'numberfield',
               fieldLabel: 'Valor',
               name:'vlrdia',
               id:'vlrdia',
               hidden:true
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
                       var FormAbrPlan = Ext.getCmp('FormDefParm');
                           numprm = Ext.getCmp('tipparm').getValue();

                       FormAbrPlan.getForm().submit({
                       method:'post',
                       url:'/php/Planejamento/DefiParm.php',
                       params:{
                         //numprm: numprm,

                       },
                       //waitMsg:'Enviando dados…',
                       success:function(){ 
                           Ext.Msg.alert('Aviso', 'Parâmetro cadastrado com sucesso.');     
                           Ext.getCmp('JanDefParm').close();
 
                        },
                       failure:function(){ Ext.Msg.alert('Aviso', 'Erro ao Inserir.'); }
                     });
                  }
            },
            {
               xtype:'button',
               text: 'Sair',
               iconCls:'icon-sair',
               listeners:{
                   click:function(){
                    Ext.getCmp('JanDefParm').close();
                 }
              }        
           }

        ] 
      }
    ]

});
