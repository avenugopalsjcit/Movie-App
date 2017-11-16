using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using SCSearchDAL;
using System.Data;
using System.Collections;

namespace SCSearchBAL
{
    public class Filters
    {
        public DataSet GetProducts(int CountryID, int AccessLevel)
        {
            FiltersDAL dal = new FiltersDAL();
            return dal.GetProducts(CountryID, AccessLevel);
        }

        public List<string> ValidProduct(int AccessLevel, string BtGfrCodes, string SegregationCodes, string User_Id)
        {
            FiltersDAL dal = new FiltersDAL();
            List<string> lst = new List<string>();
            DataTable dt = dal.getValidProduct(AccessLevel, BtGfrCodes, SegregationCodes, User_Id);
            int MPLSAvailtoEndUser = MPLSAvailabilitytoEndUser(User_Id);

            foreach (DataRow dr in dt.Rows)
            {
                //if MPLS Cap visibility is not available for this user then we should not validate MPLS Cap,
                if (Convert.ToString(dr[0]) == "21" && MPLSAvailtoEndUser == 0) { }
                else
                {
                    lst.Add(Convert.ToString(dr[0]));
                }
            }
            return lst;
        }

        public int MPLSAvailabilitytoEndUser(string userID)
        {
            FiltersDAL dal = new FiltersDAL();
            return dal.MPLSAvailabilitytoEndUser(userID);
        }

        public DataSet GetRegions(int ProductID)
        {
            FiltersDAL objdal = new FiltersDAL();
            return objdal.GetRegions(ProductID);
        }
        public DataSet GetCountries(int ProductID, int RegionID, string ValidProductIDs=null)
        {
            FiltersDAL dalcntry = new FiltersDAL();
            return dalcntry.GetCountries(ProductID, RegionID, ValidProductIDs);
        }
        public int GetRegion(int CountryID)
        {
            FiltersDAL dalcntry = new FiltersDAL();
            return dalcntry.GetRegion(CountryID);
        }

        public DataSet GetInfoByCity(int CityID, int ProductID)
        {
            FiltersDAL dalcntry = new FiltersDAL();
            return dalcntry.GetInfoByCity(CityID, ProductID);
        }

        public DataSet GetInfoByState(int StateID)
        {
            FiltersDAL dalcntry = new FiltersDAL();
            return dalcntry.GetInfoByState(StateID);
        }

        public DataSet GetInfoByHubSite(int HubSiteID)
        {
            FiltersDAL dalcntry = new FiltersDAL();
            return dalcntry.GetInfoByHubSite(HubSiteID);
        }

        public DataSet GetBandWidthCountriesCities(int ProductID, string Speeds, int CountryID, int SpeedID, int CityFlag)
        {
            FiltersDAL dalcntry = new FiltersDAL();
            return dalcntry.GetBandWidthCountriesCities(ProductID, Speeds, CountryID, SpeedID, CityFlag);
        }

        public DataSet GetBandWidthCities(int ProductID, string Speeds, int CountryID, int SpeedID, int CityFlag)
        {
            FiltersDAL dalcntry = new FiltersDAL();
            return dalcntry.GetBandWidthCities(ProductID, Speeds, CountryID, SpeedID, CityFlag);
        }
        public DataSet GetOnlyCountries(int ProductID, int SpeedID)
        {
            FiltersDAL dalcntry = new FiltersDAL();
            return dalcntry.GetOnlyCountries(ProductID, SpeedID);
        }
        public DataSet GetStates(int ProductID, int RegionID, int CountryID, int isIA)
        {
            FiltersDAL dalstate = new FiltersDAL();
            return dalstate.GetStates(ProductID, RegionID, CountryID, isIA);
        }
        public DataSet GetCities(int ProductID, int RegionID, int countryID, int StateID, int Speed, int isIA)
        {
            FiltersDAL dalcities = new FiltersDAL();
            return dalcities.GetCities(ProductID, RegionID, countryID, StateID, Speed, isIA);
        }

