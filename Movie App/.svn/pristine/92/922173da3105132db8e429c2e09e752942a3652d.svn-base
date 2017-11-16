using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Data;
using Oracle.DataAccess.Client;
using System.Configuration;
using System.Collections;

namespace SCSearchDAL
{
    public class FiltersDAL
    {
        DataSet ds;
        OracleDataAdapter dad;
        OracleConnection con = new OracleConnection(ConfigurationManager.AppSettings.Get("OraConnString"));
        public DataSet GetProducts(int CountryID, int AccessLevel)
        {
            StringBuilder strQry = new StringBuilder();
            if (AccessLevel != 3)
            {

                strQry.Append("SELECT distinct PRODUCT_CD AS ProductID,PRODUCT_NAME  AS ProductName,PRODUCT_TYPE,SERVICE_TYPE_CD,USE_CPE_PRODUCT FROM CSU_PRODUCT WHERE PRODUCT_VALID_CD=1 and product_cd not in (11, 96) AND ((PRODUCT_CD IN (SELECT DISTINCT PRODUCT_CD FROM CSU_CASES WHERE CASE_VALID_CD = 1) or product_cd = 87) OR (PRODUCT_CD IN (SELECT DISTINCT PRODUCT_CD FROM CLA_PRODUCT_CASES WHERE CASE_VALID_CD = 1))) AND (product_cd not in (Select distinct mappedproduct_id from csu_product_sub_product where product_id = 79)) Union select distinct PRODUCT_CD  AS ProductID,PRODUCT_NAME  AS ProductName,PRODUCT_TYPE,SERVICE_TYPE_CD,USE_CPE_PRODUCT FROM CSU_PRODUCT where product_cd = 79 ORDER BY ProductName");
                if (CountryID > 0)
                {

                    strQry = new StringBuilder();
                    strQry.Append("SELECT p.PRODUCT_NAME AS ProductName,p.PRODUCT_CD AS ProductID,P.USE_CPE_PRODUCT,Product_Type FROM CSU_PRODUCT P");
                    strQry.Append(" WHERE p.PRODUCT_CD IN ( SELECT DISTINCT p.PRODUCT_CD FROM CSU_PRODUCT P, CSU_CASES C WHERE p.PRODUCT_VALID_CD=1 AND p.PRODUCT_CD NOT IN (11, 96)");
                    strQry.Append("AND c.product_cd = p.product_cd AND c.country_id = " + CountryID + " AND c.CASE_VALID_CD = 1 ");
                    strQry.Append("UNION SELECT DISTINCT p.PRODUCT_CD FROM CSU_PRODUCT P, CSU_CASES C");
                    strQry.Append(" WHERE p.PRODUCT_VALID_CD=1 AND p.PRODUCT_CD NOT IN ( 11, 96) AND c.product_cd = p.product_cd AND c.country_id = " + CountryID + " AND c.CASE_VALID_CD = 1");
                    strQry.Append(" UNION SELECT DISTINCT p.PRODUCT_CD FROM CSU_PRODUCT P, CLA_PRODUCT_CASES C, CLA_PRODUCT_ACCESS_TYPE A,CSU_REF_VALID_CHAR ch,CSU_REF_CHAR_TYPE d");
                    strQry.Append(" WHERE p.PRODUCT_VALID_CD=1 AND p.PRODUCT_CD NOT IN ( 96) AND A.PRODUCT_CD = c.PRODUCT_CD AND p.PRODUCT_CD = c.PRODUCT_CD AND A.ACCESS_PRODUCT_TYPE_ID = ch.CHAR_ID");
                    strQry.Append(" AND ch.CHAR_TYPE_ID = d.CHAR_TYPE_ID AND d.CHAR_TYPE_NAME = 'Access Type' AND c.CASE_VALID_CD = 1 AND c.country_id = " + CountryID + " ");
                    strQry.Append("UNION SELECT decode ((SELECT A.product_cd FROM (SELECT DISTINCT p.product_cd FROM csu_cases c, csu_product p WHERE c.case_valid_cd = 1");
                    strQry.Append("AND (c.product_cd IN (SELECT DISTINCT mappedproduct_id FROM csu_product_sub_product) OR c.product_cd = 79) AND c.product_cd = p.product_cd AND p.PRODUCT_VALID_CD=1 AND p.PRODUCT_CD NOT IN ( 96)");
                    strQry.Append("AND c.country_id = " + CountryID + " AND ROWNUM < 2 UNION SELECT DISTINCT p.product_cd FROM csu_product p, cla_product_cases d WHERE d.case_valid_cd = 1");
                    strQry.Append("AND (d.product_cd IN (SELECT DISTINCT mappedproduct_id FROM csu_product_sub_product) OR d.product_cd = 79) AND p.product_cd = d.product_cd AND p.product_valid_cd = 1 AND p.product_cd NOT IN ( 96) AND d.country_id = " + CountryID + " ");
                    strQry.Append("AND ROWNUM < 2)A WHERE ROWNUM < 2),NULL,-1,79) AS product_cd FROM dual UNION SELECT DISTINCT b.product_id AS product_cd FROM csu_cases c, csu_product_sub_product b, csu_product p ");
                    strQry.Append("WHERE c.product_cd = b.mappedproduct_id AND b.mappedproduct_id = p.product_cd AND c.case_valid_cd = 1 AND p.PRODUCT_VALID_CD=1 ");
                    strQry.Append("AND p.PRODUCT_CD NOT IN ( 96) AND country_id = " + CountryID + ") AND p.product_cd NOT IN (SELECT DISTINCT mappedproduct_id FROM csu_product_sub_product WHERE product_id = 79)");
                    strQry.Append(" ORDER BY ProductName");
                }
            }
            else
            {

                if (CountryID > 0)
                {

                    strQry = new StringBuilder();

                    strQry.Append("SELECT p.PRODUCT_NAME AS ProductName, ");
                    strQry.Append("  p.PRODUCT_TYPE, ");
                    strQry.Append("  p.PRODUCT_CD AS ProductID, ");
                    strQry.Append("  USE_CPE_PRODUCT ");
                    strQry.Append("FROM CSU_PRODUCT P ");
                    strQry.Append("WHERE p.PRODUCT_CD IN ");
                    strQry.Append("  ( SELECT DISTINCT p.PRODUCT_CD ");
                    strQry.Append("  FROM CSU_PRODUCT P, ");
                    strQry.Append("    CSU_CASES C ");
                    strQry.Append("  WHERE p.PRODUCT_VALID_CD=1 ");
                    strQry.Append("  AND p.product_cd       not in (11,96) ");
                    strQry.Append("  AND c.product_cd        = p.product_cd ");
                    strQry.Append("  AND c.country_id        =  " + CountryID);
                    strQry.Append("  AND c.CASE_VALID_CD     = 1 ");
                    strQry.Append("  AND p.PRODUCT_CD       IN ");
                    strQry.Append("    (SELECT product_cd FROM PRODUCT_LAUNCH WHERE launch_flag = 1 ");
                    strQry.Append("    ) ");
                    strQry.Append("  UNION ");
                    strQry.Append("  SELECT DISTINCT p.PRODUCT_CD ");
                    strQry.Append("  FROM CSU_PRODUCT P, ");
                    strQry.Append("    CSU_CASES C ");
                    strQry.Append("  WHERE p.PRODUCT_VALID_CD=1 ");
                    strQry.Append("  AND p.product_cd       not in (11,96) ");
                    strQry.Append("  AND c.product_cd        = p.product_cd ");
                    strQry.Append("  AND c.country_id        =  " + CountryID);
                    strQry.Append("  AND c.CASE_VALID_CD     = 1 ");
                    strQry.Append("  AND p.PRODUCT_CD       IN ");
                    strQry.Append("    (SELECT product_cd FROM PRODUCT_LAUNCH WHERE launch_flag = 1 ");
                    strQry.Append("    ) ");
                    strQry.Append("  UNION ");
                    strQry.Append("  SELECT DISTINCT p.PRODUCT_CD ");
                    strQry.Append("  FROM CSU_PRODUCT P, ");
                    strQry.Append("    CLA_PRODUCT_CASES C, ");
                    strQry.Append("    CLA_PRODUCT_ACCESS_TYPE a, ");
                    strQry.Append("    CSU_REF_VALID_CHAR ch, ");
                    strQry.Append("    CSU_REF_CHAR_TYPE d ");
                    strQry.Append("  WHERE p.PRODUCT_VALID_CD     =1 ");
                    strQry.Append("  AND a.PRODUCT_CD             = c.PRODUCT_CD ");
                    strQry.Append("  AND p.PRODUCT_CD             = c.PRODUCT_CD ");
                    strQry.Append("  AND a.ACCESS_PRODUCT_TYPE_ID = ch.CHAR_ID ");
                    strQry.Append("  AND ch.CHAR_TYPE_ID          = d.CHAR_TYPE_ID ");
                    strQry.Append("  AND d.CHAR_TYPE_NAME         = 'Access Type' ");
                    strQry.Append("  AND c.CASE_VALID_CD          = 1 ");
                    strQry.Append("  AND c.country_id             = " + CountryID);
                    strQry.Append("  UNION ");
                    strQry.Append("  SELECT DECODE ( ");
                    strQry.Append("    (SELECT a.product_cd FROM ");
                    strQry.Append("      (SELECT DISTINCT p.product_cd ");
                    strQry.Append("      FROM csu_cases c, ");
                    strQry.Append("        csu_product p ");
                    strQry.Append("      WHERE c.case_valid_cd = 1 ");
                    strQry.Append("      AND (c.product_cd    IN ");
                    strQry.Append("        (SELECT DISTINCT mappedproduct_id FROM csu_product_sub_product ");
                    strQry.Append("        ) ");
                    strQry.Append("      OR c.product_cd       = 79) ");
                    strQry.Append("      AND c.product_cd      = p.product_cd ");
                    strQry.Append("      AND p.PRODUCT_VALID_CD=1 ");
                    strQry.Append("      AND c.country_id      = " + CountryID);
                    strQry.Append("      AND rownum            < 2 ");
                    strQry.Append("      UNION ");
                    strQry.Append("      SELECT DISTINCT p.product_cd ");
                    strQry.Append("      FROM csu_product p, ");
                    strQry.Append("        cla_product_cases d ");
                    strQry.Append("      WHERE d.case_valid_cd = 1 ");
                    strQry.Append("      AND (d.product_cd    IN ");
                    strQry.Append("        (SELECT DISTINCT mappedproduct_id FROM csu_product_sub_product ");
                    strQry.Append("        ) ");
                    strQry.Append("      OR d.product_cd        = 79) ");
                    strQry.Append("      AND p.product_cd       = d.product_cd ");
                    strQry.Append("      AND p.product_valid_cd = 1 ");
                    strQry.Append("      AND p.product_cd NOT  IN (16, 96) ");
                    strQry.Append("      AND d.country_id       =  " + CountryID);
                    strQry.Append("      AND rownum             < 2 ");
                    strQry.Append("      )a WHERE ROWNUM        < 2 ");
                    strQry.Append("    ),NULL,-1,79) AS product_cd ");
                    strQry.Append("  FROM dual ");
                    strQry.Append("  UNION ");
                    strQry.Append("  SELECT DISTINCT b.product_id AS product_cd ");
                    strQry.Append("  FROM csu_cases c, ");
                    strQry.Append("    csu_product_sub_product b, ");
                    strQry.Append("    csu_product p ");
                    strQry.Append("  WHERE c.product_cd     = b.mappedproduct_id ");
                    strQry.Append("  AND b.mappedproduct_id = p.product_cd ");
                    strQry.Append("  AND c.case_valid_cd    = 1 ");
                    strQry.Append("  AND p.PRODUCT_VALID_CD =1 ");
                    strQry.Append("  AND country_id         = " + CountryID);
                    strQry.Append("  ) ");
                    strQry.Append("AND p.product_cd NOT IN ");
                    strQry.Append("  (SELECT DISTINCT mappedproduct_id ");
                    strQry.Append("  FROM csu_product_sub_product ");
                    strQry.Append("  WHERE product_id = 79 ");
                    strQry.Append("  ) ");
                    strQry.Append("  AND PRODUCT_CD NOT IN (96)");

                    strQry.Append(" ORDER BY upper(PRODUCT_NAME)");

                }
                else
                {
                    strQry = new StringBuilder();
                    strQry.Append(" SELECT distinct PRODUCT_CD  AS ProductID,PRODUCT_NAME AS ProductName,PRODUCT_TYPE,SERVICE_TYPE_CD,USE_CPE_PRODUCT FROM CSU_PRODUCT WHERE ");
                    strQry.Append("((PRODUCT_CD in (SELECT product_cd FROM PRODUCT_LAUNCH WHERE launch_flag = 1) or product_cd = 87) ");
                    strQry.Append(" AND (PRODUCT_CD in (SELECT DISTINCT PRODUCT_CD FROM CSU_CASES WHERE CASE_VALID_CD = 1) or product_cd = 87)");
                    strQry.Append(" OR (PRODUCT_CD IN (SELECT DISTINCT PRODUCT_CD FROM CLA_PRODUCT_CASES WHERE CASE_VALID_CD = 1))) AND ");
                    strQry.Append(" (product_cd not in (Select distinct mappedproduct_id from csu_product_sub_product where product_id = 79))");
                    strQry.Append(" AND PRODUCT_VALID_CD=1 and product_cd not in (11,96) Union ");
                    strQry.Append("  select distinct PRODUCT_CD,PRODUCT_NAME,PRODUCT_TYPE,SERVICE_TYPE_CD,USE_CPE_PRODUCT FROM CSU_PRODUCT where product_cd = 79");
                    strQry.Append(" ORDER BY PRODUCTNAME ");
                }
            }

            OracleCommand cmdOra = new OracleCommand(strQry.ToString(), con);
            cmdOra.CommandType = CommandType.Text;

            ds = new DataSet();
            dad = new OracleDataAdapter(cmdOra);
            dad.Fill(ds);
            return ds;
        }

