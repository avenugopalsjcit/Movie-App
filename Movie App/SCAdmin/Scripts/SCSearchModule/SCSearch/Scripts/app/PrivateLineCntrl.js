app.controller("PrivateLineCntrl", function ($scope, $sce, Speedsfactory, glbProductID, glbCountryID, glbSpeed, glbRegionID, glbCity1, glbCity2, glbCountry1, glbCountry2, PrivateLineGeneralfactory, PrivateLineCarriers, glbSubProduct1ID, glbSubProduct2ID, PrivateLineCharacteristics, PrivateLineCountryName, PrivateAccessInformation, UserInfofactory, GetDoclinksFactory, PrivateLineCountryCity, PrivateCasesAccessInformation, SLAinfoparam, $modal,DispAccDet,glbRegionID,glbPOPID,glbCityID) {


    Speedsfactory.GetSpeedInfo();
    $scope.modPrivateLineSpeed = glbSpeed.getSpeed();

    $scope.modPrivateLineSpeed = glbSpeed.getSpeed();
    
    $scope.PrivateLineSpeedName=glbSpeed.getSpeedName();

    $scope.Country1Name = glbCountry1.getCountryName();
    $scope.Country2Name = glbCountry2.getCountryName();
    //glbCountry2.getCountryID();

    $scope.NoData=0;

    $scope.City1Name = glbCity1.getCityName();
    $scope.City2Name = glbCity2.getCityName();


    glbCountry1.setOrgCountryID(glbCountry1.getCountryID());
    glbCountry2.setOrgCountryID(glbCountry2.getCountryID());

    $scope.Country1 = glbCountry1.getOrgCountryID();
    $scope.Country2 = glbCountry2.getOrgCountryID();
   

    glbCity1.setOrgCity(glbCity1.getCity());
    glbCity2.setOrgCity(glbCity2.getCity());

    $scope.City1=glbCity1.getOrgCity();
    $scope.City2=glbCity2.getOrgCity();

    $scope.Product = glbProductID.getProductID();

    var PrioritySelected = 1;

    $scope.HubPart = 1;
    $(".pageLoaderOverlay").show();


     $scope.$watchCollection('Carrier1Data', function () {
        $scope.Carrier1 = [];
        if (!angular.isUndefined($scope.Carrier1Data)) {
            
            if ($scope.Carrier1Data.length > 1) {
                $scope.Carrier1.push($scope.Carrier1Data[0].CarrierID);
            }
        }
    });

    $scope.$watchCollection('Carrier2Data', function () {
        $scope.Carrier2 = [];
        if (!angular.isUndefined($scope.Carrier2Data)) {
            if ($scope.Carrier2Data.length > 1) {
                $scope.Carrier2.push($scope.Carrier2Data[0].CarrierID);
            }
        }
    });

    PrivateLineGeneralfactory.GetGeneralInfo(PrioritySelected, glbProductID.getProductID(), glbCountry1.getCountryID(), glbCountry2.getCountryID(), glbCity1.getCity(), glbCity2.getCity(), $scope.modPrivateLineSpeed).success(function (data) {

        $scope.ProductCode = data.d.ProductCode;
        $scope.ProductPricing = data.d.ProductPricing;
        $scope.PriorityData = data.d.ProductPriority;

        

        glbSubProduct1ID.setSubProductID(data.d.SubProduct1);
        if (data.d.SubProduct2 == 0) {
            glbSubProduct2ID.setSubProductID(data.d.SubProduct1);
        }
        else {
            glbSubProduct2ID.setSubProductID(data.d.SubProduct2);
        }

        
        if ($scope.Product == 58) {

        
            PrivateLineCountryCity.GetCountryCityIds(PrioritySelected, glbProductID.getProductID(), glbCountry1.getOrgCountryID(), glbCountry2.getOrgCountryID(), glbCity1.getOrgCity(), glbCity2.getOrgCity(), $scope.modPrivateLineSpeed, $scope.HubPart).success(function (data) {
                
                glbCountry1.setCountryID(data.d.Country1);
                glbCountry2.setCountryID(data.d.Country2);
                glbCity1.setCity(data.d.City1);
                glbCity2.setCity(data.d.City2);

                $scope.isHubbing = data.d.Hubbing;
                $scope.IgnoreHubbing=data.d.IgnoreHubbing;
                $scope.ProductPricing = data.d.ProductPricing;
                
                if($scope.isHubbing==1)
                {
                    if($scope.HubPart == 1)
                    {

                         var message
							message = 'Dear User, \n\n';
							message = message + 'This route will be hubbed via the UK.\n\n';
							message = message + 'If a SPECIAL BID CODE appears in either part of the hubbing\n';
							message = message + 'solution, please submit your request to your bid manager.\n\n';
							message = message + 'After you click OK, the first part of the hubbing solution will\n';
							message = message + 'be displayed. Make sure you click the link "Hubbing solution part 2" to\n';
							message = message + 'view the details pertaining to the second part of this UK hubbing solution.';

                        
							alert(message);
                    }
                    else {

                    var message
							message = 'Dear User, \n\n';
							message = message + 'This route will be hubbed via the UK.\n\n';
							message = message + 'If a SPECIAL BID CODE appears in either part of the hubbing\n';
							message = message + 'solution, please submit your request to your bid manager.\n\n';
							message = message + 'After you click OK, the second part of the hubbing solution will\n';
							message = message + 'be displayed. Make sure you click the link "Hubbing solution part 1" to\n';
							message = message + 'view the details pertaining to the first part of this UK hubbing solution.';
                       
							alert(message);
                    }
                }

                
                
                if ($scope.HubPart == 1) {
                    $scope.HubPartHeading = "Hubbing Part1";
                    //
                    $scope.GetCarriers(glbProductID.getProductID(), glbCountry1.getCountryID(), glbCity1.getCity(), glbCountry2.getCountryID(), glbCity2.getCity(), glbSubProduct1ID.getSubProductID(), glbSubProduct2ID.getSubProductID(), glbSpeed.getSpeed(), 1,$scope.IgnoreHubbing);
                    PrivateLineCountryName.GetCountryName(glbCountry1.getCountryID(), glbCity1.getCity()).success(function (data) {

                        $scope.Country1Name = data.d.CountryName;
                        $scope.City1Name = data.d.CityName;
                    });
                    PrivateLineCountryName.GetCountryName(glbCountry2.getCountryID(), glbCity2.getCity()).success(function (data) {

                        $scope.Country2Name = data.d.CountryName;
                        $scope.City2Name = data.d.CityName;
                    });
                }
                else {
                    $scope.HubPartHeading = "Hubbing Part2";
                    $scope.GetCarriers(glbProductID.getProductID(), glbCountry1.getCountryID(), glbCity1.getCity(), glbCountry2.getCountryID(), glbCity2.getCity(), glbSubProduct1ID.getSubProductID(), glbSpeed.getSpeed(), 2,$scope.IgnoreHubbing);
                    PrivateLineCountryName.GetCountryName(glbCountry2.getCountryID(), glbCity2.getCity()).success(function (data) {

                        $scope.Country2Name = data.d.CountryName;
                        $scope.City2Name = data.d.CityName;
                    });
                    PrivateLineCountryName.GetCountryName(glbCountry1.getCountryID(), glbCity1.getCity()).success(function (data) {

                        $scope.Country1Name = data.d.CountryName;
                        $scope.City1Name = data.d.CityName;
                    });
                }


            });
        }
        else {
            
            //$scope.GetCarriers(glbProductID.getProductID(), glbCountry1.getCountryID(), glbCity1.getCity(), glbCountry2.getCountryID(), glbCity2.getCity(), glbSubProduct1ID.getSubProductID(), glbSubProduct2ID.getSubProductID(), glbSpeed.getSpeed(), 1);
            PrivateLineCharacteristics.GetCharacteristics($scope.HubPart, glbProductID.getProductID(), glbCountry1.getCountryID(), glbCountry2.getCountryID(), glbCity1.getCity(), glbCity2.getCity(), glbSubProduct1ID.getSubProductID(), glbSubProduct2ID.getSubProductID(), glbSpeed.getSpeed(), 0, 0, 0).success(function (data2) {
                
                $scope.TableDataExist = 0;
                $scope.isHubbing = 0;
                $scope.tblCharacteristics = data2.d;
                $scope.EstimatedLeadTime = data2.d[0].SLTime.EstimatedLeadTime;
                $scope.CaseID1 = data2.d[0].SLTime.CaseID1;
                $scope.CaseID2 = data2.d[0].SLTime.CaseID2;

                
                UserInfofactory.GetUserInfo($scope.CaseID1, 'CSU_CASE_DETAILS').success(function (data111) {

                    $scope.CreatedBy1 = data111.d.CreatedBy;
                    $scope.CreatedDate1 = data111.d.CreatedDate;
                    $scope.UpdatedBy1 = data111.d.UpdatedBy;
                    $scope.UpdatedDate1 = data111.d.UpdatedDate;
                });

                UserInfofactory.GetUserInfo($scope.CaseID2, 'CSU_CASE_DETAILS').success(function (data23) {

                    $scope.CreatedBy2 = data23.d.CreatedBy;
                    $scope.CreatedDate2 = data23.d.CreatedDate;
                    $scope.UpdatedBy2 = data23.d.UpdatedBy;
                    $scope.UpdatedDate2 = data23.d.UpdatedDate;
                });
                var Access1 = 0;
                var Access2 = 0;
                var EstimatedLeadTime1 = 0;
                var EstimatedLeadTime2 = 0;
                var Access1DataExist=0,Access2DataExist=0;
                PrivateCasesAccessInformation.GetCasesAccessInformation($scope.modPrivateLineSpeed, glbCountry1.getCountryID(), glbProductID.getProductID(), 0, glbCity1.getCity(), glbSubProduct1ID.getSubProductID()).success(function (data) {
                     
                //PrivateAccessInformation.GetAccessInformation($scope.CaseID1, $scope.modPrivateLineSpeed, glbCountry1.getCountryID(), glbProductID.getProductID()).success(function (data) {
                    
                    if(data.d.length>0)
                    {
                        Access1DataExist=1;
                        $scope.AccessInformation1 = data.d;
                        EstimatedLeadTime1 = data.d[0].EstimatedLeadTime;
                        if (EstimatedLeadTime1 > EstimatedLeadTime2) {
                            $scope.EstimatedLeadTime = EstimatedLeadTime1;
                        }
                        else {
                            $scope.EstimatedLeadTime = EstimatedLeadTime2;
                        }

                        if(data.d.length==1)
                        {
                          $("#tblAccessInformation1").attr("style","height:230px");
                        }
                        if(data.d.length==2)
                        {
                          $("#tblAccessInformation1").attr("style","height:280px");
                        }
                        if(data.d.length==3)
                        {
                          $("#tblAccessInformation1").attr("style","height:335px");
                        }
                        if(data.d.length==4)
                        {
                          $("#tblAccessInformation1").attr("style","height:380px");
                        }
                        if(data.d.length==5)
                        {
                          $("#tblAccessInformation1").attr("style","height:440px");
                        }
                        if(data.d.length==6)
                        {
                          $("#tblAccessInformation1").attr("style","height:490px");
                        }
                        if(data.d.length==7)
                        {
                          $("#tblAccessInformation1").attr("style","height:540px");
                        }
                        if(data.d.length==8)
                        {
                          $("#tblAccessInformation1").attr("style","height:590px");
                        }
                        if(data.d.length==9)
                        {
                          $("#tblAccessInformation1").attr("style","height:640px");
                        }
                        if(data.d.length>9)
                        {
                          $("#tblAccessInformation1").attr("style","height:690px");
                        }           
                    }
                    else {
                        $("#tblAccessInformation1").hide();
                        $("#tblAccessInformationHeading1").hide();
                        Access1DataExist=0;
                    }

                    Access1 = 1;
                    if (Access1 == 1 && Access2 == 1) {
                    
                        if(Access2DataExist==0 && Access1DataExist==0)
                        {
                            $scope.TableDataExist = 0;
                        }
                        else {
                            $scope.TableDataExist = 1;
                        }
                        $(".pageLoaderOverlay").hide();
                    }

                });
                
                //PrivateAccessInformation.GetAccessInformation($scope.CaseID2, $scope.modPrivateLineSpeed, glbCountry2.getCountryID(), glbProductID.getProductID()).success(function (data) {
                PrivateCasesAccessInformation.GetCasesAccessInformation($scope.modPrivateLineSpeed, glbCountry2.getCountryID(), glbProductID.getProductID(), 0, glbCity2.getCity(), glbSubProduct2ID.getSubProductID()).success(function (data) {
                
                    $scope.AccessInformation2 = data.d;
                    Access2 = 1;
                    
                    if(data.d.length>0)
                    {
                        Access2DataExist=1;
                        EstimatedLeadTime2 = data.d[0].EstimatedLeadTime;
                        if (EstimatedLeadTime1 > EstimatedLeadTime2) {
                            $scope.EstimatedLeadTime = EstimatedLeadTime1;
                        }
                        else {
                            $scope.EstimatedLeadTime = EstimatedLeadTime2;
                        }
                        
                        if(data.d.length==1)
                        {
                          $("#tblAccessInformation2").attr("style","height:230px");
                        }
                        if(data.d.length==2)
                        {
                          $("#tblAccessInformation2").attr("style","height:280px");
                        }
                        if(data.d.length==3)
                        {
                          $("#tblAccessInformation2").attr("style","height:335px");
                        }
                        if(data.d.length==4)
                        {
                          $("#tblAccessInformation2").attr("style","height:380px");
                        }
                        if(data.d.length==5)
                        {
                          $("#tblAccessInformation2").attr("style","height:440px");
                        }
                        if(data.d.length==6)
                        {
                          $("#tblAccessInformation2").attr("style","height:490px");
                        }
                        if(data.d.length==7)
                        {
                          $("#tblAccessInformation2").attr("style","height:540px");
                        }
                        if(data.d.length==8)
                        {
                          $("#tblAccessInformation2").attr("style","height:590px");
                        }
                        if(data.d.length==9)
                        {
                          $("#tblAccessInformation2").attr("style","height:640px");
                        }
                        if(data.d.length>9)
                        {
                          $("#tblAccessInformation2").attr("style","height:690px");
                        }
                    }
                    else {
                        $("#tblAccessInformation2").hide();
                        $("#tblAccessInformationHeading2").hide();
                        Access2DataExist=0;
                    }

                    if (Access1 == 1 && Access2 == 1) {
                        
                        if(Access2DataExist==0 && Access1DataExist==0)
                        {
                            $scope.TableDataExist = 0;
                        }
                        else {
                            $scope.TableDataExist = 1;
                        }
                        $(".pageLoaderOverlay").hide();
                    }
                });

                //AccessInformation1
            });
        }
        var firstrec = 0;
        cityID = 0;
        data.d.ProductPriority.forEach(function (item) {
            if (firstrec == 0) {
                $scope.productPriority = item;
            }
            firstrec = 1;
        });


        GetDoclinksFactory.getDoc(glbProductID.getProductID()).success(function (data) {

            if (data.d.length == 0) {
                $scope.ShowPrivateLineDocLinks = 0;
            }
            else {
                $scope.ShowPrivateLineDocLinks = 1;

                $scope.DocumentslinksData = [];
                ProductsDocLinks = [];

                data.d.forEach(function (item) {

                    ProductsDocLinks.push({ DocumentTitle: item.DocumentTitle, DocumentUrl: item.DocumentUrl });

                });

                $scope.DocumentslinksData = ProductsDocLinks;
            }

        });
    });


    $scope.to_trusted = function (data) {

        return $sce.trustAsHtml(data);
    };

    $scope.openSLAPopup = function (AccSuppNameId, supplier, supplierproduct, AccessSupplierCharID, AccessProductTypeID, 
    AccessSpeedCharID, ASpeedUOM,CountryID,AccessSpeed) {
        
        
        if(supplierproduct==null || angular.isUndefined(supplierproduct))
        {
            supplierproduct="";
        }
        glbCountryID.setCountryID(CountryID)
        SLAinfoparam.setAccSuppName(supplier);
        SLAinfoparam.setSupProduct(supplierproduct);
        SLAinfoparam.setAccSuppCharID(AccessSupplierCharID);
        SLAinfoparam.setsuppAccTypeId(AccessProductTypeID);
        SLAinfoparam.setAccSuppNameId(AccSuppNameId);
        SLAinfoparam.setAccessSpeedCharID(AccessSpeedCharID);
        SLAinfoparam.setASpeedUOM(ASpeedUOM);
        SLAinfoparam.setASpeed(AccessSpeed);
        SLAinfoparam.setstrDSL('N');
        $modal.open({
            templateUrl: 'Search/SLAInformation.htm',
            controller: 'SLAInfoCntrl'
        });
    }

     $scope.OpenAccDetPopup = function (AccessSupplierCharID, CountryID, RegionID,HubSiteID,CityID) {
        

//         $scope.Product = glbProductID.getProductID();
//    $scope.Region = glbRegionID.getRegionID();
//    $scope.Country = glbCountryID.getCountryID();
        glbCountryID.setCountryID(CountryID)
        glbRegionID.setRegionID(RegionID)
        glbPOPID.setPOPID(HubSiteID);
        glbCityID.setCityID(CityID);
        DispAccDet.setAccSuppCharID(AccessSupplierCharID);

        $modal.open({
            templateUrl: 'Search/DispAccessDetails.htm',
          //  controller: 'dispAccessDetContrl'
        });
    }

    $scope.MouseOverOffnetWithOutCPE = function (index) {
        $("#tblOffnetWithOutCPE" + index).show();
    }

    $scope.MouseLeaveOffnetWithOutCPE = function (index) {
        $("#tblOffnetWithOutCPE" + index).hide();
    }

     $scope.MouseOverOnnetWithCPE = function (index) {
        $("#tblOnnetWithCPE" + index).show();
    }

    $scope.MouseLeaveOnnetWithCPE = function (index) {
        $("#tblOnnetWithCPE" + index).hide();
    }

    ///

    $scope.MouseOverOffnetWithOutCPE1 = function (index) {
        $("#tblOffnetWithOutCPEFirst" + index).show();
    }

    $scope.MouseLeaveOffnetWithOutCPE1 = function (index) {
        $("#tblOffnetWithOutCPEFirst" + index).hide();
    }

     $scope.MouseOverOnnetWithCPE1 = function (index) {
        $("#tblOnnetWithCPEFirst" + index).show();
    }

    $scope.MouseLeaveOnnetWithCPE1 = function (index) {
        $("#tblOnnetWithCPEFirst" + index).hide();
    }

    $scope.GetDataByCarrier=function()
    {

        //(glbProductID.getProductID(), glbCountry1.getCountryID(), glbCity1.getCity(), glbCountry2.getCountryID(), glbCity2.getCity(), glbSubProduct1ID.getSubProductID(), glbSubProduct2ID.getSubProductID(), glbSpeed.getSpeed(), 1,$scope.IgnoreHubbing)
        
        var Carrier1D=0;
        if($scope.Carrier1==null || $scope.Carrier1=='' || angular.isUndefined($scope.Carrier1) || $scope.Carrier1.length==0)
        {
                Carrier1D=$scope.Carrier1ID
        }
        else {
            Carrier1D=$scope.Carrier1[0];
            
        }

        var Carrier2D=0;
        if($scope.Carrier2==null || $scope.Carrier2=='' || angular.isUndefined($scope.Carrier2) || $scope.Carrier2.length==0)
        {
            Carrier2D=$scope.Carrier2ID;
        }
        else {
            Carrier2D=$scope.Carrier2[0];
            
        }
        $(".pageLoaderOverlay").show();
        
        PrivateLineCharacteristics.GetCharacteristics($scope.HubPart, glbProductID.getProductID(), glbCountry1.getCountryID(), glbCountry2.getCountryID(), glbCity1.getCity(), glbCity2.getCity(), glbSubProduct1ID.getSubProductID(), glbSubProduct2ID.getSubProductID(), glbSpeed.getSpeed(), Carrier1D, Carrier2D, $scope.IgnoreHubbing).success(function (data2) {

             
                $scope.tblCharacteristics = data2.d;
                $scope.EstimatedLeadTime = data2.d[0].SLTime.EstimatedLeadTime;
                //$scope.ProductPricing = data.d.ProductPricing;
                $scope.CaseID1 = data2.d[0].SLTime.CaseID1;
                $scope.CaseID2 = data2.d[0].SLTime.CaseID2;

                $scope.TableDataExist = 0;

                if($scope.EstimatedLeadTime==0)
                {
                    $scope.EstimatedLeadTime='';
                }
                if (glbProductID.getProductID() == 58 && glbSubProduct1ID.getSubProductID() == 31) {
                    $scope.TableDataExist = 1;
                    var EstimatedLeadTime1 = 0;
                    var EstimatedLeadTime2 = 0;
                    var Acc1=0, Acc2=0, Acc1Visible=0, Acc2Visible=0;
                    
                    

                    

                    PrivateCasesAccessInformation.GetCasesAccessInformation($scope.modPrivateLineSpeed, glbCountry1.getCountryID(), glbProductID.getProductID(), Carrier1D, glbCity1.getCity(), glbSubProduct1ID.getSubProductID()).success(function (data) {
                                        
                        Acc1=1;
                        if(data.d.length>0)
                        {
                            $scope.AccessInformation1 = data.d;
                            $("#tblAccessInformation1").show();
                            Acc1Visible=1;
                            EstimatedLeadTime1 = data.d[0].EstimatedLeadTime;
                            if (EstimatedLeadTime1 > EstimatedLeadTime2) {
                                $scope.EstimatedLeadTime = EstimatedLeadTime1;
                            }
                            else {
                                $scope.EstimatedLeadTime = EstimatedLeadTime2;
                            }

                            if($scope.EstimatedLeadTime==0)
                            {
                                $scope.EstimatedLeadTime='';
                            }

                        }
                        else {
                            $("#tblAccessInformation1").hide();
                            $("#tblAccessInformationHeading1").hide();
                        }

                        if(Acc1==1 && Acc2==1)
                        {
                            $(".pageLoaderOverlay").hide();
                                                
                            if(Acc2Visible==0 && Acc1Visible==0)
                            {
                                $("#divAccessInformation").hide();
                            }

                        }
                                            
                    });
                    
                                  
                    PrivateCasesAccessInformation.GetCasesAccessInformation($scope.modPrivateLineSpeed, glbCountry2.getCountryID(), glbProductID.getProductID(), Carrier2D, glbCity2.getCity(), glbSubProduct2ID.getSubProductID()).success(function (data) {
                                        
                        Acc2=1;
                        if(data.d.length>0)
                        {
                            $scope.AccessInformation2 = data.d;
                            $("#tblAccessInformation2").show();
                            Acc2Visible=1;
                            EstimatedLeadTime2 = data.d[0].EstimatedLeadTime;
                            if (EstimatedLeadTime1 > EstimatedLeadTime2) {
                                $scope.EstimatedLeadTime = EstimatedLeadTime1;
                            }
                            else {
                                $scope.EstimatedLeadTime = EstimatedLeadTime2;
                            }

                            if($scope.EstimatedLeadTime==0)
                            {
                                $scope.EstimatedLeadTime='';
                            }
                        }
                        else {
                            $("#tblAccessInformation2").hide();
                            $("#tblAccessInformationHeading2").hide();
                        }
                        if(Acc1==1 && Acc2==1)
                        {
                            $(".pageLoaderOverlay").hide();
                                                
                            if(Acc2Visible==0 && Acc1Visible==0)
                            {
                                $("#divAccessInformation").hide();
                            }
                        }
                    });

                }
                
                
                $scope.RemarkscellNo = data2.d[0].SLTime.RemarkscellNo;
                $scope.PhysicalInterfacecellNo = data2.d[0].SLTime.PhysicalInterfacecellNo;
                $scope.FunctionalInterfacecellNo = data2.d[0].SLTime.FunctionalInterfacecellNo;
                $scope.ElectricalInterfacecellNo = data2.d[0].SLTime.ElectricalInterfacecellNo;
                $scope.CPERequiredcellNo = data2.d[0].SLTime.CPERequiredcellNo;

                $scope.CPERequired = data2.d[0].SLTime.CPERequired;
                $scope.CPERequired1 = data2.d[0].SLTime.CPERequired1;
                $scope.PhysicalInterface = data2.d[0].SLTime.PhysicalInterface;
                $scope.PhysicalInterface1 = data2.d[0].SLTime.PhysicalInterface1;
                $scope.FunctionalInterface = data2.d[0].SLTime.FunctionalInterface;
                $scope.FunctionalInterface1 = data2.d[0].SLTime.FunctionalInterface1;
                
                $scope.FunctionalInterface2 = data2.d[0].SLTime.FunctionalInterface2;
                $scope.ElectricalInterface = data2.d[0].SLTime.ElectricalInterface;
                $scope.ElectricalInterface1 = data2.d[0].SLTime.ElectricalInterface1;
                
                $scope.ElectricalInterface2 = data2.d[0].SLTime.ElectricalInterface2;
                $scope.Remarks = data2.d[0].SLTime.Remarks;
                $scope.Remarks1 = data2.d[0].SLTime.Remarks1;

                if ($scope.TableDataExist == 0) {
                    $(".pageLoaderOverlay").hide();
                }

            });
        
    }

    $scope.GetCarriers = function (ProductID, Country1ID, City1ID, Country2ID, City2ID, SubProductID1, SubProductID2, PortSpeed, flag, IgnoreHubbing) {
        
        PrivateLineCarriers.GetCarriers(ProductID, Country1ID, City1ID, SubProductID1, PortSpeed).success(function (data) {
           
           $scope.Carrier1Count = data.d.CarrierCount;

//           if(data.d.CarrierCount==1)
//           {
//                $scope.Carrier1Count = data.d.CarrierCount+1;
//           }
//           else {
//                $scope.Carrier1Count = data.d.CarrierCount;
//            }

            $scope.Carrier1Data = data.d.Carrs;
            
            

            var firstrec = 0;
            
            if (data.d.Carrs == null || data.d.Carrs.length == 0) {
                $("#divCharType").hide();
                $("#divServiceLeadTime").hide();
                $("#divAccessInformation").hide();
                $("#divUserInfo").hide();
                $("#divUserInfo1").hide();
                $("#divGeneralInfo").hide();
                $("#divcountrydetails").hide();
                $scope.NoData=1;
                $(".pageLoaderOverlay").hide();
                
            }

            if(data.d.Carrs.length==1)
            {
                $scope.Carrier1Info=data.d.Carrs[0].CarrierName;
            }
            
            data.d.Carrs.forEach(function (item) {
            
                if (firstrec == 0) {
                    
                    $scope.Carrier1ID = item.CarrierID;
                    
                    PrivateLineCarriers.GetCarriers(ProductID, Country2ID, City2ID, SubProductID2, PortSpeed).success(function (data1) {
                    
                        //$scope.Carrier2Count = data1.d.CarrierCount;

//                        if(data.d.CarrierCount==1)
//                        {
//                            $scope.Carrier2Count = data.d.CarrierCount+1;
//                        }
//                        else {
//                            $scope.Carrier2Count = data.d.CarrierCount;
//                        }

                        $scope.Carrier2Count = data.d.CarrierCount;

                        $scope.Carrier2Data = data1.d.Carrs;
                        
                        if(data.d.Carrs.length==1)
                        {
                            $scope.Carrier2Info=data.d.Carrs[0].CarrierName;
                        }

                        var firstrec1 = 0;
                        
                        if (data1.d.Carrs == null || data1.d.Carrs.length == 0) {
                            $("#divCharType").hide();
                            $("#divServiceLeadTime").hide();
                            $("#divAccessInformation").hide();
                            $("#divUserInfo").hide();
                            $("#divUserInfo1").hide();
                            $("#divGeneralInfo").hide();
                            $("#divcountrydetails").hide();
                            $scope.NoData=1;
                            $(".pageLoaderOverlay").hide();
                        }
                        
                        data1.d.Carrs.forEach(function (item) {
                        
                            if (firstrec1 == 0) {
                                
                                $scope.Carrier2ID = item.CarrierID;
                                
                                var subProduct = 0;
                                if (flag == 1) {
                                    subProduct = glbSubProduct1ID.getSubProductID();
                                }
                                else {
                                    subProduct = glbSubProduct2ID.getSubProductID();
                                }
                                
                                PrivateLineCharacteristics.GetCharacteristics($scope.HubPart, glbProductID.getProductID(), Country1ID, Country2ID, City1ID, City2ID, glbSubProduct1ID.getSubProductID(), glbSubProduct2ID.getSubProductID(), glbSpeed.getSpeed(), $scope.Carrier1ID, $scope.Carrier2ID, IgnoreHubbing).success(function (data2) {

                                
                                    $scope.tblCharacteristics = data2.d;
                                    $scope.EstimatedLeadTime = data2.d[0].SLTime.EstimatedLeadTime;
                                    //$scope.ProductPricing = data.d.ProductPricing;
                                    $scope.CaseID1 = data2.d[0].SLTime.CaseID1;
                                    $scope.CaseID2 = data2.d[0].SLTime.CaseID2;

                                    $scope.TableDataExist = 0;

                                    if($scope.EstimatedLeadTime==0)
                                    {
                                        $scope.EstimatedLeadTime='';
                                    }
                                   
                                   if (ProductID == 58) {
                                        if (SubProductID1 == 31 || (IgnoreHubbing==1 && SubProductID2==31) ) {
                                            $scope.TableDataExist = 1;
                                            var EstimatedLeadTime1 = 0;
                                            var EstimatedLeadTime2 = 0;
                                            var Acc1=0;
                                            var Acc2=0;
                                            var Acc1Visible=0;
                                            var Acc2Visible=0;
                                            
                                            PrivateCasesAccessInformation.GetCasesAccessInformation($scope.modPrivateLineSpeed, glbCountry1.getCountryID(), glbProductID.getProductID(), $scope.Carrier1ID, City1ID, SubProductID1).success(function (data) {
                                        
                                                Acc1=1;
                                                if(data.d.length>0)
                                                {
                                                    $scope.AccessInformation1 = data.d;
                                                    $("#tblAccessInformation1").show();
                                                    Acc1Visible=1;
                                                    EstimatedLeadTime1 = data.d[0].EstimatedLeadTime;
                                                    if (EstimatedLeadTime1 > EstimatedLeadTime2) {
                                                        $scope.EstimatedLeadTime = EstimatedLeadTime1;
                                                    }
                                                    else {
                                                        $scope.EstimatedLeadTime = EstimatedLeadTime2;
                                                    }
                                                }
                                                else {
                                                    $("#tblAccessInformation1").hide();
                                                    $("#tblAccessInformationHeading1").hide();
                                                }

                                                if(Acc1==1 && Acc2==1)
                                                {
                                                    $(".pageLoaderOverlay").hide();
                                                
                                                    if(Acc2Visible==0 && Acc1Visible==0)
                                                    {
                                                        $("#divAccessInformation").hide();
                                                    }

                                                }
                                            
                                            });
                                        
                                            PrivateCasesAccessInformation.GetCasesAccessInformation($scope.modPrivateLineSpeed, glbCountry2.getCountryID(), glbProductID.getProductID(), $scope.Carrier2ID, City2ID, SubProductID2).success(function (data) {
                                        
                                                Acc2=1;
                                             if(data.d.length>0)
                                                {
                                                    $scope.AccessInformation2 = data.d;
                                                    $("#tblAccessInformation2").show();
                                                    Acc2Visible=1;
                                                    EstimatedLeadTime2 = data.d[0].EstimatedLeadTime;
                                                    if (EstimatedLeadTime1 > EstimatedLeadTime2) {
                                                        $scope.EstimatedLeadTime = EstimatedLeadTime1;
                                                    }
                                                    else {
                                                        $scope.EstimatedLeadTime = EstimatedLeadTime2;
                                                    }
                                                }
                                                else {
                                                    $("#tblAccessInformation2").hide();
                                                    $("#tblAccessInformationHeading2").hide();
                                                }
                                                if(Acc1==1 && Acc2==1)
                                                {
                                                    $(".pageLoaderOverlay").hide();
                                                
                                                    if(Acc2Visible==0 && Acc1Visible==0)
                                                    {
                                                        $("#divAccessInformation").hide();
                                                    }
                                                }
                                            });

                                        }
                                    }
                                    UserInfofactory.GetUserInfo($scope.CaseID1, 'CSU_CASE_DETAILS').success(function (data) {
                                        //
                                        $scope.CreatedBy1 = data.d.CreatedBy;
                                        $scope.CreatedDate1 = data.d.CreatedDate;
                                        $scope.UpdatedBy1 = data.d.UpdatedBy;
                                        $scope.UpdatedDate1 = data.d.UpdatedDate;
                                    });
                                    
                                    UserInfofactory.GetUserInfo($scope.CaseID2, 'CSU_CASE_DETAILS').success(function (data) {
                                        //
                                        $scope.CreatedBy2 = data.d.CreatedBy;
                                        $scope.CreatedDate2 = data.d.CreatedDate;
                                        $scope.UpdatedBy2 = data.d.UpdatedBy;
                                        $scope.UpdatedDate2 = data.d.UpdatedDate;
                                    });


                                    $scope.RemarkscellNo = data2.d[0].SLTime.RemarkscellNo;
                                    $scope.PhysicalInterfacecellNo = data2.d[0].SLTime.PhysicalInterfacecellNo;
                                    $scope.FunctionalInterfacecellNo = data2.d[0].SLTime.FunctionalInterfacecellNo;
                                    $scope.ElectricalInterfacecellNo = data2.d[0].SLTime.ElectricalInterfacecellNo;
                                    $scope.CPERequiredcellNo = data2.d[0].SLTime.CPERequiredcellNo;

                                    $scope.CPERequired = data2.d[0].SLTime.CPERequired;
                                    $scope.CPERequired1 = data2.d[0].SLTime.CPERequired1;
                                    $scope.PhysicalInterface = data2.d[0].SLTime.PhysicalInterface;
                                    $scope.PhysicalInterface1 = data2.d[0].SLTime.PhysicalInterface1;
                                    $scope.FunctionalInterface = data2.d[0].SLTime.FunctionalInterface;
                                    $scope.FunctionalInterface1 = data2.d[0].SLTime.FunctionalInterface1;
                                    
                                    $scope.FunctionalInterface2 = data2.d[0].SLTime.FunctionalInterface2;
                                    $scope.ElectricalInterface = data2.d[0].SLTime.ElectricalInterface;
                                    $scope.ElectricalInterface1 = data2.d[0].SLTime.ElectricalInterface1;
                                    $scope.ElectricalInterface2 = data2.d[0].SLTime.ElectricalInterface2;
                                    $scope.Remarks = data2.d[0].SLTime.Remarks;
                                    $scope.Remarks1 = data2.d[0].SLTime.Remarks1;

                                    if ($scope.TableDataExist == 0) {
                                        $(".pageLoaderOverlay").hide();
                                    }

                                });

                            }
                            firstrec1 = 1;
                        });

                    });

                }
                firstrec = 1;

            });

        });
    }


    $scope.GetCarriers1 = function (ProductID, CountryID, CityID, SubProductID, PortSpeed) {
        PrivateLineCarriers.GetCarriers(ProductID, CountryID, CityID, SubProductID, PortSpeed).success(function (data) {
            $scope.Carrier1Count = data.d.CarrierCount;
            $scope.Carrier1Data = data.d.Carrs;
            var firstrec = 0;
            data.d.Carrs.forEach(function (item) {
                if (firstrec == 0) {
                    $scope.Carrier1ID = item.CarrierID;
                }
                firstrec = 1;
            });

        });
    }

    $scope.GetCarriers2 = function (ProductID, CountryID, CityID, SubProductID, PortSpeed) {
        PrivateLineCarriers.GetCarriers(ProductID, CountryID, CityID, SubProductID, PortSpeed).success(function (data) {
            $scope.Carrier2Count = data.d.CarrierCount;
            $scope.Carrier2Data = data.d.Carrs;
            var firstrec = 0;

            data.d.Carrs.forEach(function (item) {
                if (firstrec == 0) {
                    $scope.Carrier2ID = item.CarrierID;

                    PrivateLineCharacteristics.GetCharacteristics($scope.HubPart, glbProductID.getProductID(), glbCountry1.getCountryID(), glbCountry2.getCountryID(), glbCity1.getCity(), glbCity2.getCity(), glbSubProduct1ID.getSubProductID(), glbSpeed.getSpeed(), $scope.Carrier1ID, $scope.Carrier2ID).success(function (data) {

                        $scope.tblCharacteristics = data.d;
                    });

                }
                firstrec = 1;
            });

        });
    }

    $scope.GetDataBySpeed = function () {

        glbSpeed.setSpeed($scope.modPrivateLineSpeed);
        $(".pageLoaderOverlay").show();
        if ($scope.Product == 58) {
            $scope.GetHubbingPart($scope.HubPart);
        }
        else {

            //$scope.GetCarriers(glbProductID.getProductID(), glbCountry1.getCountryID(), glbCity1.getCity(), glbCountry2.getCountryID(), glbCity2.getCity(), glbSubProduct1ID.getSubProductID(), glbSubProduct2ID.getSubProductID(), glbSpeed.getSpeed(), 1);
            PrivateLineCharacteristics.GetCharacteristics($scope.HubPart, glbProductID.getProductID(), glbCountry1.getCountryID(), glbCountry2.getCountryID(), glbCity1.getCity(), glbCity2.getCity(), glbSubProduct1ID.getSubProductID(), glbSubProduct2ID.getSubProductID(), glbSpeed.getSpeed(), $scope.Carrier1ID, $scope.Carrier2ID, $scope.IgnoreHubbing).success(function (data2) {


                $scope.tblCharacteristics = data2.d;
                $scope.EstimatedLeadTime = data2.d[0].SLTime.EstimatedLeadTime;
                $scope.CaseID1 = data2.d[0].SLTime.CaseID1;
                $scope.CaseID2 = data2.d[0].SLTime.CaseID2;

                UserInfofactory.GetUserInfo($scope.CaseID1, 'CSU_CASE_DETAILS').success(function (data111) {

                    $scope.CreatedBy1 = data111.d.CreatedBy;
                    $scope.CreatedDate1 = data111.d.CreatedDate;
                    $scope.UpdatedBy1 = data111.d.UpdatedBy;
                    $scope.UpdatedDate1 = data111.d.UpdatedDate;
                });

                UserInfofactory.GetUserInfo($scope.CaseID2, 'CSU_CASE_DETAILS').success(function (data23) {

                    $scope.CreatedBy2 = data23.d.CreatedBy;
                    $scope.CreatedDate2 = data23.d.CreatedDate;
                    $scope.UpdatedBy2 = data23.d.UpdatedBy;
                    $scope.UpdatedDate2 = data23.d.UpdatedDate;
                });

                PrivateAccessInformation.GetAccessInformation($scope.CaseID1, $scope.modPrivateLineSpeed, glbCountry1.getCountryID(), glbProductID.getProductID()).success(function (data) {

                    $scope.AccessInformation1 = data.d;
                });

                PrivateAccessInformation.GetAccessInformation($scope.CaseID2, $scope.modPrivateLineSpeed, glbCountry2.getCountryID(), glbProductID.getProductID()).success(function (data) {

                    $scope.AccessInformation2 = data.d;
                    $(".pageLoaderOverlay").hide();
                });

                //AccessInformation1
            });
        }
    }

    $scope.GetHubbingPart = function (id) {
        $(".pageLoaderOverlay").show();

        if($scope.IgnoreHubbing==0)
                {
                    if(id == 1)
                    {
                        var message
							message = 'Attention!\n\n';
							message = message + 'This route will be hubbed via the UK.\n\n';
							message = message + 'If a SPECIAL BID CODE appears in either part of the hubbing\n';
							message = message + 'solution, please submit your request to your bid manager.\n\n';
							message = message + 'After you click OK, the second part of the hubbing solution will\n';
							message = message + 'be displayed. Make sure you click the link "Hubbing solution part 1" to\n';
							message = message + 'view the details pertaining to the first part of this UK hubbing solution.';
							//alert(message);
                    }
                    else {
                        var message
							message = 'Attention!\n\n';
							message = message + 'This route will be hubbed via the UK.\n\n';
							message = message + 'If a SPECIAL BID CODE appears in either part of the hubbing\n';
							message = message + 'solution, please submit your request to your bid manager.\n\n';
							message = message + 'After you click OK, the first part of the hubbing solution will\n';
							message = message + 'be displayed. Make sure you click the link "Hubbing solution part 2" to\n';
							message = message + 'view the details pertaining to the second part of this UK hubbing solution.';
							//alert(message);
                    }
                }

        PrivateLineCountryCity.GetCountryCityIds(PrioritySelected, glbProductID.getProductID(), glbCountry1.getOrgCountryID(), glbCountry2.getOrgCountryID(), glbCity1.getOrgCity(), glbCity2.getOrgCity(), $scope.modPrivateLineSpeed, id).success(function (data) {

            glbCountry1.setCountryID(data.d.Country1);
            glbCountry2.setCountryID(data.d.Country2);
            glbCity1.setCity(data.d.City1);
            glbCity2.setCity(data.d.City2);



            if (id == 1) {
                $scope.HubPartHeading = "Hubbing Part1";
                $scope.GetCarriers(glbProductID.getProductID(), glbCountry1.getCountryID(), glbCity1.getCity(), glbCountry2.getCountryID(), glbCity2.getCity(), glbSubProduct1ID.getSubProductID(), glbSubProduct2ID.getSubProductID(), glbSpeed.getSpeed(), 1,$scope.IgnoreHubbing);
                PrivateLineCountryName.GetCountryName(glbCountry1.getCountryID(), glbCity1.getCity()).success(function (data) {

                    $scope.Country1Name = data.d.CountryName;
                    $scope.City1Name = data.d.CityName;
                });
                PrivateLineCountryName.GetCountryName(glbCountry2.getCountryID(), glbCity2.getCity()).success(function (data) {

                    $scope.Country2Name = data.d.CountryName;
                    $scope.City2Name = data.d.CityName;
                });
                $scope.HubPart = 1;
            }
            else {
                $scope.HubPartHeading = "Hubbing Part2";
                $scope.GetCarriers(glbProductID.getProductID(), glbCountry1.getCountryID(), glbCity1.getCity(), glbCountry2.getCountryID(), glbCity2.getCity(), glbSubProduct1ID.getSubProductID(), glbSubProduct2ID.getSubProductID(), glbSpeed.getSpeed(), 2,$scope.IgnoreHubbing);
                PrivateLineCountryName.GetCountryName(glbCountry2.getCountryID(), glbCity2.getCity()).success(function (data) {

                    $scope.Country2Name = data.d.CountryName;
                    $scope.City2Name = data.d.CityName;
                });
                PrivateLineCountryName.GetCountryName(glbCountry1.getCountryID(), glbCity1.getCity()).success(function (data) {

                    $scope.Country1Name = data.d.CountryName;
                    $scope.City1Name = data.d.CityName;
                });
                $scope.HubPart = 2;
            }
        });
    }


});

