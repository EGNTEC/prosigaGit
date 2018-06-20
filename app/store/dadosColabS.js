Ext.define('desloc.store.dadosColabS',{
    extend: 'Ext.data.Store',
    
    model:'desloc.model.dadosColabM',

    //autoLoad:true,
    
    proxy: {
        type:'ajax', 
        url:'/php/autent.php',

        reader: {
            type:'json',
            root:'data'

        }

    }

});