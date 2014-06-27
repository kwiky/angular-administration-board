app.factory('CategoryFactory', function($resource) {
	return $resource(API_URL + '/categories/:id', {id : '@_id'},
        {
          'update': {method: 'PUT'}
        }
    );
});