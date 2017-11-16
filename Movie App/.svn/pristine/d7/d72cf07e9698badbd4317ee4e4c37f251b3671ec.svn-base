using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Data;
using SCSearchDAL;
using System.Net;

namespace SCSearchBAL
{
    public class DispCPEPartsBAL
    {

        public CPEParts getCPEParts(int bundleID, int countryID, int isHVPN)
        {
            DispCPEPartsDAL objDispCPEPartsDAL = new DispCPEPartsDAL();
            DataTable dtAcc = objDispCPEPartsDAL.getAccessType(bundleID, countryID);
            DataTable dtIOS = new DataTable();
            CPEParts objCPEParts = new CPEParts();
            objCPEParts.stdPart = new List<StandardParts>();
            objCPEParts.lstOptPart = new List<OptionalParts>();

            objCPEParts.strPartNameList = new List<string>();

            DataTable dtStandardPartName = objDispCPEPartsDAL.getStandardParts(bundleID);

            DataTable dtAggAccType = objDispCPEPartsDAL.getAggregator(countryID);

            List<string> lst = new List<string>();

            foreach (DataRow dr in dtAggAccType.Rows)
            {
                lst.Add(Convert.ToString(dr[1]));
            }

            if (dtStandardPartName != null && dtStandardPartName.Rows.Count > 0)
            {
                foreach (DataRow dr in dtStandardPartName.Rows)
                {
                    objCPEParts.strPartNameList.Add(Convert.ToString(dr[0]));
                }
            }
            else
            {
                objCPEParts.strPartNameList.Add("No Parts Available");
            }

            //  List<StandardParts> lstStd = new List<StandardParts>();

            foreach (DataRow dr in dtAcc.Rows)
            {
                //HVPN check
                if (isHVPN == 0)
                {
                    if (Convert.ToString(dr[0]).ToUpper().Contains("DSL") || Convert.ToString(dr[0]).ToUpper().Contains("HVPN")
                        || Convert.ToString(dr[0]).ToUpper().Contains("FTT") || Convert.ToString(dr[0]).ToUpper().Contains("VSAT")) { continue; }
                }
                else if (isHVPN == 63)
                {
                    //for BT CPE both EE/LL details should be shown
                }
                else
                {
                    if (!Convert.ToString(dr[0]).ToUpper().Contains("DSL") && !Convert.ToString(dr[0]).ToUpper().Contains("HVPN")
                        && !Convert.ToString(dr[0]).ToUpper().Contains("FTT") && !Convert.ToString(dr[0]).ToUpper().Contains("VSAT")) { continue; }
                }
                StandardParts objStd = new StandardParts();
                objStd.IOS_Parts = new List<string>();
                objStd.AccessType = Convert.ToString(dr[0]);

                if (checkStringInList(lst, Convert.ToString(dr[1])))
                {
                    objStd.IOS_Parts.Add("Parts display is suppressed as the selected country is Aggregator supported ");
                }
                else
                {
                    if (!string.IsNullOrEmpty(Convert.ToString(dr[1])))
                    {
                        dtIOS = objDispCPEPartsDAL.getIOSPart(bundleID, int.Parse(Convert.ToString(dr[1])), countryID);

                        if (dtIOS != null && dtIOS.Rows.Count > 0)
                        {
                            foreach (DataRow dr1 in dtIOS.Rows)
                            {
                                objStd.IOS_Parts.Add(Convert.ToString(dr1[0]));
                            }
                        }
                        else
                        {
                            objStd.IOS_Parts.Add("No Parts Available");
                        }
                    }
                    else
                    {
                        dtIOS = objDispCPEPartsDAL.getIOSwithoutAccess(bundleID, countryID);
                        foreach (DataRow dr1 in dtIOS.Rows)
                        {
                            objStd.IOS_Parts.Add(Convert.ToString(dr1[0]));
                        }
                    }
                }
                objCPEParts.stdPart.Add(objStd);



            }

            DataTable AccTypeforOptPart = objDispCPEPartsDAL.getOptionalPartAccType(bundleID, countryID);

            foreach (DataRow dr in AccTypeforOptPart.Rows)
            {
                //HVPN check
                if (isHVPN == 0)
                {
                    if (Convert.ToString(dr[0]).ToUpper().Contains("DSL") || Convert.ToString(dr[0]).ToUpper().Contains("HVPN")
                        || Convert.ToString(dr[0]).ToUpper().Contains("FTT") || Convert.ToString(dr[0]).ToUpper().Contains("VSAT")) { continue; }
                }
                else if (isHVPN == 63)
                {
                    //for BT CPE both EE/LL details should be shown
                }
                else
                {
                    if (!Convert.ToString(dr[0]).ToUpper().Contains("DSL") && !Convert.ToString(dr[0]).ToUpper().Contains("HVPN")
                        && !Convert.ToString(dr[0]).ToUpper().Contains("FTT") && !Convert.ToString(dr[0]).ToUpper().Contains("VSAT")) { continue; }
                }


                OptionalParts optParts = new OptionalParts();
                optParts.AccessType = Convert.ToString(dr[0]);
                optParts.Opt_Parts = new List<string>();
                if (checkStringInList(lst, Convert.ToString(dr[1])))
                    optParts.Opt_Parts.Add("Parts display is suppressed as the selected country is Aggregator supported ");
                else
                {
                    DataTable dtOptParts = objDispCPEPartsDAL.getOptionalPart(bundleID, int.Parse(Convert.ToString(dr[1])));

                    if (dtOptParts != null && dtOptParts.Rows.Count > 0)
                    {
                        foreach (DataRow drOpt in dtOptParts.Rows)
                        {
                            optParts.Opt_Parts.Add(Convert.ToString(drOpt[0]));
                        }
                    }
                    else
                    {
                        optParts.Opt_Parts.Add("No Parts Available");

                    }
                }
                objCPEParts.lstOptPart.Add(optParts);
            }

            objCPEParts.varPart = new List<string>();

            DataTable dtVarParts = objDispCPEPartsDAL.getVariablePart(bundleID, countryID);

            if (dtVarParts != null && dtVarParts.Rows.Count > 0)
            {
                foreach (DataRow drVar in dtVarParts.Rows)
                {
                    objCPEParts.varPart.Add(Convert.ToString(drVar[0]));
                }
            }
            else
            {
                objCPEParts.varPart.Add("No Parts Available");
            }

            //var finlist = from k in list where 
            //var optparts = from k in (objCPEParts.lstOptPart) select k.Opt_Parts;
            // var optionparts = from k in (objCPEParts.lstOptPart) select k;

            //var g = objCPEParts.lstOptPart.GroupBy(u => u.AccessType ).Select(grp => grp.ToList()).ToList();

            //  (new System.Collections.Generic.Mscorlib_CollectionDebugView<SCSearchBAL.OptionalParts>(objCPEParts.lstOptPart)).Items[0].Opt_Parts


            if (objCPEParts.stdPart.Count > 1)
            {
                List<StandardParts> tempList = new List<StandardParts>();
                foreach (StandardParts stdPart1 in objCPEParts.stdPart)
                {
                    foreach (StandardParts stdPart2 in objCPEParts.stdPart)
                    {
                        if (!stdPart1.AccessType.Equals(stdPart2.AccessType))
                        {
                            if (stdPart1.IOS_Parts.All(stdPart2.IOS_Parts.Contains) && stdPart1.IOS_Parts.Count == stdPart2.IOS_Parts.Count)
                            {

                                stdPart1.AccessType += "<br/> " + stdPart2.AccessType;
                            }
                        }
                    }

                    bool present = false;
                    if (tempList.Count > 0)
                    {

                        foreach (StandardParts opt in tempList)
                        {
                            if (stdPart1.IOS_Parts.All(opt.IOS_Parts.Contains) && stdPart1.IOS_Parts.Count == opt.IOS_Parts.Count)
                            {
                                present = true;
                                break;
                            }
                        }

                        if (!present)
                        {
                            tempList.Add(stdPart1);
                        }
                    }
                    else
                    {
                        tempList.Add(stdPart1);
                    }

                }

                objCPEParts.stdPart = tempList;


            }


            if (objCPEParts.lstOptPart.Count > 1)
            {
                List<OptionalParts> tempList = new List<OptionalParts>();
                foreach (OptionalParts optPart1 in objCPEParts.lstOptPart)
                {
                    foreach (OptionalParts optPart2 in objCPEParts.lstOptPart)
                    {
                        if (!optPart1.AccessType.Equals(optPart2.AccessType))
                        {
                            if (optPart1.Opt_Parts.All(optPart2.Opt_Parts.Contains) && optPart1.Opt_Parts.Count == optPart2.Opt_Parts.Count)
                            {

                                optPart1.AccessType += "<br/> " + optPart2.AccessType;
                            }
                        }
                    }

                    bool present = false;
                    if (tempList.Count > 0)
                    {

                        foreach (OptionalParts opt in tempList)
                        {
                            if (optPart1.Opt_Parts.All(opt.Opt_Parts.Contains) && optPart1.Opt_Parts.Count == opt.Opt_Parts.Count)
                            {
                                present = true;
                                break;
                            }
                        }

                        if (!present)
                        {
                            tempList.Add(optPart1);
                        }
                    }
                    else
                    {
                        tempList.Add(optPart1);
                    }

                }

                objCPEParts.lstOptPart = tempList;
            }
            return objCPEParts;
        }

        public bool checkStringInList(List<string> lst, string value)
        {
            return lst.Contains(value);
        }
    }
}
