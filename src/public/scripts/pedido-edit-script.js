'use strict';

/*
TODO: 
    4. Implementar sequenciamento dos pedidos
        4.1 Implementar busca pelo numero do pedido
        4.2 Incluir numero do pedido somente leitura ao editar pedido
        4.3 Retornar numero do pedido depois de salvar
*/

angular.module('app').controller('Pedido', function($scope, $http, $filter) {
    $scope.pageTitle = 'Cadastro de Pedido';
    $scope.data = {};
    $scope.ListaDeProdutos = [];
    $scope.isUpdate = false;
    $scope.valorTotal = 0;
    $scope.idPedido = window.location.pathname
        .substr(window.location.pathname.lastIndexOf('/') + 1);
    $scope.bloquearSalvar = false;


    $scope.buscaPedidoById = function(id, callback) {
        $http.get('/pedidos/buscaPedidoById/' + id)
            .then((response) => {
                debugger;
                $scope.isUpdate = true;
                $scope.data = response.data;
                $scope.cliente = response.data.cliente;
                $scope.data.MetodoPgto = response.data.metodopagamento;
                $scope.dtPedido = new Date(response.data.datapedido);
                $scope.dtEntrega = new Date(response.data.dataentrega);
                $scope.valorTotal = response.data.valortotal;
                $scope.data.observacao = response.data.observacao;
                $scope.ListaDeProdutos = response.data.listaprodutos;
                $scope.entregue = response.data.entregue;
                $scope.cancelado = response.data.cancelado;
                if (callback != null) {
                    callback();
                }
            });
    };

    $scope.clickSalvar = function() {
        debugger;
        if (!$scope.isUpdate) {
            $scope.preparaEnvio();
            $http.post('/pedidos/', JSON.stringify($scope.pedido), {
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                },
            }).then((response) => {
                $scope.data = {};
                $scope.pedido = {};
                $scope.ListaDeProdutos = [];
                $scope.cliente = {};
                $scope.valorTotal = 0;
                $scope.dtPedido = new Date($filter('date')(Date.now()
                    , 'yyyy-MM-ddTHH:mm:ss'));
                $scope.dtEntrega = new Date($filter('date')(Date.now()
                    , 'yyyy-MM-ddTHH:mm:ss'));
                $scope.alert = 'alert alert-success';
                $scope.msgRetorno = 'Pedido salvo com sucesso';
            }, (response) => {
                debugger;
                $scope.alert = 'alert alert-danger';
                $scope.msgRetorno = processaErros(response.data);
            });
        } else {
            debugger;
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

    $scope.buscaClientePorTel = function() {
        $http.get('/clientes/BuscaClientePorTel/' + $scope.data.buscaCliente)
            .then((response) => {
                debugger;
                $scope.cliente = response.data;
            });
    };

    $scope.buscaProdutoPorCodigo = function() {
        $http.get('/produtos/BuscaProdutoPorCodigo/' + $scope.data.buscaProduto)
            .then((response) => {
                debugger;
                if (response.data != '') {
                    $scope.produto = response.data;
                    $scope.quantidade = 1;
                } else {
                    $scope.produto = '';
                }
            });
    };
    $scope.adicionarProduto = function() {
        debugger;
        if ($scope.quantidade > 0 && $scope.data.buscaProduto != '') {
            $scope.ListaDeProdutos.push({
                quantidade: $scope.quantidade,
                produto: $scope.produto,
            });
            $scope.valorTotal += $scope.produto.valor;
            $scope.produto = {};
            $scope.data.buscaProduto = '';
        }
    };

    $scope.removerProduto = function(indexProduto) {
        debugger;
        $scope.valorTotal -= $scope.ListaDeProdutos[indexProduto].produto.valor;
        $scope.ListaDeProdutos.splice(indexProduto, 1);
    };

    $scope.preparaEnvio = function() {
        $scope.pedido = {
            cliente: $scope.cliente,
            metodopagamento: $scope.data.MetodoPgto,
            datapedido: $scope.dtPedido,
            dataentrega: $scope.dtEntrega,
            valortotal: $scope.valorTotal,
            observacao: $scope.data.observacao,
            listaprodutos: $scope.ListaDeProdutos,
        };
        debugger;
    };

    if ($scope.idPedido != '' && $scope.idPedido != 'pedido-edit') {
        debugger;
        $scope.buscaPedidoById($scope.idPedido, () =>{
            $scope.bloquearSalvar = ($scope.entregue || $scope.cancelado);
        });
    } else {
        debugger;
        $scope.dtPedido = new Date($filter('date')(Date.now()
            , 'yyyy-MM-ddTHH:mm:ss'));
        $scope.dtEntrega = new Date($filter('date')(Date.now()
            , 'yyyy-MM-ddTHH:mm:ss'));
    }
});
