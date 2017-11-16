using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using SCSearchBAL;
using System.Web.Services;

namespace SCSearch
{
    public partial class DispSubProduct : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

           // DispSubProductBAL objDispSubProductBAL = new DispSubProductBAL();
           // objDispSubProductBAL.getProdCharecteristic();
            
        }

        [WebMethod]
        public static SupProductList GetSubProductDetails(string prodId, string regionID, string countryID,
            string cityID, string hubSiteID, int CapmanPlatformId, int sAccess_Level, string GfrCode, string SegregationCode)
        {
            DispSubProductBAL objDispSubProductBAL = new DispSubProductBAL();
            return objDispSubProductBAL.HeaderMessage(prodId, regionID, countryID, cityID, hubSiteID,
                CapmanPlatformId, sAccess_Level, GfrCode, SegregationCode);
            
        }


        [WebMethod]
        public static TupleList<string, string> FetchPopCharacteristics(string SiteID, string ProductID,string subproductID)
        {
            DispSubProductBAL objDispSubProductBAL = new DispSubProductBAL();
            TupleList<string, string> tPopChar = objDispSubProductBAL.FetchPopCharsubprod(SiteID, ProductID, subproductID);
            return tPopChar;
        }

        [WebMethod]
        public static List<SubprodCharacteristics> GetSubprodCharacteristic(int CaseID)
        {
            DispSubProductBAL objDispSubProductBAL = new DispSubProductBAL();
            return objDispSubProductBAL.getProdCharecteristic(CaseID);
            
        }

        [WebMethod]
        public static AccSuppPortSpeed GetAccSuppPortSpeed(int caseId,int sAccessLevel,string sLDAPGfr,int dristributorId,int access,
                                                           int hubSuteId,int countryId)
        {
            DispSubProductBAL objDispSubProductBAL = new DispSubProductBAL();
            return objDispSubProductBAL.GetAccSuppPortSpeed(caseId, sAccessLevel, sLDAPGfr, dristributorId, access, hubSuteId, countryId);
        }

        [WebMethod]
        public static TupleList<string, string> displayMPLS(int ProductID, int subProdID)
        {
            DispSubProductBAL objDispSubProductBAL = new DispSubProductBAL();
            return objDispSubProductBAL.displayMPLS(ProductID, subProdID);
        }

        [WebMethod]
        public static List<CISReport> getCISReport(int prodId)
        {
            DispSubProductBAL objDispSubProductBAL = new DispSubProductBAL();
            return objDispSubProductBAL.getCISReport(prodId);
        }

        [WebMethod]
        public static CISReportDetails getCISAccessType(int regionID)
        {
            DispSubProductBAL objDispSubProductBAL = new DispSubProductBAL();
            return objDispSubProductBAL.getCISAccessType(regionID);
        }

        [WebMethod]
        public static string getGenericVoiceCaseID(int regionID, int countryID)
        {
            DispSubProductBAL objDispSubProductBAL = new DispSubProductBAL();
            return objDispSubProductBAL.getGenericVoiceCaseID(regionID, countryID);
        }

        [WebMethod]
        public static int GetSubProductCount(int prodID)
        {
            DispSubProductBAL objDispSubProductBAL = new DispSubProductBAL();
            return int.Parse(objDispSubProductBAL.GetSubProductCount(prodID));
        }
    }
}