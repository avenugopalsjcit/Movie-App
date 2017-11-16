

var app = angular.module("appModule1", []);

app.controller("SLAInfoCntrl", function ($scope, $window, GetSLAInfo) {


    function laodCountrySupplier() {
        $scope.modAccSupp = null;
        $scope.modSLACountry = null;
        $scope.modAccType = null;
        $scope.modSuppProd = null;

        GetSLAInfo.getSLCountry("").success(function (data) {
            $scope.CountryList = data.d;
            if (data.d != null && data.d.length == 1) {
                $scope.modSLACountry = data.d[0].CountryId;
            }

        });

        //first time Supplier call
        GetSLAInfo.getSLAAccSupp("").success(function (data) {
            $scope.AccSuppList = data.d;
            if (data.d != null && data.d.length == 1) {
                $scope.modAccSupp = data.d[0].supplierId;
            }

        });

        $('#ServiceDeleveryOverview').hide();
        $('#serviceAssuraneOverview').hide();
        $('#downpanel').hide();
        $('.InfoCat').hide();

    }

    //this function will be called on page laod
    laodCountrySupplier();


    //will be called in country and supplier dropdown call
    $scope.ddlSLACountry = function () {

        if ($scope.modSLACountry != null) {

            GetSLAInfo.getSLAAccSupp($scope.modSLACountry).success(function (data) {
                $scope.AccSuppList = data.d;
                if (data.d != null && data.d.length == 1) {
                    $scope.modAccSupp = data.d[0].supplierId;
                }
                getAccTypeSuppProduct();
            });


        }
        else {

            $scope.modAccSupp = null;
            $('.InfoCat').hide();
            laodCountrySupplier();
            $('#suppProdPanel').hide();
            $('#downpanel').hide();
        }


    }

    //called on change of supplier dropdown
    $scope.ddlSLAAccSupp = function () {

        if ($scope.modAccSupp != null) {

            $('.InfoCat').hide();
            GetSLAInfo.getSLCountry($scope.modAccSupp).success(function (data) {
                $scope.CountryList = data.d;
                if (data.d != null && data.d.length == 1) {
                    $scope.modSLACountry = data.d[0].CountryId;
                }
                getAccTypeSuppProduct();
            });


        }
        else {

            $scope.modSLACountry = null;
            laodCountrySupplier();
            $('#suppProdPanel').hide();
        }
    }

    $scope.reset = function () {
        $window.location.reload();

    }

    getAccTypeSuppProduct = function () {

        //if both country and supplier dropdown is selected then populating the  next two dropdown
        if ($scope.modSLACountry != null && $scope.modAccSupp != null) {

            GetSLAInfo.getSLAAccType($scope.modSLACountry, $scope.modAccSupp, "").success(function (data) {
                $scope.AccTypeList = data.d;
                if (data.d != null && data.d.length == 1) {
                    $scope.modAccType = data.d[0].acctypeId;
                    showInfoCategory();
                }

            });

            GetSLAInfo.getSLASupprod($scope.modSLACountry, $scope.modAccSupp, "").success(function (data) {
                $scope.SuppPordList = data.d;
                if (data.d != null && data.d.length == 1) {
                    $scope.modSuppProd = data.d[0].AccSuppProdId;
                    showInfoCategory();
                }

            });

            $('#suppProdPanel').show();

            $('.InfoCat').hide();
            $('#ServiceDeleveryOverview').hide();
            $('#serviceAssuraneOverview').hide();
            $('#downpanel').hide();

        }
        else {
            $('#suppProdPanel').hide();

        }

    }

    //this function will be called on change of access type and supplier product
    $scope.ddlSLACCType = function () {
        if ($scope.modAccType != null) {

            GetSLAInfo.getSLASupprod($scope.modSLACountry, $scope.modAccSupp, $scope.modAccType).success(function (data) {
                $scope.SuppPordList = data.d;
                if (data.d != null && data.d.length == 1) {
                    $scope.modSuppProd = data.d[0].AccSuppProdId;
                    showInfoCategory();
                } else { showInfoCategory(); }
            });


        } else {
            getAccTypeSuppProduct();
            $scope.modSuppProd = null;

        }

    }

    //called on change of supplier product dropdown
    $scope.ddlSLASupProd = function () {
        if ($scope.modSuppProd != null) {

            GetSLAInfo.getSLAAccType($scope.modSLACountry, $scope.modAccSupp, $scope.modSuppProd)
            .success(function (data) {
                $scope.AccTypeList = data.d;
                if (data.d != null && data.d.length == 1) {
                    $scope.modAccType = data.d[0].acctypeId;
                    showInfoCategory();
                } else { showInfoCategory(); }
            });


        } else {
            $scope.modAccType = null;
            getAccTypeSuppProduct();

        }

    }
    $('.InfoCat').hide();
    showInfoCategory = function () {
        if ($scope.modAccSupp != null && $scope.modSuppProd != null && $scope.modSLACountry != null && $scope.modAccType != null) {
            $('.InfoCat').show();
            $('#ServiceDeleveryOverview').show();
            $('#downpanel').show();
            ShowSLAInformation($scope.modAccSupp, $scope.modSuppProd,
            $scope.modSLACountry, $scope.modAccType, -1, 1);
        }
        else {
            $('.InfoCat').hide();
            $('#ServiceDeleveryOverview').hide();
            $('#serviceAssuraneOverview').hide();
            $('#downpanel').hide();
        }
    }


    //this method will get the SLA information from DB and value will be binded to DOM
    ShowSLAInformation = function (SLAAccSupp, SLASuppProd, SLACountry, SLAAccType, SLAPortspeed, Home) {

        GetSLAInfo.getSLA(SLAAccSupp, SLASuppProd, SLACountry, SLAAccType, SLAPortspeed, Home).success(function (data) {

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
            $scope.strSpecialNoticeSA = data.d.objSLAInfo.strServiceCreditsSA;
            $scope.strServiceCreditsSA = data.d.objSLAInfo.strSpecialNoticeSA;


            $scope.ContLeadTimeList = data.d.objContLeadTime;

           $scope.modInfocategory = $scope.Infocategory[0].value;
           $scope.displaySLA();
        });
    }

    //this json will be loaded in information category dropdown
    $scope.Infocategory = [
    { name: 'Service Delivery', value: "0" },
    { name: 'Service Assurance', value: "1" },
    ];


    $scope.closePopup = function () {
        $modal.close();
    }

    $scope.infocategory = $('#infocategory').val();

    //intially servicedelivery should be loaded
    $scope.modInfocategory = $scope.Infocategory[0].value;


    $scope.displaySLA = function () {


        if ($scope.modInfocategory == "0") {
            $('#ServiceDeleveryOverview').show();
            $('#serviceAssuraneOverview').hide();
        }
        if ($scope.modInfocategory == "1") {
            $('#ServiceDeleveryOverview').hide();
            $('#serviceAssuraneOverview').show();
        }
    }

});


