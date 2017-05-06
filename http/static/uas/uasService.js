﻿angular.module('webtools').service('uasService', ['$http', 'uasModel', 'webtoolsModel', function ($http, uasModel, webtoolsModel) {

    this.getInstalled = function (callback) {
        webtoolsModel.uasLoading = true;
        var url = webtoolsModel.apiV3Url + "/git/list";
        $http({
            method: "GET",
            url: url,
        }).then(function (resp) {
            uasModel.installedList = resp.data;
            for (installedItem in uasModel.installedList) {
                if (!uasModel.list[installedItem]) {
                    console.log("Item doesn't exist!");
                    continue;
                }
                uasModel.list[installedItem].installed = true;
            }

            if (callback) callback(resp.data);
            webtoolsModel.uasLoading = false;
        }, function (errorResp) {
            webtoolsService.log("uasService.getInstalled - " + webtoolsService.formatError(errorResp), "Uas", true, url);
            webtoolsModel.uasLoading = false;
        });
    }
    
    this.getReleaseInfo = function (escapedUrl, callback) {
        webtoolsModel.uasLoading = true;
        var url = webtoolsModel.apiV3Url + "/git/getReleaseInfo/" + escapedUrl + "/version/[latest, all]";
        $http({
            method: "GET",
            url: url,
        }).then(function (resp) {
            debugger;
            if (callback) callback(resp.data);
            webtoolsModel.uasLoading = false;
        }, function (errorResp) {
            webtoolsService.log("uasService.getReleaseInfo - " + webtoolsService.formatError(errorResp), "Uas", true, url);
            webtoolsModel.uasLoading = false;
        });
    }

    this.getTypes = function (callback) {
        webtoolsModel.uasLoading = true;
        var url = webtoolsModel.apiV3Url + "/git/uasTypes/";
        $http({
            method: "GET",
            url: url,
        }).then(function (resp) {
            uasModel.types = resp.data;
            for (typeName in uasModel.types) {
                var type = uasModel.types[typeName];
                type.viewInstalled = type.installed;
                type.viewTotal = type.total;
            }
            if (callback) callback(resp.data);
            webtoolsModel.uasLoading = false;
        }, function (errorResp) {
            webtoolsService.log("uasService.getTypes - " + webtoolsService.formatError(errorResp), "Uas", true, url);
            webtoolsModel.uasLoading = false;
        });
    }

    this.getListBundle = function (callback) {
        webtoolsModel.uasLoading = true;
        var url = webtoolsModel.apiV3Url + "/git/getListofBundles";
        $http({
            method: "GET",
            url: url,
        }).then(function (resp) {
            uasModel.list = resp.data;
            if (callback) callback(resp.data);
            webtoolsModel.uasLoading = false;
        }, function (errorResp) {
            webtoolsService.log("uasService.getListBundle - " + webtoolsService.formatError(errorResp), "Uas", true, url);
            webtoolsModel.uasLoading = false;
        });
    }

    this.getLastUpdateTime = function (escapedUrl, callback) {
        webtoolsModel.uasLoading = true;
        var url = webtoolsModel.apiV3Url + "/git/getLastUpdateTime/" + escapedUrl;
        $http({
            method: "GET",
            url: url,
        }).then(function (resp) {
            debugger;
            if (callback) callback(resp.data);
            webtoolsModel.uasLoading = false;
        }, function (errorResp) {
            webtoolsService.log("uasService.getLastUpdateTime - " + webtoolsService.formatError(errorResp), "Uas", true, url);
            webtoolsModel.uasLoading = false;
        });
    }

    this.getUpdateList = function (callback) {
        webtoolsModel.uasLoading = true;
        var url = webtoolsModel.apiV3Url + "/git/getUpdateList";
        $http({
            method: "GET",
            url: url,
        }).then(function (resp) {
            debugger;
            if (callback) callback(resp.data);
            webtoolsModel.uasLoading = false;
        }, function (errorResp) {
            webtoolsService.log("uasService.getUpdateList - " + webtoolsService.formatError(errorResp), "Uas", true, url);
            webtoolsModel.uasLoading = false;
        });
    }

    this.updateUASCache = function (force, callback) {
        if(!force) force = ""; else force = "/force";
        webtoolsModel.uasLoading = true;
        var url = webtoolsModel.apiV3Url + "/git/updateUASCache" + force;
        $http({
            method: "POST",
            url: url,
        }).then(function (resp) {
            debugger;
            if (callback) callback(resp.data);
            webtoolsModel.uasLoading = false;
        }, function (errorResp) {
            webtoolsService.log("uasService.updateUASCache - " + webtoolsService.formatError(errorResp), "Uas", true, url);
            webtoolsModel.uasLoading = false;
        });
    }

    this.getThumb = function (thumbName, callback) {
        webtoolsModel.uasLoading = true;
        var url = webtoolsModel.apiV3Url + "/uas/Resources/" + thumbName;
        $http({
            method: "GET",
            url: url,
        }).then(function (resp) {
            debugger;
            if (callback) callback(resp.data);
            webtoolsModel.uasLoading = false;
        }, function (errorResp) {
            webtoolsService.log("uasService.getThumb - " + webtoolsService.formatError(errorResp), "Uas", true, url);
            webtoolsModel.uasLoading = false;
        });
    }

    this.migrate = function (callback) {
        webtoolsModel.uasLoading = true;
        var url = webtoolsModel.apiV3Url + "/git/migrate";
        $http({
            method: "PUT",
            url: url,
        }).then(function (resp) {
            debugger;
            if (callback) callback(resp.data);
            webtoolsModel.uasLoading = false;
        }, function (errorResp) {
            webtoolsService.log("uasService.migrate - " + webtoolsService.formatError(errorResp), "Uas", true, url);
            webtoolsModel.uasLoading = false;
        });
    }

    this.installUpdate = function (repoUrl, callback) {
        webtoolsModel.uasLoading = true;
        var url = webtoolsModel.apiV3Url + "/git/install";
        $http({
            method: "PUT",
            url: url,
            data: {
                url: repoUrl
            }
        }).then(function (resp) {
            debugger;
            if (callback) callback(resp.data);
            webtoolsModel.uasLoading = false;
        }, function (errorResp) {
            webtoolsService.log("uasService.installUpdate - " + webtoolsService.formatError(errorResp), "Uas", true, url);
            webtoolsModel.uasLoading = false;
        });
    }

    this.WTUpgrade = function (callback) {
        webtoolsModel.uasLoading = true;
        var url = webtoolsModel.apiV3Url + "/git/upgradeWT";
        $http({
            method: "PUT",
            url: url,
        }).then(function (resp) {
            debugger;
            if (callback) callback(resp.data);
            webtoolsModel.uasLoading = false;
        }, function (errorResp) {
            webtoolsService.log("uasService.WTUpgrade - " + webtoolsService.formatError(errorResp), "Uas", true, url);
            webtoolsModel.uasLoading = false;
        });
    }
}]);