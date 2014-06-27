app.controller('NavCtrl', function($http, $rootScope, $scope, $location, AuthFactory, UserFactory, RoleFactory) {
    $rootScope.currentUser = AuthFactory.getUser();
    $rootScope.token = AuthFactory.getToken();
    $rootScope.roles = [];
    $rootScope.users = null;

    // Get roles
    RoleFactory.query(
        function(roles) {
            angular.forEach(roles, function (role) {
                if (role.id) {
                    $rootScope.roles[role.id] = role;
                }
            });
        }
    );

    // Redirect to login if not logged
    if (!$rootScope.token) {
        $rootScope.currentUser = null;
        $location.path('/login');
    } else {
        $http.defaults.headers.common.Authorization = $rootScope.token.id;
    }

    $scope.logout = function() {
        AuthFactory.logout(
            function() {
                $location.path('/');
            },
            function(err) {
                toastr.error('Failed to logout');
            }
        );
    };

    $scope.getClass = function(path) {
        if (path == '/') {
            if ($location.path() == path) {
              return "active " + path.substr(1);
            } 
        } else if ($location.path().substr(0, path.length) == path) {
	      return "active " + path.substr(1);
	    } else {
	      return " " + path.substr(1);
	    }
	}

    $scope.showSpecificHeader = function() {
        return $location.path() == '/login';
    }

    $scope.init = function() {
        if ($rootScope.token) {
            if (currentUser.is('admin')) {
                UserFactory.query(
                    function(users) {
                        $rootScope.users = users;
                    }
                );
            }
        }
    }

});