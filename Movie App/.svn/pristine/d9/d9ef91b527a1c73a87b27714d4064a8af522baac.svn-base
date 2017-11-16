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
    public class CaseDetDal
    {
        OracleDataAdapter dad;

        DataSet rsPopChars = new DataSet();
        DataSet rsCharacteristics = new DataSet();
        DataTable dt = new DataTable();
        OracleConnection oConn = new OracleConnection(ConfigurationManager.AppSettings.Get("OraConnString"));
        public DataSet GetProdDetails(int ProdLocLevel, int CapmanPlatform, int StateFlag, int ProductID, int RegionID, int CountryID, int StateID, int CityID, int HubSiteID)
        {
            
            OracleCommand cmd = new OracleCommand("pkg_dispproddetails.stp_getinitialdetails", oConn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("pproductloclevel", OracleDbType.Int32).Value = ProdLocLevel;//2;//pproductloclevel;
            cmd.Parameters.Add("pcapmanplatform", OracleDbType.Int32).Value = CapmanPlatform; //-1;//hubsiteid
            cmd.Parameters.Add("pstateflag", OracleDbType.Int32).Value = StateFlag; //0;//pstateflag;
            cmd.Parameters.Add("pproductcd", OracleDbType.Int32).Value = ProductID;  //21;//pproductcd;
            cmd.Parameters.Add("pregionid", OracleDbType.Int32).Value = RegionID; //2;//pregionid;
            cmd.Parameters.Add("pcountryid", OracleDbType.Int32).Value = CountryID; //89;//pcountryid;
            cmd.Parameters.Add("pstateid", OracleDbType.Int32).Value = StateID; //81;//pstateid;
            cmd.Parameters.Add("pcityid", OracleDbType.Int32).Value = CityID; //3967;// pcityid;
            cmd.Parameters.Add("phub_site_id", OracleDbType.Int32).Value = HubSiteID; //3465;// phub_site_id;
            cmd.Parameters.Add("pdetaildata", OracleDbType.RefCursor, ParameterDirection.Output);

            DataSet dsgeneral = new DataSet();
            dad = new OracleDataAdapter(cmd);
            dsgeneral = new DataSet();
            dad.Fill(dsgeneral);
            return dsgeneral;


        }

        public int GetCapmanPlatformID(int ProductID, int HubSiteID)
        {
            string Sql = "Select a.Capman_Platform_Id from Csu_Cases a,CAPMAN_PLATFORMS b where a.case_valid_cd = 1 and a.CAPMAN_PLATFORM_ID = b.CAPMAN_PLATFORM_ID and a.HUB_SITE_ID = " + HubSiteID;
            Sql = Sql + " and a.PRODUCT_CD = " + ProductID;
            
            OracleCommand cmd = new OracleCommand(Sql, oConn);
            int CapmanPlatformID=0;
            DataSet dsCapman = new DataSet();
            dad = new OracleDataAdapter(cmd);
            dad.Fill(dsCapman);
            if(dsCapman!=null && dsCapman.Tables.Count>0 && dsCapman.Tables[0].Rows.Count>0)
            {
                CapmanPlatformID=Convert.ToInt32(dsCapman.Tables[0].Rows[0][0].ToString());
            }
            return CapmanPlatformID;
        }

        public DataSet GetPopCharacteristics(int SiteID, int ProductID, int DisplaySearch)
        {
            
            String str = @"SELECT cpc.char_name, CASE WHEN pcp.char_name IS NULL then cpv.char_value else DECODE (nvl(cpv.char_value,0),0, 
                'Not Supported',1, cpv.char_value || ' Router', cpv.char_value || ' Routers')
                end AS char_value, cpv.char_id from capman_pop_chars cpc, capman_pop_char_values cpv, csu_product_pop_char cpp, pop_char_config pcp
                WHERE cpc.char_id = cpv.char_id AND cpv.char_id = cpp.char_id AND cpv.site_id = 
                " + SiteID + " and cpp.product_cd = " + ProductID + " and cpp.display_search = " + DisplaySearch + " and trim(upper(cpc.char_name))=trim(upper(pcp.char_name(+)))and trim(cpc.char_name) NOT IN ('NETWORK_COLOUR','POP_PLATFORM_CODE')" +
                   "order by cpp.display_order  ";

            str = @"Select nmap.Display_Name as Char_Name, Cpc.Char_Name as CharName, Case When Pcp.Char_Name Is Null Then Cpv.Char_Value 
                      Else Decode (Nvl(Cpv.Char_Value,0),0, 'Not Supported',1, Cpv.Char_Value || ' Router', Cpv.Char_Value || ' Routers')End As Char_Value, 
            Cpv.Char_Id 
            from capman_pop_chars cpc, capman_pop_char_values cpv, csu_product_pop_char cpp, pop_char_config pcp, capman_pop_char_name_map nmap
            Where Cpc.Char_Id = Cpv.Char_Id 
            And Cpv.Char_Id = Cpp.Char_Id 
            And Cpv.Site_Id = " + SiteID + " And Cpp.Product_Cd = " + ProductID + " And Cpp.Display_Search = " + DisplaySearch + " And Trim(Upper(Cpc.Char_Name))=Trim(Upper(Pcp.Char_Name(+))) And Trim(Cpc.Char_Name) Not In ('NETWORK_COLOUR','POP_PLATFORM_CODE') and upper(nmap.column_Name) = upper(cpc.char_name) order by cpp.display_order ";


            OracleCommand cmd = new OracleCommand(str, oConn);


            rsPopChars = new DataSet();
            dad = new OracleDataAdapter(cmd);
            dad.Fill(rsPopChars);
            return rsPopChars;


        }

        public DataSet GetPopCode(int SiteID, int ProductID, int DisplaySearch)
        {
            
            String str = @"select cpc.char_name,cpv.char_value,cpv.char_id from capman_pop_chars cpc,capman_pop_char_values cpv, csu_product_pop_char cpp where cpc.char_id = cpv.char_id and 
                        cpv.char_id = cpp.char_id AND cpv.site_id = " + SiteID + " AND cpp.product_cd = " + ProductID + " and cpp.display_search = " + DisplaySearch + " and trim(cpc.char_name) IN ('NETWORK_COLOUR','POP_PLATFORM_CODE') ";
            OracleCommand cmd = new OracleCommand(str, oConn);


            rsPopChars = new DataSet();
            dad = new OracleDataAdapter(cmd);
            dad.Fill(rsPopChars);
            return rsPopChars;


        }



        public DataSet GetCharacteristics(int CaseID, int OptionMatrix, int CaseValidcd)
        {
            
            String str = @"SELECT char_type_name,char_type_alias, Char_Name, e.Avail_desc, c.char_avail_cd, char_value, char_value_2, char_unit_of_measure, display_order_cd,c.char_id,c.char_type_id, e.AVAIL_CD
FROM csu_ref_char_type A, csu_ref_valid_char b, csu_case_details c, csu_ref_product_opt_matrix d, csu_ref_availability e 
WHERE c.case_id = " + CaseID + " AND A.char_type_id = b.char_type_id AND b.char_type_id = c.char_type_id AND b.char_id = c.char_id " +
"AND c.option_matrix_id = d.option_matrix_id AND d.OPTION_MATRIX_VALID_CD = " + OptionMatrix + " AND e.avail_cd(+) = c.char_avail_cd AND b.char_valid_cd = " + CaseValidcd + " AND (c.case_detail_valid_cd = " + CaseValidcd + " OR EXISTS (SELECT 'x' FROM csu_ref_char_type WHERE c.char_type_id = csu_ref_char_type.char_type_id AND upper(char_type_name) LIKE 'DISPLAY PLACEHOLDER%'))ORDER BY d.display_order_cd,char_num_value,char_type_id";
            
            OracleCommand cmd = new OracleCommand(str, oConn);
            rsCharacteristics = new DataSet();
            dad = new OracleDataAdapter(cmd);
            dad.Fill(rsCharacteristics);
            return rsCharacteristics;


        }

        public DataSet GetCPESuppliers(int countryID, int ProductID, int CityID)
        {
            
            string SuppQry = "select distinct vcdr.supplier AS supplierID,vcdr.supp_name as SupplierName from vw_cpe_data_report vcdr, mv_cpe_service_availability b where vcdr.country = " + countryID + " and vcdr.product_id in (-1," + ProductID + ") and vcdr.supplier_type <> 'Aggregator' and vcdr.EOM_PASSED = 'Black' and vcdr.country_supplier_validity in (1,2) and vcdr.country = b.country_id and vcdr.supplier = b .supplier_id AND b.CITY_ID = " + CityID + " ORDER BY vcdr.supp_name";
            OracleCommand cmd = new OracleCommand(SuppQry, oConn);
            DataSet ds = new DataSet();
            OracleDataAdapter da = new OracleDataAdapter(cmd);
            da.Fill(ds);

            //if (ds.Tables[0].Rows.Count == 0)
            //{
            //    SuppQry = "select supplier as supplierID, supplier_name as SupplierName from vw_cpe_country_validity where country_validity=1 and country=" + countryID + " and supplier_type <> 'Aggregator' and ROWNUM <= 1";
            //    cmd = new OracleCommand(SuppQry, oConn);
            //    da = new OracleDataAdapter(cmd);
            //    da.Fill(ds);
            //}

            return ds;

        }

        public int GetParentProduct(int ProductID)
        {

            string strQry = "select PARENT_PRODUCT_CD from CSU_PRODUCT where product_cd ="+ProductID+" and PRODUCT_VALID_CD = 1";
            OracleCommand cmd = new OracleCommand(strQry, oConn);
            DataSet ds = new DataSet();
            OracleDataAdapter da = new OracleDataAdapter(cmd);
            da.Fill(ds);
            int ParentProductID = 0;
            if (ds != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
            {
                ParentProductID = Convert.ToInt32(ds.Tables[0].Rows[0]["PARENT_PRODUCT_CD"].ToString());
            }
            return ParentProductID;
        }

    }
}
