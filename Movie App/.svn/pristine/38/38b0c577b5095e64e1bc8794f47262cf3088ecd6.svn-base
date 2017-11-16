using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using SCSearchBAL;
using System.Web.Services;
using System.Data;
using System.Collections;

namespace SCSearch
{
    public partial class PrivateLine : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [WebMethod]
        public static PrivateLineRegions GetCountryCityIds(int HubPart, int Priority, int Country1ID, int Country2ID, int City1ID, int City2ID, int PortSpeed, int ProductID)
        {
            PrivateLineRegions pr = new PrivateLineRegions();
            PrivateLineBAL bal = new PrivateLineBAL();
            int City1_ID = bal.GetCityID(Country1ID, City1ID, PortSpeed, ProductID);
            pr.Country1 = Country1ID;
            pr.City1 = City1_ID;
            int City2_ID = bal.GetCityID(Country2ID, City2ID, PortSpeed, ProductID);
            pr.Country2 = Country2ID;
            pr.City2 = City2_ID;

            int City1_ID1 = bal.GetCityIDNew(Country2ID, City2_ID, PortSpeed, ProductID,Country1ID);
            int City2_ID1 = bal.GetCityIDNew(Country1ID, City1ID, PortSpeed, ProductID, Country2ID);

            if (City1_ID1 > 0)
            {
                City1_ID = City1_ID1;
                pr.City1 = City1_ID;
            }

            if (City2_ID1 > 0)
            {
                City2_ID = City2_ID1;
                pr.City2 = City2_ID;
            }

            Hashtable ht = bal.GetGeneralDetails(Priority, ProductID, Country1ID, Country2ID, City1_ID, City2_ID, PortSpeed);

            if (ht != null && ht.Count > 0)
            {

                if (Convert.ToInt32(ht["SubProduct2"].ToString()) == 0)
                    pr.Hubbing = 0;
                else
                {
                    pr.Hubbing = 1;
                    pr.IgnoreHubbing = 0;
                    DataSet dsSub = bal.GetSubProds(ProductID);
                    if (dsSub != null && dsSub.Tables.Count > 0 && dsSub.Tables[0].Rows.Count > 0)
                    {
                        foreach (DataRow item in dsSub.Tables[0].Rows)
	                    {
		                     if((Convert.ToInt32(ht["SubProduct1"].ToString())== Convert.ToInt32(item["subProduct_cd1"].ToString()) && Convert.ToInt32(ht["SubProduct2"].ToString())==Convert.ToInt32(item["subProduct_cd2"].ToString())) || (Convert.ToInt32(ht["SubProduct1"].ToString())==Convert.ToInt32(item["subProduct_cd2"].ToString()) && Convert.ToInt32(ht["SubProduct2"].ToString())==Convert.ToInt32(item["subProduct_cd1"].ToString())))
                             {
                                 pr.Hubbing = 0;
                                 pr.IgnoreHubbing = 1;
                                 break;
                             }
	                    }
                       
                    }

                }

                string ProductPricing = "";
                if (pr.IgnoreHubbing == 0)
                {

                    if (Convert.ToInt32(ht["SubProduct1"].ToString()) == 33 && Convert.ToInt32(ht["SubProduct2"].ToString()) == 33)
                        ProductPricing = "PL Connect ROW(FCS+FCS)";
                    else if ((Convert.ToInt32(ht["SubProduct1"].ToString()) == 33 && Convert.ToInt32(ht["SubProduct2"].ToString()) == 34) || (Convert.ToInt32(ht["SubProduct1"].ToString()) == 34 && Convert.ToInt32(ht["SubProduct2"].ToString()) == 33))
                        ProductPricing = "PL Connect ROW(FCS+HC UK Out)";
                    else if (Convert.ToInt32(ht["SubProduct1"].ToString()) == 34 && Convert.ToInt32(ht["SubProduct2"].ToString()) == 34)
                        ProductPricing = "PL Connect ROW(Individual Case Basis)";
                    else if (Convert.ToInt32(ht["SubProduct1"].ToString()) == 31)
                        ProductPricing = "BT Private Line";
                    else if (Convert.ToInt32(ht["SubProduct1"].ToString()) == 34)
                        ProductPricing = "PL Connect HC(UK Out)";
                    else
                    {
                        DataSet ds = bal.GetSubProductName(Convert.ToInt32(ht["SubProduct1"].ToString()));

                        if (ds != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
                        {
                            ProductPricing = ds.Tables[0].Rows[0]["subproduct_name"].ToString() + "(" + ds.Tables[0].Rows[0]["subproduct_abbr"].ToString() + ")";
                        }
                    }
                }
                else
                {
                    if ((Convert.ToInt32(ht["SubProduct1"].ToString()) == 31 && Convert.ToInt32(ht["SubProduct2"].ToString()) == 33) || (Convert.ToInt32(ht["SubProduct1"].ToString()) == 33 && Convert.ToInt32(ht["SubProduct2"].ToString()) == 31))
                    {
                        ProductPricing = "PL Connect ROW (PL+PLC FCS)";
                    }
                    else if ((Convert.ToInt32(ht["SubProduct1"].ToString()) == 31 && Convert.ToInt32(ht["SubProduct2"].ToString()) == 34) || (Convert.ToInt32(ht["SubProduct1"].ToString()) == 34 && Convert.ToInt32(ht["SubProduct2"].ToString()) == 31))
                    {
                        ProductPricing = "PL Connect ROW (PL+PLC HC UK Out)";
                    }
                }
                pr.ProductPricing=ProductPricing;
                if (Convert.ToInt32(ht["UKCOUNTRYID"].ToString()) == 67 && HubPart == 1 && pr.Hubbing == 1)
                {
                    pr.Country2 = 67;
                    pr.City2 = 642;
                }
                else if (Convert.ToInt32(ht["UKCOUNTRYID"].ToString()) == 67 && HubPart == 2 && pr.Hubbing == 1)
                {
                    pr.Country1 = 67;
                    pr.City1 = 642;
                }
            }
            return pr;
        }

        [WebMethod]
        public static PrivateLineGeneralInfo GetGeneralInfo(int Priority, int ProductCode, int Country1ID, int Country2ID, int City1ID, int City2ID, int PortSpeedID)
        {
            PrivateLineBAL bal = new PrivateLineBAL();
            PrivateLineGeneralInfo info = new PrivateLineGeneralInfo();

            Hashtable ht = bal.GetGeneralDetails(Priority, ProductCode, Country1ID, Country2ID, City1ID, City2ID, PortSpeedID);
            int SubProduct1 = 0, SubProduct2 = 0;
            if (ht != null && ht.Count > 0)
            {
                SubProduct1 = Convert.ToInt32(ht["SubProduct1"].ToString());
                SubProduct2 = Convert.ToInt32(ht["SubProduct2"].ToString());
                info.UKCountryID = Convert.ToInt32(ht["UKCOUNTRYID"].ToString());
                //info.CountryID = Convert.ToInt32(ht["UKCOUNTRYID"].ToString());
                //if (Convert.ToInt32(ht["UKCOUNTRYID"].ToString()) == 67)
                //{
                //    info.CityID = 642;
                //}
                info.SubProduct1 = SubProduct1;
                info.SubProduct2 = SubProduct2;
                if (SubProduct1 == 31)
                {
                    info.ProductCode = "GPRLN";
                }
                else
                {
                    info.ProductCode = "GPRLC";
                }

                if (SubProduct1 == 33 && SubProduct2 == 33)
                    info.ProductPricing = "PL Connect ROW(FCS+FCS)";
                else if ((SubProduct1 == 33 && SubProduct2 == 34) || (SubProduct1 == 34 && SubProduct2 == 33))
                    info.ProductPricing = "PL Connect ROW(FCS+HC UK Out)";
                else if (SubProduct1 == 34 && SubProduct2 == 34)
                    info.ProductPricing = "PL Connect ROW(Individual Case Basis)";
                else if (SubProduct1 == 31)
                    info.ProductPricing = "BT Private Line";
                else
                {
                    DataSet ds = bal.GetSubProductName(SubProduct1);

                    if (ds != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
                    {
                        info.ProductPricing = ds.Tables[0].Rows[0]["subproduct_name"].ToString() + "(" + ds.Tables[0].Rows[0]["subproduct_abbr"].ToString() + ")";
                    }
                }
                info.NumberOfPriorty = Priority;
                info.ProductPriority = new List<int>();
                for (int i = 1; i <= Convert.ToInt32(ht["numPriorities"].ToString()); i++)
                {
                    info.ProductPriority.Add(i);
                }
            }


            //if (dsGeneral != null && dsGeneral.Tables.Count > 0 && dsGeneral.Tables[0].Rows.Count > 0)
            //{
            //    info.NumberOfPriorty =dsGeneral.Tables[0].Rows[0][0].ToString();
            //    info.SubProductCode1 = dsGeneral.Tables[0].Rows[0][3].ToString();
            //    info.SubProductCode2 = dsGeneral.Tables[0].Rows[0][6].ToString();
            //}



            return info;
        }

        [WebMethod]
        public static PrivateLineCountryCity GetCountryName(int CountryID, int CityID)
        {
            PrivateLineBAL bal = new PrivateLineBAL();
            DataSet dsCountry = bal.GetCountryName(CountryID, CityID);
            string CountryName = "";
            PrivateLineCountryCity cc = new PrivateLineCountryCity();
            if (dsCountry != null && dsCountry.Tables.Count > 0 && dsCountry.Tables[0].Rows.Count > 0)
            {
                cc.CountryName = dsCountry.Tables[0].Rows[0]["COUNTRY_NAME"].ToString();
                cc.CityName = dsCountry.Tables[0].Rows[0]["city_name"].ToString();
            }
            return cc;
        }

        [WebMethod]
        public static Carriers GetCarriers(int ProductID, int CountryID, int CityID, int SubProductID, int PortSpeed)
        {

            PrivateLineBAL bal = new PrivateLineBAL();
            Carriers crs = new Carriers();
            crs.CarrierCount = bal.GetCarriersCount(ProductID, CountryID, CityID, SubProductID, PortSpeed);
            DataSet ds = bal.GetCarriers(ProductID, CountryID, CityID, SubProductID, PortSpeed);
            if (ds != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
            {
                List<Carrier> lstcr = new List<Carrier>();
                foreach (DataRow dr in ds.Tables[0].Rows)
                {
                    Carrier cr = new Carrier() { CarrierID = Convert.ToInt32(dr["ACCESS_SUPPLIER_CHAR_ID"].ToString()), CarrierName = dr["CHAR_NAME"].ToString() };
                    lstcr.Add(cr);
                }
                crs.Carrs = lstcr;
            }
            return crs;
        }

        [WebMethod]
        public static List<PrivateLineCharacteristics> GetCharacteristics(int HubPart, int ProductID, int Country1ID, int Country2ID, int City1ID, int City2ID,
            int SubProductID1, int SubProductID2, int PortSpeed, int Carrier1ID, int Carrier2ID, int IgnoreHubbing)
        {
            PrivateLineBAL bal = new PrivateLineBAL();
            //if (HubPart == 1)
            //{
            //    Country2ID = 67;
            //    City2ID = 642;
            //}
            //else
            //{
            //    Country1ID = 67;
            //    City1ID = 642;
            //}
            DataSet dsCaseID1 = null;
            DataSet dsCaseID2 = null;
            int CaseID1 = 0, CaseID2 = 0, Case1AvailID = 0, Case2AvailID = 0;

            if (IgnoreHubbing == 0)
            {
                if (HubPart == 1)
                {
                    SubProductID2 = SubProductID1;
                }
                else
                {
                    SubProductID1 = SubProductID2;
                }
            }

            if (Carrier1ID == 0 && Carrier2ID == 0)
            {
                DataSet dsCarrierID = bal.GetCarrierID(ProductID, Country1ID, City1ID, SubProductID1, PortSpeed);
                if (dsCarrierID != null && dsCarrierID.Tables.Count > 0 && dsCarrierID.Tables[0].Rows.Count > 0)
                {
                    Carrier1ID = Convert.ToInt32(dsCarrierID.Tables[0].Rows[0]["access_supplier_char_id"].ToString());
                }

                DataSet dsCarrier2ID = bal.GetCarrierID(ProductID, Country2ID, City2ID, SubProductID2, PortSpeed);
                if (dsCarrier2ID != null && dsCarrier2ID.Tables.Count > 0 && dsCarrier2ID.Tables[0].Rows.Count > 0)
                {
                    Carrier2ID = Convert.ToInt32(dsCarrier2ID.Tables[0].Rows[0]["access_supplier_char_id"].ToString());
                }
            }

            dsCaseID1 = bal.GetCaseID(ProductID, Country1ID, City1ID, SubProductID1, PortSpeed, Carrier1ID);

            if (dsCaseID1 != null && dsCaseID1.Tables.Count > 0 && dsCaseID1.Tables[0].Rows.Count > 0)
            {
                CaseID1 = Convert.ToInt32(dsCaseID1.Tables[0].Rows[0]["CASE_ID"].ToString());
                Case1AvailID = Convert.ToInt32(dsCaseID1.Tables[0].Rows[0]["Case_Avail_cd"].ToString());
            }

            dsCaseID2 = bal.GetCaseID(ProductID, Country2ID, City2ID, SubProductID2, PortSpeed, Carrier2ID);
            if (dsCaseID2 != null && dsCaseID2.Tables.Count > 0 && dsCaseID2.Tables[0].Rows.Count > 0)
            {
                CaseID2 = Convert.ToInt32(dsCaseID2.Tables[0].Rows[0]["CASE_ID"].ToString());
                Case2AvailID = Convert.ToInt32(dsCaseID2.Tables[0].Rows[0]["Case_Avail_cd"].ToString());
            }
            int EstimatedLeadTime = 0;
            //if (HubPart == 1)
            //{
            //    EstimatedLeadTime = bal.GetEstimatedLeadTime(CaseID1);
            //}
            //else
            //{
            //    EstimatedLeadTime = bal.GetEstimatedLeadTime(CaseID2);
            //}
            int GlobalLeadTime=0;
            if (ProductID == 58 && SubProductID1 != 31 && SubProductID2 != 31)
            {
                if (!(IgnoreHubbing == 0 && Country1ID == 67 && HubPart == 2))
                {

                    if (dsCaseID1 != null && dsCaseID1.Tables.Count > 0 && dsCaseID1.Tables[0].Rows.Count > 0)
                    {
                        foreach (DataRow item in dsCaseID1.Tables[0].Rows)
                        {
                            GlobalLeadTime = bal.GetEstimatedLeadTime(Convert.ToInt32(dsCaseID1.Tables[0].Rows[0]["CASE_ID"].ToString()));
                            if (GlobalLeadTime > EstimatedLeadTime)
                            {
                                EstimatedLeadTime = GlobalLeadTime;
                            }
                        }
                    }

                }

                if (!(IgnoreHubbing == 0 && Country2ID == 67 && HubPart == 1))
                {
                    if (dsCaseID2 != null && dsCaseID2.Tables.Count > 0 && dsCaseID2.Tables[0].Rows.Count > 0)
                    {
                        foreach (DataRow item in dsCaseID2.Tables[0].Rows)
                        {
                            GlobalLeadTime = bal.GetEstimatedLeadTime(Convert.ToInt32(dsCaseID2.Tables[0].Rows[0]["CASE_ID"].ToString()));
                            if (GlobalLeadTime > EstimatedLeadTime)
                            {
                                EstimatedLeadTime = GlobalLeadTime;
                            }
                        }
                    }
                }
            }
            else if (ProductID == 58 && SubProductID1 != 31)
            {
                if (!(IgnoreHubbing == 0 && Country1ID == 67 && HubPart == 2))
                {
                    if (dsCaseID1 != null && dsCaseID1.Tables.Count > 0 && dsCaseID1.Tables[0].Rows.Count > 0)
                    {
                        foreach (DataRow item in dsCaseID1.Tables[0].Rows)
                        {
                            GlobalLeadTime = bal.GetEstimatedLeadTime(Convert.ToInt32(dsCaseID1.Tables[0].Rows[0]["CASE_ID"].ToString()));
                            if (GlobalLeadTime > EstimatedLeadTime)
                            {
                                EstimatedLeadTime = GlobalLeadTime;
                            }
                        }
                    }
                }
            }
            else if (ProductID == 58 && SubProductID2 != 31)
            {
                if (!(IgnoreHubbing == 0 && Country2ID == 67 && HubPart == 1))
                {
                    if (dsCaseID2 != null && dsCaseID2.Tables.Count > 0 && dsCaseID2.Tables[0].Rows.Count > 0)
                    {
                        foreach (DataRow item in dsCaseID2.Tables[0].Rows)
                        {
                            GlobalLeadTime = bal.GetEstimatedLeadTime(Convert.ToInt32(dsCaseID2.Tables[0].Rows[0]["CASE_ID"].ToString()));
                            if (GlobalLeadTime > EstimatedLeadTime)
                            {
                                EstimatedLeadTime = GlobalLeadTime;
                            }
                        }
                    }
                }
            }

            DataSet ds1 = bal.GetCharacteristics(CaseID1, IgnoreHubbing, SubProductID1, SubProductID2);
            DataSet ds2 = bal.GetCharacteristics(CaseID2, IgnoreHubbing, SubProductID1, SubProductID2);
            List<PrivateLineCharacteristics> lstCharacteristics = new List<PrivateLineCharacteristics>();
            ServiceLeadTime sl = new ServiceLeadTime();
            if (ds1 != null && ds1.Tables.Count > 0 && ds1.Tables[0].Rows.Count > 0)
            {
                PrivateLineCharacteristics pcOneStop = null;
                PrivateLineCharacteristics pcTM = null;
                PrivateLineCharacteristics pcPL = null;
                PrivateLineCharacteristics pcGeneral = null;

                sl.EstimatedLeadTime = EstimatedLeadTime;

                sl.CaseID1 = CaseID1;
                sl.CaseID2 = CaseID2;
                //sl.ProductPricing=ProductPricing;
                for (int i = 0; i < ds1.Tables[0].Rows.Count; i++)
                {

                    if (ds1.Tables[0].Rows[i]["CHAR_TYPE_ID"].ToString() == "643") // One Stop Shopping Options
                    {

                        if (pcOneStop == null)
                        {
                            pcOneStop = new PrivateLineCharacteristics();
                            pcOneStop.lstChars = new List<PrivateLineChars>();
                        }

                        if (IgnoreHubbing == 0)
                        {
                            if (string.IsNullOrEmpty(pcOneStop.CharTypeName))
                            {
                                if (lstCharacteristics.Where(t => t.CharTypeName.ToLower() == "One Stop Shopping Options".ToLower()).Count() > 0)
                                {
                                    pcOneStop = lstCharacteristics.Where(t => t.CharTypeName.ToLower() == "One Stop Shopping Options".ToLower()).SingleOrDefault();
                                }
                                pcOneStop.CharTypeName = ds1.Tables[0].Rows[i]["char_type_name"].ToString();
                            }

                            //if (string.IsNullOrEmpty(pcOneStop.CharTypeName))
                            //    pcOneStop.CharTypeName = ds1.Tables[0].Rows[i]["char_type_name"].ToString();

                            PrivateLineChars pchars = new PrivateLineChars();
                            if ((ds1.Tables[0].Rows[i]["case_detail_valid_cd"].ToString() == "1" && ds1.Tables[0].Rows[i]["char_avail_cd"].ToString() == "1") || (ds2.Tables[0].Rows[i]["case_detail_valid_cd"].ToString() == "1" && ds2.Tables[0].Rows[i]["char_avail_cd"].ToString() == "1"))
                            {

                                if (ds1.Tables[0].Rows[i]["char_value"].ToString().ToUpper() == "Y" || ds2.Tables[0].Rows[i]["char_value"].ToString().ToUpper() == "Y")
                                {
                                    pchars.CharName = ds1.Tables[0].Rows[i]["char_name"].ToString();
                                    pchars.isChecked = 1;
                                }
                                else
                                {
                                    pchars.CharName = ds1.Tables[0].Rows[i]["char_name"].ToString();
                                    pchars.isChecked = 0;
                                }
                            }
                            else
                            {
                                if (ds1.Tables[0].Rows[i]["char_name"].ToString().ToLower() != "remark")
                                {
                                    pchars.CharName = ds1.Tables[0].Rows[i]["char_name"].ToString();
                                    pchars.isChecked = 0;
                                }
                            }
                            pchars.VisibleChecBox = 1;
                            if (pchars != null && !string.IsNullOrEmpty(pchars.CharName))
                            {
                                pcOneStop.lstChars.Add(pchars);
                            }
                            PrivateLineCharacteristics pcTemp = (PrivateLineCharacteristics)lstCharacteristics.Where(t => t.CharTypeName == ds1.Tables[0].Rows[i]["char_type_name"].ToString()).FirstOrDefault();
                            if (pcTemp == null)
                            {
                                if (pcOneStop.lstChars.Count > 0)
                                {
                                    lstCharacteristics.Add(pcOneStop);
                                }
                            }
                           
                        }
                        else
                        {

                            if (string.IsNullOrEmpty(pcOneStop.CharTypeName))
                            {
                                if (lstCharacteristics.Where(t => t.CharTypeName.ToLower() == "One Stop Shopping Options".ToLower()).Count() > 0)
                                {
                                    pcOneStop = lstCharacteristics.Where(t => t.CharTypeName.ToLower() == "One Stop Shopping Options".ToLower()).SingleOrDefault();
                                }
                                pcOneStop.CharTypeName = ds1.Tables[0].Rows[i]["char_type_name"].ToString();
                            }

                            if (lstCharacteristics.Where(t => t.CharTypeName != null && t.CharTypeName.ToLower() == "One Stop Shopping Options".ToLower()).Count() > 0)
                            {
                                continue;
                            }

                            DataSet dsOneStop=bal.GetOneSideShopping(CaseID1, CaseID2, Convert.ToInt32(ds1.Tables[0].Rows[i]["char_type_id"].ToString()));
                            if (dsOneStop != null && dsOneStop.Tables.Count > 0 && dsOneStop.Tables[0].Rows.Count > 0)
                            {
                                PrivateLineChars pchars = null;
                                foreach (DataRow item in dsOneStop.Tables[0].Rows)
                                {

                                    if (item["char_id"].ToString() == "3923")
                                        continue;

                                    pchars = new PrivateLineChars();
                                    if (item["char_value"].ToString().ToUpper() == "Y")
                                    {
                                        pchars.CharName = item["char_name"].ToString();
                                        pchars.isChecked = 1;
                                        pchars.VisibleChecBox = 1;
                                    }
                                    else
                                    {
                                        pchars.CharName = item["char_name"].ToString();
                                        pchars.isChecked = 0;
                                        pchars.VisibleChecBox = 1;
                                    }

                                    if (pchars != null && !string.IsNullOrEmpty(pchars.CharName))
                                    {
                                        pcOneStop.lstChars.Add(pchars);
                                    }
                                }

                                
                                PrivateLineCharacteristics pcTemp1 = (PrivateLineCharacteristics)lstCharacteristics.Where(t => t.CharTypeName == ds1.Tables[0].Rows[i]["char_type_name"].ToString()).FirstOrDefault();
                                if (pcTemp1 == null)
                                {
                                    if (pcOneStop.lstChars.Count > 0)
                                    {
                                        lstCharacteristics.Add(pcOneStop);
                                    }
                                }

                                //If UCase(tmpRS("char_value")) = "Y" Then%>
                                //                                            <td align="CENTER" class="bodytextbold">
                                //                                                <%=tmpRS("char_name")%>
                                //                                                <br>
                                //                                                    <input type="CHECKBOX" disabled checked id="Checkbox10" name="Checkbox10"></br>
                                //                                            </td>
                                //                                            <%
                                //else
                                //                                            %>
                                //                                            <td align="CENTER" class="bodytextbold">
                                //                                                <%=tmpRS("char_name")%>
                                //                                                <br>
                                //                                                    <input type="CHECKBOX" disabled id="Checkbox11" name="Checkbox11"></br>
                                //                                            </td>
                                //                                            <%
                                //End if
                            }
                        }
                        pcOneStop = null;
                    }
                    else if (ds1.Tables[0].Rows[i]["CHAR_TYPE_ID"].ToString() == "644") //TRANSPORT MEDIUM
                    {
                        if (pcTM == null)
                        {
                            pcTM = new PrivateLineCharacteristics();
                            pcTM.lstChars = new List<PrivateLineChars>();
                        }

                        PrivateLineChars pchars = new PrivateLineChars();
                        if (IgnoreHubbing == 0)
                        {
                            if (ds1.Tables[0].Rows[i]["char_id"].ToString() == "3929" || ds1.Tables[0].Rows[i]["char_id"].ToString() == "3928")
                            {

                                if (string.IsNullOrEmpty(pcTM.CharTypeName))
                                {
                                    if (lstCharacteristics.Where(t => t.CharTypeName.ToLower() == "Transport Medium".ToLower()).Count() > 0)
                                    {
                                        pcTM = lstCharacteristics.Where(t => t.CharTypeName.ToLower() == "Transport Medium".ToLower()).SingleOrDefault();
                                    }
                                    pcTM.CharTypeName = ds1.Tables[0].Rows[i]["char_type_name"].ToString();
                                }
                                if ((ds1.Tables[0].Rows[i]["case_detail_valid_cd"].ToString() == "1" && ds1.Tables[0].Rows[i]["char_avail_cd"].ToString() == "1") || (ds2.Tables[0].Rows[i]["case_detail_valid_cd"].ToString() == "1" && ds2.Tables[0].Rows[i]["char_avail_cd"].ToString() == "1"))
                                {
                                    if (ds1.Tables[0].Rows[i]["char_value"].ToString().ToUpper() == "Y" || ds2.Tables[0].Rows[i]["char_value"].ToString().ToUpper() == "Y")
                                    {
                                        pchars.CharName = ds1.Tables[0].Rows[i]["char_name"].ToString();
                                        pchars.isChecked = 1;
                                    }
                                    else
                                    {
                                        pchars.CharName = ds1.Tables[0].Rows[i]["char_name"].ToString();
                                        pchars.isChecked = 0;
                                    }
                                }
                                else
                                {
                                    pchars.CharName = ds1.Tables[0].Rows[i]["char_name"].ToString();
                                    pchars.isChecked = 0;
                                }
                                pchars.VisibleChecBox = 1;
                                if (pchars != null && !string.IsNullOrEmpty(pchars.CharName))
                                {
                                    pcTM.lstChars.Add(pchars);
                                }
                                PrivateLineCharacteristics pcTemp = (PrivateLineCharacteristics)lstCharacteristics.Where(t => t.CharTypeName == ds1.Tables[0].Rows[i]["char_type_name"].ToString()).FirstOrDefault();
                                if (pcTemp == null)
                                {
                                    if (pcTM.lstChars.Count > 0)
                                    {
                                        lstCharacteristics.Add(pcTM);
                                    }
                                }
                                pcTM = null;
                            }

                        }
                        else
                        {

                            if (lstCharacteristics.Where(t => t.CharTypeName1 != null && t.CharTypeName1.ToLower() == "Transport Medium".ToLower()).Count() > 0)
                            {
                                continue;
                            }

                            if (string.IsNullOrEmpty(pcTM.CharTypeName))
                            {
                                DataSet dsCountry = bal.GetCountryName(Country1ID, 0);
                                string CountryName = "";
                                if (dsCountry != null && dsCountry.Tables.Count > 0 && dsCountry.Tables[0].Rows.Count > 0)
                                {
                                    CountryName = dsCountry.Tables[0].Rows[0]["country_name"].ToString();
                                }
                                pcTM.CharTypeName = "Transport Medium " + CountryName + " to UK";
                                pcTM.CharTypeName1 = "Transport Medium";
                                GetTransportData(CaseID1, Convert.ToInt32(ds1.Tables[0].Rows[i]["char_type_id"].ToString()), pcTM.lstChars);

                                if (pcTM.lstChars.Count > 0)
                                {
                                    lstCharacteristics.Add(pcTM);
                                }

                                pcTM = null;
                                pcTM = new PrivateLineCharacteristics();
                                pcTM.lstChars = new List<PrivateLineChars>();

                                dsCountry = bal.GetCountryName(Country2ID, 0);
                                CountryName = "";
                                if (dsCountry != null && dsCountry.Tables.Count > 0 && dsCountry.Tables[0].Rows.Count > 0)
                                {
                                    CountryName = dsCountry.Tables[0].Rows[0]["country_name"].ToString();
                                }
                                pcTM.CharTypeName = "Transport Medium " + CountryName + " to UK";
                                pcTM.CharTypeName1 = "Transport Medium";

                                GetTransportData(CaseID2, Convert.ToInt32(ds1.Tables[0].Rows[i]["char_type_id"].ToString()), pcTM.lstChars);

                                if (pcTM.lstChars.Count > 0)
                                {
                                    lstCharacteristics.Add(pcTM);
                                }
                            }

                            pcTM = null;
                        }
                    }
                    else if (ds1.Tables[0].Rows[i]["CHAR_TYPE_ID"].ToString() == "642") // IPL AVAILABILITY OR Private Line Services Availability 
                    {

                        if (pcPL == null)
                        {
                            pcPL = new PrivateLineCharacteristics();
                            pcPL.lstChars = new List<PrivateLineChars>();
                        }

                        PrivateLineChars pchars = new PrivateLineChars();
                        if (string.IsNullOrEmpty(pcPL.CharTypeName))
                            pcPL.CharTypeName = "Private Line Services Availability ";

                        if (IgnoreHubbing == 0)
                        {

                            if ((Case1AvailID == 1 && Case2AvailID == 1))
                            {
                                pchars.CharName = "Available";
                                pchars.isChecked = 1;

                                pchars.VisibleChecBox = 1;

                            }
                            else
                            {

                                if ((Case1AvailID == 1 && Case2AvailID == 3) || (Case1AvailID == 3 && Case2AvailID == 1) || (Case1AvailID == 3 && Case2AvailID == 3))
                                {
                                    pchars.CharName = "ICB";
                                    pchars.isChecked = 1;
                                    pchars.VisibleChecBox = 1;
                                }
                                else
                                {
                                    pchars.CharName = "Not Available";
                                    pchars.isChecked = 1;
                                    pchars.VisibleChecBox = 1;
                                }

                                if (pchars.CharName != "")
                                {
                                    pcPL.lstChars.Add(pchars);
                                }

                                pchars = new PrivateLineChars();
                                pchars.CharName = "Special Bid Code ";
                                pchars.isChecked = 0;
                                pchars.VisibleChecBox = 0;

                                if ((ds1.Tables[0].Rows[i]["case_detail_valid_cd"].ToString() == "1" && ds1.Tables[0].Rows[i]["char_avail_cd"].ToString() == "1") || (ds2.Tables[0].Rows[i]["case_detail_valid_cd"].ToString() == "1" && ds2.Tables[0].Rows[i]["char_avail_cd"].ToString() == "1"))
                                {
                                    if ((ds1.Tables[0].Rows[i]["case_detail_valid_cd"].ToString() == "1" && ds1.Tables[0].Rows[i]["char_avail_cd"].ToString() == "1") && (ds2.Tables[0].Rows[i]["case_detail_valid_cd"].ToString() == "1" && ds2.Tables[0].Rows[i]["char_avail_cd"].ToString() == "1"))
                                    {
                                        if (ds1.Tables[0].Rows[i]["char_value"].ToString() != "" && ds2.Tables[0].Rows[i]["char_value"].ToString() != "")
                                        {
                                            pchars.CharName1 = ds1.Tables[0].Rows[i]["char_value"].ToString() + "," + ds2.Tables[0].Rows[i]["char_value"].ToString();
                                        }
                                        else if (ds1.Tables[0].Rows[i]["char_value"].ToString() != "")
                                        {
                                            pchars.CharName1 = ds1.Tables[0].Rows[i]["char_value"].ToString();
                                        }
                                        else
                                        {
                                            pchars.CharName1 = ds2.Tables[0].Rows[i]["char_value"].ToString();
                                            
                                        }
                                    }
                                    else if (ds1.Tables[0].Rows[i]["case_detail_valid_cd"].ToString() == "1" && ds1.Tables[0].Rows[i]["char_avail_cd"].ToString() == "1")
                                    {
                                        pchars.CharName1 = ds1.Tables[0].Rows[i]["char_value"].ToString();
                                    }
                                    else
                                    {
                                        pchars.CharName1 = ds2.Tables[0].Rows[i]["char_value"].ToString();
                                    }
                                }
                            }
                            if (pchars.CharName != "")
                            {
                                pcPL.lstChars.Add(pchars);
                            }



                            if (pcPL.lstChars.Count > 0)
                            {
                                lstCharacteristics.Add(pcPL);
                            }

                        }
                        else
                        {
                            if ((Case1AvailID == 1 && Case2AvailID == 1))
                            {
                                pchars.CharName = "Available";
                                pchars.isChecked = 1;

                                pchars.VisibleChecBox = 1;

                                if (pchars.CharName != "")
                                {
                                    pcPL.lstChars.Add(pchars);
                                }

                                if (pcPL.lstChars.Count > 0)
                                {
                                    lstCharacteristics.Add(pcPL);
                                }
                            }
                            else
                            {
                                if ((Case1AvailID == 1 && Case2AvailID == 3) || (Case1AvailID == 3 && Case2AvailID == 1) || (Case1AvailID == 3 && Case2AvailID == 3))
                                {
                                    pchars.CharName = "ICB";
                                    pchars.isChecked = 1;
                                    pchars.VisibleChecBox = 1;
                                }
                                else
                                {
                                    pchars.CharName = "Not Available";
                                    pchars.isChecked = 1;
                                    pchars.VisibleChecBox = 1;
                                }

                                if (pchars.CharName != "")
                                {
                                    pcPL.lstChars.Add(pchars);
                                }

                                pchars = new PrivateLineChars();
                                pchars.CharName = "Special Bid Code";
                                pchars.isChecked = 0;
                                pchars.VisibleChecBox = 0;

                                DataSet dsSpecialBid = bal.GetSpecialBidCode(CaseID1, CaseID2, Convert.ToInt32(ds1.Tables[0].Rows[i]["char_type_id"].ToString()));
                                int case1DetailValidCd = 0, case1AvailCd = 0;
                                string case1Value = "";
                                int case2DetailValidCd = 0, case2AvailCd = 0;
                                string case2Value = "";
                                if (dsSpecialBid != null && dsSpecialBid.Tables.Count > 0 && dsSpecialBid.Tables[0].Rows.Count > 0)
                                {
                                    case1DetailValidCd = Convert.ToInt32(dsSpecialBid.Tables[0].Rows[0]["case_detail_valid_cd"].ToString());
                                    case1AvailCd = Convert.ToInt32(dsSpecialBid.Tables[0].Rows[0]["char_avail_cd"].ToString());
                                    case1Value = dsSpecialBid.Tables[0].Rows[0]["char_value"].ToString();
                                    if (dsSpecialBid != null && dsSpecialBid.Tables.Count > 0 && dsSpecialBid.Tables[0].Rows.Count > 1)
                                    {
                                        case2DetailValidCd = Convert.ToInt32(dsSpecialBid.Tables[0].Rows[1]["case_detail_valid_cd"].ToString());
                                        case2AvailCd = Convert.ToInt32(dsSpecialBid.Tables[0].Rows[1]["char_avail_cd"].ToString());
                                        case2Value = dsSpecialBid.Tables[0].Rows[1]["char_value"].ToString();
                                    }
                                    if ((case1DetailValidCd == 1 && case1AvailCd == 1) || (case2DetailValidCd == 1 && case2AvailCd == 1))
                                    {
                                        if ((case1DetailValidCd == 1 && case1AvailCd == 1) && (case2DetailValidCd == 1 && case2AvailCd == 1))
                                        {
                                            if (case1Value != "" && case2Value != "")
                                            {
                                                pchars.CharName1 = case1Value + ", " + case2Value;
                                            }
                                            else if (case1Value != "")
                                            {
                                                pchars.CharName1 = case1Value;
                                            }
                                            else
                                            {
                                                pchars.CharName1 = case2Value;
                                            }
                                        }
                                        else if (case1DetailValidCd == 1 && case1AvailCd == 1)
                                        {
                                            pchars.CharName1 = case1Value;
                                        }
                                        else
                                        {
                                            pchars.CharName1 = case2Value;
                                        }
                                    }
                                }

                                if (pchars.CharName != "")
                                {
                                    pcPL.lstChars.Add(pchars);
                                }

                                if (pcPL.lstChars.Count > 0)
                                {
                                    lstCharacteristics.Add(pcPL);
                                }



                                //if (pchars.CharName != "")
                                //{
                                //    pcPL.lstChars.Add(pchars);
                                //}

                                //if (pcPL.lstChars.Count > 0)
                                //{
                                //    lstCharacteristics.Add(pcPL);
                                //}
                            }


                        }

                    }
                    else if (ds1.Tables[0].Rows[i]["CHAR_TYPE_ID"].ToString() == "34") // NETWORK INTERFACE
                    {
                        if (IgnoreHubbing == 0)
                        {
                            if (ds1.Tables[0].Rows[i]["char_name"].ToString().ToUpper() == "FUNCTIONAL INTERFACE")
                            {
                                if ((ds1.Tables[0].Rows[i]["case_detail_valid_cd"].ToString() == "1" && ds1.Tables[0].Rows[i]["char_avail_cd"].ToString() == "1") || (ds2.Tables[0].Rows.Count > i && ds2.Tables[0].Rows[i]["case_detail_valid_cd"].ToString() == "1" && ds2.Tables[0].Rows[i]["char_avail_cd"].ToString() == "1"))
                                {

                                    if (ds1.Tables[0].Rows[i]["case_detail_valid_cd"].ToString() == "1" && ds1.Tables[0].Rows[i]["char_avail_cd"].ToString() == "1" && ds2.Tables[0].Rows.Count > i && ds2.Tables[0].Rows[i]["case_detail_valid_cd"].ToString() == "1" && ds2.Tables[0].Rows[i]["char_avail_cd"].ToString() == "1")
                                    {
                                        sl.FunctionalInterface = ds1.Tables[0].Rows[i]["char_value"].ToString();
                                        sl.FunctionalInterface1 = ds2.Tables[0].Rows[i]["char_value"].ToString();
                                        
                                    }
                                    else if (ds1.Tables[0].Rows[i]["case_detail_valid_cd"].ToString() == "1" && ds1.Tables[0].Rows[i]["char_avail_cd"].ToString() == "1")
                                    {
                                        if (sl.FunctionalInterface != "" && sl.FunctionalInterface != null)
                                        {
                                            sl.FunctionalInterface2 = ds1.Tables[0].Rows[i]["char_value"].ToString();
                                        }
                                        else
                                        {
                                            sl.FunctionalInterface = ds1.Tables[0].Rows[i]["char_value"].ToString();
                                        }
                                        
                                        sl.FunctionalInterface1 = "";
                                        sl.FunctionalInterfacecellNo = 1;
                                    }
                                    else
                                    {
                                        if (sl.FunctionalInterface1 != "" && sl.FunctionalInterface1!=null)
                                        {
                                            sl.FunctionalInterface2 = ds2.Tables[0].Rows[i]["char_value"].ToString();
                                        }
                                        else
                                        {
                                            sl.FunctionalInterface1 = ds2.Tables[0].Rows[i]["char_value"].ToString();
                                        }
                                        
                                        sl.FunctionalInterface = "";
                                        sl.FunctionalInterfacecellNo = 2;
                                    }

                                }
                                else if (ds2.Tables[0].Rows.Count > i && ds2.Tables[0].Rows[i]["case_detail_valid_cd"].ToString() == "1" && ds2.Tables[0].Rows[i]["char_avail_cd"].ToString() == "1")
                                {
                                    //sl.FunctionalInterface1 = ds2.Tables[0].Rows[i]["char_value"].ToString();
                                    if (sl.FunctionalInterface1 != "" && sl.FunctionalInterface1 != null)
                                    {
                                        sl.FunctionalInterface2 = ds2.Tables[0].Rows[i]["char_value"].ToString();
                                    }
                                    else
                                    {
                                        sl.FunctionalInterface1 = ds2.Tables[0].Rows[i]["char_value"].ToString();
                                    }
                                    sl.FunctionalInterface = "";
                                    sl.FunctionalInterfacecellNo = 2;
                                }

                            }
                            if (ds1.Tables[0].Rows[i]["char_name"].ToString().ToUpper() == "ELECTRICAL INTERFACE")
                            {
                                if ((ds1.Tables[0].Rows[i]["case_detail_valid_cd"].ToString() == "1" && ds1.Tables[0].Rows[i]["char_avail_cd"].ToString() == "1") || (ds2.Tables[0].Rows.Count>i && ds2.Tables[0].Rows[i]["case_detail_valid_cd"].ToString() == "1" && ds2.Tables[0].Rows[i]["char_avail_cd"].ToString() == "1"))
                                {

                                    if (ds1.Tables[0].Rows[i]["case_detail_valid_cd"].ToString() == "1" && ds1.Tables[0].Rows[i]["char_avail_cd"].ToString() == "1" && ds2.Tables[0].Rows.Count > i && ds2.Tables[0].Rows[i]["case_detail_valid_cd"].ToString() == "1" && ds2.Tables[0].Rows[i]["char_avail_cd"].ToString() == "1")
                                    {
                                        sl.ElectricalInterface = ds1.Tables[0].Rows[i]["char_value"].ToString();
                                        sl.ElectricalInterfacecellNo = 1;
                                        sl.ElectricalInterface1 = ds2.Tables[0].Rows[i]["char_value"].ToString();
                                    }
                                    else if (ds1.Tables[0].Rows[i]["case_detail_valid_cd"].ToString() == "1" && ds1.Tables[0].Rows[i]["char_avail_cd"].ToString() == "1")
                                    {

                                        if (sl.ElectricalInterface != "" && sl.ElectricalInterface != null)
                                        {
                                            sl.ElectricalInterface2 = ds1.Tables[0].Rows[i]["char_value"].ToString();
                                        }
                                        else
                                        {
                                            sl.ElectricalInterface = ds1.Tables[0].Rows[i]["char_value"].ToString();
                                        }
                                        
                                        sl.ElectricalInterfacecellNo = 1;
                                        sl.ElectricalInterface1 = "";
                                    }
                                    else
                                    {
                                        if (sl.ElectricalInterface1 != "" && sl.ElectricalInterface1 != null)
                                        {
                                            sl.ElectricalInterface2 = ds2.Tables[0].Rows[i]["char_value"].ToString();
                                        }
                                        else
                                        {
                                            sl.ElectricalInterface1 = ds2.Tables[0].Rows[i]["char_value"].ToString();
                                        }
                                        //sl.ElectricalInterface1 = ds2.Tables[0].Rows[i]["char_value"].ToString();

                                        sl.ElectricalInterface = "";
                                        sl.ElectricalInterfacecellNo = 2;
                                    }

                                }
                                else if (ds2.Tables[0].Rows.Count > i && ds2.Tables[0].Rows[i]["case_detail_valid_cd"].ToString() == "1" && ds2.Tables[0].Rows[i]["char_avail_cd"].ToString() == "1")
                                {

                                    if (sl.ElectricalInterface1 != "" && sl.ElectricalInterface1 != null)
                                    {
                                        sl.ElectricalInterface2 = ds2.Tables[0].Rows[i]["char_value"].ToString();
                                    }
                                    else
                                    {
                                        sl.ElectricalInterface1 = ds2.Tables[0].Rows[i]["char_value"].ToString();
                                    }

                                    
                                    sl.ElectricalInterface = "";
                                    sl.ElectricalInterfacecellNo = 2;
                                }

                            }

                            if (ds1.Tables[0].Rows[i]["char_name"].ToString().ToUpper() == "PHYSICAL INTERFACE")
                            {
                                if ((ds1.Tables[0].Rows[i]["case_detail_valid_cd"].ToString() == "1" && ds1.Tables[0].Rows[i]["char_avail_cd"].ToString() == "1") || (ds2.Tables[0].Rows.Count > i && ds2.Tables[0].Rows[i]["case_detail_valid_cd"].ToString() == "1" && ds2.Tables[0].Rows[i]["char_avail_cd"].ToString() == "1"))
                                {

                                    if (ds1.Tables[0].Rows[i]["case_detail_valid_cd"].ToString() == "1" && ds1.Tables[0].Rows[i]["char_avail_cd"].ToString() == "1" && ds2.Tables[0].Rows.Count > i && ds2.Tables[0].Rows[i]["case_detail_valid_cd"].ToString() == "1" && ds2.Tables[0].Rows[i]["char_avail_cd"].ToString() == "1")
                                    {
                                        sl.PhysicalInterface = ds1.Tables[0].Rows[i]["char_value"].ToString();
                                        sl.PhysicalInterface1 = ds2.Tables[0].Rows[i]["char_value"].ToString();
                                        sl.PhysicalInterfacecellNo = 1;
                                        
                                    }
                                    else if (ds1.Tables[0].Rows[i]["case_detail_valid_cd"].ToString() == "1" && ds1.Tables[0].Rows[i]["char_avail_cd"].ToString() == "1")
                                    {
                                        sl.PhysicalInterface = ds1.Tables[0].Rows[i]["char_value"].ToString();
                                        sl.PhysicalInterface1 = "";
                                        sl.PhysicalInterfacecellNo = 1;
                                    }
                                    else
                                    {
                                        sl.PhysicalInterface1 = ds2.Tables[0].Rows[i]["char_value"].ToString();
                                        sl.PhysicalInterface = "";
                                        sl.PhysicalInterfacecellNo = 2;
                                    }
                                }
                                else if (ds2.Tables[0].Rows.Count > i && ds2.Tables[0].Rows[i]["case_detail_valid_cd"].ToString() == "1" && ds2.Tables[0].Rows[i]["char_avail_cd"].ToString() == "1")
                                {
                                    sl.PhysicalInterface1 = ds2.Tables[0].Rows[i]["char_value"].ToString();
                                    sl.PhysicalInterface = "";
                                    sl.PhysicalInterfacecellNo = 2;
                                }

                            }

                        }
                        else
                        {

                            if ((sl.PhysicalInterface != null && sl.PhysicalInterface != "") || (sl.FunctionalInterface != "" && sl.FunctionalInterface != null) || (sl.ElectricalInterface != "" && sl.ElectricalInterface!=null))
                                continue;

                            DataSet dsCountryCoverage = bal.GetCountryCoverageDetails(CaseID1, Convert.ToInt32(ds1.Tables[0].Rows[i]["char_type_id"].ToString()));
                            DataSet dsCountryCoverage1 = bal.GetCountryCoverageDetails(CaseID2, Convert.ToInt32(ds1.Tables[0].Rows[i]["char_type_id"].ToString()));

                            string fiList1 = "", eList1 = "", piList1 = "", fiList2 = "", eList2 = "", piList2 = "";

                            if (dsCountryCoverage != null && dsCountryCoverage.Tables.Count > 0 && dsCountryCoverage.Tables[0].Rows.Count > 0)
                            {
                                
                                foreach (DataRow item in dsCountryCoverage.Tables[0].Rows)
                                {
                                    if (item["char_name"].ToString().ToLower() == "FUNCTIONAL INTERFACE".ToLower())
                                    {
                                        if (fiList1 == "")
                                        {
                                            fiList1 = item["char_actual_value"].ToString();
                                        }
                                        else
                                        {
                                            fiList1 += "," + item["char_actual_value"].ToString();
                                        }
                                    }

                                    if (item["char_name"].ToString().ToLower() == "ELECTRICAL INTERFACE".ToLower())
                                    {
                                        if (eList1 == "")
                                        {
                                            eList1 = item["char_actual_value"].ToString();
                                        }
                                        else
                                        {
                                            eList1 += "," + item["char_actual_value"].ToString();
                                        }
                                    }
                                    if (item["char_name"].ToString().ToLower() == "PHYSICAL INTERFACE".ToLower())
                                    {
                                        if (piList1 == "")
                                        {
                                            piList1 = item["char_actual_value"].ToString();
                                        }
                                        else
                                        {
                                            piList1 += "," + item["char_actual_value"].ToString();
                                        }
                                    }
                                }  
                            }

                            if (dsCountryCoverage1 != null && dsCountryCoverage1.Tables.Count > 0 && dsCountryCoverage1.Tables[0].Rows.Count > 0)
                            {

                                foreach (DataRow item in dsCountryCoverage1.Tables[0].Rows)
                                {
                                    if (item["char_name"].ToString().ToLower() == "FUNCTIONAL INTERFACE".ToLower())
                                    {
                                        if (fiList2 == "")
                                        {
                                            fiList2 = item["char_actual_value"].ToString();
                                        }
                                        else
                                        {
                                            fiList2 += "," + item["char_actual_value"].ToString();
                                        }
                                    }

                                    if (item["char_name"].ToString().ToLower() == "ELECTRICAL INTERFACE".ToLower())
                                    {
                                        if (eList2 == "")
                                        {
                                            eList2 = item["char_actual_value"].ToString();
                                        }
                                        else
                                        {
                                            eList2 += "," + item["char_actual_value"].ToString();
                                        }
                                    }
                                    if (item["char_name"].ToString().ToLower() == "PHYSICAL INTERFACE".ToLower())
                                    {
                                        if (piList2 == "")
                                        {
                                            piList2 = item["char_actual_value"].ToString();
                                        }
                                        else
                                        {
                                            piList2 += "," + item["char_actual_value"].ToString();
                                        }
                                    }
                                }
                            }

                            if (fiList1 != "")
                            {
                                sl.FunctionalInterface = fiList1;
                                sl.FunctionalInterfacecellNo = 1;
                            }
                            if (fiList2 != "")
                            {
                                sl.FunctionalInterface1 = fiList2;
                                sl.FunctionalInterfacecellNo = 2;
                            }

                            if (eList1 != "")
                            {
                                sl.ElectricalInterface = eList1;
                                sl.ElectricalInterfacecellNo = 1;
                            }
                            if (fiList2 != "")
                            {
                                sl.ElectricalInterface1 = eList2;
                                sl.ElectricalInterfacecellNo = 2;
                            }

                            if (piList1 != "")
                            {
                                sl.PhysicalInterface = piList1;
                                sl.PhysicalInterfacecellNo = 1;
                            }
                            if (fiList2 != "")
                            {
                                sl.PhysicalInterface1 = piList2;
                                sl.PhysicalInterfacecellNo = 2;
                            }
                        }
                    }
                    else if (ds1.Tables[0].Rows[i]["CHAR_TYPE_ID"].ToString() == "386") // CHARTYPE NOTE
                    {
                        if (IgnoreHubbing == 0)
                        {
                            if ((ds1.Tables[0].Rows[i]["case_detail_valid_cd"].ToString() == "1" && ds1.Tables[0].Rows[i]["char_avail_cd"].ToString() == "1") || (ds2.Tables[0].Rows.Count > i && ds2.Tables[0].Rows[i]["case_detail_valid_cd"].ToString() == "1" && ds2.Tables[0].Rows[i]["char_avail_cd"].ToString() == "1"))
                            {

                                if (ds1.Tables[0].Rows[i]["case_detail_valid_cd"].ToString() == "1" && ds1.Tables[0].Rows[i]["char_avail_cd"].ToString() == "1" && ds2.Tables[0].Rows.Count > i && ds2.Tables[0].Rows[i]["case_detail_valid_cd"].ToString() == "1" && ds2.Tables[0].Rows[i]["char_avail_cd"].ToString() == "1")
                                {
                                    sl.Remarks = ds1.Tables[0].Rows[i]["char_value"].ToString();
                                    sl.Remarks1 = ds2.Tables[0].Rows[i]["char_value"].ToString();
                                    sl.RemarkscellNo = 1;
                                }
                                else if (ds1.Tables[0].Rows[i]["case_detail_valid_cd"].ToString() == "1" && ds1.Tables[0].Rows[i]["char_avail_cd"].ToString() == "1")
                                {
                                    sl.Remarks = ds1.Tables[0].Rows[i]["char_value"].ToString();
                                    sl.Remarks1 = "";
                                    sl.RemarkscellNo = 1;
                                }
                                else if(ds2.Tables[0].Rows[i]["case_detail_valid_cd"].ToString() == "1" && ds2.Tables[0].Rows[i]["char_avail_cd"].ToString() == "1")
                                {
                                    sl.Remarks1 = ds2.Tables[0].Rows[i]["char_value"].ToString();
                                    sl.Remarks = "";
                                    sl.RemarkscellNo = 2;
                                }

                            }
                            else if(ds2.Tables[0].Rows[i]["case_detail_valid_cd"].ToString() == "1" && ds2.Tables[0].Rows[i]["char_avail_cd"].ToString() == "1")
                            {
                                sl.Remarks1 = ds2.Tables[0].Rows[i]["char_value"].ToString();
                                sl.Remarks = "";
                                sl.RemarkscellNo = 1;
                            }
                        }
                        else
                        {
                            DataSet dsCharTypeNote = bal.GetCountryCoverageDetails(CaseID1, Convert.ToInt32(ds1.Tables[0].Rows[i]["char_type_id"].ToString()));
                            DataSet dsCharTypeNote1 = bal.GetCountryCoverageDetails(CaseID2, Convert.ToInt32(ds1.Tables[0].Rows[i]["char_type_id"].ToString()));

                            string Remarks = "";
                            if (dsCharTypeNote != null && dsCharTypeNote.Tables.Count > 0 && dsCharTypeNote.Tables[0].Rows.Count > 0)
                            {
                                sl.Remarks = dsCharTypeNote.Tables[0].Rows[0]["char_value"].ToString();
                            
                                sl.RemarkscellNo = 1;
                            }
                            else
                            {
                                sl.Remarks = "";
                            }
                            if (dsCharTypeNote1 != null && dsCharTypeNote1.Tables.Count > 0 && dsCharTypeNote1.Tables[0].Rows.Count > 0)
                            {
                                sl.Remarks1 = dsCharTypeNote1.Tables[0].Rows[0]["char_value"].ToString();
                            }
                            else
                            {
                                sl.Remarks1 = "";
                            }
                            
                        }
                    }
                    else if (ds1.Tables[0].Rows[i]["CHAR_TYPE_ID"].ToString() == "646") // CPE Required
                    {

                        if (IgnoreHubbing == 0)
                        {
                            if ((ds1.Tables[0].Rows[i]["case_detail_valid_cd"].ToString() == "1" && ds1.Tables[0].Rows[i]["char_avail_cd"].ToString() == "1") || (ds2.Tables[0].Rows[i]["case_detail_valid_cd"].ToString() == "1" && ds2.Tables[0].Rows[i]["char_avail_cd"].ToString() == "1"))
                            {

                                if (ds1.Tables[0].Rows[i]["case_detail_valid_cd"].ToString() == "1" && ds1.Tables[0].Rows[i]["char_avail_cd"].ToString() == "1" && ds2.Tables[0].Rows[i]["case_detail_valid_cd"].ToString() == "1" && ds2.Tables[0].Rows[i]["char_avail_cd"].ToString() == "1")
                                {
                                    sl.CPERequired = ds1.Tables[0].Rows[i]["char_actual_value"].ToString();
                                    sl.CPERequired1 = ds2.Tables[0].Rows[i]["char_actual_value"].ToString();
                                    sl.CPERequiredcellNo = 1;
                                }
                                else
                                {
                                    sl.CPERequired = ds1.Tables[0].Rows[i]["char_actual_value"].ToString();
                                    sl.CPERequired1 = "";
                                    sl.CPERequiredcellNo = 1;
                                }

                            }
                            else
                            {
                                sl.CPERequired1 = ds2.Tables[0].Rows[i]["char_actual_value"].ToString();
                                sl.CPERequired = "";
                                sl.CPERequiredcellNo = 2;
                            }
                        }
                        else
                        {
                            DataSet dsCPERequired = bal.GetCountryCoverageDetails(CaseID1, Convert.ToInt32(ds1.Tables[0].Rows[i]["char_type_id"].ToString()));
                            DataSet dsCPERequired1 = bal.GetCountryCoverageDetails(CaseID2, Convert.ToInt32(ds1.Tables[0].Rows[i]["char_type_id"].ToString()));

                            string CPERequired = "";
                            if (dsCPERequired != null && dsCPERequired.Tables.Count > 0 && dsCPERequired.Tables[0].Rows.Count > 0)
                            {
                                sl.CPERequired = dsCPERequired.Tables[0].Rows[0]["char_value"].ToString();
                                
                                //sl.CPERequired = CPERequired;
                                sl.CPERequiredcellNo = 1;
                            }
                            else
                            {
                                sl.CPERequired = "";
                            }

                            if (dsCPERequired1 != null && dsCPERequired1.Tables.Count > 0 && dsCPERequired1.Tables[0].Rows.Count > 0)
                            {
                                sl.CPERequired1 = dsCPERequired1.Tables[0].Rows[0]["char_value"].ToString();
                            }
                            else
                            {
                                sl.CPERequired1 = "";
                            }

                        }

                    }
                    else if (ds1.Tables[0].Rows[i]["CHAR_TYPE_ID"].ToString() == "781") // LAN SAN CHAR TYPE
                    {

                        if (pcGeneral == null)
                        {
                            pcGeneral = new PrivateLineCharacteristics();

                        }
                        pcGeneral.lstChars = new List<PrivateLineChars>();

                        if (string.IsNullOrEmpty(pcGeneral.CharTypeName))
                        {
                            if (lstCharacteristics.Where(t => t.CharTypeName.ToLower() == "LAN SAN Service".ToLower()).Count() > 0)
                            {
                                pcGeneral = lstCharacteristics.Where(t => t.CharTypeName.ToLower() == "LAN SAN Service".ToLower()).FirstOrDefault();
                            }
                            pcGeneral.CharTypeName = ds1.Tables[0].Rows[i]["char_type_name"].ToString();
                        }

                        //pcGeneral.CharTypeName = "LAN SAN Service";
                        PrivateLineChars pchars = new PrivateLineChars();
                        if ((ds1.Tables[0].Rows[i]["case_detail_valid_cd"].ToString() == "1" && ds1.Tables[0].Rows[i]["char_avail_cd"].ToString() == "1") || (ds2.Tables[0].Rows[i]["case_detail_valid_cd"].ToString() == "1" && ds2.Tables[0].Rows[i]["char_avail_cd"].ToString() == "1"))
                        {

                            if ((ds1.Tables[0].Rows[i]["case_detail_valid_cd"].ToString() == "1" && ds1.Tables[0].Rows[i]["char_avail_cd"].ToString() == "1") && (ds2.Tables[0].Rows[i]["case_detail_valid_cd"].ToString() == "1" && ds2.Tables[0].Rows[i]["char_avail_cd"].ToString() == "1"))
                            {
                                if (ds2.Tables[0].Rows[i]["char_avail_cd"].ToString() == "1")
                                {
                                    pchars.CharName = ds2.Tables[0].Rows[i]["char_name"].ToString();
                                    pchars.CharName1 = "Available";
                                }
                                else
                                {
                                    pchars.CharName = ds2.Tables[0].Rows[i]["char_name"].ToString();
                                }
                                pchars.isChecked = 0;
                            }

                        }
                        //else
                        //{
                        //    if (ds1.Tables[0].Rows[i]["char_name"].ToString().ToLower() != "remark")
                        //    {
                        //        pchars.CharName = ds1.Tables[0].Rows[i]["char_name"].ToString();
                        //        pchars.isChecked = 0;
                        //    }
                        //}


                        PrivateLineCharacteristics pcTemp = (PrivateLineCharacteristics)lstCharacteristics.Where(t => t.CharTypeName == ds1.Tables[0].Rows[i]["char_type_name"].ToString()).FirstOrDefault();
                        if (pcTemp == null)
                        {
                            if (pcGeneral.lstChars.Count > 0)
                            {
                                lstCharacteristics.Add(pcGeneral);
                            }
                        }
                        else
                        {
                            if (!string.IsNullOrEmpty(pchars.CharName))
                            {
                                pcGeneral.lstChars.Add(pchars);
                                //if (pcGeneral.lstChars.Count > 0)
                                //{
                                //    lstCharacteristics.Add(pcGeneral);
                                //}
                            }
                        }

                        PrivateLineChars pchars1 = new PrivateLineChars();

                        pchars1.CharName = "LAN SAN Service";
                        pchars1.CharName1 = "Availability";
                        pchars1.isChecked = 0;
                        pchars1.VisibleChecBox = 0;

                        if (pchars1 != null && !string.IsNullOrEmpty(pchars1.CharName))
                        {

                            PrivateLineChars PCCharsTemp = pcGeneral.lstChars.Where(t => t.CharName == pchars1.CharName).FirstOrDefault();
                            if (PCCharsTemp == null)
                            {
                                pcGeneral.lstChars.Add(pchars1);
                                lstCharacteristics.Add(pcGeneral);
                            }
                        }

                        pcGeneral = null;



                        //pchars.VisibleChecBox = 0;
                        //pcGeneral.lstChars = new List<PrivateLineChars>();
                        //pcGeneral.lstChars.Add(pchars);
                        //if (lstCharacteristics.Where(t => t.CharTypeName == pcGeneral.CharTypeName).Count() == 0)
                        //{
                        //    lstCharacteristics.Add(pcGeneral);
                        //}
                        //pcGeneral = null;
                    }
                    else
                    {

                        if (ds1.Tables[0].Rows[i]["char_type_name"].ToString().ToLower() == "Service Delivery".ToLower())
                            continue;

                        if (pcGeneral == null)
                        {
                            pcGeneral = new PrivateLineCharacteristics();

                        }

                        if (string.IsNullOrEmpty(pcGeneral.CharTypeName))
                            pcGeneral.CharTypeName = ds1.Tables[0].Rows[i]["char_type_alias"].ToString();


                        PrivateLineChars pchars = new PrivateLineChars();
                        pchars.CharName = "";
                        pchars.isChecked = 0;
                        pchars.VisibleChecBox = 0;
                        pcGeneral.lstChars = new List<PrivateLineChars>();
                        pcGeneral.lstChars.Add(pchars);
                        if (lstCharacteristics.Where(t => t.CharTypeName == pcGeneral.CharTypeName).Count() == 0)
                        {
                            lstCharacteristics.Add(pcGeneral);
                        }
                        pcGeneral = null;
                    }
                }
            }

            //if (HubPart == 1)
            //{
            //    sl.cellNo = 2;
            //}
            //else
            //{
            //    sl.cellNo = 1;
            //}


            bool blnDataExists = false;
            for (int i = lstCharacteristics.Count - 1; i >= 0; i--)
            {

                foreach (PrivateLineChars item in lstCharacteristics[i].lstChars)
                {
                    if (item.CharName != "")
                    {
                        blnDataExists = true;
                        break;
                    }
                    else
                    {
                        blnDataExists = false;
                    }
                }
                if (!blnDataExists)
                {
                    lstCharacteristics.RemoveAt(i);
                }
                // some code
                // safePendingList.RemoveAt(i);
            }
            PrivateLineCharacteristics pcSLTime = (PrivateLineCharacteristics)lstCharacteristics.FirstOrDefault();
            if (string.IsNullOrEmpty(sl.ElectricalInterface))
            {
                sl.ElectricalInterface = "";
            }
            if (string.IsNullOrEmpty(sl.PhysicalInterface))
            {
                sl.PhysicalInterface = "";
            }
            if (string.IsNullOrEmpty(sl.FunctionalInterface))
            {
                sl.FunctionalInterface = "";
            }
            if (string.IsNullOrEmpty(sl.Remarks))
            {
                sl.Remarks = "";
            }
            if(pcSLTime!=null)
                pcSLTime.SLTime = sl;

            return lstCharacteristics;
        }

        private static void GetTransportData(int CaseID,int CharTypeID,List<PrivateLineChars> lstPC)
        {
            PrivateLineBAL bal = new PrivateLineBAL();
            DataSet dsTransportChars = bal.GetTransportMediumChars(CaseID, CharTypeID);
            PrivateLineChars pchars1 = new PrivateLineChars();
            if (dsTransportChars != null && dsTransportChars.Tables.Count > 0 && dsTransportChars.Tables[0].Rows.Count > 0)
            {
                string tmpValue = "";
                bool blnFlag = false;
                string HTMLString = "<Table cellpadding='0' cellspacing='0' class='table table-bordered'><TD class=bodyTextBold align=left width='40%'>Cables/Satellites used, subject to availability</TD><TD class=bodyTextBold align=left>Round Trip Delay</TD><TD class=bodyTextBold align=left>Capacity Check Required</TD></TR>";

                foreach (DataRow item in dsTransportChars.Tables[0].Rows)
                {
                    if (Convert.ToInt32(item["char_id"].ToString()) == 3929 || Convert.ToInt32(item["char_id"].ToString()) == 3928)
                    {
                        pchars1 = new PrivateLineChars();
                        pchars1.CharName = item["char_name"].ToString();
                        pchars1.VisibleChecBox = 1;
                        if (Convert.ToInt32(item["case_detail_valid_cd"].ToString()) == 1 && Convert.ToInt32(item["char_avail_cd"].ToString()) == 1)
                        {
                            if (item["char_value"].ToString() == "Y")
                            {
                                pchars1.isChecked = 1;
                            }
                            else
                            {
                                pchars1.isChecked = 0;
                            }

                        }
                        else
                        {
                            pchars1.isChecked = 0;
                        }
                        lstPC.Add(pchars1);
                    }
                    else
                    {
                        
                        if (Convert.ToInt32(item["case_detail_valid_cd"].ToString()) == 1 && Convert.ToInt32(item["char_avail_cd"].ToString()) == 1)
                        {
                            if (item["char_value_2"].ToString() == "Y")
                            {
                                tmpValue = "Y";
                            }
                            else
                            {
                                tmpValue = "N";
                            }
                            blnFlag = true;
                            HTMLString += "<TR><TD>" + item["char_name"].ToString().Replace("Cables/Satellites -","") + "</TD><TD>" + item["char_value"].ToString() + "</TD><TD>" + tmpValue + "</TD></TR>";
                        }
                    }
                }

                if (blnFlag)
                {
                    PrivateLineChars pchr = lstPC.FirstOrDefault();
                    if (pchr != null && pchr.CharName!="")
                    {
                        pchr.HTMLString = HTMLString + "</TABLE>";
                    }
                }
            }
            
        }

        [WebMethod]
        public static List<AccessInformation> GetAccessInformation(int CaseID, int PortSpeed, int CountryID, int ProductID)
        {

            List<AccessInformation> ailst = new List<AccessInformation>();

            Filters fl = new Filters();
            PrivateLineBAL bal = new PrivateLineBAL();
            int RegionID = fl.GetRegion(CountryID);
            DataSet ds1 = bal.GetAccessInfoData1(CaseID, PortSpeed, CountryID, RegionID);
            DataSet ds2 = null;

            if (ds1 != null && ds1.Tables.Count > 0 && ds1.Tables[0].Rows.Count > 0)
            {
                int CHAR_AVAIL_CD = 1;
                int interfaceAvailCd = 0;
                int EstimatedLeadTime = 0; 
                for (int i = 0; i < ds1.Tables[0].Rows.Count; i++)
                {
                    AccessInformation ai = new AccessInformation();
                    ai.POP = ds1.Tables[0].Rows[i]["hub_site_name"].ToString();
                    ai.AccessSpeed = ds1.Tables[0].Rows[i]["char_actual_value"].ToString() + " " + ds1.Tables[0].Rows[i]["char_unit_of_measure"].ToString();
                    ai.AccessType = ds1.Tables[0].Rows[i]["type"].ToString();
                    ai.SupplierProductName = ds1.Tables[0].Rows[i]["Name"].ToString();
                    ai.AccessSpeedCharID = Convert.ToInt32(ds1.Tables[0].Rows[i]["ACCESS_SPEED_CHAR_ID"].ToString());
                    ai.AccessProductTypeID = Convert.ToInt32(ds1.Tables[0].Rows[i]["ACCESS_PRODUCT_TYPE_ID"].ToString());
                    
                    ai.AccessSupplierNameID = Convert.ToInt32(ds1.Tables[0].Rows[i]["ACCESS_SUPPLIER_NAME_ID"].ToString());
                    ai.ASpeedUOM = ds1.Tables[0].Rows[i]["CHAR_UNIT_OF_MEASURE"].ToString();
                    
                    ds2 = bal.GetAccessInfoData2(CaseID, PortSpeed, CountryID, RegionID, Convert.ToInt32(ds1.Tables[0].Rows[i]["ACCESS_SPEED_CHAR_ID"].ToString()), Convert.ToInt32(ds1.Tables[0].Rows[i]["ACCESS_SUPPLIER_CHAR_ID"].ToString()), Convert.ToInt32(ds1.Tables[0].Rows[i]["ACCESS_SUPPLIER_NAME_ID"].ToString()), Convert.ToInt32(ds1.Tables[0].Rows[i]["ACCESS_PRODUCT_TYPE_ID"].ToString()), ProductID);
                    if (ds2 != null && ds2.Tables.Count > 0 && ds2.Tables[0].Rows.Count > 0)
                    {
                        for (int j = 0; j < ds2.Tables[0].Rows.Count; j++)
                        {
                            if (j > 0)
                            {
                                ai = new AccessInformation();
                            }
                            else
                            {
                                ai.Supplier = ds2.Tables[0].Rows[j]["char_actual_value"].ToString();
                            }
                            
                            ai.AccessSpeedAvailability = ds2.Tables[0].Rows[j]["AVAIL_DESC"].ToString();
                            ai.RegionID = RegionID;
                            ai.HubSiteID = bal.GetHubSiteID(CaseID);
                            ai.AccessSupplierCharID = Convert.ToInt32(ds1.Tables[0].Rows[i]["ACCESS_SUPPLIER_CHAR_ID"].ToString());

                            if (ds2.Tables[0].Rows[j]["PREFERRED_FLAG"].ToString() == "1")
                                interfaceAvailCd = 1;
                            else
                                interfaceAvailCd = 3;

                            if (ds1.Tables[0].Rows[i]["PORT_SPEED_AVAIL_CD"].ToString() == "1" && ds2.Tables[0].Rows[j]["CHAR_AVAIL_CD"].ToString() == "1")
                            {
                                ai.OrderingStatus = "Available";
                            }
                            else if (ds2.Tables[0].Rows[j]["CHAR_AVAIL_CD"].ToString() == "2")
                            {
                                ai.OrderingStatus = "ICB";
                            }
                            else
                            {
                                ai.OrderingStatus = "ICB";
                            }
                            string[] str = new string[] { "//" };
                            string[] strInterface = ds2.Tables[0].Rows[j]["CHAR_NAME"].ToString().Split(str, StringSplitOptions.None);
                            ai.Interface = strInterface[0];
                            ai.Framing = strInterface[1];
                            ai.Connecter = strInterface[2];

                           
                            
                                bal.GetLeadTime("",
                                    CountryID.ToString(),
                                    ds1.Tables[0].Rows[i]["char_id"].ToString(),
                                    ds1.Tables[0].Rows[i]["ACCESS_SUPPLIER_CHAR_ID"].ToString(),
                                    ds1.Tables[0].Rows[i]["ACCESS_PRODUCT_TYPE_ID"].ToString(),
                                    ds1.Tables[0].Rows[i]["access_supplier_name_id"].ToString(),
                                    ds2.Tables[0].Rows[j]["char_id"].ToString(),
                                    ds1.Tables[0].Rows[i]["char_value"].ToString(), ai);

                                if (ai.offnetWithOutCPEStatus[0] != "")
                                {
                                    ai.EstimatedLeadTime = Convert.ToInt32(ai.offnetWithOutCPEStatus[0]);
                                    if (EstimatedLeadTime < Convert.ToInt32(ai.offnetWithOutCPEStatus[0]))
                                    {
                                        EstimatedLeadTime = Convert.ToInt32(ai.offnetWithOutCPEStatus[0]);
                                    }
                                }
                            ailst.Add(ai);
                        }
                        

                        
                    }
                    
                }

                foreach (AccessInformation item in ailst)
                {
                    item.EstimatedLeadTime = EstimatedLeadTime;
                }

            }
            //
            return ailst;
        }

        [WebMethod]
        public static List<AccessInformation> GetCasesAccessInformation(int PortSpeed, int CountryID, int ProductID, int CarrierID, int CityID, int SubProduct)
        {

            List<AccessInformation> ailst = new List<AccessInformation>();

            Filters fl = new Filters();
            PrivateLineBAL bal = new PrivateLineBAL();
            Filters balfilter = new Filters();
            int RegionID = fl.GetRegion(CountryID);
            DataSet dsCaseID1 = null, dsCaseID2 = null;
            int CaseID = 0;

            if (CarrierID == 0)
            {
                DataSet dsCarrierID = bal.GetCarrierID(ProductID, CountryID, CityID, SubProduct, PortSpeed);
                if (dsCarrierID != null && dsCarrierID.Tables.Count > 0 && dsCarrierID.Tables[0].Rows.Count > 0)
                {
                    CarrierID = Convert.ToInt32(dsCarrierID.Tables[0].Rows[0]["access_supplier_char_id"].ToString());
                }
            }

            dsCaseID1 = bal.GetCaseID(ProductID, CountryID, CityID, SubProduct, PortSpeed, CarrierID);

            if (dsCaseID1 != null && dsCaseID1.Tables.Count > 0 && dsCaseID1.Tables[0].Rows.Count > 0)
            {
                DataSet ds1 = null;
                DataSet ds2 = null;
                int EstimatedLeadTime = 0;
                foreach (DataRow item in dsCaseID1.Tables[0].Rows)
                {

                    ds1 = bal.GetAccessInfoData1(Convert.ToInt32(item["CASE_ID"].ToString()), PortSpeed, CountryID, RegionID);

                    if (ds1 != null && ds1.Tables.Count > 0 && ds1.Tables[0].Rows.Count > 0)
                    {
                        int CHAR_AVAIL_CD = 1;
                        int interfaceAvailCd = 0;
                        for (int i = 0; i < ds1.Tables[0].Rows.Count; i++)
                        {
                            AccessInformation ai = new AccessInformation();
                            ai.POP = ds1.Tables[0].Rows[i]["hub_site_name"].ToString();
                            ai.AccessSpeed = ds1.Tables[0].Rows[i]["char_actual_value"].ToString() + " " + ds1.Tables[0].Rows[i]["char_unit_of_measure"].ToString();
                            ai.AccessType = ds1.Tables[0].Rows[i]["type"].ToString();
                            ai.SupplierProductName = ds1.Tables[0].Rows[i]["Name"].ToString();
                            
                            ai.ASpeedUOM = ds1.Tables[0].Rows[i]["CHAR_UNIT_OF_MEASURE"].ToString();
                            
                            ds2 = bal.GetAccessInfoData2(Convert.ToInt32(item["CASE_ID"].ToString()), PortSpeed, CountryID, RegionID, Convert.ToInt32(ds1.Tables[0].Rows[i]["ACCESS_SPEED_CHAR_ID"].ToString()), Convert.ToInt32(ds1.Tables[0].Rows[i]["ACCESS_SUPPLIER_CHAR_ID"].ToString()), Convert.ToInt32(ds1.Tables[0].Rows[i]["ACCESS_SUPPLIER_NAME_ID"].ToString()), Convert.ToInt32(ds1.Tables[0].Rows[i]["ACCESS_PRODUCT_TYPE_ID"].ToString()), ProductID);
                            if (ds2 != null && ds2.Tables.Count > 0 && ds2.Tables[0].Rows.Count > 0)
                            {

                                for (int j = 0; j < ds2.Tables[0].Rows.Count; j++)
                                {
                                    if (j > 0)
                                    {
                                        ai = new AccessInformation();
                                    }
                                    else
                                    {
                                        ai.Supplier = ds2.Tables[0].Rows[j]["char_actual_value"].ToString();
                                    }

                                    //ai.Supplier = ds2.Tables[0].Rows[0]["char_actual_value"].ToString();
                                    ai.AccessSpeedAvailability = ds2.Tables[0].Rows[j]["AVAIL_DESC"].ToString();
                                    ai.AccessSpeedCharID = Convert.ToInt32(ds1.Tables[0].Rows[i]["ACCESS_SPEED_CHAR_ID"].ToString());
                                    ai.AccessProductTypeID = Convert.ToInt32(ds1.Tables[0].Rows[i]["ACCESS_PRODUCT_TYPE_ID"].ToString());
                                    ai.AccessSupplierCharID = Convert.ToInt32(ds1.Tables[0].Rows[i]["ACCESS_SUPPLIER_CHAR_ID"].ToString());
                                    ai.AccessSupplierNameID = Convert.ToInt32(ds1.Tables[0].Rows[i]["ACCESS_SUPPLIER_NAME_ID"].ToString());
                                    ai.RegionID = RegionID;
                                    ai.HubSiteID = bal.GetHubSiteID(Convert.ToInt32(item["CASE_ID"].ToString()));

                                    if (ds2.Tables[0].Rows[0]["PREFERRED_FLAG"].ToString() == "1")
                                        interfaceAvailCd = 1;
                                    else
                                        interfaceAvailCd = 3;

                                    if (ds1.Tables[0].Rows[i]["PORT_SPEED_AVAIL_CD"].ToString() == "1" && ds2.Tables[0].Rows[j]["CHAR_AVAIL_CD"].ToString() == "1")
                                    {
                                        ai.OrderingStatus = "Available";
                                    }
                                    else if (ds2.Tables[0].Rows[j]["CHAR_AVAIL_CD"].ToString() == "2")
                                    {
                                        ai.OrderingStatus = "ICB";
                                    }
                                    else
                                    {
                                        ai.OrderingStatus = "ICB";
                                    }
                                    string[] str = new string[] { "//" };
                                    string[] strInterface = ds2.Tables[0].Rows[j]["CHAR_NAME"].ToString().Split(str, StringSplitOptions.None);
                                    ai.Interface = strInterface[0];
                                    ai.Framing = strInterface[1];
                                    ai.Connecter = strInterface[2];

                                    bal.GetLeadTime("",
                                        CountryID.ToString(),
                                        ds1.Tables[0].Rows[i]["char_id"].ToString(),
                                        ds1.Tables[0].Rows[i]["ACCESS_SUPPLIER_CHAR_ID"].ToString(),
                                        ds1.Tables[0].Rows[i]["ACCESS_PRODUCT_TYPE_ID"].ToString(),
                                        ds1.Tables[0].Rows[i]["access_supplier_name_id"].ToString(),
                                        ds2.Tables[0].Rows[0]["char_id"].ToString(),
                                        ds1.Tables[0].Rows[i]["char_value"].ToString(), ai);

                                    if (ai.offnetWithOutCPEStatus[0] != "" || ai.onnetWithoutCPEStatus[1] != "")
                                    {
                                        if (ai.offnetWithOutCPEStatus[0] != "")
                                        {
                                            if (EstimatedLeadTime < Convert.ToInt32(ai.offnetWithOutCPEStatus[0]))
                                            {
                                                EstimatedLeadTime = Convert.ToInt32(ai.offnetWithOutCPEStatus[0]);
                                            }
                                        }
                                        if (ai.onnetWithoutCPEStatus[0] != "")
                                        {
                                            if (EstimatedLeadTime < Convert.ToInt32(ai.onnetWithoutCPEStatus[0]))
                                            {
                                                EstimatedLeadTime = Convert.ToInt32(ai.onnetWithoutCPEStatus[0]);
                                            }
                                        }

                                        ai.EstimatedLeadTime = EstimatedLeadTime;
                                    }
                                    

                                    ailst.Add(ai);

                                }
                            }
                            
                            

                        }

                    }

                    foreach (AccessInformation item1 in ailst)
                    {
                        item1.EstimatedLeadTime = EstimatedLeadTime;
                    }

                }
            }
            //
            return ailst;
        }

    }
}
