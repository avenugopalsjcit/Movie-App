app.controller("HVPNPkgCntrl", function ($scope, $modal, glbCountryID, getHVPNPKGData, SLAinfoparam, HVPNPKGParam, glbProductID, getDSLPKGData, glbHVPNCaseID, glbHVPNParentCaseID, glbParentProductID) {

    $scope.nohvpndata = "false";
    $scope.noCPEData = "false";
    $scope.Product = glbProductID.getProductID();
    var SuppProdID = SLAinfoparam.getAccSuppNameId();
    var countryId = glbCountryID.getCountryID();

    $scope.BTPackage = HVPNPKGParam.getBTPackage();
    $scope.AccessType = HVPNPKGParam.getAccessType();
    $scope.Supplier = HVPNPKGParam.getSupplier();
    $scope.SupplierProduct = HVPNPKGParam.getSupplierProduct();
    $scope.PortType = HVPNPKGParam.getPortType();

    $scope.PackageLevel = 0;
    $scope.PortTypeLevel = 0;

    var isDSL = HVPNPKGParam.getIsDSL();
    var ParentLink = 0, ProductID, DSLPackageLevelInfo = 0, DSLPortTypeLevelInfo = 0;
    $(".pageLoaderOverlay").show();
    $scope.DSLPckNoData = 1;
    if (isDSL == 'Y') {

        $scope.hvpnInfo = "false";
        $scope.DSLInfo = "true";

        $(".pageLoaderOverlay").show();

        //        getDSLPKGData.GetDSLPackageDetails(glbParentProductID.getParentProductID(), glbHVPNCaseID.getCaseID(), HVPNPKGParam.getPackageID(), glbHVPNParentCaseID.getParentCaseID())
        //        .success(function (data) {

        //            if (data.d.length == 0) {
        //                $scope.DSLPckNoData = 1;
        //                $(".pageLoaderOverlay").hide();
        //                return;
        //            }
        //            else {

        //                getDSLPKGData.GetDSLContryDetails(HVPNPKGParam.getParentPackageID(), glbHVPNCaseID.getCaseID(), HVPNPKGParam.getPackageID(), glbHVPNParentCaseID.getParentCaseID()).success(function (data) {
        //                    $(".pageLoaderOverlay").hide();
        //                });
        //            }

        //        });


        if (glbParentProductID.getParentProductID() > 0) {
            ParentLink = 1;
            ProductID = $scope.Product;
        }
        else {
            ParentLink = 0;
            ProductID = glbParentProductID.getParentProductID();
        }
        var PackageID = 0;
        if (HVPNPKGParam.getPackageID() != '') {
            PackageID = HVPNPKGParam.getPackageID();
        }
        getDSLPKGData.GetDSLPackageLevelInfo(1, ParentLink, $scope.Product, glbParentProductID.getParentProductID(), glbHVPNCaseID.getCaseID(), PackageID, glbHVPNParentCaseID.getParentCaseID()).success(function (data) {
            $(".pageLoaderOverlay").hide();
            if (data.d.length > 0) {
                $scope.DSLPackageData = data.d;
                DSLPackageLevelInfo = 1;
                $scope.PackageLevel = 1;
            }
            if (DSLPackageLevelInfo == 1 || DSLPortTypeLevelInfo == 1) {
                $scope.DSLPckNoData = 0;

            }
        });

        getDSLPKGData.GetDSLPortTypeLevelInfo(1, ParentLink, glbHVPNParentCaseID.getParentCaseID(), HVPNPKGParam.getPortPackageID(), glbHVPNCaseID.getCaseID()).success(function (data) {
            $(".pageLoaderOverlay").hide();
            if (data.d.length > 0) {
                $scope.DSLCountryPackageData = data.d;
                DSLPortTypeLevelInfo = 1;
                $scope.PortTypeLevel = 1;
            }

            if (DSLPackageLevelInfo == 1 || DSLPortTypeLevelInfo == 1) {
                $scope.DSLPckNoData = 0;
            }
        });

    }
    else {
        getHVPNPKGData.getAttr(countryId, SuppProdID).success(function (data) {
            if (data.d == null && data.d.length == 0) {
                $scope.nohvpndata = "true";
                $(".pageLoaderOverlay").hide();
            }
            else {
                $scope.nohvpndata = "false";

                $scope.ISP_ADDRESSING = data.d.ISP_ADDRESSING;
                $scope.OTHER_SERVICE_NOTES = data.d.OTHER_SERVICE_NOTES;
                $scope.PRODUCT_CODE = data.d.PRODUCT_CODE;
                $scope.AGGREGATOR = data.d.AGGREGATOR;
                $scope.COPPER_SERVICE_ID = data.d.COPPER_SERVICE_ID;
                $scope.PRICING_NOTES = data.d.PRICING_NOTES;
                $scope.RFA_NOTES = data.d.RFA_NOTES;
                $scope.COPPER_DETAILS = data.d.COPPER_DETAILS;

                $(".pageLoaderOverlay").hide();
            }
        });


        $scope.getCPESupplierCoverage = function () {
            if ($scope.CPEDetailsList == undefined || $scope.CPEDetailsList.length == 0) {

                $(".pageLoaderOverlay").show();
                getHVPNPKGData.getCPEDetails().success(function (data) {

                    if (data.d == null && data.d.length == 0) {
                        $scope.noCPEData = "true";
                    }
                    else {
                        $scope.noCPEData = "false";
                        $scope.CPEDetailsList = data.d;
                    }
                    $(".pageLoaderOverlay").hide();

                }).error(function (error) {
                    $(".pageLoaderOverlay").hide();
                    console.log("Problem occured while loading cpe details ; " + error);
                });
            }
        }

        $scope.hvpnInfo = "true";

        if (glbParentProductID.getParentProductID() > 0) {
            ParentLink = 1;
            ProductID = $scope.Product;
        }
        else {
            ParentLink = 0;
            ProductID = glbParentProductID.getParentProductID();
        }
        var PackageID = 0;
        if (HVPNPKGParam.getPackageID() != '') {
            PackageID = HVPNPKGParam.getPackageID();
        }


        getDSLPKGData.GetDSLPackageLevelInfo(0, ParentLink, $scope.Product, glbParentProductID.getParentProductID(), glbHVPNCaseID.getCaseID(), PackageID, glbHVPNParentCaseID.getParentCaseID()).success(function (data) {
            debugger;
            if (data.d.length > 0) {
                $scope.DSLPackageData = data.d;
                DSLPackageLevelInfo = 1;
                $scope.PackageLevel = 1;
            }
            if (DSLPackageLevelInfo == 1 || DSLPortTypeLevelInfo == 1) {
                $scope.DSLPckNoData = 0;
            }
        });

        getDSLPKGData.GetDSLPortTypeLevelInfo(0, ParentLink, glbHVPNParentCaseID.getParentCaseID(), HVPNPKGParam.getPortPackageID(), glbHVPNCaseID.getCaseID()).success(function (data) {
            debugger;
            if (data.d.length > 0) {
                $scope.DSLCountryPackageData = data.d;
                DSLPortTypeLevelInfo = 1;
                $scope.PortTypeLevel = 1;
            }

            if (DSLPackageLevelInfo == 1 || DSLPortTypeLevelInfo == 1) {
                $scope.DSLPckNoData = 0;
            }
        });



    }
    $(".pageLoaderOverlay").show();
    getHVPNPKGData.getHVPNFeaturesDetails().success(function (data) {
        $scope.HVPNDetailsList = data.d;
        $(".pageLoaderOverlay").hide();

    }).error(function (error) {
        $(".pageLoaderOverlay").hide();
        console.log("Problem occured while loading cpe details ; " + error);
    });

    getHVPNPKGData.getCPEMatrixRuleDetails($scope.Product).success(function (data) {


        if (data.d.length == 0) {

            $("#IPConnectNoData").show();
            $("#CPEAvailMatrixtbl").hide();
        }
        else {

            $("#IPConnectNoData").hide();
            $("#CPEAvailMatrixtbl").show();
            $scope.AccessCPEList = data.d;
        }
        $(".pageLoaderOverlay").hide();

    }).error(function (error) {
        $(".pageLoaderOverlay").hide();
        console.log("Problem occured while loading cpe details ; " + error);
    });





});


