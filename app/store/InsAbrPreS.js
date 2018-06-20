Ext.define('desloc.store.InsAbrPreS',{
    extend: 'Ext.data.Store',
    
    //storeId: 'regStore',   
    
    model:'desloc.model.InsAbrPreM',

    autoLoad: true,
    
    proxy: {
        type:'ajax', 
        //url:'/php/ListAbrPlan.php',

         api:{
            
           read:'/php/Prestacao/ListAbrPre.php',        
           destroy:'/php/Prestacao/updateSituacao.php'        
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