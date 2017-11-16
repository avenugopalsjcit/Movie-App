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
    public partial class DispCPEParts : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
          //  DispCPEPartsBAL obj = new DispCPEPartsBAL();

           // obj.getAccessType(167162, 46);
        }

        [WebMethod]
        public static CPEParts GetCPEPartsDetails(int bundleID, int countryID, int isHVPN)
        {
            DispCPEPartsBAL objDispCPEPartsBAL = new DispCPEPartsBAL();
            return objDispCPEPartsBAL.getCPEParts(bundleID, countryID, isHVPN);
        
        }
    }
}