app.controller('CategoryCtrl', function ($rootScope, $scope, $location, $routeParams, CategoryFactory) {
    $scope.inProgress = false;

    $scope.all = function() {
        if (!$rootScope.categories) {
        	CategoryFactory.query(
        		function(categories) {
    		    	$rootScope.categories = categories;
    			}
    		);
        }
    }

    $scope.edit = function() {
    	CategoryFactory.get({id : $routeParams.id},
    		function (category) {
                delete category.$promise;
                delete category.$resolved;
		    	$scope.category = category;
                console.log($scope.category);
			}
		);
    }

    $scope.save = function() {
    	CategoryFactory.update(
    		{id : $scope.category.id}, 
    		{name: $scope.category.name},
    		function(category) {
                console.log($scope.category);
		    	$location.path('/categories');
			}
		);
    }

    $scope.create = function() {
    	CategoryFactory.save(null, 
    		$scope.category,
    		function(category) {
                $rootScope.categories.push(category);
		    	$location.path('/categories');
			}
		);
    }

    $scope.delete = function(category) {
    	CategoryFactory.remove(
    		{id : category.id}, 
    		function() {
		    	var index = $rootScope.categories.indexOf(category);
  				$rootScope.categories.splice(index, 1);
			}
		);
    }
});