        public DataSet GetCitiesBySpeed(int ProductID, int countryID, int Speed)
        {
            FiltersDAL dalcities = new FiltersDAL();
            return dalcities.GetCitiesBySpeed(ProductID, countryID, Speed);
        }

        public DataSet GetSpeeds(int ProductID, int Country1ID, int City1ID, int Country2ID, int City2ID)
        {
            FiltersDAL dalcities = new FiltersDAL();
            return dalcities.GetSpeeds(ProductID, Country1ID, City1ID, Country2ID, City2ID);
        }

        public DataSet GetRegionDetailsByCountryProduct(int ProductID, int CountryID)
        {
            FiltersDAL dalcities = new FiltersDAL();
            return dalcities.GetRegionDetailsByCountryProduct(ProductID, CountryID);
        }
        public DataSet Getpops(int ProductID, int RegionID, int countryID, int StateID, int CityID, int isIA)
        {
            FiltersDAL dalpops = new FiltersDAL();
            return dalpops.Getpops(ProductID, RegionID, countryID, StateID, CityID, isIA);
        }

        public DataSet GetAccessSuppliers(int CaseID, int ProductID, int HubSiteID, int CaseValidID, int CountryID)
        {
            FiltersDAL dalpops = new FiltersDAL();
            return dalpops.GetAccessSuppliers(CaseID, ProductID, HubSiteID, CaseValidID, CountryID);
        }

        public DataSet GetPortSpeeds(int CaseID, int ProductID, int HubSiteID, int CaseValidID, int CountryID)
        {
            FiltersDAL dalpops = new FiltersDAL();
            return dalpops.GetPortSpeeds(CaseID, ProductID, HubSiteID, CaseValidID, CountryID);
        }

        public DataSet GetParetnPortSpeeds(int CaseID, int ProductID, int HubSiteID, int CaseValidID, int CountryID, int CharTypeID, int ParentProductID, int ValidateParent, int CapmanPlatformID)
        {
            FiltersDAL dalpops = new FiltersDAL();
            return dalpops.GetParetnPortSpeeds(CaseID, ProductID, HubSiteID, CaseValidID, CountryID, CharTypeID, ParentProductID, ValidateParent, CapmanPlatformID);
        }

        public DataSet GetNetworkPlatformData(int ProductID, int HubSiteID)
        {
            FiltersDAL dalpops = new FiltersDAL();
            return dalpops.GetNetworkPlatformData(ProductID, HubSiteID);
        }

        public int GetNetworkPlatformCount(int ProductID, int HubSiteID)
        {
            FiltersDAL dalpops = new FiltersDAL();
            return dalpops.GetNetworkPlatformCount(ProductID, HubSiteID);
        }

        public int ShowCPE(int ProductID)
        {
            FiltersDAL dalpops = new FiltersDAL();
            return dalpops.ShowCPE(ProductID);
        }

        public DataSet GetParentAccessSupplier(int CaseID, int ProductID, int HubSiteID, int CaseValidID, int CountryID, int CharTypeID, int ParentProductID, int ValidateParent, int CapmanPlatformID)
        {
            FiltersDAL dalpops = new FiltersDAL();
            return dalpops.GetParentAccessSupplier(CaseID, ProductID, HubSiteID, CaseValidID, CountryID, CharTypeID, ParentProductID, ValidateParent, CapmanPlatformID);
        }

        public DataSet GetParentSpeeds(int CaseID, int SupplierID, int CPESuppliers, string SelectedPortSpeed, string AccessSpeed, string SupplierProduct, string AccessType, int PageNo, int PageSize, ref int Count)
        {
            FiltersDAL dalpops = new FiltersDAL();
            return dalpops.GetParentSpeeds(CaseID, SupplierID, CPESuppliers, SelectedPortSpeed, AccessSpeed, SupplierProduct, AccessType, PageNo, PageSize, ref Count);
        }

