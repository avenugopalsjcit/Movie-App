using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Data;
using System.Configuration;
using Oracle.DataAccess.Client;



namespace SCSearchDAL
{
   public  class ProdLinkDAL
    {
        DataSet ds;
        OracleDataAdapter dad;
        OracleConnection con = new OracleConnection(ConfigurationManager.AppSettings.Get("OraConnString"));

        public DataSet GetProductDocumentsLinks(int ProductID)
        {
            string query = "select distinct document_title, document_url from csu_documentation where product_cd = "+ProductID+" order by document_title";
            OracleCommand cmd = new OracleCommand(query.ToString(), con);
            dad = new OracleDataAdapter(cmd);
            ds = new DataSet();
            dad.Fill(ds);
            return ds;

        }

        public DataSet GetProductNotes(int ProductID,int CountryID,int RegionID)
        {
            StringBuilder sb=new StringBuilder();
            if (ProductID > 0 && CountryID > 0)
            {
                sb.Append(" Select a.Updated_dt, a.Note_Title, b.Note_Category_desc, c.Note_Priority_desc, Note_id from CSU_Notes a , CSU_Ref_Notes_Category b, CSU_Ref_Notes_Priority c ");
                sb.Append(" Where a.Note_Category_cd = b.Note_Category_cd and a.Note_Category_cd <> 4 and a.Note_Priority_cd = c.Note_Priority_cd  and a.Product_Cd = " + ProductID + " ");
                sb.Append(" and a.City_id is Null and a.Country_id ="+CountryID+" ORDER BY a.Updated_dt DESC ");

            }
            else if(ProductID>0 && CountryID==0 && RegionID==0)
            {
                sb.Append(" Select a.Updated_dt, a.Note_Title, b.Note_Category_desc, c.Note_Priority_desc, Note_id from CSU_Notes a , CSU_Ref_Notes_Category b, CSU_Ref_Notes_Priority c ");
                sb.Append(" Where a.Note_Category_cd = b.Note_Category_cd and a.Note_Category_cd <> 4 and a.Note_Priority_cd = c.Note_Priority_cd and a.Region_id is Null and a.Product_Cd = " + ProductID + " ");
                sb.Append(" and a.City_id is Null and a.Country_id is Null ORDER BY a.Updated_dt DESC ");
            }

            else if (ProductID > 0 && RegionID > 0)
            {
                sb.Append(" Select a.Updated_dt, a.Note_Title, b.Note_Category_desc, c.Note_Priority_desc, Note_id from CSU_Notes a ,");
                sb.Append(" CSU_Ref_Notes_Category b, CSU_Ref_Notes_Priority c Where a.Note_Category_cd = b.Note_Category_cd and a.Note_Category_cd <> 4 ");
                sb.Append(" and a.Note_Priority_cd = c.Note_Priority_cd and a.Region_id = "+RegionID+" and a.Product_Cd = "+ProductID+" ");
                sb.Append(" and a.City_id is Null and a.Country_id is Null ORDER BY a.Updated_dt DESC ");
            }
            OracleCommand cmd = new OracleCommand(sb.ToString(), con);
            dad = new OracleDataAdapter(cmd);
            ds = new DataSet();
            dad.Fill(ds);
            return ds;
           
        }


        public DataSet DisplayNotes(int productID, string NoteID)
        {
            StringBuilder sb = new StringBuilder();
            sb.Append("   Select  c.Note_Priority_desc, b.Note_Category_desc, a.NOTE_EFF_BEG_DATE, a.NOTE_EFF_END_DATE,a.Note_Title, to_char(NOTE_CONTENT) as NOTE_CONTENT,u.User_Name AS CreatedBy, p.PRODUCT_NAME ");
            sb.Append(" from CSU_Notes a LEFT JOIN  CSU_Ref_Notes_Category b ON  a.Note_Category_cd = b.Note_Category_cd ");
            sb.Append(" LEFT JOIN CSU_Ref_Notes_Priority c  ON a.Note_Priority_cd = c.Note_Priority_cd ");
            sb.Append(" LEFT JOIN CSU_User u on u.EMP_ID=a.created_emp_id ");
            sb.Append(" LEFT JOIN CSU_PRODUCT p on p.PRODUCT_CD= a.PRODUCT_CD ");
            sb.Append(" Where a.Note_Category_cd <> 4 and  a.Region_id is Null and a.Product_Cd = "+productID+" and Note_id ="+NoteID+" ");
            sb.Append(" and a.City_id is Null and a.Country_id is Null ORDER BY a.Updated_dt DESC ");
            OracleCommand cmd=new OracleCommand(sb.ToString(),con);
            dad=new OracleDataAdapter(cmd);
            ds=new DataSet();
            dad.Fill(ds);
            return ds;
        }

