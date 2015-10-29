var serversRouteModule = angular.module('serversRouteModule', ['serversListModule', 'ngRoute']);

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

serversRouteModule.config(getTemplate);

var serversListModule = angular.module('serversListModule', []);
serversListModule.factory('Servers', function($q, $timeout) {
    var servers = {},
        availableVerTmp,
        serversLocalStorage,
        versionLocalStorage;

    serversTmp = [];
    availableVerTmp = ['8.1', '8.2', '8.3'];

    servers.getServers = function() {
        if (localStorage.getItem('serversTmp')) {
            try {
                return JSON.parse(localStorage.getItem('serversTmp'));
            } catch (error) {
                console.log('Error: ' + "\n" + error.stack);
            };
        } else {
            localStorage.setItem('serversTmp', JSON.stringify(serversTmp));
        };
    };

    servers.getAvailableVer = function() {
        if (localStorage.getItem('availableVerTmp')) {
            try {
                return JSON.parse(localStorage.getItem('availableVerTmp'));
            } catch (error) {
                console.log('Error: ' + "\n" + error.stack);
            };
        } else {
            localStorage.setItem('availableVerTmp', JSON.stringify(availableVerTmp));
        };
    };

    servers.getServersVer = function() {
        try {
            var localServers = JSON.parse(localStorage.getItem('serversTmp'));
        } catch (error) {
            console.log('Error: ' + "\n" + error.stack);
        };

        var serversVer = [];
        for (var i = 0; i < localServers.length; i += 1) {
            serversVer.push(localServers[i].version);
        };
        return (serversVer.sort()).filter(function(elem, index, arr) {
            return elem != arr[index + 1];
        });
    };

    servers.getObjById = function(id) {
        try {
            var localServers = JSON.parse(localStorage.getItem('serversTmp'));
        } catch (error) {
            console.log('Error: ' + "\n" + error.stack);
        };

        for (var i = 0; i < localServers.length; i += 1) {
            if (localServers[i].id == id) {
                return localServers[i];
            }
        };
    };

    servers.save = function(server) {
        try {
            var localServers = JSON.parse(localStorage.getItem('serversTmp'));
        } catch (error) {
            console.log('Error: ' + "\n" + error.stack);
        };

        if (server.id) {
            for (var i = 0; i < localServers.length; i += 1) {
                if (localServers[i].id == server.id) {
                    localServers[i].ip = server.ip;
                    localServers[i].name = server.name;
                    localServers[i].version = server.version;
                };
            };
        } else {
            localServers.push({
                id: localServers.length ? (localServers[localServers.length - 1].id + 1) : 1,
                ip: server.ip,
                name: server.name,
                version: server.version
            });
        };
        localStorage.serversTmp = JSON.stringify(localServers);
    };

    servers.remove = function(id) {
        try {
            var localServers = JSON.parse(localStorage.getItem('serversTmp'));
        } catch (error) {
            console.log('Error: ' + "\n" + error.stack);
        };

        for (var i = 0; i < localServers.length; i += 1) {
            if (localServers[i].id == id) {
                localServers.splice(i, 1);
            }
        };
        localStorage.serversTmp = JSON.stringify(localServers);
    };

    servers.update = function(id, version) {
        try {
            var localServers = JSON.parse(localStorage.getItem('serversTmp'));
        } catch (error) {
            console.log('Error: ' + "\n" + error.stack);
        }

        for (var i = 0; i < localServers.length; i += 1) {
            if (localServers[i].id == id) {
                if (version) {
                    localServers[i].version = version;
                }
            }
        };
        localStorage.serversTmp = JSON.stringify(localServers);
    };


    // for checking data from server;

    // function okToGreet(param) {
    //     // return param == '';
    // }

    servers.restart = function(param) {
        var deferred = $q.defer();

        $timeout(function() {
            // if (okToGreet(param)) {
                deferred.resolve('servers has restarted');
            // } else {
                deferred.reject('restart failed');
            // }
        }, 3000);

        return deferred.promise;
    };
    return servers;
});