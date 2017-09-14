'use strict';

angular.module('app').controller('Pedido', function($scope, $http) {
    $scope.pageTitle = 'Lista de Pedidos';
    $scope.data = {};
    $scope.paginaAtual = 1;
    $scope.paginas = [];

    $scope.buscaPedidos = function(pPage) {
        $http.get('/pedidos/buscaPedidos/' + pPage)
            .then((response) => {
                debugger;
                $scope.listaPedidos = response.data;
            });
    };

    $scope.Proximo = function() {
        debugger;
        if ($scope.paginaAtual < $scope.paginas.length) {
            $scope.paginaAtual++;
            $scope.buscaPedidos($scope.paginaAtual);
        }
    };

    $scope.Anterior = function() {
        debugger;
        if ($scope.paginaAtual > 1) {
            $scope.paginaAtual--;
            $scope.buscaPedidos($scope.paginaAtual);
        }
    };

    $scope.preparaNavegacao = function() {
        $http.get('/pedidos/qtdTotalPedidos')
            .then((response) => {
                debugger;
                let QtdPaginas = Math.ceil(response.data / 10);
                for (let index = 1; index <= QtdPaginas; index++) {
                    $scope.paginas.push(index);
                }
            });
    };

    // $scope.buscaClientePorTel = function() {
    //     debugger;
    //     if ($scope.buscaTelPrincipal != null
    //         && $scope.buscaTelPrincipal != '') {
    //         $http.get('/clientes/BuscaClientePorTel/'
    //             + $scope.buscaTelPrincipal)
    //             .then((response) => {
    //                 debugger;
    //                 $scope.listaClientes = [];
    //                 $scope.listaClientes.push(response.data);
    //             });
    //     } else {
    //         $scope.buscaClientes(1);
    //     }
    // };

    $scope.buscaPedidos(1);
    $scope.preparaNavegacao();
});
