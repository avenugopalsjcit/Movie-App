var ngModFilter = angular.module("ngModuleFilter", ['ngResource']);
ngModFilter.value('pageMethods', PageMethods);
ngModFilter.factory('Products', function (pageMethods, $rootScope) {
    var result = [];
    return function (CountryID) {
        pageMethods.GetProductsData(CountryID, function (data) {
            $rootScope.productdata = [];

            result = [];
            data.forEach(function (item) {

                result.push({ ProductID: item.ProductID, ProductName: item.ProductName });
            });
            $rootScope.productdata = result;
            $rootScope.$apply();
        });
    }
})

ngModFilter.factory('Regions', function (pageMethods, $rootScope) {

    var regResult = [];
    return function (ProductID) {
        pageMethods.GetRegionsData(ProductID, function (data) {
            $rootScope.RegionData = [];
            regResult = [];
            data.forEach(function (item) {

                regResult.push({ RegionID: item.RegionID, RegionName: item.RegionName });
            });
            $rootScope.RegionData = regResult;
            $rootScope.$apply();
        });
    }
});

ngModFilter.factory('Countries', function (pageMethods, $rootScope) {
    var cntryresult = [];
    return function (ProductID,Region) {
        pageMethods.GetCountriesData(ProductID,Region, function (data) {
            $rootScope.CountryData = [];
            cntryresult = [];
            data.forEach(function (item) {

                cntryresult.push({ CountryID: item.CountryID, CountryName: item.CountryName });

            });
            $rootScope.CountryData = cntryresult;
            $rootScope.$apply();

        });
    }
});


ngModFilter.factory('StateProvince', function (pageMethods, $rootScope) {
    var stateprovResult = [];

    return function (ProductID,Region, Country) {

        pageMethods.GetStatesData(ProductID,Region, Country, function (data) {
            $rootScope.StateData = [];
            stateprovResult = [];
            data.forEach(function (item) {

                stateprovResult.push({ StateID: item.StateID, StateName: item.StateName });
            });

            $rootScope.StateData = stateprovResult;

            $rootScope.$apply();

        });
    }
});


ngModFilter.factory('Cities', function (pageMethods, $rootScope) {

    var CityResult = [];
    return function (ProductID, Region, Country, State, flag) {

        pageMethods.GetCitiesData(ProductID, Region, Country, State, function (data) {
            $rootScope.CityData = [];
            CityResult = [];
            data.forEach(function (item) {
                CityResult.push({ CityID: item.CityID, CityName: item.CityName });
            });
            
            if (flag == "0") {

                $rootScope.CityData = CityResult;
            }
            else if (flag == "1") {
            
                $rootScope.CityData1 = CityResult;
            }
            else if (flag == "2") {
            
                $rootScope.CityData2 = CityResult;
            }

            $rootScope.$apply();
        });
    }
});

ngModFilter.factory('Speedsfctry', function (pageMethods, $rootScope) {

    var Speeds = [];
    return function () {

        pageMethods.GetSpeeds(function (data) {
            $rootScope.SpeedsData = [];
            Speeds = [];
            data.forEach(function (item) {
                Speeds.push({ SpeedID: item.SpeedID, SpeedName: item.SpeedName });
            });
            $rootScope.SpeedsData = Speeds;
            $rootScope.$apply();
        });
    }
});



ngModFilter.factory('Pops', function (pageMethods, $rootScope) {
    var popResult = [];
    return function (Product, Region, Country, State, City) {
        pageMethods.GetPopData(Product, Region, Country, State, City, function (data) {

            $rootScope.PopData = [];
            popResult = [];
            data.forEach(function (item) {
                popResult.push({ POPID: item.POPID, PopName: item.PopName });
            });
            $rootScope.PopData = popResult;
            $rootScope.$apply();
        });
    }
});




ngModFilter.factory('PopChars', function (pageMethods, $rootScope) {
    var popCharsResult = [];
    return function (HubSiteID, ProductID, DisplaySearch) {
        pageMethods.FetchPopCharacteristics(HubSiteID, ProductID, DisplaySearch, function (data) {


            popCharsResult = [];
            data.forEach(function (item) {

                popCharsResult.push({ CharName: item.CharName, CharValue: item.CharValue });
            });

            //$("#tblPopCharacteristics").show();
            $rootScope.PopCharData = popCharsResult;
            $rootScope.$apply();
        });
    }
});

