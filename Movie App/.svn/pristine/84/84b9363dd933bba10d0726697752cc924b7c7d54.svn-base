using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Data;

namespace SCSearchDAL
{
    public class DispSubProductDAL
    {
        private StringBuilder strQuery = new StringBuilder();
        private GetDataFromDB objGetDataFromDB = new GetDataFromDB();

        public DataTable FetchProdCharecteristics(int localCaseID, int local_sCLLevel, int C_HUB_SITE_LEVEL, int C_PORT_SPEED)
        {
            strQuery.Clear();
            strQuery.Append("Select char_type_name,char_type_alias, Char_Name, e.Avail_desc, c.char_avail_cd, ");
            strQuery.Append(" char_value, char_value_2, char_unit_of_measure, display_order_cd,c.char_id,c.char_type_id ");
            strQuery.Append(" from csu_ref_char_type a, csu_ref_valid_char b, ");
            strQuery.Append(" csu_case_details c, csu_ref_product_opt_matrix d, csu_ref_availability e ");
            strQuery.Append(" where c.case_id = " + localCaseID + " and");
            if (local_sCLLevel != C_HUB_SITE_LEVEL)
            {
                strQuery.Append(" c.char_type_id != " + C_PORT_SPEED + " and");
            }
            else
            {
                strQuery.Append(" ((c.char_type_id !=" + C_PORT_SPEED + ") or (c.char_type_id = " + C_PORT_SPEED + ")) and");
            }

            strQuery.Append(" a.char_type_id = b.char_type_id and ");
            strQuery.Append(" b.char_type_id = c.char_type_id and b.char_id = c.char_id  and c.option_matrix_id = d.option_matrix_id and ");
            strQuery.Append(" d.OPTION_MATRIX_VALID_CD = 1 and e.avail_cd(+) = c.char_avail_cd and ");
            strQuery.Append(" b.char_valid_cd = 1 and ");
            strQuery.Append(" (c.case_detail_valid_cd = 1");
            strQuery.Append(" or c.char_type_id in (select char_type_id from csu_ref_char_type where upper(char_type_name) like 'DISPLAY PLACEHOLDER%') ");
            strQuery.Append(" ) ORDER BY d.display_order_cd,char_num_value,char_type_id");
            return objGetDataFromDB.GetDataTable(strQuery.ToString());
        }

        public DataTable FetchNoteAvail(int regionID, int countryID, int cityID, int cityLevel, int productID)
        {
            strQuery.Clear();
            strQuery.Append("Select min(Note_priority_cd) FROM CSU_Notes WHERE Product_cd=" + productID);
            strQuery.Append("and Region_id = " + regionID);
            strQuery.Append(" and Country_id" + countryID);

            return null;
        }

        public string getGFRCount(string btGfr,string SegregationCode, int prodID)
        {
            if (!String.IsNullOrEmpty(btGfr))
            {
                strQuery.Clear();
                strQuery.Append("Select count(*) from csu_btgfr_product_map cbp, CSU_SEGREGATION_VW_new v WHERE cbp.product_cd =" + prodID);
                strQuery.Append(" and cbp.btgfr in (" + btGfr + ")  AND v.id = cbp.btgfr");
            }
            else
            {
                strQuery.Clear();
                strQuery.Append("Select count(*) from csu_segregation cs, CSU_SEGREGATION_VW_new v");
				strQuery.Append(" WHERE cs.product_cd = " +prodID);
                strQuery.Append(" and cs.segregation_id in (" + SegregationCode + ")  AND v.id = cs.segregation_id");
            }
            return objGetDataFromDB.GetSingleRowFromDB(strQuery.ToString());
        }


