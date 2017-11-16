/// <reference path="Scripts/jquery-1.4.1-vsdoc.js" />
/// <reference path="Scripts/jquery-1.4.1.js" />
/// <reference path="Scripts/jquery-1.4.1.min.js" />



var app = angular.module("app", ['ngRoute', "ngResource", "ngTable", 'ui.router', 'ui.bootstrap', 'ngBootbox']);


app.run(function ($rootScope, Bootstrap) {
    $rootScope.Bootstrap = Bootstrap;

});



app.factory('Bootstrap', function ($http) {
    return {
        Success: function (Message) {
            $(".ng-scope body").find(".alert-success").remove();
            $(".ng-scope body").append('<div class="alert-success" style="position: fixed; top: 0; right: 0;margin-top:7em"><a href="#" class="close" data-dismiss="alert" aria-label="close" title="close">×</a><strong>Success! </strong><span style="padding-right:13px">' + Message + '</span></div>');
            $('.alert-success').fadeIn(5000).fadeOut(10000);
        },
        Info: function (Message) {
            $(".ng-scope body").find(".alert-info").remove();
            $(".ng-scope body").append('<div class="alert-info" style="position: fixed; top: 0; right: 0;margin-top:7em"><a href="#" class="close" data-dismiss="alert" aria-label="close" title="close">×</a><strong>Info! </strong><span style="padding-right:13px">' + Message + '</span></div>');
            $('.alert-info').fadeIn(2000).fadeOut(5000);
        },
        Warning: function (Message) {
            $(".ng-scope body").find(".alert-warning").remove();
            $(".ng-scope body").append('<div class="alert-warning" style="position: fixed; top: 0; right: 0;margin-top:7em"><a href="#" class="close" data-dismiss="alert" aria-label="close" title="close">×</a><strong>Warning! </strong><span style="padding-right:13px">' + Message + '</span></div>');
            $('.alert-warning').fadeIn(2000).fadeOut(5000);
        },
        Danger: function (Message) {
            $(".ng-scope body").find(".alert-danger").remove();
            $(".ng-scope body").append('<div class="alert-danger" style="position: fixed; top: 0; right: 0;margin-top:7em"><a href="#" class="close" data-dismiss="alert" aria-label="close" title="close">×</a><strong>Danger! </strong><span style="padding-right:13px">' + Message + '</span></div>');
            $('.alert-danger').fadeIn(2000).fadeOut(5000);
        }
    };
});


app.directive('moDateInput', function ($window) {
    return {
        require: '^ngModel',
        restrict: 'A',
        link: function (scope, elm, attrs, ctrl) {
            var moment = $window.moment;
            var dateFormat = attrs.moMediumDate;
            attrs.$observe('moDateInput', function (newValue) {
                if (dateFormat == newValue || !ctrl.$modelValue) return;
                dateFormat = newValue;
                ctrl.$modelValue = new Date(ctrl.$setViewValue);
            });

            ctrl.$formatters.unshift(function (modelValue) {
                scope = scope;
                if (!dateFormat || !modelValue) return "";
                var retVal = moment(modelValue).format(dateFormat);
                return retVal;
            });

            ctrl.$parsers.unshift(function (viewValue) {
                scope = scope;
                var date = moment(viewValue, dateFormat);
                return (date && date.isValid() && date.year() > 1950) ? date.toDate() : "";
            });
        }
    };
});

app.directive('moChangeProxy', function ($parse) {
    return {
        require: '^ngModel',
        restrict: 'A',
        link: function (scope, elm, attrs, ctrl) {
            var proxyExp = attrs.moChangeProxy;
            var modelExp = attrs.ngModel;
            scope.$watch(proxyExp, function (nVal) {
                if (nVal != ctrl.$modelValue)
                    $parse(modelExp).assign(scope, nVal);
            });
            elm.bind('blur', function () {
                var proxyVal = scope.$eval(proxyExp);
                if (ctrl.$modelValue != proxyVal) {
                    scope.$apply(function () {
                        $parse(proxyExp).assign(scope, ctrl.$modelValue);
                    });
                }
            });
        }
    };
});

app.directive('numericOnly', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attrs, modelCtrl) {

            modelCtrl.$parsers.push(function (inputValue) {
                var transformedInput = inputValue ? inputValue.replace(/[^0-9]/g, '') : null;

                if (transformedInput != inputValue) {
                    modelCtrl.$setViewValue(transformedInput);
                    modelCtrl.$render();
                }

                angular.element(element).on("keypress", function (e) {
                    if (this.value.length == 4) e.preventDefault();
                });


                return transformedInput;
            });
        }
    };
});


//app.run(function ($rootScope, $location, $http, $timeout, BootstrapService) {
//    $rootScope.foo = FooService;
//});



app.config(function ($stateProvider, $urlRouterProvider) {

    //    $urlRouterProvider.otherwise('/admin');



    $stateProvider

      

       .state('Movie', {
           url: '/Movie',
           templateUrl: 'Views/GlobalReferences/Movie.htm'
       })
       

  

});


// Cofiguration   of all routes -----Madan

