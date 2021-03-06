﻿
var app = angular.module('app1', ['ngTable']);




//app.run(function ($http, CacheFactory) {
//    $http.defaults.cache = CacheFactory('defaultCache', {
//        maxAge: 15 * 60 * 1000, // Items added to this cache expire after 15 minutes
//        cacheFlushInterval: 60 * 60 * 1000, // This cache will clear itself every hour
//        deleteOnExpire: 'aggressive' // Items will be deleted from this cache when they expire
//    });
//});

//app.service('MyService', function ($http, $q) {
//    return {
//        getDataById: function (id) {
//            var deferred = $q.defer();
//            var start = new Date().getTime();

//            $http.get('api/data/' + id, {
//                cache: true
//            }).success(function (data) {
//                console.log('time taken for request: ' + (new Date().getTime() - start) + 'ms');
//                deferred.resolve(data);
//            });
//            return deferred.promise;
//        }
//    };
//});



app.factory('DistributorListFactory', function ($http) {

    var DistributorListFactory = {};

    DistributorListFactory.GetDistributors = function (Distributer) {

        return $http.post('SupplierRestriction.aspx/GetDistributorLstDetails', { 'Distributer': Distributer });

    }

    return DistributorListFactory;
});

app.factory('CountryListFactory', function ($http) {

    var CountryListFactory = {};

    CountryListFactory.GetCountry = function (Country) {

        return $http.post('SupplierRestriction.aspx/GetCountryLstDetails', { 'Country': Country });

    }

    return CountryListFactory;
});

app.factory('SupplierListFactory', function ($http) {

    var SupplierListFactory = {};

    SupplierListFactory.GetSupplier = function (Supplier) {

        return $http.post('SupplierRestriction.aspx/GetSupplierLstDetails', { 'Supplier': Supplier });

    }

    return SupplierListFactory;
});

app.factory('DistributorGridFactory', function ($http) {

    var DistributorGridFactory = {};

    DistributorGridFactory.GetDistributorsGrid = function (Distributer) {
        $(".pageLoaderOverlay").show();
        return $http.post('SupplierRestriction.aspx/GetSupplierGridDetails', { 'Distributer': Distributer });

    }

    return DistributorGridFactory;
});

app.factory('detailsInfo', function ($http) {
    var detailsInfo = {};
    detailsInfo.GetValue = function (btnvalue, DistributerValues, CountryValues, SupplierValues, tab) {
        $(".pageLoaderOverlay").show();
        return $http.post('SupplierRestriction.aspx/PostBGFROrg', { 'btnvalue': btnvalue, 'DistributerValues': DistributerValues, 'CountryValues': CountryValues, 'SupplierValues': SupplierValues, 'tab': tab });
    }
    return detailsInfo;
});

app.factory('deletedetailsInfo', function ($http) {
    var deletedetailsInfo = {};
    deletedetailsInfo.removeRow = function (btnvalue, DistributerValues, CountryValues, SupplierValues, tab) {
        $(".pageLoaderOverlay").show();
        return $http.post('SupplierRestriction.aspx/DeleteBGFROrg', { 'btnvalue': btnvalue, 'DistributerValues': DistributerValues, 'CountryValues': CountryValues, 'SupplierValues': SupplierValues, 'tab': tab });
    }
    return deletedetailsInfo;
});


