using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Data;
using Oracle.DataAccess.Client;
using System.Configuration;

namespace SCSearchDAL
{
    class Filter1
    {
        OracleDataReader dad;
        DataTable dt = new DataTable();
       
        public DataSet GetSA()
        {
            OracleConnection oConn = new OracleConnection(ConfigurationManager.AppSettings.Get("OraConnString"));
           // OracleCommand cmdOra = new OracleCommand("select product_cd AS ProductID,product_name AS ProductName from CSU_PRODUCT order by product_name", oConn);
            
            OracleCommand cmd = new OracleCommand("pkg_dispproddetails.stp_getinitialdetails", oConn);
            cmd.CommandType = CommandType.Text;
cmd.CommandType = CommandType.StoredProcedure;
cmd.Parameters.Add("pproductloclevel", OracleType.Int32).Value = pproductloclevel;
cmd.Parameters.Add("pcapmanplatform", OracleType.Int32).Value = pcapmanplatform;
cmd.Parameters.Add("pstateflag", OracleType.Int32).Value = pstateflag;
cmd.Parameters.Add("pproductcd", OracleType.Int32).Value = pproductcd;
cmd.Parameters.Add("pregionid", OracleType.Int32).Value = pregionid;
cmd.Parameters.Add("pcountryid", OracleType.Int32).Value = pcountryid;
cmd.Parameters.Add("pstateid", OracleType.Int32).Value = pstateid;
cmd.Parameters.Add("pcityid", OracleType.Int32).Value = pcityid;
cmd.Parameters.Add("phub_site_id", OracleType.Int32).Value = phub_site_id;
cmd.Parameters.Add("pdetaildata", OracleType.Int32).Value = pdetaildata; 

ds = new DataSet();
dad = new OracleDataAdapter(cmdOra);
dad.Fill(ds);
return ds;


        }


    }
}
