using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.Services;
using SCSearchBAL;
using System.Data;

namespace SCSearch
{
    public partial class HVPNpkgDet : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [WebMethod]
        public static HVPNAttribute getHVPNPkgAtt(int countryID, int SuppProdID)
        {
            DispHVPNpkgBAL obj = new DispHVPNpkgBAL();
            return obj.getHVPNPkgAtt(countryID, SuppProdID);
        }

        [WebMethod]
        public static List<CPEDetails> getCPEDetails()
        {
            DispHVPNpkgBAL obj = new DispHVPNpkgBAL();
            return obj.getCPEDetails();
        }

        [WebMethod]
        public static List<DSLPackageDetails> GetDSLPackageDetails(int ParentProductID,int CaseID,int PackageID,int ParentCaseID)
        {
            DispHVPNpkgBAL obj = new DispHVPNpkgBAL();
            List<DSLPackageDetails> pckgDetails = new List<DSLPackageDetails>();
            DataTable dt = obj.GetDSLPackageDetails(ParentProductID, CaseID, PackageID, ParentCaseID);
            string dslInfo="",CharValue="",linkValue="";
            if (dt != null && dt.Rows.Count > 0)
            {

                foreach (DataRow item in dt.Rows)
                {
                    if (item["CHAR_TYPE_VALUE_COUNT"].ToString() == "3")
                    {
                        dslInfo = item["char_type_name"].ToString();
                        CharValue = item["char_name"].ToString();
                    }
                    else if (item["CHAR_TYPE_VALUE_COUNT"].ToString() == "0")
                    {
                        dslInfo = item["char_name"].ToString();
                        CharValue = item["avail_desc"].ToString();
                    }

                    else if (item["CHAR_TYPE_VALUE_COUNT"].ToString() == "2" || item["CHAR_TYPE_VALUE_COUNT"].ToString() == "4" || item["CHAR_TYPE_VALUE_COUNT"].ToString() == "6")
                    {
                        dslInfo = item["char_name"].ToString();
                        CharValue = item["char_value"].ToString();
                    }
                    else
                    {
                        dslInfo = item["char_name"].ToString();
                        CharValue = item["char_value"].ToString();
                    }
                    pckgDetails.Add(new DSLPackageDetails() { DSLInformation = dslInfo, Value = CharValue, LinkVal = linkValue });    
                }

            }
            return pckgDetails;
        }

        [WebMethod]
        public static List<DSLPackageDetails> GetDSLContryDetails(int ParentPackageID, int CaseID, int PackageID, int ParentCaseID)
        {
            DispHVPNpkgBAL obj = new DispHVPNpkgBAL();
            List<DSLPackageDetails> pckgDetails = new List<DSLPackageDetails>();
            DataTable dt = obj.GetDSLCountryDetails(CaseID, PackageID, ParentCaseID, ParentPackageID);
            string dslInfo = "", CharValue = "", linkValue = "";
            if (dt != null && dt.Rows.Count > 0)
            {

                foreach (DataRow item in dt.Rows)
                {
                    if (item["CHAR_TYPE_VALUE_COUNT"].ToString() == "3" || item["CHAR_TYPE_VALUE_COUNT"].ToString() == "4")
                    {
                        dslInfo = item["char_type_name"].ToString();
                        CharValue = item["char_name"].ToString();
                    }
                    else if (item["CHAR_TYPE_VALUE_COUNT"].ToString() == "0")
                    {
                        dslInfo = item["char_name"].ToString();
                        CharValue = item["avail_desc"].ToString();
                    }

                    else if (item["CHAR_TYPE_VALUE_COUNT"].ToString() == "1" || item["CHAR_TYPE_VALUE_COUNT"].ToString() == "2" || item["CHAR_TYPE_VALUE_COUNT"].ToString() == "6")
                    {
                        dslInfo = item["char_name"].ToString();
                        CharValue = item["char_value"].ToString();
                    }
                    else
                    {
                        dslInfo = item["char_name"].ToString();
                        CharValue = item["char_value"].ToString();
                    }
                    pckgDetails.Add(new DSLPackageDetails() { DSLInformation = dslInfo, Value = CharValue, LinkVal = linkValue });
                }

            }
            return pckgDetails;
        }


