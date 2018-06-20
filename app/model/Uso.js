Ext.define('desloc.model.Uso',{
    extend: 'Ext.data.Model',

     autoLoad:true,

     fields: [
        
         {name:'numcad'},
         {name:'nomfun'},
         {name:'numreg'},
         {name:'numloc'}

     ],

     idProperty:'nomfun'    

});