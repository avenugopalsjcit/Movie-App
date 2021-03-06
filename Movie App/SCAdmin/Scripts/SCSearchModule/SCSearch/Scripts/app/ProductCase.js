﻿app.controller("ProductCaseCntrl", function ($http, $scope, $modal, $location, $rootScope, $sce, glbProductID, Statesfactory, Cityfactory, Popfactory, LeasedLinefctry, PopCharsfctry, ParentPortSpeedsFctry, ParentPortSpeedGridFctry, ChildPortSpeedGridFctry, glbRegionID, glbCountryID, glbStateID, glbCityID, glbPOPID, glbCity1, glbCity2, glbCaseID, glbParentProductID, glbCapmanPlatformID, glbCPESupplier, CPESuppliersFctry, NetworkPlatformfactory, SLAinfoparam, DispAccDet, GetDoclinksFactory, ProdAccessTypes, ProductCPE, ParentProductfactory, HVPNPacksFactory, glbHVPNCaseID, glbHVPNParentCaseID, glbRegionName, glbCountryName, HVPNAccSuppfactory, HVPNPortSpeedfactory, DSLPckgfactory, DSLAccSupplierfactory, VSATPortSpeedfactory, VSATAccSupplierfactory) {
    $(".pageLoaderOverlay").show();
    $scope.Product = glbProductID.getProductID();
    $scope.Region = glbRegionID.getRegionID();
    $scope.Country = glbCountryID.getCountryID();
    $scope.State = glbStateID.getStateID();
    $scope.City = glbCityID.getCityID();
    $scope.POP = glbPOPID.getPOPID();
    $scope.ChildAccessSupplier = -1;
    $scope.ParentAccessSupplier = -1;
    $scope.EthernetLoaded = "0";

    $scope.ProductName = glbProductID.getProductName();

    $("#divEthernet").show();
    $("#lblPlatform").hide();
    $("#ddlPlatform").hide();
    var StateData = 0;
    var CityData = 0;
    var POPData = 0;
    $scope.modstate = "";
    $scope.modCity == "";
    $(".pageLoaderOverlay").show();

    $scope.ShowDSL = 1;
    $scope.ShowHVPN = 1;
    $scope.ShowVSAT = 1;

    $scope.HideHVPN = 0;
    $scope.HideDSL = 0;
    $scope.HideVSAT = 0;

    var HVPNDone = 0;
    var DSLDone = 0;
    var VSATDone = 0;


    $rootScope.hasAccSupp = "0";
    var a = $rootScope.isIA;

    var ProductID = glbProductID.getProductID();

    if (angular.isUndefined($rootScope.isIA)) {
        $rootScope.isIA = 0;
    }


    $scope.filterParentSuppProd = function (param) {
        $rootScope.ParentSupplierProductData = [];
        $rootScope.AllSuppData.SupplierProductList.forEach(function (item3) {
            if (item3.AccessSupplierID == param) {
                $rootScope.ParentSupplierProductData.push({
                    "SupplierID": item3.SupplierID,
                    "SupplierProductName": item3.SupplierProductName
                });
            }
        });
        if (param == null) {
            $rootScope.ParentSupplierProductData = $rootScope.AllSuppData.SupplierProductList;
        }
    };



    $scope.filterSuppProd = function (ParentAccessSupplier) {

        var tempSuppProd = [];
        var tempAccSpeedData = [];
        var tempAccessType = [];
        if (ParentAccessSupplier != null || ParentAccessSupplier != undefined) {

            $rootScope.AllParentAccessSupp.SupplierProductList.forEach(function (item) {
                if (item.AccessSupplierID == ParentAccessSupplier) {
                    tempSuppProd.push({ SupplierID: item.SupplierID, SupplierProductName: item.SupplierProductName });
                }

            });




            if (tempSuppProd.length != 0) {
                $rootScope.SupplierProductData = tempSuppProd;
            }
        } else {
            $rootScope.SupplierProductData = $rootScope.AllParentAccessSupp.SupplierProductList;
        }


    }



    $scope.$watchCollection('ChildPortSpeedData', function () {
        $scope.ChildPortSpeed = [];
        if (!angular.isUndefined($rootScope.ChildPortSpeedData)) {

            if ($rootScope.ChildPortSpeedData.length == 1) {
                $scope.ChildPortSpeed.push($rootScope.ChildPortSpeedData[0].PortSpeedID);
            }
        }
    });

    $scope.$watchCollection('PortSpeedData', function () {
        $scope.ParentPortSpeedData = [];

        if (!angular.isUndefined($rootScope.PortSpeedData)) {

            if ($rootScope.PortSpeedData.length == 1) {
                $scope.ParentPortSpeedData.push($rootScope.PortSpeedData[0].PortSpeedID);
            }
        }
    });

    Statesfactory.GetStates($scope.Product, $scope.Region, $scope.Country, $rootScope.isIA).success(function (data) {

        if (data.d.length == 1) {
            $scope.modstate = data.d[0].StateID;
        }
        if (data.d.length == 0) {
            $scope.StateCount = 0;
        }
    });
    Cityfactory.GetCityInfo($scope.Product, $scope.Region, $scope.Country, 0, "0", 0, $rootScope.isIA, 1).success(function (data) {

        CityData = 1;
        if (data.d.length == 1) {
            $scope.modCity = data.d[0].CityID;
        }

        if (HVPNDone == 1 && DSLDone == 1 && VSATDone == 1 && CityData == 1 && POPData == 1) {

            $(".pageLoaderOverlay").hide();

        }

    });

    Popfactory.GetPopInfo($scope.Product, $scope.Region, $scope.Country, 0, 0, $rootScope.isIA).success(function (data) {


        if (data.d.length == 1) {
            $scope.modPoP = data.d[0].POPID;

            NetworkPlatformfactory.GetPlatformDetails($scope.Product, $scope.modPoP).success(function (data) {
                POPData = 1;
                $("span#spnNP").hide();
                if (data.d.length == 1 || data.d.length == 0) {
                    $("#lblPlatform").hide();
                    $("#ddlPlatform").hide();

                }
                else {
                    result = [];
                    data.d.forEach(function (item1) {
                        result.push({ ID: item1.ID, NetworkPlatform: item1.NetworkPlatform });
                    });
                    $("#lblPlatform").show();
                    $("#ddlPlatform").show();
                    $scope.NetworkPlatformData = result;

                }

                if (HVPNDone == 1 && DSLDone == 1 && VSATDone == 1 && CityData == 1 && POPData == 1) {

                    $(".pageLoaderOverlay").hide();

                }
            });

        }
        else {
            POPData = 1;

            if (HVPNDone == 1 && DSLDone == 1 && VSATDone == 1 && CityData == 1 && POPData == 1) {
                $(".pageLoaderOverlay").hide();

            }
        }

        //        if (HVPNDone == 1 && DSLDone == 1 && VSATDone == 1 && CityData == 1 && POPData == 1) {


        //            $(".pageLoaderOverlay").hide();

        //        }

    });

    GetDoclinksFactory.getDoc($scope.Product).success(function (data) {
        if (data.d.length == 0) {
            $scope.ShowDocLinks = 0;
        }
        else {
            $scope.ShowDocLinks = 1;
        }

    });

    $scope.openHVPN = function () {


        $modal.open({
            templateUrl: 'hVPNFeatures.aspx',
            controller: 'HVPNPkgCntrl'


        });
    }

    $scope.openCPEAvailMatrixRule = function (ProductID) {

        $modal.open({
            templateUrl: 'Search/DispAccCPEAvailMatRule.htm',

            controller: 'HVPNPkgCntrl'


        });

    }


    ProdAccessTypes.GetProductAccessType($scope.Product).success(function (data) {

        $scope.ShowEthernet = data.d.EthernetLeasedLine;
        $scope.ShowDSL = data.d.DSL;
        $scope.ShowHVPN = data.d.HVPN;
        $scope.ShowVSAT = data.d.VSAT;



        if ($scope.ShowVSAT == 0) {
            $('.Show_VSAT').attr('title', 'No Data');
            $('.Show_VSAT').attr('style', 'cursor:not-allowed');
            $scope.HideVSAT = 1;
        }

        if ($scope.ShowDSL == 0) {
            $('.Show_DSL').attr('title', 'No Data');
            $('.Show_DSL').attr('style', 'cursor:not-allowed');
            $scope.HideDSL = 1;
        }

        if ($scope.ShowHVPN == 0) {
            $('.Show_HVPN').attr('title', 'No Data');
            $('.Show_HVPN').attr('style', 'cursor:not-allowed');
            $scope.HideHVPN = 1;
        }

        if ($scope.ShowHVPN == 1 || $scope.ShowDSL == 1 || $scope.ShowVSAT == 1) {

            if ($scope.ShowHVPN == 0) {
                HVPNDone = 1;
            }

            if ($scope.ShowDSL == 0) {
                DSLDone = 1;
            }


            if ($scope.ShowVSAT == 0) {
                VSATDone = 1;
            }

            //$scope.HideHVPN=0;
            //$scope.HideDSL=0;
            // $scope.HideVSAT=0;

            ParentProductfactory.GetParentProduct($scope.Product).success(function (data) {
                glbParentProductID.setParentProductID(data.d);

                HVPNPacksFactory.GetPackages($scope.Region, $scope.Country, glbParentProductID.getParentProductID(), $scope.Product, 0, 0).success(function (data) {

                    if (data.d.CaseID == 0 || data.d.ParentCaseID == 0) {
                        if (glbParentProductID.getParentProductID() > 0 && data.d.ParentCaseID == 0) {
                            $scope.ShowHVPN = 0;
                            $scope.ShowDSL = 0;
                            $scope.ShowVSAT = 0;
                            $(".pageLoaderOverlay").hide();
                            $('.Show_HVPN').attr('style', 'cursor:not-allowed');
                            $('.Show_HVPN').attr('title', 'No Data');
                            $('.Show_DSL').attr('style', 'cursor:not-allowed');
                            $('.Show_DSL').attr('title', 'No Data');
                            $('.Show_VSAT').attr('style', 'cursor:not-allowed');
                            $('.Show_VSAT').attr('title', 'No Data');
                            return;
                        }
                    }

                    glbHVPNCaseID.setCaseID(data.d.CaseID);
                    glbHVPNParentCaseID.setParentCaseID(data.d.ParentCaseID);
                    glbRegionName.setRegionName(data.d.RegionName);
                    glbCountryName.setCountryName(data.d.CountryName);

                    firstrec = 0;
                    SelectedPackage = 0;

                    if (data.d.package == null) {
                        $(".pageLoaderOverlay").hide();
                        $scope.ShowHVPN = 0;
                        $('.Show_HVPN').attr('style', 'cursor:not-allowed');
                        $('.Show_HVPN').attr('title', 'No Data');
                        return;
                    }

                    // HVPN Tab Validation

                    if ($scope.ShowHVPN == 1) {
                        var firstrec = 0;
                        var PackageID = 0;

                        data.d.package.forEach(function (item) {
                            if (firstrec == 0) {

                                PackageID = item.PackageID
                                HVPNAccSuppfactory.GetHVPNAccessSuppliers($scope.Region, $scope.Country, glbParentProductID.getParentProductID(), $scope.Product, glbHVPNCaseID.getCaseID(), glbHVPNParentCaseID.getParentCaseID(), PackageID, 0).success(function (data) {

                                    if (data.d.length == 0) {
                                        HVPNDone = 1;
                                        if (HVPNDone == 1 && DSLDone == 1 && VSATDone == 1 && CityData == 1 && POPData == 1) {
                                            $(".pageLoaderOverlay").hide();
                                        }
                                        $scope.ShowHVPN = 0;
                                        $('.Show_HVPN').attr('style', 'cursor:not-allowed');
                                        $('.Show_HVPN').attr('title', 'No Data');

                                        return;
                                    }
                                    var firstrec1 = 0;
                                    var HVPNAccessSupplierName = '';
                                    var HVPNAccessSupplierID = 0;
                                    data.d.forEach(function (item) {

                                        if (firstrec1 == 0) {
                                            HVPNAccessSupplierName = item.AccessSupplier;
                                            HVPNAccessSupplierID = item.AccessSupplierID;
                                            HVPNPortSpeedfactory.GetHVPNPortSpeeds($scope.Country, glbHVPNCaseID.getCaseID(), glbHVPNParentCaseID.getParentCaseID(), PackageID, HVPNAccessSupplierID, HVPNAccessSupplierName, 0, $scope.Product).success(function (data) {

                                                HVPNDone = 1;
                                                if (HVPNDone == 1 && DSLDone == 1 && VSATDone == 1 && CityData == 1 && POPData == 1) {
                                                    $(".pageLoaderOverlay").hide();
                                                }

                                                $(".pageLoaderOverlay").hide();
                                                if (data.d.length == 0) {
                                                    $scope.ShowHVPN = 0;
                                                    $('.Show_HVPN').attr('style', 'cursor:not-allowed');
                                                    $('.Show_HVPN').attr('title', 'No Data');
                                                    return;
                                                }

                                            });
                                        }

                                        firstrec1 = 1;
                                    });


                                });
                            }
                            firstrec = 1;
                        });
                    }
                    // DSL Tab Validation
                    //$scope.ShowDSL = 1;
                    if ($scope.ShowDSL == 1) {

                        DSLPckgfactory.GetPackages($scope.Region, $scope.Country, glbParentProductID.getParentProductID(), $scope.Product, 0).success(function (data) {

                            if (data.d.package == null) {
                                DSLDone = 1;
                                if (HVPNDone == 1 && DSLDone == 1 && VSATDone == 1 && CityData == 1 && POPData == 1) {
                                    $(".pageLoaderOverlay").hide();
                                }
                                $scope.ShowDSL = 0;
                                $('.Show_DSL').attr('style', 'cursor:not-allowed');
                                $('.Show_DSL').attr('title', 'No Data');
                                return;
                            }

                            if (data.d.package.length == 0) {
                                DSLDone = 1;
                                if (HVPNDone == 1 && DSLDone == 1 && VSATDone == 1) {
                                    $(".pageLoaderOverlay").hide();
                                }
                                $scope.ShowDSL = 0;
                                $('.Show_DSL').attr('style', 'cursor:not-allowed');
                                $('.Show_DSL').attr('title', 'No Data');
                                return;
                            }
                            var DSLPackageID = 0
                            var firstrec2 = 0;
                            data.d.package.forEach(function (item) {

                                if (firstrec2 == 0) {
                                    DSLPackageID = item.PackageID;

                                    DSLAccSupplierfactory.GetDSLAccessSuppliers($scope.Region, $scope.Country, glbParentProductID.getParentProductID(), $scope.Product, glbHVPNCaseID.getCaseID(), glbHVPNParentCaseID.getParentCaseID(), DSLPackageID).success(function (data) {

                                        DSLDone = 1;
                                        if (HVPNDone == 1 && DSLDone == 1 && VSATDone == 1 && CityData == 1 && POPData == 1) {
                                            $(".pageLoaderOverlay").hide();
                                        }

                                        if (data.d.length == 0) {
                                            $scope.ShowDSL = 0;
                                            $('.Show_DSL').attr('style', 'cursor:not-allowed');
                                            $('.Show_DSL').attr('title', 'No Data');
                                            return;
                                        }

                                    });

                                }

                                firstrec2 = 1;
                            });
                        });
                    }
                    //VSAT validation
                    //$scope.ShowVSAT = 1;
                    if ($scope.ShowVSAT == 1) {

                        VSATAccSupplierfactory.GetVSATAccessSuppliers(22861, $scope.Region, $scope.Country, $scope.Product, glbParentProductID.getParentProductID(), glbHVPNCaseID.getCaseID(), glbHVPNParentCaseID.getParentCaseID()).success(function (data1) {

                            if (data1.d.length == 0) {

                                VSATDone = 1;
                                if (HVPNDone == 1 && DSLDone == 1 && VSATDone == 1 && CityData == 1 && POPData == 1) {
                                    $(".pageLoaderOverlay").hide();
                                }

                                $scope.ShowVSAT = 0;
                                $('.Show_VSAT').attr('style', 'cursor:not-allowed');
                                $('.Show_VSAT').attr('title', 'No Data');
                                return;
                            }
                            var VSATAccessSupplierID = 0;
                            var firstrec3 = 0;
                            data1.d.forEach(function (item) {

                                if (firstrec3 == 0) {

                                    VSATAccessSupplierID = item.VSATAccessSupplierID;

                                    VSATPortSpeedfactory.GetPortSpeeds($scope.Country, glbHVPNCaseID.getCaseID(), glbHVPNParentCaseID.getParentCaseID(), 22861, VSATAccessSupplierID, $scope.Product).success(function (data) {

                                        VSATDone = 1;
                                        if (HVPNDone == 1 && DSLDone == 1 && VSATDone == 1 && CityData == 1 && POPData == 1) {
                                            $(".pageLoaderOverlay").hide();
                                        }

                                        if (data.d.length == 0) {
                                            $(".pageLoaderOverlay").hide();
                                            $scope.ShowVSAT = 0;
                                            $('.Show_VSAT').attr('style', 'cursor:not-allowed');
                                            $('.Show_VSAT').attr('title', 'No Data');
                                            return;
                                        }
                                    });
                                }

                                firstrec3 = 1;
                            });

                        });
                    }

                });


            });
        }
        else {
            HVPNDone = 1;
            DSLDone = 1;
            VSATDone = 1;
            if (CityData == 1 && POPData == 1) {
                $(".pageLoaderOverlay").hide();
            }

        }
    });

    $("#tblProductDetails").hide();
    $("#tblPopCharacteristics").hide();
    $("#tblChars1").hide();
    $("#tblPortSpeedFilters").hide();
    $("#trParentSpeedFilters").hide();
    $("#slainfo").hide();
    $("#tblChildSpeeds").hide();
    $("#tblParentSpeeds").hide();
    $("#divUserInfo").hide();
    $("#tblChars1").hide();

    $("#Parent1Paging").hide();
    $("#Parent2Paging").hide();
    $("#Child1Paging").hide();
    $("#Child2Paging").hide();

    $scope.PageNo = 1;
    $scope.PageNum = 1;
    $scope.MaxRecords = 1000;
    $scope.MaxRecords1 = 1000;
    $scope.PageSize = 100;
    $scope.Paging = false;

    $scope.CPESuppliers = glbCPESupplier.getCPESupplier();



    $scope.GetParentPortSpeeds = function (flag) {

        var SelectedPortSpeedData = '';
        var ParentAccessSpeed = '';
        var ParentAccessSupplierProduct = '';
        var ParentAccessType = '';

        if (angular.isUndefined($scope.ParentAccessSupplier) || $scope.ParentAccessSupplier == '' || $scope.ParentAccessSupplier == null) {
            $scope.ParentAccessSupplier = -1;
        }

        if (angular.isUndefined($scope.ParentPortSpeedData) || $scope.ParentPortSpeedData == '' || $scope.ParentPortSpeedData == null) {
            $("#spnChildPortSpeed").show();
            return;
        }
        else {
            SelectedPortSpeedData = $scope.ParentPortSpeedData.join();
            $("#spnChildPortSpeed").hide();
        }


        if (angular.isUndefined($scope.ParentCPESuppliers) || $scope.ParentCPESuppliers == '' || $scope.ParentCPESuppliers == null) {
            $scope.ParentCPESuppliers = 0;
        }

        if (angular.isUndefined($scope.ParentAccessSpeed) || $scope.ParentAccessSpeed == '' || $scope.ParentAccessSpeed == null) {
            ParentAccessSpeed = 'N/A';
        }
        else {
            ParentAccessSpeed = $scope.ParentAccessSpeed.join();
        }

        if (angular.isUndefined($scope.ParentAccessSupplierProduct) || $scope.ParentAccessSupplierProduct == '' || $scope.ParentAccessSupplierProduct == null) {
            ParentAccessSupplierProduct = 'N/A';
        }
        else {
            ParentAccessSupplierProduct = $scope.ParentAccessSupplierProduct.join();
        }

        if (angular.isUndefined($scope.ParentAccessType) || $scope.ParentAccessType == '' || $scope.ParentAccessType == null) {
            ParentAccessType = 'N/A';
        }
        else {
            ParentAccessType = $scope.ParentAccessType.join();
        }

        if (flag == true) {
            $scope.PageNo = 1;
        }

        $(".pageLoaderOverlay").show();

        ParentPortSpeedGridFctry.GetParentPortSpeedGridData(glbCaseID.getCaseID(), $scope.ParentAccessSupplier, $scope.ParentCPESuppliers, SelectedPortSpeedData, $scope.Product, ParentAccessSpeed, ParentAccessSupplierProduct, ParentAccessType, $scope.CPEExists, $scope.Country, $scope.PageNo).success(function (data) {
            
            if (data.d != null && data.d.length > 0) {
                if (data.d.length == 1) {
                    $("#tblParentSpeeds").attr("style", "height:230px");
                }
                if (data.d.length == 2) {
                    $("#tblParentSpeeds").attr("style", "height:280px");
                }
                if (data.d.length == 3) {
                    $("#tblParentSpeeds").attr("style", "height:335px");
                }
                if (data.d.length == 4) {
                    $("#tblParentSpeeds").attr("style", "height:380px");
                }
                if (data.d.length == 5) {
                    $("#tblParentSpeeds").attr("style", "height:440px");
                }
                if (data.d.length == 6) {
                    $("#tblParentSpeeds").attr("style", "height:490px");
                }
                if (data.d.length == 7) {
                    $("#tblParentSpeeds").attr("style", "height:540px");
                }
                if (data.d.length == 8) {
                    $("#tblParentSpeeds").attr("style", "height:590px");
                }
                if (data.d.length == 9) {
                    $("#tblParentSpeeds").attr("style", "height:640px");
                }
                if (data.d.length > 9) {
                    $("#tblParentSpeeds").attr("style", "height:690px");
                }
                if (data.d[0].RecCount > 100) {

                    $("#Parent1Paging").show();
                    $("#Parent2Paging").show();

                    $("#Child1Paging").hide();
                    $("#Child2Paging").hide();
                }

                $scope.MaxRecords = data.d[0].RecCount;
                $scope.PageCount = data.d[0].PageCount;
                $("#divLeasedLineNoData").hide();
            }
            else {

                $("#Parent1Paging").hide();
                $("#Parent2Paging").hide();

                $("#Child1Paging").hide();
                $("#Child2Paging").hide();

                $("#divLeasedLineNoData").show();
            }
            $(".pageLoaderOverlay").hide();
        });
    }

    $scope.GeChildPortSpeeds = function (flag) {

        var SelectedPortSpeedData = '';
        var ChildAccessSpeed = '';
        var ChildAccessSupplierProduct = '';
        var ChildAccessType = '';

        if (angular.isUndefined($scope.ChildAccessSupplier) || $scope.ChildAccessSupplier == '' || $scope.ChildAccessSupplier == null) {

            $scope.ChildAccessSupplier = -1;
        }
        if (angular.isUndefined($scope.ChildPortSpeed) || $scope.ChildPortSpeed == '' || $scope.ChildPortSpeed == null) {
            $("#spnParentportSpeed").show();
            return;
        }
        else {
            SelectedPortSpeedData = $scope.ChildPortSpeed.join();
            $("#spnParentportSpeed").hide();
        }

        if (angular.isUndefined($scope.ChildCPESuppliers) || $scope.ChildCPESuppliers == '' || $scope.ChildCPESuppliers == null) {
            $scope.ChildCPESuppliers = 0;
        }

        if (angular.isUndefined($scope.ChildAccessSpeed) || $scope.ChildAccessSpeed == '' || $scope.ChildAccessSpeed == null) {
            ChildAccessSpeed = 'N/A';
        }
        else {
            ChildAccessSpeed = $scope.ChildAccessSpeed.join();
        }

        if (angular.isUndefined($scope.ChildAccessSupplierProduct) || $scope.ChildAccessSupplierProduct == '' || $scope.ChildAccessSupplierProduct == null) {
            ChildAccessSupplierProduct = 'N/A';
        }
        else {
            ChildAccessSupplierProduct = $scope.ChildAccessSupplierProduct.join();
        }

        if (angular.isUndefined($scope.ChildAccessType) || $scope.ChildAccessType == '' || $scope.ChildAccessType == null) {
            ChildAccessType = 'N/A';
        }
        else {
            ChildAccessType = $scope.ChildAccessType.join();
        }

        if (flag == true) {
            $scope.PageNum = 1;
        }

        $(".pageLoaderOverlay").show();

        ChildPortSpeedGridFctry.GetChildPortSpeedGridData(glbCaseID.getCaseID(), $scope.ChildAccessSupplier, $scope.ChildCPESuppliers, SelectedPortSpeedData, $scope.Product, glbParentProductID.getParentProductID(), ChildAccessSpeed, ChildAccessSupplierProduct, ChildAccessType, $scope.CPEExists, $scope.Country, $scope.PageNum).success(function (data) {
            
            if (data.d != null && data.d.length > 0) {

                $scope.MaxRecords1 = data.d[0].RecCount;
                $scope.ChildPageCount = data.d[0].PageCount;


                if (data.d.length == 1) {
                    $("#tblChildSpeeds").attr("style", "height:230px");
                }
                if (data.d.length == 2) {
                    $("#tblChildSpeeds").attr("style", "height:280px");
                }
                if (data.d.length == 3) {
                    $("#tblChildSpeeds").attr("style", "height:335px");
                }
                if (data.d.length == 4) {
                    $("#tblChildSpeeds").attr("style", "height:380px");
                }
                if (data.d.length == 5) {
                    $("#tblChildSpeeds").attr("style", "height:440px");
                }
                if (data.d.length == 6) {
                    $("#tblChildSpeeds").attr("style", "height:490px");
                }
                if (data.d.length == 7) {
                    $("#tblChildSpeeds").attr("style", "height:540px");
                }
                if (data.d.length == 8) {
                    $("#tblChildSpeeds").attr("style", "height:590px");
                }
                if (data.d.length == 9) {
                    $("#tblChildSpeeds").attr("style", "height:640px");
                }
                if (data.d.length > 9) {
                    $("#tblChildSpeeds").attr("style", "height:690px");
                }

                if (data.d[0].RecCount > 100) {

                    $("#Parent1Paging").hide();
                    $("#Parent2Paging").hide();

                    $("#Child1Paging").show();
                    $("#Child2Paging").show();
                }

//                if ($scope.PageNum == 1) {
//                    $("#PrevChild1").prop('disabled', true);
//                    $("#PrevChild2").prop('disabled', true);
//                }
//                else {
//                    $("#PrevChild1").prop('disabled', false);
//                    $("#PrevChild2").prop('disabled', false);
//                }
//                if ($scope.PageNum == $scope.ChildPageCount) {
//                    $("#NextChild1").disable();
//                    $("#NextChild2").disable();
//                }
//                else {
//                    $("#NextChild1").prop('disabled', false);
//                    $("#NextChild2").prop('disabled', false);
//                }

                $("#divLeasedLineNoData").hide();
            }

            else {
                $("#Parent1Paging").hide();
                $("#Parent2Paging").hide();

                $("#Child1Paging").hide();
                $("#Child2Paging").hide();
                $("#divLeasedLineNoData").show();
            }
            $(".pageLoaderOverlay").hide();
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
        $scope.GetParentPortSpeeds(false);
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
        $scope.GetParentPortSpeeds(false);
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
        $scope.GeChildPortSpeeds(false);
    }

    $scope.NextChild = function () {

        var RecCount = 0;
        if ($scope.PageNo > 0) {
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
        $scope.GeChildPortSpeeds(false);
    }

    $scope.PageNum = 1;


    $scope.to_trusted = function (html_code) {

        return $sce.trustAsHtml(html_code);
    }

    $scope.GetEtherNetDetails = function () {



        //        if (angular.isUndefined($scope.modstate) || $scope.modstate == "" || $scope.modstate == 0 || $scope.modstate == null) {
        //            $("span#ValidateState").show();
        //            return;
        //        }
        //        else {
        //            $("span#ValidateState").hide();
        //        }
        var validInput = true;
        if (angular.isUndefined($scope.modCity) || $scope.modCity == "" || $scope.modCity == 0 || $scope.modCity == null) {
            $("span#ValidateCity").show();
            validInput = false;
        }
        else {
            $("span#ValidateCity").hide();
        }

        if (angular.isUndefined($scope.modPoP) || $scope.modPoP == "" || $scope.modPoP == 0 || $scope.modPoP == null) {
            $("span#ValidatePOP").show();
            validInput = false;
        }
        else {
            $("span#ValidatePOP").hide();
        }

        if ($("#ddlPlatform").is(':visible')) {

            if (angular.isUndefined($scope.modNetworkPlatform) || $scope.modNetworkPlatform === '' || $scope.modNetworkPlatform == null) {
                $("span#spnNP").show();
                validInput = false;
            }
            else {
                $("span#spnNP").hide();
            }
        }

        if (!validInput) {
            return;
        }

        $("#tblProductDetails").show();
        $("#tblPopCharacteristics").show();
        $("#tblChars1").show();

        if (angular.isUndefined($scope.modstate)) {
            $scope.modstate = 0;
        }

        if (angular.isUndefined($scope.modstate) || $scope.modstate == '' || $scope.modstate == null) {
            $scope.modstate = 0;
        }

        if (angular.isUndefined($scope.modCity)) {
            $scope.modstate = 0;
        }

        if (angular.isUndefined($scope.modPoP)) {
            $scope.modstate = 0;
        }

        if ($scope.modproduct == "25") {
            $location.path('/Access');
        }




        if (angular.isUndefined($scope.modNetworkPlatform) || $scope.modNetworkPlatform === '') {
            $scope.modNetworkPlatform = -1;
        }


        //siba start
        glbPOPID.setPOPID($scope.modPoP);
        glbCityID.setCityID($scope.modCity);
        //siba end


        $scope.ParentAccessSupplier = '';
        $scope.ParentPortSpeedData = '';
        $scope.ParentAccessSpeed = '';
        $scope.ParentAccessSupplierProduct = '';
        $scope.ParentAccessType = '';
        $scope.ParentCPESuppliers = '';

        $scope.ChildPortSpeed = '';
        $scope.ChildAccessSupplier = '';
        $scope.ChildAccessSpeed = '';
        $scope.ChildAccessSupplierProduct = '';
        $scope.ChildAccessType = '';
        $scope.ChildCPESuppliers = '';

        $("#tblChildSpeeds").hide();
        $("#tblParentSpeeds").hide();
        $("#tblPortSpeedFilters").hide();
        $("#trParentSpeedFilters").hide();


        LeasedLinefctry.GetProductDetails(4, $scope.modNetworkPlatform, 1, $scope.Product, $scope.Region, $scope.Country, $scope.modstate, $scope.modCity, $scope.modPoP, 1, $scope.modNetworkPlatform).success(function (data) {
            $("#tblChars1").show();
            var caseID = data.d.CaseID;
            $http.post('Search.aspx/GetCharacteristics', { 'CaseID': data.d.CaseID, 'OptionMatrix': 1, 'CaseValidcd': 1, 'ProductID': $scope.Product })
            .success(function (data, status, headers, config) {


                $scope.tblchars = data.d;

                ProductCPE.GetProductCPE($scope.Product, $scope.Country, caseID).success(function (data) {
                    $scope.CPEExists = data.d;
                });

            })
            .error(function (error) {
                alert("Problem occured while loading Product Characteristics; " + JSON.stringify(error));
            });



        });

        PopCharsfctry.GetPopChars($scope.modPoP, $scope.Product, 1).success(function (data) {

            //            var popCharsResult = [];
            //            popCharsResult = [];
            //            data.d.forEach(function (item) {

            //                popCharsResult.push({ CharName: item.CharName, CharValue: item.CharValue });
            //            });

            if (data.d.length > 0) {
                $("#tblPopCharacteristics").show();
                $scope.PopCharData = data.d;
            }
            else {
                $("#tblPopCharacteristics").hide();
            }

        });

        CPESuppliersFctry.GetCPESuppliers($scope.Country, $scope.Product, $scope.modCity).success(function (data) {


            var suppdata = [];
            $scope.CpeSupplierData = [];
            $rootScope.SelectedCPESupplier = 0;
            firstrec = 0;
            SelectedCPESupplier = 0;



            data.d.forEach(function (item) {

                suppdata.push({ supplierID: item.supplierID, SupplierName: item.SupplierName });
                firstrec = 1;
            });

            $scope.CpeSupplierData = suppdata;

            if (data.d.length == 1) {

                $scope.ParentCPESuppliers = data.d[0].supplierID;
                $scope.ChildCPESuppliers = data.d[0].supplierID;
            }
        });

    }

    $scope.RemoveNPAlert = function () {
        $("span#spnNP").hide();
    }

    $scope.GetEthernetData = function () {
        $("#divEthernet").show();
        $("#divHVPN").hide();
        $("#tblMenu").show();
        $("#divDSL").hide();
        $("#divvsat").hide();
        $("#ProductDocLinks").hide();
        if (glbParentProductID.getParentProductID() == 0 && $scope.Paging == true) {
            $("#Parent1Paging").show();
            $("#Parent2Paging").show();
        }
        else if (glbParentProductID.getParentProductID() > 0 && $scope.Paging == true) {
            $("#Child1Paging").show();
            $("#Child2Paging").show();
        }
    }

    $scope.GetHVPNData = function () {

        $("#divEthernet").hide();
        $("#tblMenu").show();
        $("#divHVPN").show();
        $("#divDSL").hide();
        $("#divvsat").hide();
        $("#ProductDocLinks").hide();
        $("#divUserInfo").show();
        $("#Parent1Paging").hide();
        $("#Parent2Paging").hide();
        $("#Child1Paging").hide();
        $("#Child2Paging").hide();

        $scope.$broadcast('GetHVPNInfo', { ProductID: $scope.Product, ParentProductID: glbParentProductID.getParentProductID(), RegionID: $scope.Region, CountryID: $scope.Country });

        //BTPackages($rootScope.CaseID, $scope.Product, $rootScope.ParentProductID, $scope.Region, $scope.Country);
    }


    $scope.GetDSLData = function () {

        $("#divEthernet").hide();
        $("#tblMenu").show();
        $("#divHVPN").hide();
        $("#divDSL").show();
        $("#divvsat").hide();
        $("#ProductDocLinks").hide();
        $("#divUserInfo").show();
        $("#Parent1Paging").hide();
        $("#Parent2Paging").hide();
        $("#Child1Paging").hide();
        $("#Child2Paging").hide();
        $scope.$broadcast('GetDSLInfo', { ProductID: $scope.Product, ParentProductID: glbParentProductID.getParentProductID(), RegionID: $scope.Region, CountryID: $scope.Country });

    }

    $scope.GetVSATData = function () {

        $("#divEthernet").hide();
        $("#tblMenu").show();
        $("#divDSL").hide();
        $("#divHVPN").hide();
        $("#divvsat").show();
        $("#ProductDocLinks").hide();
        $("#divUserInfo").show();
        $("#Parent1Paging").hide();
        $("#Parent2Paging").hide();
        $("#Child1Paging").hide();
        $("#Child2Paging").hide();
        $scope.$broadcast('GetVSATInfo', { ProductID: $scope.Product, ParentProductID: glbParentProductID.getParentProductID(), RegionID: $scope.Region, CountryID: $scope.Country });

    }

    $scope.GetDocLinks = function () {

        $("#divEthernet").hide();
        $("#tblMenu").show();
        $("#divDSL").hide();
        $("#divHVPN").hide();
        $("#divvsat").hide();
        $("#ProductDocLinks").show();
        $("#divUserInfo").hide();
        $("#Parent1Paging").hide();
        $("#Parent2Paging").hide();
        $("#Child1Paging").hide();
        $("#Child2Paging").hide();
        $scope.$broadcast('GetProdLinksInfo', { ProductID: $scope.Product, ParentProductID: glbParentProductID.getParentProductID(), RegionID: $scope.Region, CountryID: $scope.Country });

    }

    //Getting City when State is changed
    $scope.GetCities = function (ProductID, Region, Country, state) {

        if (angular.isUndefined(state) || state == null || state == '') {
            $(".pageLoaderOverlay").show();
            $scope.modCity = ''
            $("#lblPlatform").hide();
            $("#ddlPlatform").hide();
            Cityfactory.GetCityInfo($scope.Product, $scope.Region, $scope.Country, 0, "0", 0, $rootScope.isIA, 1).success(function (data) {
                CityData = 1;
                //                if (data.d.length == 1) {
                //                    $scope.modCity = data.d[0].CityID;
                //                }
                if (CityData == 1 && POPData == 1) {
                    $(".pageLoaderOverlay").hide();
                }
                //on city load validation message should be hidden
                $("span#ValidateCity").hide();
            });
            $scope.modPoP = ''
            Popfactory.GetPopInfo($scope.Product, $scope.Region, $scope.Country, 0, 0, $rootScope.isIA).success(function (data) {
                POPData = 1;
                //                if (data.d.length == 1) {
                //                    $scope.modPoP = data.d[0].POPID;
                //                }
                if (CityData == 1 && POPData == 1) {
                    $(".pageLoaderOverlay").hide();
                }
                $("span#ValidatePOP").hide();
            });
        }
        $("#ValidateState").hide();
        $("span#spnNP").hide();
        if ($scope.Region == 0 || $scope.Country == 0) {
            $scope.GetInfoByState($scope.modstate);
        }
        else {

            $(".pageLoaderOverlay").show();
            $scope.modNetworkPlatform = '';
            Cityfactory.GetCityInfo(ProductID, Region, Country, state, "0", 0, $rootScope.isIA, 1).success(function (data) {

                if (data.d.length == 1) {
                    $scope.modCity = data.d[0].CityID;
                    Popfactory.GetPopInfo(ProductID, Region, Country, state, $scope.modCity, $rootScope.isIA).success(function (data) {

                        if (data.d.length == 1) {
                            $scope.modPoP = data.d[0].POPID;

                            NetworkPlatformfactory.GetPlatformDetails($scope.Product, $scope.modPoP).success(function (data) {
                                POPData = 1;
                                $("span#spnNP").hide();
                                if (data.d.length == 1 || data.d.length == 0) {
                                    $("#lblPlatform").hide();
                                    $("#ddlPlatform").hide();
                                    $(".pageLoaderOverlay").hide();
                                }
                                else {
                                    result = [];
                                    data.d.forEach(function (item1) {
                                        result.push({ ID: item1.ID, NetworkPlatform: item1.NetworkPlatform });
                                    });
                                    $("#lblPlatform").show();
                                    $("#ddlPlatform").show();
                                    $scope.NetworkPlatformData = result;
                                    $(".pageLoaderOverlay").hide();
                                }




                            });

                        }
                        $(".pageLoaderOverlay").hide();
                        $("span#ValidatePOP").hide();
                    });
                }
                else {
                    Popfactory.GetPopInfo(ProductID, Region, Country, state, 0, $rootScope.isIA).success(function (data) {

                        if (data.d.length == 1) {
                            $scope.modPoP = data.d[0].POPID;

                            NetworkPlatformfactory.GetPlatformDetails($scope.Product, $scope.modPoP).success(function (data) {
                                POPData = 1;
                                $("span#spnNP").hide();
                                if (data.d.length == 1 || data.d.length == 0) {
                                    $("#lblPlatform").hide();
                                    $("#ddlPlatform").hide();
                                    $(".pageLoaderOverlay").hide();
                                }
                                else {
                                    result = [];
                                    data.d.forEach(function (item1) {
                                        result.push({ ID: item1.ID, NetworkPlatform: item1.NetworkPlatform });
                                    });
                                    $("#lblPlatform").show();
                                    $("#ddlPlatform").show();
                                    $scope.NetworkPlatformData = result;
                                    $(".pageLoaderOverlay").hide();
                                }





                            });

                        }
                        $("span#ValidatePOP").hide();
                        //$(".pageLoaderOverlay").hide();
                    });
                }
            });
            //on city load validation message should be hidden
            $("span#ValidateCity").hide();
        }
    }

    //Getting Pop Information
    $scope.GetPops = function (Product, Region, Country, State, City) {

        if (angular.isUndefined(City) || City == "" || City == null) {
            $(".pageLoaderOverlay").show();
            $scope.modPoP = '';
            $("#lblPlatform").hide();
            $("#ddlPlatform").hide();
            $("span#spnNP").hide();
            Popfactory.GetPopInfo($scope.Product, $scope.Region, $scope.Country, 0, 0, $rootScope.isIA).success(function (data) {
                POPData = 1;

                $(".pageLoaderOverlay").hide();

                $("span#ValidatePOP").hide();
            });
        }


        else {
            $scope.modNetworkPlatform = '';
            $scope.GetInfoByCity();
            $("span#ValidateCity").hide();
            $("span#ValidatePOP").hide();
            $("span#spnNP").hide();
        }


    }

    $scope.GetInfoByState = function () {

        $http.post('Search.aspx/GetInfoByState', { 'StateID': $scope.modstate })
            .success(function (data, status, headers, config) {

                $scope.modregion = data.d.RegionID;
                $scope.modcountry = data.d.CountryID;
                Cityfactory.GetCityInfo($scope.modproduct, $scope.modregion, $scope.modcountry, $scope.modstate, "0", 0);
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
        $(".pageLoaderOverlay").show();
        $http.post('Search.aspx/GetInfoByCity', { 'CityID': $scope.modCity, 'ProductID': $scope.Product })
            .success(function (data, status, headers, config) {

                $scope.modstate = data.d.StateID;

                Popfactory.GetPopInfo($scope.Product, $scope.Region, $scope.Country, $scope.modstate, $scope.modCity, $rootScope.isIA).success(function (data) {

                    if (data.d.length == 1) {
                        $scope.modPoP = data.d[0].POPID;

                        NetworkPlatformfactory.GetPlatformDetails($scope.Product, $scope.modPoP).success(function (data) {

                            $("span#spnNP").hide();
                            if (data.d.length == 1 || data.d.length == 0) {
                                $("#lblPlatform").hide();
                                $("#ddlPlatform").hide();
                                $(".pageLoaderOverlay").hide();
                            }
                            else {
                                result = [];
                                data.d.forEach(function (item1) {
                                    result.push({ ID: item1.ID, NetworkPlatform: item1.NetworkPlatform });
                                });
                                $("#lblPlatform").show();
                                $("#ddlPlatform").show();
                                $scope.NetworkPlatformData = result;
                                $(".pageLoaderOverlay").hide();
                            }
                            $(".pageLoaderOverlay").hide();
                        });
                    }
                    else {
                        $(".pageLoaderOverlay").hide();
                    }

                    $("span#ValidatePOP").hide();


                });
            })
        .error(function (error) {
            // alert("Problem occured while loading Region " + JSON.stringify(error));
        });


    }

    $scope.GeInfoByPop = function (Product, Region, Country, State, City) {

        //Hide city when pop changed

        if ($scope.modPoP == null || $scope.modPoP == "" || angular.isUndefined($scope.modPoP)) {
            $("#lblPlatform").hide();
            $("#ddlPlatform").hide();
            $scope.modNetworkPlatform = '';
        }
        if ($scope.modCity != null || $scope.modCity != "") {
            $('span#ValidateCity').hide();
        }
        $scope.modNetworkPlatform = '';

        $scope.GetinfoByHubSite();
        $("span#ValidatePOP").hide();
    }

    $scope.GetinfoByHubSite = function () {
        $(".pageLoaderOverlay").show();


        $http.post('Search.aspx/GetinfoByHubSite', { 'HubSiteID': $scope.modPoP })
            .success(function (data, status, headers, config) {

                $scope.modstate = data.d.StateID;
                $scope.modCity = data.d.CityID;

                NetworkPlatformfactory.GetPlatformDetails($scope.Product, $scope.modPoP).success(function (data) {

                    $("span#spnNP").hide();
                    if (data.d.length == 1 || data.d.length == 0) {
                        $("#lblPlatform").hide();
                        $("#ddlPlatform").hide();
                        $(".pageLoaderOverlay").hide();
                    }
                    else {
                        result = [];
                        data.d.forEach(function (item1) {
                            result.push({ ID: item1.ID, NetworkPlatform: item1.NetworkPlatform });
                        });
                        $("#lblPlatform").show();
                        $("#ddlPlatform").show();
                        $scope.NetworkPlatformData = result;
                        $(".pageLoaderOverlay").hide();
                    }

                });


            })
        .error(function (error) {
            $(".pageLoaderOverlay").hide();
        });


    }

    //bind link with popup
    $scope.openCpeInformationpopup = function () {

        var url = "CPEBundleDetails.aspx";
        var q1 = "?productid=" + $scope.Product;
        var q2 = "&countryid=" + $scope.Country;
        var q3 = "&cityid=" + $scope.modCity;
        var q4 = "&caseID=" + glbCaseID.getCaseID();
        var q5 = "&hasAccSupp=" + $rootScope.hasAccSupp;
        url = url + q1 + q2 + q3 + q4 + q5;
        window.open(url, "_blank", "toolbar=yes, scrollbars=yes, resizable=yes");
        //   var iframehtml = '<iframe border=0 width="100%" height ="500px" frameborder="0" src="' + url + '"> </iframe>'
        //console.log(iframehtml);
        //  $("div.CPEInfoContent").html(iframehtml);
    }



    $scope.openSLAPopup = function (AccSuppNameId, supplier, supplierproduct, AccessSupplierCharID,
    AccessProductTypeID, AccessSpeedCharID, AccessSpeed, ASpeedUOM) {

        SLAinfoparam.setAccSuppName(supplier);
        SLAinfoparam.setSupProduct(supplierproduct);
        SLAinfoparam.setAccSuppCharID(AccessSupplierCharID);
        SLAinfoparam.setsuppAccTypeId(AccessProductTypeID);
        SLAinfoparam.setAccSuppNameId(AccSuppNameId);
        SLAinfoparam.setAccessSpeedCharID(AccessSpeedCharID);
        SLAinfoparam.setASpeed(AccessSpeed);
        SLAinfoparam.setASpeedUOM(ASpeedUOM);
        SLAinfoparam.setstrDSL('N');
        $modal.open({
            templateUrl: 'Search/SLAInformation.htm',
            controller: 'SLAInfoCntrl'
        });
    }

    $scope.OpenAccDetPopup = function (AccessSupplierCharID) {
        DispAccDet.setAccSuppCharID(AccessSupplierCharID);

        $modal.open({
            templateUrl: 'Search/DispAccessDetails.htm'
            //  controller: 'dispAccessDetContrl'
        });
    }


    $scope.RemoveAlert = function () {
        $("#spnParentportSpeed").hide();
    }

    $scope.RemoveAlert1 = function () {
        $("#spnChildPortSpeed").hide();
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

    $scope.MouseOver = function (index) {
        $("#tblAT" + index).show();
    }

    $scope.MouseLeave = function (index) {
        $("#tblAT" + index).hide();
    }

    $scope.MouseOverOffnetWithCPE = function (index) {
        $("#tblOffnetWithCPE" + index).show();
    }

    $scope.MouseLeaveOffnetWithCPE = function (index) {
        $("#tblOffnetWithCPE" + index).hide();
    }

    $scope.MouseOverOffnetWithOutCPE = function (index) {
        $("#tblOffnetWithOutCPE" + index).show();
    }

    $scope.MouseLeaveOffnetWithOutCPE = function (index) {
        $("#tblOffnetWithOutCPE" + index).hide();
    }

    $scope.MouseOverOnnetWithCPE = function (index) {
        $("#tblOnnetWithCPE" + index).show();
    }

    $scope.MouseLeaveOnnetWithCPE = function (index) {
        $("#tblOnnetWithCPE" + index).hide();
    }

    $scope.MouseOverOnnetWithOutCPE = function (index) {
        $("#tblOnnetWithOutCPE" + index).show();
    }

    $scope.MouseLeaveOnnetWithOutCPE = function (index) {
        $("#tblOnnetWithOutCPE" + index).hide();
    }


    $scope.ParentMouseOver = function (index) {
        $("#tblParentAccTech" + index).show();
    }

    $scope.ParentMouseLeave = function (index) {
        $("#tblParentAccTech" + index).hide();
    }


    $scope.ParentMouseOverOffnetWithCPE = function (index) {
        $("#tblParentOffnetWithCPE" + index).show();
    }

    $scope.ParentMouseLeaveOffnetWithCPE = function (index) {
        $("#tblParentOffnetWithCPE" + index).hide();
    }

    $scope.ParentMouseOverOffnetWithOutCPE = function (index) {
        $("#tblParentOffnetWithOutCPE" + index).show();
    }

    $scope.ParentMouseLeaveOffnetWithOutCPE = function (index) {
        $("#tblParentOffnetWithOutCPE" + index).hide();
    }

    $scope.ParentMouseOverOnnetWithCPE = function (index) {
        $("#tblParentOverOnnetWithCPE" + index).show();
    }

    $scope.ParentMouseLeaveOnnetWithCPE = function (index) {
        $("#tblParentOverOnnetWithCPE" + index).hide();
    }

    $scope.ParentMouseOverOnnetWithOutCPE = function (index) {
        $("#tblParentMouseOverOnnetWithOutCPE" + index).show();
    }

    $scope.ParentMouseLeaveOnnetWithOutCPE = function (index) {
        $("#tblParentMouseOverOnnetWithOutCPE" + index).hide();
    }

    $scope.ParentMouseOverSuppProdName = function (index) {
        //        var indexhere = index - 1;
        //        var dynamicid = "#tblSuppProdName" + indexhere;
        //        angular.element(document.querySelector(dynamicid)).attr('style', "display:table;left: 200px;  max-width: 190px");
        $("#tblSuppProdName" + index).show();
    }

    $scope.ParentMouseLeaveSuppProdName = function (index) {
        //        var indexhere = index - 1;
        //        var dynamicid = "#tblSuppProdName" + indexhere;

        //        angular.element(document.querySelector(dynamicid)).attr('style', "display:none;");
        $("#tblSuppProdName" + index).hide();
    }

    $scope.ChildMouseOverSuppProdName = function (index) {
        //                var indexhere = index - 1;
        //                var dynamicid = "#tblChildSuppProdName" + indexhere;
        //                angular.element(document.querySelector(dynamicid)).attr('style', "display:table;left: 120px;  max-width: 190px");
        $("#tblChildSuppProdName" + index).show();
    }

    $scope.ChildMouseLeaveSuppProdName = function (index) {

        $("#tblChildSuppProdName" + index).hide();
    }

});

app.factory('ProductChar', function () {



});


app.factory('LeasedLinefctry', function ($http, $rootScope, glbCaseID, glbProductID, glbParentProductID, glbCapmanPlatformID, AccessSuppliersFctry, ParentPortSpeedsFctry, ParentPortSpeedGridFctry, ChildAccessSuppliersFctry, ChildPortSpeedsFctry, CPESuppliersFctry, glbFlag, ShowCPESupplierfactory, UserInfofactory, $location, $window) {

    var LeasedLinefctry = {};

    LeasedLinefctry.GetProductDetails = function (ProdLocLevel, CapmanPlatform, StateFlag, ProductID, RegionID, CountryID, StateID, CityID, HubSiteID, DisplaySearch, NetworkPlatformID) {
        //Getting Product Details

        $(".pageLoaderOverlay").show();

        return $http.post('Search.aspx/GetProductDetails', { 'ProdLocLevel': ProdLocLevel, 'CapmanPlatform': CapmanPlatform,
            'StateFlag': StateFlag, 'ProductID': ProductID, 'RegionID': RegionID, 'CountryID': CountryID, 'StateID': StateID,
            'CityID': CityID, 'HubSiteID': HubSiteID, 'DisplaySearch': DisplaySearch, "sAccess_Level": $rootScope.sAccess_Level,
            "GfrCode": $rootScope.BtGfrCodes, "SegregationCode": $rootScope.SegregationCodes
        })
        .success(function (data, status, headers, config) {

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


            $rootScope.ServiceAvailable = data.d.ServiceAvailable;
            $rootScope.PopCode = data.d.PopCode;
            $rootScope.PopColor = data.d.PopColor;
            $rootScope.TargetAvailabilityDate = data.d.TargetAvailabilityDate;
            $rootScope.NetworkName = data.d.NetworkName;
            $rootScope.ResilientPop = data.d.ResilientPop;
            glbCaseID.setCaseID(data.d.CaseID);
            glbParentProductID.setParentProductID(data.d.ParentProductID);
            $rootScope.ParentProductName = data.d.ParentProductName;

            if (NetworkPlatformID == -1) {
                glbCapmanPlatformID.setCapmanPlatformID(data.d.CapmanPlatformID);
            }
            else {
                glbCapmanPlatformID.setCapmanPlatformID(NetworkPlatformID);
            }

            //Getting Characteristics
            //            $http.post('Search.aspx/GetCharacteristics', { 'CaseID': glbCaseID.getCaseID(), 'OptionMatrix': 1, 'CaseValidcd': 1, 'ProductID': ProductID })
            //            .success(function (data, status, headers, config) {
            //                
            //                $rootScope.tblchars = data.d;

            //            })
            //            .error(function (error) {
            //                alert("Problem occured while loading Leased Characteristics; " + JSON.stringify(error));
            //            });
            $("#slainfo").show();

            //            
            //            ShowCPESupplierfactory.ShowCPE(ProductID).success(function (data) {
            //                
            //                if (data.d == 1) {
            //                    $("#lblChildCPESuppliers").hide();
            //                    $("#ddlChildCPESuppliers").hide();
            //                }
            //            });
            $("#divLeasedLineNoData").hide();
            if (glbParentProductID.getParentProductID() == 0) {//Getting data for Parent products

                $("#trParentSpeedFilters").show();
                $("#tblParentSpeeds").hide();

                $("#lblParentCPESuppliers").show();
                $("#ddlParentCPESuppliers").show();

                $("#tblPortSpeedFilters").hide();
                $("#tblChildSpeeds").hide();

                $("#Parent1Paging").hide();
                $("#Parent2Paging").hide();

                $("#Child1Paging").hide();
                $("#Child2Paging").hide();

                var AccSupplier1 = 0;
                var PortSpeed1 = 0;
                var ChildProduct1 = 0;

                //Getting Parent Access Suppliers
                AccessSuppliersFctry.GetAccessSuppliers(glbCaseID.getCaseID(), HubSiteID, CountryID).success(function () {

                    if (data.d.length == 0) {
                        $("#divLeasedLineNoData").show();
                        //return;
                    }

                    AccSupplier1 = 1;
                    if (AccSupplier1 == 1 && PortSpeed1 == 1) {
                        $(".pageLoaderOverlay").hide();
                    }
                });
                //Getting Parent Port Speeds



                ParentPortSpeedsFctry.GetPortSpeeds(glbCaseID.getCaseID(), HubSiteID, CountryID, ProductID, 0, CityID).success(function () {

                    if (data.d.pSpeed != null && data.d.pSpeed.length == 0) {
                        $("#divLeasedLineNoData").show();
                        //return;
                    }

                    PortSpeed1 = 1;
                    if (AccSupplier1 == 1 && PortSpeed1 == 1) {
                        $(".pageLoaderOverlay").hide();
                    }
                });


            }

            if (glbParentProductID.getParentProductID() > 0) {
                //Showing Parent Port Speeds

                $("#trParentSpeedFilters").hide();
                $("#tblParentSpeeds").hide();

                $("#lblParentCPESuppliers").hide();
                $("#ddlParentCPESuppliers").hide();

                $("#tblPortSpeedFilters").show();
                $("#tblChildSpeeds").hide();

                glbFlag.setFlag(0);

                $("#Parent1Paging").hide();
                $("#Parent2Paging").hide();

                $("#Child1Paging").hide();
                $("#Child2Paging").hide();

                var AccSupplier = 0;
                var PortSpeed = 0;
                var ChildProduct = 0;
                ChildAccessSuppliersFctry.GetAccessSuppliers(glbCaseID.getCaseID(), ProductID, HubSiteID, CountryID, 28, glbParentProductID.getParentProductID(), 1, glbCapmanPlatformID.getCapmanPlatformID()).success(function () {


                    if (data.d.length == 0) {

                        $("#divLeasedLineNoData").show();

                    }
                    AccSupplier = 1;
                    //alert("AccSupplier: " + AccSupplier);
                    if (AccSupplier == 1 && PortSpeed == 1 && ChildProduct == 1) {
                        $(".pageLoaderOverlay").hide();
                    }
                });

                ChildPortSpeedsFctry.GetPortSpeeds(glbCaseID.getCaseID(), ProductID, HubSiteID, 1, CountryID, 28, glbParentProductID.getParentProductID(), 1, glbCapmanPlatformID.getCapmanPlatformID(), CityID).success(function () {


                    PortSpeed = 1;

                    if (data.d.pSpeed != null && data.d.pSpeed.length == 0) {

                        $("#divLeasedLineNoData").show();

                    }
                    if (AccSupplier == 1 && PortSpeed == 1 && ChildProduct == 1) {
                        $(".pageLoaderOverlay").hide();
                    }



                });

                $http.post('Search.aspx/GetChildPortSpeedCount', { 'CaseID': glbCaseID.getCaseID() })
                .success(function (data, status, headers, config) {

                    if (data.d > 0) {

                        glbFlag.setFlag(1);

                        $("#trParentSpeedFilters").show();
                        //$("#tblParentSpeeds").show();

                        $("#lblParentCPESuppliers").show();
                        $("#ddlParentCPESuppliers").show();

                        $("#lblChildCPESuppliers").hide();
                        $("#ddlChildCPESuppliers").hide();

                        $("#divParentPortSpeeds").show();
                        $("#divParentProdName").show();



                        var AccSupplier1 = 0;
                        var PortSpeed1 = 0;
                        var ChildProduct1 = 0;

                        //Getting Parent Access Suppliers

                        AccessSuppliersFctry.GetAccessSuppliers(glbCaseID.getCaseID(), HubSiteID, CountryID).success(function () {

                            AccSupplier1 = 1;
                            ChildProduct = 1;

                            if (data.d.length == 0) {
                                $("#divLeasedLineNoData").show();

                            }

                            if (AccSupplier1 == 1 && PortSpeed1 == 1 && AccSupplier == 1 && PortSpeed == 1) {
                                $(".pageLoaderOverlay").hide();
                            }
                        });

                        //Getting Parent Port Speeds
                        ParentPortSpeedsFctry.GetPortSpeeds(glbCaseID.getCaseID(), HubSiteID, CountryID, ProductID, 1, CityID).success(function () {

                            PortSpeed1 = 1;
                            ChildProduct = 1;

                            if (data.d.pSpeed != null && data.d.pSpeed.length == 0) {
                                $(".pageLoaderOverlay").hide();
                            }
                            if (AccSupplier1 == 1 && PortSpeed1 == 1 && AccSupplier == 1 && PortSpeed == 1) {
                                $(".pageLoaderOverlay").hide();
                            }
                        });
                    }
                    else {

                        ChildProduct = 1;
                        if (AccSupplier == 1 && PortSpeed == 1 && ChildProduct == 1) {
                            $(".pageLoaderOverlay").hide();
                        }
                    }
                });

            }

            UserInfofactory.GetUserInfo(glbCaseID.getCaseID(), 'CSU_CASE_DETAILS').success(function (data) {
                $("#divUserInfo").show();
                $rootScope.CreatedBy = data.d.CreatedBy;
                $rootScope.CreatedDate = data.d.CreatedDate;
                $rootScope.UpdatedBy = data.d.UpdatedBy;
                $rootScope.UpdatedDate = data.d.UpdatedDate;
            });

            $rootScope.$apply();

        })
        .error(function (error) {
            alert("Problem occured while loading Leased Product Details; " + JSON.stringify(error));
        });
    }

    return LeasedLinefctry;
});



app.factory('ChildAccessSuppliersFctry', function ($http, $rootScope) {

    var ChildAccessSuppliersFctry = {};

    ChildAccessSuppliersFctry.GetAccessSuppliers = function (CaseID, ProductID, HubSiteID, CountryID, CharTypeID, ParentProductID, ValidateParent, CapmanPlatformID) {

        return $http.post('Search.aspx/GetParentAccessSupplier', { 'CaseID': CaseID, 'ProductID': ProductID, 'HubSiteID': HubSiteID, 'CaseValidID': 1, 'CountryID': CountryID, 'CharTypeID': CharTypeID, 'ParentProductID': ParentProductID, 'ValidateParent': ValidateParent, 'CapmanPlatformID': CapmanPlatformID })
        .success(function (data, status, headers, config) {
            $rootScope.AllParentAccessSupp = data.d;
            var AccSuppdata = [];
            $rootScope.AccessSupplierData = [];

            if (data.d.accSupplierList.length == 0) {

                //$("#divLeasedLineNoData").show();
                $(".pageLoaderOverlay").hide();
                $("#tblPortSpeedFilters").hide();
                $("#tblChildSpeeds").hide();
                $("#slainfo").hide();
                //$("#divParentPortSpeeds").hide();
                //$("#divParentProdName").hide();
                return;
            }

            data.d.accSupplierList.forEach(function (item) {
                $rootScope.hasAccSupp = "1";
                AccSuppdata.push({ AccessSupplierID: item.AccessSupplierID, AccessSupplierName: item.AccessSupplierName });
            });

            $rootScope.ChildAccSuppdata = AccSuppdata;


            var SuppProductdata = [];
            $rootScope.SupplierProductData = [];
            data.d.SupplierProductList.forEach(function (item) {

                SuppProductdata.push({ SupplierID: item.SupplierID, SupplierProductName: item.SupplierProductName });
            });
            $rootScope.SupplierProductData = SuppProductdata;

            var AccSpeeddata = [];
            $rootScope.AccessSpeedData = [];
            data.d.AccessSpeedList.forEach(function (item) {

                AccSpeeddata.push({ AccessSpeedID: item.AccessSpeedID, AccessSpeedName: item.AccessSpeedName });
            });
            $rootScope.AccessSpeedData = AccSpeeddata;

            var AccTypedata = [];
            $rootScope.AccessTypeData = [];
            data.d.AccessTypeList.forEach(function (item) {

                AccTypedata.push({ AccessTypeID: item.AccessTypeID, AccessTypeName: item.AccessTypeName });
            });

            $rootScope.AccessTypeData = AccTypedata;



            //            if (AccSuppdata.length == 0) {
            //                $(".pageLoaderOverlay").hide();
            //            }



            $rootScope.$apply();
        })
        .error(function (error) {
            alert("Problem occured while loading Child Access Supplier; " + JSON.stringify(error));
        });
    }

    return ChildAccessSuppliersFctry;
});

app.factory('ChildPortSpeedsFctry', function ($http, $rootScope, CPESuppliersFctry, SelectPortSpeed) {

    var ChildPortSpeedsFctry = {};

    ChildPortSpeedsFctry.GetPortSpeeds = function (CaseID, ProductID, HubSiteID, CaseValidID, CountryID, CharTypeID, ParentProductID, ValidateParent, CapmanPlatformID, CityID) {

        return $http.post('Search.aspx/GetParentPortSpeed', { 'CaseID': CaseID, 'ProductID': ProductID, 'HubSiteID': HubSiteID, 'CaseValidID': CaseValidID, 'CountryID': CountryID, 'CharTypeID': CharTypeID, 'ParentProductID': ParentProductID, 'ValidateParent': ValidateParent, 'CapmanPlatformID': CapmanPlatformID })
        .success(function (data, status, headers, config) {
            var PortSpeed = [];

            if (data.d.pSpeed == null) {

                //$("#divLeasedLineNoData").show();
                $(".pageLoaderOverlay").hide();
                $("#tblPortSpeedFilters").hide();
                $("#tblChildSpeeds").hide();
                //$("#divParentPortSpeeds").hide();
                //$("#divParentProdName").hide();
                $("#slainfo").hide();
                return;
            }
            //$("#divParentPortSpeeds").show();
            $rootScope.ChildPortSpeedData = [];
            data.d.pSpeed.forEach(function (item) {
                PortSpeed.push({ PortSpeedID: item.PortSpeedID, PortSpeedName: item.PortSpeedName });
            });
            //            if (PortSpeed.length == 0) {
            //                $(".pageLoaderOverlay").hide();

            //            }




            $rootScope.PortSpeedDefault = data.d.SelectedPortSpeed;
            SelectPortSpeed.setPortSpeed(data.d.SelectedPortSpeed);
            //
            //CPESuppliersFctry.GetCPESuppliers(CountryID, ProductID, CityID);
            $rootScope.ChildPortSpeedData = PortSpeed;




            $rootScope.$apply();
        })
        .error(function (error) {
            alert("Problem occured while loading Child Port Speeds Factory; " + JSON.stringify(error));
        });
    }

    return ChildPortSpeedsFctry;
});

app.factory('CPESuppliersFctry', function ($http, $rootScope, ChildPortSpeedGridFctry, glbCaseID, glbParentProductID, glbCPESupplier, glbFlag, SelectPortSpeed) {

    var CPESuppliersFctry = {};

    CPESuppliersFctry.GetCPESuppliers = function (CountryID, ProductID, CityID) {
        //
        return $http.post('Search.aspx/GetSuppliersData', { 'countryID': CountryID, 'ProductID': ProductID, 'CityID': CityID })
        .success(function (data, status, headers, config) {


        })
        .error(function (error) {
            alert("Problem occured while loading Child Port Speeds Factory; " + JSON.stringify(error));
        });
    }

    return CPESuppliersFctry;
});


app.factory('ChildPortSpeedGridFctry', function ($http, $rootScope) {

    var ChildPortSpeedGridFctry = {};

    ChildPortSpeedGridFctry.GetChildPortSpeedGridData = function (CaseID, SupplierID, CPESuppliers, SelectedPortSpeed, ProductID, ParentProductID, AccSpeed, SuppProduct, AccType, CPEExists, CountryID, PageNo) {

        return $http.post('Search.aspx/GetParentSpeeds', { 'CaseID': CaseID, 'SupplierID': SupplierID, 'CPESuppliers': CPESuppliers, 'SelectedPortSpeed': SelectedPortSpeed, 'ProductID': ProductID, 'ParentProductID': ParentProductID, 'AccSpeed': AccSpeed, 'SuppProduct': SuppProduct, 'AccType': AccType, 'CountryID': CountryID, 'CPEExists': CPEExists, 'PageNo': PageNo })
        .success(function (data, status, headers, config) {
            //            $(".panel-heading span.clickable").parents('.panel').find('.panel-body').slideUp();
            //            $(".panel-heading span.clickable").addClass('panel-collapsed');
            //            $(".panel-heading span.clickable").find('i').removeClass('glyphicon-chevron-up').addClass('glyphicon-chevron-down');

            if (data.d.length > 0) {
                $("#tblChildSpeeds").show();
                $("#divLeasedLineNoData").hide();
            }
            else {
                $("#tblChildSpeeds").hide();
                $("#divLeasedLineNoData").show();
            }

            //$("#ddlCPESuppliers").val("number:" + CPESuppliers);
            $rootScope.ChildPortSpeedGridData = data.d;
            $rootScope.$apply();
        })
        .error(function (error) {
            alert("Problem occured while loading Parent Port Speeds Grid Data; " + JSON.stringify(error));

        });
    }

    return ChildPortSpeedGridFctry;
});

app.factory('AccessSuppliersFctry', function ($http, $rootScope) {

    var AccessSuppliersFctry = {};

    AccessSuppliersFctry.GetAccessSuppliers = function (CaseID, HubSiteID, CountryID) {

        return $http.post('Search.aspx/GetAccessSuppliers', { 'CaseID': CaseID, 'ProductID': 25, 'HubSiteID': HubSiteID, 'CaseValidID': 1, 'CountryID': CountryID })
        .success(function (data, status, headers, config) {
            $rootScope.AllSuppData = data.d;
            if (data.d.length == 0) {

                //$("#divLeasedLineNoData").show();
                $("#trParentSpeedFilters").hide();
                $("#tblParentSpeeds").hide();
                $("#slainfo").hide();
                //$("#divParentPortSpeeds").hide();
                //$("#divParentProdName").hide();
                return;
            }

            var AccSuppdata = [];
            $rootScope.ParentAccessSupplierData = [];
            data.d.accSupplierList.forEach(function (item) {
                $rootScope.hasAccSupp = "1";
                AccSuppdata.push({ AccessSupplierID: item.AccessSupplierID, AccessSupplierName: item.AccessSupplierName });
            });

            $rootScope.ParentAccessSupplierData = AccSuppdata;


            var SuppProductdata = [];
            $rootScope.ParentSupplierProductData = [];
            data.d.SupplierProductList.forEach(function (item) {

                SuppProductdata.push({ SupplierID: item.SupplierID, SupplierProductName: item.SupplierProductName });
            });
            $rootScope.ParentSupplierProductData = SuppProductdata;

            var AccSpeeddata = [];
            $rootScope.ParentAccessSpeedData = [];
            data.d.AccessSpeedList.forEach(function (item) {

                AccSpeeddata.push({ AccessSpeedID: item.AccessSpeedID, AccessSpeedName: item.AccessSpeedName });
            });
            $rootScope.ParentAccessSpeedData = AccSpeeddata;

            var AccTypedata = [];
            $rootScope.ParentAccessTypeData = [];
            data.d.AccessTypeList.forEach(function (item) {

                AccTypedata.push({ AccessTypeID: item.AccessTypeID, AccessTypeName: item.AccessTypeName });
            });

            $rootScope.ParentAccessTypeData = AccTypedata;

            //            $(".panel-heading span.clickable").parents('.panel').find('.panel-body').slideUp();
            //            $(".panel-heading span.clickable").addClass('panel-collapsed');
            //            $(".panel-heading").addClass('panel-collapsed');
            //            $(".panel-heading span.clickable").find('i').removeClass('glyphicon-chevron-up').addClass('glyphicon-chevron-down');


            //$(".pageLoaderOverlay").hide();
            $rootScope.$apply();



        })
        .error(function (error) {
            alert("Problem occured while loading Access Supplier; " + JSON.stringify(error));
        });
    }

    return AccessSuppliersFctry;
});

app.factory('ParentPortSpeedsFctry', function ($http, $rootScope, ParentPortSpeedGridFctry, glbCaseID, CPESuppliersFctry, SelectChildPortSpeed) {

    var ParentPortSpeedsFctry = {};

    ParentPortSpeedsFctry.GetPortSpeeds = function (CaseID, HubSiteID, CountryID, ProductID, flag, CityID) {

        return $http.post('Search.aspx/GetPortSpeeds', { 'CaseID': CaseID, 'ProductID': 25, 'HubSiteID': HubSiteID, 'CaseValidID': 1, 'CountryID': CountryID })
        .success(function (data, status, headers, config) {

            var PortSpeed = [];

            if (data.d.pSpeed == null) {
                //$(".pageLoaderOverlay").hide();

                // $("#divLeasedLineNoData").show();

                $("#trParentSpeedFilters").hide();
                $("#tblParentSpeeds").hide();
                $("#slainfo").hide();
                return;
            }

            $rootScope.PortSpeedData = [];
            if (data.d.pSpeed != null) {
                data.d.pSpeed.forEach(function (item) {
                    PortSpeed.push({ PortSpeedID: item.PortSpeedID, PortSpeedName: item.PortSpeedName });
                });
                $rootScope.PortSpeedDefault = data.d.SelectedPortSpeed;
                SelectChildPortSpeed.setPortSpeed(data.d.SelectedPortSpeed);
            }

            //Getting Parent Port Grid Data

            if (flag == 0) {
                //                ParentPortSpeedGridFctry.GetParentPortSpeedGridData(glbCaseID.getCaseID(), -1, 0, $rootScope.PortSpeedDefault, ProductID, 'N/A', 'N/A', 'N/A').success(function (data) {
                //                    var pSpeed = SelectChildPortSpeed.getPortSpeed();
                //                    $("#PortSpeed").val(pSpeed);
                //                    $(".pageLoaderOverlay").hide();
                //                });
            }
            else {
                var firstrec = 0;

                //                CPESuppliersFctry.GetCPESuppliers(CountryID, ProductID, CityID).success(function (data) {

                //                    if (data.d.length == 0) {
                //                        //                        ParentPortSpeedGridFctry.GetParentPortSpeedGridData(glbCaseID.getCaseID(), -1, 0, $rootScope.PortSpeedDefault, ProductID, 'N/A', 'N/A', 'N/A').success(function (data) {
                //                        //                            var pSpeed = SelectChildPortSpeed.getPortSpeed();
                //                        //                            $("#PortSpeed").val(pSpeed);
                //                        //                            $(".pageLoaderOverlay").hide();
                //                        //                        });
                //                    }
                //                    else {


                //                        data.d.forEach(function (item) {

                //                            if (firstrec == 0) {
                //                                $(".pageLoaderOverlay").show();
                //                                SelectedCPESupplier = item.supplierID;
                //                                $rootScope.CPESupplierDefault = item.supplierID;
                //                                $rootScope.AccessSupplierDefault = -1;
                //                                firstrec = 1;

                //                                //                                ParentPortSpeedGridFctry.GetParentPortSpeedGridData(glbCaseID.getCaseID(), -1, SelectedCPESupplier, $rootScope.PortSpeedDefault, ProductID, 'N/A', 'N/A', 'N/A').success(function (data) {
                //                                //                                    var pSpeed = SelectChildPortSpeed.getPortSpeed();
                //                                //                                    $("#PortSpeed").val(pSpeed);
                //                                //                                    $(".pageLoaderOverlay").hide();
                //                                //                                });
                //                            }
                //                        });
                //                    }
                //                });
            }

            $rootScope.PortSpeedData = PortSpeed;



            $rootScope.$apply();
        })
        .error(function (error) {
            alert("Problem occured while loading Access Supplier; " + JSON.stringify(error));
        });
    }

    return ParentPortSpeedsFctry;
});



app.factory('ParentPortSpeedGridFctry', function ($http, $rootScope) {

    var ParentPortSpeedGridFctry = {};

    ParentPortSpeedGridFctry.GetParentPortSpeedGridData = function (CaseID, SupplierID, CPESuppliers, SelectedPortSpeed, ProductID, AccSpeed, SuppProduct, AccType, CPEExists, CountryID, PageNo) {

        return $http.post('Search.aspx/GetChildPortSpeeds', { 'CaseID': CaseID, 'SupplierID': SupplierID, 'CPESuppliers': CPESuppliers, 'SelectedPortSpeed': SelectedPortSpeed, 'ProductID': ProductID, 'AccSpeed': AccSpeed, 'SuppProduct': SuppProduct, 'AccType': AccType, 'CPEExists': CPEExists, 'CountryID': CountryID, 'PageNo': PageNo })
        .success(function (data, status, headers, config) {


            if (data.d.length == 0) {
                $("#tblParentSpeeds").hide();
            }
            else {
                $("#tblParentSpeeds").show();
            }

            $rootScope.ParentPortSpeedGridData = data.d;
            $rootScope.$apply();
        })
        .error(function (error) {
            alert("Problem occured while loading Parent Port Speeds Grid Data; " + JSON.stringify(error));
        });
    }

    return ParentPortSpeedGridFctry;
});

app.factory('PopCharsfctry', function ($http, $rootScope) {

    var PopCharsfctry = {};

    PopCharsfctry.GetPopChars = function (SiteID, ProductID, DisplaySearch) {

        return $http.post('Search.aspx/FetchPopCharacteristics', { 'SiteID': SiteID, 'ProductID': ProductID, 'DisplaySearch': DisplaySearch })
        .success(function (data, status, headers, config) {

        })
        .error(function (error) {
            alert("Problem occured while loading Speed Info; " + JSON.stringify(error));
        });
    }

    return PopCharsfctry;
});


app.factory('ProdAccessTypes', function ($http, $rootScope) {

    var ProdAccessTypes = {};

    ProdAccessTypes.GetProductAccessType = function (ProductID) {
        return $http.post('Search.aspx/GetProductAccessType', { 'ProductID': ProductID });
    }

    return ProdAccessTypes;
});


app.factory('ProductCPE', function ($http, $rootScope) {

    var ProductCPE = {};

    ProductCPE.GetProductCPE = function (ProductID, CountryID, CaseID) {
        return $http.post('Search.aspx/GetProductCPE', { 'ProductID': ProductID, 'CountryID': CountryID, 'CaseID': CaseID });
    }

    return ProductCPE;
});


app.factory('UserInfofactory', function ($http, $rootScope) {

    var UserInfofactory = {};

    UserInfofactory.GetUserInfo = function (CaseID, TableName) {

        return $http.post('Search.aspx/GetUserInfo', { 'CaseID': CaseID, 'TableName': TableName })
        .success(function (data, status, headers, config) {

        })
        .error(function (error) {
            alert("Problem occured while loading Speed Info; " + JSON.stringify(error));
        });
    }

    return UserInfofactory;
});

app.service("glbCaseID", function () {
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

app.service("glbParentProductID", function () {
    var ParentProductID = "";
    return {
        getParentProductID: function () {
            return ParentProductID;
        },
        setParentProductID: function (value) {
            ParentProductID = value;
        }
    }
});

app.service("glbCapmanPlatformID", function () {
    var CapmanPlatformID = "";
    return {
        getCapmanPlatformID: function () {
            return CapmanPlatformID;
        },
        setCapmanPlatformID: function (value) {
            CapmanPlatformID = value;
        }
    }
});


app.service("glbCPESupplier", function () {
    var CPESupplier = "";
    return {
        getCPESupplier: function () {
            return CPESupplier;
        },
        setCPESupplier: function (value) {
            CPESupplier = value;
        }
    }
});

app.service("glbFlag", function () {
    var flag = "";
    return {
        getFlag: function () {
            return flag;
        },
        setFlag: function (value) {
            flag = value;
        }
    }
});

app.service("SelectPortSpeed", function () {
    var PortSpeed = "";
    return {
        setPortSpeed: function (value) {
            PortSpeed = value;
        },
        getPortSpeed: function () {
            return PortSpeed;
        }
    }
});

app.service("SelectChildPortSpeed", function () {
    var PortSpeed = "";
    return {
        setPortSpeed: function (value) {
            PortSpeed = value;
        },
        getPortSpeed: function () {
            return PortSpeed;
        }
    }
});


app.factory('ParentProductfactory', function ($http, $rootScope, glbParentProductID) {

    var ParentProductfactory = {};

    ParentProductfactory.GetParentProduct = function (ProductID) {

        return $http.post('Search.aspx/GetParentDetails', { 'ProductID': ProductID })
            .success(function (data, status, headers, config) {
            });
    }

    return ParentProductfactory;
});

