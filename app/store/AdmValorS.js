Ext.define('desloc.store.AdmValorS', {
    extend: 'Ext.data.Store',

    model: 'desloc.model.AdmValorM',

    //autoLoad: true,

    proxy: {
        type: 'ajax',
        timeout: 9999999,
        url: '/php/AdmValores.php',

        reader: {
            type: 'json',
            root: 'data'
        }

    }

});
