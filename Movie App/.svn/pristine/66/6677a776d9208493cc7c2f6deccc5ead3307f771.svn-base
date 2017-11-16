app.controller("BTCPEProductController", function ($scope, $http, glbProductID, glbCountryID, glbCityID, GetCPEDataFromServer, UserInfofactory) {
    var prodID = glbProductID.getProductID();
    var countryID = glbCountryID.getCountryID()
    var cityID = glbCityID.getCityID();
    var selectedProduct;
    var parSupplier = '';
    $scope.prodLoaded = 0;
    $scope.leadTimeLoaded = 0;

    $(".pageLoaderOverlay").show();
    $http.post('DispCPEProduct.aspx/GetAllSuppler', { 'countryID': countryID })
    .success(function (data, status, headers, config) {

        $scope.CpeSupplierList = data.d;
        //assigned supplier dropdown
        selectedSupplier = $scope.CpeSupplierList;
        ccc = selectedSupplier;

        //bind all supplier id
        if (selectedSupplier === undefined || selectedSupplier === null) {
            console.log("supplier Undefined");
        }
        else {
            for (var i = 0; i < selectedSupplier.length; i++) {
                if (selectedSupplier[i].Item2 === undefined) {
                    return;
                }
                else {
                    parSupplier += selectedSupplier[i].Item1 + ",";
                }
            }
            parSupplier = parSupplier.slice(0, -1);


//            if ($("#drpSupplierID option:selected").text() == "ALL") {
//                parSupplier = "0";
//            }

            $http.post('DispCPEProduct.aspx/GetValidProduct', { "selectedSupplier": parSupplier, "selectedCountry": countryID })
            .success(function (data, status, headers, config) {
                $scope.prodlistforbundle = data.d;
                $scope.prodlistformaint = data.d;

                $scope.prodLoaded = 1;
                hideLoader($scope.prodLoaded, $scope.leadTimeLoaded);
            })
            .error(function (data, status, headers, config) {
                console.log("GetValidProduct api called failed");
                $(".pageLoaderOverlay").hide();
            });


//            var parSupplier1 = "";
//            if ($("#drpSupplierID option:selected").text() == "ALL") {
//                for (var i = 0; i < selectedSupplier.length; i++) {
//                    parSupplier1 += selectedSupplier[i].Item1 + ",";
//                }
//            }
//            else {
//                var supplier1 = $("#drpSupplierID option:selected").value();
//                parSupplier1 = supplier1;
//            }

//            if (parSupplier1.charAt(parSupplier1.length - 1) == ',') {
//                parSupplier1 = parSupplier1.substr(0, parSupplier1.length - 1);
//            }


            $http.post('DispCPEProduct.aspx/getCPELeadTime', { "supplierID": parSupplier, "countryID": countryID, "productId": prodID })
            .success(function (data, status, headers, config) {
                // $scope.maintoptionlist = data.d;
                var resCPELeadtime = data.d;
                xx = resCPELeadtime;

                $scope.CPELeadtimelist = resCPELeadtime;
                $scope.leadTimeLoaded = 1;
                hideLoader($scope.prodLoaded, $scope.leadTimeLoaded);

            })
            .error(function (data, status, headers, config) {
                console.log("leadtime api called failed");
                $(".pageLoaderOverlay").hide();
            });

        }

    })
    .error(function (data, status, headers, config) {
        console.log("supplier api called failed");
        $(".pageLoaderOverlay").hide();
    });


    function hideLoader(prodLoaded, LeadTimeLoaded) {
        if (prodLoaded == 1 && LeadTimeLoaded == 1) {
            $(".pageLoaderOverlay").hide();

        }
    }

    $scope.getProductLeadTimeforSupplier = function () {
        var supplierID = $scope.ddlsuppliers;

        selectedSupplier = $scope.CpeSupplierList;

        if (supplierID === null) {
            supplierID = parSupplier;
        }

//        var parSupplier1 = "";
//        if ($("#drpSupplierID option:selected").text() == "ALL") {
//            for (var i = 0; i < selectedSupplier.length; i++) {
//                parSupplier1 += selectedSupplier[i].Item1 + ",";
//            }
//        }
//        else {
//            parSupplier1 = supplierID;
//        }

//        if (parSupplier1.charAt(parSupplier1.length - 1) == ',') {
//            parSupplier1 = parSupplier1.substr(0, parSupplier1.length - 1);
//        }

        $(".pageLoaderOverlay").show();




        $http.post('DispCPEProduct.aspx/GetValidProduct', { "selectedSupplier": supplierID, "selectedCountry": countryID })
       .success(function (data, status, headers, config) {
           $scope.prodlistforbundle = data.d;
           $scope.prodlistformaint = data.d;
           $(".pageLoaderOverlay").hide();
       })
       .error(function (data, status, headers, config) {
           console.log("GetValidProduct api called failed");
           $(".pageLoaderOverlay").hide();
       });

        $(".pageLoaderOverlay").show();
        $http.post('DispCPEProduct.aspx/getCPELeadTime', { "supplierID": supplierID, "countryID": countryID, "productId": prodID })
         .success(function (data, status, headers, config) {
             // $scope.maintoptionlist = data.d;
             var resCPELeadtime = data.d;
             xx = resCPELeadtime;

             $scope.CPELeadtimelist = resCPELeadtime;
             $(".pageLoaderOverlay").hide();
         })
        .error(function (data, status, headers, config) {
            console.log("api called failed");
            $(".pageLoaderOverlay").hide();
        });
    }

    var tempProdID = ''; var tempSuppID = '';
    $scope.getMaintOptForProduct = function (prodid) {
        supplierID = $scope.ddlsuppliers;

        if (supplierID === null || supplierID === undefined) {
            supplierID = parSupplier;
        }

        if (tempProdID === prodid && tempSuppID === supplierID) { }
        else {
            //api call started
            $(".pageLoaderOverlay").show();
            $http.post('DispCPEProduct.aspx/getValidCPEMaintOptsforproduct', { "prodID": prodid, "countryID": countryID, "cityID": cityID, "supplier": supplierID })
            .success(function (data, status, headers, config) {
                if (data.d.length === 0) {
                    $('.tblMaint').hide();
                    $('.noDataMaint').show();
                }
                else {
                    $scope.maintoptionlist = data.d;
                    $('.tblMaint').show();
                    $('.noDataMaint').hide();
                }

                $(".pageLoaderOverlay").hide();
            })
            .error(function (data, status, headers, config) {
                $scope.status = "api called failed" + status;
                $(".pageLoaderOverlay").hide();
            });
            tempProdID = prodid;
            tempSuppID = supplierID;
        }

    }

    var tempBundleProdID = '';
    var tempCountryID = '';
    $scope.getBundleForProduct = function (productID) {

        if (tempBundleProdID === productID && tempCountryID === countryID) { }
        else {
            $(".pageLoaderOverlay").show();
            $http.post('DispCPEProduct.aspx/GetBundleDetails', { "prodID": productID, "countryID": countryID })
        .success(function (data, status, headers, config) {
            if (data.d.length === 0) {
                $('.tblBundle').hide();
                $('.noDataBndle').show();
            }
            else {
                $('.tblBundle').show();
                $('.noDataBndle').hide();
                $scope.bundleList = data.d;
            }
            $(".pageLoaderOverlay").hide();
        })
        .error(function (data, status, headers, config) {
            $scope.status = status;
            $(".pageLoaderOverlay").hide();
        });

            tempBundleProdID = productID;
            tempCountryID = countryID;
        }
    }



    $scope.openPartPopup = function (bindleID, BundleName) {

        var url = "DispCPEParts.htm";
        var q1 = "?bindleID=" + bindleID;
        var q2 = "&countryid=" + countryID;
        var q3 = "&isHVPN=63";
        var q4 = "&BundleName=" + BundleName;

        url = url + q1 + q2 + q3 + q4;
        window.open(url, "_blank", "toolbar=yes, scrollbars=yes,width=1000, resizable=yes");

    }

    GetCPEDataFromServer.getValidCaseID(countryID, cityID).success(function (data) {

        UserInfofactory.GetUserInfo(data.d, 'CSU_Cases').success(function (data) {

            $("#divUserInfo").show();


            if (data.d.CreatedBy != "UNKNOWN")
                $scope.CreatedBy = data.d.CreatedBy;
            $scope.CreatedDate = data.d.CreatedDate;
            if (data.d.UpdatedBy != "UNKNOWN")
                $scope.UpdatedBy = data.d.UpdatedBy;
            $scope.UpdatedDate = data.d.UpdatedDate;
        });

    });

});

