using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Data;

namespace SCSearchDAL
{
    public class BTOneVoiceDAL
    {
        private StringBuilder strQuery = new StringBuilder();
        private GetDataFromDB objGetDataFromDB = new GetDataFromDB();

        public DataTable FetchAvailability(int regionID, int countryID, int prodId)
        {
            strQuery.Clear();
            strQuery.Append("SELECT r.region_name, cn.country_name,DECODE (COUNT (cn.country_name),NULL, 'Not Available','Available') AS avail_desc");
            strQuery.Append(" FROM csu_cases a,csu_product p,csu_product p2,csu_region r,csu_country cn,csu_ref_availability c ");
            strQuery.Append(" WHERE (a.product_cd in (select distinct mappedproduct_id from csu_product_sub_product) or a.product_cd = 79) ");
            strQuery.Append(" AND p.product_cd = a.product_cd AND p2.product_cd(+) = p.parent_product_cd ");
            strQuery.Append(" AND a.region_id =" + regionID);
            strQuery.Append(" AND r.region_id = a.region_id  AND cn.country_id = a.country_id");
            strQuery.Append(" AND a.country_id = " + countryID);
            strQuery.Append(" AND a.case_avail_cd = c.avail_cd AND a.case_valid_cd = 1 ");
            strQuery.Append(" GROUP BY r.region_name, cn.country_name");
            strQuery.Append("  union ");
            strQuery.Append(" SELECT r.region_name, cn.country_name,DECODE (COUNT (cn.country_name),NULL, 'Not Available','Available') AS avail_desc");
            strQuery.Append(" FROM csu_product p,cla_product_cases cp,csu_region r,csu_country cn,csu_ref_availability c");
            strQuery.Append(" WHERE (cp.product_cd in (select distinct mappedproduct_id from csu_product_sub_product) or cp.product_cd = " + prodId + ")");
            strQuery.Append(" AND p.product_cd = cp.product_cd");
            strQuery.Append(" AND cp.region_id =" + regionID);
            strQuery.Append(" AND r.region_id = cp.region_id  AND cn.country_id = cp.country_id");
            strQuery.Append(" AND cp.country_id =" + countryID);
            strQuery.Append(" AND cp.case_avail_cd = c.avail_cd AND cp.case_valid_cd = 1");
            strQuery.Append(" GROUP BY r.region_name, cn.country_name");

            return objGetDataFromDB.GetDataTable(strQuery.ToString());

        }


        public string getCaseID(int regionID, int countryID, int prodId)
        {
            strQuery.Clear();
            strQuery.Append("select case_id from csu_cases where product_cd = " + prodId + " and region_id = " + regionID);
            strQuery.Append(" and country_id = " + countryID + " and case_valid_cd = 1");
            return objGetDataFromDB.GetSingleRowFromDB(strQuery.ToString());
        }

        public DataTable FetchCharacteristics(int localCaseId, int localSCLevel, int C_HUB_SITE_LEVEL, int C_PORT_SPEED,int prodID)
        {
            strQuery.Clear();
            strQuery.Append("SELECT char_type_name, char_type_alias, char_name, e.avail_desc,");
            strQuery.Append(" c.char_avail_cd, char_value, char_value_2, char_unit_of_measure,display_order_cd, c.char_id, c.char_type_id, e.avail_cd");
            strQuery.Append(" FROM csu_ref_char_type a,csu_ref_valid_char b,csu_case_details c,");
            strQuery.Append(" csu_ref_product_opt_matrix d,csu_ref_availability e");
            strQuery.Append(" where c.case_id = " + localCaseId + "  and");

            if (localSCLevel != C_HUB_SITE_LEVEL)
            {
                strQuery.Append(" c.char_type_id != " + C_PORT_SPEED + " and");
            }
            strQuery.Append("  a.char_type_id = b.char_type_id and");
            strQuery.Append(" b.char_type_id = c.char_type_id and");
            strQuery.Append(" b.char_id = c.char_id  and c.option_matrix_id = d.option_matrix_id and");
            strQuery.Append(" d.OPTION_MATRIX_VALID_CD = 1 and e.avail_cd(+) = c.char_avail_cd and");
            strQuery.Append(" b.char_valid_cd = 1 and (c.case_detail_valid_cd = 1");
            strQuery.Append(" or Exists (select 'x'  from csu_ref_char_type where c.char_type_id = csu_ref_char_type.char_type_id and");
            strQuery.Append(" upper(char_type_name) like 'DISPLAY PLACEHOLDER%'))");
            strQuery.Append(" UNION SELECT char_type_name, char_type_alias, '', '', 0, '', '', '', (display_order_cd * 1000), 0, ");
            strQuery.Append(" category_id, 0 ");
            strQuery.Append(" FROM csu_ref_product_opt_matrix_ov optov, csu_product_category cpc WHERE cpc.product_cat_id = optov.category_id AND");
            strQuery.Append(" optov.product_cd = " + prodID + " ORDER BY display_order_cd");

            return objGetDataFromDB.GetDataTable(strQuery.ToString());
        }



