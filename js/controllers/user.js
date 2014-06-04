app.controller('UserCtrl', function ($rootScope, $scope, $location, $routeParams, AuthFactory, UserFactory) {
    $scope.inProgress = false;

    $scope.login = function() {
        $scope.inProgress = true;
        AuthFactory.login({
                email: $scope.email,
                password: $scope.password
            },
            function(res) {
                $location.path('/');
            },
            function(err) {
                $scope.inProgress = false;
                toastr.error('Failed to login');
            });
    };

    $scope.all = function() {
    	UserFactory.query(
    		function(users) {
		    	$scope.users = users;
			}
		);
    }

    $scope.edit = function() {
    	UserFactory.get({id : $routeParams.id},
    		function (user) {
                delete user.$promise;
                delete user.$resolved;
		    	$scope.user = user;
                $scope.user.email = $scope.user.username;
			}
		);
    }

    $scope.save = function() {
        $scope.user.username = $scope.user.email;
    	UserFactory.update(
    		{id : $scope.user.id}, 
    		$scope.user,
    		function(user) {
		    	$location.path('/users');
			}
		);
    }

    $scope.create = function() {
        $scope.user.username = $scope.user.email;
    	UserFactory.save(null, 
    		$scope.user,
    		function(user) {
		    	$location.path('/users');
			}
		);
    }

    $scope.delete = function(user) {
    	UserFactory.remove(
    		{id : user.id}, 
    		function() {
		    	var index = $scope.users.indexOf(user);
  				$scope.users.splice(index, 1);
			}
		);
    }
});