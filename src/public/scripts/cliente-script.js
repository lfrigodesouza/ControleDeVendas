'use strict';

angular.module('app').controller('Cliente', function ($scope, $http) {
    $scope.pageTitle = 'Lista de Clientes';
    $scope.data = {};
    $scope.paginaAtual = 1;
    $scope.paginas = [];

    $scope.buscaClientes = function(pPage) {
        $http.get('/clientes/buscaClientes/' + pPage)
            .then((response) => {
                debugger;
                $scope.listaClientes = response.data;
            });
    };

    $scope.Proximo = function() {
        debugger;
        if ($scope.paginaAtual < $scope.paginas.length) {
            $scope.paginaAtual++;
            $scope.buscaClientes($scope.paginaAtual);
        }
    };

    $scope.Anterior = function() {
        debugger;
        if ($scope.paginaAtual > 1) {
            $scope.paginaAtual--;
            $scope.buscaClientes($scope.paginaAtual);
        }
    };

    $scope.preparaNavegacao = function() {
        $http.get('/clientes/QtdTotalClientes')
            .then((response) => {
                debugger;
                let QtdPaginas = Math.ceil(response.data / 10);
                for (let index = 1; index <= QtdPaginas; index++) {
                    $scope.paginas.push(index);
                }
            });
    };

    $scope.buscaClientePorTel = function() {
        debugger;
        if ($scope.buscaTelPrincipal != null
            && $scope.buscaTelPrincipal != '') {
            $http.get('/clientes/BuscaClientePorTel/'
                + $scope.buscaTelPrincipal)
                .then((response) => {
                    debugger;
                    $scope.listaClientes = [];
                    $scope.listaClientes.push(response.data);
                });
        } else {
            $scope.buscaClientes(1);
        }
    };

    $scope.buscaClientes(1);
    $scope.preparaNavegacao();
});