        public DataSet GetPhaseNames(string strPhaseIDs, int ProductID)
        {
            FiltersDAL dalpops = new FiltersDAL();
            return dalpops.GetPhaseNames(strPhaseIDs, ProductID);
        }

        public DataSet GetChildPortSpeeds(int CaseID, int SupplierID, int CPESuppliers, string SelectedPortSpeed, string AccSpeed, string SuppProduct, string AccType, int PageNo, int PageSize, ref int Count)
        {
            FiltersDAL dalpops = new FiltersDAL();
            return dalpops.GetChildPortSpeeds(CaseID, SupplierID, CPESuppliers, SelectedPortSpeed, AccSpeed, SuppProduct, AccType, PageNo, PageSize, ref Count);
        }

        public string GetPhaseName(int PhaseID, int ProductID)
        {
            FiltersDAL dalpops = new FiltersDAL();
            return dalpops.GetPhaseName(PhaseID, ProductID);
        }
        public string GetAccessSupplierCharName(int AccessSupplierCharID)
        {
            FiltersDAL dalpops = new FiltersDAL();
            return dalpops.GetAccessSupplierCharName(AccessSupplierCharID);
        }

        public DataSet GetAccessSupplierCharNames(string AccessSupplierCharID)
        {
            FiltersDAL dalpops = new FiltersDAL();
            return dalpops.GetAccessSupplierCharNames(AccessSupplierCharID);
        }

        public DataSet GetChildPortSpeeds(int CaseID)
        {
            FiltersDAL dalpops = new FiltersDAL();
            return dalpops.GetChildPortSpeeds(CaseID);
        }

        public DataSet GetTechnologyPortSpeeds(int ProductID, int CountryID, int PackageID, int Type)
        {
            FiltersDAL dalpops = new FiltersDAL();
            return dalpops.GetTechnologyPortSpeeds(ProductID, CountryID, PackageID, Type);
        }

        public Hashtable GetUserInformation(int CaseID, string TableName)
        {
            FiltersDAL dalpops = new FiltersDAL();
            return dalpops.GetUserInformation(CaseID, TableName);
        }

        public DataSet GetProductAccessType(int ProductID)
        {
            FiltersDAL dalpops = new FiltersDAL();
            return dalpops.GetProductAccessType(ProductID);
        }

