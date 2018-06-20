Ext.define('desloc.store.AdmPlanConsS', {
    extend: 'Ext.data.Store',

    //storeId: 'regStore',   

    model: 'desloc.model.AdmPlanConsM',

    autoLoad: false,

    //pageSize:4,

    proxy: {
        type: 'ajax',
        //url:'/php/ListAbrPlan.php',

        api: {

            read: '/php/Planejamento/AdmPlanCons.php',
            destroy: '/php/Planejamento/AdmPlan.php'

        },

        reader: {
            type: 'json',
            root: 'data'
        },

        writer: {
            type: 'json',
            root: 'data',
            writerAllFields: true,
            encode: true,
            allowSingle: false
        }

    }

});