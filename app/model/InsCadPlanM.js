Ext.define('desloc.model.InsCadPlanM', {
    extend: 'Ext.data.Model',
    fields: [

        { name: 'numseq' },
        { name: 'datdes', type: 'date', dateFormat: 'd/m/Y' }, //, dateFormat: 'm-d-Y'
        { name: 'qtdcli', type: 'int' },
        { name: 'qtdkm', type: 'int' },
        { name: 'vlrdes', type: 'float' },
        { name: 'destra' },
        { name: 'seqpla', type: 'int' },
        { name: 'valpass', type: 'float' }

    ],
    idProperty: 'numseq'
});