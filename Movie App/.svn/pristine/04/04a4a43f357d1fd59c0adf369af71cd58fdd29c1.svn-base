using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using SCSearchDAL;
using System.Data;

namespace SCSearchBAL
{
    public class BTOneVoiceBAL
    {
        BTOneVoiceDAL objBTOneVoiceDAL = new BTOneVoiceDAL();




        public TupleList<string,string> getAvailability(string regionID, string countryID,int prodId)
        {
            DataTable dtAvail = objBTOneVoiceDAL.FetchAvailability(int.Parse(regionID), int.Parse(countryID), prodId);
            string localcaseID = "";
            string Availability = string.Empty;

            var result = new TupleList<string, string>();
            foreach (DataRow dr in dtAvail.Rows)
            {
                if (!string.IsNullOrEmpty(Convert.ToString(dr["avail_desc"])))
                {
                    localcaseID = objBTOneVoiceDAL.getCaseID(int.Parse(regionID), int.Parse(countryID), prodId)==""?"0":
                        objBTOneVoiceDAL.getCaseID(int.Parse(regionID), int.Parse(countryID), prodId);
                    Availability = Convert.ToString(dr["avail_desc"]);
                }
                else
                {
                    localcaseID = "0";
                    Availability = "Not Available";
                }

                result.Add(Availability, localcaseID);

            }
            return result;
        }

        public List<OnetoManyMap> getCharacteristics(int caseID, int productID, string countryID)
        {
            DispSubProductBAL objDispSubProductBAL = new DispSubProductBAL();
            //objDispSubProductBAL.getProductLevel(79);
            int local_sCLLevel = 2;//for BT One voice product level cd
           //int caseID = int.Parse(objBTOneVoiceDAL.getCaseID(int.Parse(regionID), int.Parse(countryID),productID));
            DataTable dtCharacteristics = objBTOneVoiceDAL.FetchCharacteristics(caseID, local_sCLLevel,
                                                                                Constant.C_HUB_SITE_LEVEL,
                                                                                Constant.C_PORT_SPEED, productID);


            var charList = new TupleList<string, string>();

            foreach (DataRow dr in dtCharacteristics.Rows)
            {
                if (Convert.ToString(dr["avail_desc"]) != string.Empty && (Convert.ToString(dr["char_name"]) != "CPE Product Bundles")
                    && Convert.ToString(dr["char_name"]) != "CPE Maintenance Options")
                {
                    charList.Add(dr["char_name"].ToString(), dr["avail_desc"].ToString());
                }   
            }
            DataTable dtCharacteristics1 = objBTOneVoiceDAL.FetchCharacteristics1(caseID, local_sCLLevel,
                                                                                Constant.C_HUB_SITE_LEVEL,
                                                                                Constant.C_PORT_SPEED, productID);

            var grouped = from table in dtCharacteristics1.AsEnumerable()
                          group table by new { placeCol = table["PRODUCT_CAT_NAME"] } into groupby
                          select new
                          {
                              Value = groupby.Key,
                              ColumnValues = groupby
                          };

            List<OnetoManyMap> lsRes = new List<OnetoManyMap>();
            
            foreach (var key in grouped)
            {
                OnetoManyMap objOnetoManyMap = new OnetoManyMap();

                objOnetoManyMap.PRODUCT_CAT_NAME = key.Value.placeCol.ToString();
                objOnetoManyMap.PRODUCTList = new List<Product>();
                foreach (var columnValue in key.ColumnValues)
                {
                    Product p = new Product();
                    p.ProductName = Convert.ToString(columnValue["PRODUCT_NAME"]);
                    p.ProductID = Convert.ToString(columnValue["PRODUCT_CD"]);

                    if (productID == 108)//for ICG
                    {
                        p.validCaseCount = objBTOneVoiceDAL.getValidCaseCount(int.Parse(p.ProductID), int.Parse(countryID)); //Convert.ToString(columnValue["casecount"]);
                    }
                    if (productID == 79)
                    {
                        p.validCaseCount = objBTOneVoiceDAL.getCaseCountForOneVoice(int.Parse(p.ProductID), int.Parse(countryID), objOnetoManyMap.PRODUCT_CAT_NAME);
                    }
                    
                    objOnetoManyMap.PRODUCTList.Add(p);

                    objOnetoManyMap.charList = charList;
                }
                lsRes.Add(objOnetoManyMap);
            }

            return lsRes;
        }

        public string GeteCityID(int countryId, int regionId)
        {
            return objBTOneVoiceDAL.GetCityId(countryId, regionId);
        }
    }
}
