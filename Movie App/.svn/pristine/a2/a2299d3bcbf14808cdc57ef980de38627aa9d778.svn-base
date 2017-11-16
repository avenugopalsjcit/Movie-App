using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Data;
using Oracle.DataAccess.Client;

namespace SCSearchDAL
{
    public class CPEInformationDAL
    {
        private StringBuilder strQuery = new StringBuilder();
        private GetDataFromDB objGetDataFromDB = new GetDataFromDB();
        //this method build query for router,bundle,Aceesstechnology,EOS,EOQ,EOL
        public DataTable GetValidProductBundlesForCountry(int productID, int countryID, bool isBTCPE)
        {
            if (!isBTCPE)
            {
                strQuery.Clear();
                strQuery.Append("SELECT c.char_name as bundlename,c.char_id as bundleid,(select char_name from csu_ref_valid_char b");
                strQuery.Append(" where b.char_id = router_id) routername,");
                strQuery.Append(" (SELECT listagg (Reverse(SUBSTR(Reverse(char_name),1, instr(Reverse(char_name),'htiw')-1)), ',')");
                strQuery.Append("  WITHIN GROUP (ORDER BY char_id)");
                strQuery.Append(" from csu_ref_valid_char where char_id in (select distinct Access_type from CSU_CPE_CNTRY_BNDLS_ACCTYPE");
                strQuery.Append(" where bundle_id =  x.xid and COUNTRY_ID = " + countryID + ") and (upper(CHAR_NAME) not like '%DSL%' AND");
                strQuery.Append(" upper(CHAR_NAME) not like '%HVPN%') And Upper(Char_Name) Not Like '%FTT%' And Upper(Char_Name) not Like '%VSAT%') AccessTech,PARTIAL_BNDL_FLAG,");
                strQuery.Append(" decode(to_char(expected_date,'DD-MON-YYYY'),'31-DEC-4712','',to_char(expected_date, 'DD-MON-YYYY')) as EXPECTED_DATE,");
                strQuery.Append(" decode(to_char(quotable_start_date,'DD-MON-YYYY'),'31-DEC-4712','',to_char(quotable_start_date,'DD-MON-YYYY')) as QUOTABLEDT,");
                strQuery.Append(" decode(to_char(eos_date,'DD-MON-YYYY'),'31-DEC-4712','',to_char(eos_date,'DD-MON-YYYY')) as EOSDT,");
                strQuery.Append(" decode(to_char(eoq_date,'DD-MON-YYYY'),'31-DEC-4712','',to_char(eoq_date,'DD-MON-YYYY')) as EOQDT,");
                strQuery.Append(" decode(to_char(eol_date,'DD-MON-YYYY'),'31-DEC-4712','',to_char(eol_date,'DD-MON-YYYY')) as EOLDT,");
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

                strQuery.Append(" and (SELECT listagg (SUBSTR(char_name, instr(char_name,' ',1,2)), ',') WITHIN GROUP (");
                strQuery.Append(" ORDER BY char_name)");
                strQuery.Append(" From Csu_Ref_Valid_Char");
                strQuery.Append(" WHERE char_id IN");
                strQuery.Append("  (SELECT DISTINCT Access_type");
                strQuery.Append("  FROM CSU_CPE_CNTRY_BNDLS_ACCTYPE");
                strQuery.Append("   WHERE bundle_id = x.xid");
                strQuery.Append("   AND COUNTRY_ID  =" + countryID + " )");
                strQuery.Append(" And (Upper(Char_Name) Not  Like '%DSL%'");
                strQuery.Append(" And Upper(Char_Name) Not Like '%HVPN%'");
                strQuery.Append(" And Upper(Char_Name) Not  Like '%FTT%'");
                strQuery.Append(" And Upper(Char_Name) not  Like '%VSAT%')) is not null");
            }
            else
            {
                strQuery.Clear();
                strQuery.Append("SELECT c.char_name as bundlename,c.char_id as bundleid,(select char_name from csu_ref_valid_char b");
                //strQuery.Append(" where b.char_id = router_id) routername,(SELECT listagg (SUBSTR(char_name,");
                //strQuery.Append(" instr(char_name,' ',1,2)), ',') WITHIN GROUP (ORDER BY char_id)");
                strQuery.Append(" where b.char_id = router_id) routername,(SELECT listagg (Reverse(SUBSTR(Reverse(char_name),1, instr(Reverse(char_name),'htiw')-1)), ',')");
                strQuery.Append(" WITHIN GROUP (ORDER BY char_id)");
                strQuery.Append(" from csu_ref_valid_char where char_id in (select distinct Access_type from CSU_CPE_CNTRY_BNDLS_ACCTYPE");
                strQuery.Append(" where bundle_id =  x.xid and COUNTRY_ID = " + countryID + ")) AccessTech,PARTIAL_BNDL_FLAG,");
                strQuery.Append(" decode(to_char(expected_date,'DD-MON-YYYY'),'31-DEC-4712','',to_char(expected_date, 'DD-MON-YYYY')) as EXPECTED_DATE,");
                strQuery.Append(" decode(to_char(quotable_start_date,'DD-MON-YYYY'),'31-DEC-4712','',to_char(quotable_start_date,'DD-MON-YYYY')) as QUOTABLEDT,");
                strQuery.Append(" decode(to_char(eos_date,'DD-MON-YYYY'),'31-DEC-4712','',to_char(eos_date,'DD-MON-YYYY')) as EOSDT,");
                strQuery.Append(" decode(to_char(eoq_date,'DD-MON-YYYY'),'31-DEC-4712','',to_char(eoq_date,'DD-MON-YYYY')) as EOQDT,");
                strQuery.Append(" decode(to_char(eol_date,'DD-MON-YYYY'),'31-DEC-4712','',to_char(eol_date,'DD-MON-YYYY')) as EOLDT,");
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
            }

            return objGetDataFromDB.GetDataTable(strQuery.ToString());

        }

