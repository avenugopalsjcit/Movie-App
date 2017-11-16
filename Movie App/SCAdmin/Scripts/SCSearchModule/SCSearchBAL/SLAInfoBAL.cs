using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Data;
using SCSearchDAL;

namespace SCSearchBAL
{
    public class SLAInfoBAL
    {
        SLAInfoDAL objSLAInfoDAL = new SLAInfoDAL();
        public SLAInformations getSLAInfo(string AccSuppCharID, string AccSuppNameId, int countryID, int supplier_access_type,
            int pspeed, string Home, string isDSL, string SLAPortTypeID)
        {
            string suppID = "";
            string suppProdID = "";

            int capmanCountryID;
            string capmanSupplierId;
            string capmanProductID;
            int capmanAccessType;
            string capManPortType = "";

            if (Home == "1")
            {
                capmanCountryID = countryID;
                capmanSupplierId = AccSuppCharID;
                capmanProductID = AccSuppNameId;
                capmanAccessType = supplier_access_type;
            }
            else
            {


                capmanCountryID = int.Parse(objSLAInfoDAL.getCAPMANCountry(countryID));
                capmanSupplierId = objSLAInfoDAL.getCAPMANSupplierID(AccSuppCharID);
                capmanProductID = objSLAInfoDAL.getCAPMANProductID(AccSuppNameId, countryID);
                capmanAccessType = int.Parse(objSLAInfoDAL.getCAPMANAccessTypeId(supplier_access_type));

                if (isDSL == "Y")
                {
                    capManPortType = objSLAInfoDAL.getCapMANDSLPortType(SLAPortTypeID);

                }
            }
            DataTable dtSLAInfo = objSLAInfoDAL.getSLAInfo(capmanSupplierId, capmanProductID,
                capmanCountryID, capmanAccessType);

            SLAInformations objSLAInformation = new SLAInformations();
            objSLAInformation.objSLAInfo = new SLAInfo();
            objSLAInformation.objContLeadTime = new List<ContLeadTime>();

            foreach (DataRow dr in dtSLAInfo.Rows)
            {

                objSLAInformation.objSLAInfo.QuoteValPeriod = Convert.ToString(dr["SD_QUOTE_VALIDITY_PERIOD"]) + " " + Convert.ToString(dr["SD_QUOTE_VALID_PERIOD_DAY_NAME"]);
                if (!filterLeadTime(objSLAInformation.objSLAInfo.QuoteValPeriod)) { objSLAInformation.objSLAInfo.QuoteValPeriod = string.Empty; }



                objSLAInformation.objSLAInfo.AckReceipt = Convert.ToString(dr["SD_ACK_RECEIPT_ORDER"]) + " " + Convert.ToString(dr["SD_ACK_RECEIPT_ORDER_DAY_NAME"]);
                if (!filterLeadTime(objSLAInformation.objSLAInfo.AckReceipt)) { objSLAInformation.objSLAInfo.AckReceipt = string.Empty; }
                objSLAInformation.objSLAInfo.ServiceCredits = Convert.ToString(dr["SD_SERVICE_CREDITS"]);
                objSLAInformation.objSLAInfo.MinContractTerm = Convert.ToString(dr["SD_MINIMUM_CONTRACT_TERM_NAME"]);
                objSLAInformation.objSLAInfo.CanPreinstall = Convert.ToString(dr["SD_CANCEL_PRE_INSTALL"]);
                objSLAInformation.objSLAInfo.CanDurConTerm = Convert.ToString(dr["SD_CANCEL_DURING_CONTRACT_TERM"]);
                objSLAInformation.objSLAInfo.CircuitHandoverTestCrit = Convert.ToString(dr["SD_CIRCUIT_HANDOVER_TEST_CRIT"]);
                objSLAInformation.objSLAInfo.SpecialNotice = Convert.ToString(dr["SD_SPECIAL_NOTICE"]);

                objSLAInformation.objSLAInfo.str247FaultReception = Convert.ToString(dr["SA_FAULT_RECEPTION247_NAME"]);
                objSLAInformation.objSLAInfo.str247FaultReceptionName = Convert.ToString(dr["SA_FAULT_RECEPTION_TIME_NAME"]);
                objSLAInformation.objSLAInfo.str247FaultRepair = Convert.ToString(dr["FAULTREPAIR_24X7_NAME"]);
                objSLAInformation.objSLAInfo.str247FaultRepairName = Convert.ToString(dr["SA_FAULT_REPAIR_TIME_NAME"]);
                objSLAInformation.objSLAInfo.strTroubleTicket = Convert.ToString(dr["SA_TROUBLE_TICKET"]);
                objSLAInformation.objSLAInfo.strMaintenanceWindow = Convert.ToString(dr["SA_MAINTENANCE_WINDOW"]);
                objSLAInformation.objSLAInfo.strPlanWorkNotice = Convert.ToString(dr["SA_PLANNED_WORKS_NOTICE"]);
                objSLAInformation.objSLAInfo.strServiceCreditsSA = Convert.ToString(dr["SA_SERVICE_CREDITS_REPAIR"]);
                objSLAInformation.objSLAInfo.strSpecialNoticeSA = Convert.ToString(dr["SA_SPECIAL_NOTICE"]);

                //if (objSLAInformation.objSLAInfo.str247FaultReception.ToUpper() == "INCLUDED")
                //{
                //    objSLAInformation.objSLAInfo.str247FaultReceptionName = string.Empty;
                //}

                //if (objSLAInformation.objSLAInfo.str247FaultRepair.ToUpper() == "INCLUDED")
                //{
                //    objSLAInformation.objSLAInfo.str247FaultRepairName = string.Empty;
                //}

                if (objSLAInformation.objSLAInfo.str247FaultReception.ToUpper() == objSLAInformation.objSLAInfo.str247FaultReceptionName.ToUpper())
                {
                    objSLAInformation.objSLAInfo.str247FaultReceptionName = string.Empty;
                }

                if (objSLAInformation.objSLAInfo.str247FaultRepair.ToUpper() == objSLAInformation.objSLAInfo.str247FaultRepairName.ToUpper())
                {
                    objSLAInformation.objSLAInfo.str247FaultRepairName = string.Empty;
                }






            }

            DataTable dtContLeadTime = objSLAInfoDAL.getContractLeadTiem(capmanSupplierId, capmanProductID,
                capmanCountryID, capmanAccessType, pspeed, isDSL, capManPortType);

            foreach (DataRow dr in dtContLeadTime.Rows)
            {

                ContLeadTime objContLeadTime = new ContLeadTime();
                objContLeadTime.AccSpeed = Convert.ToString(dr["speedname"]);

                objContLeadTime.OrdAccep = Convert.ToString(dr["SD_ORDER_ACCEPTANCE"]) + " " + Convert.ToString(dr["SD_ORDER_ACCEPTANCE_NAME"]);
                if (!filterLeadTime(objContLeadTime.OrdAccep)) { objContLeadTime.OrdAccep = string.Empty; }


                objContLeadTime.OrdConfirmation = Convert.ToString(dr["SD_ORDER_CONFIRMATION"]) + " " + Convert.ToString(dr["SD_ORDER_CONFIRMATION_DAY_NAME"]);
                if (!filterLeadTime(objContLeadTime.OrdConfirmation)) { objContLeadTime.OrdConfirmation = string.Empty; }

                objContLeadTime.ContractLeadTime = Convert.ToString(dr["SD_CONTRACTED_LEADTIME"]) + " " + Convert.ToString(dr["SD_CONTRACTED_LEADTIME_DAYNAME"]);
                if (!filterLeadTime(objContLeadTime.ContractLeadTime)) { objContLeadTime.ContractLeadTime = string.Empty; }
                else
                    objContLeadTime.ContractLeadTime = Convert.ToString(dr["SD_CONTRACTED_LEADTIME"]) + " " + Convert.ToString(dr["SD_CONTRACTED_LEADTIME_DAYNAME"]) + " "
                        + Convert.ToString(dr["SD_CONTR_LEADTIME_STATUS_NAME"]);

                objContLeadTime.BTCircuitAccep = Convert.ToString(dr["SD_BT_ACCEPT_PERIOD"]) + " " + Convert.ToString(dr["SD_BT_ACCEPT_PERIOD_DAY_NAME"]);
                if (!filterLeadTime(objContLeadTime.BTCircuitAccep)) { objContLeadTime.BTCircuitAccep = string.Empty; }

                objContLeadTime.ExpedieDelivery = Convert.ToString(dr["SD_FAST_TRACK_DELIVERY"]) + " " + Convert.ToString(dr["SD_FAST_TRACK_DELIVERY_DAYNAME"]);
                if (!filterLeadTime(objContLeadTime.ExpedieDelivery)) { objContLeadTime.ExpedieDelivery = string.Empty; }

                objContLeadTime.ExpedieDeliveryTerm = Convert.ToString(dr["SD_FAST_TRACK_TERMS"]);

                string AccCeaseLeadTime = Convert.ToString(dr["SD_CEASE_LEAD_TIME"]);



                string strCeaseDayName = Convert.ToString(dr["SD_CEASE_LEAD_TIME_DAY_NAME"]);
                int tempCease = 0;
                if (strCeaseDayName.ToUpper().IndexOf("BUS DAYS") != -1)
                {
                    if (!string.IsNullOrEmpty(AccCeaseLeadTime))
                    {
                        tempCease = int.Parse(AccCeaseLeadTime) / 5;
                        AccCeaseLeadTime = (tempCease * 2 + int.Parse(AccCeaseLeadTime)).ToString();
                    }
                    strCeaseDayName = "Cal days";
                }

                
                    objContLeadTime.AccCeaseLeadTime = AccCeaseLeadTime + " " + strCeaseDayName;
                    if (!filterLeadTime(objContLeadTime.AccCeaseLeadTime)) { objContLeadTime.AccCeaseLeadTime = string.Empty; }

                objContLeadTime.AccessLineAvail = Convert.ToString(dr["SA_ACCESS_AVAILABILITY"]) + "% " + Convert.ToString(dr["SA_ACCESS_AVAILABILITY_NAME"]);
                if (string.IsNullOrEmpty(Convert.ToString(dr["SA_ACCESS_AVAILABILITY"]))) { objContLeadTime.AccessLineAvail = string.Empty; }
                if (!filterLeadTime(objContLeadTime.AccessLineAvail)) { objContLeadTime.AccessLineAvail = string.Empty; }



                objContLeadTime.FaultRespSeverity1 = Convert.ToString(dr["SA_FAULT_RESPONSE"]) + " " + Convert.ToString(dr["SA_FAULT_RESPONSE_UOM_NAME"]);
                if (!filterLeadTime(objContLeadTime.FaultRespSeverity1)) { objContLeadTime.FaultRespSeverity1 = string.Empty; }


                objContLeadTime.FaultRepairSeverity1 = Convert.ToString(dr["SA_FAULT_REPAIR"]) + " " + Convert.ToString(dr["SA_FAULT_REPAIR_TIME_UOM_NAME"]);
                if (!filterLeadTime(objContLeadTime.FaultRepairSeverity1)) { objContLeadTime.FaultRepairSeverity1 = string.Empty; }

                objContLeadTime.FaultRespSeverity2 = Convert.ToString(dr["SA_FAULT_RESPONSE_S2"]) + " " + Convert.ToString(dr["SA_FAULT_RESPONSE_S2_UOM_NAME"]);
                if (!filterLeadTime(objContLeadTime.FaultRespSeverity2)) { objContLeadTime.FaultRespSeverity2 = string.Empty; }

                objContLeadTime.FaultRepairSeverity2 = Convert.ToString(dr["SA_FAULT_REPAIR_S2"]) + " " + Convert.ToString(dr["SA_FAULT_REPAIR_S2_UOM_NAME"]);
                if (!filterLeadTime(objContLeadTime.FaultRepairSeverity2)) { objContLeadTime.FaultRepairSeverity2 = string.Empty; }

                objSLAInformation.objContLeadTime.Add(objContLeadTime);

                //objSLAInformation.objContLeadTime.OrdAccep = Convert.ToString(dr["SD_ORDER_ACCEPTANCE"]) + " " + Convert.ToString(dr["SD_ORDER_ACCEPTANCE_NAME"]);
                //objSLAInformation.objContLeadTime.OrdConfirmation = Convert.ToString(dr["SD_ORDER_CONFIRMATION"]) + " " + Convert.ToString(dr["SD_ORDER_ACCEPTANCE_NAME"]);
                //objSLAInformation.objContLeadTime.ContractLeadTime = Convert.ToString(dr["SD_CONTRACTED_LEADTIME"]) + " " + Convert.ToString(dr["SD_CONTRACTED_LEADTIME_DAYNAME"]) + " "
                //    + Convert.ToString(dr["SD_CONTR_LEADTIME_STATUS_NAME"]);

                //objSLAInformation.objContLeadTime.BTCircuitAccep = Convert.ToString(dr["SD_BT_ACCEPT_PERIOD"]) + " " + Convert.ToString(dr["SD_BT_ACCEPT_PERIOD_DAY_NAME"]);
                //objSLAInformation.objContLeadTime.ExpedieDelivery = Convert.ToString(dr["SD_FAST_TRACK_DELIVERY"]) + " " + Convert.ToString(dr["SD_FAST_TRACK_DELIVERY_DAYNAME"]);
                //string AccCeaseLeadTime = Convert.ToString(dr["SD_CEASE_LEAD_TIME"]);

                //string strCeaseDayName=Convert.ToString(dr["SD_CEASE_LEAD_TIME_DAY_NAME"]);
                //int tempCease=0;
                //if (strCeaseDayName.ToUpper().IndexOf("BUS DAYS") != -1)
                //{ 
                //    tempCease= int.Parse(AccCeaseLeadTime)/5;
                //    AccCeaseLeadTime = (tempCease * 2 + int.Parse(AccCeaseLeadTime)).ToString();
                //    strCeaseDayName = "Cal days";
                //}

                //objSLAInformation.objContLeadTime.AccCeaseLeadTime = AccCeaseLeadTime + " " + strCeaseDayName;




            }

            return objSLAInformation;

        }

