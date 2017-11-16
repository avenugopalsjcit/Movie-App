app.controller("CISReportCntrl", function ($scope, $modal, $http, glbProductID, CISReport, DispCISCAccessTypeParam) {
    $scope.Product = glbProductID.getProductID();


    $scope.getRegionList = function () {

        if ($scope.CountryList == undefined || $scope.CountryList == null) {

            $(".pageLoaderOverlay").show();
            CISReport.getCISReport($scope.Product).success(function (data) {

                if (data.d.length == 0) {
                    $("#regList").hide();
                    $(".pageLoaderOverlay").hide();
                } else {
                    $scope.CountryList = data.d;
                    $("#regList").show();
                    $(".pageLoaderOverlay").hide();
                }
            });
        }
    }

    $scope.openCISAccessReport = function (regID, regName, countryId) {

        DispCISCAccessTypeParam.setRegName(regName);
        DispCISCAccessTypeParam.setRegID(regID);
        DispCISCAccessTypeParam.setCountryID(countryId);

        $modal.open({
            templateUrl: 'Search/DispCISCAccessType.htm',
            controller: 'CISAccReportCntrl'
        });
    }

});

app.factory("CISReport", function ($http) {
    var CISReport = {};

    CISReport.getCISReport = function (prodID) {
        return $http.post('DispSubProduct.aspx/getCISReport', { 'prodId': prodID })
        .success(function (data, status, headers, config) {

        })
        .error(function (error) {
            console.log("Problem occured while loading Country for CIS report; " + error);
            $(".pageLoaderOverlay").hide();
        });
    }

    return CISReport;
});



