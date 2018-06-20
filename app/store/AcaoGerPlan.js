Ext.define('desloc.store.AcaoGerPlan', {
    extend: 'Ext.data.Store',
    autoLoad: true,
    fields: ['name', 'value'],
    data: [

        { name: 'Inserir planejamento zerado.', value: 0 },
        { name: 'Zerar planejamento fora do prazo.', value: 1 },
        { name: 'Zerar planejamentos negativos.', value: 3 },
        { name: 'Excluir planejamento.', value: 2 }
    ]

});
