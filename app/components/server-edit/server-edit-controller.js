serversRouteModule.controller('serverEditController', function($scope, Servers, $routeParams) {

	$scope.save = function(server) {
		Servers.save(server);
	}

	if ($routeParams.id) {
		$scope.id = $routeParams.id;
		$scope.server = Servers.getObjById($scope.id);
	} else {
		$scope.serverById = {
			ip: '',
			name: '',
			version: ''
		};
	}
});