        public DataTable getValidProduct(int AccessLevel, string BtGfrCodes, string SegregationCodes, string User_Id)
        {
            StringBuilder strQuery = new StringBuilder();
            if (AccessLevel == 2)//for product owner check
            {
                strQuery.Clear();

                strQuery.Append("select distinct product_cd from csu_user_product_owner ");
                strQuery.Append(" where emp_id = '" + User_Id + "'");
                strQuery.Append(" and product_cd not in (Select distinct mappedproduct_id from csu_product_sub_product) ");
                strQuery.Append(" union ");

                if (BtGfrCodes != "")
                {
                    strQuery.Append(" select distinct a.product_cd from csu_product a, csu_btgfr_product_map cbp,CSU_SEGREGATION_VW_new v ");
                    strQuery.Append(" where a.Product_valid_cd = 1");
                    strQuery.Append(" and cbp.product_cd = a.product_cd and ");
                    strQuery.Append(" cbp.btgfr in (" + BtGfrCodes + ") and ");
                    strQuery.Append(" v.id = cbp.btgfr and");
                    strQuery.Append(" v.type = 'BTGFR' ");
                    //strQuery.Append("AND A.PRODUCT_CD<>21 ");
                    //strQuery.Append("UNION ");
                    //strQuery.Append("SELECT DISTINCT a.product_cd ");
                    //strQuery.Append("FROM csu_product a, ");
                    //strQuery.Append("  csu_btgfr_product_map cbp, ");
                    //strQuery.Append("  csu_segregation_vw_new v ");
                    //strQuery.Append("WHERE a.Product_valid_cd = 1 ");
                    //strQuery.Append("AND cbp.product_cd       = a.product_cd ");
                    //strQuery.Append("AND cbp.btgfr           IN (" + BtGfrCodes + ") ");
                    //strQuery.Append("AND V.ID                 = CBP.BTGFR ");
                    //strQuery.Append("AND V.TYPE               = 'BTGFR' ");
                    //strQuery.Append("AND a.product_cd        IN ");
                    //strQuery.Append("  (SELECT PRODUCT_CD ");
                    //strQuery.Append("  FROM CSU_USER_PRODUCT_OWNER ");
                    //strQuery.Append("  WHERE EMP_ID  ='" + User_Id + "'");
                    //strQuery.Append("  AND PRODUCT_CD=21 ");
                    //strQuery.Append("  )");
                }

                else
                {
                    strQuery.Append(" select distinct a.product_cd from csu_product a, csu_segregation cs, CSU_SEGREGATION_VW_new v ");
                    strQuery.Append(" where a.Product_valid_cd = 1");
                    strQuery.Append(" and cs.product_cd = a.product_cd and ");
                    strQuery.Append(" cs.segregation_id in (" + SegregationCodes + ") and ");
                    strQuery.Append(" v.id = cs.segregation_id and ");
                    strQuery.Append(" v.type = 'DISTRIBUTOR' ");
                    //strQuery.Append("AND A.PRODUCT_CD<>21 ");
                    //strQuery.Append("UNION ");
                    //strQuery.Append("SELECT DISTINCT a.product_cd ");
                    //strQuery.Append("FROM csu_product a, ");
                    //strQuery.Append("  csu_segregation cs, ");
                    //strQuery.Append("  csu_segregation_vw_new v ");
                    //strQuery.Append("WHERE a.Product_valid_cd = 1 ");
                    //strQuery.Append("AND cs.product_cd       = a.product_cd ");
                    //strQuery.Append("AND  cs.segregation_id     IN (" + SegregationCodes + ") ");
                    //strQuery.Append("AND v.id = cs.segregation_id ");
                    //strQuery.Append("AND V.TYPE               = 'DISTRIBUTOR' ");
                    //strQuery.Append("AND a.product_cd        IN ");
                    //strQuery.Append("  (SELECT PRODUCT_CD ");
                    //strQuery.Append("  FROM CSU_USER_PRODUCT_OWNER ");
                    //strQuery.Append("  WHERE EMP_ID  ='" + User_Id + "'");
                    //strQuery.Append("  AND PRODUCT_CD=21 ");
                    //strQuery.Append("  )");
                }
            }

            else
            {
                if (BtGfrCodes != "")
                {
                    strQuery.Append(" select distinct a.product_cd from csu_product a, csu_btgfr_product_map cbp,CSU_SEGREGATION_VW_new v ");
                    strQuery.Append(" where a.Product_valid_cd = 1");
                    strQuery.Append(" and cbp.product_cd = a.product_cd and ");
                    strQuery.Append(" cbp.btgfr in (" + BtGfrCodes + ") and ");
                    strQuery.Append(" v.id = cbp.btgfr and");
                    strQuery.Append(" v.type = 'BTGFR' ");
                    //strQuery.Append("AND A.PRODUCT_CD<>21 ");
                    //strQuery.Append("UNION ");
                    //strQuery.Append("SELECT DISTINCT a.product_cd ");
                    //strQuery.Append("FROM csu_product a, ");
                    //strQuery.Append("  csu_btgfr_product_map cbp, ");
                    //strQuery.Append("  csu_segregation_vw_new v ");
                    //strQuery.Append("WHERE a.Product_valid_cd = 1 ");
                    //strQuery.Append("AND cbp.product_cd       = a.product_cd ");
                    //strQuery.Append("AND cbp.btgfr           IN (" + BtGfrCodes + ") ");
                    //strQuery.Append("AND V.ID                 = CBP.BTGFR ");
                    //strQuery.Append("AND V.TYPE               = 'BTGFR' ");
                    //strQuery.Append("AND a.product_cd        IN ");
                    //strQuery.Append("  (SELECT PRODUCT_CD ");
                    //strQuery.Append("  FROM CSU_USER_PRODUCT_OWNER ");
                    //strQuery.Append("  WHERE EMP_ID  = '" + User_Id + "'");
                    //strQuery.Append("  AND PRODUCT_CD=21 ");
                    //strQuery.Append("  )");
                }

                else
                {
                    strQuery.Append(" select distinct a.product_cd from csu_product a, csu_segregation cs, CSU_SEGREGATION_VW_new v ");
                    strQuery.Append(" where a.Product_valid_cd = 1");
                    strQuery.Append(" and cs.product_cd = a.product_cd and ");
                    strQuery.Append(" cs.segregation_id in (" + SegregationCodes + ") and ");
                    strQuery.Append(" v.id = cs.segregation_id and ");
                    strQuery.Append(" v.type = 'DISTRIBUTOR' ");
                    //strQuery.Append("AND A.PRODUCT_CD<>21 ");
                    //strQuery.Append("UNION ");
                    //strQuery.Append("SELECT DISTINCT a.product_cd ");
                    //strQuery.Append("FROM csu_product a, ");
                    //strQuery.Append("  csu_segregation cs, ");
                    //strQuery.Append("  csu_segregation_vw_new v ");
                    //strQuery.Append("WHERE a.Product_valid_cd = 1 ");
                    //strQuery.Append("AND cs.product_cd       = a.product_cd ");
                    //strQuery.Append("AND cs.segregation_id in (" + SegregationCodes + ") ");
                    //strQuery.Append("AND v.id = cs.segregation_id ");
                    //strQuery.Append("AND v.type = 'DISTRIBUTOR' ");
                    //strQuery.Append("AND a.product_cd        IN ");
                    //strQuery.Append("  (SELECT PRODUCT_CD ");
                    //strQuery.Append("  FROM CSU_USER_PRODUCT_OWNER ");
                    //strQuery.Append("  WHERE EMP_ID  = '" + User_Id + "'");
                    //strQuery.Append("  AND PRODUCT_CD=21 ");
                    //strQuery.Append("  )");
                }
            }

            OracleCommand cmd = new OracleCommand(strQuery.ToString(), con);

            DataTable dt = new DataTable();
            dad = new OracleDataAdapter(cmd);
            dad.Fill(dt);
            
            return dt;

        }

        public int MPLSAvailabilitytoEndUser(string UserID)
        {
            string query = "SELECT count(PRODUCT_CD) FROM CSU_USER_PRODUCT_OWNER  WHERE EMP_ID ='" + UserID + "' and PRODUCT_CD=21";
            OracleCommand cmd = new OracleCommand(query, con);
            GetDataFromDB obj = new GetDataFromDB();

            return int.Parse(obj.GetSingleRowFromDB(query));
        }

        public DataSet GetRegions(int ProductID)
        {

            string RegionQuery = "SELECT distinct nvl(c.region_id,0) as RegionID, nvl(r.region_name,'None') as RegionName FROM CSU_CASES C, CSU_REGION R WHERE 1=1 ";
            if (ProductID > 0)
            {
                RegionQuery += " and c.product_cd = " + ProductID;
            }
            RegionQuery += " and c.CASE_VALID_CD=1 and r.region_id = nvl(c.region_id,0) order by RegionName";

            if (ProductID == 123 || ProductID == 124)
                RegionQuery = "SELECT DISTINCT NVL(C.REGION_ID,0) AS RegionID, NVL(R.REGION_NAME,'None') AS RegionName FROM CLA_PRODUCT_CASES C, CSU_REGION R, CSU_COUNTRY CN WHERE C.PRODUCT_CD = " + ProductID + " AND C.CASE_VALID_CD=1 AND R.REGION_ID = NVL(C.REGION_ID,0) AND CN.COUNTRY_ID = NVL(C.COUNTRY_ID,0) AND CN.COUNTRY_VALID_CD = 1 AND R.REGION_ID = NVL(C.REGION_ID,0) AND CN.COUNTRY_ID = NVL(C.COUNTRY_ID,0) GROUP BY C.REGION_ID, R.REGION_NAME, C.COUNTRY_ID, CN.COUNTRY_NAME HAVING COUNT(1) >= 1 ORDER BY RegionName";

            OracleCommand cmd = new OracleCommand(RegionQuery, con);
            //cmd.CommandType = CommandType.Text;
            ds = new DataSet();
            dad = new OracleDataAdapter(cmd);
            dad.Fill(ds);
            return ds;

        }

        public DataSet GetProductAccessType(int ProductID)
        {
            string RegionQuery = "SELECT * FROM vw_product_access_type_map where PRODUCT_CD=" + ProductID;

            OracleCommand cmd = new OracleCommand(RegionQuery, con);
            //cmd.CommandType = CommandType.Text;
            ds = new DataSet();
            dad = new OracleDataAdapter(cmd);
            dad.Fill(ds);
            return ds;
        }

        public DataSet GetCountries(int ProductID, int RegionID, string ValidProductIDs = null)
        {
            string CountryQuery = string.Empty;
            CountryQuery = "SELECT distinct nvl(c.country_id,0) as CountryID, nvl(ct.country_name,'None') as CountryName FROM CSU_CASES C, CSU_COUNTRY CT WHERE 1=1 ";
            if (ProductID > 0)
            {
                if (ProductID == 79)//for one voice, we should populate country for all mapped product
                {
                    CountryQuery += " and (c.product_cd in (select distinct mappedproduct_id from csu_product_sub_product) or c.product_cd = 79) ";
                }
                else
                {
                    CountryQuery += " and c.product_cd =" + ProductID;
                }
            }
            else
            {
                if (!string.IsNullOrEmpty(ValidProductIDs))
                    CountryQuery += " and c.product_cd in (" + ValidProductIDs + ")";
            }
            if (RegionID > 0)
            {
                CountryQuery += " and c.region_id = " + RegionID;
            }
            CountryQuery += " and c.CASE_VALID_CD=1 and ct.country_id = nvl(c.country_id,0) and  CT.COUNTRY_VALID_CD = 1 order by CountryName";

            if (ProductID == 123 || ProductID == 124)
            {
                CountryQuery = "SELECT DISTINCT NVL(C.COUNTRY_ID,0) AS CountryID, NVL(CN.COUNTRY_NAME,'None') AS CountryName FROM CLA_PRODUCT_CASES C, CSU_REGION R, CSU_COUNTRY CN WHERE c.CASE_VALID_CD=1 AND C.PRODUCT_CD = " + ProductID + " AND C.CASE_VALID_CD=1 AND R.REGION_ID = NVL(C.REGION_ID,0) AND CN.COUNTRY_ID = NVL(C.COUNTRY_ID,0) AND CN.COUNTRY_VALID_CD = 1 AND R.REGION_ID = NVL(C.REGION_ID,0) AND CN.COUNTRY_ID = NVL(C.COUNTRY_ID,0) ";
                if (RegionID > 0)
                    CountryQuery += " AND C.REGION_ID = " + RegionID;

                CountryQuery += " GROUP BY C.REGION_ID, R.REGION_NAME, C.COUNTRY_ID, CN.COUNTRY_NAME HAVING COUNT(1) >= 1 ORDER BY CountryName";
            }

            OracleCommand cmd = new OracleCommand(CountryQuery, con);

            ds = new DataSet();
            dad = new OracleDataAdapter(cmd);
            dad.Fill(ds);
            return ds;
        }