ngModFilter.factory('ProductDetails', function (pageMethods, $rootScope) {

    return function (ProdLocLevel, CapmanPlatform, StateFlag, ProductID, RegionID, CountryID, StateID, CityID, HubSiteID, DisplaySearch) {

        pageMethods.GetProductDetails(ProdLocLevel, CapmanPlatform, StateFlag, ProductID, RegionID, CountryID, StateID, CityID, HubSiteID, DisplaySearch, function (data) {
            $rootScope.ServiceAvailable = '';
            $rootScope.PopCode = '';
            $rootScope.NetworkName = '';
            $rootScope.ResilientPop = '';


            $rootScope.ServiceAvailable = data.ServiceAvailable;
            $rootScope.PopCode = data.PopCode;
            $rootScope.NetworkName = data.NetworkName;
            $rootScope.ResilientPop = data.ResilientPop;
            $rootScope.CaseID = data.CaseID;
            $rootScope.ParentProductID = data.ParentProductID;
            $rootScope.CapmanPlatformID = data.CapmanPlatformID;
            $rootScope.$apply();

            //$("#tblProductDetails").show();

            pageMethods.GetCharacteristics($rootScope.CaseID, 1, 1, function (data) {

                var tableData = "<table>";
                data.forEach(function (item) {
                    tableData = tableData + "<tr><td > <fieldset><legend><b>" + item.CharTypeAlias + "</b></legend><table >";
                    if (item.CharTypeAlias == 'Parent Port Speeds') {
                        $rootScope.ParentPortSpeeds = item.CharTypeAlias;

                    }
                    item.chars.forEach(function (subitem) {
                        tableData = tableData + "<tr><td>" + subitem.CharName + " : </td><td>" + subitem.CharValue + "</td></tr>";
                    });
                    tableData = tableData + "</table></td></tr>";
                });

                $("#divChars").html(tableData);

            });

            if ($rootScope.ParentProductID == 0) {
                $("#trParent").show();

                pageMethods.GetAccessSuppliers($rootScope.CaseID, 25, HubSiteID, 1, CountryID, function (data) {
                    var AccSuppdata = [];

                    $rootScope.AccessSupplierData = [];
                    AccSuppdata = [];

                    data.forEach(function (item) {
                        AccSuppdata.push({ AccessSupplierID: item.AccessSupplierID, AccessSupplierName: item.AccessSupplierName });
                    });

                    $rootScope.AccessSupplierData = AccSuppdata;
                    $rootScope.$apply();

                });


                pageMethods.GetPortSpeeds($rootScope.CaseID, 25, HubSiteID, 1, CountryID, function (data) {
                    var PortSpeedData = [];

                    $rootScope.PortSpeedData = [];
                    PortSpeedData = [];

                    data.forEach(function (item) {
                        PortSpeedData.push({ PortSpeedID: item.PortSpeedID, PortSpeedName: item.PortSpeedName });
                    });

                    $rootScope.PortSpeedData = PortSpeedData;
                    $rootScope.$apply();

                });

                pageMethods.GetChildPortSpeeds($rootScope.CaseID, -1, 0, 2256, ProductID, function (data) {
                    var tableData = "<table border='1'>";
                    tableData = tableData + "<tr><td>Row Count</td><td><b>Port Speed</b></td><td><b>Port Speed Availability</b></td><td><b>Access Speed</b></td><td><b>Access Technology</b></td>  ";
                    tableData = tableData + "<td><b>Access Supplier Name <br>Supplier Product Name<br>/BT Internal SLA Information</b></td><td><b>Service Type</b></td><td><b>Access Speed Availability</b></td><td><b>Ordering Status</b></td>";
                    tableData = tableData + "<td><b>Interface</b></td><td><b>Framing</b></td><td><b>Connector</b></td>";
                    tableData = tableData + "</tr>"
                    var rowcount = 1;
                    data.forEach(function (item) {

                        tableData = tableData + "<tr>";
                        tableData = tableData + "<td>" + rowcount + "</td>";
                        tableData = tableData + "<td>" + item.PortSpeeds + "</td><td>" + item.PortSpeedAvailability + "</td>";
                        tableData = tableData + "<td>" + item.AccessSpeed + "  </td><td>" + item.AccessTechnology + "</td>";
                        tableData = tableData + "<td>" + "<a href='SLAInformation.asp?slaproduct=" + item.AccessSupplierNameID + "&speed=" + item.AccessSpeedCharID + "&speeduom=" + item.ASpeedUOM + "&sSupplier=" + item.AccessSupplierCharID + "&AccTypename=" + item.AccessProductTypeID + "'>" + item.SupplierProductName1 + "</a> </td>";
                        //tableData = tableData + "<td>" + item.SupplierProductName + " <br> "+ item.SupplierProductName1 + "</td>";
                        //tableData = tableData + "<td>" + item.SupplierProductName1 + "</td>";
                        tableData = tableData + "<td>" + item.ServiceType + "</td>";
                        tableData = tableData + "<td>" + item.AccessSpeedAvailability + " </td>";
                        tableData = tableData + "<td>" + "<a href='product/dispACCESSdetails.asp?Product=25&Region=" + RegionID + "&Country=" + CountryID + "&Site=0&ChosenSupplier=" + item.AccessSupplierCharID + "'>" + item.OrderingStatus + "</a> </td>";
                        //tableData = tableData + "<td>" + item.OrderingStatus + "</td>";
                        tableData = tableData + "<td>" + item.Interface + "</td><td>" + item.Framing + "  </td><td>" + item.Connecter + "</td>";
                        tableData = tableData + "</tr>";
                        rowcount = rowcount + 1;
                    });
                    tableData = tableData + "</table>";
                    $("#tblChildPortSpeeds").html(tableData);
                });

            }
            if ($rootScope.ParentProductID > 0) {
                $("#trChild").show();

                pageMethods.GetParentAccessSupplier($rootScope.CaseID, ProductID, HubSiteID, 1, CountryID, 28, $rootScope.ParentProductID, 1, $rootScope.CapmanPlatformID, function (data) {
                    var ParentAccSupp = [];

                    $rootScope.ParentAccSuppdata = [];
                    ParentAccSupp = [];

                    data.forEach(function (item) {
                        ParentAccSupp.push({ AccessSupplierID: item.AccessSupplierID, AccessSupplierName: item.AccessSupplierName });
                    });

                    $rootScope.ParentAccSuppdata = ParentAccSupp;
                    $rootScope.$apply();

                });

                pageMethods.GetParentPortSpeed($rootScope.CaseID, ProductID, HubSiteID, 1, CountryID, 28, $rootScope.ParentProductID, 1, $rootScope.CapmanPlatformID, function (data) {
                    var ParentPortSpeed = [];

                    $rootScope.ParentPortSpeedData = [];
                    ParentPortSpeed = [];

                    data.forEach(function (item) {
                        ParentPortSpeed.push({ PortSpeedID: item.PortSpeedID, PortSpeedName: item.PortSpeedName });
                    });

                    $rootScope.ParentPortSpeedData = ParentPortSpeed;
                    $rootScope.$apply();

                });

                pageMethods.GetSuppliersData(CountryID, ProductID, CityID, function (data) {
                    $rootScope.CpeSupplierData = [];
                    suppdata = [];
                    firstrec = 0;
                    $rootScope.SelectedCPESupplier = 0;
                    data.forEach(function (item) {
                        if (firstrec == 0) {
                            $rootScope.SelectedCPESupplier = item.supplierID;
                        }
                        suppdata.push({ supplierID: item.supplierID, SupplierName: item.SupplierName });
                        firstrec = 1;
                    });

                    //pageMethods.GetParentSpeeds($rootScope.CaseID, -1, 63562, '2256', ProductID, $rootScope.ParentProductID, function (data) {
                    pageMethods.GetParentSpeeds($rootScope.CaseID, -1, $rootScope.SelectedCPESupplier, '2256', ProductID, $rootScope.ParentProductID, function (data) {
                        var tableData = "<table border='1'>";
                        tableData = tableData + "<tr><td>Row Count</td><td><b>Port Speed</b></td><td><b>Port Speed Availability</b></td><td><b>Access Speed</b></td><td><b>Access Technology</b></td>  ";
                        tableData = tableData + "<td><b>Supplier Product Name<br>/BT Internal SLA Information</b></td><td><b>Service Type</b></td><td><b>Access Speed Availability</b></td><td><b>Ordering Status</b></td>";
                        tableData = tableData + "<td><b>Interface</b></td><td><b>Framing</b></td><td><b>Connector</b></td>";
                        tableData = tableData + "</tr>"
                        var rowcount = 1;
                        data.forEach(function (item) {

                            tableData = tableData + "<tr>";
                            tableData = tableData + "<td>" + rowcount + "</td>";
                            tableData = tableData + "<td>" + item.PortSpeeds + "</td><td>" + item.PortSpeedAvailability + "</td>";
                            tableData = tableData + "<td>" + item.AccessSpeed + "  </td><td>" + item.AccessTechnology + "</td>";
                            tableData = tableData + "<td>" + item.SupplierProductName + " <br> <a href='SLAInformation.asp?slaproduct=" + item.AccessSupplierNameID + "&speed=" + item.AccessSpeedCharID + "&speeduom=" + item.ASpeedUOM + "&sSupplier=" + item.AccessSupplierCharID + "&AccTypename=" + item.AccessProductTypeID + "'>" + item.SupplierProductName1 + "</a> </td>";
                            tableData = tableData + "<td>" + item.ServiceType + "</td>";
                            tableData = tableData + "<td>" + item.AccessSpeedAvailability + " </td>";
                            tableData = tableData + "<td>" + "<a href='product/dispACCESSdetails.asp?Product=25&Region=" + RegionID + "&Country=" + CountryID + "&Site=0&ChosenSupplier=" + item.AccessSupplierCharID + "'>" + item.OrderingStatus + "</a> </td>";
                            tableData = tableData + "<td>" + item.Interface + "</td><td>" + item.Framing + "  </td><td>" + item.Connecter + "</td>";
                            tableData = tableData + "</tr>";
                            rowcount = rowcount + 1;
                        });
                        tableData = tableData + "</table>";
                        $("#tblParentSpeeds").html(tableData);
                    });

                    $rootScope.CpeSupplierData = suppdata;
                    $rootScope.$apply();
                });



            }

        });
    }
});


