using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.Services;
using SCSearchBAL;
using System.Data;

namespace SCSearch
{
    public partial class hVPNFeatures : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }
        [WebMethod]
        public static List<CPEDetails> getHVPNFeaturesDetails()
        {
            DispHVPNpkgBAL obj = new DispHVPNpkgBAL();
            return obj.getCPEDetails();
        }
        [WebMethod]
        public static List<CPEAvailability> getCPEAvailability(int ProductID)
        {
            DispHVPNpkgBAL obj = new DispHVPNpkgBAL();
            List<CPEAvailability> lstCPEAvailability = new List<CPEAvailability>();
            DataTable dt = obj.GetCPEAvailMatrixRules(ProductID);
            if (dt != null && dt.Rows.Count > 0)
            {
                

                foreach (DataRow dr in dt.Rows)

                {
                    lstCPEAvailability.Add(new CPEAvailability() { Country = dr["cntry"].ToString(), Supplier = dr["supp"].ToString(), AccessType = dr["atype"].ToString(), AccessTechnology = dr["atech"].ToString(), AccessCPEBundle = dr["acpebun"].ToString(), Product = dr["product"].ToString(), AccessCPEOrder = dr["acpeorder"].ToString() });

                   
                }
            }
            return lstCPEAvailability;
        }
    }
}