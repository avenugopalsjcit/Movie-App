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
    public partial class DispaNotesList : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            //hdnProductID.Value = Request.QueryString["productid"].ToString();
            //hdnNoteID.Value = Request.QueryString["NoteID"].ToString();
        }
        [WebMethod]
        public static DispaNotes GetNotesInformation(int productID, string NoteID)
        {
            ProdLinkBAL bal = new ProdLinkBAL();
            DispaNotes DisNotes = new DispaNotes();
            DataSet ds = bal.DisplayNotesInformation(productID, NoteID);
            if (ds != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
            {
               

                foreach (DataRow dr in ds.Tables[0].Rows)
                {
                    DisNotes = new DispaNotes() { UserName = dr["CreatedBy"].ToString(), NotePriority = dr["Note_Priority_desc"].ToString(), NoteCatageroy = dr["NOTE_CATEGORY_DESC"].ToString(), NOTEEFFBEGDATE = Convert.ToDateTime(dr["NOTE_EFF_BEG_DATE"].ToString()).ToString("dd-MMM-yyyy"), NOTEEFFENDDATE = Convert.ToDateTime(dr["NOTE_EFF_END_DATE"].ToString()).ToString("dd-MMM-yyyy"), NoteTitle = dr["NOTE_TITLE"].ToString().Replace("&quot;", @""""), NOTECONTENT = dr["NOTE_CONTENT"].ToString(), ProductName = dr["PRODUCT_NAME"].ToString() };

                }
            }

            return DisNotes;
        }
        [WebMethod]
        public static DispaNotes GetCountryNotes(int countryID, string NoteID)
        {
            ProdLinkBAL bal = new ProdLinkBAL();
            DispaNotes cntryNotes = new DispaNotes();
            DataSet ds = bal.DispCountryNotes(countryID, NoteID);
            if (ds != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
            {


                foreach (DataRow dr in ds.Tables[0].Rows)
                {
                    cntryNotes = new DispaNotes() { UserName = dr["CreatedBy"].ToString(), NotePriority = dr["Note_Priority_desc"].ToString(), NoteCatageroy = dr["NOTE_CATEGORY_DESC"].ToString(), NOTEEFFBEGDATE =dr["NOTE_EFF_BEG_DATE"].ToString() != "" ? Convert.ToDateTime(dr["NOTE_EFF_BEG_DATE"].ToString()).ToString("dd-MMM-yyyy"):"", NOTEEFFENDDATE = dr["NOTE_EFF_END_DATE"].ToString() != "" ?Convert.ToDateTime(dr["NOTE_EFF_END_DATE"].ToString()).ToString("dd-MMM-yyyy"):"", NoteTitle = dr["NOTE_TITLE"].ToString(), NOTECONTENT = dr["NOTE_CONTENT"].ToString(), ProductName = dr["PRODUCT_NAME"].ToString(), CountryName=dr["COUNTRY_NAME"].ToString(), RegionName=dr["REGION_NAME"].ToString() };

                }
            }
            return cntryNotes;
        }

         [WebMethod]
        public static DispaNotes GetRegionNotes(int RegionID, string NoteID)
        {

            ProdLinkBAL bal = new ProdLinkBAL();
            DispaNotes RegNotes = new DispaNotes();
            DataSet ds = bal.DispRegionNotes(RegionID, NoteID);
            if (ds != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
            {
                foreach (DataRow dr in ds.Tables[0].Rows)
                {
                    RegNotes = new DispaNotes() { UserName = dr["CreatedBy"].ToString(), NotePriority = dr["Note_Priority_desc"].ToString(), NoteCatageroy = dr["NOTE_CATEGORY_DESC"].ToString(), NOTEEFFBEGDATE = Convert.ToDateTime(dr["NOTE_EFF_BEG_DATE"].ToString()).ToString("dd-MMM-yyyy"), NOTEEFFENDDATE = Convert.ToDateTime(dr["NOTE_EFF_END_DATE"].ToString()).ToString("dd-MMM-yyyy"), NoteTitle = dr["NOTE_TITLE"].ToString(), NOTECONTENT = dr["NOTE_CONTENT"].ToString(), ProductName = dr["PRODUCT_NAME"].ToString(),RegionName=dr["REGION_NAME"].ToString() };
                }
            }

            return RegNotes;
        }


    }
}