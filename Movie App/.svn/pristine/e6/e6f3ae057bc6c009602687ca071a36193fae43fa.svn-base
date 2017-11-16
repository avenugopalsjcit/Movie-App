var appNote = angular.module("appNotes", ['ngSanitize']);


appNote.controller("DispNotesController", function ($scope, $http, $sce, DispNotesFactory, DispCountryNotesFactory, DispRegionNotesFactory) {

    $(".pageLoaderOverlay").show();
    var productid = unescape(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + escape('productid').replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
    var NoteID = unescape(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + escape('NoteID').replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
    var countryID = unescape(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + escape('countryID').replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
    var RegionName = unescape(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + escape('RegionName').replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
    var CountryName = unescape(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + escape('CountryName').replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
    var RegionID = unescape(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + escape('RegionID').replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));

    if (productid > 0 && countryID == 0) {
        $scope.isProduct = 1;
        DispNotesFactory.GetNotes(productid, NoteID).success(function (data) {

            $scope.UserName = data.d.UserName;
            $scope.NotePriority = data.d.NotePriority;
            $scope.NoteCatageroy = data.d.NoteCatageroy;
            $scope.NOTEEFFBEGDATE = data.d.NOTEEFFBEGDATE;
            $scope.NOTEEFFENDDATE = data.d.NOTEEFFENDDATE;
            $scope.NoteTitle = data.d.NoteTitle;
            $scope.NOTECONTENT = data.d.NOTECONTENT;
            $scope.ProductName = data.d.ProductName;
            //$scope.NOTECONTENT = $sce.trustAsHtml($scope.NOTECONTENT);
            $(".pageLoaderOverlay").hide();

        });
    }

    if (productid == 0 && countryID > 0) {
        $scope.isProduct = 0;
        $scope.RegionName = RegionName;
        $scope.CountryName = CountryName;
        DispCountryNotesFactory.GetCntryNotes(countryID, NoteID).success(function (data) {
           

            $scope.UserName = data.d.UserName;
            $scope.NotePriority = data.d.NotePriority;
            $scope.NoteCatageroy = data.d.NoteCatageroy;
            $scope.NOTEEFFBEGDATE = data.d.NOTEEFFBEGDATE;
            $scope.NOTEEFFENDDATE = data.d.NOTEEFFENDDATE;
            $scope.NoteTitle = data.d.NoteTitle;
            $scope.NOTECONTENT = data.d.NOTECONTENT;
            $scope.ProductName = data.d.ProductName;
            $scope.RegionName = data.d.RegionName;
            $scope.CountryName = data.d.CountryName;
            $(".pageLoaderOverlay").hide();

        });

    }


    if (productid == 0 && RegionID > 0) {
        $scope.isProduct = 2;
        $scope.RegionName = RegionName;

        DispRegionNotesFactory.GetRegNotes(RegionID, NoteID).success(function (data) {

           
            $scope.UserName = data.d.UserName;
            $scope.NotePriority = data.d.NotePriority;
            $scope.NoteCatageroy = data.d.NoteCatageroy;
            $scope.NOTEEFFBEGDATE = data.d.NOTEEFFBEGDATE;
            $scope.NOTEEFFENDDATE = data.d.NOTEEFFENDDATE;
            $scope.NoteTitle = data.d.NoteTitle;
            $scope.NOTECONTENT = data.d.NOTECONTENT;
            $scope.ProductName = data.d.ProductName;
            $scope.RegionName = data.d.RegionName;
            $(".pageLoaderOverlay").hide();

        });

    }


    $scope.to_trusted = function () {

        return $sce.trustAsHtml($scope.NOTECONTENT);
    };



});


appNote.factory("DispNotesFactory", function ($http) {
    
    var DispNotesFactory = {};

    DispNotesFactory.GetNotes = function (ProductID, NoteID) {
     
        return $http.post('DispaNotesList.aspx/GetNotesInformation', { 'productID': ProductID, 'NoteID': NoteID });
    }
    return DispNotesFactory;
});

appNote.factory("DispCountryNotesFactory", function ($http) {

    var DispCountryNotesFactory = {};

    DispCountryNotesFactory.GetCntryNotes = function (countryID, NoteID) {


        return $http.post('DispaNotesList.aspx/GetCountryNotes', { 'countryID': countryID, 'NoteID': NoteID });
    }

    return DispCountryNotesFactory;


});

appNote.factory("DispRegionNotesFactory", function ($http) {


    var DispRegionNotesFactory = {};

    DispRegionNotesFactory.GetRegNotes = function (RegionID, NoteID) {


        return $http.post('DispaNotesList.aspx/GetRegionNotes', { 'RegionID': RegionID, 'NoteID': NoteID });
    }

    return DispRegionNotesFactory;

});