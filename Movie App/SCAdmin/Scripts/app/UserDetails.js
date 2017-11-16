var app = angular.module("UserDetailsModule", ['ui.bootstrap', 'ngRoute', 'ngResource']);

app.factory('UserInfo', function ($http) {
    var UserInfo = {};
    UserInfo.GetUserDetails = function (EINInfo) {
        if (angular.isDefined(EINInfo)) {
            return $http.post('UserDetails.aspx/GetUserDetails', { 'EIN': EINInfo, 'UserName': "SCLDAP", 'Password': "SCLDAP-de" });
        }
        else {
            alert("Please enter User Identifier.");
            $(".pageLoaderOverlay").hide();
        }

    }
    return UserInfo;
});

app.controller("UserDetails", function ($scope, $http, UserInfo) {

    $scope.UserData = false;
    $scope.NoUserData = false;
    $scope.GetUserDtls = function (EINInfo) {
        $(".pageLoaderOverlay").show();
        $scope.UserName = "";
        $scope.Password = "";
        UserInfo.GetUserDetails(EINInfo, $scope.UserName, $scope.Password).success(function (data) {
            if (data.d.EIN != null) {
                $scope.UserData = true;
                $scope.NoUserData = false;
                $scope.EIN = data.d.EIN;
                $scope.FirstName = data.d.FirstName;
                $scope.LastName = data.d.LastName;
                $scope.Email = data.d.EmailID;
                $scope.Mobile = data.d.Mobile;
                $scope.TelePhoneNo = data.d.DeskPhone;
                $scope.GFRCode = data.d.btGFR;
            }
            else if (EINInfo == "") {
                $scope.UserData = false;
                $scope.NoUserData = false;
                alert("Please enter User Identifier");
            }
            else {
                $scope.UserData = false;
                $scope.NoUserData = true;
                $scope.ErrorMsg = "User Information does not exist in CDDE";
            }
            $(".pageLoaderOverlay").hide();
        })
        .error(function (error) {
            alert("Problem occured while loading User Details; " + error);
            $(".pageLoaderOverlay").hide();
        });
    }

});