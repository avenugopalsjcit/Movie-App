
//var app = angular.module('app1', ['ngTable']);

app.factory('DistributorGridFactory1', function ($http) {

    var DistributorGridFactory1 = {};

    DistributorGridFactory1.GetDistributorsGrid = function () {
        //$(".pageLoaderOverlay").show();
        return $http.post('/UpdateAnnouncements.aspx/GetGridAnnouncementsDetails', {});

    }

    return DistributorGridFactory1;
});


app.factory('deletedetailsInfo', function ($http) {
    debugger;
    var deletedetailsInfo = {};
    deletedetailsInfo.removeRows = function (annid) {

        return $http.post('/UpdateAnnouncements.aspx/SaveAndDelete1', { 'annid': annid });
    }
    return deletedetailsInfo;
});


app.factory('AddNewAnnouncementInfo', function ($http) {
    debugger;
    var AddNewAnnouncementInfo = {};
    AddNewAnnouncementInfo.addNewTask = function (date, annenddate, title, disc) {

        return $http.post('/UpdateAnnouncements.aspx/AddNewAnnouncement', { 'anndate': date, 'annenddate': annenddate, 'title': title, 'announcement': disc });
    }
    return AddNewAnnouncementInfo;
});




app.controller('tableController1', ['$scope', 'DistributorGridFactory1', 'NgTableParams', 'filterFilter', 'deletedetailsInfo', 'AddNewAnnouncementInfo', function ($scope, DistributorGridFactory1, NgTableParams, filterFilter, deletedetailsInfo, AddNewAnnouncementInfo) {

    var self = this;

    DistributorGridFactory1.GetDistributorsGrid().success(function (data) {

        $scope.sample111 = data;
        $scope.announcements = data.d;

        var jsondata = $scope.announcements;
        self.tableParams = new NgTableParams({},
         { dataset: jsondata });





    });



    $scope.addNewTask = function () {
        debugger;
        annid = "";

        var index = -1;
        //tab = "Distributor"
        var comArr = eval($scope.announcements);
        for (var i = 0; i < comArr.length; i++) {

            annid += $scope.announcements[i].annid + ",";
            //                    countryids += $scope.data[i].anndate + ",";
            //                    supplierids += $scope.data[i].supplierid + ",";

        }



        var index = -1;
        //tab = "Distributor"
        var comArr = eval($scope.announcements);
        // btnvalue = $(Deletebtn)[0].defaultValue;

        annid = annid.slice(0, -1);


        // return  { 'btn$http.post('SupplierRestriction.aspx/SaveAndDelete',Value': btnvalue, 'DistributorIds': distributorids, 'Countryids': countryids, 'supplierids': supplierids });
        bootbox.confirm("Do you really want to add these Announcements?", function (result) {
            debugger;
            if (result) {

                AddNewAnnouncementInfo.addNewTask($scope.anndate, $scope.annenddate, $scope.title, $scope.announcement).success(function (data) {
                    debugger;
                    bootbox.alert(data.d + "Announcements(s) have been Added");



                    DistributorGridFactory1.GetDistributorsGrid().success(function (data) {
                        debugger;
                        $scope.announcements = data.d;


                        $scope.usersTable = new NgTableParams({
                            page: 1,
                            count: 10
                        }, {
                            total: $scope.DistributerGrid.length,
                            getData: function ($defer, params) {
                                $scope.data = params.sorting() ? $filter('orderBy')($scope.DistributerGrid, params.orderBy()) : $scope.DistributerGrid;
                                $scope.data = params.filter() ? $filter('filter')($scope.data, params.filter()) : $scope.data;

                                $scope.data = $scope.data.slice((params.page() - 1) * params.count(), params.page() * params.count());
                                $defer.resolve($scope.data);
                            }
                        });
                        //                        $(".pageLoaderOverlay").hide();
                    })


        .error(function (error) {
            alert(error);
            alert("Problem occured while Adding Announcements; " + JSON.stringify(error));
        });




                }).error(function (error) {
                    alert("Problem occured while adding  Announcements; " + error);
                });
            };
        });

    };




    $scope.EditAnnouncements = function (announcement) {
        $scope.Editannstartdate = announcement.anndate;
        $scope.Editannenddate = announcement.annenddate;
        $scope.Edittitle = announcement.title;
        $scope.Editannouncement = announcement.announcement;
    }






































    $scope.removeRows = function (event) {
        debugger;
        annid = "";


        var index = 0;
        //        var index = -1;
        //tab = "Distributor"
        var comArr = eval($scope.announcements);
        // btnvalue = $(Deletebtn)[0].defaultValue;

        annid = event;



        //        annid = $scope.announcements[thisid].annid;

        //        for (var i = 0; i < comArr.length; i++) {

        //            annid += $scope.announcements[i].annid + ",";


        //            if ($('.chkAnnounmence')[i].checked == true) {
        //                annid += $scope.announcements[i].annid + ",";
        //                //                    countryids += $scope.data[i].anndate + ",";
        //                //                    supplierids += $scope.data[i].supplierid + ",";
        //            }

        //            else {

        //            }
        //        }
        if (annid == "") {
            // bootbox.alert("Please select atleast one checkbox");
            return false;
        }
        //        annid = annid.slice(0, -1);


        // return  { 'btn$http.post('SupplierRestriction.aspx/SaveAndDelete',Value': btnvalue, 'DistributorIds': distributorids, 'Countryids': countryids, 'supplierids': supplierids });
        bootbox.confirm("Do you really want to delete this Announcement?", function (result) {
            debugger;
            if (result) {

                deletedetailsInfo.removeRows(annid).success(function (data) {

                    bootbox.alert(data.d + "Announcement has been deleted");



                    DistributorGridFactory1.GetDistributorsGrid().success(function (data) {
                        //                        $(".pageLoaderOverlay").hide();
                        $scope.announcements = data.d;


                        $scope.usersTable = new NgTableParams({
                            page: 1,
                            count: 10
                        }, {
                            total: $scope.DistributerGrid.length,
                            getData: function ($defer, params) {
                                $scope.data = params.sorting() ? $filter('orderBy')($scope.DistributerGrid, params.orderBy()) : $scope.DistributerGrid;
                                $scope.data = params.filter() ? $filter('filter')($scope.data, params.filter()) : $scope.data;

                                $scope.data = $scope.data.slice((params.page() - 1) * params.count(), params.page() * params.count());
                                $defer.resolve($scope.data);
                            }
                        });
                    })

        .error(function (error) {
            alert(error);
            alert("Problem occured while deleting Announcement; " + JSON.stringify(error));
        });




                }).error(function (error) {
                    alert("Problem occured while deleting Announcement; " + error);
                });
            };
        });
    };



} ]);











  







