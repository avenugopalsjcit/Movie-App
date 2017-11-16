using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Data;

namespace SCSearchDAL
{
    public class DispCPEProductDAL
    {
        private StringBuilder strQuery = new StringBuilder();
        private GetDataFromDB objGetDataFromDB = new GetDataFromDB();

        public DataTable GetAllSupplier(int countryID)
        {
            try
            {
                strQuery.Clear();
                strQuery.Append("SELECT DISTINCT ch.* FROM csu_cpe_country_suppliers supp,");
                strQuery.Append(" csu_ref_valid_char ch, csu_country cn ,CSU_CPE_CNTRY_SUPP cs  WHERE supp.SUPPLIER_CHAR_ID = ch.CHAR_ID AND");
                strQuery.Append(" supp.COUNTRY_ID = cn.COUNTRY_ID AND TRUNC(nvl(supp.EOM_DATE,sysdate)) >= TRUNC(sysdate)");
                strQuery.Append(" AND supp.COUNTRY_ID =" + countryID + " and cs.SUPPLIER_ID=supp.SUPPLIER_CHAR_ID ");
                strQuery.Append(" and cs.COUNTRY_ID=supp.COUNTRY_ID");
                //strQuery.Append(" AND cs.SUPP_TYPE <> 'Aggregator'");
                return objGetDataFromDB.GetDataTable(strQuery.ToString());
            }
            catch (Exception ex) { throw ex; }
        }

        public DataTable ValidCPEMaintOptsforproduct(int productID, int countryID, int cityID, string supplierID)
        {
            strQuery.Clear();
            strQuery.Append("SELECT DISTINCT  supplier.CHAR_ID SUPPLIER_ID ,supplier.CHAR_NAME SUPPLIER_NAME");
            strQuery.Append(" ,csupp.PRIORITY SUPPLIER_PRIORITY,opt.CHAR_ID SERVICE_NUMBER ,opt.CHAR_NAME SERVICE_NAME");
            strQuery.Append(" ,opt.CHAR_NUM_VALUE SERVICE_ORDER,avail.AVAIL_DESC SERVICE_AVAIL_DESC ,svc.CHAR_VALUE SERVICE_RESTRICTIONS");
            strQuery.Append(" ,nvl(crpom.CPE_PRODUCT_MAP,-1) CPE_PRODUCT_MAP1 ");
            strQuery.Append(" ,crpom.MANUFACTURER_NAME,crpom.MAINTAINER_NAME ");
            strQuery.Append(" ,crpom.MANUFACTURER_NAME,crpom.MAINTAINER_NAME  ,prod.product_cd CPE_PRODUCT_MAP FROM ");
            strQuery.Append(" CSU_REF_CHAR_TYPE ctype,CSU_REF_VALID_CHAR supplier ,CSU_COUNTRY cty,CSU_CASES sctr ");
            strQuery.Append("  ,CSU_CPE_COUNTRY_SUPPLIERS csupp,CSU_CASE_DETAILS svc ,CSU_REF_AVAILABILITY avail ");
            strQuery.Append(" ,CSU_REF_VALID_CHAR opt  ,CSU_REF_CHAR_TYPE otype ,CSU_REF_PRODUCT_OPT_MATRIX crpom");
            strQuery.Append(" ,cpe_product prod,csu_cpe_cntry_supp cs WHERE supplier.CHAR_TYPE_ID = ctype.CHAR_TYPE_ID");
            strQuery.Append(" AND ctype.CHAR_TYPE_NAME = 'CPE Suppliers'");
            strQuery.Append(" AND sctr.PRODUCT_CD = 63 AND cty.COUNTRY_ID = sctr.COUNTRY_ID");
            strQuery.Append(" AND TRUNC(nvl(csupp.EOM_DATE,sysdate)) >= TRUNC(sysdate) AND prod.product_map_id=crpom.cpe_product_map");
            strQuery.Append(" and opt.char_id=crpom.char_id ");
            strQuery.Append(" and otype.char_type_id=crpom.char_type_id ");
            strQuery.Append(" and crpom.product_cd = 63");
            strQuery.Append(" and UPPER(csupp.MAINTAINER_FLAG) = 'Y'");
            strQuery.Append(" and svc.option_matrix_id = crpom.option_matrix_id");
            strQuery.Append(" AND cty.COUNTRY_ID = csupp.COUNTRY_ID");

            strQuery.Append(" AND supplier.CHAR_ID = csupp.SUPPLIER_CHAR_ID");
            strQuery.Append(" AND supplier.CHAR_ID = sctr.ACCESS_SUPPLIER_CHAR_ID");
            
            strQuery.Append(" AND supplier.CHAR_ID in (" + supplierID+")");
            
            strQuery.Append(" and cs.country_id=cty.COUNTRY_ID");
            strQuery.Append(" and cs.supplier_id=supplier.CHAR_ID");
            //if (false)
            //{
            //    strQuery.Append(" and cs.SUPP_TYPE <> 'Aggregator'");
            //}

            strQuery.Append(" AND svc.CASE_ID = sctr.CASE_ID ");
            strQuery.Append(" AND svc.CHAR_ID = opt.CHAR_ID");
            strQuery.Append(" AND svc.CHAR_AVAIL_CD = avail.AVAIL_CD ");
            strQuery.Append(" AND opt.CHAR_TYPE_ID=otype.CHAR_TYPE_ID");
            strQuery.Append(" AND otype.CHAR_TYPE_NAME='CPE Maintenance Options' ");
            strQuery.Append(" AND sctr.country_id =" + countryID);
            strQuery.Append(" AND sctr.CITY_ID = " + cityID);
            strQuery.Append(" AND sctr.CASE_VALID_CD=1");
            strQuery.Append(" AND opt.CHAR_VALID_CD = 1");
            strQuery.Append(" AND svc.CASE_DETAIL_VALID_CD = 1");
            strQuery.Append(" AND prod.product_cd =" + productID);
            strQuery.Append(" ORDER BY CPE_PRODUCT_MAP,SUPPLIER_PRIORITY, SUPPLIER_NAME, SERVICE_ORDER");

            return objGetDataFromDB.GetDataTable(strQuery.ToString());

        }