app.controller('tableController', function ($scope, $filter, ngTableParams, DistributorListFactory, CountryListFactory, SupplierListFactory, DistributorGridFactory, detailsInfo, deletedetailsInfo) {
    $(".pageLoaderOverlay").show();

    var btnvalue = "", CountryValues = "", DistributerValues = "", SupplierValues = "", distributorids = "", countryids = "", supplierids = "";





















    //    MyService.GetDistributorsGrid("Distributor").then(function (data) {
    //            // e.g. "time taken for request: 2375ms"
    //            // Data returned by this next call is already cached.
    //        return MyService.GetDistributorsGrid("Distributor").then(function (data) {
    //                // e.g. "time taken for request: 1ms"
    //            });
    //        });
    //    

    $scope.GetValue = function () {
        tab = "Distributor";

        CountryValues = "";
        DistributerValues = "";
        SupplierValues = "";
        var btnvalue = $('Save').selector;
        if ($scope.Country == undefined || $scope.Distributer == undefined || $scope.Supplier == undefined) {

            bootbox.alert({
                "message": "Please Select atleast one item in all Listbox and click on Save",
                "className": "my-custom-class",
                "callback": function () {
                    console.log("Success callback");
                }
            });
            return false;
        }
        CountryValues = $scope.Country.join(',');
        DistributerValues = $scope.Distributer.join(',');
        SupplierValues = $scope.Supplier.join(',');






        detailsInfo.GetValue(btnvalue, DistributerValues, CountryValues, SupplierValues, tab).success(function (data) {
            bootbox.alert({
                "message": data.d + "Restriction(s) have been added",
                "className": "my-custom-class",
                "callback": function () {
                    console.log("Success callback");
                }
            });

           
                DistributorGridFactory.GetDistributorsGrid("Distributor").success(function (data) {
                    $(".pageLoaderOverlay").hide();
                    $scope.DistributerGrid = data.d;


                    $scope.usersTable = new ngTableParams({
                        page: 1,
                        count: 10
                    }, {
                        total: $scope.DistributerGrid.length,
                        getData: function ($defer, params) {
                            $scope.data = params.sorting() ? $filter('orderBy')($scope.DistributerGrid, params.orderBy()) : $scope.DistributerGrid;
                            $scope.data = params.filter() ? $filter('filter')($scope.data, params.filter()) : $scope.data;
                            if ($scope.data.length == 0) {
                                $("#Inactiveid").show();
                                $("#activeid").hide();
                            }
                            else {
                                $("#Inactiveid").hide();
                                $("#activeid").show();
                            }
                            $scope.data = $scope.data.slice((params.page() - 1) * params.count(), params.page() * params.count());
                            $defer.resolve($scope.data);
                        }
                    });
                })
        .error(function (error) {
            alert(error);
            alert("Problem occured while loading Speed Info; " + JSON.stringify(error));
        });
            

        })
        .error(function (error) {
            alert("Problem occured while loading States; " + error);
        });

    };








    $scope.resetDropDown = function () {
        if (angular.isDefined($scope.DistributerList)) {
            delete $scope.Distributer;
        }
        if (angular.isDefined($scope.CountryList)) {
            delete $scope.Country;
        }
        if (angular.isDefined($scope.SupplierList)) {
            delete $scope.Supplier;
        }
    }


    $scope.removeRow = function () {
        DistributerValues = "";
        countryids = "";
        supplierids = "";
        var index = -1;
        tab = "Distributor"
        var comArr = eval($scope.data);
        btnvalue = $(Deletebtn)[0].defaultValue;

        for (var i = 0; i < comArr.length; i++) {
            if ($(chekid)[i].checked == true) {
                DistributerValues += $scope.data[i].DistributorId + ",";
                countryids += $scope.data[i].countryid + ",";
                supplierids += $scope.data[i].supplierid + ",";
            }
        }
        if (DistributerValues == "" || countryids == "" || supplierids == "") {
            bootbox.alert({
                "message": "Please select atleast one checkbox",
                "className": "my-custom-class",
                "callback": function () {
                    console.log("Success callback");
                }
            });
            return false;
        }
        DistributerValues = DistributerValues.slice(0, -1);
        countryids = countryids.slice(0, -1);
        supplierids = supplierids.slice(0, -1);

        // return  { 'btn$http.post('SupplierRestriction.aspx/SaveAndDelete',Value': btnvalue, 'DistributorIds': distributorids, 'Countryids': countryids, 'supplierids': supplierids });
        bootbox.confirm({
            "className": "my-custom-class",
            message: "Do you really want to delete these records?",
            callback: function (result) {
                if (result) {
                    deletedetailsInfo.removeRow(btnvalue, DistributerValues, countryids, supplierids, tab).success(function (data) {
                       
                        bootbox.alert({
                            "message": data.d + "Restriction(s) have been deleted",
                            "className": "my-custom-class",
                            "callback": function () {
                                console.log("Success callback");
                            }
                        });



                        DistributorGridFactory.GetDistributorsGrid("Distributor").success(function (data) {
                            $(".pageLoaderOverlay").hide();
                            $scope.DistributerGrid = data.d;


                            $scope.usersTable = new ngTableParams({
                                page: 1,
                                count: 10
                            }, {
                                total: $scope.DistributerGrid.length,
                                getData: function ($defer, params) {
                                    $scope.data = params.sorting() ? $filter('orderBy')($scope.DistributerGrid, params.orderBy()) : $scope.DistributerGrid;
                                    $scope.data = params.filter() ? $filter('filter')($scope.data, params.filter()) : $scope.data;
                                    if ($scope.data.length == 0) {
                                        $("#Inactiveid").show();
                                        $("#activeid").hide();
                                    }
                                    else {
                                        $("#Inactiveid").hide();
                                        $("#activeid").show();
                                    }
                                    $scope.data = $scope.data.slice((params.page() - 1) * params.count(), params.page() * params.count());
                                    $defer.resolve($scope.data);
                                }
                            });
                        })
        .error(function (error) {
            alert(error);
            alert("Problem occured while loading Speed Info; " + JSON.stringify(error));
        });




                    }).error(function (error) {
                        alert("Problem occured while loading States; " + error);
                    });
                };
            }
        });
    }

    DistributorListFactory.GetDistributors("Distributor").success(function (data) {

        $scope.DistributerList = data.d;
    })
        .error(function (error) {
            alert(error);
            alert("Problem occured while loading Speed Info; " + JSON.stringify(error));
        });

    CountryListFactory.GetCountry("Country").success(function (data) {

        $scope.CountryList = data.d;
    })
        .error(function (error) {
            alert(error);
            alert("Problem occured while loading Speed Info; " + JSON.stringify(error));
        });

    SupplierListFactory.GetSupplier("Supplier").success(function (data) {

        $scope.SupplierList = data.d;
    })
        .error(function (error) {
            alert(error);
            alert("Problem occured while loading Speed Info; " + JSON.stringify(error));
        });




    DistributorGridFactory.GetDistributorsGrid("Distributor").success(function (data) {
        $(".pageLoaderOverlay").hide();
        $scope.DistributerGrid = data.d;
        if ($scope.DistributerGrid.length == 0) {
            $("#Inactiveid").show();
            $("#activeid").hide();
        }
        else {
            $("#Inactiveid").hide();
            $("#activeid").show();
        }

        $scope.usersTable = new ngTableParams({
            page: 1,
            count: 10
        }, {
            total: $scope.DistributerGrid.length,
            getData: function ($defer, params) {

                $scope.data = params.sorting() ? $filter('orderBy')($scope.DistributerGrid, params.orderBy()) : $scope.DistributerGrid;
                $scope.data = params.filter() ? $filter('filter')($scope.data, params.filter()) : $scope.data;
                if ($scope.data.length == 0) {
                    $("#Inactiveid").show();
                    $("#activeid").hide();
                }
                else {
                    $("#Inactiveid").hide();
                    $("#activeid").show();
                }
                $scope.data = $scope.data.slice((params.page() - 1) * params.count(), params.page() * params.count());
                $defer.resolve($scope.data);
            }
        });



    })
        .error(function (error) {
            alert(error);
            alert("Problem occured while loading Speed Info; " + JSON.stringify(error));
        });




});







