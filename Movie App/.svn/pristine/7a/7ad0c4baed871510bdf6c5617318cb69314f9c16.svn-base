var app = angular.module("ProductAccurateAdmin", []);

app.factory('ProductAccurateAdminfactory', function ($http) {

    var ProductAccurateAdminfactory = {};

    ProductAccurateAdminfactory.GetProductOwnerDetails = function () {
        alert("Test");
        return $http.post('UsersData.aspx/GetProductOwnerDetails', {});

    }

    return ProductAccurateAdminfactory;

});

app.controller("ProductAccurateAdminCntrl", function ($scope, ProductAccurateAdminfactory) {


    $scope.Owners = [[{ 'EmployeeId': 10, 'UserName': 'naren' }, { 'EmployeeId': 20, 'UserName': 'naren2' }, { 'EmployeeId': 30, 'UserName': 'naren3'}], [{ 'EmployeeId': 10, 'UserName': 'naren' }, { 'EmployeeId': 20, 'UserName': 'naren2' }, { 'EmployeeId': 30, 'UserName': 'naren3'}]];
    $scope.modOwner = [];
    ProductAccurateAdminfactory.GetProductOwnerDetails().success(function (data) {
        $scope.ProductAccurateAdminMapping = data.d;
        data.d.forEach(function (item) {
            var primarySelected = 0;
            item.Owners.forEach(function (item1) {
                if (item1.PrimaryCD == 1) {
                    $scope.modOwner.push(item1.EmployeeId);
                    primarySelected = 1;
                }
            });
            if (primarySelected == 0) {
                $scope.modOwner.push("0");
            }
        });
    })
        .error(function (error) {
            alert("Problem occured while loading products; " + error);
        });

    $scope.ddlProductOwnersChange = function (EmpId) {
        alert(EmpId);
    }

});