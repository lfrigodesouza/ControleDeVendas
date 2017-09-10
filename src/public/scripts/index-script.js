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
        $http.put('/pedidos/entregarPedido', JSON.stringify({id: id}), {
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
        }).then((response) => {
            console.log('pedido entregue com sucesso');
            $scope.buscaPedidosPendentes();
        }, (response) => {
            debugger;
            console.log('erro ao entregar pedido');
        });
    };

    $scope.cancelarClick = function(id) {
        debugger;
        $http.put('/pedidos/cancelarPedido', JSON.stringify({id: id}), {
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
        }).then((response) => {
            console.log('pedido cancelado com sucesso');
            $scope.buscaPedidosPendentes();
        }, (response) => {
            debugger;
            console.log('erro ao cancelar pedido');
        });
    };
});
