using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Data;
using SCSearchDAL;

namespace SCSearchBAL
{
   public  class ProdLinkBAL
    {
       public DataSet GetDocumentLinks(int ProductID)
       {
           ProdLinkDAL dal = new ProdLinkDAL();
           return dal.GetProductDocumentsLinks(ProductID);
       }

       public DataSet GetProdcutNotes(int ProductID, int CountryID, int RegionID)
       {
           ProdLinkDAL dl = new ProdLinkDAL();
           return dl.GetProductNotes(ProductID, CountryID, RegionID);
       }
       public DataSet DisplayNotesInformation(int productID, string NoteID)
       {
           ProdLinkDAL dal = new ProdLinkDAL();
           return dal.DisplayNotes(productID, NoteID);
       }
       public DataSet DispCountryNotes(int countryID, string NoteID)
       {
           ProdLinkDAL dal = new ProdLinkDAL();
           return dal.DisplayCountryNotes(countryID, NoteID);
       }

       public DataSet DispRegionNotes(int RegionID, string NoteID)
       {
           ProdLinkDAL dal = new ProdLinkDAL();
           return dal.DisplayRegionNotes(RegionID, NoteID);
       }
    }
}
