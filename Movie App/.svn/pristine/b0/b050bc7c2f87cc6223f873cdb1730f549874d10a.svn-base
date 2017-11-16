using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using SCSearchDAL;
using System.Data;

namespace SCSearchBAL
{
    public class DispHVPNpkgBAL
    {
        public HVPNAttribute getHVPNPkgAtt(int countryID, int SuppProdID)
        {

            DispHVPNPkgDetDAL objGetDALData = new DispHVPNPkgDetDAL();
            HVPNAttribute objHVPNAttr = new HVPNAttribute();
            DataTable dt = objGetDALData.getHVPNPkgAtt(countryID, SuppProdID);

            List<HVPNAttribute> lstHVPNAttribute = new List<HVPNAttribute>();
            foreach (DataRow dr in dt.Rows)
            {
                
                objHVPNAttr.ISP_ADDRESSING = Convert.ToString(dr["ISP_ADDRESSING"]);
                objHVPNAttr.OTHER_SERVICE_NOTES = Convert.ToString(dr["OTHER_SERVICE_NOTES"]);
                objHVPNAttr.PRODUCT_CODE = Convert.ToString(dr["PRODUCT_CODE"]);
                objHVPNAttr.AGGREGATOR = Convert.ToString(dr["AGGREGATOR"]);
                objHVPNAttr.COPPER_SERVICE_ID = Convert.ToString(dr["COPPER_SERVICE_ID"]);
                objHVPNAttr.PRICING_NOTES = Convert.ToString(dr["PRICING_NOTES"]);
                objHVPNAttr.RFA_NOTES = Convert.ToString(dr["RFA_NOTES"]);
                objHVPNAttr.RFO_NOTES = Convert.ToString(dr["RFO_NOTES"]);
                objHVPNAttr.COPPER_DETAILS=Convert.ToString(dr["COPPER_DETAILS"]);

            }
            return objHVPNAttr;
        }

        public List<CPEDetails> getCPEDetails()
        {
            List<CPEDetails> lstCPEDetails = new List<CPEDetails>();
            DispHVPNPkgDetDAL objGetDALData = new DispHVPNPkgDetDAL();
            DataTable dtCPEDetails = objGetDALData.getCPEDetails();

            foreach (DataRow dr in dtCPEDetails.Rows)
            {
                CPEDetails objCPEDetails = new CPEDetails();
                objCPEDetails.COUNTRY=Convert.ToString(dr["COUNTRY"]);
                objCPEDetails.CPA = Convert.ToString(dr["CPA"]);
                objCPEDetails.CPE_SUPPLIER = Convert.ToString(dr["CPE_SUPPLIER"]);
                objCPEDetails.AGGREGATOR_BAU = Convert.ToString(dr["AGGREGATOR_BAU"]).Replace(";", "; ");
                objCPEDetails.SPLIT_TUNNELING = Convert.ToString(dr["SPLIT_TUNNELING"]);

                lstCPEDetails.Add(objCPEDetails);
            }

            return lstCPEDetails;
        }

        public DataTable GetDSLPackageDetails(int ParentProductID, int CaseID, int PackageID, int ParentCaseID)
        {
            
            DispHVPNPkgDetDAL objGetDALData = new DispHVPNPkgDetDAL();
            return objGetDALData.GetDSLPackageDetails(ParentProductID, CaseID, PackageID, ParentCaseID);

        }

        public DataTable GetDSLCountryDetails(int CaseID, int PackageID, int ParentCaseID, int ParentPackageID)
        {
            DispHVPNPkgDetDAL objGetDALData = new DispHVPNPkgDetDAL();
            return objGetDALData.GetDSLCountryDetails(CaseID, PackageID, ParentCaseID, ParentPackageID);
        }

        public DataTable GetCPEAvailMatrixRules(int ProductID)
        {
            DispHVPNPkgDetDAL objDAL = new DispHVPNPkgDetDAL();
            return objDAL.GetAvailMatrixRule(ProductID);
        }

        public DataTable GetChildAndParentLevelData(int IsDSL, int ProductID, int ParentId, int CaseID, int PkgId1, int PCaseID)
        {
            DispHVPNPkgDetDAL objDAL = new DispHVPNPkgDetDAL();
            return objDAL.GetChildAndParentLevelData(IsDSL, ProductID, ParentId, CaseID, PkgId1, PCaseID);
        }

        public DataTable GetPTCPkgDetails(int IsDSL, int Caseid, int PTCPkgid)
        {
            DispHVPNPkgDetDAL objDAL = new DispHVPNPkgDetDAL();
            return objDAL.GetPTCPkgDetails(IsDSL, Caseid, PTCPkgid);
        }

        public DataTable GetParentLevelData(int IsDSL, int ParentId, int CaseID, int PkgId1, int PCaseID)
        {
            DispHVPNPkgDetDAL objDAL = new DispHVPNPkgDetDAL();
            return objDAL.GetParentLevelData(IsDSL, ParentId, CaseID, PkgId1, PCaseID);

        }

        public DataTable GetPTCPkgInfo(int IsDSL, int PCaseid, int PPkgId, int Caseid)
        {
            DispHVPNPkgDetDAL objDAL = new DispHVPNPkgDetDAL();
            return objDAL.GetPTCPkgInfo(IsDSL, PCaseid, PPkgId, Caseid);

        }

    }
}
