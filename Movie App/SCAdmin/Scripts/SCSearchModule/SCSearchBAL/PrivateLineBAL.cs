using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using SCSearchDAL;
using System.Data;
using System.Collections;

namespace SCSearchBAL
{
    public class PrivateLineBAL
    {
        public Hashtable GetGeneralDetails(int Priority, int ProductCode, int Country1ID, int Country2ID, int City1ID, int City2ID, int PortSpeedID)
        {
            PrivateLineDAL dal = new PrivateLineDAL();
            return dal.GetGeneralDetails(Priority, ProductCode, Country1ID, Country2ID, City1ID, City2ID, PortSpeedID);
        }
        public int GetCityID(int CountryID, int CityID, int PortSpeedID, int ProductID)
        {
            PrivateLineDAL dal = new PrivateLineDAL();
            return dal.GetCityID(CountryID, CityID, PortSpeedID, ProductID);
        }

        public int GetCityIDNew(int CountryID, int CityID, int PortSpeedID, int ProductID, int Country1)
        {
            PrivateLineDAL dal = new PrivateLineDAL();
            return dal.GetCityIDNew(CountryID, CityID, PortSpeedID, ProductID, Country1);
        }

        public DataSet GetSubProductName(int SubProductID)
        {
            PrivateLineDAL dal = new PrivateLineDAL();
            return dal.GetSubProductName(SubProductID);
        }

        public DataSet GetCountryName(int CountryID, int CityID)
        {
            PrivateLineDAL dal = new PrivateLineDAL();
            return dal.GetCountryName(CountryID, CityID);
        }

        public DataSet GetCountryCoverageDetails(int CaseID, int CharTypeID)
        {
            PrivateLineDAL dal = new PrivateLineDAL();
            return dal.GetCountryCoverageDetails(CaseID, CharTypeID);
        }

        public int GetCarriersCount(int ProductID, int CountryID, int CityID, int SubProductID, int PortSpeed)
        {
            PrivateLineDAL dal = new PrivateLineDAL();
            return dal.GetCarriersCount(ProductID, CountryID, CityID, SubProductID, PortSpeed);
        }

        public DataSet GetCarriers(int ProductID, int CountryID, int CityID, int SubProductID, int PortSpeed)
        {
            PrivateLineDAL dal = new PrivateLineDAL();
            return dal.GetCarriers(ProductID, CountryID, CityID, SubProductID, PortSpeed);
        }

        public DataSet GetCarrierID(int ProductID, int CountryID, int CityID, int SubProductID, int PortSpeed)
        {
            PrivateLineDAL dal = new PrivateLineDAL();
            return dal.GetCarrierID(ProductID, CountryID, CityID, SubProductID, PortSpeed);
        }

        public DataSet GetCaseID(int ProductID, int CountryID, int CityID, int SubProductID, int PortSpeed, int CarrierID)
        {
            PrivateLineDAL dal = new PrivateLineDAL();
            return dal.GetCaseID(ProductID, CountryID, CityID, SubProductID, PortSpeed, CarrierID);
        }

        public DataSet GetCharacteristics(int CaseID, int IgnoreHubbing, int SubProduct1, int SubProduct2)
        {
            PrivateLineDAL dal = new PrivateLineDAL();
            return dal.GetCharacteristics(CaseID, IgnoreHubbing, SubProduct1, SubProduct2);
        }

        public DataSet GetSpecialBidCode(int Case1ID, int Case2ID, int CharTypeID)
        {
            PrivateLineDAL dal = new PrivateLineDAL();
            return dal.GetSpecialBidCode(Case1ID, Case2ID, CharTypeID);
        }
        public DataSet GetOneSideShopping(int Case1ID, int Case2ID, int CharTypeID)
        {
            PrivateLineDAL dal = new PrivateLineDAL();
            return dal.GetOneSideShopping(Case1ID, Case2ID, CharTypeID);
        }
        public DataSet GetTransportMediumChars(int CaseID, int CharTypeID)
        {
            PrivateLineDAL dal = new PrivateLineDAL();
            return dal.GetTransportMediumChars(CaseID, CharTypeID);
        }
        public int GetEstimatedLeadTime(int CaseID)
        {
            PrivateLineDAL dal = new PrivateLineDAL();
            return dal.GetEstimatedLeadTime(CaseID);
        }

        public DataSet GetAccessInfoData1(int CaseID, int PortSpeed, int CountryID, int RegionID)
        {
            PrivateLineDAL dal = new PrivateLineDAL();
            return dal.GetAccessInfoData1(CaseID, PortSpeed, CountryID, RegionID);
        }

        public int GetHubSiteID(int CaseID)
        {
            PrivateLineDAL dal = new PrivateLineDAL();
            return dal.GetHubSiteID(CaseID);
        }

        public DataSet GetAccessInfoData2(int CaseID, int PortSpeed, int CountryID, int RegionID, int AccessSpeedCharID, int AccessSupplierCharID, int AccessSupplierNameID, int AccessProductTypeID, int ProductID)
        {
            PrivateLineDAL dal = new PrivateLineDAL();
            return dal.GetAccessInfoData2(CaseID, PortSpeed, CountryID, RegionID, AccessSpeedCharID, AccessSupplierCharID, AccessSupplierNameID, AccessProductTypeID, ProductID);
        }