app.factory('PrivateLineGeneralfactory', function ($http, $rootScope) {

    var PrivateLineGeneralfactory = {};

    PrivateLineGeneralfactory.GetGeneralInfo = function (Priority, ProductCode, Country1ID, Country2ID, City1ID, City2ID, PortSpeedID) {

        return $http.post('PrivateLine.aspx/GetGeneralInfo', { 'Priority': Priority, 'ProductCode': ProductCode, 'Country1ID': Country1ID, 'Country2ID': Country2ID, 'City1ID': City1ID, 'City2ID': City2ID, 'PortSpeedID': PortSpeedID })
        .success(function (data, status, headers, config) {
           
        })
        .error(function (error) {
            alert("Problem occured while PriceLIne General Info1; " + error);
        });
    }

    return PrivateLineGeneralfactory;
});


app.factory('PrivateLineCountryCity', function ($http, $rootScope) {

    var PrivateLineCountryCity = {};

    PrivateLineCountryCity.GetCountryCityIds = function (Priority, ProductCode, Country1ID, Country2ID, City1ID, City2ID, PortSpeedID, HubPart) {
        
        return $http.post('PrivateLine.aspx/GetCountryCityIds', { 'HubPart': HubPart, 'Priority': Priority, 'Country1ID': Country1ID, 'Country2ID': Country2ID, 'City1ID': City1ID, 'City2ID': City2ID, 'PortSpeed': PortSpeedID, 'ProductID': ProductCode })
        .success(function (data, status, headers, config) {

        })
        .error(function (error) {
            alert("Problem occured while PriceLIne General Info2; " + error);
        });
    }

    return PrivateLineCountryCity;
});