        [WebMethod]
        public static List<HVPNPackagePortType> GetDSLPackageLevelInfo(int IsDSL, int ParentLink,int ProductID, int ParentId, int CaseID, int PkgId1, int PCaseID)
        {
            DispHVPNpkgBAL obj = new DispHVPNpkgBAL();
            List<HVPNPackagePortType> lstGetNoters = new List<HVPNPackagePortType>();
            DataTable dtGetNoters = new DataTable();
            if (ParentLink == 0)
            {
                dtGetNoters = obj.GetChildAndParentLevelData(IsDSL, ProductID, ParentId, CaseID, PkgId1, PCaseID);
            }
            else
            {
                dtGetNoters = obj.GetParentLevelData(IsDSL, ParentId, CaseID, PkgId1, PCaseID);
            }
            if (dtGetNoters != null && dtGetNoters.Rows.Count > 0)
            {

                foreach (DataRow item in dtGetNoters.Rows)
                {
                    HVPNPackagePortType portType = new HVPNPackagePortType();
                    if (item["CHAR_TYPE_VALUE_COUNT"].ToString() == "3")
                    {
                        portType.charName = item["char_type_name"].ToString();
                        portType.charValue = item["char_name"].ToString();
                    }
                    else if (item["CHAR_TYPE_VALUE_COUNT"].ToString() == "0")
                    {
                        portType.charName = item["char_name"].ToString();
                        portType.charValue = item["avail_desc"].ToString();
                    }

                    else if (item["CHAR_TYPE_VALUE_COUNT"].ToString() == "1" || item["CHAR_TYPE_VALUE_COUNT"].ToString() == "2" || item["CHAR_TYPE_VALUE_COUNT"].ToString() == "4" || item["CHAR_TYPE_VALUE_COUNT"].ToString() == "6")
                    {
                        portType.charName = item["char_name"].ToString();
                        portType.charValue = item["char_value"].ToString();
                    }
                    else
                    {
                        portType.charName = item["char_name"].ToString();
                        portType.charValue = item["char_value"].ToString();
                    }
                    lstGetNoters.Add(portType);
                }
            }
            return lstGetNoters;
        }



        [WebMethod]
        public static List<HVPNPackagePortType> GetDSLPortTypeLevelInfo(int IsDSL, int ParentLink, int PCaseid, int PPkgId, int Caseid)
        {
            DispHVPNpkgBAL obj = new DispHVPNpkgBAL();
            List<HVPNPackagePortType> lstGetrsCountPort = new List<HVPNPackagePortType>();
            DataTable dtGetrsCountPort = new DataTable();
            if (ParentLink == 0)
            {
                dtGetrsCountPort = obj.GetPTCPkgDetails(IsDSL, Caseid, PPkgId);
            }
            else
            {
                dtGetrsCountPort = obj.GetPTCPkgInfo(IsDSL, PCaseid, PPkgId, Caseid);
            }


            if (dtGetrsCountPort != null && dtGetrsCountPort.Rows.Count > 0)
            {

                foreach (DataRow item in dtGetrsCountPort.Rows)
                {
                    HVPNPackagePortType portType = new HVPNPackagePortType();
                    if (item["CHAR_TYPE_VALUE_COUNT"].ToString() == "3" || item["CHAR_TYPE_VALUE_COUNT"].ToString() == "4")
                    {
                        portType.charName = item["char_type_name"].ToString();
                        portType.charValue = item["char_name"].ToString();
                    }
                    else if (item["CHAR_TYPE_VALUE_COUNT"].ToString() == "0")
                    {
                        portType.charName = item["char_name"].ToString();
                        portType.charValue = item["avail_desc"].ToString();
                    }

                    else if (item["CHAR_TYPE_VALUE_COUNT"].ToString() == "1" || item["CHAR_TYPE_VALUE_COUNT"].ToString() == "2" || item["CHAR_TYPE_VALUE_COUNT"].ToString() == "6")
                    {
                        portType.charName = item["char_name"].ToString();
                        portType.charValue = item["char_value"].ToString();
                    }
                    else
                    {
                        portType.charName = item["char_name"].ToString();
                        portType.charValue = item["char_value"].ToString();
                    }
                    lstGetrsCountPort.Add(portType);

                }
            }
            return lstGetrsCountPort;
        }


    }
}