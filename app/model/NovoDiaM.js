Ext.define('desloc.model.NovoDiaM',{
    extend:'Ext.data.Model',
    fields:[
       {name:'numseq'},
       {name:'tiptrp'},
       {name:'seqpre'},
       {name:'datpre', type: 'date', dateFormat: 'd/m/Y'}//, dateFormat: 'm-d-Y'
    ]
});
