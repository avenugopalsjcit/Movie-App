/// <reference path="../angular.min.js" />


app.controller("ProdNotesController", function ($scope, $http, glbProductID, glbRegionID, glbCountryID, glbCountry1, glbCountry2, ProductNotesFactory, glbCountryProductFlag) {
  
    $scope.Product = glbProductID.getProductID();
    $scope.ProductName = glbProductID.getProductName();
    $scope.RegionID = glbRegionID.getRegionID();
    $scope.RegionName = glbRegionID.getRegionName();
    $scope.CountryID = glbCountryID.getCountryID();
    $scope.CountryName = glbCountryID.getCountryName();

    if ($scope.Product == '') { return; }
    $scope.isProduct = glbCountryProductFlag.getFlag();
   
    $(".pageLoaderOverlay").show();

    if ($scope.isProduct == 0) {
        ProductNotesFactory.GetProdNotes($scope.Product, $scope.CountryID, 0).success(function (data) {
            $scope.ProdNotesData = data.d;
            $(".pageLoaderOverlay").hide();
        })
    }
    else if ($scope.isProduct == 1) {

        ProductNotesFactory.GetProdNotes($scope.Product, 0, 0).success(function (data) {
            $scope.ProdNotesData = data.d;
            $(".pageLoaderOverlay").hide();
        })
    }
    else if ($scope.isProduct == 2) {

        ProductNotesFactory.GetProdNotes($scope.Product, 0, $scope.RegionID).success(function (data) {
            $scope.ProdNotesData = data.d;
            $(".pageLoaderOverlay").hide();
        })
    }




    $scope.openNotesInformationpopup = function (NoteID) {

        var url = "DispaNotesList.aspx";
        $scope.isProduct = glbCountryProductFlag.getFlag();
        if ($scope.isProduct == 1) {
            var q1 = "?productid=" + $scope.Product;
            q1 = q1 + "&countryID=" + 0;
            q1 = q1 + "&NoteID=" + NoteID;
        }
        else if ($scope.isProduct == 0) {
            var q1 = "?productid=" + 0;
            q1 = q1 + "&countryID=" + $scope.CountryID;
            q1 = q1 + "&NoteID=" + NoteID;
            q1 = q1 + "&RegionName=" + $scope.RegionName;
            q1 = q1 + "&CountryName=" + $scope.CountryName;
        }

        else if ($scope.isProduct == 2) {

            var q1 = "?productid=" + 0;
            q1 = q1 + "&RegionID=" + $scope.RegionID;
            q1 = q1 + "&NoteID=" + NoteID;
            q1 = q1 + "&RegionName=" + $scope.RegionName;



        }
        url = url + q1;

        //                var iframehtml = '<iframe border=0 width="100%" height ="500px" frameborder="0" src="' + url + '"> </iframe>'
        //                console.log(iframehtml);
        //                $("div.DispNotesContent").html(iframehtml);


        window.open(url, "_blank", "toolbar=yes, scrollbars=yes, resizable=yes, top=100, left=150, width=700, height=600");




    }



});





app.factory("ProductNotesFactory", function ($http) {

    var ProductNotesFactory = {};

    ProductNotesFactory.GetProdNotes = function (ProductID, CountryID, RegionID) {

        return $http.post('Notes.aspx/GetNotesForProduct', { 'ProductID': ProductID, 'CountryID': CountryID, 'RegionID': RegionID });
    }

    return ProductNotesFactory;



});


