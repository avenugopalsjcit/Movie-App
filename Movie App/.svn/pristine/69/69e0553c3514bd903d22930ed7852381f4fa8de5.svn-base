using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Data;

namespace SCSearchDAL
{
    public class DispCPEPartsDAL
    {

        private StringBuilder strQuery = new StringBuilder();
        private GetDataFromDB objGetDataFromDB = new GetDataFromDB();

        public DataTable getStandardParts(int bndlId)
        {
            strQuery.Clear();
            strQuery.Append("Select distinct b.name from csu_cpe_std_parts a, csu_cpe_parts b where a.bundle_id = " + bndlId);
            strQuery.Append(" and b.id = a.part_id and upper(part_type)<>'CPE SOFTWARE' order by 1");
            return objGetDataFromDB.GetDataTable(strQuery.ToString());
        }

        public DataTable getAccessType(int bundleID, int countryID)
        {
            DataTable dt = new DataTable();

            strQuery.Clear();
            strQuery.Append("select distinct c.char_name,i.access_type_id from csu_cpe_ios_parts i ");
            strQuery.Append(" left outer join csu_ref_valid_char c on c.char_id=i.access_type_id");
            strQuery.Append(" left outer join csu_cpe_parts d on d.id=i.part_id ");
            strQuery.Append(" where i.bundle_id= " + bundleID);
            strQuery.Append(" AND i.country_id = " + countryID);
            strQuery.Append("  ORDER BY 1");

            dt = objGetDataFromDB.GetDataTable(strQuery.ToString());
            if (dt.Rows.Count == 0)
            {
                strQuery.Clear();
                strQuery.Append("SELECT DISTINCT a.char_name, b.access_type FROM CSU_CPE_CNTRY_BNDLS_ACCTYPE b, CSU_REF_VALID_CHAR a ");
                strQuery.Append(" WHERE bundle_id = " + bundleID);
                strQuery.Append(" AND  b.country_id = " + countryID);
                strQuery.Append(" AND  a.char_id = b.access_type ORDER BY 1");

                dt = objGetDataFromDB.GetDataTable(strQuery.ToString());
            }

            if (dt.Rows.Count == 0)
            {
                strQuery.Clear();
                strQuery.Append("select distinct c.char_name,i.access_type_id from csu_cpe_ios_parts i ");
                strQuery.Append(" left outer join csu_ref_valid_char c on c.char_id=i.access_type_id");
                strQuery.Append(" left outer join csu_cpe_parts d on d.id=i.part_id ");
                strQuery.Append(" where i.bundle_id= " + bundleID);
                strQuery.Append(" AND  i.country_id is null ");
                strQuery.Append("  ORDER BY 1");

                dt = objGetDataFromDB.GetDataTable(strQuery.ToString());
            }

            if (dt.Rows.Count == 0)
            {
                strQuery.Clear();
                strQuery.Append("select distinct c.char_name,i.access_type_id  from csu_cpe_ios_parts i ");
                strQuery.Append(" left outer join csu_ref_valid_char c on c.char_id=i.access_type_id");
                strQuery.Append(" left outer join csu_cpe_parts d on d.id=i.part_id ");
                strQuery.Append(" where i.bundle_id= " + bundleID);
                strQuery.Append(" AND   upper(i.default_ios) = 'Y' ");
                strQuery.Append(" ORDER BY 1");

                dt = objGetDataFromDB.GetDataTable(strQuery.ToString());
            }

            return dt;
        }


        public DataTable getIOSPart(int bundleID, int AccTypeID, int countryID)
        {
            strQuery.Clear();
            DataTable dt = new DataTable();
            strQuery.Append("Select distinct b.name from csu_cpe_ios_parts a, csu_cpe_parts b ");
            strQuery.Append(" where a.bundle_id = " + bundleID);
            strQuery.Append(" and a.access_type_id = " + AccTypeID);
            strQuery.Append(" and b.id = a.part_id");
            strQuery.Append(" AND a.country_id = " + countryID);
            strQuery.Append("  order by 1");

            dt = objGetDataFromDB.GetDataTable(strQuery.ToString());

            if (dt.Rows.Count == 0)
            {
                strQuery.Clear();
                strQuery.Append("Select distinct b.name from csu_cpe_ios_parts a, csu_cpe_parts b ");
                strQuery.Append(" where a.bundle_id = " + bundleID);
                strQuery.Append(" and a.access_type_id = " + AccTypeID);
                strQuery.Append(" and b.id = a.part_id");
                strQuery.Append(" AND a.country_id  is null");
                strQuery.Append("  order by 1");

                dt = objGetDataFromDB.GetDataTable(strQuery.ToString());

            }

            if (dt.Rows.Count == 0)
            {
                strQuery.Clear();
                strQuery.Append("Select distinct b.name from csu_cpe_ios_parts a, csu_cpe_parts b ");
                strQuery.Append(" where a.bundle_id = " + bundleID);
                strQuery.Append(" and a.access_type_id = " + AccTypeID);
                strQuery.Append(" and b.id = a.part_id");
                strQuery.Append(" AND upper(a.default_ios)='Y'");
                strQuery.Append("  order by 1");
                dt = objGetDataFromDB.GetDataTable(strQuery.ToString());
            }

            return dt;
        }

