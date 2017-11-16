using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Data;

namespace SCSearchDAL
{
    public class DispAccessDetDAL
    {
        private StringBuilder strQuery = new StringBuilder();
        private GetDataFromDB objGetDataFromDB = new GetDataFromDB();

        public DataTable getAccessSupplier(int productCode, int countryCode, int cityCode, int siteCode)
        {
            strQuery.Clear();
            //strQuery.Append("Select distinct a.Access_Supplier_Char_Id, a.Supplier_Name, p.Priority  ");
            //strQuery.Append("from csu_cases c, access_supplier a, csu_supplier_country p ");
            //strQuery.Append("where c.case_id in ");
            //strQuery.Append("(select case_id from csu_cases where ");
            //strQuery.Append("product_cd = " + productCode + " and ");
            //strQuery.Append("country_id = " + countryCode + " and ");
            //strQuery.Append(" city_id = " + cityCode + " and hub_site_id = " + siteCode);
            //strQuery.Append(" and case_valid_cd = 1) and ");
            //strQuery.Append("a.access_supplier_char_id = c.access_supplier_char_id ");
            //strQuery.Append(" and a.access_supplier_char_id = p.supplier_id and ");
            //strQuery.Append("c.country_id = p.country_id ");
            //strQuery.Append("ORDER BY p.Priority asc");


            strQuery.Append(" Select Distinct c.Access_Supplier_Char_Id,");
            strQuery.Append(" (select char_name from csu_ref_valid_char where char_id=c.access_supplier_char_id) as Supplier_Name,p.Priority");
            strQuery.Append(" From Csu_Cases C, csu_supplier_country p WHERE c.case_id IN");
            strQuery.Append(" (SELECT case_id");
            strQuery.Append(" FROM csu_cases");
            strQuery.Append(" WHERE product_cd  = " + productCode);
            strQuery.Append(" AND country_id    = " + countryCode);
            strQuery.Append(" AND city_id       = " + cityCode);
            strQuery.Append(" AND hub_site_id   = " + siteCode);
            strQuery.Append(" AND case_valid_cd = 1");
            strQuery.Append(" )");
            strQuery.Append(" and c.access_supplier_char_id = p.supplier_id");
            strQuery.Append(" And C.Country_Id = P.Country_Id");
            strQuery.Append(" ORDER BY p.Priority ASC");
            return objGetDataFromDB.GetDataTable(strQuery.ToString());
        }

        //public DataTable getGridHeading(int countryCode, int siteCode, int productCode, int cityCode)
        //{
        //    strQuery.Clear();

        //    strQuery.Append("Select distinct Char_Name, display_order_cd, a.char_type_id, a.char_type_value_count, b.char_id, d.char_type_alias ");
        //    strQuery.Append(" from csu_ref_char_type a, csu_ref_valid_char b, ");
        //    strQuery.Append(" csu_case_details c, csu_ref_product_opt_matrix d ");
        //    strQuery.Append(" where c.case_id in ");
        //    strQuery.Append(" (select case_id from csu_cases where ");
        //    strQuery.Append(" product_cd = " + productCode + " and country_id = " + countryCode);
        //    strQuery.Append("  and city_id = " + cityCode + " and hub_site_id = " + siteCode);
        //    strQuery.Append(" ) and ");
        //    strQuery.Append(" a.char_type_id = b.char_type_id and ");
        //    strQuery.Append(" upper(a.char_type_NAME) != 'ACCESS SPEED' and ");
        //    strQuery.Append(" upper(a.char_type_name) != 'ACCESS SUPPLIER' and ");
        //    strQuery.Append(" b.char_type_id = c.char_type_id and ");
        //    strQuery.Append(" b.char_id = c.char_id  and ");
        //    strQuery.Append(" c.option_matrix_id = d.option_matrix_id and ");
        //    strQuery.Append(" b.char_valid_cd = 1");
        //    strQuery.Append(" ORDER BY nvl(d.display_order_cd,1000) ");

        //    return objGetDataFromDB.GetDataTable(strQuery.ToString());


        //}

        //public DataTable getAccessDetailsGrid(int productCode, int countryCode, int cityCode, int siteCode, int suppList)
        //{
        //    strQuery.Clear();



