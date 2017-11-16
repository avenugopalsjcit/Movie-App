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
    public partial class DispAccessDetails : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
          // DispAccessDetBAL objDispAccessDetBAL = new DispAccessDetBAL();
            //objDispAccessDetBAL.getAccessSupplier(25, 37, 599, 915);
         //  objDispAccessDetBAL.getTableHeading(37, 915, 25, 599);
        }

        [WebMethod]
        public static TupleList<string, string> getAccessSupplier(int Access, int countryID, int cityId, int popId)
        {
            DispAccessDetBAL objDispAccessDetBAL = new DispAccessDetBAL();
            return objDispAccessDetBAL.getAccessSupplier(Access, countryID, cityId, popId);
            
        }

        [WebMethod]
        public static List<AccessDetails> getAccessDetails(int countryID, int siteID, int selectedSuppID)
        {
            DispAccessDetBAL objDispAccessDetBAL = new DispAccessDetBAL();
            return objDispAccessDetBAL.getAccessDetails(countryID, siteID, selectedSuppID);
        }
    }
}