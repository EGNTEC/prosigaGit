Ext.define('desloc.model.InsAbrPlanM',{
    extend:'Ext.data.Model',
    fields:[

       {name:'datpla'},
       {name:'destrp'},
       {name:'dessts'},
       {name:'qtdcli'},
       {name:'qtdkm'},
       {name:'vlrpla'},
       {name:'nomfun'},
       {name:'nomloc'},
       {name:'numseq'},
       {name:'tiptrp'},
       {name:'vlrtrp'},
       {name:'valpass'},
       {name:'stspla'},
       {name:'numcad'},
       {name:'cargo'},
       {name:'data',type: 'date', dateFormat: 'd/m/Y'} 
    ]
});