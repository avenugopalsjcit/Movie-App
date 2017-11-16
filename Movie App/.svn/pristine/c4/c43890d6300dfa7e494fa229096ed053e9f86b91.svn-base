app.controller("SLAInfoCntrl", function ($scope, $modal, SLAinfoparam, glbCountryID, GetSLAInfo) {

    var countryId = glbCountryID.getCountryID();

    var accSupp = SLAinfoparam.getAccSuppName();
    var suppProd = SLAinfoparam.getSupProduct();

    $scope.SupplierName = accSupp;
    $scope.supplierProduct = suppProd;

    var strDSL = 'N'

    var AccSuppCharID = SLAinfoparam.getAccSuppCharID();
    var suppAccTypeId = SLAinfoparam.getsuppAccTypeId();
    var AccSuppNameId = SLAinfoparam.getAccSuppNameId();
    var AccessSpeedCharID = SLAinfoparam.getAccessSpeedCharID();
    var ASpeed = SLAinfoparam.getASpeed();
    var ASpeedUOM = SLAinfoparam.getASpeedUOM();

    $scope.DSL = "false";
    $scope.ethernet = "true";
    $scope.AccSpeedSLA = ASpeed;



    strDSL = SLAinfoparam.getstrDSL();
    $scope.noValidDSL = "false";
    if (strDSL == 'Y') {
        $scope.isDSL = "true";
        AccessSpeedCharID = -1;

        $scope.selectedPackage = SLAinfoparam.getBTPackageID();
        $scope.portTypeID = SLAinfoparam.getportTypeID();
        $('#displaySuppPorduct').hide();
        GetSLAInfo.getDSLSLA(AccSuppNameId, countryId, $scope.selectedPackage).success(function (data) {
            if (data.d.length != 0) {


                $scope.ACCESS_MODEL_NAME = data.d.AccModelName;
                $scope.access_provider_name = data.d.AccProviderName;
                $scope.ce_vpi = data.d.CEVPI;
                $scope.ce_vci = data.d.CEVCI;
                $scope.encapsulation_name = data.d.Encapsulation;
                $scope.INTERCONNECT_DESIGN_NAME = data.d.InterconnectDesign;
                $scope.dsl_supply_type_name = data.d.dslSupplyTypeName;
                $scope.splitter_included_isdn = data.d.SplitterTypeISDNIncluded;
                $scope.splitter_included_pstn = data.d.SplitterTypePSTNIncluded;
                $scope.LOCAL_LOOP_TYPE_NAME = data.d.LocalLoopType;
                $scope.product_code = data.d.ProductCode;


                GetSLAInfo.getSLA(AccSuppCharID, AccSuppNameId, countryId, suppAccTypeId, AccessSpeedCharID, strDSL, $scope.portTypeID).success(function (data) {

                    aaa = data.d;

                    $scope.strQuoteValidity = data.d.objSLAInfo.QuoteValPeriod
                    $scope.strAckReceipt = data.d.objSLAInfo.AckReceipt;
                    $scope.strMinContractTerm = data.d.objSLAInfo.MinContractTerm;
                    $scope.strServiceCredits = data.d.objSLAInfo.ServiceCredits;
                    $scope.strSpecialNotice = data.d.objSLAInfo.SpecialNotice;
                    $scope.strCanPreinstall = data.d.objSLAInfo.CanPreinstall;
                    $scope.strCanDurConTerm = data.d.objSLAInfo.CanDurConTerm
                    $scope.strCircuitHandoverTestCrit = data.d.objSLAInfo.CircuitHandoverTestCrit;

                    $scope.str247FaultReception = data.d.objSLAInfo.str247FaultReception;
                    $scope.str247FaultReceptionName = data.d.objSLAInfo.str247FaultReceptionName;
                    $scope.str247FaultRepair = data.d.objSLAInfo.str247FaultRepair;
                    $scope.str247FaultRepairName = data.d.objSLAInfo.str247FaultRepairName;
                    $scope.strTroubleTicket = data.d.objSLAInfo.strTroubleTicket;
                    $scope.strMaintenanceWindow = data.d.objSLAInfo.strMaintenanceWindow;
                    $scope.strPlanWorkNotice = data.d.objSLAInfo.strPlanWorkNotice;
                    $scope.strSpecialNoticeSA = data.d.objSLAInfo.strSpecialNoticeSA;
                    $scope.strServiceCreditsSA = data.d.objSLAInfo.strServiceCreditsSA;


                    $scope.ContLeadTimeList = data.d.objContLeadTime;
                    $(".pageLoaderOverlay").hide();
                });


            }


        });
    }
    else {
        $scope.isDSL = 'false';
        $scope.noValidDSL = "true";
        strDSL = 'N';
        $scope.portTypeID = 0;
        GetSLAInfo.getSLA(AccSuppCharID, AccSuppNameId, countryId, suppAccTypeId, AccessSpeedCharID, strDSL, $scope.portTypeID).success(function (data) {

            aaa = data.d;

            $scope.strQuoteValidity = data.d.objSLAInfo.QuoteValPeriod
            $scope.strAckReceipt = data.d.objSLAInfo.AckReceipt;
            $scope.strMinContractTerm = data.d.objSLAInfo.MinContractTerm;
            $scope.strServiceCredits = data.d.objSLAInfo.ServiceCredits;
            $scope.strSpecialNotice = data.d.objSLAInfo.SpecialNotice;
            $scope.strCanPreinstall = data.d.objSLAInfo.CanPreinstall;
            $scope.strCanDurConTerm = data.d.objSLAInfo.CanDurConTerm
            $scope.strCircuitHandoverTestCrit = data.d.objSLAInfo.CircuitHandoverTestCrit;

            $scope.str247FaultReception = data.d.objSLAInfo.str247FaultReception;
            $scope.str247FaultReceptionName = data.d.objSLAInfo.str247FaultReceptionName;
            $scope.str247FaultRepair = data.d.objSLAInfo.str247FaultRepair;
            $scope.str247FaultRepairName = data.d.objSLAInfo.str247FaultRepairName;
            $scope.strTroubleTicket = data.d.objSLAInfo.strTroubleTicket;
            $scope.strMaintenanceWindow = data.d.objSLAInfo.strMaintenanceWindow;
            $scope.strPlanWorkNotice = data.d.objSLAInfo.strPlanWorkNotice;
            $scope.strSpecialNoticeSA = data.d.objSLAInfo.strSpecialNoticeSA;
            $scope.strServiceCreditsSA = data.d.objSLAInfo.strServiceCreditsSA;


            $scope.ContLeadTimeList = data.d.objContLeadTime;
            $(".pageLoaderOverlay").hide();
        });

    }




    //    GetSLAInfo.getContLead(AccSuppCharID, AccSuppNameId, countryId, suppAccTypeId, AccessSpeedCharID).success(function (data) {
    //        debugger
    //        aaa = data.d;

    //        $scope.strAccept = data.d.OrdAccep;
    //        $scope.strOrder = data.d.OrdConfirmation;
    //        $scope.strContractLead = data.d.ContractLeadTime;
    //        $scope.strBTCircuit = data.d.BTCircuitAccep;
    //        $scope.strDelivery = data.d.ExpedieDelivery;
    //        $scope.strDeliveryTerms = data.d.ExpedieDeliveryTerm;
    //        $scope.strCeaseLead = data.d.AccCeaseLeadTime;

    //    });



    $scope.closePopup = function () {
        $modal.close();
    }


    $scope.typeOptions = [
    { name: 'Service Delivery', value: "0" },
    { name: 'Service Assurance', value: "1" },
    ];

    $scope.form = { type: $scope.typeOptions[0].value };

    $scope.displaySLA = function () {

        if ($scope.form.type == "0") {
            $('#ServiceDeleveryOverview').show();
            $('#serviceAssuraneOverview').hide();
        }
        if ($scope.form.type == "1") {
            $('#ServiceDeleveryOverview').hide();
            $('#serviceAssuraneOverview').show();
        }
    }

});