ngModFilter.factory('CPESupplierList', function (pageMethods, $rootScope) {
    var suppdata = [];
    return function (countryID, ProductID, CityID) {
        pageMethods.GetSuppliersData(countryID, ProductID, CityID, function (data) {
            $rootScope.CpeSupplierData = [];
            suppdata = [];
            firstrec = 0;
            $rootScope.SelectedCPESupplier = 0;
            data.forEach(function (item) {
                if (firstrec == 0) {
                    $rootScope.SelectedCPESupplier = item.supplierID;
                }
                suppdata.push({ supplierID: item.supplierID, SupplierName: item.SupplierName });
                firstrec = 1;
            });

            $rootScope.CpeSupplierData = suppdata;
            $rootScope.$apply();
        });

    }
});

ngModFilter.factory('ParentSpeed', function (pageMethods, $rootScope) {
    var suppdata = [];

    return function (CaseID, SupplierID, CPESuppliers, SelectedPortSpeed, ProductID, ParentProductID, RegionID, CountryID, SiteID) {
        
        pageMethods.GetParentSpeeds(CaseID, SupplierID, CPESuppliers, SelectedPortSpeed, ProductID, ParentProductID, function (data) {
            var tableData = "<table border='1'>";
            tableData = tableData + "<tr><td>Row Count</td><td><b>Port Speed</b></td><td><b>Port Speed Availability</b></td><td><b>Access Speed</b></td><td><b>Access Technology</b></td>  ";
            tableData = tableData + "<td><b>Supplier Product Name<br>/BT Internal SLA Information</b></td><td><b>Service Type</b></td><td><b>Access Speed Availability</b></td><td><b>Ordering Status</b></td>";
            tableData = tableData + "<td><b>Interface</b></td><td><b>Framing</b></td><td><b>Connector</b></td>";
            tableData = tableData + "</tr>"
            var rowcount = 1;
            data.forEach(function (item) {

                tableData = tableData + "<tr>";
                tableData = tableData + "<td>" + rowcount + "</td>";
                tableData = tableData + "<td>" + item.PortSpeeds + "</td><td>" + item.PortSpeedAvailability + "</td>";
                tableData = tableData + "<td>" + item.AccessSpeed + "  </td><td>" + item.AccessTechnology + "</td>";
                tableData = tableData + "<td>" + item.SupplierProductName + " <br> <a href='SLAInformation.asp?slaproduct=" + item.AccessSupplierNameID + "&speed=" + item.AccessSpeedCharID + "&speeduom=" + item.ASpeedUOM + "&sSupplier=" + item.AccessSupplierCharID + "&AccTypename=" + item.AccessProductTypeID + "'>" + item.SupplierProductName1 + "</a> </td>";
                tableData = tableData + "<td>" + item.ServiceType + "</td>";
                tableData = tableData + "<td>" + item.AccessSpeedAvailability + " </td>";
                tableData = tableData + "<td>" + "<a href='product/dispACCESSdetails.asp?Product=25&Region=" + RegionID + "&Country=" + CountryID + "&Site=0&ChosenSupplier=" + item.AccessSupplierCharID + "'>" + item.OrderingStatus + "</a> </td>";
                tableData = tableData + "<td>" + item.Interface + "</td><td>" + item.Framing + "  </td><td>" + item.Connecter + "</td>";
                tableData = tableData + "</tr>";
                rowcount = rowcount + 1;
            });
            tableData = tableData + "</table>";
            $("#tblParentSpeeds").html(tableData);
        });


    }
});

