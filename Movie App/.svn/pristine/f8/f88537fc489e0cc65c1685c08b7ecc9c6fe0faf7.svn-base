app.controller("VSATCntrl", function ($http, $scope, HVPNBundleProductsFctry, $rootScope, $modal, SLAinfoparam, glbProductID, glbRegionID, glbCountryID, glbParentProductID, glbHVPNCaseID, glbHVPNParentCaseID, VSATAccessSuppliersFctry, VSATDataFctry, VSATPortSpeedFctry) {

    $scope.Product = glbProductID.getProductID();
    $scope.Region = glbRegionID.getRegionID();
    $scope.Country = glbCountryID.getCountryID();
    $scope.AccSupplierSelected = false;
    $scope.ProductName = glbProductID.getProductName();
    $("#VSATableData").hide();
    $("#divVSATParentData").hide();
    $("#divVSATPortTypesHeading").hide();
    $("#divVSATParentPortTypesHeading").hide();
    $scope.VSATPortSpeed = [];

    $scope.$on('GetVSATInfo', function (event, obj) {

        if (angular.isUndefined($scope.VSATLoaded) || $scope.VSATLoaded == "0") {

            
            $scope.GetParentDetails();
        }
    });

    $scope.GetParentDetails = function () {
        $(".pageLoaderOverlay").show();
        return $http.post('Search.aspx/GetParentDetails', { 'ProductID': $scope.Product })
        .success(function (data, status, headers, config) {

            glbParentProductID.setParentProductID(data.d);

            if (angular.isUndefined($scope.VSATLoaded) || $scope.VSATLoaded == "0") {
                $scope.VSATLoaded = "1";

                VSATAccessSuppliersFctry.GetVSATAccessSuppliers(22861, $scope.Region, $scope.Country, $scope.Product, glbParentProductID.getParentProductID(), 0).success(function (data) {

                    if (data.d.length == 1) {
                        $scope.VSATAccSupplier = data.d[0].VSATAccessSupplierID;
                    }
                });

            }
            else {

                $(".pageLoaderOverlay").hide();
            }
        });
    }

    $scope.GetVSATAttributes = function () {

        var PortSpeedID = 0;
        var PortSpeed = $("#ddlVSATPortSpeed option:selected").html();
        var accSuppID = 0;
        var AccSupplier = 0;


        //        if ($('#ddlVSATAccSupplier > option').length == 2) {
        //            accSuppID = $("#ddlVSATAccSupplier").val().replace("number:", "");
        //            $scope.VSATAccSupplier = $rootScope.DefaultVSATAccSupplier;
        //        }



        var validInput = true;
        if (angular.isUndefined($scope.VSATAccSupplier) || $scope.VSATAccSupplier == '' || $scope.VSATAccSupplier == null) {
            if ($rootScope.VSATAccessSupplierIDDefault == 0 || $scope.AccSupplierSelected == true) {
                $("#spnVSATAccessSupplier").show();
                validInput = false;
            }
            else {
                $scope.VSATAccSupplier = $rootScope.VSATAccessSupplierIDDefault;
                accSuppID = $scope.VSATAccSupplier;
            }
        }
        else {
            accSuppID = $scope.VSATAccSupplier;
            $("#spnVSATAccessSupplier").hide();

        }

        if (angular.isUndefined($scope.VSATPortSpeed) || $scope.VSATPortSpeed.length == 0 || $scope.VSATPortSpeed == null) {
            if (angular.isUndefined(PortSpeed) || PortSpeed == '') {
                $("#spnVSATPortSpeed").show();
                validInput = false;
            }
        }
        else {

            PortSpeedID = $scope.VSATPortSpeed.join();
            $("#spnVSATPortSpeed").hide();
        }

        if (PortSpeed == 'All') {
            PortSpeedID = 0;
            $("#spnVSATPortSpeed").hide();
        }
        if (!validInput) {
            return;
        }
        var PortSpeed1 = 0;
        var PortSpeed2 = 0;

        $(".pageLoaderOverlay").show();
        VSATDataFctry.GetVSATData(glbHVPNCaseID.getCaseID(), accSuppID, PortSpeedID, $scope.Country, 22861, glbHVPNParentCaseID.getParentCaseID(), glbProductID.getProductID(), PortSpeed, glbParentProductID.getParentProductID()).success(function (data) {


            if (data.d.length == 0) {

                $("#VSATNoData").show();
                $("#VSATableData").hide();
                $("#divVSATPortTypesHeading").hide();

            }
            else {
                $scope.VSATPortSpeedTypeData = data.d;
                $("#VSATNoData").hide();
                $("#VSATableData").show();
                $("#divVSATPortTypesHeading").show();
            }
            // $(".pageLoaderOverlay").hide();


            if (data.d.length == 1) {
                $("#VSATableData").attr("style", "height:105px");
                $('#VSATableData').removeClass('scrollbar');
            }
            if (data.d.length == 2) {
                $("#VSATableData").attr("style", "height:140px");
                $('#VSATableData').removeClass('scrollbar');
            }
            if (data.d.length == 3) {
                $("#VSATableData").attr("style", "height:175px");
                $('#VSATableData').removeClass('scrollbar');
            }
            if (data.d.length == 4) {
                $("#VSATableData").attr("style", "height:210px");
                $('#VSATableData').removeClass('scrollbar');
            }
            if (data.d.length == 5) {
                $("#VSATableData").attr("style", "height:245px");
                $('#VSATableData').removeClass('scrollbar');
            }
            if (data.d.length == 6) {
                $("#VSATableData").attr("style", "height:280px");
                $('#VSATableData').removeClass('scrollbar');
            }
            if (data.d.length == 7) {
                $("#VSATableData").attr("style", "height:310px");
                $('#VSATableData').removeClass('scrollbar');
            }
            if (data.d.length == 8) {
                $("#VSATableData").attr("style", "height:345px");
                $('#VSATableData').removeClass('scrollbar');
            }
            if (data.d.length == 9) {
                $("#VSATableData").attr("style", "height:380px");
                $('#VSATableData').removeClass('scrollbar');
            }
            if (data.d.length == 10) {
                $("#VSATableData").attr("style", "height:415px");
                $('#VSATableData').removeClass('scrollbar');
            }
            if (data.d.length > 10) {
                $("#VSATableData").attr("style", "height:450px");
            }

            PortSpeed1 = 1;
            if (PortSpeed1 == 1 && PortSpeed2 == 1) {

                $(".pageLoaderOverlay").hide();
            }

        });

        if (glbParentProductID.getParentProductID() > 0) {

            $http.post('Search.aspx/GetTechnologyPortSpeeds', { 'ProductID': glbProductID.getProductID(), 'CountryID': glbCountryID.getCountryID(), 'PackageID': 22861, 'Type': 1 })
                .success(function (data, status, headers, config) {

                    if (data.d > 0) {

                        // Getting Parent data 
                        VSATDataFctry.GetVSATData(glbHVPNCaseID.getCaseID(), accSuppID, PortSpeedID, $scope.Country, 22861, glbHVPNParentCaseID.getParentCaseID(), glbParentProductID.getParentProductID(), PortSpeed, 0).success(function (data) {

                            if (data.d.length == 0) {
                                $("#divVSATParentData").hide();
                                $("#divVSATParentPortTypesHeading").hide();
                            }
                            else {
                                //$("#HvpnNoData").hide();
                                $("#divVSATParentData").show();
                                $scope.VSATParentPortSpeedTypeData = data.d;
                                $("#divVSATParentPortTypesHeading").show();
                            }

                            PortSpeed2 = 1;
                            if (PortSpeed1 == 1 && PortSpeed2 == 1) {

                                $(".pageLoaderOverlay").hide();
                            }

                        });

                    }
                    else {

                        PortSpeed2 = 1;
                        if (PortSpeed1 == 1 && PortSpeed2 == 1) {

                            $(".pageLoaderOverlay").hide();
                        }
                    }
                });

        }
        else {
            PortSpeed2 = 1;
            if (PortSpeed1 == 1 && PortSpeed2 == 1) {

                $(".pageLoaderOverlay").hide();
            }
        }

    }

    //for CPE Information

    $scope.GetBundleData = function () {
        //        $(".pageLoaderOverlay").show();
        //        HVPNBundleProductsFctry.GetBundleProducts($scope.Country, glbProductID.getProductID()).success(function (data) {
        //            $(".pageLoaderOverlay").hide();
        //        });

        var url = "Search/CPEBundleHVPN.htm";
        var q1 = "?productid=" + $scope.Product;
        var q2 = "&countryid=" + $scope.Country;


        url = url + q1 + q2;
        window.open(url, "_blank", "toolbar=yes, scrollbars=yes, resizable=yes");
    }


    $scope.openCPEPartsPOPup = function (bundleID) {

        var url = "DispCPEParts.htm";
        var q1 = "?bindleID=" + bundleID;
        var q2 = "&countryid=" + $scope.Country;

        url = url + q1 + q2;

        var iframehtml = '<iframe border=0 width="100%" height ="500px" frameborder="0" src="' + url + '"> </iframe>'
        $("div.CPEPartInfo").html(iframehtml);

    }

    $scope.openSALInfoPOPUp = function (pkgID, AccessSupplierCharID, suppProdID, suppAccType, portTypeID, supplier, supplierproduct, AccessSpeed) {


        SLAinfoparam.setAccSuppName(supplier);
        SLAinfoparam.setSupProduct(supplierproduct);

        SLAinfoparam.setBTPackageID(pkgID);
        SLAinfoparam.setAccSuppCharID(AccessSupplierCharID);
        SLAinfoparam.setAccSuppNameId(suppProdID);
        SLAinfoparam.setsuppAccTypeId(suppAccType);
        SLAinfoparam.setportTypeID(portTypeID);
        SLAinfoparam.setASpeed(AccessSpeed);
        SLAinfoparam.setstrDSL('Y');

        $modal.open({
            templateUrl: 'Search/SLAInformation.htm',
            controller: 'SLAInfoCntrl'
        });
    }

    $scope.RemoveAlert = function () {
        if (angular.isUndefined($scope.VSATAccSupplier) || $scope.VSATAccSupplier == '' || $scope.VSATAccSupplier == null) {
            $scope.AccSupplierSelected = true;
            $("#spnVSATPortSpeed").hide();
        }
        else {
            $scope.AccSupplierSelected = false;
        }
        $("#spnVSATAccessSupplier").hide();
    }

    $scope.RemoveAlert1 = function () {

        $("#spnVSATPortSpeed").hide();
    }


});