//BTGFR








app.factory('BTGFRListFactory', function ($http) {

    var BTGFRListFactory = {};

    BTGFRListFactory.GetBTGFR = function (Distributer) {

        return $http.post('SupplierRestriction.aspx/GetBTGFRLstDetails', { 'Distributer': Distributer });

    }

    return BTGFRListFactory;
});

app.factory('CountryListFactory', function ($http) {

    var CountryListFactory = {};

    CountryListFactory.GetCountry = function (Country) {

        return $http.post('SupplierRestriction.aspx/GetCountryLstDetails', { 'Country': Country });

    }

    return CountryListFactory;
});

app.factory('SupplierListFactory', function ($http) {

    var SupplierListFactory = {};

    SupplierListFactory.GetSupplier = function (Supplier) {

        return $http.post('SupplierRestriction.aspx/GetSupplierLstDetails', { 'Supplier': Supplier });

    }

    return SupplierListFactory;
});

app.factory('BTGFRGridFactory', function ($http) {

    var BTGFRGridFactory = {};

    BTGFRGridFactory.GetBTGFRGrid = function (Distributer) {
        $(".pageLoaderOverlay").show();
        return $http.post('SupplierRestriction.aspx/GetBTGFRGridDetails', { 'Distributer': Distributer });

    }

    return BTGFRGridFactory;
});