        public DataTable getIOSwithoutAccess(int bundleID, int countryID)
        {
            DataTable dt = new DataTable();
            strQuery.Clear();
            strQuery.Append("Select distinct b.name from csu_cpe_ios_parts a, csu_cpe_parts b ");
            strQuery.Append(" where a.bundle_id = " + bundleID);
            strQuery.Append(" and a.access_type_id is null ");
            strQuery.Append(" and b.id = a.part_id");
            strQuery.Append(" AND a.country_id = " + countryID);
            strQuery.Append("  order by 1");
            dt = objGetDataFromDB.GetDataTable(strQuery.ToString());



            if (dt.Rows.Count == 0)
            {
                strQuery.Append("Select distinct b.name from csu_cpe_ios_parts a, csu_cpe_parts b ");
                strQuery.Append(" where a.bundle_id = " + bundleID);
                strQuery.Append(" and a.access_type_id is null");
                strQuery.Append(" and b.id = a.part_id");
                strQuery.Append(" AND a.country_id  is null");
                strQuery.Append("  order by 1");

                dt = objGetDataFromDB.GetDataTable(strQuery.ToString());
            }

            if (dt.Rows.Count == 0)
            {
                strQuery.Append("Select distinct b.name from csu_cpe_ios_parts a, csu_cpe_parts b ");
                strQuery.Append(" where a.bundle_id = " + bundleID);
                strQuery.Append(" and a.access_type_id is null");
                strQuery.Append(" and b.id = a.part_id");
                strQuery.Append(" AND upper(a.default_ios)='Y'");
                strQuery.Append("  order by 1");

                dt = objGetDataFromDB.GetDataTable(strQuery.ToString());


            }

            return dt;

        }

        public DataTable getVariablePart(int bundleID, int countryID)
        {
            strQuery.Clear();

            strQuery.Append("Select distinct b.name from csu_cpe_var_parts a, csu_cpe_parts b  ");
            strQuery.Append(" where a.bundle_id = " + bundleID);
            strQuery.Append(" AND  a.country_id = " + countryID);
            strQuery.Append(" and b.id = a.part_id order by 1");

            return objGetDataFromDB.GetDataTable(strQuery.ToString());
        }

        public DataTable getOptionalPart(int bundleID, int AccessID)
        {
            strQuery.Clear();
            strQuery.Append("Select distinct b.name from csu_cpe_opt_parts a, csu_cpe_parts b  ");
            strQuery.Append(" where a.bundle_id = " + bundleID);
            strQuery.Append(" and a.access_type_id = " + AccessID);
            strQuery.Append(" and b.id = a.part_id");
            strQuery.Append(" order by 1");
            return objGetDataFromDB.GetDataTable(strQuery.ToString());
        }

        public DataTable getAggregator(int countryID)
        {
            strQuery.Clear();
            // strQuery.Append("select char_id from csu_ref_valid_char where upper(char_name) in (");
            //strQuery.Append(" select distinct upper(b.access_type) from csu_cpe_cntry_supp a,CSU_CPE_SUPPLIER_ACCESS_TYPE b where");
            //strQuery.Append(" a.supplier_id=b.supplier_id and a.country_id = " + countryID);
            //strQuery.Append(" and a.supp_type = 'Aggregator'");

            strQuery.Append("  select distinct upper(b.access_type),c.char_id from csu_cpe_cntry_supp a,");
            strQuery.Append(" CSU_CPE_SUPPLIER_ACCESS_TYPE b,csu_ref_valid_char c where");
            strQuery.Append(" a.supplier_id=b.supplier_id and a.country_id =" + countryID);
            strQuery.Append(" and a.supp_type = 'Aggregator'");
            strQuery.Append(" and instr(upper(c.char_name), upper(b.access_type))>0");
            strQuery.Append(" and c.char_type_id=922");

            return objGetDataFromDB.GetDataTable(strQuery.ToString());
        }

        public DataTable getOptionalPartAccType(int bundleID, int countryID)
        {
            strQuery.Clear();
            strQuery.Append("SELECT DISTINCT a.char_name, b.access_type FROM CSU_CPE_CNTRY_BNDLS_ACCTYPE b, CSU_REF_VALID_CHAR a ");
            strQuery.Append(" WHERE bundle_id = " + bundleID + " AND  b.country_id = " + countryID);
            strQuery.Append(" AND  a.char_id = b.access_type ORDER BY 1");
            return objGetDataFromDB.GetDataTable(strQuery.ToString());
        }
    }
}
