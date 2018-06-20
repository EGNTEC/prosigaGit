/*var mesProx = parseInt(mes) + 01;
if (mesProx == 13) {

    mesProx = 01;
}

Ext.define('desloc.store.MesRefS', {
        extend: 'Ext.data.Store',
        autoLoad: true,
        fields: ['name', 'value'],
        data: [
            { name: mes + '/' + ano, value: mes + '/' + ano }, //,
            { name: mesProx + '/' + ano, value: mesProx + '/' + ano }
        ]
});*/

Ext.define('desloc.store.MesRefS',{
    extend: 'Ext.data.Store',

    model: 'desloc.model.MesRefM',

    //autoLoad:true,

    proxy: {
        type: 'ajax',
        url: '/php/ResultPlan.php',

        reader: {
            type: 'json',
            root: 'data'

        }

    }

});
