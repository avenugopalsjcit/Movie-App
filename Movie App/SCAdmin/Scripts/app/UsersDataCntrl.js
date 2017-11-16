var app = angular.module("userData", []);

app.factory('userDatafactory', function ($http) {

    var userDatafactory = {};

    userDatafactory.GetUserStatus = function () {
        return $http.post('UsersData.aspx/GetUserStatus', {});

    }

    userDatafactory.CreateUserStatus = function (UserStatusId, UserStatusDesc, User_id) {
        return $http.post('UsersData.aspx/CreateUserStatus', { 'UserStatusId': UserStatusId, 'UserStatusDesc': UserStatusDesc, 'User_id': User_id });

    }

    userDatafactory.UpdateUserStatus = function (UserStatusId, UserStatusDesc, User_id) {
        return $http.post('UsersData.aspx/UpdateUserStatus', { 'UserStatusId': UserStatusId, 'UserStatusDesc': UserStatusDesc, 'User_id': User_id });

    }

    userDatafactory.DeleteUserStatus = function (UserStatusId) {
        return $http.post('UsersData.aspx/DeleteUserStatus', { 'UserStatusId': UserStatusId });

    }

    userDatafactory.GetUserCategory = function (UserCategoryId) {
        return $http.post('UsersData.aspx/GetUserCategory', { 'UserCategoryId': UserCategoryId });

    }

    userDatafactory.CreateUserCategory = function (UserCategoryId, UserCategoryDesc, User_id) {
        return $http.post('UsersData.aspx/CreateUserCategory', { 'UserCategoryId': UserCategoryId, 'UserCategoryDesc': UserCategoryDesc, 'User_id': User_id });

    }

    userDatafactory.UpdateUserCategory = function (UserCategoryId, UserCategoryDesc, User_id) {
        return $http.post('UsersData.aspx/UpdateUserCategory', { 'UserCategoryId': UserCategoryId, 'UserCategoryDesc': UserCategoryDesc, 'User_id': User_id });

    }

    userDatafactory.DeleteUserCategory = function (UserCategoryId) {
        return $http.post('UsersData.aspx/DeleteUserCategory', { 'UserCategoryId': UserCategoryId });

    }

    userDatafactory.GetProductOwnerStatus = function (ProductOwnerStatusId) {
        return $http.post('UsersData.aspx/GetProductOwnerStatus', { 'ProductOwnerStatusId': ProductOwnerStatusId });

    }

    userDatafactory.CreateProductOwnerStatus = function (ProductOwnerStatusId, ProductOwnerStatusDesc, User_id) {
        return $http.post('UsersData.aspx/CreateProductOwnerStatus', { 'ProductOwnerStatusId': ProductOwnerStatusId, 'ProductOwnerStatusDesc': ProductOwnerStatusDesc, 'User_id': User_id });

    }

    userDatafactory.UpdateProductOwnerStatus = function (ProductOwnerStatusId, ProductOwnerStatusDesc, User_id) {
        return $http.post('UsersData.aspx/UpdateProductOwnerStatus', { 'ProductOwnerStatusId': ProductOwnerStatusId, 'ProductOwnerStatusDesc': ProductOwnerStatusDesc, 'User_id': User_id });

    }

    userDatafactory.DeleteProductOwnerStatus = function (ProductOwnerStatusId) {
        return $http.post('UsersData.aspx/DeleteProductOwnerStatus', { 'ProductOwnerStatusId': ProductOwnerStatusId });

    }



    return userDatafactory;
});

