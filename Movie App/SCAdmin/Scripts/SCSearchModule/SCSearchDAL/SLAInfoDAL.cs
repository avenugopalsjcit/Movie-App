using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Data;

namespace SCSearchDAL
{
    public class SLAInfoDAL
    {
        private StringBuilder strQuery = new StringBuilder();
        private GetDataFromDB objGetDataFromDB = new GetDataFromDB();


        public DataTable getSLAInfo(string AccSuppCharID, string AccSuppNameId, int countryID,
            int supplier_access_type)
        {
            strQuery.Clear();
            strQuery.Append(" select * from CSU_SUPPLIER_PRODUCT_SLA ");
            strQuery.Append(" where upper(trim(supplierid)) = " + AccSuppCharID);
            //strQuery.Append(" (select a.c_supplier_id from CAPMAN_SUPPLIER_MAP a, csu_ref_valid_char b ");
            //strQuery.Append(" where a.pc_supplier_id = b.char_id ");
            //strQuery.Append(" and a.pc_supplier_id = " + AccSuppCharID + ")");

            strQuery.Append(" and trim(supplierproductid)= " + AccSuppNameId);
            //strQuery.Append(" (SELECT a.C_ACCESS_SUPPLIER_NAME_ID");
            //strQuery.Append(" FROM CAPMAN_SUPPLIER_PROD_NAME_MAP a,");
            //strQuery.Append(" csu_ref_valid_char b");
            //strQuery.Append(" WHERE a.PC_ACCESS_SUPPLIER_NAME_ID = b.char_id");
            //strQuery.Append(" AND a.PC_ACCESS_SUPPLIER_NAME_ID   = " + AccSuppNameId);
            //strQuery.Append(" AND a.PC_COUNTRY_ID= " + countryIDSLA + ")");

            strQuery.Append(" and upper(trim(countryid))  =  " + countryID);
            strQuery.Append(" and upper(trim(supplieraccesstype_id))=" + supplier_access_type);
            //strQuery.Append(" (SELECT a.c_access_type_id");
            //strQuery.Append(" FROM capman_access_type_map a,");
            //strQuery.Append(" csu_ref_valid_char b");
            //strQuery.Append(" WHERE a.pc_access_type_id = b.char_id");
            //strQuery.Append(" AND a.pc_access_type_id   = " + supplier_access_type + ")");
            return objGetDataFromDB.GetDataTable(strQuery.ToString());
        }

