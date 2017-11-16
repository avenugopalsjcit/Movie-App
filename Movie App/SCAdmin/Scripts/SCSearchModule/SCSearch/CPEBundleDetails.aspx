<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="CPEBundleDetails.aspx.cs"
    EnableViewState="false" Inherits="SCSearch.CPEBundleDetails" %>

<!DOCTYPE html>
<html ng-app="myapp">
<head>
    <title></title>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <!-- Bootstrap -->
    <link href="BootStrap/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
    <link href="BootStrap/css/styles.css" rel="stylesheet" type="text/css" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <script src="Scripts/jquery-1.9.1.min.js"></script>
</head>
<body>
    <form id="form1" runat="server">
    <div class="container">
        <div class="row">
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <div ng-controller="MyController" class="table-responsive">
                    
                    <div class="panel panel-primary" style="margin-top: 10px;">
                        <div class="panel-body">

                        <div class="panel panel-primary" id="CPELaunchStatus" style="margin-top: 10px;">
                        <div class="panel-heading upDownIconToggle collapsed clickable1" data-toggle="collapse"
                            data-target="#CPELaunch">
                            <h3 class="panel-title">
                                CPE Launch Status</h3>
                            <span class="pull-right clickable"><i class="glyphicon glyphicon-chevron-down"></i>
                            </span>
                        </div>
                        <div id="CPELaunch" class="panel-collapse collapse">
                            <div class="panel-body">
                                <table cellpadding="0" cellspacing="0" class="table table-bordered">
                                    <tr>
                                        <td width="40%" class="Arrow">
                                            BT Managed CPE Availability
                                        </td>
                                        <td width="60%" class="Arrow">
                                            {{CPELaunchAvailability}}
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>

                            <div class="panel panel-primary" id="panelBundle">
                                <div class="panel-heading upDownIconToggle collapsed clickable1" data-toggle="collapse"
                                    data-target="#CPEBundle">
                                    <h2 class="panel-title">
                                        CPE Bundle Details</h2>
                                    <span class="pull-right clickable"><i class="glyphicon glyphicon-chevron-down"></i>
                                    </span>
                                </div>
                                <div id="CPEBundle" class="panel-collapse collapse">
                                    <div class="panel-body">
                                        <table cellpadding="0" cellspacing="0" class="table table-bordered" id="tblBundle">
                                            <tr>
                                                <th class="Arrow">
                                                    Router
                                                </th>
                                                <th class="Arrow">
                                                    Access Technology
                                                </th>
                                                <th class="Arrow">
                                                    Bundle
                                                </th>
                                                <th class="Arrow">
                                                    Expected Date for Order
                                                </th>
                                                <th class="Arrow">
                                                    Quotable Start Date
                                                </th>
                                                <th class="Arrow">
                                                    EOQ
                                                </th>
                                                <th class="Arrow">
                                                    EOS
                                                </th>
                                                <th class="Arrow">
                                                    EOL
                                                </th>
                                                <th class="Arrow">
                                                    Smart Service Availability
                                                </th>
                                            </tr>
                                            <tr ng-repeat="x in bundleDet | orderBy:'RouterName'">
                                                <td class="Arrow">
                                                    {{ x.RouterName }}
                                                </td>
                                                <td class="Arrow">
                                                    {{ x.AccessTechnology }}
                                                </td>
                                                <td>
                                                    <span ng-class="partialbundle">{{ x.BundleName }}</span>&nbsp;&nbsp; <a class="btn-link"
                                                        ng-click="openPartPopup(x.BundleID,x.BundleName)">Parts</a>
                                                </td>
                                                <td class="Arrow">
                                                    {{ x.ExpectedDateforOrder }}
                                                </td>
                                                <td class="Arrow">
                                                    {{ x.QoutableStartDate }}
                                                </td>
                                                <td class="Arrow">
                                                    {{ x.EOQ }}
                                                </td>
                                                <td class="Arrow">
                                                    {{ x.EOS }}
                                                </td>
                                                <td class="Arrow">
                                                    {{ x.EOL }}
                                                </td>
                                                <td class="Arrow">
                                                    {{ x.SmartServiceAvailability }}
                                                </td>
                                            </tr>
                                        </table>
                                         <div class="alert alert-danger noDataBndle Arrow" role="alert" style="display: none">
                                        No Bundle Available for this Country and Product</div>
                                    </div>
                                </div>
                            </div>
                            


                            <div class="panel panel-primary" id="maintOption">
                                <div class="panel-heading upDownIconToggle collapsed clickable1" data-toggle="collapse"
                                    data-target="#CPEMaintOption">
                                    <h3 class="panel-title">
                                        CPE Maintenance Options
                                    </h3>
                                    <span class="pull-right clickable"><i class="glyphicon glyphicon-chevron-down"></i>
                                    </span>
                                </div>
                                <div id="CPEMaintOption" class="panel-collapse collapse">
                                    <div class="panel-body">
                                        <div class="panel panel-primary bg1">
                                            <div class="panel-body">
                                                <div class="form-group">
                                                    <label for="" class="col-sm-2 control-label">
                                                        CPE Suppliers:</label>
                                                    <div class="col-sm-2">
                                                        <%--<select ng-model="cpesuppliers" ng-change="getCityInfo()">
                        <option value="-1">--- Select ---</option>
                        <option ng-repeat='objsupp in CpeSupplierData' value="{{objsupp.supplierID}}">{{objsupp.SupplierName}}</option>
                    </select>--%>
                                                        <select class="form-control" ng-change="getCityInfo()" ng-model="cpesuppliers" ng-options="item.supplierID as item.supplierName for item in CpeSupplierData" id="ddlSupplier">
                                                        </select>
                                                    </div>
                                                    <label for="" class="col-sm-2 control-label">
                                                        Please Select City of Customer's Site:</label>
                                                    <div class="col-sm-2">
                                                        <select class="form-control" ng-change="getMaintainanceDetails()" ng-model="suppliercity" id="ddlSuppCity"
                                                            ng-options="item.Item1 as item.Item2 for item in CpeCityList">
                                                            <%--<option ng-repeat='objsupp in CpeCityList' value="{{objsupp.Item1}}">{{objsupp.Item2}}</option>--%>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <table cellpadding="0" cellspacing="0" class="table table-bordered tblnowrap" id="mainrow">
                                            <tr>
                                                <th class="Arrow">
                                                    Supplier
                                                </th>
                                                <th class="Arrow">
                                                    Service Name
                                                </th>
                                                <th class="Arrow">
                                                    Service Availability
                                                </th>
                                                <th class="Arrow">
                                                    Service Restrictions
                                                </th>
                                                <th class="Arrow">
                                                    Smart Service Availibility
                                                </th>
                                                <th ng-show="{{isAMD}}" class="Arrow">
                                                    Manufacturer Name
                                                </th>
                                                <th ng-show="{{isAMD}}" class="Arrow">
                                                    Maintainer Name
                                                </th>
                                            </tr>
                                            <tr ng-repeat="x in mainOptList">
                                                <td class="Arrow">
                                                    {{ x.SupplierName }}
                                                </td>
                                                <td class="Arrow">
                                                    {{ x.ServiceName }}
                                                </td>
                                                <td class="Arrow">
                                                    {{ x.ServiceAvailabilityDesc }}
                                                </td>
                                                <td class="Arrow">
                                                    {{ x.ServiceRestriction }}
                                                </td>
                                                <td class="Arrow">
                                                    {{x.smartServiceAvailability}}
                                                </td>
                                                <td ng-show="{{isAMD}}" class="Arrow">
                                                    {{ x.ManufacturerName }}
                                                </td>
                                                <td ng-show="{{isAMD}}" class="Arrow">
                                                    {{ x.MaintainerName }}
                                                </td>
                                            </tr>
                                        </table>
                                        <div id="CPEMaintenanceMsg" class="alert alert-danger noDataBndle Arrow" role="alert" style="display: none">
                                                        No Maintenance Options Available for this Supplier and City</div>
                                        <div class="Arrow">
                                         <p class="red"><span style="color:Black">Note:</span>&nbsp;In case of CPE All Cities indicates that Nationwide Coverage is supported for
                                                the selected country and supplier.</p></div>
                                        <div id="note">
                                           <p class="red"> Please select city of customer site to check availability, if no match then please
                                            use CPE+ to check closest city and make bid requests.</p>
                                        </div>
                                        <div id="noSuppAlert" class="Arrow">
                                            
						                    Note : <font color="Red">This country does not have a valid CPE Preferred supplier</font>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="table-responsive">
                                <div class="panel panel-primary" id="panelCPELeadTime">
                                    <div class="panel-heading upDownIconToggle collapsed clickable1" data-toggle="collapse"
                                        data-target="#CPELeadTime">
                                        <h2 class="panel-title">
                                            CPE Lead Time & Status</h2>
                                            <span class="pull-right clickable"><i class="glyphicon glyphicon-chevron-down"></i>
                                    </span>
                                    </div>
                                    <div id="CPELeadTime" class="panel-collapse collapse">
                                        <div class="panel-body">
                                            <table id="TableLead" cellpadding="0" cellspacing="0" class="table table-bordered tblnowrap">
                                                <tr>
                                                    <th class="Arrow">
                                                        Transaction Type
                                                    </th>
                                                    <th class="Arrow">
                                                        CPE Lead Time
                                                    </th>
                                                    <th class="Arrow">
                                                        CPE Lead Time Status
                                                    </th>
                                                </tr>
                                                <tr ng-repeat="x in CPELeadtimelist">
                                                    <td class="Arrow">
                                                        {{ x.transactionType }}
                                                    </td>
                                                    <td class="Arrow">
                                                        {{ x.CPELeadTime }}
                                                    </td>
                                                    <td class="Arrow">
                                                        {{ x.CPELeadTimeStatus }}
                                                    </td>
                                                </tr>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </form>
    <footer>&nbsp;</footer>
    <div class="pageLoaderOverlay">
    </div>
    <script src="Scripts/angular.js" type="text/javascript"></script>
    <script src="Scripts/angular-resource.min.js" type="text/javascript"></script>
    <script src="Scripts/app/CPEBundle.js" type="text/javascript"></script>
    <script src="Scripts/app/CollapsiblePanel.js" type="text/javascript"></script>
    <!-- Bootstrap -->
    <script src="BootStrap/js/bootstrap.min.js" type="text/javascript"></script>
</body>
</html>