ngModFilter.factory('ChildPortSpeed', function (pageMethods, $rootScope) {
    var suppdata = [];

    return function (CaseID, SupplierID, CPESuppliers, SelectedPortSpeed, ProductID, RegionID, CountryID, SiteID) {

        pageMethods.GetChildPortSpeeds(CaseID, SupplierID, CPESuppliers, SelectedPortSpeed, ProductID, function (data) {
            var tableData = "<table border='1'>";
            tableData = tableData + "<tr><td>Row Count</td><td><b>Port Speed</b></td><td><b>Port Speed Availability</b></td><td><b>Access Speed</b></td><td><b>Access Technology</b></td>  ";
            tableData = tableData + "<td><b>Access Supplier Name <br>Supplier Product Name<br>/BT Internal SLA Information</b></td><td><b>Service Type</b></td><td><b>Access Speed Availability</b></td><td><b>Ordering Status</b></td>";
            tableData = tableData + "<td><b>Interface</b></td><td><b>Framing</b></td><td><b>Connector</b></td>";
            tableData = tableData + "</tr>"
            var rowcount = 1;
            data.forEach(function (item) {

                tableData = tableData + "<tr>";
                tableData = tableData + "<td>" + rowcount + "</td>";
                tableData = tableData + "<td>" + item.PortSpeeds + "</td><td>" + item.PortSpeedAvailability + "</td>";
                tableData = tableData + "<td>" + item.AccessSpeed + "  </td><td>" + item.AccessTechnology + "</td>";
                tableData = tableData + "<td>" + "<a href='SLAInformation.asp?slaproduct=" + item.AccessSupplierNameID + "&speed=" + item.AccessSpeedCharID + "&speeduom=" + item.ASpeedUOM + "&sSupplier=" + item.AccessSupplierCharID + "&AccTypename=" + item.AccessProductTypeID + "'>" + item.SupplierProductName1 + "</a> </td>";
                //tableData = tableData + "<td>" + item.SupplierProductName + " <br> "+ item.SupplierProductName1 + "</td>";
                //tableData = tableData + "<td>" + item.SupplierProductName1 + "</td>";
                tableData = tableData + "<td>" + item.ServiceType + "</td>";
                tableData = tableData + "<td>" + item.AccessSpeedAvailability + " </td>";
                tableData = tableData + "<td>" + "<a href='product/dispACCESSdetails.asp?Product=25&Region=" + RegionID + "&Country=" + CountryID + "&Site=0&ChosenSupplier=" + item.AccessSupplierCharID + "'>" + item.OrderingStatus + "</a> </td>";
                //tableData = tableData + "<td>" + item.OrderingStatus + "</td>";
                tableData = tableData + "<td>" + item.Interface + "</td><td>" + item.Framing + "  </td><td>" + item.Connecter + "</td>";
                tableData = tableData + "</tr>";
                rowcount = rowcount + 1;
            });
            tableData = tableData + "</table>";
            $("#tblChildPortSpeeds").html(tableData);
        });


    }
});

ngModFilter.factory('Characteristics', function (pageMethods, $rootScope) {

    return function (CaseID, OptionMatrix, CaseValidcd) {
        pageMethods.GetCharacteristics(CaseID, OptionMatrix, CaseValidcd, function (data) {

            var tableData = "<table>";
            data.forEach(function (item) {
                tableData = tableData + "<tr><td > <fieldset><legend><b>" + item.CharTypeAlias + "</b></legend><table >";
                item.chars.forEach(function (subitem) {
                    tableData = tableData + "<tr><td>" + subitem.CharName + " : </td><td>" + subitem.CharValue + "</td></tr>";
                });
                tableData = tableData + "</table></td></tr>";
            });

            $("#divChars").html(tableData);

        });
    }
});

ngModFilter.factory('DSLAccessSuupliers', function (pageMethods, $rootScope) {

    return function (RegionID, CountryID, ParentProductID, ProductID, CaseID, ParentCaseID, DSLSelectedPackage) {
        
       
        pageMethods.GetHVPNAccessSuppliers(RegionID, CountryID, ParentProductID, ProductID, CaseID, ParentCaseID, DSLSelectedPackage, function (data1) {
            $rootScope.HVPNAccessSuppliersData = [];
            AccessSuppliers = [];
            firstrec = 0;
            data1.forEach(function (item1) {
                if (firstrec == 0) {
                    $rootScope.DSLSupplierName = item1.AccessSupplier;
                    $rootScope.DSLAccessSupplierID = item1.AccessSupplierID;

                    pageMethods.GetDSLParentPortTypes(CountryID, CaseID, ParentCaseID, DSLSelectedPackage, ProductID, $rootScope.DSLAccessSupplierID, ParentProductID, function (data1) {
                        // Populating grid when Package dropdown is changed
                        var tableData = "<table border='1'>";
                        tableData = tableData + "<tr><td><b>DSL Package</b></td><td><b>DSL Type</b></td><td><b>Speed(Down / Up)</b></td><td><b>Interface</b></td><td><b>Framing Structure</b></td>  ";
                        tableData = tableData + "<td><b>Connector</b></td><td><b>Contention Ratio</b></td><td><b>Supplier</b></td><td><b>Supplier Product/SLA</b></td><td><b>Availability</b></td>";
                        tableData = tableData + "<td><b>Contracted Lead Time</b></td><td><b>Interconnect Design</b></td><td><b>End to End Lead Time(Contracted + Local Loop)</b></td><td><b>GPOP Interconnect</b></td>";
                        tableData = tableData + "<td><b>TIR Value</b></td><td><b>EF Supported Speeds</b></td><td><b>CPE</b></td>";
                        tableData = tableData + "</tr>"

                        data1.forEach(function (item1) {
                            tableData = tableData + "<tr>";
                            tableData = tableData + "<td>" + item1.PackageName + " </td><td>" + item1.DSLType + "</td><td>" + item1.DSLSpeed + "</td><td>" + item1.Interface + "</td><td>" + item1.FramingStructure + "</td><td>" + item1.Connector + "</td>";
                            tableData = tableData + "<td>" + item1.ContentionRatio + "</td><td>" + item1.Supplier + "</td><td>" + item1.SupplierProductSLA + "</td><td>" + item1.AvailableDesc + "</td>";
                            tableData = tableData + "<td>" + item1.ContractedLeadTime + "</td><td>" + item1.InterconnectDesign + "</td><td>" + item1.EndToEndLeadTime + "</td><td>" + item1.GPOP + "</td>";
                            tableData = tableData + "<td>" + item1.TIRValue + "</td><td>" + item1.EFSupportedSpeeds + "</td><td>" + item1.CPE + "</td>";
                            tableData = tableData + "</tr>";

                        });
                        tableData = tableData + "</table>";

                        $("#divDSLData").html(tableData);
                    });

                }
                AccessSuppliers.push({ supplierID: item1.AccessSupplierID, SupplierName: item1.AccessSupplier });
                firstrec = 1;
            });
            
            $rootScope.DSLAccessSuppliersData = AccessSuppliers;
            $rootScope.$apply();
        });
    }
});

