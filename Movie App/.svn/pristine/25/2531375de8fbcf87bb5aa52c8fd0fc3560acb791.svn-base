using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using SCSearchDAL;
using System.Data;

namespace SCSearchBAL
{
    public class DispSubProductBAL
    {
        public int sAccess_Level = 1;//have to get from session of old app
        public string sLdapGFR = "dummy";//have to get from session
        private string GfrCode = "empty";//have to get from  server
        public int sDistributorId = 0;//have to get from session

        public string parentProdCaseID = string.Empty;
        public string local_sCLLevel = "";
        private string sHyperlink = "";//have to get from session
        private string ServiceType = "1";
        private int launchCount = 1;
        public int C_END_USER;
        public int localCaseId = 0;
        public string strSubproduct = "";
        public string strSubproductID = "";
        DispSubProductDAL objDispSubProductDAL = new DispSubProductDAL();
        public int prodID;
        public string ParentProductID;
        public string ParentProductName;

        private string dispMPLSProdchar = string.Empty;
        private string dispMPLSsubProdchar = string.Empty;


        public int getSegCount(int accessLevel, string GfrCode, string SegregationCode)
        {
            int segCount = 1;

            if (accessLevel != Constant.C_SUPER_USER && sAccess_Level != Constant.C_PRODUCT_OWNER)
            {
                segCount = int.Parse(objDispSubProductDAL.getGFRCount(GfrCode, SegregationCode, prodID));
            }
            return segCount;
        }



        public SupProduct getProductLevel(int prodID)
        {
            SupProduct objSubprod = new SupProduct();
            DataTable dtProductLevel = objDispSubProductDAL.getProductLevelServiceType(prodID);
            foreach (DataRow dr in dtProductLevel.Rows)
            {
                local_sCLLevel = dr["PRODUCT_LOC_LEVEL_CD"].ToString();
                ServiceType = dr["SERVICE_TYPE_CD"].ToString();
                ParentProductID = Convert.ToString(dr["PARENT_PRODUCT_CD"]);
                ParentProductName = Convert.ToString(dr["PARENT_PRODUCT_NAME"]);
            }


            objSubprod.ProdLocationLvl = int.Parse(local_sCLLevel);
            return objSubprod;
        }

        public List<SubprodCharacteristics> getProdCharecteristic(int localCaseId)
        {
            DataTable dtProdChar = objDispSubProductDAL.FetchProdCharecteristics(localCaseId, 2, Constant.C_HUB_SITE_LEVEL, Constant.C_PORT_SPEED);
            var grouped = from table in dtProdChar.AsEnumerable()
                          group table by new { placeCol = table["char_type_alias"] } into groupby
                          select new
                          {
                              Value = groupby.Key,
                              ColumnValues = groupby
                          };

            List<SubprodCharacteristics> lsRes = new List<SubprodCharacteristics>();
            foreach (var key in grouped)
            {
                SubprodCharacteristics objSubprodChar = new SubprodCharacteristics();

                objSubprodChar.CharTypeAlias = key.Value.placeCol.ToString() == "NOTE" ? "Note" : key.Value.placeCol.ToString();

                //we should not display PARENT PORT SPEEDS
                if (objSubprodChar.CharTypeAlias.ToUpper() == "PARENT PORT SPEEDS") { continue; }

                objSubprodChar.chars = new List<SubprodChar>();
                foreach (var columnValue in key.ColumnValues)
                {
                    SubprodChar s = new SubprodChar();
                    s.CharName = Convert.ToString(columnValue["char_name"]);
                    //if (Convert.ToString(columnValue["CHAR_TYPE_ID"]) == "21")//for CPE LeadTime
                    //{
                    //    //if char_value_2 is not empty then value should be char_value - char_value_2 char_unit_of_measure
                    //    //else char_value char_unit_of_measure
                    //    s.CharValue = string.IsNullOrEmpty(Convert.ToString(columnValue["CHAR_VALUE_2"])) ?
                    //           Convert.ToString(columnValue["char_value"]) + " " +
                    //           Convert.ToString(columnValue["char_unit_of_measure"]) :
                    //           Convert.ToString(columnValue["char_value"]) + "-" + Convert.ToString(columnValue["char_value_2"]) + " " +
                    //           Convert.ToString(columnValue["char_unit_of_measure"]);

                    //}
                    //else
                    //{
                    //    s.CharValue = string.IsNullOrEmpty(Convert.ToString(columnValue["char_value"])) ?
                    //      Convert.ToString(columnValue["Avail_desc"]) : Convert.ToString(columnValue["char_value"]) + " " +
                    //      Convert.ToString(columnValue["char_unit_of_measure"]);
                    //}
                    if (Convert.ToString(columnValue["char_value_2"]) == "")
                    {
                        if (Convert.ToString(columnValue["char_value"]) == "")
                        {
                            s.CharValue = Convert.ToString(columnValue["Avail_desc"]);
                        }
                        else
                        {
                            s.CharValue = string.IsNullOrEmpty(Convert.ToString(columnValue["char_value"])) ?
                              Convert.ToString(columnValue["Avail_desc"]) : Convert.ToString(columnValue["char_value"]) + " " +
                              Convert.ToString(columnValue["char_unit_of_measure"]);
                        }
                    }
                    else
                    {
                        s.CharValue = Convert.ToString(columnValue["char_value"]) + " - " + Convert.ToString(columnValue["char_value_2"]) + " " + Convert.ToString(columnValue["char_unit_of_measure"]);
                    }

                    objSubprodChar.chars.Add(s);
                }
                lsRes.Add(objSubprodChar);
            }

            return lsRes;
        }

