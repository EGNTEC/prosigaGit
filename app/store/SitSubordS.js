Ext.define('desloc.store.SitSubordS',{
    extend: 'Ext.data.Store',
    
    model:'desloc.model.SitSubordM',

    autoLoad:true,
    
    proxy: {
        type:'ajax', 
        url:'/php/SitSubord.php',

        reader: {
           type:'json',
           root:'data'

        }

    }

});