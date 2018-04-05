'use strict';

/* Controllers */

angular.module('MiningUseCase')
    .controller('IndexController', ['$rootScope', '$scope', '$location', '$localStorage', 'MiningService', function ($rootScope, $scope, $location, $localStorage, MiningService) {
        var currentUser = MiningService.getUserFromToken();
        if (currentUser.fullname == undefined) {
            $location.path('/signin');
        }
        else {
          MiningService.setBootUpValues(currentUser);
        }
        $scope.LogoutUser = function () {
          MiningService.logOut();
        }
    }]);

    function ShowWait(flag) {
        if (flag) {
            $('#WaitDiv').show();
            $('.loading').css("transform", "rotateY(0deg)");
            var delay = 100;
            setTimeout(function () {
                $('.loading-spinner-large').css("display", "block");
                $('.loading-spinner-small').css("display", "block");
            }, delay);
        }
        else
        { $('#WaitDiv').hide(); }
    }