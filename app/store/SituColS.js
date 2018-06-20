Ext.define('desloc.store.SituColS', {
    extend: 'Ext.data.Store',

    //storeId: 'regStore',

    model: 'desloc.model.SituColM',

    autoLoad: true,

    proxy: {
        type: 'ajax',
        url: '/php/updtSitu.php',

        reader: {
            type: 'json',
            root: 'data'

        }

    }

});