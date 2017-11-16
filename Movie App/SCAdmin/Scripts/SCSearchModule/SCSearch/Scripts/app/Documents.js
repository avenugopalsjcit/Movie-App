/// <reference path="../angular.min.js" />

app.controller("DocumentLinkscntrl", function ($http, $scope, $rootScope, GetDoclinksFactory, glbProductID) {
  
    $scope.Product = glbProductID.getProductID();

    $scope.$on('GetProdLinksInfo', function (event, obj) {

        $scope.GetDocLinks(obj.ProductID);

    });

    $scope.GetDocLinks = function (ProductID) {

        GetDoclinksFactory.getDoc(ProductID).success(function (data) {

            $scope.DocumentslinksData = [];
            ProductsDocLinks = [];

            data.d.forEach(function (item) {

                ProductsDocLinks.push({ DocumentTitle: item.DocumentTitle, DocumentUrl: item.DocumentUrl });

            });

            $scope.DocumentslinksData = ProductsDocLinks;
            $(".pageLoaderOverlay").hide();
        })
    }

});


app.factory("GetDoclinksFactory", function ($http, $rootScope) {

    var GetDoclinksFactory = {};
    GetDoclinksFactory.getDoc = function (productid) {
        $(".pageLoaderOverlay").show();
        return $http.post('Search.aspx/GetLinks', { 'ProductID': productid })
        .success(function (data, status, headers, config) {

           
        })
        .error(function (error) {
            $(".pageLoaderOverlay").hide();
            console.log("Problem occured while loading links;" + JSON.stringify(error));
        });
        
    }
    return GetDoclinksFactory;
});
