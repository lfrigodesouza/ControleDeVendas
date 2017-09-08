'use strict';
angular.module('app').controller('Index', function($scope, $http) {
    $scope.pageTitle = 'Controle de Vendas - Cozinha da Dinda';

    $scope.ListaPedidosPendentes = [];

    $scope.buscaPedidosPendentes = function() {
        debugger;
        $http.get('/pedido/buscaPedidosPendentes')
            .then((response) => {
                debugger;
                $scope.ListaPedidosPendentes = response.data;
            });
    };
    $scope.buscaPedidosPendentes();
});