app.factory('PrivateLineCarriers', function ($http, $rootScope) {

    var PrivateLineCarriers = {};

    PrivateLineCarriers.GetCarriers = function (ProductID, CountryID, CityID, SubProductID, PortSpeed) {

        return $http.post('PrivateLine.aspx/GetCarriers', { 'ProductID': ProductID, 'CountryID': CountryID, 'CityID': CityID, 'SubProductID': SubProductID, 'PortSpeed': PortSpeed })
        .success(function (data, status, headers, config) {

        })
        .error(function (error) {
            //alert("Problem occured while PriceLIne General Info; " + error);
        });
    }

    return PrivateLineCarriers;
});

app.factory('PrivateLineCountryName', function ($http, $rootScope) {

    var PrivateLineCountryName = {};

    PrivateLineCountryName.GetCountryName = function (CountryID, CityID) {

        return $http.post('PrivateLine.aspx/GetCountryName', { 'CountryID': CountryID, 'CityID': CityID })
        .success(function (data, status, headers, config) {

        })
        .error(function (error) {
            alert("Problem occured while PriceLIne General Info3; " + error);
        });
    }

    return PrivateLineCountryName;
});

app.factory('PrivateLineCharacteristics', function ($http, $rootScope) {

    var PrivateLineCharacteristics = {};


    PrivateLineCharacteristics.GetCharacteristics = function (HubPart, ProductID, Country1ID, Country2ID, City1ID, City2ID, SubProductID1, SubProductID2, PortSpeed, Carrier1ID, Carrier2ID, IgnoreHubbing) {
    
        if(PortSpeed==null || angular.isUndefined(PortSpeed)) 
        { 
            return; 
        }

        return $http.post('PrivateLine.aspx/GetCharacteristics', { 'HubPart': HubPart, 'ProductID': ProductID, 'Country1ID': Country1ID, 'Country2ID': Country2ID, 'City1ID': City1ID, 'City2ID': City2ID, 'SubProductID1': SubProductID1, 'SubProductID2': SubProductID2, 'PortSpeed': PortSpeed, 'Carrier1ID': Carrier1ID, 'Carrier2ID': Carrier2ID, 'IgnoreHubbing':IgnoreHubbing})
        .success(function (data, status, headers, config) {

        })
        .error(function (error) {
            alert("Problem occured while PriceLIne General Info4; " + error);
        });
    }

    return PrivateLineCharacteristics;
});


