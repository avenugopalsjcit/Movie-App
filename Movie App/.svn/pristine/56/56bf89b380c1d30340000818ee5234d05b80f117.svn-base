using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using SCSearchDAL;
using System.Data;
using System.Collections;

namespace SCSearchBAL
{
    public class HVPNBAL
    {
        public DataSet GetParentCaseID(int RegionID, int CountryID, int ProductID)
        {
            HVPNDAL dal = new HVPNDAL();
            return dal.GetParentCaseID(RegionID,CountryID,ProductID);
        }

        public DataSet GetPackages(int ProductID, int CaseID, int ParentProductID, int ParentCaseID, int AccessSupplierID)
        {
            HVPNDAL dal = new HVPNDAL();
            return dal.GetPackages(ProductID, CaseID, ParentProductID, ParentCaseID, AccessSupplierID);
        }

        public DataSet GetAccessSuppliers(int ProductID, int CaseID, int ParentProductID, int ParentCaseID, int PackageID, string PackageIds)
        {
            HVPNDAL dal = new HVPNDAL();
            return dal.GetAccessSuppliers(ProductID, CaseID, ParentProductID, ParentCaseID, PackageID, PackageIds);
        }

        public DataSet GetHVPNPortSpeeds(int CaseID, int ParentCaseID, int PackageID, int CountryID, int ProductID)
        {
            HVPNDAL dal = new HVPNDAL();
            return dal.GetHVPNPortSpeeds(CaseID, ParentCaseID, PackageID, CountryID, ProductID);
        }

        public DataSet GetVSATPortSpeeds(int CaseID, int ParentCaseID, int PackageID, int CountryID, int ProductID)
        {
            HVPNDAL dal = new HVPNDAL();
            return dal.GetVSATPortSpeeds(CaseID, ParentCaseID, PackageID, CountryID, ProductID);
        }
        public string GenerateTunnelingNote(string strCountryName)
        {
            HVPNDAL dal = new HVPNDAL();
            return dal.GenerateTunnelingNote(strCountryName);
        }

        public DataSet GetRegionCountryName(int RegionID, int CountryID, int ProductID)
        {
            HVPNDAL dal = new HVPNDAL();
            return dal.GetRegionCountryName(RegionID,CountryID,ProductID);
        }

        public DataSet GetProductBundlesForCountry(int ProductID, int CountryID)
        {
            HVPNDAL dal = new HVPNDAL();
            return dal.GetProductBundlesForCountry(ProductID, CountryID);
        }

       

        public DataSet GetBundleAccessTypes(int CharID, int CountryID)
        {
            HVPNDAL dal = new HVPNDAL();
            return dal.GetBundleAccessTypes(CharID, CountryID);
        }

        public DataSet GetBundleAccessTypes(string CharIDs, int CountryID)
        {
            HVPNDAL dal = new HVPNDAL();
            return dal.GetBundleAccessTypes(CharIDs, CountryID);
        }


        public DataSet GetAccessTechnology(int CharID)
        {
            HVPNDAL dal = new HVPNDAL();
            return dal.GetAccessTechnology(CharID);
        }

        public DataSet GetAccessTechnology(string CharIDs)
        {
            HVPNDAL dal = new HVPNDAL();
            return dal.GetAccessTechnology(CharIDs);
        }

        public DataSet GetBundleDetails(int CharID)
        {
            HVPNDAL dal = new HVPNDAL();
            return dal.GetBundleDetails(CharID);
        }

        public DataSet GetSmartService(int ProductID, int CountryID)
        {
            HVPNDAL dal = new HVPNDAL();
            return dal.GetSmartService(ProductID,CountryID);
        }

        public DataSet GetRouterName(int BundleID)
        {
            HVPNDAL dal = new HVPNDAL();
            return dal.GetRouterName(BundleID);
        }

        public DataSet GetPackageInfo(int CaseID, int ProductID, int PackageID)
        {
            HVPNDAL dal = new HVPNDAL();
            return dal.GetPackageInfo(CaseID,ProductID,PackageID);
        }

        public DataSet GetPortSpeedNames(string PortSpeed)
        {
            HVPNDAL dal = new HVPNDAL();
            return dal.GetPortSpeedNames(PortSpeed);
        }

        public DataSet GetPortSpeedNames(int CharID, int CaseID)
        {
            HVPNDAL dal = new HVPNDAL();
            return dal.GetPortSpeedNames(CharID, CaseID);
        }


        public int GetParentPackageID(int ParentCaseID, int PackageID)
        {
            HVPNDAL dal = new HVPNDAL();
            return dal.GetParentPackageID(ParentCaseID, PackageID);
        }


        public int GetPortPackageID(int CountryID, int PackageID, int AccessProductTypeID, int AccessSupplierCharID, int AccessSupplierNameID, int GPOPInterConnect, int PortTypeID, int CaseID)
        {
            HVPNDAL dal = new HVPNDAL();
            return dal.GetPortPackageID(CountryID, PackageID, AccessProductTypeID, AccessSupplierCharID, AccessSupplierNameID, GPOPInterConnect, PortTypeID, CaseID);
        }