app.factory("SLAinfoparam", function () {
    var AccSuppName = '';
    var suppProduct = '';
    var suppAccTypeId = '';
    var AccSuppCharID = '';
    var AccSuppNameId = '';
    var AccessSpeedCharID = '';
    var ASpeedUOM = '';
    var strDSL = '';
    var BTPackageID = '';
    var portTypeID = '';
    var getASpeedID = '';
    return {
        setAccSuppName: function (param) {
            AccSuppName = param;
        },

        getAccSuppName: function () {
            return AccSuppName;
        },
        setSupProduct: function (param) {
            suppProduct = param;
        },
        getSupProduct: function () {
            return suppProduct;
        },

        setsuppAccTypeId: function (param) {
            suppAccTypeId = param;
        },

        getsuppAccTypeId: function () {
            return suppAccTypeId;
        },

        setAccSuppCharID: function (param) {
            AccSuppCharID = param;
        },

        getAccSuppCharID: function () {
            return AccSuppCharID;
        },

        setAccSuppNameId: function (param) {
            AccSuppNameId = param;
        },

        getAccSuppNameId: function () {
            return AccSuppNameId;
        },

        setAccessSpeedCharID: function (param) {
            AccessSpeedCharID = param;
        },

        getAccessSpeedCharID: function () {
            return AccessSpeedCharID;
        },
        setASpeedUOM: function (param) {
            ASpeedUOM = param;
        },

        getASpeedUOM: function () {
            return ASpeedUOM;
        },

        getBTPackageID: function () {
            return BTPackageID;
        },

        setBTPackageID: function (param) {
            BTPackageID = param;
        },

        setstrDSL: function (param) {
            strDSL = param;
        },
        getstrDSL: function () {
            return strDSL;
        },
        setportTypeID: function (param) {
            portTypeID = param;
        },

        getportTypeID: function () {
            return portTypeID;
        },

        getASpeed: function () {
            return getASpeedID;
        },
        setASpeed: function (param) {
            
            if (!angular.isUndefined(param)) {
                if (param.indexOf('Mbps') == -1) {
                    if (param.indexOf('M') > 0) {
                        param = param.replace(" M", "Mbps").replace(" M", "Mbps");
                        //param = param.replace("Mbps", "Mbps").replace("Mbps", "Mbps");
                    }
                    else if (param.indexOf('Kbps') == -1) {
                        if (param.indexOf('K') > 0) {
                            param = param.replace(" K", "Kbps").replace(" K", "Kbps");
                            // param = param.replace("Kbps", "Kbps").replace("Kbps", "Kbps");
                        }
                        else if (param.indexOf('Gbps') == -1) {
                            if (param.indexOf('G') > 0) {
                                param = param.replace(" G", "Gbps").replace(" G", "Gbps");
                                // param = param.replace("Gbps", "Gbps").replace("Gbps", "Gbps");
                            }
                        }
                    }
                }

            }

            getASpeedID = param;
        }


    }
});

