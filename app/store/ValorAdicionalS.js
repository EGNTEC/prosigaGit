Ext.define('desloc.store.ValorAdicionalS',{
    extend: 'Ext.data.Store',
    
    //storeId: 'regStore',   
    
    model:'desloc.model.ValorAdicionalM',

    //autoLoad: true,
    
    proxy: {
        type:'ajax', 
        //url:'/php/Prestacao/ValorAdicional.php',

         api:{
            
           read:'/php/Prestacao/ValorAdicional.php',
           destroy:'/php/Prestacao/DelAdicional.php'        
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