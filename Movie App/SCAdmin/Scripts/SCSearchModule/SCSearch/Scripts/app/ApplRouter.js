var app = angular.module("appModule", ['ui.bootstrap', 'ngRoute', 'ngResource']);


app.config(function ($routeProvider) {

    $routeProvider.when('/', { templateUrl: 'EmptyTemplate.htm' })
                  .when('/ProductCase/', { templateUrl: 'Search/ProductCaseDetails.htm' })
                  .when('/IPConnect/', { templateUrl: 'Search/IPConnect.htm' })
                  .when('/PrivateLine/', { templateUrl: 'Search/PrivateLineDetails.htm' })
                  .when('/BTCPEProduct/', { templateUrl: 'Search/BTCPEProduct.htm', controller: 'BTCPEProductController' })
                  .when('/BTOneVoice/', { templateUrl: 'Search/BTOneVoice.htm' })
                  .when('/subproduct/', { templateUrl: 'Search/DispSubproduct.htm' })
                  .when('/leveltwoProduct/', { templateUrl: 'Search/LeveltwoProduct.htm' })
                  .when('/Access/', { templateUrl: 'Search/DispAccessDetails.htm' })

                  .otherwise({ redirectTo: "/" });

});

app.factory('Productsfactory', function ($http, $rootScope) {

    var Productsfactory = {};
    if ($rootScope.productdata === undefined || $rootScope.productdata === null) { }
    else { }


    Productsfactory.GetProducts = function (CountryID, AccessLevel, BtGfrCodes, SegregationCodes, User_Id) {
        
        $http.post('Search.aspx/GetProductsData', { 'CountryID': CountryID, 'AccessLevel': AccessLevel, 'BtGfrCodes': BtGfrCodes, 'SegregationCodes': SegregationCodes, 'User_Id':User_Id })
        .success(function (data, status, headers, config) {
            
            var result = [];
            $rootScope.productdata = [];
            
            result = [];
            data.d.forEach(function (item) {
                result.push({ ProductID: item.ProductID, ProductName: item.ProductName });
            });

            $rootScope.productdata = result;

        })
        .error(function (error) {
            // alert("Problem occured while loading products; " + error);
        });
    }

    return Productsfactory;
});

app.factory('Regionsfactory', function ($http, $rootScope) {

    var Regionsfactory = {};

    Regionsfactory.GetRegions = function (ProductID) {
        
        return $http.post('Search.aspx/GetRegionsData', { 'ProductID': ProductID })
        .success(function (data) {
            
            var result = [];
            $rootScope.RegionData = [];
            result = [];
            data.d.forEach(function (item) {
                result.push({ RegionID: item.RegionID, RegionName: item.RegionName });
            });

            $rootScope.RegionData = result;

        })
        .error(function (error) {
            //  alert("Problem occured while loading Regions; " + error);
        });
    }

    return Regionsfactory;
});

app.factory('CountryCityFactory', function ($http, $rootScope) {

    var CountryCityFactory = {};

    CountryCityFactory.GetCountryCities = function (ProductID) {
        return $http.post('Search.aspx/GetCountryCites', { 'ProductID': ProductID })
        .success(function (data) {

        })
        .error(function (error) {
            //  alert("Problem occured while loading Regions; " + error);
        });
    }

    return CountryCityFactory;
});

app.factory('Countryfactory', function ($http, $rootScope) {

    var Countryfactory = {};

    Countryfactory.GetCountries = function (ProductID, RegionID, Speed, AccessLevel, BtGfrCodes, SegregationCodes, User_Id) {
        return $http.post('Search.aspx/GetCountriesData', { 'ProductID': ProductID, 'RegionID': RegionID, 'flag': 1, 'Speed': Speed,
            'AccessLevel': AccessLevel, 'BtGfrCodes': BtGfrCodes, 'SegregationCodes': SegregationCodes, 'User_Id': User_Id
        })
        .success(function (data, status, headers, config) {
            var result = [];
            $rootScope.CountryData = [];
            result = [];
            data.d.forEach(function (item) {
                result.push({ CountryID: item.CountryID, CountryName: item.CountryName });
            });

            $rootScope.CountryData = result;

        })
    .error(function (error) {
        // alert("Problem occured while loading Regions; " + error);
    });
    }

    return Countryfactory;
});

app.factory('CountryBySpeedsfactory', function ($http, $rootScope) {

    var CountryBySpeedsfactory = {};

    CountryBySpeedsfactory.GetCountriesBySpeeds = function (ProductID, CountryID) {        
        return $http.post('Search.aspx/GetCountriesBySpeeds', { 'ProductID': ProductID, 'CountryID': CountryID });
    }

    return CountryBySpeedsfactory;
});

app.factory('Statesfactory', function ($http, $rootScope) {

    var Statesfactory = {};

    Statesfactory.GetStates = function (ProductID, RegionID, CountryID, isIA) {

        return $http.post('Search.aspx/GetStatesData', { 'ProductID': ProductID, 'RegionID': RegionID, 'CountryID': CountryID, 'isIA': isIA })
        .success(function (data, status, headers, config) {
            var result = [];
            $rootScope.StateData = [];
            result = [];
            data.d.forEach(function (item) {
                result.push({ StateID: item.StateID, StateName: item.StateName });
            });

            $rootScope.StateData = result;

        })
        .error(function (error) {
            // alert("Problem occured while loading States; " + error);
        });
    }

    return Statesfactory;
});

app.factory('Cityfactory', function ($http, $rootScope) {

    var Cityfactory = {};

    Cityfactory.GetCityInfo = function (ProductID, RegionID, CountryID, StateID, flag, Speed, isIA, CityFlag) {
        
        return $http.post('Search.aspx/GetCitiesData', { 'ProductID': ProductID, 'RegionID': RegionID, 'countryID': CountryID, 'StateID': StateID, 'Speed': Speed, 'flag': 1, 'isIA': isIA, 'CityFlag': CityFlag })
        .success(function (data, status, headers, config) {

            var result = [];
            $rootScope.CityData = [];
            result = [];
            CitySel = 0;
            firstrec = 0;

            data.d.forEach(function (item) {
                if (firstrec == 0) {
                    $rootScope.CityID = item.CityID;
                    CitySel = item.CityID;
                }
                firstrec = 1;
                result.push({ CityID: item.CityID, CityName: item.CityName });
            });

            if (flag == "0") {
                $rootScope.CityData = result;
            }
            else if (flag == "1") {

                $rootScope.CityData1 = result;

            }
            else if (flag == "2") {
                $rootScope.CityData2 = result;

            }
            else if (flag == "3") {
                $rootScope.CityData2 = result;
                $rootScope.CityData1 = result;
            }

        })
        .error(function (error) {
            //alert("Problem occured while loading Cities; " + JSON.stringify(error));
        });
    }

    return Cityfactory;
});

app.factory('Popfactory', function ($http, $rootScope) {

    var Popfactory = {};

    Popfactory.GetPopInfo = function (ProductID, RegionID, CountryID, StateID, CityID, isIA) {

        return $http.post('Search.aspx/GetPopData', { 'ProductID': ProductID, 'RegionID': RegionID, 'countryID': CountryID, 'StateID': StateID, 'CityID': CityID, 'isIA': isIA })
        .success(function (data, status, headers, config) {

            var result = [];
            $rootScope.PopData = [];
            result = [];
            data.d.forEach(function (item) {
                result.push({ POPID: item.POPID, PopName: item.PopName });
            });

            $rootScope.PopData = result;

        })
        .error(function (error) {
            //alert("Problem occured while loading POP Info; " + JSON.stringify(error));
        });
    }

    return Popfactory;
});


