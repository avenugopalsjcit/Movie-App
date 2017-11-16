using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.Services;
using SCSearchBAL;

namespace SCSearch
{
    public partial class SLAInformation : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
          
        }

        [WebMethod]
        public static SLAInformations getSLAInfo(string AccSuppCharID, string AccSuppNameId, int countryID,
            int supplier_access_type, int pspeed, string Home,string isDSL, string SLAPortTypeID)
        {
            SLAInfoBAL objSLAInfoBAL = new SLAInfoBAL();
            return objSLAInfoBAL.getSLAInfo(AccSuppCharID, AccSuppNameId, countryID,
                supplier_access_type, pspeed, Home, isDSL, SLAPortTypeID);
        }

        //[WebMethod]
        //public static ContLeadTime getContLeadTime(string AccSuppCharID, string AccSuppNameId, int countryID, int supplier_access_type, int pspeed)
        //{
        //    SLAInfoBAL objSLAInfoBAL = new SLAInfoBAL();
        //    return objSLAInfoBAL.getContLeadTime(AccSuppCharID, AccSuppNameId, countryID, supplier_access_type, pspeed);
        //}


        [WebMethod]
        public static List<InitalSearchData> getAccTypeSuppProduct(int countryID, int AccSuppId)
        {
            SLAInfoBAL objSLAInfoBAL = new SLAInfoBAL();
            return objSLAInfoBAL.getAccTypeSuppProduct(countryID, AccSuppId);
        }

        [WebMethod]
        public static List<SLACountry> getSLCountry(string AccSuppId)
        {
            SLAInfoBAL objSLAInfoBAL = new SLAInfoBAL();
            return objSLAInfoBAL.getSLACountry(AccSuppId);
        }


        [WebMethod]
        public static List<SLAAccSupp> getSLAAccSupp(string countryID)
        {
            SLAInfoBAL objSLAInfoBAL = new SLAInfoBAL();
            return objSLAInfoBAL.getSLAAccSupp(countryID);
        }

        [WebMethod]
        public static List<SLAAccType> getSLAAccType(string countryID, string suppId, string suppProd)
        {
            SLAInfoBAL objSLAInfoBAL = new SLAInfoBAL();
            return objSLAInfoBAL.getSLAAccType(countryID,suppId,suppProd);
        }
        
        [WebMethod]
        public static List<SLAAccSuppProd> getSLASupprod(string countryID, string suppId, string AccType)
        {
            SLAInfoBAL objSLAInfoBAL = new SLAInfoBAL();
            return objSLAInfoBAL.getSLASupprod(countryID, suppId,AccType);
        }


        [WebMethod]
        public static DSLSLAInfo getDSLSLAInfo(int accSuppProdID, int selectedCountry, int selectedPackage)
        {
            SLAInfoBAL objSLAInfoBAL = new SLAInfoBAL();
            return objSLAInfoBAL.getDSLSLAInfo(accSuppProdID, selectedCountry, selectedPackage);
        }

    }
}