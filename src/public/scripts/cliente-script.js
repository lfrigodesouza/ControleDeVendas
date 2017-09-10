'use strict';

angular.module('app').controller('Cliente', function($scope, $http) {
    $scope.pageTitle = 'Lista de Clientes';
    $scope.data = {};

    $scope.buscaClientes = function() {
        $http.get('/clientes/buscaClientes')
            .then((response) => {
                debugger;
                $scope.listaClientes = response.data;
            });
    };
    $scope.buscaClientes();

    $scope.buscaClientePorTel = function() {
        debugger;
        if ($scope.buscaTelPrincipal != null
                && $scope.buscaTelPrincipal != '') {
            $http.get('/clientes/BuscaClientePorTel/'
                + $scope.buscaTelPrincipal)
            .then((response) => {
                debugger;
                $scope.listaClientes=[];
                $scope.listaClientes.push(response.data);
            });
        } else {
            $scope.buscaClientes();
        }
    };
});
