var myapp = angular.module("myapp", []);

myapp.controller("MyController", function ($scope, $http, GetCPEBundles, GetSupplier, GetCity, GetMainOption, GetCPELeadTime) {

    var productid = unescape(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + escape('productid').replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
    var countryid = unescape(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + escape('countryid').replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
    var cityid = unescape(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + escape('cityid').replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
    var regionid = unescape(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + escape('regionid').replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
    var caseID = unescape(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + escape('caseID').replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
    var hasAccSupp = unescape(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + escape('hasAccSupp').replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));

    //manufacturer and maintainer will be shown only for AMD
    if (productid == '128') {
        $scope.isAMD = "true";
    } else {
        $scope.isAMD = "false";
    }


    if (hasAccSupp === "" || hasAccSupp === undefined) {
        hasAccSupp = "0";
    }

    if (cityid == "" || cityid == undefined) {
        cityid = "0";
    }

    $('#mainrow').hide();
    $('#note').hide();

    $('#noSuppAlert').hide();
    $('#CPELaunchStatus').hide();


    $scope.hasSupplier = '0';
    $scope.prodCharList = '';
    $scope.hasBundle = "0";
    $scope.hasMaint = "0";
    $scope.hasBundleLaunchStat = "0";
    $scope.selectedCity = "";
    $scope.allCityChecked = "0";

    if (caseID === undefined || caseID === '' || caseID === null || caseID=="0") {
        console.log("case id is not valid");
        $(".pageLoaderOverlay").hide();
        $('#noSuppAlert').show();
        $('#panelCPELeadTime').hide();
        $(".pageLoaderOverlay").hide();
        $("#ddlSupplier").prop("disabled", true);
        $("#ddlSuppCity").prop("disabled", true);
        $('#tblBundle').hide();
        $('div.noDataBndle').show();
        return;
    }

    GetCPEBundles.getProdChar(caseID).success(function (data) {
        if (data.d != null && data.d.length != 0) {
            $scope.prodCharList = data.d;

            $scope.prodCharList.forEach(function (item) {
                if (item.Item1.toUpperCase() === "CPE PRODUCT BUNDLES") {
                    $scope.hasBundle = "1";
                }

                if (item.Item1.toUpperCase() === "CPE MAINTENANCE OPTIONS") {
                    $scope.hasMaint = "1";
                }

                if (item.Item2.toUpperCase() === "CPE BUNDLES") {
                    $scope.hasBundleLaunchStat = "1";
                }
            });

            if ($scope.hasBundleLaunchStat == "1") {
                GetCPELeadTime.getCPELaunchStatus(countryid).success(function (data) {
                    if (data.d != null && data.d.length != 0) {
                        $scope.CPELaunchAvailability = data.d;
                        $('#CPELaunchStatus').show();
                    }
                });
            }


            if ($scope.hasBundle == "1") {
                //getBundle
                GetCPEBundles.CPEbndls(productid, countryid).success(function (data) {
                    if (data.d.length == 0) {
                        $('#tblBundle').hide();
                        $('div.noDataBndle').show();
                    } else {
                        $scope.bundleDet = data.d;
                        $('#tblBundle').show();
                        $('div.noDataBndle').hide();
                    }

                });

            } else {
                $('#panelBundle').hide();
                $(".pageLoaderOverlay").hide();
            }

            if ($scope.hasMaint == "1") {
                //getSupplier, if no city(for country level product) then supplier will come as empty
                (function () {

                    if (productid == 79 || productid == 108) {
                        GetCPELeadTime.getOneVoiceSupplier(countryid).success(function (data) {
                            $scope.CpeSupplierData = data.d;
                            if (data.d != null && data.d.length != 0) {

                                data.d.forEach(function (item) {
                                    if (item.supplierID == "5847") {
                                        $scope.cpesuppliers = item.supplierID;
                                    } else {
                                        $scope.cpesuppliers = item.supplierID;
                                    }
                                });

                                $scope.getCity();
                                $scope.getCPELeadTime();
                            } else {
                                
                                GetMainOption.getMaintSupplier(countryid, hasAccSupp).success(function (data) {
                                    $scope.CpeSupplierData = data.d;
                                    $scope.cpesuppliers = data.d[0].supplierID;

                                    if (data.d == null || data.d[0].supplierID == "" || data.d[0].supplierName == "" || data.d.length == 0) {
                                        $('#noSuppAlert').show();
                                        $('#panelCPELeadTime').hide();
                                        $(".pageLoaderOverlay").hide();
                                        $("#ddlSupplier").prop("disabled", true);
                                        $("#ddlSuppCity").prop("disabled", true);
                                        return;
                                    }
                                    $scope.hasSupplier = '1';
                                    $scope.getCity();
                                    $scope.getCPELeadTime();
                                });

                            }
                        });

                    } else {

                        GetSupplier.supplier(productid, countryid, cityid).success(function (data) {
                            $scope.CpeSupplierData = data.d;
                            if (data.d != null && data.d.length != 0) {
                                //prefered SSP supplier should be preselected
                                data.d.forEach(function (item) {
                                    if (item.supplierType === "Preferred SSP") {
                                        $scope.cpesuppliers = item.supplierID;
                                    }
                                });

                                if ($scope.cpesuppliers == null || $scope.cpesuppliers == undefined) {
                                    $scope.cpesuppliers = data.d[0].supplierID;
                                }
                                //end
                                //to populate maintanance city

                                $scope.getCity();
                                $scope.getCPELeadTime();

                            } else {

                                GetMainOption.getMaintSupplier(countryid, hasAccSupp).success(function (data) {
                                    $scope.CpeSupplierData = data.d;
                                    $scope.cpesuppliers = data.d[0].supplierID;

                                    if (data.d == null || data.d[0].supplierID == "" || data.d[0].supplierName == "" || data.d.length == 0) {
                                        $('#noSuppAlert').show();
                                        $('#panelCPELeadTime').hide();
                                        $(".pageLoaderOverlay").hide();
                                        $("#ddlSupplier").prop("disabled", true);
                                        $("#ddlSuppCity").prop("disabled", true);
                                        return;
                                    }
                                    $scope.hasSupplier = '1';
                                    $scope.getCity();
                                    $scope.getCPELeadTime();
                                });
                            }



                        });
                    }
                })();
            } else {
                $('#maintOption').hide();
                $('#panelCPELeadTime').hide();
                $(".pageLoaderOverlay").hide();
            }
        } else {
            alert("No product charecteristics available");
            $(".pageLoaderOverlay").hide();
            $('#noSuppAlert').show();
            $('#panelCPELeadTime').hide();
            $(".pageLoaderOverlay").hide();
            $("#ddlSupplier").prop("disabled", true);
            $("#ddlSuppCity").prop("disabled", true);
            $('#tblBundle').hide();
            $('div.noDataBndle').show();
            return;
         }
      
    });

    $scope.getCity = function () {
        //for country level product no city will be selected, in that case city should be fetched based on region and country
        if (cityid === null || cityid === undefined || cityid === "" || cityid === "0") {
            $http.post('BTOneVoice.aspx/GeteCityID', { 'countryId': countryid, 'regionID': regionid })
                .success(function (data, status, headers, config) {
                    cityid = data.d;
                    $scope.getMaintCity();
                });

        }
        else {
            $scope.getMaintCity();
        }
    }

    //to open part popup
    $scope.openPartPopup = function (bindleID, BundleName) {

        var url = "DispCPEParts.htm";
        var q1 = "?bindleID=" + bindleID;
        var q2 = "&countryid=" + countryid;
        var q3 = "&isHVPN=0";
        var q4 = "&BundleName=" + BundleName;

        url = url + q1 + q2 + q3 + q4;
        window.open(url, "_blank", "toolbar=yes, scrollbars=yes, width=1000, resizable=yes");
        //var iframehtml = '<iframe border=0 width="100%" height ="500px" frameborder="0" src="' + url + '"> </iframe>'
        //        $("div.CPEPartInfo").html(iframehtml);

    }

    //this function will get city for maintainance option
    $scope.getMaintCity = function () {
        if ($scope.cpesuppliers == undefined || $scope.cpesuppliers == null || $scope.cpesuppliers == "") {
            $('#panelCPELeadTime').hide();
            $(".pageLoaderOverlay").hide();
        } else {

            GetCity.GetCityList($scope.cpesuppliers, countryid, cityid).success(function (data) {
                $scope.CpeCityList = data.d;
                $scope.suppliercity = cityid;
                getMaintDetails();
            });

        }
    }

    //get maintance option
    getMaintDetails = function () {
        GetMainOption.GetMaint(productid, $scope.cpesuppliers, countryid, $scope.suppliercity).success(function (data) {
            if (data.d.length == 0) {
                $('#mainrow').hide();
                $('#note').show();
                $("#CPEMaintenanceMsg").show();
                //if no maintainance after all city then set dropdown to previous one
                if ($scope.selectedCity === "" && $scope.allCityChecked == "1") {
                    $scope.suppliercity = cityid;
                }


                //condition applied when no city has been selected from dropdown
                //if no maintainance option available for that city then all we will go for all city
                //if all city also does not have data then we should not go for further check, so allCityChecked flag has been introduced
                if ($scope.selectedCity === "" && $scope.allCityChecked === "0") {
                    $scope.allCityChecked = "1";
                    $scope.CpeCityList.forEach(function (item) {
                        if (item.Item2.toUpperCase() == "ALL CITIES") {
                            $scope.suppliercity = item.Item1;
                            getMaintDetails();
                        }
                    });
                } else { $(".pageLoaderOverlay").hide(); }

            }
            else {
                $('#note').hide();
                $('#mainrow').show();
                $scope.mainOptList = data.d;

                    $("#CPEMaintenanceMsg").hide();
                $(".pageLoaderOverlay").hide();
            }
        });
    }

    $scope.getCPELeadTime = function () {
        if ($scope.cpesuppliers == undefined || $scope.cpesuppliers == null || $scope.cpesuppliers == "") {
            $('#panelCPELeadTime').hide();
        } else {

            GetCPELeadTime.CPELeadtime($scope.cpesuppliers, countryid, productid).success(function (data) {

                var cpeLeadTimeList = [];
                var cpeLeadTime = '';
                var CPELeadTimeStatus = '';

                if (data.d.length != 0) {
                    data.d.forEach(function (item) {
                        if (item.CPELeadTime != null || item.CPELeadTimeStatus != null) {
                            cpeLeadTime = item.CPELeadTime;
                            CPELeadTimeStatus = item.CPELeadTimeStatus;
                        }
                        else if (item.CPECeaseLeadTime != null || item.CPECeaseLeadTimeStatus != null) {
                            cpeLeadTime = item.CPECeaseLeadTime;
                            CPELeadTimeStatus = item.CPECeaseLeadTimeStatus;
                        }
                        cpeLeadTimeList.push({ transactionType: item.transactionType, CPELeadTime: cpeLeadTime, CPELeadTimeStatus: CPELeadTimeStatus });
                    });
                    $scope.CPELeadtimelist = cpeLeadTimeList;
                } else {
                    $('#panelCPELeadTime').hide();
                }

            });

        }

    }

    $scope.getCityInfo = function () {
        if ($scope.cpesuppliers != null) {
            GetCity.GetCityList($scope.cpesuppliers, countryid, cityid).success(function (data) {

                $scope.CpeCityList = data.d;
                getMaintDetails();
            });

            $scope.getCPELeadTime();
        }
    }

    //will be called on change of city dropdown
    $scope.getMaintainanceDetails = function () {

        aaa = $scope.cpesuppliers;
        $scope.selectedCity = $scope.suppliercity;
        if ($scope.hasSupplier == '1' && (productid != "79" || productid != "108")) {
            debugger
            GetSupplier.supplier(productid, countryid, $scope.selectedCity).success(function (data) {
                $scope.CpeSupplierData = data.d;
                if (data.d != null && data.d.length != 0) {
                    //prefered SSP supplier should be preselected
                    data.d.forEach(function (item) {
                        if (item.supplierType === "Preferred SSP") {
                            $scope.cpesuppliers = item.supplierID;
                        }
                        $scope.hasSupplier == '0'
                    });
                    //end
                    //to populate maintanance city
                    getMaintDetails();
                } else {

                    GetMainOption.getMaintSupplier(countryid, hasAccSupp).success(function (data) {
                        $scope.CpeSupplierData = data.d;
                        $scope.cpesuppliers = data.d[0].supplierID;

                        if (data.d == null || data.d[0].supplierID == "" || data.d[0].supplierName == "" || data.d.length == 0) {
                            $('#noSuppAlert').show();
                            $('#panelCPELeadTime').hide();
                            $(".pageLoaderOverlay").hide();
                            $("#ddlSupplier").prop("disabled", true);
                            $("#ddlSuppCity").prop("disabled", true);
                            return;
                        }
                        getMaintDetails();
                    });
                }
            });
        } else {
            debugger
            getMaintDetails();
        }


    }



}).config(function ($httpProvider) {

    $httpProvider.defaults.headers.post = {};

    $httpProvider.defaults.headers.post["Content-Type"] = "application/json; charset=utf-8";

});


myapp.factory("GetCPEBundles", function ($http) {
    var GetCPEBundles = {};
    GetCPEBundles.CPEbndls = function (productid, countryId) {
        $(".pageLoaderOverlay").show();
        return $http.post('CPEBundleDetails.aspx/GetBundleDetails', { 'productID': productid, 'CountryID': countryId })
        .success(function (data, status, headers, config) {

            //   $(".pageLoaderOverlay").hide();
        })
        .error(function (error) {
            console.log("Problem occured while loading bundle; " + error);
            $(".pageLoaderOverlay").hide();
        });

    },

     GetCPEBundles.getProdChar = function (caseID) {
         $(".pageLoaderOverlay").show();
         return $http.post('CPEBundleDetails.aspx/getProductCharecteristics', { 'caseID': caseID })
        .success(function (data, status, headers, config) {
            //  $(".pageLoaderOverlay").hide();
        })
        .error(function (error) {
            console.log("Problem occured while loading product charecteristics; " + error);
            $(".pageLoaderOverlay").hide();
        });
     }

    return GetCPEBundles;
});

myapp.factory("GetSupplier", function ($http) {
    var GetSupplier = {};
    GetSupplier.supplier = function (productid, countryId, cityid) {
        $(".pageLoaderOverlay").show();
        return $http.post('CPEBundleDetails.aspx/GetCPESuppliers', { 'productID': productid, 'CountryID': countryId, 'CityID': cityid })
        .success(function (data, status, headers, config) {
            //  $(".pageLoaderOverlay").hide();

        })
        .error(function (error) {
            console.log("Problem occured while loading supplier; " + error);
            $(".pageLoaderOverlay").hide();
        });
    }
    return GetSupplier;
});


myapp.factory("GetCity", function ($http) {
    var GetCity = {};
    $(".pageLoaderOverlay").show();
    GetCity.GetCityList = function (supplierid, countryId, cityid) {
        return $http.post('CPEBundleDetails.aspx/GetCityList', { 'supplierID': supplierid, 'CountryID': countryId, 'CityID': cityid })
        .success(function (data, status, headers, config) {
            //  $(".pageLoaderOverlay").hide();

        })
        .error(function (error) {
            console.log("Problem occured while loading city; " + error);
            $(".pageLoaderOverlay").hide();
        });
    }
    return GetCity;
});

myapp.factory("GetMainOption", function ($http) {
    var GetMainOption = {};
    GetMainOption.GetMaint = function (productid, supplierid, countryId, cityid) {
        $(".pageLoaderOverlay").show();
        return $http.post('CPEBundleDetails.aspx/getCPEMaintainanceDetails', { 'productID': productid, 'supplierID': supplierid, 'CountryID': countryId, 'cityID': cityid })
        .success(function (data, status, headers, config) {

            // $(".pageLoaderOverlay").hide();
        })
        .error(function (error) {
            console.log("Problem occured while loading mainutenance; " + error);
            $(".pageLoaderOverlay").hide();
        });

    },

    GetMainOption.getMaintSupplier = function (countryID, hasAccSupp) {
        $(".pageLoaderOverlay").show();
        return $http.post('CPEBundleDetails.aspx/getMaintSupplier', { 'countryID': countryID, 'hasAccSupp': hasAccSupp })
        .success(function (data, status, headers, config) {

            //  $(".pageLoaderOverlay").hide();
        })
        .error(function (error) {
            console.log("Problem occured while loading maintenance supp; " + error);
            $(".pageLoaderOverlay").hide();
        });
    }
    return GetMainOption;
});

myapp.factory("GetCPELeadTime", function ($http) {
    var GetCPELeadTime = {};
    GetCPELeadTime.CPELeadtime = function (supplierid, countryId, productid) {
        $(".pageLoaderOverlay").show();
        return $http.post('CPEBundleDetails.aspx/getCPELeadTime', { 'supplierID': supplierid, 'CountryID': countryId, "productId": productid })
        .success(function (data, status, headers, config) {
            //  $(".pageLoaderOverlay").hide();

        })
        .error(function (error) {
            $(".pageLoaderOverlay").hide();
            console.log("Problem occured while loading cpe lead time; " + error);
        });
    },

    GetCPELeadTime.getCPELaunchStatus = function (countryID) {
        $(".pageLoaderOverlay").show();
        return $http.post('CPEBundleDetails.aspx/getCPELaunchStatus', { 'countryID': countryID })
        .success(function (data, status, headers, config) {
            // $(".pageLoaderOverlay").hide();
        })
        .error(function (error) {
            $(".pageLoaderOverlay").hide();
            console.log("error in GetProductLavel" + error);
        });

    },

   GetCPELeadTime.getOneVoiceSupplier = function (countryID) {
       $(".pageLoaderOverlay").show();
       return $http.post('CPEBundleDetails.aspx/getOneVoiceSupplier', { 'countryID': countryID })
        .success(function (data, status, headers, config) {
            //  $(".pageLoaderOverlay").hide();
        })
        .error(function (error) {
            $(".pageLoaderOverlay").hide();
            console.log("error in GetProductLavel" + error);
        });
   }
    return GetCPELeadTime;
});
     