app.factory('detailsInfoBTGFR', function ($http) {
    var detailsInfoBTGFR = {};
    detailsInfoBTGFR.GetValue = function (btnvalue, DistributerValues, CountryValues, SupplierValues, tab) {
        $(".pageLoaderOverlay").show();
        return $http.post('SupplierRestriction.aspx/PostBGFROrg', { 'btnvalue': btnvalue, 'DistributerValues': DistributerValues, 'CountryValues': CountryValues, 'SupplierValues': SupplierValues, 'tab': tab })
    }
    return detailsInfoBTGFR;
});

app.factory('deletedetailsInfoBTGFR', function ($http) {
    var deletedetailsInfoBTGFR = {};
    deletedetailsInfoBTGFR.removeRow = function (btnvalue, DistributerValues, CountryValues, SupplierValues, tab) {
        $(".pageLoaderOverlay").show();
        return $http.post('SupplierRestriction.aspx/DeleteBGFROrg', { 'btnvalue': btnvalue, 'DistributerValues': DistributerValues, 'CountryValues': CountryValues, 'SupplierValues': SupplierValues, 'tab': tab })
    }
    return deletedetailsInfoBTGFR;
});

app.controller('BTGFRCTRL', function ($scope, $filter, ngTableParams, BTGFRListFactory, CountryListFactory, SupplierListFactory, BTGFRGridFactory, detailsInfoBTGFR, deletedetailsInfoBTGFR) {

    $(".pageLoaderOverlay").show();
    var btnvalue = "", CountryValues = "", DistributerValues = "", SupplierValues = "", distributorids = "", countryids = "", supplierids = "";


    $scope.resetDropDown = function () {
        if (angular.isDefined($scope.BTGFRList)) {
            delete $scope.BTGFR;
        }
        if (angular.isDefined($scope.CountryList)) {
            delete $scope.Country;
        }
        if (angular.isDefined($scope.SupplierList)) {
            delete $scope.Supplier;
        }
    }

    $scope.GetValue = function () {

        //var btnvalue, DistributerValues, CountryValues, SupplierValues, distributorids
        CountryValues = "";
        DistributerValues = "";
        SupplierValues = "";
        tab = "BTGFR";
        var btnvalue = $('Save').selector;
        if ($scope.BTGFR == undefined || $scope.Country == undefined || $scope.Supplier == undefined) {
            bootbox.alert({
                "message": "Please Select atleast one item in all Listbox and click on Save",
                "className": "my-custom-class",
                "callback": function () {
                    console.log("Success callback");
                }
            });
            return false;
        }
        DistributerValues = $scope.BTGFR.join(',');
        CountryValues = $scope.Country.join(',');
        SupplierValues = $scope.Supplier.join(',');









        detailsInfoBTGFR.GetValue(btnvalue, DistributerValues, CountryValues, SupplierValues, tab).success(function (data) {

            bootbox.alert({
                "message": data.d + "Restriction(s) have been added",
                "className": "my-custom-class",
                "callback": function () {
                    console.log("Success callback");
                }
            });
           
                BTGFRGridFactory.GetBTGFRGrid("BTGFR").success(function (data) {

                    $(".pageLoaderOverlay").hide();
                    $scope.BTGFRGrid = data.d;


                    $scope.usersTable = new ngTableParams({
                        page: 1,
                        count: 10
                    }, {
                        total: $scope.BTGFRGrid.length,
                        getData: function ($defer, params) {
                            $scope.data = params.sorting() ? $filter('orderBy')($scope.BTGFRGrid, params.orderBy()) : $scope.BTGFRGrid;
                            $scope.data = params.filter() ? $filter('filter')($scope.data, params.filter()) : $scope.data;
                            if ($scope.data.length == 0) {
                                $("#InactiveidBTGFR").show();
                                $("#activeidBTGFR").hide();
                            }
                            else {
                                $("#InactiveidBTGFR").hide();
                                $("#activeidBTGFR").show();
                            }
                            $scope.data = $scope.data.slice((params.page() - 1) * params.count(), params.page() * params.count());
                            $defer.resolve($scope.data);
                        }
                    });
                })
        .error(function (error) {
            alert(error);
            alert("Problem occured while loading Speed Info; " + JSON.stringify(error));
        });

            
        })
        .error(function (error) {

            alert("Problem occured while loading States; " + error);
        });
    };









    $scope.removeRow = function () {
        DistributerValues = "";
        CountryValues = "";
        SupplierValues = "";
        var index = -1;
        tab = "BTGFR";
        var comArr = eval($scope.data);
        btnvalue = $(Deletebtn)[0].defaultValue;
        for (var i = 0; i < comArr.length; i++) {
            if ($(Checkbox1)[i].checked == true) {
                DistributerValues += $scope.data[i].BTGFR + ",";
                CountryValues += $scope.data[i].countryid + ",";
                SupplierValues += $scope.data[i].supplierid + ",";
            }
        }
        if (DistributerValues == "" || CountryValues == "" || SupplierValues == "") {
            bootbox.alert({
                "message": "Please select atleast one checkbox",
                "className": "my-custom-class",
                "callback": function () {
                    console.log("Success callback");
                }
            });
            return false;
        }
        DistributerValues = DistributerValues.slice(0, -1);
        CountryValues = CountryValues.slice(0, -1);
        SupplierValues = SupplierValues.slice(0, -1);

        // return $http.post('SupplierRestriction.aspx/SaveAndDelete', { 'btnValue': btnvalue, 'DistributorIds': distributorids, 'Countryids': countryids, 'supplierids': supplierids });
        bootbox.confirm({
            "className": "my-custom-class",
            message: "Do you really want to delete these records?",
            callback: function (result) {
                if (result) {
                    deletedetailsInfoBTGFR.removeRow(btnvalue, DistributerValues, CountryValues, SupplierValues, tab).success(function (data) {
                        
                        bootbox.alert({
                            "message": data.d + "Restriction(s) have been deleted",
                            "className": "my-custom-class",
                            "callback": function () {
                                console.log("Success callback");
                            }
                        });

                        detailsInfoBTGFR.GetValue(btnvalue, DistributerValues, CountryValues, SupplierValues, tab).success(function (data) {


                            BTGFRGridFactory.GetBTGFRGrid("BTGFR").success(function (data) {
                                $(".pageLoaderOverlay").hide();
                                $scope.BTGFRGrid = data.d;


                                $scope.usersTable = new ngTableParams({
                                    page: 1,
                                    count: 10
                                }, {
                                    total: $scope.BTGFRGrid.length,
                                    getData: function ($defer, params) {
                                        $scope.data = params.sorting() ? $filter('orderBy')($scope.BTGFRGrid, params.orderBy()) : $scope.BTGFRGrid;
                                        $scope.data = params.filter() ? $filter('filter')($scope.data, params.filter()) : $scope.data;
                                        if ($scope.data.length == 0) {
                                            $("#InactiveidBTGFR").show();
                                            $("#activeidBTGFR").hide();
                                        }
                                        else {
                                            $("#InactiveidBTGFR").hide();
                                            $("#activeidBTGFR").show();
                                        }
                                        $scope.data = $scope.data.slice((params.page() - 1) * params.count(), params.page() * params.count());
                                        $defer.resolve($scope.data);
                                    }
                                });
                            })
        .error(function (error) {
            alert(error);

            alert("Problem occured while loading Speed Info; " + JSON.stringify(error));
        });


                        });
                    });
                };
            }
        });

    };

    BTGFRListFactory.GetBTGFR("BTGFR").success(function (data) {

        $scope.BTGFRList = data.d;
    })
        .error(function (error) {
            alert(error);
            alert("Problem occured while loading Speed Info; " + JSON.stringify(error));
        });



    CountryListFactory.GetCountry("Country").success(function (data) {

        $scope.CountryList = data.d;
    })
        .error(function (error) {
            alert(error);
            alert("Problem occured while loading Speed Info; " + JSON.stringify(error));
        });



    SupplierListFactory.GetSupplier("Supplier").success(function (data) {

        $scope.SupplierList = data.d;
    })
        .error(function (error) {
            alert(error);
            alert("Problem occured while loading Speed Info; " + JSON.stringify(error));
        });



    BTGFRGridFactory.GetBTGFRGrid("BTGFR").success(function (data) {


        $scope.BTGFRGrid = data.d;

        $scope.usersTable = new ngTableParams({
            page: 1,
            count: 10
        }, {
            total: $scope.BTGFRGrid.length,
            getData: function ($defer, params) {

                $scope.data = params.sorting() ? $filter('orderBy')($scope.BTGFRGrid, params.orderBy()) : $scope.BTGFRGrid;
                $scope.data = params.filter() ? $filter('filter')($scope.data, params.filter()) : $scope.data;
                if ($scope.data.length == 0) {
                    $("#InactiveidBTGFR").show();
                    $("#activeidBTGFR").hide();
                }
                else {
                    $("#InactiveidBTGFR").hide();
                    $("#activeidBTGFR").show();
                }
                $scope.data = $scope.data.slice((params.page() - 1) * params.count(), params.page() * params.count());
                $defer.resolve($scope.data);
            }
        });
    })
        .error(function (error) {
            alert(error);
            alert("Problem occured while loading Speed Info; " + JSON.stringify(error));
        });





});