app.controller("userDataCntrl", function ($scope, userDatafactory) {
    $(".pageLoaderOverlay").show();
    $scope.DataLoadCount = 0;
    $scope.$watchCollection('DataLoadCount', function (newNames, oldNames) {
        if ($scope.DataLoadCount == 3) {
            $(".pageLoaderOverlay").hide();
        }
    });
    $scope.UserStatus = [];
    userDatafactory.GetUserStatus().success(function (data) {
        $scope.UserStatus = data.d;
        $scope.DataLoadCount++;
    })
        .error(function (error) {
            // alert("Problem occured while loading products; " + error);
        });

    userDatafactory.GetUserCategory(0).success(function (data) {
        $scope.UserCategory = data.d;
        $scope.DataLoadCount++;
    })
        .error(function (error) {
            // alert("Problem occured while loading products; " + error);
        });

    userDatafactory.GetProductOwnerStatus(0).success(function (data) {
        $scope.ProductOwnerStatus = data.d;

        $scope.DataLoadCount++;
    })
        .error(function (error) {
            // alert("Problem occured while loading products; " + error);
        });


    //    $http.post('UsersData.aspx/GetProductOwnerDetails', {}).success(function (data) {
    //       
    //    })
    //        .error(function (error) {
    //            // alert("Problem occured while loading products; " + error);
    //        });

    $scope.EditRecord = function (Id) {

        if ($.trim($('#' + Id).find('td').first().text()) != '') {

            $('#' + Id).find('td').first().html("<input type='text' value='" + $.trim($('#' + Id).find('td').first().text()) + "'></input>");
            $('#' + Id).find('span').first().hide();
            $('#' + Id).find('span').first().next().show();

        }
    }

    $scope.UpdateRecord = function (Id, RecordId, TableId) {

        if ($.trim($('#' + Id).find('input').first().val()) != '') {
            var desc = $.trim($('#' + Id).find('input').first().val());
            if (TableId == 1) {
                userDatafactory.UpdateUserStatus(RecordId, desc, '607797662').success(function (data) {
                    $scope.UserStatus.forEach(function (item) {
                        if (item.UserStatusId == RecordId) {
                            item.UserStatusDesc = data.d.UserStatusDesc;
                            item.UpdatedBy = data.d.UpdatedBy;
                            item.UpdatedDate = data.d.UpdatedDate;
                        }
                    });
                    alert(JSON.stringify(data.d));
                })
        .error(function (error) {
            // alert("Problem occured while loading products; " + error);
        });
            } else if (TableId == 2) {
                userDatafactory.UpdateUserCategory(RecordId, desc, '607797662').success(function (data) {
                    $scope.UserCategory.forEach(function (item) {
                        if (item.UserCategoryId == RecordId) {
                            item.UserCategoryDesc = data.d.UserCategoryDesc;
                            item.UpdatedBy = data.d.UpdatedBy;
                            item.UpdatedDate = data.d.UpdatedDate;
                        }
                    });
                    alert(JSON.stringify(data.d));
                })
        .error(function (error) {
            // alert("Problem occured while loading products; " + error);
        });

            } else if (TableId == 3) {

                userDatafactory.UpdateProductOwnerStatus(RecordId, desc, '607797662').success(function (data) {
                    $scope.ProductOwnerStatus.forEach(function (item) {
                        if (item.ProductOwnerStatusId == RecordId) {
                            item.ProductOwnerStatusDesc = data.d.ProductOwnerStatusDesc;
                            item.UpdatedBy = data.d.UpdatedBy;
                            item.UpdatedDate = data.d.UpdatedDate;
                        }
                    });
                    alert(JSON.stringify(data.d));
                })
        .error(function (error) {
            // alert("Problem occured while loading products; " + error);
        });

            }


            $('#' + Id).find('td').first().html($.trim($('#' + Id).find('input').first().val()));
            $('#' + Id).find('span').first().show();
            $('#' + Id).find('span').first().next().hide();

        }
        else {
            $('#' + Id).find('td').first().html("<input type='text' value=''></input>" + "<br /><span style='color:Red;' class='Arrow'> The Description cannot be blank</span>");
        }
    }

    $scope.CancelUpdate = function (Id, data) {

        $('#' + Id).find('td').first().html(data);
        $('#' + Id).find('span').first().show();
        $('#' + Id).find('span').first().next().hide();
        $('#' + Id).find('td').first().find('span').hide();

    }

    $scope.DeleteRecord = function (Id, RecordId, TableId) {

        bootbox.confirm("Are you sure to delete!", function (result) {
            if (result) {
                $scope.DeleteRecordConfirm(Id, RecordId, TableId);
            }
        });

    }

    $scope.DeleteRecordConfirm = function (Id, RecordId, TableId) {



        if (TableId == 1) {
            userDatafactory.DeleteUserStatus(RecordId).success(function (data) {

                var tableData = [];
                $scope.UserStatus.forEach(function (item) {
                    if (item.UserStatusId != RecordId) {
                        tableData.push(item);
                    }
                });
                $scope.UserStatus = tableData;
                //$('#' + Id).hide();
            })
        .error(function (error) {
            // alert("Problem occured while loading products; " + error);
        });
        } else if (TableId == 2) {

            userDatafactory.DeleteUserCategory(RecordId).success(function (data) {

                var tableData = [];
                $scope.UserCategory.forEach(function (item) {
                    if (item.UserCategoryId != RecordId) {
                        tableData.push(item);
                    }
                });
                $scope.UserCategory = tableData;
                //$('#' + Id).hide();
            })
        .error(function (error) {
            // alert("Problem occured while loading products; " + error);
        });

        } else if (TableId == 3) {

            userDatafactory.DeleteProductOwnerStatus(RecordId).success(function (data) {

                var tableData = [];
                $scope.ProductOwnerStatus.forEach(function (item) {
                    if (item.ProductOwnerStatusId != RecordId) {
                        tableData.push(item);
                    }
                });
                $scope.ProductOwnerStatus = tableData;
                //$('#' + Id).hide();
            })
        .error(function (error) {
            // alert("Problem occured while loading products; " + error);
        });

        }

    }


    $scope.CreateRecord = function (Id, TableId, ErrorId) {
        if ($('#' + Id).val() == "") {
            $("#" + ErrorId).show();
            return false;
        }
        else {
            $("#" + ErrorId).hide();
        }

        if (TableId == 1) {
            var id = $scope.UserStatus.length;
            userDatafactory.CreateUserStatus(id, $('#' + Id).val(), '607797662').success(function (data) {

                $scope.UserStatus.push(data.d);
            })
        .error(function (error) {
            // alert("Problem occured while loading products; " + error);
        });

        } else if (TableId == 2) {
            var id = $scope.UserCategory.length + 1;
            userDatafactory.CreateUserCategory(id, $('#' + Id).val(), '607797662').success(function (data) {

                $scope.UserCategory.push(data.d);
            })
        .error(function (error) {
            // alert("Problem occured while loading products; " + error);
        });
        } else if (TableId == 3) {
            var id = $scope.ProductOwnerStatus.length;
            userDatafactory.CreateProductOwnerStatus(id, $('#' + Id).val(), '607797662').success(function (data) {

                $scope.ProductOwnerStatus.push(data.d);
            })
        .error(function (error) {
            // alert("Problem occured while loading products; " + error);
        });
        }
        $('#' + Id).val("");
    }

});