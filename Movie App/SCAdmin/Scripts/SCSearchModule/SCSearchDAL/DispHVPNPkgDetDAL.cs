using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Data;

namespace SCSearchDAL
{
    public class DispHVPNPkgDetDAL
    {
        private StringBuilder strQuery = new StringBuilder();
        private GetDataFromDB objGetDataFromDB = new GetDataFromDB();

        public DataTable getHVPNPkgAtt(int countryID,int suppProdID)
        {
            strQuery.Clear();
            strQuery.Append("select ct.ISP_ADDRESSING,ct.OTHER_SERVICE_NOTES,ct.PRODUCT_CODE, ");
            strQuery.Append(" ct.AGGREGATOR,ct.COPPER_DETAILS,ct.COPPER_SERVICE_ID,ct.PRICING_NOTES, ");
            strQuery.Append(" ct.RFA_NOTES, ct.RFO_NOTES From CSU_HVPN_PRICING_SHEET ct,  CSU_SUPPLIER_PRODUCT_XDSL xdsl");
            strQuery.Append(" where  COUNTRY_CODE in ( SELECT COUNTRY_CODE FROM CSU_COUNTRY WHERE COUNTRY_ID  = "+countryID+" AND COUNTRY_VALID_CD = 1)");
            strQuery.Append(" and xdsl.Product_code = ct.product_code and xdsl.Supplierproductid = (select distinct cap.C_ACCESS_SUPPLIER_NAME_ID from ");
            strQuery.Append(" CAPMAN_SUPPLIER_PROD_NAME_MAP cap ,CLA_PRODUCT_PORT_TYPES pt where pt.ACCESS_SUPPLIER_NAME_ID = " + suppProdID + " and ");
            strQuery.Append(" cap.PC_COUNTRY_ID = "+countryID+" and pt.ACCESS_SUPPLIER_NAME_ID = cap.PC_ACCESS_SUPPLIER_NAME_ID)");

            return objGetDataFromDB.GetDataTable(strQuery.ToString());
        }

        public DataTable getCPEDetails()
        {
           string strQry= "Select COUNTRY,CPA,CPE_SUPPLIER,AGGREGATOR_BAU,SPLIT_TUNNELING from V_PC_HVPN_SERVICE_GATEWAY ORDER BY COUNTRY";
            return objGetDataFromDB.GetDataTable(strQry);
        
        }

        public DataTable GetAvailMatrixRule(int ProductID)
        {
            strQuery.Append(" SELECT cc.country_name cntry, crvc.char_name supp, ccpe.access_type atype, ccpe.acc_tech atech, ccpe.acc_cpe_bundle acpebun, cp.product_name product, ccpe.com_acc_cpe_order acpeorder ");
            strQuery.Append(" FROM csu_cpe_com_acc_cpe_avail ccpe, csu_country cc,csu_product cp,csu_ref_valid_char crvc WHERE ccpe.product_id = " + ProductID + " ");
            strQuery.Append(" AND cc.country_id = ccpe.country_id AND cc.country_valid_cd = 1 AND ccpe.supplier_id = crvc.char_id AND crvc.char_valid_cd = 1 ");
            strQuery.Append("  AND cp.PRODUCT_CD = ccpe.PRODUCT_ID AND cp.PRODUCT_VALID_CD = 1 order by cc.country_name ");
            return objGetDataFromDB.GetDataTable(strQuery.ToString());
        }

