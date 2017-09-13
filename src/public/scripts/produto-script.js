'use strict';

angular.module('app').controller('Produto', function($scope, $http) {
    $scope.pageTitle = 'Lista de Produtos';
    $scope.listaProdutos = [];
    $scope.paginas=[];
    $scope.paginaAtual = 0;

    $scope.buscaProdutos = function(pPage) {
        $scope.paginaAtual = pPage;
        $http.get('/produtos/buscaProdutos/'+ pPage)
        .then((response) => {
            debugger;
            $scope.listaProdutos = response.data;
        });
    };

    $scope.Proximo = function() {
        debugger;
        if ($scope.paginaAtual < $scope.paginas.length) {
            $scope.paginaAtual++;
            $scope.buscaProdutos($scope.paginaAtual);
        }
    };

    $scope.Anterior = function() {
        debugger;
        if ($scope.paginaAtual > 1) {
            $scope.paginaAtual--;
            $scope.buscaProdutos($scope.paginaAtual);
        }
    };

    $scope.preparaNavegacao = function() {
        $http.get('/produtos/QtdTotalProdutos')
        .then((response) => {
            debugger;
            let QtdPaginas = Math.ceil(response.data/10);
            for (let index = 1; index <= QtdPaginas; index++) {
                $scope.paginas.push(index);
            }
        });
    };

    $scope.buscaProdutos(1);
    $scope.preparaNavegacao();
});

