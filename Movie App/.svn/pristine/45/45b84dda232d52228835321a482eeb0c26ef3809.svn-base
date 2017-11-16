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
    public partial class LeveltowProduct : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [WebMethod]
        public static SupProduct getProductLevel(int productId)
        { 
            DispSubProductBAL objDispSubProductBAL=new DispSubProductBAL ();
            return objDispSubProductBAL.getProductLevel(productId);
        }

        public static ProductDet GetProductDetails(int ProdLocLevel, int CapmanPlatform, int StateFlag, int ProductID, int RegionID, int CountryID, int StateID, int CityID, int HubSiteID, int DisplaySearch)
        {
            LeveltowProductBAL obj=new LeveltowProductBAL();
            return obj.GetProductDetails(ProdLocLevel,
                                                             CapmanPlatform,
                                                             StateFlag,
                                                             ProductID,
                                                             RegionID,
                                                             CountryID,
                                                             StateID,
                                                             CityID,
                                                             HubSiteID,DisplaySearch);
        }


    }
}