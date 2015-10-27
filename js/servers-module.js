// (function() {
var serversModule = angular.module('serversModule', []);
serversModule.factory('Servers', function() {
    var servers = {},
        availableVerTmp,
        serversLocalStorage,
        versionLocalStorage;

    serversTmp = [];
    availableVerTmp = ['8.1', '8.2', '8.3'];

    servers.getServers = function() {
        if (localStorage.getItem('serversTmp')) {
            return JSON.parse(localStorage.getItem('serversTmp'));
        } else {
            localStorage.setItem('serversTmp', JSON.stringify(serversTmp));
        }
    };

    servers.getAvailableVer = function() {
        if (localStorage.getItem('availableVerTmp')) {
            return JSON.parse(localStorage.getItem('availableVerTmp'));
        } else {
            localStorage.setItem('availableVerTmp', JSON.stringify(availableVerTmp));
        }
    };

    servers.getServersVer = function() {
        var localServers = JSON.parse(localStorage.getItem('serversTmp'));
        var serversVer = [];
        for (var i = 0; i < localServers.length; i += 1) {
            serversVer.push(localServers[i].version);
        }
        return (serversVer.sort()).filter(function(elem, index, arr) {
            return elem != arr[index + 1];
        });
    };

    servers.getObjById = function(id) {
        var localServers = JSON.parse(localStorage.getItem('serversTmp'));
        for (var i = 0; i < localServers.length; i += 1) {
            if (localServers[i].id == id) {
                return localServers[i];
            }
        }
    };

    servers.save = function(serverObj) {
        var localServers = JSON.parse(localStorage.getItem('serversTmp'));
        if (serverObj.id) {
            for (var i = 0; i < localServers.length; i += 1) {
                if (localServers[i].id == serverObj.id) {
                    localServers[i].ip = serverObj.ip;
                    localServers[i].name = serverObj.name;
                    localServers[i].version = serverObj.version;
                    localServers[i].showServer = true;
                    localServers[i].showUpdate = false;
                }
            }
        } else {
            localServers.push({
                id: localServers.length ? (localServers[localServers.length - 1].id + 1) : 1,
                ip: serverObj.ip,
                name: serverObj.name,
                version: serverObj.version,
                showServer: true,
                showUpdate: false
            })
        }
        localStorage.serversTmp = JSON.stringify(localServers);
    };

    servers.remove = function(id) {
        var localServers = JSON.parse(localStorage.getItem('serversTmp'));
        for (var i = 0; i < localServers.length; i += 1) {
            if (localServers[i].id == id) {
                localServers.splice(i, 1);
            }
        }
        localStorage.serversTmp = JSON.stringify(localServers);
    };

    servers.update = function(id, version) {
        var localServers = JSON.parse(localStorage.getItem('serversTmp'));
        for (var i = 0; i < localServers.length; i += 1) {
            if (localServers[i].id == id) {
                if (version) {
                    localServers[i].version = version;
                    localServers[i].showUpdate = false;
                } else {
                    if (localServers[i].showUpdate == false) {
                        localServers[i].showUpdate = true;
                    } else {
                        localServers[i].showUpdate = false;
                    }
                }
            }
        }
        localStorage.serversTmp = JSON.stringify(localServers);
    };

    servers.filter = function(version) {
        var localServers = JSON.parse(localStorage.getItem('serversTmp'));
        if (version) {
            for (var i = 0; i < localServers.length; i += 1) {
                if (localServers[i].version != version) {
                    localServers[i].showServer = false;
                } else {
                    localServers[i].showServer = true;
                }
            }
        } else {
            for (var i = 0; i < localServers.length; i += 1) {
                localServers[i].showServer = true;
            };
        }
        localStorage.serversTmp = JSON.stringify(localServers);
    };
    return servers;
});
// })();