'use strict';

angular.module('MiningUseCase', [
    'ngStorage',
    'ngRoute',
    'angular-loading-bar'
])
.config(['$routeProvider', '$httpProvider','$locationProvider', function ($routeProvider, $httpProvider,$locationProvider) {
    $locationProvider.hashPrefix('');
    $routeProvider.
        when('/', {
            templateUrl: 'partials/home.html',
            controller: 'HomeController'
        }).
        when('/signin', {
            templateUrl: 'partials/signin.html',
            controller: 'SigninController'
        }).
        when('/contract', {
            templateUrl: 'partials/contract.html',
            controller: 'ContractController'
        }).
        when('/user', {
            templateUrl: 'partials/user.html',
            controller: 'UserController'
        }).
        when('/blasting', {
            templateUrl: 'partials/Blasting.html',
            controller: 'BlastingController'
        }).
        when('/drilling', {
            templateUrl: 'partials/Drilling.html',
            controller: 'DrillingController'
        }).
        when('/excavation', {
            templateUrl: 'partials/Excavation.html',
            controller: 'ExcavationController'
        }).
        when('/loading', {
            templateUrl: 'partials/Loading.html',
            controller: 'LoadingController'
        }).
        when('/volumtericsurvey', {
            templateUrl: 'partials/VolumtericSurvey.html',
            controller: 'VolumtericSurveyController'
        }).
        when('/stockpilesampling', {
            templateUrl: 'partials/StockpileSampling.html',
            controller: 'StockpileSamplingController'
        }).
        when('/TransportationToCrusher', {
            templateUrl: 'partials/TransportationToCrusher.html',
            controller: 'TransportationToCrusherController'
        }).
        otherwise({
            redirectTo: '/signin'
        });
    $httpProvider.interceptors.push(['$q', '$location', '$localStorage', function($q, $location, $localStorage) {
            return {
                'request': function (config) {
                    config.headers = config.headers || {};
                    if ($localStorage.token) {
                        config.headers.Authorization = 'Bearer ' + $localStorage.token;
                    }
                    return config;
                },
                'responseError': function(response) {
                    if(response.status === 401 || response.status === 403) {
                        $location.path('/signin');
                    }
                    return $q.reject(response);
                }
            };
        }]);
}

])
.run(['$rootScope',function($rootScope){
$rootScope.showflag = false;
$rootScope.baseurl = '';
}
]);