app.factory("GetCPEDataFromServer", function ($http) {
    var GetCPEDataFromServer = [];
    GetCPEDataFromServer.getValidCaseID = function (countryID, CityID) {
        return $http.post('DispCPEProduct.aspx/ValidServiceCenterCaseId', { "countryID": countryID, "cityID": CityID });
    }
    return GetCPEDataFromServer;
});


app.service("getServerData", function ($http) {
    var supplierList = '';
    var ProductList = '';
    var cpeLeadTime = '';
    var mainOptList = '';
    var bundleList = '';
    return {
        getSupplierList: function (countryId) {
            $http.post('../DispCPEProduct.aspx/GetAllSuppler', { 'countryID': countryId })
                .success(function (data, status, headers, config) {
                    supplierList = data.d;
                    alert("inside" + supplierList);
                }).error(function (data, status, headers, config) {
                    console.log("supplier api called failed");
                });
            return supplierList;
        },

        getProductList: function (suppID, cntryID) {
            $http.post('../DispCPEProduct.aspx/GetValidProduct', { "selectedSupplier": suppID, "selectedCountry": cntryID })
            .success(function (data, status, headers, config) {
                ProductList = data.d;
            })
            .error(function (data, status, headers, config) {
                console.log("GetValidProduct api called failed");
            });
            return ProductList;
        },

        getCPELeadTimeList: function (suppID, cntryID) {
            $http.post('../DispCPEProduct.aspx/getCPELeadTime', { "supplierID": suppID, "countryID": cntryID })
            .success(function (data, status, headers, config) {
                cpeLeadTime = data.d;

            })
            .error(function (data, status, headers, config) {
                console.log("Leadtime api called failed");
            });
        },

        getMainOptList: function (prodid, cntryid, cityid, suppid) {
            $http.post('../DispCPEProduct.aspx/getValidCPEMaintOptsforproduct', { "prodID": prodid, "countryID": cntryid, "cityID": cityid, "supplier": suppid })
            .success(function (data, status, headers, config) {
                if (data.d.length === 0) { alert("No Data Available"); }
                mainOptList = data.d;

            })
            .error(function (data, status, headers, config) {
                $scope.status = "api called failed" + status;
            });
            return mainOptList;

        },

        getBundleList: function () {
            $http.post('../DispCPEProduct.aspx/GetBundleDetails', { "prodID": productID, "countryID": countryID })
            .success(function (data, status, headers, config) {
                if (data.d.length === 0) { alert("No Data Available"); }
                bundleList = data.d;
            })
            .error(function (data, status, headers, config) {
                $scope.status = status;
            });
            return bundleList;
        }


    }
});












