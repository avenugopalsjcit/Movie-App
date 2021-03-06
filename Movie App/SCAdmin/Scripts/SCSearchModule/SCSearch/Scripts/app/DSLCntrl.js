﻿app.controller("DSLCntrl", function ($http, $scope, $rootScope, $modal, SLAinfoparam, HVPNBundleProductsFctry, DSLPackagesFctry, DSLPortTypesFctry, glbProductID, HVPNGenerateTunnelingNote, glbRegionID, glbCountryID, glbParentProductID, DSLAccessSuppliersFctry, glbHVPNCaseID, glbHVPNParentCaseID, HVPNPKGParam, glbRegionName, glbCountryName, UserInfofactory, ProductCPE) {

    $scope.Product = glbProductID.getProductID();
    $scope.Region = glbRegionID.getRegionID();
    $scope.Country = glbCountryID.getCountryID();
    $scope.ProductName = glbProductID.getProductName();
    $("#divDSLParentPortTypesDaga").hide();
    $("#divDSLData").show();
    $("#divDSLParentPortTypesHeading").hide();
    $("#divDSLPortTypesHeading").hide();

    $scope.PageNo = 1;
    $scope.PageNum = 1;
    $scope.MaxRecords = 1000;
    $scope.MaxRecords1 = 1000;
    $scope.PageSize = 10;

    $("#divDSLParentPaging1").hide();
    $("#divDSLParentPaging2").hide();

    $("#divDSLChildPaging1").hide();
    $("#divDSLChildPaging2").hide();

    $scope.$on('GetDSLInfo', function (event, obj) {

        $scope.GetParentDetails();

    });

    $scope.GetParentDetails = function () {
        if (angular.isUndefined($scope.DSLLoaded) || $scope.DSLLoaded == "0") {
            $scope.DSLLoaded = "1";
            $(".pageLoaderOverlay").show();
            return $http.post('Search.aspx/GetParentDetails', { 'ProductID': $scope.Product })
            .success(function (data, status, headers, config) {

            glbParentProductID.setParentProductID(data.d);
            $rootScope.DSLAccessSuppliersData = [];


            DSLPackagesFctry.GetPackages($scope.Region, $scope.Country, glbParentProductID.getParentProductID(), $scope.Product, 0).success(function (data) {

                glbHVPNCaseID.setCaseID(data.d.CaseID);
                glbHVPNParentCaseID.setParentCaseID(data.d.ParentCaseID);
                glbRegionName.setRegionName(data.d.RegionName);
                glbCountryName.setCountryName(data.d.CountryName);

                firstrec = 0;
                var PackageData = [];
                $scope.BTPackageData = [];

                if (data.d.CaseID == 0) {
                    $(".pageLoaderOverlay").hide();
                    $("#DSLNoData").show();
                    $("#divDSLData").hide();
                    $("#divUserInfo").hide();
                    return;
                }

                if (data.d.package.length == 0) {
                    $(".pageLoaderOverlay").hide();
                    $("#DSLNoData").show();
                    $("#divDSLData").hide();
                    $("#divUserInfo").hide();
                    return;
                }

                HVPNGenerateTunnelingNote.GenerateTunnelingNote();

                UserInfofactory.GetUserInfo(glbHVPNCaseID.getCaseID(), 'CLA_PRODUCT_CASES').success(function (data) {

                    $("#divUserInfo").show();
                    $rootScope.CreatedBy = data.d.CreatedBy;
                    $rootScope.CreatedDate = data.d.CreatedDate;
                    $rootScope.UpdatedBy = data.d.UpdatedBy;
                    $rootScope.UpdatedDate = data.d.UpdatedDate;
                });


                ProductCPE.GetProductCPE($scope.Product, $scope.Country, glbHVPNCaseID.getCaseID()).success(function (data) {

                    $scope.CPEExists = data.d;
                });

                $("#divDSLData").hide();

                if (data.d.package.length == 1) {

                    $scope.DSLBTPackage = data.d.package[0].PackageID;
                    DSLAccessSuppliersFctry.GetDSLAccessSuppliers($scope.Region, $scope.Country, glbParentProductID.getParentProductID(), $scope.Product, glbHVPNCaseID.getCaseID(), glbHVPNParentCaseID.getParentCaseID(), data.d.package[0].PackageID).success(function (data) {

                        $scope.DSLAccessSuppliersData = data.d;

                        var firstrec = 0;
                        if (data.d.length == 1) {
                            $scope.DSLAccessSupplier = data.d[0].AccessSupplierID;
                            firstrec = 1;
                        }
                        $(".pageLoaderOverlay").hide();
                    });
                }
                else {
                    DSLAccessSuppliersFctry.GetDSLAccessSuppliers($scope.Region, $scope.Country, glbParentProductID.getParentProductID(), $scope.Product, glbHVPNCaseID.getCaseID(), glbHVPNParentCaseID.getParentCaseID(), 0).success(function (data) {

                        $scope.DSLAccessSuppliersData = data.d;

                        var firstrec = 0;
                        if (data.d.length == 1) {
                            $scope.DSLAccessSupplier = data.d[0].AccessSupplierID;
                            firstrec = 1;

                        }
                        $(".pageLoaderOverlay").hide();
                    });
                }

                data.d.package.forEach(function (item) {
                    PackageData.push({ PackageID: item.PackageID, PackageName: item.PackageName });
                    firstrec = 1;
                });

                $scope.DSLBTPackageData = PackageData;
                //$rootScope.$apply();

            });
            

            });
        }
    }

    $scope.GetDSLAccessSuppliers = function () {

        $("#spnDSLBTPackage").hide();
        $(".pageLoaderOverlay").show();



        if ($scope.DSLBTPackage == '' || $scope.DSLBTPackage == null || angular.isUndefined($scope.DSLBTPackage)) {
            $("#spnDSLAccessSupplier").hide();

            $scope.DSLAccessSupplier = ''

            DSLAccessSuppliersFctry.GetDSLAccessSuppliers($scope.Region, $scope.Country, glbParentProductID.getParentProductID(), $scope.Product, glbHVPNCaseID.getCaseID(), glbHVPNParentCaseID.getParentCaseID(), 0).success(function (data) {
                $scope.DSLAccessSuppliersData = data.d;
                var firstrec = 0;
                if (data.d.length == 1) {
                    $scope.DSLAccessSupplier = data.d[0].AccessSupplierID;
                    firstrec = 1;

                }
                $(".pageLoaderOverlay").hide();
            });
        }
        else {


            DSLAccessSuppliersFctry.GetDSLAccessSuppliers($scope.Region, $scope.Country, glbParentProductID.getParentProductID(), $scope.Product, glbHVPNCaseID.getCaseID(), glbHVPNParentCaseID.getParentCaseID(), $scope.DSLBTPackage).success(function (data) {

                $(".pageLoaderOverlay").hide();
                $scope.DSLAccessSuppliersData = data.d;
                var firstrec = 0;
                if (data.d.length == 1) {
                    $scope.DSLAccessSupplier = data.d[0].AccessSupplierID;
                    firstrec = 1;
                }

                if (data.d.length > 0) {
                    $("#spnDSLAccessSupplier").hide();
                }
                else {

                }
            });
        }

    }

    $scope.ClearDSLPackages = function () {
        $(".pageLoaderOverlay").show();

        DSLPackagesFctry.GetPackages($scope.Region, $scope.Country, glbParentProductID.getParentProductID(), $scope.Product, 0).success(function (data) {

            $scope.DSLBTPackage = ''
            glbHVPNCaseID.setCaseID(data.d.CaseID);
            glbHVPNParentCaseID.setParentCaseID(data.d.ParentCaseID);
            glbRegionName.setRegionName(data.d.RegionName);
            glbCountryName.setCountryName(data.d.CountryName);

            firstrec = 0;
            var PackageData = [];
            $scope.BTPackageData = [];

            if (data.d.CaseID == 0) {
                $(".pageLoaderOverlay").hide();
                $("#DSLNoData").show();
                $("#divDSLData").hide();
                $("#divUserInfo").hide();
                return;
            }

            if (data.d.package.length == 0) {
                $(".pageLoaderOverlay").hide();
                $("#DSLNoData").show();
                $("#divDSLData").hide();
                $("#divUserInfo").hide();
                return;
            }
            $scope.DSLAccessSupplier = ''

            if (data.d.package.length == 1) {

                $scope.DSLBTPackage = data.d.package[0].PackageID;
                DSLAccessSuppliersFctry.GetDSLAccessSuppliers($scope.Region, $scope.Country, glbParentProductID.getParentProductID(), $scope.Product, glbHVPNCaseID.getCaseID(), glbHVPNParentCaseID.getParentCaseID(), data.d.package[0].PackageID).success(function (data) {

                    $scope.DSLAccessSuppliersData = data.d;

                    var firstrec = 0;
                    if (data.d.length == 1) {
                        $scope.DSLAccessSupplier = data.d[0].AccessSupplierID;
                        firstrec = 1;
                    }
                    $(".pageLoaderOverlay").hide();
                });
            }
            else {

                DSLAccessSuppliersFctry.GetDSLAccessSuppliers($scope.Region, $scope.Country, glbParentProductID.getParentProductID(), $scope.Product, glbHVPNCaseID.getCaseID(), glbHVPNParentCaseID.getParentCaseID(), 0).success(function (data) {

                    $scope.DSLAccessSuppliersData = data.d;

                    var firstrec = 0;
                    if (data.d.length == 1) {
                        $scope.DSLAccessSupplier = data.d[0].AccessSupplierID;
                        firstrec = 1;

                    }
                    $(".pageLoaderOverlay").hide();
                });
            }

            data.d.package.forEach(function (item) {
                PackageData.push({ PackageID: item.PackageID, PackageName: item.PackageName });
                firstrec = 1;
            });

            $scope.DSLBTPackageData = PackageData;
            //$rootScope.$apply();

        });

    }

    $scope.GetDSLRemoveAlert = function () {
        $("#spnDSLAccessSupplier").hide();



        if ($scope.DSLAccessSupplier == null || angular.isUndefined($scope.DSLAccessSupplier)) {

        }
        else {

            $(".pageLoaderOverlay").show();
            DSLPackagesFctry.GetPackages($scope.Region, $scope.Country, glbParentProductID.getParentProductID(), $scope.Product, $scope.DSLAccessSupplier).success(function (data) {

                $("#spnDSLBTPackage").hide();
                if (data.d.package != null && data.d.package.length > 0) {
                    $scope.DSLBTPackageData = data.d.package;
                }
                if (data.d.package != null && data.d.package.length == 1) {

                    $scope.DSLBTPackage = data.d.package[0].PackageID;

                }
                else if (data.d.package != null && data.d.package.length == 0) {
                    $scope.DSLBTPackage = '';
                }

                $(".pageLoaderOverlay").hide();
            });
        }
    }

    $scope.GetDSLByAccessSuppliers = function () {


        var BTPackage = 0;
        var validInput = true;
        if (angular.isUndefined($scope.DSLBTPackage) || $scope.DSLBTPackage == '' || $scope.DSLBTPackage == null) {
            $("#spnDSLBTPackage").show();
            validInput = false;
        }
        else {
            BTPackage = $scope.DSLBTPackage;
            $("#spnDSLBTPackage").hide()
        }

        if (angular.isUndefined($scope.DSLAccessSupplier) || $scope.DSLAccessSupplier == '' || $scope.DSLAccessSupplier == null) {
            $("#spnDSLAccessSupplier").show();
            validInput = false;
        }
        else {

            $("#spnDSLAccessSupplier").hide();
        }
        if (!validInput) {
            return;
        }

        $(".pageLoaderOverlay").show();

        var PortSpeed1 = 0;
        var PortSpeed2 = 0;
        $scope.PageNo = 1;

        DSLPortTypesFctry.GetPackages($scope.Country, glbHVPNCaseID.getCaseID(), glbHVPNParentCaseID.getParentCaseID(), BTPackage, $scope.Product, $scope.DSLAccessSupplier, glbParentProductID.getParentProductID(), $scope.PageNo).success(function (data) {

            if (data.d.length == 0) {
                $("#DSLNoData").show();
                $("#divDSLData").hide();
                $("#divDSLPortTypesHeading").hide();

                $("#divDSLChildPaging1").hide();
                $("#divDSLChildPaging2").hide();

            }
            else {
                $("#DSLNoData").hide();
                $("#divDSLData").show();
                $scope.DSLData = data.d;

                if (data.d[0].RecCount > 10) {
                    $("#divDSLChildPaging1").show();
                    $("#divDSLChildPaging2").show();
                }
                else {
                    $("#divDSLChildPaging1").hide();
                    $("#divDSLChildPaging2").hide();
                }

                $scope.MaxRecords1 = data.d[0].RecCount;
                $scope.ChildPageCount = data.d[0].PageCount;

                if (data.d.length == 1) {

                    $("#divDSLData").attr("style", "height:108px");
                    $('#divDSLData').removeClass('scrollbar');

                }
                if (data.d.length == 2) {
                    $("#divDSLData").attr("style", "height:143px");
                    $('#divDSLData').removeClass('scrollbar');
                }
                if (data.d.length == 3) {
                    $("#divDSLData").attr("style", "height:178px");
                    $('#divDSLData').removeClass('scrollbar');
                }
                if (data.d.length == 4) {
                    $("#divDSLData").attr("style", "height:213px");
                    $('#divDSLData').removeClass('scrollbar');
                }
                if (data.d.length == 5) {
                    $("#divDSLData").attr("style", "height:248px");
                    $('#divDSLData').removeClass('scrollbar');
                }
                if (data.d.length == 6) {
                    $("#divDSLData").attr("style", "height:283px");
                    $('#divDSLData').removeClass('scrollbar');
                }
                if (data.d.length == 7) {
                    $("#divDSLData").attr("style", "height:313px");
                    $('#divDSLData').removeClass('scrollbar');
                }
                if (data.d.length == 8) {
                    $("#divDSLData").attr("style", "height:348px");
                    $('#divDSLData').removeClass('scrollbar');
                }
                if (data.d.length == 9) {
                    $("#divDSLData").attr("style", "height:383px");
                    $('#divDSLData').removeClass('scrollbar');
                }
                if (data.d.length == 10) {
                    $("#divDSLData").attr("style", "height:418px");
                    $('#divDSLData').removeClass('scrollbar');
                }
                if (data.d.length > 10) {
                    $("#divDSLData").attr("style", "height:453px");
                }




                $("#divDSLPortTypesHeading").show();
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

                    DSLPortTypesFctry.GetPackages($scope.Country, glbHVPNCaseID.getCaseID(), glbHVPNParentCaseID.getParentCaseID(), BTPackage, glbParentProductID.getParentProductID(), $scope.DSLAccessSupplier, 0, $scope.PageNo).success(function (data) {

                        if (data.d.length == 0) {
                            $("#divDSLParentPortTypesDaga").hide();
                            $("#divDSLParentPortTypesHeading").hide();

                            $("#divDSLParentPaging1").hide();
                            $("#divDSLParentPaging2").hide();



                        }
                        else {

                            $("#divDSLParentPortTypesDaga").show();
                            $scope.DSLParentData = data.d;
                            $("#divDSLParentPortTypesHeading").show();

                            if (data.d[0].RecCount > 10) {

                                $("#divDSLParentPaging1").show();
                                $("#divDSLParentPaging2").show();
                            }
                            else {
                                $("#divDSLParentPaging1").hide();
                                $("#divDSLParentPaging2").hide();
                            }
                            $scope.MaxRecords = data.d[0].RecCount;
                            $scope.PageCount = data.d[0].PageCount;


                            if (data.d.length == 1) {

                                $("#divDSLParentPortTypesDaga").attr("style", "height:108px");
                                $('#divDSLParentPortTypesDaga').removeClass('scrollbar');

                            }
                            if (data.d.length == 2) {
                                $("#divDSLParentPortTypesDaga").attr("style", "height:143px");
                                $('#divDSLParentPortTypesDaga').removeClass('scrollbar');
                            }
                            if (data.d.length == 3) {
                                $("#divDSLParentPortTypesDaga").attr("style", "height:178px");
                                $('#divDSLParentPortTypesDaga').removeClass('scrollbar');
                            }
                            if (data.d.length == 4) {
                                $("#divDSLParentPortTypesDaga").attr("style", "height:213px");
                                $('#divDSLParentPortTypesDaga').removeClass('scrollbar');
                            }
                            if (data.d.length == 5) {
                                $("#divDSLParentPortTypesDaga").attr("style", "height:248px");
                                $('#divDSLParentPortTypesDaga').removeClass('scrollbar');
                            }
                            if (data.d.length == 6) {
                                $("#divDSLParentPortTypesDaga").attr("style", "height:283px");
                                $('#divDSLParentPortTypesDaga').removeClass('scrollbar');
                            }
                            if (data.d.length == 7) {
                                $("#divDSLParentPortTypesDaga").attr("style", "height:313px");
                                $('#divDSLParentPortTypesDaga').removeClass('scrollbar');
                            }
                            if (data.d.length == 8) {
                                $("#divDSLParentPortTypesDaga").attr("style", "height:348px");
                                $('#divDSLParentPortTypesDaga').removeClass('scrollbar');
                            }
                            if (data.d.length == 9) {
                                $("#divDSLParentPortTypesDaga").attr("style", "height:383px");
                                $('#divDSLParentPortTypesDaga').removeClass('scrollbar');
                            }
                            if (data.d.length == 10) {
                                $("#divDSLParentPortTypesDaga").attr("style", "height:418px");
                                $('#divDSLParentPortTypesDaga').removeClass('scrollbar');
                            }
                            if (data.d.length > 10) {
                                $("#divDSLParentPortTypesDaga").attr("style", "height:453px");
                            }

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
        $scope.GetParentDSLData();
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
        $scope.GetParentDSLData();
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
        $scope.GetChildDSLData();
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
        $scope.GetChildDSLData();
    }


    $scope.GetParentDSLData = function () {


        var BTPackage = 0;
        var validInput = true;
        if (angular.isUndefined($scope.DSLBTPackage) || $scope.DSLBTPackage == '' || $scope.DSLBTPackage == null) {
            $("#spnDSLBTPackage").show();
            validInput = false;
        }
        else {
            BTPackage = $scope.DSLBTPackage;
            $("#spnDSLBTPackage").hide()
        }

        if (angular.isUndefined($scope.DSLAccessSupplier) || $scope.DSLAccessSupplier == '' || $scope.DSLAccessSupplier == null) {
            $("#spnDSLAccessSupplier").show();
            validInput = false;
        }
        else {

            $("#spnDSLAccessSupplier").hide();
        }
        if (!validInput) {
            return;
        }

        $(".pageLoaderOverlay").show();

        DSLPortTypesFctry.GetPackages($scope.Country, glbHVPNCaseID.getCaseID(), glbHVPNParentCaseID.getParentCaseID(), BTPackage, glbParentProductID.getParentProductID(), $scope.DSLAccessSupplier, 0, $scope.PageNo).success(function (data) {

            if (data.d.length == 0) {
                $("#divDSLParentPortTypesDaga").hide();
                $("#divDSLParentPortTypesHeading").hide();

                $("#divDSLParentPaging1").hide();
                $("#divDSLParentPaging2").hide();

            }
            else {

                $("#divDSLParentPortTypesDaga").show();
                $scope.DSLParentData = data.d;
                $("#divDSLParentPortTypesHeading").show();

                if (data.d[0].RecCount > 10) {
                    $("#divDSLParentPaging1").show();
                    $("#divDSLParentPaging2").show();
                }

                $scope.MaxRecords = data.d[0].RecCount;
                $scope.PageCount = data.d[0].PageCount;

            }

            if (data.d.length == 1) {

                $("#divDSLData").attr("style", "height:108px");
                $('#divDSLData').removeClass('scrollbar');

            }
            if (data.d.length == 2) {
                $("#divDSLData").attr("style", "height:143px");
                $('#divDSLData').removeClass('scrollbar');
            }
            if (data.d.length == 3) {
                $("#divDSLData").attr("style", "height:178px");
                $('#divDSLData').removeClass('scrollbar');
            }
            if (data.d.length == 4) {
                $("#divDSLData").attr("style", "height:213px");
                $('#divDSLData').removeClass('scrollbar');
            }
            if (data.d.length == 5) {
                $("#divDSLData").attr("style", "height:248px");
                $('#divDSLData').removeClass('scrollbar');
            }
            if (data.d.length == 6) {
                $("#divDSLData").attr("style", "height:283px");
                $('#divDSLData').removeClass('scrollbar');
            }
            if (data.d.length == 7) {
                $("#divDSLData").attr("style", "height:313px");
                $('#divDSLData').removeClass('scrollbar');
            }
            if (data.d.length == 8) {
                $("#divDSLData").attr("style", "height:348px");
                $('#divDSLData').removeClass('scrollbar');
            }
            if (data.d.length == 9) {
                $("#divDSLData").attr("style", "height:383px");
                $('#divDSLData').removeClass('scrollbar');
            }
            if (data.d.length == 10) {
                $("#divDSLData").attr("style", "height:418px");
                $('#divDSLData').removeClass('scrollbar');
            }
            if (data.d.length > 10) {
                $("#divDSLData").attr("style", "height:453px");
            }


            $(".pageLoaderOverlay").hide();

        });

    }

    $scope.GetChildDSLData = function () {


        var BTPackage = 0;
        var validInput = true;
        if (angular.isUndefined($scope.DSLBTPackage) || $scope.DSLBTPackage == '' || $scope.DSLBTPackage == null) {
            $("#spnDSLBTPackage").show();
            validInput = false;
        }
        else {
            BTPackage = $scope.DSLBTPackage;
            $("#spnDSLBTPackage").hide()
        }

        if (angular.isUndefined($scope.DSLAccessSupplier) || $scope.DSLAccessSupplier == '' || $scope.DSLAccessSupplier == null) {
            $("#spnDSLAccessSupplier").show();
            validInput = false;
        }
        else {

            $("#spnDSLAccessSupplier").hide();
        }
        if (!validInput) {
            return;
        }

        $(".pageLoaderOverlay").show();


        DSLPortTypesFctry.GetPackages($scope.Country, glbHVPNCaseID.getCaseID(), glbHVPNParentCaseID.getParentCaseID(), BTPackage, $scope.Product, $scope.DSLAccessSupplier, glbParentProductID.getParentProductID(), $scope.PageNum).success(function (data) {

            if (data.d.length == 0) {
                $("#DSLNoData").show();
                $("#divDSLData").hide();
                $("#divDSLPortTypesHeading").hide();

                $("#divDSLChildPaging1").hide();
                $("#divDSLChildPaging2").hide();

            }
            else {
                $("#DSLNoData").hide();
                $("#divDSLData").show();
                $scope.DSLData = data.d;

                $scope.MaxRecords1 = data.d[0].RecCount;
                $scope.ChildPageCount = data.d[0].PageCount;

                if (data.d[0].RecCount > 10) {
                    $("#divDSLChildPaging1").show();
                    $("#divDSLChildPaging2").show();
                }

                if (data.d.length == 1) {

                    $("#divDSLData").attr("style", "height:108px");
                    $('#divDSLData').removeClass('scrollbar');

                }
                if (data.d.length == 2) {
                    $("#divDSLData").attr("style", "height:143px");
                    $('#divDSLData').removeClass('scrollbar');
                }
                if (data.d.length == 3) {
                    $("#divDSLData").attr("style", "height:178px");
                    $('#divDSLData').removeClass('scrollbar');
                }
                if (data.d.length == 4) {
                    $("#divDSLData").attr("style", "height:213px");
                    $('#divDSLData').removeClass('scrollbar');
                }
                if (data.d.length == 5) {
                    $("#divDSLData").attr("style", "height:248px");
                    $('#divDSLData').removeClass('scrollbar');
                }
                if (data.d.length == 6) {
                    $("#divDSLData").attr("style", "height:283px");
                    $('#divDSLData').removeClass('scrollbar');
                }
                if (data.d.length == 7) {
                    $("#divDSLData").attr("style", "height:313px");
                    $('#divDSLData').removeClass('scrollbar');
                }
                if (data.d.length == 8) {
                    $("#divDSLData").attr("style", "height:348px");
                    $('#divDSLData').removeClass('scrollbar');
                }
                if (data.d.length == 9) {
                    $("#divDSLData").attr("style", "height:383px");
                    $('#divDSLData').removeClass('scrollbar');
                }
                if (data.d.length == 10) {
                    $("#divDSLData").attr("style", "height:418px");
                    $('#divDSLData').removeClass('scrollbar');
                }
                if (data.d.length > 10) {
                    $("#divDSLData").attr("style", "height:453px");
                }

                $("#divDSLPortTypesHeading").show();
            }


            $(".pageLoaderOverlay").hide();


        });


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


    //siba start for CPE parts links

    $scope.openCPEPartsPOPup = function (bundleID) {
        debugger
        var url = "DispCPEParts.htm";
        var q1 = "?bindleID=" + bundleID;
        var q2 = "&countryid=" + $scope.Country;

        url = url + q1 + q2;

        var iframehtml = '<iframe border=0 width="100%" height ="500px" frameborder="0" src="' + url + '"> </iframe>'
        $("div.CPEPartInfo").html(iframehtml);

    }

    $scope.openSALInfoPOPUp = function (pkgID, AccessSupplierCharID, suppProdID, suppAccType, portTypeID, supplier, supplierproduct, DSLSpeed) {
        debugger

        SLAinfoparam.setAccSuppName(supplier);
        SLAinfoparam.setSupProduct(supplierproduct);

        SLAinfoparam.setBTPackageID(pkgID);
        SLAinfoparam.setAccSuppCharID(AccessSupplierCharID);
        SLAinfoparam.setAccSuppNameId(suppProdID);
        SLAinfoparam.setsuppAccTypeId(suppAccType);
        SLAinfoparam.setportTypeID(portTypeID);
        SLAinfoparam.setASpeed(DSLSpeed);
        SLAinfoparam.setstrDSL('Y');


        $modal.open({
            templateUrl: 'Search/SLAInformation.htm',
            controller: 'SLAInfoCntrl'
        });
    }

    $scope.openHVPNPKGDet = function (PackageName, AccessType, Supplier, SupplierProductBTInternalSLA,
     AccessSpeed, Interface, FramingStructure, Connector, ParentPackageID, PackageID, PortPackageID) {
        HVPNPKGParam.setIsDSL('Y');
        HVPNPKGParam.setBTPackage(PackageName);
        HVPNPKGParam.setAccessType(AccessType);
        HVPNPKGParam.setSupplier(Supplier);
        HVPNPKGParam.setSupplierProduct(SupplierProductBTInternalSLA);
        HVPNPKGParam.setPortPackageID(PortPackageID);

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

        HVPNPKGParam.setParentPackageID(ParentPackageID);
        HVPNPKGParam.setPackageID(PackageID);

        $modal.open({
            templateUrl: 'Search/DispHVPNpkgDetails.htm'
        });
    }


    //siba end

});



app.factory('DSLPackagesFctry', function ($http, $rootScope, glbHVPNCaseID, glbHVPNParentCaseID, glbRegionName, glbCountryName, DSLAccessSuppliersFctry, UserInfofactory, ProductCPE) {

    var DSLPackagesFctry = {};

    DSLPackagesFctry.GetPackages = function (RegionID, CountryID, ParentProductID, ProductID, AccessSupplierID) {
        
        
        
        return $http.post('Search.aspx/GetPackages', { 'RegionID': RegionID, 'CountryID': CountryID, 'ParentProductID': ParentProductID, 'ProductID': ProductID, 'Type': 'DSL', 'AccessSupplierID': AccessSupplierID })
        .success(function (data, status, headers, config) {

        })
        .error(function (error) {
            
            alert("Problem occured while loading BT Packages; " + JSON.stringify(error));
        });
    }

    return DSLPackagesFctry;
});

app.factory('DSLAccessSuppliersFctry', function ($http, $rootScope, glbHVPNCaseID, glbHVPNParentCaseID, DSLPortTypesFctry) {

    var DSLAccessSuppliersFctry = {};

    DSLAccessSuppliersFctry.GetDSLAccessSuppliers = function (RegionID, CountryID, ParentProductID, ProductID, CaseID, ParentCaseID, PackageID) {

        return $http.post('Search.aspx/GetHVPNAccessSuppliers', { 'RegionID': RegionID, 'CountryID': CountryID, 'ParentProductID': ParentProductID, 'ProductID': ProductID, 'CaseID': CaseID, 'ParentCaseID': ParentCaseID, 'PackageID': PackageID })
        .success(function (data, status, headers, config) {
            
            
        })
        .error(function (error) {
            alert("Problem occured while loading DSL Access Suppliers; " + JSON.stringify(error));
        });
    }

    return DSLAccessSuppliersFctry;
});


app.factory('DSLPortTypesFctry', function ($http, $rootScope) {

    var DSLPortTypesFctry = {};
    
    DSLPortTypesFctry.GetPackages = function (CountryID, CaseID, ParentCaseID, PackageID, ProductID, AccessSupplierID, ParentProductID,PageNo) {

        return $http.post('Search.aspx/GetDSLParentPortTypes',
        { 'CountryID': CountryID, 'CaseID': CaseID, 'ParentCaseID': ParentCaseID, 'PackageID': PackageID, 'ProductID': ProductID, 'AccessSupplierID': AccessSupplierID, 'ParentProductID': ParentProductID, 'PageNo': PageNo });
    }

    return DSLPortTypesFctry;
});



app.factory('DSLPckgfactory', function ($http) {

    var DSLPckgfactory = {};

    DSLPckgfactory.GetPackages = function (RegionID, CountryID, ParentProductID, ProductID, AccessSupplierID) {
        $(".pageLoaderOverlay").show();
        
        return $http.post('Search.aspx/GetPackages', { 'RegionID': RegionID, 'CountryID': CountryID, 'ParentProductID': ParentProductID, 'ProductID': ProductID, 'Type': 'DSL', 'AccessSupplierID': AccessSupplierID })
        .success(function (data, status, headers, config) {

        })
        .error(function (error) {
            
            alert("Problem occured while loading BT Packages; " + JSON.stringify(error));
        });
    }

    return DSLPckgfactory;
});

app.factory('DSLAccSupplierfactory', function ($http, $rootScope, glbHVPNCaseID, glbHVPNParentCaseID, DSLPortTypesFctry) {

    var DSLAccSupplierfactory = {};

    DSLAccSupplierfactory.GetDSLAccessSuppliers = function (RegionID, CountryID, ParentProductID, ProductID, CaseID, ParentCaseID, PackageID) {

        return $http.post('Search.aspx/GetHVPNAccessSuppliers', { 'RegionID': RegionID, 'CountryID': CountryID, 'ParentProductID': ParentProductID, 'ProductID': ProductID, 'CaseID': CaseID, 'ParentCaseID': ParentCaseID, 'PackageID': PackageID })
        .success(function (data, status, headers, config) {

        })
        .error(function (error) {
            alert("Problem occured while loading DSL Access Suppliers; " + JSON.stringify(error));
        });
    }

    return DSLAccSupplierfactory;
});