//Organization


app.factory('OrgListFactory', function ($http) {

    var OrgListFactory = {};

    OrgListFactory.GetOrg = function (Distributer) {

        return $http.post('SupplierRestriction.aspx/GetOrganizationLstDetails', { 'Distributer': Distributer });

    }

    return OrgListFactory;
});

app.factory('CountryListFactory', function ($http) {

    var CountryListFactory = {};

    CountryListFactory.GetCountry = function (Country) {

        return $http.post('SupplierRestriction.aspx/GetCountryLstDetails', { 'Country': Country });

    }

    return CountryListFactory;
});

app.factory('SupplierListFactory', function ($http) {

    var SupplierListFactory = {};

    SupplierListFactory.GetSupplier = function (Supplier) {

        return $http.post('SupplierRestriction.aspx/GetSupplierLstDetails', { 'Supplier': Supplier });

    }

    return SupplierListFactory;
});

app.factory('OrgGridFactory', function ($http) {

    var OrgGridFactory = {};

    OrgGridFactory.GetOrgGrid = function (Distributer) {
        $(".pageLoaderOverlay").show();
        return $http.post('SupplierRestriction.aspx/GetOrganizationGridDetails', { 'Distributer': Distributer });

    }

    return OrgGridFactory;
});

app.factory('detailsInfoOrg', function ($http) {
    var detailsInfoOrg = {};
    detailsInfoOrg.GetValue = function (btnvalue, DistributerValues, CountryValues, SupplierValues) {
        $(".pageLoaderOverlay").show();
        return $http.post('SupplierRestriction.aspx/SaveAndDelete', { 'btnvalue': btnvalue, 'DistributerValues': DistributerValues, 'CountryValues': CountryValues, 'SupplierValues': SupplierValues })
    }
    return detailsInfoOrg;
});