        //    strQuery.Append("Select distinct c3.char_actual_value as Speed_Value, c2.Access_Supplier_Char_Id, a1.Supplier_Name, ");
        //    strQuery.Append(" b.Char_Name, Char_Value, Char_Value_2, c3.Char_Num_Value, ");
        //    strQuery.Append(" display_order_cd, c.char_id, ca.avail_abbr, c2.case_valid_cd, c2.case_avail_cd as Avail, ");
        //    strQuery.Append(" a.char_type_id, char_type_value_count, c2.access_speed_char_id, c.case_detail_valid_cd, ");
        //    strQuery.Append(" c4.char_name as Access_Type, c5.char_name as supp_name, c3.char_unit_of_measure as Speed_UOM, ");
        //    strQuery.Append(" c2.ACCESS_PRODUCT_TYPE_ID, c2.ACCESS_SUPPLIER_NAME_ID ");
        //    strQuery.Append(" from csu_ref_char_type a, csu_ref_valid_char b, csu_cases c2, ");
        //    strQuery.Append(" csu_case_details c, csu_ref_product_opt_matrix d, csu_ref_valid_char c3, ");
        //    strQuery.Append(" access_supplier a1, csu_ref_availability ca, csu_ref_valid_char c4, csu_ref_valid_char c5 ");
        //    strQuery.Append(" (select case_id from csu_cases where ");
        //    strQuery.Append(" product_cd = " + productCode + " and country_id = " + countryCode);
        //    strQuery.Append(" and city_id = " + cityCode + " and hub_site_id = " + siteCode);
        //    strQuery.Append(" and c2.case_valid_cd = 1)");
        //    strQuery.Append(" where c2.product_cd = " + productCode);
        //    strQuery.Append(" and  c2.hub_site_id = " + siteCode);
        //    strQuery.Append(" and c2.case_valid_cd = 1");

        //    strQuery.Append(" and c.case_id = c2.case_id and ");
        //    strQuery.Append(" a.char_type_id = b.char_type_id and ");
        //    strQuery.Append(" upper(a.char_type_NAME) != 'ACCESS SPEED' and ");
        //    strQuery.Append(" upper(a.char_type_name) != 'ACCESS SUPPLIER' and ");
        //    strQuery.Append(" b.char_type_id = c.char_type_id and ");
        //    strQuery.Append(" b.char_id = c.char_id  and ");
        //    strQuery.Append(" c.option_matrix_id = d.option_matrix_id and ");
        //    strQuery.Append(" b.char_valid_cd = 1");
        //    strQuery.Append(" and c.case_detail_valid_cd = 1");
        //    strQuery.Append(" and c2.case_valid_cd = 1");
        //    strQuery.Append(" and a1.access_supplier_char_id = c2.access_supplier_char_id and ");
        //    strQuery.Append(" a1.access_supplier_char_id = " + suppList + " and ");
        //    strQuery.Append("c3.char_id = c2.access_speed_char_id and ");
        //    strQuery.Append("c4.char_id = c2.access_product_type_id and ");
        //    strQuery.Append("c5.char_id = c2.access_supplier_name_id and ");
        //    strQuery.Append("ca.avail_cd = c.char_avail_cd ");

        //    //strQuery.Append(" and c2.access_supplier_char_id not in (SELECT pc_supplier_id from capman_supplier_map csm, csu_restrictions csr WHERE csr.distributorid = " & objSession.ReadVar("sDistributorId",lSessionID)
        //    strQuery.Append(" and csr.countryid = c2.country_id and csr.supplierid = csm.c_supplier_id and csm.pc_supplier_id = c2.access_supplier_char_id)");
        //    strQuery.Append("ORDER BY c3.char_num_value, Speed_Value, Access_Type, Supp_Name, c2.access_speed_char_id, upper(a1.Supplier_Name), d.display_order_cd, b.Char_Name, Char_Value");

        //    return objGetDataFromDB.GetDataTable(strQuery.ToString());
        //}