        public SupProductList HeaderMessage(string prodID, string regionID, string countryID, string cityID,
            string popId, int CapmanPlatformId, int sAccess_Level, string GfrCode, string SegregationCode)
        {
            string validsubproductCount = "";
            //int CapmanPlatformId = -1;
            this.prodID = int.Parse(prodID);
            SupProductList objSupProductList = new SupProductList();
            objSupProductList.lstSubProd = new List<SupProduct>();
            objSupProductList.genericVoiceChar = new List<SubprodCharacteristics>();
            getProductLevel(int.Parse(prodID));

            DataTable dtSubProdName = objDispSubProductDAL.getSubproductName(int.Parse(local_sCLLevel),
                                                                           Constant.C_COUNTRY_LEVEL,
                                                                           Constant.C_CITY_LEVEL,
                                                                           Constant.C_HUB_SITE_LEVEL,
                                                                           int.Parse(prodID),
                                                                           int.Parse(regionID),
                                                                           int.Parse(countryID),
                                                                           int.Parse(cityID),
                                                                           int.Parse(popId), sAccess_Level, Constant.C_END_USER, CapmanPlatformId);

            DataTable dtSubprodLaunchCount = objDispSubProductDAL.getcountforSubproductandlaunch(int.Parse(prodID));

            foreach (DataRow dr in dtSubprodLaunchCount.Rows)
            {
                launchCount = Convert.ToInt32(Convert.ToString(dr["launchCount"]));
                validsubproductCount = dr["validSubproductcount"].ToString();
            }
            objSupProductList.segmentCount = getSegCount(sAccess_Level, GfrCode, SegregationCode);

            if (objSupProductList.segmentCount != 0)
            {
                string genericVoiceCaseID = getGenericVoiceCaseID(int.Parse(regionID),int.Parse(countryID));
                if (genericVoiceCaseID != "0") 
                {
                  objSupProductList.genericVoiceChar =  getProdCharecteristic(int.Parse(genericVoiceCaseID));
                }
            }

            if (objSupProductList.segmentCount == 0)
            {
                objSupProductList.warningMsg = "You do not have permission to view this case! Please contact the Sales Catalogue Administrator";
            }
            else if (int.Parse(validsubproductCount) == 0)
            {
                objSupProductList.warningMsg = "No valid Subproducts found! Please contact the Sales Catalogue Administrator";
            }
            if (sAccess_Level == Constant.C_END_USER && launchCount == 0)
            {
                objSupProductList.warningMsg = "No valid subproducts found for the end user ! Please contact the Sales Catalogue Administrator";
            }
            else if (dtSubProdName.Rows.Count == 0)
            {
                objSupProductList.warningMsg = "No Cases record found! Please contact the Sales Catalogue Administrator";
            }
            else
            {
                objSupProductList.warningMsg = "Features not entered into Sales Catalogue should be considered Not Available.";
                foreach (DataRow dr in dtSubProdName.Rows)
                {
                    SupProduct objSupProduct = new SupProduct();
                    objSupProduct.localCaseId = dr["Case_id"].ToString();
                    objSupProduct.SubProdName = dr["subproduct_Name"].ToString();
                    objSupProduct.SubProdID = dr["subproduct_cd"].ToString();
                    objSupProduct.AvailabilityDesc = Convert.ToString(dr["Avail_desc"]);
                    objSupProduct.useCpeSubproduct = Convert.ToString(dr["use_cpe_subproduct"]);
                        DataTable dtNetworkName = objDispSubProductDAL.getNetworkName(int.Parse(objSupProduct.localCaseId));
                        foreach (DataRow dr1 in dtNetworkName.Rows)
                        {
                            objSupProduct.NetworkName = Convert.ToString(dr1["Network_Name"]);
                            objSupProduct.SupprotResPOP = Convert.ToString(dr1["Support_Resilient"]);
                        }
                    objSupProduct.ParentProdID = this.ParentProductID;
                    objSupProduct.ParentProductName = this.ParentProductName;
                    objSupProduct.ProdLocationLvl = int.Parse(this.local_sCLLevel);
                    objSupProduct.ServiceTypeID = int.Parse(this.ServiceType);
                    objSupProduct.CapmanPlatformId = Convert.ToString(dr["CAPMAN_PLATFORM_ID"]) == string.Empty ? 0 : int.Parse(Convert.ToString(dr["CAPMAN_PLATFORM_ID"]));

                    if (objSupProduct.ParentProdID != "0")
                    {
                        if (string.IsNullOrEmpty(parentProdCaseID))
                        {
                            this.parentProdCaseID = objDispSubProductDAL.getParentCaseID(objSupProduct.ParentProdID, popId, CapmanPlatformId);
                        }

                    }
                    objSupProduct.parentProdCaseID = this.parentProdCaseID;
                    objSupProductList.lstSubProd.Add(objSupProduct);

                }
            }

            return objSupProductList;

        }