app.factory('PrivateAccessInformation', function ($http, $rootScope) {

    var PrivateAccessInformation = {};

    PrivateAccessInformation.GetAccessInformation = function (CaseID, PortSpeed, CountryID, ProductID) {

        return $http.post('PrivateLine.aspx/GetAccessInformation', { 'CaseID': CaseID, 'PortSpeed': PortSpeed, 'CountryID': CountryID, 'ProductID': ProductID })
        .success(function (data, status, headers, config) {

        })
        .error(function (error) {
            alert("Problem occured while PriceLIne General Info5; " + error);
        });
    }

    return PrivateAccessInformation;
});

app.factory('PrivateCasesAccessInformation', function ($http, $rootScope) {

    var PrivateCasesAccessInformation = {};

    PrivateCasesAccessInformation.GetCasesAccessInformation = function (PortSpeed, CountryID, ProductID, CarrierID, CityID, SubProduct) {
        
        return $http.post('PrivateLine.aspx/GetCasesAccessInformation', { 'PortSpeed': PortSpeed, 'CountryID': CountryID, 'ProductID': ProductID, 'CarrierID': CarrierID, 'CityID': CityID, 'SubProduct': SubProduct })
        .success(function (data, status, headers, config) {

        })
        .error(function (error) {
            alert("Problem occured while PriceLIne General Info6; " + error);
        });
    }

    return PrivateCasesAccessInformation;
});

app.service("glbSubProduct1ID", function () {
    var SubProductID = "";
    return {
        getSubProductID: function () {
            return SubProductID;
        },
        setSubProductID: function (value) {
            SubProductID = value;
        }
    }
});


app.service("glbSubProduct2ID", function () {
    var SubProductID = "";
    return {
        getSubProductID: function () {
            return SubProductID;
        },
        setSubProductID: function (value) {
            SubProductID = value;
        }
    }
});
