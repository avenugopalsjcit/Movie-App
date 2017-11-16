using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using SCSearchDAL;
using System.Data;

namespace SCSearchBAL
{
    public class DispCPEProductBAL
    {
        public int selectedCountry;
        public int selectedCity;
        public int selectedSupplier;



        DispCPEProductDAL objDispCPEProductDAL = new DispCPEProductDAL();

        public TupleList<string, string> GetAllSupplier(string countryID)
        {
            var supplierList = new TupleList<string, string>();
            try
            {
                DataTable dtSupplier = objDispCPEProductDAL.GetAllSupplier(int.Parse(countryID));

                foreach (DataRow dr in dtSupplier.Rows)
                {
                    supplierList.Add(dr["char_id"].ToString(), dr["char_name"].ToString());
                }
            }
            catch (Exception ex) { throw ex; }
            return supplierList;
        }


        public List<CPEMaintainanceDetails> ValidMainOptionForProduct(string productID, string countryID, string cityID, string supplierID)
        {
            CPEBundleBAL objCPEBundleBAL = new CPEBundleBAL();
            //return objCPEBundleBAL.getCPEMaintainanceDetails(productID, supplierID, countryID, cityID);
            DataTable dtCPEMaintOpt = objDispCPEProductDAL.ValidCPEMaintOptsforproduct(int.Parse(productID),
                                                                                        int.Parse(countryID),
                                                                                        int.Parse(cityID),
                                                                                        supplierID);
            List<CPEMaintainanceDetails> lstMaintDet = new List<CPEMaintainanceDetails>();
            foreach (DataRow dr in dtCPEMaintOpt.Rows)
            {
                CPEMaintainanceDetails objCPEMaintainanceDetails = new CPEMaintainanceDetails();
                objCPEMaintainanceDetails.SupplierName = dr["SUPPLIER_NAME"].ToString();
                objCPEMaintainanceDetails.ServiceNumber = dr["SERVICE_NUMBER"].ToString();
                objCPEMaintainanceDetails.ServiceName = dr["SERVICE_NAME"].ToString();
                objCPEMaintainanceDetails.ServiceOrder = dr["SERVICE_ORDER"].ToString();
                objCPEMaintainanceDetails.ServiceAvailabilityDesc = dr["SERVICE_AVAIL_DESC"].ToString();
                objCPEMaintainanceDetails.ServiceRestriction = dr["SERVICE_RESTRICTIONS"].ToString();
                objCPEMaintainanceDetails.smartServiceAvailability = objCPEBundleBAL.CalculateSmartServiceAvailability(dr["SERVICE_NAME"].ToString());
                objCPEMaintainanceDetails.ManufacturerName = dr["MANUFACTURER_NAME"].ToString();
                objCPEMaintainanceDetails.MaintainerName = dr["MAINTAINER_NAME"].ToString();
                lstMaintDet.Add(objCPEMaintainanceDetails);
            }

            return lstMaintDet;

        }

        public TupleList<string, string> GetValidProductsforCountry(string selectedSupplier,string selectedCountry)
        {
            var prodlist = new TupleList<string, string>();
           // selectedSupplier = selectedSupplier.Remove(selectedSupplier.Length - 1);
            DataTable dtProduct = objDispCPEProductDAL.GetValidProductsforCountry(selectedSupplier, 
                                                                                    int.Parse(selectedCountry));
            foreach (DataRow dr in dtProduct.Rows)
            {
                prodlist.Add(dr[0].ToString(), dr[1].ToString());
            }
            return prodlist;
        }