        public string GetTIRValue(int ProductID, int CaseID, int PortPckgID, int ParentPackageID)
        {
            HVPNDAL dal = new HVPNDAL();
            return dal.GetTIRValue(ProductID, CaseID, PortPckgID, ParentPackageID);
        }

        public string GetEFValue(int ProductID, int CaseID, int PortPckgID, int ParentPackageID)
        {
            HVPNDAL dal = new HVPNDAL();
            return dal.GetEFValue(ProductID, CaseID, PortPckgID, ParentPackageID);
        }

        public DataSet GetCPEInfo(int CaseID, int PortTypeID, int PackageID, int AccessSupplierNameID, int CountryID)
        {
            HVPNDAL dal = new HVPNDAL();
            return dal.GetCPEInfo(CaseID, PortTypeID, PackageID, AccessSupplierNameID, CountryID);
        }

        public DataSet GetCPE(int ProductID, int AccessProductTypeID, int InterfaceID, int AccessSpeed, int SupplyID, string AccessType, int CountryID)
        {
            HVPNDAL dal = new HVPNDAL();
            return dal.GetCPE(ProductID, AccessProductTypeID, InterfaceID, AccessSpeed, SupplyID, AccessType, CountryID);
        }

        public DataSet GetHVPNAttributes(int CaseID, int CasePackageID, int PackageID, int ParentCaseID, int ParentPackageID, int AccessSupplierCharID, int ProductID, string PortSpeedID, int Country,int PageNo,int PageCount,ref int Count)
        {
            HVPNDAL dal = new HVPNDAL();
            return dal.GetHVPNAttributes(CaseID, CasePackageID, PackageID, ParentCaseID, ParentPackageID, AccessSupplierCharID, ProductID, PortSpeedID, Country, PageNo, PageCount,ref Count);
        }

        public DataSet GetPaentHVPNAttributes(int CaseID, int CasePackageID, int PackageID, int AccessSupplierCharID, string PortSpeedID, int Country, int PageNo, int PageCount, ref int Count)
        {
            HVPNDAL dal = new HVPNDAL();
            return dal.GetPaentHVPNAttributes(CaseID, CasePackageID, PackageID, AccessSupplierCharID, PortSpeedID, Country, PageNo, PageCount,ref Count);
        }

        public string GetHVPNAvailDesc(int PortSpeedAvailID)
        {
            HVPNDAL dal = new HVPNDAL();
            return dal.GetHVPNAvailDesc(PortSpeedAvailID);
        }

        public int GetContentionValue(int PackageID, int ParentCaseID, int AccessSupplierNameID, int Country)
        {
            HVPNDAL dal = new HVPNDAL();
            return dal.GetContentionValue(PackageID, ParentCaseID, AccessSupplierNameID, Country);
        }
        public int GetDeliveryTime(int ParentCaseID, int AccessSupplierNameID, int Country)
        {
            HVPNDAL dal = new HVPNDAL();
            return dal.GetDeliveryTime(ParentCaseID, AccessSupplierNameID, Country);
        }

        public DataSet GetDSLPackageInfo(int CaseID, int ProductID, int PackageID, int ParentCaseID, int ParentProductID)
        {
            HVPNDAL dal = new HVPNDAL();
            return dal.GetDSLPackageInfo(CaseID, ProductID, PackageID, ParentCaseID, ParentProductID);
        }

        public DataSet GetDSLAttributes(int CaseID, int CasePackageID, int PackageID, int ParentCaseID, int ParentPackageID, int AccessSupplierCharID, int ProductID, int Country,int PageNo,int PageCount,ref int Count)
        {
            HVPNDAL dal = new HVPNDAL();
            return dal.GetDSLAttributes(CaseID, CasePackageID, PackageID, ParentCaseID, ParentPackageID, AccessSupplierCharID, ProductID, Country,PageNo,PageCount,ref Count);
        }

        public DataSet GetParentDSLAttributes(int ParentCaseID, int CasePackageID, int SupplierID, int CountryID, int PackageID, int PageNo, int PageCount, ref int Count)
        {
            HVPNDAL dal = new HVPNDAL();
            return dal.GetParentDSLAttributes(ParentCaseID, CasePackageID, SupplierID, CountryID, PackageID, PageNo, PageCount, ref Count);
        }
        public Hashtable GetDSLContractLeadTime(int CaseID, int AccessSupplierNameID, int PackageID, int ParentCaseID, int PortTypeID, int Country)
        {
            HVPNDAL dal = new HVPNDAL();
            return dal.GetDSLContractLeadTime(CaseID, AccessSupplierNameID, PackageID, ParentCaseID, PortTypeID, Country);
        }
    }
}
