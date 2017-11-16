using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Data;
using Oracle.DataAccess.Client;
using System.Configuration;

namespace SCSearchDAL
{
     public class VSATDAL
    {
        DataSet ds;
        OracleDataAdapter dad;
        OracleConnection con = new OracleConnection(ConfigurationManager.AppSettings.Get("OraConnString"));

        public DataSet GetCaseID(int regionid, int countryid, int productid)
        {
            string strSql = "select CASE_ID from CLA_PRODUCT_CASES where REGION_ID = " + regionid + " and COUNTRY_ID = " + countryid + " and CASE_VALID_CD = 1 and PRODUCT_CD =" + productid;

            OracleCommand cmd = new OracleCommand(strSql.ToString(), con);
            ds = new DataSet();
            dad = new OracleDataAdapter(cmd);
            dad.Fill(ds);
            return ds;

        }

        public DataSet GetVsatAccessSupplier(int CaseID, int PackageID,int ProductID,int ParentProductID,int ParentCaseID)
        {
            string strQry = "SELECT vc.CHAR_NAME,pt.ACCESS_SUPPLIER_CHAR_ID FROM CSU_REF_VALID_CHAR vc,CLA_PRODUCT_PORT_TYPES pt,CLA_PRODUCT_PACKAGES pkg, cla_product_access_type A WHERE pkg.CASE_ID = "+CaseID+" AND pkg.VALID_CD = 1 AND pkg.CASE_ID = pt.CASE_ID AND pkg.CASE_PKG_ID = pt.CASE_PKG_ID AND pt.ACCESS_SUPPLIER_CHAR_ID = vc.CHAR_ID AND A.ACCESS_PRODUCT_TYPE_ID = 5802 AND pt.ACCESS_PRODUCT_TYPE_ID = A.ACCESS_PRODUCT_TYPE_ID AND A.PRODUCT_CD = "+ProductID+" AND pkg.PACKAGE_ID = "+PackageID+" AND pt.PORT_TYPE_VALID_CD = 1";
            strQry += " UNION ";
            strQry += " SELECT vc.CHAR_NAME,pt.ACCESS_SUPPLIER_CHAR_ID FROM CSU_REF_VALID_CHAR vc,CLA_PRODUCT_PORT_TYPES pt,CLA_PRODUCT_PACKAGES pkg, cla_product_access_type A WHERE pkg.CASE_ID = "+ParentCaseID+" AND pkg.VALID_CD = 1 AND pkg.CASE_ID = pt.CASE_ID AND pkg.CASE_PKG_ID = pt.CASE_PKG_ID AND pt.ACCESS_SUPPLIER_CHAR_ID = vc.CHAR_ID AND A.ACCESS_PRODUCT_TYPE_ID = 5802 AND pt.ACCESS_PRODUCT_TYPE_ID = A.ACCESS_PRODUCT_TYPE_ID AND A.PRODUCT_CD = "+ParentProductID+" AND pkg.PACKAGE_ID = "+PackageID+" AND pt.PORT_TYPE_VALID_CD = 1 ORDER BY 1";

            OracleCommand cmd = new OracleCommand(strQry, con);
            ds = new DataSet();
            dad = new OracleDataAdapter(cmd);
            dad.Fill(ds);
            return ds;

        }

