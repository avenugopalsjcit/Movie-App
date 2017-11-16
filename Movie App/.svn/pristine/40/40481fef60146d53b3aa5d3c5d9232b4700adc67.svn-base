using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.Services;
using SCSearchBAL;
using SCSearchDAL;

namespace SCSearch
{
    public partial class BTOneVoice : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            //BTOneVoiceBAL objBTOneVoiceBAL = new BTOneVoiceBAL();
            //objBTOneVoiceBAL.getCharacteristics("5", "37");
            //BTOneVoiceDAL obj = new BTOneVoiceDAL();
            //string abc= obj.GetCityId(37, 5);
        }

        [WebMethod]
        public static TupleList<string,string> getServiceAvailability(string regionID,string countryID, int prodId)
        {
            BTOneVoiceBAL objBTOneVoiceBAL = new BTOneVoiceBAL();
            return objBTOneVoiceBAL.getAvailability(regionID, countryID,prodId);
        }

        [WebMethod]
        public static List<OnetoManyMap> getCharacteristics(int caseId, int productID, string countryID)
        {
            BTOneVoiceBAL objBTOneVoiceBAL = new BTOneVoiceBAL();
            return objBTOneVoiceBAL.getCharacteristics(caseId, productID, countryID);
        }

        [WebMethod]
        public static string GeteCityID(int countryId, int regionID)
        {
            BTOneVoiceBAL objBTOneVoiceBAL = new BTOneVoiceBAL();
            return objBTOneVoiceBAL.GeteCityID(countryId, regionID);
        }

        //[WebMethod]
        //public static string GetOneVoiceProductName(string prodId) 
        //{
        //    BTOneVoiceBAL objBTOneVoiceBAL = new BTOneVoiceBAL();
        //    return objBTOneVoiceBAL.GetOneVoiceProductName(prodId);
        //}
    }
}