        public TupleList<string, string> displayMPLS(int ProductID, int subProdID)
        {
            DataTable dtDispMPLS = objDispSubProductDAL.getDistMPLS(ProductID, subProdID);
            var dispMPLS = new TupleList<string, string>();
            foreach (DataRow dr in dtDispMPLS.Rows)
            {
                dispMPLSProdchar = Convert.ToString(dr["DISPLAY_MPLS_PRODUCT"]);
                dispMPLSsubProdchar = Convert.ToString(dr["DISPLAY_MPLS_SUBPRODUCT"]);
                dispMPLS.Add(dispMPLSProdchar, dispMPLSsubProdchar);
            }
            return dispMPLS;
        }

        public TupleList<string, string> FetchPopCharsubprod(string SiteID, string ProductID, string subProdID)
        {
            //DataTable dtDispMPLS = objDispSubProductDAL.getDistMPLS(int.Parse(ProductID), int.Parse(subProdID));

            //foreach (DataRow dr in dtDispMPLS.Rows)
            //{
            //  dispMPLSProdchar = Convert.ToString(dr["DISPLAY_MPLS_PRODUCT"]);
            // dispMPLSsubProdchar = Convert.ToString(dr["DISPLAY_MPLS_SUBPRODUCT"]);
            //}
            var PopCharList = new TupleList<string, string>();

            try
            {
                DataTable dtPopchar = objDispSubProductDAL.GetsubProdPopChar(int.Parse(SiteID),
                                                                             int.Parse(ProductID),
                                                                             int.Parse(subProdID), 1);

                foreach (DataRow dr in dtPopchar.Rows)
                {
                    PopCharList.Add(dr[0].ToString(), dr[2].ToString());
                }
            }
            catch (Exception ex) { throw ex; }
            return PopCharList;
        }

        public AccSuppPortSpeed GetAccSuppPortSpeed(int localCaseId, int sAccessLevel, string sLdapGFR,
            int distributorID, int access, int hubSiteID, int countryId)
        {
            DataTable dtAccSuppPortSpeed = objDispSubProductDAL.GetAccSuppPortSpeed(localCaseId, sAccess_Level,
                                                     Constant.C_SUPER_USER, sLdapGFR, distributorID,
                                                      access, hubSiteID, countryId);
            int TenMbps = 2256;
            int SelectedPortSpeed = 0;
            bool isTenMbpsExist = false;
            AccSuppPortSpeed objAccSuppPortSpeed = null;
            if (dtAccSuppPortSpeed != null && dtAccSuppPortSpeed.Rows.Count > 0)
            {
                objAccSuppPortSpeed = new AccSuppPortSpeed();
                objAccSuppPortSpeed.lstAccSupp = new List<SubProdAccSupp>();


                var queryAccSupp = dtAccSuppPortSpeed.AsEnumerable()
                            .Select(row => new
                            {
                                attribute1_name = row.Field<decimal>("access_supplier_char_id"),
                                attribute2_name = row.Field<string>("char_name")
                            })
                            .Distinct().ToList();


                foreach (var item in queryAccSupp)
                {
                    SubProdAccSupp obj = new SubProdAccSupp();
                    obj.AccessSupplierID = int.Parse(item.attribute1_name.ToString());
                    obj.AccessSupplierName = item.attribute2_name;
                    objAccSuppPortSpeed.lstAccSupp.Add(obj);
                }

                var queryPortSpeed = dtAccSuppPortSpeed.AsEnumerable()
                            .Select(row => new
                            {
                                attribute1 = row.Field<decimal>("pspeedid"),
                                attribute2 = row.Field<string>("portspeed")
                            })
                            .Distinct().ToList();


                SubPortSpeedDet pSpeedDet = new SubPortSpeedDet();
                List<SubPortSpeed> pSpeed = new List<SubPortSpeed>();

                foreach (var item in queryPortSpeed)
                {
                    if (TenMbps == Convert.ToInt32(item.attribute1.ToString()))
                    {
                        SelectedPortSpeed = TenMbps;
                        isTenMbpsExist = true;
                    }
                    SubPortSpeed AccSuplier = new SubPortSpeed()
                    {
                        PortSpeedID = Convert.ToInt32(item.attribute1.ToString()),
                        PortSpeedName = item.attribute2
                    };
                    pSpeed.Add(AccSuplier);
                    if (!isTenMbpsExist)
                    {
                        SelectedPortSpeed = Convert.ToInt32(item.attribute1.ToString());
                    }
                }
                pSpeedDet.pSpeed = pSpeed;
                pSpeedDet.SelectedPortSpeed = SelectedPortSpeed;

                objAccSuppPortSpeed.lstPortSpeed = pSpeedDet;
            }

            return objAccSuppPortSpeed;
        }

