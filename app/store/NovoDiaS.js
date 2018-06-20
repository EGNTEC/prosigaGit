Ext.define('desloc.store.NovoDiaS',{
    extend: 'Ext.data.Store',

    //storeId: 'regStore',
    model:'desloc.model.NovoDiaM',
    //autoLoad: true,

    proxy: {
        type:'ajax',
         //url:'/php/Prestacao/ValorAdicional.php',
         api:{
           read:'/php/Prestacao/NovoDia.php'
           ,destroy:'/php/Prestacao/DelNovoDia.php'
         },

        reader: {
           type:'json',
           root:'data'
        },

        writer:{
           type:'json',
           root:'data',
           writerAllFields:true,
           encode:true,
           allowSingle:false
        }
    }
});