        public DataSet DisplayCountryNotes(int countryID, string NoteID)
        {
            StringBuilder sb = new StringBuilder();
            sb.Append(" Select  c.Note_Priority_desc, b.Note_Category_desc, a.NOTE_EFF_BEG_DATE, a.NOTE_EFF_END_DATE,a.Note_Title, to_char(NOTE_CONTENT) as NOTE_CONTENT,u.User_Name AS CreatedBy, ");
            sb.Append(" p.PRODUCT_NAME,r.REGION_NAME,cntry.COUNTRY_NAME from CSU_Notes a LEFT JOIN CSU_Ref_Notes_Category b ON  a.Note_Category_cd = b.Note_Category_cd ");
            sb.Append(" LEFT JOIN CSU_Ref_Notes_Priority c  ON a.Note_Priority_cd = c.Note_Priority_cd ");
            sb.Append(" LEFT JOIN CSU_User u on u.EMP_ID=a.created_emp_id ");
            sb.Append(" LEFT JOIN CSU_PRODUCT p on p.PRODUCT_CD= a.PRODUCT_CD ");
            sb.Append(" LEFT JOIN CSU_REGION r on r.REGION_ID= a.REGION_ID ");
            sb.Append(" LEFT JOIN CSU_COUNTRY cntry on cntry.COUNTRY_ID= a.COUNTRY_ID ");
            sb.Append(" Where a.Note_Category_cd <> 4 and Note_id ="+NoteID+"  and a.City_id is Null ");
            sb.Append(" and a.Country_id ="+countryID+" ORDER BY a.Updated_dt DESC ");

            OracleCommand cmd = new OracleCommand(sb.ToString(), con);
            dad = new OracleDataAdapter(cmd);
            ds = new DataSet();
            dad.Fill(ds);
            return ds;
        }

        public DataSet DisplayRegionNotes(int RegionID, string NoteID)
        {
            StringBuilder sb = new StringBuilder();
            sb.Append(" Select  c.Note_Priority_desc, b.Note_Category_desc, a.NOTE_EFF_BEG_DATE, a.NOTE_EFF_END_DATE,a.Note_Title,to_char(NOTE_CONTENT) as NOTE_CONTENT,u.User_Name AS CreatedBy, p.PRODUCT_NAME ,r.REGION_NAME from CSU_Notes a ");
            sb.Append(" LEFT JOIN  CSU_Ref_Notes_Category b ON  a.Note_Category_cd = b.Note_Category_cd ");
            sb.Append(" LEFT JOIN CSU_Ref_Notes_Priority c  ON a.Note_Priority_cd = c.Note_Priority_cd ");
            sb.Append(" LEFT JOIN CSU_User u on u.EMP_ID=a.created_emp_id ");
            sb.Append(" LEFT JOIN CSU_PRODUCT p on p.PRODUCT_CD= a.PRODUCT_CD ");
            sb.Append(" LEFT JOIN CSU_REGION r on r.REGION_ID= a.REGION_ID ");
            sb.Append("  Where a.Note_Category_cd <> 4 and  Note_id =" + NoteID + " and a.City_id is Null ");
            sb.Append(" and a.Region_id =" + RegionID + " ORDER BY a.Updated_dt DESC ");

            OracleCommand cmd = new OracleCommand(sb.ToString(), con);
            dad = new OracleDataAdapter(cmd);
            ds = new DataSet();
            dad.Fill(ds);
            return ds;
        }



    }
}