        public DataTable getcountforSubproductandlaunch(int prodID)
        {

            try
            {
                strQuery.Clear();
                strQuery.Append("select (select count(subproduct_cd) as launchcount from csu_ref_subproduct");
                strQuery.Append(" where product_cd=" + prodID + " and  subproduct_valid_cd = 1) as validSubproductcount,");
                strQuery.Append("(select count(subproduct_cd) as launchcount from csu_ref_subproduct");
                strQuery.Append(" where product_cd=" + prodID + " and  subproduct_valid_cd = 1 and launch_subproduct=1) as launchCount from dual;");
                return objGetDataFromDB.GetDataTable(strQuery.ToString());
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }




        public DataTable getSubproductName(int local_sCLLevel, int C_COUNTRY_LEVEL, int C_CiTY_LEVEL, int C_HUB_SITE_LEVEL,
            int prodID, int regionID, int countryID, int cityID, int local_sSite, int sAccess_Level,
            int C_END_USER, int iCapmanPlatform)
        {
            strQuery.Clear();
            if (local_sCLLevel == C_COUNTRY_LEVEL)
            {
                strQuery.Append("Select nvl(SubProduct_name,'None') as subproduct_name ,Case_id,CAPMAN_PLATFORM_ID,Case_Avail_Cd, Avail_desc,");
                strQuery.Append(" site_availability_dt, c.subproduct_cd,use_cpe_subproduct from csu_cases a,");
                strQuery.Append(" csu_ref_availability b, csu_ref_subproduct c  where nvl(a.product_cd,0) = " + prodID);
                strQuery.Append(" and nvl(a.Region_id,0) = " + regionID + " and nvl(a.Country_id,0) = " + countryID);
                strQuery.Append(" and a.Case_Avail_cd = b.Avail_cd  and nvl(a.subProduct_cd,0) = c.subProduct_Cd(+) ");
                strQuery.Append(" and a.Case_Valid_Cd = 1 and c.SUBPRODUCT_VALID_CD = 1");
                if (sAccess_Level == C_END_USER) { strQuery.Append(" and c.LAUNCH_SUBPRODUCT = 1 "); }
                strQuery.Append("ORDER BY c.subProduct_Cd");
            }
            else if (local_sCLLevel == C_CiTY_LEVEL)
            {
                strQuery.Append("Select nvl(subProduct_Name,'None') as subproduct_name , Case_id,CAPMAN_PLATFORM_ID,Case_Avail_Cd, Avail_desc, ");
                strQuery.Append(" site_availability_dt, c.subproduct_cd,use_cpe_subproduct from csu_cases a,");
                strQuery.Append(" csu_ref_availability b, csu_ref_Subproduct c ");
                strQuery.Append(" where nvl(a.product_cd,0) = " + prodID);
                strQuery.Append(" and nvl(a.Region_id,0) = " + regionID);
                strQuery.Append(" and nvl(a.Country_id,0) = " + countryID);
                strQuery.Append(" and nvl(a.City_id,0) = " + cityID);
                strQuery.Append(" and a.Case_Avail_cd = b.Avail_cd and nvl(a.subProduct_cd,0) = c.subProduct_Cd(+) ");
                strQuery.Append(" and a.Case_Valid_Cd = 1 and c.SUBPRODUCT_VALID_CD = 1");
                if (sAccess_Level == C_END_USER) { strQuery.Append(" and c.LAUNCH_SUBPRODUCT = 1 "); }
                strQuery.Append("ORDER BY c.subProduct_Cd");

            }
            else if (local_sCLLevel == C_HUB_SITE_LEVEL)
            {
                strQuery.Append("Select subproduct_name,Case_id,CAPMAN_PLATFORM_ID,Case_Avail_Cd, Avail_desc, ");
                strQuery.Append(" site_availability_dt, c.subproduct_cd,use_cpe_subproduct from csu_cases a,");
                strQuery.Append(" csu_ref_availability b, csu_ref_subproduct c ");
                strQuery.Append(" where nvl(a.product_cd,0) = " + prodID);
                strQuery.Append(" and nvl(a.Region_id,0) = " + regionID);
                strQuery.Append(" and nvl(a.Country_id,0) = " + countryID);
                strQuery.Append(" and nvl(a.City_id,0) = " + cityID);
                strQuery.Append(" and nvl(a.Hub_Site_id,0) = " + local_sSite);
                strQuery.Append(" and a.Case_Avail_cd = b.Avail_cd and nvl(a.subProduct_cd,0) = c.subProduct_Cd(+)");
                strQuery.Append(" and a.Case_Valid_Cd = 1");
                strQuery.Append(" and c.SUBPRODUCT_VALID_CD = 1");

                if (!string.IsNullOrEmpty(iCapmanPlatform.ToString()) && iCapmanPlatform.ToString() != "-1")
                {
                    strQuery.Append(" and a.CAPMAN_PLATFORM_ID = " + iCapmanPlatform);
                }
                if (sAccess_Level == C_END_USER) { strQuery.Append(" and c.LAUNCH_SUBPRODUCT = 1 "); }
                strQuery.Append("ORDER BY c.subProduct_Cd");
            }


            return objGetDataFromDB.GetDataTable(strQuery.ToString());
        }

        public DataTable GetsubProdPopChar(int siteID, int prodID, int subProdID, int displaysearch)
        {
            strQuery.Clear();
            strQuery.Append("select nmap.Display_Name as Char_Name, cpc.char_name as CharName, case when pcp.char_name is null then cpv.char_value else DECODE (nvl(cpv.char_value,0),0, 'Not Supported',1, cpv.char_value || ' Router', cpv.char_value || ' Routers') end AS char_value,");
            strQuery.Append(" cpv.char_id from capman_pop_chars cpc,capman_pop_char_values cpv, csu_product_pop_char cpp, pop_char_config pcp,capman_pop_char_name_map nmap");
            strQuery.Append(" where cpc.char_id = cpv.char_id and cpv.char_id = cpp.char_id and");
            strQuery.Append(" cpv.site_id = " + siteID + " and cpp.product_cd =" + prodID);
            strQuery.Append("  and cpp.subproduct_cd = " + subProdID + " and cpp.display_search =" + displaysearch);
            strQuery.Append("  and trim(upper(cpc.char_name))=trim(upper(pcp.char_name(+))) and trim(cpc.char_name) NOT IN ");
            strQuery.Append(" ('NETWORK_COLOUR','POP_PLATFORM_CODE') and upper(nmap.column_Name) = upper(cpc.char_name) order by cpp.display_order");

            return objGetDataFromDB.GetDataTable(strQuery.ToString());
        }

        public DataTable getProductLevelServiceType(int prodID)
        {
            strQuery.Clear();
            strQuery.Append("select a.SERVICE_TYPE_CD, a.PRODUCT_NAME, a.PRODUCT_LOC_LEVEL_CD,a.PARENT_PRODUCT_CD,b.PRODUCT_NAME as PARENT_PRODUCT_NAME from CSU_PRODUCT a LEFT OUTER JOIN CSU_PRODUCT B  ON a.parent_product_cd=b.product_cd where A.product_cd = " + prodID);
            return objGetDataFromDB.GetDataTable(strQuery.ToString());
        }

        public DataTable getDistMPLS(int prodid, int subprodid)
        {
            strQuery.Clear();
            strQuery.Append("select a.DISPLAY_MPLS_PRODUCT, b.DISPLAY_MPLS_SUBPRODUCT from csu_product a, csu_ref_subproduct b");
            strQuery.Append(" where a.product_cd =" + prodid + " and b.subproduct_cd = " + subprodid);
            return objGetDataFromDB.GetDataTable(strQuery.ToString());
        }

        public DataTable getNetworkName(int localCaseID)
        {
            strQuery.Clear();
            strQuery.Append("Select distinct Network_Name,Decode(NVL(SUPPORT_RESILIENT_POP,0),1,'Yes','No') as Support_Resilient From Capman_Pop_Capability,Csu_Cases");
            strQuery.Append(" WHERE case_id = " + localCaseID);
            strQuery.Append(" And Capman_Pop_Capability.ServiceId = Csu_Cases.Capman_Platform_Id and Csu_Cases.Hub_Site_Id IS NOT NULL");
            return objGetDataFromDB.GetDataTable(strQuery.ToString());
        }

        //public DataTable GetProductDetails(int prodID,int regionId)
        //{
        //    strQuery.Clear();
        //    strQuery.Append("Select p.product_name, r.region_name,cn.country_name,p.parent_product_cd,");
        //    strQuery.Append(" p2.product_name as pp, p.display_lead_time, cp.capman_platform_name");
        //    strQuery.Append(" from csu_cases a, csu_product p, csu_product p2, csu_region r, csu_country cn, capman_platforms cp, CSU_PRODUCT_CAPMANPLATFORM_MAP cpm");
        //    strQuery.Append(" where nvl(a.product_cd,0) = "+prodID);
        //    strQuery.Append(" and nvl(p.product_cd,0) = a.product_cd");
        //    strQuery.Append(" and p2.product_cd(+) = p.parent_product_cd");
        //    strQuery.Append(" and cp.capman_platform_id(+) = a.capman_platform_id");
        //    strQuery.Append(" and nvl(a.Region_id,0) = "+regionId);
        //    strQuery.Append("  and nvl(r.Region_id,0) = nvl(a.region_id,0)");
        //    strQuery.Append(" and nvl(a.Country_id,0) = ");
        //    strQuery.Append(" and nvl(cn.country_id,0) = nvl(a.country_id,0)");



        //}


        public DataTable GetAccSuppPortSpeed(int localCaseId, int sAccessLevel, int C_SUPER_USER, string sLdapGFR,
            int distributorID, int access, int hubSiteID, int countryId)
        {
            strQuery.Clear();
            strQuery.Append("select distinct a.access_supplier_char_id, b.char_name, d.priority,");
            strQuery.Append(" c.port_speed_char_id AS pspeedid,a.char_actual_value || ' ' || NVL (a.char_unit_of_measure, 'kbps') AS portspeed,");
            strQuery.Append(" a.char_num_value from csu_cases a, csu_ref_valid_char b,");
            strQuery.Append(" csu_case_port_access_speeds c, csu_supplier_country d,csu_ref_valid_char a where ");
            strQuery.Append(" c.case_id = " + localCaseId + "  and c.valid_cd = 1");
            strQuery.Append("  and a.access_speed_char_id = c.access_speed_char_id");
            if (sAccessLevel != C_SUPER_USER)
            {
                if (!string.IsNullOrEmpty(sLdapGFR))
                {
                    strQuery.Append(" and not exists(select 'x' from capman_supplier_map csm, csu_btgfr_restrictions cbr where cbr.btgfr = " + sLdapGFR);
                    strQuery.Append(" and cbr.country_id = d.country_id and cbr.supplier_id = csm.c_supplier_id and csm.pc_supplier_id = c.access_supplier_char_id)");

                }
                else
                {
                    strQuery.Append(" and not exists(select 'x' from capman_supplier_map csm, csu_restrictions csr where csr.distributorid = " + distributorID);
                    strQuery.Append(" and csr.countryid = d.country_id and csr.supplierid = csm.c_supplier_id and csm.pc_supplier_id = c.access_supplier_char_id)");
                }
            }
            strQuery.Append(" and a.access_supplier_char_id NOT in ");
            strQuery.Append(" (select distinct supplier_id from csu_case_supplier where case_id = " + localCaseId + " )");
            strQuery.Append("  and a.access_product_type_id = c.access_product_type_id");
            strQuery.Append(" and a.access_supplier_name_id = c.access_supplier_name_id");
            strQuery.Append(" and a.access_supplier_char_id = c.access_supplier_char_id");
            strQuery.Append(" and nvl(a.product_cd,0) = " + access);
            strQuery.Append(" and nvl(a.hub_site_id,0) = " + hubSiteID);
            strQuery.Append(" and a.case_valid_cd = 1");
            strQuery.Append(" and d.supplier_id(+) = a.access_supplier_char_id AND a.CHAR_ID = c.PORT_SPEED_CHAR_ID");
            strQuery.Append(" and d.country_id(+) = " + countryId);
            strQuery.Append(" and b.char_id = a.access_supplier_char_id");
            strQuery.Append(" and b.char_valid_cd = 1");
            strQuery.Append(" order by d.priority, b.char_name,a.char_num_value");

            return objGetDataFromDB.GetDataTable(strQuery.ToString());
        }

        public DataTable GetParentAccSuppPortSpeed(int parentId, int hubsiteId, int C_PORT_SPEED, int validateParent, int countryId)
        {
            strQuery.Clear();
            strQuery.Append("Select distinct d.access_supplier_char_id, c3.char_name, csc.priority,");
            strQuery.Append(" d.PORT_SPEED_CHAR_ID as pspeedid,a.char_actual_value || ' ' || NVL (a.char_unit_of_measure, 'kbps') as portspeed,a.char_num_value from ");
            strQuery.Append(" csu_cases a1, csu_case_details a2,csu_case_port_access_speeds d,");
            strQuery.Append(" csu_ref_valid_char c4, csu_ref_valid_char d4, csu_ref_valid_char e4, csu_ref_valid_char f4,");
            strQuery.Append(" csu_supplier_country csc,csu_cases cs4, csu_ref_valid_char c3,csu_ref_valid_char a  where ");
            strQuery.Append(" a1.product_cd =" + parentId + "  and a1.hub_site_id =" + hubsiteId + " and a1.case_valid_cd = 1");
            strQuery.Append(" and a2.case_id = a1.case_id  and a2.case_detail_valid_cd = 1");
            strQuery.Append(" and a2.char_type_id =" + C_PORT_SPEED + " and d.case_id = a1.case_id");
            strQuery.Append(" and d.port_speed_char_id = a2.char_id and d.valid_cd = 1 AND cs4.case_valid_cd = 1");
            strQuery.Append(" AND cs4.product_cd = 25 AND a.CHAR_ID = a2.CHAR_ID AND cs4.access_speed_char_id = d.access_speed_char_id");
            strQuery.Append(" AND cs4.access_supplier_char_id = d.access_supplier_char_id");
            strQuery.Append(" AND cs4.access_supplier_char_id NOT IN (select z.supplier_id from csu_case_supplier z where case_id = a1.case_id)");
            strQuery.Append(" AND cs4.hub_site_id = " + hubsiteId);
            if (validateParent == 1)
            {
                strQuery.Append("  And ccpas.valid_cd = 0)");
            }
            else
            {
                strQuery.Append("  And ccpas.valid_cd = 1)");
            }
            strQuery.Append(" And c4.char_id = d.access_speed_char_id");
            strQuery.Append(" And d4.char_id = d.access_product_type_id");
            strQuery.Append(" And e4.char_id = d.access_supplier_name_id");
            strQuery.Append(" And f4.char_id = d.access_supplier_char_id");
            strQuery.Append(" and c3.char_id = d.access_supplier_char_id");
            strQuery.Append(" and csc.supplier_id(+) = d.access_supplier_char_id");
            strQuery.Append(" and csc.country_id(+) = " + countryId + " Order by c3.char_name,a.char_num_value");

            return objGetDataFromDB.GetDataTable(strQuery.ToString());
        }


        public DataTable getPortSpeedGridData(int caseId, string selectedSupplier, int hubSiteId, int productId, string selectedPortSpeed)
        {
            strQuery.Clear();
            strQuery.Append("Select distinct b.char_actual_value,nvl(b.char_unit_of_measure,'Kbps') as char_unit_of_measure, b.char_num_value,");
            strQuery.Append(" a.access_speed_char_id, c.port_speed_avail_cd, d.char_name as type, e.char_name as name,");
            strQuery.Append(" nvl(f.char_value_2,'NA') as char_value,");
            strQuery.Append(" nvl(c.access_product_type_id,0) as access_product_type_id, ");
            strQuery.Append(" nvl(c.access_supplier_name_id,0) as access_supplier_name_id, b.char_id,");
            strQuery.Append(" nvl(c.access_supplier_char_id,0) as access_supplier_char_id, ");
            strQuery.Append(" h.AVAIL_DESC as portspeed_availability, ");
            strQuery.Append(" i.CHAR_NAME as access_supplier_name ");
            strQuery.Append(" ,vp.ethernet_phase_id ");

            strQuery.Append(" ,vp.SERVICE_VARIANT_NAME,vp.DELIVERY_MODE_NAME");

            strQuery.Append(" from port_to_access_speeds a, csu_ref_valid_char b, csu_case_port_access_speeds c,");
            strQuery.Append(" csu_ref_valid_char d, csu_ref_valid_char e, csu_Case_details f,csu_Cases g, ");
            strQuery.Append(" csu_ref_availability h, ");
            strQuery.Append(" csu_ref_valid_char i ");

            strQuery.Append(" ,V_PC_SUPPLIER_PRODUCT vp,CAPMAN_SUPPLIER_PROD_NAME_MAP cp");

            strQuery.Append(" where a.port_speed_char_id IN (" + selectedPortSpeed + ")");
            strQuery.Append(" and a.access_speed_char_id = b.char_id");
            strQuery.Append(" and g.access_speed_char_id = a.access_speed_char_id");
            strQuery.Append(" and g.access_supplier_char_id IN (" + selectedSupplier + ")");

            strQuery.Append(" and g.access_supplier_char_id NOT in ");
            strQuery.Append(" (select distinct supplier_id from csu_case_supplier where case_id = " + caseId + ")");
            strQuery.Append(" and nvl(g.product_cd,0) = 25");
            strQuery.Append(" and nvl(g.hub_site_id,0) = " + hubSiteId);
            strQuery.Append(" and g.case_valid_cd = 1");
            strQuery.Append(" and c.port_speed_char_id = a.port_speed_char_id");
            strQuery.Append(" and c.access_speed_char_id = a.access_speed_char_id");
            strQuery.Append(" and c.case_id = " + caseId);
            strQuery.Append(" and c.access_supplier_char_id = g.access_supplier_char_id");
            strQuery.Append(" and c.access_supplier_name_id = g.access_supplier_name_id");
            strQuery.Append(" and c.access_product_type_id = g.access_product_type_id");
            strQuery.Append(" and c.access_speed_char_id = g.access_speed_char_id");
            // strQuery.Append(" and c.port_speed_char_id = " & rsCharacteristics(9)
            strQuery.Append(" and c.port_speed_char_id in (" + selectedPortSpeed + ")");
            strQuery.Append(" and d.char_id = c.access_product_type_id");
            strQuery.Append(" and e.char_id = c.access_supplier_name_id");
            strQuery.Append(" and h.AVAIL_CD = c.PORT_SPEED_AVAIL_CD ");
            strQuery.Append(" and f.case_id = " + caseId);
            strQuery.Append(" and f.char_id in (" + selectedPortSpeed + ")");
            strQuery.Append(" and c.valid_cd = 1");
            strQuery.Append(" and  c.ACCESS_SUPPLIER_CHAR_ID = i.CHAR_ID ");

            strQuery.Append(" AND g.access_supplier_name_id in ( select pc_access_supplier_name_id from ");
            strQuery.Append(" v_pc_supplier_product vt ,capman_supplier_prod_name_map cm where vt.SUPPLIERPRODUCTID=cm.C_ACCESS_SUPPLIER_NAME_ID ");
            strQuery.Append(" and ( vt.ethernet_phase_id = 1 OR EXISTS ( SELECT 'X' FROM csu_product_phase_attribute ca ");
            strQuery.Append(" WHERE vt.ethernet_phase_id =phase_id AND phase_id = 2 AND ca.product_id =" + productId);
            strQuery.Append(" ) OR vt.ethernet_phase_id > 2))");
            strQuery.Append(" and vp.SUPPLIERPRODUCTID=cp.C_ACCESS_SUPPLIER_NAME_ID ");
            strQuery.Append(" and cp.PC_ACCESS_SUPPLIER_NAME_ID=g.access_supplier_name_id ");
            strQuery.Append(" and cp.pc_country_id=g.country_id ");

            if (!string.IsNullOrEmpty(selectedPortSpeed))
            {
                strQuery.Append(" and c.port_speed_char_id in (" + selectedPortSpeed + ")");
            }


            strQuery.Append(" order by b.char_num_value,access_product_type_id,access_supplier_name_id, access_supplier_char_id");

            return objGetDataFromDB.GetDataTable(strQuery.ToString());
        }

        public DataTable GetInterfaceDetails(int caseId, int siteId, int productId, int accSpeedCharId,
            int accProdTypeId, int accSuppNameId, int accSuppCharId)
        {
            strQuery.Clear();
            strQuery.Append("select distinct c.char_name, i.preferred_flag, c.char_id as char_id, r.avail_desc, ccd.char_avail_cd ");
            strQuery.Append(" from csu_ref_valid_char c, csu_Cases cd, csu_case_details ccd, ");
            strQuery.Append(" csu_product_access_interfaces i, csu_ref_availability r ");
            strQuery.Append(" where cd.product_cd = 25");
            strQuery.Append(" and cd.hub_site_id = " + siteId);
            strQuery.Append(" and cd.case_valid_cd = 1");
            strQuery.Append(" and cd.access_supplier_char_id NOT IN ");
            strQuery.Append(" (select z.supplier_id from csu_case_supplier z where z.case_id = " + caseId + ")");
            strQuery.Append(" and cd.access_product_type_id = " + accProdTypeId);
            strQuery.Append(" and cd.access_supplier_name_id = " + accSuppNameId);
            strQuery.Append(" and cd.access_supplier_char_id = " + accSuppCharId);
            strQuery.Append(" and cd.access_speed_char_id = " + accSpeedCharId);
            strQuery.Append(" and ccd.case_id = cd.case_id");
            strQuery.Append(" and i.product_cd = " + productId);
            strQuery.Append(" and ccd.case_id = cd.case_id");
            strQuery.Append(" and ccd.char_id = i.interface_char_id");
            strQuery.Append(" and ccd.case_detail_valid_cd = 1");
            strQuery.Append(" and ccd.char_avail_cd != 2");
            strQuery.Append(" and c.char_id = ccd.char_id");
            strQuery.Append(" and r.avail_cd = ccd.char_avail_cd");
            strQuery.Append(" and i.access_char_id=cd.access_speed_char_id");

            return objGetDataFromDB.GetDataTable(strQuery.ToString());
        }

        public string getParentCaseID(string parentProdID, string popID, int capManPlatformID)
        {
            strQuery.Clear();
            strQuery.Append("select case_id from csu_cases where product_cd=" + parentProdID + " and hub_site_id=" + popID);
            strQuery.Append(" and CAPMAN_PLATFORM_ID=" + capManPlatformID + " and case_valid_cd = 1");
            return objGetDataFromDB.GetSingleRowFromDB(strQuery.ToString());
        }

        public DataTable getCISReport(int prodId)
        {
            strQuery.Clear();
            strQuery.Append("select distinct A.country_id, A.country_name,A.region_id,D.region_name ");
            strQuery.Append("from csu_country A, csu_cases B, csu_ref_subproduct C, csu_region D ");
            strQuery.Append("where A.country_id = B.country_id ");
            strQuery.Append("and A.region_id = D.region_id ");
            strQuery.Append("and B.product_cd = " + prodId);
            strQuery.Append("and B.subproduct_cd = C.subproduct_Cd ");
            strQuery.Append("and Upper(C.subproduct_name) = 'CIS TERMINATIONS'");
            strQuery.Append(" and Case_Avail_Cd in (1,3)");
            strQuery.Append(" and Case_Valid_Cd = 1");
            strQuery.Append(" ORDER BY region_name,country_Name");

            return objGetDataFromDB.GetDataTable(strQuery.ToString());
        }

        public DataTable getCISAccessTypeHeader(int ProductCIS, int validCD)
        {
            strQuery.Clear();
            strQuery.Append("SELECT a.char_id, char_name from csu_ref_product_opt_matrix A,");
            strQuery.Append(" csu_ref_valid_char B, csu_ref_char_type C ");
            strQuery.Append(" WHERE  A.product_cd = " + ProductCIS);
            strQuery.Append(" and B.char_type_id = C.char_type_id ");
            strQuery.Append(" and A.char_id = B.char_id ");
            strQuery.Append(" and A.char_type_id = B.char_type_id ");
            strQuery.Append(" and upper(C.char_type_name) = 'CALLER ACCESS TYPE'");
            strQuery.Append(" and option_matrix_Valid_Cd=" + validCD);
            return objGetDataFromDB.GetDataTable(strQuery.ToString());
        }

        public DataTable getCISCountryCity(int RegionID, string charID, int PRODUCT_CIS, int Valid_cd)
        {
            strQuery.Clear();

            strQuery.Append("SELECT DISTINCT A.country_name, ");
            strQuery.Append("  A.country_id, ");
            strQuery.Append("  D.city_id, ");
            strQuery.Append("  D.city_name , ");
            strQuery.Append("  (SELECT listagg(rchar.char_name ");
            strQuery.Append("    || ' - ' ");
            strQuery.Append("    || Avail_desc, ' , ') WITHIN GROUP ( ");
            strQuery.Append("  ORDER BY AVAIL_CD) ");
            strQuery.Append("  FROM csu_cases CA, ");
            strQuery.Append("    csu_case_details B, ");
            strQuery.Append("    csu_ref_availability C, ");
            strQuery.Append("    csu_ref_valid_char rchar ");
            strQuery.Append("  WHERE CA.case_id  = B.case_id ");
            strQuery.Append("  AND CA.product_cd = " + PRODUCT_CIS);
            strQuery.Append("  AND CA.country_id = A.country_id ");
            strQuery.Append("  AND CA.city_id    = D.city_id ");
            strQuery.Append("  AND rchar.char_id =B.char_id ");
            strQuery.Append("  AND B.char_id    IN (" + charID + ") ");
            //strQuery.Append("(SELECT a.char_id ");
            //strQuery.Append("FROM csu_ref_product_opt_matrix A, ");
            //strQuery.Append("  csu_ref_valid_char B, ");
            //strQuery.Append("  csu_ref_char_type C ");
            //strQuery.Append("WHERE A.product_cd          = "+PRODUCT_CIS+" ");
            //strQuery.Append("AND B.char_type_id          = C.char_type_id ");
            //strQuery.Append("AND A.char_id               = B.char_id ");
            //strQuery.Append("AND A.char_type_id          = B.char_type_id ");
            //strQuery.Append("AND upper(C.char_type_name) = 'CALLER ACCESS TYPE' ");
            //strQuery.Append("AND option_matrix_Valid_Cd  = 1 ");
            //strQuery.Append(")");
            strQuery.Append("  AND B.Char_avail_cd      = C.Avail_cd ");
            strQuery.Append("  AND Case_Valid_Cd        = " + Valid_cd);
            strQuery.Append("  AND Case_detail_Valid_Cd = " + Valid_cd);
            strQuery.Append("  ) ");
            strQuery.Append("FROM csu_country A, ");
            strQuery.Append("  csu_cases B, ");
            strQuery.Append("  csu_ref_subproduct C, ");
            strQuery.Append("  csu_city D ");
            strQuery.Append("WHERE A.country_id           = B.country_id ");
            strQuery.Append("AND D.City_id                = B.city_id ");
            strQuery.Append("AND A.region_id              = " + RegionID);
            strQuery.Append(" AND B.product_cd             = " + PRODUCT_CIS);
            strQuery.Append(" AND B.subproduct_cd          = C.subproduct_Cd ");
            strQuery.Append("AND Upper(C.subproduct_name) = 'CCS ORIGINATIONS' ");
            strQuery.Append("AND Case_Valid_Cd            = " + Valid_cd);
            strQuery.Append(" ORDER BY country_Name, ");
            strQuery.Append("  city_name");



            //strQuery.Append("SELECT M.AVAIL_ABBR, ");
            //strQuery.Append("  n.CHAR_NAME, ");
            //strQuery.Append("  M.CITY_NAME, ");
            //strQuery.Append("  M.COUNTRY_NAME ");
            //strQuery.Append("FROM ");
            //strQuery.Append("  (SELECT a.char_id , ");
            //strQuery.Append("    b.char_name ");
            //strQuery.Append("  FROM csu_ref_product_opt_matrix A, ");
            //strQuery.Append("    csu_ref_valid_char B, ");
            //strQuery.Append("    csu_ref_char_type C ");
            //strQuery.Append("  WHERE A.product_cd          = 15 ");
            //strQuery.Append("  AND B.char_type_id          = C.char_type_id ");
            //strQuery.Append("  AND A.char_id               = B.char_id ");
            //strQuery.Append("  AND A.char_type_id          = B.char_type_id ");
            //strQuery.Append("  AND UPPER(C.CHAR_TYPE_NAME) = 'CALLER ACCESS TYPE' ");
            //strQuery.Append("  AND OPTION_MATRIX_VALID_CD  =1 ");
            //strQuery.Append("  ) n ");
            //strQuery.Append("LEFT OUTER JOIN ");
            //strQuery.Append("  ( SELECT DISTINCT AVAIL_ABBR, ");
            //strQuery.Append("    b.char_id, ");
            //strQuery.Append("    B.CHAR_AVAIL_CD , ");
            //strQuery.Append("    C.AVAIL_CD, ");
            //strQuery.Append("    CASE_VALID_CD, ");
            //strQuery.Append("    CASE_DETAIL_VALID_CD, ");
            //strQuery.Append("    ref.CHAR_NAME, ");
            //strQuery.Append("    CTY.CITY_NAME, ");
            //strQuery.Append("    CTRY.COUNTRY_NAME ");
            //strQuery.Append("  FROM CSU_CASES A, ");
            //strQuery.Append("    CSU_CASE_DETAILS B, ");
            //strQuery.Append("    CSU_REF_AVAILABILITY C , ");
            //strQuery.Append("    csu_city cty, ");
            //strQuery.Append("    csu_country ctry, ");
            //strQuery.Append("    csu_ref_valid_char ref ");
            //strQuery.Append("  WHERE A.CASE_ID    = B.CASE_ID ");
            //strQuery.Append("  AND A.PRODUCT_CD   = 15 ");
            //strQuery.Append("  AND CTY.CITY_ID    =A.CITY_ID ");
            //strQuery.Append("  AND CTRY.COUNTRY_ID=A.COUNTRY_ID ");
            //strQuery.Append("  AND B.CHAR_ID      =ref.CHAR_ID ");
            //strQuery.Append("  AND A.COUNTRY_ID  IN ");
            //strQuery.Append("    ( SELECT DISTINCT A.COUNTRY_ID ");
            //strQuery.Append("    FROM CSU_COUNTRY A, ");
            //strQuery.Append("      CSU_CASES B, ");
            //strQuery.Append("      CSU_REF_SUBPRODUCT C, ");
            //strQuery.Append("      CSU_CITY D ");
            //strQuery.Append("    WHERE A.COUNTRY_ID           = B.COUNTRY_ID ");
            //strQuery.Append("    AND D.CITY_ID                = B.CITY_ID ");
            //strQuery.Append("    AND A.REGION_ID              = "+RegionID);
            //strQuery.Append("    AND B.PRODUCT_CD             = 15 ");
            //strQuery.Append("    AND B.SUBPRODUCT_CD          = C.SUBPRODUCT_CD ");
            //strQuery.Append("    AND UPPER(C.SUBPRODUCT_NAME) = 'CCS ORIGINATIONS' ");
            //strQuery.Append("    AND CASE_VALID_CD            = 1 ");
            //strQuery.Append("    ) ");
            //strQuery.Append("  AND A.city_id IN ");
            //strQuery.Append("    (SELECT DISTINCT D.city_id ");
            //strQuery.Append("    FROM csu_country A, ");
            //strQuery.Append("      csu_cases B, ");
            //strQuery.Append("      csu_ref_subproduct C, ");
            //strQuery.Append("      csu_city D ");
            //strQuery.Append("    WHERE A.country_id           = B.country_id ");
            //strQuery.Append("    AND D.City_id                = B.city_id ");
            //strQuery.Append("    AND A.region_id              =  "+RegionID);
            //strQuery.Append("    AND B.product_cd             = 15 ");
            //strQuery.Append("    AND B.subproduct_cd          = C.subproduct_Cd ");
            //strQuery.Append("    AND UPPER(C.SUBPRODUCT_NAME) = 'CCS ORIGINATIONS' ");
            //strQuery.Append("    AND Case_Valid_Cd            = 1 ");
            //strQuery.Append("    ) ");
            //strQuery.Append("  AND B.CHAR_AVAIL_CD      = C.AVAIL_CD ");
            //strQuery.Append("  AND CASE_VALID_CD        = 1 ");
            //strQuery.Append("  AND CASE_DETAIL_VALID_CD = 1 ");
            //strQuery.Append("  )M ");
            //strQuery.Append("ON n.char_id=m.char_id  order by 3,4");

            return objGetDataFromDB.GetDataTable(strQuery.ToString());

        }

        public string GetSubProductCount(int prodID)
        {
            strQuery.Clear();
            strQuery.Append("select count(*) from csu_ref_subproduct where product_cd= "+prodID);
            return objGetDataFromDB.GetSingleRowFromDB(strQuery.ToString());
        }
    }
}
