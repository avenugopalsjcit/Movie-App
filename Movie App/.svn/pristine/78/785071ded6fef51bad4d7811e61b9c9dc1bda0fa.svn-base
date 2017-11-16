app.controller("HVPNCntrl", function ($http, $scope, $rootScope, $modal, SLAinfoparam, HVPNPackagesFctry, HVPNAccessSuppliersFctry, HVPNPortSpeedFctry, HVPNPortTypesFctry, HVPNBundleProductsFctry, glbProductID, glbRegionID, glbCountryID, glbParentProductID, glbHVPNCaseID, glbHVPNParentCaseID, glbRegionName, glbCountryName, HVPNPKGParam, ProductCPE) {


    $scope.Product = glbProductID.getProductID();
    $scope.Region = glbRegionID.getRegionID();
    $scope.Country = glbCountryID.getCountryID();
    $scope.ProductName = glbProductID.getProductName();
    $("#divParentPortTypesHeading").hide();
    $("#divPortTypesHeading").hide();
    $scope.HVPNPortSpeed = [];

    $scope.PageNo = 1;
    $scope.PageNum = 1;
    $scope.MaxRecords = 1000;
    $scope.MaxRecords1 = 1000;
    $scope.PageSize = 10;

    $("#divHVPNParentPaging1").hide();
    $("#divHVPNParentPaging2").hide();

    $("#divHVPNChildPaging1").hide();
    $("#divHVPNChildPaging2").hide();



    $scope.$on('GetHVPNInfo', function (event, obj) {

        $scope.GetParentDetails();

    });

    $scope.$on('GetIPConnect', function (event, obj) {

        $scope.GetParentDetails();

    });

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

    $scope.GetParentDetails = function () {


        if (angular.isUndefined($scope.HVPNLoaded) || $scope.HVPNLoaded == "0") {
            $(".pageLoaderOverlay").show();
            return $http.post('Search.aspx/GetParentDetails', { 'ProductID': $scope.Product })
            .success(function (data, status, headers, config) {

                glbParentProductID.setParentProductID(data.d);

                $("#HvpnTableData").hide();
                HVPNPackagesFctry.GetPackages($scope.Region, $scope.Country, glbParentProductID.getParentProductID(), $scope.Product, 0, 0);
                $scope.HVPNLoaded = 1;



            });
        }
    }

    $scope.GetBundleData = function () {

        var url = "Search/CPEBundleHVPN.htm";
        var q1 = "?productid=" + $scope.Product;
        var q2 = "&countryid=" + $scope.Country;


        url = url + q1 + q2;
        window.open(url, "_blank", "toolbar=yes, scrollbars=yes, resizable=yes");

    }

    $scope.GetPortSpeedData = function () {

        var accSuppID = 0;
        var accSuppName = $("#ddlHVPNAccessSupplier option:selected").html();

        if (angular.isUndefined($scope.HVPNAccessSupplier) || $scope.HVPNAccessSupplier == '') {
            $scope.HVPNAccessSupplier = $rootScope.HVPNAccessSupplierIDDefault;
            accSuppID = $scope.HVPNAccessSupplier;
        }
        else {
            accSuppID = $scope.HVPNAccessSupplier;
        }
        var PortSpeed = $("#ddlHVPNPortSpeed option:selected").html();
        if (angular.isUndefined($scope.HVPNPortSpeed) || $scope.HVPNPortSpeed == '') {
            $scope.HVPNPortSpeed = $rootScope.HVPNPortSpeedIDDefault;
            PortSpeedID = $scope.HVPNPortSpeed;
        }
        else {

            PortSpeedID = $scope.HVPNPortSpeed;
        }
        $(".pageLoaderOverlay").show();

        HVPNPortTypesFctry.GetHVPNParentPortTypes($scope.Country, glbHVPNCaseID.getCaseID(), glbHVPNParentCaseID.getParentCaseID(), 22861, glbProductID.getProductID(), accSuppName, accSuppID, PortSpeedID, PortSpeed, glbParentProductID.getParentProductID())
        .success(function (data) {



            $("#ddlBTPackage").val("number:" + 22861);

            $scope.PackageIDDefault = PackageID;
            $scope.BTPackage = PackageID;
            //$scope.HVPNAccessSupplierIDDefault = AccessSupplierID;
            //$scope.HVPNPortSpeedIDDefault = PortSpeedID;

            //$(".pageLoaderOverlay").hide();
            if (data.d.length == 0) {

                $("#HvpnNoData").show();
                $("#HvpnTableData").hide();
            }
            else {
                $("#HvpnNoData").hide();
                $("#HvpnTableData").show();

                $scope.HVPNPortTypeData = data.d;

            }

            $(".pageLoaderOverlay").hide();
        });
    }


    $scope.GetHVPNPortTypes = function (flag) {

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
        if (!validInput) {
            return;
        }


        //        if (PortSpeed == 'All') {
        //            PortSpeedID = 0;
        //            $("#spnHVPNPortSpeed").hide();
        //        }

        var PortSpeed1 = 0;
        var PortSpeed2 = 0;
        var Data1Loaded = 0, Data2Loaded = 0;
        $(".pageLoaderOverlay").show();

        if (flag == true) {
            $scope.PageNo = 1;
            $scope.PageNum = 1;
        }
        
        HVPNPortTypesFctry.GetHVPNParentPortTypes($scope.Country, glbHVPNCaseID.getCaseID(), glbHVPNParentCaseID.getParentCaseID(), 22861, glbProductID.getProductID(), accSuppName, accSuppID, PortSpeedID, PortSpeed, glbParentProductID.getParentProductID(), $scope.PageNo).success(function (data) {

            
            $("#ddlBTPackage").val("number:" + 22861);

            $scope.PackageIDDefault = 22861;
            $scope.BTPackage = 22861;

            if (data.d.length == 0) {

                //$("#trHeading1").show();
                Data1Loaded = 0;
                $("#HvpnTableData").hide();
                $("#divPortTypesHeading").hide();
                // $("#HvpnNoData").show();

                $("#divHVPNChildPaging1").hide();
                $("#divHVPNChildPaging2").hide();

            }
            else {
                //$("#trHeading1").hide();
                //$("#HvpnTableData").show(); 
              
                Data1Loaded = 1;
                $("#HvpnNoData").hide();
                $("#divPortTypesHeading").show();
                $scope.HVPNPortTypeData = data.d;

                if (data.d[0].RecCount > 10) {
                    $("#divHVPNChildPaging1").show();
                    $("#divHVPNChildPaging2").show();
                }
                else {
                    $("#divHVPNChildPaging1").hide();
                    $("#divHVPNChildPaging2").hide();
                }

                $scope.MaxRecords1 = data.d[0].RecCount;
                $scope.ChildPageCount = data.d[0].PageCount;
                
                if (data.d.length == 1) {
                    $("#HvpnTableData").attr("style", "height:108px");
                }
                if (data.d.length == 2) {
                    $("#HvpnTableData").attr("style", "height:143px");
                }
                if (data.d.length == 3) {
                    $("#HvpnTableData").attr("style", "height:178px");
                }
                if (data.d.length == 4) {
                    $("#HvpnTableData").attr("style", "height:213px");
                }
                if (data.d.length == 5) {
                    $("#HvpnTableData").attr("style", "height:248px");
                }
                if (data.d.length == 6) {
                    $("#HvpnTableData").attr("style", "height:283px");
                }
                if (data.d.length == 7) {
                    $("#HvpnTableData").attr("style", "height:313px");
                }
                if (data.d.length == 8) {
                    $("#HvpnTableData").attr("style", "height:353px");
                }
                if (data.d.length == 9) {
                    $("#HvpnTableData").attr("style", "height:388px");
                }
                if (data.d.length == 10) {
                    $("#HvpnTableData").attr("style", "height:423px");
                }
                if (data.d.length > 10) {
                    $("#HvpnTableData").attr("style", "height:458px");
                }

            }

            PortSpeed1 = 1;
            if (PortSpeed1 == 1 && PortSpeed2 == 1) {
                if (Data1Loaded == 0 && Data2Loaded == 0) {
                    $("#HvpnNoData").show();
                }
                else {
                    $("#HvpnNoData").hide();
                }

                $(".pageLoaderOverlay").hide();
            }


            

            //$(".pageLoaderOverlay").hide();
        });

        if (glbParentProductID.getParentProductID() > 0) {
            
            $http.post('Search.aspx/GetTechnologyPortSpeeds', { 'ProductID': glbProductID.getProductID(), 'CountryID': glbCountryID.getCountryID(), 'PackageID': 22861, 'Type': 1 })
                .success(function (data, status, headers, config) {
                    
                    if (data.d > 0) {
                        // Getting Parent data 
                        
                        HVPNPortTypesFctry.GetHVPNParentPortTypes($scope.Country, glbHVPNCaseID.getCaseID(), glbHVPNParentCaseID.getParentCaseID(), 22861, glbParentProductID.getParentProductID(), accSuppName, accSuppID, PortSpeedID, PortSpeed, 0, $scope.PageNo).success(function (data) {
                            
                            if (data.d.length == 0) {
                                Data2Loaded = 0;
                                $("#divHVPNParentPortTypes").hide();
                                $("#divParentPortTypesHeading").hide();
                                $("#HvpnNoData").show();

                                $("#divHVPNParentPaging1").hide();
                                $("#divHVPNParentPaging2").hide();

                            }
                            else {

                                //$("#HvpnNoData").hide();
                                Data2Loaded = 1;
                                $("#divHVPNParentPortTypes").show();
                                $("#divParentPortTypesHeading").show();
                                $scope.HVPNParentPortTypeData = data.d;

                                //$scope.HVPNParentPortTypeData = data.d;
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
                                    $("#divHVPNParentPortTypes").attr("style", "height:108px");
                                }
                                if (data.d.length == 2) {
                                    $("#divHVPNParentPortTypes").attr("style", "height:143px");
                                }
                                if (data.d.length == 3) {
                                    $("#divHVPNParentPortTypes").attr("style", "height:178px");
                                }
                                if (data.d.length == 4) {
                                    $("#divHVPNParentPortTypes").attr("style", "height:213px");
                                }
                                if (data.d.length == 5) {
                                    $("#divHVPNParentPortTypes").attr("style", "height:248px");
                                }
                                if (data.d.length == 6) {
                                    $("#divHVPNParentPortTypes").attr("style", "height:283px");
                                }
                                if (data.d.length == 7) {
                                    $("#divHVPNParentPortTypes").attr("style", "height:313px");
                                }
                                if (data.d.length == 8) {
                                    $("#divHVPNParentPortTypes").attr("style", "height:353px");
                                }
                                if (data.d.length == 9) {
                                    $("#divHVPNParentPortTypes").attr("style", "height:388px");
                                }
                                if (data.d.length == 10) {
                                    $("#divHVPNParentPortTypes").attr("style", "height:423px");
                                }
                                if (data.d.length > 10) {
                                    $("#divHVPNParentPortTypes").attr("style", "height:458px");
                                }

                            }


                            PortSpeed2 = 1;
                            //Data2Loaded = 1;
                            if (Data1Loaded == 0 && Data2Loaded == 0) {
                                $("#HvpnNoData").show();
                            }
                            else {
                                $("#HvpnNoData").hide();
                            }

                            if (PortSpeed1 == 1 && PortSpeed2 == 1) {
                                $(".pageLoaderOverlay").hide();
                            }





                        });
                    }
                    else {
                        
                        Data2Loaded = 1;
                        if (Data1Loaded == 0 && Data2Loaded == 0) {
                            $("#HvpnNoData").show();
                        }
                        else {
                            $("#HvpnNoData").hide();
                        }

                        PortSpeed2 = 1;
                        if (PortSpeed1 == 1 && PortSpeed2 == 1) {
                            $(".pageLoaderOverlay").hide();
                        }
                    }
                });

        }
        else {
            
            Data2Loaded = 1;
            if (Data1Loaded == 0 && Data2Loaded == 0) {
                $("#HvpnNoData").show();
            }
            else {
                $("#HvpnNoData").hide();
            }

            PortSpeed2 = 1;
            if (PortSpeed1 == 1 && PortSpeed2 == 1) {
                $(".pageLoaderOverlay").hide();
            }
        }

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
        $scope.GetParentHVPNPortTypes();
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
        $scope.GetParentHVPNPortTypes();
    }


    $scope.PrevChild = function () {


        if ($scope.PageNum == 1) {
            return;
        }

        if ($scope.PageNum > 1) {
            $scope.PageNum = $scope.PageNum - 1;
        }
        else {
            $scope.PageNum = 1;
        }
        $scope.GetChildHVPNPortTypes();
    }

    $scope.NextChild = function () {

        var RecCount = 0;
        if ($scope.PageNum > 0) {
            //$scope.MaxRecords

            if (($scope.PageNum * $scope.PageSize) >= $scope.MaxRecords1) {
                //alert("Pages Completed");
                return;
            }
            else {
                $scope.PageNum = $scope.PageNum + 1;
            }

        }
        else {
            $scope.PageNum = 1;
        }
        $scope.GetChildHVPNPortTypes();
    }


    $scope.GetChildHVPNPortTypes = function () {

        var accSuppID = 0;
        var accSuppName = $("#ddlHVPNAccessSupplier option:selected").html();

        var PortSpeedID = 0;
        var PortSpeed = $("#ddlHVPNPortSpeed option:selected").html();

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
        if (!validInput) {
            return;
        }


        $(".pageLoaderOverlay").show();


        HVPNPortTypesFctry.GetHVPNParentPortTypes($scope.Country, glbHVPNCaseID.getCaseID(), glbHVPNParentCaseID.getParentCaseID(), 22861, glbProductID.getProductID(), accSuppName, accSuppID, PortSpeedID, PortSpeed, glbParentProductID.getParentProductID(), $scope.PageNum).success(function (data) {

            if (data.d.length == 0) {

                //$("#trHeading1").show();
                Data1Loaded = 0;
                $("#HvpnTableData").hide();
                $("#divPortTypesHeading").hide();
                // $("#HvpnNoData").show();

            }
            else {
                //$("#trHeading1").hide();
                //$("#HvpnTableData").show();
                Data1Loaded = 1;
                $("#HvpnNoData").hide();
                $("#divPortTypesHeading").show();
                $scope.HVPNPortTypeData = data.d;

                if (data.d[0].RecCount > 10) {
                    $("#divHVPNChildPaging1").show();
                    $("#divHVPNChildPaging2").show();
                }
                else {
                    $("#divHVPNChildPaging1").hide();
                    $("#divHVPNChildPaging2").hide();
                }

                $scope.MaxRecords1 = data.d[0].RecCount;
                $scope.ChildPageCount = data.d[0].PageCount;

                if (data.d.length == 1) {
                    $("#HvpnTableData").attr("style", "height:108px");
                }
                if (data.d.length == 2) {
                    $("#HvpnTableData").attr("style", "height:143px");
                }
                if (data.d.length == 3) {
                    $("#HvpnTableData").attr("style", "height:178px");
                }
                if (data.d.length == 4) {
                    $("#HvpnTableData").attr("style", "height:213px");
                }
                if (data.d.length == 5) {
                    $("#HvpnTableData").attr("style", "height:248px");
                }
                if (data.d.length == 6) {
                    $("#HvpnTableData").attr("style", "height:283px");
                }
                if (data.d.length == 7) {
                    $("#HvpnTableData").attr("style", "height:313px");
                }
                if (data.d.length == 8) {
                    $("#HvpnTableData").attr("style", "height:353px");
                }
                if (data.d.length == 9) {
                    $("#HvpnTableData").attr("style", "height:388px");
                }
                if (data.d.length == 10) {
                    $("#HvpnTableData").attr("style", "height:423px");
                }
                if (data.d.length > 10) {
                    $("#HvpnTableData").attr("style", "height:458px");
                }

            }



            $(".pageLoaderOverlay").hide();
        });

    }

    $scope.GetParentHVPNPortTypes = function () {

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
        if (!validInput) {
            return;
        }


        $(".pageLoaderOverlay").show();

        HVPNPortTypesFctry.GetHVPNParentPortTypes($scope.Country, glbHVPNCaseID.getCaseID(),
            glbHVPNParentCaseID.getParentCaseID(), 22861, glbParentProductID.getParentProductID(), accSuppName, accSuppID, PortSpeedID, PortSpeed, 0, $scope.PageNo).success(function (data) {

                if (data.d.length == 0) {

                    $("#divHVPNParentPortTypes").hide();
                    $("#divParentPortTypesHeading").hide();
                    $("#HvpnNoData").show();
                }
                else {

                    //$("#HvpnNoData").hide();

                    $("#divHVPNParentPortTypes").show();
                    $("#divParentPortTypesHeading").show();
                    $scope.HVPNParentPortTypeData = data.d;

                    //$scope.HVPNParentPortTypeData = data.d;
                    if (data.d[0].RecCount > 10) {
                        $("#divHVPNParentPaging1").show();
                        $("#divHVPNParentPaging2").show();
                    }
                    else {
                        $("#divHVPNParentPaging1").show();
                        $("#divHVPNParentPaging2").show();
                    }
                    $scope.MaxRecords = data.d[0].RecCount;
                    $scope.PageCount = data.d[0].PageCount;


                    if (data.d.length == 1) {
                        $("#divHVPNParentPortTypes").attr("style", "height:108px");
                    }
                    if (data.d.length == 2) {
                        $("#divHVPNParentPortTypes").attr("style", "height:143px");
                    }
                    if (data.d.length == 3) {
                        $("#divHVPNParentPortTypes").attr("style", "height:178px");
                    }
                    if (data.d.length == 4) {
                        $("#divHVPNParentPortTypes").attr("style", "height:213px");
                    }
                    if (data.d.length == 5) {
                        $("#divHVPNParentPortTypes").attr("style", "height:248px");
                    }
                    if (data.d.length == 6) {
                        $("#divHVPNParentPortTypes").attr("style", "height:283px");
                    }
                    if (data.d.length == 7) {
                        $("#divHVPNParentPortTypes").attr("style", "height:313px");
                    }
                    if (data.d.length == 8) {
                        $("#divHVPNParentPortTypes").attr("style", "height:353px");
                    }
                    if (data.d.length == 9) {
                        $("#divHVPNParentPortTypes").attr("style", "height:388px");
                    }
                    if (data.d.length == 10) {
                        $("#divHVPNParentPortTypes").attr("style", "height:423px");
                    }
                    if (data.d.length > 10) {
                        $("#divHVPNParentPortTypes").attr("style", "height:458px");
                    }

                }

                $(".pageLoaderOverlay").hide();




                $(".pageLoaderOverlay").hide();
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

    //siba end


});



app.factory('HVPNPackagesFctry', function ($http, $rootScope, glbHVPNCaseID, glbHVPNParentCaseID, glbRegionName, glbCountryName, HVPNGenerateTunnelingNote, HVPNAccessSuppliersFctry, HVPNPortSpeedFctry, UserInfofactory, ProductCPE) {

    var HVPNPackagesFctry = {};

    HVPNPackagesFctry.GetPackages = function (RegionID, CountryID, ParentProductID, ProductID, flag, AccessSupplierID) {
        // $(".pageLoaderOverlay").show();

        return $http.post('Search.aspx/GetPackages', { 'RegionID': RegionID, 'CountryID': CountryID, 'ParentProductID': ParentProductID, 'ProductID': ProductID, 'Type': 'HVPN', 'AccessSupplierID': AccessSupplierID })
        .success(function (data, status, headers, config) {


            if (data.d.CaseID == 0 || data.d.ParentCaseID == 0) {
                if (ParentProductID > 0 && data.d.ParentCaseID == 0) {
                    $(".pageLoaderOverlay").hide();
                    $("#HvpnNoData").show();
                    $("#HvpnTableData").hide();
                }
            }

            glbHVPNCaseID.setCaseID(data.d.CaseID);
            glbHVPNParentCaseID.setParentCaseID(data.d.ParentCaseID);
            glbRegionName.setRegionName(data.d.RegionName);
            glbCountryName.setCountryName(data.d.CountryName);

            firstrec = 0;
            SelectedPackage = 0;
            var PackageData = [];
            $rootScope.BTPackageData = [];
            if (data.d.package == null) {
                $(".pageLoaderOverlay").hide();
                $("#divNoData").show();

                $("#divFilters").hide();
                $("#TunnelNote").hide();
                $("#CPEInfo").hide();
                $("#HvpnNoData").hide();

                $("#TunnelnoteCollapsible").hide();
                $("#divFilters").hide();
                $("#CPEBundleData").hide();
                $("#HvpnNoData").hide();
                $("#HvpnTableData").hide();
                $("#divUserInfo").hide();
                return;
            }
            data.d.package.forEach(function (item) {
                if (firstrec == 0) {
                    $rootScope.SelectedPackage = item.PackageID;
                }
                PackageData.push({ PackageID: item.PackageID, PackageName: item.PackageName });
                firstrec = 1;
            });

            ProductCPE.GetProductCPE(ProductID, CountryID, glbHVPNCaseID.getCaseID()).success(function (data) {

                $rootScope.CPEExists = data.d;
            });

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

            HVPNAccessSuppliersFctry.GetHVPNAccessSuppliers(RegionID, CountryID, ParentProductID, ProductID, glbHVPNCaseID.getCaseID(), glbHVPNParentCaseID.getParentCaseID(), $rootScope.SelectedPackage, flag);

            HVPNGenerateTunnelingNote.GenerateTunnelingNote();
            $rootScope.BTPackageData = PackageData;



            $rootScope.$apply();
        })
        .error(function (error) {
            alert("Problem occured while loading BT Packages; " + JSON.stringify(error));
        });
    }

    return HVPNPackagesFctry;
});

app.factory('HVPNAccessSuppliersFctry', function ($http, $rootScope, glbHVPNCaseID, glbHVPNParentCaseID, HVPNPortSpeedFctry) {

    var HVPNAccessSuppliersFctry = {};

    HVPNAccessSuppliersFctry.GetHVPNAccessSuppliers = function (RegionID, CountryID, ParentProductID, ProductID, CaseID, ParentCaseID, PackageID, flag) {

        return $http.post('Search.aspx/GetHVPNAccessSuppliers', { 'RegionID': RegionID, 'CountryID': CountryID, 'ParentProductID': ParentProductID, 'ProductID': ProductID, 'CaseID': CaseID, 'ParentCaseID': ParentCaseID, 'PackageID': PackageID })
        .success(function (data, status, headers, config) {

            $rootScope.HVPNAccessSuppliersData = [];
            AccessSuppliers = [];
            firstrec = 0;
            HVPNAccessSupplierName = '';
            HVPNAccessSupplierID = 0;

            if (data.d.length == 0) {
                $(".pageLoaderOverlay").hide();
                $("#HvpnNoData").show();
                $("#HvpnTableData").hide();
                return;
            }

            data.d.forEach(function (item) {
                if (firstrec == 0) {
                    HVPNAccessSupplierName = item.AccessSupplier;
                    HVPNAccessSupplierID = item.AccessSupplierID;
                    $("#ddlHVPNAccessSupplier").val("number:" + HVPNAccessSupplierID);
                    HVPNPortSpeedFctry.GetHVPNPortSpeeds(CountryID, glbHVPNCaseID.getCaseID(), glbHVPNParentCaseID.getParentCaseID(), PackageID, HVPNAccessSupplierID, HVPNAccessSupplierName, flag, ProductID);
                }
                AccessSuppliers.push({ supplierID: item.AccessSupplierID, SupplierName: item.AccessSupplier });
                firstrec = 1;
            });

            $rootScope.HVPNAccessSuppliersData = AccessSuppliers;
            $rootScope.$apply();
        })
        .error(function (error) {
            alert("Problem occured while loading Access Suppliers; " + JSON.stringify(error));
        });
    }

    return HVPNAccessSuppliersFctry;
});

app.factory('HVPNPortSpeedFctry', function ($http, $rootScope, HVPNPortTypesFctry, HVPNBundleProductsFctry, glbProductID, glbParentProductID) {

    var HVPNPortSpeedFctry = {};

    HVPNPortSpeedFctry.GetHVPNPortSpeeds = function (CountryID, CaseID, ParentCaseID, PackageID, AccessSupplierID, AccessSupplierName, flag, ProductID) {

        return $http.post('Search.aspx/GetHVPNPortSpeeds', { 'CountryID': CountryID, 'CaseID': CaseID, 'ParentCaseID': ParentCaseID, 'PackageID': PackageID, 'flag': flag, 'ProductID': ProductID })
        .success(function (data, status, headers, config) {

            $rootScope.HVPNPortSpeedData = [];
            PortSpeeddt = [];
            firstrec = 0;
            HVPNPortSpeed = '';
            HVPNPortSpeedID = 0;
            data.d.forEach(function (item) {
                if (firstrec == 0) {
                    HVPNPortSpeed = item.PortSpeed;
                    HVPNPortSpeedID = item.PortSpeedID;

                    //                    HVPNPortTypesFctry.GetHVPNParentPortTypes(CountryID, CaseID, ParentCaseID, PackageID, glbProductID.getProductID(), AccessSupplierName, AccessSupplierID, HVPNPortSpeedID, HVPNPortSpeed, glbParentProductID.getParentProductID()).success(function (data) {
                    //                        $(".pageLoaderOverlay").hide();
                    //                    });

                    //HVPNBundleProductsFctry.GetBundleProducts(CountryID, glbProductID.getProductID());
                }
                PortSpeeddt.push({ PortSpeedID: item.PortSpeedID, PortSpeed: item.PortSpeed });
                firstrec = 1;
            });
            $rootScope.HVPNPortSpeedData = PortSpeeddt;
            $(".pageLoaderOverlay").hide();
            $rootScope.$apply();
        })
        .error(function (error) {
            //alert("Problem occured while loading HVPN Port Speed; " + JSON.stringify(error));
        });
    }

    return HVPNPortSpeedFctry;
});

app.factory('HVPNGenerateTunnelingNote', function ($http, $rootScope, glbCountryName) {

    var HVPNGenerateTunnelingNote = {};

    HVPNGenerateTunnelingNote.GenerateTunnelingNote = function () {

        return $http.post('Search.aspx/GenerateTunnelingNote', { 'CountryName': glbCountryName.getCountryName() })
        .success(function (data, status, headers, config) {

            $rootScope.TunnelingNote = '';

            $rootScope.TunnelingNote = data.d;
            $rootScope.$apply();
        })
        .error(function (error) {
            alert("Problem occured while loading Tunneling Note " + JSON.stringify(error));
        });
    }

    return HVPNGenerateTunnelingNote;
});


app.factory('HVPNPortTypesFctry', function ($http, $rootScope) {

    var HVPNPortTypesFctry = {};

    HVPNPortTypesFctry.GetHVPNParentPortTypes = function (CountryID, CaseID, ParentCaseID, PackageID, ProductID, AccessSupplier, AccessSupplierID, PortSpeedID, PortSpeeds, ParentProductID,PageNo) {

        return $http.post('Search.aspx/GetHVPNParentPortTypes', { 'CountryID': CountryID, 'CaseID': CaseID, 'ParentCaseID': ParentCaseID, 'PackageID': PackageID, 'ProductID': ProductID, 'AccessSupplier': AccessSupplier, 'AccessSupplierID': AccessSupplierID, 'PortSpeedID': PortSpeedID, 'PortSpeeds': PortSpeeds, 'ParentProductID': ParentProductID, 'PageNo': PageNo })
        .success(function (data, status, headers, config) {

        })
        .error(function (error) {
            //alert("Problem occured while loading HVPN Port Types " + JSON.stringify(error));
        });
    }

    return HVPNPortTypesFctry;
});

app.factory('HVPNBundleProductsFctry', function ($http, $rootScope) {

    var HVPNBundleProductsFctry = {};

    HVPNBundleProductsFctry.GetBundleProducts = function (CountryID, ProductID) {

        return $http.post('Search.aspx/GetBundleProducts', { 'CountryID': CountryID, 'ProductID': ProductID })
        .success(function (data, status, headers, config) {
            $rootScope.BundleProductsData = data.d;
            $rootScope.$apply();
        })
        .error(function (error) {
            alert("Problem occured while loading Bundle Products" + JSON.stringify(error));
        });
    }

    return HVPNBundleProductsFctry;
});



app.service("glbRegionName", function () {
    var RegionName = "";
    return {
        getRegionName: function () {
            return RegionName;
        },
        setRegionName: function (value) {
            RegionName = value;
        }
    }
});

app.service("glbCountryName", function () {
    var CountryName = "";
    return {
        getCountryName: function () {
            return CountryName;
        },
        setCountryName: function (value) {
            CountryName = value;
        }
    }
});


app.service("glbHVPNCaseID", function () {
    var CaseID = "";
    return {
        getCaseID: function () {
            return CaseID;
        },
        setCaseID: function (value) {
            CaseID = value;
        }
    }
});

app.service("glbHVPNParentCaseID", function () {
    var ParentCaseID = "";
    return {
        getParentCaseID: function () {
            return ParentCaseID;
        },
        setParentCaseID: function (value) {
            ParentCaseID = value;
        }
    }
});



app.factory('HVPNAccSuppfactory', function ($http, glbHVPNCaseID, glbHVPNParentCaseID, HVPNPortSpeedfactory) {

    var HVPNAccSuppfactory = {};

    HVPNAccSuppfactory.GetHVPNAccessSuppliers = function (RegionID, CountryID, ParentProductID, ProductID, CaseID, ParentCaseID, PackageID, flag) {

        return $http.post('Search.aspx/GetHVPNAccessSuppliers', { 'RegionID': RegionID, 'CountryID': CountryID, 'ParentProductID': ParentProductID, 'ProductID': ProductID, 'CaseID': CaseID, 'ParentCaseID': ParentCaseID, 'PackageID': PackageID })
        .success(function (data, status, headers, config) {



        })
        .error(function (error) {
            alert("Problem occured while loading HVPN Access Suppliers; " + JSON.stringify(error));
        });
    }

    return HVPNAccSuppfactory;
});

app.factory('HVPNPortSpeedfactory', function ($http, $rootScope, HVPNPortTypesFctry, HVPNBundleProductsFctry, glbProductID, glbParentProductID) {

    var HVPNPortSpeedfactory = {};

    HVPNPortSpeedfactory.GetHVPNPortSpeeds = function (CountryID, CaseID, ParentCaseID, PackageID, AccessSupplierID, AccessSupplierName, flag, ProductID) {

        return $http.post('Search.aspx/GetHVPNPortSpeeds', { 'CountryID': CountryID, 'CaseID': CaseID, 'ParentCaseID': ParentCaseID, 'PackageID': PackageID, 'flag': flag, 'ProductID': ProductID })
        .success(function (data, status, headers, config) {

        })
        .error(function (error) {
            //alert("Problem occured while loading HVPN Port Speed; " + JSON.stringify(error));
        });
    }

    return HVPNPortSpeedfactory;
});


app.factory('HVPNPacksFactory', function ($http, $rootScope, glbHVPNCaseID, glbHVPNParentCaseID, glbRegionName, glbCountryName, HVPNAccSuppfactory) {

    var HVPNPacksFactory = {};

    HVPNPacksFactory.GetPackages = function (RegionID, CountryID, ParentProductID, ProductID, flag, AccessSupplierID) {
        // $(".pageLoaderOverlay").show();

        return $http.post('Search.aspx/GetPackages', { 'RegionID': RegionID, 'CountryID': CountryID, 'ParentProductID': ParentProductID, 'ProductID': ProductID, 'Type': 'HVPN', 'AccessSupplierID': AccessSupplierID })
        .success(function (data, status, headers, config) {

        })
        .error(function (error) {
            alert("Problem occured while loading BT Packages; " + JSON.stringify(error));
        });
    }

    return HVPNPacksFactory;
});