using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using SCSearchDAL;
using System.Data;

namespace SCSearchBAL
{
  public  class VSATBAL
    {

      public DataSet GetVsatAttributeCursor(int CaseID, int CasePckgID, int AccessSupplierCharID, string PortSpeedCharID, int CountryID, int pckgid, int ParentPackageID, int ParentCaseID, int SupplierID, int ProductID, int PackageID)
      {
          VSATDAL dal = new VSATDAL();
          return dal.GetVsatAttributeCursor(CaseID, CasePckgID, AccessSupplierCharID, PortSpeedCharID, CountryID, pckgid, ParentPackageID, ParentCaseID, SupplierID, ProductID, PackageID);
      }

      public DataSet GetVsatParentAttributeCursor(int CaseID, int CasePckgID, int AccessSupplierCharID, string PortSpeedCharID, int CountryID, int PackageID)
      {
          VSATDAL dal = new VSATDAL();
          return dal.GetVsatParentAttributeCursor(CaseID, CasePckgID, AccessSupplierCharID, PortSpeedCharID, CountryID, PackageID);
      }

        public DataSet GetVsatXDSLCursor(int CaseID, int pckgid, int AccessSupplierCharID, int CountryID)
        {
            VSATDAL dal = new VSATDAL();
            return dal.GetVsatXDSLCursor(CaseID, pckgid, AccessSupplierCharID, CountryID);
        }

        public DataSet GetVsatSupplierCursor(int CaseID, int AccessSupplierCharID, int CasePckgID, int Parent)
        {
            VSATDAL dal = new VSATDAL();
            return dal.GetVsatSupplierCursor(CaseID, AccessSupplierCharID, CasePckgID,Parent);
        }

      
      public DataSet GetVsatPortSpeedAvail(int AvailCd)
      {
          VSATDAL dal = new VSATDAL();
          return dal.GetVsatPortSpeedAvail(AvailCd);
      }

      public DataSet GetVsatPortSpeedCursor(int CaseID, int PortSpeedID)
      {
          VSATDAL dal = new VSATDAL();
          return dal.GetVsatPortSpeedCursor(CaseID, PortSpeedID);
      }

      public int GetDeliveryTime(int ParentCaseID, int AccessSupplierNameID, int Country)
      {
          VSATDAL dal = new VSATDAL();
          return dal.GetDeliveryTime(ParentCaseID, AccessSupplierNameID, Country);
      }

     

      public DataSet GetVsatAccessSupplier(int CaseID, int PackageID, int ProductID, int ParentProductID, int ParentCaseID)
      {
          VSATDAL dal = new VSATDAL();
          return dal.GetVsatAccessSupplier(CaseID, PackageID, ProductID, ParentProductID, ParentCaseID);
      }

      public DataSet GetCaseID(int regionid, int countryid, int productid)
        {
            VSATDAL dal = new VSATDAL();
            return dal.GetCaseID( regionid,  countryid, productid);
        }
      
    }
}