        public DataSet GetBandWidthCountriesCities(int ProductID, string Speeds, int CountryID, int SpeedID, int CityFlag)
        {

            string CountryQuery = string.Empty;
            OracleCommand cmd = new OracleCommand(CountryQuery, con);
            if (CountryID == 0 && SpeedID == 0)
            {
                CountryQuery = "select * from (select distinct c.country_id  as CountryID, cr.country_name as CountryName, c.city_id as CityID, decode(state_province_flag,1,ct.city_name||' ('||cs.state_province_name||')',0,ct.city_name) as CityName from csu_cases c, csu_country cr, csu_city ct,csu_state_province cs where c.product_cd = " + ProductID + " and c.case_valid_cd = 1 and cr.country_id = c.country_id and ct.city_id = c.city_id and NVL(cs.state_province_id,0)=NVL(ct.state_province_id,0) and c.access_speed_char_id in (" + Speeds + ") ";

                if (CountryID > 0)
                {
                    CountryQuery += " and c.country_id = " + CountryID;
                }

                CountryQuery += " and c.hub_site_id is not null) ORDER BY CountryName";

                cmd = new OracleCommand(CountryQuery, con);
                ds = new DataSet();
                dad = new OracleDataAdapter(cmd);
                dad.Fill(ds);
            }
            else
            {

                if (SpeedID > 0)
                {
                    Speeds = SpeedID.ToString();
                }
                if (CityFlag == 0)
                {
                    CountryQuery = "select * from ( SELECT DISTINCT C.COUNTRY_ID as CountryID, CR.COUNTRY_NAME  as CountryName, C.CITY_ID as CityID, DECODE(STATE_PROVINCE_FLAG,1,CT.CITY_NAME||' ('||CS.STATE_PROVINCE_NAME||')',CT.CITY_NAME)  as CityName FROM CSU_CASES C, CSU_COUNTRY CR, CSU_CITY CT,CSU_STATE_PROVINCE CS WHERE C.PRODUCT_CD = " + ProductID + " AND C.CASE_VALID_CD = 1 AND CR.COUNTRY_ID = C.COUNTRY_ID AND CT.CITY_ID = C.CITY_ID AND NVL(CT.STATE_PROVINCE_ID,0)=NVL(CS.STATE_PROVINCE_ID,0) ";

                    CountryQuery += " AND C.SUBPRODUCT_CD IN (SELECT PC_SUBPRODUCT_ID FROM CAPMAN_MULTIPOINT_CONF WHERE PC_PRODUCT_ID = " + ProductID + " AND ALLPOP_FLAG = 0) ";

                    if (CountryID > 0)
                    {
                        CountryQuery += " AND C.COUNTRY_ID = " + CountryID;
                    }
                    CountryQuery += " AND C.ACCESS_SPEED_CHAR_ID IN (" + Speeds + ") AND C.HUB_SITE_ID IS NOT NULL ) ORDER BY CountryName";
                }
                else
                {
                    CountryQuery = "select * from ( SELECT DISTINCT C.CITY_ID as CityID, DECODE(STATE_PROVINCE_FLAG,1,CT.CITY_NAME||' ('||CS.STATE_PROVINCE_NAME||')',CT.CITY_NAME)  as CityName FROM CSU_CASES C, CSU_COUNTRY CR, CSU_CITY CT,CSU_STATE_PROVINCE CS WHERE C.PRODUCT_CD = " + ProductID + " AND C.CASE_VALID_CD = 1 AND CR.COUNTRY_ID = C.COUNTRY_ID AND CT.CITY_ID = C.CITY_ID AND NVL(CT.STATE_PROVINCE_ID,0)=NVL(CS.STATE_PROVINCE_ID,0) ";

                    CountryQuery += " AND C.SUBPRODUCT_CD IN (SELECT PC_SUBPRODUCT_ID FROM CAPMAN_MULTIPOINT_CONF WHERE PC_PRODUCT_ID = " + ProductID + " AND ALLPOP_FLAG = 0) ";

                    if (CountryID > 0)
                    {
                        CountryQuery += " AND C.COUNTRY_ID = " + CountryID;
                    }
                    CountryQuery += " AND C.ACCESS_SPEED_CHAR_ID IN (" + Speeds + ") AND C.HUB_SITE_ID IS NOT NULL ) ";
                }
                cmd = new OracleCommand(CountryQuery, con);
                ds = new DataSet();
                dad = new OracleDataAdapter(cmd);
                dad.Fill(ds);

                if (ds != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count == 0)
                {
                    if (CityFlag == 0)
                    {
                        CountryQuery = "select * from ( SELECT DISTINCT C.COUNTRY_ID as CountryID, CR.COUNTRY_NAME  as CountryName, C.CITY_ID as CityID, DECODE(STATE_PROVINCE_FLAG,1,CT.CITY_NAME||' ('||CS.STATE_PROVINCE_NAME||')',CT.CITY_NAME)  as CityName FROM CSU_CASES C, CSU_COUNTRY CR, CSU_CITY CT,CSU_STATE_PROVINCE CS WHERE C.PRODUCT_CD = " + ProductID + " AND C.CASE_VALID_CD = 1 AND CR.COUNTRY_ID = C.COUNTRY_ID AND CT.CITY_ID = C.CITY_ID AND NVL(CT.STATE_PROVINCE_ID,0)=NVL(CS.STATE_PROVINCE_ID,0) ";

                        CountryQuery += " AND C.SUBPRODUCT_CD IN (SELECT PC_SUBPRODUCT_ID FROM CAPMAN_MULTIPOINT_CONF WHERE PC_PRODUCT_ID = " + ProductID + " AND ALLPOP_FLAG = 1) ";

                        if (CountryID > 0)
                        {
                            CountryQuery += " AND C.COUNTRY_ID = " + CountryID;
                        }
                        CountryQuery += " AND C.ACCESS_SPEED_CHAR_ID IN (" + Speeds + ") AND C.HUB_SITE_ID IS NOT NULL ) ORDER BY CountryName";
                    }
                    else
                    {
                        CountryQuery = "select * from ( SELECT DISTINCT C.CITY_ID as CityID, DECODE(STATE_PROVINCE_FLAG,1,CT.CITY_NAME||' ('||CS.STATE_PROVINCE_NAME||')',CT.CITY_NAME)  as CityName FROM CSU_CASES C, CSU_COUNTRY CR, CSU_CITY CT,CSU_STATE_PROVINCE CS WHERE C.PRODUCT_CD = " + ProductID + " AND C.CASE_VALID_CD = 1 AND CT.COUNTRY_ID = C.COUNTRY_ID AND CT.CITY_ID = C.CITY_ID AND NVL(CT.STATE_PROVINCE_ID,0)=NVL(CS.STATE_PROVINCE_ID,0) ";

                        CountryQuery += " AND C.SUBPRODUCT_CD IN (SELECT PC_SUBPRODUCT_ID FROM CAPMAN_MULTIPOINT_CONF WHERE PC_PRODUCT_ID = " + ProductID + " AND ALLPOP_FLAG = 1) ";

                        if (CountryID > 0)
                        {
                            CountryQuery += " AND C.COUNTRY_ID = " + CountryID;
                        }
                        CountryQuery += " AND C.ACCESS_SPEED_CHAR_ID IN (" + Speeds + ") AND C.HUB_SITE_ID IS NOT NULL ) ";
                    }

                    cmd = new OracleCommand(CountryQuery, con);
                    ds = new DataSet();
                    dad = new OracleDataAdapter(cmd);
                    dad.Fill(ds);
                }


            }


            return ds;
        }