        public DataTable GetDSLPackageDetails(int ParentProductID, int CaseID, int PackageID, int ParentCaseID)
        {
            string strQry = "select distinct b.char_name,c.char_type_name,cd.CHAR_VALUE,c.CHAR_TYPE_VALUE_COUNT, a.char_level, d.avail_desc from csu_ref_product_opt_matrix a , csu_ref_valid_char b,csu_ref_char_type c,CLA_PARENT_CASE_DETAILS cd, csu_ref_availability d where a.product_cd = " + ParentProductID + " and a.char_id = b.char_id and a.CHAR_TYPE_ID = c.CHAR_TYPE_ID and c.CHAR_TYPE_ID = b.CHAR_TYPE_ID and upper(a.char_level) in ('COUNTRY', 'COUNTRYPORTTYPE') and a.OPTION_MATRIX_ID = cd.OPTION_MATRIX_ID and a.CHAR_TYPE_ID = cd.CHAR_TYPE_ID and a.CHAR_ID = cd.CHAR_ID and cd.CASE_ID = " + CaseID + " and cd.CASE_PKG_ID in (SELECT case_pkg_id FROM cla_product_packages WHERE case_id = " + CaseID + " AND package_id = " + PackageID + ")and cd.CASE_DETAIL_VALID_CD = 1 and cd.char_avail_cd = d.avail_cd and not exists (select 'X' from cla_product_case_details x,cla_product_packages y where x.CASE_ID = y.CASE_ID and x.CASE_PKG_ID =y.CASE_PKG_ID and x.CASE_DETAIL_VALID_CD = 0 and x.CHAR_TYPE_ID = cd.CHAR_TYPE_ID and x.CHAR_ID = cd.CHAR_ID and x.OPTION_MATRIX_ID = cd.OPTION_MATRIX_ID and x.CASE_ID = " + ParentCaseID + " and y.PACKAGE_ID = " + PackageID + ") order by a.char_level, b.char_name ";
            return objGetDataFromDB.GetDataTable(strQry);

        }


        public DataTable GetDSLCountryDetails(int CaseID, int PackageID, int ParentCaseID, int ParentPackageID)
        {
            string strQry = "select b.CASE_PKG_ID from cla_product_access_set a, cla_product_access_set b where b.ACCESS_SET_ID = a.ACCESS_SET_ID and b.PORT_TYPE_ID = a.PORT_TYPE_ID and a.CASE_ID = " + ParentCaseID + " and a.CASE_PKG_ID = " + ParentPackageID + " and b.CASE_ID = " + CaseID;
            DataTable dt=objGetDataFromDB.GetDataTable(strQry);
            int ChildPckgID = 0;
            if (dt != null && dt.Rows.Count > 0)
            {
                ChildPckgID =Convert.ToInt32(dt.Rows[0]["CASE_PKG_ID"].ToString());
            }

            strQry = "SELECT c.char_type_name,c.char_type_value_count,d.char_name,a.char_value, e.avail_desc FROM cla_parent_case_details a,csu_ref_product_opt_matrix b, csu_ref_char_type c,csu_ref_valid_char d, csu_ref_availability e WHERE a.option_matrix_id = b.option_matrix_id AND a.char_type_id = c.char_type_id AND a.char_id = d.char_id AND e.avail_cd = a.char_avail_cd AND a.case_detail_valid_cd = 1 AND b.char_level = 'COUNTRYPORTTYPE' AND NOT EXISTS ( SELECT 'X' FROM cla_product_case_details x WHERE x.case_detail_valid_cd = 0 AND x.char_id = a.char_id AND x.char_type_id = a.char_type_id AND x.option_matrix_id = a.option_matrix_id AND x.case_id = " + ParentCaseID + " AND x.case_pkg_id = " + ParentPackageID + " ) AND a.case_id = " + CaseID + " AND a.case_pkg_id = " + ChildPckgID;
            return objGetDataFromDB.GetDataTable(strQry);
        }

