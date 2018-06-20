Ext.define('desloc.store.Regs',{
    extend: 'Ext.data.Store',

    storeId: 'regStore',

    model:'desloc.model.Reg',

    autoLoad:true,

    proxy: {
        type:'ajax',
        timeout: 9999999, 
        url:'/php/listReg.php',

        reader: {
           type:'json',
           root:'data'

        }

    }

});
