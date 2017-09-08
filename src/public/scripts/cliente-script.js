'use strict';

angular.module('app').controller('Cliente', function($scope, $http) {
    $scope.pageTitle = 'Cadastro de Clientes';
    $scope.data = {};

    $scope.clickSalvar = function() {
        debugger;

        $http.post('/cliente/', JSON.stringify($scope.data), {
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
        }).then((response)=> {
           $scope.data={};
           $scope.alert = 'alert alert-success';
           $scope.msgRetorno = 'Cliente salvo com sucesso';
        }, (response)=> {
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
        let errMsgs ='';
        if (Object.prototype.toString.call(data) == '[object Object]') {
            errMsgs += data.message;
            errMsgs += ': ';
            errMsgs += data.error.errmsg;
        } else if (Object.prototype.toString.call(data) == '[object Array]') {
        data.forEach((cur, i)=>{
            if (i > 0) {
                errMsgs += ' | ';
            }
            errMsgs += cur.message;
        });
    }
        return errMsgs;
    };
});
