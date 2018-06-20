var tip  = 0;
var tip1 = 1;
Ext.define('desloc.store.StatusS',{
    extend: 'Ext.data.Store',
    autoLoad:true,
    fields: ['name', 'value'],
    data: [
         {name:'Sim' , value:tip},
         {name:'Não', value:tip1}
     ]

    
});
