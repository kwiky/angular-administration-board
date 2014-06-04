app.factory('AuthFactory', function($http, $cookieStore, $cookies, $timeout, UserFactory) {
   	var currentUser = $cookieStore.get('user') || {id: ''};

	function changeUser(user) {
	    angular.extend(currentUser, user);
	    $cookieStore.put('user', user);
	}

	return {
		login: function(user, success, error) {
   			$cookieStore.remove('user');
   			user.username = user.email;
		    $http.post(API_URL + '/users/login', user).success(function(user) {
		        UserFactory.get({id : 'me'},
		            function(u) {
				        changeUser(u);
				        success(u);
		            }
		        );
		    }).error(error);
		},
		logout: function(success, error) {
   			$cookieStore.remove('user');
		    $http.post(API_URL + '/users/logout').success(function(){
		        changeUser({
		            email: '',
		            id : ''
		        });
		        success();
		    }).error(error);
		},
		user: currentUser
	};
});