using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using SCSearchDAL;
using System.Data;
using System.Diagnostics;
using Oracle.DataAccess.Client;

namespace SCSearchDAL
{
    public class SCSearchHLP
    {
        private StringBuilder strQuery = new StringBuilder();
        private GetDataFromDB objGetDataFromDB = null;

        public SCSearchHLP()
        {
            objGetDataFromDB = new GetDataFromDB();
        }
        public List<CPEBundle> GetValidProductBundlesForCountry(int productID, int countryID)
        {




            strQuery.Clear();
            strQuery.Append("SELECT c.char_name as bundlename,(select char_name from csu_ref_valid_char b");
            strQuery.Append(" where b.char_id = router_id) routername,(SELECT listagg (SUBSTR(char_name,");
            strQuery.Append(" instr(char_name,' ',1,2)), ',') WITHIN GROUP (ORDER BY char_name)");
            strQuery.Append(" from csu_ref_valid_char where char_id in (select distinct Access_type from CSU_CPE_CNTRY_BNDLS_ACCTYPE");
            strQuery.Append(" where bundle_id =  x.xid and COUNTRY_ID = " + countryID + ")) AccessTech,PARTIAL_BNDL_FLAG,");
            strQuery.Append(" TO_CHAR(EXPECTED_DATE, 'DD-MON-YYYY') as EXPECTED_DATE,");
            strQuery.Append(" TO_CHAR(QUOTABLE_START_DATE,'DD-MON-YYYY') as QUOTABLEDT,");
            strQuery.Append(" TO_CHAR(EOS_DATE,'DD-MON-YYYY') as EOSDT,TO_CHAR(EOQ_DATE,'DD-MON-YYYY') as EOQDT,");
            strQuery.Append(" TO_CHAR(EOL_DATE,'DD-MON-YYYY') as EOLDT,");
            strQuery.Append(" (select distinct SMART_SERVICE_AVAIL from CSU_CPE_CNTRY_SUPP where product_id = " + productID);
            strQuery.Append(" and country_id = " + countryID + " and rownum<=1) SMARTSERVICEAVIL");
            strQuery.Append(" from CSU_CPE_BNDLS,");
            strQuery.Append(" (SELECT DISTINCT h.ID as xid FROM csu_cpe_product_bndls e,");
            strQuery.Append(" CSU_CPE_CNTRY_BNDLS_ACCTYPE f,");
            strQuery.Append(" csu_cpe_routers g,csu_cpe_bndls h WHERE e.bundle_id = f.bundle_id AND g.ID = h.router_id");
            strQuery.Append(" AND e.bundle_id = h.ID and TRUNC(nvl(h.EOQ_DATE,sysdate)) >= TRUNC(sysdate)");
            strQuery.Append(" and TRUNC(nvl(g.ROUTER_EOQ_DATE,sysdate)) >= TRUNC(sysdate)");
            strQuery.Append(" and f.COUNTRY_ID =" + countryID + " and e.PRODUCT_CD =" + productID + ") x,");
            strQuery.Append(" csu_ref_valid_char c where c.char_id = id and c.char_valid_cd = 1 AND ID = x.xid");




            #region comment
            //Stopwatch st = new Stopwatch();
            //st.Start();
            //strQuery.Append("select a.char_id,a.char_name FROM CSU_REF_VALID_CHAR a");
            //strQuery.Append(" where a.CHAR_VALID_CD = 1");
            //strQuery.Append(" and a.CHAR_ID in (SELECT DISTINCT h.ID FROM csu_cpe_product_bndls e,");
            //strQuery.Append(" CSU_CPE_CNTRY_BNDLS_ACCTYPE f,");
            //strQuery.Append(" csu_cpe_routers g,");
            //strQuery.Append(" csu_cpe_bndls h");
            //strQuery.Append(" WHERE e.bundle_id = f.bundle_id");
            //strQuery.Append(" AND g.ID = h.router_id");
            //strQuery.Append(" AND e.bundle_id = h.ID");
            //strQuery.Append(" and TRUNC(nvl(h.EOQ_DATE,sysdate)) >= TRUNC(sysdate)");
            //strQuery.Append(" and TRUNC(nvl(g.ROUTER_EOQ_DATE,sysdate)) >= TRUNC(sysdate)");
            //strQuery.Append(" and f.COUNTRY_ID = " + CountryID );
            //if (!String.IsNullOrEmpty(ProductID.ToString()))
            //{
            //    strQuery.Append(" and e.PRODUCT_CD = " + ProductID);
            //}
            //else
            //{
            //    strQuery.Append(" and e.PRODUCT_CD in (SELECT DISTINCT a.product_cd FROM CSU_PRODUCT a WHERE  a.product_cd ");
            //    strQuery.Append(" NOT IN (SELECT DISTINCT b.product_cd FROM CSU_REF_SUBPRODUCT b) AND  ");
            //    strQuery.Append(" (a.product_valid_cd = 1 AND a.use_cpe_product = 1) UNION SELECT DISTINCT ");
            //    strQuery.Append(" a.product_cd FROM CSU_PRODUCT a, CSU_REF_SUBPRODUCT b WHERE  ");
            //    strQuery.Append(" a.product_cd = b.product_cd AND b.subproduct_valid_cd = 1 AND   ");
            //    strQuery.Append(" b.use_cpe_subproduct = 1 AND a.product_valid_cd = 1 AND a.use_cpe_product = 1)  ");
            //}
            //strQuery.Append(")");
            //strQuery.Append(" ORDER BY a.CHAR_NAME");
            ////objGetDataFromDB = new GetDataFromDB();
            #endregion
            // DataTable dt = objGetDataFromDB.GetDataTable(strQuery.ToString());
            OracleConnection oConn = null;
            List<CPEBundle> lstCpeBundle;
            try
            {
                oConn = objGetDataFromDB.openConnection();
                IDataReader dr = objGetDataFromDB.getDataReaderFromDB(oConn, strQuery.ToString());

                lstCpeBundle = new List<CPEBundle>();
                //string SmartServiceAvalibility = getSmartServiceAvalibility(productID, countryID);
                // foreach (DataRow dr in dt.Rows)

                while (dr.Read())
                {
                    CPEBundle objCPEBundle = new CPEBundle();
                    // objCPEBundle.BundleID = int.Parse(dr["Char_id"].ToString());
                    // objCPEBundle.BundleName = dr["char_name"].ToString();
                    // DataTable dtBundle = GetCpeBundleList(objCPEBundle.BundleID);
                    // foreach (DataRow dr1 in dtBundle.Rows)
                    {
                        objCPEBundle.BundleName = dr["bundlename"].ToString();
                        objCPEBundle.RouterName = dr["routername"].ToString();
                        //objCPEBundle.AccessTechnology = GetCountryBundleAccessType(objCPEBundle.BundleID, CountryID);
                        objCPEBundle.AccessTechnology = dr["AccessTech"].ToString();
                        objCPEBundle.ExpectedDateforOrder = dr["EXPECTED_DATE"].ToString();
                        objCPEBundle.QoutableStartDate = dr["QUOTABLEDT"].ToString();
                        objCPEBundle.EOQ = dr["EOQDT"].ToString();
                        objCPEBundle.EOL = dr["EOLDT"].ToString();
                        objCPEBundle.EOS = dr["EOSDT"].ToString();
                        if (!String.IsNullOrEmpty(dr["PARTIAL_BNDL_FLAG"].ToString()))
                        {
                            objCPEBundle.PartialBundle = char.Parse(dr["PARTIAL_BNDL_FLAG"].ToString());
                        }
                        else
                        {
                            objCPEBundle.PartialBundle = '\0';
                        }
                        objCPEBundle.SmartServiceAvailability = dr["SMARTSERVICEAVIL"].ToString();

                    }

                    lstCpeBundle.Add(objCPEBundle);

                }
            }
            catch (Exception ex) { throw ex; }
            finally { oConn.Close(); }
            // st.Stop();

            return lstCpeBundle;

        }

