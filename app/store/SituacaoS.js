Ext.define('desloc.store.SituacaoS',{
    extend: 'Ext.data.Store',
    
    //storeId: 'regStore',   
    
    model:'desloc.model.SituacaoM',

    autoLoad:true,
    
    proxy: {
        type:'ajax', 
        url:'/php/Situacao.php',

        reader: {
           type:'json',
           root:'data'

        }

    }

});