app.factory('VSATAccessSuppliersFctry', function ($http, $rootScope, glbHVPNCaseID, glbHVPNParentCaseID, VSATPortSpeedFctry, UserInfofactory, ProductCPE) {

    var VSATAccessSuppliersFctry = {};

    VSATAccessSuppliersFctry.GetVSATAccessSuppliers = function (PackageID, RegionID, CountryID, ProductID, ParentProductID, AccessSupplierID) {


        $http.post('Search.aspx/GetPackages', { 'RegionID': RegionID, 'CountryID': CountryID, 'ParentProductID': ParentProductID, 'ProductID': ProductID, 'Type': 'VSAT', 'AccessSupplierID': AccessSupplierID })
        .success(function (data, status, headers, config) {

            if (data.d.CaseID == 0) {

                $(".pageLoaderOverlay").hide();
                $("#VSATNoData").show();
                $("#VSATableData").hide();
                $("#divUserInfo").hide();
                return;
            }

            $("#VSATableData").hide();
            glbHVPNCaseID.setCaseID(data.d.CaseID);
            glbHVPNParentCaseID.setParentCaseID(data.d.ParentCaseID);

            UserInfofactory.GetUserInfo(glbHVPNCaseID.getCaseID(), 'CLA_PRODUCT_CASES').success(function (data) {
                $("#divUserInfo").show();
                $rootScope.CreatedBy = data.d.CreatedBy;
                $rootScope.CreatedDate = data.d.CreatedDate;
                $rootScope.UpdatedBy = data.d.UpdatedBy;
                $rootScope.UpdatedDate = data.d.UpdatedDate;
            });

            //            ProductCPE.GetProductCPE(ProductID, CountryID).success(function (data) {
            //                $scope.CPEExists = data.d;
            //            });

            ProductCPE.GetProductCPE(ProductID, CountryID, glbHVPNCaseID.getCaseID()).success(function (data) {

                $rootScope.CPEExists = data.d;
            });

            return $http.post('Search.aspx/GetVSATAccessSuppliers', { 'PackageID': PackageID, 'Regionid': RegionID, 'Countryid': CountryID, 'Productid': ProductID, 'ParentProductID': ParentProductID, 'CaseID': glbHVPNCaseID.getCaseID(), 'ParentCaseID': glbHVPNParentCaseID.getParentCaseID() })
            .success(function (data1, status, headers, config) {
                debugger;
                $rootScope.VSATAccessSuppliersData = [];
                AccessSuppliers = [];
                firstrec = 0;
                VSATAccessSupplierName = '';
                VSATAccessSupplierID = 0;

                if (data1.d.length == 0) {

                    $(".pageLoaderOverlay").hide();
                    $("#VSATNoData").show();
                    $("#VSATableData").hide();
                }

                data1.d.forEach(function (item) {
                    if (firstrec == 0) {
                        VSATAccessSupplierName = item.VSATAccessSupplier;
                        VSATAccessSupplierID = item.VSATAccessSupplierID;
                        $rootScope.VSATAccessSupplierIDDefault = item.VSATAccessSupplierID;

                        $(".pageLoaderOverlay").show();

                        VSATPortSpeedFctry.GetPortSpeeds(CountryID, glbHVPNCaseID.getCaseID(), glbHVPNParentCaseID.getParentCaseID(), 22861, VSATAccessSupplierID, ProductID).success(function (data) {
                            debugger;
                            $rootScope.VSATPortSpeed = [];
                            PortSpeeds = [];
                            firstrec1 = 0;
                            PortSpeed = '';
                            PortSpeedID = 0;

                            data.d.forEach(function (item) {
                                if (firstrec1 == 0) {
                                    PortSpeed = item.PortSpeed;
                                    PortSpeedID = item.PortSpeedID;

                                    $("#ddlVSATAccSupplier").val("number:" + VSATAccessSupplierID);
                                    $rootScope.DefaultVSATAccSupplier = VSATAccessSupplierID;

                                    //VSATDataFctry.GetVSATData(glbHVPNCaseID.getCaseID(), AccessSupplierCharID, PortSpeedID, CountryID, PackageID, glbHVPNParentCaseID.getParentCaseID(), glbProductID.getProductID(), PortSpeed, glbParentProductID.getParentProductID());
                                }
                                PortSpeeds.push({ PortSpeedID: item.PortSpeedID, PortSpeed: item.PortSpeed });
                                firstrec1 = 1;
                            });

                            $rootScope.VSATPortSpeedData = PortSpeeds;
                            if (data.d.length.length == 1) {
                                $scope.VSATPortSpeed.push(data.d[0].PortSpeedID);
                            }

                            $(".pageLoaderOverlay").hide();
                            
                        });
                    }
                    AccessSuppliers.push({ VSATAccessSupplierID: item.VSATAccessSupplierID, VSATAccessSupplier: item.VSATAccessSupplier });
                    firstrec = 1;
                });

                $rootScope.VSATAccessSuppliersData = AccessSuppliers;
                $rootScope.$apply();
                //                if (data.d.length == 1) {
                //                    $scope.VSATAccSupplier = data1.d[0].VSATAccessSupplierID;
                //                }
                //$rootScope.$apply();
            });
        })
        .error(function (error) {
          // alert("Problem occured while loading VSAT Access Suppliers; " + JSON.stringify(error));
        });
    }

    return VSATAccessSuppliersFctry;
});


