Ext.define('desloc.store.testeS',{
    extend: 'Ext.data.Store',
    
    //storeId: 'regStore',   
    
    model:'desloc.model.testM',

    autoLoad:true,
    
    proxy: {
        type:'ajax', 
        url:'/php/status.php',

        reader: {
           type:'json',
           root:'data'

        }

    }

});