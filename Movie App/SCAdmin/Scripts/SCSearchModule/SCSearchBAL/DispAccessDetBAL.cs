using System;

using System.Collections.Generic;
using System.Linq;
using System.Text;
using SCSearchDAL;
using System.Data;

namespace SCSearchBAL
{
    public class DispAccessDetBAL
    {
        public TupleList<string, string> getAccessSupplier(int productCode, int countryCode, int cityCode, int siteCode)
        {
            DispAccessDetDAL objDispAccessDetDAL = new DispAccessDetDAL();
            DataTable dtAccSupplier = objDispAccessDetDAL.getAccessSupplier(productCode, countryCode, cityCode, siteCode);

            var AccSuppList = new TupleList<string, string>();

            foreach (DataRow dr in dtAccSupplier.Rows)
            {
                AccSuppList.Add(dr[0].ToString(), dr[1].ToString());
            }
            return AccSuppList;
        }

        //public List<string> getTableHeading(int countryCode, int siteCode, int productCode, int cityCode)
        //{
        //    DispAccessDetDAL objDispAccessDetDAL = new DispAccessDetDAL();
        //    List<string> lst = new List<string>();
        //    List<string> lstcharIds = new List<string>();
        //    DataTable dtGridHeading = objDispAccessDetDAL.getGridHeading(countryCode, siteCode, productCode, cityCode);

        //    string prevCharTypeID = string.Empty;
        //    foreach (DataRow dr in dtGridHeading.Rows)
        //    {
        //        if (prevCharTypeID != Convert.ToString(dr["char_type_id"]))
        //        {
        //            if (Convert.ToString(dr["char_type_id"]) == "868")
        //                lstcharIds.Add(Convert.ToString(dr["char_type_id"]));
        //            else
        //                lstcharIds.Add(Convert.ToString(dr["Char_Name"]));


        //            if (Convert.ToString(dr["Char_Name"]).ToUpper() == "NETWORK INTERFACE")
        //                lst.Add("Customer Interface(s)");

        //            else if (Convert.ToString(dr["Char_Name"]).ToUpper() == "NOTES")
        //                lst.Add("Notes (Max characters = 250)");

        //            else
        //                lst.Add(Convert.ToString(dr["char_type_alias"]));
        //        }

        //    }
        //    return lst;
        //}

        public List<AccessDetails> getAccessDetails(int countryCode, int siteCode, int selectedSupplier)
        {
            DispAccessDetDAL objDispAccessDetDAL = new DispAccessDetDAL();

            DataTable dtAccessDetails = objDispAccessDetDAL.getAccessDetails(countryCode, siteCode, selectedSupplier);
            List<AccessDetails> lstAccDet = new List<AccessDetails>();
            foreach (DataRow dr in dtAccessDetails.Rows)
            {
                AccessDetails objAccessDetails = new AccessDetails();
                objAccessDetails.AccSpeedID = Convert.ToString(dr["Access_Speed_Char_Id"]);
                objAccessDetails.Speed = Convert.ToString(dr["Access_Speed"]);
                objAccessDetails.AccTypeTypeId = Convert.ToString(dr["Access_Product_Type_Id"]);
                objAccessDetails.AccType = Convert.ToString(dr["Access_Type"]);
                objAccessDetails.AccSuppID = Convert.ToString(dr["supplier_id"]);
                objAccessDetails.AccSupplier = Convert.ToString(dr["Supplier_Name"]);
                objAccessDetails.AccSuppProdID = Convert.ToString(dr["supplier_product_id"]);
                objAccessDetails.suppProdName = Convert.ToString(dr["Supplier_Product"]);
                objAccessDetails.AccessInterface = Convert.ToString(dr["Access_Interface"]);
                lstAccDet.Add(objAccessDetails);
            }
            return lstAccDet;
        }
    }
}