        public DataTable GetValidProductsforCountry(string selectedSupplier, int selectedCountry)
        {
            strQuery.Clear();
            //if (selectedSupplier == 0)
            //{
            //    strQuery.Append("select distinct Product_name,a.product_cd from csu_product a,csu_cpe_product_bndls b,csu_cpe_cntry_supp c ");
            //    strQuery.Append(" where a.product_cd = c.PRODUCT_ID and b.product_cd = c.PRODUCT_ID");
            //    strQuery.Append(" and c.COUNTRY_ID = " + selectedCountry);
            //}
            //else
            //{
                strQuery.Append("select distinct Product_name,a.product_cd from csu_product a,csu_cpe_product_bndls b,csu_cpe_cntry_supp c");
                strQuery.Append("  where a.product_cd = c.PRODUCT_ID and b.product_cd = c.PRODUCT_ID");
                strQuery.Append("  and c.COUNTRY_ID = " + selectedCountry);
                //if (selectedSupplier != "0")
                //{
                    strQuery.Append(" and c.SUPPLIER_ID in (" + selectedSupplier + ") order by upper(Product_name)");
                //}
            //}
            return objGetDataFromDB.GetDataTable(strQuery.ToString());
        }

        public DataTable GetCPELeadTime(string supplierID, int countryID,int productId)
        {
            strQuery.Clear();

            if (productId== 63)
            {
                strQuery.Append("select distinct cpe_lead_time,cpe_lead_time_status, cpe_cease_leadtime, cpe_cease_leadtime_status,b.char_name as suppliername");
                strQuery.Append(" from CSU_CPE_COUNTRY_SUPPLIERS a,CSU_REF_VALID_CHAR b where a.supplier_char_id=b.char_id ");
                strQuery.Append(" and supplier_char_id in (" + supplierID + ") and country_id=" + countryID);
                strQuery.Append(" and UPPER(a.INSTALLER_FLAG) = 'Y'");

            }
            else
            {
                strQuery.Append("select distinct cpe_lead_time,cpe_lead_time_status, cpe_cease_leadtime, cpe_cease_leadtime_status from CSU_CPE_COUNTRY_SUPPLIERS where supplier_char_id="+supplierID+" and country_id="+countryID);
            }
               
            
            return objGetDataFromDB.GetDataTable(strQuery.ToString());
        }

        public string ValidServiceCenterCaseId(int countryID, int cityID)
        {
            strQuery.Clear();
            strQuery.Append(" select CASE_ID from CSU_CASES where COUNTRY_ID = " + countryID + " and CITY_ID = " + cityID + "and PRODUCT_CD = 63 and CASE_VALID_CD = 1");
            return objGetDataFromDB.GetSingleRowFromDB(strQuery.ToString());
        }
    }
}
