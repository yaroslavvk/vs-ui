(function() {
    angular.module('serversRouteModule', ['serversListModule', 'ngRoute']);

    function getTemplate($routeProvider) {
        $routeProvider.
        when('/', {
            controller: 'serversListController',
            templateUrl: 'app/components/servers-list/servers-list.html'
        }).
        when('/edit/:id', {
            controller: 'serverEditController',
            templateUrl: 'app/components/server-edit/server-edit.html'
        }).
        when('/edit/', {
            controller: 'serverEditController',
            templateUrl: 'app/components/server-edit/server-edit.html'
        }).
        otherwise({
            redirectTo: '/'
        });
    }

    angular.module('serversRouteModule').config(getTemplate);

    angular.module('serversListModule', []);
})();