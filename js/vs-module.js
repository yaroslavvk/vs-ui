// (function () {
var vsModule = angular.module('vsModule', ['serversModule', 'ngRoute']);

function getTemplate($routeProvider) {
    $routeProvider.
    when('/', {
        controller: 'ListController',
        templateUrl: 'list.html'
    }).
    when('/view/:id', {
        controller: 'ListEditController',
        templateUrl: 'list-edit.html'
    }).
    when('/view/', {
        controller: 'ListEditController',
        templateUrl: 'list-edit.html'
    }).
    otherwise({
        redirectTo: '/'
    });
}

vsModule.config(getTemplate);
// })();