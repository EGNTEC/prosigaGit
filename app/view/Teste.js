Ext.define('desloc.view.Teste',{
    //renderTo: Ext.getBody(),
    extend:'Ext.window.Window',
    alias:'widget.teste',
    title: 'Cadastrar Prestação de Contas',
    iconCls:'icon-grid',
    width:1350,
    height:650,
    //x:5,
    //y:38,
    autoScroll:true,
    id:'teste',
    layout: 'fit',
    closable: true,
    closeAction:'hide',
    align: 'stretch',
    modal:true,
    resizable : 'true',
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
          'Ext.tab.Panel',
          'Ext.grid.*',
          'Ext.data.*',
          'Ext.util.*',
          'Ext.state.*',
          'Ext.form.*'           
    ],
   listeners:{
         
              
            }
    
    /*bbar: [
                        
                         
               
    ]*/ // Fim da barra inferior
    
});