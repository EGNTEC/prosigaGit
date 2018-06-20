Ext.define('desloc.store.DadosLoteS',{
    extend: 'Ext.data.Store',

    //storeId: 'regStore',

    model:'desloc.model.DadosLoteM',

    autoLoad: false,

    //pageSize:4,

    proxy: {
        type:'ajax',
        //url:'/php/ListAbrPlan.php',
        timeout: 9999999,
        api:{

            read:'/php/Planejamento/DadosLote.php',
            //destroy:'/php/Planejamento/DadosLote.php'
            destroy:'/php/Planejamento/AdmReabPlan.php'
            ///php/Planejamento/DadosPagPreVisu.php
            //destroy:'/php/Planejamento/InsDadosLote.php',
           //create:'/php/Planejamento/updateSituacao.php'
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