app.factory('NetworkPlatformfactory', function ($http, $rootScope) {

    var NetworkPlatformfactory = {};

    NetworkPlatformfactory.GetPlatformDetails = function (ProductID, HubSiteID) {

        return $http.post('Search.aspx/GetNetworkPlatform', { 'ProductID': ProductID, 'HubSiteID': HubSiteID });
    }

    return NetworkPlatformfactory;
});

app.factory('ShowCPESupplierfactory', function ($http, $rootScope) {

    var ShowCPESupplierfactory = {};

    ShowCPESupplierfactory.ShowCPE = function (ProductID) {

        return $http.post('Search.aspx/ShowCPE', { 'ProductID': ProductID });
    }

    return ShowCPESupplierfactory;
});

app.factory('ProductNotes', function ($http, $rootScope) {

    var ProductNotes = {};

    ProductNotes.GetProductNotes = function (ProductID) {

        return $http.post('Search.aspx/GetProductPriority', { 'ProductID': ProductID });
    }

    return ProductNotes;
});

app.factory('CountryPriorityNotes', function ($http, $rootScope) {
    
    var CountryPriorityNotes = {};

    CountryPriorityNotes.GetcntryNotes = function (ProductID, CountryID, RegionID) {

        return $http.post('Search.aspx/GetCountryPriority', { 'ProductID': ProductID, 'CountryID': CountryID, 'RegionID': RegionID });
    }

    return CountryPriorityNotes;
});

app.factory('RegionPriorityNotes', function ($http, $rootScope) {

    var RegionPriorityNotes = {};

    RegionPriorityNotes.GetRegNotes = function (ProductID, RegionID) {
    
        return $http.post('Search.aspx/GetRegionPriority', { 'ProductID': ProductID, 'RegionID': RegionID });
    }

    return RegionPriorityNotes;
});



app.factory('Speedsfactory', function ($http, $rootScope) {

    var Speedsfactory = {};

    Speedsfactory.GetSpeedInfo = function (PrdouctID, Country1ID, City1ID, Country2ID, City2ID) {

        return $http.post('Search.aspx/GetSpeeds', { 'ProductID': PrdouctID, 'Country1ID': Country1ID, 'City1ID': City1ID, 'Country2ID': Country2ID, 'City2ID': City2ID })
        .success(function (data, status, headers, config) {
            var result = [];
            $rootScope.CityData = [];
            result = [];
            data.d.forEach(function (item) {
                result.push({ SpeedID: item.SpeedID, SpeedName: item.SpeedName });
            });

            $rootScope.SpeedsData = result;

        })
        .error(function (error) {
            // alert("Problem occured while loading Speed Info; " + JSON.stringify(error));
        });
    }

    return Speedsfactory;
});

app.service("glbProductID", function ($http) {

    var ProductID = "";
    var prodIName = '';
    return {
        getProductID: function () {
            return ProductID;
        },
        setProductID: function (value) {
            ProductID = value;
        },

        //added to get/fetch productName through Name
        getProductName: function () {
            return prodIName;
        },

        setProductName: function (value) {
            prodIName = value;
        },

        getSubProductCount: function (productID) {

            return $http.post('DispSubProduct.aspx/GetSubProductCount', { 'prodID': productID })
            .success(function (data, status, headers, config) {
            })
            .error(function (error) {
                console.log("Problem occured while loading subproduct count; " + error);
            });
        },

        getSegmentCount: function (sAccess_Level, GfrCode, SegregationCode, prodID) {
            return $http.post('Search.aspx/getSegmentCount', {'sAccess_Level':sAccess_Level,'GfrCode':GfrCode,
            'SegregationCode':SegregationCode,'prodID': prodID })
            .success(function (data, status, headers, config) {
            })
            .error(function (error) {
                console.log("Problem occured while loading segment count; " + error);
            });
        }
    }
});

app.service("glbRegionID", function () {
    var RegionID = "";
    var RegName = "";
    return {
        getRegionID: function () {
            return RegionID;
        },
        setRegionID: function (value) {
            RegionID = value;
        },
        getRegionName: function () {
            return RegName;
        },
        setRegionName: function (value) {
            RegName = value;
        }
    }
});

app.service("glbCountryID", function () {

    var CountryID = "";
    var cntryIName = "";
    return {
        getCountryID: function () {
            return CountryID;
        },
        setCountryID: function (value) {
            CountryID = value;
        },

        //added to get/fetch CountryName through Name
        getCountryName: function () {
            return cntryIName;
        },

        setCountryName: function (value) {
            cntryIName = value;
        }
    }
});

app.service("glbStateID", function () {
    var StateID = "";
    return {
        getStateID: function () {
            return StateID;
        },
        setStateID: function (value) {
            StateID = value;
        }
    }
});

app.service("glbCityID", function () {
    var CityID = "";

    return {
        getCityID: function () {
            return CityID;
        },
        setCityID: function (value) {
            CityID = value;
        }


    }
});

app.service("glbPOPID", function () {
    var POPID = "";
    return {
        getPOPID: function () {
            return POPID;
        },
        setPOPID: function (value) {
            POPID = value;
        }
    }
});

app.service("glbCity1", function () {
    var City1 = "";
    var CityName = "";
    var OrgCity = "";
    return {
        getCity: function () {
            return City1;
        },
        setCity: function (value) {
            City1 = value;
        },
        getOrgCity: function () {
            return OrgCity;
        },
        setOrgCity: function (value) {
            OrgCity = value;
        },
        getCityName: function () {
            return CityName;
        },
        setCityName: function (value) {
            CityName = value;
        }

    }
});


app.service("glbCity2", function () {
    var City2 = "";
    var OrgCity = "";
    var CityName = "";
    return {
        getCity: function () {
            return City2;
        },
        setCity: function (value) {
            City2 = value;
        },
        getOrgCity: function () {
            return OrgCity;
        },
        setOrgCity: function (value) {
            OrgCity = value;
        },
        getCityName: function () {
            return CityName;
        },
        setCityName: function (value) {
            CityName = value;
        }
    }
});

app.service("glbSpeed", function () {
    var SpeedID = "";
    var SpeedName = "";
    return {
        getSpeed: function () {
            return SpeedID;
        },
        setSpeed: function (value) {
            SpeedID = value;
        },
        getSpeedName: function () {
            return SpeedName;
        },
        setSpeedName: function (value) {
            SpeedName = value;
        }
    }
});


app.service("glbCountry1", function () {
    var Country = "";
    var CountryID = "";
    var OrgCountryID = "";
    return {
        getCountryName: function () {
            return Country;
        },
        setCountryName: function (value) {
            Country = value;
        },
        getCountryID: function () {
            return CountryID;
        },
        setCountryID: function (value) {
            CountryID = value;
        },
        getOrgCountryID: function () {
            return OrgCountryID;
        },
        setOrgCountryID: function (value) {
            OrgCountryID = value;
        }
    }
});


app.service("glbCountry2", function () {
    var Country = "";
    var CountryID = "";
    var OrgCountryID = "";
    return {
        getCountryName: function () {
            return Country;
        },
        setCountryName: function (value) {
            Country = value;
        },
        getCountryID: function () {
            return CountryID;
        },
        setCountryID: function (value) {
            CountryID = value;
        },
        getOrgCountryID: function () {
            return OrgCountryID;
        },
        setOrgCountryID: function (value) {
            OrgCountryID = value;
        }
    }
});


