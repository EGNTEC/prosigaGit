Ext.define('desloc.store.AdmPlanRegS',{
    extend: 'Ext.data.Store',
    
    //storeId: 'regStore',   
    
    model:'desloc.model.AdmPlanRegM',

    autoLoad: true,

    //pageSize:4,
    
    proxy: {
        type:'ajax', 
        //url:'/php/ListAbrPlan.php',

         api:{
            
           read:'/php/Planejamento/AdmPlanReg.php',
           destroy:'/php/Planejamento/AdmPlanRegMod.php'         
                 
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