ngModFilter.factory('DSLfactory', function (pageMethods, $rootScope) {

    return function (ProductID, ParentProductID, RegionID, CountryID) {

        pageMethods.GetPackages(RegionID, CountryID, ParentProductID, ProductID, "DSL", function (data) {

            $rootScope.DSLBTPackageData = [];
            PackageData = [];
            firstrec = 0;
            $rootScope.DSLCaseID = data.CaseID;
            $rootScope.DSLParentCaseID = data.ParentCaseID;
            $rootScope.RegionName = data.RegionName;
            $rootScope.CountryName = data.CountryName;
            data.package.forEach(function (item) {
                if (firstrec == 0) {
                    $rootScope.DSLSelectedPackage = item.PackageID;

                    pageMethods.GetHVPNAccessSuppliers(RegionID, CountryID, ParentProductID, ProductID, $rootScope.DSLCaseID, $rootScope.DSLParentCaseID, $rootScope.DSLSelectedPackage, function (data1) {
                        $rootScope.DSLAccessSuppliersData = [];
                        AccessSuppliers = [];
                        firstrec = 0;
                        data1.forEach(function (item1) {
                            if (firstrec == 0) {
                                $rootScope.DSLAccessSupplierName = item1.AccessSupplier;
                                $rootScope.DSLAccessSupplierID = item1.AccessSupplierID;

                                pageMethods.GetDSLParentPortTypes(CountryID, $rootScope.DSLCaseID, $rootScope.DSLParentCaseID, $rootScope.DSLSelectedPackage, ProductID, $rootScope.DSLAccessSupplierID, ParentProductID, function (data1) {

                                    var tableData = "<table border='1'>";
                                    tableData = tableData + "<tr><td><b>DSL Package</b></td><td><b>DSL Type</b></td><td><b>Speed(Down / Up)</b></td><td><b>Interface</b></td><td><b>Framing Structure</b></td>  ";
                                    tableData = tableData + "<td><b>Connector</b></td><td><b>Contention Ratio</b></td><td><b>Supplier</b></td><td><b>Supplier Product/SLA</b></td><td><b>Availability</b></td>";
                                    tableData = tableData + "<td><b>Contracted Lead Time</b></td><td><b>Interconnect Design</b></td><td><b>End to End Lead Time(Contracted + Local Loop)</b></td><td><b>GPOP Interconnect</b></td>";
                                    tableData = tableData + "<td><b>TIR Value</b></td><td><b>EF Supported Speeds</b></td><td><b>CPE</b></td>";
                                    tableData = tableData + "</tr>"

                                    data1.forEach(function (item1) {
                                        tableData = tableData + "<tr>";
                                        tableData = tableData + "<td>" + item1.PackageName + " </td><td>" + item1.DSLType + "</td><td>" + item1.DSLSpeed + "</td><td>" + item1.Interface + "</td><td>" + item1.FramingStructure + "</td><td>" + item1.Connector + "</td>";
                                        tableData = tableData + "<td>" + item1.ContentionRatio + "</td><td>" + item1.Supplier + "</td><td>" + item1.SupplierProductSLA + "</td><td>" + item1.AvailableDesc + "</td>";
                                        tableData = tableData + "<td>" + item1.ContractedLeadTime + "</td><td>" + item1.InterconnectDesign + "</td><td>" + item1.EndToEndLeadTime + "</td><td>" + item1.GPOP + "</td>";
                                        tableData = tableData + "<td>" + item1.TIRValue + "</td><td>" + item1.EFSupportedSpeeds + "</td><td>" + item1.CPE + "</td>";
                                        tableData = tableData + "</tr>";

                                    });
                                    tableData = tableData + "</table>";

                                    $("#divDSLData").html(tableData);
                                });

                            }
                            AccessSuppliers.push({ supplierID: item1.AccessSupplierID, SupplierName: item1.AccessSupplier });
                            firstrec = 1;
                        });

                        $rootScope.DSLAccessSuppliersData = AccessSuppliers;
                        $rootScope.DSLAccessSupplier = $rootScope.DSLAccessSupplierID;
                    });

                }
                PackageData.push({ PackageID: item.PackageID, PackageName: item.PackageName });
                firstrec = 1;
            });

            $rootScope.DSLBTPackageData = PackageData;
            $rootScope.$apply();
            $rootScope.DSLBTPackage = $rootScope.DSLSelectedPackage;

        });
    }
});


ngModFilter.factory('HVPNGetPortSpeeds', function (pageMethods, $rootScope) {

    return function (RegionID, CountryID, ParentProductID, ProductID, CaseID, ParentCaseID, HVPNSelectedPackage, HVPNSupplierName, HVPNAccessSupplierID) {

        HVPNPortSpeed = '';
        HVPNPortSpeedID = 0;
        
        pageMethods.GetHVPNPortSpeeds(CountryID, CaseID, ParentCaseID, HVPNSelectedPackage, function (data1) {
            $rootScope.HVPNPortSpeedData = [];
            PortSpeedData = [];
            firstrec = 0;
            
            data1.forEach(function (item1) {
                if (firstrec == 0) {
                    HVPNPortSpeed = item1.PortSpeed;
                    HVPNPortSpeedID = item1.PortSpeedID;

                    pageMethods.GetHVPNParentPortTypes(CountryID, CaseID, ParentCaseID, HVPNSelectedPackage, ProductID, HVPNSupplierName, HVPNAccessSupplierID, HVPNPortSpeedID, HVPNPortSpeed,ParentProductID, function (data) {
                        $rootScope.HVPNPortTypeData = data;
                        $rootScope.$apply();
                    });

                }
                PortSpeedData.push({ PortSpeedID: item1.PortSpeedID, PortSpeed: item1.PortSpeed });
                firstrec = 1;
            });
            $rootScope.HVPNPortSpeedData = PortSpeedData;
            $rootScope.$apply();
        });
        
        
    }
});