        public void BindListWithCPELeadTime(DataRow dr, ParentSpeed objParentPortSpeed, bool IsMPLSCapability)
        {
            string GetCPELeadTimeNew = "";
            string toolTipLeadtime = "";
            bool isNNI = false;
            if (!IsMPLSCapability)
            {
                getLeadTime(dr["access_lead_time"].ToString(),
                            dr["onnet_lead_time"].ToString(),
                            dr["onnet_lead_time_status"].ToString(),
                            dr["access_lead_time_status"].ToString(),
                            dr["cpe_lead_time"].ToString(),
                            dr["cpe_lead_time_status"].ToString(),
                            dr["pspeed_lead_time"].ToString(), out GetCPELeadTimeNew, out toolTipLeadtime);

                if (Convert.ToString(dr["access_type_name"]).IndexOf("NNI") > -1)
                {
                    isNNI = true;
                }

                bindServiceLeadTimes(GetCPELeadTimeNew, toolTipLeadtime, dr["pspeed_lead_time"].ToString(), objParentPortSpeed, isNNI);
            }
            else
            {
                getLeadTime(dr["p_access_lead_time"].ToString(),
                            dr["p_on_net_lead_time"].ToString(),
                            dr["p_on_net_lead_time_st_name"].ToString(),
                            dr["p_off_net_lead_time_st_name"].ToString(),
                            dr["p_cpe_lead_time"].ToString(),
                            dr["p_cpe_status"].ToString(),
                            dr["p_portspeed_leadtime"].ToString(), out GetCPELeadTimeNew, out toolTipLeadtime);

                if (Convert.ToString(dr["p_access_type_name"]).IndexOf("NNI") > -1)
                {
                    isNNI = true;
                }

                bindServiceLeadTimes(GetCPELeadTimeNew, toolTipLeadtime, dr["p_portspeed_leadtime"].ToString(), objParentPortSpeed, isNNI);

            }
        }
        // popup needs to be implemented 
        private void bindServiceLeadTimes(string serviceLeadTime, string toolTipStandard, string portSpeedLeadTime, ParentSpeed objParentSpeed, bool isNNI)
        {
            string[] arrServiceLeadTimes = serviceLeadTime.Split(',');
            objParentSpeed.onnetWithCPEStatus = new List<string>();
            objParentSpeed.onnetWithoutCPEStatus = new List<string>();
            objParentSpeed.offnetwithCPEStatus = new List<string>();
            objParentSpeed.offnetWithOutCPEStatus = new List<string>();


            string[] strToolTip = toolTipStandard.Split('|');
            if (strToolTip.Length > 0)
            {
                objParentSpeed.CPLeadTimeStatus = strToolTip[4] + "                                           " + strToolTip[5];
                objParentSpeed.offnetAccessLeadTimeStatus = strToolTip[0] + "                                           " + strToolTip[1];
                objParentSpeed.onnetAccessLeadTimeStatus = strToolTip[2] + "                                           " + strToolTip[3];
                objParentSpeed.PortSpeedLeadTime = portSpeedLeadTime;

                //onnet

                if (arrServiceLeadTimes[0] == "NA")
                    objParentSpeed.offnetServiceLeadTimeWithCPE = "  " +arrServiceLeadTimes[1];
                else
                    objParentSpeed.offnetServiceLeadTimeWithCPE = arrServiceLeadTimes[0] + "                                           " + arrServiceLeadTimes[1];

                if (arrServiceLeadTimes[2] == "NA")
                    objParentSpeed.onnetServiceLeadTimeWithCPE = "   " + arrServiceLeadTimes[3];
                else
                    objParentSpeed.onnetServiceLeadTimeWithCPE = arrServiceLeadTimes[2] + "  " + arrServiceLeadTimes[3];


                //objParentSpeed.ServiceLeadTimeWithOutCPE = arrServiceLeadTimes[0] == "NA" ? "" : arrServiceLeadTimes[0] + "                                           " + arrServiceLeadTimes[1];

                //   objParentSpeed.onnetServiceLeadTimeWithOutCPE

                if (arrServiceLeadTimes[4] == "NA")
                {
                    if (isNNI)
                        objParentSpeed.offnetServiceLeadTimeWithOutCPE = "NA";
                    else
                        objParentSpeed.offnetServiceLeadTimeWithOutCPE = arrServiceLeadTimes[4];

                }
                else
                {
                    if (isNNI)
                        objParentSpeed.offnetServiceLeadTimeWithOutCPE = "N/A";
                    else
                        objParentSpeed.offnetServiceLeadTimeWithOutCPE = arrServiceLeadTimes[4] + "    " + arrServiceLeadTimes[5];

                }



                if (arrServiceLeadTimes[6] == "NA")
                {
                    if (isNNI)
                        objParentSpeed.onnetServiceLeadTimeWithOutCPE = "NA";
                    else
                        objParentSpeed.onnetServiceLeadTimeWithOutCPE = arrServiceLeadTimes[7];
                }
                else
                {
                    if (isNNI)
                        objParentSpeed.onnetServiceLeadTimeWithOutCPE = "N/A";
                    else
                        objParentSpeed.onnetServiceLeadTimeWithOutCPE = arrServiceLeadTimes[6] + "    " + arrServiceLeadTimes[7];
                }

            }

            objParentSpeed.offnetwithCPEStatus.Add(arrServiceLeadTimes[0] == "NA" ? "" : arrServiceLeadTimes[0]);
            objParentSpeed.offnetwithCPEStatus.Add(arrServiceLeadTimes[1]);

            //if (isNNI)
            //    objParentSpeed.offnetWithOutCPEStatus.Add(arrServiceLeadTimes[4] != "NA" ? "N/A" : arrServiceLeadTimes[4]);
            //else
            //    objParentSpeed.offnetWithOutCPEStatus.Add(arrServiceLeadTimes[4] == "NA" ? "" : arrServiceLeadTimes[4]);


            if (arrServiceLeadTimes[4] != "NA")
                if (isNNI)
                {
                    objParentSpeed.offnetWithOutCPEStatus.Add("N/A");
                    objParentSpeed.offnetWithOutCPEStatus.Add("");
                }
                else
                {
                    objParentSpeed.offnetWithOutCPEStatus.Add(arrServiceLeadTimes[4]);
                    objParentSpeed.offnetWithOutCPEStatus.Add(arrServiceLeadTimes[5]);
                }
            else
                if (isNNI)
                {
                    objParentSpeed.offnetWithOutCPEStatus.Add("N/A");
                    objParentSpeed.offnetWithOutCPEStatus.Add("");
                }
                else
                {
                    objParentSpeed.offnetWithOutCPEStatus.Add("");
                    objParentSpeed.offnetWithOutCPEStatus.Add(arrServiceLeadTimes[5]);
                }

            objParentSpeed.onnetWithCPEStatus.Add(arrServiceLeadTimes[2] == "NA" ? "" : arrServiceLeadTimes[2]);
            objParentSpeed.onnetWithCPEStatus.Add(arrServiceLeadTimes[3]);

            //objParentSpeed.onnetWithoutCPEStatus.Add(arrServiceLeadTimes[6] == "NA" ? "" : arrServiceLeadTimes[6]);
            //objParentSpeed.onnetWithoutCPEStatus.Add(arrServiceLeadTimes[7]);

            if (arrServiceLeadTimes[6] != "NA")
                if (isNNI)
                {
                    objParentSpeed.onnetWithoutCPEStatus.Add("N/A");
                    objParentSpeed.onnetWithoutCPEStatus.Add("");
                }
                else
                {
                    objParentSpeed.onnetWithoutCPEStatus.Add(arrServiceLeadTimes[6]);
                    objParentSpeed.onnetWithoutCPEStatus.Add(arrServiceLeadTimes[7]);
                }
            else
                if (isNNI)
                {
                    objParentSpeed.onnetWithoutCPEStatus.Add("N/A");
                    objParentSpeed.onnetWithoutCPEStatus.Add("");
                }
                else
                {
                    objParentSpeed.onnetWithoutCPEStatus.Add("");
                    objParentSpeed.onnetWithoutCPEStatus.Add(arrServiceLeadTimes[7]);
                }
        }

