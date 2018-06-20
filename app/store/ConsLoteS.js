Ext.define('desloc.store.ConsLoteS', {
    extend: 'Ext.data.Store',

    //storeId: 'regStore',   

    model: 'desloc.model.ConsLoteM',

    //autoLoad: true,

    pageSize: 4,

    proxy: {
        type: 'ajax',
        //url:'/php/ListAbrPlan.php',

        api: {

            read: '/php/Planejamento/ConsLote.php',
            destroy: '/php/Planejamento/DelDadosLote.php',
            //create:'/php/Planejamento/updateSituacao.php'        
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