        public DataTable GetCPEMaintainanceDetails(int ProductID, int SupplierID, int CountryID, int CityID)
        {
            strQuery.Clear();
            strQuery.Append("SELECT 1 as id FROM CSU_REF_PRODUCT_OPT_MATRIX A,CSU_REF_VALID_CHAR B,CSU_REF_CHAR_TYPE C");
            strQuery.Append(" WHERE A.CHAR_ID=B.CHAR_ID AND A.CHAR_TYPE_ID=C.CHAR_TYPE_ID");
            strQuery.Append(" AND C.CHAR_TYPE_ID=B.CHAR_TYPE_ID AND C.CHAR_TYPE_NAME='CPE Maintenance Options'");
            strQuery.Append(" AND PRODUCT_CD='63' AND A.CPE_PRODUCT_MAP='" + ProductID + "'");


            //List<CPEMaintainanceDetails> lstMaintDet = null;
            try
            {
                OracleConnection oConn = objGetDataFromDB.openConnection();
                IDataReader dr1 = objGetDataFromDB.getDataReaderFromDB(oConn, strQuery.ToString());
                if (!dr1.Read()) { ProductID = -1; }
                dr1.Close();
                oConn.Close();
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

                return objGetDataFromDB.GetDataTable(strQuery.ToString());

            }
            catch (Exception ex) { throw ex; }


        }

        public DataTable GetSupplierCity(int countryID, int CityID, int supplierID)
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
            return objGetDataFromDB.GetDataTable(strQuery.ToString());
        }

        public DataTable GetSupplier(int countryId, int prodId, int cityId)
        {
            strQuery.Clear();
            strQuery.Append("select distinct vcdr.supplier as supplierid,vcdr.supp_name as suppliername,vcdr.supplier_type as suppliertype from ");
            strQuery.Append(" vw_cpe_data_report vcdr, mv_cpe_service_availability b where vcdr.country =" + countryId);
            strQuery.Append(" and vcdr.product_id in (-1," + prodId + ")");
            strQuery.Append(" and vcdr.supplier_type <> 'Aggregator'");
            strQuery.Append(" and vcdr.country_supplier_validity in (1,2) and vcdr.country = b.country_id and vcdr.supplier = b .supplier_id");
            strQuery.Append(" AND b.CITY_ID =" + cityId);
            return objGetDataFromDB.GetDataTable(strQuery.ToString());
        }

        public DataTable GetOneVoiceSupplier(int countryID)
        {
            strQuery.Clear();
            strQuery.Append("select distinct supplier,supp_name from vw_cpe_data_report");
            strQuery.Append(" where country=" + countryID);
            strQuery.Append(" and EOM_PASSED = 'Black' ");
            strQuery.Append(" and supplier_type <> 'Aggregator' ");
            strQuery.Append(" and country_supplier_validity = 1 order by supp_name"); //and supplier_type='Preferred SSP' ");
            return objGetDataFromDB.GetDataTable(strQuery.ToString());
        }

        public DataTable getMaintSupplier(int countryID)
        {
            strQuery.Clear();
            strQuery.Append("select supplier,supplier_name from vw_cpe_country_validity ");
            strQuery.Append(" where country_validity=1 and country=" + countryID + "  and supplier_type <> 'Aggregator'");
            return objGetDataFromDB.GetDataTable(strQuery.ToString());
        }