        public void getPortSpeedGridData(int caseId, string selectedSupplier, int hubSiteId, int productId, string selectedPortSpeed)
        {
            objDispSubProductDAL.getPortSpeedGridData(caseId, selectedSupplier, hubSiteId, productId, selectedPortSpeed);
        }

        public List<CISReport> getCISReport(int prodId)
        {
            DataTable dt = objDispSubProductDAL.getCISReport(prodId);

            List<CISReport> lstRep = new List<CISReport>();
            string tempReg = string.Empty;
            foreach (DataRow dr in dt.Rows)
            {
                CISReport obj = new CISReport();

                obj.countryID = Convert.ToString(dr["country_id"]);
                obj.countryName = Convert.ToString(dr["country_name"]);
                obj.regID = Convert.ToString(dr["region_id"]);
                obj.regName = Convert.ToString(dr["region_name"]);
                if (Convert.ToString(dr["region_name"]) != tempReg)
                {
                    obj.dispRegName = Convert.ToString(dr["region_name"]);
                    tempReg = Convert.ToString(dr["region_name"]);
                }
                lstRep.Add(obj);
            }

            return lstRep;
        }

        public string getGenericVoiceCaseID(int regionID, int countryID)
        {
            BTOneVoiceDAL objBTOneVoiceDAL = new BTOneVoiceDAL();
            string caseID = objBTOneVoiceDAL.getCaseID(regionID, countryID, Constant.PRODUCT_GLOBAL_VOICE) == "" ? "0" :
                objBTOneVoiceDAL.getCaseID(regionID, countryID, Constant.PRODUCT_GLOBAL_VOICE);
            return caseID;
        }

        public CISReportDetails getCISAccessType(int regionID)
        {
            //List<CISReportDetails> lstReport = new List<CISReportDetails>();
            CISReportDetails objCISReportDetails = new CISReportDetails();
            objCISReportDetails.charecteristics = new List<CISCharecteristics>();
            objCISReportDetails.AccessTypeHeader = new List<string>();
            DataTable dtChar = objDispSubProductDAL.getCISAccessTypeHeader(Constant.PRODUCT_CIS, Constant.VALIDCODE);
            string charId = string.Empty;
            List<string> tempCharName = new List<string>();
            List<string> tempList = new List<string>();
            foreach (DataRow dr in dtChar.Rows)
            {

                charId += Convert.ToString(dr["char_id"]) + ",";
                objCISReportDetails.AccessTypeHeader.Add(Convert.ToString(dr["char_name"]));
            }
            charId = charId.TrimEnd(',');
            DataTable dtCountryCity = objDispSubProductDAL.getCISCountryCity(regionID, charId, Constant.PRODUCT_CIS, Constant.VALIDCODE);

            foreach (DataRow dr1 in dtCountryCity.Rows)
            {
                CISCharecteristics objCISCharecteristics = new CISCharecteristics();
                objCISCharecteristics.orgCountry = Convert.ToString(dr1["country_name"]);
                objCISCharecteristics.orgCity = Convert.ToString(dr1["city_name"]);
                objCISCharecteristics.charAvailability = new List<string>();
                for (int i = 0; i < 14; i++)
                    objCISCharecteristics.charAvailability.Add("");

                var charAvail = Convert.ToString(dr1[4]).Split(',').ToList();

                foreach (string c in charAvail)
                {
                    int index = 0;
                    foreach (string tempChar in objCISReportDetails.AccessTypeHeader)
                    {
                        if (c.Contains(tempChar))
                        {
                            objCISCharecteristics.charAvailability[index] = c.Split('-')[1].ToString();
                        }
                        index++;
                    }
                }

                //objCISCharecteristics.charAvailability = Convert.ToString(dr[4]);
                objCISReportDetails.charecteristics.Add(objCISCharecteristics);
            }
            return objCISReportDetails;
        }

        public string GetSubProductCount(int prodID)
        {
            return objDispSubProductDAL.GetSubProductCount(prodID);
        }
    }
}
