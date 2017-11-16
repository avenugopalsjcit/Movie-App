app.controller("IPConnectCntrl", function ($http, $scope, $rootScope, SLAinfoparam, HVPNPKGParam, IPConnectFctry, HVPNPackagesFctry, HVPNAccessSuppliersFctry, HVPNPortSpeedFctry, HVPNPortTypesFctry, HVPNBundleProductsFctry, glbProductID, glbRegionID, glbCountryID, glbParentProductID, glbHVPNCaseID, glbHVPNParentCaseID, glbRegionName, glbCountryName, $modal) {

    $scope.Product = glbProductID.getProductID();
    $scope.Region = glbRegionID.getRegionID();
    $scope.Country = glbCountryID.getCountryID();
    $scope.ProductName = glbProductID.getProductName();
    $scope.HVPNPortSpeed = [];
    //var ProductID = glbProductID.getProductID();

    $scope.PageNo = 1;

    $scope.MaxRecords = 1000;
    $scope.MaxRecords1 = 1000;
    $scope.PageSize = 10;

    $("#divHVPNParentPaging1").hide();
    $("#divHVPNParentPaging2").hide();

    $(".pageLoaderOverlay").show();

    IPConnectFctry.GetParentDetails($scope.Country, $scope.Product, $scope.Region);
    $("#HvpnTableData").hide();

    $scope.GetIPBundleData = function () {
        $(".pageLoaderOverlay").show();
        HVPNBundleProductsFctry.GetBundleProducts($scope.Country, glbProductID.getProductID()).success(function (data) {
            $(".pageLoaderOverlay").hide();
        });
    }

    $scope.$watchCollection('HVPNPortSpeedData', function () {
        $scope.HVPNPortSpeed = [];
        if (!angular.isUndefined($rootScope.HVPNPortSpeedData)) {
            if ($rootScope.HVPNPortSpeedData.length == 1) {

                $scope.HVPNPortSpeed.push($rootScope.HVPNPortSpeedData[0].PortSpeedID);
            }
        }
    });

    $scope.$watchCollection('HVPNAccessSuppliersData', function () {
        if (!angular.isUndefined($rootScope.HVPNAccessSuppliersData)) {
            if ($rootScope.HVPNAccessSuppliersData.length == 1) {
                $scope.HVPNAccessSupplier = $rootScope.HVPNAccessSuppliersData[0].supplierID;
            }
        }
    });

    $scope.openHVPN = function () {


        $modal.open({
            templateUrl: 'hVPNFeatures.aspx',
            controller: 'HVPNPkgCntrl'


        });
    }

    $scope.RemoveHVPNAlert = function (HVPNAccessSupplier) {
        if (HVPNAccessSupplier == null) {
            $("#spnHVPNPortSpeed").hide();
        }
        $("#spnHVPNAccessSupplier").hide();
    }

    $scope.RemoveHVPNAlert1 = function () {
        $("#spnHVPNPortSpeed").hide();
    }

    $scope.openCPEAvailMatrixRule = function (ProductID) {

        $modal.open({
            templateUrl: 'Search/DispAccCPEAvailMatRule.htm',

            controller: 'HVPNPkgCntrl'


        });

    }

    $scope.PrevParent = function () {
        $scope.Paging = true;

        if ($scope.PageNo == 1) {
            return;
        }

        if ($scope.PageNo > 1) {
            $scope.PageNo = $scope.PageNo - 1;
        }
        else {
            $scope.PageNo = 1;
        }
        $scope.GetIPPortSpeed(false);
    }

    $scope.NextParent = function () {

        $scope.Paging = true;
        var RecCount = 0;

        if ($scope.PageNo > 0) {

            if (($scope.PageNo * $scope.PageSize) >= $scope.MaxRecords) {

                return;
            }
            else {
                $scope.PageNo = $scope.PageNo + 1;
            }

        }
        else {
            $scope.PageNo = 1;
        }
        $scope.GetIPPortSpeed(false);
    }


    $scope.GetBundleData = function () {

        var url = "Search/CPEBundleHVPN.htm";
        var q1 = "?productid=" + $scope.Product;
        var q2 = "&countryid=" + $scope.Country;


        url = url + q1 + q2;
        window.open(url, "_blank", "toolbar=yes, scrollbars=yes, resizable=yes");

    }

    $scope.GetIPPortSpeed = function (flag) {


        var accSuppID = 0;
        var accSuppName = $("#ddlHVPNAccessSupplier option:selected").html();

        var PortSpeedID = 0;
        var PortSpeed = $("#ddlHVPNPortSpeed option:selected").html();

        //        $rootScope.PackageIDDefault = PackageID;
        //        $rootScope.HVPNAccessSupplierIDDefault = AccessSupplierID;
        //        $rootScope.HVPNPortSpeedIDDefault = PortSpeedID;
        var validInput = true;
        if (angular.isUndefined($scope.HVPNAccessSupplier) || $scope.HVPNAccessSupplier == '' || $scope.HVPNAccessSupplier == null) {
            $("#spnHVPNAccessSupplier").show();
            validInput = false;
        }
        else {
            accSuppID = $scope.HVPNAccessSupplier;
            $("#spnHVPNAccessSupplier").hide();
        }

        if (angular.isUndefined($scope.HVPNPortSpeed) || $scope.HVPNPortSpeed.length == 0 || $scope.HVPNPortSpeed == null) {
            $("#spnHVPNPortSpeed").show();
            validInput = false;
        }
        else {

            PortSpeedID = $scope.HVPNPortSpeed.join();
            $("#spnHVPNPortSpeed").hide();
        }

        if (PortSpeed == 'All') {
            PortSpeedID = 0;
            $("#spnHVPNPortSpeed").hide();
        }
        if (!validInput) {
            return;
        }

        if (flag == true) {

            $scope.PageNo = 1;
        }

        $(".pageLoaderOverlay").show();
        HVPNPortTypesFctry.GetHVPNParentPortTypes($scope.Country, glbHVPNCaseID.getCaseID(), glbHVPNParentCaseID.getParentCaseID(), 22861, glbProductID.getProductID(), accSuppName, accSuppID, PortSpeedID, PortSpeed, glbParentProductID.getParentProductID(), $scope.PageNo).success(function (data) {

            if (data.d.length == 0) {

                //$("#trHeading1").show();
                $("#HvpnNoData").show();
                $("#HvpnTableData").hide();



                //$("#divPortTypesHeading").hide();
            }
            else {
                //$("#trHeading1").hide();
                $("#HvpnTableData").show();

                $("#HvpnNoData").hide();

                $("#HvpnNoData").hide();


                // $("#divPortTypesHeading").show();
                $scope.HVPNPortTypeData = data.d;

                if (data.d[0].RecCount > 10) {
                    $("#divHVPNParentPaging1").show();
                    $("#divHVPNParentPaging2").show();
                }
                else {
                    $("#divHVPNParentPaging1").hide();
                    $("#divHVPNParentPaging2").hide();
                }

                $scope.MaxRecords = data.d[0].RecCount;
                $scope.PageCount = data.d[0].PageCount;

                if (data.d.length == 1) {

                    $("#HvpnTableData").attr("style", "height:105px");
                    $('#HvpnTableData').removeClass('scrollbar');

                }
                if (data.d.length == 2) {
                    $("#HvpnTableData").attr("style", "height:140px");
                    $('#HvpnTableData').removeClass('scrollbar');
                }
                if (data.d.length == 3) {
                    $("#HvpnTableData").attr("style", "height:175px");
                    $('#HvpnTableData').removeClass('scrollbar');
                }
                if (data.d.length == 4) {
                    $("#HvpnTableData").attr("style", "height:210px");
                    $('#HvpnTableData').removeClass('scrollbar');
                }
                if (data.d.length == 5) {
                    $("#HvpnTableData").attr("style", "height:245px");
                    $('#HvpnTableData').removeClass('scrollbar');
                }
                if (data.d.length == 6) {
                    $("#HvpnTableData").attr("style", "height:280px");
                    $('#HvpnTableData').removeClass('scrollbar');
                }
                if (data.d.length == 7) {
                    $("#HvpnTableData").attr("style", "height:310px");
                    $('#HvpnTableData').removeClass('scrollbar');
                }
                if (data.d.length == 8) {
                    $("#HvpnTableData").attr("style", "height:345px");
                    $('#HvpnTableData').removeClass('scrollbar');
                }
                if (data.d.length == 9) {
                    $("#HvpnTableData").attr("style", "height:380px");
                    $('#HvpnTableData').removeClass('scrollbar');
                }
                if (data.d.length == 10) {
                    $("#HvpnTableData").attr("style", "height:415px");
                    $('#HvpnTableData').removeClass('scrollbar');
                }
                if (data.d.length > 10) {
                    $("#HvpnTableData").attr("style", "height:450px");
                }


            }
            $(".pageLoaderOverlay").hide();
        });

    }


    $scope.GetIPPortTypes = function () {


        var accSuppID = 0;
        var accSuppName = $("#ddlHVPNAccessSupplier option:selected").html();

        var PortSpeedID = 0;
        var PortSpeed = $("#ddlHVPNPortSpeed option:selected").html();


        if (angular.isUndefined($scope.HVPNAccessSupplier) || $scope.HVPNAccessSupplier == '') {
            $scope.HVPNAccessSupplier = $rootScope.HVPNAccessSupplierIDDefault;
            accSuppID = $scope.HVPNAccessSupplier;
        }
        else {
            accSuppID = $scope.HVPNAccessSupplier;
        }

        if (angular.isUndefined($scope.HVPNPortSpeed) || $scope.HVPNPortSpeed == '') {
            $scope.HVPNPortSpeed = $rootScope.HVPNPortSpeedIDDefault;
            PortSpeedID = $scope.HVPNPortSpeed;
        }
        else {

            PortSpeedID = $scope.HVPNPortSpeed;
        }
        $(".pageLoaderOverlay").show();
        HVPNPortTypesFctry.GetHVPNParentPortTypes($scope.Country, glbHVPNCaseID.getCaseID(), glbHVPNParentCaseID.getParentCaseID(), $rootScope.SelectedPackage, glbProductID.getProductID(), accSuppName, accSuppID, PortSpeedID, PortSpeed, glbParentProductID.getParentProductID()).success(function (data) {
            $(".pageLoaderOverlay").hide();
        });


    }

    $scope.openHVPNPKGDet = function (SuppProdID, PackageName, AccessType, Supplier, SupplierProductBTInternalSLA,
     AccessSpeed, Interface, FramingStructure, Connector, PortPackageID) {

        SLAinfoparam.setAccSuppNameId(SuppProdID);
        HVPNPKGParam.setBTPackage(PackageName);
        HVPNPKGParam.setAccessType(AccessType);
        HVPNPKGParam.setSupplier(Supplier);
        HVPNPKGParam.setSupplierProduct(SupplierProductBTInternalSLA);
        HVPNPKGParam.setPortPackageID(PortPackageID);
        HVPNPKGParam.setPackageID(22861);
        if (!angular.isUndefined(AccessSpeed)) {
            if (AccessSpeed.indexOf('Mbps') == -1) {
                if (AccessSpeed.indexOf('M') > 0) {
                    AccessSpeed = AccessSpeed.replace(" M", "Mbps").replace(" M", "Mbps");
                    //param = param.replace("Mbps", "Mbps").replace("Mbps", "Mbps");
                }
                else if (AccessSpeed.indexOf('Kbps') == -1) {
                    if (AccessSpeed.indexOf('K') > 0) {
                        AccessSpeed = AccessSpeed.replace(" K", "Kbps").replace(" K", "Kbps");
                        // param = param.replace("Kbps", "Kbps").replace("Kbps", "Kbps");
                    }
                    else if (AccessSpeed.indexOf('Gbps') == -1) {
                        if (AccessSpeed.indexOf('G') > 0) {
                            AccessSpeed = AccessSpeed.replace(" G", "Gbps").replace(" G", "Gbps");
                            // param = param.replace("Gbps", "Gbps").replace("Gbps", "Gbps");
                        }
                    }
                }
            }

        }

        var portType = AccessSpeed + ' // ' + Interface + ' // ' + FramingStructure + ' // ' + Connector;
        HVPNPKGParam.setPortType(portType);
        HVPNPKGParam.setIsDSL('N');
        $modal.open({
            templateUrl: 'Search/DispHVPNpkgDetails.htm'
        });
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
            templateUrl: 'Search/SLAInformation.htm'
            //   controller: 'SLAInfoCntrl'
        });
    }

});

app.factory('IPConnectFctry', function ($http, $rootScope, glbParentProductID, HVPNPackagesFctry) {

    var IPConnectFctry = {};

    IPConnectFctry.GetParentDetails = function (CountryID, ProductID, RegionID) {
        
        return $http.post('Search.aspx/GetParentDetails', { 'ProductID': ProductID })
            .success(function (data, status, headers, config) {
                
                glbParentProductID.setParentProductID(data.d);
                var flag = 1;
                if (ProductID == 123)
                    flag = 0;

                HVPNPackagesFctry.GetPackages(RegionID, CountryID, data.d, ProductID, flag,0);
                $scope.HVPNLoaded = 1;

            });
    }
    return IPConnectFctry;
});