        public DataTable GetChildAndParentLevelData(int isDSL, int ProductID, int ParentId, int CaseID, int PkgId1, int PCaseID)
        {

            strQuery.Append(" select distinct b.char_name,c.char_type_name,cd.CHAR_VALUE,c.CHAR_TYPE_VALUE_COUNT, a.char_level,d.avail_desc ");
            strQuery.Append(" from csu_ref_product_opt_matrix a , csu_ref_valid_char b,csu_ref_char_type c,CLA_PRODUCT_CASE_DETAILS cd,csu_ref_availability d  ");
            strQuery.Append(" where a.product_cd = " + ProductID + " ");
            strQuery.Append(" and a.char_id = b.char_id and a.CHAR_TYPE_ID = c.CHAR_TYPE_ID and c.CHAR_TYPE_ID = b.CHAR_TYPE_ID ");
            if (isDSL == 1)
            {
                strQuery.Append(" and upper(a.char_level) in ('COUNTRY', 'COUNTRYPORTTYPE') and a.OPTION_MATRIX_ID = cd.OPTION_MATRIX_ID ");
            }
            else
            {
                strQuery.Append(" and upper(a.char_level) in ('HVPN_PACKAGE', 'HVPN_PORTTYPE') and a.OPTION_MATRIX_ID = cd.OPTION_MATRIX_ID ");
            }
            strQuery.Append(" and a.CHAR_TYPE_ID = cd.CHAR_TYPE_ID and a.CHAR_ID = cd.CHAR_ID and c.CHAR_TYPE_VALUE_COUNT <> 7 ");
            strQuery.Append(" and cd.CASE_ID = " + CaseID + " and cd.CASE_PKG_ID in ");
            strQuery.Append("(SELECT case_pkg_id ");
            strQuery.Append(" FROM cla_product_packages ");
            strQuery.Append(" WHERE case_id = " + CaseID + " AND package_id = " + PkgId1 + ")");
            strQuery.Append(" and cd.CASE_DETAIL_VALID_CD = 1 and cd.char_avail_cd = d.avail_cd ");


            if (ParentId != 0)
            {
                strQuery.Append(" UNION select distinct b.char_name,c.char_type_name,cd.CHAR_VALUE,c.CHAR_TYPE_VALUE_COUNT, a.char_level,d.avail_desc ");
                strQuery.Append(" from csu_ref_product_opt_matrix a , csu_ref_valid_char b,csu_ref_char_type c,CLA_PARENT_CASE_DETAILS cd,csu_ref_availability d  ");
                strQuery.Append(" where a.product_cd = " + ParentId + " ");
                strQuery.Append(" and a.char_id = b.char_id and a.CHAR_TYPE_ID = c.CHAR_TYPE_ID and c.CHAR_TYPE_ID = b.CHAR_TYPE_ID ");
                strQuery.Append(" and upper(a.char_level) in ('COUNTRY', 'COUNTRYPORTTYPE') and a.OPTION_MATRIX_ID = cd.OPTION_MATRIX_ID ");
                strQuery.Append(" and a.CHAR_TYPE_ID = cd.CHAR_TYPE_ID and a.CHAR_ID = cd.CHAR_ID ");
                strQuery.Append(" and cd.CASE_ID = " + CaseID + " and cd.CASE_PKG_ID in ");
                strQuery.Append("(SELECT case_pkg_id ");
                strQuery.Append(" FROM cla_product_packages ");
                strQuery.Append(" WHERE case_id = " + CaseID + " AND package_id = " + PkgId1 + ")");
                strQuery.Append(" and cd.CASE_DETAIL_VALID_CD = 1 and cd.char_avail_cd = d.avail_cd ");
                strQuery.Append(" and not exists ");
                strQuery.Append(" (select 'X' from cla_product_case_details x,cla_product_packages y ");
                strQuery.Append(" where x.CASE_ID = y.CASE_ID ");
                strQuery.Append(" and x.CASE_PKG_ID =y.CASE_PKG_ID ");
                strQuery.Append(" and x.CASE_DETAIL_VALID_CD = 0 ");
                strQuery.Append(" and x.CHAR_TYPE_ID = cd.CHAR_TYPE_ID ");
                strQuery.Append(" and x.CHAR_ID = cd.CHAR_ID ");
                strQuery.Append(" and x.OPTION_MATRIX_ID = cd.OPTION_MATRIX_ID ");
                strQuery.Append(" and x.CASE_ID = " + PCaseID + " ");
                strQuery.Append(" and y.PACKAGE_ID = " + PkgId1 + ") ");
            }

            strQuery.Append(" order by 5,1 ");

            return objGetDataFromDB.GetDataTable(strQuery.ToString());


        }

