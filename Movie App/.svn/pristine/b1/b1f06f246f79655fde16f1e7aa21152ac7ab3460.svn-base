using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SCSearch
{

    public class AccessSupplier
    {
        public int AccessSupplierID { get; set; }
        public string AccessSupplierName { get; set; }
    }

    public class SupplierProduct
    {
        public int SupplierID { get; set; }
        public string SupplierProductName { get; set; }
        public int AccessSupplierID { get; set; }
    }

    public class AccessSpeed
    {
        public int AccessSpeedID { get; set; }
        public string AccessSpeedName { get; set; }
    }

    public class AccessType
    {
        public int AccessTypeID { get; set; }
        public string AccessTypeName { get; set; }
    }

    public class AccessList
    {
        public List<AccessSupplier> accSupplierList { get;set; }
        public List<SupplierProduct> SupplierProductList { get;set; }
        public List<AccessSpeed> AccessSpeedList { get;set; }
        public List<AccessType> AccessTypeList { get; set; }
    }

    public class PortSpeed
    {
        public int PortSpeedID { get; set; }
        public string PortSpeedName { get; set; }
    }


    public class PortSpeedDet
    {
        public List<PortSpeed> pSpeed { get; set; }
        public int SelectedPortSpeed { get; set; }
    }

    //public class ParentSpeed
    //{
    //    public string PortSpeeds { get; set; }
    //    public string PortSpeedAvailability { get; set; }
    //    public string AccessSpeed { get; set; }
    //    public string AccessTechnology { get; set; }
    //    public string SupplierProductName { get; set; }
    //    public string SupplierProductName1 { get; set; }
    //    public string ServiceType { get; set; }
    //    public string AccessSpeedAvailability { get; set; }
    //    public string OrderingStatus { get; set; }
    //    public string Interface { get; set; }
    //    public string Framing { get; set; }
    //    public string Connecter { get; set; }
    //    public string OffnetCPEDayStatus { get; set; }
    //    public string OffnetWithOutCPEDayStatus { get; set; }
    //    public string OnNetCPEDayStatus { get; set; }
    //    public string OnNetWithOutCPEDayStauts { get; set; }
    //    public int AccessSupplierNameID { get; set; }
    //    public int AccessSpeedCharID { get; set; }
    //    public string ASpeedUOM { get; set; }
    //    public int AccessSupplierCharID { get; set; }
    //    public int AccessProductTypeID { get; set; }
    //}

    public class Product
    {
        public int ProductID { get; set; }
        public string ProductName { get; set; }
        public int IsCPEExists { get; set; }
    }
    public class Region
    {
        public int RegionID { get; set; }
        public string RegionName { get; set; }
    }
    public class countries
    {
        public int CountryID { get; set; }
        public string CountryName { get; set; }
        public int RegionID { get; set; }
    }
    public class stateProvince
    {
        public int StateID { get; set; }
        public string StateName { get; set; }
    }
    public class City
    {
        public int CityID { get; set; }
        public string CityName { get; set; }
    }

    public class CountryCities
    {
        public List<countries> lstCountries { get; set; }
        public List<City> lstCities { get; set; }
    }

    public class Pop
    {
        public int POPID { get; set; }
        public string PopName { get; set; }
    }

    public class NetwrokPlatform
    {
        public int ID { get; set; }
        public string NetworkPlatform { get; set; }
    }

    public class ProductDetails
    {
        public string ProdName { get; set; }//added by sibajyoti
        public string ServiceAvailable { get; set; }
        public string PopCode { get; set; }
        public string PopColor { get; set; }
        public string TargetAvailabilityDate { get; set; }
        public string NetworkName { get; set; }
        public string ResilientPop { get; set; }
        public int CaseID { get; set; }
        public int ParentProductID { get; set; }
        public string ParentProductName { get; set; }
        public int CapmanPlatformID { get; set; }
    }

    public class PopCharacteristics
    {
        public string CharName { get; set; }
        public string CharValue { get; set; }
    }
    public class CPESuppliers
    {
        public int supplierID { get; set; }
        public string SupplierName { get; set; }

    }

    public class grpCharacteristics
    {
        public string CharTypeAlias { get; set; }
        public List<Characteristics> chars { get; set; }
    }

    public class Characteristics
    {
        public string CharName { get; set; }
        public string CharValue { get; set; }
        public string CharTypeID { get; set; }
    }

    public class HVPNMain
    {
        public int CaseID { get; set; }
        public int ParentCaseID { get; set; }
        public string CountryName { get; set; }
        public string RegionName { get; set; }
        public List<BTPackage> package { get; set; }
    }

    public class BTPackage
    {
        public int PackageID { get; set; }
        public string PackageName { get; set; }
    }

    public class HVPNAccessSuppliers
    {
        public int AccessSupplierID { get; set; }
        public string AccessSupplier { get; set; }
    }

    public class HVPNPortSpeeds
    {
        public int PortSpeedID { get; set; }
        public string PortSpeed { get; set; }
    }

    public class BundleProudcts
    {
        public int BundleID { get; set; }
        public string Router { get; set; }
        public string AccessTechnology { get; set; }
        public string Bundle { get; set; }
        public string ExpectedDate { get; set; }
        public string QuotableStartDate { get; set; }
        public string EOQ { get; set; }
        public string EOL { get; set; }
        public string EOS { get; set; }
        public string SmartServiceAvailability { get; set; }
        public char partialBundle { get; set; }
    }

    public class HVPNParentPortTypes
    {
        public string PackageName { get; set; }
        //added by siba
        public int PackageID { get; set; }
        public string AccSupplierCharID { get; set; }
        public string SuppProdID { get; set; }
        public string AccessTypeID { get; set; }
        public string portTypeID { get; set; }

       
        public string AccessType { get; set; }
        public string PortSpeed { get; set; }
        public string Availability { get; set; }
        public string AvailableDesc { get; set; }
        public string AccessSpeed { get; set; }
        public string Interface { get; set; }
        public string FramingStructure { get; set; }
        public string Connector { get; set; }
        public string AccessAvailabilityStatus { get; set; }
        public string ContentionRatio { get; set; }
        
        public string Supplier { get; set; }
        public string SupplierProductBTInternalSLA { get; set; }
        public int PortPackageID { get; set; }
        public int PageCount { get; set; }
        public int RecCount { get; set; }

        public string ServiceLeadTime { get; set; }
        public string POP { get; set; }
        public string CPE { get; set; }
    }

    public class DSLParentPortTypes
    {

        public int PackageID { get; set; }
        public string AccSupplierCharID { get; set; }//added by siba
        public string SuppProdID { get; set; }//added by siba
        public string AccessTypeID { get; set; }
        public string portTypeID { get; set; }


        public string PackageName { get; set; }
        public string DSLType { get; set; }
        public string DSLSpeed { get; set; }
        public string Interface { get; set; }
        public string FramingStructure { get; set; }
        public string Connector { get; set; }
        public string ContentionRatio { get; set; }
        public string Supplier { get; set; }
        public string SupplierProductSLA { get; set; }
        public string AvailableDesc { get; set; }
        public string ContractedLeadTime { get; set; }
        public string InterconnectDesign { get; set; }
        public string EndToEndLeadTime { get; set; }
        public string GPOP { get; set; }
        public string TIRValue { get; set; }
        public string EFSupportedSpeeds { get; set; }
        public string CPE { get; set; }
        public int ParentPackageID { set; get; }
        public int PageCount { get; set; }
        public int RecCount { get; set; }
        public int PortPackageID { get; set; }
    }

    public class VSATAccessSuppliers
    {
        public int VSATAccessSupplierID { get; set; }
        public string VSATAccessSupplier { get; set; }
    }

    public class Speed
    {
        public int SpeedID { get; set; }
        public string SpeedName { get; set; }
    }

    public class VSATData
    {

        public int PackageID { get; set; }
        public string AccSupplierCharID { get; set; }//added by siba
        public string SuppProdID { get; set; }//added by siba
        public string AccessTypeID { get; set; }
        public string portTypeID { get; set; }

        public string AccessType { get; set; }
        public string PortSpeed { get; set; }
        public string Availability { get; set; }
        public string AvailableDesc { get; set; }
        public string AccessSpeed { get; set; }
        public string Interface { get; set; }
        public string FramingStructure { get; set; }
        public string Connector { get; set; }
        public string AccessAvailabilityStatus { get; set; }
        public string ContentionRatio { get; set; }
        public string Supplier { get; set; }
        public string SupplierProductBTInternalSLA { get; set; }
        public string ServiceLeadTime { get; set; }
        public string POP { get; set; }
        public string CPE { get; set; }
        public string VSATSupplyType { get; set; }

    }

    public class PrivateLineGeneralInfo
    {
        public string ProductCode { get; set; }
        public int NumberOfPriorty { get; set; }
        public string ProductPricing { get; set; }
        public int SubProduct1 { get; set; }
        public int SubProduct2 { get; set; }
        public string SubProductCode1 { get; set; }
        public string SubProductCode2 { get; set; }
        public List<int> ProductPriority { get; set; }
        public int UKCountryID { get; set; }
        public int CountryID { get; set; }
        public int CityID { get; set; }
    }

    public class RegionDetails
    {
        public int RegionID { get; set; }
        public int CountryID { get; set; }
        public int StateID { get; set; }
        public int CityID { get; set; }
        public int HubSiteID { get; set; }
    }

    public class PrivateLineRegions
    {
        public int Country1 { get; set; }
        public int Country2 { get; set; }
        public int City1 { get; set; }
        public int City2 { get; set; }
        public int Hubbing { get; set; }
        public int IgnoreHubbing { get; set; }
        public string ProductPricing { get; set; }
    }

    public class Carrier
    {
        public int CarrierID { get; set; }
        public string CarrierName { get; set; }
    }

    public class Carriers
    {
        public int CarrierCount { get; set; }
        public List<Carrier> Carrs { get; set; }
    }

    public class PrivateLineCharacteristics
    {
        public string CharTypeName { get; set; }
        public string CharTypeName1 { get; set; }
        public List<PrivateLineChars> lstChars { get; set; }
        public ServiceLeadTime SLTime { get; set; }
    }

    public class PrivateLineCountryCity
    {
        public string CountryName { get; set; }
        public string CityName { get; set; }
    }

    public class PrivateLineChars
    {
        public string CharTypeName { get; set; }
        public string CharName { get; set; }
        public string CharName1 { get; set; }
        public int CharTypeID { get; set; }
        public int isChecked { get; set; }
        public int VisibleChecBox { get; set; }
        public string HTMLString { get; set; }
    }

    public class CaseUpdatedInfo
    {
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public int CreatedByID { get; set; }
        public int UpdatedByID { get; set; }
        public string CreatedDate { get; set; }
        public string UpdatedDate { get; set; }
    }

    public class ServiceLeadTime
    {
        public int EstimatedLeadTime { get; set; }
        public string PhysicalInterface { get; set; }
        public string PhysicalInterface1 { get; set; }
        public string FunctionalInterface { get; set; }
        public string FunctionalInterface1 { get; set; }
        public string FunctionalInterface2 { get; set; }
        public string ElectricalInterface { get; set; }
        public string ElectricalInterface1 { get; set; }
        public string ElectricalInterface2 { get; set; }
        public string CPERequired { get; set; }
        public string CPERequired1 { get; set; }
        public string Remarks { get; set; }
        public string Remarks1 { get; set; }
        public int PhysicalInterfacecellNo { get; set; }
        public int FunctionalInterfacecellNo { get; set; }
        public int ElectricalInterfacecellNo { get; set; }
        public int CPERequiredcellNo { get; set; }
        public int RemarkscellNo { get; set; }
        public int CaseID1 { get; set; }
        public int CaseID2 { get; set; }
        
    }

    //public class AccessInformation
    //{
    //    public string POP { get; set; }
    //    public string AccessSpeed { get; set; }
    //    public string AccessType { get; set; }
    //    public string Supplier { get; set; }
    //    public string SupplierProductName { get; set; }
    //    public string AccessSpeedAvailability { get; set; }
    //    public string OrderingStatus { get; set; }
    //    public string Interface { get; set; }
    //    public string Framing { get; set; }
    //    public string Connecter { get; set; }
    //    public string OffnetCPEDayStatus { get; set; }
    //    public string OffnetWithOutCPEDayStatus { get; set; }
    //    public string OnNetCPEDayStatus { get; set; }
    //    public string OnNetWithOutCPEDayStauts { get; set; }
    //    public int AccessSupplierNameID { get; set; }
    //    public int AccessSpeedCharID { get; set; }
    //    public string ASpeedUOM { get; set; }
    //    public int AccessSupplierCharID { get; set; }
    //    public int AccessProductTypeID { get; set; }

    //    //to show offnet-onet  cpeleadtime
    //    public List<string> offnetwithCPEStatus { get; set; }
    //    public List<string> offnetWithOutCPEStatus { get; set; }
    //    public List<string> onnetWithCPEStatus { get; set; }
    //    public List<string> onnetWithoutCPEStatus { get; set; }
    //}


    public class Documents
    {
        public string DocumentTitle { get; set; }
        public string DocumentUrl { get; set; }
    }


    public class ProductNotes
    {
        public string UpdatedDate { get; set; }
        public string NoteTitle { get; set; }
        public string NoteCatageroy { get; set; }
        public string NotePriority { get; set; }
        public string NoteID { get; set; }
       
    }


    public class ProdAccessType
    {
        public int EthernetLeasedLine { get; set; }
        public int HVPN { get; set; }
        public int DSL { get; set; }
        public int VSAT { get; set; }
    }

    public class DispaNotes
    {
        public string NotePriority { get; set; }
        public string NoteCatageroy { get; set; }
        public string NOTEEFFBEGDATE { get; set; }
        public string NOTEEFFENDDATE { get; set; }
        public string NoteTitle { get; set; }
        public string NOTECONTENT { get; set; }
        public string UserName { get; set; }
        public string ProductName { get; set; }
        public string RegionName { get; set; }
        public string CountryName { get; set; }
        
    }

    public class CPEAvailability
    {
        public string Country { get; set; }
        public string Supplier { get; set; }
        public string AccessType { get; set; }
        public string AccessTechnology { get; set; }
        public string AccessCPEBundle { get; set; }
        public string Product { get; set; }
        public string AccessCPEOrder { get; set; }
    }

    public class HVPNPackagePortType
    {
        public string charName { get; set; }
        public string charValue { get; set; }
    }

}