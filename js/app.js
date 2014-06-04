//var API_URL = 'http://localhost:3000';
var API_URL = '/api-mocks';

var app = angular.module('admin', [
  'ngCookies',
  'ngRoute',
  'ngResource',
  'ngSanitize'
]).
config(function($httpProvider, $routeProvider) {
  $routeProvider
  	.when('/', {templateUrl: 'partials/index.html', controller: 'NavCtrl'})

    .when('/login', {templateUrl: 'partials/user/login.html', controller: 'UserCtrl'})
    .when('/users', {templateUrl: 'partials/user/all.html', controller: 'UserCtrl'})
    .when('/users/add', {templateUrl: 'partials/user/add.html', controller: 'UserCtrl'})
    .when('/users/:id', {templateUrl: 'partials/user/edit.html', controller: 'UserCtrl'})
	.otherwise({redirectTo: '/'});

  $httpProvider.defaults.useXDomain = true;
  $httpProvider.defaults.withCredentials= true;
  $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
  $httpProvider.defaults.transformRequest = function(data) {
      if (data === undefined) {
          return data;
      }
      console.log(data);
      return $.param(data);
  }
});