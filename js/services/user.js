app.factory('UserFactory', function($resource) {
	return $resource(API_URL + '/users/:id', {id : '@_id'},
        {
          'update': {method: 'PUT'}
        }
    );
});