        public DataSet GetVsatAttributeCursor(int CaseID, int CasePckgID, int AccessSupplierCharID, string PortSpeedCharID, int CountryID, int pckgid, int ParentPackageID, int ParentCaseID,int SupplierID,int ProductID,int PackageID)
        {
            string strQry = "select pt.ACCESS_SUPPLIER_CHAR_ID, a.char_name as supplier_name, pt.ACCESS_SUPPLIER_NAME_ID,pt.Port_Speed_Char_ID, b.char_name as supplier_prodname, pt.PORT_TYPE_ID, c.char_name as porttype_name, pt.ACCESS_PRODUCT_TYPE_ID, e.char_name as access_typename, pt.GPOP_INTERCONNECT, d.HUB_SITE_NAME, f.AVAIL_DESC,pt.PORT_TYPE_AVAIL_CD,pt.PORT_SPEED_AVAIL_CD,pt.PORT_TYPE_VALID_CD ,(select vsat_supply_type_name from v_pc_supplier_product where supplierproductid = (select c_access_supplier_name_id from capman_supplier_prod_name_map where pc_access_supplier_name_id = pt.ACCESS_SUPPLIER_NAME_ID)) as vsat_supply_type ,(select Ethernet_phase_attribute from v_pc_supplier_product where supplierproductid = (select c_access_supplier_name_id from capman_supplier_prod_name_map where pc_access_supplier_name_id = pt.ACCESS_SUPPLIER_NAME_ID)) as ethernet_phase_attribute from cla_product_port_types pt, csu_ref_valid_char a, csu_ref_valid_char b, csu_ref_valid_char c, csu_hub_site d, csu_ref_valid_char e, csu_ref_availability f, cla_product_access_type g ,vw_sc_porttype_elements i, port_to_access_speeds j where pt.ACCESS_SUPPLIER_CHAR_ID = a.char_id and pt.ACCESS_SUPPLIER_NAME_ID = b.char_id and pt.PORT_TYPE_ID = c.char_id and pt.GPOP_INTERCONNECT = d.hub_site_id AND pt.ACCESS_PRODUCT_TYPE_ID =5802 and pt.ACCESS_PRODUCT_TYPE_ID = e.char_id and pt.PORT_TYPE_AVAIL_CD = f.AVAIL_CD and i.sc_porttype_id = pt.port_type_id and i.sc_aspeed_down_up_id = j.access_speed_char_id and j.port_speed_char_id = pt.port_speed_char_id and j.access_type_char_id = pt.access_product_type_id and pt.PORT_TYPE_VALID_CD = 1 and case_id = " + ParentCaseID + " and pt.case_pkg_id = " + ParentPackageID + " AND pt.access_supplier_char_id = " + SupplierID + " and g.product_cd = " + ProductID + " and g.access_product_type_id = pt.access_product_type_id ";
            if(PortSpeedCharID!="0")
            {
                strQry += " and pt.port_speed_char_id IN (" + PortSpeedCharID + ")  ";
            }
            strQry += " and not exists ( SELECT 'x' FROM cla_parent_port_types i WHERE i.case_id = " + CaseID + " AND i.case_pkg_id = " + CasePckgID + " AND i.access_supplier_char_id = pt.access_supplier_char_id AND i.access_supplier_name_id = pt.access_supplier_name_id AND i.access_product_type_id = pt.access_product_type_id AND i.gpop_interconnect = pt.gpop_interconnect AND i.port_type_id = pt.port_type_id AND i.port_type_valid_cd = 0 ) AND EXISTS ( SELECT 'X' FROM cla_access_set x, cla_port_types y, cla_product_cases z, csu_config_tbl w WHERE w.fieldname = 'DSL ACCESS' AND z.product_cd = w.fieldvalue AND z.country_id = " + CountryID + " AND z.case_id = x.case_id AND x.case_detail_valid_cd = 1 AND x.package_id = " + PackageID + " AND x.case_id = y.case_id AND y.port_type_valid_cd = 1 AND x.case_access_set_id = y.case_access_set_id AND x.access_supplier_char_id = pt.access_supplier_char_id AND x.access_supplier_name_id = pt.access_supplier_name_id AND x.access_product_type_id = pt.access_product_type_id AND x.gpop_interconnect = pt.gpop_interconnect AND y.port_type_id = pt.port_type_id) order by PT.Port_Speed_Char_ID,i.sc_aspeed_down_num, i.sc_aspeed_up_num";

            OracleCommand cmd = new OracleCommand(strQry, con);
            ds = new DataSet();
            dad = new OracleDataAdapter(cmd);
            dad.Fill(ds);
            return ds;
        }

