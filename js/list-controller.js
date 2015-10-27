// (function() {
vsModule.controller('ListController', function($scope, Servers, $routeParams) {
	// console.log('ListEditController has connected');

	// $scope.showUpdate = false;

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

	$scope.refreshData();
	$scope.refreshVersions();

	$scope.remove = function(id) {
		Servers.remove(id);
		$scope.refreshData();
		$scope.refreshVersions();
	};

	$scope.update = function(id, version) {
		Servers.update(id, version);
		$scope.refreshData();
		$scope.refreshVersions();
	};

	$scope.filter = function(version) {
		Servers.filter(version);
		$scope.refreshData();
		$scope.refreshVersions();
	};
});
// })();