        public DataTable getContractLeadTiem(string AccSuppCharID, string AccSuppNameId, int countryID,
            int supplier_access_type, int pspeed,string isDSL,string PortTypeID)
        {
            strQuery.Clear();
            strQuery.Append("SELECT DISTINCT speedsortorder,zone_countryid, zone_countryname, a.supplierproductid, ");
            strQuery.Append(" a.supplierproductname, sd_order_confirmation, ");
            strQuery.Append(" sd_order_confirmation_dayid, sd_order_confirmation_day_name, ");
            strQuery.Append(" sd_contracted_leadtime, sd_contracted_leadtime_dayid, ");
            strQuery.Append(" sd_contracted_leadtime_dayname, sd_contr_leadtime_statusid, ");
            strQuery.Append(" sd_contr_leadtime_status_name, sd_bt_accept_period, ");
            strQuery.Append(" sd_bt_accept_period_dayid, sd_bt_accept_period_day_name, ");
            strQuery.Append(" sd_fast_track_delivery, sd_fast_track_delivery_dayid, ");
            strQuery.Append(" sd_fast_track_delivery_dayname, sd_fast_track_terms, ");
            strQuery.Append(" sa_fault_response, sa_fault_response_uom_id, ");
            strQuery.Append(" sa_fault_response_uom_name, sa_fault_repair, ");
            strQuery.Append(" sa_fault_repair_time_uom_id, sa_fault_repair_time_uom_name, ");
            strQuery.Append(" sa_access_availability, sa_access_availability_id, ");
            strQuery.Append(" sa_access_availability_name, speedname ");
            strQuery.Append(" ,SD_ORDER_ACCEPTANCE_NAME, SD_ORDER_ACCEPTANCE ");
            strQuery.Append(" ,SA_FAULT_RESPONSE_S2, SA_FAULT_RESPONSE_S2_UOM_NAME ");
            strQuery.Append(" ,SA_FAULT_REPAIR_S2, SA_FAULT_REPAIR_S2_UOM_NAME,speed ");
            strQuery.Append(" ,SD_CEASE_LEAD_TIME,SD_CEASE_LEAD_TIME_DAYID,SD_CEASE_LEAD_TIME_DAY_NAME");
            strQuery.Append(" FROM csu_zone_product_sla a, ");
            strQuery.Append(" v_pc_porttype b, ");
            strQuery.Append(" csu_supplier_product_sla c ");
            strQuery.Append(" WHERE c.supplierproductid =  " + AccSuppNameId);

            //strQuery.Append(" (SELECT a.C_ACCESS_SUPPLIER_NAME_ID");
            //strQuery.Append(" FROM CAPMAN_SUPPLIER_PROD_NAME_MAP a,");
            //strQuery.Append(" csu_ref_valid_char b");
            //strQuery.Append(" WHERE a.PC_ACCESS_SUPPLIER_NAME_ID = b.char_id");
            //strQuery.Append(" AND a.PC_ACCESS_SUPPLIER_NAME_ID   = " + AccSuppNameId);
            //strQuery.Append(" AND a.PC_COUNTRY_ID= " + countryID + ")");


            strQuery.Append(" AND c.countryid = " + countryID);
            strQuery.Append(" AND a.supplierproductid = c.supplierproductid ");
            strQuery.Append(" AND a.zone_countryid = c.countryid ");
            strQuery.Append(" AND c.supplierid =" + AccSuppCharID);

            //strQuery.Append(" (select a.c_supplier_id from CAPMAN_SUPPLIER_MAP a, csu_ref_valid_char b ");
            //strQuery.Append(" where a.pc_supplier_id = b.char_id ");
            //strQuery.Append(" and a.pc_supplier_id = " + AccSuppCharID + ")");
            strQuery.Append(" AND a.porttypeid = b.porttypeid ");
            strQuery.Append(" AND c.supplieraccesstype_id = " + supplier_access_type);
            //strQuery.Append(" (SELECT a.c_access_type_id");
            //strQuery.Append(" FROM capman_access_type_map a,");
            //strQuery.Append(" csu_ref_valid_char b");
            //strQuery.Append(" WHERE a.pc_access_type_id = b.char_id");
            //strQuery.Append(" AND a.pc_access_type_id   = " + supplier_access_type + ")");
            //strQuery.Append(" AND a.porttypeid = b.porttypeid ");
            //strQuery.Append(ueryString("DSL") <> "Y" Then

            if (pspeed != -1)
            {
                strQuery.Append(" AND b.speedid in ");
                strQuery.Append("(select a.c_speed_id from capman_access_speed_map a, csu_ref_valid_char b ");
                strQuery.Append(" where a.PC_SPEED_ID = b.char_id ");
                strQuery.Append(" AND a.PC_SPEED_ID = " + pspeed + ")");
            }

            if (isDSL == "Y")
            {
                strQuery.Append(" AND a.porttypeid = " + PortTypeID);
            }

            //else
            //   strQuery.Append("AND a.porttypeid = " & c_porttype
            //End If

            strQuery.Append(" ORDER BY speedsortorder ");

            return objGetDataFromDB.GetDataTable(strQuery.ToString());

        }

        public string getCAPMANCountry(int SLACountryId)
        {
            strQuery.Clear();
            strQuery.Append("select c_country_id from capman_country_map where pc_country_id = " + SLACountryId);
            return objGetDataFromDB.GetSingleRowFromDB(strQuery.ToString());
        }