        public DataSet GetVsatParentAttributeCursor(int CaseID, int CasePckgID, int AccessSupplierCharID, string PortSpeedCharID, int CountryID, int PackageID)
        {
            string strQry = "select pt.ACCESS_SUPPLIER_CHAR_ID, a.char_name as supplier_name, pt.ACCESS_SUPPLIER_NAME_ID,pt.Port_Speed_Char_ID, b.char_name as supplier_prodname, pt.PORT_TYPE_ID, c.char_name as porttype_name, pt.ACCESS_PRODUCT_TYPE_ID, e.char_name as access_typename, pt.GPOP_INTERCONNECT, d.HUB_SITE_NAME, f.AVAIL_DESC, pt.PORT_SPEED_CHAR_ID,pt.PORT_SPEED_AVAIL_CD ,(select vsat_supply_type_name from v_pc_supplier_product where supplierproductid = (select c_access_supplier_name_id from capman_supplier_prod_name_map where pc_access_supplier_name_id = pt.ACCESS_SUPPLIER_NAME_ID)) as vsat_supply_type ,(select Ethernet_phase_attribute from v_pc_supplier_product where supplierproductid = (select c_access_supplier_name_id from capman_supplier_prod_name_map where pc_access_supplier_name_id = pt.ACCESS_SUPPLIER_NAME_ID)) as ethernet_phase_attribute from cla_product_port_types pt, csu_ref_valid_char a, csu_ref_valid_char b, csu_ref_valid_char c, csu_hub_site d, csu_ref_valid_char e, csu_ref_availability f, cla_product_access_type g , cla_product_cases h ,vw_sc_porttype_elements i, port_to_access_speeds j where pt.ACCESS_SUPPLIER_CHAR_ID = a.char_id and pt.ACCESS_SUPPLIER_NAME_ID = b.char_id and pt.PORT_TYPE_ID = c.char_id and pt.GPOP_INTERCONNECT = d.hub_site_id AND pt.ACCESS_PRODUCT_TYPE_ID =5802 and pt.ACCESS_PRODUCT_TYPE_ID = e.char_id and pt.PORT_TYPE_AVAIL_CD = f.AVAIL_CD and pt.PORT_TYPE_VALID_CD = 1 and i.sc_porttype_id = pt.port_type_id and i.sc_aspeed_down_up_id = j.access_speed_char_id and j.port_speed_char_id = pt.port_speed_char_id and j.access_type_char_id = pt.access_product_type_id and pt.case_id = " + CaseID + " and pt.case_pkg_id = " + CasePckgID + " AND pt.access_supplier_char_id = " + AccessSupplierCharID;
            if (PortSpeedCharID != "0")
            {
                strQry += " and pt.port_speed_char_id IN (" + PortSpeedCharID + ") ";
            }
            strQry += " AND h.case_id = pt.case_id AND g.access_product_type_id = pt.access_product_type_id and g.product_cd = h.product_cd AND EXISTS ( SELECT 'X' FROM cla_access_set x, cla_port_types y, cla_product_cases z, csu_config_tbl w WHERE w.fieldname = 'DSL ACCESS' AND z.product_cd = w.fieldvalue AND z.country_id = " + CountryID + " AND z.case_id = x.case_id AND x.case_detail_valid_cd = 1 AND x.package_id = " + PackageID + " AND x.case_id = y.case_id AND y.port_type_valid_cd = 1 AND x.case_access_set_id = y.case_access_set_id AND x.access_supplier_char_id = pt.access_supplier_char_id AND x.access_supplier_name_id = pt.access_supplier_name_id AND x.access_product_type_id = pt.access_product_type_id AND x.gpop_interconnect = pt.gpop_interconnect AND y.port_type_id = pt.port_type_id) order by PT.Port_Speed_Char_ID,i.sc_aspeed_down_num,i.sc_aspeed_up_num";

            OracleCommand cmd = new OracleCommand(strQry, con);
            ds = new DataSet();
            dad = new OracleDataAdapter(cmd);
            dad.Fill(ds);
            return ds;
        }

        public DataSet GetVsatXDSLCursor(int CaseID, int pckgid, int AccessSupplierCharID, int CountryID)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("  SELECT DISTINCT xdsl.LOCAL_LOOP_LEAD_TIME,xdsl.CONTENTION_VALUE FROM CSU_SUPPLIER_PRODUCT_XDSL xdsl,");
            strSql.Append(" CAPMAN_DSL_PACKAGE_MAP cpkg, CLA_PRODUCT_PACKAGES pkg WHERE xdsl.DSL_PACKAGE_ID = cpkg.C_PACKAGE_ID ");
            strSql.Append(" AND cpkg.PC_PACKAGE_ID = pkg.PACKAGE_ID");
            strSql.Append(" AND pkg.PACKAGE_ID = " + pckgid + " ");
            strSql.Append(" AND xdsl.SUPPLIERPRODUCTID =(SELECT DISTINCT cap.C_ACCESS_SUPPLIER_NAME_ID ");
            strSql.Append(" FROM CAPMAN_SUPPLIER_PROD_NAME_MAP cap ,CLA_PRODUCT_PORT_TYPES pt ");
            strSql.Append(" WHERE pt.case_id = " + CaseID + " AND pt.ACCESS_SUPPLIER_NAME_ID =" + AccessSupplierCharID + "");
            strSql.Append(" AND cap.PC_COUNTRY_ID = " + CountryID + " AND pt.ACCESS_SUPPLIER_NAME_ID = cap.PC_ACCESS_SUPPLIER_NAME_ID)  ");