app.factory("HVPNPKGParam", function () {
    var IsDSL = '';
    var BTPackage = '';
    var AccessType = '';
    var Supplier = '';
    var SupplierProduct = '';
    var PortType = '';
    var ParentPackageID = '';
    var PackageID = '';
    return {
        setIsDSL: function (param) {
            IsDSL = param;
        },
        getIsDSL: function () {
            return IsDSL;
        },
        setBTPackage: function (param) {
            BTPackage = param;
        },
        getBTPackage: function () {
            return BTPackage;
        },
        setAccessType: function (param) {
            AccessType = param;
        },
        getAccessType: function () {
            return AccessType;
        },
        setSupplier: function (param) {
            Supplier = param;
        },
        getSupplier: function () {
            return Supplier;
        },
        setSupplierProduct: function (param) {
            SupplierProduct = param;
        },
        getSupplierProduct: function () {
            return SupplierProduct;
        },
        setPortType: function (param) {
            
            PortType = param;
        },
        getPortType: function () {
            return PortType;
        },
        setParentPackageID: function (param) {
            ParentPackageID = param;
        },

        getParentPackageID: function () {
            return ParentPackageID;
        },
        setPackageID: function (param) {
            PackageID = param;
        },

        getPackageID: function () {
            return PackageID;
        },
        setPortPackageID: function (param) {
            PortPackageID = param;
        },
        getPortPackageID: function () {
            return PortPackageID;
        }
        

    }

});


