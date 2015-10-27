// (function() {
vsModule.controller('ListEditController', function($scope, Servers, $routeParams) {
	// console.log('ListEditController has connected');

	$scope.refreshData = function() {
		$scope.servers = Servers.getServers();
		$scope.serversVer = Servers.getServersVer();
	};

	$scope.refreshVersions = function() {
		$scope.allVerTmp = (($scope.serversVer).concat(Servers.getAvailableVer())).sort();
		$scope.availableVer = ($scope.allVerTmp).filter(function(elem, index, arr) {
			return elem != arr[index + 1];
		});
	};

	$scope.save = function(serverById) {
		Servers.save(serverById);
		$scope.refreshData();
		$scope.refreshVersions();
	}

	if ($routeParams.id) {
		$scope.id = $routeParams.id;
		$scope.serverById = Servers.getObjById($scope.id);
	} else {
		$scope.serverById = {
			ip: '',
			name: '',
			version: ''
		};
	}
});
// })();