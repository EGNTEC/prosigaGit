Ext.define('desloc.store.TipTrpAddS',{
    extend: 'Ext.data.Store',
    
    //storeId: 'regStore',   
    
    model:'desloc.model.TipoTransM',

    //autoLoad:true,
    
    proxy: {
        type:'ajax', 
        url:'/php/TipTrpAddS.php',

        reader: {
           type:'json',
           root:'data'

        }

    }

});