ngModFilter.factory('HVPNfactory', function (pageMethods, $rootScope) {

    return function (ProductID, ParentProductID, RegionID, CountryID) {

        pageMethods.GetPackages(RegionID, CountryID, ParentProductID, ProductID, "HVPN", function (data) {

            $rootScope.BTPackageData = [];
            PackageData = [];
            firstrec = 0;
            $rootScope.HVPNCaseID = data.CaseID;
            $rootScope.HVPNParentCaseID = data.ParentCaseID;
            $rootScope.RegionName = data.RegionName;
            $rootScope.CountryName = data.CountryName;
            data.package.forEach(function (item) {
                if (firstrec == 0) {
                    $rootScope.SelectedPackage = item.PackageID;
                }
                PackageData.push({ PackageID: item.PackageID, PackageName: item.PackageName });
                firstrec = 1;
            });

            $rootScope.BTPackageData = PackageData;
            $rootScope.$apply();

            pageMethods.GetHVPNAccessSuppliers(RegionID, CountryID, ParentProductID, ProductID, $rootScope.HVPNCaseID, $rootScope.HVPNParentCaseID, $rootScope.SelectedPackage, function (data1) {
                $rootScope.HVPNAccessSuppliersData = [];
                AccessSuppliers = [];
                firstrec = 0;
                data1.forEach(function (item1) {
                    if (firstrec == 0) {
                        $rootScope.HVPNAccessSupplierName = item1.AccessSupplier;
                        $rootScope.HVPNAccessSupplierID = item1.AccessSupplierID;


                        pageMethods.GetHVPNPortSpeeds(CountryID, $rootScope.HVPNCaseID, $rootScope.HVPNParentCaseID, $rootScope.SelectedPackage, function (data1) {
                            $rootScope.HVPNPortSpeedData = [];
                            PortSpeedData = [];
                            firstrec = 0;
                            data1.forEach(function (item1) {
                                if (firstrec == 0) {
                                    $rootScope.HVPNPortSpeed = item1.PortSpeed;
                                    $rootScope.HVPNPortSpeedID = item1.PortSpeedID;
                                    pageMethods.GetHVPNParentPortTypes(CountryID, $rootScope.HVPNCaseID, $rootScope.HVPNParentCaseID, $rootScope.SelectedPackage, ProductID, $rootScope.HVPNAccessSupplierName, $rootScope.HVPNAccessSupplierID, $rootScope.HVPNPortSpeedID, $rootScope.HVPNPortSpeed,ParentProductID, function (data) {
                                        $rootScope.HVPNPortTypeData = data;
                                        $rootScope.$apply();
                                        $("#tblHVPNData").show();
                                    });
                                }
                                PortSpeedData.push({ PortSpeedID: item1.PortSpeedID, PortSpeed: item1.PortSpeed });
                                firstrec = 1;
                            });

                            $rootScope.HVPNPortSpeedData = PortSpeedData;
                            $rootScope.$apply();
                        });

                    }
                    AccessSuppliers.push({ supplierID: item1.AccessSupplierID, SupplierName: item1.AccessSupplier });
                    firstrec = 1;
                });

                $rootScope.HVPNAccessSuppliersData = AccessSuppliers;
                $rootScope.$apply();
            });


            pageMethods.GenerateTunnelingNote($rootScope.CountryName, function (data1) {
                $rootScope.TunnelingNote = data1;
            });

            pageMethods.GetBundleProducts(CountryID, ProductID, function (data1) {
                $rootScope.BundleProductsData = [];
                BundleProducts = [];

                data1.forEach(function (item1) {
                    BundleProducts.push({ AccessTechnology: item1.AccessTechnology, ExpectedDate: item1.ExpectedDate, QuotableStartDate: item1.QuotableStartDate, EOS: item1.EOS, EOQ: item1.EOQ, EOL: item1.EOL, SmartServiceAvailability: item1.SmartServiceAvailability, Router: item1.Router });
                });

                var tableData = "<table border='1'>";
                tableData = tableData + "<tr><td><b>Router</b></td><td><b>Access Technology</b></td><td><b>Bundle</b></td><td><b>Expected Date for ORDER</b></td><td><b>Quotable Start Date</b></td>  ";
                tableData = tableData + "<td><b>EOQ</b></td><td><b>EOL</b></td><td><b>EOS</b></td><td><b>SmartServiceAvailability</b></td>";
                tableData = tableData + "</tr>"

                data1.forEach(function (item1) {

                    tableData = tableData + "<tr>";
                    tableData = tableData + "<td>" + item1.Router + " </td>";
                    tableData = tableData + "<td>" + item1.AccessTechnology + "</td>";
                    tableData = tableData + "<td>" + item1.Bundle + " <a href='DispCPE_Dsl_Parts.asp?LLevel=" + 0 + "&bundle=" + item1.BundleID + "&country=" + CountryID + "'>Parts</a> </td>";
                    tableData = tableData + "<td>" + item1.ExpectedDate + "</td>";
                    tableData = tableData + "<td>" + item1.QuotableStartDate + "  </td><td>" + item1.EOQ + "</td>";

                    //tableData = tableData + "<td>" + item.SupplierProductName + " <br> "+ item.SupplierProductName1 + "</td>";
                    //tableData = tableData + "<td>" + item.SupplierProductName1 + "</td>";
                    tableData = tableData + "<td>" + item1.EOL + "</td>";
                    tableData = tableData + "<td>" + item1.EOS + " </td>";
                    //tableData = tableData + "<td>" + "<a href='product/dispACCESSdetails.asp?Product=25&Region=" + RegionID + "&Country=" + CountryID + "&Site=0&ChosenSupplier=" + item.AccessSupplierCharID + "'>" + item.OrderingStatus + "</a> </td>";
                    //tableData = tableData + "<td>" + item.OrderingStatus + "</td>";
                    tableData = tableData + "<td>" + item1.SmartServiceAvailability + "</td>";
                    tableData = tableData + "</tr>";

                });
                tableData = tableData + "</table>";

                $("#divBundleProducts").html(tableData);

            });



        });
    }
});