        private bool filterLeadTime(string text)
        {
            bool showText = true;
            switch (text.ToUpper())
            {
                case " BUS DAYS": showText = false;
                    break;
                case " CAL DAYS": showText = false;
                    break;
                case " N/A": showText = false;
                    break;
                case " HOURS": showText = false;
                    break;
                case " MINUTES": showText = false;
                    break;
                case " ANNUALLY": showText = false;
                    break;
                case " MONTHLY": showText = false;
                    break;
                case "% ": showText = false;
                    break;
                case "% ANNUALLY": showText = false;
                    break;
                case "% MONTHLY": showText = false;
                    break;
                case "": showText = false;
                    break;
                case null: showText = false;
                    break;
            }
            return showText;
        }

        //public ContLeadTime getContLeadTime(string AccSuppCharID, string AccSuppNameId, int countryID, int supplier_access_type, int pspeed)
        //{
        //    ContLeadTime objContLeadTime = new ContLeadTime();

        //    DataTable dtContLeadTime = objSLAInfoDAL.getContractLeadTiem(AccSuppCharID, AccSuppNameId, countryID, supplier_access_type, pspeed);

        //    foreach (DataRow dr in dtContLeadTime.Rows)
        //    {
        //        objContLeadTime.OrdAccep = Convert.ToString(dr["SD_ORDER_ACCEPTANCE"]) + " " + Convert.ToString(dr["SD_ORDER_ACCEPTANCE_NAME"]);
        //        objContLeadTime.OrdConfirmation = Convert.ToString(dr["SD_ORDER_CONFIRMATION"]) + " " + Convert.ToString(dr["SD_ORDER_ACCEPTANCE_NAME"]);
        //        objContLeadTime.ContractLeadTime = Convert.ToString(dr["SD_CONTRACTED_LEADTIME"]) + " " + Convert.ToString(dr["SD_CONTRACTED_LEADTIME_DAYNAME"]) + " "
        //            + Convert.ToString(dr["SD_CONTR_LEADTIME_STATUS_NAME"]);

