angular.module('MiningUseCase')
    .controller('SigninController', ['$rootScope', '$scope', 'MiningService', function ($rootScope, $scope, MiningService) {
        $("#useDD").hide();
        $scope.emailid = '';
        $scope.password = '';
        $scope.LoginClick = function (form) {
            if (form.$valid) {
                var data = {
                    "emailid": $scope.emailid,
                    "password": $scope.password
                };
                MiningService.signin(data); 
            }
        }

    }]);