ngModFilter.controller('ngHVPNCntrl', function ($rootScope, $scope, HVPNfactory, HVPNGetPortSpeeds) {

    $scope.$on('GetHVPNInfo', function (event, obj) {

        if ($scope.HVPNLoaded == "0") {

            HVPNfactory(obj.ProductID, obj.ParentProductID, obj.RegionID, obj.CountryID);
            $scope.ProductID = obj.ProductID;
            $scope.ParentProductID = obj.ParentProductID;
            $scope.RegionID = obj.RegionID;
            $scope.CountryID = obj.CountryID;
        }
        $("#tblHVPNData").show();
    })

    $scope.GetPortSpeedData = function () {
        
        var accSuppID = $scope.HVPNAccessSupplier;
        var accSuppName = $("#ddlhvpnAccSupplier option:selected").html();
        HVPNGetPortSpeeds($scope.RegionID, $scope.CountryID, $scope.ParentProductID, $scope.ProductID, $rootScope.HVPNCaseID, $rootScope.HVPNParentCaseID, $rootScope.SelectedPackage, accSuppName, $scope.HVPNAccessSupplier);
    }

});

ngModFilter.controller('ngDSLCntrl', function ($rootScope, $scope, DSLfactory, DSLAccessSuupliers) {

    $scope.$on('GetDSLInfo', function (event, obj) {
        DSLfactory(obj.ProductID, obj.ParentProductID, obj.RegionID, obj.CountryID);
        $scope.ProductID = obj.ProductID;
        $scope.ParentProductID = obj.ParentProductID;
        $scope.RegionID = obj.RegionID;
        $scope.CountryID = obj.CountryID;
    });

    $scope.GetDSLAccessSuppliers = function () {
        DSLAccessSuupliers($scope.RegionID, $scope.CountryID, $scope.ParentProductID, $scope.ProductID, $rootScope.DSLCaseID, $rootScope.DSLParentCaseID, $scope.DSLBTPackage);
    }

});

ngModFilter.controller('ngFilterCtrl', function ($rootScope, $scope, Products, Regions, Countries, StateProvince, Cities, Pops, ProductDetails, PopChars, Characteristics, CPESupplierList, ParentSpeed, ChildPortSpeed, Speedsfctry) {

    $scope.modproduct = 0;
    $scope.modregion = 0;
    $scope.modcountry = 0;
    $rootScope.HVPNLoaded = 0;
    Products($scope.modcountry);
    Regions($scope.modproduct);

    Countries($scope.modproduct, $scope.modregion);
    Speedsfctry();
    $scope.GetHVPNData = function () {

        $("#divEthernet").hide();
        $("#tblMenu").show();
        $("#divHVPN").show();
        $("#divDSL").hide();
        $("#divvsat").hide();
        $scope.$broadcast('GetHVPNInfo', { ProductID: $scope.modproduct, ParentProductID: $rootScope.ParentProductID, RegionID: $scope.modregion, CountryID: $scope.modcountry });
        $rootScope.HVPNLoaded = "1";
        //BTPackages($rootScope.CaseID, $scope.modproduct, $rootScope.ParentProductID, $scope.modregion, $scope.modcountry);
    }


    $scope.GetDSLData = function () {

        $("#divEthernet").hide();
        $("#tblMenu").show();
        $("#divHVPN").hide();
        $("#divDSL").show();
        $("#divvsat").hide();
        $scope.$broadcast('GetDSLInfo', { ProductID: $scope.modproduct, ParentProductID: $rootScope.ParentProductID, RegionID: $scope.modregion, CountryID: $scope.modcountry });
    }

    $scope.GetVSATData = function () {


        $("#divEthernet").hide();
        $("#tblMenu").show();
        $("#divDSL").hide();
        $("#divHVPN").hide();
        $("#divvsat").show();

        $scope.$broadcast('GetVSATInfo', { ProductID: $scope.modproduct, RegionID: $scope.modregion, CountryID: $scope.modcountry, ParentProductID: $rootScope.ParentProductID });
    }

    $scope.GetRegions = function (ProductID) {
        Regions(ProductID);

    }
    $scope.GetCountries = function (ProductID, Region) {
        Countries(ProductID, Region);
        
    }

    $scope.GetRegionCountries = function (ProductID, RegionID) {
        Regions(ProductID);
        Countries(ProductID, RegionID);

    }


    $scope.GetProducts = function (Country) {

        Products(Country);

    }

    $scope.GetStates = function (ProductID, Region, Country) {
        StateProvince(ProductID, Region, Country);

    }

    $scope.GetCities = function (ProductID, Region, Country, state) {
        Cities(ProductID, Region, Country, state, "0");


    }

    $scope.GetCities1 = function (ProductID, Region, Country, state) {
        
        Cities(ProductID, Region, Country, state, "1");

    }

    $scope.GetCities2 = function (ProductID, Region, Country, state) {
        
        Cities(ProductID, Region, Country, state, "2");

    }
    $scope.GetPops = function (Product, Region, Country, State, City) {

        Pops(Product, Region, Country, State, City);

    }

   

    $scope.SearchCaseDetails = function () {

        $scope.GetStates($scope.modproduct, $scope.modregion, $scope.modcountry);
        $scope.GetCities($scope.modproduct, $scope.modregion, $scope.modcountry, 0);
        $scope.GetPops($scope.modproduct, $scope.modregion, $scope.modcountry, 0, 0);
        $scope.GetProducts($scope.modcountry)
    }

    $scope.GetCaseDetails = function () {
        $("#tblMenu").show();
        $("#divEthernet").show();
        $("#divHVPN").hide();
        //CPESupplierList($scope.modcountry, $scope.modproduct, $scope.modCity);
        ProductDetails(4, -1, 1, $scope.modproduct, $scope.modregion, $scope.modcountry, $scope.modstate, $scope.modCity, $scope.modPoP, 1);
        PopChars($scope.modPoP, $scope.modproduct, 1);
    }

    $scope.GetEthernetData = function () {
        $("#divEthernet").show();
        $("#divHVPN").hide();
        $("#tblMenu").show();
        $("#divDSL").hide();
        $("#divHVPN").hide();
        $("#divvsat").hide();
    }



    $scope.GeParentSpeeds = function () {

        var SelectedPortSpeedData = $scope.ParentPortSpeed.join();
        ParentSpeed($rootScope.CaseID, $scope.ParentAccessSupplier, $scope.CPESuppliers, SelectedPortSpeedData, $scope.modproduct, $rootScope.ParentProductID, $scope.modregion, $scope.modcountry, 0);
    }

    $scope.GetChildPortSpeeds = function () {

        var SelectedPortSpeedData = $scope.ChildPortSpeedData.join();
        ChildPortSpeed($rootScope.CaseID, $scope.ChildAccessSupplier, 0, SelectedPortSpeedData, $scope.modproduct, $scope.modregion, $scope.modcountry, 0);
    }

    $scope.openCpeInformationpopup = function () {

        var url = "CPEBundleDetails.aspx";
        var q1 = "?productid=" + $scope.modproduct;
        var q2 = "&countryid=" + $scope.modcountry;
        var q3 = "&cityid=" + $scope.modCity;

        url = url + q1 + q2 + q3;

        var iframehtml = '<iframe border=0 width="100%" height ="100%" frameborder="0" src="' + url + '"> </iframe>'
        console.log(iframehtml);
        $("div.modal-body").html(iframehtml);
    }
});