        //public DataTable GetCpeBundleList(int BundleID)
        //{
        //    strQuery.Clear();
        //    strQuery.Append("SELECT (select char_name from (select char_name,char_id from csu_ref_valid_char) b");
        //    strQuery.Append(" where b.char_id = router_id) routername,");
        //    strQuery.Append(" PARTIAL_BNDL_FLAG,TO_CHAR(EXPECTED_DATE, 'DD-MON-YYYY') as EXPECTED_DATE,");
        //    strQuery.Append(" TO_CHAR(QUOTABLE_START_DATE,'DD-MON-YYYY') as QUOTABLEDT,");
        //    strQuery.Append(" TO_CHAR(EOS_DATE,'DD-MON-YYYY') as EOSDT,TO_CHAR(EOQ_DATE,'DD-MON-YYYY') as EOQDT,");
        //    strQuery.Append(" TO_CHAR(EOL_DATE,'DD-MON-YYYY') as EOLDT from CSU_CPE_BNDLS");
        //    strQuery.Append(" where ID=" + BundleID);
        //    //objGetDataFromDB = new GetDataFromDB();
        //    DataTable dt = objGetDataFromDB.GetDataTable(strQuery.ToString());
        //    return dt;



        //}

        public string GetCountryBundleAccessType(int bundleID, int countryId)
        {
            string ResultAccessType = string.Empty;
            strQuery.Clear();
            //strQuery.Append("SELECT listagg (SUBSTR(char_name,instr(char_name,' ',1,2)), ',') WITHIN GROUP (ORDER BY char_name)"); 
            //strQuery.Append("FROM CSU_REF_VALID_CHAR WHERE CHAR_ID IN");
            //strQuery.Append(" CSU_CPE_CNTRY_BNDLS_ACCTYPE  where bundle_id = " + bundleID + ")");
            strQuery.Append(" select distinct char_name from csu_ref_valid_char where char_id in");
            strQuery.Append("(select distinct Access_type from");
            strQuery.Append(" CSU_CPE_CNTRY_BNDLS_ACCTYPE  where bundle_id = " + bundleID + " and country_id =" + countryId + ")");
            //objGetDataFromDB = new GetDataFromDB();
            DataTable dt = objGetDataFromDB.GetDataTable(strQuery.ToString());
            //string[] arrAccTech = AccTech.Split(',');
            //for (int i = 0; i < arrAccTech.Length - 1; i++)
            //{
            //    ResultAccessType +=  TrimString(arrAccTech[i], "with");
            //}

            foreach (DataRow dr in dt.Rows)
            {
                ResultAccessType += TrimString(dr[0].ToString(), "with") + ",";
            }
            return ResultAccessType.Remove(ResultAccessType.Length - 1);

        }

