using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using SCSearchDAL;
using System.Data;

namespace SCSearchBAL
{
    public class CaseDetBal
    {

        public DataSet GetProdDetails(int ProdLocLevel, int CapmanPlatform, int StateFlag, int ProductID, int RegionID, int CountryID, int StateID, int CityID, int HubSiteID)
        {
            CaseDetDal dal = new CaseDetDal();
            return dal.GetProdDetails(ProdLocLevel, CapmanPlatform, StateFlag, ProductID, RegionID, CountryID, StateID, CityID, HubSiteID);
        }

        public int GetParentProduct(int ProductID)
        {
            CaseDetDal dal = new CaseDetDal();
            return dal.GetParentProduct(ProductID);
        }

        public int GetCapmanPlatformID(int ProductID, int HubSiteID)
        {
            CaseDetDal dal = new CaseDetDal();
            return dal.GetCapmanPlatformID(ProductID, HubSiteID);
        }

        public DataSet GetPopCharacteristics(int SiteID, int ProductID, int DisplaySearch)
        {
            CaseDetDal dal = new CaseDetDal();
            return dal.GetPopCharacteristics(SiteID, ProductID, DisplaySearch);
        }

        public DataSet GetPopCode(int SiteID, int ProductID, int DisplaySearch)
        {
            CaseDetDal dal = new CaseDetDal();
            return dal.GetPopCode(SiteID, ProductID, DisplaySearch);
        }

        public DataSet GetCharacteristics(int CaseID, int OptionMatrix, int CaseValidcd)
        {
            CaseDetDal dal = new CaseDetDal();
            return dal.GetCharacteristics(CaseID, OptionMatrix, CaseValidcd);
        }

        public DataSet GetCPESuppliers(int countryID, int ProductID, int CityID)
        {
            CaseDetDal suppDal = new CaseDetDal();
            return suppDal.GetCPESuppliers(countryID, ProductID, CityID);
        }

    }
}
