using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

using System.Data;
using SCSearchBAL;
using System.Web.Services;
using System.Web.Script.Services;
using System.Web.Script.Serialization;
using System.Collections;
using System.Globalization;
using System.Threading;
using System.Configuration;

namespace SCSearch
{
    public partial class Search : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [WebMethod]
        public static List<Product> GetProductsData(int CountryID, int AccessLevel, string BtGfrCodes, string SegregationCodes, string User_Id)
        {
            return GetProdData(CountryID, AccessLevel, BtGfrCodes, SegregationCodes, User_Id);

        }
        [WebMethod]
        public static List<Region> GetRegionsData(int ProductID)
        {
            return GetRegions(ProductID);
        }
        [WebMethod]
        public static List<countries> GetCountriesData(int ProductID, int RegionID, int flag, int Speed, int AccessLevel, string BtGfrCodes, string SegregationCodes, string User_Id)
        {
            return GetCountries(ProductID, RegionID, flag, Speed, AccessLevel, BtGfrCodes, SegregationCodes, User_Id);
        }

        [WebMethod]
        public static int GetRegion(int CountryID)
        {

            Filters prodDet = new Filters();
            return prodDet.GetRegion(CountryID);
        }

        [WebMethod]
        public static List<stateProvince> GetStatesData(int ProductID, int RegionID, int CountryID, int isIA)
        {
            return GetStates(ProductID, RegionID, CountryID, isIA);
        }
        [WebMethod]
        public static List<City> GetCitiesData(int ProductID, int RegionID, int countryID, int StateID, int Speed, int flag, int isIA,int CityFlag)
        {
            return GetCities(ProductID, RegionID, countryID, StateID, Speed, flag, isIA, CityFlag);
        }
        [WebMethod]
        public static List<Pop> GetPopData(int ProductID, int RegionID, int countryID, int StateID, int CityID, int isIA)
        {
            return Getpops(ProductID, RegionID, countryID, StateID, CityID, isIA);
        }

        [WebMethod]
        public static int GetProductCPE(int ProductID, int CountryID, int CaseID)
        {
            //List<Product> ProdData = GetProdData(CountryID);
            //Product prod = ProdData.Where(t => t.ProductID == ProductID).SingleOrDefault();
            //return prod.IsCPEExists;

            return IsCPEExist(ProductID, CaseID);

        }

