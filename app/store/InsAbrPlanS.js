Ext.define('desloc.store.InsAbrPlanS',{
    extend: 'Ext.data.Store',
    
    //storeId: 'regStore',   
    
    model:'desloc.model.InsAbrPlanM',

    autoLoad: true,

    pageSize:4,
    
    proxy: {
        type:'ajax', 
        //url:'/php/ListAbrPlan.php',

         api:{
            
           read:'/php/Planejamento/ListAbrPlan.php',        
           //update:'/php/updateRbrY.php',
           destroy:'/php/Planejamento/updateSituacao.php'        
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