app.factory("getHVPNPKGData", function ($http) {

    getHVPNPKGData = {};
    getHVPNPKGData.getAttr = function (countryID, SuppProdID) {
        $(".pageLoaderOverlay").show();
        return $http.post('HVPNpkgDet.aspx/getHVPNPkgAtt', { "countryID": countryID, 'SuppProdID': SuppProdID })
        .success(function (data, status, headers, config) {
            $(".pageLoaderOverlay").hide();
        })
        .error(function (error) {
            console.log("Problem occured while loading HVPN ; " + error);
        });

    },

     getHVPNPKGData.getCPEDetails = function () {
         $(".pageLoaderOverlay").show();
         return $http.post('HVPNpkgDet.aspx/getCPEDetails', {});
     }

    getHVPNPKGData.getHVPNFeaturesDetails = function () {
        $(".pageLoaderOverlay").show();
        return $http.post('hVPNFeatures.aspx/getHVPNFeaturesDetails', {});
    }

    getHVPNPKGData.getCPEMatrixRuleDetails = function (ProductID) {
        $(".pageLoaderOverlay").show();
        return $http.post('hVPNFeatures.aspx/getCPEAvailability', { "ProductID": ProductID });
    }


    return getHVPNPKGData;

});

app.factory("getDSLPKGData", function ($http) {

    getDSLPKGData = {};
    getDSLPKGData.GetDSLPackageDetails = function (ParentProductID, CaseID, PackageID, ParentCaseID) {
        $(".pageLoaderOverlay").show();
        return $http.post('HVPNpkgDet.aspx/GetDSLPackageDetails', { "ParentProductID": ParentProductID, 'CaseID': CaseID, 'PackageID': PackageID, 'ParentCaseID': ParentCaseID });

    },

     getDSLPKGData.GetDSLContryDetails = function (ParentPackageID, CaseID, PackageID, ParentCaseID) {
         return $http.post('HVPNpkgDet.aspx/GetDSLContryDetails', { 'ParentPackageID': ParentPackageID, 'CaseID': CaseID, 'PackageID': PackageID, 'ParentCaseID': ParentCaseID });
     },

     getDSLPKGData.GetDSLPackageLevelInfo = function (IsDSL, ParentLink, ProductID, ParentId, CaseID, PkgId1, PCaseID) {
         return $http.post('HVPNpkgDet.aspx/GetDSLPackageLevelInfo', { 'IsDSL': IsDSL, 'ParentLink': ParentLink, 'ProductID': ProductID, 'ParentId': ParentId, 'CaseID': CaseID, 'PkgId1': PkgId1, 'PCaseID': PCaseID }).success(function (data, status, headers, config) {
             
         })
        .error(function (error) {
            console.log("Problem occured while loading DSLPackageLevelInfo ; " + JSON.stringify(error));
        });
     },

     getDSLPKGData.GetDSLPortTypeLevelInfo = function (IsDSL, ParentLink, PCaseid, PPkgId, Caseid) {
         return $http.post('HVPNpkgDet.aspx/GetDSLPortTypeLevelInfo', { 'IsDSL': IsDSL, 'ParentLink': ParentLink, 'PCaseid': PCaseid, 'PPkgId': PPkgId, 'Caseid': Caseid }).success(function (data, status, headers, config) {
             
         })
        .error(function (error) {
            console.log("Problem occured while loading DSLPortTypeLevelInfo ; " + JSON.stringify(error));
        });
     }
    return getDSLPKGData;

});

