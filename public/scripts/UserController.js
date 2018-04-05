'use strict';

angular.module('MiningUseCase')
    .controller('UserController', ['$scope', '$http', function ($scope, $http) {
        $scope.sortType = 'fullname'; // set the default sort type
        $scope.sortReverse = false;  // set the default sort order
        $scope.searchUser = '';     // set the default search/filter term
        $("#useDD").show();
        $("#divUserInput").hide();
        var refreshUser = function () {
            $http.get($scope.baseurl + '/users').then(function (response) {
                $scope.Userlist = response.data.AllUsers;
                $scope.UserType = response.data.UserTypes;
                $scope.ProjectType = response.data.ProjectTypes;
                $scope.User = {};

            }, function (response)
                { return "Something went wrong." });
        };
        refreshUser();

        $scope.addUser = function () {
            $("#divUserGrid").fadeOut(200);
            $("#divUserInput").fadeIn(600);
            $scope.update = false;
        };

        $scope.SaveUser = function (form) {
            if (!$scope.update && form.$valid) {
                $http.post($scope.baseurl + '/users', $scope.User).then(function (response) {
                    refreshUser();
                    $("#divUserInput").fadeOut(200);
                    $("#divUserGrid").fadeIn(600);
                }, function (response)
                    { return "Something went wrong." });
            }
            if ($scope.update && form.$valid) {
                $http.put($scope.baseurl + '/users/' + $scope.User._id, $scope.User).then(function (response) {
                    refreshUser();
                    $("#divUserInput").fadeOut(200);
                    $("#divUserGrid").fadeIn(600);
                    $scope.update = false;
                }, function (response) { return "Something went wrong." });
            }
        };

        $scope.remove = function (id) {
            $http.delete($scope.baseurl + '/Users/' + id).then(function (response) {
                refreshUser();
            });
        };


        $scope.edit = function (id) {
            $("#divUserGrid").fadeOut(200);
            $("#divUserInput").fadeIn(600);

            $http.get($scope.baseurl + '/users/' + id).then(function (response) {
                $scope.update = true;
                $scope.User = response.data;
            }, function (response) {
                return "Something went wrong";
            });


        };

        $scope.deselect = function () {
            $scope.User = {};
            $("#divUserInput").fadeOut(200);
            $("#divUserGrid").fadeIn(600);
        }

    }]);