        public List<CPELeadTimeandStatus> GetCPELeadTime(string supplierID, int countryID,int productID)
        {
            DataTable dtCPELeadtime = objDispCPEProductDAL.GetCPELeadTime(supplierID, countryID,productID);
            List<CPELeadTimeandStatus> lsCPELeadTime = new List<CPELeadTimeandStatus>();
            foreach (DataRow dr in dtCPELeadtime.Rows)
            {
                CPELeadTimeandStatus objCPELeadtime = new CPELeadTimeandStatus();


                if (productID == 63)
                {
                    //objCPELeadtime.CPELeadTime = dr["cpe_lead_time"].ToString();
                    //objCPELeadtime.CPELeadTimeStatus = dr["cpe_lead_time_status"].ToString();
                    //objCPELeadtime.CPECeaseLeadTime = dr["cpe_cease_leadtime"].ToString();
                    //objCPELeadtime.CPECeaseLeadTimeStatus = dr["cpe_cease_leadtime_status"].ToString();
                    //objCPELeadtime.suppliername = dr["suppliername"].ToString();
                    //lsCPELeadTime.Add(objCPELeadtime);
                    CalTranTypeforBTCPE(lsCPELeadTime, productID, dr["cpe_lead_time"].ToString(),
                                                                   dr["cpe_lead_time_status"].ToString(),
                                                                   dr["cpe_cease_leadtime"].ToString(),
                                                                   dr["cpe_cease_leadtime_status"].ToString(),
                                                                   dr["suppliername"].ToString()
                                                                   );
                }

                objCPELeadtime.transactionType = CalculateTransactionType(lsCPELeadTime, productID, dr["cpe_lead_time"].ToString(),
                                                                   dr["cpe_lead_time_status"].ToString(),
                                                                   dr["cpe_cease_leadtime"].ToString(),
                                                                   dr["cpe_cease_leadtime_status"].ToString());

                
            }
            return lsCPELeadTime;
        }

        private string CalculateTransactionType(List<CPELeadTimeandStatus> lst, int productId,string CPELeadTime, string CPELeadTimeStatus, string CPECeaseLeadTime, string CPECeaseLeadTimeStatus)
        {

            if (productId != 63)
            {
                if (!string.IsNullOrEmpty(CPELeadTime) || !string.IsNullOrEmpty(CPELeadTimeStatus))
                {
                    CPELeadTimeandStatus objCPELeadtime = new CPELeadTimeandStatus();
                    objCPELeadtime.transactionType = "Provide";
                    objCPELeadtime.CPELeadTime = CPELeadTime;
                    objCPELeadtime.CPELeadTimeStatus = CPELeadTimeStatus;
                    lst.Add(objCPELeadtime);
                }

                if (!string.IsNullOrEmpty(CPECeaseLeadTime) || !string.IsNullOrEmpty(CPECeaseLeadTimeStatus))
                {
                    CPELeadTimeandStatus objCPELeadtime = new CPELeadTimeandStatus();
                    objCPELeadtime.transactionType = "Cease";
                    objCPELeadtime.CPECeaseLeadTime = CPECeaseLeadTime;
                    objCPELeadtime.CPECeaseLeadTimeStatus = CPECeaseLeadTimeStatus;
                    lst.Add(objCPELeadtime);
                    
                }
            }
            else
            {
                if (!string.IsNullOrEmpty(CPELeadTime) || !string.IsNullOrEmpty(CPELeadTimeStatus))
                {
                    return "Provide";
                }
                if (!string.IsNullOrEmpty(CPECeaseLeadTime) || !string.IsNullOrEmpty(CPECeaseLeadTimeStatus)) { return "Cease"; }
            }
           

            return "";
        }

        private void CalTranTypeforBTCPE(List<CPELeadTimeandStatus> lst, int productId, string CPELeadTime, 
            string CPELeadTimeStatus, string CPECeaseLeadTime, string CPECeaseLeadTimeStatus,string supplier)
        {
            if (!string.IsNullOrEmpty(CPELeadTime) || !string.IsNullOrEmpty(CPELeadTimeStatus))
            {
                CPELeadTimeandStatus objCPELeadtime = new CPELeadTimeandStatus();
                objCPELeadtime.transactionType = "Provide";
                objCPELeadtime.CPELeadTime = CPELeadTime;
                objCPELeadtime.CPELeadTimeStatus = CPELeadTimeStatus;
                objCPELeadtime.suppliername = supplier;
                lst.Add(objCPELeadtime);
            }

            if (!string.IsNullOrEmpty(CPECeaseLeadTime) || !string.IsNullOrEmpty(CPECeaseLeadTimeStatus))
            {
                CPELeadTimeandStatus objCPELeadtime = new CPELeadTimeandStatus();
                objCPELeadtime.transactionType = "Cease";
                objCPELeadtime.CPELeadTime = CPECeaseLeadTime;
                objCPELeadtime.CPELeadTimeStatus = CPECeaseLeadTimeStatus;
                objCPELeadtime.suppliername = supplier;
                lst.Add(objCPELeadtime);

            }
        }


        public string ValidServiceCenterCaseId(int countryID, int cityID)
        {
            return objDispCPEProductDAL.ValidServiceCenterCaseId(countryID, cityID);
        }
    }
}
