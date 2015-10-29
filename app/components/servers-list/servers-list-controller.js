serversRouteModule.controller('serversListController', function($scope, $filter, Servers, $routeParams) {

	function refreshData() {
		$scope.servers = Servers.getServers();
		$scope.serversVer = Servers.getServersVer();
	};

	function refreshVersions() {
		$scope.allVerTmp = (($scope.serversVer).concat(Servers.getAvailableVer())).sort();
		$scope.availableVer = ($scope.allVerTmp).filter(function(elem, index, arr) {
			return elem != arr[index + 1];
		});
	};

	refreshData();
	refreshVersions();

	$scope.remove = function(id) {
		Servers.remove(id);
		refreshData();
		refreshVersions();
	};

	$scope.update = function(id, version) {
		$scope.currrentId == id ? $scope.currrentId = false : $scope.currrentId = id;
		Servers.update(id, version);
		refreshData();
		refreshVersions();
	};

	$scope.restart = function(param) {
		$scope.waitingText = 'Please, wait for servers restart';
		var promise = Servers.restart(param);
		promise
			.then(function(greeting) {
				$scope.waitingText = greeting;
			}, function(reason) {
				$scope.waitingText = reason;
			}, function(update) {
				$scope.waitingText = update;
			});
	};

	$scope.getComparator = function(actual, expected) {
		if (!expected) {
			return true;
		}
		return angular.equals(expected, actual);
	};
});