app.controller('NavCtrl', function($rootScope, $scope, $location, AuthFactory, UserFactory) {
    $rootScope.currentUser = AuthFactory.user;

    // Redirect to login if not logged
    if (!$rootScope.currentUser || !$rootScope.currentUser.id) $location.path('/login');

    $scope.logout = function() {
        AuthFactory.logout(
            function(res) {
                $rootScope.currentUser = AuthFactory.user;
                $location.path('/');
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
        if ($rootScope.currentUser && $rootScope.currentUser.id) {
            UserFactory.query(
                function(users) {
                    $rootScope.users = users;
                }
            );
        }
    }
});