'use strict';

angular.module('app').controller('Produto', function($scope, $http) {
    $scope.pageTitle = 'Cadastro de Produto';
    $scope.data = {};
    $scope.isUpdate = false;
    $scope.idProduto = window.location.pathname
        .substr(window.location.pathname.lastIndexOf('/') + 1);

    $scope.buscaProdutoById = function(id) {
        $http.get('/produtos/buscaProdutoById/' + id)
        .then((response) => {
            debugger;
            $scope.data = response.data;
            $scope.data.valor = parseFloat(
                Math.round($scope.data.valor * 100) / 100).toFixed(2);
        });
    };

    if ($scope.idProduto != '' && $scope.idProduto != 'produto-edit') {
        $scope.isUpdate = true;
        $scope.buscaProdutoById($scope.idProduto);
    }

    $scope.clickSalvar = function() {
        debugger;
        if (!$scope.isUpdate) {
            if ($scope.data.valor != null) {
                $scope.data.valor = $scope.data.valor.replace(',', '.');
            }
            $http.post('/produtos/', JSON.stringify($scope.data), {
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                },
            }).then((response) => {
                $scope.data = {};
                $scope.alert = 'alert alert-success';
                $scope.msgRetorno = 'Produto salvo com sucesso';
            }, (response) => {
                debugger;
                $scope.alert = 'alert alert-danger';
                $scope.msgRetorno = processaErros(response.data);
            });
        } else {
            $http.put('/produtos/', JSON.stringify({id: $scope.idProduto,
                produto: $scope.data}), {
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
        }).then((response) => {
            $scope.alert = 'alert alert-success';
            $scope.msgRetorno = 'Produto atualizado com sucesso';
        }, (response) => {
            debugger;
            $scope.alert = 'alert alert-danger';
            $scope.msgRetorno = processaErros(response.data);
        });
        }
    };

    function processaErros(data) {
        let errMsgs = '';
        if (Object.prototype.toString.call(data) == '[object Object]') {
            errMsgs += data.message;
            errMsgs += ': ';
            errMsgs += data.error.errmsg;
        } else if (Object.prototype.toString.call(data) == '[object Array]') {
            data.forEach((cur, i) => {
                if (i > 0) {
                    errMsgs += ' | ';
                }
                errMsgs += cur.message;
            });
        }
        return errMsgs;
    };
});
