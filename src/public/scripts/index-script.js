'use strict';

angular.module('app').controller('Index', function($scope, $http) {
    $scope.pageTitle = 'Controle de Vendas - Cozinha da Dinda';

    $scope.ListaPedidosPendentes = [];

    $scope.buscaPedidosPendentes = function() {
        $http.get('/pedidos/buscaPedidosPendentes')
            .then((response) => {
                $scope.ListaPedidosPendentes = response.data;
            });
    };
    $scope.buscaPedidosPendentes();

    $scope.entregueClick = function(id) {
        debugger;
        $scope.itemId = id;
        $('#ModalEntregue').modal('show');
    };

    $scope.clickOKEntregar = function() {
        debugger;
        $http.put('/pedidos/entregarPedido', JSON.stringify({id: $scope.itemId}), {
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
        }).then((response) => {
            console.log('pedido entregue com sucesso');
            $('#ModalEntregue').modal('hide');
            $scope.buscaPedidosPendentes();
        }, (response) => {
            debugger;
            console.log('erro ao entregar pedido');
        });
    };

    $scope.clickOKancelar = function(id) {
        debugger;
        $http.put('/pedidos/cancelarPedido', JSON.stringify({id: $scope.itemId}), {
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
        }).then((response) => {
            console.log('pedido cancelado com sucesso');
            $('#ModalCancelar').modal('hide');
            $scope.buscaPedidosPendentes();
        }, (response) => {
            debugger;
            console.log('erro ao cancelar pedido');
        });
    };

    $scope.cancelarClick = function(id) {
        debugger;
        $scope.itemId = id;
        $('#ModalCancelar').modal('show');
    };
});