        public DataTable FetchCharacteristics1(int localCaseId, int localSCLevel, int C_HUB_SITE_LEVEL, int C_PORT_SPEED, int productID)
        {
            strQuery.Clear();

            strQuery.Append("select PRODUCT_CD,PRODUCT_NAME,PRODUCT_CAT_NAME from (");
            strQuery.Append(" SELECT B.PRODUCT_CD,PRODUCT_NAME,PRODUCT_CAT_NAME FROM csu_product_sub_product a,csu_product b,csu_product_category c,csu_cases ca");
            strQuery.Append("  WHERE a.mappedproduct_id = b.product_cd AND a.product_cat_id= c.product_cat_id");
            strQuery.Append(" AND ca.product_cd = b.product_cd AND ca.product_cd =a.mappedproduct_id AND ca.case_avail_cd=1");
            strQuery.Append(" AND c.product_cat_id    IN (SELECT c.char_type_id FROM csu_ref_char_type a, csu_ref_valid_char b,");
            strQuery.Append(" csu_case_details c,csu_ref_product_opt_matrix d,csu_ref_availability e");
            strQuery.Append(" WHERE c.case_id=" + localCaseId + " and");
            if (localSCLevel != C_HUB_SITE_LEVEL)
            {
                strQuery.Append(" c.char_type_id != " + C_PORT_SPEED + " and");
            }
            strQuery.Append("  a.char_type_id = b.char_type_id and");
            strQuery.Append(" b.char_type_id = c.char_type_id and");
            strQuery.Append(" b.char_id = c.char_id  and c.option_matrix_id = d.option_matrix_id and");
            strQuery.Append(" d.OPTION_MATRIX_VALID_CD = 1 and e.avail_cd(+) = c.char_avail_cd and");
            strQuery.Append(" b.char_valid_cd = 1 and (c.case_detail_valid_cd = 1");
            strQuery.Append(" OR EXISTS (SELECT 'x' FROM csu_ref_char_type  WHERE c.char_type_id = csu_ref_char_type.char_type_id");
            strQuery.Append(" AND upper(char_type_name) LIKE 'DISPLAY PLACEHOLDER%'))");
            strQuery.Append(" UNION SELECT category_id FROM csu_ref_product_opt_matrix_ov optov, csu_product_category cpc");
            strQuery.Append(" WHERE cpc.product_cat_id = optov.category_id AND optov.product_cd= " + productID + ") ORDER BY ca.case_id,product_cat_name)");
            strQuery.Append(" GROUP BY PRODUCT_CD,PRODUCT_NAME,PRODUCT_CAT_NAME");

            return objGetDataFromDB.GetDataTable(strQuery.ToString());
        }

        public DataTable FetchOneVoiceProductName(int prodID)
        {
            strQuery.Clear();
            strQuery.Append("Select product_name from csu_product where product_cd = " + prodID);
            return objGetDataFromDB.GetDataTable(strQuery.ToString());
        }


        public string FetchValidCase(int prodId, int countryId)
        {
            strQuery.Clear();
            strQuery.Append("select count(a.case_id) as popcnt from csu_cases a");
            strQuery.Append("  where a.product_cd = " + prodId + " and a.case_valid_cd= 1 and a.country_id= " + countryId);
            return objGetDataFromDB.GetSingleRowFromDB(strQuery.ToString());
        }

        public string GetCityId(int country, int Region)
        {
            strQuery.Clear();
            strQuery.Append("SELECT city_id FROM csu_city WHERE city_valid_cd = 1 AND country_id = " + country + " AND region_id = " + Region);
            return objGetDataFromDB.GetSingleRowFromDB(strQuery.ToString());
        }

        public string getValidCaseCount(int mappedProductId, int countryId)
        {
            strQuery.Clear();
            strQuery.Append("select count(a.case_id) as popcnt from csu_cases a");
            if (mappedProductId != 11)
            {
                strQuery.Append(" , csu_case_details b where a.product_cd = " + mappedProductId + " AND b.case_detail_valid_cd = 1");
                strQuery.Append(" and b.char_id in (Select char_id from csu_ref_valid_char where upper(char_actual_value) = 'BTICC')");
                strQuery.Append(" and a.case_id = b.case_id ");
                strQuery.Append(" and a.case_valid_cd= 1 and a.country_id= " + countryId);
                strQuery.Append(" and a.case_id = b.case_id AND b.case_detail_valid_cd = 1");
            }
            else
            {
                strQuery.Append(" where a.product_cd =" + mappedProductId);
                strQuery.Append(" and a.case_valid_cd= 1 and a.country_id= " + countryId);
            }

            return objGetDataFromDB.GetSingleRowFromDB(strQuery.ToString());
        }

        public string getCaseCountForOneVoice(int mappedProductId, int countryId,string prodCategoryName)
        {
            strQuery.Clear();
            strQuery.Append("select count(a.case_id) as popcnt from csu_cases a");
            if (mappedProductId == 120)
            {
                strQuery.Append(" , csu_case_details b where a.product_cd = " + mappedProductId + " AND b.case_detail_valid_cd = 1");
                strQuery.Append(" and b.char_id in (Select char_id from csu_ref_valid_char where char_name= '" + prodCategoryName + "')");
                strQuery.Append(" and a.case_id = b.case_id ");
                strQuery.Append(" and a.case_valid_cd= 1 and a.country_id= " + countryId);
                strQuery.Append(" and a.case_id = b.case_id AND b.case_detail_valid_cd = 1");
            }
            else
            {
                strQuery.Append(" where a.product_cd =" + mappedProductId);
                strQuery.Append(" and a.case_valid_cd= 1 and a.country_id= " + countryId);
            }

            return objGetDataFromDB.GetSingleRowFromDB(strQuery.ToString());
        }
    }



}
