app.controller("dispAccessDetContrl", function ($scope, $modal, $http, $rootScope, glbProductID, glbRegionID, glbCountryID, Statesfactory, DispAccDet, Cityfactory, Popfactory, NetworkPlatformfactory, glbRegionID, glbCountryID, glbCityID, glbPOPID, DispAccDetAPI, SLAinfoparam, GetDoclinksFactory) {
    $(".pageLoaderOverlay").show();
    var AccSuppID = DispAccDet.getAccSuppCharID();

    var regionID = glbRegionID.getRegionID();
    var countryID = glbCountryID.getCountryID();
    var cityId = glbCityID.getCityID();
    var popId = glbPOPID.getPOPID();

    $scope.Product = glbProductID.getProductID();
    $scope.Region = glbRegionID.getRegionID();
    $scope.Country = glbCountryID.getCountryID();

    var HubSiteID = $scope.POP;
    var CountryID = $scope.Country;
    var ProductId = $scope.Product;
    var CityData = '';
    var POPData = '';
    var StateData = '';
    $('.searchFilter').hide();
    $(".acclblPlatform").hide();
    $(".accddlPlatform").hide();

    if (angular.isUndefined($rootScope.isIA)) {
        $rootScope.isIA = 0;
    }



    if (AccSuppID === '' || AccSuppID === undefined || AccSuppID === null || $scope.Product == 25) {


        $scope.ShowAccessDetailsDocLinks = 1;


        $('.close').hide();
        $('.panelAccDet').hide();

        Statesfactory.GetStates($scope.Product, $scope.Region, $scope.Country, $rootScope.isIA).success(function (data) {
            StateData = 1;
            if (data.d.length == 1) {
                $scope.modstate = data.d[0].StateID;
            }
            if (data.d.length == 0) {
                $scope.StateCount = 0;
            }

            if (StateData == 1 && CityData == 1 && POPData == 1)
                $(".pageLoaderOverlay").hide();
        });
        Cityfactory.GetCityInfo($scope.Product, $scope.Region, $scope.Country, 0, "0", 0, $rootScope.isIA, 1).success(function (data) {
            CityData = 1;
            if (data.d.length == 1) {
                $scope.modCity = data.d[0].CityID;
            }
            if (StateData == 1 && CityData == 1 && POPData == 1)
                $(".pageLoaderOverlay").hide();
        });
        Popfactory.GetPopInfo($scope.Product, $scope.Region, $scope.Country, 0, 0, $rootScope.isIA).success(function (data) {
            POPData = 1;
            if (data.d.length == 1) {
                $scope.modPoP = data.d[0].POPID;
            }
            if (StateData == 1 && CityData == 1 && POPData == 1)
                $(".pageLoaderOverlay").hide();

        });


        $scope.RemoveNPAlert = function () {
            $("span#validateNetworkPlatform").hide();
        }

        //Getting City when State is changed
        $scope.GetCities = function (ProductID, Region, Country, state) {
            if (angular.isUndefined(state) || state == null || state == '') {
                $scope.modCity = '';

                $(".pageLoaderOverlay").show();
                $scope.modCity = ''
                Cityfactory.GetCityInfo($scope.Product, $scope.Region, $scope.Country, 0, "0", 0, $rootScope.isIA, 1).success(function (data) {
                    CityData = 1;
                    //                    if (data.d.length == 1) {
                    //                        $scope.modCity = data.d[0].CityID;
                    //                    }
                    if (CityData == 1 && POPData == 1) {
                        $(".pageLoaderOverlay").hide();
                    }
                    $(".ValidateCity").hide();
                });
                $scope.modPoP = ''
                Popfactory.GetPopInfo($scope.Product, $scope.Region, $scope.Country, 0, 0, $rootScope.isIA).success(function (data) {
                    POPData = 1;
                    //                    if (data.d.length == 1) {
                    //                        $scope.modPoP = data.d[0].POPID;
                    //                    }
                    if (CityData == 1 && POPData == 1) {
                        $(".pageLoaderOverlay").hide();
                    }
                    $(".ValidatePOP").hide();
                });
            }

            if ($scope.Region == 0 || $scope.Country == 0) {
                $scope.GetInfoByState($scope.modstate);
            }
            else {

                $(".pageLoaderOverlay").show();
                $(".ValidateState").hide();
                Cityfactory.GetCityInfo(ProductID, Region, Country, state, "0", 0, $rootScope.isIA, 1).success(function (data) {

                    if (data.d.length == 1) {
                        $scope.modCity = data.d[0].CityID;
                        Popfactory.GetPopInfo(ProductID, Region, Country, state, $scope.modCity, $rootScope.isIA).success(function (data) {

                            if (data.d.length == 1) {
                                $scope.modPoP = data.d[0].POPID;
                            }
                            $(".pageLoaderOverlay").hide();
                            $(".ValidatePOP").hide();
                        });
                    }
                    else {
                        Popfactory.GetPopInfo(ProductID, Region, Country, state, 0, $rootScope.isIA).success(function (data) {

                            if (data.d.length == 1) {
                                $scope.modPoP = data.d[0].POPID;
                            }
                            $(".ValidatePOP").hide();
                            $(".pageLoaderOverlay").hide();
                        });
                    }
                    $(".ValidateCity").hide();
                });

            }

        }

        //Getting Pop Information
        $scope.GetPops = function (Product, Region, Country, State, City) {

            if (angular.isUndefined(City) || City == "" || City == null) {
                $(".pageLoaderOverlay").show();
                $scope.modPoP = '';
                $(".acclblPlatform").hide();
                $(".accddlPlatform").hide();
                $("#validateNetworkPlatform").hide();

                Popfactory.GetPopInfo($scope.Product, $scope.Region, $scope.Country, 0, 0, $rootScope.isIA).success(function (data) {
                    POPData = 1;
                    //                    if (data.d.length == 1) {
                    //                        $scope.modPoP = data.d[0].POPID;
                    //                    }
                    if (CityData == 1 && POPData == 1) {
                        $(".pageLoaderOverlay").hide();
                    }
                    $(".ValidatePOP").hide();
                });

                return;
            }
            $(".ValidateCity").hide();
            $(".ValidatePOP").hide();

            $scope.GetInfoByCity();

        }

        $scope.GetInfoByState = function () {

            $http.post('Search.aspx/GetInfoByState', { 'StateID': $scope.modstate })
            .success(function (data, status, headers, config) {

                $scope.modregion = data.d.RegionID;
                $scope.modcountry = data.d.CountryID;
                Cityfactory.GetCityInfo($scope.modproduct, $scope.modregion, $scope.modcountry, $scope.modstate, "0", 0, $rootScope.isIA, 1);
                Popfactory.GetPopInfo($scope.modproduct, $scope.modregion, $scope.modcountry, $scope.modstate, 0, $rootScope.isIA).success(function (data) {

                    if (data.d.length == 1) {
                        $scope.modPoP = data.d[0].POPID;
                    }
                });

            })
        .error(function (error) {
            // alert("Problem occured while loading Region " + JSON.stringify(error));
        });
        }

        $scope.GetInfoByCity = function () {

            $http.post('Search.aspx/GetInfoByCity', { 'CityID': $scope.modCity, 'ProductID': $scope.Product })
            .success(function (data, status, headers, config) {

                $scope.modstate = data.d.StateID;
                $(".pageLoaderOverlay").show();
                Popfactory.GetPopInfo($scope.Product, $scope.Region, $scope.Country, $scope.modstate, $scope.modCity, $rootScope.isIA).success(function (data) {

                    if (data.d.length == 1) {
                        $scope.modPoP = data.d[0].POPID;
                    }

                    $(".ValidatePOP").hide();

                    $(".pageLoaderOverlay").hide();
                });
            })
        .error(function (error) {
            // alert("Problem occured while loading Region " + JSON.stringify(error));
        });


        }

        $scope.GeInfoByPop = function (Product, Region, Country, State, City) {
            //Hide city when pop changed
            if ($scope.modPoP == null || $scope.modPoP == "" || angular.isUndefined($scope.modPoP)) {
                $("#acclblPlatform").hide();
                $("#accddlPlatform").hide();
                $scope.modNetworkPlatform = '';
            }

            $(".ValidatePOP").hide();
            $scope.GetinfoByHubSite();
            if ($scope.modCity != null || $scope.modCity != "") {
                $('span.ValidateCity').hide();
            }
        }

        $scope.GetinfoByHubSite = function () {
            $(".pageLoaderOverlay").show();

            if ($scope.modPoP == null) {
                $(".acclblPlatform").hide();
                $(".accddlPlatform").hide();
                $(".pageLoaderOverlay").hide();
                return;
            }

            $http.post('Search.aspx/GetinfoByHubSite', { 'HubSiteID': $scope.modPoP })
            .success(function (data, status, headers, config) {

                $scope.modstate = data.d.StateID;
                $scope.modCity = data.d.CityID;

                NetworkPlatformfactory.GetPlatformDetails($scope.Product, $scope.modPoP).success(function (data) {

                    if (data.d.length == 1 || data.d.length == 0) {
                        $(".acclblPlatform").hide();
                        $(".accddlPlatform").hide();

                    }
                    else {
                        result = [];
                        data.d.forEach(function (item1) {
                            result.push({ ID: item1.ID, NetworkPlatform: item1.NetworkPlatform });
                        });
                        $(".acclblPlatform").show();
                        $(".accddlPlatform").show();
                        $scope.NetworkPlatformData = result;

                    }
                    $(".pageLoaderOverlay").hide();

                });


            })
        .error(function (error) {
            $(".pageLoaderOverlay").hide();
        });
        }

        $('.searchFilter').show();
        $("#AccessSupp").show();
    }
    else {
        $scope.ShowAccessDetailsDocLinks = 0;
        $('.clsallignpopupcontainer').attr('class', 'clsallignpopupcontainer ng-scope container');
        DispAccDetAPI.getAccSupp(25, countryID, cityId, popId).success(function (data) {
            $scope.AccSuppList = data.d;

            $scope.modAccSupp = AccSuppID.toString();
            $("#AccessSupp").show();

            DispAccDetAPI.getAccDetails(countryID, popId, AccSuppID).success(function (data) {
                $scope.AccDetList = data.d;


            });
        });
    }

    $scope.GetAccessDetails = function () {



        var IsGetAccess = true;

        //        if (angular.isUndefined($scope.modstate) || $scope.modstate == "" || $scope.modstate == null) {
        //            $(".ValidateState").show();
        //            IsGetAccess = false;
        //        }

        if (angular.isUndefined($scope.modCity) || $scope.modCity == "" || $scope.modCity == null) {
            $(".ValidateCity").show();
            IsGetAccess = false;
        }


        if ($scope.modproduct != 15) {//$("#ddlPoP").is(':visible') ||
            if (angular.isUndefined($scope.modPoP) || $scope.modPoP == "" || $scope.modPoP == null) {
                $(".ValidatePOP").show();
                IsGetAccess = false;
            }
            else {
                $(".ValidatePOP").hide();
            }

        }


        //to check whether networkplatform is visible, then if visible then show alert if no value selected
        if ($("#ddlNetworkPlatform").is(':visible')) {
            if (angular.isUndefined($scope.modNetworkPlatform) || $scope.modNetworkPlatform === "" || $scope.modNetworkPlatform === null) {
                $("#validateNetworkPlatform").show();
                IsGetAccess = false;
            } else {
                $("#validateNetworkPlatform").hide();
            }
        } else {
            $("#validateNetworkPlatform").hide();
        }



        //
        if (!IsGetAccess) {
            return;

        }

        if (angular.isUndefined($scope.City) || $scope.City == '') {
            $scope.City = 0;
        }

        if (angular.isUndefined($scope.POP) || $scope.POP == '') {
            $scope.POP = 0; HubSiteID = 0;
        }

        if (angular.isUndefined($scope.modNetworkPlatform) || $scope.modNetworkPlatform === '') {
            $scope.modNetworkPlatform = -1;
        }
        $('.panelAccDet').show();

        popId = $scope.modPoP;



        DispAccDetAPI.getAccSupp(25, countryID, $scope.modCity, $scope.modPoP).success(function (data) {

            $scope.AccSuppList = data.d;
            $scope.modAccSupp = data.d[0].Item1;
            DispAccDetAPI.getAccDetails(countryID, $scope.modPoP, $scope.modAccSupp).success(function (data) {
                $scope.AccDetList = data.d;


                if (data.d.length == 1) {

                    $("#AccessDetailsTableDiv").attr("style", "height:105px");
                    $('#AccessDetailsTableDiv').removeClass('scrollbar');

                }
                if (data.d.length == 2) {
                    $("#AccessDetailsTableDiv").attr("style", "height:140px");
                    $('#AccessDetailsTableDiv').removeClass('scrollbar');
                }
                if (data.d.length == 3) {
                    $("#AccessDetailsTableDiv").attr("style", "height:175px");
                    $('#AccessDetailsTableDiv').removeClass('scrollbar');
                }
                if (data.d.length == 4) {
                    $("#AccessDetailsTableDiv").attr("style", "height:210px");
                    $('#AccessDetailsTableDiv').removeClass('scrollbar');
                }
                if (data.d.length == 5) {
                    $("#AccessDetailsTableDiv").attr("style", "height:245px");
                    $('#AccessDetailsTableDiv').removeClass('scrollbar');
                }
                if (data.d.length == 6) {
                    $("#AccessDetailsTableDiv").attr("style", "height:280px");
                    $('#AccessDetailsTableDiv').removeClass('scrollbar');
                }
                if (data.d.length == 7) {
                    $("#AccessDetailsTableDiv").attr("style", "height:310px");
                    $('#AccessDetailsTableDiv').removeClass('scrollbar');
                }
                if (data.d.length == 8) {
                    $("#AccessDetailsTableDiv").attr("style", "height:345px");
                    $('#AccessDetailsTableDiv').removeClass('scrollbar');
                }
                if (data.d.length == 9) {
                    $("#AccessDetailsTableDiv").attr("style", "height:380px");
                    $('#AccessDetailsTableDiv').removeClass('scrollbar');
                }
                if (data.d.length == 10) {
                    $("#AccessDetailsTableDiv").attr("style", "height:415px");
                    $('#AccessDetailsTableDiv').removeClass('scrollbar');
                }
                if (data.d.length > 10) {
                    $("#AccessDetailsTableDiv").attr("style", "height:450px");
                }


            });
        });



        GetDoclinksFactory.getDoc(glbProductID.getProductID()).success(function (data) {

            if (data.d.length == 0) {
                $scope.ShowAccessDetailsDocLinks = 0;
            }
            else {
                $scope.ShowAccessDetailsDocLinks = 1;

                $scope.DocumentslinksData = [];
                ProductsDocLinks = [];

                data.d.forEach(function (item) {

                    ProductsDocLinks.push({ DocumentTitle: item.DocumentTitle, DocumentUrl: item.DocumentUrl });

                });

                $scope.DocumentslinksData = ProductsDocLinks;
            }

        });


    }


    $scope.getAccDetForSupp = function () {

        DispAccDetAPI.getAccDetails(countryID, popId, $scope.modAccSupp).success(function (data) {
            $scope.AccDetList = data.d;
        });
    }


    $scope.openSLAPopup = function (suppName, SuppProdName, suppID, suppProdID, AccTypeID, AccSpeedID, Speed) {

        SLAinfoparam.setAccSuppName(suppName);
        SLAinfoparam.setSupProduct(SuppProdName);
        SLAinfoparam.setAccSuppCharID(suppID);
        SLAinfoparam.setAccSuppNameId(suppProdID);
        SLAinfoparam.setsuppAccTypeId(AccTypeID);
        SLAinfoparam.setAccessSpeedCharID(AccSpeedID);
        SLAinfoparam.setASpeed(Speed);
        SLAinfoparam.setASpeedUOM('');
        SLAinfoparam.setstrDSL('N');
        $modal.open({
            templateUrl: 'Search/SLAInformation.htm',
            controller: 'SLAInfoCntrl'
        });
    }


});

