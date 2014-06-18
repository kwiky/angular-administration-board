app.factory('UserFactory', function($resource) {
	return $resource(API_URL + '/users/:id', {id : '@_id'},
        {
          'update': {method: 'PUT'}
        }
    );
});

app.factory('RoleMappingFactory', function($resource) {
	return $resource(API_URL + '/users/:userId/roleMappings', {userId : '@_userId'});
});

app.factory('RoleFactory', function($resource) {
	return $resource(API_URL + '/roles/:id', {id : '@_id'});
});