app.factory('VSATPortSpeedFctry', function ($http, $rootScope, glbHVPNCaseID, glbHVPNParentCaseID, glbProductID, glbParentProductID, VSATDataFctry) {

    var VSATPortSpeedFctry = {};

    VSATPortSpeedFctry.GetPortSpeeds = function (CountryID, CaseID, ParentCaseID, PackageID, AccessSupplierCharID, ProductID) {
        debugger;
        return $http.post('Search.aspx/GetVSATPortSpeeds', { 'CountryID': CountryID, 'CaseID': CaseID, 'ParentCaseID': ParentCaseID, 'PackageID': PackageID, 'flag': 0, 'ProductID': ProductID })
        .success(function (data, status, headers, config) {


        })
        .error(function (error) {
            //alert("Problem occured while loading VSAT Port Speeds " + JSON.stringify(error));
        });
    }

    return VSATPortSpeedFctry;
});


app.factory('VSATDataFctry', function ($http, $rootScope, glbHVPNCaseID, glbHVPNParentCaseID) {

    var VSATDataFctry = {};

    VSATDataFctry.GetVSATData = function (CaseID, AccessSupplierCharID, PortSpeedCharID, CountryID, pckgid, ParentCaseID, ProductID, PortSpeed, ParentProductID) {

        return $http.post('Search.aspx/GetVSATAttrCursor', { 'CaseID': CaseID, 'AccessSupplierCharID': AccessSupplierCharID, 'PortSpeedCharID': PortSpeedCharID, 'CountryID': CountryID, 'pckgid': pckgid, 'ParentCaseID': ParentCaseID, 'ProductID': ProductID, 'PortSpeed': PortSpeed, 'ParentProductID': ParentProductID })
        .success(function (data, status, headers, config) {
    
            
        })
        .error(function (error) {
           // alert("Problem occured while loading VSAT Data " + JSON.stringify(error));
        });
    }

    return VSATDataFctry;
});



