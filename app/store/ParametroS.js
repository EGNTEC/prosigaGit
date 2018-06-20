var limite   = 1;	//Dia Limite Para Prestação de contas
var proprio  = 2;    //Limite Maximo para Deslocamento (R$) - Moto
var coletivo = 4;     //Limite Maximo para Deslocamento (R$) - Coletivo

Ext.define('desloc.store.ParametroS',{
    extend: 'Ext.data.Store',
    autoLoad:true,
    fields: ['name', 'value'],
    data: [
         {name:'Dia Limite Para Prestação de contas' ,value:limite},
         {name:'Limite Maximo para Deslocamento (R$) - Moto',value:proprio},
         {name:'Limite Maximo para Deslocamento (R$) - Coletivo',value:coletivo}
     ]

    
});