        [WebMethod]
        public static int GetRegionDetailsByCountryIDProduct(int ProductID, int CountryID)
        {
            Filters balcountries = new Filters();
            DataSet ds = balcountries.GetRegionDetailsByCountryProduct(ProductID, CountryID);
            int result = 0;
            if (ds != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
            {
                result = ds.Tables[0].Rows.Count;
            }
            return result;
        }

        [WebMethod]
        public static CountryCities GetCountryCites(int ProductID)
        {
            Filters balcountries = new Filters();
            DataSet ds = null;
            List<countries> lstcountries = new List<countries>();
            List<City> lstCities = new List<City>();
            CountryCities cc = null;
            countries cntry = new countries();
            if (ProductID == 58 || ProductID == 72)
            {
                ds = GetBandWidthCountriesCites(ProductID, 0, 0, 0, 0, 0, 0, 0);
                var CountryList = ds.Tables[0].AsEnumerable().Select(t => new { CountryID = t.Field<decimal>("CountryID"), CountryName = t.Field<string>("CountryName") }).Distinct().OrderBy(t => t.CountryName);

                foreach (var item in CountryList)
                {
                    if (lstcountries.Where(t => t.CountryID == Convert.ToInt32(item.CountryID)).ToList().Count == 0)
                    {
                        lstcountries.Add(new countries() { CountryID = Convert.ToInt32(item.CountryID), CountryName = item.CountryName });
                    }
                }

                ds = balcountries.GetOnlyCountries(ProductID, 0);
                var CountryListNew = ds.Tables[0].AsEnumerable().Select(t => new { CountryID = t.Field<decimal>("CountryID"), CountryName = t.Field<string>("CountryName") }).Distinct().OrderBy(t => t.CountryName);

                foreach (var item in CountryListNew)
                {
                    if (lstcountries.Where(t => t.CountryID == Convert.ToInt32(item.CountryID)).ToList().Count == 0)
                    {
                        lstcountries.Add(new countries() { CountryID = Convert.ToInt32(item.CountryID), CountryName = item.CountryName });
                    }
                }

                var Citlist = ds.Tables[0].AsEnumerable().Select(t => new { CityID = t.Field<decimal>("CityID"), CityName = t.Field<string>("CityName") }).Distinct().OrderBy(t => t.CityName);

                foreach (var item in Citlist)
                {
                    if (lstCities.Where(t => t.CityID == Convert.ToInt32(item.CityID)).ToList().Count == 0)
                    {
                        lstCities.Add(new City() { CityID = Convert.ToInt32(item.CityID), CityName = item.CityName });
                    }
                }

                cc = new CountryCities() { lstCities = lstCities, lstCountries = lstcountries };

            }
            return cc;
        }

        [WebMethod]
        public static int GetProductPriority(int ProductID)
        {
            int count = 0;
            Filters filter = new Filters();
            DataSet ds = filter.GetNotesPriority(ProductID);
            if (ds != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
            {
                var PriorityData = ds.Tables[0].AsEnumerable().Where(t => t.Field<decimal>("region_id") == 0 && t.Field<decimal>("country_id") == 0 && t.Field<decimal>("city_id") == 0).Select(t => new { PriorityID = t.Field<decimal>("note_priority_cd") }).FirstOrDefault();
                if (PriorityData != null)
                {
                    if (PriorityData.PriorityID == 1 || PriorityData.PriorityID == 2)
                    {
                        count = 1;
                    }
                }
            }
            return count;
        }
        [WebMethod]
        public static int GetCountryPriority(int ProductID, int CountryID, int RegionID)
        {
            int count = 0;
            Filters filter = new Filters();
            DataSet ds = filter.GetNotesPriority(ProductID);

            //RegionID = 4;

            if (ds != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
            {
                var PriorityCntrylink = ds.Tables[0].AsEnumerable().Where(t => t.Field<decimal>("country_id") == CountryID && t.Field<decimal>("region_id") == RegionID && t.Field<decimal>("city_id") == 0).Select(t => new { PriorityID = t.Field<decimal>("note_priority_cd") }).FirstOrDefault();

                if (PriorityCntrylink != null)
                {
                    if (PriorityCntrylink.PriorityID == 1)
                    {
                        count = 1;
                    }
                    else if (PriorityCntrylink.PriorityID == 2)
                    {
                        count = 2;
                    }
                }
            }

            return count;
        }

        [WebMethod]
        public static int GetRegionPriority(int ProductID, int RegionID)
        {
            int count = 0;
            Filters filter = new Filters();
            DataSet ds = filter.GetNotesPriority(ProductID);



            if (ds != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
            {
                var PriorityData = ds.Tables[0].AsEnumerable().Where(t => t.Field<decimal>("region_id") == RegionID && t.Field<decimal>("country_id") == 0 && t.Field<decimal>("city_id") == 0).Select(t => new { PriorityID = t.Field<decimal>("note_priority_cd") }).FirstOrDefault();

                if (PriorityData != null)
                {
                    if (PriorityData.PriorityID == 1)
                    {
                        count = 1;
                    }
                    else if (PriorityData.PriorityID == 2)
                    {
                        count = 2;
                    }
                }
            }

            return count;
        }



        [WebMethod]
        public static ProdAccessType GetProductAccessType(int ProductID)
        {
            Filters prodAccessType = new Filters();
            ProdAccessType ProdAccType = new ProdAccessType();

            DataSet dsAccessType = prodAccessType.GetProductAccessType(ProductID);
            if (dsAccessType != null && dsAccessType.Tables.Count > 0 && dsAccessType.Tables[0].Rows.Count > 0)
            {
                int DSL = 0, EthernetLeasedLine = 0, HVPN = 0, VSAT = 0;
                foreach (DataRow item in dsAccessType.Tables[0].Rows)
                {
                    if (item["Parent_Access_Type_Name"].ToString() == "Ethernet" || item["Parent_Access_Type_Name"].ToString() == "Leased Line")
                    {
                        EthernetLeasedLine = 1;
                    }
                    else if (item["Parent_Access_Type_Name"].ToString().ToLower() == "xDSL".ToLower())
                    {
                        DSL = 1;
                    }
                    else if (item["Parent_Access_Type_Name"].ToString().ToLower() == "hVPN".ToLower())
                    {
                        HVPN = 1;
                    }
                    else if (item["Parent_Access_Type_Name"].ToString().ToLower() == "VSAT".ToLower())
                    {
                        VSAT = 1;
                    }

                }

                ProdAccType = new ProdAccessType()
                {
                    EthernetLeasedLine = EthernetLeasedLine,
                    DSL = DSL,
                    HVPN = HVPN,
                    VSAT = VSAT
                };
            }

            return ProdAccType;
        }

        [WebMethod]
        public static List<NetwrokPlatform> GetNetworkPlatform(int ProductID, int HubSiteID)
        {
            Filters prodDet = new Filters();
            List<NetwrokPlatform> lstPlatform = new List<NetwrokPlatform>();

            int Count = prodDet.GetNetworkPlatformCount(ProductID, HubSiteID);
            if (Count > 1)
            {
                DataSet ds = prodDet.GetNetworkPlatformData(ProductID, HubSiteID);
                if (ds != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
                {

                    foreach (DataRow item in ds.Tables[0].Rows)
                    {
                        lstPlatform.Add(new NetwrokPlatform() { ID = Convert.ToInt32(item["Capman_Platform_Id"].ToString()), NetworkPlatform = item["Capman_Platform_Name"].ToString() });
                    }
                }
            }
            return lstPlatform;
        }

        [WebMethod]
        public static int ShowCPE(int ProductID)
        {
            Filters prodDet = new Filters();
            List<NetwrokPlatform> lstPlatform = new List<NetwrokPlatform>();

            return prodDet.ShowCPE(ProductID);

        }

        [WebMethod]
        public static RegionDetails GetInfoByCity(int CityID, int ProductID)
        {

            Filters prodDet = new Filters();
            DataSet ds = prodDet.GetInfoByCity(CityID, ProductID);
            RegionDetails rd = new RegionDetails();
            if (ds != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
            {
                rd.RegionID = Convert.ToInt32(ds.Tables[0].Rows[0]["REGION_ID"].ToString());
                rd.CountryID = Convert.ToInt32(ds.Tables[0].Rows[0]["COUNTRY_ID"].ToString());



                rd.StateID = Convert.ToInt32(ds.Tables[0].Rows[0]["STATE_PROVINCE_ID"].ToString());
            }
            return rd;
        }

        [WebMethod]
        public static RegionDetails GetInfoByState(int StateID)
        {

            Filters prodDet = new Filters();
            DataSet ds = prodDet.GetInfoByState(StateID);
            RegionDetails rd = new RegionDetails();
            if (ds != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
            {
                rd.RegionID = Convert.ToInt32(ds.Tables[0].Rows[0]["REGION_ID"].ToString());
                rd.CountryID = Convert.ToInt32(ds.Tables[0].Rows[0]["COUNTRY_ID"].ToString());

            }
            return rd;
        }


        [WebMethod]
        public static RegionDetails GetinfoByHubSite(int HubSiteID)
        {

            Filters prodDet = new Filters();
            DataSet ds = prodDet.GetInfoByHubSite(HubSiteID);
            RegionDetails rd = new RegionDetails();
            if (ds != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
            {
                rd.RegionID = Convert.ToInt32(ds.Tables[0].Rows[0]["REGION_ID"].ToString());
                rd.CountryID = Convert.ToInt32(ds.Tables[0].Rows[0]["COUNTRY_ID"].ToString());
                rd.StateID = Convert.ToInt32(ds.Tables[0].Rows[0]["STATE_PROVINCE_ID"].ToString());
                rd.CityID = Convert.ToInt32(ds.Tables[0].Rows[0]["CITY_ID"].ToString());

            }
            return rd;
        }

        [WebMethod]
        public static int GetParentDetails(int ProductID)
        {
            CaseDetBal bal = new CaseDetBal();
            return bal.GetParentProduct(ProductID);
        }

        [WebMethod]
        public static List<CPESuppliers> GetSuppliersData(int countryID, int ProductID, int CityID)
        {
            return GetCPESuppliers(countryID, ProductID, CityID);
        }
        [WebMethod]
        public static ProductDetails GetProductDetails(int ProdLocLevel, int CapmanPlatform, int StateFlag, int ProductID, int RegionID, int CountryID, int StateID, int CityID, int HubSiteID, int DisplaySearch)
        {
            ProductDetails prodDet = new ProductDetails();
            CaseDetBal BALProductDetails = new CaseDetBal();
            //2, -1, 0, 21, 2, 89, 81, 3967, 3465
            string PopCode = "", PopColor = "";
            DataSet dsPop = BALProductDetails.GetPopCode(HubSiteID, ProductID, DisplaySearch);
            if (dsPop != null && dsPop.Tables.Count > 0 && dsPop.Tables[0].Rows.Count > 0)
            {
                List<DataRow> lstRows = dsPop.Tables[0].AsEnumerable().ToList<DataRow>();



                DataRow dr = lstRows.Where(t => t.Field<string>("char_name") == "POP_PLATFORM_CODE").FirstOrDefault();
                PopCode = string.IsNullOrEmpty(dr["CHAR_VALUE"].ToString()) ? "" : dr["CHAR_VALUE"].ToString();

                dr = null;
                dr = lstRows.Where(t => t.Field<string>("char_name") == "NETWORK_COLOUR").FirstOrDefault();
                if (dr != null)
                {
                    PopColor = dr["CHAR_VALUE"].ToString();
                }
            }

            int CapmanPlatformID = BALProductDetails.GetCapmanPlatformID(ProductID, HubSiteID);

            if (StateID == 0)
                StateFlag = 0;

            DataSet dsProductDetails = BALProductDetails.GetProdDetails(ProdLocLevel, CapmanPlatform, StateFlag, ProductID, RegionID, CountryID, StateID, CityID, HubSiteID);
            if (dsProductDetails != null && dsProductDetails.Tables.Count > 0 && dsProductDetails.Tables[0].Rows.Count == 0)
            {
                StateFlag = 0;
                dsProductDetails = BALProductDetails.GetProdDetails(ProdLocLevel, CapmanPlatform, StateFlag, ProductID, RegionID, CountryID, StateID, CityID, HubSiteID);
            }
            if (dsProductDetails != null && dsProductDetails.Tables.Count > 0 && dsProductDetails.Tables[0].Rows.Count > 0)
            {

                foreach (DataRow drProdDetails in dsProductDetails.Tables[0].Rows)
                {

                    //product level based condition added beacause if product level is 2 then capman platform name will not be visible
                    prodDet = new ProductDetails();

                    prodDet.ProdName = Convert.ToString(drProdDetails["product_name"]);
                    prodDet.ServiceAvailable = Convert.ToInt32(drProdDetails["parent_product_cd"].ToString()) > 0 ? drProdDetails["avail_desc"].ToString() + " (Delivered over " + drProdDetails["PP"].ToString() + ")" : drProdDetails["avail_desc"].ToString();
                    prodDet.PopCode = string.IsNullOrEmpty(PopCode) ? "" : PopCode;
                    prodDet.PopColor = PopColor;
                    prodDet.TargetAvailabilityDate = drProdDetails["Site_Availability_Dt"].ToString() != "" ? Convert.ToDateTime(drProdDetails["Site_Availability_Dt"].ToString()).ToString("dd-MMM-yyyy") : string.Empty;
                    if (ProdLocLevel == 4)
                    {
                        prodDet.NetworkName = drProdDetails["capman_platform_name"].ToString();
                        prodDet.ResilientPop = drProdDetails["support_resilient"].ToString();
                    }
                    prodDet.CaseID = Convert.ToInt32(drProdDetails["Case_ID"].ToString());
                    prodDet.ParentProductID = Convert.ToInt32(drProdDetails["parent_product_cd"].ToString());
                    prodDet.ParentProductName = drProdDetails["PP"].ToString();
                    prodDet.CapmanPlatformID = CapmanPlatformID;
                    return prodDet;
                }
            }
            return prodDet;
        }

        [WebMethod]
        public static List<PopCharacteristics> FetchPopCharacteristics(int SiteID, int ProductID, int DisplaySearch)
        {
            List<PopCharacteristics> popChars = new List<PopCharacteristics>();
            CaseDetBal BALPopCharacteristics = new CaseDetBal();
            string siteID = "";
            DataSet dsPopCharacteristics = BALPopCharacteristics.GetPopCharacteristics(SiteID, ProductID, DisplaySearch);
            if (dsPopCharacteristics != null && dsPopCharacteristics.Tables.Count > 0 && dsPopCharacteristics.Tables[0].Rows.Count > 0)
            {
                PopCharacteristics popchar = new PopCharacteristics();

                //CultureInfo cultureInfo = Thread.CurrentThread.CurrentCulture;
                //TextInfo textInfo = cultureInfo.TextInfo;

                foreach (DataRow drPopCharacteristics in dsPopCharacteristics.Tables[0].Rows)
                {
                    popchar = new PopCharacteristics()
                    {
                        //CharName = textInfo.ToTitleCase(drPopCharacteristics["char_name"].ToString().Replace("_", " ").ToLower()),
                        CharName = drPopCharacteristics["char_name"].ToString().Replace("_", " "),
                        CharValue = drPopCharacteristics["char_value"].ToString()
                    };
                    popChars.Add(popchar);
                }
            }

            return popChars;
        }

        public static string ToProperCase(string the_string)
        {
            // If there are 0 or 1 characters, just return the string.
            if (the_string == null) return the_string;
            if (the_string.Length < 2) return the_string.ToUpper();

            // Start with the first character.
            string result = the_string.Substring(0, 1).ToUpper();

            // Add the remaining characters.
            for (int i = 1; i < the_string.Length; i++)
            {
                if (char.IsUpper(the_string[i])) result += " ";
                result += the_string[i];
            }

            return result;
        }


        [WebMethod]
        public static List<grpCharacteristics> GetCharacteristics(int CaseID, int OptionMatrix, int CaseValidcd, int ProductID)
        {
            List<Characteristics> Chars = new List<Characteristics>();
            CaseDetBal BALCharacteristics = new CaseDetBal();

            DataSet dsCharacteristics = BALCharacteristics.GetCharacteristics(CaseID, OptionMatrix, CaseValidcd);
            List<grpCharacteristics> lstCharacteristics = new List<grpCharacteristics>();
            if (dsCharacteristics != null && dsCharacteristics.Tables.Count > 0 && dsCharacteristics.Tables[0].Rows.Count > 0)
            {

                List<Characteristics> lstchars = new List<Characteristics>();
                grpCharacteristics chr = null;

                //DataView dv = dsCharacteristics.Tables[0].DefaultView;
                //dv.RowFilter = "char_type_alias='NOTE'";
                //dv.ToTable().Rows[0]["char_type_alias"] = "Notes";
                //dsCharacteristics.Tables[0].AcceptChanges();

                DataRow[] drchars = dsCharacteristics.Tables[0].Select("char_type_alias='Note' or char_type_alias='NOTE'  or char_type_alias='note'");
                if (drchars.Length > 0)
                {
                    foreach (DataRow item in drchars)
                    {
                        item["char_type_alias"] = "Notes";
                    }

                    dsCharacteristics.Tables[0].AcceptChanges();
                    dsCharacteristics.AcceptChanges();
                }
                var drCharTypeAlias = dsCharacteristics.Tables[0].AsEnumerable().Select(t => new { CharTypeAlias = t.Field<string>("char_type_alias"), CharTypeName = t.Field<string>("Char_Type_Name") }).Distinct();
                string strCharTypeAlias = "";
                int flag = 0;

                //var NoteChars = dsCharacteristics.Tables[0].AsEnumerable().Where(t => t.Field<string>("char_type_alias").ToLower() == "NOTE".ToLower());


                foreach (var item in drCharTypeAlias)
                {
                    if (item.CharTypeName.ToString().ToLower().Contains("Display Placeholder".ToLower()) || item.CharTypeName.ToString().ToLower().Contains("Port Speed".ToLower()))
                        continue;

                    if (item.CharTypeAlias.ToString().ToUpper() == "Port Speed".ToUpper() || item.CharTypeAlias.ToString().ToUpper() == "PARENT PORT SPEEDS".ToUpper() || item.CharTypeAlias.ToString().ToUpper() == "CPE Bundles".ToUpper() || item.CharTypeAlias.ToString().ToUpper() == "CPE MAINTENANCE OPTIONS".ToUpper())
                    {
                        flag = 1;
                    }
                    if (flag == 1)
                        continue;
                    strCharTypeAlias = item.CharTypeAlias;
                    List<DataRow> drChars = dsCharacteristics.Tables[0].AsEnumerable().Where(t => t.Field<string>("char_type_alias") == item.CharTypeAlias).ToList<DataRow>();

                    foreach (var drChar in drChars)
                    {
                        lstchars.Add(new Characteristics()
                        {
                            CharName = drChar["char_name"].ToString(),
                            CharValue = string.IsNullOrEmpty(drChar["char_value"].ToString()) ? drChar["Avail_desc"].ToString() : drChar["char_value"].ToString().Replace("<a ", "<a target='_blank' ").Replace("../DispaNote.asp?", "DispaNotesList.aspx?ProductID=" + ProductID + "&")

                        });
                    }



                    lstCharacteristics.Add(new grpCharacteristics()
                    {
                        CharTypeAlias = item.CharTypeAlias,
                        chars = lstchars
                    });

                    lstchars = new List<Characteristics>();

                }

            }

            return lstCharacteristics;
        }

        [WebMethod]
        public static AccessList GetAccessSuppliers(int CaseID, int ProductID, int HubSiteID, int CaseValidID, int CountryID)
        {
            List<AccessSupplier> parentAccSupp = new List<AccessSupplier>();
            List<SupplierProduct> LstSupplierProduct = new List<SupplierProduct>();
            List<AccessSpeed> LstAccessSpeed = new List<AccessSpeed>();
            List<AccessType> LstAccessType = new List<AccessType>();
            AccessList accList = new AccessList();

            Filters bal = new Filters();
            DataSet dsAccessSupplier = bal.GetAccessSuppliers(CaseID, ProductID, HubSiteID, CaseValidID, CountryID);
            if (dsAccessSupplier != null && dsAccessSupplier.Tables.Count > 0 && dsAccessSupplier.Tables[0].Rows.Count > 0)
            {

                var AccessSuppliers = dsAccessSupplier.Tables[0].AsEnumerable().Select(t => new { AccessSupplierID = t.Field<decimal>("Access_Supplier_Char_Id"), AccessSupplierName = t.Field<string>("Supplier_Name") }).Distinct().OrderBy(t => t.AccessSupplierName);

                foreach (var item in AccessSuppliers)
                {
                    AccessSupplier AccSuplier = new AccessSupplier()
                    {

                        AccessSupplierID = Convert.ToInt32(item.AccessSupplierID),
                        AccessSupplierName = item.AccessSupplierName
                    };
                    parentAccSupp.Add(AccSuplier);
                }
                accList.accSupplierList = parentAccSupp;

                var SupplierProductList = dsAccessSupplier.Tables[0].AsEnumerable().Select(t => new { AccessSupplierID = t.Field<decimal>("Access_Supplier_Char_Id"), SupplierID = t.Field<decimal>("Access_Supplier_Name_Id"), SupplierProductName = t.Field<string>("Supplier_Prdt_Name") }).Distinct().OrderBy(t => t.SupplierProductName);

                foreach (var item in SupplierProductList)
                {
                    SupplierProduct SuppProduct = new SupplierProduct()
                    {
                        AccessSupplierID = Convert.ToInt32(item.AccessSupplierID),
                        SupplierID = Convert.ToInt32(item.SupplierID),
                        SupplierProductName = item.SupplierProductName
                    };
                    LstSupplierProduct.Add(SuppProduct);
                }
                accList.SupplierProductList = LstSupplierProduct;

                var AccessSpeedList = dsAccessSupplier.Tables[0].AsEnumerable().Select(t => new { AccessSpeedID = t.Field<decimal>("Access_Speed_Char_Id"), AccessSpeedName = t.Field<string>("Access_Speed"), ASOrder = t.Field<decimal>("ASOrder") }).Distinct().OrderBy(t => t.ASOrder);

                foreach (var item in AccessSpeedList)
                {
                    AccessSpeed AccSpeed = new AccessSpeed()
                    {

                        AccessSpeedID = Convert.ToInt32(item.AccessSpeedID),
                        AccessSpeedName = item.AccessSpeedName
                    };
                    LstAccessSpeed.Add(AccSpeed);
                }

                accList.AccessSpeedList = LstAccessSpeed;

                var AccessTypeList = dsAccessSupplier.Tables[0].AsEnumerable().Select(t => new { AccessTypeID = t.Field<decimal>("Access_Product_Type_Id"), AccessTypeName = t.Field<string>("access_type") }).Distinct().OrderBy(t => t.AccessTypeName);

                foreach (var item in AccessTypeList)
                {
                    AccessType AccSpeed = new AccessType()
                    {

                        AccessTypeID = Convert.ToInt32(item.AccessTypeID),
                        AccessTypeName = item.AccessTypeName
                    };
                    LstAccessType.Add(AccSpeed);
                }

                accList.AccessTypeList = LstAccessType;

            }

            return accList;

        }

        [WebMethod]
        public static PortSpeedDet GetPortSpeeds(int CaseID, int ProductID, int HubSiteID, int CaseValidID, int CountryID)
        {
            List<PortSpeed> pSpeed = new List<PortSpeed>();
            Filters bal = new Filters();
            PortSpeedDet pSpeedDet = new PortSpeedDet();
            DataSet dsPortSpeed = bal.GetPortSpeeds(CaseID, ProductID, HubSiteID, CaseValidID, CountryID);
            if (dsPortSpeed != null && dsPortSpeed.Tables.Count > 0 && dsPortSpeed.Tables[0].Rows.Count > 0)
            {
                int TenMbps = 2256;
                int SelectedPortSpeed = 0;
                bool isTenMbpsExist = false;

                foreach (DataRow item in dsPortSpeed.Tables[0].Rows)
                {
                    if (TenMbps == Convert.ToInt32(item["pspeedid"].ToString()))
                    {
                        SelectedPortSpeed = TenMbps;
                        isTenMbpsExist = true;
                    }
                    PortSpeed AccSuplier = new PortSpeed()
                    {
                        PortSpeedID = Convert.ToInt32(item["pspeedid"].ToString()),
                        PortSpeedName = item["portspeed"].ToString()
                    };
                    pSpeed.Add(AccSuplier);
                    if (!isTenMbpsExist)
                    {
                        SelectedPortSpeed = Convert.ToInt32(item["pspeedid"].ToString());
                    }
                }
                pSpeedDet.pSpeed = pSpeed;
                pSpeedDet.SelectedPortSpeed = SelectedPortSpeed;
            }
            return pSpeedDet;
        }

        [WebMethod]
        public static AccessList GetParentAccessSupplier(int CaseID, int ProductID, int HubSiteID, int CaseValidID, int CountryID, int CharTypeID, int ParentProductID, int ValidateParent, int CapmanPlatformID)
        {
            List<AccessSupplier> parentAccSupp = new List<AccessSupplier>();
            List<SupplierProduct> LstSupplierProduct = new List<SupplierProduct>();
            List<AccessSpeed> LstAccessSpeed = new List<AccessSpeed>();
            List<AccessType> LstAccessType = new List<AccessType>();
            AccessList accList = new AccessList();
            Filters bal = new Filters();
            DataSet dsAccessSuppliers = bal.GetParentAccessSupplier(CaseID, ProductID, HubSiteID, CaseValidID, CountryID, CharTypeID, ParentProductID, ValidateParent, CapmanPlatformID);
            if (dsAccessSuppliers != null && dsAccessSuppliers.Tables.Count > 0 && dsAccessSuppliers.Tables[0].Rows.Count > 0)
            {

                var AccessSuppliers = dsAccessSuppliers.Tables[0].AsEnumerable().Select(t => new { AccessSupplierID = t.Field<decimal>("Access_Supplier_Char_Id"), AccessSupplierName = t.Field<string>("Supplier_Name") }).Distinct().OrderBy(t => t.AccessSupplierName);

                foreach (var item in AccessSuppliers)
                {
                    AccessSupplier AccSuplier = new AccessSupplier()
                    {

                        AccessSupplierID = Convert.ToInt32(item.AccessSupplierID),
                        AccessSupplierName = item.AccessSupplierName
                    };
                    parentAccSupp.Add(AccSuplier);
                }
                accList.accSupplierList = parentAccSupp;

                var SupplierProductList = dsAccessSuppliers.Tables[0].AsEnumerable().Select(t => new { AccessSupplierID = t.Field<decimal>("Access_Supplier_Char_Id"), SupplierID = t.Field<decimal>("Access_Supplier_Name_Id"), SupplierProductName = t.Field<string>("Supplier_Prdt_Name") }).Distinct().OrderBy(t => t.SupplierProductName);

                foreach (var item in SupplierProductList)
                {
                    SupplierProduct SuppProduct = new SupplierProduct()
                    {
                        AccessSupplierID = Convert.ToInt32(item.AccessSupplierID),
                        SupplierID = Convert.ToInt32(item.SupplierID),
                        SupplierProductName = item.SupplierProductName
                    };
                    LstSupplierProduct.Add(SuppProduct);
                }
                accList.SupplierProductList = LstSupplierProduct;

                var AccessSpeedList = dsAccessSuppliers.Tables[0].AsEnumerable().Select(t => new { AccessSpeedID = t.Field<decimal>("Access_Speed_Char_Id"), AccessSpeedName = t.Field<string>("Access_Speed"), ASOrder = t.Field<decimal>("ASOrder") }).Distinct().OrderBy(t => t.ASOrder);

                foreach (var item in AccessSpeedList)
                {
                    AccessSpeed AccSpeed = new AccessSpeed()
                    {

                        AccessSpeedID = Convert.ToInt32(item.AccessSpeedID),
                        AccessSpeedName = item.AccessSpeedName
                    };
                    LstAccessSpeed.Add(AccSpeed);
                }

                accList.AccessSpeedList = LstAccessSpeed;

                var AccessTypeList = dsAccessSuppliers.Tables[0].AsEnumerable().Select(t => new { AccessTypeID = t.Field<decimal>("Access_Product_Type_Id"), AccessTypeName = t.Field<string>("access_type") }).Distinct().OrderBy(t => t.AccessTypeName);

                foreach (var item in AccessTypeList)
                {
                    AccessType AccSpeed = new AccessType()
                    {

                        AccessTypeID = Convert.ToInt32(item.AccessTypeID),
                        AccessTypeName = item.AccessTypeName
                    };
                    LstAccessType.Add(AccSpeed);
                }

                accList.AccessTypeList = LstAccessType;

            }
            return accList;
        }

        [WebMethod]
        public static int GetChildPortSpeedCount(int CaseID)
        {
            Filters bal = new Filters();
            DataSet dsPortSpeed = bal.GetChildPortSpeeds(CaseID);
            int ChildPortSpeedRecords = 0;
            if (dsPortSpeed != null && dsPortSpeed.Tables.Count > 0 && dsPortSpeed.Tables[0].Rows.Count > 0)
            {
                ChildPortSpeedRecords = dsPortSpeed.Tables[0].Rows.Count;
            }

            return ChildPortSpeedRecords;
        }

        [WebMethod]
        public static int GetTechnologyPortSpeeds(int ProductID, int CountryID, int PackageID, int Type)
        {
            Filters bal = new Filters();
            DataSet dsPortSpeed = bal.GetTechnologyPortSpeeds(ProductID, CountryID, PackageID, Type);
            int PortSpeedRecords = 0;
            if (dsPortSpeed != null && dsPortSpeed.Tables.Count > 0 && dsPortSpeed.Tables[0].Rows.Count > 0)
            {
                PortSpeedRecords = dsPortSpeed.Tables[0].Rows.Count;
            }

            return PortSpeedRecords;
        }

        [WebMethod]
        public static PortSpeedDet GetParentPortSpeed(int CaseID, int ProductID, int HubSiteID, int CaseValidID, int CountryID, int CharTypeID, int ParentProductID, int ValidateParent, int CapmanPlatformID)
        {
            List<PortSpeed> ParentPortSpeed = new List<PortSpeed>();
            Filters bal = new Filters();
            DataSet dsPortSpeed = bal.GetParetnPortSpeeds(CaseID, ProductID, HubSiteID, CaseValidID, CountryID, CharTypeID, ParentProductID, ValidateParent, CapmanPlatformID);
            PortSpeedDet pSpeedDet = new PortSpeedDet();
            if (dsPortSpeed != null && dsPortSpeed.Tables.Count > 0 && dsPortSpeed.Tables[0].Rows.Count > 0)
            {
                int TenMbps = 2256;
                int SelectedPortSpeed = 0;
                bool isTenMbpsExist = false;

                foreach (DataRow item in dsPortSpeed.Tables[0].Rows)
                {

                    if (TenMbps == Convert.ToInt32(item["pspeedid"].ToString()))
                    {
                        SelectedPortSpeed = TenMbps;
                        isTenMbpsExist = true;
                    }
                    PortSpeed AccSuplier = new PortSpeed()
                    {

                        PortSpeedID = Convert.ToInt32(item["pspeedid"].ToString()),
                        PortSpeedName = item["portspeed"].ToString()
                    };

                    if (!isTenMbpsExist)
                    {
                        SelectedPortSpeed = Convert.ToInt32(item["pspeedid"].ToString());
                    }
                    ParentPortSpeed.Add(AccSuplier);
                }
                pSpeedDet.pSpeed = ParentPortSpeed;
                pSpeedDet.SelectedPortSpeed = SelectedPortSpeed;

            }

            return pSpeedDet;
        }

        [WebMethod]
        public static List<ParentSpeed> GetParentSpeeds(int CaseID, int SupplierID, int CPESuppliers, string SelectedPortSpeed, int ProductID, int ParentProductID, string AccSpeed, string SuppProduct, string AccType, int CountryID, int CPEExists, int PageNo)
        {
            //Response.write vSupplierId & "--" & vCaseId & "--" & vCpeSupplier & "--" & SelectedPPSpeed & "--" & ChildProdcode & "--" & ParentProdcode
            List<ParentSpeed> lstParentSpeeds = new List<ParentSpeed>();
            Filters bal = new Filters();
            if (CPEExists == 1 && CPESuppliers == 0)
            {
                // string SuppQry = "select supplier as supplierID, supplier_name as SupplierName from vw_cpe_country_validity where country_validity=1 and country=" + CountryID + " and supplier_type <> 'Aggregator' and ROWNUM <= 1";
                DataSet dsCPE = bal.GetCPESupplierDetails(CountryID);
                if (dsCPE != null && dsCPE.Tables.Count > 0 && dsCPE.Tables[0].Rows.Count > 0)
                {
                    CPESuppliers = Convert.ToInt32(dsCPE.Tables[0].Rows[0]["supplierID"].ToString());
                }

            }

            int PageSize = Convert.ToInt32(ConfigurationManager.AppSettings["PageSize"].ToString());
            int recCount = 0;

            DataSet dsPortSpeed = bal.GetParentSpeeds(CaseID, SupplierID, CPESuppliers, SelectedPortSpeed, AccSpeed, SuppProduct, AccType, PageNo, PageSize, ref recCount);
            ParentSpeed ps = null;

            if (dsPortSpeed != null && dsPortSpeed.Tables.Count > 0 && dsPortSpeed.Tables[0].Rows.Count > 0)
            {
                string strPhaseIDs = "";
                //dsPortSpeed.Tables[0].AsEnumerable().ToList<DataRow>().ForEach(t => strPhaseIDs = string.IsNullOrEmpty(strPhaseIDs) ? t["ethernet_phase_id"].ToString() : strPhaseIDs + "," + t["ethernet_phase_id"].ToString());
                //DataSet dsPhaseNames = bal.GetPhaseNames(strPhaseIDs, ProductID);

                //string strAccessSupplierIDs = "";
                //dsPortSpeed.Tables[0].AsEnumerable().ToList<DataRow>().ForEach(t => strAccessSupplierIDs = string.IsNullOrEmpty(strAccessSupplierIDs) ? t["access_supplier_char_id"].ToString() : strAccessSupplierIDs + "," + t["access_supplier_char_id"].ToString());
                //DataSet dsAccessSuppliers = bal.GetAccessSupplierCharNames(strAccessSupplierIDs);

                foreach (DataRow dr in dsPortSpeed.Tables[0].Rows)
                {
                    ps = new ParentSpeed();
                    ps.PortSpeeds = dr["pspeed_value"].ToString() + " " + dr["pspeed_uom"].ToString();
                    ps.PortSpeedAvailability = dr["pspeed_status_desc"].ToString();
                    ps.AccessSpeed = dr["aspeed_value"].ToString() + " " + dr["aspeed_uom"].ToString();
                    ps.AccessTechnology = dr["SERVICE_VARIANT_NAME"].ToString() + " " + dr["DELIVERY_MODE_NAME"].ToString();
                    string strResult = "";
                    if (dr["access_type_name"].ToString().ToUpper() == "ETHERNET")
                    {
                        //strResult = bal.GetPhaseName(Convert.ToInt32(dr["ethernet_phase_id"].ToString()), ProductID);
                        strResult = dr["Phase_Name"].ToString();

                        if (strResult != "")
                        {
                            ps.AccessTechnology = dr["access_type_name"].ToString() + " - " + strResult;

                        }
                        else
                        {
                            ps.AccessTechnology = dr["access_type_name"].ToString();

                        }
                    }
                    else
                    {
                        ps.AccessTechnology = dr["access_type_name"].ToString();
                    }
                    if (ps.AccessTechnology == "NNI Ethernet")
                    {
                        ps.AccessTechnology = "NNI Ethernet-NNI";
                    }
                    //ps.SupplierProductName = dr["SERVICE_VARIANT_NAME"].ToString() + " " + dr["DELIVERY_MODE_NAME"].ToString() + ;
                    //strResult=bal.GetAccessSupplierCharName(Convert.ToInt32(dr["access_supplier_char_id"].ToString()));
                    strResult = dr["ACCESS_SUPPLIER_NAME"].ToString();
                    //int AccSuppID = Convert.ToInt32(dr["access_supplier_char_id"].ToString());
                    //if (dsAccessSuppliers != null && dsAccessSuppliers.Tables.Count > 0 && dsAccessSuppliers.Tables[0].Rows.Count > 0)
                    //{
                    //    DataRow drPhaseName = dsAccessSuppliers.Tables[0].AsEnumerable().ToList<DataRow>().Where(t => t.Field<int>("char_id") == AccSuppID).FirstOrDefault();
                    //    strResult = drPhaseName["char_name"].ToString();
                    //}
                    ps.ServiceVariant = dr["SERVICE_VARIANT_NAME"].ToString();
                    ps.DeliveryMode = dr["DELIVERY_MODE_NAME"].ToString();
                    ps.SupplierProductName = strResult;
                    ps.SupplierProductName1 = dr["supplier_product_name"].ToString();
                    ps.ServiceType = dr["MEF_SERVICE_TYPE_NAME"].ToString();
                    ps.AccessSpeedAvailability = dr["aspeed_status_desc"].ToString();

                    ps.RecCount = recCount;
                    ps.PageCount = (int)Math.Ceiling((double)recCount / PageSize);

                    if (dr["pspeed_status_code"].ToString() == "1" && dr["aspeed_status_code"].ToString() == "1")
                    {
                        ps.OrderingStatus = "Available";
                    }
                    else if (dr["pspeed_status_code"].ToString() == "3")
                    {
                        ps.OrderingStatus = "ICB";
                    }
                    else
                    {
                        ps.OrderingStatus = "ICB";
                    }

                    string[] str = new string[] { "//" };
                    string[] strInterface = dr["interface_name"].ToString().Split(str, StringSplitOptions.None);
                    ps.Interface = strInterface[0];
                    ps.Framing = strInterface[1];
                    ps.Connecter = strInterface[2];

                    ps.AccessSupplierNameID = Convert.ToInt32(dr["ACCESS_SUPPLIER_NAME_ID"].ToString());
                    ps.AccessSpeedCharID = Convert.ToInt32(dr["ACCESS_SPEED_CHAR_ID"].ToString());
                    ps.ASpeedUOM = dr["aspeed_uom"].ToString();
                    ps.AccessSupplierCharID = Convert.ToInt32(dr["ACCESS_SUPPLIER_CHAR_ID"].ToString());
                    ps.AccessProductTypeID = Convert.ToInt32(dr["ACCESS_PRODUCT_TYPE_ID"].ToString());

                    ps.SupplierInterconnection = dr["Supp_Int_Con_Type"].ToString();
                    ps.MTUSize = dr["MTU_Size"].ToString();

                    bal.BindListWithCPELeadTime(dr, ps, false);

                    //bal.BindListWithCPELeadTime(dr, ps, false);

                    lstParentSpeeds.Add(ps);
                }

            }

            return lstParentSpeeds;

        }

        [WebMethod]
        public static List<ParentSpeed> GetChildPortSpeeds(int CaseID, int SupplierID, int CPESuppliers, string SelectedPortSpeed, int ProductID, string AccSpeed, string SuppProduct, string AccType, int CPEExists, int CountryID, int PageNo)
        {
            //Response.write vSupplierId & "--" & vCaseId & "--" & vCpeSupplier & "--" & SelectedPPSpeed & "--" & ChildProdcode & "--" & ParentProdcode
            List<ParentSpeed> lstParentSpeeds = new List<ParentSpeed>();
            Filters bal = new Filters();
            int PageSize = Convert.ToInt32(ConfigurationManager.AppSettings["PageSize"].ToString());
            int RecCount = 0;
            if (CPEExists == 1 && CPESuppliers == 0)
            {
                // string SuppQry = "select supplier as supplierID, supplier_name as SupplierName from vw_cpe_country_validity where country_validity=1 and country=" + CountryID + " and supplier_type <> 'Aggregator' and ROWNUM <= 1";
                DataSet dsCPE = bal.GetCPESupplierDetails(CountryID);
                if (dsCPE != null && dsCPE.Tables.Count > 0 && dsCPE.Tables[0].Rows.Count > 0)
                {
                    CPESuppliers = Convert.ToInt32(dsCPE.Tables[0].Rows[0]["supplierID"].ToString());
                }

            }

            DataSet dsPortSpeed = bal.GetChildPortSpeeds(CaseID, SupplierID, CPESuppliers, SelectedPortSpeed, AccSpeed, SuppProduct, AccType, PageNo, PageSize, ref RecCount);
            ParentSpeed ps = null;



            if (dsPortSpeed != null && dsPortSpeed.Tables.Count > 0 && dsPortSpeed.Tables[0].Rows.Count > 0)
            {
                foreach (DataRow dr in dsPortSpeed.Tables[0].Rows)
                {
                    ps = new ParentSpeed();
                    ps.PortSpeeds = dr["p_portspeedval"].ToString() + " " + dr["p_portspeeduom"].ToString();
                    ps.PortSpeedAvailability = dr["p_portspeed_avail_desc"].ToString();
                    ps.AccessSpeed = dr["p_access_speed_val"].ToString() + " " + dr["p_access_speed_uom"].ToString();
                    ps.AccessTechnology = dr["SERVICE_VARIANT_NAME"].ToString() + " " + dr["DELIVERY_MODE_NAME"].ToString();
                    string strResult = "";
                    if (dr["p_access_type_name"].ToString().ToUpper() == "ETHERNET")
                    {
                        //strResult = bal.GetPhaseName(Convert.ToInt32(dr["ethernet_phase_id"].ToString()), ProductID);
                        strResult = dr["Phase_Name"].ToString();
                        if (strResult != "")
                        {
                            ps.AccessTechnology = dr["p_access_type_name"].ToString() + " - " + strResult;



                        }
                        else
                        {
                            ps.AccessTechnology = dr["p_access_type_name"].ToString();

                        }
                    }
                    else
                    {
                        ps.AccessTechnology = dr["p_access_type_name"].ToString();
                    }
                    if (ps.AccessTechnology == "NNI Ethernet")
                    {
                        ps.AccessTechnology = "NNI Ethernet-NNI";
                    }
                    //ps.SupplierProductName = dr["SERVICE_VARIANT_NAME"].ToString() + " " + dr["DELIVERY_MODE_NAME"].ToString() + ;
                    ps.SupplierProductName = dr["p_supplier_name"].ToString();

                    ps.RecCount = RecCount;
                    ps.PageCount = (int)Math.Ceiling((double)RecCount / PageSize);

                    ps.SupplierProductName1 = dr["p_supp_prod_name_name"].ToString();
                    ps.ServiceType = dr["MEF_SERVICE_TYPE_NAME"].ToString();
                    ps.AccessSpeedAvailability = dr["p_Access_Avail"].ToString();

                    //if (dr["p_preferred_flag"].ToString() == "1")
                    //{
                    if (dr["p_portspeed_avail_cd"].ToString() == "1" && dr["p_access_avail_cd"].ToString() == "1")
                    {
                        ps.OrderingStatus = "Available";
                    }
                    else
                    {
                        ps.OrderingStatus = "ICB";
                    }

                    //}
                    //else if (dr["p_preferred_flag"].ToString() == "0")
                    //{
                    //    ps.OrderingStatus = "ICB";
                    //}

                    string[] str = new string[] { "//" };
                    string[] strInterface = dr["p_interface_name"].ToString().Split(str, StringSplitOptions.None);
                    ps.Interface = strInterface[0];
                    ps.Framing = strInterface[1];
                    ps.Connecter = strInterface[2];
                    ps.ServiceVariant = dr["SERVICE_VARIANT_NAME"].ToString();
                    ps.DeliveryMode = dr["DELIVERY_MODE_NAME"].ToString();
                    ps.AccessSupplierNameID = Convert.ToInt32(dr["P_ACCESS_SUPPLIER_NAME_ID"].ToString());
                    ps.AccessSpeedCharID = Convert.ToInt32(dr["p_access_speed_char_id"].ToString());
                    ps.ASpeedUOM = dr["p_access_speed_uom"].ToString();
                    ps.AccessSupplierCharID = Convert.ToInt32(dr["p_access_supplier_char_id"].ToString());
                    ps.AccessProductTypeID = Convert.ToInt32(dr["p_access_product_type_id"].ToString());
                    ps.SupplierInterconnection = dr["Supp_Int_Con_Type"].ToString();
                    ps.MTUSize = (!string.IsNullOrEmpty(Convert.ToString(dr["MTU_Size"])) ? Convert.ToString(dr["MTU_Size"]) : "Not Available");
                    bal.BindListWithCPELeadTime(dr, ps, true);

                    lstParentSpeeds.Add(ps);
                }

            }

            return lstParentSpeeds;

        }

        [WebMethod]
        public static HVPNMain GetPackages(int RegionID, int CountryID, int ParentProductID, int ProductID, string Type, int AccessSupplierID)
        {
            List<HVPNMain> lstPackages = new List<HVPNMain>();
            List<BTPackage> lstBTPackages = new List<BTPackage>();
            HVPNMain main = new HVPNMain();
            HVPNBAL bal = new HVPNBAL();
            int ParentCaseID = 0, CaseID = 0;
            DataSet dsParentCase = bal.GetParentCaseID(RegionID, CountryID, ParentProductID);
            if (dsParentCase != null && dsParentCase.Tables.Count > 0 && dsParentCase.Tables[0].Rows.Count > 0)
            {
                ParentCaseID = Convert.ToInt32(dsParentCase.Tables[0].Rows[0][0].ToString());
            }
            DataSet dsCase = bal.GetParentCaseID(RegionID, CountryID, ProductID);
            if (dsCase != null && dsCase.Tables.Count > 0 && dsCase.Tables[0].Rows.Count > 0)
            {
                CaseID = Convert.ToInt32(dsCase.Tables[0].Rows[0][0].ToString());
            }

            DataSet dsNames = bal.GetRegionCountryName(RegionID, CountryID, ProductID);
            if (dsNames != null && dsNames.Tables.Count > 0 && dsNames.Tables[0].Rows.Count > 0)
            {
                main.CountryName = dsNames.Tables[0].Rows[0]["COUNTRY_NAME"].ToString();
                main.RegionName = dsNames.Tables[0].Rows[0]["REGION_NAME"].ToString();
            }
            main.ParentCaseID = ParentCaseID;
            main.CaseID = CaseID;
            if (CaseID > 0)
            {
                DataSet dsPackages = bal.GetPackages(ProductID, CaseID, ParentProductID, ParentCaseID, AccessSupplierID);
                if (dsPackages != null && dsPackages.Tables.Count > 0 && dsPackages.Tables[0].Rows.Count > 0)
                {
                    BTPackage pack = null;
                    for (int i = 0; i < dsPackages.Tables[0].Rows.Count; i++)
                    {

                        if (lstBTPackages.Where(t => t.PackageID == Convert.ToInt32(dsPackages.Tables[0].Rows[i]["PACKAGE_ID"].ToString())).Count() > 0)
                        {
                            continue;
                        }

                        if (Type == "HVPN")
                        {
                            if (dsPackages.Tables[0].Rows[i]["CHAR_NAME"].ToString().ToLower() != "standard" && dsPackages.Tables[0].Rows[i]["CHAR_NAME"].ToString().ToLower() != "plus" && dsPackages.Tables[0].Rows[i]["CHAR_NAME"].ToString().ToLower() != "premium")
                            {
                                pack = new BTPackage() { PackageID = Convert.ToInt32(dsPackages.Tables[0].Rows[i]["PACKAGE_ID"].ToString()), PackageName = dsPackages.Tables[0].Rows[i]["CHAR_NAME"].ToString() };
                                lstBTPackages.Add(pack);
                            }
                        }
                        else if (Type == "DSL")
                        {
                            if (dsPackages.Tables[0].Rows[i]["CHAR_NAME"].ToString().ToLower() != "hybrid vpn" && dsPackages.Tables[0].Rows[i]["CHAR_NAME"].ToString().ToLower() != "vsat")
                            {
                                pack = new BTPackage() { PackageID = Convert.ToInt32(dsPackages.Tables[0].Rows[i]["PACKAGE_ID"].ToString()), PackageName = dsPackages.Tables[0].Rows[i]["CHAR_NAME"].ToString() };
                                lstBTPackages.Add(pack);
                            }
                        }
                    }
                    main.package = lstBTPackages;
                }
            }
            return main;
        }

        [WebMethod]
        public static List<HVPNAccessSuppliers> GetHVPNAccessSuppliers(int RegionID, int CountryID, int ParentProductID, int ProductID, int CaseID, int ParentCaseID, int PackageID)
        {
            List<HVPNAccessSuppliers> lstAccSuppliers = new List<HVPNAccessSuppliers>();
            HVPNBAL bal = new HVPNBAL();
            string PackageIds = "";

            if (PackageID == 0)
            {
                DataSet dsPackages = bal.GetPackages(ProductID, CaseID, ParentProductID, ParentCaseID, 0);
                if (dsPackages != null && dsPackages.Tables.Count > 0 && dsPackages.Tables[0].Rows.Count > 0)
                {
                    foreach (DataRow item in dsPackages.Tables[0].Rows)
                    {
                        if (item["CHAR_NAME"].ToString().ToLower() != "hybrid vpn" && item["CHAR_NAME"].ToString().ToLower() != "vsat")
                        {
                            PackageIds = PackageIds == "" ? item["PACKAGE_ID"].ToString() : PackageIds + "," + item["PACKAGE_ID"].ToString();
                        }
                    }
                }
            }

            DataSet dsAccSupliers = bal.GetAccessSuppliers(ProductID, CaseID, ParentProductID, ParentCaseID, PackageID, PackageIds);
            if (dsAccSupliers != null && dsAccSupliers.Tables.Count > 0 && dsAccSupliers.Tables[0].Rows.Count > 0)
            {
                HVPNAccessSuppliers pack = null;
                for (int i = 0; i < dsAccSupliers.Tables[0].Rows.Count; i++)
                {
                    pack = new HVPNAccessSuppliers() { AccessSupplierID = Convert.ToInt32(dsAccSupliers.Tables[0].Rows[i]["ACCESS_SUPPLIER_CHAR_ID"].ToString()), AccessSupplier = dsAccSupliers.Tables[0].Rows[i]["CHAR_NAME"].ToString() };
                    lstAccSuppliers.Add(pack);
                }

            }
            return lstAccSuppliers;
        }

        [WebMethod]
        public static List<HVPNPortSpeeds> GetHVPNPortSpeeds(int CountryID, int CaseID, int ParentCaseID, int PackageID, int flag, int ProductID)
        {
            List<HVPNPortSpeeds> lstPortSpeeds = new List<HVPNPortSpeeds>();
            HVPNBAL bal = new HVPNBAL();
            DataSet dsPackages = bal.GetHVPNPortSpeeds(CaseID, ParentCaseID, PackageID, CountryID, ProductID);
            if (dsPackages != null && dsPackages.Tables.Count > 0 && dsPackages.Tables[0].Rows.Count > 0)
            {
                HVPNPortSpeeds pack = null;
                for (int i = 0; i < dsPackages.Tables[0].Rows.Count; i++)
                {
                    if (flag == 0)
                    {
                        if (dsPackages.Tables[0].Rows[i]["CHAR_ACTUAL_VALUE"].ToString().ToLower() == "No Port".ToLower())
                            continue;
                    }
                    pack = new HVPNPortSpeeds() { PortSpeedID = Convert.ToInt32(dsPackages.Tables[0].Rows[i]["CHAR_ID"].ToString()), PortSpeed = dsPackages.Tables[0].Rows[i]["CHAR_ACTUAL_VALUE"].ToString() + dsPackages.Tables[0].Rows[i]["CHAR_UNIT_OF_MEASURE"].ToString() + "/" + dsPackages.Tables[0].Rows[i]["CHAR_ACTUAL_VALUE_2"].ToString() + dsPackages.Tables[0].Rows[i]["CHAR_UNIT_OF_MEASURE_2"].ToString() };
                    lstPortSpeeds.Add(pack);

                }

            }
            return lstPortSpeeds;
        }

        [WebMethod]
        public static List<HVPNPortSpeeds> GetVSATPortSpeeds(int CountryID, int CaseID, int ParentCaseID, int PackageID, int flag, int ProductID)
        {
            List<HVPNPortSpeeds> lstPortSpeeds = new List<HVPNPortSpeeds>();
            HVPNBAL bal = new HVPNBAL();
            DataSet dsPackages = bal.GetVSATPortSpeeds(CaseID, ParentCaseID, PackageID, CountryID, ProductID);
            if (dsPackages != null && dsPackages.Tables.Count > 0 && dsPackages.Tables[0].Rows.Count > 0)
            {
                HVPNPortSpeeds pack = null;
                for (int i = 0; i < dsPackages.Tables[0].Rows.Count; i++)
                {
                    if (flag == 0)
                    {
                        if (dsPackages.Tables[0].Rows[i]["CHAR_ACTUAL_VALUE"].ToString().ToLower() == "No Port".ToLower())
                            continue;
                    }
                    pack = new HVPNPortSpeeds() { PortSpeedID = Convert.ToInt32(dsPackages.Tables[0].Rows[i]["CHAR_ID"].ToString()), PortSpeed = dsPackages.Tables[0].Rows[i]["CHAR_ACTUAL_VALUE"].ToString() + dsPackages.Tables[0].Rows[i]["CHAR_UNIT_OF_MEASURE"].ToString() + "/" + dsPackages.Tables[0].Rows[i]["CHAR_ACTUAL_VALUE_2"].ToString() + dsPackages.Tables[0].Rows[i]["CHAR_UNIT_OF_MEASURE_2"].ToString() };
                    lstPortSpeeds.Add(pack);

                }

            }
            return lstPortSpeeds;
        }

        [WebMethod]
        public static string GenerateTunnelingNote(string CountryName)
        {
            List<HVPNPortSpeeds> lstPortSpeeds = new List<HVPNPortSpeeds>();
            HVPNBAL bal = new HVPNBAL();

            string strResult = bal.GenerateTunnelingNote(CountryName).Replace(':', ' ');

            return strResult;
        }

        [WebMethod]
        public static List<BundleProudcts> GetBundleProducts(int CountryID, int ProductID)
        {
            List<BundleProudcts> lstBundleProducts = new List<BundleProudcts>();

            HVPNBAL bal = new HVPNBAL();
            DataSet dsBundles = bal.GetProductBundlesForCountry(ProductID, CountryID);

            foreach (DataRow dr in dsBundles.Tables[0].Rows)
            {
                BundleProudcts bp = new BundleProudcts();
                bp.Bundle = dr["bundlename"].ToString();
                bp.BundleID = int.Parse(Convert.ToString(dr["bundleid"]));
                bp.AccessTechnology = dr["AccessTech"].ToString();
                bp.Router = dr["routername"].ToString();

                bp.ExpectedDate = dr["EXPECTED_DATE"].ToString();
                bp.QuotableStartDate = dr["QUOTABLEDT"].ToString();
                bp.EOS = dr["EOSDT"].ToString();
                bp.EOQ = dr["EOQDT"].ToString();
                bp.EOL = dr["EOLDT"].ToString();
                bp.SmartServiceAvailability = dr["SMARTSERVICEAVIL"].ToString();
                if (!String.IsNullOrEmpty(dr["PARTIAL_BNDL_FLAG"].ToString()))
                {
                    bp.partialBundle = char.Parse(dr["PARTIAL_BNDL_FLAG"].ToString());
                }
                else
                {
                    bp.partialBundle = '\0';
                }
                lstBundleProducts.Add(bp);
            }

            return lstBundleProducts;
        }

        [WebMethod]
        public static List<HVPNParentPortTypes> GetHVPNParentPortTypes(int CountryID, int CaseID, int ParentCaseID, int PackageID, int ProductID, string AccessSupplier, int AccessSupplierID, string PortSpeedID, string PortSpeeds, int ParentProductID,int PageNo)
        {
            List<HVPNParentPortTypes> lstPortTypes = new List<HVPNParentPortTypes>();
            HVPNBAL bal = new HVPNBAL();

            DataSet dsPackageInfo = bal.GetPackageInfo(CaseID, ProductID, PackageID);

            DataSet dsHVPNAttributes = null;
            int ParentPackageID = 0;
            string ContentionRatio = "";
            int DeliveryTime = 0;
            string strAccessSupplierIDs = "";

            int PageSize = Convert.ToInt32(ConfigurationManager.AppSettings["HVPNPageSize"].ToString());
            int recCount = 0;

            if (dsPackageInfo != null && dsPackageInfo.Tables.Count > 0 && dsPackageInfo.Tables[0].Rows.Count > 0)
            {
                if (ParentProductID > 0)
                {
                    ParentPackageID = bal.GetParentPackageID(ParentCaseID, PackageID);
                }
                foreach (DataRow drPackageInfo in dsPackageInfo.Tables[0].Rows)
                {
                    if (ParentProductID > 0)
                    {
                        dsHVPNAttributes = bal.GetHVPNAttributes(CaseID, Convert.ToInt32(drPackageInfo["CASE_PKG_ID"].ToString()), PackageID, ParentCaseID, ParentPackageID, AccessSupplierID, ProductID, PortSpeedID, CountryID, PageNo, PageSize, ref recCount);
                    }
                    else
                    {
                        dsHVPNAttributes = bal.GetPaentHVPNAttributes(CaseID, Convert.ToInt32(drPackageInfo["CASE_PKG_ID"].ToString()), PackageID, AccessSupplierID, PortSpeedID, CountryID, PageNo, PageSize, ref recCount);
                    }
                    if (dsHVPNAttributes != null && dsHVPNAttributes.Tables.Count > 0 && dsHVPNAttributes.Tables[0].Rows.Count > 0)
                    {
                        dsHVPNAttributes.Tables[0].AsEnumerable().ToList<DataRow>().ForEach(t => strAccessSupplierIDs = string.IsNullOrEmpty(strAccessSupplierIDs) ? t["access_supplier_char_id"].ToString() : strAccessSupplierIDs + "," + t["access_supplier_char_id"].ToString());
                        HVPNParentPortTypes HvpnPortTypes = null;
                        foreach (DataRow drAttr in dsHVPNAttributes.Tables[0].Rows)
                        {
                            HvpnPortTypes = new HVPNParentPortTypes();
                            HvpnPortTypes.PackageName = dsPackageInfo.Tables[0].Rows[0]["CHAR_NAME"].ToString();
                            HvpnPortTypes.AccessType = drAttr["access_typename"].ToString();// +" - " + drAttr["ethernet_phase_attribute"].ToString();
                            HvpnPortTypes.Availability = bal.GetHVPNAvailDesc(Convert.ToInt32(drAttr["PORT_SPEED_AVAIL_CD"].ToString()));
                            //var PortspeedData = dsPortSpeeds.Tables[0].AsEnumerable().Where(t => t.Field<int>("CHAR_ID") ==Convert.ToInt32(drAttr["PORT_SPEED_CHAR_ID"].ToString())).Select(t => new { portspeed = t.Field<string>("portspeed") }).Single();
                            DataSet dsPortSpeeds = null;
                            if (ParentProductID > 0)
                            {
                                dsPortSpeeds = bal.GetPortSpeedNames(Convert.ToInt32(drAttr["Port_Speed_Char_ID"].ToString()), ParentCaseID);
                            }
                            else
                            {
                                dsPortSpeeds = bal.GetPortSpeedNames(Convert.ToInt32(drAttr["Port_Speed_Char_ID"].ToString()), CaseID);
                            }
                            //DataSet dsPortSpeeds = bal.GetPortSpeedNames(Convert.ToInt32(drAttr["Port_Speed_Char_ID"].ToString()), ParentCaseID);
                            if (dsPortSpeeds != null && dsPortSpeeds.Tables.Count > 0 && dsPortSpeeds.Tables[0].Rows.Count > 0)
                            {
                                HvpnPortTypes.PortSpeed = dsPortSpeeds.Tables[0].Rows[0]["char_actual_value"].ToString() + " " + dsPortSpeeds.Tables[0].Rows[0]["char_unit_of_measure"].ToString() + " / " + dsPortSpeeds.Tables[0].Rows[0]["char_actual_value_2"].ToString() + " " + dsPortSpeeds.Tables[0].Rows[0]["char_unit_of_measure_2"].ToString();
                            }
                            //parameter added for SLA info
                            HvpnPortTypes.PackageID = PackageID;
                            HvpnPortTypes.SuppProdID = Convert.ToString(drAttr["ACCESS_SUPPLIER_NAME_ID"]);
                            HvpnPortTypes.AccSupplierCharID = Convert.ToString(drAttr["ACCESS_SUPPLIER_CHAR_ID"]);
                            HvpnPortTypes.AccessTypeID = Convert.ToString(drAttr["ACCESS_PRODUCT_TYPE_ID"]);
                            HvpnPortTypes.portTypeID = Convert.ToString(drAttr["PORT_TYPE_ID"]);
                            //paremeter end for SLA info
                            string[] splitChar = new string[] { "//" };
                            if (ParentProductID > 0)
                            {
                                ContentionRatio = "1:" + bal.GetContentionValue(PackageID, ParentCaseID, Convert.ToInt32(drAttr["ACCESS_SUPPLIER_NAME_ID"].ToString()), CountryID).ToString();
                                DeliveryTime = bal.GetDeliveryTime(ParentCaseID, Convert.ToInt32(drAttr["ACCESS_SUPPLIER_NAME_ID"].ToString()), CountryID);
                            }
                            else
                            {
                                ContentionRatio = "1:" + bal.GetContentionValue(PackageID, CaseID, Convert.ToInt32(drAttr["ACCESS_SUPPLIER_NAME_ID"].ToString()), CountryID).ToString();
                                DeliveryTime = bal.GetDeliveryTime(CaseID, Convert.ToInt32(drAttr["ACCESS_SUPPLIER_NAME_ID"].ToString()), CountryID);
                            }

                            HvpnPortTypes.RecCount = recCount;
                            HvpnPortTypes.PageCount = (int)Math.Ceiling((double)recCount / PageSize);

                            HvpnPortTypes.AccessSpeed = drAttr["PortType_Name"].ToString().Split(splitChar, StringSplitOptions.None)[0].Replace("Kbps", "K").Replace("Mbps", "M").Replace("Gbps", "G").Replace("/", " / ");
                            HvpnPortTypes.Interface = drAttr["PortType_Name"].ToString().Split(splitChar, StringSplitOptions.None)[1];
                            HvpnPortTypes.FramingStructure = drAttr["PortType_Name"].ToString().Split(splitChar, StringSplitOptions.None)[2];
                            HvpnPortTypes.Connector = drAttr["PortType_Name"].ToString().Split(splitChar, StringSplitOptions.None)[3];
                            HvpnPortTypes.AvailableDesc = drAttr["avail_desc"].ToString();
                            HvpnPortTypes.ContentionRatio = ContentionRatio;
                            HvpnPortTypes.Supplier = AccessSupplier;
                            HvpnPortTypes.AccessAvailabilityStatus = drAttr["avail_desc"].ToString();
                            HvpnPortTypes.SupplierProductBTInternalSLA = drAttr["supplier_prodname"].ToString();

                            int PortPackageID = 0;
                            if (ParentProductID > 0)
                            {
                                PortPackageID = bal.GetPortPackageID(CountryID, PackageID, Convert.ToInt32(drAttr["access_product_type_id"].ToString()), Convert.ToInt32(drAttr["access_supplier_char_id"].ToString()), Convert.ToInt32(drAttr["access_supplier_name_id"].ToString()), Convert.ToInt32(drAttr["gpop_interconnect"].ToString()), Convert.ToInt32(drAttr["PORT_TYPE_ID"].ToString()), ParentCaseID);

                            }
                            else
                            {
                                PortPackageID = bal.GetPortPackageID(CountryID, PackageID, Convert.ToInt32(drAttr["access_product_type_id"].ToString()), Convert.ToInt32(drAttr["access_supplier_char_id"].ToString()), Convert.ToInt32(drAttr["access_supplier_name_id"].ToString()), Convert.ToInt32(drAttr["gpop_interconnect"].ToString()), Convert.ToInt32(drAttr["PORT_TYPE_ID"].ToString()), CaseID);

                            }
                            HvpnPortTypes.PortPackageID = PortPackageID;

                            HvpnPortTypes.ServiceLeadTime = DeliveryTime > 0 ? DeliveryTime + " Days" : string.Empty;
                            HvpnPortTypes.POP = drAttr["HUB_SITE_NAME"].ToString();
                            DataSet dsCPEInfo = null;
                            if (ParentCaseID > 0)
                            {
                                dsCPEInfo = bal.GetCPEInfo(ParentCaseID, Convert.ToInt32(drAttr["PORT_TYPE_ID"].ToString()), PackageID, Convert.ToInt32(drAttr["ACCESS_SUPPLIER_NAME_ID"].ToString()), CountryID);
                            }
                            else
                            {
                                dsCPEInfo = bal.GetCPEInfo(CaseID, Convert.ToInt32(drAttr["PORT_TYPE_ID"].ToString()), PackageID, Convert.ToInt32(drAttr["ACCESS_SUPPLIER_NAME_ID"].ToString()), CountryID);
                            }
                            if (dsCPEInfo != null && dsCPEInfo.Tables.Count > 0 && dsCPEInfo.Tables[0].Rows.Count > 0)
                            {

                                DataSet dsCPE = bal.GetCPE(ProductID, Convert.ToInt32(drAttr["ACCESS_PRODUCT_TYPE_ID"].ToString()), Convert.ToInt32(dsCPEInfo.Tables[0].Rows[0]["pc_interface_id"].ToString()), Convert.ToInt32(dsCPEInfo.Tables[0].Rows[0]["pc_access_speed_du_id"].ToString()), Convert.ToInt32(dsCPEInfo.Tables[0].Rows[0]["PC_SUPPLY_ID"].ToString()), drAttr["access_typename"].ToString(), CountryID);
                                if (dsCPE != null && dsCPE.Tables.Count != 0 && dsCPE.Tables[0].Rows.Count > 0)
                                {
                                    foreach (DataRow drCPE in dsCPE.Tables[0].Rows)
                                    {
                                        if (string.IsNullOrEmpty(HvpnPortTypes.CPE))
                                            HvpnPortTypes.CPE = drCPE["CHAR_NAME"].ToString();
                                        else
                                            HvpnPortTypes.CPE += "," + drCPE["CHAR_NAME"].ToString();
                                    }

                                }
                            }
                            lstPortTypes.Add(HvpnPortTypes);
                        }
                    }

                }
            }

            return lstPortTypes;
        }



        [WebMethod]
        public static List<DSLParentPortTypes> GetDSLParentPortTypes(int CountryID, int CaseID, int ParentCaseID, int PackageID, int ProductID, int AccessSupplierID, int ParentProductID,int PageNo)
        {
            List<DSLParentPortTypes> lstPortTypes = new List<DSLParentPortTypes>();
            HVPNBAL bal = new HVPNBAL();

            DataSet dsPackageInfo = bal.GetDSLPackageInfo(CaseID, ProductID, PackageID, ParentCaseID, ParentProductID);
            DataSet dsDSLAttributes = null;
            int ParentPackageID = 0;
            string ContentionRatio = "";
            string DeliveryTime = "";
            string strAccessSupplierIDs = "";

            int PageSize = Convert.ToInt32(ConfigurationManager.AppSettings["HVPNPageSize"].ToString());
            int recCount = 0;

            if (dsPackageInfo != null && dsPackageInfo.Tables.Count > 0 && dsPackageInfo.Tables[0].Rows.Count > 0)
            {
                if (ParentProductID > 0)
                {
                    ParentPackageID = bal.GetParentPackageID(ParentCaseID, PackageID);
                }
                foreach (DataRow drPackageInfo in dsPackageInfo.Tables[0].Rows)
                {
                    if (ParentProductID > 0)
                    {
                        dsDSLAttributes = bal.GetDSLAttributes(CaseID, Convert.ToInt32(drPackageInfo["CASE_PKG_ID"].ToString()), PackageID, ParentCaseID, ParentPackageID, AccessSupplierID, ProductID, CountryID, PageNo, PageSize, ref recCount);
                    }
                    else
                    {
                        dsDSLAttributes = bal.GetParentDSLAttributes(CaseID, Convert.ToInt32(drPackageInfo["CASE_PKG_ID"].ToString()), AccessSupplierID, CountryID, PackageID, PageNo, PageSize, ref recCount);
                    }
                    if (dsDSLAttributes != null && dsDSLAttributes.Tables.Count > 0 && dsDSLAttributes.Tables[0].Rows.Count > 0)
                    {
                        //dsHVPNAttributes.Tables[0].AsEnumerable().ToList<DataRow>().ForEach(t => strAccessSupplierIDs = string.IsNullOrEmpty(strAccessSupplierIDs) ? t["access_supplier_char_id"].ToString() : strAccessSupplierIDs + "," + t["access_supplier_char_id"].ToString());
                        DSLParentPortTypes DSLPortTypes = null;
                        foreach (DataRow drAttr in dsDSLAttributes.Tables[0].Rows)
                        {
                            DSLPortTypes = new DSLParentPortTypes();
                            DSLPortTypes.PackageName = dsPackageInfo.Tables[0].Rows[0]["CHAR_NAME"].ToString();
                            DSLPortTypes.DSLType = drAttr["access_typename"].ToString();
                            string[] splitChar = new string[] { "//" };

                            //if (ParentProductID > 0)
                            //{
                            //    //ContentionRatio = "1:" + bal.GetContentionValue(PackageID, ParentCaseID, Convert.ToInt32(drAttr["ACCESS_SUPPLIER_NAME_ID"].ToString()), CountryID).ToString();
                            //    ContentionRatio = "1:" + drAttr["Contention_Value"].ToString();
                            //}
                            //else
                            //{
                            //    ContentionRatio = "1:" + bal.GetContentionValue(PackageID, CaseID, Convert.ToInt32(drAttr["ACCESS_SUPPLIER_NAME_ID"].ToString()), CountryID).ToString();
                            //}
                            // DeliveryTime = bal.GetDeliveryTime(ParentCaseID, Convert.ToInt32(drAttr["ACCESS_SUPPLIER_NAME_ID"].ToString()), CountryID).ToString();

                            DSLPortTypes.DSLSpeed = drAttr["PortType_Name"].ToString().Split(splitChar, StringSplitOptions.None)[0].Replace("Kbps", "K").Replace("Mbps", "M").Replace("Gbps", "G").Replace("/", " / ");
                            DSLPortTypes.Interface = drAttr["PortType_Name"].ToString().Split(splitChar, StringSplitOptions.None)[1];
                            DSLPortTypes.FramingStructure = drAttr["PortType_Name"].ToString().Split(splitChar, StringSplitOptions.None)[2];
                            DSLPortTypes.Connector = drAttr["PortType_Name"].ToString().Split(splitChar, StringSplitOptions.None)[3];
                            DSLPortTypes.AvailableDesc = drAttr["avail_desc"].ToString();
                            DSLPortTypes.ContentionRatio = ContentionRatio;
                            DSLPortTypes.Supplier = drAttr["supplier_name"].ToString();

                            DSLPortTypes.RecCount = recCount;
                            DSLPortTypes.PageCount = (int)Math.Ceiling((double)recCount / PageSize);

                            //parameter added for SLA info
                            DSLPortTypes.PackageID = PackageID;
                            DSLPortTypes.SuppProdID = Convert.ToString(drAttr["ACCESS_SUPPLIER_NAME_ID"]);
                            DSLPortTypes.AccSupplierCharID = Convert.ToString(drAttr["ACCESS_SUPPLIER_CHAR_ID"]);
                            DSLPortTypes.AccessTypeID = Convert.ToString(drAttr["ACCESS_PRODUCT_TYPE_ID"]);
                            DSLPortTypes.portTypeID = Convert.ToString(drAttr["PORT_TYPE_ID"]);
                            //paremeter end for SLA info
                            DSLPortTypes.ParentPackageID = ParentPackageID;

                            //Hashtable ht = new Hashtable();
                            //if (ParentProductID > 0)
                            //{
                            //    ht = bal.GetDSLContractLeadTime(CaseID, Convert.ToInt32(drAttr["ACCESS_SUPPLIER_NAME_ID"].ToString()), PackageID, ParentCaseID, Convert.ToInt32(drAttr["PORT_TYPE_ID"].ToString()), CountryID);
                            //}
                            //else
                            //{
                            //    ht = bal.GetDSLContractLeadTime(CaseID, Convert.ToInt32(drAttr["ACCESS_SUPPLIER_NAME_ID"].ToString()), PackageID, CaseID, Convert.ToInt32(drAttr["PORT_TYPE_ID"].ToString()), CountryID);
                            //}



                            //DSLPortTypes.EndToEndLeadTime = ht["EndToEndLeadTime"].ToString() == "0" ? "" : ht["EndToEndLeadTime"].ToString();
                            //DSLPortTypes.ContractedLeadTime = ht["ContractedLeadTime"].ToString() == "0" ? "" : ht["ContractedLeadTime"].ToString();
                            //DSLPortTypes.ContentionRatio = "1:" + ht["ContentionValue"].ToString();

                            DSLPortTypes.EndToEndLeadTime = drAttr["E2ELead"].ToString();
                            DSLPortTypes.ContractedLeadTime = drAttr["Sd_Contracted_Leadtime"].ToString(); //ht["ContractedLeadTime"].ToString() == "0" ? "" : ht["ContractedLeadTime"].ToString();
                            DSLPortTypes.ContentionRatio = "1:" + drAttr["Contention_Value"].ToString(); //"1:" + ht["ContentionValue"].ToString();
                            DSLPortTypes.InterconnectDesign = drAttr["Desgname"].ToString(); //ht["DesignName"].ToString();
                            DSLPortTypes.SupplierProductSLA = drAttr["supplier_prodname"].ToString();
                            //DSLPortTypes.ContractedLeadTime = DeliveryTime;
                            DSLPortTypes.GPOP = drAttr["HUB_SITE_NAME"].ToString();
                            int PortPackageID = 0;
                            string TIRValue = "", EFValue = "";
                            if (ParentProductID > 0)
                            {
                                PortPackageID = bal.GetPortPackageID(CountryID, PackageID, Convert.ToInt32(drAttr["access_product_type_id"].ToString()), Convert.ToInt32(drAttr["access_supplier_char_id"].ToString()), Convert.ToInt32(drAttr["access_supplier_name_id"].ToString()), Convert.ToInt32(drAttr["gpop_interconnect"].ToString()), Convert.ToInt32(drAttr["PORT_TYPE_ID"].ToString()), ParentCaseID);
                                TIRValue = bal.GetTIRValue(ParentProductID, ParentCaseID, PortPackageID, ParentPackageID);
                                DSLPortTypes.TIRValue = TIRValue;
                                EFValue = bal.GetEFValue(ParentProductID, ParentCaseID, PortPackageID, ParentPackageID);
                                DSLPortTypes.EFSupportedSpeeds = EFValue;
                            }
                            else
                            {
                                PortPackageID = bal.GetPortPackageID(CountryID, PackageID, Convert.ToInt32(drAttr["access_product_type_id"].ToString()), Convert.ToInt32(drAttr["access_supplier_char_id"].ToString()), Convert.ToInt32(drAttr["access_supplier_name_id"].ToString()), Convert.ToInt32(drAttr["gpop_interconnect"].ToString()), Convert.ToInt32(drAttr["PORT_TYPE_ID"].ToString()), CaseID);
                                TIRValue = bal.GetTIRValue(ProductID, ParentCaseID, PortPackageID, ParentPackageID);
                                DSLPortTypes.TIRValue = TIRValue;
                                EFValue = bal.GetEFValue(ProductID, ParentCaseID, PortPackageID, ParentPackageID);
                                DSLPortTypes.EFSupportedSpeeds = EFValue;
                            }
                            DSLPortTypes.PortPackageID = PortPackageID;
                            DataSet dsCPEInfo = bal.GetCPEInfo(CaseID, Convert.ToInt32(drAttr["PORT_TYPE_ID"].ToString()), PackageID, Convert.ToInt32(drAttr["ACCESS_SUPPLIER_NAME_ID"].ToString()), CountryID);
                            if (dsCPEInfo != null && dsCPEInfo.Tables.Count > 0 && dsCPEInfo.Tables[0].Rows.Count > 0)
                            {

                                DataSet dsCPE = bal.GetCPE(ProductID, Convert.ToInt32(drAttr["ACCESS_PRODUCT_TYPE_ID"].ToString()), Convert.ToInt32(dsCPEInfo.Tables[0].Rows[0]["pc_interface_id"].ToString()), Convert.ToInt32(dsCPEInfo.Tables[0].Rows[0]["pc_access_speed_du_id"].ToString()), Convert.ToInt32(dsCPEInfo.Tables[0].Rows[0]["PC_SUPPLY_ID"].ToString()), drAttr["access_typename"].ToString(), CountryID);
                                if (dsCPE != null && dsCPE.Tables.Count != 0 && dsCPE.Tables[0].Rows.Count > 0)
                                {
                                    foreach (DataRow drCPE in dsCPE.Tables[0].Rows)
                                    {
                                        if (string.IsNullOrEmpty(DSLPortTypes.CPE))
                                            DSLPortTypes.CPE = drCPE["CHAR_NAME"].ToString();
                                        else
                                            DSLPortTypes.CPE += "," + drCPE["CHAR_NAME"].ToString();
                                    }

                                }
                            }

                            lstPortTypes.Add(DSLPortTypes);
                        }
                    }

                }
            }

            return lstPortTypes;
        }



        [WebMethod]
        public static List<VSATAccessSuppliers> GetVSATAccessSuppliers(int PackageID, int Regionid, int Countryid, int Productid, int ParentProductID, int CaseID, int ParentCaseID)
        {
            List<VSATAccessSuppliers> lstVsatAccSuppliers = new List<VSATAccessSuppliers>();
            VSATBAL bal = new VSATBAL();

            DataSet dsPackages = bal.GetVsatAccessSupplier(CaseID, PackageID, Productid, ParentProductID, ParentCaseID);
            if (dsPackages != null && dsPackages.Tables.Count > 0 && dsPackages.Tables[0].Rows.Count > 0)
            {
                VSATAccessSuppliers pack = null;
                for (int i = 0; i < dsPackages.Tables[0].Rows.Count; i++)
                {
                    pack = new VSATAccessSuppliers() { VSATAccessSupplierID = Convert.ToInt32(dsPackages.Tables[0].Rows[i]["ACCESS_SUPPLIER_CHAR_ID"].ToString()), VSATAccessSupplier = dsPackages.Tables[0].Rows[i]["CHAR_NAME"].ToString() };
                    lstVsatAccSuppliers.Add(pack);
                }

            }
            return lstVsatAccSuppliers;
        }

        [WebMethod]
        public static List<VSATData> GetVSATAttrCursor(int CaseID, int AccessSupplierCharID, string PortSpeedCharID, int CountryID, int pckgid, int ParentCaseID, int ProductID, string PortSpeed, int ParentProductID)
        {
            List<VSATData> lstattrdata = new List<VSATData>();
            VSATBAL bal = new VSATBAL();

            HVPNBAL bal1 = new HVPNBAL();
            int ParentPackageID = 0;
            DataSet dsPackageInfo = bal1.GetPackageInfo(CaseID, ProductID, pckgid);
            if (dsPackageInfo != null && dsPackageInfo.Tables.Count > 0 && dsPackageInfo.Tables[0].Rows.Count > 0)
            {
                foreach (DataRow drPackage in dsPackageInfo.Tables[0].Rows)
                {
                    DataSet dsVsatAttrCursInfo = null;
                    if (ParentProductID > 0)
                    {
                        ParentPackageID = bal1.GetParentPackageID(ParentCaseID, pckgid);
                        dsVsatAttrCursInfo = bal.GetVsatAttributeCursor(CaseID, Convert.ToInt32(drPackage["CASE_PKG_ID"].ToString()), AccessSupplierCharID, PortSpeedCharID, CountryID, pckgid, ParentPackageID, ParentCaseID, AccessSupplierCharID, ProductID, pckgid);
                    }
                    else
                    {
                        dsVsatAttrCursInfo = bal.GetVsatParentAttributeCursor(CaseID, Convert.ToInt32(drPackage["CASE_PKG_ID"].ToString()), AccessSupplierCharID, PortSpeedCharID, CountryID, pckgid);
                    }

                    int DeliveryTime = 0;

                    if (dsVsatAttrCursInfo != null && dsVsatAttrCursInfo.Tables.Count > 0 && dsVsatAttrCursInfo.Tables[0].Rows.Count > 0)
                    {
                        //dsVsatAttrCursInfo.Tables[0].AsEnumerable().ToList<DataRow>().ForEach(t => strAccessSupplierIDs = string.IsNullOrEmpty(strAccessSupplierIDs) ? t["access_supplier_char_id"].ToString() : strAccessSupplierIDs + "," + t["access_supplier_char_id"].ToString());
                        VSATData vsatattrcurs = null;
                        foreach (DataRow drAttr in dsVsatAttrCursInfo.Tables[0].Rows)
                        {
                            vsatattrcurs = new VSATData();

                            vsatattrcurs.AccessType = drAttr["access_typename"].ToString() + " - " + drAttr["ethernet_phase_attribute"].ToString();
                            //vsatattrcurs.PortSpeed = PortSpeed;
                            DataSet dsPortSpeeds = null;
                            if (ParentProductID > 0)
                            {
                                dsPortSpeeds = bal1.GetPortSpeedNames(Convert.ToInt32(drAttr["Port_Speed_Char_ID"].ToString()), ParentCaseID);
                            }
                            else
                            {
                                dsPortSpeeds = bal1.GetPortSpeedNames(Convert.ToInt32(drAttr["Port_Speed_Char_ID"].ToString()), CaseID);
                            }

                            if (dsPortSpeeds != null && dsPortSpeeds.Tables.Count > 0 && dsPortSpeeds.Tables[0].Rows.Count > 0)
                            {
                                vsatattrcurs.PortSpeed = dsPortSpeeds.Tables[0].Rows[0]["char_actual_value"].ToString() + " " + dsPortSpeeds.Tables[0].Rows[0]["char_unit_of_measure"].ToString() + " / " + dsPortSpeeds.Tables[0].Rows[0]["char_actual_value_2"].ToString() + " " + dsPortSpeeds.Tables[0].Rows[0]["char_unit_of_measure_2"].ToString();
                            }

                            DataSet ds = bal.GetVsatPortSpeedAvail(Convert.ToInt32(drAttr["PORT_SPEED_AVAIL_CD"].ToString()));
                            if (ds != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
                            {
                                vsatattrcurs.Availability = ds.Tables[0].Rows[0]["avail_desc"].ToString();
                            }
                            string[] splitChar = new string[] { "//" };

                            vsatattrcurs.AccessSpeed = drAttr["PortType_Name"].ToString().Split(splitChar, StringSplitOptions.None)[0].Replace("Kbps", "K").Replace("Mbps", "M").Replace("Gbps", "G").Replace("/", " / ");
                            vsatattrcurs.Interface = drAttr["PortType_Name"].ToString().Split(splitChar, StringSplitOptions.None)[1];
                            vsatattrcurs.FramingStructure = drAttr["PortType_Name"].ToString().Split(splitChar, StringSplitOptions.None)[2];
                            vsatattrcurs.Connector = drAttr["PortType_Name"].ToString().Split(splitChar, StringSplitOptions.None)[3];
                            vsatattrcurs.AvailableDesc = drAttr["avail_desc"].ToString();
                            DataSet dsxdslcurs = null;
                            if (ParentProductID > 0)
                            {
                                dsxdslcurs = bal.GetVsatXDSLCursor(ParentCaseID, pckgid, Convert.ToInt32(drAttr["ACCESS_SUPPLIER_NAME_ID"].ToString()), CountryID);
                            }
                            else
                            {
                                dsxdslcurs = bal.GetVsatXDSLCursor(CaseID, pckgid, Convert.ToInt32(drAttr["ACCESS_SUPPLIER_NAME_ID"].ToString()), CountryID);
                            }
                            //if (dsxdslcurs != null && dsxdslcurs.Tables.Count != 0 && dsxdslcurs.Tables[0].Rows[0] != null)
                            if (dsxdslcurs != null && dsxdslcurs.Tables.Count != 0 && dsxdslcurs.Tables[0].Rows.Count > 0)
                            {
                                foreach (DataRow drxdslcurs in dsxdslcurs.Tables[0].Rows)
                                {
                                    vsatattrcurs.ContentionRatio = "1:" + drxdslcurs["CONTENTION_VALUE"].ToString();
                                }

                            }

                            if (ParentProductID > 0)
                            {
                                DeliveryTime = bal.GetDeliveryTime(ParentCaseID, Convert.ToInt32(drAttr["ACCESS_SUPPLIER_NAME_ID"].ToString()), CountryID);
                            }
                            else
                            {
                                DeliveryTime = bal.GetDeliveryTime(CaseID, Convert.ToInt32(drAttr["ACCESS_SUPPLIER_NAME_ID"].ToString()), CountryID);
                            }
                            DataSet dssuppcurs = null;
                            if (ParentProductID > 0)
                            {
                                dssuppcurs = bal.GetVsatSupplierCursor(CaseID, AccessSupplierCharID, Convert.ToInt32(drPackage["CASE_PKG_ID"].ToString()), 0);
                            }
                            else
                            {
                                dssuppcurs = bal.GetVsatSupplierCursor(CaseID, AccessSupplierCharID, Convert.ToInt32(drPackage["CASE_PKG_ID"].ToString()), 1);
                            }

                            if (dssuppcurs != null && dssuppcurs.Tables.Count != 0 && dssuppcurs.Tables[0].Rows.Count > 0)
                            {
                                foreach (DataRow drsuppcurs in dssuppcurs.Tables[0].Rows)
                                {
                                    if (string.IsNullOrEmpty(vsatattrcurs.Supplier))
                                        vsatattrcurs.Supplier = drsuppcurs["CHAR_NAME"].ToString();
                                    else
                                        vsatattrcurs.Supplier += "," + drsuppcurs["CHAR_NAME"].ToString();
                                }

                            }

                            vsatattrcurs.SupplierProductBTInternalSLA = drAttr["supplier_prodname"].ToString();
                            vsatattrcurs.ServiceLeadTime = DeliveryTime > 0 ? DeliveryTime + " Days" : " ";
                            vsatattrcurs.POP = drAttr["HUB_SITE_NAME"].ToString();
                            vsatattrcurs.VSATSupplyType = drAttr["vsat_supply_type"].ToString();

                            //parameter added for SLA info
                            vsatattrcurs.PackageID = pckgid;
                            vsatattrcurs.SuppProdID = Convert.ToString(drAttr["ACCESS_SUPPLIER_NAME_ID"]);
                            vsatattrcurs.AccSupplierCharID = Convert.ToString(drAttr["ACCESS_SUPPLIER_CHAR_ID"]);
                            vsatattrcurs.AccessTypeID = Convert.ToString(drAttr["ACCESS_PRODUCT_TYPE_ID"]);
                            vsatattrcurs.portTypeID = Convert.ToString(drAttr["PORT_TYPE_ID"]);
                            //paremeter end for SLA info



                            lstattrdata.Add(vsatattrcurs);
                        }


                    }
                }
            }
            return lstattrdata;
        }


        [WebMethod]
        public static List<Speed> GetSpeeds(int ProductID, int Country1ID, int City1ID, int Country2ID, int City2ID)
        {
            Filters bal = new Filters();
            List<Speed> lstSpeeds = new List<Speed>();
            DataSet ds = bal.GetSpeeds(ProductID, Country1ID, City1ID, Country2ID, City2ID);
            if (ds != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
            {
                Speed sp = new Speed();
                foreach (DataRow row in ds.Tables[0].Rows)
                {

                    sp = new Speed() { SpeedID = Convert.ToInt32(row["access_speed_char_id"].ToString()), SpeedName = row["SpeedVal"].ToString() };

                    lstSpeeds.Add(sp);
                }

            }


            return lstSpeeds;
        }

        [WebMethod]
        public static CaseUpdatedInfo GetUserInfo(int CaseID, string TableName)
        {
            Filters bal = new Filters();
            CaseUpdatedInfo info = new CaseUpdatedInfo();
            Hashtable ht = bal.GetUserInformation(CaseID, TableName);
            if (ht != null && ht.Count > 0)
            {

                info.CreatedBy = Convert.ToString(ht["CreatedBy"]) == string.Empty ? "UNKNOWN" : Convert.ToString(ht["CreatedBy"]);
                info.UpdatedBy = Convert.ToString(ht["UpdatedBy"]) == string.Empty ? "UNKNOWN" : Convert.ToString(ht["UpdatedBy"]);
                info.CreatedDate = Convert.ToString(ht["CreatedByDate"].ToString()) == string.Empty ? "" : Convert.ToString(ht["CreatedByDate"].ToString()) + " GMT";
                info.UpdatedDate = Convert.ToString(ht["UpdatedByDate"]) == string.Empty ? "" : Convert.ToString(ht["UpdatedByDate"]) + " GMT";

            }

            return info;
        }

        [WebMethod]
        public static List<Documents> GetLinks(int ProductID)
        {
            ProdLinkBAL bal = new ProdLinkBAL();
            List<Documents> lstdoc = new List<Documents>();
            DataSet ds = bal.GetDocumentLinks(ProductID);
            if (ds != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
            {
                Documents doc = new Documents();
                foreach (DataRow row in ds.Tables[0].Rows)
                {

                    doc = new Documents() { DocumentTitle = row["document_title"].ToString(), DocumentUrl = row["document_url"].ToString().Contains("/prodcat22/") ? ConfigurationManager.AppSettings["ApplLink"] + row["document_url"].ToString() : row["document_url"].ToString() };

                    lstdoc.Add(doc);
                }

            }


            return lstdoc;
        }



        private static List<Product> GetProdData(int CountryID, int AccessLevel, string BtGfrCodes, string SegregationCodes, string User_Id)
        {
            Filters bal = new Filters();
            DataSet ds = bal.GetProducts(CountryID, AccessLevel);
            List<string> lstValidProduct = null;

            List<Product> lstProducts = new List<Product>();
            //below code is used to filter product based on User access level
            if (AccessLevel != 1)//Access level 1 is for super user
            {
                lstValidProduct = bal.ValidProduct(AccessLevel, BtGfrCodes, SegregationCodes, User_Id);
            }

            if (ds != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
            {
                if (AccessLevel != 1)
                {
                    foreach (DataRow row in ds.Tables[0].Rows)
                    {
                        if (lstValidProduct.Exists(item => item == Convert.ToString(row["ProductID"])))
                        {
                            if (Convert.ToString(row["Product_Type"]) == "0")
                            {
                                Product objProd = new Product();
                                objProd.ProductID = Convert.ToInt32(Convert.ToString(row["ProductID"]));
                                objProd.ProductName = Convert.ToString(row["ProductName"]);
                                objProd.IsCPEExists = Convert.ToInt32(Convert.ToString(row["USE_CPE_PRODUCT"]));

                                lstProducts.Add(objProd);
                            }
                        }
                    }

                }
                else
                {
                    Product prod = new Product();
                    foreach (DataRow row in ds.Tables[0].Rows)
                    {

                        prod = new Product() { ProductID = Convert.ToInt32(row["ProductID"].ToString()), ProductName = row["ProductName"].ToString(), IsCPEExists = Convert.ToInt32(row["USE_CPE_PRODUCT"].ToString()) };
                        lstProducts.Add(prod);
                    }
                }


            }
            return lstProducts;
        }


        private static List<Region> GetRegions(int ProductID)
        {
            Filters balregion = new Filters();
            DataSet ds = balregion.GetRegions(ProductID);

            List<Region> lstregion = new List<Region>();
            JavaScriptSerializer serializer = new JavaScriptSerializer();
            if (ds != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
            {
                Region reg = new Region();
                foreach (DataRow drow in ds.Tables[0].Rows)
                {
                    reg = new Region() { RegionID = Convert.ToInt32(drow["RegionID"].ToString()), RegionName = drow["RegionName"].ToString() };
                    lstregion.Add(reg);
                }

            }
            return lstregion;
        }

        private static DataSet GetBandWidthCountriesCites(int ProductID, int Country1ID, int City1ID, int Country2ID, int City2ID, int flag, int Speed, int CityFlag)
        {
            string Speeds = "";
            Filters balcountries = new Filters();
            string SpeedValues = "";
            if (Speed == 0)
            {
                DataSet dsSpeeds = balcountries.GetSpeeds(ProductID, Country1ID, City1ID, Country2ID, City2ID);

                if (dsSpeeds != null && dsSpeeds.Tables.Count > 0 && dsSpeeds.Tables[0].Rows.Count > 0)
                {
                    var lstspeed = dsSpeeds.Tables[0].AsEnumerable().Select(t => new { SpeedID = t.Field<decimal>("ACCESS_SPEED_CHAR_ID") });

                    foreach (var item in lstspeed)
                    {
                        SpeedValues = SpeedValues == "" ? item.SpeedID.ToString() : SpeedValues + "," + item.SpeedID.ToString();

                    }

                }
            }
            //else
            //{
            //    SpeedValues = Speed.ToString();
            //}
            int CountryID = 0;
            if (flag == 1)
            {
                CountryID = Country1ID;
            }
            else
            {
                CountryID = Country2ID;
            }

            if (CityFlag == 0)
            {

                return balcountries.GetBandWidthCountriesCities(ProductID, SpeedValues, CountryID, Speed, 0);
            }
            else
            {
                return balcountries.GetBandWidthCities(ProductID, SpeedValues, CountryID, Speed, CityFlag);
            }
        }

        [WebMethod]
        public static List<countries> GetCountriesBySpeeds(int ProductID, int CountryID)
        {
            Filters balcountries = new Filters();
            List<countries> lstCountries = new List<countries>();
            DataSet ds = null;
            ds = GetBandWidthCountriesCites(ProductID, CountryID, 0, 0, 0, 0, 0, 0);
            var CountryList = ds.Tables[0].AsEnumerable().Select(t => new { CountryID = t.Field<decimal>("CountryID"), CountryName = t.Field<string>("CountryName") }).Distinct().OrderBy(t => t.CountryName);

            foreach (var item in CountryList)
            {
                if (lstCountries.Where(t => t.CountryID == Convert.ToInt32(item.CountryID)).ToList().Count == 0)
                {
                    lstCountries.Add(new countries() { CountryID = Convert.ToInt32(item.CountryID), CountryName = item.CountryName });
                }
            }

            ds = balcountries.GetOnlyCountries(ProductID, 0);
            var CountryListNew = ds.Tables[0].AsEnumerable().Select(t => new { CountryID = t.Field<decimal>("CountryID"), CountryName = t.Field<string>("CountryName") }).Distinct().OrderBy(t => t.CountryName);

            foreach (var item in CountryListNew)
            {
                if (lstCountries.Where(t => t.CountryID == Convert.ToInt32(item.CountryID)).ToList().Count == 0)
                {
                    lstCountries.Add(new countries() { CountryID = Convert.ToInt32(item.CountryID), CountryName = item.CountryName });
                }
            }
            return lstCountries;
        }

        private static List<countries> GetCountries(int ProductID, int RegionID, int flag, int Speed,
            int AccessLevel, string BtGfrCodes, string SegregationCodes, string User_Id)
        {
            Filters balcountries = new Filters();
            DataSet ds = null;
            List<countries> lstcountries = new List<countries>();
            countries cntry = new countries();
            if (ProductID == 58 || ProductID == 72)
            {
                ds = GetBandWidthCountriesCites(ProductID, 0, 0, 0, 0, flag, Speed, 0);
                var CountryList = ds.Tables[0].AsEnumerable().Select(t => new { CountryID = t.Field<decimal>("CountryID"), CountryName = t.Field<string>("CountryName") }).Distinct().OrderBy(t => t.CountryName);

                foreach (var item in CountryList)
                {
                    if (lstcountries.Where(t => t.CountryID == Convert.ToInt32(item.CountryID)).ToList().Count == 0)
                    {
                        lstcountries.Add(new countries() { CountryID = Convert.ToInt32(item.CountryID), CountryName = item.CountryName });
                    }


                }

                ds = balcountries.GetOnlyCountries(ProductID, Speed);
                var CountryListNew = ds.Tables[0].AsEnumerable().Select(t => new { CountryID = t.Field<decimal>("CountryID"), CountryName = t.Field<string>("CountryName") }).Distinct().OrderBy(t => t.CountryName);

                foreach (var item in CountryListNew)
                {
                    if (lstcountries.Where(t => t.CountryID == Convert.ToInt32(item.CountryID)).ToList().Count == 0)
                    {
                        lstcountries.Add(new countries() { CountryID = Convert.ToInt32(item.CountryID), CountryName = item.CountryName });
                    }
                }

                //GetOnlyCountries
            }
            else
            {
                string ValidProductIDs = string.Empty;
                List<string> lstValidProduct = null;

                List<Product> lstProducts = new List<Product>();
                //below code is used to filter product based on User access level
                if (ProductID == 0 && AccessLevel != 1)//Access level 1 is for super user
                {
                    lstValidProduct = balcountries.ValidProduct(AccessLevel, BtGfrCodes, SegregationCodes, User_Id);
                    ValidProductIDs = string.Join(",", lstValidProduct.ToArray());
                    ds = balcountries.GetCountries(ProductID, RegionID, ValidProductIDs);
                }
                else
                {
                    ds = balcountries.GetCountries(ProductID, RegionID);
                }

                JavaScriptSerializer serializer = new JavaScriptSerializer();
                if (ds != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
                {

                    foreach (DataRow drcntry in ds.Tables[0].Rows)
                    {
                        cntry = new countries() { CountryID = Convert.ToInt32(drcntry["CountryID"].ToString()), CountryName = drcntry["CountryName"].ToString() };
                        lstcountries.Add(cntry);
                    }

                }
            }

            lstcountries = lstcountries.OrderBy(t => t.CountryName).ToList();

            return lstcountries;
        }

        private static List<stateProvince> GetStates(int ProductID, int RegionID, int CountryID, int isIA)
        {
            Filters balstates = new Filters();
            DataSet ds = balstates.GetStates(ProductID, RegionID, CountryID, isIA);

            List<stateProvince> lstStateProvince = new List<stateProvince>();
            JavaScriptSerializer serializer = new JavaScriptSerializer();
            if (ds != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
            {
                stateProvince state = new stateProvince();
                foreach (DataRow drstate in ds.Tables[0].Rows)
                {
                    if (Convert.ToInt32(drstate["StateID"].ToString()) > 0)
                    {
                        state = new stateProvince() { StateID = Convert.ToInt32(drstate["StateID"].ToString()), StateName = drstate["StateName"].ToString() };

                        lstStateProvince.Add(state);
                    }
                }
            }
            return lstStateProvince;
        }
        private static List<City> GetCities(int ProductID, int RegionID, int countryID, int StateID, int Speed, int flag, int isIA,int CityFlag)
        {
            Filters balcities = new Filters();
            DataSet ds = null;
            List<City> lstcity = new List<City>();
            if ((ProductID == 58 || ProductID == 72))
            {
                ds = GetBandWidthCountriesCites(ProductID, countryID, 0, 0, 0, flag, Speed, CityFlag);
                if (ds != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
                {
                    var CountryList = ds.Tables[0].AsEnumerable().Select(t => new { CityID = t.Field<decimal>("CityID"), CityName = t.Field<string>("CityName") }).Distinct().OrderBy(t => t.CityName);

                    foreach (var item in CountryList)
                    {
                        if (ProductID == 58 && countryID == 0)
                        {
                            if (item.CityName.ToLower() == "All Cities".ToString().ToLower())
                            {
                                continue;
                            }
                        }
                        if (lstcity.Where(t => t.CityID == item.CityID).Count() == 0)
                        {
                            lstcity.Add(new City() { CityID = Convert.ToInt32(item.CityID), CityName = item.CityName });
                        }
                    }
                }

                lstcity = lstcity.OrderBy(t => t.CityName).ToList();
            }
            else
            {
                ds = balcities.GetCities(ProductID, RegionID, countryID, StateID, Speed, isIA);


                if (ds != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
                {
                    City city = new City();
                    foreach (DataRow drcity in ds.Tables[0].Rows)
                    {
                        if (lstcity.Where(t => t.CityID == Convert.ToDecimal(drcity["CityID"].ToString())).Count() == 0)
                        {
                            city = new City() { CityID = Convert.ToInt32(drcity["CityID"].ToString()), CityName = drcity["CityName"].ToString() };
                            lstcity.Add(city);
                        }
                    }
                }
            }

            List<City> lstAllCities = lstcity.Where(t => t.CityName.Contains("All Cities")).ToList();
            lstcity.RemoveAll(t => t.CityName.Contains("All Cities"));
            lstcity.InsertRange(0, lstAllCities);
            return lstcity;
        }

        private static List<Pop> Getpops(int ProductID, int RegionID, int countryID, int StateID, int CityID, int isIA)
        {
            Filters BALPOPS = new Filters();
            DataSet ds = BALPOPS.Getpops(ProductID, RegionID, countryID, StateID, CityID, isIA);

            List<Pop> lstpop = new List<Pop>();
            JavaScriptSerializer serializer = new JavaScriptSerializer();
            if (ds != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
            {
                Pop pop = new Pop();
                foreach (DataRow drpop in ds.Tables[0].Rows)
                {
                    pop = new Pop() { POPID = Convert.ToInt32(drpop["POPID"].ToString()), PopName = drpop["PopName"].ToString() };
                    lstpop.Add(pop);
                }
            }
            return lstpop;
        }

        private static List<CPESuppliers> GetCPESuppliers(int countryID, int ProductID, int CityID)
        {
            CaseDetBal supplierBAL = new CaseDetBal();
            DataSet ds = supplierBAL.GetCPESuppliers(countryID, ProductID, CityID);
            List<CPESuppliers> SuppList = new List<CPESuppliers>();
            JavaScriptSerializer serializer = new JavaScriptSerializer();
            if (ds != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
            {
                CPESuppliers objsupp = new CPESuppliers();
                foreach (DataRow drSupp in ds.Tables[0].Rows)
                {
                    objsupp = new CPESuppliers() { supplierID = Convert.ToInt32(drSupp["supplierID"].ToString()), SupplierName = drSupp["SupplierName"].ToString() };
                    SuppList.Add(objsupp);
                }
            }
            //binding supplier data to session to use in CPE Detaills POPUP
            HttpContext.Current.Session["CPESupplier"] = SuppList;
            return SuppList;
        }


        private static int IsCPEExist(int prodID, int CaseID)
        {
            CPEBundleBAL obj = new CPEBundleBAL();
            return obj.getCPEStatus(prodID, CaseID);
        }

        [WebMethod]
        public static int getSegmentCount(int sAccess_Level, string GfrCode, string SegregationCode,int prodID)
        {
            DispSubProductBAL objSubProductBAL = new DispSubProductBAL();
            objSubProductBAL.prodID = prodID;
            return objSubProductBAL.getSegCount(sAccess_Level, GfrCode, SegregationCode);
        }

    }

}