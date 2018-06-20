Ext.define('desloc.store.DadosPagPreVisuS',{
    extend: 'Ext.data.Store',

    model:'desloc.model.DadosPagPreVisuM',

    autoLoad: true,

    pageSize:4,

    proxy: {
        type:'ajax',
        //url:'/php/ListAbrPlan.php',

         api:{

            read:'/php/Planejamento/DadosPagPreVisu.php'
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