        public string getCAPMANSupplierID(string SLASupplier)
        {
            strQuery.Clear();
            strQuery.Append("select a.c_supplier_id from CAPMAN_SUPPLIER_MAP a, csu_ref_valid_char b ");
            strQuery.Append(" where a.pc_supplier_id = b.char_id ");
            strQuery.Append(" and a.pc_supplier_id = " + SLASupplier);
            return objGetDataFromDB.GetSingleRowFromDB(strQuery.ToString());
        }

        public string getCAPMANProductID(string productSLA, int countrySLA)
        {
            strQuery.Clear();
            strQuery.Append("SELECT a.C_ACCESS_SUPPLIER_NAME_ID");
            strQuery.Append(" FROM CAPMAN_SUPPLIER_PROD_NAME_MAP a,");
            strQuery.Append(" csu_ref_valid_char b");
            strQuery.Append(" WHERE a.PC_ACCESS_SUPPLIER_NAME_ID = b.char_id");
            strQuery.Append(" AND a.PC_ACCESS_SUPPLIER_NAME_ID   = " + productSLA);
            strQuery.Append(" AND a.PC_COUNTRY_ID= " + countrySLA);


            return objGetDataFromDB.GetSingleRowFromDB(strQuery.ToString());

        }

        public string getCAPMANAccessTypeId(int SLAAccType)
        {
            strQuery.Clear();
            strQuery.Append("SELECT a.c_access_type_id");
            strQuery.Append(" FROM capman_access_type_map a,");
            strQuery.Append(" csu_ref_valid_char b");
            strQuery.Append(" WHERE a.pc_access_type_id = b.char_id");
            strQuery.Append(" AND a.pc_access_type_id   = " + SLAAccType);

            return objGetDataFromDB.GetSingleRowFromDB(strQuery.ToString());
        }

        public string getCapMANDSLPortType(string selectedPortTypeID)
        {
            strQuery.Clear();
            strQuery.Append(" select a.C_PORTTYPE_ID, b.char_name as porttype_name from CAPMAN_DSL_PORTTYPE_MAP a, csu_ref_valid_char b ");
            strQuery.Append(" where a.PC_PORTTYPE_ID = b.char_id ");
            strQuery.Append("  and a.PC_PORTTYPE_ID = " + selectedPortTypeID);

            return objGetDataFromDB.GetSingleRowFromDB(strQuery.ToString());
        }


        public DataTable getSLACountry(string Supplier)
        {
            strQuery.Clear();
            strQuery.Append("select distinct countryid, countryname");
            strQuery.Append(" from csu_supplier_product_sla");
            if (!string.IsNullOrEmpty(Supplier))
            {
                strQuery.Append(" where supplierid=" + Supplier);
            }

            strQuery.Append(" order by countryname");
            return objGetDataFromDB.GetDataTable(strQuery.ToString());
        }

        public DataTable getSLAAccSupplier(string country)
        {
            strQuery.Clear();
            strQuery.Append("select distinct supplierid, suppliername");
            strQuery.Append(" from csu_supplier_product_sla");
            if (!string.IsNullOrEmpty(country))
                strQuery.Append(" where countryid =" + country);

            strQuery.Append(" order by suppliername");

            return objGetDataFromDB.GetDataTable(strQuery.ToString());
        }

        public DataTable getSLAAccessType(string countryId, string AccSupp, string suppProdId)
        {
            strQuery.Clear();
            strQuery.Append("select distinct SUPPLIERACCESSTYPE_ID,SUPPLIERACCESSTYPE_NAME");
            strQuery.Append(" from csu_supplier_product_sla");
            if (!string.IsNullOrEmpty(countryId))
                strQuery.Append(" where countryid =" + countryId);

            if (!string.IsNullOrEmpty(AccSupp))
                strQuery.Append(" and supplierid = " + AccSupp);

            if (!string.IsNullOrEmpty(suppProdId))
                strQuery.Append(" and SUPPLIERPRODUCTID =" + suppProdId);

            strQuery.Append(" order by SUPPLIERACCESSTYPE_NAME");
            return objGetDataFromDB.GetDataTable(strQuery.ToString());
        }




