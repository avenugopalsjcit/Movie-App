var app = angular.module("appModuleParts",[]);

app.controller("DispCPEPartscntrl", function ($scope,$sce,DispCPEParts) {


    $scope.bundleID = unescape(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + escape('bindleID').replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
    $scope.countryId = unescape(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + escape('countryid').replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
    $scope.isHVPN = unescape(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + escape('isHVPN').replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
    $scope.BundleName = unescape(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + escape('BundleName').replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));

    if ($scope.isHVPN === "" || $scope.isHVPN == undefined || $scope.isHVPN == null) {
        $scope.isHVPN = 1;
    }

    DispCPEParts.getCPEParts($scope.bundleID, $scope.countryId, $scope.isHVPN).success(function (data) {
        $scope.stdPartNameList = data.d.strPartNameList;
        $scope.stdPartList = data.d.stdPart;
        $scope.varPartList = data.d.varPart;
        $scope.OptPartList = data.d.lstOptPart;


    });

    $scope.to_trusted = function (val) {

        return $sce.trustAsHtml(val);
    };

});

app.factory("DispCPEPartsparam", function () {
    var bundleID = "";
    var countryID = "";

    return {
        getBundleID: function (param) {
            bundleID = param;
        },

        setBundleID: function () {
            return bundleID;
        },

        getCountryID: function (param) {
            countryID = param;
        },

        setCountryID: function () {
            return countryID;
        }
    }
});


app.factory("DispCPEParts", function ($http) {
    var DispCPEParts = {};
    $(".pageLoaderOverlay").show();
    DispCPEParts.getCPEParts = function (bundleID, countryID, isHVPN) {
   
    return $http.post('DispCPEParts.aspx/GetCPEPartsDetails', { "bundleID": bundleID, 'countryID': countryID, 'isHVPN': isHVPN })
        .success(function (data, status, headers, config) {
            $(".pageLoaderOverlay").hide();
        })
        .error(function (error) {
            console.log("Problem occured while loading CPE Parts; " + error);
            $(".pageLoaderOverlay").hide();
        });
       
    }
    return DispCPEParts;

});

