'use strict';

angular.module('MiningUseCase')
    .factory('MiningService', ['$http', '$localStorage', '$location', '$rootScope', function ($http, $localStorage, $location, $rootScope) {
        var baseUrl = "";
        function changeUser(user) {
            angular.extend(currentUser, user);
        }
        function urlBase64Decode(str) {
            var output = str.replace('-', '+').replace('_', '/');
            switch (output.length % 4) {
                case 0:
                    break;
                case 2:
                    output += '==';
                    break;
                case 3:
                    output += '=';
                    break;
                default:
                    throw 'Illegal base64url string!';
            }
            return window.atob(output);
        }
        function getUserFromToken() {
            var token = $localStorage.token;
            var user = {};
            if (typeof token !== 'undefined') {
                var encoded = token.split('.')[1];
                user = JSON.parse(urlBase64Decode(encoded));
            }
            return user;
        }
        function setBootUpValues(currentUser) {
            $rootScope.showflag = true;
            $rootScope.FullName = currentUser.fullname;
            $rootScope.EMail = currentUser.email;
            $rootScope.usertype = currentUser.usertype;
            $rootScope.projects = currentUser.projects;
            $rootScope.designation = currentUser.designation;
            $rootScope.uid = currentUser.id;
            $rootScope.errorclass = 'rederror';
            SetTheNavigation(currentUser.usertype);
        }
        function SetTheNavigation(usertype) {
            if ($rootScope.usertype == 'Contractors') {
                $rootScope.Drilling = true;
                $rootScope.TransportationtoCrusher = true;
                $rootScope.StockpileSampling = true;
                $rootScope.VolumtericSurvey = true;
                $rootScope.Loading = true;
                $rootScope.Excavation = true;
                $rootScope.Blasting = true;
            }
            if ($rootScope.usertype == 'Mining Company') {
                $rootScope.Drilling = false;
                $rootScope.TransportationtoCrusher = false;
                $rootScope.StockpileSampling = false;
                $rootScope.VolumtericSurvey = false;
                $rootScope.Loading = false;
                $rootScope.Excavation = false;
                $rootScope.Blasting = false;
            }
        }
        function GetLocationPath() {
            if ($rootScope.usertype == 'Contractors') { return '/drilling'; }
            if ($rootScope.usertype == 'Mining Company') { return '/contract' }
        }

        return {
            getBaseUrl: function () {
                return baseUrl;
            },
            signin: function (data, callback) {
                $http.post(baseUrl + '/authenticate', data).then(function (response) {
                    $rootScope.FullName = response.data.data.fullname;
                    $rootScope.EMail = response.data.data.email;
                    if (response.data.token != undefined) {
                        $rootScope.showflag = true;
                        $localStorage.token = response.data.token;
                        var user = getUserFromToken();
                        setBootUpValues(user);
                        var path = GetLocationPath();
                        $location.path(path);
                    }
                }, function (response) {
                    return "Something went wrong";
                }
                );
            },
            getUserFromToken: function (success) {
                var user = getUserFromToken();
                return user;
            },
            setBootUpValues: function (currentUser) {

                setBootUpValues(currentUser);
            },
            logOut: function () {
                $rootScope.showflag = false;
                $rootScope.FullName = '';
                $rootScope.EMail = '';
                $rootScope.fileBusinessType = '';
                $rootScope.projects = '';
                $rootScope.designation = '';
                delete $localStorage.token;
                $location.path('/signin');
            }
        };
    }
    ]);