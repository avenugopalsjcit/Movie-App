using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using SCSearchBAL;
using System.Web.Services;
using System.Data;
using System.Collections;

namespace SCSearch
{
    public partial class Notes : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }
        [WebMethod]
        public static List<ProductNotes> GetNotesForProduct(int ProductID, int CountryID, int RegionID)
        {
            ProdLinkBAL bal = new ProdLinkBAL();
            List<ProductNotes> ProdNotes = new List<ProductNotes>();
            DataSet ds = bal.GetProdcutNotes(ProductID, CountryID, RegionID);
            if (ds != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
            {
                ProductNotes ProductNotes = new ProductNotes();
                foreach (DataRow dr in ds.Tables[0].Rows)
                {
                    ProductNotes = new ProductNotes() { UpdatedDate = dr["UPDATED_DT"].ToString() != "" ? Convert.ToDateTime(dr["UPDATED_DT"].ToString()).ToString("dd-MMM-yyyy") : "Invalid Date", NoteTitle = dr["NOTE_TITLE"].ToString().Replace("&quot;", @"""").Replace("&amp;", "&"), NoteCatageroy = dr["NOTE_CATEGORY_DESC"].ToString(), NotePriority = dr["Note_Priority_desc"].ToString(), NoteID = (dr["Note_id"].ToString()) };
                    ProdNotes.Add(ProductNotes);
                }
            }
            return ProdNotes;
        }
    }
}