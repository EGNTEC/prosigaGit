Ext.define('desloc.store.Usos',{
    extend:'Ext.data.Store',

    model: 'desloc.model.Uso',

    proxy: {
        type:'ajax', 
        url:'/php/listUso.php',

        reader: {
            type:'json',
            root:'data'

        }

    }

});