        public DataTable GetPTCPkgDetails(int isDSL, int Caseid, int PTCPkgid)
        {
            //if (PTCPkgid > 0)
            //{
            strQuery.Append(" SELECT c.char_type_name,c.char_type_value_count,d.char_name,a.char_value,e.avail_desc ");
            strQuery.Append(" FROM cla_product_case_details a,csu_ref_product_opt_matrix b,");
            strQuery.Append(" csu_ref_char_type c,csu_ref_valid_char d, csu_ref_availability e ");
            strQuery.Append(" WHERE a.option_matrix_id = b.option_matrix_id ");
            strQuery.Append(" AND a.char_type_id = c.char_type_id ");
            strQuery.Append(" AND a.char_id = d.char_id ");
            strQuery.Append(" AND a.CASE_DETAIL_VALID_CD = 1 ");
            if (isDSL == 1)
            {
                strQuery.Append(" AND b.char_level = 'COUNTRYPORTTYPE' ");
            }
            else
            {
                strQuery.Append(" AND b.char_level = 'HVPN_PORTTYPE' ");
            }
            strQuery.Append(" AND e.avail_cd = a.char_avail_cd ");
            strQuery.Append(" AND a.case_id =" + Caseid + " ");
            strQuery.Append(" AND a.case_pkg_id = " + PTCPkgid + " ");
            strQuery.Append(" ORDER BY c.char_type_name, d.char_name ");
            //}
            return objGetDataFromDB.GetDataTable(strQuery.ToString());
        }


        public DataTable GetParentLevelData(int isDSL, int ParentId, int CaseID, int PkgId1, int PCaseID)
        {

            if (ParentId != 0)
            {
                strQuery.Append(" select distinct b.char_name,c.char_type_name,cd.CHAR_VALUE,c.CHAR_TYPE_VALUE_COUNT, a.char_level, d.avail_desc ");
                strQuery.Append(" from csu_ref_product_opt_matrix a , csu_ref_valid_char b,csu_ref_char_type c,CLA_PARENT_CASE_DETAILS cd, csu_ref_availability d ");
                strQuery.Append(" where a.product_cd = " + ParentId + " ");
                strQuery.Append(" and a.char_id = b.char_id and a.CHAR_TYPE_ID = c.CHAR_TYPE_ID and c.CHAR_TYPE_ID = b.CHAR_TYPE_ID ");
                if (isDSL==1)
                {
                    strQuery.Append(" and upper(a.char_level) in ('COUNTRY', 'COUNTRYPORTTYPE') and a.OPTION_MATRIX_ID = cd.OPTION_MATRIX_ID ");
                }
                else
                {
                    strQuery.Append(" and upper(a.char_level) in ('HVPN_PACKAGE', 'HVPN_PORTTYPE') and a.OPTION_MATRIX_ID = cd.OPTION_MATRIX_ID ");
                }
                
                strQuery.Append(" and a.CHAR_TYPE_ID = cd.CHAR_TYPE_ID and a.CHAR_ID = cd.CHAR_ID ");
                strQuery.Append(" and cd.CASE_ID = " + CaseID + " and cd.CASE_PKG_ID in ");
                strQuery.Append("(SELECT case_pkg_id ");
                strQuery.Append(" FROM cla_product_packages ");
                strQuery.Append(" WHERE case_id = " + CaseID + " AND package_id = " + PkgId1 + ")");
                strQuery.Append(" and cd.CASE_DETAIL_VALID_CD = 1 and cd.char_avail_cd = d.avail_cd ");
                strQuery.Append(" and not exists ");
                strQuery.Append(" (select 'X' from cla_product_case_details x,cla_product_packages y ");
                strQuery.Append(" where x.CASE_ID = y.CASE_ID ");
                strQuery.Append(" and x.CASE_PKG_ID =y.CASE_PKG_ID ");
                strQuery.Append(" and x.CASE_DETAIL_VALID_CD = 0 ");
                strQuery.Append(" and x.CHAR_TYPE_ID = cd.CHAR_TYPE_ID ");
                strQuery.Append(" and x.CHAR_ID = cd.CHAR_ID ");
                strQuery.Append(" and x.OPTION_MATRIX_ID = cd.OPTION_MATRIX_ID ");
                strQuery.Append(" and x.CASE_ID = " + PCaseID + " ");
                strQuery.Append(" and y.PACKAGE_ID = " + PkgId1 + ") ");
                strQuery.Append(" order by a.char_level, b.char_name ");
            }
            return objGetDataFromDB.GetDataTable(strQuery.ToString());
        }

