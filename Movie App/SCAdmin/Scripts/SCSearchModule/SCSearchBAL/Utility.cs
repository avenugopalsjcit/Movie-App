using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace SCSearchBAL
{
    class Utility
    {
    }

    public class CPEBundle
    {
        public string BundleID { get; set; }
        public string BundleName { get; set; }
        public string RouterName { get; set; }
        public string AccessTechnology { get; set; }
        public string ExpectedDateforOrder { get; set; }
        public string QoutableStartDate { get; set; }
        public string EOL { get; set; }
        public string EOQ { get; set; }
        public string EOS { get; set; }
        public char PartialBundle { get; set; }
        public string SmartServiceAvailability { get; set; }
    }

    public class CPEMaintainanceDetails
    {
        public string SupplierName { get; set; }
        public string ServiceNumber { get; set; }
        public string ServiceName { get; set; }
        public string ServiceOrder { get; set; }
        public string ServiceRestriction { get; set; }
        public string ServiceAvailabilityDesc { get; set; }
        public string smartServiceAvailability { get; set; }
        public string ManufacturerName { get; set; }
        public string MaintainerName { get; set; }
    }

    public class SupProductList
    {
        public string warningMsg { get; set; }
        public int segmentCount { get; set; }
        public List<SubprodCharacteristics> genericVoiceChar { get; set; }
        public List<SupProduct> lstSubProd { get; set; }
    }

    public class SupProduct
    {
        public string SubProdID { get; set; }
        public string SubProdName { get; set; }
        public string NetworkName { get; set; }
        public string SupprotResPOP { get; set; }
        public string AvailabilityDesc { get; set; }
        public string localCaseId { get; set; }
        public string ParentProdID { get; set; }
        public int CapmanPlatformId { get; set; }
        public int PCapmanPlatformId { get; set; }
        public int ProdLocationLvl { get; set; }
        public int ServiceTypeID { get; set; }
        public string useCpeSubproduct { get; set; }
        public string parentProdCaseID { get; set; }
        public string ParentProductName { get; set; }
        
    }


    public class TupleList<T1, T2> : List<Tuple<T1, T2>>
    {
        public void Add(T1 item, T2 item2)
        {
            Add(new Tuple<T1, T2>(item, item2));
        }
    }

    public class ParentSpeed
    {
        public string PortSpeeds { get; set; }
        public string PortSpeedAvailability { get; set; }
        public string AccessSpeed { get; set; }
        public string AccessTechnology { get; set; }
        public string SupplierProductName { get; set; }
        public string SupplierProductName1 { get; set; }
        public string ServiceType { get; set; }
        public string AccessSpeedAvailability { get; set; }
        public string OrderingStatus { get; set; }
        public string Interface { get; set; }
        public string Framing { get; set; }
        public string Connecter { get; set; }
        public string OffnetCPEDayStatus { get; set; }
        public string OffnetWithOutCPEDayStatus { get; set; }
        public string OnNetCPEDayStatus { get; set; }
        public string OnNetWithOutCPEDayStauts { get; set; }
        public int AccessSupplierNameID { get; set; }
        public int AccessSpeedCharID { get; set; }
        public string ASpeedUOM { get; set; }
        public int AccessSupplierCharID { get; set; }
        public int AccessProductTypeID { get; set; }

        public string ServiceVariant { get; set; }
        public string DeliveryMode { get; set; }

        //to show offnet-onet  cpeleadtime
        public List<string> offnetwithCPEStatus { get; set; }
        public List<string> offnetWithOutCPEStatus { get; set; }
        public List<string> onnetWithCPEStatus { get; set; }
        public List<string> onnetWithoutCPEStatus { get; set; }

        public string CPLeadTimeStatus { get; set; }
        public string onnetAccessLeadTimeStatus { get; set; }
        public string offnetAccessLeadTimeStatus { get; set; }
        public string PortSpeedLeadTime { get; set; }
        public string offnetServiceLeadTimeWithCPE { get; set; }
        public string offnetServiceLeadTimeWithOutCPE { get; set; }

        //
        public string onnetServiceLeadTimeWithCPE { get; set; }
        public string onnetServiceLeadTimeWithOutCPE { get; set; }

        //
        public string SupplierInterconnection { get; set; }
        public string MTUSize { get; set; }

        public int PageCount { get; set; }
        public int RecCount { get; set; }
    }

    public class CPELeadTimeandStatus
    {
        public string suppliername;
        public string transactionType;
        public string CPELeadTime;
        public string CPELeadTimeStatus;
        public string CPECeaseLeadTime;
        public string CPECeaseLeadTimeStatus;

    }

    public class OnetoManyMap
    {
        public string PRODUCT_CAT_NAME { get; set; }
        public List<Product> PRODUCTList { get; set; }
        public TupleList<string, string> charList { get; set; }
    }

    public class Product
    {
        public string ProductName { get; set; }
        public string ProductID { get; set; }
        public string validCaseCount { get; set; }
    }

    public class CPESupplier
    {
        public string supplierID { get; set; }
        public string supplierName { get; set; }
        public string supplierType { get; set; }
    }

    public class SubprodCharacteristics
    {
        public string CharTypeAlias { get; set; }
        public List<SubprodChar> chars { get; set; }
    }

    public class SubprodChar
    {
        public string CharName { get; set; }
        public string CharValue { get; set; }
        public string CharTypeID { get; set; }
    }

    public class ProductDet
    {
        public string ProductName { get; set; }
        public string ServiceAvailable { get; set; }
        public string NetworkName { get; set; }
        public string ResilientPop { get; set; }
        public int CaseID { get; set; }
        public int ParentProductID { get; set; }
        public int CapmanPlatformID { get; set; }
    }


    public class AccSuppPortSpeed
    {
        public List<SubProdAccSupp> lstAccSupp { get; set; }
        public SubPortSpeedDet lstPortSpeed { get; set; }
    }

    public class SubProdAccSupp
    {
        public int AccessSupplierID { get; set; }
        public string AccessSupplierName { get; set; }
    }

    public class SubPortSpeed
    {
        public int PortSpeedID { get; set; }
        public string PortSpeedName { get; set; }
    }


    public class SubPortSpeedDet
    {
        public List<SubPortSpeed> pSpeed { get; set; }
        public int SelectedPortSpeed { get; set; }
    }

    public class SLAInformations
    {
        public SLAInfo objSLAInfo { get; set; }
        public List<ContLeadTime> objContLeadTime { get; set; }
    }

    public class SLAInfo
    {
        public string QuoteValPeriod { get; set; }
        public string AckReceipt { get; set; }
        public string MinContractTerm { get; set; }
        public string ServiceCredits { get; set; }
        public string SpecialNotice { get; set; }
        public string CanPreinstall { get; set; }
        public string CanDurConTerm { get; set; }
        public string CircuitHandoverTestCrit { get; set; }
        public string str247FaultReception { get; set; }
        public string str247FaultReceptionName { get; set; }
        public string str247FaultRepair { get; set; }
        public string str247FaultRepairName { get; set; }
        public string strTroubleTicket { get; set; }
        public string strMaintenanceWindow { get; set; }
        public string strPlanWorkNotice { get; set; }
        public string strServiceCreditsSA { get; set; }
        public string strSpecialNoticeSA { get; set; }

    }

    public class ContLeadTime
    {
        public string AccSpeed { get; set; }
        public string OrdAccep { get; set; }
        public string OrdConfirmation { get; set; }
        public string ContractLeadTime { get; set; }
        public string BTCircuitAccep { get; set; }
        public string ExpedieDelivery { get; set; }
        public string ExpedieDeliveryTerm { get; set; }
        public string AccCeaseLeadTime { get; set; }


        public string AccessLineAvail { get; set; }
        public string FaultRespSeverity1 { get; set; }
        public string FaultRepairSeverity1 { get; set; }
        public string FaultRespSeverity2 { get; set; }
        public string FaultRepairSeverity2 { get; set; }

    }

    public class InitalSearchData
    {
        //public List<SLACountry> lstSLACountry { get; set; }
        //public List<SLAAccSupp> lstSLAAccSupp { get; set; }
        //public List<SLAAccType> SLAAccType { get; set; }
        //public List<SLAAccSuppProd> lstSLAAccSuppProd { get; set; }

        public string CountryId { get; set; }
        public string CountryName { get; set; }

        public string supplierId { get; set; }
        public string supplierName { get; set; }

        public string acctypeId { get; set; }
        public string acctypeName { get; set; }

        public string AccSuppProdId { get; set; }
        public string AccSuppProdName { get; set; }

    }


    public class SLACountry
    {
        public string CountryId { get; set; }
        public string CountryName { get; set; }
    }

    public class SLAAccSupp
    {
        public string supplierId { get; set; }
        public string supplierName { get; set; }
    }

    public class SLAAccType
    {
        public string acctypeId { get; set; }
        public string acctypeName { get; set; }
    }

    public class SLAAccSuppProd
    {
        public string AccSuppProdId { get; set; }
        public string AccSuppProdName { get; set; }
    }


    public class CPEParts
    {
        public List<string> strPartNameList { get; set; }
        public List<StandardParts> stdPart { get; set; }
        public List<string> varPart { get; set; }
        public List<OptionalParts> lstOptPart { get; set; }
    }

    public class StandardParts
    {
        public string AccessType { get; set; }
        public List<string> IOS_Parts { get; set; }
    }


    public class OptionalParts
    {
        public string AccessType { get; set; }
        public List<string> Opt_Parts { get; set; }
    }

    public class AccessDetails
    {
        public string AccSpeedID { get; set; }
        public string Speed { get; set; }
        public string AccTypeTypeId { get; set; }
        public string AccType { get; set; }
        public string AccSuppID { get; set; }
        public string AccSupplier { get; set; }
        public string AccSuppProdID { get; set; }
        public string suppProdName { get; set; }
        public string AccessInterface { get; set; }
    }

    public class DSLSLAInfo
    {
        public string AccModelName { get; set; }
        public string AccProviderName { get; set; }
        public string CEVPI { get; set; }
        public string CEVCI { get; set; }
        public string Encapsulation { get; set; }
        public string InterconnectDesign { get; set; }
        public string dslSupplyTypeName { get; set; }
        public string SplitterTypeISDNIncluded { get; set; }
        public string SplitterTypePSTNIncluded { get; set; }
        public string LocalLoopType { get; set; }
        public string ProductCode { get; set; }
    }

    public class HVPNAttribute
    {
        public string ISP_ADDRESSING { get; set; }
        public string OTHER_SERVICE_NOTES { get; set; }
        public string PRODUCT_CODE { get; set; }
        public string AGGREGATOR { get; set; }
        public string COPPER_DETAILS { get; set; }
        public string COPPER_SERVICE_ID { get; set; }
        public string PRICING_NOTES { get; set; }
        public string RFA_NOTES { get; set; }
        public string RFO_NOTES { get; set; }

    }

    public class CPEDetails
    { 
         public string COUNTRY { get; set; }
         public string CPE_SUPPLIER { get; set; }
         public string CPA{ get; set; }
         public string AGGREGATOR_BAU { get; set; }
         public string SPLIT_TUNNELING { get; set; }
    }

    public class DSLPackageDetails
    {
        public string DSLInformation { get; set; }
        public string Value { get; set; }
        public string PackageLvl { get; set; }
        public string LinkVal { get; set; }
    }

    public class CISReport
    {
        public string countryID { get; set; }
        public string countryName { get; set; }
        public string regID { get; set; }
        public string regName { get; set; }
        public string dispRegName { get; set; }
    }

    public class CISReportDetails
    {
        public List<string> AccessTypeHeader { get; set; }
        public List<CISCharecteristics> charecteristics { get; set; }
    }

    public class CISCharecteristics
    {
        public string orgCountry { get; set; }
        public string orgCity { get; set; }
        public List<string> charAvailability { get; set; }
    }

    public class AccessInformation
    {
        public string POP { get; set; }
        public string AccessSpeed { get; set; }
        public string AccessType { get; set; }
        public string Supplier { get; set; }
        public string Supplier1 { get; set; }
        public string SupplierProductName { get; set; }
        public string AccessSpeedAvailability { get; set; }
        public string OrderingStatus { get; set; }
        public string Interface { get; set; }
        public string Framing { get; set; }
        public string Connecter { get; set; }
        public string OffnetCPEDayStatus { get; set; }
        public string OffnetWithOutCPEDayStatus { get; set; }
        public string OnNetCPEDayStatus { get; set; }
        public string OnNetWithOutCPEDayStauts { get; set; }
        public int AccessSupplierNameID { get; set; }
        public int AccessSpeedCharID { get; set; }
        public string ASpeedUOM { get; set; }
        public int AccessSupplierCharID { get; set; }
        public int AccessProductTypeID { get; set; }
        public int RegionID { get; set; }
        public int HubSiteID { get; set; }
        //to show offnet-onet  cpeleadtime
        public List<string> offnetwithCPEStatus { get; set; }
        public List<string> offnetWithOutCPEStatus { get; set; }
        public List<string> onnetWithCPEStatus { get; set; }
        public List<string> onnetWithoutCPEStatus { get; set; }
        public int EstimatedLeadTime { get; set; }
        public string offnetAccessLeadTimeStatus { get; set; }
        public string onnetAccessLeadTimeStatus { get; set; }
        public string PortSpeedLeadTime { get; set; }
        public string ServiceLeadTimeWithCPE { get; set; }
        public string onnetServiceLeadTime { get; set; }
        public string offnetServiceLeadTime { get; set; }
    }



}
