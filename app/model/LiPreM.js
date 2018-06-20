Ext.define('desloc.model.LiPreM',{
    extend: 'Ext.data.Model',

     autoLoad:true,

     fields: [
         {name:'numseq'},
         {name:'numcad'},
         {name:'nomfun'},
         {name:'nomloc'},
         {name:'datpla',type:'date', dateFormat:'d/m/Y'},
         {name:'dtfim',type:'date', dateFormat:'d/m/Y'}

     ]

});