app.factory("DispAccDet", function () {
    var AccSuppCharID = "";
    var AccSuppName = "";
    return {
        setAccSuppCharID: function (param) {
            AccSuppCharID = param;
        },

        getAccSuppCharID: function () {
            return AccSuppCharID;
        },

        setAccSuppName: function (param) {
            AccSuppName = param;
        },

        getAccSuppName: function () {
            return AccSuppName;
        }
    }
});

app.factory("DispAccDetAPI", function ($http) {
    ////debugger
    var DispAccDetAPI = {};
    $(".pageLoaderOverlay").show();
    DispAccDetAPI.getAccSupp = function (Access, countryID, cityId, popId) {
        return $http.post('DispAccessDetails.aspx/getAccessSupplier', { "Access": Access, 'countryID': countryID, 'cityId': cityId, 'popId': popId })
        .success(function (data, status, headers, config) {

            $(".pageLoaderOverlay").hide();
        })
        .error(function (error) {
            console.log("Problem occured while loading supplier; " + error);
            $(".pageLoaderOverlay").hide();
        });
    },

    DispAccDetAPI.getAccDetails = function (countryID, siteID, selectedSuppID) {
        $(".pageLoaderOverlay").show();
        return $http.post('DispAccessDetails.aspx/getAccessDetails', { 'countryID': countryID, 'siteID': siteID, 'selectedSuppID': selectedSuppID })
        .success(function (data, status, headers, config) {
            $(".pageLoaderOverlay").hide();
        })
        .error(function (error) {
            console.log("Problem occured while loading access details; " + error);
            $(".pageLoaderOverlay").hide();
        });
    }
    return DispAccDetAPI;
});


