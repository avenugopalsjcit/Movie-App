using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using SCSearchDAL;
using System.Data;


namespace SCSearchBAL
{
    public class CPEBundleBAL
    {
        CPEInformationDAL objCPEInformationDAL = new CPEInformationDAL();
        public List<CPEBundle> GetCPEBundle(int productID, int countryID, bool isBTCPE)
        {
            List<CPEBundle> lstCPEBundle = null;
            try
            {
                DataTable dtBundle = objCPEInformationDAL.GetValidProductBundlesForCountry(productID, countryID, isBTCPE);


                CPEBundle objCPEBundle = null;
                lstCPEBundle = new List<CPEBundle>();
                foreach (DataRow dr in dtBundle.Rows)
                {
                    objCPEBundle = new CPEBundle();
                    objCPEBundle.BundleID = Convert.ToString(dr["bundleid"]);
                    objCPEBundle.BundleName = dr["bundlename"].ToString();
                    objCPEBundle.RouterName = dr["routername"].ToString();
                    //objCPEBundle.AccessTechnology = GetCountryBundleAccessType(objCPEBundle.BundleID, CountryID);
                    objCPEBundle.AccessTechnology = dr["AccessTech"].ToString();
                    objCPEBundle.ExpectedDateforOrder = dr["EXPECTED_DATE"].ToString();
                    objCPEBundle.QoutableStartDate = dr["QUOTABLEDT"].ToString();
                    objCPEBundle.EOQ = dr["EOQDT"].ToString();
                    objCPEBundle.EOL = dr["EOLDT"].ToString();
                    objCPEBundle.EOS = dr["EOSDT"].ToString();
                    if (!String.IsNullOrEmpty(dr["PARTIAL_BNDL_FLAG"].ToString()))
                    {
                        objCPEBundle.PartialBundle = char.Parse(dr["PARTIAL_BNDL_FLAG"].ToString());
                    }
                    else
                    {
                        objCPEBundle.PartialBundle = '\0';
                    }
                    objCPEBundle.SmartServiceAvailability = dr["SMARTSERVICEAVIL"].ToString();
                    lstCPEBundle.Add(objCPEBundle);
                }



            }


            catch (Exception ex) { throw ex; }


            return lstCPEBundle;
        }

        public List<CPEMaintainanceDetails> getCPEMaintainanceDetails(int ProductID, int SupplierID, int CountryID, int CityID)
        {

            if (string.IsNullOrEmpty(CountryID.ToString())) { CountryID = -1; }

            //List<CPEMaintainanceDetails> lstCPEMaintDet = obj.GetCPEMaintainanceDetails(ProductID, SupplierID, CountryID, CityID);
            DataTable dtCPEMaint = objCPEInformationDAL.GetCPEMaintainanceDetails(ProductID, SupplierID, CountryID, CityID);
            List<CPEMaintainanceDetails> lstMaintDet = new List<CPEMaintainanceDetails>();
            foreach (DataRow dr in dtCPEMaint.Rows)
            {
                CPEMaintainanceDetails objCPEMaintainanceDetails = new CPEMaintainanceDetails();
                objCPEMaintainanceDetails.SupplierName = dr["SUPPLIER_NAME"].ToString();
                objCPEMaintainanceDetails.ServiceNumber = dr["SERVICE_NUMBER"].ToString();
                objCPEMaintainanceDetails.ServiceName = dr["SERVICE_NAME"].ToString();
                objCPEMaintainanceDetails.ServiceOrder = dr["SERVICE_ORDER"].ToString();
                objCPEMaintainanceDetails.ServiceAvailabilityDesc = dr["SERVICE_AVAIL_DESC"].ToString();
                objCPEMaintainanceDetails.ServiceRestriction = dr["SERVICE_RESTRICTIONS"].ToString();
                objCPEMaintainanceDetails.smartServiceAvailability = CalculateSmartServiceAvailability(dr["SERVICE_NAME"].ToString());
                objCPEMaintainanceDetails.ManufacturerName = dr["MANUFACTURER_NAME"].ToString();
                objCPEMaintainanceDetails.MaintainerName = dr["MAINTAINER_NAME"].ToString();
                lstMaintDet.Add(objCPEMaintainanceDetails);
            }

            return lstMaintDet;
        }

        public string CalculateSmartServiceAvailability(string serviceName)
        {
            if (int.Parse(serviceName.Split(new string[] { "Option" }, StringSplitOptions.None)[1]) >= 11 &&
                (int.Parse(serviceName.Split(new string[] { "Option" }, StringSplitOptions.None)[1]) <= 17))
            {
                return "Available";
            }
            return "Not Available";
        }

