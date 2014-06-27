app.controller('UserCtrl', function ($rootScope, $scope, $location, $routeParams, AuthFactory, UserFactory) {
    $scope.inProgress = false;

    $scope.login = function() {
        $scope.inProgress = true;
        AuthFactory.login({
                email: $scope.email,
                password: $scope.password
            },
            function(user) {
                $location.path('/');
            },
            function(err) {
                $scope.inProgress = false;
                toastr.error('Failed to login');
            });
    };

    $scope.all = function() {
        if (!$rootScope.users) {
        	UserFactory.query(
        		function(users) {
    		    	$rootScope.users = users;
    			}
    		);
        }
    }

    $scope.edit = function() {
    	UserFactory.get({id : $routeParams.id},
    		function (user) {
                delete user.$promise;
                delete user.$resolved;
		    	$scope.user = user;
			}
		);
    }

    $scope.save = function() {
    	UserFactory.update(
    		{id : $scope.user.id}, 
    		$scope.user,
    		function(user) {
		    	$location.path('/users');
			}
		);
    }

    $scope.create = function() {
    	UserFactory.save(null, 
    		$scope.user,
    		function(user) {
                $rootScope.users.push(user);
		    	$location.path('/users');
			}
		);
    }

    $scope.delete = function(user) {
    	UserFactory.remove(
    		{id : user.id}, 
    		function() {
		    	var index = $rootScope.users.indexOf(user);
  				$rootScope.users.splice(index, 1);
			}
		);
    }
});