'use strict';

angular.module('app').controller('Cliente', function($scope, $http) {
    debugger;
    $scope.pageTitle = 'Cadastro de Clientes';
    $scope.data = {};
    $scope.isUpdate = false;
    $scope.idCliente = window.location.pathname
        .substr(window.location.pathname.lastIndexOf('/') + 1);

    $scope.buscaClienteById = function(id, callback) {
        $http.get('/clientes/buscaClienteById/' + id)
            .then((response) => {
                debugger;
                $scope.isUpdate = true;
                $scope.data = response.data;
                if (callback != null) {
                    callback();
                }
            });
    };
    $scope.buscaPedidosPorCliente = function() {
        $http.get('/pedidos/buscaPedidosPorCliente/'+ $scope.idCliente)
        .then((response) => {
            debugger;
            $scope.listaPedidos = response.data;
        });
    };

    if ($scope.idCliente != '' && $scope.idCliente != 'cliente-edit') {
        debugger;
        $scope.buscaClienteById($scope.idCliente
            , $scope.buscaPedidosPorCliente);
    }

    $scope.clickSalvar = function() {
        debugger;
        if (!$scope.isUpdate) {
            $http.post('/clientes/', JSON.stringify($scope.data), {
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                },
            }).then((response) => {
                $scope.data = {};
                $scope.alert = 'alert alert-success';
                $scope.msgRetorno = 'Cliente salvo com sucesso';
            }, (response) => {
                debugger;
                $scope.alert = 'alert alert-danger';
                $scope.msgRetorno = processaErros(response.data);
            });
        } else {
            $http.put('/clientes/', JSON.stringify({id: $scope.idCliente,
                    cliente: $scope.data}), {
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                },
            }).then((response) => {
                $scope.alert = 'alert alert-success';
                $scope.msgRetorno = 'Cliente atualizado com sucesso';
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
