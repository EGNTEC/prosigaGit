Ext.define('desloc.store.FiltLoteS',{
    extend: 'Ext.data.Store',
    
    //storeId: 'regStore',   
    
    model:'desloc.model.FiltLoteM',

    autoLoad: true,

    pageSize:4,
    
    proxy: {
        type:'ajax', 
        //url:'/php/ListAbrPlan.php',

         api:{
            
            read:'/php/Planejamento/FilLote.php'        
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