        public DataSet GetBandWidthCities(int ProductID, string Speeds, int CountryID, int SpeedID, int CityFlag)
        {

            string CountryQuery = string.Empty;
            OracleCommand cmd = new OracleCommand(CountryQuery, con);
            DataSet dsCities = new DataSet();
            DataTable dtcity = new DataTable();
            dtcity.Columns.Add("CityID",System.Type.GetType("System.Decimal"));
            dtcity.Columns.Add("CityName", Type.GetType("System.String"));
            dsCities.Tables.Add(dtcity);

            if (SpeedID > 0)
            {
                Speeds = SpeedID.ToString();
            }
            if (CityFlag == 1)
            {



                CountryQuery = "SELECT DISTINCT C.CITY_ID  as CityID, DECODE(STATE_PROVINCE_FLAG,1,CT.CITY_NAME||'('||CS.STATE_PROVINCE_NAME||')',CT.CITY_NAME)  as CityName FROM CSU_CASES C, CSU_COUNTRY CR, CSU_CITY CT,CSU_STATE_PROVINCE CS WHERE C.PRODUCT_CD = " + ProductID + " AND C.CASE_VALID_CD = 1 AND CR.COUNTRY_ID = C.COUNTRY_ID AND CT.CITY_ID = C.CITY_ID AND NVL(CT.STATE_PROVINCE_ID,0)=NVL(CS.STATE_PROVINCE_ID,0) ";

                CountryQuery += " AND C.SUBPRODUCT_CD IN (SELECT PC_SUBPRODUCT_ID FROM CAPMAN_MULTIPOINT_CONF WHERE PC_PRODUCT_ID = " + ProductID + " AND ALLPOP_FLAG = 0) ";

                CountryQuery += " AND C.COUNTRY_ID = " + CountryID;

                CountryQuery += " AND C.ACCESS_SPEED_CHAR_ID = (" + Speeds + ") AND C.HUB_SITE_ID IS NOT NULL ";

                //CountryQuery += " AND C.SUBPRODUCT_CD IN (SELECT PC_SUBPRODUCT_ID FROM CAPMAN_MULTIPOINT_CONF WHERE PC_PRODUCT_ID = " + ProductID + " AND ALLPOP_FLAG = 0) ";

                //if (CountryID > 0)
                //{
                //    CountryQuery += " AND C.COUNTRY_ID = " + CountryID;
                //}
                //CountryQuery += " AND C.ACCESS_SPEED_CHAR_ID IN (" + Speeds + ") AND C.HUB_SITE_ID IS NOT NULL ) ORDER BY CountryName";
            }
            else
            {
                CountryQuery = "select * from ( SELECT DISTINCT C.CITY_ID as CityID, DECODE(STATE_PROVINCE_FLAG,1,CT.CITY_NAME||' ('||CS.STATE_PROVINCE_NAME||')',CT.CITY_NAME)  as CityName FROM CSU_CASES C, CSU_COUNTRY CR, CSU_CITY CT,CSU_STATE_PROVINCE CS WHERE C.PRODUCT_CD = " + ProductID + " AND C.CASE_VALID_CD = 1 AND CR.COUNTRY_ID = C.COUNTRY_ID AND CT.CITY_ID = C.CITY_ID AND NVL(CT.STATE_PROVINCE_ID,0)=NVL(CS.STATE_PROVINCE_ID,0) ";

                CountryQuery += " AND C.SUBPRODUCT_CD IN (SELECT PC_SUBPRODUCT_ID FROM CAPMAN_MULTIPOINT_CONF WHERE PC_PRODUCT_ID = " + ProductID + " AND ALLPOP_FLAG = 0) ";

                if (CountryID > 0)
                {
                    CountryQuery += " AND C.COUNTRY_ID = " + CountryID;
                }
                CountryQuery += " AND C.ACCESS_SPEED_CHAR_ID IN (" + Speeds + ") AND C.HUB_SITE_ID IS NOT NULL ) ";
            }
            cmd = new OracleCommand(CountryQuery, con);
            ds = new DataSet();
            dad = new OracleDataAdapter(cmd);
            dad.Fill(ds);

            if (ds != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
            {
                DataTable dt = ds.Tables[0].Copy();
                //dt.TableName = "Table1";
                //dsCities.Tables.Add(dt);
                foreach (DataRow item in dt.Rows)
                {
                    dsCities.Tables[0].Rows.Add(Convert.ToDecimal(item["CityID"].ToString()), item["CityName"].ToString());
                }
                dsCities.AcceptChanges();
            }

            if (CityFlag == 1)
            {
                CountryQuery = " SELECT DISTINCT C.CITY_ID  as CityID, DECODE(STATE_PROVINCE_FLAG,NULL,CR.CITY_NAME,0,CR.CITY_NAME,1,CR.CITY_NAME||'('||STATE_PROVINCE_NAME||')') AS CityName FROM CSU_CASES C, CSU_CITY CR,CSU_COUNTRY CY,CSU_STATE_PROVINCE CSP WHERE C.PRODUCT_CD = " + ProductID + " AND C.CASE_VALID_CD = 1 AND CR.CITY_ID = C.CITY_ID AND CR.COUNTRY_ID = CY.COUNTRY_ID AND NVL(CR.STATE_PROVINCE_ID,0) = NVL(CSP.STATE_PROVINCE_ID,0)";
                
                CountryQuery += " AND C.SUBPRODUCT_CD IN (SELECT PC_SUBPRODUCT_ID FROM CAPMAN_MULTIPOINT_CONF WHERE PC_PRODUCT_ID = " + ProductID + " AND ALLPOP_FLAG = 0) ";
                if (CountryID > 0)
                {
                CountryQuery += " AND C.COUNTRY_ID = " + CountryID;
                }
                CountryQuery += " AND C.ACCESS_SPEED_CHAR_ID IN (" + Speeds + ") AND C.HUB_SITE_ID IS NOT NULL ";
            }
            else
            {


                CountryQuery = "SELECT DISTINCT C.CITY_ID  as CityID, DECODE(STATE_PROVINCE_FLAG,0,CR.CITY_NAME,NULL,CR.CITY_NAME,1,CR.CITY_NAME||'('||STATE_PROVINCE_NAME||')') AS CityName FROM CSU_CASES C, CSU_CITY CR,CSU_COUNTRY CY,CSU_STATE_PROVINCE CSP WHERE C.PRODUCT_CD = " + ProductID + " AND C.CASE_VALID_CD = 1 AND CR.CITY_ID = C.CITY_ID AND CR.COUNTRY_ID = CY.COUNTRY_ID AND NVL(CR.STATE_PROVINCE_ID,0) = NVL(C.STATE_PROVINCE_ID,0) AND NVL(CR.STATE_PROVINCE_ID,0) = NVL(CSP.STATE_PROVINCE_ID,0)";
                CountryQuery += " AND C.SUBPRODUCT_CD IN (SELECT PC_SUBPRODUCT_ID FROM CAPMAN_MULTIPOINT_CONF WHERE PC_PRODUCT_ID = " + ProductID + " AND ALLPOP_FLAG = 0) ";
                if (CountryID > 0)
                {
                    CountryQuery += " AND C.COUNTRY_ID = " + CountryID;
                }
                CountryQuery += " AND C.ACCESS_SPEED_CHAR_ID IN (" + Speeds + ")  AND C.HUB_SITE_ID IS NOT NULL ";
            }
            cmd = new OracleCommand(CountryQuery, con);
            ds = new DataSet();
            dad = new OracleDataAdapter(cmd);
            dad.Fill(ds);

            if (ds != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count == 0)
            {
                if (CityFlag == 1)
                {


                    CountryQuery = "select distinct c.city_id AS CityID, decode(state_province_flag,0,cr.city_name,1,cr.city_name||'('||state_province_name||')' )as CityName from csu_cases c, csu_city cr ,csu_country cy,csu_state_province csp where c.product_cd = " + ProductID + " and c.case_valid_cd = 1 and cr.city_id = c.city_id and cr.country_id = cy.country_id and nvl(cr.state_province_id,0) = nvl(csp.state_province_id,0) ";
                    CountryQuery += " AND C.SUBPRODUCT_CD IN (SELECT PC_SUBPRODUCT_ID FROM CAPMAN_MULTIPOINT_CONF WHERE PC_PRODUCT_ID = " + ProductID + " AND ALLPOP_FLAG = 1) ";
                    if (CountryID > 0)
                    {
                        CountryQuery += " AND C.COUNTRY_ID = " + CountryID;
                    }
                    CountryQuery += " AND C.ACCESS_SPEED_CHAR_ID IN (" + Speeds + ") AND C.HUB_SITE_ID IS NOT NULL ";
                }
                else
                {
                    CountryQuery = "select * from ( SELECT DISTINCT C.CITY_ID as CityID, DECODE(STATE_PROVINCE_FLAG,1,CT.CITY_NAME||' ('||CS.STATE_PROVINCE_NAME||')',CT.CITY_NAME)  as CityName FROM CSU_CASES C, CSU_COUNTRY CR, CSU_CITY CT,CSU_STATE_PROVINCE CS WHERE C.PRODUCT_CD = " + ProductID + " AND C.CASE_VALID_CD = 1 AND CT.COUNTRY_ID = C.COUNTRY_ID AND CT.CITY_ID = C.CITY_ID AND NVL(CT.STATE_PROVINCE_ID,0)=NVL(CS.STATE_PROVINCE_ID,0) ";

                    CountryQuery += " AND C.SUBPRODUCT_CD IN (SELECT PC_SUBPRODUCT_ID FROM CAPMAN_MULTIPOINT_CONF WHERE PC_PRODUCT_ID = " + ProductID + " AND ALLPOP_FLAG = 1) ";

                    if (CountryID > 0)
                    {
                        CountryQuery += " AND C.COUNTRY_ID = " + CountryID;
                    }
                    CountryQuery += " AND C.ACCESS_SPEED_CHAR_ID IN (" + Speeds + ") AND C.HUB_SITE_ID IS NOT NULL ) ";
                }

                cmd = new OracleCommand(CountryQuery, con);
                ds = new DataSet();
                dad = new OracleDataAdapter(cmd);
                dad.Fill(ds);
                if (ds != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
                {
                    DataTable dt = ds.Tables[0].Copy();
                    dt.TableName = "Table2";
                    
                    foreach (DataRow item in dt.Rows)
                    {
                        dsCities.Tables[0].Rows.Add(Convert.ToDecimal(item["CityID"].ToString()), item["CityName"].ToString());
                    }
                    dsCities.AcceptChanges();
                }
            }
            else
            {
                if (ds != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
                {
                    DataTable dt = ds.Tables[0].Copy();
                    dt.TableName = "Table2";
                    foreach (DataRow item in dt.Rows)
                    {
                        dsCities.Tables[0].Rows.Add(Convert.ToDecimal(item["CityID"].ToString()), item["CityName"].ToString());
                    }
                    dsCities.AcceptChanges();
                }
            }




            return dsCities;
        }

        public DataSet GetOnlyCountries(int ProductID, int SpeedID)
        {
            string CountryQuery = "select distinct c.country_id AS CountryID, cr.country_name as CountryName from csu_cases c, csu_country cr where c.product_cd = " + ProductID + " and c.case_valid_cd = 1 and cr.country_id = c.country_id and c.access_speed_char_id = " + SpeedID + " and c.hub_site_id is not null";
            OracleCommand cmd = new OracleCommand(CountryQuery, con);

            ds = new DataSet();
            dad = new OracleDataAdapter(cmd);
            dad.Fill(ds);
            return ds;
        }

        //public DataSet GetOnlyCountries(int ProductID, int SpeedID)
        //{
        //    string CountryQuery = "select distinct c.country_id AS CountryID, cr.country_name as CountryName from csu_cases c, csu_country cr where c.product_cd = " + ProductID + " and c.case_valid_cd = 1 and cr.country_id = c.country_id and c.access_speed_char_id = " + SpeedID + " and c.hub_site_id is not null";
        //    OracleCommand cmd = new OracleCommand(CountryQuery, con);

        //    ds = new DataSet();
        //    dad = new OracleDataAdapter(cmd);
        //    dad.Fill(ds);
        //    return ds;
        //}

        public int GetRegion(int CoutryID)
        {
            string CountryQuery = string.Empty;
            CountryQuery = "SELECT distinct CT.Region_ID FROM CSU_CASES C, CSU_COUNTRY CT WHERE 1=1 ";

            if (CoutryID > 0)
            {
                CountryQuery += " and c.country_id = " + CoutryID;
            }
            CountryQuery += " and c.CASE_VALID_CD=1 and ct.country_id = nvl(c.country_id,0) and  CT.COUNTRY_VALID_CD = 1";

            OracleCommand cmd = new OracleCommand(CountryQuery, con);

            ds = new DataSet();
            dad = new OracleDataAdapter(cmd);
            dad.Fill(ds);
            int RegionID = 0;
            if (ds != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
            {
                RegionID = Convert.ToInt32(ds.Tables[0].Rows[0][0].ToString());
            }
            return RegionID;
        }

        public DataSet GetInfoByCity(int CityID, int ProductID)
        {
            string CountryQuery = string.Empty;
            CountryQuery = "SELECT DISTINCT CT.REGION_ID,CT.COUNTRY_ID,S.STATE_PROVINCE_ID FROM CSU_CASES C, CSU_COUNTRY CT, CSU_STATE_PROVINCE S , CSU_CITY CI  WHERE 1=1 ";

            if (ProductID > 0)
            {
                CountryQuery += " AND  C.PRODUCT_CD=" + ProductID;
            }

            if (CityID > 0)
            {
                CountryQuery += " AND  CI.CITY_ID=" + CityID;
            }
            CountryQuery += " AND C.CASE_VALID_CD=1 AND CT.COUNTRY_ID = NVL(C.COUNTRY_ID,0) AND  S.STATE_PROVINCE_ID = NVL(C.STATE_PROVINCE_ID,0) AND ci.CITY_ID = nvl(c.CITY_ID,0)";

            OracleCommand cmd = new OracleCommand(CountryQuery, con);

            ds = new DataSet();
            dad = new OracleDataAdapter(cmd);
            dad.Fill(ds);

            return ds;
        }


        public DataSet GetInfoByState(int StateID)
        {
            string CountryQuery = string.Empty;
            CountryQuery = "SELECT DISTINCT CT.REGION_ID,CT.COUNTRY_ID FROM CSU_CASES C, CSU_COUNTRY CT, CSU_STATE_PROVINCE S WHERE 1=1 AND C.CASE_VALID_CD=1 AND CT.COUNTRY_ID = NVL(C.COUNTRY_ID,0) AND  S.STATE_PROVINCE_ID = NVL(C.STATE_PROVINCE_ID,0) AND S.STATE_PROVINCE_ID>0 AND ";

            if (StateID > 0)
            {
                CountryQuery += " S.STATE_PROVINCE_ID=" + StateID;
            }


            OracleCommand cmd = new OracleCommand(CountryQuery, con);

            ds = new DataSet();
            dad = new OracleDataAdapter(cmd);
            dad.Fill(ds);
            return ds;
        }


        public DataSet GetInfoByHubSite(int HubSiteID)
        {
            string CountryQuery = string.Empty;
            CountryQuery = "SELECT DISTINCT CT.REGION_ID,CT.COUNTRY_ID,S.STATE_PROVINCE_ID,CI.CITY_ID FROM CSU_CASES C LEFT JOIN CSU_COUNTRY CT ON CT.COUNTRY_ID = NVL(C.COUNTRY_ID,0) LEFT JOIN CSU_STATE_PROVINCE S ON S.STATE_PROVINCE_ID = NVL(C.STATE_PROVINCE_ID,0) LEFT JOIN CSU_CITY CI ON CI.CITY_ID = NVL(C.CITY_ID,0) LEFT JOIN CSU_HUB_SITE H ON H.HUB_SITE_ID = NVL(C.HUB_SITE_ID,0)    WHERE 1=1 AND C.CASE_VALID_CD=1 AND  ";

            if (HubSiteID > 0)
            {
                CountryQuery += " H.hub_site_id=" + HubSiteID;
            }

            CountryQuery += " ORDER BY S.STATE_PROVINCE_ID DESC";

            OracleCommand cmd = new OracleCommand(CountryQuery, con);

            ds = new DataSet();
            dad = new OracleDataAdapter(cmd);
            dad.Fill(ds);
            return ds;
        }




        public DataSet GetStates(int ProductID, int RegionID, int countryID, int isIA)
        {
            string statequery = "SELECT distinct nvl(c.state_province_id,0) as StateID, nvl(s.state_province_name,'None') AS StateName FROM CSU_CASES C, CSU_STATE_PROVINCE S";
            if (isIA == 1 && ProductID != 11)
            {
                statequery += ", CSU_CASE_DETAILS CCD";
            }
            statequery += " WHERE c.product_cd = " + ProductID + " AND c.CASE_VALID_CD=1 AND s.state_province_id = nvl(c.state_province_id,0) ";

            if (isIA == 1 && ProductID != 11)
            {
                statequery += " and ccd.case_id = c.case_id and ccd.char_id in(Select char_id from csu_ref_valid_char where upper(char_actual_value) = 'BTICC') and ccd.case_detail_valid_cd = 1 ";
            }

            if (countryID > 0)
            {
                statequery += " AND c.country_id = " + countryID;
            }
            if (RegionID > 0)
            {
                statequery += " and c.region_id = " + RegionID;
            }
            statequery += " and s.state_province_name<>'All Provinces' order by StateName";

            if (RegionID == 0 && countryID == 0)
            {
                statequery = "SELECT distinct nvl(cT.state_province_id,0) as StateID,nvl(s.state_province_name,'None') as StateName, nvl(cn.STATE_PROVINCE_FLAG,0) as state_province_flag FROM CSU_CASES C, CSU_REGION R, CSU_COUNTRY CN, CSU_CITY CT, CSU_STATE_PROVINCE S, CSU_HUB_SITE H WHERE c.product_cd = " + ProductID + " and c.CASE_VALID_CD=1 and r.region_id = nvl(c.region_id,0) and cn.country_id = nvl(c.country_id,0) and ct.city_id = nvl(c.city_id,0) and s.state_province_id = nvl(cT.state_province_id,0) and h.hub_site_id = nvl(c.hub_site_id,0) and CN.COUNTRY_VALID_CD = 1 and cn.STATE_PROVINCE_FLAG>0 group by ct.state_province_id, s.state_province_name, cn.state_province_flag having count(1) >= 1 ORDER BY StateName";
            }


            OracleCommand cmd = new OracleCommand(statequery, con);
            ds = new DataSet();
            dad = new OracleDataAdapter(cmd);
            dad.Fill(ds);
            return ds;
        }

        public DataSet GetRegionDetailsByCountryProduct(int ProductID, int CountryID)
        {
            string strQry = "SELECT NVL(C.REGION_ID,0) AS REGION_ID, NVL(R.REGION_NAME,'None') AS REGION_NAME,NVL(C.COUNTRY_ID,0) AS COUNTRY_ID, NVL(CN.COUNTRY_NAME,'None') AS COUNTRY_NAME , NVL(CN.STATE_PROVINCE_FLAG,0) AS STATE_FLAG,NVL(C.CITY_ID,0) AS CITY_ID, NVL(CT.CITY_NAME,'None') AS CITY_NAME,NVL(CT.STATE_PROVINCE_ID,0) AS STATE_PROVINCE_ID,NVL(S.STATE_PROVINCE_NAME,'None') AS STATE_PROVINCE_NAME,NVL(C.HUB_SITE_ID,0) AS HUB_SITE_ID, NVL(H.HUB_SITE_NAME,'None') AS HUB_SITE_NAME ,NVL(CN.STATE_PROVINCE_FLAG,0) AS STATE_PROVINCE_FLAG FROM CSU_CASES C, CSU_REGION R, CSU_COUNTRY CN, CSU_CITY CT,CSU_STATE_PROVINCE S, CSU_HUB_SITE H, CSU_PRODUCT P WHERE C.CASE_VALID_CD=1 AND R.REGION_ID = NVL(C.REGION_ID,0) AND CN.COUNTRY_ID = NVL(C.COUNTRY_ID,0) AND CT.CITY_ID = NVL(C.CITY_ID,0) AND S.STATE_PROVINCE_ID = NVL(CT.STATE_PROVINCE_ID,0) AND H.HUB_SITE_ID = NVL(C.HUB_SITE_ID,0) AND C.COUNTRY_ID = " + CountryID + " AND C.PRODUCT_CD = " + ProductID + " GROUP BY C.REGION_ID, R.REGION_NAME, C.COUNTRY_ID, CN.COUNTRY_NAME, CN.STATE_PROVINCE_FLAG, C.CITY_ID, CT.CITY_NAME, CT.STATE_PROVINCE_ID, S.STATE_PROVINCE_NAME, C.HUB_SITE_ID, H.HUB_SITE_NAME, CN.STATE_PROVINCE_FLAG HAVING COUNT(1) >= 1 ";
            strQry += " UNION ";
            strQry += " SELECT NVL(C.REGION_ID,0) AS REGION_ID, NVL(R.REGION_NAME,'None') AS REGION_NAME, NVL(C.COUNTRY_ID,0) AS COUNTRY_ID, NVL(CN.COUNTRY_NAME,'None') AS COUNTRY_NAME, 0 AS STATE_FLAG, 0 AS CITY_ID, 'None' AS CITY_NAME, 0 AS STATE_PROVINCE_ID, 'None'AS STATE_PROVINCE_NAME, 0 AS HUB_SITE_ID, 'None' AS HUB_SITE_NAME, 0 AS STATE_PROVINCE_FLAG FROM CLA_PRODUCT_CASES C, CSU_REGION R, CSU_COUNTRY CN, CSU_PRODUCT P WHERE C.CASE_VALID_CD = 1 AND R.REGION_ID = NVL(C.REGION_ID,0) AND CN.COUNTRY_ID = NVL(C.COUNTRY_ID,0) AND C.COUNTRY_ID = " + CountryID + " AND C.PRODUCT_CD = " + ProductID + " GROUP BY C.REGION_ID, R.REGION_NAME, C.COUNTRY_ID, CN.COUNTRY_NAME, 0 , 0, 'None', 0 , 'None', 0 , 'None', 0 HAVING COUNT(1) >= 1";

            OracleCommand cmd = new OracleCommand(strQry, con);
            DataSet ds = new DataSet();
            dad = new OracleDataAdapter(cmd);
            dad.Fill(ds);

            if (ds != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count == 0)
            {
                ds = null;
                strQry = "SELECT DISTINCT NVL (c.region_id, 0) AS region_id,NVL (r.region_name, 'None') AS region_name, NVL (c.country_id, 0) AS country_id,NVL (cn.country_name, 'None') AS country_name, NVL (cn.state_province_flag, 0) AS state_province_flag FROM cla_product_cases c, csu_region r,csu_country cn WHERE c.product_cd = " + ProductID + " AND c.case_valid_cd = 1 AND r.region_id = NVL (c.region_id, 0) AND cn.country_id = NVL (c.country_id, 0) AND cn.country_valid_cd = 1 GROUP BY c.region_id,r.region_name,c.country_id,cn.country_name, cn.state_province_flag HAVING COUNT (1) >= 1";
                cmd = new OracleCommand(strQry, con);
                ds = new DataSet();
                dad = new OracleDataAdapter(cmd);
                dad.Fill(ds);
            }

            return ds;
        }

        public DataSet GetSpeeds(int ProductID, int Country1ID, int City1ID, int Country2ID, int City2ID)
        {

            string strQry = "(select distinct c.access_speed_char_id,rtrim(ltrim(r.CHAR_NAME, 'Port Speed'),'MKGbps')|| ' ' ||r.CHAR_UNIT_OF_MEASURE, r.char_num_value, r.char_actual_value || ' ' || r.char_unit_of_measure AS SpeedVal from csu_cases c, csu_Ref_valid_char r where c.product_cd = " + ProductID + " and c.case_valid_cd = 1 and r.char_id = c.access_speed_char_id and c.subproduct_cd in (select pc_subproduct_id from capman_multipoint_conf where pc_product_id = " + ProductID + " and allpop_flag = 0) and c.hub_site_id is not null INTERSECT select distinct c.access_speed_char_id,rtrim(ltrim(r.CHAR_NAME, 'Port Speed'),'MKGbps')|| ' ' ||r.CHAR_UNIT_OF_MEASURE, r.char_num_value, r.char_actual_value || ' ' || r.char_unit_of_measure from csu_cases c, csu_Ref_valid_char r where c.product_cd = " + ProductID + " and c.case_valid_cd = 1 and r.char_id = c.access_speed_char_id and c.subproduct_cd in (select pc_subproduct_id from capman_multipoint_conf where pc_product_id = " + ProductID + " and allpop_flag = 0) and c.hub_site_id is not null ) UNION (select distinct c.access_speed_char_id,rtrim(ltrim(r.CHAR_NAME, 'Port Speed'),'MKGbps')|| ' ' ||r.CHAR_UNIT_OF_MEASURE, r.char_num_value, r.char_actual_value || ' ' || r.char_unit_of_measure from csu_cases c, csu_Ref_valid_char r where c.product_cd = " + ProductID + " and c.case_valid_cd = 1 and r.char_id = c.access_speed_char_id and c.subproduct_cd in (select pc_subproduct_id from capman_multipoint_conf where pc_product_id = " + ProductID + " and allpop_flag = 1) INTERSECT select distinct c.access_speed_char_id,rtrim(ltrim(r.CHAR_NAME, 'Port Speed'),'MKGbps')|| ' ' ||r.CHAR_UNIT_OF_MEASURE, r.char_num_value, r.char_actual_value || ' ' || r.char_unit_of_measure from csu_cases c, csu_Ref_valid_char r where c.product_cd = " + ProductID + " and c.case_valid_cd = 1 and r.char_id = c.access_speed_char_id and c.subproduct_cd in (select pc_subproduct_id from capman_multipoint_conf where pc_product_id = " + ProductID + " and allpop_flag = 1) ) order by 3";
            strQry = "SELECT DISTINCT C.ACCESS_SPEED_CHAR_ID,RTRIM(LTRIM(R.CHAR_NAME, 'Port Speed'),'MKGbps')|| ' ' ||R.CHAR_UNIT_OF_MEASURE, R.CHAR_NUM_VALUE, R.CHAR_ACTUAL_VALUE || ' ' || R.CHAR_UNIT_OF_MEASURE AS SpeedVal FROM CSU_CASES C, CSU_REF_VALID_CHAR R WHERE C.PRODUCT_CD = " + ProductID + " AND C.CASE_VALID_CD = 1 AND R.CHAR_ID = C.ACCESS_SPEED_CHAR_ID AND C.SUBPRODUCT_CD IN (SELECT PC_SUBPRODUCT_ID FROM CAPMAN_MULTIPOINT_CONF WHERE PC_PRODUCT_ID = " + ProductID + " AND ALLPOP_FLAG = 0) ";


            //if(CountryID>0)
            //{
            //    strQry += " and c.country_id = "+CountryID;
            //}

            //if(CityID>0)
            //{
            //    strQry += " and c.city_id = "+CityID;
            //}

            //strQry += " AND C.HUB_SITE_ID IS NOT NULL  ORDER BY cHAR_nUM_Value";

            strQry = "(SELECT DISTINCT C.ACCESS_SPEED_CHAR_ID,RTRIM(LTRIM(R.CHAR_NAME, 'Port Speed'),'MKGbps')|| ' ' ||R.CHAR_UNIT_OF_MEASURE, R.CHAR_NUM_VALUE, R.CHAR_ACTUAL_VALUE || ' ' || R.CHAR_UNIT_OF_MEASURE AS SpeedVal FROM CSU_CASES C, CSU_REF_VALID_CHAR R WHERE C.PRODUCT_CD = " + ProductID + " AND C.CASE_VALID_CD = 1 AND R.CHAR_ID = C.ACCESS_SPEED_CHAR_ID AND C.SUBPRODUCT_CD IN (SELECT PC_SUBPRODUCT_ID FROM CAPMAN_MULTIPOINT_CONF WHERE PC_PRODUCT_ID = " + ProductID + " AND ALLPOP_FLAG = 0) AND C.HUB_SITE_ID IS NOT NULL ";
            if (City1ID > 0)
            {
                strQry += " AND C.CITY_ID = " + City1ID;
            }
            else if (Country1ID > 0)
            {
                strQry += " AND C.COUNTRY_ID = " + Country1ID;
            }
            strQry += " INTERSECT ";
            strQry += " SELECT DISTINCT C.ACCESS_SPEED_CHAR_ID,RTRIM(LTRIM(R.CHAR_NAME, 'Port Speed'),'MKGbps')|| ' ' ||R.CHAR_UNIT_OF_MEASURE, R.CHAR_NUM_VALUE, R.CHAR_ACTUAL_VALUE || ' ' || R.CHAR_UNIT_OF_MEASURE AS SpeedVal FROM CSU_CASES C, CSU_REF_VALID_CHAR R WHERE C.PRODUCT_CD = " + ProductID + " AND C.CASE_VALID_CD = 1 AND R.CHAR_ID = C.ACCESS_SPEED_CHAR_ID AND C.SUBPRODUCT_CD IN (SELECT PC_SUBPRODUCT_ID FROM CAPMAN_MULTIPOINT_CONF WHERE PC_PRODUCT_ID = " + ProductID + " AND ALLPOP_FLAG = 0) AND C.HUB_SITE_ID IS NOT NULL ";

            if (City2ID > 0)
            {
                strQry += " AND C.CITY_ID = " + City2ID;
            }
            else if (Country2ID > 0)
            {
                strQry += " AND C.COUNTRY_ID = " + Country2ID;
            }
            strQry += " ) ";
            strQry += " UNION ";
            strQry += " (SELECT DISTINCT C.ACCESS_SPEED_CHAR_ID,RTRIM(LTRIM(R.CHAR_NAME, 'Port Speed'),'MKGbps')|| ' ' ||R.CHAR_UNIT_OF_MEASURE, R.CHAR_NUM_VALUE, R.CHAR_ACTUAL_VALUE || ' ' || R.CHAR_UNIT_OF_MEASURE AS SpeedVal FROM CSU_CASES C, CSU_REF_VALID_CHAR R WHERE C.PRODUCT_CD = " + ProductID + " AND C.CASE_VALID_CD = 1 AND R.CHAR_ID = C.ACCESS_SPEED_CHAR_ID AND C.SUBPRODUCT_CD IN (SELECT PC_SUBPRODUCT_ID FROM CAPMAN_MULTIPOINT_CONF WHERE PC_PRODUCT_ID = " + ProductID + " AND ALLPOP_FLAG = 1) ";
            if (Country1ID > 0)
            {
                strQry += " AND C.COUNTRY_ID = " + Country1ID;
            }

            strQry += " INTERSECT ";
            strQry += " select distinct c.access_speed_char_id,rtrim(ltrim(r.CHAR_NAME, 'Port Speed'),'MKGbps')|| ' ' ||r.CHAR_UNIT_OF_MEASURE, r.char_num_value, r.char_actual_value || ' ' || r.char_unit_of_measure AS SpeedVal from csu_cases c, csu_Ref_valid_char r where c.product_cd = " + ProductID + " and c.case_valid_cd = 1 and r.char_id = c.access_speed_char_id and c.subproduct_cd in (select pc_subproduct_id from capman_multipoint_conf where pc_product_id = " + ProductID + " and allpop_flag = 1) ";
            //and c.country_id = 36
            if (Country2ID > 0)
            {
                strQry += " AND C.COUNTRY_ID = " + Country2ID;
            }
            strQry += ") order by 3";


            OracleCommand cmd = new OracleCommand(strQry, con);
            ds = new DataSet();
            dad = new OracleDataAdapter(cmd);
            dad.Fill(ds);
            return ds;
        }

        public DataSet GetCities(int ProductID, int RegionID, int countryID, int StateID, int Speed, int isIA)
        {
            string CityQuery = string.Empty;
            CityQuery = "SELECT distinct nvl(c.CITY_ID,0) as CityID, DECODE(STATE_PROVINCE_FLAG,0,CI.CITY_NAME,1,CI.CITY_NAME||' ('||STATE_PROVINCE_NAME||')' ) AS CITYNAME FROM CSU_CASES C, CSU_CITY CI,CSU_COUNTRY CY,CSU_STATE_PROVINCE CSP  ";

            if (isIA == 1 && ProductID != 11)
            {
                CityQuery += " , CSU_CASE_DETAILS CCD";
            }
            //, DECODE(STATE_PROVINCE_FLAG,0,CR.CITY_NAME,1,CR.CITY_NAME||'('||STATE_PROVINCE_NAME||')' )AS

            CityQuery += " WHERE  C.CASE_VALID_CD = 1  AND CI.CITY_ID = C.CITY_ID  AND CI.COUNTRY_ID = CY.COUNTRY_ID  AND NVL(CI.STATE_PROVINCE_ID,0) = NVL(CSP.STATE_PROVINCE_ID,0) AND c.product_cd = " + ProductID + "  AND c.CASE_VALID_CD=1 AND ci.CITY_ID = nvl(c.CITY_ID,0) ";
            if (isIA == 1 && ProductID != 11)
            {
                CityQuery += " and ccd.case_id = c.case_id and ccd.char_id in(Select char_id from csu_ref_valid_char where upper(char_actual_value) = 'BTICC') and ccd.case_detail_valid_cd = 1 ";
            }


            if (countryID > 0)
            {
                CityQuery += " AND c.country_id =" + countryID;
            }


            if (RegionID > 0)
            {
                CityQuery += " and c.region_id = " + RegionID;
            }
            if (StateID > 0)
            {
                CityQuery += " and c.state_province_id=" + StateID;
            }
            CityQuery += " order by REPLACE(upper(CityName),'''','')";

            if (RegionID == 0 && countryID == 0 && StateID == 0)
            {
                CityQuery = "SELECT distinct nvl(c.CITY_ID,0) as CityID, nvl(ci.CITY_NAME,'None') AS CityName FROM CSU_CASES C, csu_city ci WHERE c.product_cd = " + ProductID + "  AND c.CASE_VALID_CD=1 AND ci.CITY_ID = nvl(c.CITY_ID,0) and ci.CITY_NAME<>'All Cities' order by CityName";
            }

            if (Speed > 0)
            {
                CityQuery = "SELECT DISTINCT C.CITY_ID as CityID, DECODE(STATE_PROVINCE_FLAG,0,CR.CITY_NAME,1,CR.CITY_NAME||' ('||STATE_PROVINCE_NAME||')' )AS CityName  FROM CSU_CASES C, CSU_CITY CR ,CSU_COUNTRY CY,CSU_STATE_PROVINCE CSP  WHERE C.PRODUCT_CD = " + ProductID + " AND C.CASE_VALID_CD = 1  AND CR.CITY_ID = C.CITY_ID  AND CR.COUNTRY_ID = CY.COUNTRY_ID  AND NVL(CR.STATE_PROVINCE_ID,0) = NVL(CSP.STATE_PROVINCE_ID,0)  AND C.SUBPRODUCT_CD IN (SELECT PC_SUBPRODUCT_ID FROM CAPMAN_MULTIPOINT_CONF  WHERE PC_PRODUCT_ID = " + ProductID + " AND ALLPOP_FLAG = 1)  AND C.COUNTRY_ID = " + countryID + " AND C.ACCESS_SPEED_CHAR_ID = " + Speed + " AND C.HUB_SITE_ID IS NOT NULL";
            }

            OracleCommand cmd = new OracleCommand(CityQuery, con);
            ds = new DataSet();
            dad = new OracleDataAdapter(cmd);
            dad.Fill(ds);
            return ds;
        }

        public DataSet GetCitiesBySpeed(int ProductID, int countryID, int Speed)
        {
            string CityQuery = string.Empty;

            CityQuery = "SELECT DISTINCT C.CITY_ID, DECODE(STATE_PROVINCE_FLAG,0,CR.CITY_NAME,1,CR.CITY_NAME||'('||STATE_PROVINCE_NAME||')' )AS CITY_NAME  FROM CSU_CASES C, CSU_CITY CR ,CSU_COUNTRY CY,CSU_STATE_PROVINCE CSP  WHERE C.PRODUCT_CD = " + ProductID + " AND C.CASE_VALID_CD = 1  AND CR.CITY_ID = C.CITY_ID  AND CR.COUNTRY_ID = CY.COUNTRY_ID  AND NVL(CR.STATE_PROVINCE_ID,0) = NVL(CSP.STATE_PROVINCE_ID,0)  AND C.SUBPRODUCT_CD IN (SELECT PC_SUBPRODUCT_ID FROM CAPMAN_MULTIPOINT_CONF  WHERE PC_PRODUCT_ID = " + ProductID + " AND ALLPOP_FLAG = 1)  AND C.COUNTRY_ID = " + countryID + " AND C.ACCESS_SPEED_CHAR_ID = " + Speed + " AND C.HUB_SITE_ID IS NOT NULL";

            OracleCommand cmd = new OracleCommand(CityQuery, con);
            ds = new DataSet();
            dad = new OracleDataAdapter(cmd);
            dad.Fill(ds);
            return ds;
        }

        public DataSet GetNetworkPlatformData(int ProductID, int HubSiteID)
        {
            string CityQuery = string.Empty;

            CityQuery = "Select distinct a.Capman_Platform_Id,Capman_Platform_Name from Csu_Cases a,CAPMAN_PLATFORMS b where a.CAPMAN_PLATFORM_ID = b.CAPMAN_PLATFORM_ID and a.HUB_SITE_ID = " + HubSiteID + " and a.case_valid_cd = 1 and a.PRODUCT_CD = " + ProductID;

            OracleCommand cmd = new OracleCommand(CityQuery, con);
            ds = new DataSet();
            dad = new OracleDataAdapter(cmd);
            dad.Fill(ds);
            return ds;
        }

        public int GetNetworkPlatformCount(int ProductID, int HubSiteID)
        {
            string CityQuery = string.Empty;

            CityQuery = "Select Count(distinct capman_platform_id) Cnt From Csu_Cases where HUB_SITE_ID = " + HubSiteID + " and case_valid_cd = 1 and PRODUCT_CD = " + ProductID;

            OracleCommand cmd = new OracleCommand(CityQuery, con);
            ds = new DataSet();
            dad = new OracleDataAdapter(cmd);
            dad.Fill(ds);
            int Count = 0;
            if (ds != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
            {
                Count = Convert.ToInt32(ds.Tables[0].Rows[0]["Cnt"].ToString());
            }
            return Count;
        }

        public int ShowCPE(int ProductID)
        {
            string CityQuery = string.Empty;

            CityQuery = "select use_cpe_product from csu_product where product_cd = " + ProductID;

            OracleCommand cmd = new OracleCommand(CityQuery, con);
            ds = new DataSet();
            dad = new OracleDataAdapter(cmd);
            dad.Fill(ds);
            int CPEProduct = 0;
            if (ds != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
            {
                CPEProduct = Convert.ToInt32(ds.Tables[0].Rows[0]["use_cpe_product"].ToString());
            }
            return CPEProduct;
        }

        public DataSet Getpops(int ProductID, int RegionID, int countryID, int StateID, int CityID, int isIA)
        {
            string PopQry = string.Empty;
            PopQry = " SELECT distinct nvl(c.hub_site_id,0) as POPID, nvl(h.hub_site_name,'None') as PopName FROM CSU_CASES C, CSU_HUB_SITE H ";

            if (isIA == 1 && ProductID != 11)
            {
                PopQry += ", CSU_CASE_DETAILS CCD";
            }

            if (ProductID > 0)
            {
                PopQry += " WHERE 1=1 and c.product_cd = " + ProductID;
            }

            if (isIA == 1 && ProductID != 11)
            {
                PopQry += " and ccd.case_id = c.case_id and ccd.char_id in(Select char_id from csu_ref_valid_char where upper(char_actual_value) = 'BTICC') and ccd.case_detail_valid_cd = 1 ";
            }
            if (RegionID > 0)
            {
                PopQry += " and c.region_id =" + RegionID;
            }
            if (countryID > 0)
            {
                PopQry += " and c.country_id = " + countryID;
            }
            if (StateID > 0)
            {
                PopQry += "  and c.state_province_id = " + StateID;
            }
            if (CityID > 0)
            {
                PopQry += " and c.city_id = " + CityID;
            }
            PopQry += " and c.CASE_VALID_CD=1  and h.hub_site_id = nvl(c.hub_site_id,0) ";
            if (CityID > 0)
            {
                PopQry += " UNION SELECT distinct nvl(c.hub_site_id,0) as POPID, nvl(h.hub_site_name,'None') as PopName FROM CSU_CASES C, CSU_HUB_SITE H";
                if (isIA == 1 && ProductID != 11)
                {
                    PopQry += ", CSU_CASE_DETAILS CCD";
                }



                if (ProductID > 0)
                {
                    PopQry += " WHERE 1=1  and c.product_cd = " + ProductID;
                }

                if (isIA == 1 && ProductID != 11)
                {
                    PopQry += " and ccd.case_id = c.case_id and ccd.char_id in(Select char_id from csu_ref_valid_char where upper(char_actual_value) = 'BTICC') and ccd.case_detail_valid_cd = 1 ";
                }
                if (RegionID > 0)
                {
                    PopQry += " and c.region_id =" + RegionID;
                }
                if (countryID > 0)
                {
                    PopQry += " and c.country_id = " + countryID;
                }
                if (CityID > 0)
                {
                    PopQry += " and c.city_id = " + CityID;
                }
                PopQry += " and c.CASE_VALID_CD=1  and h.hub_site_id = nvl(c.hub_site_id,0) ";
            }
            PopQry += "  order by PopName";
            OracleCommand cmd = new OracleCommand(PopQry, con);
            ds = new DataSet();
            dad = new OracleDataAdapter(cmd);
            dad.Fill(ds);
            return ds;
        }

        public DataSet GetAccessSuppliers(int CaseID, int ProductID, int HubSiteID, int CaseValidID, int CountryID)
        {

            StringBuilder strSql = new StringBuilder();
            strSql.Append("select DISTINCT a.access_supplier_char_id, b.char_name, d.priority from csu_cases a, csu_ref_valid_char b, csu_case_port_access_speeds c, csu_supplier_country d,csu_ref_valid_char a");

            strSql.Append(" where c.case_id = " + CaseID + "and c.valid_cd = 1  and a.access_speed_char_id = c.access_speed_char_id");
            //'	If CInt(objSession.ReadVar("sAccess_Level",lSessionID)) <> CInt(C_SUPER_USER) then
            //'		sql = sql & " and vw.supplier_id(+) = a.access_supplier_char_id "
            //'		sql = sql & " and nvl(vw.segregation_id,0) in (" & objSession.ReadVar("sSegregationCodes",lSessionID) & ")"
            //'	End If
            strSql.Append(" and a.access_supplier_char_id NOT in (select distinct supplier_id from csu_case_supplier where case_id = c.case_id)");
            strSql.Append(" and a.access_product_type_id = c.access_product_type_id  and a.access_supplier_name_id = c.access_supplier_name_id ");
            strSql.Append(" and a.access_supplier_char_id = c.access_supplier_char_id ");
            //If CInt(objSession.ReadVar("sAccess_Level",lSessionID)) <> CInt(C_SUPER_USER) then
            //'Added for Siteminder
            //    If objSession.ReadVar("sLdapGFR", lSessionID) <> "" Then
            //        sql = sql & " and not exists(select 'x' from capman_supplier_map csm, csu_btgfr_restrictions csr where csr.btgfr = ?"
            //        sql = sql & " and csr.country_id = d.country_id and csr.supplier_id = csm.c_supplier_id and csm.pc_supplier_id = a.access_supplier_char_id)"
            //    Else
            //    sql = sql & " and not exists(select 'x' from capman_supplier_map csm, csu_restrictions csr where csr.distributorid = ?"
            //    sql = sql & " and csr.countryid = d.country_id and csr.supplierid = csm.c_supplier_id and csm.pc_supplier_id = a.access_supplier_char_id)"
            //End If
            //End If
            strSql.Append(" and a.product_cd = " + ProductID + " and a.hub_site_id = " + HubSiteID + " and a.case_valid_cd = " + CaseValidID);
            strSql.Append(" and d.supplier_id(+) = a.access_supplier_char_id and d.country_id(+) = " + CountryID);
            strSql.Append(" and b.char_id = a.access_supplier_char_id AND a.CHAR_ID = c.PORT_SPEED_CHAR_ID and b.char_valid_cd = " + CaseValidID + " order by d.priority, b.char_name");

            StringBuilder SqlQuery = new StringBuilder();

            SqlQuery.Append(" Select Distinct a.Access_Supplier_Char_Id,b.Char_Name As Supplier_Name,a.Access_Supplier_Name_Id,(Select Char_Name From Csu_Ref_Valid_Char Where Char_Id = a.Access_Supplier_Name_Id) As Supplier_Prdt_Name,");
            SqlQuery.Append(" a.Access_Speed_Char_Id,(Select Char_Actual_Value||' '||Char_Unit_Of_Measure From Csu_Ref_Valid_Char Where Char_Id = a.Access_Speed_Char_Id) As Access_Speed,(Select Char_num_value From Csu_Ref_Valid_Char Where Char_Id = a.Access_Speed_Char_Id) As ASOrder,");
            SqlQuery.Append(" a.Access_Product_Type_Id,(Select Char_Name From Csu_Ref_Valid_Char Where Char_Id = a.Access_Product_Type_Id) As access_type,d.priority ");
            SqlQuery.Append(" FROM csu_cases a,csu_ref_valid_char b, csu_case_port_access_speeds c, csu_supplier_country d,csu_ref_valid_char a WHERE c.case_id =" + CaseID);
            SqlQuery.Append(" and c.valid_cd = 1 AND a.access_speed_char_id= c.access_speed_char_id AND a.access_supplier_char_id NOT IN (SELECT DISTINCT supplier_id FROM csu_case_supplier WHERE case_id = c.case_id");
            SqlQuery.Append("  ) AND a.access_product_type_id  = c.access_product_type_id AND a.access_supplier_name_id = c.access_supplier_name_id AND a.access_supplier_char_id = c.access_supplier_char_id");
            SqlQuery.Append("  AND a.product_cd = " + ProductID + " AND a.hub_site_id = " + HubSiteID + " AND a.case_valid_cd = " + CaseValidID + " AND d.supplier_id(+)= a.access_supplier_char_id AND d.country_id(+) =" + CountryID);
            SqlQuery.Append("  AND b.char_id= a.access_supplier_char_id AND a.CHAR_ID= c.PORT_SPEED_CHAR_ID AND b.char_valid_cd  = " + CaseValidID + "  ORDER BY d.priority,  b.char_name");


            OracleCommand cmd = new OracleCommand(SqlQuery.ToString(), con);
            ds = new DataSet();
            dad = new OracleDataAdapter(cmd);
            dad.Fill(ds);
            return ds;
        }


        public DataSet GetPortSpeeds(int CaseID, int ProductID, int HubSiteID, int CaseValidID, int CountryID)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append(" select distinct c.port_speed_char_id AS pspeedid,a.char_actual_value || ' ' || NVL (a.char_unit_of_measure, 'kbps') AS portspeed, ");
            strSql.Append(" a.char_num_value from csu_cases a, csu_ref_valid_char b, csu_case_port_access_speeds c, csu_supplier_country d,csu_ref_valid_char a");
            strSql.Append(" where  c.case_id = " + CaseID + " and c.valid_cd = 1 and a.access_speed_char_id = c.access_speed_char_id and a.access_supplier_char_id NOT in ");
            strSql.Append("  (select distinct supplier_id from csu_case_supplier where case_id = c.case_id) and a.access_product_type_id = c.access_product_type_id ");
            strSql.Append("  and a.access_supplier_name_id = c.access_supplier_name_id and a.access_supplier_char_id = c.access_supplier_char_id ");
            //If CInt(objSession.ReadVar("sAccess_Level",lSessionID)) <> CInt(C_SUPER_USER) then
            //'Added for Siteminder
            //    If objSession.ReadVar("sLdapGFR", lSessionID) <> "" Then
            //        sql = sql & " and not exists(select 'x' from capman_supplier_map csm, csu_btgfr_restrictions csr where csr.btgfr = ?"
            //        sql = sql & " and csr.country_id = d.country_id and csr.supplier_id = csm.c_supplier_id and csm.pc_supplier_id = a.access_supplier_char_id)"
            //    Else
            //    sql = sql & " and not exists(select 'x' from capman_supplier_map csm, csu_restrictions csr where csr.distributorid = ?"
            //    sql = sql & " and csr.countryid = d.country_id and csr.supplierid = csm.c_supplier_id and csm.pc_supplier_id = a.access_supplier_char_id)"
            //End If
            //End If
            strSql.Append(" and a.product_cd = " + ProductID + " and a.hub_site_id = " + HubSiteID + " and a.case_valid_cd = " + CaseValidID);
            strSql.Append(" and d.supplier_id(+) = a.access_supplier_char_id and d.country_id(+) = " + CountryID + " and b.char_id = a.access_supplier_char_id AND a.CHAR_ID = c.PORT_SPEED_CHAR_ID");
            strSql.Append(" and b.char_valid_cd = " + CaseValidID + " order by a.char_num_value");


            OracleCommand cmd = new OracleCommand(strSql.ToString(), con);
            ds = new DataSet();
            dad = new OracleDataAdapter(cmd);
            dad.Fill(ds);
            return ds;
        }

        public DataSet GetParetnPortSpeeds(int CaseID, int ProductID, int HubSiteID, int CaseValidID, int CountryID, int CharTypeID, int ParentProductID, int ValidateParent, int CapmanPlatformID)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("Select Distinct d.PORT_SPEED_CHAR_ID as pspeedid,a.char_actual_value || ' ' || NVL (a.char_unit_of_measure, 'kbps') as portspeed,a.char_num_value from ");
            strSql.Append(" csu_cases a1, csu_case_details a2,csu_case_port_access_speeds d, csu_ref_valid_char c4, csu_ref_valid_char d4, csu_ref_valid_char e4, csu_ref_valid_char f4,");
            strSql.Append(" csu_supplier_country csc,csu_cases cs4,csu_case_details cs5,csu_ref_valid_char c3,csu_ref_valid_char a,valid_parent_map_ineterface vpmi,valid_parent_mappings vpm");
            strSql.Append(" where vpmi.interface_char_id = cs5.char_id AND vpmi.valid_cd = 1 AND d.access_speed_char_id = vpmi.access_speed_char_id");
            strSql.Append(" AND vpm.port_speed_char_id = d.port_speed_char_id AND cs5.case_id = cs4.case_id AND cs5.case_detail_valid_cd = 1 AND cs5.char_type_id = 868");
            strSql.Append(" AND vpm.ACCESS_SPEED_CHAR_ID = vpmi.access_speed_char_id AND vpm.VALID_CD =1 AND a1.CAPMAN_PLATFORM_ID = " + CapmanPlatformID + " AND vpmi.PRODUCT_CD = " + ProductID);
            strSql.Append(" AND vpmi.product_cd = vpm.product_cd AND NVL (vpmi.subproduct_cd, 0) = 0 and a1.product_cd = " + ParentProductID);
            strSql.Append(" and a1.hub_site_id = " + HubSiteID + " and a1.case_valid_cd = 1 and a2.case_id = a1.case_id");
            strSql.Append(" and a2.case_detail_valid_cd = 1 and a2.char_type_id = " + CharTypeID);
            strSql.Append("  and d.case_id = a1.case_id and d.port_speed_char_id = a2.char_id AND d.PORT_SPEED_CHAR_ID = a.CHAR_ID");
            strSql.Append("  and d.valid_cd = 1 AND cs4.case_valid_cd = 1 AND cs4.product_cd = 25 AND a.CHAR_ID = a2.CHAR_ID");
            strSql.Append("  AND cs4.access_supplier_name_id = d.access_supplier_name_id AND cs4.access_speed_char_id = d.access_speed_char_id");
            strSql.Append("  AND Exists (select 'x' FROM csu_product_access_interfaces a,valid_parent_map_ineterface b,valid_parent_mappings c where cs4.access_speed_char_id = a.access_char_id ");
            strSql.Append("  AND b.valid_cd = 1 AND a.access_char_id = b.access_speed_char_id AND a.interface_char_id = b.interface_char_id AND c.access_speed_char_id = b.access_speed_char_id");
            strSql.Append("  AND c.port_speed_char_id = d.port_speed_char_id AND c.access_speed_char_id = a.access_char_id AND c.valid_cd = 1 AND c.product_cd = b.product_cd AND a.product_cd = " + ParentProductID + "  AND c.product_cd = " + ProductID + " )");
            strSql.Append("  AND cs4.access_supplier_char_id = d.access_supplier_char_id");
            strSql.Append("  AND NOT Exists (select 'x' from csu_case_supplier z where z.case_id = a1.case_id and cs4.access_supplier_char_id = z.supplier_id)");
            //If CInt(objSession.ReadVar("sAccess_Level",lSessionID)) <> CInt(C_SUPER_USER) then
            //    'Added for Siteminder
            //    If objSession.ReadVar("sLdapGFR", lSessionID) <> "" Then
            //        sql = sql & " and not exists(SELECT 'x' from capman_supplier_map csm, csu_btgfr_restrictions csr WHERE csr.btgfr = ?"
            //        sql = sql & " and csr.country_id = csc.country_id and csr.supplier_id = csm.c_supplier_id and csm.pc_supplier_id = cs4.access_supplier_char_id)"
            //    Else
            //    sql = sql & " and not exists(SELECT 'x' from capman_supplier_map csm, csu_restrictions csr WHERE csr.distributorid = ?"
            //    sql =sql & " and csr.countryid = csc.country_id and csr.supplierid = csm.c_supplier_id and csm.pc_supplier_id = cs4.access_supplier_char_id)"
            //End If
            //End If
            strSql.Append("  AND cs4.hub_site_id = " + HubSiteID);

            if (ValidateParent == 1)
                strSql.Append("  And NOT Exists (");
            else
                strSql.Append("  And Exists (");

            strSql.Append("  select 'x'  from csu_parent_port_access_speeds ccpas");
            strSql.Append("  where ccpas.case_id = " + CaseID + "And ccpas.port_speed_char_id = d.port_speed_char_id");
            strSql.Append("  And ccpas.access_speed_char_id = d.access_speed_char_id And ccpas.access_product_type_id = d.access_product_type_id");
            strSql.Append("  And ccpas.access_supplier_name_id = d.access_supplier_name_id And ccpas.access_supplier_char_id = d.access_supplier_char_id and d.access_supplier_char_id = ccpas.access_supplier_char_id");

            if (ValidateParent == 1)
                strSql.Append("  And ccpas.valid_cd = 0)");
            else
                strSql.Append("  And ccpas.valid_cd = 1)");

            strSql.Append("  And c4.char_id = d.access_speed_char_id And d4.char_id = d.access_product_type_id And e4.char_id = d.access_supplier_name_id ");
            strSql.Append("  And f4.char_id = d.access_supplier_char_id  and c3.char_id = d.access_supplier_char_id  and csc.supplier_id(+) = d.access_supplier_char_id ");
            strSql.Append("  and csc.country_id(+) = " + CountryID + " Order by a.char_num_value");


            OracleCommand cmd = new OracleCommand(strSql.ToString(), con);
            ds = new DataSet();
            dad = new OracleDataAdapter(cmd);
            dad.Fill(ds);
            return ds;
        }

        public DataSet GetParentAccessSupplier(int CaseID, int ProductID, int HubSiteID, int CaseValidID, int CountryID, int CharTypeID, int ParentProductID, int ValidateParent, int CapmanPlatformID)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append(" Select Distinct d.access_supplier_char_id, c3.char_name, csc.priority from csu_cases a1, csu_case_details a2,csu_case_port_access_speeds d,");
            strSql.Append(" csu_ref_valid_char c4, csu_ref_valid_char d4, csu_ref_valid_char e4, csu_ref_valid_char f4,csu_supplier_country csc,csu_cases cs4,csu_case_details cs5,");
            strSql.Append(" csu_ref_valid_char c3,csu_ref_valid_char a,valid_parent_map_ineterface vpmi,valid_parent_mappings vpm");
            strSql.Append(" where  vpmi.interface_char_id = cs5.char_id AND vpmi.valid_cd = 1 AND d.access_speed_char_id = vpmi.access_speed_char_id");
            strSql.Append(" AND vpm.port_speed_char_id = d.port_speed_char_id AND cs5.case_id = cs4.case_id AND cs5.case_detail_valid_cd = 1 AND cs5.char_type_id = 868");
            strSql.Append(" AND vpm.ACCESS_SPEED_CHAR_ID = vpmi.access_speed_char_id AND vpm.VALID_CD =1 AND a1.CAPMAN_PLATFORM_ID = " + CapmanPlatformID + " AND vpmi.PRODUCT_CD = " + ProductID);
            strSql.Append(" AND vpmi.product_cd = vpm.product_cd AND NVL (vpmi.subproduct_cd, 0) = 0 and a1.product_cd = " + ParentProductID);
            strSql.Append(" and a1.hub_site_id = " + HubSiteID + " and a1.case_valid_cd = 1");
            strSql.Append(" and a2.case_id = a1.case_id and a2.case_detail_valid_cd = 1 and a2.char_type_id = " + CharTypeID);
            strSql.Append(" and d.case_id = a1.case_id and d.port_speed_char_id = a2.char_id AND d.PORT_SPEED_CHAR_ID = a.CHAR_ID");
            strSql.Append(" and d.valid_cd = 1 AND cs4.case_valid_cd = 1 AND cs4.product_cd = 25 AND a.CHAR_ID = a2.CHAR_ID");
            strSql.Append(" AND cs4.access_supplier_name_id = d.access_supplier_name_id AND cs4.access_speed_char_id = d.access_speed_char_id");
            strSql.Append(" AND Exists (select 'x' FROM csu_product_access_interfaces a,valid_parent_map_ineterface b,valid_parent_mappings c where cs4.access_speed_char_id = a.access_char_id ");
            strSql.Append(" AND b.valid_cd = 1 AND a.access_char_id = b.access_speed_char_id AND a.interface_char_id = b.interface_char_id AND c.access_speed_char_id = b.access_speed_char_id");
            strSql.Append(" AND c.port_speed_char_id = d.port_speed_char_id AND c.access_speed_char_id = a.access_char_id AND c.valid_cd = 1 AND c.product_cd = b.product_cd AND a.product_cd = " + ParentProductID + " AND c.product_cd = " + ProductID + ")");
            strSql.Append(" AND cs4.access_supplier_char_id = d.access_supplier_char_id  AND NOT Exists (select 'x' from csu_case_supplier z where z.case_id = a1.case_id and cs4.access_supplier_char_id = z.supplier_id)");

            strSql.Append(" AND cs4.hub_site_id = " + HubSiteID);

            if (ValidateParent == 1)
                strSql.Append("  And NOT Exists (");
            else
                strSql.Append("  And Exists (");
            strSql.Append("  select 'x'  from csu_parent_port_access_speeds ccpas");
            strSql.Append("  where ccpas.case_id = " + CaseID + " And ccpas.port_speed_char_id = d.port_speed_char_id");
            strSql.Append("  And ccpas.access_speed_char_id = d.access_speed_char_id And ccpas.access_product_type_id = d.access_product_type_id");
            strSql.Append("  And ccpas.access_supplier_name_id = d.access_supplier_name_id");
            strSql.Append("  And ccpas.access_supplier_char_id = d.access_supplier_char_id and d.access_supplier_char_id = ccpas.access_supplier_char_id");
            if (ValidateParent == 1)
                strSql.Append("  And ccpas.valid_cd = 0)");
            else
                strSql.Append("  And ccpas.valid_cd = 1)");


            strSql.Append("  And c4.char_id = d.access_speed_char_id And d4.char_id = d.access_product_type_id And e4.char_id = d.access_supplier_name_id ");
            strSql.Append("  And f4.char_id = d.access_supplier_char_id and c3.char_id = d.access_supplier_char_id ");
            strSql.Append("  and csc.supplier_id(+) = d.access_supplier_char_id  and csc.country_id(+) = " + CountryID + " Order by c3.char_name");

            StringBuilder strQuery = new StringBuilder();

            strQuery.Append("  Select Distinct D.Access_Supplier_Char_Id,C3.Char_Name As Supplier_Name,");
            strQuery.Append("  D.Access_Supplier_Name_Id,(Select Char_Name From Csu_Ref_Valid_Char Where Char_Id = D.Access_Supplier_Name_Id) As Supplier_Prdt_Name,");
            strQuery.Append("  D.Access_Speed_Char_Id,(Select Char_Actual_Value||' '||Char_Unit_Of_Measure From Csu_Ref_Valid_Char Where Char_Id = D.Access_Speed_Char_Id) As Access_Speed,(Select Char_num_value From Csu_Ref_Valid_Char Where Char_Id = D.Access_Speed_Char_Id) As ASOrder, ");
            strQuery.Append("  D.Access_Product_Type_Id,(Select Char_Name From Csu_Ref_Valid_Char Where Char_Id = D.Access_Product_Type_Id) As access_type,");
            strQuery.Append("  csc.priority FROM csu_cases a1,   csu_case_details a2,   csu_case_port_access_speeds d,   csu_ref_valid_char c4,   csu_ref_valid_char d4, ");
            strQuery.Append("  csu_ref_valid_char e4,  csu_ref_valid_char f4,   csu_supplier_country csc,   csu_cases cs4,   csu_case_details cs5,   csu_ref_valid_char c3,");
            strQuery.Append("  csu_ref_valid_char a,   valid_parent_map_ineterface vpmi,   valid_parent_mappings vpm WHERE vpmi.interface_char_id = cs5.char_id AND vpmi.valid_cd = 1 ");
            strQuery.Append("  AND d.access_speed_char_id      = vpmi.access_speed_char_id AND vpm.port_speed_char_id      = d.port_speed_char_id AND cs5.case_id = cs4.case_id ");
            strQuery.Append("  AND cs5.case_detail_valid_cd  = 1 AND cs5.char_type_id = 868 AND vpm.ACCESS_SPEED_CHAR_ID    = vpmi.access_speed_char_id AND vpm.VALID_CD  =1 ");
            strQuery.Append("  AND a1.CAPMAN_PLATFORM_ID = " + CapmanPlatformID + " AND vpmi.PRODUCT_CD = " + ProductID + " AND vpmi.product_cd = vpm.product_cd AND NVL (vpmi.subproduct_cd, 0) = 0 AND a1.product_cd = " + ParentProductID);
            strQuery.Append("  AND a1.hub_site_id   = " + HubSiteID + " AND a1.case_valid_cd  = 1 AND a2.case_id= a1.case_id AND a2.case_detail_valid_cd = 1 AND a2.char_type_id = " + CharTypeID);
            strQuery.Append("  AND d.case_id  = a1.case_id AND d.port_speed_char_id = a2.char_id AND d.PORT_SPEED_CHAR_ID = a.CHAR_ID AND d.valid_cd = 1 AND cs4.case_valid_cd = 1");
            strQuery.Append("  AND cs4.product_cd = 25 AND a.CHAR_ID = a2.CHAR_ID AND cs4.access_supplier_name_id = d.access_supplier_name_id AND cs4.access_speed_char_id = d.access_speed_char_id");
            strQuery.Append("  AND EXISTS (SELECT 'x' FROM csu_product_access_interfaces a, valid_parent_map_ineterface b, valid_parent_mappings c WHERE cs4.access_speed_char_id = a.access_char_id");
            strQuery.Append("  AND b.valid_cd = 1 AND a.access_char_id = b.access_speed_char_id AND a.interface_char_id = b.interface_char_id AND c.access_speed_char_id = b.access_speed_char_id");
            strQuery.Append("  AND c.port_speed_char_id = d.port_speed_char_id AND c.access_speed_char_id = a.access_char_id AND c.valid_cd = 1   AND c.product_cd = b.product_cd");
            strQuery.Append("  AND a.product_cd  = " + ParentProductID + " AND c.product_cd= " + ProductID + " ) AND cs4.access_supplier_char_id = d.access_supplier_char_id AND NOT EXISTS (SELECT 'x' ");
            strQuery.Append("  FROM csu_case_supplier z WHERE z.case_id = a1.case_id AND cs4.access_supplier_char_id = z.supplier_id ) AND cs4.hub_site_id = " + HubSiteID + " AND NOT EXISTS");
            strQuery.Append("  (SELECT 'x'   FROM csu_parent_port_access_speeds ccpas   WHERE ccpas.case_id = " + CaseID + "   AND ccpas.port_speed_char_id      = d.port_speed_char_id AND ccpas.access_speed_char_id    = d.access_speed_char_id");
            strQuery.Append("  AND ccpas.access_product_type_id  = d.access_product_type_id AND ccpas.access_supplier_name_id = d.access_supplier_name_id   AND ccpas.access_supplier_char_id = d.access_supplier_char_id");
            strQuery.Append("  AND d.access_supplier_char_id = ccpas.access_supplier_char_id AND ccpas.valid_cd = 0 ) AND c4.char_id  = d.access_speed_char_id AND d4.char_id   = d.access_product_type_id");
            strQuery.Append("  AND e4.char_id = d.access_supplier_name_id AND f4.char_id  = d.access_supplier_char_id AND c3.char_id  = d.access_supplier_char_id AND csc.supplier_id(+) = d.access_supplier_char_id ");
            strQuery.Append("  AND csc.country_id(+)  = " + CountryID + " ORDER BY C3.CHAR_NAME");


            OracleCommand cmd = new OracleCommand(strQuery.ToString(), con);
            ds = new DataSet();
            dad = new OracleDataAdapter(cmd);
            dad.Fill(ds);
            return ds;
        }

        public DataSet GetParentSpeeds(int CaseID, int SupplierID, int CPESuppliers, string SelectedPortSpeed, string AccessSpeed, string SupplierProduct, string AccessType, int PageNo, int PageSize, ref int Count)
        {
            DataSet dsParentSpeeds = new DataSet();
            try
            {
                //OracleCommand cmd = new OracleCommand("pkg_dispproddetails_new.Stp_Parentspeeds", con);
                OracleCommand cmd = new OracleCommand("pkg_dispproddetails_global.Stp_Parentspeeds", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add("psupplierid", OracleDbType.Int32).Value = SupplierID;//2;//pproductloclevel;
                cmd.Parameters.Add("pchildcaseid", OracleDbType.Int32).Value = CaseID; //-1;//hubsiteid
                if (CPESuppliers > 0)
                    cmd.Parameters.Add("i_cpesuppid", OracleDbType.Int32).Value = CPESuppliers; //0;//pstateflag;
                else
                    cmd.Parameters.Add("i_cpesuppid", OracleDbType.Int32).Value = null;
                cmd.Parameters.Add("i_pspeed", OracleDbType.Varchar2).Value = SelectedPortSpeed;  //21;//pproductcd;
                cmd.Parameters.Add("I_ASPEED", OracleDbType.Varchar2).Value = AccessSpeed;
                cmd.Parameters.Add("I_SUP_PRDT_ID", OracleDbType.Varchar2).Value = SupplierProduct;
                cmd.Parameters.Add("I_ACC_TYPE_ID", OracleDbType.Varchar2).Value = AccessType;

                //cmd.Parameters.Add("v_parentdata", OracleDbType.RefCursor, ParameterDirection.Output);
                cmd.Parameters.Add("PAGENUMBER", OracleDbType.Int32).Value = PageNo;
                cmd.Parameters.Add("RowspPage", OracleDbType.Int32).Value = PageSize;

                cmd.Parameters.Add("v_parentdata", OracleDbType.RefCursor, ParameterDirection.Output);
                cmd.Parameters.Add("v_parentdata_cnt", OracleDbType.RefCursor, ParameterDirection.Output);

                dsParentSpeeds = new DataSet();
                dad = new OracleDataAdapter(cmd);
                dsParentSpeeds = new DataSet();
                dad.Fill(dsParentSpeeds);

                if (dsParentSpeeds != null && dsParentSpeeds.Tables.Count > 1 && dsParentSpeeds.Tables[1].Rows.Count > 0)
                {
                    Count = Convert.ToInt32(dsParentSpeeds.Tables[1].Rows[0][0].ToString());
                }
            }
            catch
            {


            }

            return dsParentSpeeds;
        }

        public DataSet GetPhaseNames(string strPhaseIDs, int ProductID)
        {

            OracleCommand cmd = new OracleCommand("prc_phase_id", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("v_phaseid", OracleDbType.Varchar2).Value = strPhaseIDs;//2;//pproductloclevel;
            cmd.Parameters.Add("v_productid", OracleDbType.Int32).Value = ProductID; //-1;//hubsiteid
            cmd.Parameters.Add("v_cur", OracleDbType.RefCursor, ParameterDirection.Output);

            DataSet dsPhaseNames = new DataSet();
            dad = new OracleDataAdapter(cmd);

            dad.Fill(dsPhaseNames);
            return dsPhaseNames;
        }

        public DataSet GetChildPortSpeeds(int CaseID, int SupplierID, int CPESuppliers, string SelectedPortSpeed, string AccSpeed, string SuppProduct, string AccType, int PageNo, int PageSize, ref int Count)
        {

            //OracleCommand cmd = new OracleCommand("pkg_dispproddetails_new.stp_GetPortSpeeds", con);
            OracleCommand cmd = new OracleCommand("pkg_dispproddetails_global.stp_GetPortSpeeds", con);

            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("i_caseid", OracleDbType.Int32).Value = CaseID;//2;//pproductloclevel;
            cmd.Parameters.Add("i_suppid", OracleDbType.Int32).Value = SupplierID; //-1;//hubsiteid
            if (CPESuppliers == 0)
            {
                cmd.Parameters.Add("i_cpesuppid", OracleDbType.Int32).Value = null;
            }
            else
            {
                cmd.Parameters.Add("i_cpesuppid", OracleDbType.Int32).Value = CPESuppliers; //0;//pstateflag;
            }
            cmd.Parameters.Add("i_pspeed", OracleDbType.Varchar2).Value = SelectedPortSpeed;  //21;//pproductcd;
            cmd.Parameters.Add("I_ASPEED", OracleDbType.Varchar2).Value = AccSpeed;
            cmd.Parameters.Add("I_SUP_PRDT_ID", OracleDbType.Varchar2).Value = SuppProduct;
            cmd.Parameters.Add("I_ACC_TYPE_ID", OracleDbType.Varchar2).Value = AccType;

            cmd.Parameters.Add("PAGENUMBER", OracleDbType.Int32).Value = PageNo;
            cmd.Parameters.Add("RowspPage", OracleDbType.Int32).Value = PageSize;

            cmd.Parameters.Add("pportaccessint", OracleDbType.RefCursor, ParameterDirection.Output);
            cmd.Parameters.Add("pportaccesscnt", OracleDbType.RefCursor, ParameterDirection.Output);

            //cmd.Parameters.Add("pportaccessint", OracleDbType.RefCursor, ParameterDirection.Output);

            DataSet dsParentSpeeds = new DataSet();
            dad = new OracleDataAdapter(cmd);
            dsParentSpeeds = new DataSet();
            dad.Fill(dsParentSpeeds);

            if (dsParentSpeeds != null && dsParentSpeeds.Tables.Count > 1 && dsParentSpeeds.Tables[1].Rows.Count > 0)
            {
                Count = Convert.ToInt32(dsParentSpeeds.Tables[1].Rows[0][0].ToString());
            }

            return dsParentSpeeds;
        }

        public string GetPhaseName(int PhaseID, int ProductID)
        {

            string strQry = "select phase_name from csu_product_phase_attribute where phase_id= " + PhaseID + " AND product_id= " + ProductID;

            string strResult = "";

            OracleCommand cmd = new OracleCommand(strQry, con);
            DataSet dsPhaseName = new DataSet();
            dad = new OracleDataAdapter(cmd);
            dsPhaseName = new DataSet();
            dad.Fill(dsPhaseName);
            if (dsPhaseName != null && dsPhaseName.Tables.Count > 0 && dsPhaseName.Tables[0].Rows.Count > 0)
            {

                strResult = dsPhaseName.Tables[0].Rows[0][0].ToString();

            }
            return strResult;
        }

        public string GetAccessSupplierCharName(int AccessSupplierCharID)
        {

            string strQry = "";

            strQry = "select char_name from csu_ref_valid_char where char_id = " + AccessSupplierCharID;

            string strResult = "";

            OracleCommand cmd = new OracleCommand(strQry, con);
            DataSet dsPhaseName = new DataSet();
            dad = new OracleDataAdapter(cmd);
            dad.Fill(dsPhaseName);
            if (dsPhaseName != null && dsPhaseName.Tables.Count > 0 && dsPhaseName.Tables[0].Rows.Count > 0)
            {
                strResult = dsPhaseName.Tables[0].Rows[0][0].ToString();

            }
            return strResult;
        }


        public DataSet GetAccessSupplierCharNames(string AccessSupplierCharID)
        {

            OracleCommand cmd = new OracleCommand("PRC_GetAccesSupplier", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("AccessSupplierID", OracleDbType.Varchar2).Value = AccessSupplierCharID;
            cmd.Parameters.Add("v_cur", OracleDbType.RefCursor, ParameterDirection.Output);

            DataSet dsAccessSupplier = new DataSet();
            dad = new OracleDataAdapter(cmd);
            dad.Fill(dsAccessSupplier);
            return dsAccessSupplier;
        }

        public DataSet GetChildPortSpeeds(int CaseID)
        {
            OracleCommand cmd = new OracleCommand("Select * From Csu_Case_Port_Access_Speeds A Where Case_Id=" + CaseID + " And Valid_Cd=1 AND EXISTS(SELECT 1 FROM CSU_CASE_DETAILS B WHERE A.CASE_ID=B.CASE_ID AND A.PORT_SPEED_CHAR_ID=B.CHAR_ID AND B.CASE_DETAIL_VALID_CD=1)", con);

            DataSet dsChildPortSpeeds = new DataSet();
            dad = new OracleDataAdapter(cmd);
            dad.Fill(dsChildPortSpeeds);
            return dsChildPortSpeeds;
        }

        public DataSet GetTechnologyPortSpeeds(int ProductID, int CountryID, int PackageID, int Type)
        {
            string strQry = "";
            if (Type == 1) //HVPN
            {
                strQry = "Select count(*) From Cla_Product_Cases A, Cla_Product_Packages B, Cla_Product_Port_Types C Where A.Product_Cd = " + ProductID + " And A.Country_Id = " + CountryID + " And A.Case_Valid_Cd = 1 And A.Case_Id = B.Case_Id And B.Package_Id = " + PackageID + " And B.Case_Id = C.Case_Id And B.Case_Pkg_Id = C.Case_Pkg_Id and C.Port_Type_Valid_Cd = 1";
            }
            else if (Type == 2) // DSL
            {
                strQry = "Select count(*) From Cla_Product_Cases A, Cla_Product_Packages B, Cla_Product_Port_Types C Where A.Product_Cd = " + ProductID + " And A.Country_Id = " + CountryID + "  And A.Case_Valid_Cd = 1 And A.Case_Id = B.Case_Id And B.Package_Id != 22861 And B.Case_Id = C.Case_Id And B.Case_Pkg_Id = C.Case_Pkg_Id and C.Port_Type_Valid_Cd = 1";
            }
            else if (Type == 3) // DSL
            {
                strQry = "Select count(*)  From Cla_Product_Cases A, Cla_Product_Packages B, Cla_Product_Port_Types C Where A.Product_Cd = " + ProductID + " And A.Country_Id = " + CountryID + " And A.Case_Valid_Cd = 1 And A.Case_Id = B.Case_Id And B.Package_Id = " + PackageID + " And B.Case_Id = C.Case_Id And B.Case_Pkg_Id = C.Case_Pkg_Id and C.Access_Product_Type_Id = 5802 and C.Port_Type_Valid_Cd = 1";

            }

            OracleCommand cmd = new OracleCommand(strQry, con);

            DataSet dsChildPortSpeeds = new DataSet();
            dad = new OracleDataAdapter(cmd);
            dad.Fill(dsChildPortSpeeds);
            return dsChildPortSpeeds;
        }

        public Hashtable GetUserInformation(int CaseID, string TableName)
        {
            OracleCommand cmd = new OracleCommand(" SELECT CD.UPDATED_EMP_ID,U1.User_name AS UpdatedBy, TO_CHAR(CD.UPDATED_DT,'DD-MON-YYYY HH:MI:SS AM') AS UPDATED_DT FROM " + TableName + " CD LEFT JOIN CSU_USER U ON CD.CREATED_EMP_ID=U.EMP_ID LEFT JOIN CSU_USER U1 ON CD.UPDATED_EMP_ID=U1.EMP_ID WHERE CD.Case_id = " + CaseID + " order by CD.updated_dt desc", con);

            DataSet dsUserInfo = new DataSet();
            dad = new OracleDataAdapter(cmd);
            dad.Fill(dsUserInfo);
            Hashtable ht = new Hashtable();
            if (dsUserInfo != null && dsUserInfo.Tables.Count > 0 && dsUserInfo.Tables[0].Rows.Count > 0)
            {
                for (int i = 0; i < dsUserInfo.Tables[0].Rows.Count; i++)
                {
                    if (dsUserInfo.Tables[0].Rows[i]["UpdatedBy"].ToString() != "")
                    {
                        ht.Add("UpdatedByDate", dsUserInfo.Tables[0].Rows[i]["UPDATED_DT"].ToString());
                        ht.Add("UpdatedBy", dsUserInfo.Tables[0].Rows[i]["UpdatedBy"].ToString());
                        ht.Add("UpdatedByID", dsUserInfo.Tables[0].Rows[i]["UPDATED_EMP_ID"].ToString());
                        break;
                    }
                }
            }

            cmd = new OracleCommand(" SELECT CD.CREATED_EMP_ID,U.User_name AS CreatedBy, TO_CHAR(CD.CREATED_DT,'DD-MON-YYYY HH:MI:SS AM') AS CREATED_DT  FROM " + TableName + " CD LEFT JOIN CSU_USER U ON CD.CREATED_EMP_ID=U.EMP_ID LEFT JOIN CSU_USER U1 ON CD.UPDATED_EMP_ID=U1.EMP_ID WHERE CD.Case_id = " + CaseID + " order by CREATED_DT ASC", con);

            DataSet dsUserInfo1 = new DataSet();
            dad = new OracleDataAdapter(cmd);
            dad.Fill(dsUserInfo1);
            if (dsUserInfo1 != null && dsUserInfo1.Tables.Count > 0 && dsUserInfo1.Tables[0].Rows.Count > 0)
            {

                for (int i = 0; i < dsUserInfo1.Tables[0].Rows.Count; i++)
                {
                    if (dsUserInfo1.Tables[0].Rows[i]["CreatedBy"].ToString() != "")
                    {
                        ht.Add("CreatedByDate", dsUserInfo1.Tables[0].Rows[i]["CREATED_DT"].ToString());
                        ht.Add("CreatedBy", dsUserInfo1.Tables[0].Rows[i]["CreatedBy"].ToString());
                        ht.Add("CreatedByID", dsUserInfo1.Tables[0].Rows[i]["CREATED_EMP_ID"].ToString());
                        break;
                    }
                }
            }


            return ht;
        }


        public DataSet GetNotesPriority(int ProductID)
        {
            OracleCommand cmd = new OracleCommand(" select nvl(region_id,0) as region_id,nvl(country_id,0) as country_id, nvl(city_id,0) as city_id, note_priority_cd from csu_notes where product_cd = " + ProductID + " and note_category_cd < 4 order by region_id, country_id, city_id, note_priority_cd ", con);

            DataSet notepriority = new DataSet();
            dad = new OracleDataAdapter(cmd);
            dad.Fill(notepriority);
            return notepriority;
        }

        public DataSet GetCPESupplierDetails(int CountryID)
        {
            OracleCommand cmd = new OracleCommand("select supplier as supplierID, supplier_name as SupplierName from vw_cpe_country_validity where country_validity=1 and country=" + CountryID + " and supplier_type <> 'Aggregator' and ROWNUM <= 1", con);

            DataSet CPEData = new DataSet();
            dad = new OracleDataAdapter(cmd);
            dad.Fill(CPEData);
            return CPEData;
        }
    }
}