        private string TrimString(string OriginalString, string delemeterString)
        {
            if (OriginalString.Contains(delemeterString) == true)
            {
                return OriginalString.Substring(OriginalString.IndexOf(delemeterString) + delemeterString.Length);
            }
            else
            {
                return OriginalString;
            }


        }

        public string getSmartServiceAvalibility(int productID, int countryID)
        {
            string strQuery = "select distinct SMART_SERVICE_AVAIL from CSU_CPE_CNTRY_SUPP where product_id = " + productID +
                "and country_id = " + countryID;

            string SmartServiceAvalibility = objGetDataFromDB.GetSingleRowFromDB(strQuery);
            return SmartServiceAvalibility;

        }

        //public bool productAvailability(int productID)
        //{
        //    strQuery.Clear();
        //    strQuery.Append("SELECT 1 as id FROM CSU_REF_PRODUCT_OPT_MATRIX A,CSU_REF_VALID_CHAR B,CSU_REF_CHAR_TYPE C");
        //    strQuery.Append(" WHERE A.CHAR_ID=B.CHAR_ID AND A.CHAR_TYPE_ID=C.CHAR_TYPE_ID");
        //    strQuery.Append(" AND C.CHAR_TYPE_ID=B.CHAR_TYPE_ID AND C.CHAR_TYPE_NAME='CPE Maintenance Options'");
        //    strQuery.Append(" AND PRODUCT_CD='63' AND A.CPE_PRODUCT_MAP='" + productID + "'");