        public DataSet GetSubProds(int ProductID)
        {
            PrivateLineDAL dal = new PrivateLineDAL();
            return dal.GetSubProds(ProductID);
        }


        public void GetLeadTime(string vPOP, string vCountry, string vSpeed, string vSupplier, string vAccType, string vAccSuppName,
            string vInterface, string vPortSpeedLeadTime, AccessInformation ai)
        {
            PrivateLineDAL dal = new PrivateLineDAL();
            DataTable dtOffnetOnner = dal.GetLeadTime(vPOP, vCountry, vSpeed, vSupplier, vAccType, vAccSuppName,
             vInterface, vPortSpeedLeadTime, 25);

            string accessLeadTimeOffNet = string.Empty;
            string accessLeadTimeOffNetStatus = string.Empty;
            string accessLeadTimeOnNet = string.Empty;
            string accessLeadTimeOnNetStatus = string.Empty;
            string GetCPELeadTimeNew;
            string getToolTip;
            foreach (DataRow dr in dtOffnetOnner.Rows)
            {
                accessLeadTimeOffNet = dr[0].ToString();
                accessLeadTimeOffNetStatus = dr[1].ToString();
                accessLeadTimeOnNet = dr[2].ToString();
                accessLeadTimeOnNetStatus = dr[3].ToString();
            }

            Filters objFilter = new Filters();

            objFilter.getLeadTime(accessLeadTimeOffNet, accessLeadTimeOnNet, accessLeadTimeOnNetStatus, accessLeadTimeOffNetStatus,
                                "", "", vPortSpeedLeadTime, out GetCPELeadTimeNew, out getToolTip);


            bindServiceLeadTimes(GetCPELeadTimeNew, getToolTip, vPortSpeedLeadTime, ai);
        }


        // popup needs to be implemented 
        private void bindServiceLeadTimes(string serviceLeadTime, string toolTipStandard, string portSpeedLeadTime, AccessInformation ai)
        {
            string[] arrServiceLeadTimes = serviceLeadTime.Split(',');
            ai.onnetWithCPEStatus = new List<string>();
            ai.onnetWithoutCPEStatus = new List<string>();
            ai.offnetwithCPEStatus = new List<string>();
            ai.offnetWithOutCPEStatus = new List<string>();


            string[] strToolTip = toolTipStandard.Split('|');
            if (strToolTip.Length > 0)
            {
                ai.onnetAccessLeadTimeStatus = strToolTip[2] + "                                           " + strToolTip[3];
                ai.offnetAccessLeadTimeStatus = strToolTip[0] + "                                           " + strToolTip[1];
                ai.PortSpeedLeadTime = portSpeedLeadTime;

                //if (arrServiceLeadTimes[4] != "NA" && strToolTip[0] != "ICB" && strToolTip[0] != " " && int.Parse(portSpeedLeadTime) > 0)
                //{
                //    ai.offnetServiceLeadTime = (int.Parse(strToolTip[0]) + int.Parse(portSpeedLeadTime)).ToString() + "  " + arrServiceLeadTimes[5];
                //    ai.onnetServiceLeadTime = (int.Parse(strToolTip[2]) + int.Parse(portSpeedLeadTime)).ToString() + "  " + arrServiceLeadTimes[7];
                //}
                //else
                //{
                    ai.offnetServiceLeadTime = arrServiceLeadTimes[4];
                    ai.onnetServiceLeadTime = arrServiceLeadTimes[7];
                //}




                //  ai.ServiceLeadTimeWithCPE = arrServiceLeadTimes[4] == "NA" ? "" : arrServiceLeadTimes[4] + "                                           " + arrServiceLeadTimes[5];
                //ai.ServiceLeadTimeWithOutCPE = arrServiceLeadTimes[6] == "NA" ? "" : arrServiceLeadTimes[6] + "                                           " + arrServiceLeadTimes[7];

            }

            ai.offnetwithCPEStatus.Add(arrServiceLeadTimes[0] == "NA" ? "" : arrServiceLeadTimes[0]);
            ai.offnetwithCPEStatus.Add(arrServiceLeadTimes[1]);


            ai.offnetWithOutCPEStatus.Add(arrServiceLeadTimes[4] == "NA" ? "" : arrServiceLeadTimes[4]);
            ai.offnetWithOutCPEStatus.Add(arrServiceLeadTimes[5]);

            ai.onnetWithCPEStatus.Add(arrServiceLeadTimes[2] == "NA" ? "" : arrServiceLeadTimes[2]);
            ai.onnetWithCPEStatus.Add(arrServiceLeadTimes[3]);

            ai.onnetWithoutCPEStatus.Add(arrServiceLeadTimes[6] == "NA" ? "" : arrServiceLeadTimes[6]);
            ai.onnetWithoutCPEStatus.Add(arrServiceLeadTimes[7]);

        }
    }
}