app.factory('deletedetailsInfoOrg', function ($http) {
    var deletedetailsInfoOrg = {};
    deletedetailsInfoOrg.removeRow = function (btnvalue, DistributerValues, CountryValues, SupplierValues) {
        $(".pageLoaderOverlay").show();
        return $http.post('SupplierRestriction.aspx/SaveAndDelete', { 'btnvalue': btnvalue, 'DistributerValues': DistributerValues, 'CountryValues': CountryValues, 'SupplierValues': SupplierValues })
    }
    return deletedetailsInfoOrg;
});

app.controller('OrgCntrl', function ($scope, $filter, ngTableParams, OrgListFactory, CountryListFactory, SupplierListFactory, OrgGridFactory, detailsInfoOrg, deletedetailsInfoOrg) {

    $(".pageLoaderOverlay").show();
    var btnvalue = "", CountryValues = "", DistributerValues = "", SupplierValues = "", distributorids = "", countryids = "", supplierids = "";



    $scope.GetValue = function () {


        CountryValues = "";
        tab = "Organization";
        DistributerValues = "";
        SupplierValues = "";
        var btnvalue = $('Save').selector;
        if ($scope.Organization == undefined || $scope.Country == undefined || $scope.Supplier == undefined) {
            bootbox.alert({
                "message": "Please Select atleast one item in all Listbox and click on Save",
                "className": "my-custom-class",
                "callback": function () {
                    console.log("Success callback");
                }
            });
            return false;
        }
        CountryValues = $scope.Country.join(',');
        DistributerValues = $scope.Organization.join(',');
        SupplierValues = $scope.Supplier.join(',');


        detailsInfoOrg.GetValue(btnvalue, DistributerValues, CountryValues, SupplierValues).success(function (data) {

            // bootbox.alert(data.d + "Restriction(s) have been added");
            bootbox.alert({
                "message": data.d + "Restriction(s) have been added",
                "className": "my-custom-class",
                "callback": function () {
                    console.log("Success callback");
                }
            });
           
                OrgGridFactory.GetOrgGrid("ORGANIZATION").success(function (data) {
                    $(".pageLoaderOverlay").hide();
                    $scope.OrgGrid = data.d;

                    $scope.usersTable = new ngTableParams({
                        page: 1,
                        count: 10
                    }, {
                        total: $scope.OrgGrid.length,
                        getData: function ($defer, params) {
                            $scope.data = params.sorting() ? $filter('orderBy')($scope.OrgGrid, params.orderBy()) : $scope.OrgGrid;
                            $scope.data = params.filter() ? $filter('filter')($scope.data, params.filter()) : $scope.data;
                            if ($scope.data.length == 0) {
                                $("#InactiveidOrg").show();
                                $("#activeidOrg").hide();
                            }
                            else {
                                $("#InactiveidOrg").hide();
                                $("#activeidOrg").show();
                            }
                            $scope.data = $scope.data.slice((params.page() - 1) * params.count(), params.page() * params.count());
                            $defer.resolve($scope.data);
                        }
                    });
                })
        .error(function (error) {
            alert(error);
            alert("Problem occured while loading Speed Info; " + JSON.stringify(error));
        });
            

        });

    };




    $scope.resetDropDown = function () {
        if (angular.isDefined($scope.OrgList)) {
            delete $scope.Organization;
        }
        if (angular.isDefined($scope.CountryList)) {
            delete $scope.Country;
        }
        if (angular.isDefined($scope.SupplierList)) {
            delete $scope.Supplier;
        }
    }




    $scope.removeRow = function () {
        DistributerValues = "";
        CountryValues = "";
        SupplierValues = "";
        var index = -1;
        tab = "Organization"
        var comArr = eval($scope.data);
        btnvalue = $(Deletebtn)[0].defaultValue;
        for (var i = 0; i < comArr.length; i++) {
            if ($(Checkbox2)[i].checked == true) {
                DistributerValues += $scope.data[i].BTGFR + ",";
                CountryValues += $scope.data[i].countryid + ",";
                SupplierValues += $scope.data[i].supplierid + ",";
            }
        }
        if (DistributerValues == "" || CountryValues == "" || SupplierValues == "") {
            //            bootbox.alert("Please select atleast one checkbox");
            bootbox.alert({
                "message": "Please select atleast one checkbox",
                "className": "my-custom-class",
                "callback": function () {
                    console.log("Success callback");
                }
            });
            return false;
        }
        DistributerValues = DistributerValues.slice(0, -1);
        CountryValues = CountryValues.slice(0, -1);
        SupplierValues = SupplierValues.slice(0, -1);


        bootbox.confirm({
            "className": "my-custom-class",
            message: "Do you really want to delete these records?",
            callback: function (result) {
                if (result) {
                    deletedetailsInfoOrg.removeRow(btnvalue, DistributerValues, CountryValues, SupplierValues).success(function (data) {

                       
                        bootbox.alert({
                            "message": data.d + "Restriction(s) have been deleted",
                            "className": "my-custom-class",
                            "callback": function () {
                                console.log("Success callback");
                            }
                        });


                        OrgGridFactory.GetOrgGrid("ORGANIZATION").success(function (data) {
                            $(".pageLoaderOverlay").hide();
                            $scope.OrgGrid = data.d;

                            $scope.usersTable = new ngTableParams({
                                page: 1,
                                count: 10
                            }, {
                                total: $scope.OrgGrid.length,
                                getData: function ($defer, params) {
                                    $scope.data = params.sorting() ? $filter('orderBy')($scope.OrgGrid, params.orderBy()) : $scope.OrgGrid;
                                    $scope.data = params.filter() ? $filter('filter')($scope.data, params.filter()) : $scope.data;
                                    if ($scope.data.length == 0) {
                                        $("#InactiveidOrg").show();
                                        $("#activeidOrg").hide();
                                    }
                                    else {
                                        $("#InactiveidOrg").hide();
                                        $("#activeidOrg").show();
                                    }
                                    $scope.data = $scope.data.slice((params.page() - 1) * params.count(), params.page() * params.count());
                                    $defer.resolve($scope.data);
                                }
                            });
                        })
        .error(function (error) {
            alert(error);
            alert("Problem occured while loading Speed Info; " + JSON.stringify(error));
        });



                    });
                };
            }


        });
    }






    OrgListFactory.GetOrg("ORGANIZATION").success(function (data) {

        $scope.OrgList = data.d;
    })
        .error(function (error) {
            alert(error);
            alert("Problem occured while loading Speed Info; " + JSON.stringify(error));
        });


    CountryListFactory.GetCountry("Country").success(function (data) {

        $scope.CountryList = data.d;
    })
        .error(function (error) {
            alert(error);
            alert("Problem occured while loading Speed Info; " + JSON.stringify(error));
        });


    SupplierListFactory.GetSupplier("Supplier").success(function (data) {

        $scope.SupplierList = data.d;
    })
        .error(function (error) {
            alert(error);
            alert("Problem occured while loading Speed Info; " + JSON.stringify(error));
        });


    OrgGridFactory.GetOrgGrid("ORGANIZATION").success(function (data) {

        $scope.OrgGrid = data.d;

        $scope.usersTable = new ngTableParams({
            page: 1,
            count: 10
        }, {
            total: $scope.OrgGrid.length,
            getData: function ($defer, params) {

                $scope.data = params.sorting() ? $filter('orderBy')($scope.OrgGrid, params.orderBy()) : $scope.OrgGrid;
                $scope.data = params.filter() ? $filter('filter')($scope.data, params.filter()) : $scope.data;
                if ($scope.data.length == 0) {
                    $("#InactiveidOrg").show();
                    $("#activeidOrg").hide();
                }
                else {
                    $("#InactiveidOrg").hide();
                    $("#activeidOrg").show();
                }
                $scope.data = $scope.data.slice((params.page() - 1) * params.count(), params.page() * params.count());
                $defer.resolve($scope.data);
            }
        });

    })
        .error(function (error) {
            alert(error);
            alert("Problem occured while loading Speed Info; " + JSON.stringify(error));
        });





});

