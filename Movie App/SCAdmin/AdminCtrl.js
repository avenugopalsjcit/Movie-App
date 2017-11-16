
(function (ng, app) {
    app.controller('adminController', function ($scope, $rootScope) {

        $rootScope.AccessLevel = unescape(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + escape('AccessLevel').replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
        $rootScope.BtGfrCodes = unescape(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + escape('BtGfrCodes').replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
        $rootScope.SegregationCodes = unescape(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + escape('SegregationCodes').replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
        $rootScope.User_Id = unescape(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + escape('User_Id').replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
      
        if ($rootScope.AccessLevel == undefined || $rootScope.AccessLevel == null || $rootScope.AccessLevel == "") {
            $rootScope.AccessLevel = 1;
        }
        if ($rootScope.BtGfrCodes == undefined || $rootScope.BtGfrCodes == null) {
            $rootScope.BtGfrCodes = '';
        }
        if ($rootScope.SegregationCodes == undefined || $rootScope.SegregationCodes == null) {
            $rootScope.SegregationCodes = '';
        }
        $rootScope.User_Id = '607980620';




        $(".menuClass").click(function (currelement) {
            var $this = currelement;
            $("#adminTreeMenu").find(".menuClass").each(function (index, element) {
                if ($(element).attr('Id') != $this.currentTarget.id) {
                    element.nextElementSibling.setAttribute("class", "accordion-body collapse");
                }
            });
            if ($this.currentTarget.nextElementSibling.getAttribute("class") == "accordion-body collapse") {
                $this.currentTarget.nextElementSibling.setAttribute("class", "accordion-body collapse in");
                return;
            }
            if ($this.currentTarget.nextElementSibling.getAttribute("class") == "accordion-body collapse in") {
                $this.currentTarget.nextElementSibling.setAttribute("class", "accordion-body collapse");
                return;
            }
        });

        $(".tempclass").click(function (currelement) {
            $("#adminTreeMenu").find(".menuClass").each(function (index, element) {
                element.nextElementSibling.setAttribute("class", "accordion-body collapse");
            });
        });
    })



    $('ul.nav li.dropdown').hover(function () {
        $(this).find('.dropdown-menu').stop(true, true).delay(100).fadeIn(100);
        //        $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeIn(500);
    }, function () {
        $(this).find('.dropdown-menu').stop(true, true).delay(100).fadeOut(300);
        // $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeIn(500);
    });











})(angular, app);