        public DataSet GetNotesPriority(int ProductID)
        {
            FiltersDAL dal = new FiltersDAL();
            return dal.GetNotesPriority(ProductID);
        }

        public DataSet GetCPESupplierDetails(int CountryID)
        {
            FiltersDAL dal = new FiltersDAL();
            return dal.GetCPESupplierDetails(CountryID);
        }



        public string getLeadTime(string accLeadTimeOffnet, string accessLeadTimeonnet, string accessLeadtimeonnetstatus,
            string accLeadTimeOffnetStatus, string cpeLeadTime, string cpeLeadTimeStatus, string portSpeedLeadTime,
            out string GetCPELeadTimeNew, out string toolTipLeadtime)
        {
            GetCPELeadTimeNew = "";
            toolTipLeadtime = accLeadTimeOffnet + "|" + accLeadTimeOffnetStatus + "|" + accessLeadTimeonnet + "|" +

               accessLeadtimeonnetstatus + "|" +
               cpeLeadTime + "|" + cpeLeadTimeStatus;

            if (string.IsNullOrEmpty(accLeadTimeOffnet) || string.IsNullOrEmpty(portSpeedLeadTime) || string.IsNullOrEmpty(cpeLeadTime))
            {
                GetCPELeadTimeNew = "NA,ICB";
            }
            else
            {
                if (int.Parse(accLeadTimeOffnet) > int.Parse(cpeLeadTime))
                {

                    GetCPELeadTimeNew = (int.Parse(portSpeedLeadTime) + int.Parse(accLeadTimeOffnet)).ToString();
                    if (accLeadTimeOffnetStatus.ToUpper() == "ICB" || cpeLeadTimeStatus.ToUpper() == "ICB")
                    {
                        GetCPELeadTimeNew += ",ICB";
                    }
                    else if (accLeadTimeOffnetStatus.ToUpper() == "ESTIMATE" || cpeLeadTimeStatus.ToUpper() == "ESTIMATE")
                    {
                        GetCPELeadTimeNew += ",Estimate";
                    }
                    else if (accLeadTimeOffnetStatus.ToUpper() == "STANDARD" || cpeLeadTimeStatus.ToUpper() == "STANDARD")
                    {
                        GetCPELeadTimeNew += ",Standard";
                    }
                    else
                    {
                        GetCPELeadTimeNew += ",";
                    }
                }
                else if (int.Parse(accLeadTimeOffnet) == int.Parse(cpeLeadTime))
                {
                    GetCPELeadTimeNew = (int.Parse(portSpeedLeadTime) + int.Parse(cpeLeadTime)).ToString();
                    if (accLeadTimeOffnetStatus.ToUpper() == "ICB" || cpeLeadTimeStatus.ToUpper() == "ICB")
                    {
                        GetCPELeadTimeNew += ",ICB";
                    }
                    else if (accLeadTimeOffnetStatus.ToUpper() == "ESTIMATE" || cpeLeadTimeStatus.ToUpper() == "ESTIMATE")
                    {
                        GetCPELeadTimeNew += ",Estimate";
                    }
                    else if (accLeadTimeOffnetStatus.ToUpper() == "STANDARD" || cpeLeadTimeStatus.ToUpper() == "STANDARD")
                    {
                        GetCPELeadTimeNew += ",Standard";
                    }
                    else
                    {
                        GetCPELeadTimeNew += ",";
                    }
                }
                else if (int.Parse(accLeadTimeOffnet) < int.Parse(cpeLeadTime))
                {
                    GetCPELeadTimeNew = (int.Parse(portSpeedLeadTime) + int.Parse(cpeLeadTime)).ToString();
                    if (accLeadTimeOffnetStatus.ToUpper() == "ICB" || cpeLeadTimeStatus.ToUpper() == "ICB")
                    {
                        GetCPELeadTimeNew += ",ICB";
                    }
                    else if (accLeadTimeOffnetStatus.ToUpper() == "ESTIMATE" || cpeLeadTimeStatus.ToUpper() == "ESTIMATE")
                    {
                        GetCPELeadTimeNew += ",Estimate";
                    }
                    else if (accLeadTimeOffnetStatus.ToUpper() == "STANDARD" || cpeLeadTimeStatus.ToUpper() == "STANDARD")
                    {
                        GetCPELeadTimeNew += ",Standard";
                    }
                    else
                    {
                        GetCPELeadTimeNew += ",";
                    }
                }


            }
            if (string.IsNullOrEmpty(accessLeadTimeonnet) || string.IsNullOrEmpty(portSpeedLeadTime) || string.IsNullOrEmpty(cpeLeadTime))
            {
                GetCPELeadTimeNew += ",NA,ICB";
            }
            else
            {
                if (int.Parse(accessLeadTimeonnet) > int.Parse(cpeLeadTime))
                {
                    GetCPELeadTimeNew += "," + (int.Parse(portSpeedLeadTime) + int.Parse(accessLeadTimeonnet)).ToString();
                    if (accessLeadtimeonnetstatus.ToUpper() == "ICB" || cpeLeadTimeStatus.ToUpper() == "ICB")
                    {
                        GetCPELeadTimeNew += ",ICB";
                    }
                    else if (accessLeadtimeonnetstatus.ToUpper() == "ESTIMATE" || cpeLeadTimeStatus.ToUpper() == "ESTIMATE")
                    {
                        GetCPELeadTimeNew += ",Estimate";
                    }
                    else if (accessLeadtimeonnetstatus.ToUpper() == "STANDARD" || cpeLeadTimeStatus.ToUpper() == "STANDARD")
                    {
                        GetCPELeadTimeNew += ",Standard";
                    }
                    else
                    {
                        GetCPELeadTimeNew += ",";
                    }
                }
                else if (int.Parse(accessLeadTimeonnet) == int.Parse(cpeLeadTime))
                {
                    GetCPELeadTimeNew += "," + (int.Parse(portSpeedLeadTime) + int.Parse(cpeLeadTime)).ToString();
                    if (accessLeadtimeonnetstatus.ToUpper() == "ICB" || cpeLeadTimeStatus.ToUpper() == "ICB")
                    {
                        GetCPELeadTimeNew += ",ICB";
                    }
                    else if (accessLeadtimeonnetstatus.ToUpper() == "ESTIMATE" || cpeLeadTimeStatus.ToUpper() == "ESTIMATE")
                    {
                        GetCPELeadTimeNew += ",Estimate";
                    }
                    else if (accessLeadtimeonnetstatus.ToUpper() == "STANDARD" || cpeLeadTimeStatus.ToUpper() == "STANDARD")
                    {
                        GetCPELeadTimeNew += ",Standard";
                    }
                    else
                    {
                        GetCPELeadTimeNew += ",";
                    }
                }
                else if (int.Parse(accessLeadTimeonnet) < int.Parse(cpeLeadTime))
                {
                    GetCPELeadTimeNew += "," + (int.Parse(portSpeedLeadTime) + int.Parse(cpeLeadTime)).ToString();
                    if (accessLeadtimeonnetstatus.ToUpper() == "ICB" || cpeLeadTimeStatus.ToUpper() == "ICB")
                    {
                        GetCPELeadTimeNew += ",ICB";
                    }
                    else if (accessLeadtimeonnetstatus.ToUpper() == "ESTIMATE" || cpeLeadTimeStatus.ToUpper() == "ESTIMATE")
                    {
                        GetCPELeadTimeNew += ",Estimate";
                    }
                    else if (accessLeadtimeonnetstatus.ToUpper() == "STANDARD" || cpeLeadTimeStatus.ToUpper() == "STANDARD")
                    {
                        GetCPELeadTimeNew += ",Standard";
                    }
                    else
                    {
                        GetCPELeadTimeNew += ",";
                    }
                }
            }
            bool result = false;
            int number;
            if (string.IsNullOrEmpty(accLeadTimeOffnet) || string.IsNullOrEmpty(portSpeedLeadTime))
            {
                GetCPELeadTimeNew += ",NA,ICB";
            }
            else
            {

                result = int.TryParse(portSpeedLeadTime, out number);

                if (result)
                {

                    GetCPELeadTimeNew += "," + ((int.Parse(portSpeedLeadTime) + int.Parse(accLeadTimeOffnet)).ToString()) + "," + accLeadTimeOffnetStatus;
                }
                else
                {
                    GetCPELeadTimeNew += "," + (int.Parse(accLeadTimeOffnet)).ToString() + "," + accLeadTimeOffnetStatus;
                }
            }


            if (string.IsNullOrEmpty(accessLeadTimeonnet) || string.IsNullOrEmpty(portSpeedLeadTime))
            {
                GetCPELeadTimeNew += ",NA,ICB";
            }
            else
            {
                result = int.TryParse(portSpeedLeadTime, out number);

                if (result)
                {
                    GetCPELeadTimeNew += "," + ((int.Parse(portSpeedLeadTime) + int.Parse(accessLeadTimeonnet)).ToString()) + "," + accLeadTimeOffnetStatus;
                }
                else
                {
                    GetCPELeadTimeNew += "," + (int.Parse(accessLeadTimeonnet)).ToString() + "," + accLeadTimeOffnetStatus;
                }

            }

            return GetCPELeadTimeNew;
        }

    }
}
