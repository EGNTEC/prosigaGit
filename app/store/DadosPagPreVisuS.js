Ext.define('desloc.store.DadosPagPreVisuS',{
    extend: 'Ext.data.Store',

    model:'desloc.model.DadosPagPreVisuM',

    //autoLoad: true,

    //pageSize:4,

    proxy: {
        type:'ajax',
        timeout: 9999999,
        //url:'/php/ListAbrPlan.php',

         api:{

            read:'/php/Planejamento/DadosPagPreVisu.php'
         },

        paramsAsJson: true, //
        actionMethods: {   //
          read: 'POST'    //
        },               //

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
