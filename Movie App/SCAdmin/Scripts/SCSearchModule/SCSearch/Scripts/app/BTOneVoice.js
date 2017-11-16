app.controller("BTOneVoice", function ($scope, $http, glbRegionID, glbCountryID, GetProductCategoryList, GetServiceAval, glbProductID, GetDoclinksFactory) {

    var region = glbRegionID.getRegionID();
    var countryId = glbCountryID.getCountryID();
    var productId = glbProductID.getProductID();

    $scope.mdprodId = productId;
    if ($scope.modCity == undefined) { $scope.modCity = 0; }
    $(".pageLoaderOverlay").show();

    GetServiceAval.getProdAvail(region, countryId, productId).success(function (data) {
        $scope.serviceAvailable = data.d[0].Item1;
        $scope.caseId = data.d[0].Item2;

        GetProductCategoryList.getProdCategory($scope.caseId, productId, countryId).success(function (data) {
            $scope.OneVoiceCategory = data.d;
            $scope.charList = data.d[0].charList;
            aaa = data.d;

            

        });




        GetDoclinksFactory.getDoc(glbProductID.getProductID()).success(function (data) {

            if (data.d.length == 0) {
                $scope.ShowBTOneVoiceProductDocLinks = 0;
            }
            else {
                $scope.ShowBTOneVoiceProductDocLinks = 1;

                $scope.DocumentslinksData = [];
                ProductsDocLinks = [];

                data.d.forEach(function (item) {

                    ProductsDocLinks.push({ DocumentTitle: item.DocumentTitle, DocumentUrl: item.DocumentUrl });

                });

                $scope.DocumentslinksData = ProductsDocLinks;
            }

        });

       

    });

    $scope.goToSearchPage = function (prodID, prodName) {
        if ($scope.mdprodId == 108) {
            $scope.$emit('onvoicecall', { product: { ProductID: prodID, ProductName: prodName, isIA: 1} });



            GetDoclinksFactory.getDoc(prodID).success(function (data) {
          
                if (data.d.length == 0) {
                    $scope.ShowBTOneVoiceProductDocLinks = 0;
                }
                else {
                    $scope.ShowBTOneVoiceProductDocLinks = 1;

                    $scope.DocumentslinksData = [];
                    ProductsDocLinks = [];

                    data.d.forEach(function (item) {

                        ProductsDocLinks.push({ DocumentTitle: item.DocumentTitle, DocumentUrl: item.DocumentUrl });

                    });

                    $scope.DocumentslinksData = ProductsDocLinks;
                }

            });




        } else {
            $scope.$emit('onvoicecall', { product: { ProductID: prodID, ProductName: prodName, isIA: 0} });

        }

    }

    $scope.openCpeInformationpopup = function () {

        var url = "CPEBundleDetails.aspx";
        var q1 = "?productid=" + $scope.modproduct;
        var q2 = "&countryid=" + $scope.modcountry;
        var q3 = "&cityid=" + $scope.modCity;
        var q4 = "&regionid=" + $scope.modregion;
        var q5 = "&caseID=" + $scope.caseId;

        url = url + q1 + q2 + q4 + q5;

        var iframehtml = '<iframe border=0 width="100%" height ="500px" frameborder="0" src="' + url + '"> </iframe>'
        console.log(iframehtml);
        window.open(url, "_blank", "toolbar=yes, scrollbars=yes, resizable=yes");
        //$("div.body-content").html(iframehtml);
    }
});


app.factory("GetProductCategoryList", function ($http) {
    var GetProductCategoryList = {};
    GetProductCategoryList.getProdCategory = function (caseId, productID, countryID) {
        $(".pageLoaderOverlay").show();
        return $http.post('BTOneVoice.aspx/getCharacteristics', { 'caseId': caseId, 'productID': productID, 'countryID': countryID })
        .success(function (data, status, headers, config) {
            


            $(".pageLoaderOverlay").hide();
        })
        .error(function (error) {
            console.log("Problem occured while loading Characteristics; " + error);
        });


    }

    return GetProductCategoryList;
});


app.factory("GetServiceAval", function ($http) {
    var GetServiceAval = {};
    GetServiceAval.getProdAvail = function (region, countryId, prodId) {
        return $http.post('BTOneVoice.aspx/getServiceAvailability', { 'regionID': region, 'countryID': countryId, 'prodId': prodId })
        .success(function (data, status, headers, config) {

            $(".panel-heading span.clickable").parents('.panel').find('.panel-body').slideUp();
            $(".panel-heading span.clickable").addClass('panel-collapsed');
            $(".panel-heading").addClass('panel-collapsed');
            $(".panel-heading span.clickable").find('i').removeClass('glyphicon-chevron-up').addClass('glyphicon-chevron-down');

        })
        .error(function (error) {
            console.log("Problem occured while loading availability; " + error);
        });
    }
    return GetServiceAval;
});

