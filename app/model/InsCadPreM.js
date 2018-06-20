Ext.define('desloc.model.InsCadPreM',{
    extend:'Ext.data.Model',
    fields:[

       {name:'numseq'},
       {name:'seqpla'},
       {name:'datpre', type: 'date', dateFormat: 'd/m/Y'},//, dateFormat: 'm-d-Y'
       {name:'qtdcli'},//,type:'int'
       {name:'quilometro'},// ,type:'int'
       {name:'vlrdes' ,type:'float'},
       {name:'juspre'},
       {name:'seqpre'},//,type:'int'
       {name:'valpass'},
       {name:'destrp'},
       {name:'tiptrp'},
       {name:'numevt'},
       {name:'odoini'},
       {name:'odofim'},
       {name:'desevt'},
       {name:'Coluna1'},
       {name:'Coluna2'}
    ],
    idProperty:'numseq'
});