        //    OracleConnection oConn = objGetDataFromDB.openConnection();
        //    try
        //    {
        //        IDataReader dr = objGetDataFromDB.getDataReaderFromDB(oConn, strQuery.ToString());
        //        while (dr.Read()) { return true; }
        //    }
        //    catch (Exception ex) { throw ex; }
        //    finally { oConn.Close(); }

        //    return false;
        //}


        public List<CPEMaintainanceDetails> GetCPEMaintainanceDetails(int ProductID, int SupplierID, int CountryID, int CityID)
        {
            strQuery.Clear();
            strQuery.Append("SELECT 1 as id FROM CSU_REF_PRODUCT_OPT_MATRIX A,CSU_REF_VALID_CHAR B,CSU_REF_CHAR_TYPE C");
            strQuery.Append(" WHERE A.CHAR_ID=B.CHAR_ID AND A.CHAR_TYPE_ID=C.CHAR_TYPE_ID");
            strQuery.Append(" AND C.CHAR_TYPE_ID=B.CHAR_TYPE_ID AND C.CHAR_TYPE_NAME='CPE Maintenance Options'");
            strQuery.Append(" AND PRODUCT_CD='63' AND A.CPE_PRODUCT_MAP='" + ProductID + "'");

            OracleConnection oConn = objGetDataFromDB.openConnection();
            List<CPEMaintainanceDetails> lstMaintDet = null;
            try
            {
                IDataReader dr1 = objGetDataFromDB.getDataReaderFromDB(oConn, strQuery.ToString());
                if (!dr1.Read()) { ProductID = -1; }
                dr1.Close();
                strQuery.Clear();
                strQuery.Append("SELECT 1 as id FROM CSU_REF_PRODUCT_OPT_MATRIX A,CSU_REF_VALID_CHAR B,CSU_REF_CHAR_TYPE C ");
                strQuery.Append(" WHERE A.CHAR_ID=B.CHAR_ID AND A.CHAR_TYPE_ID=C.CHAR_TYPE_ID ");
                strQuery.Append(" AND C.CHAR_TYPE_ID=B.CHAR_TYPE_ID AND C.CHAR_TYPE_NAME='CPE Maintenance Options'");
                strQuery.Append(" AND PRODUCT_CD=63 AND A.CPE_PRODUCT_MAP=" + ProductID);
                strQuery.Clear();
                strQuery.Append("SELECT DISTINCT supplier.CHAR_ID SUPPLIER_ID ,supplier.CHAR_NAME SUPPLIER_NAME");
                strQuery.Append(",csupp.PRIORITY SUPPLIER_PRIORITY ,opt.CHAR_ID SERVICE_NUMBER,opt.CHAR_NAME SERVICE_NAME");
                strQuery.Append(" ,opt.CHAR_NUM_VALUE SERVICE_ORDER ");
                strQuery.Append(" ,avail.AVAIL_DESC SERVICE_AVAIL_DESC");
                strQuery.Append(" ,svc.CHAR_VALUE SERVICE_RESTRICTIONS ");
                strQuery.Append(" ,crpom.MANUFACTURER_NAME ");
                strQuery.Append(" ,crpom.MAINTAINER_NAME FROM  CSU_REF_CHAR_TYPE ctype ,CSU_REF_VALID_CHAR supplier ,CSU_COUNTRY cty");
                strQuery.Append(" ,CSU_CASES sctr,CSU_CPE_COUNTRY_SUPPLIERS csupp ,CSU_CASE_DETAILS svc ,CSU_REF_AVAILABILITY avail ");
                strQuery.Append(" ,CSU_REF_VALID_CHAR opt ,CSU_REF_CHAR_TYPE otype,CSU_REF_PRODUCT_OPT_MATRIX crpom ");
                strQuery.Append(" WHERE supplier.CHAR_TYPE_ID = ctype.CHAR_TYPE_ID AND ctype.CHAR_TYPE_NAME = 'CPE Suppliers'");
                strQuery.Append(" AND sctr.PRODUCT_CD = 63 AND cty.COUNTRY_ID = sctr.COUNTRY_ID ");
                strQuery.Append(" AND cty.COUNTRY_ID = csupp.COUNTRY_ID ");
                strQuery.Append(" AND supplier.CHAR_ID = csupp.SUPPLIER_CHAR_ID ");
                strQuery.Append(" AND supplier.CHAR_ID = sctr.ACCESS_SUPPLIER_CHAR_ID");
                strQuery.Append(" AND TRUNC(nvl(csupp.EOM_DATE,sysdate)) >= TRUNC(sysdate) ");
                strQuery.Append(" and opt.char_id=crpom.char_id");
                strQuery.Append(" and otype.char_type_id=crpom.char_type_id and crpom.product_cd = 63");
                strQuery.Append(" and crpom.CPE_PRODUCT_MAP =" + ProductID);
                strQuery.Append(" and svc.option_matrix_id = crpom.option_matrix_id");
                if (!string.IsNullOrEmpty(SupplierID.ToString()))
                    strQuery.Append(" AND supplier.CHAR_ID = " + SupplierID + " AND svc.CASE_ID = sctr.CASE_ID");
                strQuery.Append(" AND svc.CHAR_ID = opt.CHAR_ID");
                strQuery.Append(" AND svc.CHAR_AVAIL_CD = avail.AVAIL_CD");
                strQuery.Append(" AND opt.CHAR_TYPE_ID=otype.CHAR_TYPE_ID");
                strQuery.Append(" AND otype.CHAR_TYPE_NAME='CPE Maintenance Options'");
                strQuery.Append(" AND sctr.country_id = " + CountryID + " AND sctr.CITY_ID =" + CityID);
                strQuery.Append(" AND sctr.CASE_VALID_CD = 1");
                strQuery.Append(" AND opt.CHAR_VALID_CD = 1");
                strQuery.Append(" AND svc.CASE_DETAIL_VALID_CD = 1");
                strQuery.Append(" ORDER BY SUPPLIER_PRIORITY, SUPPLIER_NAME, SERVICE_ORDER");

                // DataTable dt = objGetDataFromDB.GetDataTable(strQuery.ToString());
                IDataReader dr = objGetDataFromDB.getDataReaderFromDB(oConn, strQuery.ToString());

                lstMaintDet = new List<CPEMaintainanceDetails>();
                // foreach (DataRow dr in dt.Rows)
                while (dr.Read())
                {
                    CPEMaintainanceDetails objCPEMaintainanceDetails = new CPEMaintainanceDetails();
                    objCPEMaintainanceDetails.SupplierName = dr["SUPPLIER_NAME"].ToString();
                    objCPEMaintainanceDetails.ServiceNumber = dr["SERVICE_NUMBER"].ToString();
                    objCPEMaintainanceDetails.ServiceName = dr["SERVICE_NAME"].ToString();
                    objCPEMaintainanceDetails.ServiceOrder = dr["SERVICE_ORDER"].ToString();
                    objCPEMaintainanceDetails.ServiceAvailabilityDesc = dr["SERVICE_AVAIL_DESC"].ToString();
                    objCPEMaintainanceDetails.ServiceRestriction = dr["SERVICE_RESTRICTIONS"].ToString();
                    objCPEMaintainanceDetails.smartServiceAvailability = CalculateSmartServiceAvailability(dr["SERVICE_NAME"].ToString());
                    objCPEMaintainanceDetails.ManufacturerName = dr["MANUFACTURER_NAME"].ToString();
                    objCPEMaintainanceDetails.MaintainerName = dr["MAINTAINER_NAME"].ToString();
                    lstMaintDet.Add(objCPEMaintainanceDetails);
                }
            }
            catch (Exception ex) { throw ex; }
            finally { oConn.Close(); }
            return lstMaintDet;

        }

