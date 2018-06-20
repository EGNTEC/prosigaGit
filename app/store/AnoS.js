var dt = new Date();
var ano = Ext.Date.format(dt,'Y');
var ano = parseInt(ano);

Ext.define('desloc.store.AnoS',{
    extend: 'Ext.data.Store',
    autoLoad:true,
    fields: ['name', 'value'],
    data : [

        {name:'2017', value:'2017'},
        {name:'2018', value:'2018'},
        {name:'2019', value:'2019'},
        {name:'2020', value:'2020'},
        {name:'2021', value:'2021'}
        
    ]
    
});