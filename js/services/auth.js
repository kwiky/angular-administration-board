app.factory('AuthFactory', function($http, $cookieStore, $cookies, $timeout, UserFactory) {
   	var currentUser = $cookieStore.get('user') || {id: ''};

	function changeUser(user) {
	    angular.extend(currentUser, user);
	    $cookieStore.put('user', user);
	}

	return {
		/*authorize: function(accessLevel, role) {
		    if(role === undefined) {
		        role = currentUser.role;
		    }

		    return accessLevel.bitMask & role.bitMask;
		},*/
		isLoggedIn: function(user) {
		    if(user === undefined) {
		        user = currentUser;
		    }
		    return user.role.title === userRoles.user.title || user.role.title === userRoles.admin.title;
		},
		/*register: function(user, success, error) {
		    $http.post('/register', user).success(function(res) {
		        changeUser(res);
		        success();
		    }).error(error);
		},*/
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
		    //$http.post('/logout').success(function(){
		        changeUser({
		            email: '',
		            fullname : ''
		        });
		        success();
		    //}).error(error);
		},
		/*accessLevels: accessLevels,
		userRoles: userRoles,*/
		user: currentUser
	};
});