        //        objContLeadTime.BTCircuitAccep = Convert.ToString(dr["SD_BT_ACCEPT_PERIOD"]) + " " + Convert.ToString(dr["SD_BT_ACCEPT_PERIOD_DAY_NAME"]);
        //        objContLeadTime.ExpedieDelivery = Convert.ToString(dr["SD_FAST_TRACK_DELIVERY"]) + " " + Convert.ToString(dr["SD_FAST_TRACK_DELIVERY_DAYNAME"]);
        //    }
        //    return objContLeadTime;
        //}


        public List<InitalSearchData> getAccTypeSuppProduct(int countryID, int AccSuppId)
        {
            DataTable dtAcctypeSuppProd = null;//objSLAInfoDAL.getAccessTypeSuppProd(countryID, AccSuppId);
            List<InitalSearchData> lsinitSearchData = new List<InitalSearchData>();
            foreach (DataRow dr in dtAcctypeSuppProd.Rows)
            {
                InitalSearchData objInitSearchData = new InitalSearchData();
                objInitSearchData.acctypeId = Convert.ToString(dr["SUPPLIERACCESSTYPE_ID"]);
                objInitSearchData.acctypeName = Convert.ToString(dr["SUPPLIERACCESSTYPE_NAME"]);
                objInitSearchData.AccSuppProdId = Convert.ToString(dr["SUPPLIERPRODUCTID"]);
                objInitSearchData.AccSuppProdName = Convert.ToString(dr["SUPPLIERPRODUCTNAME"]);

                lsinitSearchData.Add(objInitSearchData);
            }
            return lsinitSearchData;
        }

