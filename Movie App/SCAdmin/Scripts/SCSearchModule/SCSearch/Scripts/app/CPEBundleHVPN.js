var hvpnapp = angular.module("hvpnbndlapp", []);


hvpnapp.controller("HVPNBundleCntrl", function ($scope, HVPNBnldFctry) {

    var productid = unescape(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + escape('productid').replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
    var countryid = unescape(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + escape('countryid').replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
    $(".pageLoaderOverlay").show();
    HVPNBnldFctry.getBundleDet(countryid, productid).success(function (data) {
        if (data.d != null && data.d.length != 0) {
            $scope.BundleProductsData = data.d;
            $("#HVPNBundle").show();
            $("#noHVPNBndle").hide();

        } else {
            $(".noHVPNBndle").show();
            $("#HVPNBundle").hide();
        }

        $(".pageLoaderOverlay").hide();
    })
    .error(function (error) {
        console.log("Problem occured while loading bundle; " + error);
        $(".pageLoaderOverlay").hide();
    });

    //siba start for CPE parts links

    $scope.openCPEPartsPOPup = function (bundleID, BundleName) {

        var url = "../DispCPEParts.htm";
        var q1 = "?bindleID=" + bundleID;
        var q2 = "&countryid=" + countryid;
        var q3 = "&BundleName=" + BundleName;
        url = url + q1 + q2 + q3;
        window.open(url, "_blank", "toolbar=yes, scrollbars=yes,width=1000, resizable=yes");
        //        var iframehtml = '<iframe border=0 width="100%" height ="500px" frameborder="0" src="' + url + '"> </iframe>'
        //        $("div.CPEPartInfo").html(iframehtml);

    }


});

hvpnapp.factory("HVPNBnldFctry", function ($http) {
    var HVPNBnldFctry = {};
   
    HVPNBnldFctry.getBundleDet = function (CountryID, ProductID) {
        return $http.post('../Search.aspx/GetBundleProducts', { 'CountryID': CountryID, 'ProductID': ProductID });
    }
    return HVPNBnldFctry;
});