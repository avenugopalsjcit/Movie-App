using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Data;
using SCSearchDAL;

namespace SCSearchBAL
{
    public class LeveltowProductBAL
    {
        public ProductDet GetProductDetails(int ProdLocLevel, int CapmanPlatform, int StateFlag, int ProductID, int RegionID, int CountryID, int StateID, int CityID, int HubSiteID, int DisplaySearch)
        {
            CaseDetDal objCaseDetDal=new CaseDetDal ();
            ProductDet objProduct = new ProductDet();
            DataSet dsProdDet = objCaseDetDal.GetProdDetails(ProdLocLevel,
                                                             CapmanPlatform,
                                                             StateFlag,
                                                             ProductID,
                                                             RegionID,
                                                             CountryID,
                                                             StateID,
                                                             CityID,
                                                             HubSiteID);

            if (dsProdDet != null && dsProdDet.Tables!=null && dsProdDet.Tables[0].Rows.Count > 0)
            { 
                
            }


            return objProduct;

        }
    }
}