        public List<SLACountry> getSLACountry(string AccSupplierID)
        {
            DataTable dtSALCountry = objSLAInfoDAL.getSLACountry(AccSupplierID);

            List<SLACountry> lstcountry = new List<SLACountry>();
            foreach (DataRow dr in dtSALCountry.Rows)
            {
                SLACountry objcont = new SLACountry();
                objcont.CountryId = Convert.ToString(dr["countryid"]);
                objcont.CountryName = Convert.ToString(dr["countryname"]);

                lstcountry.Add(objcont);
            }
            return lstcountry;
        }

        public List<SLAAccSupp> getSLAAccSupp(string countryID)
        {
            DataTable dtSALSupp = objSLAInfoDAL.getSLAAccSupplier(countryID);

            List<SLAAccSupp> lstSupp = new List<SLAAccSupp>();
            foreach (DataRow dr in dtSALSupp.Rows)
            {
                SLAAccSupp objsupp = new SLAAccSupp();
                objsupp.supplierId = Convert.ToString(dr["supplierid"]);
                objsupp.supplierName = Convert.ToString(dr["suppliername"]);
                lstSupp.Add(objsupp);
            }
            return lstSupp;
        }

        public List<SLAAccType> getSLAAccType(string countryID, string suppId, string suppProd)
        {
            DataTable dtSALAccType = objSLAInfoDAL.getSLAAccessType(countryID, suppId, suppProd);

            List<SLAAccType> lstAcctype = new List<SLAAccType>();
            foreach (DataRow dr in dtSALAccType.Rows)
            {
                SLAAccType objAcctype = new SLAAccType();
                objAcctype.acctypeId = Convert.ToString(dr["SUPPLIERACCESSTYPE_ID"]);
                objAcctype.acctypeName = Convert.ToString(dr["SUPPLIERACCESSTYPE_NAME"]);
                lstAcctype.Add(objAcctype);
            }
            return lstAcctype;
        }

