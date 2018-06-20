Ext.Loader.setConfig({
    enabled: true
});
var cellEditing = Ext.create('Ext.grid.plugin.CellEditing', {
    clicksToEdit: 3
});
//var sm = Ext.create('Ext.selection.CheckboxModel');

Ext.define('desloc.view.DadosPagPreVisu', {
    //renderTo: Ext.getBody(),
    extend: 'Ext.window.Window',
    alias: 'widget.previsu',
    title: 'Pré-visualização do arquivo de pagamento',
    height: 400,
    width: 450,
    x: 300,
    y: 38,
    autoScroll: true,
    id: 'previsu',
    //layout: 'fit',
    //align: 'stretch',
    modal: true,
    //minimizable:true,
    maximizable:'true',
    resizable: 'true',
    align: 'center',
    autoShow: true,

    requires: [
        'Ext.selection.CheckboxModel',
        'Ext.selection.CellModel',
        'Ext.util.ComponentDragger',
        'Ext.util.Region',
        'Ext.ux.TextMaskPlugin',
        'Ext.ux.grid.column.ActionButtonColumn',
        'Ext.EventManager',
        'Ext.tab.Panel',
        'Ext.grid.*',
        'Ext.data.*',
        'Ext.util.*',
        'Ext.state.*',
        'Ext.form.*'
    ],

    items: [
        {
            xtype: 'grid',
            id: 'gridprevisu',
            height: 700,
            width: 1350,
            //selModel: sm,
            /*selModel: {
                selType: 'checkboxmodel',
                mode: 'MULTI'
            },*/
            layout:'fit',
            store: Ext.create('desloc.store.DadosPagPreVisuS'),
            //autoScroll:true,
            columns: [

                {
                    header: '',
                    dataIndex: 'tipo',
                    width: 30,
                    menuDisabled: true
                },
                {
                    header: 'Empresa',
                    dataIndex: 'numemp',
                    //width: 350,
                    menuDisabled: true
                },
                {
                    header: 'Programa',
                    dataIndex: 'codprg',
                    //width: 350,
                    menuDisabled: true
                },
                {
                    header: 'Titulo',
                    dataIndex: 'numtit',
                    width: 130,
                    menuDisabled: true
                },
                {
                    header: 'Fornecedor',
                    dataIndex: 'codfor',
                    //width: 350,
                    menuDisabled: true
                },
                {
                    header: 'Centro de custo',
                    dataIndex: 'codccu',
                    width: 130,
                    menuDisabled: true
                },
                {
                    header: 'Valor',
                    dataIndex: 'vlrpag',
                    //width: 350,
                    menuDisabled: true
                },
                {
                    header: 'Data de geração',
                    dataIndex: 'datger',
                    width: 130,
                    menuDisabled: true
                },
                {
                    header: 'Data de vencimento',
                    dataIndex: 'ventit',
                    width: 150,
                    menuDisabled: true
                },
                {
                    header: 'Banco',
                    dataIndex: 'codban',
                    //width: 350,
                    menuDisabled: true
                },
                {
                    header: 'Agência',
                    dataIndex: 'codage',
                    //width: 350,
                    menuDisabled: true
                },
                {
                    header: 'Conta',
                    dataIndex: 'numcta',
                    //width: 350,
                    menuDisabled: true
                },
                {
                    header: 'Transporte',
                    dataIndex: 'destrans',
                    //width: 350,
                    menuDisabled: true
                }

            ],
            plugins: [cellEditing]
        }

    ],
    //
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'bottom',
        items: [{
                xtype: 'button',
                id: 'btn_gerarv',
                text: 'Arquivo de importação',
                iconCls: 'icon-validar',
                //hrefTarget: "_blank",
                //href: 'https://novoprossiga/php/Planejamento/DocPagamento.php',
                handler: function() {

                    var pGrid = Ext.getCmp('gridlote');
                    var selectedRecords = pGrid.getSelectionModel().getSelection();
                    var checkSld = Ext.getCmp('checkSld').getValue();

                    var aStore = pGrid.getStore();

                    var btnEx = Ext.getCmp('btn_gerarv');

                    var selected = [];
                    Ext.each(selectedRecords, function (item) {
                       //selected.push(item.data);
                       selected.push(item.data.numcad);
                    });

                   /**/Ext.Ajax.request({
                   url: '/php/Planejamento/DocPagamento.php',
                   method: 'POST',
                   params: {data:Ext.encode(selected),checkSaldo:checkSld},
                   success: function(response) {
                     var result = Ext.JSON.decode(response.responseText);

                       if(result == 0){

                            var preStore = Ext.getCmp('gridprevisu').getStore();
                            preStore.load();

                            function showResult(btn){
                                if (btn == 'ok'){

                                     aStore.load({
                                      params:{
                                      btn:0,
                                      check: 'false', //true=marcado,false=desmarcado
                                      checkSld: 'false' //true=marcado,false=desmarcado
                                     }
                                 });
                                 Ext.getCmp('previsu').destroy();

                                }
                            }

                            Ext.Msg.show({
                                title: 'Mensagem',
                                msg: 'Arquivo para pagamento gerado.',
                                buttons: Ext.Msg.OK,
                                closable: false,
                                fn: showResult
                            });
                       }

                   },
                   failure: function() {
                       Ext.Msg.alert('Mensagem', 'Problema ao gerar o arquivo.');
                   }

                 });/**/

                    /*btnEx.setParams({
                        data:Ext.encode(selected),
                        checkSldo:checkSld
                    });

                    var preStore = Ext.getCmp('gridprevisu').getStore();
                    preStore.load();

                    function showResult(btn){
                        if (btn == 'ok'){

                             aStore.load({
                              params:{
                              btn:0,
                              check: 'false', //true=marcado,false=desmarcado
                              checkSld: 'false' //true=marcado,false=desmarcado
                             }
                         });
                         Ext.getCmp('previsu').destroy();

                        }
                    }

                    Ext.Msg.show({
                        title: 'Mensagem',
                        msg: 'Arquivo para pagamento gerado.',
                        buttons: Ext.Msg.OK,
                        closable: false,
                        fn: showResult
                    });*/

                }//Fim do handler
            },
            {
                xtype: 'button',
                text: 'Sair',
                iconCls: 'icon-sair',
                listeners: {
                    click: function(){
                      var sLGrid  = Ext.getCmp('gridlote');
                      var sLStore = sLGrid.getStore();

                      sLStore.load({
                        params:{
                            btn:0
                         }
                     });
                     Ext.getCmp('previsu').destroy();

                    }
                },
                style: {

                    margin: '0 0 0 10'
                }
            }
        ]
    }],
    listeners: {

        //Acrecentar funções

        beforerender: function() {

            var sPGrid = Ext.getCmp('gridlote');
            var selectedRecords = sPGrid.getSelectionModel().getSelection();
            var checkSld = Ext.getCmp('checkSld').getValue();
            //var numcad = selectedRecords[0].get("numcad");
            var sPStore = sPGrid.getStore();

           var selected = [];
           Ext.each(selectedRecords, function (item) {
              selected.push(item.data.numcad);
           });

            var pGrid  = Ext.getCmp('gridprevisu');
            var pStore = pGrid.getStore();

            pStore.load({
               params: {data:Ext.encode(selected),checkSld:checkSld}
            });

            /*Ext.Ajax.request({
                url: '/php/Planejamento/DadosPagPreVisu.php',
                method: 'POST',
                params: {data:Ext.encode(selected)},
                success: function(response) {
                  //var result = Ext.JSON.decode(response.responseText);

                    //if (result == 0) {}

                },
                failure: function() {}

             });*/
        },
        beforeclose: function(){
            var sLGrid  = Ext.getCmp('gridlote');
            var sLStore = sLGrid.getStore();

            sLStore.load({
              params:{
                  btn:0,
                  check: 'false', //true=marcado,false=desmarcado
                  checkSld: 'false' //true=marcado,false=desmarcado
               }
           });
            Ext.getCmp('previsu').destroy();
        }

    }

});
