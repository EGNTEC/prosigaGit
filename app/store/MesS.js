var dt = new Date();
var mes = Ext.Date.format(dt,'m');
var mes = parseInt(mes);

Ext.define('desloc.store.MesS',{
    extend:'Ext.data.Store',
    autoLoad:true,
    fields: ['name', 'value'],
    data : [

        {name:'Janeiro', value:'01'},
        {name:'Fevereiro', value:'02'},
        {name:'Março', value:'03'},
        {name:'Abril', value:'04'},
        {name:'Maio', value:'05'},
        {name:'Junho', value:'06'},
        {name:'Julho', value:'07'},
        {name:'Agosto', value:'08'},
        {name:'Setembro', value:'09'},
        {name:'Outubro', value:'10'},
        {name:'Novembro', value:'11'},
        {name:'Dezembro', value:'12'}
        
    ]
    
});