        public List<SLAAccSuppProd> getSLASupprod(string countryID, string suppId, string AccType)
        {
            DataTable dtSALASuppProd = objSLAInfoDAL.getSLASuppProd(countryID, suppId, AccType);

            List<SLAAccSuppProd> lstSuppProd = new List<SLAAccSuppProd>();
            foreach (DataRow dr in dtSALASuppProd.Rows)
            {
                SLAAccSuppProd objSuppProd = new SLAAccSuppProd();
                objSuppProd.AccSuppProdId = Convert.ToString(dr["SUPPLIERPRODUCTID"]);
                objSuppProd.AccSuppProdName = Convert.ToString(dr["SUPPLIERPRODUCTNAME"]);
                lstSuppProd.Add(objSuppProd);
            }
            return lstSuppProd;
        }

        public DSLSLAInfo getDSLSLAInfo(int accSuppProdID, int selectedCountry, int selectedPackage)
        {
            DataTable dtDSL = objSLAInfoDAL.getDSLDetails(accSuppProdID, selectedCountry, selectedPackage);
            DSLSLAInfo objDSLSLAInfo = new DSLSLAInfo();
            foreach (DataRow dr in dtDSL.Rows)
            {
                objDSLSLAInfo.AccModelName = Convert.ToString(dr["ACCESS_MODEL_NAME"]);
                objDSLSLAInfo.AccProviderName = Convert.ToString(dr["access_provider_name"]);
                objDSLSLAInfo.CEVPI = Convert.ToString(dr["ce_vpi"]);
                objDSLSLAInfo.CEVCI = Convert.ToString(dr["ce_vci"]);
                objDSLSLAInfo.Encapsulation = Convert.ToString(dr["encapsulation_name"]);
                objDSLSLAInfo.InterconnectDesign = Convert.ToString(dr["INTERCONNECT_DESIGN_NAME"]);
                objDSLSLAInfo.dslSupplyTypeName = Convert.ToString(dr["dsl_supply_type_name"]);
                objDSLSLAInfo.SplitterTypeISDNIncluded = Convert.ToString(dr["splitter_included_isdn"]);
                objDSLSLAInfo.SplitterTypePSTNIncluded = Convert.ToString(dr["splitter_included_pstn"]);
                objDSLSLAInfo.LocalLoopType = Convert.ToString(dr["LOCAL_LOOP_TYPE_NAME"]);
                objDSLSLAInfo.ProductCode = Convert.ToString(dr["product_code"]);
            }
            return objDSLSLAInfo;
        }
    }
}