        public DataTable GetStandardPartName(int bundleId)
        {
            strQuery.Clear();
            strQuery.Append("Select distinct b.name from csu_cpe_std_parts a, csu_cpe_parts b where a.bundle_id = " + bundleId);
            strQuery.Append("and b.id = a.part_id and upper(part_type)<>'CPE SOFTWARE' order by 1");
            return objGetDataFromDB.GetDataTable(strQuery.ToString());
        }

        public DataTable getProductCharecteristics(int caseID)
        {
            strQuery.Clear();

            strQuery.Append("Select char_type_name,char_type_alias, Char_Name, e.Avail_desc, c.char_avail_cd, ");
            strQuery.Append("char_value, char_value_2, char_unit_of_measure, display_order_cd,c.char_id,c.char_type_id, e.AVAIL_CD ");
            strQuery.Append("from csu_ref_char_type a, csu_ref_valid_char b, ");
            strQuery.Append("csu_case_details c, csu_ref_product_opt_matrix d, csu_ref_availability e ");
            strQuery.Append("where c.case_id = " + caseID + " and ");

            strQuery.Append("a.char_type_id = b.char_type_id and ");
            strQuery.Append("b.char_type_id = c.char_type_id and ");
            strQuery.Append("b.char_id = c.char_id  and ");
            strQuery.Append("c.option_matrix_id = d.option_matrix_id and ");
            strQuery.Append("d.OPTION_MATRIX_VALID_CD = 1 and ");
            strQuery.Append("e.avail_cd(+) = c.char_avail_cd and ");
            strQuery.Append("b.char_valid_cd = 1 and ");
            strQuery.Append("(c.case_detail_valid_cd = 1");
            strQuery.Append(" or Exists (select 'x'  from csu_ref_char_type where c.char_type_id = csu_ref_char_type.char_type_id and upper(char_type_name) like 'DISPLAY PLACEHOLDER%') ");
            strQuery.Append(" ) ORDER BY d.display_order_cd,char_num_value,char_type_id ");
            return objGetDataFromDB.GetDataTable(strQuery.ToString());
        }

        public string getCPELaunchStatus(int countryID)
        {
            strQuery.Clear();
            strQuery.Append("SELECT data_report(country_id,0,0,0) as CPEAvailability FROM csu_country WHERE country_id =" + countryID);
            return objGetDataFromDB.GetSingleRowFromDB(strQuery.ToString());
        }

        public string getCPEStatus(int productID, int caseID)
        {
            strQuery.Clear();
            strQuery.Append("select use_cpe_product from csu_product where product_cd=" + productID);
            return objGetDataFromDB.GetSingleRowFromDB(strQuery.ToString());
            //string IsCPE=objGetDataFromDB.GetSingleRowFromDB(strQuery.ToString());
            //if (IsCPE == "0")
            //    return IsCPE;
            //else
            //    strQuery.Clear();

            //strQuery.Append("SELECT ");
            //strQuery.Append("  CASE ");
            //strQuery.Append("    WHEN COUNT(1) > 0 ");
            //strQuery.Append("    THEN 1 ");
            //strQuery.Append("    ELSE 0 ");
            //strQuery.Append("  END use_cpe_product ");
            //strQuery.Append("FROM csu_ref_char_type A, ");
            //strQuery.Append("  csu_ref_valid_char b, ");
            //strQuery.Append("  csu_case_details c, ");
            //strQuery.Append("  csu_ref_product_opt_matrix d, ");
            //strQuery.Append("  csu_ref_availability e ");
            //strQuery.Append(" WHERE c.case_id              = " + caseID);
            //strQuery.Append(" AND upper(char_name) in ('CPE PRODUCT BUNDLES','CPE MAINTENANCE OPTIONS','CPE BUNDLES')");
            //strQuery.Append(" AND A.char_type_id           = b.char_type_id ");
            //strQuery.Append(" AND b.char_type_id           = c.char_type_id ");
            //strQuery.Append(" AND b.char_id                = c.char_id ");
            //strQuery.Append(" AND c.option_matrix_id       = d.option_matrix_id ");
            //strQuery.Append(" AND d.OPTION_MATRIX_VALID_CD = 1 ");
            //strQuery.Append("AND e.avail_cd(+)            = c.char_avail_cd ");
            //strQuery.Append("AND b.char_valid_cd          = 1 ");
            //strQuery.Append("AND (c.case_detail_valid_cd  = 1 ");
            //strQuery.Append("OR EXISTS ");
            //strQuery.Append("  (SELECT 'x' ");
            //strQuery.Append("  FROM csu_ref_char_type ");
            //strQuery.Append("  WHERE c.char_type_id = csu_ref_char_type.char_type_id ");
            //strQuery.Append("  AND upper(char_type_name) LIKE 'DISPLAY PLACEHOLDER%' ");
            //strQuery.Append("  ))");

            //return objGetDataFromDB.GetSingleRowFromDB(strQuery.ToString());

        }

    }
}