app.controller("appCntrl", function ($scope, $rootScope, $modal, $window, $http, $location, Productsfactory, Regionsfactory, Countryfactory, Statesfactory, Cityfactory, Popfactory, Speedsfactory, glbProductID, glbRegionID, glbCountryID, glbStateID, glbCityID, glbPOPID, glbCity1, glbCity2, glbSpeed, glbCountry1, glbCountry2, ProductNotes, CountryPriorityNotes, RegionPriorityNotes, glbCountryProductFlag, CountryBySpeedsfactory) {
    $(".pageLoaderOverlay").show();


    $scope.AccessLevel = unescape(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + escape('AccessLevel').replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
    $scope.BtGfrCodes = unescape(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + escape('BtGfrCodes').replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
    $scope.SegregationCodes = unescape(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + escape('SegregationCodes').replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
    $scope.User_Id = unescape(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + escape('User_Id').replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));

    $scope.modproduct = 0;
    $scope.modregion = 0;
    $scope.modcountry = 0;
    var countrySelected = 0;
    var RegionSelected = 0;

    var RegionData = 0;
    var CountryData = 0;
    var StateData = 0;
    var CityData = 0;
    var POPData = 0;
    var SpeedData = 1;
    $scope.ProductNote = 0;
    $scope.CountryNote = 0;
    $scope.Country1Note = 0;
    $scope.Country2Note = 0;
    $scope.RegionNote = 0;
    $rootScope.isIA = 0;
    $('div.ddlDispCity').hide();
    //Getting Products

    $scope.HideCityAlert = function () {

        if ($scope.modCity == '' || $scope.modCity == null) {
            //  $("#ValidateCity").show();
        }
        else {

            $("#ValidateCity").hide();
        }

    };



    //this part is for local developement, to be removed before live deployment
    if ($scope.AccessLevel == undefined || $scope.AccessLevel == null || $scope.AccessLevel == "") {
        $scope.AccessLevel = 1;
    }
    if ($scope.BtGfrCodes == undefined || $scope.BtGfrCodes == null) {
        $scope.BtGfrCodes = '';
    }
    if ($scope.SegregationCodes == undefined || $scope.SegregationCodes == null) {
        $scope.SegregationCodes = '';
    }

    $rootScope.sAccess_Level = $scope.AccessLevel;
    $rootScope.BtGfrCodes = $scope.BtGfrCodes;
    $rootScope.SegregationCodes = $scope.SegregationCodes;
   // $rootScope.sAccess_Level = 3;
  //  $rootScope.BtGfrCodes = '100278';
    Productsfactory.GetProducts($scope.modcountry, $scope.AccessLevel, $scope.BtGfrCodes, $scope.SegregationCodes, $scope.User_Id);

    //Getting Regions
    Regionsfactory.GetRegions($scope.modproduct);

    //Getting Countries
    Countryfactory.GetCountries($scope.modproduct, $scope.modregion, 0, $scope.AccessLevel, $scope.BtGfrCodes, $scope.SegregationCodes, $scope.User_Id).success(function (data) {

        $(".pageLoaderOverlay").hide();
    });

    //Getting Speed Info
    //Speedsfactory.GetSpeedInfo();

    //Getting Regions and Countries based on Product Selection
    $scope.GetRegionCountries = function (ProductID, RegionID) {

        //Call reset form 
        $location.path('/');

        $("#ValidateProduct").hide();
        var City1Data = 0;
        var City2Data = 0;
        //when product dropdown changed to select
        if ($scope.modproduct == null) {

            $("#ValidateCountry").hide();

            $("#ValidateCity").hide();

            $scope.modregion = "";
            $scope.ProductNote = 0;
            $scope.CountryNote = 0;
            $scope.RegionNote = 0;
            $scope.modproduct = 0;
            $scope.modregion = 0;
            $scope.modcountry = 0;

            $('div.ddlDispCity').hide();
            //Getting Products
            $(".pageLoaderOverlay").show();
            Productsfactory.GetProducts($scope.modcountry, $scope.AccessLevel, $scope.BtGfrCodes, $scope.SegregationCodes, $scope.User_Id);

            //Getting Regions
            Regionsfactory.GetRegions($scope.modproduct);

            //Getting Countries
            Countryfactory.GetCountries($scope.modproduct, $scope.modregion, 0, $scope.AccessLevel, $scope.BtGfrCodes, $scope.SegregationCodes, $scope.User_Id).success(function (data) {
                $(".pageLoaderOverlay").hide();
            });
            //$location.path('/');
            return;
        }

        if ($scope.modproduct != null) {

            $scope.modregion = 0;

            $(".pageLoaderOverlay").show();

            ProductNotes.GetProductNotes($scope.modproduct).success(function (data) {

                $scope.ProductNote = data.d;
                if (data.d == "1") {
                    $("#spnProductNotes").show();
                }
            });


            if (($scope.modcountry > 0 && $scope.modcountry != '' && $scope.modcountry != null)) {

                CountryPriorityNotes.GetcntryNotes($scope.modproduct, $scope.modcountry, $scope.modregion).success(function (data) {

                    $scope.CountryNote = data.d;
                    if (data.d == "1") {
                        $("#spnCountryNotes").show();
                    }
                });

            }


            if (($scope.modproduct > 0 && $scope.modproduct != '' && $scope.modproduct != null) && ($scope.modcountry != null && $scope.modcountry > 0 && $scope.modcountry != '')) {

                RegionPriorityNotes.GetRegNotes($scope.modproduct, $scope.modregion).success(function (data) {

                    $scope.RegionNote = data.d;
                    if (data.d == "1") {
                        $("#spnRegionNotes").show();
                    }
                });

                $scope.GetRegion();
            }



            //$(".pageLoaderOverlay").show();


            if ($scope.modproduct == '58' || $scope.modproduct == '72') {
                $scope.modCountry1 = '';
                $scope.modCountry2 = '';
                $scope.modCity1 = '';
                $scope.modCity2 = '';
                $("#ValidateCountry").hide();
                $("#btLanNotes").show();
                $("#Country12").show();
                $("#City12").show();
                $("#divSpeeds").show();
            }
            else {
                $scope.modCountry1 = '';
                $scope.modCountry2 = '';
            }

            if (!angular.isUndefined($scope.modcountry) && $scope.modcountry != null && $scope.modcountry != '' && $scope.modcountry > 0) {

                $http.post('Search.aspx/GetRegionDetailsByCountryIDProduct', { 'ProductID': $scope.modproduct, 'CountryID': $scope.modcountry }).success(function (data) {
                    if (data.d == 0) {
                        $(".pageLoaderOverlay").attr("style", "display:none");
                        alert("No cases exist for the selection made. The page will now refresh.");
                        // $location.path('/');
                        $scope.resetForm();
                    }

                });
            }

            if (RegionSelected == 0) {
                // $scope.modregion = 0;
                Regionsfactory.GetRegions($scope.modproduct).success(function (data) {
                    RegionData = 1;

                    if (data.d.length == 1) {
                        $scope.modregion = data.d[0].RegionID;
                    }
                    if (SpeedData == 1 && RegionData == 1 && CountryData == 1) {
                        if ($scope.modproduct == '58' || $scope.modproduct == '72') {
                            //if (City1Data == 1) {
                            $(".pageLoaderOverlay").attr("style", "display:none");
                            // }
                        }
                        //                        else {
                        //                            $(".pageLoaderOverlay").attr("style", "display:none");                            
                        //                        }

                    }


                });
            }

            if (countrySelected == 0) {
                // $scope.modcountry = 0;
                Countryfactory.GetCountries($scope.modproduct, $scope.modregion, 0
                , $scope.AccessLevel, $scope.BtGfrCodes, $scope.SegregationCodes, $scope.User_Id).success(function (data) {
                    CountryData = 1;

                    if (data.d.length == 1) {
                        $scope.modcountry = data.d[0].CountryID;
                        $("#ValidateCountry").hide();

                    }

                    if (RegionData == 1 && SpeedData == 1 && CountryData == 1) {

                        if ($scope.modproduct == '58' || $scope.modproduct == '72') {
                            //if (City1Data == 1) {
                            $(".pageLoaderOverlay").attr("style", "display:none");
                            //}
                        }
                        else {
                            $(".pageLoaderOverlay").attr("style", "display:none");
                        }
                    }

                });
            }




            if ($scope.modcountry > 0 && ($scope.modproduct == '63' || $scope.modproduct == '128' || $scope.modproduct == '129')) {

                $("#divCity").show();

                Cityfactory.GetCityInfo($scope.modproduct, $scope.modregion, $scope.modcountry, 0, "0", 0, $rootScope.isIA, 1).success(function (data) {

                    if (data.d == null || data.d.length == 0) {
                        $('div.ddlDispCity').hide();
                    } else {
                        $('div.ddlDispCity').show();
                    }

                    if (data.d.length == 1) {
                        $scope.modCity = data.d[0].CityID;
                    }
                });
            } else {

                $('div.ddlDispCity').hide();
            }

            if (RegionSelected == 1 || countrySelected == 1) {
                $(".pageLoaderOverlay").attr("style", "display:none");
            }

            if ($scope.modproduct == '58' || $scope.modproduct == '72') {

                Speedsfactory.GetSpeedInfo($scope.modproduct, 0, 0, 0, 0).success(function (data) {
                    SpeedData = 1;
                    if (RegionData == 1 && SpeedData == 1 && CountryData == 1) {
                        $(".pageLoaderOverlay").attr("style", "display:none");
                    }
                });
                //                Cityfactory.GetCityInfo($scope.modproduct, 0, 0, 0, "3", 0, $rootScope.isIA).success(function (data) {

                //                    City1Data = 1;
                //                    if (RegionData == 1 && CountryData == 1 && City1Data == 1) {

                //                        $(".pageLoaderOverlay").attr("style", "display:none");
                //                    }

                //                });
            }
            //$(".pageLoaderOverlay").hide();
        }
    }
    //Getting Countries based on ProductID and RegionID
    $scope.GetCountries = function (ProductID, Region) {
        $scope.modcountry = "";
        if ($scope.modregion == 0 || $scope.modregion == '' || $scope.modregion == null) {
            return;
        }
        RegionSelected = 1;
        RegionData = 1;
        $(".pageLoaderOverlay").show();
        Countryfactory.GetCountries(ProductID, Region, 0
        , $scope.AccessLevel, $scope.BtGfrCodes, $scope.SegregationCodes, $scope.User_Id).success(function (data) {
            $(".pageLoaderOverlay").hide();

        });
        var CountryID;
        if ($scope.modcountry == "")
            CountryID = 0;
        else
            CountryID = $scope.modcountry;

        //        Statesfactory.GetStates($scope.modproduct, $scope.modregion, CountryID,$rootScope.isIA);
        //        Cityfactory.GetCityInfo($scope.modproduct, $scope.modregion, CountryID, 0, "0", 0);
        //        Popfactory.GetPopInfo($scope.modproduct, $scope.modregion, CountryID, 0, 0).success(function (data) {
        //            $(".pageLoaderOverlay").hide();
        //            
        //        });
    }
    //Getting Regions
    $scope.GetCountryRegions = function () {
        $location.path('/');
        $("#ValidateCity").hide();

        if ($scope.modcountry == 0 || $scope.modcountry == '' || $scope.modcountry == null) {
            $scope.modregion = "";

            $scope.modproduct = 0;
            $scope.modregion = 0;
            $scope.modcountry = 0;
            $scope.ProductNote = 0;
            $scope.CountryNote = 0;
            $scope.RegionNote = 0;
            $('div.ddlDispCity').hide();
            //Getting Products
            $(".pageLoaderOverlay").show();
            Productsfactory.GetProducts($scope.modcountry, $scope.AccessLevel, $scope.BtGfrCodes, $scope.SegregationCodes, $scope.User_Id);

            //Getting Regions

            Regionsfactory.GetRegions($scope.modproduct);

            //Getting Countries
            Countryfactory.GetCountries($scope.modproduct, $scope.modregion, 0
            , $scope.AccessLevel, $scope.BtGfrCodes, $scope.SegregationCodes, $scope.User_Id).success(function (data) {
                $(".pageLoaderOverlay").hide();
            });

            return;
        }


        Productsfactory.GetProducts($scope.modcountry, $scope.AccessLevel, $scope.BtGfrCodes, $scope.SegregationCodes, $scope.User_Id);
        $scope.GetRegion();
        $("#ValidateCountry").hide();






    }

    $scope.GetRegion = function () {

        $(".pageLoaderOverlay").show();

        $http.post('Search.aspx/GetRegion', { 'CountryID': $scope.modcountry })
            .success(function (data, status, headers, config) {

                $scope.modregion = data.d;

                if (($scope.modproduct > 0 && $scope.modproduct != '' && $scope.modproduct != null) && ($scope.modcountry != null && $scope.modcountry > 0 && $scope.modcountry != '')) {

                    RegionPriorityNotes.GetRegNotes($scope.modproduct, $scope.modregion).success(function (data) {

                        $scope.RegionNote = data.d;
                        if (data.d == "1") {
                            $("#spnRegionNotes").show();
                        }
                    });

                    CountryPriorityNotes.GetcntryNotes($scope.modproduct, $scope.modcountry, $scope.modregion).success(function (data) {

                        $scope.CountryNote = data.d;
                        if (data.d >= "1") {
                            $("#spnCountryNotes").show();
                        }
                    });

                }


                if ($scope.modcountry > 0 && ($scope.modproduct == '63' || $scope.modproduct == '128' || $scope.modproduct == '129')) {

                    Cityfactory.GetCityInfo($scope.modproduct, $scope.modregion, $scope.modcountry, 0, "0", 0, $rootScope.isIA, 1).success(function (data) {

                        if (data.d == null || data.d.length == 0) {
                            $('div.ddlDispCity').hide();
                        } else {
                            $('div.ddlDispCity').show();
                        }

                        if (data.d.length == 1) {
                            $scope.modCity = data.d[0].CityID;
                        }


                        $(".pageLoaderOverlay").hide();

                    });

                }
                else {
                    $(".pageLoaderOverlay").hide();
                }

            })
        .error(function (error) {
            //alert("Problem occured while loading Region " + JSON.stringify(error));
        });

    }

    //Getting City when Country is changed
    $scope.GetCities1 = function (ProductID, Region, Country, state, Speed) {
        $location.path('/');
        Speed = $scope.modSpeed

        if (angular.isUndefined(Speed)) {
            Speed = 0;
        }
        if (Speed == '') {
            Speed = 0;
        }

        //        if (ProductID == 72)
        //            Speed = 0;


        if (Country == null || Country == "" || angular.isUndefined(Country)) {
            Country = 0;
            $scope.Country1Note = 0;
        }

        if (Country > 0) {

            $("#spnCountry1").hide();

            //$("#spnCountry2").hide();
            // $("#spnCity2").hide();
            //$("#spnCity1").hide();

            $(".pageLoaderOverlay").show();

            Cityfactory.GetCityInfo(ProductID, Region, Country, state, "1", Speed, $rootScope.isIA, 1).success(function (data) {

                $scope.modCity1 = ''
                firstrec = 0;
                cityID = 0;
                CityNo = 0;

                if (data.d.length == 1 && Country > 0) {
                    $scope.modCity1 = data.d[0].CityID;
                    $("#spnCity1").hide();

                }


                if (($scope.modproduct > 0 && $scope.modproduct != '' && $scope.modproduct != null) && ($scope.modCountry1 != null && $scope.modCountry1 > 0 && $scope.modCountry1 != '')) {



                    $http.post('Search.aspx/GetRegion', { 'CountryID': $scope.modCountry1 })
            .success(function (data, status, headers, config) {

                $scope.modregion = data.d;

                CountryPriorityNotes.GetcntryNotes($scope.modproduct, $scope.modCountry1, $scope.modregion).success(function (data) {

                    $scope.Country1Note = data.d;
                    if (data.d >= "1") {
                        $("#spnCountryNotes1").show();
                    }
                });

            });


                }





                $(".pageLoaderOverlay").hide();
            });

            //        CountryBySpeedsfactory.GetCountriesBySpeeds($scope.modproduct, Country).success(function (data, status, headers, config) {
            //            $rootScope.CountryData = data.d;
            //        })
            //                        .error(function (error) {
            //                            // alert("Problem occured while loading Regions; " + error);
            //        });
        }
        else {

        }
    }

    //Getting City when Country is changed
    $scope.GetCities2 = function (ProductID, Region, Country, state, Speed) {
        $location.path('/');
        if (angular.isUndefined(Speed)) {
            Speed = 0;
        }
        if (Speed == '') {
            Speed = 0;
        }

        //        if (ProductID == 72)
        //            Speed = 0;



        if (Country == null || Country == "" || angular.isUndefined(Country)) {
            Country = 0;
            $scope.Country2Note = 0;
            $scope.modCity2 = '';
        }

        if (Country > 0) {

            $("#spnCountry2").hide();
            //$("#spnCountry1").hide();
            // $("#spnCity2").hide();
            // $("#spnCity1").hide();

            $(".pageLoaderOverlay").show();

            Cityfactory.GetCityInfo(ProductID, Region, Country, state, "2", Speed, $rootScope.isIA, 2).success(function (data) {

                firstrec = 0;
                cityID = 0;
                CityNo = 0;

                if (data.d.length == 1 && Country > 0) {
                    $scope.modCity2 = data.d[0].CityID;
                    $("#spnCity2").hide();
                }

                if (data.d.length > 1) {
                    CityNo = 0;
                }


                if (($scope.modproduct > 0 && $scope.modproduct != '' && $scope.modproduct != null) && ($scope.modCountry2 != null && $scope.modCountry2 > 0 && $scope.modCountry2 != '')) {

                    $http.post('Search.aspx/GetRegion', { 'CountryID': $scope.modCountry2 })
                        .success(function (data, status, headers, config) {

                            $scope.modregion = data.d;

                            CountryPriorityNotes.GetcntryNotes($scope.modproduct, $scope.modCountry2, $scope.modregion).success(function (data) {

                                $scope.Country2Note = data.d;
                                if (data.d >= "1") {
                                    $("#spnCountryNotes2").show();
                                }
                            });

                        });


                }



                $(".pageLoaderOverlay").hide();
            });

            //        CountryBySpeedsfactory.GetCountriesBySpeeds($scope.modproduct, Country).success(function (data, status, headers, config) {
            //            $rootScope.CountryData = data.d;
            //        })
            //                        .error(function (error) {
            //                            // alert("Problem occured while loading Regions; " + error);
            //                        });
        }
    }


    $scope.RemoveCityAlert1 = function () {

        $("#spnCity1").hide();

    }

    $scope.RemoveCityAlert2 = function () {

        $("#spnCity2").hide();

    }

    $scope.GetSpeeds2 = function (CountryID, City) {

        $("#spnCountry2").hide();
        $location.path('/');
        if (City == "" || City == null) {

            //$scope.modCountry2 = '';
            $(".pageLoaderOverlay").show();

            if (CountryID == '' || CountryID == null) {
                CountryID = 0;
            }

            Cityfactory.GetCityInfo($scope.modproduct, 0, CountryID, 0, "2", 0, $rootScope.isIA, 2).success(function (data) {

                $(".pageLoaderOverlay").attr("style", "display:none");
            });

            return;
        }

        Country1 = 0;
        if (angular.isUndefined($scope.modCountry1) || $scope.modCountry1 == '' || $scope.modCountry1 == null) {
            Country1 = 0;
        }
        else {
            Country1 = $scope.modCountry1;
        }
        City1 = 0;
        if (angular.isUndefined($scope.modCity1) || $scope.modCity1 == '' || $scope.modCity1 == null) {
            City1 = 0;
        }
        else {
            City1 = $scope.modCity1;
        }

        $(".pageLoaderOverlay").show();
        $("#spnCity2").hide();
        $("#spnCity1").hide();
        $("#spnCountry2").hide();
        $("#spnCountry1").hide();
        $("#spnCity2").hide();
        $("#spnCity1").hide();

        if (CountryID == "") {
            $http.post('Search.aspx/GetInfoByCity', { 'CityID': City, 'ProductID': $scope.modproduct })
            .success(function (data, status, headers, config) {

                $scope.modCountry2 = data.d.CountryID;
                CountryID = data.d.CountryID;

                Speedsfactory.GetSpeedInfo($scope.modproduct, Country1, City1, CountryID, City).success(function (data) {

                    $(".pageLoaderOverlay").attr("style", "display:none");
                });


                //                Cityfactory.GetCityInfo($scope.modproduct, $scope.modregion, CountryID, 0, "2", 0, $rootScope.isIA).success(function (data) {
                //                    $(".pageLoaderOverlay").attr("style", "display:none");
                //                });

            });
        }
        else {
            Speedsfactory.GetSpeedInfo($scope.modproduct, Country1, City1, CountryID, City).success(function (data) {
                $http.post('Search.aspx/GetInfoByCity', { 'CityID': City, 'ProductID': $scope.modproduct })
                .success(function (data, status, headers, config) {
                    $(".pageLoaderOverlay").attr("style", "display:none");
                    $scope.modCountry2 = data.d.CountryID;
                });
            });


        }

    }

    $scope.GetSpeeds1 = function (CountryID, City) {

        $("#spnCountry1").hide();
        $location.path('/');
        if (City == "" || City == null) {
            //$scope.modCountry2 = 0;
            //$scope.modCountry1 = '';
            $(".pageLoaderOverlay").show();
            if (CountryID == '' || CountryID == null) {
                CountryID = 0;
            }
            Cityfactory.GetCityInfo($scope.modproduct, 0, CountryID, 0, "1", 0, $rootScope.isIA, 1).success(function (data) {

                $(".pageLoaderOverlay").attr("style", "display:none");
            });


            return;
        }

        Country2 = 0;
        if (angular.isUndefined($scope.modCountry2) || $scope.modCountry2 == '' || $scope.modCountry2 == null) {
            Country2 = 0;
        }
        else {
            Country2 = $scope.modCountry2;
        }

        City2 = 0;
        if (angular.isUndefined($scope.modCity2) || $scope.modCity2 == '' || $scope.modCity2 == null) {
            City2 = 0;
        }
        else {
            City2 = $scope.modCity2;
        }
        $("#spnCity1").hide();
        $("#spnCity2").hide();
        $("#spnCountry2").hide();
        $("#spnCountry1").hide();
        $("#spnCity2").hide();
        $("#spnCity1").hide();
        $(".pageLoaderOverlay").show();

        if (CountryID == "" || CountryID == null) {
            $http.post('Search.aspx/GetInfoByCity', { 'CityID': City, 'ProductID': $scope.modproduct })
            .success(function (data, status, headers, config) {

                $scope.modCountry1 = data.d.CountryID;
                CountryID = data.d.CountryID;
                Speedsfactory.GetSpeedInfo($scope.modproduct, CountryID, City, Country2, City2).success(function (data) {
                    $(".pageLoaderOverlay").attr("style", "display:none");
                });

                //                Cityfactory.GetCityInfo($scope.modproduct, $scope.modregion, CountryID, 0, "1", 0, $rootScope.isIA).success(function (data) {
                //                    $(".pageLoaderOverlay").attr("style", "display:none");
                //                });

            });
        }
        else {
            Speedsfactory.GetSpeedInfo($scope.modproduct, CountryID, City, Country2, City2).success(function (data) {


                $http.post('Search.aspx/GetInfoByCity', { 'CityID': City, 'ProductID': $scope.modproduct })
                .success(function (data, status, headers, config) {

                    $scope.modCountry1 = data.d.CountryID;
                    $(".pageLoaderOverlay").attr("style", "display:none");
                });

            });
        }



    }

    $scope.GetCitiesBySpeed = function (ProductID, Country, Speed) {

        if (Speed == null || Speed == '' || angular.isUndefined(Speed)) {

            $scope.modCountry1 = '';
            $scope.modCountry2 = '';
            $scope.modCity1 = '';
            $scope.modCity2 = '';

            $(".pageLoaderOverlay").show();
            Countryfactory.GetCountries(ProductID, 0, 0
                , $scope.AccessLevel, $scope.BtGfrCodes, $scope.SegregationCodes, $scope.User_Id).success(function (data) {

                });

            Cityfactory.GetCityInfo(ProductID, 0, 0, 0, "3", 0, $rootScope.isIA, 0).success(function (data) {

                City1Data = 1;
                $(".pageLoaderOverlay").attr("style", "display:none");


            });

        }
        else {

            $(".pageLoaderOverlay").show();
            $("#spnSpeed").hide();
            $("#spnCity1").hide();
            $("#spnCity2").hide();
            $("#spnCountry2").hide();
            $("#spnCountry1").hide();
            $("#spnCity2").hide();
            $("#spnCity1").hide();
            Countryfactory.GetCountries($scope.modproduct, 0, Speed
                , $scope.AccessLevel, $scope.BtGfrCodes, $scope.SegregationCodes, $scope.User_Id).success(function (data) {

                    if (data.d.length == 1) {
                        $scope.modCountry1 = data.d[0].CountryID;
                        $scope.modCountry2 = data.d[0].CountryID;
                    }
                });

            //$scope.modCity1 = '';
            //$scope.modCountry1 = '';
            Country1 = 0;
            var City1Data = 0;
            var City2Data = 0;
            if (angular.isUndefined($scope.modCountry1) || $scope.modCountry1 == '' || $scope.modCountry1 == null) {
                Country1 = 0;
            }
            else {
                Country1 = $scope.modCountry1;
            }

            Cityfactory.GetCityInfo(ProductID, 0, Country1, 0, "1", Speed, $rootScope.isIA, 1).success(function (data) {

                firstrec = 0;
                cityID = 0;

                if (data.d.length == 1) {
                    $scope.modCity1 = data.d[0].CityID;

                    $http.post('Search.aspx/GetInfoByCity', { 'CityID': $scope.modCity1, 'ProductID': $scope.modproduct })
                    .success(function (data, status, headers, config) {

                        $scope.modCountry1 = data.d.CountryID;
                    });

                }
                City1Data = 1;
                if (City1Data == 1 && City2Data == 1) {
                    $(".pageLoaderOverlay").hide();
                }
            });



            var Country2 = 0;

            if (angular.isUndefined($scope.modCountry2) || $scope.modCountry2 == '' || $scope.modCountry2 == null) {
                Country2 = 0;
            }
            else {
                Country2 = $scope.modCountry2;
            }

            Cityfactory.GetCityInfo(ProductID, 0, Country2, 0, "2", Speed, $rootScope.isIA, 0).success(function (data) {

                firstrec = 0;

                if (data.d.length == 1) {
                    $scope.modCity2 = data.d[0].CityID;
                    $http.post('Search.aspx/GetInfoByCity', { 'CityID': $scope.modCity2, 'ProductID': $scope.modproduct })
                    .success(function (data, status, headers, config) {

                        $scope.modCountry2 = data.d.CountryID;
                    });
                }

                City2Data = 1;
                if (City1Data == 1 && City2Data == 1) {
                    $(".pageLoaderOverlay").hide();
                }
            });

        }
    }



    $scope.GetRegionsBySpeed = function (ProductID, Country, Speed) {

        $location.path('/');

        if (Speed == null || Speed == '' || angular.isUndefined(Speed)) {

            $scope.modCountry1 = '';
            $scope.modCountry2 = '';
            $scope.modCity1 = '';
            $scope.modCity2 = '';

            $(".pageLoaderOverlay").show();
            Countryfactory.GetCountries(ProductID, 0, 0
                , $scope.AccessLevel, $scope.BtGfrCodes, $scope.SegregationCodes, $scope.User_Id).success(function (data) {
                    $(".pageLoaderOverlay").attr("style", "display:none");
                });

            //            Cityfactory.GetCityInfo(ProductID, 0, 0, 0, "3", 0, $rootScope.isIA).success(function (data) {

            //                City1Data = 1;
            //                $(".pageLoaderOverlay").attr("style", "display:none");


            //            });

        }
        else {
            
            $(".pageLoaderOverlay").show();
            $("#spnSpeed").hide();
            //            $("#spnCity1").hide();
            //            $("#spnCity2").hide();
            //            $("#spnCountry2").hide();
            //            $("#spnCountry1").hide();
            //            $("#spnCity2").hide();
            //            $("#spnCity1").hide();

            var City1Loaded = 0;
            var City2Loaded = 0;
            var CountryLoaded = 0;
            $("#spnCity2").hide();
            $("#spnCity1").hide();
            Countryfactory.GetCountries($scope.modproduct, 0, Speed
                , $scope.AccessLevel, $scope.BtGfrCodes, $scope.SegregationCodes, $scope.User_Id).success(function (data) {

                    if (data.d.length == 1) {
                        $scope.modCountry1 = data.d[0].CountryID;
                        $scope.modCountry2 = data.d[0].CountryID;
                        City1Loaded = 0;

                        Cityfactory.GetCityInfo($scope.modproduct, 0, data.d[0].CountryID, 0, "1", Speed, $rootScope.isIA, 1).success(function (data) {

                            firstrec = 0;
                            cityID = 0;
                            City1Loaded = 1;
                            if (data.d.length == 1) {
                                $scope.modCity1 = data.d[0].CityID;

                            }
                            City1Data = 1;
                            if (City1Loaded == 1 && City2Loaded == 1 && CountryLoaded == 1) {
                                $(".pageLoaderOverlay").hide();
                            }
                        });

                        Cityfactory.GetCityInfo($scope.modproduct, 0, data.d[0].CountryID, 0, "2", Speed, $rootScope.isIA, 2).success(function (data) {

                            firstrec = 0;
                            cityID = 0;
                            City1Loaded = 1;
                            if (data.d.length == 1) {
                                $scope.modCity2 = data.d[0].CityID;
                            }
                            City1Data = 1;
                            if (City1Loaded == 1 && City2Loaded == 1 && CountryLoaded == 1) {
                                $(".pageLoaderOverlay").hide();
                            }
                        });

                    }
                    CountryLoaded = 1;
                    if (City1Loaded == 1 && City2Loaded == 1 && CountryLoaded == 1) {
                        $(".pageLoaderOverlay").hide();
                    }

                });

            //$scope.modCity1 = '';
            //$scope.modCountry1 = '';
            Country1 = 0;
            var City1Data = 0;
            var City2Data = 0;
            if (angular.isUndefined($scope.modCountry1) || $scope.modCountry1 == '' || $scope.modCountry1 == null) {
                Country1 = 0;
            }
            else {
                Country1 = $scope.modCountry1;
            }

            if (Country1 > 0) {
                Cityfactory.GetCityInfo(ProductID, 0, Country1, 0, "1", Speed, $rootScope.isIA, 1).success(function (data) {

                    firstrec = 0;
                    cityID = 0;
                    City1Loaded = 1;
                    if (data.d.length == 1) {
                        $scope.modCity1 = data.d[0].CityID;

                    }
                    City1Data = 1;
                    if (City1Loaded == 1 && City2Loaded == 1 && CountryLoaded == 1) {
                        $(".pageLoaderOverlay").hide();
                    }
                });

            }
            else {

                City1Loaded = 1;
                if (City1Loaded == 1 && City2Loaded == 1 && CountryLoaded == 1) {
                    $(".pageLoaderOverlay").hide();
                }
            }

            var Country2 = 0;

            if (angular.isUndefined($scope.modCountry2) || $scope.modCountry2 == '' || $scope.modCountry2 == null) {
                Country2 = 0;
            }
            else {
                Country2 = $scope.modCountry2;
            }

            if (Country2 > 0) {

                Cityfactory.GetCityInfo(ProductID, 0, Country2, 0, "2", Speed, $rootScope.isIA, 2).success(function (data) {

                    firstrec = 0;
                    City2Loaded = 1;
                    if (data.d.length == 1) {
                        $scope.modCity2 = data.d[0].CityID;
                        //                            $http.post('Search.aspx/GetInfoByCity', { 'CityID': $scope.modCity2, 'ProductID': $scope.modproduct })
                        //                        .success(function (data, status, headers, config) {

                        //                            $scope.modCountry2 = data.d.CountryID;
                        //                        });
                    }

                    City2Data = 1;
                    if (City1Loaded == 1 && City2Loaded == 1 && CountryLoaded == 1) {
                        $(".pageLoaderOverlay").hide();
                    }
                });
            }
            else {
                City2Loaded = 1;

                if (City1Loaded == 1 && City2Loaded == 1 && CountryLoaded == 1) {
                    $(".pageLoaderOverlay").hide();
                }
            }
        }
    }

    $scope.GetCaseDetails = function () {

        //
        var ProductSelected = 0;
        var CountrySelected = 0;
        var CitySelected = 0;

        if ($scope.modproduct == 0 || $scope.modproduct == '' || $scope.modproduct == null) {
            $("#ValidateProduct").show();
            //return;
            ProductSelected = 0;
        }
        else {
            $("#ValidateProduct").hide();
            ProductSelected = 1;
        }

        if ($scope.modproduct != "58" && $scope.modproduct != '72') {

            if ($scope.modcountry == 0 || $scope.modcountry == '' || $scope.modcountry == null) {
                $("#ValidateCountry").show();
                //return;
                CountrySelected = 0;
            }
            else {
                $("#ValidateCountry").hide();
                CountrySelected = 1;
            }
        }
        else {
            $("#ValidateCountry").hide();
            CountrySelected = 1;
        }


        if (($scope.modproduct == "63" || $scope.modproduct == "128" || $scope.modproduct == "129")
         && (angular.isUndefined($scope.modCity) || $scope.modCity == "" || $scope.modCity == 0 || $scope.modCity == null)) {
            $("#ValidateCity").show();
            //return;
            CitySelected = 0;
        }
        else {
            $("#ValidateCity").hide();
            CitySelected = 1;
        }

        if ($scope.modproduct == 63 || $scope.modproduct == 128 || $scope.modproduct == 129) {

        } else { $scope.modCity = 0; }

        if ($scope.modproduct != "58" && $scope.modproduct != '72') {
            if (($scope.modproduct == "63" || $scope.modproduct == "128" || $scope.modproduct == "129")
         && (angular.isUndefined($scope.modCity) || $scope.modCity == "" || $scope.modCity == 0 || $scope.modCity == null)) {
                if (ProductSelected == 0 || CountrySelected == 0 || CitySelected == 0) {
                    return;
                }
            }
            else {
                if (ProductSelected == 0 || CountrySelected == 0) {
                    return;
                }
            }
        }

        glbProductID.setProductID($scope.modproduct);
        glbRegionID.setRegionID($scope.modregion);
        glbCountryID.setCountryID($scope.modcountry);
        glbCityID.setCityID($scope.modCity);
        var prodName = $("#prodname option:selected").text();
        glbProductID.setProductName(prodName);
        $(".pageLoaderOverlay").show();
        //getSegmentCount
        $rootScope.segmentCount = 1;
        glbProductID.getSegmentCount($rootScope.sAccess_Level, $rootScope.BtGfrCodes, $rootScope.SegregationCodes, $scope.modproduct)
            .success(function (data) {
                $rootScope.segmentCount = data.d;
            });



        //to get subproduct count
        glbProductID.getSubProductCount($scope.modproduct).success(function (data) {
            $rootScope.subproductCount = data.d;

            if ($scope.modproduct == "58" || $scope.modproduct == '72') {

                var SpeedSelected = 0, Country1Selected = 0, Country2Selected = 0, City1Selected = 0, City2Selected = 0;

                if ($scope.modSpeed == 0 || $scope.modSpeed == '' || $scope.modSpeed == null) {
                    $("#spnSpeed").show();
                    // return;
                    SpeedSelected = 0;
                }
                else {
                    $("#spnSpeed").hide();
                    SpeedSelected = 1;
                }

                if ($scope.modCountry1 == 0 || $scope.modCountry1 == '' || $scope.modCountry1 == null) {
                    $("#spnCountry1").show();
                    //return;
                    Country1Selected = 0;
                }
                else {
                    $("#spnCountry1").hide();
                    Country1Selected = 1;
                }

                if ($scope.modCountry2 == 0 || $scope.modCountry2 == '' || $scope.modCountry2 == null) {
                    $("#spnCountry2").show();
                    //return;
                    Country2Selected = 0;
                }
                else {
                    $("#spnCountry2").hide();
                    Country2Selected = 1;
                }
                if ($scope.modCountry1 > 0) {
                    if ($scope.modCity1 == 0 || $scope.modCity1 == '' || $scope.modCity1 == null) {
                        $("#spnCity1").show();
                        // return;
                        City1Selected = 0;
                    }
                    else {
                        $("#spnCity1").hide();
                        City1Selected = 1;
                    }
                }
                else {
                    City1Selected = 0;
                }
                if ($scope.modCountry2 > 0) {
                    if ($scope.modCity2 == 0 || $scope.modCity2 == '' || $scope.modCity2 == null) {
                        $("#spnCity2").show();
                        // return;
                        City2Selected = 0;
                    }
                    else {
                        $("#spnCity2").hide();
                        City2Selected = 1;
                    }
                }
                else {
                    City2Selected = 0;
                }
                if (SpeedSelected == 0 || Country1Selected == 0 || Country2Selected == 0 || City1Selected == 0 || City2Selected == 0) {
                    return;
                }

                glbCity1.setCity($scope.modCity1);
                glbCity2.setCity($scope.modCity2);


                var Country1 = $scope.modCountry1;
                var Country1Name = $("#ddlCountry1 option:selected").html();

                var Country2 = $scope.modCountry2;
                var Country2Name = $("#ddlCountry2 option:selected").html();

                var City1Name = $("#ddlCity1 option:selected").html();

                var City2Name = $("#ddlCity2 option:selected").html();

                var Speed = $("#ddlSpeed option:selected").html();

                glbSpeed.setSpeed($scope.modSpeed);
                glbSpeed.setSpeedName(Speed);

                glbCountry1.setCountryName(Country1Name);
                glbCountry1.setCountryID($scope.modCountry1);

                glbCountry2.setCountryName(Country2Name);
                glbCountry2.setCountryID($scope.modCountry2);

                glbCity1.setCityName(City1Name);
                glbCity2.setCityName(City2Name);

                if ($scope.modproduct == '72') {
                    if (Country1 == Country2 && City1Name == City2Name) {
                        alert("Same Pop to Pop solution is processed through Special bid.");
                        return;
                    }
                }

                $location.path('/PrivateLine');
            }
            else if ($scope.modproduct == "63") {
                $location.path('/BTCPEProduct');
            }
            else if ($scope.modproduct == "25") {
                $location.path('/Access');
            }
            else if ($scope.modproduct == "123" || $scope.modproduct == "124") {
                $location.path('/IPConnect');
            }

            else if ($scope.modproduct == "79" || $scope.modproduct == "108") {
                $location.path('/BTOneVoice');
            }
            else if ($rootScope.subproductCount > 0) {//($scope.modproduct == "11" || $scope.modproduct == "14" || $scope.modproduct == "15" || $scope.modproduct == "31" || $scope.modproduct == "62") {
                $location.path('/subproduct');
            }
            else if ($scope.modproduct == "102" || $scope.modproduct == "103" || $scope.modproduct == "104" || $scope.modproduct == "125" ||
                 $scope.modproduct == "101" || $scope.modproduct == "32" || $scope.modproduct == "128" || $scope.modproduct == "129" ||
                  $scope.modproduct == "30" || $scope.modproduct == "67" || $scope.modproduct == "105" || $scope.modproduct == "116" ||
                  $scope.modproduct == "117" || $scope.modproduct == "118" || $scope.modproduct == "119" || $scope.modproduct == "122" || $scope.modproduct == "16") {
                //productID forBT MobileXpress Mobile IPsec VPN is 102
                //productID for BT WAS is 103
                //productID for Connect Intelligence is 125
                //productID for BT MFS is BT 104
                //productID for BT GS Portfolio Database is 101
                //productID for Assure Manage Device is  128
                //productID for Generic CPE is  129
                //productID for BT IP Sec is  32
                //productID for BT messagescan is  32
                //
                $location.path('/leveltwoProduct');

                $location.path('/leveltwoProduct');
            }
            else {
                $location.path('/ProductCase');
            }
        });

    }



    $scope.resetForm = function () {
        $(".pageLoaderOverlay").show();
        $scope.modproduct = 0;
        $scope.modregion = 0;
        $scope.modcountry = 0;
        countrySelected = 0;
        RegionSelected = 0;
        $scope.modCity = '';
        $scope.modSpeed = '';
        $scope.modCountry1 = '';
        $scope.modCountry2 = '';
        speed = 0;
        RegionData = 0;
        CountryData = 0;
        StateData = 0;
        CityData = 0;
        POPData = 0;
        $scope.ProductNote = 0;
        $scope.CountryNote = 0;
        $scope.Country1Note = 0;
        $scope.Country2Note = 0;
        $scope.RegionNote = 0;
        $rootScope.isIA = 0;
        $('div.ddlDispCity').hide();
        $("#ValidateCountry").hide();
        $("#ValidateCity").hide();
        $("#ValidateProduct").hide();
        $("#ValidateCountry").hide();
        $("#spnCountry1").hide();
        $("#spnCountry2").hide();
        $("#spnSpeed").hide();
        $("#ddlreg").prop("disabled", false);
        $("#ddlcountry").prop("disabled", false);
        $('.sc_search').prop("disabled", false);
        $('#oprodname').hide();
        $('#prodname').show();
        Productsfactory.GetProducts($scope.modcountry, $scope.AccessLevel, $scope.BtGfrCodes, $scope.SegregationCodes, $scope.User_Id);

        //Getting Regions
        Regionsfactory.GetRegions($scope.modproduct);

        //Getting Countries
        Countryfactory.GetCountries($scope.modproduct, $scope.modregion, 0, $scope.AccessLevel, $scope.BtGfrCodes, $scope.SegregationCodes, $scope.User_Id).success(function (data) {

            $(".pageLoaderOverlay").hide();
        });
        $location.path('/');
    }




    $scope.$on('onvoicecall', function (event, args) {

        $('#prodname').hide();
        $scope.OnevoiceName = args.product.ProductName;
        $scope.modproduct = args.product.ProductID;
        glbProductID.setProductName($scope.OnevoiceName);
        $rootScope.isIA = args.product.isIA;

        $('#oprodname').show();
        $('#oprodname').prop("disabled", true);
        $("#ddlreg").prop("disabled", true);
        $("#ddlcountry").prop("disabled", true);
        $('.sc_search').prop("disabled", true);


        ProductNotes.GetProductNotes($scope.modproduct).success(function (data) {

            $scope.ProductNote = data.d;
            if (data.d == "1") {
                $("#spnProductNotes").show();
            }

        });

        RegionPriorityNotes.GetRegNotes($scope.modproduct, $scope.modregion).success(function (data) {

            $scope.RegionNote = data.d;
            if (data.d == "1") {
                $("#spnRegionNotes").show();
            } else { $("#spnRegionNotes").hide(); }
        });
        CountryPriorityNotes.GetcntryNotes($scope.modproduct, $scope.modcountry, $scope.modregion).success(function (data) {

            $scope.CountryNote = data.d;
            if (data.d == "1") {
                $("#spnCountryNotes").show();
            } else { $("#spnCountryNotes").hide(); }
        });


        glbCountryProductFlag.setOneVoiceFlag("1");

        if (!angular.isUndefined($scope.modcountry) && $scope.modcountry != null && $scope.modcountry != '' && $scope.modcountry > 0) {

            $http.post('Search.aspx/GetRegionDetailsByCountryIDProduct', { 'ProductID': $scope.modproduct, 'CountryID': $scope.modcountry }).success(function (data) {
                if (data.d == 0) {
                    $(".pageLoaderOverlay").attr("style", "display:none");
                    alert("No cases exist for the selection made. The page will now refresh.");
                    $scope.resetForm();
                    return;
                }
            });
        }


        $scope.GetCaseDetails();

    });


    $scope.openProductNotes = function () {

        if ($scope.modproduct == '') { return; }
        var prodName = $("#prodname option:selected").text();
        glbProductID.setProductID($scope.modproduct);
        glbCountryProductFlag.setFlag("1");
        glbProductID.setProductName(prodName);
        if (glbCountryProductFlag.getOneVoiceFlag() == "1") {
            glbProductID.setProductName($scope.OnevoiceName);
        }
        $modal.open({
            templateUrl: 'Search/Notes.htm'
        });
    }

    $scope.openCountryNotes = function (flag) {

        if ($scope.modproduct == '') { return; }

        if (flag == 1) {
            glbCountryID.setCountryID($scope.modCountry1);
            var CountryName1 = $("#ddlCountry1 option:selected").text();
            glbCountryID.setCountryName(CountryName1);

        }

        if (flag == 2) {
            glbCountryID.setCountryID($scope.modCountry2);
            var CountryName2 = $("#ddlCountry2 option:selected").text();
            glbCountryID.setCountryName(CountryName2);

        }
        if (flag == 0) {
            glbCountryID.setCountryID($scope.modcountry);
            var CountryName = $("#ddlcountry option:selected").text();
            glbCountryID.setCountryName(CountryName);

        }

        glbProductID.setProductID($scope.modproduct);
        glbRegionID.setRegionID($scope.modregion);

        glbCountryProductFlag.setFlag("0");
        var prodName = $("#prodname option:selected").text();
        var RegionName = $("#ddlreg option:selected").text();


        glbProductID.setProductName(prodName);
        glbRegionID.setRegionName(RegionName);


        if (glbCountryProductFlag.getOneVoiceFlag() == "1") {
            glbProductID.setProductName($scope.OnevoiceName);
        }
        $modal.open({
            templateUrl: 'Search/Notes.htm'
        });

    }



    $scope.openRegionNotes = function () {

        if ($scope.modproduct == '') { return; }

        glbProductID.setProductID($scope.modproduct);
        glbRegionID.setRegionID($scope.modregion);

        glbCountryProductFlag.setFlag("2");
        var prodName = $("#prodname option:selected").text();
        var RegionName = $("#ddlreg option:selected").text();


        glbProductID.setProductName(prodName);
        glbRegionID.setRegionName(RegionName);

        if (glbCountryProductFlag.getOneVoiceFlag() == "1") {
            glbProductID.setProductName($scope.OnevoiceName);
        }

        $modal.open({
            templateUrl: 'Search/Notes.htm'
        });

    }



});


app.service("glbCountryProductFlag", function () {
    var flag = "";
    var ISOneVoice = "";
    return {
        getFlag: function () {
            return flag;
        },
        setFlag: function (value) {
            flag = value;
        },
        getOneVoiceFlag: function () {
            return ISOneVoice;
        },
        setOneVoiceFlag: function (value) {
            ISOneVoice = value;
        }
    }
});


