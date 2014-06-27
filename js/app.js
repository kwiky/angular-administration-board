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

    .when('/categories', {templateUrl: 'partials/category/all.html', controller: 'CategoryCtrl'})
    .when('/categories/add', {templateUrl: 'partials/category/add.html', controller: 'CategoryCtrl'})
    .when('/categories/:id', {templateUrl: 'partials/category/edit.html', controller: 'CategoryCtrl'})
	.otherwise({redirectTo: '/'});

  $httpProvider.defaults.useXDomain = true;
  delete $httpProvider.defaults.headers.common['X-Requested-With'];
  $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
  $httpProvider.defaults.headers.common.Authorization = '';
  $httpProvider.defaults.transformRequest = function(data) {
      if (data === undefined) {
          return data;
      }
      return $.param(data);
  }
});