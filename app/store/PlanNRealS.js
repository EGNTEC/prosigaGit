Ext.define('desloc.store.PlanNRealS', {
    extend: 'Ext.data.Store',

    model: 'desloc.model.PlanNRealM',

    autoLoad: true,

    proxy: {
        type: 'ajax',
        url: '/php/PlanNReal.php',

        reader: {
            type: 'json',
            root: 'data'
        }

    }

});
