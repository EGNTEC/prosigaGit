var dt = new Date();
var mes = Ext.Date.format(dt,'m');
var mes = parseInt(mes);
var ano = Ext.Date.format(dt,'Y');



//var mesProx = Ext.Date.format(dt,'m');
//var mesProx = parseInt(mesProx) + 1;

Ext.define('desloc.store.PeriodoS',{
    extend: 'Ext.data.Store',
    autoLoad:true,
    /*fields: ['name', 'value'],
    data: [
         {name:mes+'/'+ano , value:mes+'/'+ano},
         {name:mesProx+'/'+ano , value:mesProx+'/'+ano}
     ]*/
    fields: ['name', 'value'],
    data : [
        {name:'01/'+ano, value:'01/'+ano},
        {name:'02/'+ano, value:'02/'+ano},
        {name:'03/'+ano, value:'03/'+ano},
        {name:'04/'+ano, value:'04/'+ano},
        {name:'05/'+ano, value:'05/'+ano},
        {name:'06/'+ano, value:'06/'+ano},
        {name:'07/'+ano, value:'07/'+ano},
        {name:'08/'+ano, value:'08/'+ano},
        {name:'09/'+ano, value:'09/'+ano},
        {name:'10/'+ano, value:'10/'+ano},
        {name:'11/'+ano, value:'11/'+ano},
        {name:'12/'+ano, value:'12/'+ano}
        
    ]
    
});
/*
    fields: ['name', 'value'],
    data : [
        {"name":"01/"+ano, "value":"01/"+ano"},
        {"name":"02/"+ano, "value":"02/"+ano"},
        {"name":"03/"+ano, "value":"03/"+ano"},
        {"name":"04/"+ano, "value":"04/"+ano"},
        {"name":"05/"+ano, "value":"05/"+ano"},
        {"name":"06/"+ano, "value":"06/"+ano"},
        {"name":"07/"+ano, "value":"07/"+ano"},
        {"name":"08/"+ano, "value":"08/"+ano"},
        {"name":"09/"+ano, "value":"09/"+ano"},
        {"name":"10/"+ano, "value":"10/"+ano"},
        {"name":"11/"+ano, "value":"11/"+ano"},
        {"name":"12/"+ano, "value":"12/"+ano"}
        
    ]*/