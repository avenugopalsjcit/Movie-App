using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.Services;
using SCSearchBAL;
using System.Web.Script.Services;

using SCSearchBAL;

namespace SCSearch
{
    public partial class CPEBundleDetails : System.Web.UI.Page
    {
        static string productID = string.Empty;
        static string CountryID = string.Empty;
        static string CityID = string.Empty;
        protected void Page_Load(object sender, EventArgs e)
        {
            //SCSearchHLP obj = new SCSearchHLP();
            //List<CPEMaintainanceDetails> lstCPEBundle = obj.CPEMaintainanceDetails(75,63562,10,257);

            // CPEBundleBAL objCPEBundleBAL = new CPEBundleBAL();
            // List<CPEMaintainanceDetails> lstCPEMaintDet = objCPEBundleBAL.getCPEMaintainanceDetails(76, 5847, 89, 409);
            //  return lstCPEMaintDet;

            //productID = Request.QueryString["productid"];
            //CountryID = Request.QueryString["countryid"];
            //CityID = Request.QueryString["cityid"];

            //productID = "76";
            //CountryID = "37";
            //CityID = "599";

        }

        [WebMethod]
        // [ScriptMethod(UseHttpGet = true)]
        public static TupleList<string, string> GetCityList(string supplierID, string CountryID, string CityID)
        {

            if (!string.IsNullOrEmpty(CountryID) && !string.IsNullOrEmpty(CityID))
            {
                CPEBundleBAL objCPEBundleBAL = new CPEBundleBAL();
                return objCPEBundleBAL.GetSupplierCity(int.Parse(CountryID), int.Parse(CityID), int.Parse(supplierID));
            }
            return null;
        }

        [WebMethod]
        public static List<CPEBundle> GetBundleDetails(string productID,string CountryID)
        {
            // SCSearchHLP obj = new SCSearchHLP();
            if (!string.IsNullOrEmpty(productID) && !string.IsNullOrEmpty(CountryID))
            {
                CPEBundleBAL objCPEBundleBAL = new CPEBundleBAL();
                List<CPEBundle> lstCPEBundle = objCPEBundleBAL.GetCPEBundle(int.Parse(productID), int.Parse(CountryID),false);
                return lstCPEBundle;
            }
            return null;
        }

        [WebMethod]
        public static List<CPEMaintainanceDetails> getCPEMaintainanceDetails(string productID, string supplierID, string CountryID, string cityID)
        {
           // if (!string.IsNullOrEmpty(CityID)) { cityID = CityID; }
            if (!string.IsNullOrEmpty(productID) && !string.IsNullOrEmpty(CountryID) && !string.IsNullOrEmpty(supplierID) && !string.IsNullOrEmpty(cityID))
            {
                CPEBundleBAL objCPEBundleBAL = new CPEBundleBAL();
                List<CPEMaintainanceDetails> lstCPEMaintDet = objCPEBundleBAL.getCPEMaintainanceDetails(int.Parse(productID), int.Parse(supplierID), int.Parse(CountryID), int.Parse(cityID));
                return lstCPEMaintDet;
            }
            return null;
        }

        [WebMethod]
        public static List<CPESupplier> GetCPESuppliers(string productID, string CountryID, string CityID)
        {
            if (!string.IsNullOrEmpty(CountryID) && !string.IsNullOrEmpty(productID) && !string.IsNullOrEmpty(CityID))
            {
                CPEBundleBAL objCPEBundleBAL = new CPEBundleBAL();
                return objCPEBundleBAL.getSupplier(CountryID, productID, CityID);
            }
            else
                return null;
        }

        [WebMethod]
        public static List<CPELeadTimeandStatus> getCPELeadTime(string supplierID, string CountryID,string productId)
        {
            if (!string.IsNullOrEmpty(supplierID) && !string.IsNullOrEmpty(CountryID))
            {
                DispCPEProductBAL objDispCPEProductBAL = new DispCPEProductBAL();
                List<CPELeadTimeandStatus> lsCPELeadTime = objDispCPEProductBAL.GetCPELeadTime(supplierID, int.Parse(CountryID),int.Parse( productId));
                return lsCPELeadTime;
            }
            return null;
        }

        [WebMethod]
        public static List<CPESupplier> getMaintSupplier(int countryID, int hasAccSupp)
        {
            CPEBundleBAL objCPEBundleBAL = new CPEBundleBAL();
            return objCPEBundleBAL.getMaintSupplier(countryID, hasAccSupp);
        }

        [WebMethod]
        public static TupleList<string, string> getProductCharecteristics(int caseID) 
        {
            CPEBundleBAL objCPEBundleBAL = new CPEBundleBAL();
            return objCPEBundleBAL.getProductCharecteristics(caseID);
        }

        [WebMethod]
        public static List<CPESupplier> getOneVoiceSupplier(int countryID)
        {
            CPEBundleBAL objCPEBundleBAL = new CPEBundleBAL();
            return objCPEBundleBAL.getOnevoiceMaintSupplier(countryID);
        }

        [WebMethod]
        public static string getCPELaunchStatus(int countryID)
        {
            CPEBundleBAL objCPEBundleBAL = new CPEBundleBAL();
            return objCPEBundleBAL.getCPELaunchStatus(countryID);
        }
    }
}