app.factory("GetSLAInfo", function ($http) {
    //debugger
    var GetSLAInfo = {};

    GetSLAInfo.getSLA = function (AccSuppCharID, AccSuppNameId, countryID, suppacctype, pspeed, Home) {
        $(".pageLoaderOverlay").show();
        return $http.post('SLAInformation.aspx/getSLAInfo', { "AccSuppCharID": AccSuppCharID, 'AccSuppNameId': AccSuppNameId,
            'countryID': countryID, 'supplier_access_type': suppacctype, 'pspeed': pspeed, 'Home': Home, 'isDSL': 'N', 'SLAPortTypeID': 0
        })
        .success(function (data, status, headers, config) {
            $(".pageLoaderOverlay").hide();
        })
        .error(function (error) {
            console.log("Problem occured while loading getSLAInfo; " + error);
            $(".pageLoaderOverlay").hide();
        });
    },

   
          GetSLAInfo.getAccTypeSuppPordData = function (countryID, AccSuppId) {
              $(".pageLoaderOverlay").show();
              return $http.post('SLAInformation.aspx/getAccTypeSuppProduct', { "countryID": countryID, "AccSuppId": AccSuppId })
            .success(function (data, status, headers, config) {
                $(".pageLoaderOverlay").hide();
            })
            .error(function (error) {
                console.log("Problem occured while loading Acctype and supplier Data; " + error);
                $(".pageLoaderOverlay").hide();
            });

          },

           GetSLAInfo.getSLCountry = function (AccSuppId) {
               $(".pageLoaderOverlay").show();
               return $http.post('SLAInformation.aspx/getSLCountry', { "AccSuppId": AccSuppId })
            .success(function (data, status, headers, config) {
                $(".pageLoaderOverlay").hide();
            })
            .error(function (error) {
                console.log("Problem occured while loading country; " + error);
                $(".pageLoaderOverlay").hide();
            });

           },

          GetSLAInfo.getSLAAccSupp = function (countryID) {
              $(".pageLoaderOverlay").show();
              return $http.post('SLAInformation.aspx/getSLAAccSupp', { "countryID": countryID })
            .success(function (data, status, headers, config) {
                $(".pageLoaderOverlay").hide();
            })
            .error(function (error) {
                console.log("Problem occured while loading country; " + error);
                $(".pageLoaderOverlay").hide();
            });

          },

          GetSLAInfo.getSLAAccType = function (countryID, suppId, suppProd) {
              $(".pageLoaderOverlay").show();
              return $http.post('SLAInformation.aspx/getSLAAccType', { "countryID": countryID, "suppId": suppId, "suppProd": suppProd })
            .success(function (data, status, headers, config) {
                $(".pageLoaderOverlay").hide();
            })
            .error(function (error) {
                console.log("Problem occured while loading accesstype; " + error);
                $(".pageLoaderOverlay").hide();
            });

          },

          GetSLAInfo.getSLASupprod = function (countryID, suppId, AccType) {
              $(".pageLoaderOverlay").show();
              return $http.post('SLAInformation.aspx/getSLASupprod', { "countryID": countryID, "suppId": suppId, "AccType": AccType })
            .success(function (data, status, headers, config) {
                $(".pageLoaderOverlay").hide();
            })
            .error(function (error) {
                console.log("Problem occured while loading supplier product; " + error);
                $(".pageLoaderOverlay").hide();
            });

          }
    return GetSLAInfo;
});



    