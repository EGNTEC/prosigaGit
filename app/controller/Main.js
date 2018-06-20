Ext.define('desloc.controller.Main', {
    extend: 'Ext.app.Controller',
    
    models:[
        'desloc.model.Uso',
        'desloc.model.Reg',
        'desloc.model.Unid',
        'desloc.model.TipoTransM',
        'desloc.model.SituacaoM',
        'desloc.model.InsAbrPlanM',
        'desloc.model.InsCadPlanM',
        'desloc.model.InsAbrPreM',
        'desloc.model.InsCadPreM',
        'desloc.model.TipEventoM',
        'desloc.model.testM',
        'desloc.model.LiPreM'
    ],
    stores:[
        'desloc.store.Usos',
        'desloc.store.Regs',
        'desloc.store.Unids',
        'desloc.store.TipoTransS',
        'desloc.store.SituacaoS',
        'desloc.store.MesRefS',
        'desloc.store.InsAbrPlanS',
        'desloc.store.InsCadPlanS',
        'desloc.store.InsAbrPreS',
        'desloc.store.InsCadPreS',
        'desloc.store.TipEventoS',
        'desloc.store.testeS',
        'desloc.store.LiPreS'
    ],
    views:[
        //'desloc.view.TelaLogin', 
        'desloc.view.Principal',
        'desloc.view.PlanejamentoForm',
        'desloc.view.AbrPlanejamento',
        'desloc.view.CadPlanejamento',
        'desloc.view.CadPlanejamentoCol',
        'desloc.view.PrestacaoForm',
        'desloc.view.JustificativaTeto',
        'desloc.view.LibPrestacao'
    ]

});
