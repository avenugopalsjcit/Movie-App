<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="hVPNFeatures.aspx.cs" Inherits="SCSearch.hVPNFeatures" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" ng-app="appModule">
<head runat="server">
    <title></title>
</head>
<body>
    <div class="container" ng-controller="HVPNPkgCntrl">
        <div class="col-md-6 col-lg-6">
            &nbsp;</div>
        <div class="col-md-6 col-lg-6 text-right ">
            <button type="button" class="close" ng-click="$dismiss()">
                &times;</button><br />
        </div>
        <div class="row marTop25">
            <div class="panel panel-primary">
                <div class="panel-heading">
                    <h3 class="panel-title text-center Arrow">
                        hVPN Features per Country</h3>
                </div>
                <div class="panel-body">
                    <table id="Table2" class="table table-bordered">
                        <tr>
                            <th class="text-left Arrow">
                                Country
                            </th>
                            <th class="text-left Arrow">
                                CPE Supplier
                            </th>
                            <th  class="text-left Arrow">
                                Customer Provided Access
                            </th>
                            <th class="text-left Arrow">
                                Access Aggregator
                            </th>
                            <th class="text-center Arrow">
                                hVPN Split Tunneling Availability
                            </th>
                        </tr>
                        <tr ng-repeat="item in HVPNDetailsList">
                            <td class="text-left Arrow">
                                {{item.COUNTRY}}
                            </td>
                            <td class="text-left Arrow">
                                {{ item.CPE_SUPPLIER}}
                            </td>
                            <td class="text-left Arrow">
                                {{ item.CPA}}
                            </td>
                            <td class="text-left Arrow">
                                {{ item.AGGREGATOR_BAU}}
                            </td>
                            <td class="text-left Arrow">
                                {{ item.SPLIT_TUNNELING}}
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    </div>
      <div class="pageLoaderOverlay">
                </div>
    <script src="Scripts/angular.js" type="text/javascript"></script>
    <script src="Scripts/app/ProductCase.js" type="text/javascript"></script>
    <script src="Scripts/app/DispHVPNpkgDet.js" type="text/javascript"></script>
</body>
</html>
