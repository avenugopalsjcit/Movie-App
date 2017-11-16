<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Search.aspx.cs" Inherits="SCSearch.Search" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta charset="utf-8">
    <title>Search</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
   
    <style>
        .modal-dialog
        {
            width: auto;
            height: auto;
            margin: 10px;
        }
        
        div#content
        {
            height: 600px;
        }
    </style>
</head>
<body ng-app='ngModuleFilter'>
    <form id="form1" runat="server">
    <asp:ScriptManager ID="ScriptManager1" runat="server" EnablePageMethods="True">
    </asp:ScriptManager>
    <div ng-controller='ngFilterCtrl'>
        <table>
            <tbody>
                <tr>
                    <td>
                        <p>
                            Please select search criteria</p>
                    </td>
                </tr>
                <tr>
                    <td>
                        Select Product
                    </td>
                    <td>
                        <%-- <asp:DropDownList ID="ddlInternationalProducts" runat="server">
                        </asp:DropDownList>--%>
                        <select ng-change="GetRegionCountries(modproduct,modregion)" name="product" id="product"
                            ng-model="modproduct">
                            <option value="0">--- Select ---</option>
                            <option ng-repeat='prod in productdata' value="{{prod.ProductID}}">{{prod.ProductName}}</option>
                        </select>
                    </td>
                </tr>
                <tr ng-hide="modproduct=='58'">
                    <td>
                        Region
                    </td>
                    <td>
                        <select ng-change="GetCountries(modproduct,modregion)" name="region" id="region"
                            ng-model="modregion">
                            <option selected="selected" value="0">--- Select ---</option>
                            <option ng-repeat='reg in RegionData' value="{{reg.RegionID}}">{{reg.RegionName}}</option>
                        </select>
                    </td>
                    <td>
                        Country
                    </td>
                    <td>
                        <select ng-change="SearchCaseDetails()" id="country" name="country" ng-model="modcountry">
                            <option selected="selected" value="0">--- Select ---</option>
                            <option ng-repeat='cntry in CountryData' value="{{cntry.CountryID}}">{{cntry.CountryName}}</option>
                        </select>
                    </td>
                </tr>
                <tr ng-show="modproduct=='58'">
                    <td>Country 1</td>
                    <td>
                        <select  ng-change="GetCities1(modproduct,0,modCountry1,0)" name="ddlCountry1" id="ddlCountry1"
                            ng-model="modCountry1">
                            <option selected="selected" value="0">--- Select ---</option>
                            <option ng-repeat='cntry in CountryData' value="{{cntry.CountryID}}">{{cntry.CountryName}}</option>
                        </select>
                    </td>

                    <td>Country 2</td>
                    <td>
                        <select ng-change="GetCities2(modproduct,0,modCountry2,0)" name="ddlCountry2" id="ddlCountry2"
                            ng-model="modCountry2">
                            <option selected="selected" value="0">--- Select ---</option>
                            <option ng-repeat='cntry in CountryData' value="{{cntry.CountryID}}">{{cntry.CountryName}}</option>
                        </select>
                    </td>
                </tr>
                <tr ng-hide="modproduct=='58'">
                    <td>
                        StateProvince
                    </td>
                    <td>
                        <select ng-model="modstate" name="StateProvince" ng-change="GetCities(modproduct,modregion,modcountry,modstate)">
                            <option value="0">--- Select ---</option>
                            <option ng-repeat='state in StateData' value="{{state.StateID}}">{{state.StateName}}</option>
                        </select>
                    </td>
                    <td>
                        City
                    </td>
                    <td>
                        <select ng-model="modCity" name="Cities" ng-change="GetPops(modproduct,modregion,modcountry,modstate,modCity)">
                            <option value="0">--- Select ---</option>
                            <option ng-repeat='city in CityData' value="{{city.CityID}}">{{city.CityName}}</option>
                        </select>
                    </td>
                </tr>
                <tr ng-show="modproduct=='58'">
                    <td>
                        City 1
                    </td>
                    <td>
                        <select ng-model="modCity1" name="Cities1">
                            <option value="0">--- Select ---</option>
                            <option ng-repeat='city in CityData1' value="{{city.CityID}}">{{city.CityName}}</option>
                        </select>
                    </td>
                    <td>
                        City 2
                    </td>
                    <td>
                       <select ng-model="modCity2" name="Cities1">
                            <option value="0">--- Select ---</option>
                            <option ng-repeat='city in CityData2' value="{{city.CityID}}">{{city.CityName}}</option>
                        </select>
                    </td>
                </tr>

                <tr ng-hide="modproduct=='58'">
                    <td>
                        Pop
                    </td>
                    <td>
                        <select ng-change='' name="POPS" ng-model="modPoP" id="POPS">
                            <option value="0">--- Select ---</option>
                            <option ng-repeat='pop in PopData' value="{{pop.POPID}}">{{pop.PopName}}</option>
                        </select>
                    </td>
                </tr>
                <tr ng-show="modproduct=='58'">
                    <td>
                        Speeds
                    </td>
                    <td>
                        <select name="Speeds" ng-model="modSpeed" id="ddlSpeed">
                            <option value="0">--- Select ---</option>
                            <option ng-repeat='sp in SpeedsData' value="{{sp.SpeedID}}">{{sp.SpeedName}}</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td colspan="4" align="center">
                        <input type="button" ng-click="GetCaseDetails()" value="Search" />
                    </td>
                </tr>
        </table>
        <table id="tblMenu" style="display: none" width="50%">
            <tr>
                <td>
                    <a ng-click="GetEthernetData()" href="#">Ethernet/Leased Line</a>
                </td>
                <td>
                    <a ng-click="GetHVPNData()" href="#">HVPN</a>
                    <input type="hidden" id="hdnHVPNLoaded" value="0" ng-model="HVPNLoaded" />
                </td>
                <td>
                    <a ng-click="GetDSLData()" href="#">DSL</a>
                </td>
               <td>
                     <a ng-click="GetVSATData()" href="#">VSAT</a>
                </td>
            </tr>
        </table>
        <div id="divEthernet" style="display: none">
            <table id="tblProductDetails">
                <tr>
                    <td class="style1">
                        <fieldset id="1">
                            <legend><b>Product Details</b></legend>
                            <table>
                                <tr>
                                    <td>
                                        Service Available :
                                    </td>
                                    <td>
                                        <label>
                                            {{ServiceAvailable}}</label>
                                    </td>
                                    <td>
                                        <div id="cpeinformation">
                                           &nbsp;&nbsp;&nbsp <a class ="btn-link" data-toggle="modal" data-target="#mymodal" ng-click="openCpeInformationpopup()">
                                                View Cpe Information</a>
                                            <div class="modal fade" id="mymodal" role="dialog">
                                                <div class="modal-dialog">
                                                    <div class="modal-content">
                                                        <div class="modal-header">
                                                            <button type="button" class="close" data-dismiss="modal">
                                                                &times;</button>
                                                            <h4 class="modal-title" id="myModalLabel">
                                                                CPE Bundle Details
                                                            </h4>
                                                        </div>
                                                        <div class="modal-body" id="content">  </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        POP Code :
                                    </td>
                                    <td>
                                        <label>
                                            {{PopCode}}</label>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Network Name :
                                    </td>
                                    <td>
                                        <label>
                                            {{NetworkName}}</label>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Support Resilient Only Pop :
                                    </td>
                                    <td>
                                        <label>
                                            {{ResilientPop}}</label>
                                    </td>
                                </tr>
                            </table>
                        </fieldset>
                    </td>
                </tr>
            </table>
            <table id="tblPopCharacteristics">
                <tr>
                    <td class="style1">
                        <fieldset id="Fieldset1">
                            <legend><b>Pop Characteristics</b></legend>
                            <table>
                                <tr ng-repeat="pc in PopCharData">
                                    <td>
                                        {{pc.CharName}}
                                    </td>
                                    <td>
                                        {{pc.CharValue}}
                                    </td>
                                </tr>
                            </table>
                        </fieldset>
                    </td>
                </tr>
            </table>
            <div id="divChars">
            </div>
            <%-- <table>
            <tr>
                <td>
                    Access Technology:&nbsp;
                </td>
                <td>
                    <select name="iaccess">
                        <option selected value="Leased Line/Ethernet">Leased Line/Ethernet</option>
                        <option value="DSL">DSL/HVPN</option>
                    </select>
                </td>
            </tr>
        </table>--%>
            <table>
                <tr id='trParent' style="display: none">
                    <td>
                        Access Supplier
                    </td>
                    <td>
                        <select ng-model="ChildAccessSupplier" id="AccessSupplier">
                            <option value="0">--- Select ---</option>
                            <option ng-repeat='suppData in AccessSupplierData' value="{{suppData.AccessSupplierID}}">
                                {{suppData.AccessSupplierName}}</option>
                        </select>
                    </td>
                    <td>
                        Port Speed
                    </td>
                    <td>
                        <select multiple size="5" ng-model="ChildPortSpeedData" id="PortSpeed">
                            <option value="0">--- Select ---</option>
                            <option ng-repeat='pSpeed in PortSpeedData' value="{{pSpeed.PortSpeedID}}">{{pSpeed.PortSpeedName}}</option>
                        </select>
                    </td>
                    <td>
                        <input type="button" value="GO" ng-click="GetChildPortSpeeds()" />
                    </td>
                </tr>
                <tr id='trChild' style="display: none">
                    <td>
                        Parent Access Supplier
                    </td>
                    <td>
                        <select id="ParentAccessSupplier" ng-model="ParentAccessSupplier">
                            <option value="1">--- Select ---</option>
                            <option ng-repeat='PAccesssupp in ParentAccSuppdata' value="{{PAccesssupp.AccessSupplierID}}">
                                {{PAccesssupp.AccessSupplierName}}</option>
                        </select>
                    </td>
                    <td>
                        Parent Port Speed
                    </td>
                    <td>
                        <select id="ParentPortSpeed" multiple size="5" ng-model="ParentPortSpeed">
                            <option value="0">--- Select ---</option>
                            <option ng-repeat='pSpeed in ParentPortSpeedData' value="{{pSpeed.PortSpeedID}}">{{pSpeed.PortSpeedName}}</option>
                        </select>
                    </td>
                    <td>
                        CPE Suppliers:&nbsp;
                    </td>
                    <td>
                        <select id="cpesuppliers" ng-init="CPESuppliers = options[0]" ng-model="CPESuppliers">
                            <option ng-repeat='objsupp in CpeSupplierData' value="{{objsupp.supplierID}}">{{objsupp.SupplierName}}</option>
                        </select>
                    </td>
                    <td>
                        <input type="button" value="GO" ng-click="GeParentSpeeds()" />
                    </td>
                </tr>
            </table>
            <div id="tblParentSpeeds">
            </div>
            <div id="tblChildPortSpeeds">
            </div>
        </div>
        <div ng-controller="ngHVPNCntrl" id="divHVPN" style="display: none">
            <table>
                <tr>
                    <td>
                        <b>BT Package/VSAT</b>
                    </td>
                    <td>
                        <select ng-model="BTPackage" id="ddlBTPackage">
                            <option value="0">--- Select ---</option>
                            <option ng-repeat='packageData in BTPackageData' value="{{packageData.PackageID}}">{{packageData.PackageName}}</option>
                        </select>
                    </td>
                    <td>
                        <b>Access Supplier</b>
                    </td>
                    <td>
                        <select ng-model="HVPNAccessSupplier" ng-change="GetPortSpeedData()" id="ddlhvpnAccSupplier">
                            <option value="0">--- Select ---</option>
                            <option ng-repeat='accSupplier in HVPNAccessSuppliersData' value="{{accSupplier.supplierID}}">
                                {{accSupplier.SupplierName}}</option>
                        </select>
                    </td>
                    <td>
                        <b>HVPN/VSAT Port Speed</b>
                    </td>
                    <td>
                        <select ng-model="HVPNPortSpeed" id="Select2">
                            <option value="0">--- Select ---</option>
                            <option ng-repeat='ps in HVPNPortSpeedData' value="{{ps.PortSpeedID}}">{{ps.PortSpeed}}</option>
                        </select>
                    </td>
                </tr>
            </table>
            <table>
                <tr>
                    <td>
                        {{TunnelingNote}}
                    </td>
                </tr>
            </table>
            <table id="tblHVPNData" border="1">
                <tr>
                    <td class="bodyTextBold" nowrap>
                        BT Package
                    </td>
                    <td class="bodyTextBold" nowrap>
                        Access Type
                    </td>
                    <td class="bodyTextBold" nowrap>
                        Port Speed (Down / Up)
                    </td>
                    <td class="bodyTextBold" nowrap>
                        Availability
                    </td>
                    <td class="bodyTextBold" nowrap>
                        Access Speed (Down / Up)
                    </td>
                    <td class="bodyTextBold" nowrap>
                        Interface
                    </td>
                    <td class="bodyTextBold" nowrap>
                        Framing Structure
                    </td>
                    <td class="bodyTextBold" nowrap>
                        Connector
                    </td>
                    <td class="bodyTextBold" nowrap>
                        Access Availability Status
                    </td>
                    <td class="bodyTextBold" nowrap>
                        Contention Ratio
                    </td>
                    <td class="bodyTextBold" nowrap>
                        Supplier
                    </td>
                    <td class="bodyTextBold" nowrap>
                        Supplier Product/BT Internal SLA
                    </td>
                    <td class="bodyTextBold" nowrap>
                        Service Lead Time
                    </td>
                    <td align="center" class="bodyTextBold" nowrap>
                        GPOP InterConnect
                    </td>
                    <td class="bodyTextBold" nowrap>
                        CPE
                    </td>
                </tr>
                <tr ng-repeat='ps in HVPNPortTypeData'>
                    <td>
                        {{ps.PackageName}}
                    </td>
                    <td>
                        {{ps.AccessType}}
                    </td>
                    <td>
                        {{ps.PortSpeed}}
                    </td>
                    <td>
                        {{ps.Availability}}
                    </td>
                    <td>
                        {{ps.AccessSpeed}}
                    </td>
                    <td>
                        {{ps.Interface}}
                    </td>
                    <td>
                        {{ps.FramingStructure}}
                    </td>
                    <td>
                        {{ps.Connector}}
                    </td>
                    <td>
                        {{ps.AccessAvailabilityStatus}}
                    </td>
                    <td>
                        {{ps.ContentionRatio}}
                    </td>
                    <td>
                        {{ps.Supplier}}
                    </td>
                    <td>
                        {{ps.SupplierProductBTInternalSLA}}
                    </td>
                    <td>
                        {{ps.ServiceLeadTime}}
                    </td>
                    <td>
                        {{ps.POP}}
                    </td>
                    <td>
                        {{ps.CPE}}
                    </td>
                </tr>
            </table>
            <%--<table>
                <thead height="15" align="left" colspan="4" class="bodyTextBold" style="font-size: x-small">
                </thead>
                <tr>
                    <td align="center" colspan="4" class="bodyTextBold">
                        CPE Bundles
                    </td>
                </tr>
                <tr bgcolor="#3a6ea5">
                    <td align="right">
                        <font color="white">Router</font>
                    </td>
                    <td align="center" >
                        <font color="white">Access Technology</font>
                    </td>
                    <td >
                        <font color="white">Bundle</font>
                    </td>
                    <td >
                        <font color="white">Expected Date for ORDER</font>
                    </td>
                    <td >
                        <font color="white">Quotable Start Date</font>
                    </td>
                    <td align="center" >
                        <font color="white">EOQ</font>
                    </td>
                    <td align="center">
                        <font color="white">EOL</font>
                    </td>
                    <td align="center">
                        <font color="white">EOS</font>
                    </td>
                    <td align="center" >
                        <font color="white">SmartServiceAvailability</font>
                    </td>
                </tr>
                <tr ng-repeat='bpData in BundleProductsData'>
                    <td>{{bpData.Router}}</td>
                    <td>{{bpData.AccessTechnology}}</td>
                    <td>{{bpData.Bundle}}</td>
                    <td>{{bpData.ExpectedDate}}</td>
                    <td>{{bpData.QuotableStartDate}}</td>
                    <td>{{bpData.EOS}}</td>
                    <td>{{bpData.EOQ}}</td>
                    <td>{{bpData.EOL}}</td>
                    <td>{{bpData.SmartServiceAvailability}}</td>
                    
                </tr>
            </table>--%>
            <table width="100%">
                <tr>
                    <td class="bodyTextBold">
                        HVPN/VSAT Parent Port Types
                    </td>
                </tr>
            </table>
            <div id="divBundleProducts">
            </div>
        </div>
        <div ng-controller="ngDSLCntrl" id="divDSL" style="display: none">
            <table>
                <tr>
                    <td>
                        <b>BT Package</b>
                    </td>
                    <td>
                        <select ng-model="DSLBTPackage" ng-change="GetDSLAccessSuppliers()">
                            <option value="0">--- Select ---</option>
                            <option ng-repeat='packageData in DSLBTPackageData' value="{{packageData.PackageID}}">{{packageData.PackageName}}</option>
                        </select>
                    </td>
                    <td>
                        <b>Access Supplier</b>
                    </td>
                    <td>
                        <select ng-model="DSLAccessSupplier" id="Select4">
                            <option value="0">--- Select ---</option>
                            <option ng-repeat='accSupplier in DSLAccessSuppliersData' value="{{accSupplier.supplierID}}">
                                {{accSupplier.SupplierName}}</option>
                        </select>
                    </td>
                    
                </tr>
            </table>
            <br />
            <div id="divDSLData">
            </div>
           <%-- <table id="Table1" border="1">
                <tr>
                    <td class="bodyTextBold" nowrap>
                        BT Package
                    </td>
                    <td class="bodyTextBold" nowrap>
                        Access Type
                    </td>
                    <td class="bodyTextBold" nowrap>
                        Port Speed (Down/Up)
                    </td>
                    <td class="bodyTextBold" nowrap>
                        Availability
                    </td>
                    <td class="bodyTextBold" nowrap>
                        Access Speed (Down/Up)
                    </td>
                    <td class="bodyTextBold" nowrap>
                        Interface
                    </td>
                    <td class="bodyTextBold" nowrap>
                        Framing Structure
                    </td>
                    <td class="bodyTextBold" nowrap>
                        Connector
                    </td>
                    <td class="bodyTextBold" nowrap>
                        Access Availability Status
                    </td>
                    <td class="bodyTextBold" nowrap>
                        Contention Ratio
                    </td>
                    <td class="bodyTextBold" nowrap>
                        Supplier
                    </td>
                    <td class="bodyTextBold" nowrap>
                        Supplier Product/BT Internal SLA
                    </td>
                    <td class="bodyTextBold" nowrap>
                        Service Lead Time
                    </td>
                    <td align="center" class="bodyTextBold" nowrap>
                        GPOP InterConnect
                    </td>
                    <td class="bodyTextBold" nowrap>
                        CPE
                    </td>
                </tr>
                <tr ng-repeat='ps in HVPNPortSpeedsData'>
                    <td>
                        {{ps.PackageName}}
                    </td>
                    <td>
                        {{ps.AccessType}}
                    </td>
                    <td>
                        {{ps.PortSpeed}}
                    </td>
                    <td>
                        {{ps.Availability}}
                    </td>
                    <td>
                        {{ps.AccessSpeed}}
                    </td>
                    <td>
                        {{ps.Interface}}
                    </td>
                    <td>
                        {{ps.FramingStructure}}
                    </td>
                    <td>
                        {{ps.Connector}}
                    </td>
                    <td>
                        {{ps.AccessAvailabilityStatus}}
                    </td>
                    <td>
                        {{ps.ContentionRatio}}
                    </td>
                    <td>
                        {{ps.Supplier}}
                    </td>
                    <td>
                        {{ps.SupplierProductBTInternalSLA}}
                    </td>
                    <td>
                        {{ps.ServiceLeadTime}}
                    </td>
                    <td>
                        {{ps.POP}}
                    </td>
                    <td>
                        {{ps.CPE}}
                    </td>
                </tr>
            </table>--%>
        </div>
        <div ng-controller="ngVSATCntrl" id="divvsat" style="display: none">
            <table>
                <tr>
                    <td>
                        <b>Access Supplier</b>
                    </td>
                    <td>
                        <select ng-model="VSATAccessSupplier" id="Select3">
                            <option value="0">--- Select ---</option>
                            <option ng-repeat='accSupplier in VSATAccessSuppliersData' value="{{accSupplier.VSATAccessSupplierID}}">
                                {{accSupplier.VSATAccessSupplier}}</option>
                        </select>
                    </td>
                    <td>
                        <b>Port Speed</b>
                    </td>
                    <td>
                        <select ng-model="VSATPortSpeed" ng-change="GetVSATAttributes()" id="ddlVSATPortSpeed">
                            <option value="0">--- Select ---</option>
                            <option ng-repeat='ps in VSATPortSpeedData' value="{{ps.PortSpeedID}}">{{ps.PortSpeed}}</option>
                        </select>
                    </td>
                </tr>
            </table>
            <table border="1">
                <tr>
                    <td class="bodyTextBold">
                        Access Type
                    </td>
                    <td class="bodyTextBold">
                        Port Speed (Down / Up)
                    </td>
                    <td class="bodyTextBold">
                        Availability
                    </td>
                    <td class="bodyTextBold">
                        Access Speed (Down / Up)
                    </td>
                    <td class="bodyTextBold">
                        Interface
                    </td>
                    <td class="bodyTextBold">
                        Framing Structure
                    </td>
                    <td class="bodyTextBold">
                        Connector
                    </td>
                    <td class="bodyTextBold">
                        Access Availability Status
                    </td>
                    <td class="bodyTextBold">
                        Contention Ratio
                    </td>
                    <td class="bodyTextBold">
                        Supplier
                    </td>
                    <td class="bodyTextBold">
                        Supplier Product/BT Internal SLA
                    </td>
                    <td class="bodyTextBold">
                        Service Lead Time
                    </td>
                    <td align="center" class="bodyTextBold">
                        POP
                    </td>
                    <td class="bodyTextBold">
                        CPE
                    </td>
                    <td class="bodyTextBold">
                        VSAT Supply Type
                    </td>
                </tr>
                <tr ng-repeat='vs in VSATPortSpeedTypeData'>
                    <td>
                        {{vs.AccessType}}
                    </td>
                    <td>
                        {{vs.PortSpeed}}
                    </td>
                    <td>
                        {{vs.Availability}}
                    </td>
                    <td>
                        {{vs.AccessSpeed}}
                    </td>
                    <td>
                        {{vs.Interface}}
                    </td>
                    <td>
                        {{vs.FramingStructure}}
                    </td>
                    <td>
                        {{vs.Connector}}
                    </td>
                    <td>
                        {{vs.AvailableDesc}}
                    </td>
                    <td>
                        {{vs.ContentionRatio}}
                    </td>
                    <td>
                        {{vs.Supplier}}
                    </td>
                    <td>
                        {{vs.SupplierProductBTInternalSLA}}
                    </td>
                    <td>
                        {{vs.ServiceLeadTime}}
                    </td>
                    <td>
                        {{vs.POP}}
                    </td>
                    <td>
                        {{vs.CPE}}
                    </td>
                    <td>
                        {{vs.VSATSupplyType}}
                    </td>
                </tr>
            </table>
        </div>
    </div>
    </form>
    <script src="Scripts/angular.js"></script>
    <script src="Scripts/angular-resource.min.js"></script>
    <script src="Scripts/app/filter.js"></script>
    <script src="Scripts/jquery-1.9.1.js"></script>
</body>
</html>