ngModFilter.controller('ngVSATCntrl', function ($rootScope, $scope, VSATfactory, VSATAttributes) {

    $scope.$on('GetVSATInfo', function (event, obj) {

        VSATfactory(22861, obj.RegionID, obj.CountryID, obj.ProductID, obj.ParentProductID);
        $scope.ProductID = obj.ProductID;
        $scope.ParentProductID = obj.ParentProductID;
        $scope.RegionID = obj.RegionID;
        $scope.CountryID = obj.CountryID;
        $scope.PackageID = 22861;
    });

    $scope.GetVSATAttributes = function () {

        var PortSpeedID = $scope.VSATPortSpeed;
        var PortSpeed = $("#ddlVSATPortSpeed option:selected").html();

        VSATAttributes(22861, $scope.RegionID, $scope.CountryID, $scope.ProductID, $scope.ParentProductID, $rootScope.VSATCaseID, $scope.VSATAccessSupplier, PortSpeedID, $rootScope.VSATParentCaseID, PortSpeed, function (data) {
            $rootScope.VSATPortSpeedTypeData = data;
            $rootScope.$apply();
        });
    }

});

ngModFilter.factory('VSATAttributes', function (pageMethods, $rootScope) {

    return function (PackageID, RegionID, CountryID, ProductID, ParentProductID, CaseID, AccessSupplierID, PortSpeedID, ParentCaseID, PortSpeed) {

        pageMethods.GetVSATAttrCursor(CaseID, AccessSupplierID, PortSpeedID, CountryID, 22861, ParentCaseID, ProductID, PortSpeed,ParentProductID, function (data) {
            $rootScope.VSATPortSpeedTypeData = data;
            $rootScope.$apply();
        });

    }

});

ngModFilter.factory('VSATfactory', function (pageMethods, $rootScope) {

    return function (PackageID, RegionID, CountryID, ProductID, ParentProductID) {

        pageMethods.GetPackages(RegionID, CountryID, ParentProductID, ProductID, "VSAT", function (data) {

            firstrec = 0;
            $rootScope.VSATCaseID = data.CaseID;
            $rootScope.VSATParentCaseID = data.ParentCaseID;
            $rootScope.RegionName = data.RegionName;
            $rootScope.CountryName = data.CountryName;

            pageMethods.GetVSATAccessSuppliers(PackageID, RegionID, CountryID, ProductID, ParentProductID, $rootScope.VSATCaseID, $rootScope.VSATParentCaseID, function (data1) {
                $rootScope.VSATAccessSuppliersData = [];
                AccessSuppliers = [];
                firstAccSupprec = 0;
                firstrec = 0;

                data1.forEach(function (item1) {
                    if (firstAccSupprec == 0) {
                        $rootScope.VSATAccessSupplierName = item1.VSATAccessSupplier;
                        $rootScope.VSATAccessSupplierID = item1.VSATAccessSupplierID;

                        pageMethods.GetHVPNPortSpeeds(CountryID, $rootScope.VSATCaseID, $rootScope.VSATParentCaseID, 22861, function (data) {
                            $rootScope.VSATPortSpeedData = [];
                            PortSpeed = [];
                            firstrec = 0;

                            data.forEach(function (item) {
                                if (firstrec == 0) {
                                    $rootScope.PortSpeed = item.PortSpeed;
                                    $rootScope.PortSpeedID = item.PortSpeedID;


                                    pageMethods.GetVSATAttrCursor($rootScope.VSATCaseID, $rootScope.VSATAccessSupplierID, $rootScope.PortSpeedID, CountryID, 22861, $rootScope.VSATParentCaseID, ProductID, $rootScope.PortSpeed, ParentProductID, function (data) {
                                        $rootScope.VSATPortSpeedTypeData = data;
                                        $rootScope.$apply();
                                    });
                                }
                                PortSpeed.push({ PortSpeedID: item.PortSpeedID, PortSpeed: item.PortSpeed });
                                firstrec = 1;
                            });

                            $rootScope.VSATPortSpeedData = PortSpeed;
                            $rootScope.$apply();
                        });

                    }
                    AccessSuppliers.push({ VSATAccessSupplierID: item1.VSATAccessSupplierID, VSATAccessSupplier: item1.VSATAccessSupplier });
                    firstAccSupprec = 1;
                });

                $rootScope.VSATAccessSuppliersData = AccessSuppliers;
                $rootScope.VSATAccessSupplier = $rootScope.VSATAccessSupplierID;
                $rootScope.$apply();
            });


        });


    }



});


      