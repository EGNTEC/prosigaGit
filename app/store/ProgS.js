var cred   = 1;	//Crediamigo
var agro   = 2; //Agroamigo

Ext.define('desloc.store.ProgS',{
    extend: 'Ext.data.Store',
    autoLoad:true,
    fields: ['name', 'value'],
    data: [

        {name:'Crediamigo' ,value:cred},
        {name:'Agroamigo'  ,value:agro}
     ]
});