app.factory("GetSLAInfo", function ($http) {
    //debugger
    var GetSLAInfo = {};
    GetSLAInfo.getSLA = function (AccSuppCharID, AccSuppNameId, countryID, suppacctype, pspeed, isDSL, SLAPortTypeID) {
        $(".pageLoaderOverlay").show();
        return $http.post('SLAInformation.aspx/getSLAInfo', { "AccSuppCharID": AccSuppCharID, 'AccSuppNameId': AccSuppNameId,
            'countryID': countryID, 'supplier_access_type': suppacctype, 'pspeed': pspeed, Home: 0, 'isDSL': isDSL, 'SLAPortTypeID': SLAPortTypeID
        })//home made 0 because it has to set 1 when page will be opened from SLA viewer
        .success(function (data, status, headers, config) {
            
        })
        .error(function (error) {
            $(".pageLoaderOverlay").hide();
            console.log("Problem occured while loading getSLAInfo; " + error);
        });
    }

    //     GetSLAInfo.getContLead = function (AccSuppCharID, AccSuppNameId, countryID, suppacctype, pspeed) {
    //         debugger
    //         return $http.post('SLAInformation.aspx/getContLeadTime', { "AccSuppCharID": AccSuppCharID, 'AccSuppNameId': AccSuppNameId, 'countryID': countryID, 'supplier_access_type': suppacctype, "pspeed": pspeed })
    //        .success(function (data, status, headers, config) {
    //        })
    //        .error(function (error) {
    //            console.log("Problem occured while loading getContLead; " + error);
    //        });
    //     }

    GetSLAInfo.getDSLSLA = function (accSuppProdID, selectedCountry, selectedPackage) {
        $(".pageLoaderOverlay").show();
        return $http.post('SLAInformation.aspx/getDSLSLAInfo', { "accSuppProdID": accSuppProdID, 'selectedCountry': selectedCountry,
            'selectedPackage': selectedPackage
        })
        .success(function (data, status, headers, config) {
           
        })
        .error(function (error) {
            console.log("Problem occured while loading DSL SLA; " + error);
              $(".pageLoaderOverlay").hide();
        });
    }

    return GetSLAInfo;
});



    