app.controller("CISAccReportCntrl", function ($scope, $modal, DispCISCAccessTypeParam, glbProductID) {
    $(".pageLoaderOverlay").show();
    $scope.Product = glbProductID.getProductID();
    $scope.regName = DispCISCAccessTypeParam.getRegName();
    $scope.regID = DispCISCAccessTypeParam.getRegID();
    $scope.countryID = DispCISCAccessTypeParam.getCountryID();

    DispCISCAccessTypeParam.getCISAccessDet($scope.regID).success(function (data) {
        $scope.HeaderChar = data.d.AccessTypeHeader;
        $scope.countryCharAvail = data.d.charecteristics;
        $(".pageLoaderOverlay").hide();
    });
});



app.factory("DispCISCAccessTypeParam", function ($http) {

    var regName = '';
    var regID = '';
    var countryID = '';

    return {
        getRegName: function () {
            return regName;
        },

        setRegName: function (param) {
            regName = param;
        },

        getRegID: function () {
            return regID;
        },

        setRegID: function (param) {
            regID = param;
        },

        getCountryID: function () {
            return countryID;

        },

        setCountryID: function (param) {
            countryID = param;
        },

        getCISAccessDet: function (regID) {

            return $http.post('DispSubProduct.aspx/getCISAccessType', { 'regionID': regID })
        .success(function (data, status, headers, config) {

        })
        .error(function (error) {
            console.log("Problem occured while loading Country for CIS AccessDet; " + error);
            $(".pageLoaderOverlay").hide();
        });

        }
    }


})