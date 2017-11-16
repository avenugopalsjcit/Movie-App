using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Data;
using System.Configuration;
using System.Collections;
using Oracle.DataAccess.Client;


namespace SCSearchDAL
{
    public class PrivateLineDAL
    {
        OracleConnection oConn = new OracleConnection(ConfigurationManager.AppSettings.Get("OraConnString"));
        public Hashtable GetGeneralDetails(int Priority, int ProductCode, int Country1ID, int Country2ID, int City1ID, int City2ID, int PortSpeedID)
        {

            OracleCommand cmd = new OracleCommand("PrivateLine_Pkg.PL_Priority_Solution", oConn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("i_Priority", OracleDbType.Int32).Value = Priority;//2;//pproductloclevel;
            cmd.Parameters.Add("i_Country1", OracleDbType.Int32).Value = Country1ID; //-1;//hubsiteid
            cmd.Parameters.Add("i_Country2", OracleDbType.Int32).Value = Country2ID; //0;//pstateflag;
            cmd.Parameters.Add("i_City1", OracleDbType.Int32).Value = City1ID;  //21;//pproductcd;
            cmd.Parameters.Add("i_City2", OracleDbType.Int32).Value = City2ID; //2;//pregionid;
            cmd.Parameters.Add("i_SpeedCharId", OracleDbType.Int32).Value = PortSpeedID; //89;//pcountryid;
            cmd.Parameters.Add("i_ProductCD", OracleDbType.Int32).Value = ProductCode; //81;//pstateid;

            //cmd.Parameters.Add("o_NumPriorities", OracleDbType.Int32, ParameterDirection.Output); //3967;// pcityid;
            OracleParameter param = new OracleParameter("o_NumPriorities", OracleDbType.Int32, ParameterDirection.Output);
            param.CollectionType = OracleCollectionType.PLSQLAssociativeArray;
            param.Size = 1;
            cmd.Parameters.Add(param);

            OracleParameter param1 = new OracleParameter("o_Country11", OracleDbType.Int32, ParameterDirection.Output);
            param1.CollectionType = OracleCollectionType.PLSQLAssociativeArray;
            param1.Size = 1;
            cmd.Parameters.Add(param1);

            OracleParameter param2 = new OracleParameter("o_Country21", OracleDbType.Int32, ParameterDirection.Output);
            param2.CollectionType = OracleCollectionType.PLSQLAssociativeArray;
            param2.Size = 1;
            cmd.Parameters.Add(param2);

            OracleParameter param3 = new OracleParameter("o_SubProdCD_1", OracleDbType.Int32, ParameterDirection.Output);
            param3.CollectionType = OracleCollectionType.PLSQLAssociativeArray;
            param3.Size = 1;
            cmd.Parameters.Add(param3);

            OracleParameter param4 = new OracleParameter("o_Country12", OracleDbType.Int32, ParameterDirection.Output);
            param4.CollectionType = OracleCollectionType.PLSQLAssociativeArray;
            param4.Size = 1;
            cmd.Parameters.Add(param4);

            OracleParameter param5 = new OracleParameter("o_Country22", OracleDbType.Int32, ParameterDirection.Output);
            param5.CollectionType = OracleCollectionType.PLSQLAssociativeArray;
            param5.Size = 1;
            cmd.Parameters.Add(param5);

            OracleParameter param6 = new OracleParameter("o_SubProdCD_2", OracleDbType.Int32, ParameterDirection.Output);
            param6.CollectionType = OracleCollectionType.PLSQLAssociativeArray;
            param6.Size = 1;
            cmd.Parameters.Add(param6);

            //cmd.Parameters.Add("o_Country11", OracleDbType.Int32, ParameterDirection.Output); //3465;// phub_site_id;
            //cmd.Parameters.Add("o_Country21", OracleDbType.Int32, ParameterDirection.Output);
            //cmd.Parameters.Add("o_SubProdCD_1", OracleDbType.Int32, ParameterDirection.Output);
            //cmd.Parameters.Add("o_Country12", OracleDbType.Int32, ParameterDirection.Output);
            //cmd.Parameters.Add("o_Country22", OracleDbType.Int32, ParameterDirection.Output);
            //cmd.Parameters.Add("o_SubProdCD_2", OracleDbType.Int32, ParameterDirection.Output);
            oConn.Open();
            OracleDataReader dr = cmd.ExecuteReader(CommandBehavior.CloseConnection);
            Hashtable ht = new Hashtable();
            ht.Add("SubProduct1", (int)((int[])cmd.Parameters[10].Value)[0]); //3
            ht.Add("SubProduct2", (int)((int[])cmd.Parameters[13].Value)[0]); //6
            ht.Add("UKCOUNTRYID", (int)((int[])cmd.Parameters[11].Value)[0]); //4
            ht.Add("numPriorities", (int)((int[])cmd.Parameters[7].Value)[0]); //0
            dr.Close();

            //cmd.Parameters[7].Value
            //{int[1]}
            //    [0]: 1
            //?cmd.Parameters[8].Value
            //{int[1]}
            //    [0]: 37
            //?cmd.Parameters[9].Value
            //{int[1]}
            //    [0]: 67
            //?cmd.Parameters[10].Value
            //{int[1]}
            //    [0]: 34
            //?cmd.Parameters[13].Value
            //{int[1]}
            //    [0]: 34


            //DataSet dsgeneral = new DataSet();
            //OracleDataAdapter dad = new OracleDataAdapter(cmd);
            //dsgeneral = new DataSet();
            //dad.Fill(dsgeneral);
            //return dsgeneral;


            return ht;

        }

        public DataSet GetSubProductName(int SubProductID)
        {
            OracleCommand cmd = new OracleCommand("Select subproduct_name, subproduct_abbr from csu_ref_subproduct where subproduct_cd = " + SubProductID, oConn);
            DataSet ds = new DataSet();
            OracleDataAdapter dad = new OracleDataAdapter(cmd);
            dad.Fill(ds);
            return ds;
        }

        public int GetCityIDNew(int CountryID, int CityID, int PortSpeedID, int ProductID,int CountryID1)
        {
            DataSet ds = null;
            OracleCommand cmd = new OracleCommand("select * from csu_cases where product_cd = " + ProductID + " and subproduct_cd in (select pc_subproduct_id from capman_multipoint_conf where pc_product_id = " + ProductID + " and allpop_flag = 0) and country_id = " + CountryID + " and city_id = " + CityID + " and case_valid_cd = 1 and hub_site_id is not null", oConn);
            ds = new DataSet();
            OracleDataAdapter dad1 = new OracleDataAdapter(cmd);
            dad1.Fill(ds);
            int City_ID = 0;
            if (ds != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count == 0)
            {
                //If cint(CountryCode1) = cint(UK_COUNTRY_ID) and rs.EOF Then
                if (CountryID1 == 67)
                {
                    cmd = new OracleCommand("SELECT CITY_ID FROM CSU_CITY WHERE CITY_NAME = 'All Cities' AND COUNTRY_ID = " + CountryID1, oConn);
                    oConn.Open();
                    OracleDataReader dr1 = cmd.ExecuteReader(CommandBehavior.CloseConnection);
                    if (dr1.HasRows)
                    {
                        dr1.Read();
                        City_ID = Convert.ToInt32(dr1["CITY_ID"].ToString());
                    }
                    dr1.Close();
                }

            }
            return City_ID;
        }

        public int GetCityID(int CountryID, int CityID, int PortSpeedID, int ProductID)
        {
            OracleCommand cmd = new OracleCommand("select distinct c.city_id, cr.city_name from csu_cases c, csu_city cr where c.product_cd = " + ProductID + " and c.case_valid_cd = 1 and cr.city_id = c.city_id and c.subproduct_cd in (select pc_subproduct_id from capman_multipoint_conf where pc_product_id = " + ProductID + " and allpop_flag = 0) and c.country_id = " + CountryID + " and c.city_id = " + CityID + " and c.access_speed_char_id = " + PortSpeedID + " and c.hub_site_id is not null ", oConn);
            DataSet ds = new DataSet();
            OracleDataAdapter dad = new OracleDataAdapter(cmd);
            dad.Fill(ds);
            int City_ID = 0;
            if (ds != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count == 0)
            {
                cmd = new OracleCommand("SELECT CITY_ID FROM CSU_CITY WHERE CITY_NAME = 'All Cities' AND COUNTRY_ID = " + CountryID, oConn);
                oConn.Open();
                OracleDataReader dr = cmd.ExecuteReader(CommandBehavior.CloseConnection);
                if (dr.HasRows)
                {
                    dr.Read();
                    City_ID = Convert.ToInt32(dr["CITY_ID"].ToString());
                }
                dr.Close();
            }
            else
            {
                City_ID = Convert.ToInt32(ds.Tables[0].Rows[0]["CITY_ID"].ToString());
            }

            
            return City_ID;
        }

        public DataSet GetCountryName(int CountryID, int CityID)
        {
            string strQry = null;
            if (CityID > 0)
            {
                strQry = "Select cn.region_id, cn.country_name, decode(state_province_flag,1,ct.city_name||'('||state_province_name||')',0,ct.city_name)city_name from csu_country cn, csu_city ct,csu_state_province cs where nvl(cn.Country_id,0) = " + CountryID;
                if (CityID > 0)
                {
                    strQry += " and nvl(ct.City_id,0) = " + CityID;
                }
                strQry += " and nvl(ct.state_province_id,0)=nvl(cs.state_province_id,0) ";
            }
            else
            {
                strQry = "Select cn.region_id, cn.country_name from csu_country cn where nvl(cn.Country_id,0) = " + CountryID;
                
            }

            OracleCommand cmd = new OracleCommand(strQry, oConn);
            DataSet ds = new DataSet();
            OracleDataAdapter dad = new OracleDataAdapter(cmd);
            dad.Fill(ds);
            return ds;
        }

        public DataSet GetCountryCoverageDetails(int CaseID, int CharTypeID)
        {
            string strQry = null;
            strQry = "Select Char_Name, char_value, char_actual_value, d.display_order_cd, char_num_value from csu_ref_valid_char b, csu_case_details c, csu_ref_product_opt_matrix d where c.case_id = " + CaseID + " and b.char_id = c.char_id and c.option_matrix_id = d.option_matrix_id and c.case_detail_valid_cd = 1 and d.option_matrix_valid_cd = 1 and b.char_type_id = " + CharTypeID + " and b.char_valid_cd = 1 ORDER BY d.display_order_cd,char_num_value";
            OracleCommand cmd = new OracleCommand(strQry, oConn);
            DataSet ds = new DataSet();
            OracleDataAdapter dad = new OracleDataAdapter(cmd);
            dad.Fill(ds);
            return ds;
        }

        public int GetCarriersCount(int ProductID, int CountryID, int CityID, int SubProductID, int PortSpeed)
        {
            OracleCommand cmd = new OracleCommand("SELECT UNIQUE C.ACCESS_SUPPLIER_CHAR_ID FROM CSU_CASES C WHERE C.PRODUCT_CD = " + ProductID + " AND NVL(C.COUNTRY_ID,0) = " + CountryID + " AND NVL(C.CITY_ID,0) = " + CityID + " AND NVL(C.SUBPRODUCT_CD,0) = " + SubProductID + " AND NVL(C.ACCESS_SPEED_CHAR_ID,0) = " + PortSpeed, oConn);

            DataSet ds = new DataSet();
            OracleDataAdapter dad = new OracleDataAdapter(cmd);
            dad.Fill(ds);
            int Count = 0;
            if (ds != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
            {
                Count = ds.Tables[0].Rows.Count;
            }
            return Count;

        }


        public DataSet GetCarriers(int ProductID, int CountryID, int CityID, int SubProductID, int PortSpeed)
        {
            OracleCommand cmd = new OracleCommand("SELECT UNIQUE ACCESS_SUPPLIER_CHAR_ID, CHAR_NAME FROM CSU_CASES C, CSU_REF_VALID_CHAR CH WHERE C.PRODUCT_CD = " + ProductID + " AND NVL(C.COUNTRY_ID,0) = " + CountryID + " AND NVL(C.CITY_ID,0) = " + CityID + " AND NVL(C.SUBPRODUCT_CD,0) = " + SubProductID + " AND NVL(C.ACCESS_SPEED_CHAR_ID,0) = " + PortSpeed + " AND C.ACCESS_SUPPLIER_CHAR_ID = CH.CHAR_ID", oConn);

            DataSet ds = new DataSet();
            OracleDataAdapter dad = new OracleDataAdapter(cmd);
            dad.Fill(ds);
            return ds;

        }

        public DataSet GetCarrierID(int ProductID, int CountryID, int CityID, int SubProductID, int PortSpeed)
        {
            OracleCommand cmd = new OracleCommand("Select unique access_supplier_char_id, char_name from csu_cases c, csu_ref_valid_char ch where c.product_cd = " + ProductID + " and nvl(c.Country_id,0) = " + CountryID + " and nvl(c.City_id,0) = " + CityID + " and nvl(c.subproduct_cd,0) = " + SubProductID + " and nvl(c.access_speed_char_id,0) = " + PortSpeed + " and c.access_supplier_char_id = ch.char_id ", oConn);

            DataSet ds = new DataSet();
            OracleDataAdapter dad = new OracleDataAdapter(cmd);
            dad.Fill(ds);
            return ds;

        }


        public DataSet GetCaseID(int ProductID, int CountryID, int CityID, int SubProductID, int PortSpeed, int CarrierID)
        {
            OracleCommand cmd = new OracleCommand("SELECT CASE_ID,CASE_AVAIL_CD, AVAIL_DESC FROM CSU_CASES A, CSU_REF_AVAILABILITY C WHERE NVL(A.PRODUCT_CD,0) = " + ProductID + " AND NVL(A.SUBPRODUCT_CD,0) = " + SubProductID + " AND NVL(A.COUNTRY_ID,0) = " + CountryID + " AND NVL(A.CITY_ID,0) = " + CityID + " AND NVL(A.ACCESS_SUPPLIER_CHAR_ID,0) = " + CarrierID + " AND NVL(A.ACCESS_SPEED_CHAR_ID,0) = " + PortSpeed + " AND A.CASE_AVAIL_CD = C.AVAIL_CD AND A.HUB_SITE_ID IS NOT NULL AND A.CASE_VALID_CD = 1", oConn);

            DataSet ds = new DataSet();
            OracleDataAdapter dad = new OracleDataAdapter(cmd);
            dad.Fill(ds);

            return ds;

        }

        public DataSet GetCharacteristics(int CaseID, int IgnoreHubbing,int SubProduct1,int SubProduct2)
        {
            string strQry="";
            if (IgnoreHubbing == 1)
            {
                strQry="Select distinct char_type_name,char_type_alias,a.char_type_id char_unit_of_measure, display_order_cd, a.char_type_id,char_type_value_count from csu_ref_char_type a, csu_ref_valid_char b, csu_ref_product_opt_matrix d where d.subproduct_cd in ("+SubProduct1+","+SubProduct2+") and a.char_type_id <> 28 and a.char_type_id <> 641 and a.char_type_id = d.char_type_id and b.char_type_id = a.char_type_id and d.option_matrix_valid_cd = 1 and b.char_valid_cd = 1 ORDER BY d.display_order_cd, a.char_type_id";
            }
            else
            {
                strQry="SELECT CHAR_TYPE_NAME,CHAR_TYPE_ALIAS,CHAR_NAME, E.AVAIL_DESC, C.CHAR_AVAIL_CD, CHAR_VALUE, CHAR_VALUE_2, CHAR_UNIT_OF_MEASURE, DISPLAY_ORDER_CD,C.CHAR_ID, A.CHAR_TYPE_ID, C.CASE_DETAIL_VALID_CD, CHAR_ACTUAL_VALUE,CHAR_TYPE_VALUE_COUNT FROM CSU_REF_CHAR_TYPE A, CSU_REF_VALID_CHAR B, CSU_CASE_DETAILS C, CSU_REF_PRODUCT_OPT_MATRIX D, CSU_REF_AVAILABILITY E WHERE C.CASE_ID = " + CaseID + " AND A.CHAR_TYPE_ID <> 28 AND A.CHAR_TYPE_ID <> 641 AND A.CHAR_TYPE_ID = B.CHAR_TYPE_ID AND B.CHAR_TYPE_ID = C.CHAR_TYPE_ID AND B.CHAR_ID = C.CHAR_ID AND C.OPTION_MATRIX_ID = D.OPTION_MATRIX_ID AND D.OPTION_MATRIX_VALID_CD = 1 AND E.AVAIL_CD(+) = C.CHAR_AVAIL_CD AND B.CHAR_VALID_CD = 1 ORDER BY D.DISPLAY_ORDER_CD,CHAR_NUM_VALUE, CHAR_TYPE_ID";
            }

            OracleCommand cmd = new OracleCommand(strQry, oConn);

            DataSet ds = new DataSet();
            OracleDataAdapter dad = new OracleDataAdapter(cmd);
            dad.Fill(ds);
            return ds;
        }

        public DataSet GetSpecialBidCode(int Case1ID, int Case2ID, int CharTypeID)
        {
            string strQry = "Select b.Char_Id, Char_Name, char_value, c.case_detail_valid_cd, char_actual_value, d.display_order_cd, char_num_value, char_avail_cd from csu_ref_valid_char b, csu_case_details c, csu_ref_product_opt_matrix d where c.case_id in ("+Case1ID+","+Case2ID+") and b.char_id = c.char_id and c.option_matrix_id = d.option_matrix_id and d.option_matrix_valid_cd = 1 and b.char_type_id = "+CharTypeID+" and b.char_valid_cd = 1 ORDER BY char_num_value, char_id, case_detail_valid_cd desc, char_value desc";
            OracleCommand cmd = new OracleCommand(strQry, oConn);

            DataSet ds = new DataSet();
            OracleDataAdapter dad = new OracleDataAdapter(cmd);
            dad.Fill(ds);
            return ds;
        }

        public DataSet GetOneSideShopping(int Case1ID, int Case2ID, int CharTypeID)
        {
            string strQry = "Select b.Char_Id, Char_Name, char_value, c.case_detail_valid_cd, char_actual_value, d.display_order_cd, char_num_value from csu_ref_valid_char b, csu_case_details c, csu_ref_product_opt_matrix d where c.case_id in (" + Case1ID + "," + Case2ID + ") and b.char_id = c.char_id and c.option_matrix_id = d.option_matrix_id and d.option_matrix_valid_cd = 1 and b.char_type_id = " + CharTypeID + " and b.char_valid_cd = 1 ORDER BY char_num_value, char_id, case_detail_valid_cd desc, char_value desc ";
            OracleCommand cmd = new OracleCommand(strQry, oConn);

            DataSet ds = new DataSet();
            OracleDataAdapter dad = new OracleDataAdapter(cmd);
            dad.Fill(ds);
            return ds;
        }

        public DataSet GetTransportMediumChars(int CaseID, int CharTypeID)
        {
            string strQry = "SELECT B.CHAR_ID, CHAR_NAME, CHAR_VALUE, CHAR_VALUE_2, C.CASE_DETAIL_VALID_CD, CHAR_ACTUAL_VALUE, D.DISPLAY_ORDER_CD, CHAR_NUM_VALUE, C.CHAR_AVAIL_CD FROM CSU_REF_VALID_CHAR B, CSU_CASE_DETAILS C, CSU_REF_PRODUCT_OPT_MATRIX D WHERE C.CASE_ID = "+CaseID+" AND B.CHAR_ID = C.CHAR_ID AND C.OPTION_MATRIX_ID = D.OPTION_MATRIX_ID AND D.OPTION_MATRIX_VALID_CD = 1 AND B.CHAR_TYPE_ID = "+CharTypeID+" AND B.CHAR_VALID_CD = 1 ORDER BY CHAR_NUM_VALUE, CHAR_ID, CASE_DETAIL_VALID_CD DESC, CHAR_VALUE DESC";
            OracleCommand cmd = new OracleCommand(strQry, oConn);

            DataSet ds = new DataSet();
            OracleDataAdapter dad = new OracleDataAdapter(cmd);
            dad.Fill(ds);
            return ds;
        }

        public int GetEstimatedLeadTime(int CaseID)
        {
            OracleCommand cmd = new OracleCommand("select nvl(char_value,0) as char_value from csu_case_details where char_type_id = 645 and char_id = 3930 and case_id = " + CaseID + " and case_detail_valid_cd = 1", oConn);

            DataSet ds = new DataSet();
            OracleDataAdapter dad = new OracleDataAdapter(cmd);
            dad.Fill(ds);
            int Count = 0;
            if (ds != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
            {
                Count = Convert.ToInt32(ds.Tables[0].Rows[0]["char_value"].ToString());
            }
            return Count;
        }

        public DataSet GetAccessInfoData1(int CaseID, int PortSpeed, int CountryID, int RegionID)
        {
            OracleCommand cmd = new OracleCommand("SELECT DISTINCT B.CHAR_ACTUAL_VALUE, B.CHAR_UNIT_OF_MEASURE, B.CHAR_NUM_VALUE,A.ACCESS_SPEED_CHAR_ID, C.PORT_SPEED_AVAIL_CD, D.CHAR_NAME AS TYPE, E.CHAR_NAME AS NAME,NVL(F.CHAR_VALUE_2,'NA') AS CHAR_VALUE,NVL(C.ACCESS_PRODUCT_TYPE_ID,0) AS ACCESS_PRODUCT_TYPE_ID, NVL(C.ACCESS_SUPPLIER_NAME_ID,0) AS ACCESS_SUPPLIER_NAME_ID, B.CHAR_ID,NVL(C.ACCESS_SUPPLIER_CHAR_ID,0) AS ACCESS_SUPPLIER_CHAR_ID, CCS.PRIORITY,CSB.HUB_SITE_NAME FROM PORT_TO_ACCESS_SPEEDS A, CSU_REF_VALID_CHAR B, CSU_CASE_PORT_ACCESS_SPEEDS C, CSU_REF_VALID_CHAR D, CSU_REF_VALID_CHAR E, CSU_CASE_DETAILS F ,CSU_CASES B2, CSU_SUPPLIER_COUNTRY CCS,CSU_HUB_SITE CSB,CSU_CASES B3 WHERE A.PORT_SPEED_CHAR_ID = " + PortSpeed + " AND A.ACCESS_SPEED_CHAR_ID = B.CHAR_ID AND C.PORT_SPEED_CHAR_ID = A.PORT_SPEED_CHAR_ID AND C.ACCESS_SPEED_CHAR_ID = A.ACCESS_SPEED_CHAR_ID AND CCS.SUPPLIER_ID = C.ACCESS_SUPPLIER_CHAR_ID AND CCS.COUNTRY_ID = " + CountryID + " AND C.CASE_ID = " + CaseID + " AND D.CHAR_ID = C.ACCESS_PRODUCT_TYPE_ID AND B3.CASE_ID =C.CASE_ID AND CSB.HUB_SITE_ID = B3.HUB_SITE_ID AND E.CHAR_ID = C.ACCESS_SUPPLIER_NAME_ID AND F.CASE_ID = " + CaseID + " AND F.CHAR_ID = " + PortSpeed + " AND C.VALID_CD = 1 AND B2.ACCESS_PRODUCT_TYPE_ID = C.ACCESS_PRODUCT_TYPE_ID AND B2.ACCESS_SUPPLIER_NAME_ID = C.ACCESS_SUPPLIER_NAME_ID AND B2.ACCESS_SUPPLIER_CHAR_ID = C.ACCESS_SUPPLIER_CHAR_ID AND B2.ACCESS_SPEED_CHAR_ID = A.ACCESS_SPEED_CHAR_ID AND B2.ACCESS_SUPPLIER_CHAR_ID NOT IN (SELECT DISTINCT SUPPLIER_ID FROM CSU_CASE_SUPPLIER WHERE CASE_ID = " + CaseID + ") AND NVL(B2.PRODUCT_CD,0) = 25 AND NVL(B2.REGION_ID,0) = " + RegionID + " AND NVL(B2.COUNTRY_ID,0) = " + CountryID + " AND NVL(B2.HUB_SITE_ID,0) = (select hub_site_id from csu_cases where case_id = " + CaseID + ") AND B2.CASE_VALID_CD = 1 ORDER BY B.CHAR_NUM_VALUE, CCS.PRIORITY", oConn);

            DataSet ds = new DataSet();
            OracleDataAdapter dad = new OracleDataAdapter(cmd);
            dad.Fill(ds);
            return ds;
        }


        public DataSet GetAccessInfoData2(int CaseID, int PortSpeed, int CountryID, int RegionID, int AccessSpeedCharID, int AccessSupplierCharID, int AccessSupplierNameID, int AccessProductTypeID, int ProductID)
        {
            OracleCommand cmd = new OracleCommand("SELECT DISTINCT C.CHAR_NAME, D.CHAR_ACTUAL_VALUE,I.PREFERRED_FLAG, C.CHAR_ID AS CHAR_ID, R.AVAIL_DESC, CCD.CHAR_AVAIL_CD FROM CSU_REF_VALID_CHAR C,CSU_REF_VALID_CHAR D, CSU_CASES CD, CSU_CASE_DETAILS CCD, CSU_PRODUCT_ACCESS_INTERFACES I, CSU_REF_AVAILABILITY R WHERE CD.PRODUCT_CD = 25 AND CD.COUNTRY_ID = " + CountryID + " AND CD.HUB_SITE_ID = (select hub_site_id from csu_cases where case_id = " + CaseID + ") AND CD.ACCESS_SUPPLIER_CHAR_ID NOT IN (SELECT Z.SUPPLIER_ID FROM CSU_CASE_SUPPLIER Z WHERE Z.CASE_ID = " + CaseID + ") AND CD.ACCESS_SUPPLIER_CHAR_ID = (SELECT DISTINCT B2.ACCESS_SUPPLIER_CHAR_ID FROM CSU_CASE_DETAILS A2, CSU_CASES B2, CSU_REF_VALID_CHAR C WHERE B2.ACCESS_SPEED_CHAR_ID = " + AccessSpeedCharID + " AND B2.ACCESS_SUPPLIER_CHAR_ID = " + AccessSupplierCharID + " AND B2.ACCESS_SUPPLIER_NAME_ID = " + AccessSupplierNameID + " AND B2.ACCESS_PRODUCT_TYPE_ID = " + AccessProductTypeID + " AND C.CHAR_ID = B2.ACCESS_SUPPLIER_CHAR_ID AND C.CHAR_VALID_CD = 1 AND B2.ACCESS_SUPPLIER_CHAR_ID NOT IN (SELECT DISTINCT SUPPLIER_ID FROM CSU_CASE_SUPPLIER WHERE CASE_ID = " + CaseID + ") AND A2.CASE_ID = B2.CASE_ID AND NVL(B2.PRODUCT_CD,0) = 25 AND NVL(B2.REGION_ID,0) = " + RegionID + " AND NVL(B2.COUNTRY_ID,0) = " + CountryID + " AND NVL(B2.HUB_SITE_ID,0) = (select hub_site_id from csu_cases where case_id = " + CaseID + ") AND A2.CASE_DETAIL_VALID_CD = 1 AND B2.CASE_VALID_CD = 1) AND CD.ACCESS_PRODUCT_TYPE_ID = " + AccessProductTypeID + " AND CD.ACCESS_SUPPLIER_NAME_ID = " + AccessSupplierNameID + " AND CD.ACCESS_SPEED_CHAR_ID = " + AccessSpeedCharID + " AND CCD.CASE_ID = CD.CASE_ID AND I.PRODUCT_CD = " + ProductID + " AND I.ACCESS_CHAR_ID =" + AccessSpeedCharID + " AND CCD.CHAR_ID = I.INTERFACE_CHAR_ID AND CCD.CASE_DETAIL_VALID_CD = 1 AND C.CHAR_ID = CCD.CHAR_ID AND R.AVAIL_CD = CCD.CHAR_AVAIL_CD AND D.CHAR_ID=(SELECT DISTINCT B2.ACCESS_SUPPLIER_CHAR_ID FROM CSU_CASE_DETAILS A2, CSU_CASES B2, CSU_REF_VALID_CHAR C WHERE B2.ACCESS_SPEED_CHAR_ID = " + AccessSpeedCharID + " AND B2.ACCESS_SUPPLIER_CHAR_ID = " + AccessSupplierCharID + " AND B2.ACCESS_SUPPLIER_NAME_ID = " + AccessSupplierNameID + " AND B2.ACCESS_PRODUCT_TYPE_ID = " + AccessProductTypeID + " AND C.CHAR_ID = B2.ACCESS_SUPPLIER_CHAR_ID AND C.CHAR_VALID_CD = 1 AND B2.ACCESS_SUPPLIER_CHAR_ID NOT IN (SELECT DISTINCT SUPPLIER_ID FROM CSU_CASE_SUPPLIER WHERE CASE_ID = " + CaseID + ") AND A2.CASE_ID = B2.CASE_ID AND NVL(B2.PRODUCT_CD,0) = 25 AND NVL(B2.REGION_ID,0) = " + RegionID + " AND NVL(B2.COUNTRY_ID,0) = " + CountryID + " AND NVL(B2.HUB_SITE_ID,0) = (SELECT HUB_SITE_ID FROM CSU_CASES WHERE CASE_ID = " + CaseID + ") AND A2.CASE_DETAIL_VALID_CD = 1 AND B2.CASE_VALID_CD = 1)", oConn);

            DataSet ds = new DataSet();
            OracleDataAdapter dad = new OracleDataAdapter(cmd);
            dad.Fill(ds);
            return ds;
        }

        public int GetHubSiteID(int CaseID)
        {
            OracleCommand cmd = new OracleCommand("SELECT HUB_SITE_ID FROM CSU_CASES WHERE CASE_ID = " + CaseID , oConn);
            int HubSiteID = 0;
            DataSet ds = new DataSet();
            OracleDataAdapter dad = new OracleDataAdapter(cmd);
            dad.Fill(ds);
            if (ds != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
            {
                HubSiteID = Convert.ToInt32(ds.Tables[0].Rows[0]["HUB_SITE_ID"].ToString());
            }
            return HubSiteID;
        }

        public DataSet GetSubProds(int ProductID)
        {
            OracleCommand cmd = new OracleCommand("Select subProduct_cd1, subProduct_cd2 from TBL_HUBBING_EXCEP  Where Product_cd = "+ProductID+" And hub_valid_cd = 1" , oConn);
            
            DataSet ds = new DataSet();
            OracleDataAdapter dad = new OracleDataAdapter(cmd);
            dad.Fill(ds);
            return ds;
        }


        public DataTable GetLeadTime(string vPOP, string vCountry, string vSpeed, string vSupplier, string vAccType, string vAccSuppName,
            string vInterface, string vPortSpeedLeadTime, int ProductID)
        {

            GetDataFromDB objDB = new GetDataFromDB();


            string strsql = "";

            strsql = "select char_value,OFF_NET_LEAD_TIME_STATUS_NAME,ON_NET_LEAD_TIME,ON_NET_LEAD_TIME_STATUS_NAME from csu_Cases cd, csu_case_details ccd where cd.product_cd = " + ProductID;
            if (vPOP != "")
                strsql += " and cd.hub_site_id = " + vPOP;
            else
                strsql = strsql + " and cd.country_id = " + vCountry;

            strsql += " and cd.access_speed_char_id = " + vSpeed + " and cd.access_supplier_char_id = " + vSupplier;
            strsql += " and cd.access_product_type_id = " + vAccType;
            strsql += " and cd.access_supplier_name_id = " + vAccSuppName;
            strsql += " and cd.case_valid_cd = 1 and ccd.case_id = cd.case_id and ccd.char_id = " + vInterface;
            strsql += " and ccd.case_detail_valid_cd = 1 and ccd.char_avail_cd != 2 and rownum <2 order by 1 desc";

            return objDB.GetDataTable(strsql);

        }


    }
}