            OracleCommand cmd = new OracleCommand(strSql.ToString(), con);
            ds = new DataSet();
            dad = new OracleDataAdapter(cmd);
            dad.Fill(ds);
            return ds;

        }

        public DataSet GetVsatSupplierCursor(int CaseID, int AccessSupplierCharID, int CasePckgID,int Parent)
        {
            StringBuilder strSql = new StringBuilder();
            if (Parent == 1)
            {
                strSql.Append(" select distinct vc.CHAR_NAME,pt.ACCESS_SUPPLIER_CHAR_ID from CLA_PRODUCT_PORT_TYPES pt,CSU_REF_VALID_CHAR vc");
            }
            else
            {
                strSql.Append(" select distinct vc.CHAR_NAME,pt.ACCESS_SUPPLIER_CHAR_ID from CLA_PARENT_PORT_TYPES pt,CSU_REF_VALID_CHAR vc");
            }

            strSql.Append(" where pt.case_id = " + CaseID + " AND pt.CASE_PKG_ID=" + CasePckgID + " and pt.ACCESS_SUPPLIER_CHAR_ID = vc.CHAR_ID and vc.CHAR_VALID_CD = 1 ");
            strSql.Append(" and pt.ACCESS_SUPPLIER_CHAR_ID = " + AccessSupplierCharID + "");
            strSql.Append(" and pt.PORT_TYPE_VALID_CD = 1 order by CHAR_NAME");

            OracleCommand cmd = new OracleCommand(strSql.ToString(), con);
            ds = new DataSet();
            dad = new OracleDataAdapter(cmd);
            dad.Fill(ds);
            return ds;

        }

        public DataSet GetVsatPortSpeedCursor(int CaseID, int PortSpeedID)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("SELECT Distinct A.CHAR_ID,a.char_actual_value, a.char_actual_value_2,");
            strSql.Append(" a.char_unit_of_measure,a.char_unit_of_measure_2 from csu_ref_valid_char a,");
            strSql.Append(" port_to_access_speeds pas, cla_product_port_types pt ");
            strSql.Append(" where pt.case_id= " + CaseID + "");
            strSql.Append(" and a.CHAR_ID = pas.PORT_SPEED_CHAR_ID and pt.PORT_SPEED_CHAR_ID = pas.PORT_SPEED_CHAR_ID ");
            strSql.Append(" and a.char_id = " + PortSpeedID + "");
            OracleCommand cmd = new OracleCommand(strSql.ToString(), con);
            ds = new DataSet();
            dad = new OracleDataAdapter(cmd);
            dad.Fill(ds);
            return ds;
        }

        public DataSet GetVsatPortSpeedAvail(int AvailCd)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("Select distinct avail_desc from csu_ref_availability where avail_cd =" + AvailCd + " ");
            OracleCommand cmd = new OracleCommand(strSql.ToString(), con);
            ds = new DataSet();
            dad = new OracleDataAdapter(cmd);
            dad.Fill(ds);
            return ds;
        }

        public int GetDeliveryTime(int ParentCaseID, int AccessSupplierNameID, int Country)
        {
            string sql = "Select TIME_TO_DELIVER from CSU_HVPN_PRICING_SHEET chps, CSU_SUPPLIER_PRODUCT_XDSL xdsl where COUNTRY_CODE in ( SELECT DISTINCT COUNTRY_CODE FROM CSU_COUNTRY WHERE COUNTRY_ID = " + Country + " AND COUNTRY_VALID_CD = 1) and xdsl.Product_code = chps.product_code and xdsl.Supplierproductid = (select distinct cap.C_ACCESS_SUPPLIER_NAME_ID from CAPMAN_SUPPLIER_PROD_NAME_MAP cap ,CLA_PRODUCT_PORT_TYPES pt where pt.case_id = " + ParentCaseID + " and pt.ACCESS_SUPPLIER_NAME_ID = " + AccessSupplierNameID + " and cap.PC_COUNTRY_ID = " + Country + " and pt.ACCESS_SUPPLIER_NAME_ID = cap.PC_ACCESS_SUPPLIER_NAME_ID)";
            OracleCommand cmd = new OracleCommand(sql, con);
            DataSet ds = ExecuteDataSet(cmd);
            int DeliveryTime = 0;
            if (ds != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
            {
                DeliveryTime = Convert.ToInt32(ds.Tables[0].Rows[0]["TIME_TO_DELIVER"].ToString());
            }
            return DeliveryTime * 7;
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
