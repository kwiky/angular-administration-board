app.factory('AuthFactory', function($http, $rootScope, $cookieStore, $cookies, $timeout, UserFactory, RoleMappingFactory) {
	return {
		login: function(user, success, error) {
			$cookieStore.remove('token');
			$http.post(API_URL + '/users/login', user).success(function(token) {
				$cookieStore.put('token', token);
				$rootScope.token = token;
				$http.defaults.headers.common.Authorization = token.id;
				// Get user
				UserFactory.get({id : token.userId},
					function(user) {
						user.roles = [];
						// Get roles
						RoleMappingFactory.query({userId : user.id},
							function (roleMappings) {
								angular.forEach(roleMappings, function (roleMapping) {
									if (roleMapping.principalId = user.id) {
										user.roles.push($rootScope.roles[roleMapping.roleId].name);
									}
								});
								user.is = function(role) {
									return (this.roles.indexOf(role) > -1);
								}
								$cookieStore.put('user', user);
								$rootScope.currentUser = user;
								success(user);
							}
						);
					}
				);
			}).error(error);
		},
		logout: function(success, error) {
			$http.post(API_URL + '/users/logout').success(function(){
				$cookieStore.remove('token');
				$cookieStore.remove('user');
				$rootScope.token = null;
				$rootScope.currentUser = null;
				$http.defaults.headers.common.Authorization = '';
				success();
			}).error(error);
		},
		getUser: function() {
			if(!$rootScope.currentUser) {
				$rootScope.currentUser = $cookieStore.get('user');
				if($rootScope.currentUser) {
					$rootScope.currentUser.is = function(role) {
						return (this.roles.indexOf(role) > -1);
					}
				}
			}
			return $rootScope.currentUser;
		},
		getToken: function() {
			if(!$rootScope.token) {
				$rootScope.token = $cookieStore.get('token');
			}
			return $rootScope.token;
		}
	};
});