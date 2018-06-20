Ext.define('desloc.store.Unids',{
    extend: 'Ext.data.Store',
    
    model:'desloc.model.Unid',

    //autoLoad:true,
    
    proxy: {
        type:'ajax', 
        url:'/php/listUnid.php',

        reader: {
            type:'json',
            root:'data'

        }

    }

});