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
    public class HVPNDAL
    {
        OracleConnection oConn = new OracleConnection(ConfigurationManager.AppSettings.Get("OraConnString"));

        public DataSet GetParentCaseID(int RegionID, int CountryID, int ProductID)
        {

            string Sql = "select CASE_ID from CLA_PRODUCT_CASES where REGION_ID = " + RegionID + " and COUNTRY_ID = " + CountryID + " and CASE_VALID_CD = 1 and PRODUCT_CD = " + ProductID;
            OracleCommand cmd = new OracleCommand(Sql, oConn);

            return ExecuteDataSet(cmd);
        }

        public DataSet GetPackages(int ProductID, int CaseID, int ParentProductID, int ParentCaseID,int AccessSupplierID)
        {
            string Sql = "select distinct vc.CHAR_NAME,vc.CHAR_ID,pkg.PACKAGE_ID,pkg.CASE_PKG_ID from CLA_PRODUCT_PACKAGES pkg,CSU_REF_VALID_CHAR vc, CLA_PRODUCT_PORT_TYPES pt, cla_product_access_type a where pkg.CASE_ID = " + CaseID + " and pkg.PACKAGE_ID = vc.CHAR_ID and pkg.CASE_PKG_ID = pt.CASE_PKG_ID and pkg.CASE_ID = pt.CASE_ID and pt.PORT_TYPE_VALID_CD = 1 and pt.ACCESS_PRODUCT_TYPE_ID = a.ACCESS_PRODUCT_TYPE_ID and a.PRODUCT_CD = " + ProductID + " and VALID_CD = 1";
            //if (AccessSupplierID > 0)
            //    Sql += " AND pt.ACCESS_SUPPLIER_CHAR_ID =" + AccessSupplierID;
            Sql += " Union ";
            Sql += " select distinct vc.CHAR_NAME,vc.CHAR_ID,pkg.PACKAGE_ID,pkg.CASE_PKG_ID from CLA_PRODUCT_PACKAGES pkg,CSU_REF_VALID_CHAR vc, CLA_PRODUCT_PORT_TYPES pt, cla_product_access_type a where 1=1 ";

            if (ParentCaseID > 0)
                Sql += " AND pkg.CASE_ID =" + ParentCaseID;
            //if (AccessSupplierID > 0)
            //    Sql += " AND pt.ACCESS_SUPPLIER_CHAR_ID =" + AccessSupplierID;

            Sql += " and pkg.PACKAGE_ID = vc.CHAR_ID and pkg.CASE_PKG_ID = pt.CASE_PKG_ID and pkg.CASE_ID = pt.CASE_ID and pt.PORT_TYPE_VALID_CD = 1 and pt.ACCESS_PRODUCT_TYPE_ID = a.ACCESS_PRODUCT_TYPE_ID and a.PRODUCT_CD = " + ParentProductID + " and VALID_CD = 1 order by 1";

            if (AccessSupplierID > 0 && ProductID > 0 && ParentProductID==0)
            {
                Sql = "SELECT DISTINCT VC.CHAR_NAME,VC.CHAR_ID,PKG.PACKAGE_ID,PKG.CASE_PKG_ID FROM CLA_PRODUCT_PACKAGES PKG,CSU_REF_VALID_CHAR VC, CLA_PRODUCT_PORT_TYPES PT, CLA_PRODUCT_ACCESS_TYPE A WHERE PKG.CASE_ID = " + CaseID + " AND PKG.PACKAGE_ID = VC.CHAR_ID AND PKG.CASE_PKG_ID = PT.CASE_PKG_ID AND PKG.CASE_ID = PT.CASE_ID AND PT.PORT_TYPE_VALID_CD = 1 AND PT.ACCESS_PRODUCT_TYPE_ID = A.ACCESS_PRODUCT_TYPE_ID AND A.PRODUCT_CD = " + ProductID + " AND VALID_CD = 1 AND PT.ACCESS_SUPPLIER_CHAR_ID =" + AccessSupplierID;
            }
            else if (AccessSupplierID > 0 && ProductID > 0 && ParentProductID > 0)
            {
                Sql = "SELECT DISTINCT VC.CHAR_NAME,VC.CHAR_ID,PKG.PACKAGE_ID,PKG.CASE_PKG_ID FROM CLA_PRODUCT_PACKAGES PKG,CSU_REF_VALID_CHAR VC, CLA_PRODUCT_PORT_TYPES PT, CLA_PRODUCT_ACCESS_TYPE A WHERE PKG.CASE_ID = " + ParentCaseID + " AND PKG.PACKAGE_ID = VC.CHAR_ID AND PKG.CASE_PKG_ID = PT.CASE_PKG_ID AND PKG.CASE_ID = PT.CASE_ID AND PT.PORT_TYPE_VALID_CD = 1 AND PT.ACCESS_PRODUCT_TYPE_ID = A.ACCESS_PRODUCT_TYPE_ID AND A.PRODUCT_CD = " + ProductID + " AND VALID_CD = 1 AND PT.ACCESS_SUPPLIER_CHAR_ID =" + AccessSupplierID;
            }


            OracleCommand cmd = new OracleCommand(Sql, oConn);

            return ExecuteDataSet(cmd);

        }

        public DataSet GetAccessSuppliers(int ProductID, int CaseID, int ParentProductID, int ParentCaseID, int PackageID,string PackageIds)
        {
            string Sql = "select vc.CHAR_NAME,pt.ACCESS_SUPPLIER_CHAR_ID from CSU_REF_VALID_CHAR vc,CLA_PRODUCT_PORT_TYPES pt,CLA_PRODUCT_PACKAGES pkg, cla_product_access_type a where pkg.CASE_ID = " + CaseID + " and pkg.VALID_CD = 1 and pkg.CASE_ID = pt.CASE_ID and pkg.CASE_PKG_ID = pt.CASE_PKG_ID and pt.ACCESS_SUPPLIER_CHAR_ID = vc.CHAR_ID And a.ACCESS_PRODUCT_TYPE_ID not in (5802) and pt.ACCESS_PRODUCT_TYPE_ID = a.ACCESS_PRODUCT_TYPE_ID and a.PRODUCT_CD = " + ProductID;
            if(PackageID>0)
            {
                Sql += " and pkg.PACKAGE_ID = " + PackageID;
            }
            else
            {
                Sql += " and pkg.PACKAGE_ID IN (" + PackageIds + ")";
            }
            Sql += " and pt.PORT_TYPE_VALID_CD = 1";
            Sql += " Union ";
            Sql += "select vc.CHAR_NAME,pt.ACCESS_SUPPLIER_CHAR_ID from CSU_REF_VALID_CHAR vc,CLA_PRODUCT_PORT_TYPES pt,CLA_PRODUCT_PACKAGES pkg, cla_product_access_type a where pkg.CASE_ID = " + ParentCaseID + " and pkg.VALID_CD = 1 and pkg.CASE_ID = pt.CASE_ID and pkg.CASE_PKG_ID = pt.CASE_PKG_ID and pt.ACCESS_SUPPLIER_CHAR_ID = vc.CHAR_ID And a.ACCESS_PRODUCT_TYPE_ID not in (5802) and pt.ACCESS_PRODUCT_TYPE_ID = a.ACCESS_PRODUCT_TYPE_ID and a.PRODUCT_CD = " + ParentProductID;
            if(PackageID>0)
            {
                Sql += " and pkg.PACKAGE_ID = " + PackageID;
            }
            else
            {
                Sql += " and pkg.PACKAGE_ID IN (" + PackageIds+")";
            }

            Sql += " and pt.PORT_TYPE_VALID_CD = 1 order by 1 ";

            OracleCommand cmd = new OracleCommand(Sql, oConn);

            return ExecuteDataSet(cmd);

        }

        public DataSet GetHVPNPortSpeeds(int CaseID, int ParentCaseID, int PackageID, int CountryID, int ProductID)
        {
            string Sql = "";
            if (ProductID == 123 || ProductID == 124)
            {
                Sql = "Select distinct a.Char_Id,a.CHAR_NUM_VALUE,a.CHAR_NUM_VALUE_2,a.CHAR_UNIT_OF_MEASURE,a.CHAR_UNIT_OF_MEASURE_2,a.CHAR_ACTUAL_VALUE,A.CHAR_ACTUAL_VALUE_2 FROM CSU_REF_VALID_CHAR a, CLA_PRODUCT_PORT_TYPES pt, PORT_TO_ACCESS_SPEEDS pas,vw_sc_porttype_elements v WHERE a.CHAR_ID = pas.PORT_SPEED_CHAR_ID and pt.PORT_SPEED_CHAR_ID = pas.PORT_SPEED_CHAR_ID AND pt.PORT_TYPE_VALID_CD = 1 and v.sc_porttype_id = pt.port_type_id AND v.sc_aspeed_down_up_id = pas.access_speed_char_id AND pas.access_type_char_id = pt.access_product_type_id and pt.Case_id = " + CaseID + " and CHAR_TYPE_ID = ( SELECT DISTINCT CHAR_TYPE_ID FROM CSU_REF_CHAR_TYPE WHERE UPPER(TRIM(CHAR_TYPE_NAME)) = 'PORT SPEEDS(DOWN/UP)') AND EXISTS ( SELECT 'X' FROM cla_access_set x, cla_port_types y,cla_product_cases z, csu_config_tbl w WHERE w.fieldname = 'DSL ACCESS' AND z.product_cd = w.fieldvalue AND z.country_id = 37 AND z.case_id = x.case_id AND x.case_detail_valid_cd = 1 AND x.package_id = 22861 AND x.case_id = y.case_id AND y.port_type_valid_cd = 1 AND x.case_access_set_id = y.case_access_set_id AND x.access_supplier_char_id = pt.access_supplier_char_id AND x.access_supplier_name_id = pt.access_supplier_name_id AND x.access_product_type_id = pt.access_product_type_id AND x.gpop_interconnect = pt.gpop_interconnect AND y.port_type_id = pt.port_type_id ) Union Select distinct a.Char_Id,a.CHAR_NUM_VALUE,a.CHAR_NUM_VALUE_2,a.CHAR_UNIT_OF_MEASURE,a.CHAR_UNIT_OF_MEASURE_2,a.CHAR_ACTUAL_VALUE,A.CHAR_ACTUAL_VALUE_2 FROM CSU_REF_VALID_CHAR a, CLA_PRODUCT_PORT_TYPES pt, PORT_TO_ACCESS_SPEEDS pas,vw_sc_porttype_elements v WHERE a.CHAR_ID = pas.PORT_SPEED_CHAR_ID and pt.PORT_SPEED_CHAR_ID = pas.PORT_SPEED_CHAR_ID AND pt.PORT_TYPE_VALID_CD = 1 and v.sc_porttype_id = pt.port_type_id AND v.sc_aspeed_down_up_id = pas.access_speed_char_id AND pas.access_type_char_id = pt.access_product_type_id ";


                Sql += " AND pt.Case_id = " + CaseID;

                if (ParentCaseID > 0)
                {
                    Sql += " and pt.Case_id = " + ParentCaseID;
                }
                else
                {
                    Sql += " and pt.Case_id = " + CaseID;
                }

                Sql += " and CHAR_TYPE_ID = ( SELECT DISTINCT CHAR_TYPE_ID FROM CSU_REF_CHAR_TYPE WHERE UPPER(TRIM(CHAR_TYPE_NAME)) = 'PORT SPEEDS(DOWN/UP)') AND EXISTS ( SELECT 'X' FROM cla_access_set x, cla_port_types y,cla_product_cases z, csu_config_tbl w WHERE w.fieldname = 'DSL ACCESS' AND z.product_cd = w.fieldvalue AND z.country_id = " + CountryID + " AND z.case_id = x.case_id AND x.case_detail_valid_cd = 1 AND x.package_id = " + PackageID + " AND x.case_id = y.case_id AND y.port_type_valid_cd = 1 AND x.case_access_set_id = y.case_access_set_id AND x.access_supplier_char_id = pt.access_supplier_char_id AND x.access_supplier_name_id = pt.access_supplier_name_id AND x.access_product_type_id = pt.access_product_type_id AND x.gpop_interconnect = pt.gpop_interconnect AND y.port_type_id = pt.port_type_id ) ORDER BY 2 ASC";
            }

            Sql = "Select Distinct X.Char_Id, X.Char_Num_Value, x.CHAR_NUM_VALUE_2, x.CHAR_UNIT_OF_MEASURE,  x.CHAR_UNIT_OF_MEASURE_2, x.Char_Actual_Value,x.CHAR_ACTUAL_VALUE_2 from (SELECT a.Char_Id,  a.CHAR_NUM_VALUE,  a.CHAR_NUM_VALUE_2, a.CHAR_UNIT_OF_MEASURE, a.CHAR_UNIT_OF_MEASURE_2, a.CHAR_ACTUAL_VALUE,A.CHAR_ACTUAL_VALUE_2 FROM CSU_REF_VALID_CHAR a, CLA_PRODUCT_PORT_TYPES pt, PORT_TO_ACCESS_SPEEDS pas, vw_sc_porttype_elements v WHERE a.CHAR_ID = pas.PORT_SPEED_CHAR_ID AND pt.PORT_SPEED_CHAR_ID   = pas.PORT_SPEED_CHAR_ID AND pt.PORT_TYPE_VALID_CD = 1 AND v.sc_porttype_id = pt.port_type_id AND v.sc_aspeed_down_up_id  = pas.access_speed_char_id AND pas.access_type_char_id = pt.access_product_type_id ";
            if (ProductID == 123 || ProductID == 124)
            {
                Sql += " AND pt.Case_id = " + CaseID;
            }
            if (ParentCaseID > 0)
            {
                Sql += " and pt.Case_id = " + CaseID;
            }

            Sql += " And Char_Type_Id= ( SELECT DISTINCT CHAR_TYPE_ID   FROM CSU_REF_CHAR_TYPE WHERE UPPER(TRIM(CHAR_TYPE_NAME)) = 'PORT SPEEDS(DOWN/UP)' ) and pt.access_product_type_id != 5802 AND EXISTS (SELECT 'X' FROM cla_access_set x, cla_port_types y, cla_product_cases z, csu_config_tbl w WHERE w.fieldname = 'DSL ACCESS' AND z.product_cd = w.fieldvalue AND z.country_id= " + CountryID + "  AND z.case_id = x.case_id   AND x.case_detail_valid_cd    = 1  AND x.package_id = " + PackageID + "  AND x.case_id = y.case_id  AND y.port_type_valid_cd = 1  AND x.case_access_set_id      = y.case_access_set_id  AND x.access_supplier_char_id = pt.access_supplier_char_id AND x.access_supplier_name_id = pt.access_supplier_name_id AND x.access_product_type_id  = pt.access_product_type_id";
            Sql += " AND x.gpop_interconnect= pt.gpop_interconnect  AND y.port_type_id= pt.port_type_id ) ";
            Sql += " UNION ";
            Sql += " SELECT a.Char_Id,a.CHAR_NUM_VALUE,a.CHAR_NUM_VALUE_2,a.CHAR_UNIT_OF_MEASURE,a.CHAR_UNIT_OF_MEASURE_2,a.CHAR_ACTUAL_VALUE,A.CHAR_ACTUAL_VALUE_2 FROM CSU_REF_VALID_CHAR a,CLA_PRODUCT_PORT_TYPES pt,PORT_TO_ACCESS_SPEEDS pas,vw_sc_porttype_elements v WHERE a.CHAR_ID = pas.PORT_SPEED_CHAR_ID AND pt.PORT_SPEED_CHAR_ID   = pas.PORT_SPEED_CHAR_ID AND pt.PORT_TYPE_VALID_CD   = 1 AND v.sc_porttype_id        = pt.port_type_id AND v.sc_aspeed_down_up_id  = pas.access_speed_char_id AND pas.access_type_char_id = pt.access_product_type_id ";

            if (ProductID == 123 || ProductID == 124)
            {
                Sql += " AND pt.Case_id = " + CaseID;
            }
            if (ParentCaseID > 0)
            {
                Sql += " and pt.Case_id = " + ParentCaseID;
            }

            Sql += " And Char_Type_Id = ( SELECT DISTINCT CHAR_TYPE_ID  FROM CSU_REF_CHAR_TYPE   WHERE UPPER(TRIM(CHAR_TYPE_NAME)) = 'PORT SPEEDS(DOWN/UP)' ) and pt.access_product_type_id != 5802 AND EXISTS (SELECT 'X'  FROM cla_access_set x,cla_port_types y,cla_product_cases z,csu_config_tbl w  WHERE w.fieldname = 'DSL ACCESS'  AND z.product_cd= w.fieldvalue  AND z.country_id = " + CountryID + " AND z.case_id= x.case_id  AND x.case_detail_valid_cd    = 1   AND x.package_id = " + PackageID + " AND x.case_id = y.case_id  AND y.port_type_valid_cd      = 1  AND x.case_access_set_id      = y.case_access_set_id  AND x.access_supplier_char_id = pt.access_supplier_char_id  AND x.access_supplier_name_id = pt.access_supplier_name_id  AND x.access_product_type_id  = pt.access_product_type_id  AND x.gpop_interconnect = pt.gpop_interconnect  AND y.port_type_id = pt.port_type_id  )  ) x ORDER BY 2,3 ASC";



            OracleCommand cmd = new OracleCommand(Sql, oConn);

            return ExecuteDataSet(cmd);

        }

        public DataSet GetVSATPortSpeeds(int CaseID, int ParentCaseID, int PackageID, int CountryID, int ProductID)
        {
            string Sql = "Select Distinct X.Char_Id,X.Char_Num_Value,x.CHAR_NUM_VALUE_2,x.CHAR_UNIT_OF_MEASURE,x.CHAR_UNIT_OF_MEASURE_2,x.Char_Actual_Value,x.CHAR_ACTUAL_VALUE_2 from (SELECT a.Char_Id,a.CHAR_NUM_VALUE,a.CHAR_NUM_VALUE_2,a.CHAR_UNIT_OF_MEASURE,a.CHAR_UNIT_OF_MEASURE_2,a.CHAR_ACTUAL_VALUE,A.CHAR_ACTUAL_VALUE_2 FROM CSU_REF_VALID_CHAR a,CLA_PRODUCT_PORT_TYPES pt,PORT_TO_ACCESS_SPEEDS pas, vw_sc_porttype_elements v WHERE a.CHAR_ID = pas.PORT_SPEED_CHAR_ID AND pt.PORT_SPEED_CHAR_ID = pas.PORT_SPEED_CHAR_ID AND pt.PORT_TYPE_VALID_CD   = 1 AND v.sc_porttype_id = pt.port_type_id AND v.sc_aspeed_down_up_id  = pas.access_speed_char_id AND pas.access_type_char_id = pt.access_product_type_id And Pt.Case_Id = " + CaseID + " And Char_Type_Id = ( SELECT DISTINCT CHAR_TYPE_ID   FROM CSU_REF_CHAR_TYPE  WHERE UPPER(TRIM(CHAR_TYPE_NAME)) = 'PORT SPEEDS(DOWN/UP)'  ) and pt.access_product_type_id = 5802 AND EXISTS (SELECT 'X' FROM cla_access_set x, cla_port_types y, cla_product_cases z, csu_config_tbl w WHERE w.fieldname = 'DSL ACCESS'  AND z.product_cd = w.fieldvalue   AND z.country_id = " + CountryID + "  AND z.case_id = x.case_id   AND x.case_detail_valid_cd    = 1  AND x.package_id = " + PackageID + " AND x.case_id  = y.case_id AND y.port_type_valid_cd = 1 AND x.case_access_set_id = y.case_access_set_id AND x.access_supplier_char_id = pt.access_supplier_char_id AND x.access_supplier_name_id = pt.access_supplier_name_id AND x.access_product_type_id  = pt.access_product_type_id AND x.gpop_interconnect = pt.gpop_interconnect AND y.port_type_id = pt.port_type_id ) ";
            Sql += " UNION ";
            Sql += " SELECT a.Char_Id,a.CHAR_NUM_VALUE,a.CHAR_NUM_VALUE_2,a.CHAR_UNIT_OF_MEASURE,a.CHAR_UNIT_OF_MEASURE_2,a.CHAR_ACTUAL_VALUE,A.CHAR_ACTUAL_VALUE_2 FROM CSU_REF_VALID_CHAR a, CLA_PRODUCT_PORT_TYPES pt,  PORT_TO_ACCESS_SPEEDS pas, vw_sc_porttype_elements v WHERE a.CHAR_ID = pas.PORT_SPEED_CHAR_ID AND pt.PORT_SPEED_CHAR_ID = pas.PORT_SPEED_CHAR_ID AND pt.PORT_TYPE_VALID_CD = 1 AND v.sc_porttype_id = pt.port_type_id AND v.sc_aspeed_down_up_id  = pas.access_speed_char_id AND pas.access_type_char_id = pt.access_product_type_id ";
            if (ParentCaseID > 0)
            {
                Sql += " and pt.Case_id = " + ParentCaseID;
            }

            Sql += " And Char_Type_Id = ( SELECT DISTINCT CHAR_TYPE_ID  FROM CSU_REF_CHAR_TYPE   WHERE UPPER(TRIM(CHAR_TYPE_NAME)) = 'PORT SPEEDS(DOWN/UP)' ) and pt.access_product_type_id = 5802 AND EXISTS (SELECT 'X' FROM cla_access_set x, cla_port_types y, cla_product_cases z, csu_config_tbl w WHERE w.fieldname = 'DSL ACCESS' AND z.product_cd  = w.fieldvalue   AND z.country_id = " + CountryID + " AND z.case_id = x.case_id AND x.case_detail_valid_cd    = 1 AND x.package_id = " + PackageID + " AND x.case_id = y.case_id AND y.port_type_valid_cd = 1 AND x.case_access_set_id = y.case_access_set_id AND x.access_supplier_char_id = pt.access_supplier_char_id AND x.access_supplier_name_id = pt.access_supplier_name_id AND x.access_product_type_id  = pt.access_product_type_id AND x.gpop_interconnect = pt.gpop_interconnect AND y.port_type_id  = pt.port_type_id  )) x ORDER BY 2,3 ASC";

            OracleCommand cmd = new OracleCommand(Sql, oConn);

            return ExecuteDataSet(cmd);

        }

        public DataSet GetPortSpeedNames(string PortSpeedid)
        {
            string Sql = "SELECT CHAR_ID,char_actual_value || ' ' || NVL (char_unit_of_measure, 'kbps') || ' / '|| CHAR_ACTUAL_VALUE_2 || ' '|| NVL (CHAR_UNIT_OF_MEASURE_2, 'kbps') AS portspeed FROM csu_ref_valid_char  WHERE CHAR_ID IN (" + PortSpeedid + ")";

            OracleCommand cmd = new OracleCommand(Sql, oConn);

            return ExecuteDataSet(cmd);

        }


        public DataSet GetPortSpeedNames(int CharID, int CaseID)
        {
            string Sql = "SELECT Distinct A.CHAR_ID,a.char_actual_value, a.char_actual_value_2, a.char_unit_of_measure,a.char_unit_of_measure_2 from csu_ref_valid_char a,port_to_access_speeds pas, cla_product_port_types pt where pt.case_id= " + CaseID + " and a.CHAR_ID = pas.PORT_SPEED_CHAR_ID and pt.PORT_SPEED_CHAR_ID = pas.PORT_SPEED_CHAR_ID and a.char_id = " + CharID;

            OracleCommand cmd = new OracleCommand(Sql, oConn);

            return ExecuteDataSet(cmd);

        }


        public string GenerateTunnelingNote(string strCountryName)
        {
            string strsql = "select decode(split_tunneling,'Yes','Available','Not Available') as split_tunneling from v_pc_hvpn_service_gateway ";
            strsql = strsql + " WHERE country = '" + strCountryName.Replace("'", "''") + "' ";
            OracleCommand cmd = new OracleCommand(strsql, oConn);
            DataSet dsTunnelingNote = ExecuteDataSet(cmd);
            string strResult = "";
            if (dsTunnelingNote != null && dsTunnelingNote.Tables.Count > 0 && dsTunnelingNote.Tables[0].Rows.Count > 0)
            {
                strResult =  dsTunnelingNote.Tables[0].Rows[0]["split_tunneling"].ToString();
            }
            return strResult;
        }

        public DataSet GetRegionCountryName(int RegionID, int CountryID, int ProductID)
        {

            string strsql = " select p.PRODUCT_NAME,r.REGION_NAME,c.COUNTRY_NAME from csu_product p,csu_region r,csu_country c ";
            strsql = strsql + " where r.REGION_ID = " + RegionID + " and c.COUNTRY_ID = " + CountryID + " and p.PRODUCT_CD = " + ProductID;
            OracleCommand cmd = new OracleCommand(strsql, oConn);
            return ExecuteDataSet(cmd);


        }

        public DataSet GetProductBundlesForCountry(int ProductID, int CountryID)
        {
            ////string strsql = " select distinct a.CHAR_ID, a.CHAR_NAME, a.CHAR_TYPE_ID, a.CHAR_DESC, a.CHAR_UNIT_OF_MEASURE, a.CREATED_EMP_ID, a.CREATED_DT, a.UPDATED_EMP_ID, a.UPDATED_DT, a.CHAR_ACTUAL_VALUE, a.CHAR_UPPER_RANGE, a.CHAR_LOWER_RANGE, a.CHAR_VALID_CD, a.CHAR_NUM_VALUE, a.CHAR_ACTUAL_VALUE_2, a.CHAR_UNIT_OF_MEASURE_2, a.CHAR_NUM_VALUE_2 FROM CSU_REF_VALID_CHAR a where a.CHAR_VALID_CD = 1 and a.CHAR_ID in (SELECT DISTINCT h.ID FROM csu_cpe_product_bndls e, CSU_CPE_CNTRY_BNDLS_ACCTYPE f, csu_cpe_routers g, csu_cpe_bndls h WHERE e.bundle_id = f.bundle_id AND g.ID = h.router_id AND e.bundle_id = h.ID and TRUNC(nvl(h.EOQ_DATE,sysdate)) >= TRUNC(sysdate) and TRUNC(nvl(g.ROUTER_EOQ_DATE,sysdate)) >= TRUNC(sysdate) and f.COUNTRY_ID = "+CountryID+" and e.PRODUCT_CD = "+ProductID+") ORDER BY a.CHAR_NAME";
            ////string strsql = " select distinct a.CHAR_ID, b.access_type,c.char_name as access_type_name,a.CHAR_NAME as bundle_name, a.CHAR_TYPE_ID, a.CHAR_DESC, a.CHAR_UNIT_OF_MEASURE, a.CREATED_EMP_ID, a.CREATED_DT,a.UPDATED_EMP_ID, a.UPDATED_DT, a.CHAR_ACTUAL_VALUE, a.CHAR_UPPER_RANGE, a.CHAR_LOWER_RANGE, a.CHAR_VALID_CD, a.CHAR_NUM_VALUE, a.CHAR_ACTUAL_VALUE_2, a.CHAR_UNIT_OF_MEASURE_2, a.CHAR_NUM_VALUE_2 from CSU_REF_VALID_CHAR a, CSU_CPE_CNTRY_BNDLS_ACCTYPE B, CSU_REF_VALID_CHAR C where a.CHAR_ID=B.BUNDLE_ID and B.COUNTRY_ID=" + CountryID + " and B.ACCESS_TYPE=C.CHAR_ID and a.CHAR_VALID_CD = 1 and  a.CHAR_ID in (select distinct H.id from CSU_CPE_PRODUCT_BNDLS E, CSU_CPE_CNTRY_BNDLS_ACCTYPE F, CSU_CPE_ROUTERS G, CSU_CPE_BNDLS H  where E.BUNDLE_ID = F.BUNDLE_ID and G.id = H.ROUTER_ID and E.BUNDLE_ID = H.id and TRUNC(NVL(H.EOQ_DATE,sysdate)) >= TRUNC(sysdate) and TRUNC(NVL(G.ROUTER_EOQ_DATE,sysdate)) >= TRUNC(sysdate) and F.COUNTRY_ID = " + CountryID + " and E.PRODUCT_CD = " + ProductID + ")  ORDER BY A.CHAR_NAME";
            //string strsql = " select distinct a.CHAR_ID, b.access_type,c.char_name as access_type_name,D.ROUTER_ID,E.CHAR_NAME AS ROUTER_NAME,a.CHAR_NAME as bundle_name, a.CHAR_TYPE_ID, a.CHAR_DESC, a.CHAR_UNIT_OF_MEASURE, a.CREATED_EMP_ID, a.CREATED_DT, a.UPDATED_EMP_ID, a.UPDATED_DT, a.CHAR_ACTUAL_VALUE, a.CHAR_UPPER_RANGE, a.CHAR_LOWER_RANGE, a.CHAR_VALID_CD, a.CHAR_NUM_VALUE, a.CHAR_ACTUAL_VALUE_2, a.CHAR_UNIT_OF_MEASURE_2, a.CHAR_NUM_VALUE_2 from CSU_REF_VALID_CHAR a, CSU_CPE_CNTRY_BNDLS_ACCTYPE B, CSU_REF_VALID_CHAR C, CSU_CPE_BNDLS D, CSU_REF_VALID_CHAR E where a.CHAR_ID=B.BUNDLE_ID and B.COUNTRY_ID="+CountryID+" and B.ACCESS_TYPE=C.CHAR_ID and D.id=B.BUNDLE_ID AND D.ROUTER_ID=E.CHAR_ID  and a.CHAR_VALID_CD = 1 and a.CHAR_ID in (select distinct H.id from CSU_CPE_PRODUCT_BNDLS E, CSU_CPE_CNTRY_BNDLS_ACCTYPE F, CSU_CPE_ROUTERS G, CSU_CPE_BNDLS H  where E.BUNDLE_ID = F.BUNDLE_ID and G.id = H.ROUTER_ID and E.BUNDLE_ID = H.id and TRUNC(NVL(H.EOQ_DATE,sysdate)) >= TRUNC(sysdate) and TRUNC(NVL(G.ROUTER_EOQ_DATE,sysdate)) >= TRUNC(sysdate) and F.COUNTRY_ID = "+CountryID+" and E.PRODUCT_CD = "+ProductID+")  order by a.CHAR_NAME";

            StringBuilder strsql = new StringBuilder();


            strsql.Append("SELECT c.char_name AS bundlename,c.char_id AS bundleid,");

            strsql.Append(" (SELECT char_name FROM csu_ref_valid_char b WHERE b.char_id = router_id) routername,");
            //strsql.Append(" (SELECT listagg (SUBSTR(char_name, instr(char_name,' ',1,2)), ',') WITHIN GROUP (");
            strsql.Append(" (SELECT listagg (Reverse(SUBSTR(Reverse(char_name),1, instr(Reverse(char_name),'htiw')-1)), ',') WITHIN GROUP (");
            strsql.Append(" ORDER BY char_id)");
            strsql.Append(" From Csu_Ref_Valid_Char");
            strsql.Append(" WHERE char_id IN");
            strsql.Append("   (SELECT DISTINCT Access_type");
            strsql.Append("   FROM CSU_CPE_CNTRY_BNDLS_ACCTYPE");
            strsql.Append("   WHERE bundle_id = x.xid");
            strsql.Append("   AND COUNTRY_ID  = " + CountryID);
            strsql.Append("   )");
            strsql.Append(" And (Upper(Char_Name)   Like '%DSL%'");
            strsql.Append(" Or Upper(Char_Name)  Like '%HVPN%'");
            strsql.Append(" Or Upper(Char_Name)  Like '%FTT%'");
            strsql.Append(" Or Upper(Char_Name)  Like '%VSAT%')");
            strsql.Append(" and char_valid_cd = 1");
            strsql.Append(" ) AccessTech,");
            strsql.Append(" PARTIAL_BNDL_FLAG,");
            strsql.Append(" DECODE(TO_CHAR(expected_date,'DD-MON-YYYY'),'31-DEC-4712','',TO_CHAR(expected_date, 'DD-MON-YYYY'))            AS EXPECTED_DATE,");
            strsql.Append(" DECODE(TO_CHAR(quotable_start_date,'DD-MON-YYYY'),'31-DEC-4712','',TO_CHAR(quotable_start_date,'DD-MON-YYYY')) AS QUOTABLEDT,");
            strsql.Append(" DECODE(TO_CHAR(eos_date,'DD-MON-YYYY'),'31-DEC-4712','',TO_CHAR(eos_date,'DD-MON-YYYY'))                       AS EOSDT,");
            strsql.Append(" DECODE(TO_CHAR(eoq_date,'DD-MON-YYYY'),'31-DEC-4712','',TO_CHAR(eoq_date,'DD-MON-YYYY'))                       AS EOQDT,");
            strsql.Append(" DECODE(TO_CHAR(eol_date,'DD-MON-YYYY'),'31-DEC-4712','',TO_CHAR(eol_date,'DD-MON-YYYY'))                       AS EOLDT,");
            strsql.Append(" (SELECT DISTINCT SMART_SERVICE_AVAIL");
            strsql.Append(" FROM CSU_CPE_CNTRY_SUPP");
            strsql.Append(" WHERE product_id = " + ProductID);
            strsql.Append(" AND country_id   = " + CountryID);
            strsql.Append(" AND rownum      <=1");
            strsql.Append(" ) SMARTSERVICEAVIL");
            strsql.Append(" FROM CSU_CPE_BNDLS,");
            strsql.Append(" (SELECT DISTINCT h.ID AS xid");
            strsql.Append(" FROM csu_cpe_product_bndls e,");
            strsql.Append("   CSU_CPE_CNTRY_BNDLS_ACCTYPE f,");
            strsql.Append("   csu_cpe_routers g,");
            strsql.Append("   csu_cpe_bndls h");
            strsql.Append(" WHERE e.bundle_id = f.bundle_id");
            strsql.Append(" AND g.ID = h.router_id");
            strsql.Append(" AND e.bundle_id   = h.ID");
            strsql.Append(" AND TRUNC(NVL(h.EOQ_DATE,sysdate))        >= TRUNC(sysdate)");
            strsql.Append(" AND TRUNC(NVL(g.ROUTER_EOQ_DATE,sysdate)) >= TRUNC(sysdate)");
            strsql.Append(" AND f.COUNTRY_ID =" + CountryID);
            strsql.Append(" AND e.PRODUCT_CD =" + ProductID);
            strsql.Append(" ) x,");
            strsql.Append(" csu_ref_valid_char c");
            strsql.Append(" WHERE c.char_id     = id");
            strsql.Append(" And C.Char_Valid_Cd = 1");
            strsql.Append(" And Id              = X.Xid");
            strsql.Append(" and   (SELECT listagg (SUBSTR(char_name, instr(char_name,' ',1,2)), ',') WITHIN GROUP (");
            strsql.Append("  ORDER BY char_name)");
            strsql.Append("  From Csu_Ref_Valid_Char");
            strsql.Append("  WHERE char_id IN");
            strsql.Append(" (SELECT DISTINCT Access_type");
            strsql.Append(" FROM CSU_CPE_CNTRY_BNDLS_ACCTYPE");
            strsql.Append("  WHERE bundle_id = x.xid");
            strsql.Append("  AND COUNTRY_ID  = " + CountryID);
            strsql.Append(" )");
            strsql.Append("  And (Upper(Char_Name)   Like '%DSL%'");
            strsql.Append("  Or Upper(Char_Name)  Like '%HVPN%'");
            strsql.Append("  Or Upper(Char_Name)  Like '%FTT%'");
            strsql.Append("  Or Upper(Char_Name)  Like '%VSAT%')");
            strsql.Append("  ) is not null");

            OracleCommand cmd = new OracleCommand(strsql.ToString(), oConn);
            return ExecuteDataSet(cmd);
        }

        public DataSet GetBundleAccessTypes(int CharID, int CountryCode)
        {
            string strsql = " select distinct access_type from CSU_CPE_CNTRY_BNDLS_ACCTYPE where bundle_id = " + CharID + " and country_id =" + CountryCode;
            OracleCommand cmd = new OracleCommand(strsql, oConn);
            return ExecuteDataSet(cmd);
        }

        public DataSet GetBundleAccessTypes(string CharIDs, int CountryCode)
        {
            string strsql = " select distinct access_type from CSU_CPE_CNTRY_BNDLS_ACCTYPE where bundle_id IN (" + CharIDs + ") and country_id =" + CountryCode;
            OracleCommand cmd = new OracleCommand(strsql, oConn);
            return ExecuteDataSet(cmd);
        }

        public DataSet GetAccessTechnology(int CharID)
        {
            string strsql = "SELECT CHAR_NAME FROM CSU_REF_VALID_CHAR WHERE CHAR_ID = " + CharID;
            OracleCommand cmd = new OracleCommand(strsql, oConn);
            return ExecuteDataSet(cmd);
        }

        public DataSet GetAccessTechnology(string CharIDs)
        {
            string strsql = "SELECT CHAR_NAME FROM CSU_REF_VALID_CHAR WHERE CHAR_ID IN (" + CharIDs + ")";
            OracleCommand cmd = new OracleCommand(strsql, oConn);
            return ExecuteDataSet(cmd);
        }

        public DataSet GetBundleDetails(int CharID)
        {
            string strsql = "select partial_bndl_flag, decode(to_char(expected_date,'DD-MON-YYYY'),'31-DEC-4712',' ',to_char(expected_date, 'DD-MON-YYYY')) as expected_date,decode(to_char(quotable_start_date,'DD-MON-YYYY'),'31-DEC-4712',' ',to_char(quotable_start_date,'DD-MON-YYYY')) as quotabledt,decode(to_char(eos_date,'DD-MON-YYYY'),'31-DEC-4712',' ',to_char(eos_date,'DD-MON-YYYY')) eosdt, decode(to_char(eoq_date,'DD-MON-YYYY'),'31-DEC-4712',' ',to_char(eoq_date,'DD-MON-YYYY')) eoqdt, decode(to_char(eol_date,'DD-MON-YYYY'),'31-DEC-4712',' ',to_char(eol_date,'DD-MON-YYYY')) EOLDT FROM CSU_CPE_BNDLS WHERE ID=" + CharID;
            OracleCommand cmd = new OracleCommand(strsql, oConn);
            return ExecuteDataSet(cmd);
        }

        public DataSet GetSmartService(int ProductID, int CountryID)
        {
            string strsql = "select COUNTRY_ID,SUPPLIER_ID,PRODUCT_ID,SMART_SERVICE_AVAIL from CSU_CPE_CNTRY_SUPP where product_id = " + ProductID + " and country_id =" + CountryID;
            OracleCommand cmd = new OracleCommand(strsql, oConn);
            return ExecuteDataSet(cmd);
        }


        public DataSet GetRouterName(int BundleID)
        {
            string strsql = "SELECT ROUTER_ID FROM CSU_CPE_BNDLS WHERE ID =" + BundleID;
            OracleCommand cmd = new OracleCommand(strsql, oConn);
            DataSet dsRouter = ExecuteDataSet(cmd);
            DataSet dsRouterName = new DataSet();
            if (dsRouter != null && dsRouter.Tables.Count > 0 && dsRouter.Tables[0].Rows.Count > 0)
            {
                strsql = "select CHAR_NAME,CHAR_ID,CHAR_TYPE_ID,CHAR_DESC,CREATED_EMP_ID,CREATED_DT,UPDATED_EMP_ID,UPDATED_DT,CHAR_ACTUAL_VALUE,CHAR_UPPER_RANGE,CHAR_LOWER_RANGE,CHAR_VALID_CD,CHAR_NUM_VALUE,CHAR_NUM_VALUE_2,CHAR_ACTUAL_VALUE_2,CHAR_UNIT_OF_MEASURE_2,CHAR_UNIT_OF_MEASURE";
                strsql = strsql + " from CSU_REF_VALID_CHAR where CHAR_ID = " + dsRouter.Tables[0].Rows[0][0].ToString();
                cmd = null;
                cmd = new OracleCommand(strsql, oConn);
                dsRouterName = ExecuteDataSet(cmd);
            }
            return dsRouterName;
        }

        public DataSet GetPackageInfo(int CaseID, int ProductID, int PackageID)
        {

            string strsql = "select distinct vc.CHAR_NAME,vc.CHAR_ID,pkg.PACKAGE_ID,pkg.CASE_PKG_ID from CLA_PRODUCT_PACKAGES pkg,CSU_REF_VALID_CHAR vc, CLA_PRODUCT_PORT_TYPES pt, cla_product_access_type a where pkg.CASE_ID = " + CaseID + " and pkg.PACKAGE_ID = vc.CHAR_ID and pkg.CASE_PKG_ID = pt.CASE_PKG_ID and pkg.CASE_ID = pt.CASE_ID and pt.PORT_TYPE_VALID_CD = 1 and a.ACCESS_PRODUCT_TYPE_ID = pt.ACCESS_PRODUCT_TYPE_ID and a.PRODUCT_CD = " + ProductID + " and pkg.PACKAGE_ID = " + PackageID + " and VALID_CD = 1 and Upper(Trim(Char_name)) LIKE '%HYBRID%' UNion select distinct vc.CHAR_NAME,vc.CHAR_ID,pkg.PACKAGE_ID,pkg.CASE_PKG_ID from CLA_PRODUCT_PACKAGES pkg,CSU_REF_VALID_CHAR vc, CLA_PARENT_PORT_TYPES pt, cla_product_access_type a where pkg.CASE_ID = " + CaseID + " and pkg.PACKAGE_ID = vc.CHAR_ID and pkg.CASE_PKG_ID = pt.CASE_PKG_ID and pkg.CASE_ID = pt.CASE_ID and pt.PORT_TYPE_VALID_CD = 1 and a.ACCESS_PRODUCT_TYPE_ID = pt.ACCESS_PRODUCT_TYPE_ID and a.PRODUCT_CD = " + ProductID + " and pkg.PACKAGE_ID = " + PackageID + " and VALID_CD = 1 and Upper(Trim(Char_name)) LIKE '%HYBRID%' order by 1 ";
            OracleCommand cmd = new OracleCommand(strsql, oConn);
            return ExecuteDataSet(cmd);
        }

        public DataSet GetCPEInfo(int CaseID, int PortTypeID, int PackageID, int AccessSupplierNameID, int CountryID)
        {
            string sql = "select a.*,CSM.PC_SUPPLY_ID from (select distinct asm.pc_access_speed_du_id ,cim.pc_interface_id  from capman_dsl_porttype_map cpm,capman_dsl_access_speed_map asm,cla_product_port_types pt ,CAPMAN_INTERFACE_MAP CIM where pt.case_id = " + CaseID + " and pt.port_type_id = cpm.pc_porttype_id and cpm.c_speed_id = asm.c_access_speed_id and cpm.c_upstream_speed_id = asm.c_upstream_speed_id AND CPM.C_INTERFACE_ID = CIM.C_INTERFACE_ID and pt.port_type_id = " + PortTypeID + ") a,capman_dsl_supply_map csm WHERE CSM.C_SUPPLY_ID = (SELECT DISTINCT XDSL.DSL_SUPPLY_TYPE_ID FROM CSU_SUPPLIER_PRODUCT_XDSL XDSL,CAPMAN_DSL_PACKAGE_MAP CPKG,CLA_PRODUCT_PACKAGES PKG WHERE XDSL.DSL_PACKAGE_ID = CPKG.C_PACKAGE_ID AND CPKG.PC_PACKAGE_ID = PKG.PACKAGE_ID AND PKG.PACKAGE_ID = " + PackageID + " AND XDSL.SUPPLIERPRODUCTID = (SELECT DISTINCT CAP.C_ACCESS_SUPPLIER_NAME_ID FROM CAPMAN_SUPPLIER_PROD_NAME_MAP CAP WHERE CAP.PC_ACCESS_SUPPLIER_NAME_ID = " + AccessSupplierNameID + " AND CAP.PC_COUNTRY_ID = " + CountryID + " ))";
            OracleCommand cmd = new OracleCommand(sql, oConn);
            DataSet ds = ExecuteDataSet(cmd);
            return ds;
        }

        public DataSet GetCPE(int ProductID, int AccessProductTypeID, int InterfaceID, int AccessSpeed, int SupplyID, string AccessType, int CountryID)
        {

            OracleCommand cmd = new OracleCommand("CPE_Routers_HVPN", oConn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("PRODUCT_ID", OracleDbType.Int32).Value = ProductID;//2;//pproductloclevel;
            cmd.Parameters.Add("ACCESS_PRODUCT_TYPE_ID", OracleDbType.Int32).Value = AccessProductTypeID; //-1;//hubsiteid
            cmd.Parameters.Add("PC_INTERFACE_ID", OracleDbType.Int32).Value = InterfaceID;
            cmd.Parameters.Add("PC_ACCESS_SPEED_DU_ID", OracleDbType.Int32).Value = AccessSpeed;  //21;//pproductcd;
            cmd.Parameters.Add("PC_SUPPLY_ID", OracleDbType.Int32).Value = SupplyID;
            cmd.Parameters.Add("p_access_type", OracleDbType.Varchar2).Value = AccessType;
            cmd.Parameters.Add("p_country", OracleDbType.Int32).Value = CountryID;

            cmd.Parameters.Add("v_router_name", OracleDbType.RefCursor, ParameterDirection.Output);

            DataSet ds = new DataSet();
            OracleDataAdapter dad = new OracleDataAdapter(cmd);
            dad.Fill(ds);
            return ds;
        }

        public int GetParentPackageID(int ParentCaseID, int PackageID)
        {
            int ParentPackageID = 0;
            string strsql = "Select case_pkg_id from cla_product_packages where case_id = " + ParentCaseID + " and package_id =" + PackageID;
            OracleCommand cmd = new OracleCommand(strsql, oConn);
            DataSet dsRouter = ExecuteDataSet(cmd);
            if (dsRouter != null && dsRouter.Tables.Count > 0 && dsRouter.Tables[0].Rows.Count > 0)
            {
                ParentPackageID = Convert.ToInt32(dsRouter.Tables[0].Rows[0]["case_pkg_id"].ToString());
            }
            return ParentPackageID;
        }


        public int GetPortPackageID(int CountryID, int PackageID, int AccessProductTypeID, int AccessSupplierCharID, int AccessSupplierNameID, int GPOPInterConnect, int PortTypeID, int CaseID)
        {
            string strsql = "select case_access_set_id from cla_product_cases a, cla_access_set b, csu_config_tbl c where a.country_id = " + CountryID + " and a.product_cd = c.FIELDVALUE and upper(c.FIELDNAME) = 'DSL ACCESS' and a.case_id = b.case_id and b.PACKAGE_ID = " + PackageID + " and b.ACCESS_PRODUCT_TYPE_ID = " + AccessProductTypeID + " and b.ACCESS_SUPPLIER_CHAR_ID = " + AccessSupplierCharID + " and b.ACCESS_SUPPLIER_NAME_ID = " + AccessSupplierNameID + " and b.GPOP_INTERCONNECT = " + GPOPInterConnect;
            OracleCommand cmd = new OracleCommand(strsql, oConn);
            DataSet dsAccessSet = ExecuteDataSet(cmd);
            int Accesssetid = 0;
            int PortPackageID = 0;
            if (dsAccessSet != null && dsAccessSet.Tables.Count > 0 && dsAccessSet.Tables[0].Rows.Count > 0)
            {
                Accesssetid = Convert.ToInt32(dsAccessSet.Tables[0].Rows[0]["case_access_set_id"].ToString());
            }

            strsql = "Select case_pkg_id from cla_product_access_set where case_id = " + CaseID + " and ACCESS_SET_ID = " + Accesssetid + " and PORT_TYPE_ID =  " + PortTypeID;
            cmd = null;
            cmd = new OracleCommand(strsql, oConn);
            DataSet dsPortPackageID = ExecuteDataSet(cmd);

            if (dsPortPackageID != null && dsPortPackageID.Tables.Count > 0 && dsPortPackageID.Tables[0].Rows.Count > 0)
            {
                PortPackageID = Convert.ToInt32(dsPortPackageID.Tables[0].Rows[0]["case_pkg_id"].ToString());
            }

            return PortPackageID;
        }

        public string GetTIRValue(int ProudctID, int CaseID, int PortPckgID, int ParentPackageID)
        {
            string sqlLevel = " select a.char_id, a.char_level from csu_ref_product_opt_matrix a, csu_config_tbl b where a.char_id = b.FIELDVALUE and a.PRODUCT_CD = " + ProudctID + " and upper(b.FIELDNAME) = 'TIR VALUE' ";
            OracleCommand cmd = new OracleCommand(sqlLevel, oConn);
            DataSet dsTIRLvel = ExecuteDataSet(cmd);
            int TIRLevel = 0;
            if (dsTIRLvel != null && dsTIRLvel.Tables.Count > 0 && dsTIRLvel.Tables[0].Rows.Count > 0)
            {
                if (dsTIRLvel.Tables[0].Rows[0]["char_level"].ToString() == "COUNTRYPORTTYPE")
                {
                    TIRLevel = 1;
                }
            }
            int PckgID = TIRLevel == 1 ? PortPckgID : ParentPackageID;
            string sql = " select cd.CHAR_VALUE from CLA_PRODUCT_CASE_DETAILS cd,CSU_CONFIG_TBL ct  where upper(ct.FIELDNAME) = 'TIR VALUE' and ct.FIELDVALUE = cd.CHAR_ID  and CASE_DETAIL_VALID_CD = 1  and cd.CASE_ID = " + CaseID + " and cd.CASE_PKG_ID = " + PckgID + " order by CHAR_VALUE ";
            cmd = null;
            cmd = new OracleCommand(sql, oConn);
            DataSet dsTIR = ExecuteDataSet(cmd);
            string TIR = "";

            if (dsTIR != null && dsTIR.Tables.Count > 0 && dsTIR.Tables[0].Rows.Count > 0)
            {
                TIR = dsTIR.Tables[0].Rows[0]["CHAR_VALUE"].ToString();
            }

            return TIR;
        }


        public string GetEFValue(int ProudctID, int CaseID, int PortPckgID, int ParentPackageID)
        {
            string sqlLevel = " select a.char_id, a.char_level from csu_ref_product_opt_matrix a, csu_config_tbl b where a.char_id = b.FIELDVALUE and a.PRODUCT_CD = " + ProudctID + " and upper(b.FIELDNAME) = 'VOICE CLASS (EF) SUPPORTED SPEEDS' ";
            OracleCommand cmd = new OracleCommand(sqlLevel, oConn);
            DataSet dsEFLvel = ExecuteDataSet(cmd);
            int EFLevel = 0;
            if (dsEFLvel != null && dsEFLvel.Tables.Count > 0 && dsEFLvel.Tables[0].Rows.Count > 0)
            {
                if (dsEFLvel.Tables[0].Rows[0]["char_level"].ToString() == "COUNTRYPORTTYPE")
                {
                    EFLevel = 1;
                }
            }
            int PckgID = EFLevel == 1 ? PortPckgID : ParentPackageID;
            string sql = " select vc.CHAR_NAME,vc.CHAR_ID from CLA_PRODUCT_CASE_DETAILS cd,CSU_CONFIG_TBL ct, csu_ref_valid_char vc where upper(ct.FIELDNAME) = 'VOICE CLASS (EF) SUPPORTED SPEEDS' and ct.FIELDVALUE = cd.CHAR_TYPE_ID and CASE_DETAIL_VALID_CD = 1 and vc.char_id = cd.char_id and cd.CASE_ID = " + CaseID + " and cd.CASE_PKG_ID = " + PckgID + " order by CHAR_VALUE ";
            cmd = null;
            cmd = new OracleCommand(sql, oConn);
            DataSet dsEF = ExecuteDataSet(cmd);
            string EF = "";

            if (dsEF != null && dsEF.Tables.Count > 0 && dsEF.Tables[0].Rows.Count > 0)
            {
                EF = dsEF.Tables[0].Rows[0]["CHAR_VALUE"].ToString();
            }

            return EF;
        }

        public DataSet GetHVPNAttributes(int CaseID, int CasePackageID, int PackageID, int ParentCaseID, int ParentPackageID, int AccessSupplierCharID, int ProductID, string PortSpeedID, int Country,int PageNo ,int PageCount,ref int Count)
        {

            string strsql = "select pt.ACCESS_SUPPLIER_CHAR_ID, a.char_name as supplier_name, pt.ACCESS_SUPPLIER_NAME_ID, b.char_name as supplier_prodname, pt.PORT_TYPE_ID, c.char_name as porttype_name, PT.PORT_SPEED_CHAR_ID, pt.ACCESS_PRODUCT_TYPE_ID, e.char_name as access_typename, pt.GPOP_INTERCONNECT, d.HUB_SITE_NAME, f.AVAIL_DESC,pt.PORT_TYPE_AVAIL_CD,pt.PORT_SPEED_AVAIL_CD,pt.PORT_TYPE_VALID_CD from cla_product_port_types pt, csu_ref_valid_char a, csu_ref_valid_char b, csu_ref_valid_char c, csu_hub_site d, csu_ref_valid_char e, csu_ref_availability f, cla_product_access_type g ,vw_sc_porttype_elements i, port_to_access_speeds j where pt.ACCESS_SUPPLIER_CHAR_ID = a.char_id and pt.ACCESS_SUPPLIER_NAME_ID = b.char_id and pt.PORT_TYPE_ID = c.char_id and pt.GPOP_INTERCONNECT = d.hub_site_id AND pt.ACCESS_PRODUCT_TYPE_ID not in ( 5802) and pt.ACCESS_PRODUCT_TYPE_ID = e.char_id and pt.PORT_TYPE_AVAIL_CD = f.AVAIL_CD and i.sc_porttype_id = pt.port_type_id and i.sc_aspeed_down_up_id = j.access_speed_char_id and j.port_speed_char_id = pt.port_speed_char_id and j.access_type_char_id = pt.access_product_type_id and pt.PORT_TYPE_VALID_CD = 1 and case_id = " + ParentCaseID + " and pt.case_pkg_id = " + ParentPackageID + " AND pt.access_supplier_char_id = " + AccessSupplierCharID + " and g.product_cd = " + ProductID + " and g.access_product_type_id = pt.access_product_type_id ";
            if (PortSpeedID != "0")
            {
                strsql += " and pt.port_speed_char_id in (" + PortSpeedID + ")";
            }
            strsql += " and not exists ( SELECT 'x' FROM cla_parent_port_types i WHERE i.case_id = " + CaseID + " AND i.case_pkg_id = " + CasePackageID + " AND i.access_supplier_char_id = pt.access_supplier_char_id AND i.access_supplier_name_id = pt.access_supplier_name_id AND i.access_product_type_id = pt.access_product_type_id AND i.gpop_interconnect = pt.gpop_interconnect AND i.port_type_id = pt.port_type_id AND i.port_type_valid_cd = 0 ) AND EXISTS ( SELECT 'X' FROM cla_access_set x, cla_port_types y, cla_product_cases z, csu_config_tbl w WHERE w.fieldname = 'DSL ACCESS' AND z.product_cd = w.fieldvalue AND z.country_id = " + Country + " AND z.case_id = x.case_id AND x.case_detail_valid_cd = 1 AND x.package_id = " + PackageID + " AND x.case_id = y.case_id AND y.port_type_valid_cd = 1 AND x.case_access_set_id = y.case_access_set_id AND x.access_supplier_char_id = pt.access_supplier_char_id AND x.access_supplier_name_id = pt.access_supplier_name_id AND x.access_product_type_id = pt.access_product_type_id AND x.gpop_interconnect = pt.gpop_interconnect AND y.port_type_id = pt.port_type_id) order by PORT_SPEED_CHAR_ID,i.sc_aspeed_down_num, i.sc_aspeed_up_num";

            strsql = "select pt.ACCESS_SUPPLIER_CHAR_ID, a.char_name as supplier_name, pt.ACCESS_SUPPLIER_NAME_ID, b.char_name as supplier_prodname, pt.PORT_TYPE_ID, c.char_name as porttype_name, PT.PORT_SPEED_CHAR_ID, pt.ACCESS_PRODUCT_TYPE_ID, e.char_name as access_typename, pt.GPOP_INTERCONNECT, d.HUB_SITE_NAME, f.AVAIL_DESC,pt.PORT_TYPE_AVAIL_CD,pt.PORT_SPEED_AVAIL_CD,pt.PORT_TYPE_VALID_CD from cla_product_port_types pt, csu_ref_valid_char a, csu_ref_valid_char b, csu_ref_valid_char c, csu_hub_site d, csu_ref_valid_char e, csu_ref_availability f, cla_product_access_type g ,vw_sc_porttype_elements i, port_to_access_speeds j where pt.ACCESS_SUPPLIER_CHAR_ID = a.char_id and pt.ACCESS_SUPPLIER_NAME_ID = b.char_id and pt.PORT_TYPE_ID = c.char_id and pt.GPOP_INTERCONNECT = d.hub_site_id AND pt.ACCESS_PRODUCT_TYPE_ID not in ( 5802) and pt.ACCESS_PRODUCT_TYPE_ID = e.char_id and pt.PORT_TYPE_AVAIL_CD = f.AVAIL_CD and i.sc_porttype_id = pt.port_type_id and i.sc_aspeed_down_up_id = j.access_speed_char_id and j.port_speed_char_id = pt.port_speed_char_id and j.access_type_char_id = pt.access_product_type_id and pt.PORT_TYPE_VALID_CD = 1 and case_id = " + ParentCaseID + " and pt.case_pkg_id = " + ParentPackageID + " AND pt.access_supplier_char_id = " + AccessSupplierCharID + " and g.product_cd = " + ProductID + " and g.access_product_type_id = pt.access_product_type_id ";
            if (PortSpeedID != "0")
            {
                strsql += " and pt.port_speed_char_id in (" + PortSpeedID + ") ";
            }
            strsql += " and not exists ( SELECT 'x' FROM cla_parent_port_types i WHERE i.case_id = " + CaseID + " AND i.case_pkg_id = " + CasePackageID + " AND i.access_supplier_char_id = pt.access_supplier_char_id AND i.access_supplier_name_id = pt.access_supplier_name_id AND i.access_product_type_id = pt.access_product_type_id AND i.gpop_interconnect = pt.gpop_interconnect AND i.port_type_id = pt.port_type_id AND i.port_type_valid_cd = 0 ) AND EXISTS ( SELECT 'X' FROM cla_access_set x, cla_port_types y, cla_product_cases z, csu_config_tbl w WHERE w.fieldname = 'DSL ACCESS' AND z.product_cd = w.fieldvalue AND z.country_id = " + Country + "  AND z.case_id = x.case_id AND x.case_detail_valid_cd = 1 AND x.package_id = " + PackageID + " AND x.case_id = y.case_id AND y.port_type_valid_cd = 1 AND x.case_access_set_id = y.case_access_set_id AND x.access_supplier_char_id = pt.access_supplier_char_id AND x.access_supplier_name_id = pt.access_supplier_name_id AND x.access_product_type_id = pt.access_product_type_id AND x.gpop_interconnect = pt.gpop_interconnect AND y.port_type_id = pt.port_type_id) order by i.sc_aspeed_down_num, i.sc_aspeed_up_num";

            //OracleCommand cmd = new OracleCommand(strsql, oConn);

            strsql = "PRC_HVPN_DATA";

            OracleCommand cmd = new OracleCommand(strsql, oConn);
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.Add("V_ACCESS_PRODUCT_TYPE_ID", OracleDbType.Varchar2).Value = 5802;  
            cmd.Parameters.Add("V_PARENT_CASE_ID", OracleDbType.Varchar2).Value = ParentCaseID;
            cmd.Parameters.Add("V_PARENT_CASE_PKG_ID", OracleDbType.Varchar2).Value = ParentPackageID;
            cmd.Parameters.Add("V_ACCESS_SUPPLIER_CHAR_ID", OracleDbType.Varchar2).Value = AccessSupplierCharID;
            cmd.Parameters.Add("V_PRODUCT_CD", OracleDbType.Varchar2).Value = ProductID;
            cmd.Parameters.Add("V_PORT_SPEED_CHAR_ID", OracleDbType.Varchar2).Value = PortSpeedID;
            cmd.Parameters.Add("V_CASE_ID", OracleDbType.Varchar2).Value = CaseID;
            cmd.Parameters.Add("V_CASE_PKG_ID", OracleDbType.Varchar2).Value = CasePackageID;
            cmd.Parameters.Add("V_COUNTRY_ID", OracleDbType.Varchar2).Value = Country;
            cmd.Parameters.Add("V_PACKAGE_ID", OracleDbType.Varchar2).Value = PackageID;
            cmd.Parameters.Add("PAGENUMBER", OracleDbType.Int32).Value = PageNo;
            cmd.Parameters.Add("ROWSPPAGE", OracleDbType.Int32).Value = PageCount;

            cmd.Parameters.Add("V_HVPN_DATA", OracleDbType.RefCursor, ParameterDirection.Output);
            cmd.Parameters.Add("V_HVPN_COUNT", OracleDbType.RefCursor, ParameterDirection.Output);

            DataSet dsHVPN=ExecuteDataSet(cmd);
            if (dsHVPN != null && dsHVPN.Tables.Count > 1 && dsHVPN.Tables[1].Rows.Count > 0)
            {
                Count = Convert.ToInt32(dsHVPN.Tables[1].Rows[0][0].ToString());
            }

            return dsHVPN;
        }

        public DataSet GetPaentHVPNAttributes(int CaseID, int CasePackageID, int PackageID, int AccessSupplierCharID, string PortSpeedID, int Country,int PageNo,int PageCount,ref int Count)
        {

            string strsql = "SELECT PT.ACCESS_SUPPLIER_CHAR_ID, A.CHAR_NAME AS SUPPLIER_NAME, PT.ACCESS_SUPPLIER_NAME_ID, B.CHAR_NAME AS SUPPLIER_PRODNAME, PT.PORT_TYPE_ID, PT.PORT_SPEED_CHAR_ID, C.CHAR_NAME AS PORTTYPE_NAME, PT.ACCESS_PRODUCT_TYPE_ID, E.CHAR_NAME AS ACCESS_TYPENAME, PT.GPOP_INTERCONNECT, D.HUB_SITE_NAME, F.AVAIL_DESC, PT.PORT_SPEED_AVAIL_CD FROM CLA_PRODUCT_PORT_TYPES PT, CSU_REF_VALID_CHAR A, CSU_REF_VALID_CHAR B, CSU_REF_VALID_CHAR C, CSU_HUB_SITE D, CSU_REF_VALID_CHAR E, CSU_REF_AVAILABILITY F, CLA_PRODUCT_ACCESS_TYPE G , CLA_PRODUCT_CASES H ,VW_SC_PORTTYPE_ELEMENTS I, PORT_TO_ACCESS_SPEEDS J WHERE PT.ACCESS_SUPPLIER_CHAR_ID = A.CHAR_ID AND PT.ACCESS_SUPPLIER_NAME_ID = B.CHAR_ID AND PT.PORT_TYPE_ID = C.CHAR_ID AND PT.GPOP_INTERCONNECT = D.HUB_SITE_ID AND PT.ACCESS_PRODUCT_TYPE_ID NOT IN ( 5802) AND PT.ACCESS_PRODUCT_TYPE_ID = E.CHAR_ID AND PT.PORT_TYPE_AVAIL_CD = F.AVAIL_CD AND PT.PORT_TYPE_VALID_CD = 1 AND I.SC_PORTTYPE_ID = PT.PORT_TYPE_ID AND I.SC_ASPEED_DOWN_UP_ID = J.ACCESS_SPEED_CHAR_ID AND J.PORT_SPEED_CHAR_ID = PT.PORT_SPEED_CHAR_ID AND J.ACCESS_TYPE_CHAR_ID = PT.ACCESS_PRODUCT_TYPE_ID AND PT.CASE_ID = " + CaseID + " AND PT.CASE_PKG_ID = " + CasePackageID + " AND PT.ACCESS_SUPPLIER_CHAR_ID = " + AccessSupplierCharID;
            if (PortSpeedID != "0")
            {
                strsql += " AND PT.PORT_SPEED_CHAR_ID IN (" + PortSpeedID + ")";
            }
            strsql += " AND H.CASE_ID = PT.CASE_ID AND G.ACCESS_PRODUCT_TYPE_ID = PT.ACCESS_PRODUCT_TYPE_ID AND G.PRODUCT_CD = H.PRODUCT_CD AND EXISTS ( SELECT 'X' FROM CLA_ACCESS_SET X, CLA_PORT_TYPES Y, CLA_PRODUCT_CASES Z, CSU_CONFIG_TBL W WHERE W.FIELDNAME = 'DSL ACCESS' AND Z.PRODUCT_CD = W.FIELDVALUE AND Z.COUNTRY_ID = " + Country + " AND Z.CASE_ID = X.CASE_ID AND X.CASE_DETAIL_VALID_CD = 1 AND X.PACKAGE_ID = " + PackageID + " AND X.CASE_ID = Y.CASE_ID AND Y.PORT_TYPE_VALID_CD = 1 AND X.CASE_ACCESS_SET_ID = Y.CASE_ACCESS_SET_ID AND X.ACCESS_SUPPLIER_CHAR_ID = PT.ACCESS_SUPPLIER_CHAR_ID AND X.ACCESS_SUPPLIER_NAME_ID = PT.ACCESS_SUPPLIER_NAME_ID AND X.ACCESS_PRODUCT_TYPE_ID = PT.ACCESS_PRODUCT_TYPE_ID AND X.GPOP_INTERCONNECT = PT.GPOP_INTERCONNECT AND Y.PORT_TYPE_ID = PT.PORT_TYPE_ID) ORDER BY PORT_SPEED_CHAR_ID,I.SC_ASPEED_DOWN_NUM,I.SC_ASPEED_UP_NUM";
            //OracleCommand cmd = new OracleCommand(strsql, oConn);
            //return ExecuteDataSet(cmd);

            strsql = "PRC_HVPN_DATA_CHILD";

            OracleCommand cmd = new OracleCommand(strsql, oConn);
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.Add("V_ACCESS_PRODUCT_TYPE_ID", OracleDbType.Varchar2).Value = 5802;  
            cmd.Parameters.Add("V_CASE_ID", OracleDbType.Int32).Value = CaseID;
            cmd.Parameters.Add("V_CASE_PKG_ID", OracleDbType.Int32).Value = CasePackageID;
            cmd.Parameters.Add("V_ACCESS_SUPPLIER_CHAR_ID", OracleDbType.Int32).Value = AccessSupplierCharID;
            cmd.Parameters.Add("V_PORT_SPEED_CHAR_ID", OracleDbType.Varchar2).Value = PortSpeedID;
            cmd.Parameters.Add("V_COUNTRY_ID", OracleDbType.Int32).Value = Country;
            cmd.Parameters.Add("V_PACKAGE_ID", OracleDbType.Int32).Value = PackageID;
            cmd.Parameters.Add("PAGENUMBER", OracleDbType.Int32).Value = PageNo;
            cmd.Parameters.Add("ROWSPPAGE", OracleDbType.Int32).Value = PageCount;

            cmd.Parameters.Add("V_HVPN_DATA", OracleDbType.RefCursor, ParameterDirection.Output);
            cmd.Parameters.Add("V_HVPN_COUNT", OracleDbType.RefCursor, ParameterDirection.Output);

            DataSet dsHVPN = ExecuteDataSet(cmd);
            if (dsHVPN != null && dsHVPN.Tables.Count > 1 && dsHVPN.Tables[1].Rows.Count > 0)
            {
                Count = Convert.ToInt32(dsHVPN.Tables[1].Rows[0][0].ToString());
            }

            return dsHVPN;
        }

        public string GetHVPNAvailDesc(int PortSpeedAvailID)
        {
            string sql = " Select distinct avail_desc from csu_ref_availability where avail_cd = " + PortSpeedAvailID;
            OracleCommand cmd = new OracleCommand(sql, oConn);
            DataSet ds = ExecuteDataSet(cmd);
            string AvailDesc = "";
            if (ds != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
            {
                AvailDesc = ds.Tables[0].Rows[0]["avail_desc"].ToString();
            }
            return AvailDesc;
        }

        public int GetContentionValue(int PackageID, int ParentCaseID, int AccessSupplierNameID, int Country)
        {
            string sql = "SELECT DISTINCT XDSL.LOCAL_LOOP_LEAD_TIME,XDSL.CONTENTION_VALUE FROM CSU_SUPPLIER_PRODUCT_XDSL XDSL,CAPMAN_DSL_PACKAGE_MAP CPKG, CLA_PRODUCT_PACKAGES PKG WHERE XDSL.DSL_PACKAGE_ID = CPKG.C_PACKAGE_ID AND CPKG.PC_PACKAGE_ID = PKG.PACKAGE_ID AND PKG.PACKAGE_ID = " + PackageID + " AND XDSL.SUPPLIERPRODUCTID =(SELECT DISTINCT CAP.C_ACCESS_SUPPLIER_NAME_ID FROM CAPMAN_SUPPLIER_PROD_NAME_MAP CAP ,CLA_PRODUCT_PORT_TYPES PT WHERE PT.CASE_ID = " + ParentCaseID + " AND PT.ACCESS_SUPPLIER_NAME_ID =" + AccessSupplierNameID + " AND CAP.PC_COUNTRY_ID = " + Country + " AND PT.ACCESS_SUPPLIER_NAME_ID = CAP.PC_ACCESS_SUPPLIER_NAME_ID)";
            OracleCommand cmd = new OracleCommand(sql, oConn);
            DataSet ds = ExecuteDataSet(cmd);
            int ContentionValue = 0;
            if (ds != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
            {
                ContentionValue = Convert.ToInt32(ds.Tables[0].Rows[0]["CONTENTION_VALUE"].ToString());
            }
            return ContentionValue;
        }

        public int GetDeliveryTime(int ParentCaseID, int AccessSupplierNameID, int Country)
        {
            string sql = "Select TIME_TO_DELIVER from CSU_HVPN_PRICING_SHEET chps, CSU_SUPPLIER_PRODUCT_XDSL xdsl where COUNTRY_CODE in ( SELECT DISTINCT COUNTRY_CODE FROM CSU_COUNTRY WHERE COUNTRY_ID = " + Country + " AND COUNTRY_VALID_CD = 1) and xdsl.Product_code = chps.product_code and xdsl.Supplierproductid = (select distinct cap.C_ACCESS_SUPPLIER_NAME_ID from CAPMAN_SUPPLIER_PROD_NAME_MAP cap ,CLA_PRODUCT_PORT_TYPES pt where pt.case_id = " + ParentCaseID + " and pt.ACCESS_SUPPLIER_NAME_ID = " + AccessSupplierNameID + " and cap.PC_COUNTRY_ID = " + Country + " and pt.ACCESS_SUPPLIER_NAME_ID = cap.PC_ACCESS_SUPPLIER_NAME_ID)";
            OracleCommand cmd = new OracleCommand(sql, oConn);
            DataSet ds = ExecuteDataSet(cmd);
            int DeliveryTime = 0;
            if (ds != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
            {
                DeliveryTime = Convert.ToInt32(ds.Tables[0].Rows[0]["TIME_TO_DELIVER"].ToString());
            }
            return DeliveryTime * 7;
        }

        public DataSet GetDSLPackageInfo(int CaseID, int ProductID, int PackageID, int ParentCaseID, int ParentProductID)
        {

            string strsql = "SELECT DISTINCT VC.CHAR_NAME,VC.CHAR_ID,PKG.PACKAGE_ID,PKG.CASE_PKG_ID FROM CLA_PRODUCT_PACKAGES PKG,CSU_REF_VALID_CHAR VC, CLA_PRODUCT_PORT_TYPES PT, CLA_PRODUCT_ACCESS_TYPE A WHERE PKG.CASE_ID = " + CaseID + " AND PKG.PACKAGE_ID = VC.CHAR_ID AND PKG.CASE_PKG_ID = PT.CASE_PKG_ID AND PKG.CASE_ID = PT.CASE_ID AND PT.PORT_TYPE_VALID_CD = 1 AND A.ACCESS_PRODUCT_TYPE_ID = PT.ACCESS_PRODUCT_TYPE_ID AND A.PRODUCT_CD = " + ProductID + " AND PKG.PACKAGE_ID = " + PackageID + " AND VALID_CD = 1 AND UPPER(TRIM(CHAR_NAME))NOT LIKE '%HYBRID%' ";
            strsql += " UNION ";
            strsql += "SELECT DISTINCT VC.CHAR_NAME,VC.CHAR_ID,PKG.PACKAGE_ID,PKG.CASE_PKG_ID FROM CLA_PRODUCT_PACKAGES PKG,CSU_REF_VALID_CHAR VC, CLA_PRODUCT_PORT_TYPES PT, CLA_PRODUCT_ACCESS_TYPE A WHERE PKG.CASE_ID = " + ParentCaseID + " AND PKG.PACKAGE_ID = VC.CHAR_ID AND PKG.CASE_PKG_ID = PT.CASE_PKG_ID AND PKG.CASE_ID = PT.CASE_ID AND PT.PORT_TYPE_VALID_CD = 1 AND A.ACCESS_PRODUCT_TYPE_ID = PT.ACCESS_PRODUCT_TYPE_ID AND A.PRODUCT_CD = " + ParentProductID + " AND VC.CHAR_ID NOT IN ( SELECT DISTINCT VC.CHAR_ID FROM CLA_PRODUCT_PACKAGES PKG,CSU_REF_VALID_CHAR VC, CLA_PRODUCT_PORT_TYPES PT, CLA_PRODUCT_ACCESS_TYPE A WHERE PKG.CASE_ID = 208 AND PKG.PACKAGE_ID = VC.CHAR_ID AND PKG.CASE_PKG_ID = PT.CASE_PKG_ID AND PKG.CASE_ID = PT.CASE_ID AND PT.PORT_TYPE_VALID_CD = 1 AND A.ACCESS_PRODUCT_TYPE_ID = PT.ACCESS_PRODUCT_TYPE_ID AND A.PRODUCT_CD = " + ProductID + " AND PKG.PACKAGE_ID = " + PackageID + " AND VALID_CD = 1 AND UPPER(TRIM(CHAR_NAME))NOT LIKE '%HYBRID%' ) AND PKG.PACKAGE_ID = " + PackageID + " AND VALID_CD = 1 AND UPPER(TRIM(CHAR_NAME))NOT LIKE '%HYBRID%' ORDER BY 1";
            OracleCommand cmd = new OracleCommand(strsql, oConn);
            return ExecuteDataSet(cmd);
        }


        public DataSet GetDSLAttributes(int CaseID, int CasePackageID, int PackageID, int ParentCaseID, int ParentPackageID, int SupplierID, int ProductID, int Country,int PageNo,int PageCount,ref int Count)
        {

            string strsql = "select pt.ACCESS_SUPPLIER_CHAR_ID, a.char_name as supplier_name, pt.ACCESS_SUPPLIER_NAME_ID, b.char_name as supplier_prodname, pt.PORT_TYPE_ID, c.char_name as porttype_name, pt.ACCESS_PRODUCT_TYPE_ID, e.char_name as access_typename, pt.GPOP_INTERCONNECT, d.HUB_SITE_NAME, f.AVAIL_DESC from cla_product_port_types pt, csu_ref_valid_char a, csu_ref_valid_char b, csu_ref_valid_char c, csu_hub_site d, csu_ref_valid_char e, csu_ref_availability f, cla_product_access_type g where pt.ACCESS_SUPPLIER_CHAR_ID = a.char_id and pt.ACCESS_SUPPLIER_NAME_ID = b.char_id and pt.PORT_TYPE_ID = c.char_id and pt.GPOP_INTERCONNECT = d.hub_site_id and pt.ACCESS_PRODUCT_TYPE_ID = e.char_id and pt.PORT_TYPE_AVAIL_CD = f.AVAIL_CD and pt.PORT_TYPE_VALID_CD = 1 and case_id = " + ParentCaseID + " and pt.case_pkg_id = " + ParentPackageID + " and g.product_cd = " + ProductID + " and pt.ACCESS_SUPPLIER_CHAR_ID = " + SupplierID + " and g.access_product_type_id = pt.access_product_type_id and not exists ( SELECT 'x' FROM cla_parent_port_types i WHERE i.case_id = " + CaseID + " AND i.case_pkg_id = " + CasePackageID + " AND i.access_supplier_char_id = pt.access_supplier_char_id AND i.access_supplier_name_id = pt.access_supplier_name_id AND i.access_product_type_id = pt.access_product_type_id AND i.gpop_interconnect = pt.gpop_interconnect AND i.port_type_id = pt.port_type_id AND i.port_type_valid_cd = 0 ) AND EXISTS ( SELECT 'X' FROM cla_access_set x, cla_port_types y, cla_product_cases z, csu_config_tbl w WHERE w.fieldname = 'DSL ACCESS' AND z.product_cd = w.fieldvalue AND z.country_id = " + Country + " AND z.case_id = x.case_id AND x.case_detail_valid_cd = 1 AND x.package_id = " + PackageID + " AND x.case_id = y.case_id AND y.port_type_valid_cd = 1 AND x.case_access_set_id = y.case_access_set_id AND x.access_supplier_char_id = pt.access_supplier_char_id AND x.access_supplier_name_id = pt.access_supplier_name_id AND x.access_product_type_id = pt.access_product_type_id AND x.gpop_interconnect = pt.gpop_interconnect AND y.port_type_id = pt.port_type_id) ";
            strsql = " SELECT pt.ACCESS_SUPPLIER_CHAR_ID,a.char_name AS supplier_name,pt.ACCESS_SUPPLIER_NAME_ID,b.char_name AS supplier_prodname,pt.PORT_TYPE_ID,c.char_name AS porttype_name,pt.ACCESS_PRODUCT_TYPE_ID,e.char_name AS access_typename,pt.GPOP_INTERCONNECT,d.HUB_SITE_NAME,F.Avail_Desc,Xdsl.Local_Loop_Lead_Time,Xdsl.Contention_Value ,Xdsl.Interconnect_Design_Name Desgname,case when zps.SD_CONTRACTED_LEADTIME_DAYNAME is null then Zps.Sd_Contracted_Leadtime||' Days' else Zps.Sd_Contracted_Leadtime||' '||zps.SD_CONTRACTED_LEADTIME_DAYNAME end as Sd_Contracted_Leadtime,(nvl(XDSL.LOCAL_LOOP_LEAD_TIME,0)+nvl(ZPS.SD_CONTRACTED_LEADTIME,0)) as E2ELead FROM cla_product_port_types pt,csu_ref_valid_char a,csu_ref_valid_char b,csu_ref_valid_char c,csu_hub_site d,  csu_ref_valid_char e,csu_ref_availability f,Cla_Product_Access_Type G,Csu_Supplier_Product_Xdsl Xdsl,Capman_Dsl_Package_Map Cpkg, Cla_Product_Packages Pkg ,Capman_Supplier_Prod_Name_Map Cap,Csu_Zone_Product_Sla Zps,Capman_Dsl_Porttype_Map Dpm WHERE pt.ACCESS_SUPPLIER_CHAR_ID = a.char_id AND pt.ACCESS_SUPPLIER_NAME_ID  = b.char_id AND pt.PORT_TYPE_ID = c.char_id AND pt.GPOP_INTERCONNECT  = d.hub_site_id AND pt.ACCESS_PRODUCT_TYPE_ID = e.char_id AND pt.PORT_TYPE_AVAIL_CD = f.AVAIL_CD And Pt.Port_Type_Valid_Cd = 1 AND pt.case_id = " + ParentCaseID + " AND pt.case_pkg_id = " + ParentPackageID + " AND g.product_cd =  " + ProductID + " And Pt.Access_Supplier_Char_Id   = " + SupplierID + " And G.Access_Product_Type_Id  = Pt.Access_Product_Type_Id AND Xdsl.Dsl_Package_Id = Cpkg.C_Package_Id And Cpkg.Pc_Package_Id = Pkg.Package_Id  And Pkg.Package_Id = " + PackageID + " And Cap.Pc_Country_Id = " + Country + " And Pt.Access_Supplier_Name_Id = Cap.Pc_Access_Supplier_Name_Id And Cap.C_Access_Supplier_Name_Id = Xdsl.Supplierproductid And Pkg.Case_Id = Pt.Case_Id And Zps.Supplierproductid = Cap.C_Access_Supplier_Name_Id   and ZPS.PORTTYPEID = DPM.C_PORTTYPE_ID AND DPM.PC_PORTTYPE_ID = pt.PORT_TYPE_ID AND NOT EXISTS (SELECT 'x' FROM cla_parent_port_types i WHERE i.case_id  = " + CaseID + "  AND i.case_pkg_id  = " + CasePackageID + " AND i.access_supplier_char_id = pt.access_supplier_char_id AND i.access_supplier_name_id = pt.access_supplier_name_id AND i.access_product_type_id  = pt.access_product_type_id AND i.gpop_interconnect= pt.gpop_interconnect AND i.port_type_id  = pt.port_type_id AND i.port_type_valid_cd = 0 ) AND EXISTS (SELECT 'X' FROM cla_access_set x, cla_port_types y,cla_product_cases z, csu_config_tbl w WHERE w.fieldname = 'DSL ACCESS' AND z.product_cd = w.fieldvalue AND z.country_id = " + Country + " AND z.case_id  = x.case_id AND x.case_detail_valid_cd = 1 AND x.package_id = " + PackageID + "  AND x.case_id  = y.case_id  AND y.port_type_valid_cd  = 1 AND x.case_access_set_id = y.case_access_set_id AND x.access_supplier_char_id = pt.access_supplier_char_id AND x.access_supplier_name_id = pt.access_supplier_name_id   AND x.access_product_type_id  = pt.access_product_type_id  AND x.gpop_interconnect = pt.gpop_interconnect AND y.port_type_id  = pt.port_type_id ) ";


            OracleCommand cmd = new OracleCommand("PRC_DSL_DATA", oConn);
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.Add("V_Parent_CASE_ID", OracleDbType.Varchar2).Value = ParentCaseID;
            cmd.Parameters.Add("V_PARENT_PKG_ID", OracleDbType.Varchar2).Value = ParentPackageID;
            cmd.Parameters.Add("V_PRODUCT_CD", OracleDbType.Varchar2).Value = ProductID;
            cmd.Parameters.Add("V_ACCESS_SUPPLIER_CHAR_ID", OracleDbType.Varchar2).Value = SupplierID;
            cmd.Parameters.Add("V_PACKAGE_ID", OracleDbType.Varchar2).Value = PackageID;
            cmd.Parameters.Add("V_COUNTRY_ID", OracleDbType.Varchar2).Value = Country;
            cmd.Parameters.Add("V_CASE_ID", OracleDbType.Varchar2).Value = CaseID;
            cmd.Parameters.Add("V_CASE_PKG_ID", OracleDbType.Varchar2).Value = CasePackageID;
            cmd.Parameters.Add("PAGENUMBER", OracleDbType.Int32).Value = PageNo;
            cmd.Parameters.Add("ROWSPPAGE", OracleDbType.Int32).Value = PageCount;

            cmd.Parameters.Add("V_DSL_DATA", OracleDbType.RefCursor, ParameterDirection.Output);
            cmd.Parameters.Add("V_DSL_COUNT", OracleDbType.RefCursor, ParameterDirection.Output);

            DataSet dsDSL = ExecuteDataSet(cmd);
            if (dsDSL != null && dsDSL.Tables.Count > 1 && dsDSL.Tables[1].Rows.Count > 0)
            {
                Count = Convert.ToInt32(dsDSL.Tables[1].Rows[0][0].ToString());
            }

            return dsDSL;
        }

        public DataSet GetParentDSLAttributes(int ParentCaseID, int CasePackageID, int SupplierID, int CountryID, int PackageID,int PageNo,int PageCount,ref int Count)
        {

            string strsql = "select pt.ACCESS_SUPPLIER_CHAR_ID, a.char_name as supplier_name, pt.ACCESS_SUPPLIER_NAME_ID, b.char_name as supplier_prodname, pt.PORT_TYPE_ID, c.char_name as porttype_name, pt.ACCESS_PRODUCT_TYPE_ID, e.char_name as access_typename, pt.GPOP_INTERCONNECT, d.HUB_SITE_NAME, f.AVAIL_DESC from cla_product_port_types pt, csu_ref_valid_char a, csu_ref_valid_char b, csu_ref_valid_char c, csu_hub_site d, csu_ref_valid_char e, csu_ref_availability f, cla_product_access_type g , cla_product_cases h where pt.ACCESS_SUPPLIER_CHAR_ID = a.char_id and pt.ACCESS_SUPPLIER_NAME_ID = b.char_id and pt.PORT_TYPE_ID = c.char_id and pt.GPOP_INTERCONNECT = d.hub_site_id and pt.ACCESS_PRODUCT_TYPE_ID = e.char_id and pt.PORT_TYPE_AVAIL_CD = f.AVAIL_CD and pt.PORT_TYPE_VALID_CD = 1 and pt.case_id = " + ParentCaseID + " and pt.case_pkg_id = " + CasePackageID + " AND pt.access_supplier_char_id = " + SupplierID + " AND h.case_id = pt.case_id AND g.access_product_type_id = pt.access_product_type_id and g.product_cd = h.product_cd AND EXISTS ( SELECT 'X' FROM cla_access_set x, cla_port_types y, cla_product_cases z, csu_config_tbl w WHERE w.fieldname = 'DSL ACCESS' AND z.product_cd = w.fieldvalue AND z.country_id = " + CountryID + " AND z.case_id = x.case_id AND x.case_detail_valid_cd = 1 AND x.package_id = " + PackageID + " AND x.case_id = y.case_id AND y.port_type_valid_cd = 1 AND x.case_access_set_id = y.case_access_set_id AND x.access_supplier_char_id = pt.access_supplier_char_id AND x.access_supplier_name_id = pt.access_supplier_name_id AND x.access_product_type_id = pt.access_product_type_id AND x.gpop_interconnect = pt.gpop_interconnect AND y.port_type_id = pt.port_type_id) ";

            strsql = " SELECT pt.ACCESS_SUPPLIER_CHAR_ID,a.char_name AS supplier_name,pt.ACCESS_SUPPLIER_NAME_ID,b.char_name AS supplier_prodname,pt.PORT_TYPE_ID,c.char_name AS porttype_name,pt.ACCESS_PRODUCT_TYPE_ID,e.char_name AS access_typename,pt.GPOP_INTERCONNECT,d.HUB_SITE_NAME,F.Avail_Desc,Xdsl.Local_Loop_Lead_Time,Xdsl.Contention_Value ,Xdsl.Interconnect_Design_Name Desgname,case when zps.SD_CONTRACTED_LEADTIME_DAYNAME is null then Zps.Sd_Contracted_Leadtime||' Days' else Zps.Sd_Contracted_Leadtime||' '||zps.SD_CONTRACTED_LEADTIME_DAYNAME end as Sd_Contracted_Leadtime ,  (nvl(Xdsl.Local_Loop_Lead_Time,0)+nvl(Zps.Sd_Contracted_Leadtime,0)) as E2ELead FROM cla_product_port_types pt,csu_ref_valid_char a,csu_ref_valid_char b,csu_ref_valid_char c,csu_hub_site d,csu_ref_valid_char e,csu_ref_availability f,cla_product_access_type g ,Cla_Product_Cases H,Csu_Supplier_Product_Xdsl Xdsl,Capman_Dsl_Package_Map Cpkg, Cla_Product_Packages Pkg ,Capman_Supplier_Prod_Name_Map Cap,Csu_Zone_Product_Sla Zps,Capman_Dsl_Porttype_Map Dpm WHERE pt.ACCESS_SUPPLIER_CHAR_ID = a.char_id AND pt.ACCESS_SUPPLIER_NAME_ID   = b.char_id AND pt.PORT_TYPE_ID = c.char_id AND pt.GPOP_INTERCONNECT = d.hub_site_id AND pt.ACCESS_PRODUCT_TYPE_ID = e.char_id AND pt.PORT_TYPE_AVAIL_CD  = f.AVAIL_CD AND pt.PORT_TYPE_VALID_CD  = 1 AND pt.case_id = " + ParentCaseID + " AND pt.case_pkg_id =  " + CasePackageID + " AND pt.access_supplier_char_id   = " + SupplierID + "  AND h.case_id = pt.case_id AND g.access_product_type_id = pt.access_product_type_id AND g.product_cd = h.product_cd AND Xdsl.Dsl_Package_Id = Cpkg.C_Package_Id And Cpkg.Pc_Package_Id = Pkg.Package_Id And Pkg.Package_Id = " + PackageID + " And Cap.Pc_Country_Id = " + CountryID + " And Pt.Access_Supplier_Name_Id = Cap.Pc_Access_Supplier_Name_Id And Cap.C_Access_Supplier_Name_Id = Xdsl.Supplierproductid And Pkg.Case_Id = Pt.Case_Id And Zps.Supplierproductid = Cap.C_Access_Supplier_Name_Id  And Zps.Porttypeid = Dpm.C_Porttype_Id  AND DPM.PC_PORTTYPE_ID = pt.PORT_TYPE_ID AND EXISTS (SELECT 'X' FROM cla_access_set x, cla_port_types y, cla_product_cases z, csu_config_tbl w WHERE w.fieldname = 'DSL ACCESS' AND z.product_cd = w.fieldvalue AND z.country_id = " + CountryID + " AND z.case_id = x.case_id AND x.case_detail_valid_cd = 1 AND x.package_id = " + PackageID + " AND x.case_id = y.case_id AND y.port_type_valid_cd = 1 AND x.case_access_set_id = y.case_access_set_id AND x.access_supplier_char_id = pt.access_supplier_char_id AND x.access_supplier_name_id = pt.access_supplier_name_id AND x.access_product_type_id  = pt.access_product_type_id AND x.gpop_interconnect = pt.gpop_interconnect And Y.Port_Type_Id = Pt.Port_Type_Id )";

            //PRC_DSL_DATA_CHILD

            //OracleCommand cmd = new OracleCommand(strsql, oConn);
            //return ExecuteDataSet(cmd);


            OracleCommand cmd = new OracleCommand("PRC_DSL_DATA_CHILD", oConn);
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.Add("V_CASE_ID", OracleDbType.Varchar2).Value = ParentCaseID;
            cmd.Parameters.Add("V_CASE_PKG_ID", OracleDbType.Varchar2).Value = CasePackageID;
            cmd.Parameters.Add("V_ACCESS_SUPPLIER_CHAR_ID", OracleDbType.Varchar2).Value = SupplierID;
            cmd.Parameters.Add("V_PACKAGE_ID", OracleDbType.Varchar2).Value = PackageID;
            cmd.Parameters.Add("V_COUNTRY_ID", OracleDbType.Varchar2).Value = CountryID;
            cmd.Parameters.Add("PAGENUMBER", OracleDbType.Int32).Value = PageNo;
            cmd.Parameters.Add("ROWSPPAGE", OracleDbType.Int32).Value = PageCount;

            cmd.Parameters.Add("V_DSL_DATA", OracleDbType.RefCursor, ParameterDirection.Output);
            cmd.Parameters.Add("V_DSL_COUNT", OracleDbType.RefCursor, ParameterDirection.Output);

            DataSet dsDSL = ExecuteDataSet(cmd);
            if (dsDSL != null && dsDSL.Tables.Count > 1 && dsDSL.Tables[1].Rows.Count > 0)
            {
                Count = Convert.ToInt32(dsDSL.Tables[1].Rows[0][0].ToString());
            }

            return dsDSL;
        }



        public Hashtable GetDSLContractLeadTime(int CaseID, int AccessSupplierNameID, int PackageID, int ParentCaseID, int PortTypeID, int Country)
        {
            Hashtable ht = new Hashtable();
            string strsql = "select distinct xdsl.LOCAL_LOOP_LEAD_TIME,xdsl.CONTENTION_VALUE,xdsl.INTERCONNECT_DESIGN_NAME desgname from CSU_SUPPLIER_PRODUCT_XDSL xdsl,CAPMAN_DSL_PACKAGE_MAP cpkg, CLA_PRODUCT_PACKAGES pkg where xdsl.DSL_PACKAGE_ID = cpkg.C_PACKAGE_ID and cpkg.PC_PACKAGE_ID = pkg.PACKAGE_ID and pkg.PACKAGE_ID = " + PackageID + " and xdsl.SUPPLIERPRODUCTID =(select distinct cap.C_ACCESS_SUPPLIER_NAME_ID from CAPMAN_SUPPLIER_PROD_NAME_MAP cap ,CLA_PRODUCT_PORT_TYPES pt where pt.case_id = " + ParentCaseID + " and pt.ACCESS_SUPPLIER_NAME_ID = " + AccessSupplierNameID + " and cap.PC_COUNTRY_ID = " + Country + " and pt.ACCESS_SUPPLIER_NAME_ID = cap.PC_ACCESS_SUPPLIER_NAME_ID)";
            OracleCommand cmd = new OracleCommand(strsql, oConn);
            DataSet dsXDSL = ExecuteDataSet(cmd);
            int LocalLeadTime = 0;
            int ContractedLeadTime = 0;
            string ContentionValue = "", DesignName = "";
            if (dsXDSL != null && dsXDSL.Tables.Count > 0 && dsXDSL.Tables[0].Rows.Count > 0)
            {
                if (!string.IsNullOrEmpty(dsXDSL.Tables[0].Rows[0]["LOCAL_LOOP_LEAD_TIME"].ToString()))
                {
                    LocalLeadTime = Convert.ToInt32(dsXDSL.Tables[0].Rows[0]["LOCAL_LOOP_LEAD_TIME"].ToString());
                }
                ContentionValue = dsXDSL.Tables[0].Rows[0]["CONTENTION_VALUE"].ToString();
                DesignName = dsXDSL.Tables[0].Rows[0]["desgname"].ToString();
            }

            strsql = "SELECT DISTINCT ZPS.SD_CONTRACTED_LEADTIME FROM CSU_ZONE_PRODUCT_SLA ZPS,CAPMAN_SUPPLIER_PROD_NAME_MAP SPM, CAPMAN_DSL_PORTTYPE_MAP DPM WHERE ZPS.SUPPLIERPRODUCTID = SPM.C_ACCESS_SUPPLIER_NAME_ID AND SPM.PC_ACCESS_SUPPLIER_NAME_ID = " + AccessSupplierNameID + " AND SPM.PC_COUNTRY_ID = " + Country + " AND ZPS.PORTTYPEID = DPM.C_PORTTYPE_ID AND DPM.PC_PORTTYPE_ID =" + PortTypeID;
            cmd = null;
            cmd = new OracleCommand(strsql, oConn);
            DataSet dsZone = ExecuteDataSet(cmd);
            if (dsZone != null && dsZone.Tables.Count > 0 && dsZone.Tables[0].Rows.Count > 0)
            {
                if (!string.IsNullOrEmpty(dsZone.Tables[0].Rows[0]["SD_CONTRACTED_LEADTIME"].ToString()))
                {
                    ContractedLeadTime = Convert.ToInt32(dsZone.Tables[0].Rows[0]["SD_CONTRACTED_LEADTIME"].ToString());
                }
            }


            ht.Add("EndToEndLeadTime", LocalLeadTime + ContractedLeadTime);
            ht.Add("ContractedLeadTime", ContractedLeadTime);
            ht.Add("ContentionValue", ContentionValue);
            ht.Add("DesignName", DesignName);
            return ht;
        }

        public DataSet ExecuteDataSet(OracleCommand cmd)
        {
            DataSet ds = new DataSet();
            OracleDataAdapter dad = new OracleDataAdapter(cmd);
            dad.Fill(ds);
            return ds;
        }
    }
}
