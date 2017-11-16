using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using SCSearchBAL;
using System.Web.Services;
using System.Data;

namespace SCSearch
{
    public partial class DispCPEProduct : System.Web.UI.Page
    {

        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [WebMethod]
        public static TupleList<string, string> GetAllSuppler(string countryID)
        {
            if (!string.IsNullOrEmpty(countryID))
            {
                DispCPEProductBAL objDispCPEProductBAL = new DispCPEProductBAL();
                return objDispCPEProductBAL.GetAllSupplier(countryID);
            }
            return null;
        }

        [WebMethod]
        public static TupleList<string, string> GetValidProduct(string selectedSupplier, string selectedCountry)
        {
            if (!string.IsNullOrEmpty(selectedSupplier) && !string.IsNullOrEmpty(selectedCountry))
            {
                DispCPEProductBAL objDispCPEProductBAL = new DispCPEProductBAL();
                return objDispCPEProductBAL.GetValidProductsforCountry(selectedSupplier, selectedCountry);
            }
            return null;
        }

        [WebMethod]
        public static List<CPEMaintainanceDetails> getValidCPEMaintOptsforproduct(string prodID, string countryID, string cityID, string supplier)
        {
            if (!string.IsNullOrEmpty(prodID) && !string.IsNullOrEmpty(countryID) && !string.IsNullOrEmpty(cityID) && !string.IsNullOrEmpty(supplier))
            {
                DispCPEProductBAL objDispCPEProductBAL = new DispCPEProductBAL();
                List<CPEMaintainanceDetails> objMaint=objDispCPEProductBAL.ValidMainOptionForProduct(prodID, countryID, cityID, supplier);
                return objMaint;
            }
            return null;

        }

        [WebMethod]
        //public static List<DataRow> getCPELeadTime(string supplierID,string countryID)
        public static List<CPELeadTimeandStatus> getCPELeadTime(string supplierID, string countryID,int productId)
        {
            //  string supplierID = "5847,47779,107461,174661";
            //  string countryID = "37";
            if (!string.IsNullOrEmpty(supplierID) && !string.IsNullOrEmpty(countryID))
            {
                //supplierID = supplierID.Remove(supplierID.Length - 1);
                DispCPEProductBAL objDispCPEProductBAL = new DispCPEProductBAL();
                List<CPELeadTimeandStatus> lsCPELeadTime = objDispCPEProductBAL.GetCPELeadTime(supplierID, int.Parse(countryID), productId);
                return lsCPELeadTime;
            }
            return null;
        }

        [WebMethod]
        public static List<CPEBundle> GetBundleDetails(string prodID, string countryID)
        {
            if (!string.IsNullOrEmpty(prodID) && !string.IsNullOrEmpty(countryID))
            {
                CPEBundleBAL objCPEBundleBAL = new CPEBundleBAL();
                List<CPEBundle> lstCPEBundle = objCPEBundleBAL.GetCPEBundle(int.Parse(prodID), int.Parse(countryID),true);
                return lstCPEBundle;
            }
            return null;
        }

        [WebMethod]
        public static string ValidServiceCenterCaseId(int countryID, int cityID)
        { 
            DispCPEProductBAL objDispCPEProductBAL = new DispCPEProductBAL();
            return objDispCPEProductBAL.ValidServiceCenterCaseId(countryID,cityID);
        }
    }
}