        public DataTable getAccessDetails(int countryID, int hubsiteID, int selectedSupplier)
        {
            DataTable data;
            strQuery.Clear();

            strQuery.Append("Select A.Country_Id,A.Hub_Site_Id,A.Access_Supplier_Char_Id as supplier_id,(Select Char_Name From Csu_Ref_Valid_Char");
            strQuery.Append(" Where Char_Id = A.Access_Supplier_Char_Id) As Supplier_Name,A.Access_Product_Type_Id,");
            strQuery.Append(" (Select Char_Name From Csu_Ref_Valid_Char Where Char_Id = A.Access_Product_Type_Id) As Access_Type,a.Access_Speed_Char_Id,");
            strQuery.Append(" (Select Char_Actual_Value||' '||Char_Unit_Of_Measure From Csu_Ref_Valid_Char Where Char_Id = A.Access_Speed_Char_Id) As Access_Speed,");
            strQuery.Append(" a.Access_Supplier_Name_Id as supplier_product_id,");
            strQuery.Append(" (Select Char_Name From Csu_Ref_Valid_Char Where Char_Id = A.Access_Supplier_Name_Id) As Supplier_Product,B.Char_Id,");
            strQuery.Append(" (Select Char_Name From Csu_Ref_Valid_Char Where Char_Id = B.Char_Id) As Access_Interface,");
            strQuery.Append(" (Select char_num_value From Csu_Ref_Valid_Char Where Char_Id = A.Access_Speed_Char_Id) As Access_Speed_num");
            strQuery.Append(" From Csu_Cases A, Csu_Case_Details B Where A.Product_Cd=25 And A.Case_Valid_Cd=1 And A.Case_Id=B.Case_Id");
            strQuery.Append(" And B.Case_detail_Valid_Cd=1 And B.Char_Type_Id=868 And A.Country_Id=" + countryID);
            strQuery.Append(" And A.Hub_Site_Id=" + hubsiteID);
            strQuery.Append(" And A.Access_Supplier_Char_Id=" + selectedSupplier);
            strQuery.Append(" Group By  A.Country_Id,A.Hub_Site_Id,A.Access_Supplier_Char_Id,A.Access_Product_Type_Id,A.Access_Speed_Char_Id,");
            strQuery.Append(" A.Access_Supplier_Name_Id,B.Char_Id order by Access_Speed_num");
            data = new DataTable();
            data = objGetDataFromDB.GetDataTable(strQuery.ToString());

            if (data.Rows.Count <= 0)
            {
                strQuery.Clear();

                strQuery.Append(" Select A.Country_Id,A.Hub_Site_Id,A.Access_Supplier_Char_Id as supplier_id,(Select Char_Name From Csu_Ref_Valid_Char Where Char_Id = A.Access_Supplier_Char_Id) ");
                strQuery.Append("As Supplier_Name,A.Access_Product_Type_Id,(Select Char_Name From Csu_Ref_Valid_Char Where Char_Id = A.Access_Product_Type_Id) As Access_Type,");
                strQuery.Append(" a.Access_Speed_Char_Id,(Select Char_Actual_Value||' '||Char_Unit_Of_Measure From Csu_Ref_Valid_Char Where Char_Id = A.Access_Speed_Char_Id) As Access_Speed,");
                strQuery.Append("  a.Access_Supplier_Name_Id as supplier_product_id,(Select Char_Name From Csu_Ref_Valid_Char Where Char_Id = A.Access_Supplier_Name_Id) As Supplier_Product,");
                strQuery.Append(" (Select Char_Actual_Value||' '||Char_Unit_Of_Measure From Csu_Ref_Valid_Char Where Char_Id = A.Access_Speed_Char_Id) As Access_Speed,");
                strQuery.Append(" a.Access_Supplier_Name_Id as supplier_product_id,Null As Char_Id,null As Access_Interface,(Select char_num_value From Csu_Ref_Valid_Char Where Char_Id = A.Access_Speed_Char_Id) As Access_Speed_num");
                strQuery.Append(" From Csu_Cases A Where A.Product_Cd=25 And A.Case_Valid_Cd=1 And A.Country_Id=" + countryID+" And A.Hub_Site_Id="+ hubsiteID );

                strQuery.Append("  And A.Access_supplier_Char_Id= "+ selectedSupplier+" Group By  A.Country_Id,A.Hub_Site_Id,A.Access_Supplier_Char_Id,A.Access_Product_Type_Id,A.Access_Speed_Char_Id,A.Access_Supplier_Name_Id Order By 7");
                data = new DataTable();
                data = objGetDataFromDB.GetDataTable(strQuery.ToString());
            
            }
           
            return data; 




        }
    }
}
