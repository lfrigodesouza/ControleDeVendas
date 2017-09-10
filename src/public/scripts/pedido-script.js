'use strict';

angular.module('app').controller('Pedido', function($scope, $http, $filter) {
    $scope.pageTitle = 'Cadastro de Pedido';
    $scope.data = {};
    $scope.ListaDeProdutos = [];
    $scope.valorTotal = 0;
    $scope.dtPedido = new Date($filter('date')(Date.now()
        , 'yyyy-MM-ddTHH:mm:ss'));
    $scope.dtEntrega = new Date($filter('date')(Date.now()
        , 'yyyy-MM-ddTHH:mm:ss'));

    $scope.clickSalvar = function() {
        debugger;
        $scope.preparaEnvio();

        $http.post('/pedidos/', JSON.stringify($scope.pedido), {
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
        }).then((response) => {
            $scope.data = {};
            $scope.pedido = {};
            $scope.ListaDeProdutos = {};
            $scope.alert = 'alert alert-success';
            $scope.msgRetorno = 'Pedido salvo com sucesso';
        }, (response) => {
            debugger;
            $scope.alert = 'alert alert-danger';
            $scope.msgRetorno = processaErros(response.data);
        });
    };
    /** Recebe o data de um response HTTP e concatena as mensagens 
     * que vierem no objeto message 
     * @param {Array} data
     * @return {String} */
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
                    $scope.produto.quantidade = 1;
                }

            });
    };
    $scope.adicionarProduto = function() {
        debugger;
        if ($scope.produto.quantidade > 0 && $scope.data.buscaProduto != '') {
            // $scope.ListaDeProdutos.push(Object.assign({}, $scope.produto));
            $scope.ListaDeProdutos.push({
                quantidade: $scope.produto.quantidade,
                produto: $scope.produto,
            });
            $scope.valorTotal += $scope.produto.valor;
            $scope.produto = {};
            $scope.data.buscaProduto = '';
        }
    };

    $scope.removerProduto = function(indexProduto) {
        $scope.ListaDeProdutos.splice(indexProduto, 1);
        $scope.valorTotal -= $scope.produto.valor;
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
});
