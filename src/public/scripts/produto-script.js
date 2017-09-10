'use strict';

angular.module('app').controller('Produto', function($scope, $http) {
    $scope.pageTitle = 'Lista de Produtos';
    $scope.listaProdutos = [];

    $scope.buscaProdutos = function() {
        $http.get('/produtos/buscaProdutos')
        .then((response) => {
            debugger;
            $scope.listaProdutos = response.data;
        });
    };
    $scope.buscaProdutos();
});
