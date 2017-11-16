app.controller("LeveltowProductCntrl", function ($scope, $http,$rootScope,$location, GetLevetowProductDetails, UserInfofactory, glbProductID, glbRegionID, glbCountryID, glbStateID, glbCityID, glbPOPID, ParentAccessSupplier, SubChildProdPortSpeed, GetDoclinksFactory, GetCPEBundles, GetSupplier, GetCity, GetMainOption, GetCPELeadTime) {

    $scope.Product = glbProductID.getProductID();
    $scope.Region = glbRegionID.getRegionID();
    $scope.Country = glbCountryID.getCountryID();
    $scope.State = glbStateID.getStateID();
    $scope.City = glbCityID.getCityID();
    $scope.POP = glbPOPID.getPOPID();
    $scope.ChildAccessSupplier = -1;
    $scope.ParentAccessSupplier = -1;

    var capmanPlatform = "-1";
    var ProductLevelCD = "";
    var stateFlag = 0;
    var DisplaySearch = 1;
    $scope.CaseID = "";
    var ParentProductID = "";
    $('prodChar').hide();
    $("#showTargetAvailDate").hide();

    $('#mainrow').hide();
    $('#note').hide();
    $('#maintenanceoptionMsg').hide();
    $('#tblBundle').hide();
    $('#noSuppAlert').hide();
    $('#CPELaunchStatus').hide();

    $scope.hasSupplier = '0';

    $scope.prodCharList = '';
    $scope.hasBundle = "0";
    $scope.hasMaint = "0";
    $scope.hasBundleLaunchStat = "0";
    $scope.selectedCity = "";
    $scope.allCityChecked = "0";


    var productid = $scope.Product;
    var countryid = $scope.Country;

    var hasAccSupp = 0;

    var cityid = $scope.City;
    var regionid = $scope.Region;
    var hasAccSup = 0;

    $scope.showTargetAvailDate = "0";
    $(".pageLoaderOverlay").show();
    if (angular.isUndefined($scope.State) || $scope.State == '') {
        $scope.State = 0; stateFlag = 0
    } else { stateFlag = 1; }


    if (angular.isUndefined($scope.POP) || $scope.POP == '') {
        $scope.POP = 0;
    }

    if ($scope.modcountry != undefined && $scope.modcountry != '') {
        $(".pageLoaderOverlay").show();
        GetLevetowProductDetails.getProductLevel($scope.Product).success(function (data) {

            ProductLevelCD = data.d.ProdLocationLvl;
            //  debugger

            if ($scope.City === undefined) { $scope.City = 0; }
            //get product details
            GetLevetowProductDetails.getProdAvail(ProductLevelCD,
                            capmanPlatform,
                            stateFlag,
                            $scope.Product,
                            $scope.Region,
                            $scope.Country,
                            $scope.State,
                            $scope.City,
                            $scope.POP,
                            DisplaySearch).success(function (data) {
                                //debugger
                                $scope.ProductName = data.d.ProdName;
                                $scope.ServiceAvail = data.d.ServiceAvailable;
                                $scope.POPCode = data.d.PopCode;
                                $scope.POPColor = data.d.PopColor;
                                $scope.NetworkName = data.d.NetworkName;
                                $scope.SupportRes = data.d.ResilientPop;
                                $scope.CaseID = data.d.CaseID;
                                ParentProductID = data.d.ParentProductID;
                                capmanPlatform = data.d.CapmanPlatformID;

                                if (data.d.CaseID == 0 || data.d.CaseID == "" || data.d.CaseID == null || angular.isUndefined(data.d.CaseID)) {
                                    alert("No Cases record found! Please contact the Sales Catalogue Administrator");
                                    $location.path('/');
                                    $(".pageLoaderOverlay").hide();
                                    return;
                                } else if ($rootScope.segmentCount == 0) {
                                    alert("No Cases record found! Please contact the Sales Catalogue Administrator");
                                    $location.path('/');
                                    $(".pageLoaderOverlay").hide();
                                    return;
                                }

                                if (data.d.TargetAvailabilityDate !== "") {


                                    $scope.targetAvailDate = data.d.TargetAvailabilityDate;
                                    $("#showTargetAvailDate").show();
                                }
                                else {
                                    $("#showTargetAvailDate").hide();
                                }



                                GetLevetowProductDetails.getCharecteristics($scope.CaseID, $scope.Product).success(function (data) {
                                    if (data.d.length != 0) {

                                        $(".prodChar").show();
                                        $scope.tblcharslist = data.d;
                                        $scope.prodChar = data.d;


                                    }
                                    else {

                                        $(".prodChar").hide();
                                    }
                                }).error(function (error) { console.log("charecteristics loading failed"); })

                                //    openCpeInformationpopup();



                                var caseID = $scope.CaseID;


                                if (productid == '128') {
                                    $scope.isAMD = "true";
                                } else {
                                    $scope.isAMD = "false";
                                }


                                if (cityid == "" || cityid == undefined) {
                                    cityid = "0";
                                }
                                GetCPEBundles.getProdChar(caseID).success(function (data) {

                                    if (data.d != null && data.d.length != 0) {

                                        data.d.forEach(function (item) {
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
                                        } else {
                                            $('#CPELaunchStatus').hide();
                                        }


                                        if ($scope.hasBundle == "0" && $scope.hasMaint == "0" && $scope.hasBundleLaunchStat == "0") {
                                            $(".pageLoaderOverlay").hide();
                                            $('#CPEPanel').hide();

                                        }

                                        if ($scope.hasBundle == "1") {
                                            //getBundle
                                            GetCPEBundles.CPEbndls(productid, countryid).success(function (data) {
                                                if (data.d.length == 0) {
                                                    $('#tblBundle').hide();
                                                    //$('div.noDataBndle').show();
                                                } else {
                                                    $scope.bundleDet = data.d;
                                                    $('#tblBundle').show();
                                                    $('div.noDataBndle').hide();
                                                }

                                            });

                                        }

                                        if ($scope.hasMaint == "1") {
                                            //getSupplier, if no city(for country level product) then supplier will come as empty
                                            (function () {

                                                if (productid == 79 || productid == 108) {
                                                    GetCPELeadTime.getOneVoiceSupplier(countryid).success(function (data) {
                                                        $scope.CpeSupplierData = data.d;

                                                        data.d.forEach(function (item) {
                                                            if (item.supplierID == "5847") {
                                                                $scope.cpesuppliers = item.supplierID;
                                                            } else {
                                                                $scope.cpesuppliers = item.supplierID;
                                                            }
                                                        });

                                                        $scope.getCity();
                                                        $scope.getCPELeadTime();
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

                                                            GetMainOption.getMaintSupplier(countryid, hasAccSup).success(function (data) {
                                                                $scope.cpesuppliers = data.d[0].supplierID;
                                                                $scope.CpeSupplierData = data.d;
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
                                        }
                                    } else {
                                        $('#maintOption').hide();
                                        $('#panelCPELeadTime').hide();
                                        $(".pageLoaderOverlay").hide();
                                    }
                                });

                                UserInfofactory.GetUserInfo($scope.CaseID, 'CSU_CASE_DETAILS').success(function (data) {




                                    $("#divUserInfo").show();
                                    $scope.CreatedBy = data.d.CreatedBy;
                                    $scope.CreatedDate = data.d.CreatedDate;
                                    $scope.UpdatedBy = data.d.UpdatedBy;
                                    $scope.UpdatedDate = data.d.UpdatedDate;
                                }).error(function (error) { console.log("userinfo loading failed"); });

                            });


            GetDoclinksFactory.getDoc(glbProductID.getProductID()).success(function (data) {

                if (data.d.length == 0) {
                    $scope.ShowLevelTwoProductDocLinks = 0;
                }
                else {
                    $scope.ShowLevelTwoProductDocLinks = 1;

                    $scope.DocumentslinksData = [];
                    ProductsDocLinks = [];

                    data.d.forEach(function (item) {

                        ProductsDocLinks.push({ DocumentTitle: item.DocumentTitle, DocumentUrl: item.DocumentUrl });

                    });

                    $scope.DocumentslinksData = ProductsDocLinks;
                }

            });




        });
    }



    openCpeInformationpopup = function () {


        var url = "CPEBundleDetails.aspx";
        var q1 = "?productid=" + $scope.modproduct;
        var q2 = "&countryid=" + $scope.modcountry;
        var q3 = "&cityid=" + $scope.City;
        var q4 = "&regionid=" + $scope.modregion;
        var q5 = "&caseID=" + $scope.CaseID;

        url = url + q1 + q2 + q3 + q4 + q5;

        var iframehtml = '<iframe border=0 width="100%"   frameborder="0" src="' + url + '"> </iframe>'
        //console.log(iframehtml);
        $("div.CPEInformation").html(iframehtml);


    }

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
        if ($scope.cpesuppliers == undefined || $scope.cpesuppliers == null) {
            $("#maintOption").hide();
            $("#panelCPELeadTime").hide();
            $(".pageLoaderOverlay").hide();
            return;
        } else {
            GetCity.GetCityList($scope.cpesuppliers, countryid, cityid).success(function (data) {
                $scope.CpeCityList = data.d;
                $scope.suppliercity = cityid.toString();
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
                $('#maintenanceoptionMsg').show();
                //if no maintainance after all city then set dropdown to previous one
                if ($scope.selectedCity === "" && $scope.allCityChecked == "1") {
                    $scope.suppliercity = cityid.toString();
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
                $('#maintenanceoptionMsg').hide();
                $('#mainrow').show();
                $scope.mainOptList = data.d;
                $(".pageLoaderOverlay").hide();
            }
        });
    }

    $scope.getCPELeadTime = function () {
        if ($scope.cpesuppliers == undefined || $scope.cpesuppliers == null) {
            $("#panelCPELeadTime").hide();
            $(".pageLoaderOverlay").hide();
            return;
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
                    $("#panelCPELeadTime").hide();
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



    $scope.GetsubProdParentPort = function () {
        var SelectedPortSpeedData = '';

        if (angular.isUndefined($scope.PSubProdAccessSupplier) || $scope.PSubProdAccessSupplier == '' || $scope.PSubProdAccessSupplier == null) {
            $scope.PSubProdAccessSupplier = -1;
        }

        if (angular.isUndefined($scope.subProdParentPort) || $scope.subProdParentPort == '') {
            SelectedPortSpeedData = $scope.defaultPortSpeed;
        }
        else {
            SelectedPortSpeedData = $scope.subProdParentPort.join();
        }
        // debugger
        SubChildProdPortSpeed.ParentPortSpeedGrid(CaseID, $scope.PSubProdAccessSupplier, $scope.Product, 0, SelectedPortSpeedData, ParentProductID)
               .success(function (data) {

                   $scope.subProdParentPortSpeedGridData = data.d;
               })
    }

    $scope.GetCPortSpeeds = function () { }


    GetLevetowProductDetails.getPopChar($scope.POP, $scope.Product, DisplaySearch).success(function (data) {
        var popCharsResult = [];
        if (data.d.length != 0) {

            $scope.PopCharList = data.d;
        }
    }).error(function (error) { console.log("pop loading failed"); })



    ///////////////////




    /////////////////





});


app.factory("GetLevetowProductDetails", function ($http) {
    var GetLevetowProductDetails = {};
    GetLevetowProductDetails.getProdAvail = function (ProdLocLevel, CapmanPlatform, StateFlag, ProductID, RegionID, CountryID, StateID, CityID, HubSiteID, DisplaySearch) {
        $(".pageLoaderOverlay").show();
        return $http.post('Search.aspx/GetProductDetails', { 'ProdLocLevel': ProdLocLevel, 'CapmanPlatform': CapmanPlatform, 'StateFlag': StateFlag, 'ProductID': ProductID, 'RegionID': RegionID, 'CountryID': CountryID, 'StateID': StateID, 'CityID': CityID, 'HubSiteID': HubSiteID, 'DisplaySearch': DisplaySearch })
        .success(function (data, status, headers, config) {

        })
        .error(function (error) {

            console.log("error in GetProductDetails" + error);
        });
    },

    GetLevetowProductDetails.getProductLevel = function (prodId) {
        return $http.post('LeveltwoProduct.aspx/getProductLevel', { 'productId': prodId })
        .success(function (data, status, headers, config) {
        })
        .error(function (error) {
            console.log("error in GetProductLavel" + error);
        });
    },

    GetLevetowProductDetails.getPopChar = function (SiteID, ProductID, DisplaySearch) {
        return $http.post('Search.aspx/FetchPopCharacteristics', { 'SiteID': SiteID, 'ProductID': ProductID, 'DisplaySearch': DisplaySearch })
        .success(function (data, status, headers, config) {
        })
        .error(function (error) {
            console.log("error in GetProductLavel" + error);
        });
    },


    GetLevetowProductDetails.getCharecteristics = function (caseID, ProductID) {

        return $http.post('Search.aspx/GetCharacteristics', { 'CaseID': caseID, 'OptionMatrix': 1, 'CaseValidcd': 1, 'ProductID': ProductID })
        .success(function (data, status, headers, config) {

        })
        .error(function (error) {
            console.log("error in GetProductLavel" + error);
        });
    }

    return GetLevetowProductDetails;
});


app.factory("GetCPEBundles", function ($http) {
    var GetCPEBundles = {};
    GetCPEBundles.CPEbndls = function (productid, countryId) {
        $(".pageLoaderOverlay").show();
        return $http.post('CPEBundleDetails.aspx/GetBundleDetails', { 'productID': productid, 'CountryID': countryId })
        .success(function (data, status, headers, config) {


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

        })
        .error(function (error) {
            console.log("Problem occured while loading product charecteristics; " + error);
            $(".pageLoaderOverlay").hide();
        });
     }

    return GetCPEBundles;
});

app.factory("GetSupplier", function ($http) {
    var GetSupplier = {};
    GetSupplier.supplier = function (productid, countryId, cityid) {
        $(".pageLoaderOverlay").show();
        return $http.post('CPEBundleDetails.aspx/GetCPESuppliers', { 'productID': productid, 'CountryID': countryId, 'CityID': cityid })
        .success(function (data, status, headers, config) {


        })
        .error(function (error) {
            console.log("Problem occured while loading supplier; " + error);
            $(".pageLoaderOverlay").hide();
        });
    }
    return GetSupplier;
});


app.factory("GetCity", function ($http) {
    var GetCity = {};
    $(".pageLoaderOverlay").show();
    GetCity.GetCityList = function (supplierid, countryId, cityid) {
        return $http.post('CPEBundleDetails.aspx/GetCityList', { 'supplierID': supplierid, 'CountryID': countryId, 'CityID': cityid })
        .success(function (data, status, headers, config) {


        })
        .error(function (error) {
            console.log("Problem occured while loading city; " + error);
            $(".pageLoaderOverlay").hide();
        });
    }
    return GetCity;
});

app.factory("GetMainOption", function ($http) {
    var GetMainOption = {};
    GetMainOption.GetMaint = function (productid, supplierid, countryId, cityid) {
        $(".pageLoaderOverlay").show();
        return $http.post('CPEBundleDetails.aspx/getCPEMaintainanceDetails', { 'productID': productid, 'supplierID': supplierid, 'CountryID': countryId, 'cityID': cityid })
        .success(function (data, status, headers, config) {


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


        })
        .error(function (error) {
            console.log("Problem occured while loading maintenance supp; " + error);
            $(".pageLoaderOverlay").hide();
        });
    }
    return GetMainOption;
});

app.factory("GetCPELeadTime", function ($http) {
    var GetCPELeadTime = {};
    GetCPELeadTime.CPELeadtime = function (supplierid, countryId, productid) {
        $(".pageLoaderOverlay").show();
        return $http.post('CPEBundleDetails.aspx/getCPELeadTime', { 'supplierID': supplierid, 'CountryID': countryId, "productId": productid })
        .success(function (data, status, headers, config) {


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

        })
        .error(function (error) {
            $(".pageLoaderOverlay").hide();
            console.log("error in GetProductLavel" + error);
        });
   }
    return GetCPELeadTime;
});