        private string CalculateSmartServiceAvailability(string serviceName)
        {
            if (int.Parse(serviceName.Split(new string[] { "Option" }, StringSplitOptions.None)[1]) >= 11 &&
                (int.Parse(serviceName.Split(new string[] { "Option" }, StringSplitOptions.None)[1]) <= 17))
            {
                return "Available";
            }
            return "Not Available";
        }

        public TupleList<string, string> getSupplierCity(int countryID, int CityID, int supplierID)
        {

            strQuery.Clear();
            strQuery.Append("SELECT DISTINCT csu_cases.city_id,CITY_NAME,upper(city_name) cName FROM csu_cases, csu_product, csu_city");
            strQuery.Append(" WHERE csu_product.product_cd = csu_cases.product_cd and csu_city.CITY_ID = csu_cases.CITY_ID");
            strQuery.Append(" AND csu_product.product_name = 'BT CPE' AND case_valid_cd = 1");
            strQuery.Append(" and csu_city.city_id <>" + CityID + " and csu_cases.COUNTRY_ID =" + countryID);
            strQuery.Append(" UNION SELECT DISTINCT csu_city.city_id,CITY_NAME,upper(city_name) cName FROM  csu_city,csu_country");
            strQuery.Append(" where csu_country.COUNTRY_ID = csu_city.COUNTRY_ID and csu_country.COUNTRY_ID =" + countryID);
            strQuery.Append(" and csu_city.city_id=" + CityID);
              strQuery.Append(" and exists (select supplier from vw_cpe_country_validity where country_validity=1");
              strQuery.Append("  and country=" + countryID + "  and supplier_type <> 'Aggregator')  order by cName");

            OracleConnection oConn = objGetDataFromDB.openConnection();
            IDataReader dr = null;
            var cityList = new TupleList<string, string>();
            try
            {
                dr = objGetDataFromDB.getDataReaderFromDB(oConn, strQuery.ToString());

                while (dr.Read())
                {
                    cityList.Add(dr[0].ToString(), dr[2].ToString());

                }
            }
            catch (Exception ex) { throw ex; }
            finally { oConn.Close(); }

            return cityList;

        }

    }




}


public class CPEBundle
{
    public int BundleID { get; set; }
    public string BundleName { get; set; }
    public string RouterName { get; set; }
    public string AccessTechnology { get; set; }
    public string ExpectedDateforOrder { get; set; }
    public string QoutableStartDate { get; set; }
    public string EOL { get; set; }
    public string EOQ { get; set; }
    public string EOS { get; set; }
    public char PartialBundle { get; set; }
    public string SmartServiceAvailability { get; set; }
}

public class CPEMaintainanceDetails
{
    public string SupplierName { get; set; }
    public string ServiceNumber { get; set; }
    public string ServiceName { get; set; }
    public string ServiceOrder { get; set; }
    public string ServiceRestriction { get; set; }
    public string ServiceAvailabilityDesc { get; set; }
    public string smartServiceAvailability { get; set; }
    public string ManufacturerName { get; set; }
    public string MaintainerName { get; set; }
}


public class TupleList<T1, T2> : List<Tuple<T1, T2>>
{
    public void Add(T1 item, T2 item2)
    {
        Add(new Tuple<T1, T2>(item, item2));
    }
}