        public DataTable GetPTCPkgInfo(int isDSL, int PCaseid, int PPkgId, int Caseid)
        {
            //if (PPkgId > 0)
            //{

            strQuery.Append(" select b.CASE_PKG_ID from cla_product_access_set a, cla_product_access_set b");
            strQuery.Append(" where b.ACCESS_SET_ID = a.ACCESS_SET_ID");
            strQuery.Append(" and b.PORT_TYPE_ID = a.PORT_TYPE_ID");
            strQuery.Append(" and a.CASE_ID = " + PCaseid + " ");
            strQuery.Append(" and a.CASE_PKG_ID = " + PPkgId + " ");
            strQuery.Append(" and b.CASE_ID = " + Caseid + " ");

            //Execute above query
            DataTable dt = objGetDataFromDB.GetDataTable(strQuery.ToString());
            int ChdPId = 0;
            if (dt != null && dt.Rows.Count > 0)
            {
                ChdPId = Convert.ToInt32(dt.Rows[0]["CASE_PKG_ID"].ToString());
            }

            strQuery = new StringBuilder();
            strQuery.Append(" SELECT c.char_type_name,c.char_type_value_count,d.char_name,a.char_value, e.avail_desc ");
            strQuery.Append(" FROM cla_parent_case_details a,csu_ref_product_opt_matrix b,");
            strQuery.Append(" csu_ref_char_type c,csu_ref_valid_char d, csu_ref_availability e ");
            strQuery.Append(" WHERE a.option_matrix_id = b.option_matrix_id ");
            strQuery.Append(" AND a.char_type_id = c.char_type_id ");
            strQuery.Append(" AND a.char_id = d.char_id ");
            strQuery.Append(" AND e.avail_cd = a.char_avail_cd ");
            strQuery.Append(" AND a.case_detail_valid_cd = 1 ");
            if (isDSL == 1)
            {
                strQuery.Append(" AND b.char_level = 'COUNTRYPORTTYPE'");
            }
            else
            {
                strQuery.Append(" AND b.char_level = 'HVPN_PORTTYPE'");
            }
            
            strQuery.Append(" AND NOT EXISTS ( ");
            strQuery.Append(" SELECT 'X' FROM cla_product_case_details x ");
            strQuery.Append(" WHERE x.case_detail_valid_cd = 0 ");
            strQuery.Append(" AND x.char_id = a.char_id ");
            strQuery.Append(" AND x.char_type_id = a.char_type_id");
            strQuery.Append(" AND x.option_matrix_id = a.option_matrix_id ");
            strQuery.Append(" AND x.case_id = " + PCaseid + " ");
            strQuery.Append(" AND x.case_pkg_id =  " + PPkgId + " )");
            strQuery.Append(" AND a.case_id =  " + Caseid + " ");
            strQuery.Append(" AND a.case_pkg_id =  " + ChdPId + " ");
            //}
            return objGetDataFromDB.GetDataTable(strQuery.ToString());

        }

        
    }
}