        public TupleList<string, string> GetSupplierCity(int CountryID, int CityID, int supplierID)
        {


            var cityList = new TupleList<string, string>();
            try
            {
                DataTable dtCity = objCPEInformationDAL.GetSupplierCity(CountryID, CityID, supplierID);

                foreach (DataRow dr in dtCity.Rows)
                {
                    cityList.Add(dr[0].ToString(), dr[1].ToString());
                }
            }
            catch (Exception ex) { throw ex; }

            var lstAllCities = cityList.Where(t => t.Item2.Contains("All Cities")).ToList();
            cityList.RemoveAll(t => t.Item2.Contains("All Cities"));
            cityList.InsertRange(0, lstAllCities);


            return cityList;
        }

        public List<CPESupplier> getSupplier(string countryId, string productID, string cityID)
        {
            DataTable dt = objCPEInformationDAL.GetSupplier(int.Parse(countryId), int.Parse(productID), int.Parse(cityID));
            List<CPESupplier> lsSupplier = new List<CPESupplier>();
            foreach (DataRow dr in dt.Rows)
            {
                CPESupplier objSupplier = new CPESupplier();
                objSupplier.supplierID = Convert.ToString(dr["supplierid"]);
                objSupplier.supplierName = Convert.ToString(dr["suppliername"]);
                objSupplier.supplierType = Convert.ToString(dr["suppliertype"]);
                lsSupplier.Add(objSupplier);
            }

            return lsSupplier;
        }

        public List<CPESupplier> getOnevoiceMaintSupplier(int countryID)
        {
            DataTable dtSupp = objCPEInformationDAL.GetOneVoiceSupplier(countryID);
            List<CPESupplier> lsSupplier = new List<CPESupplier>();
            foreach (DataRow dr in dtSupp.Rows)
            {
                CPESupplier objSupplier = new CPESupplier();
                objSupplier.supplierID = Convert.ToString(dr["supplier"]);
                objSupplier.supplierName = Convert.ToString(dr["supp_name"]);
                lsSupplier.Add(objSupplier);
            }
            return lsSupplier;
        }

        public List<CPESupplier> getMaintSupplier(int countryID, int hasAccSupp)
        {
            CPESupplier objCPESupp = new CPESupplier();
            objCPESupp.supplierID = string.Empty;
            objCPESupp.supplierName = string.Empty;
            List<CPESupplier> lst = new List<CPESupplier>();
            DataTable dtSupp = objCPEInformationDAL.getMaintSupplier(countryID);
            string tempSupp = string.Empty;
            string selectedSupp = string.Empty;

            foreach (DataRow dr in dtSupp.Rows)
            {
                tempSupp = Convert.ToString(dr[0]);

                if (hasAccSupp == 1)
                {
                    selectedSupp = Convert.ToString(dr[0]);
                    objCPESupp.supplierID = selectedSupp; objCPESupp.supplierName = Convert.ToString(dr[1]);
                    break;
                }

                //if supplier is Unisys(5847) or Cisco-MCPE(113261) then that has to be selected else the other one

                if (tempSupp == "113261") { objCPESupp.supplierID = tempSupp; objCPESupp.supplierName = Convert.ToString(dr[1]); break; }
                else if (tempSupp == "5847") { objCPESupp.supplierID = tempSupp; objCPESupp.supplierName = Convert.ToString(dr[1]); break; }
                else { objCPESupp.supplierID = tempSupp; objCPESupp.supplierName = Convert.ToString(dr[1]); }

            }

            lst.Add(objCPESupp);
            return lst;
        }

        public TupleList<string, string> getProductCharecteristics(int caseID)
        {
            DataTable dtProdChar = objCPEInformationDAL.getProductCharecteristics(caseID);
            var prodCharList = new TupleList<string, string>();
            try
            {
                foreach (DataRow dr in dtProdChar.Rows)
                {
                    prodCharList.Add(Convert.ToString(dr["Char_Name"]), Convert.ToString(dr["char_type_alias"]));
                }
            }
            catch (Exception ex) { throw ex; }

            return prodCharList;
        }

        public string getCPELaunchStatus(int countryID)
        {
            return objCPEInformationDAL.getCPELaunchStatus(countryID);
        }

        public int getCPEStatus(int productID, int CaseID)
        {
            return int.Parse(objCPEInformationDAL.getCPEStatus(productID, CaseID));
        }
    }
}