app.factory('VSATAccSupplierfactory', function ($http) {

    var VSATAccSupplierfactory = {};

    VSATAccSupplierfactory.GetVSATAccessSuppliers = function (PackageID, RegionID, CountryID, ProductID, ParentProductID, CaseID, ParentCaseID) {
        $(".pageLoaderOverlay").show();

        return $http.post('Search.aspx/GetVSATAccessSuppliers', { 'PackageID': PackageID, 'Regionid': RegionID, 'Countryid': CountryID, 'Productid': ProductID, 'ParentProductID': ParentProductID, 'CaseID': CaseID, 'ParentCaseID': ParentCaseID })
            .success(function (data1, status, headers, config) {

                if (data1.d.length == 0) {
                    return;
                }
                var firstrec = 0;
                data1.d.forEach(function (item) {
                    if (firstrec == 0) {
                        VSATAccessSupplierName = item.VSATAccessSupplier;
                        VSATAccessSupplierID = item.VSATAccessSupplierID;
                        //$rootScope.VSATAccessSupplierIDDefault = item.VSATAccessSupplierID;
                        //
                        //VSATPortSpeedFctry.GetPortSpeeds(CountryID, glbHVPNCaseID.getCaseID(), glbHVPNParentCaseID.getParentCaseID(), 22861, VSATAccessSupplierID, ProductID);
                    }
                    AccessSuppliers.push({ VSATAccessSupplierID: item.VSATAccessSupplierID, VSATAccessSupplier: item.VSATAccessSupplier });
                    firstrec = 1;
                });

                $rootScope.VSATAccessSuppliersData = AccessSuppliers;
                //$rootScope.$apply();
            })
            .error(function (error) {
                alert("Problem occured while loading VSAT Access Suppliers; " + JSON.stringify(error));
            });
    }

    return VSATAccSupplierfactory;
});


app.factory('VSATPortSpeedfactory', function ($http) {

    var VSATPortSpeedfactory = {};

    VSATPortSpeedfactory.GetPortSpeeds = function (CountryID, CaseID, ParentCaseID, PackageID, AccessSupplierCharID, ProductID) {

        return $http.post('Search.aspx/GetVSATPortSpeeds', { 'CountryID': CountryID, 'CaseID': CaseID, 'ParentCaseID': ParentCaseID, 'PackageID': PackageID, 'flag': 0, 'ProductID': ProductID })
        .success(function (data, status, headers, config) {

            
            data.d.forEach(function (item) {
                if (firstrec == 0) {
                        //VSATDataFctry.GetVSATData(glbHVPNCaseID.getCaseID(), AccessSupplierCharID, PortSpeedID, CountryID, PackageID, glbHVPNParentCaseID.getParentCaseID(), glbProductID.getProductID(), PortSpeed, glbParentProductID.getParentProductID());
                }
                
                firstrec = 1;
            });

        })
        .error(function (error) {
            alert("Problem occured while loading VSAT Port Speeds " + JSON.stringify(error));
        });
    }

    return VSATPortSpeedfactory;
});