        public DataTable getSLASuppProd(string countryID, string AccSuppId, string AccType)
        {
            strQuery.Clear();
            strQuery.Append("select distinct SUPPLIERPRODUCTID,SUPPLIERPRODUCTNAME");
            if (!string.IsNullOrEmpty(countryID))
                strQuery.Append(" from csu_supplier_product_sla where countryid =" + countryID);

            if (!string.IsNullOrEmpty(AccSuppId))
                strQuery.Append(" and supplierid=" + AccSuppId);

            if (!string.IsNullOrEmpty(AccType))
                strQuery.Append(" and SUPPLIERACCESSTYPE_ID=" + AccType);

            strQuery.Append(" order by SUPPLIERPRODUCTNAME");
            return objGetDataFromDB.GetDataTable(strQuery.ToString());
        }

        public DataTable getDSLPackageDetails(int selectedSupplier, int selectedPackage, int selectedSLA)
        {
            strQuery.Clear();
            strQuery.Append(" select vcp.CHAR_NAME as pkg_name, vcs.CHAR_NAME as sup_name, vcsp.CHAR_NAME as spu_prod_name");
            strQuery.Append(" from CLA_PRODUCT_PACKAGES pkg, CSU_REF_VALID_CHAR vcp, CLA_PRODUCT_PORT_TYPES pt, CSU_REF_VALID_CHAR vcs, ");
            strQuery.Append(" CSU_REF_VALID_CHAR vcsp ");
            strQuery.Append("where pkg.PACKAGE_ID = vcp.char_id ");
            strQuery.Append("and pt.ACCESS_SUPPLIER_CHAR_ID = vcs.char_id ");
            strQuery.Append("and pt.ACCESS_SUPPLIER_NAME_ID = vcsp.char_id ");
            strQuery.Append("and pt.ACCESS_SUPPLIER_CHAR_ID = " + selectedSupplier);
            strQuery.Append("and pkg.PACKAGE_ID = " + selectedPackage);
            strQuery.Append("and pt.ACCESS_SUPPLIER_NAME_ID = " + selectedSLA);

            return objGetDataFromDB.GetDataTable(strQuery.ToString());
        }

        public DataTable getDSLDetails(int accSuppProdID, int selectedCountry,int selectedPackage)
        {
            strQuery.Clear();
            strQuery.Append(" select xdsl.ACCESS_MODEL_NAME,xdsl.ACCESS_PROVIDER_NAME, ");
            strQuery.Append(" xdsl.ce_vpi, xdsl.ce_vci,xdsl.ENCAPSULATION_NAME,xdsl.INTERCONNECT_DESIGN_NAME, ");
            strQuery.Append(" xdsl.dsl_supply_type_name, xdsl.splitter_included_isdn,xdsl.LOCAL_LOOP_TYPE_NAME, ");
            strQuery.Append(" xdsl.PRODUCT_CODE,xdsl.splitter_included_pstn,xdsl.SPLITTER_INCLUDED_ISDN ");
            strQuery.Append(" from CSU_SUPPLIER_PRODUCT_XDSL xdsl,CAPMAN_SUPPLIER_PROD_NAME_MAP spm,CAPMAN_DSL_PACKAGE_MAP dpm ");
            strQuery.Append(" where xdsl.SUPPLIERPRODUCTID = spm.C_ACCESS_SUPPLIER_NAME_ID and spm.PC_ACCESS_SUPPLIER_NAME_ID = " + accSuppProdID);
            strQuery.Append(" and spm.PC_COUNTRY_ID =" + selectedCountry + " and dpm.C_PACKAGE_ID = xdsl.DSL_PACKAGE_ID and dpm.PC_PACKAGE_ID = " + selectedPackage);

            return objGetDataFromDB.GetDataTable(strQuery.ToString());
        }
    }
}
