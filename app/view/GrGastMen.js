/*var strore = Ext.create('Ext.data.Store', {

    model: 'desloc.model.GrGastMenM',

    autoLoad: true,

    proxy: {
        type: 'ajax',
        url: '/php/x_x.php',

        reader: {
            type: 'json',
            root: 'data'
        }
    }

});*/

var store = Ext.create('Ext.data.Store', {
    fields: ['name', 'data'],
    data: [
        { 'name': 'Janeiro', 'data': 1000 },
        { 'name': 'Fevereiro', 'data': 2000 },
        { 'name': 'Março', 'data': 5000 }
        //{ 'name': 'metric four', 'data': 2 },
        //{ 'name': 'metric five', 'data': 27 }
    ]
});

Ext.define('desloc.view.GrGastMen', {
    //renderTo: Ext.getBody(),
    extend: 'Ext.window.Window',
    alias: 'widget.gastmen',
    title: 'Gráfico - Gastos Mensais',
    height: 470,
    width: 550,
    autoScroll: true,
    id: 'gastmen',
    //layout: 'fit',
    align: 'stretch',
    modal: true,
    //minimizable:true,
    resizable: 'true',
    align: 'center',
    autoShow: true,

    requires: [
        'Ext.selection.CheckboxModel',
        'Ext.selection.CellModel',
        'Ext.util.ComponentDragger',
        'Ext.util.Region',
        'Ext.EventManager',
        'Ext.tab.Panel',
        'Ext.grid.*',
        'Ext.data.*',
        'Ext.util.*',
        'Ext.state.*',
        'Ext.form.*',
        'Ext.chart'

    ],
    items: [

        {
            xtype: 'chart',
            width: 500,
            height: 350,
            animate: true,
            store: store,
            theme: 'Base:gradients', //Base,Sky,Blue,Green,...
            legend: {
                position: 'right'
            },
            series: [{
                type: 'pie',
                angleField: 'data',
                showInLegend: true,
                tips: {
                    trackMouse: true,
                    width: 140,
                    height: 28,
                    renderer: function(storeItem, item) {
                        //calculate and display percentage on hover
                        //var total = 0;
                        //store.each(function(rec) {
                        //total += rec.get('data');
                        //});
                        //this.setTitle(storeItem.get('name') + ': ' + Math.round(storeItem.get('data') / total * 100) + '%');
                        this.setTitle(storeItem.get('name') + ': ' + 'R$' + storeItem.get('data'));
                    }
                },
                highlight: {
                    segment: {
                        margin: 20
                    }
                },
                label: {
                    field: 'name',
                    display: 'rotate',
                    contrast: true,
                    font: '18px Arial'
                }

            }]

        }
    ],
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'bottom',
        items: [{
            xtype: 'button',
            id: 'btn_lib',
            text: 'Salvar',
            //iconCls: 'icon-liberar',
            handler: function() {


                } //fim da função click
        }]
    }]

});