﻿
﻿app.controller("BTBusinessVoice", function ($scope, $rootScope, $modal, $http, UserInfofactory, SLAinfoparam, NetworkPlatformfactory, DispAccDet, Statesfactory, Cityfactory, Popfactory, glbProductID, PopCharsfctry, ParentPortSpeedGridFctry, ChildPortSpeedGridFctry, glbRegionID, glbCountryID, glbStateID, glbCityID, glbPOPID, glbCaseID, glbParentProductID, glbCapmanPlatformID, SubprodPopCharsfctry, AccessSuppliersFctry, ParentPortSpeedsFctry, ChildAccessSuppliersFctry, ChildPortSpeedsFctry, CPESuppliersFctry, glbCPESupplier, GetSubproductChartype, ParentAccessSupplier, SubChildProdPortSpeed,GetDoclinksFactory) {



    $scope.Product = glbProductID.getProductID();
    $scope.Region = glbRegionID.getRegionID();
    $scope.Country = glbCountryID.getCountryID();
    $scope.ProductName =glbProductID.getProductName();
    //    $scope.City = glbCityID.getCityID();
    //    $scope.POP = glbPOPID.getPOPID();
    var HubSiteID = $scope.modPoP;
    var CountryID = $scope.Country;
    var ProductId = $scope.Product;
    var capmanPlatform = '';
    var localCaseID = '';
    var access = 25;
    var resCharacteristics = '';
    var hasPortSpeed = '';
    var hasParentPortSpeed = '';
    var ParentProdID = '';
    var CityData = '';
    var POPData = '';
    $scope.showHeaderMsg = "false";
    $scope.showChildPortGrid = "false";
    $scope.showParentPortGrid = "false";
    $scope.dispMPLSProdchar = '';
    $scope.dispMPLSsubProdchar = '';


    $("#headerMsg").hide();
    $("#documents").hide();
    $("#tblPortSpeedFilters").hide();
    $("#trParentSpeedFilters").hide();
    $("#tblChildSpeeds").hide();
    $("#tblParentSpeeds").hide();
    $("#slainfoSubProd").hide();
    $(".lblPlatform").hide();
    $(".ddlPlatform").hide();
    $rootScope.isIA = 0;

   

    $scope.PageNo = 1;
    $scope.PageNum = 1;
    $scope.MaxRecords = 1000;
    $scope.PageSize = 100;
    $scope.Paging = false;
    $scope.CPEExists=0;

    $scope.isShowAll1 = true;
    $scope.isShowAll2 = true;
    $scope.isShowAll3 = true;

 
    $scope.filterSuppProd = function (ParentAccSupp) {

        var tempData = [];
        $scope.subProdSuppProdData = [];
     
        $scope.AllAccessSupp.SupplierProductList.forEach(function (item3) {
            if (item3.AccessSupplierID == ParentAccSupp) {
                $scope.subProdSuppProdData.push({
                    "AccessSupplierID": item3.AccessSupplierID,
                    "SupplierID": item3.SupplierID,
                    "SupplierProductName": item3.SupplierProductName
                });
            }
        });

        if (ParentAccSupp == null) {
            $scope.subProdSuppProdData = $scope.AllAccessSupp.SupplierProductList
        }
    };






    $scope.filterSupplier1 = function (param) {
      var tempData = [];

      $scope.pSupplierProductData = [];
        $scope.AllData1.SupplierProductList.forEach(function (item3) {
            if (item3.AccessSupplierID == param) {
                $scope.pSupplierProductData.push({
                    "AccessSupplierID": item3.AccessSupplierID,
                    "SupplierID": item3.SupplierID,
                    "SupplierProductName": item3.SupplierProductName
                });
            }
        });
        if (param == null) {
            $scope.pSupplierProductData = $scope.AllData1.SupplierProductList;
        }
    };








    $scope.$watchCollection('subprodPortSpeedData', function () {
        
        if (!angular.isUndefined($scope.subprodPortSpeedData)) {
            if ($scope.subprodPortSpeedData.length == 1) {
                $scope.subProdParentPortSpeed = [];
                $scope.subProdParentPortSpeed.push($scope.subprodPortSpeedData[0].PortSpeedID);
            }
        }
    });

    $scope.$watchCollection('pChildPortSpeedData', function () {
        if (!angular.isUndefined($scope.pChildPortSpeedData)) {
            if ($scope.pChildPortSpeedData.length == 1) {
                $scope.pPortSpeed = [];
                $scope.pPortSpeed.push($scope.pChildPortSpeedData[0].PortSpeedID);
            }
        }
    });

     $scope.RemoveNPAlert=function()
    {
        $("span#validateNetworkPlatform").hide();
    }

    $scope.hideAlertMessage=function(){
         $("#spnChildPortSpeed").hide();
    }

    $scope.hideParentPortAlert=function(){
    $("#spnParentportSpeed").hide();
    }

    $(".pageLoaderOverlay").show();
    (function LoadStateCityPop() {
        Statesfactory.GetStates($scope.Product, $scope.Region, $scope.Country, $rootScope.isIA).success(function (data) {

            if (data.d.length == 1) {
                $scope.modstate = data.d[0].StateID;
            }
            if (data.d.length == 0) {
                $scope.StateCount = 0;
            }

            Cityfactory.GetCityInfo($scope.Product, $scope.Region, $scope.Country, 0, "0", 0, $rootScope.isIA,1).success(function (data) {
            CityData = 1;
            if (data.d.length == 1) {
                $scope.modCity = data.d[0].CityID;
            }

                Popfactory.GetPopInfo($scope.Product, $scope.Region, $scope.Country, 0, 0, $rootScope.isIA).success(function (data) {
                POPData = 1;
                if (data.d.length == 1) {
                    $scope.modPoP = data.d[0].POPID;

                    LoadNetworkPlatform();
             }else{
                 $(".pageLoaderOverlay").hide();
                }
            
            });
            
           });


        });
        
        
    } ());

    function LoadNetworkPlatform(){
          NetworkPlatformfactory.GetPlatformDetails($scope.Product, $scope.modPoP).success(function (data) {
                    if (data.d.length == 1 || data.d.length == 0) {
                        $(".lblPlatform").hide();
                        $(".ddlPlatform").hide();
                        $(".pageLoaderOverlay").hide();
                    }
                    else {
                        result = [];
                        data.d.forEach(function (item1) {
                            result.push({ ID: item1.ID, NetworkPlatform: item1.NetworkPlatform });
                        });
                        $(".lblPlatform").show();
                        $(".ddlPlatform").show();
                        $scope.NetworkPlatformData = result;
                        $(".pageLoaderOverlay").hide();
                    }
                    $("#validateNetworkPlatform").hide(); 
                });
    }

    //Getting City when State is changed
    $scope.GetCities = function (ProductID, Region, Country, state) {
        if (angular.isUndefined(state) || state == null || state == '') {
            $(".pageLoaderOverlay").show();
            $scope.modCity = ''
            Cityfactory.GetCityInfo($scope.Product, $scope.Region, $scope.Country, 0, "0", 0, $rootScope.isIA,0).success(function (data) {
                CityData = 1;
//                if (data.d.length == 1) {
//                    $scope.modCity = data.d[0].CityID;
//                }
                if (CityData == 1 && POPData == 1) {
                    $(".pageLoaderOverlay").hide();
                }
                
               $('.ValidateCity').hide();
            });
            $scope.modPoP = ''
            Popfactory.GetPopInfo($scope.Product, $scope.Region, $scope.Country, 0, 0, $rootScope.isIA).success(function (data) {
                POPData = 1;
//                if (data.d.length == 1) {
//                    $scope.modPoP = data.d[0].POPID;
//                }
                LoadNetworkPlatform();
                if (CityData == 1 && POPData == 1) {
                    $(".pageLoaderOverlay").hide();
                }
                $('.ValidatePOP').hide();
            });
        }
        $(".ValidateState").hide();
        if ($scope.Region == 0 || $scope.Country == 0) {
            $scope.GetInfoByState($scope.modstate);
        }
        else {

            $(".pageLoaderOverlay").show();
           
            Cityfactory.GetCityInfo(ProductID, Region, Country, state, "0", 0, $rootScope.isIA,0).success(function (data) {

                if (data.d.length == 1) {
                    $scope.modCity = data.d[0].CityID;
                    Popfactory.GetPopInfo(ProductID, Region, Country, state, $scope.modCity, $rootScope.isIA).success(function (data) {

                        if (data.d.length == 1) {
                            $scope.modPoP = data.d[0].POPID;
                        }
                        $(".pageLoaderOverlay").hide();
                        $('.ValidatePOP').hide();
                        LoadNetworkPlatform();
                    });
                }
                else {
                    Popfactory.GetPopInfo(ProductID, Region, Country, state, 0, $rootScope.isIA).success(function (data) {

                        if (data.d.length == 1) {
                            $scope.modPoP = data.d[0].POPID;
                        }
                        LoadNetworkPlatform();
                        $(".pageLoaderOverlay").hide();
                        $('.ValidatePOP').hide();
                    });
                }
                $('.ValidateCity').hide();
            });

        }

    }

    //Getting Pop Information
    $scope.GetPops = function (Product, Region, Country, State, City) {

        if (angular.isUndefined(City) || City == "" || City == null) {
            $scope.modPoP = ''
            $(".lblPlatform").hide();
            $(".ddlPlatform").hide();
            $("#validateNetworkPlatform").hide();
         $(".pageLoaderOverlay").show();
            Popfactory.GetPopInfo($scope.Product, $scope.Region, $scope.Country, 0, 0, $rootScope.isIA).success(function (data) {
                POPData = 1;
//                if (data.d.length == 1) {
//                    $scope.modPoP = data.d[0].POPID;
//                }
                if (CityData == 1 && POPData == 1) {
                    $(".pageLoaderOverlay").hide();
                }
                
            });
            return;
        }

        $scope.GetInfoByCity();
        $(".ValidateCity").hide();
        $(".ValidatePOP").hide();
    }

    $scope.GetInfoByState = function () {

        $http.post('Search.aspx/GetInfoByState', { 'StateID': $scope.modstate })
            .success(function (data, status, headers, config) {

                $scope.modregion = data.d.RegionID;
                $scope.modcountry = data.d.CountryID;
                Cityfactory.GetCityInfo($scope.modproduct, $scope.modregion, $scope.modcountry, $scope.modstate, "0", 0, $rootScope.isIA,0);
                Popfactory.GetPopInfo($scope.modproduct, $scope.modregion, $scope.modcountry, $scope.modstate, 0, $rootScope.isIA).success(function (data) {

                    if (data.d.length == 1) {
                        $scope.modPoP = data.d[0].POPID;
                          LoadNetworkPlatform();
                    }
                });

            })
        .error(function (error) {
            // alert("Problem occured while loading Region " + JSON.stringify(error));
        });
    }

    $scope.GetInfoByCity = function () {

        $http.post('Search.aspx/GetInfoByCity', { 'CityID': $scope.modCity, 'ProductID': $scope.Product })
            .success(function (data, status, headers, config) {

                $scope.modstate = data.d.StateID;
                $(".pageLoaderOverlay").show();
                Popfactory.GetPopInfo($scope.Product, $scope.Region, $scope.Country, $scope.modstate, $scope.modCity, $rootScope.isIA).success(function (data) {

                    if (data.d.length == 1) {
                        $scope.modPoP = data.d[0].POPID;
                    }

                     LoadNetworkPlatform();

                    $(".pageLoaderOverlay").hide();
                });
            })
        .error(function (error) {
            // alert("Problem occured while loading Region " + JSON.stringify(error));
        });


    }

    $scope.GeInfoByPop = function (Product, Region, Country, State, City) {

        //Hide city when pop changed

        if($scope.modPoP ==null || $scope.modPoP =="" || angular.isUndefined($scope.modPoP)){
            $("#lblPlatform").hide();
            $("#ddlPlatform").hide();
            $scope.modNetworkPlatform='';
        }

        if($scope.modCity !=null || $scope.modCity !=""){
            $('span.ValidateCity').hide();
        }

        $scope.GetinfoByHubSite();
        $(".ValidatePOP").hide();
    }

    $scope.GetinfoByHubSite = function () {
        $(".pageLoaderOverlay").show();

        if ($scope.modPoP == null) {
            $(".lblPlatform").hide();
            $(".ddlPlatform").hide();
            $(".pageLoaderOverlay").hide();
            return;
        }

        $http.post('Search.aspx/GetinfoByHubSite', { 'HubSiteID': $scope.modPoP })
            .success(function (data, status, headers, config) {

                $scope.modstate = data.d.StateID;
                $scope.modCity = data.d.CityID;

                 LoadNetworkPlatform();


            })
        .error(function (error) {
            $(".pageLoaderOverlay").hide();
        });
    }

    var dataLoaded = '';
    var prevCaseID = '';
    var prevSubprodID = '';
    $scope.GetSubproductDetails = function () {
     dataLoaded = '';
     prevCaseID = '';
     prevSubprodID = '';

     var validInput = true;
//     if(angular.isUndefined($scope.modstate)||$scope.modstate==null||$scope.modstate=="")
//     { 
//        $(".ValidateState").show();
//         validInput = false;
//        // return;
//     }

     if(angular.isUndefined($scope.modCity)||$scope.modCity==""||$scope.modCity==null){
      $(".ValidateCity").show();
      validInput = false;
          //   return;
       }

//     if(angular.isUndefined($scope.modPoP)||$scope.modPoP==""||$scope.modPoP==null) 
//     {

//       $(".ValidatePOP").show();
//       validInput = false;
//       // return;
//     }
   
        //pop is not applicable for Contact Service Senter
        if ($scope.modproduct != 15) {//$("#ddlPoP").is(':visible') ||
            
            if (angular.isUndefined($scope.modPoP) || $scope.modPoP == "" || $scope.modPoP == null) {
                $(".ValidatePOP").show();
                return;
            }
            else {
                $(".ValidatePOP").hide();

            }
        }



        if(!validInput)
        {
         return ;
        }


        //to check whether networkplatform is visible, then if visible then show alert if no value selected
        if ($("#ddlNetworkPlatform").is(':visible')) {
            if (angular.isUndefined($scope.modNetworkPlatform) || $scope.modNetworkPlatform === "" || 
            $scope.modNetworkPlatform === null ||  $scope.modNetworkPlatform ==-1) {
                $("#validateNetworkPlatform").show();
                return;
            } else {
                $("#validateNetworkPlatform").hide();
            }
        }else{
             //workaround --- to reset network platform after data load, so that it wont affect next search
               $scope.modNetworkPlatform = '';
        }

        if (angular.isUndefined($scope.modCity) || $scope.modCity == '') {
            $scope.City = 0;
        }

        if (angular.isUndefined($scope.modPoP) || $scope.modPoP == '') {
            $scope.modPoP = 0; HubSiteID = 0;
        }

        if (angular.isUndefined($scope.modNetworkPlatform) || $scope.modNetworkPlatform === '') {
            $scope.modNetworkPlatform = -1;
        }
        var pageloaded=0;
        var docLoaded=0;
        $("#headerMsg").show();
        $(".pageLoaderOverlay").show();
       

      
        $http.post('DispSubProduct.aspx/GetSubProductDetails', { "prodId": $scope.Product, "regionID": $scope.Region,
            "countryID": $scope.Country, "cityID": $scope.modCity, "hubSiteID": $scope.modPoP,
             "CapmanPlatformId": $scope.modNetworkPlatform,"sAccess_Level":$rootScope.sAccess_Level,
             "GfrCode":$rootScope.BtGfrCodes,"SegregationCode":$rootScope.SegregationCodes
        })
       .success(function (data, status, headers, config) {

           $scope.subProdDetails = data.d.lstSubProd;
           $scope.headerMessage=data.d.warningMsg;

             if(data.d.genericVoiceChar.length!=0){
                $scope.genericVoicechars=data.d.genericVoiceChar;
                 $("#GenericVoiceChar").show();
             }else{
              $("#GenericVoiceChar").hide();
                }

             if(data.d.lstSubProd.length!=0){

           var res = data.d.lstSubProd[0];
           //           $scope.subproductName = res.SubProdName;
           //           // $scope.warningMsg = res[0].Item2;
           //           $scope.subServiceAvailable = res.AvailabilityDesc;
           //           $scope.subNetworkName = res.NetworkName;
           //           //has to be shown only for level 4 product
           //           $scope.subResilientPop = res.SupprotResPOP;
           //           localCaseID = res.localCaseId;
           capmanPlatform = res.CapmanPlatformId;
           ParentProdID = res.ParentProdID;
           $scope.parentProdCaseID = res.parentProdCaseID;
           $scope.prodLvlCD = res.ProdLocationLvl;
           $scope.ParentProductName=res.ParentProductName;
           }
           pageloaded=1;

          
        $("#documents").show();
        GetDoclinksFactory.getDoc(glbProductID.getProductID()).success(function (data) {

            if (data.d.length == 0) {
                $scope.ShowSubProductProductDocLinks = 0;
                 docLoaded=1;
            }
            else {
                $scope.ShowSubProductProductDocLinks = 1;

                $scope.DocumentslinksData = [];
                ProductsDocLinks = [];

                data.d.forEach(function (item) {

                    ProductsDocLinks.push({ DocumentTitle: item.DocumentTitle, DocumentUrl: item.DocumentUrl });

                });
                  docLoaded=1;
                $scope.DocumentslinksData = ProductsDocLinks;
            }
             if(pageloaded==1 && docLoaded==1){  $(".pageLoaderOverlay").hide();}
        });

       

       
       })
        .error(function (data, status, headers, config) {
            $(".pageLoaderOverlay").hide();
            console.log("GetValidProduct api called failed");
        });


    }

    

    var childPortSpeedLoaded=0;

    var popLoaded=0;
    var charLoaded=0;
    var portspeedLoaded=0;


    $scope.getSubProductChar = function (SubProdID, localCaseID, useCpeSubproduct) {

//        if ($scope.prodLvlCD == 4) {
//            $('.resPop').show();
//        } else {
//            $('.resPop').hide();
//        }

        if ($scope.PopData != null && $scope.PopData.length !=0 && $scope.PopData[0].POPID !=0){
            $('.resPop').show();
        }else{
            $('.resPop').hide()
        } 
        
        
       
        if (dataLoaded == 1 && prevSubprodID == SubProdID && prevCaseID == localCaseID) { return; }
        else {

        popLoaded=0;
        charLoaded=0;
        portspeedLoaded=0;
           
            $(".pageLoaderOverlay").show();
            SubChildProdPortSpeed.dispMPLS($scope.Product, SubProdID).success(function (data) {
                $scope.dispMPLSProdchar = data.d[0].Item1;
                $scope.dispMPLSsubProdchar = data.d[0].Item2;

                if ($scope.dispMPLSProdchar == 1 && $scope.dispMPLSsubProdchar == 1) {
                    $(".showNetwork").show();
                    $(".pageLoaderOverlay").show();
                    SubprodPopCharsfctry.GetPopChars($scope.modPoP, $scope.Product, SubProdID).success(function (data) {
                       
                        if (data.d != null && data.d.length != 0) {
                            $scope.SubprodPopCharData = data.d;
                            $('.DivPopchar').show();
                            popLoaded=1;
                            $scope.stopLoader();
                        }
                        else {
                            $('.DivPopchar').hide();
                            popLoaded=1;
                            $scope.stopLoader();
                        }

                        

                    }).error(function (data, status, headers, config) {
                        $(".pageLoaderOverlay").hide();
                        console.log("charecteristicsapi call failed ");
                    });

                }
                else {
                    $(".showNetwork").hide();
                    $('.DivPopchar').hide();
                    popLoaded=1;
                    $scope.stopLoader();
                }


            }).error(function (data, status, headers, config) {
                $(".pageLoaderOverlay").hide();
                console.log("dispMPLS call failed ");
                popLoaded=1;
            });

            
            GetSubproductChartype.getchartype(localCaseID).success(function (data) {
              
                $scope.Subprodchars = data.d;
                resCharacteristics = $scope.Subprodchars;

              charLoaded=1;
              $scope.stopLoader();


            }).error(function (data, status, headers, config) {
                $(".pageLoaderOverlay").hide();
                console.log("charecteristicsapi call failed ");
            });
            $scope.IsParentsSpeeds=false;
            $scope.ischildSpeeds=false;

            
            if (ParentProdID == 0) {
                $(".pageLoaderOverlay").show();
                $("#slainfoSubProd").show();
                $("#trParentSpeedFilters").show();
                $("#Parent1Paging").hide();
                // $("#Parent2Paging").hide();
                $("#Child1Paging").hide();
                // $("#Child2Paging").hide();
               
                var AccSupplier1=0;
                var PortSpeed1=0;
                var ChildProduct1=0;

                SubChildProdPortSpeed.getPortspeedSearchCriteria(localCaseID, $scope.modPoP, $scope.Country).success(function (data) {
                    $scope.AllAccessSupp = data.d;

                    if (data.d.accSupplierList == null || data.d.accSupplierList.length == 0) {
                        $("#slainfoSubProd").hide();
                        $("#trParentSpeedFilters").hide();
                       
                    } else {
                        $scope.subProdAccSupp = data.d.accSupplierList;
                        $scope.subProdAccSpeedData = data.d.AccessSpeedList;
                        $scope.subProdSuppProdData = data.d.SupplierProductList;
                        $scope.subProdAccTypeData = data.d.AccessTypeList;

                        $("#pAccSpeed").show();
                        $("#pAccType").show();
                        $("#pSuppProd").show();
                    }

                     ParentAccessSupplier.getPortSpeed(localCaseID, access, $scope.modPoP, $scope.Country).success(function (data) {
                        if (data.d.pSpeed == null || data.d.pSpeed.length == 0) {
                        $("#slainfoSubProd").hide();
                        $("#trParentSpeedFilters").hide();
                         // $(".pageLoaderOverlay").hide();
                        } else {
                            $scope.subprodPortSpeedData = data.d.pSpeed;
                          //$(".pageLoaderOverlay").hide();
                          $("#pPortSpeed").show();

                        }

                        portspeedLoaded=1;
                        $scope.stopLoader();

                    })
                    .error(function (error) {
                        $(".pageLoaderOverlay").hide();
                        console.log("Problem occured while loading portspeed search dropdowns; " + error);
                    });

//             SubChildProdPortSpeed.getCPESupplier($scope.Country, $scope.Product, $scope.modCity).success(function (data) {

//                    PortSpeed1=1;
//                    if(AccSupplier1==1 && PortSpeed1==1)
//                    {
//                        $(".pageLoaderOverlay").hide();
//                    }

//                    //$(".pageLoaderOverlay").hide();
//                    $scope.CpeSupplierData = data.d;

//                }).error(function (error) {
//                    $(".pageLoaderOverlay").hide();
//                    console.log("Problem occured while loading portspeed search dropdowns; " + error);
//                });

                })
                .error(function (error) {
                    console.log("Problem occured while loading access supplier search dropdowns; " + error);
                    $(".pageLoaderOverlay").hide();
                });

            } else {
                $("#trParentSpeedFilters").hide();
            }

            //for child product
            if (ParentProdID > 0) {

                var CharTypeID = 28;
                $(".pageLoaderOverlay").show();
                $('#tblPortSpeedFilters').show();
                $("#slainfoSubProd").show();
                $("#Parent1Paging").hide();
                // $("#Parent2Paging").hide();
                $("#Child1Paging").hide();
                // $("#Child2Paging").hide();

                SubChildProdPortSpeed.getAccessSupp(localCaseID, $scope.Product, ParentProdID, $scope.modPoP, CharTypeID, $scope.Country, capmanPlatform).success(function (data) {
                    $scope.AllData1 = data.d;
                   
                    if (data.d.accSupplierList == null || data.d.accSupplierList.length == 0) {
                        $('#tblPortSpeedFilters').hide();
                        $("#slainfoSubProd").hide();
                        
                    } else {
                        $scope.pChildAccSuppdata = data.d.accSupplierList;
                        $scope.pSupplierProductData = data.d.SupplierProductList;
                        $scope.pAccessSpeedData = data.d.AccessSpeedList;
                        $scope.pAccessTypeData = data.d.AccessTypeList;
                        $('#tblPortSpeedFilters').show();
                        $("#slainfoSubProd").show();   
                        $("#ddlAccSpeed").show();
                        $("#ddlSuppProd").show();
                        $("#ddlAccType").show(); 
                    }

                    SubChildProdPortSpeed.getPortSpeed(localCaseID, $scope.Product, ParentProdID, $scope.modPoP, CharTypeID, $scope.Country, capmanPlatform).success(function (data) {
                        $scope.pChildPortSpeedData = data.d.pSpeed;
                        $("#ddlPortSpeed").show();



                        $http.post('Search.aspx/GetChildPortSpeedCount', { 'CaseID': localCaseID })
                        .success(function (data, status, headers, config) {

                        if (data.d > 0) {
                            SubChildProdPortSpeed.getPortspeedSearchCriteria(localCaseID, $scope.modPoP, $scope.Country).success(function (data) {
                            $scope.AllAccessSupp = data.d;
                            if(data.d.accSupplierList !=null && data.d.accSupplierList.length!=0){
                                
                               
                                $scope.subProdAccSupp = data.d.accSupplierList;
                                $scope.subProdAccSpeedData = data.d.AccessSpeedList;
                                $scope.subProdSuppProdData = data.d.SupplierProductList;
                                $scope.subProdAccTypeData = data.d.AccessTypeList;

                                $("#pAccSpeed").show();
                                $("#pAccType").show();
                                $("#pSuppProd").show();

                                ParentAccessSupplier.getPortSpeed(localCaseID, access, $scope.modPoP, $scope.Country).success(function (data) {
                                    $scope.subprodPortSpeedData = data.d.pSpeed;
                                    $("#pPortSpeed").show();
                                    $("#trParentSpeedFilters").show();
                                    //$("#tblParentSpeeds").show();

                                    $("#lblParentCPESuppliers").show();
                                    $("#ddlParentCPESuppliers").show();

                                    $("#lblChildCPESuppliers").hide();
                                    $("#ddlChildCPESuppliers").hide();
                                    portspeedLoaded=1;
                                    $scope.stopLoader();

                                }).error(function (error) {
                                    console.log("Problem occured while loading portspeed search dropdowns; " + error);
                                    $(".pageLoaderOverlay").hide();
                                });
                           
                           }else{
                            portspeedLoaded=1;
                            $scope.stopLoader();
                           }
                           
                        }).error(function (error) {
                            console.log("Problem occured while loading access supplier search dropdowns; " + error);
                            $(".pageLoaderOverlay").hide();
                        });
                    }
                    else {
                        $("#trParentSpeedFilters").hide();
                        $("#tblParentSpeeds").hide();
                          portspeedLoaded=1;
                          $scope.stopLoader();
                    }
                });

                }).error(function (error) {
                    $(".pageLoaderOverlay").hide();
                    console.log("Problem occured while loading parent port speed" + error);
                });

                }).error(function (error) {
                    $(".pageLoaderOverlay").hide();
                    console.log("Problem occured while loading child port speed" + error);
                });

            }
            else {
                $('#tblPortSpeedFilters').hide();
            }

            //to display footer user details
            UserInfofactory.GetUserInfo(localCaseID, 'CSU_Case_Details').success(function (data) {

                $("#divUserInfo").show();
                $scope.CreatedBy = data.d.CreatedBy;
                $scope.CreatedDate = data.d.CreatedDate;
                $scope.UpdatedBy = data.d.UpdatedBy;
                $scope.UpdatedDate = data.d.UpdatedDate;


            });

            dataLoaded = 1;
            prevCaseID = localCaseID;
            prevSubprodID = SubProdID;
        }


    }

    $scope.stopLoader=function(){
        if(popLoaded ==1 && charLoaded== 1 && portspeedLoaded==1){
              $(".pageLoaderOverlay").hide();
        }else{
            $(".pageLoaderOverlay").show();
        }
    }

     
    //on click of go below method will be called
    $scope.GetPortSpeeds = function (localCaseId, ParentAccSupp, subProdParentPortSpeed, ParentAccSpeed, ParentAccessSuppProdId,
    ParentAccType, ParentCPESuppliers,flag) {

        $scope.isParentSpeeds =  false;
        var SelectedPortSpeedData = '';
        var ParentAccessSpeed = '';
        var ParentAccessSupplierProduct = '';
        var ParentAccessType = '';

        if (angular.isUndefined(ParentAccSupp) || ParentAccSupp == '' || ParentAccSupp == null) {
            ParentAccSupp = -1;
        }

        if (angular.isUndefined(subProdParentPortSpeed) || subProdParentPortSpeed == '') {
            $("#spnChildPortSpeed").show();
            return;
        }
        else {
            SelectedPortSpeedData = subProdParentPortSpeed.join();
            $("#spnChildPortSpeed").hide();
        }


        if (angular.isUndefined(ParentCPESuppliers) || ParentCPESuppliers == '') {
            ParentCPESuppliers = 0;
        }

        if (angular.isUndefined(ParentAccSpeed) || ParentAccSpeed == '') {
            ParentAccessSpeed = 'N/A';
        }
        else {
            ParentAccessSpeed = ParentAccSpeed.join();
        }

        if (angular.isUndefined(ParentAccessSuppProdId) || ParentAccessSuppProdId == '') {
            ParentAccessSupplierProduct = 'N/A';
        }
        else {
            ParentAccessSupplierProduct = ParentAccessSuppProdId.join();
        }

        if (angular.isUndefined(ParentAccType) || ParentAccType == '') {
            ParentAccessType = 'N/A';
        }
        else {
            ParentAccessType = ParentAccType.join();
        }

       if (flag == true) {
            $scope.PageNo = 1;
        }

       

        $(".pageLoaderOverlay").show();
        SubChildProdPortSpeed.PortSpeedGrid(localCaseId, ParentAccSupp, ParentCPESuppliers, SelectedPortSpeedData,
         $scope.Product, ParentAccessSpeed, ParentAccessSupplierProduct, ParentAccessType,$scope.CPEExists, $scope.Country,$scope.PageNo).success(function (data) {
             aaa = data.d;
            

             if (data.d.length == 0) {
                 $("#tblParentSpeeds").hide();
                 $scope.isParentSpeeds = true;

             }
             else {
               $scope.MaxRecords = data.d[0].RecCount;
               $scope.PageCount = data.d[0].PageCount;

               if(data.d[0].PageCount>1){
                $("#Parent1Paging").show();
               }else{
                $("#Parent1Paging").hide()
               }



                 $scope.subProdParentPortSpeedGrid = data.d;
                 $("#tblParentSpeeds").show();

               //  $("#Parent1Paging").hide();
                // $("#Parent2Paging").hide();
              //  $("#Child1Paging").hide();
                // $("#Child2Paging").hide();
             }

             
            if(data.d.length==1)
            {
              $("#tblParentSpeeds").attr("style","height:230px");
            }
            if(data.d.length==2)
            {
              $("#tblParentSpeeds").attr("style","height:280px");
            }
            if(data.d.length==3)
            {
              $("#tblParentSpeeds").attr("style","height:335px");
            }
            if(data.d.length==4)
            {
              $("#tblParentSpeeds").attr("style","height:380px");
            }
            if(data.d.length==5)
            {
              $("#tblParentSpeeds").attr("style","height:440px");
            }
            if(data.d.length==6)
            {
              $("#tblParentSpeeds").attr("style","height:490px");
            }
            if(data.d.length==7)
            {
              $("#tblParentSpeeds").attr("style","height:540px");
            }
            if(data.d.length==8)
            {
              $("#tblParentSpeeds").attr("style","height:590px");
            }
            if(data.d.length==9)
            {
              $("#tblParentSpeeds").attr("style","height:640px");
            }
            if(data.d.length>9)
            {
              $("#tblParentSpeeds").attr("style","height:690px");
            }
           



             $(".pageLoaderOverlay").hide();
         }).error(function (error) {
             console.log("Problem occured while loading portspeed search dropdowns; " + error);
         });
    }

    //this will get the parent/child port speed details
    $scope.GetpPortSpeeds = function (localCaseID, pAccessSupplier, pPortSpeed, pAccessSpeed, pAccessSuppProduct, pAccessType, pCPESuppliers,flag) {

        var SelectedPortSpeedData = '';
        var ChildAccessSpeed = '';
        var ChildAccessSupplierProduct = '';
        var ChildAccessType = '';
        $scope.IsParentsSpeeds = false;

        if (angular.isUndefined(pAccessSupplier) || pAccessSupplier == '' || pAccessSupplier == null) {

            pAccessSupplier = -1;
        }
        if (angular.isUndefined(pPortSpeed) || pPortSpeed == '' || pPortSpeed == null) {
            $("#spnParentportSpeed").show();
            return;
        }
        else {
            SelectedPortSpeedData = pPortSpeed.join();
            $("#spnParentportSpeed").hide();
        }

        if (angular.isUndefined(pCPESuppliers) || pCPESuppliers == '' || pCPESuppliers == null) {
            pCPESuppliers = 0;
        }

        if (angular.isUndefined(pAccessSpeed) || pAccessSpeed == '') {
            ChildAccessSpeed = 'N/A';
        }
        else {
            ChildAccessSpeed = pAccessSpeed.join();
        }

        if (angular.isUndefined(pAccessSuppProduct) || pAccessSuppProduct == '') {
            ChildAccessSupplierProduct = 'N/A';
        }
        else {
            ChildAccessSupplierProduct = pAccessSuppProduct.join();
        }

        if (angular.isUndefined(pAccessType) || pAccessType == '') {
            ChildAccessType = 'N/A';
        }
        else {
            ChildAccessType = pAccessType.join();
        }

        if (flag == true) {
            $scope.PageNum = 1;
        }

        $(".pageLoaderOverlay").show();
       
        SubChildProdPortSpeed.ParentPortSpeedGrid(localCaseID, pAccessSupplier, $scope.Product, pCPESuppliers,
            SelectedPortSpeedData, ParentProdID, ChildAccessSpeed, ChildAccessSupplierProduct, ChildAccessType,
           $scope.CPEExists, $scope.Country,$scope.PageNum).success(function (data) {

        if (data.d.length == 0) {
                    $("#tblChildSpeeds").hide();
                    $scope.IsParentsSpeeds = true;
                }
                else {
                    $("#tblChildSpeeds").show();
                    $scope.pPortSpeedGridData = data.d;
                       $scope.MaxRecords = data.d[0].RecCount;
                        $scope.ChildPageCount = data.d[0].PageCount;
                }

                if(data.d[0].PageCount>1){
                    $("#Child1Paging").show();
                }else{
                    $("#Child1Paging").hide();
                }

               // $("#Parent1Paging").hide();
                // $("#Parent2Paging").hide();
               // $("#Child1Paging").hide();
                // $("#Child2Paging").hide();


            if(data.d.length==1)
            {
              $("#tblChildSpeeds").attr("style","height:230px");
            }
            if(data.d.length==2)
            {
              $("#tblChildSpeeds").attr("style","height:280px");
            }
            if(data.d.length==3)
            {
              $("#tblChildSpeeds").attr("style","height:335px");
            }
            if(data.d.length==4)
            {
              $("#tblChildSpeeds").attr("style","height:380px");
            }
            if(data.d.length==5)
            {
              $("#tblChildSpeeds").attr("style","height:440px");
            }
            if(data.d.length==6)
            {
              $("#tblChildSpeeds").attr("style","height:490px");
            }
            if(data.d.length==7)
            {
              $("#tblChildSpeeds").attr("style","height:540px");
            }
            if(data.d.length==8)
            {
              $("#tblChildSpeeds").attr("style","height:590px");
            }
            if(data.d.length==9)
            {
              $("#tblChildSpeeds").attr("style","height:640px");
            }
            if(data.d.length>9)
            {
              $("#tblChildSpeeds").attr("style","height:690px");
            }


                $(".pageLoaderOverlay").hide();
            }).error(function (error) {
                $(".pageLoaderOverlay").hide();
                console.log("Problem occured while loading portspeed search dropdowns; " + error);
            });
    }


    $scope.subProdPrevParent = function (localCaseId, ParentAccSupp, subProdParentPortSpeed, ParentAccSpeed, ParentAccessSuppProdId,
    ParentAccType, ParentCPESuppliers) {
        $scope.Paging = true;

        if ($scope.PageNo == 1) {
            return;
        }

        if ($scope.PageNo > 1) {
            $scope.PageNo = $scope.PageNo - 1;
        }
        else {
            $scope.PageNo = 1;
        }
        $scope.GetPortSpeeds(localCaseId, ParentAccSupp, subProdParentPortSpeed, ParentAccSpeed, ParentAccessSuppProdId,
    ParentAccType, ParentCPESuppliers,false);
    }

    $scope.subProdNextParent = function (localCaseId, ParentAccSupp, subProdParentPortSpeed, ParentAccSpeed, ParentAccessSuppProdId,
    ParentAccType, ParentCPESuppliers) {
        $scope.Paging = true;
        var RecCount = 0;

        if ($scope.PageNo > 0) {
            //$scope.MaxRecords

            if (($scope.PageNo * $scope.PageSize) >= $scope.MaxRecords) {
                //alert("Pages Completed");
                return;
            }
            else {
                $scope.PageNo = $scope.PageNo + 1;
            }

        }
        else {
            $scope.PageNo = 1;
        }
        $scope.GetPortSpeeds(localCaseId, ParentAccSupp, subProdParentPortSpeed, ParentAccSpeed, ParentAccessSuppProdId,
    ParentAccType, ParentCPESuppliers,false);
    }


    $scope.subProdPrevChild = function (localCaseID, pAccessSupplier, pPortSpeed, pAccessSpeed, pAccessSuppProduct, pAccessType, pCPESuppliers) {


        if ($scope.PageNum == 1) {
            return;
        }

        if ($scope.PageNum > 1) {
            $scope.PageNum = $scope.PageNum - 1;
        }
        else {
            $scope.PageNum = 1;
        }
        $scope.GeChildPortSpeeds(localCaseID, pAccessSupplier, pPortSpeed, pAccessSpeed, pAccessSuppProduct, pAccessType, pCPESuppliers,false);
    }

    $scope.subProdNextChild = function (localCaseID, pAccessSupplier, pPortSpeed, pAccessSpeed, pAccessSuppProduct, pAccessType, pCPESuppliers) {

        var RecCount = 0;
        if ($scope.PageNo > 0) {
            //$scope.MaxRecords

            if (($scope.PageNum * $scope.PageSize) >= $scope.MaxRecords) {
                //alert("Pages Completed");
                return;
            }
            else {
                $scope.PageNum = $scope.PageNum + 1;
            }

        }
        else {
            $scope.PageNum = 1;
        }
        $scope.GeChildPortSpeeds(localCaseID, pAccessSupplier, pPortSpeed, pAccessSpeed, pAccessSuppProduct, pAccessType, pCPESuppliers,false);
    }




    $scope.openSLAPopup = function (AccSuppNameId, supplier, supplierproduct, AccessSupplierCharID, AccessProductTypeID, AccessSpeedCharID,ASpeed) {

        SLAinfoparam.setAccSuppName(supplier);
        SLAinfoparam.setSupProduct(supplierproduct);
        SLAinfoparam.setAccSuppCharID(AccessSupplierCharID);
        SLAinfoparam.setsuppAccTypeId(AccessProductTypeID);
        SLAinfoparam.setAccSuppNameId(AccSuppNameId);
        SLAinfoparam.setAccessSpeedCharID(AccessSpeedCharID);
        SLAinfoparam.setASpeedUOM('');
        SLAinfoparam.setASpeed(ASpeed);
        SLAinfoparam.setstrDSL('N');
        $modal.open({
            templateUrl: 'Search/SLAInformation.htm',
            controller: 'SLAInfoCntrl'
        });
    }

    $scope.OpenAccDetPopup = function (AccessSupplierCharID) {

        DispAccDet.setAccSuppCharID(AccessSupplierCharID);
        glbPOPID.setPOPID($scope.modPoP);
        glbCityID.setCityID($scope.modCity);
        $modal.open({
            templateUrl: 'Search/DispAccessDetails.htm'
            //controller: 'dispAccessDetContrl'
        });
    }


    $scope.MouseOver = function (index) {
        $("#tblAT" + index).show();
    }

    $scope.MouseLeave = function (index) {
        $("#tblAT" + index).hide();
    }

    $scope.MouseOverOffnetWithCPE = function (index) {
        $("#tblOffnetWithCPE" + index).show();
    }

    $scope.MouseLeaveOffnetWithCPE = function (index) {
        $("#tblOffnetWithCPE" + index).hide();
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

    $scope.MouseOverOnnetWithOutCPE = function (index) {
        $("#tblOnnetWithOutCPE" + index).show();
    }

    $scope.MouseLeaveOnnetWithOutCPE = function (index) {
        $("#tblOnnetWithOutCPE" + index).hide();
    }


    $scope.ParentMouseOver = function (index) {
        $("#tblParentAccTech" + index).show();
    }

    $scope.ParentMouseLeave = function (index) {
        $("#tblParentAccTech" + index).hide();
    }


    $scope.ParentMouseOverOffnetWithCPE = function (index) {
        $("#tblParentOffnetWithCPE" + index).show();
    }

    $scope.ParentMouseLeaveOffnetWithCPE = function (index) {
        $("#tblParentOffnetWithCPE" + index).hide();
    }

    $scope.ParentMouseOverOffnetWithOutCPE = function (index) {
        $("#tblParentOffnetWithOutCPE" + index).show();
    }

    $scope.ParentMouseLeaveOffnetWithOutCPE = function (index) {
        $("#tblParentOffnetWithOutCPE" + index).hide();
    }

    $scope.ParentMouseOverOnnetWithCPE = function (index) {
        $("#tblParentOverOnnetWithCPE" + index).show();
    }

    $scope.ParentMouseLeaveOnnetWithCPE = function (index) {
        $("#tblParentOverOnnetWithCPE" + index).hide();
    }

    $scope.ParentMouseOverOnnetWithOutCPE = function (index) {
        $("#tblParentMouseOverOnnetWithOutCPE" + index).show();
    }

    $scope.ParentMouseLeaveOnnetWithOutCPE = function (index) {
        $("#tblParentMouseOverOnnetWithOutCPE" + index).hide();
    }



    $scope.openReport = function () {
        $modal.open({
            templateUrl: 'Search/OnlineReport.htm'
        });
    }

});

app.factory("SubprodPopCharsfctry", function ($http) {
    var SubprodPopCharsfctry = {};
    SubprodPopCharsfctry.GetPopChars = function (SiteID, ProductID, subproductid) {

        return $http.post('DispSubProduct.aspx/FetchPopCharacteristics', { 'SiteID': SiteID, 'ProductID': ProductID, 'subproductID': subproductid })
        .success(function (data, status, headers, config) {


        })
        .error(function (error) {
            console.log("Problem occured while loading POP Char; " + error);
        });
    }
    return SubprodPopCharsfctry;
});


app.factory("GetSubproductChartype", function ($http) {
    //
    var GetSubproductChartype = {};
    GetSubproductChartype.getchartype = function (caseId) {

        return $http.post('DispSubProduct.aspx/GetSubprodCharacteristic', { 'CaseID': caseId })
        .success(function (data, status, headers, config) {


        })
        .error(function (error) {
            alert("Problem occured while loading Characteristics; " + error);
        });
    }
    return GetSubproductChartype;
});

app.factory("ParentAccessSupplier", function ($http) {
    var ParentAccessSupplier = {};
    //    ParentAccessSupplier.getAccessSupp = function (caseId, parentProdId, hubsiteId, countryId) {

    //        return $http.post('Search.aspx/GetAccessSuppliers', { 'CaseID': caseId, 'ProductID': parentProdId, 'HubSiteID': hubsiteId, 'CaseValidID': 1, 'CountryID': countryId })
    //        .success(function (data, status, headers, config) {


    //        })
    //        .error(function (error) {
    //            alert("Problem occured while loading parent access; " + error);
    //        });
    //    },

    ParentAccessSupplier.getPortSpeed = function (caseId, parentProdId, hubsiteId, countryId) {
        return $http.post('Search.aspx/GetPortSpeeds', { 'CaseID': caseId, 'ProductID': parentProdId, 'HubSiteID': hubsiteId, 'CaseValidID': 1, 'CountryID': countryId })
    },

    ParentAccessSupplier.ParentPortSpeedGrid = function (caseId, SupplierID, CPESuppliers, SelectedPortSpeed, ProductID) {
        //
        return $http.post('Search.aspx/GetChildPortSpeeds', { 'CaseID': caseId, 'SupplierID': SupplierID, 'CPESuppliers': CPESuppliers, 'SelectedPortSpeed': SelectedPortSpeed, 'ProductID': ProductID })
        .success(function (data, status, headers, config) {


        })
        .error(function (error) {
            console.log("Problem occured while loading port grid; " + error);
        });
    }

    return ParentAccessSupplier;
});


app.factory("SubChildProdPortSpeed", function ($http) {
    var SubChildProdPortSpeed = {};
    SubChildProdPortSpeed.getAccessSupp = function (caseId, prodId, parentProdId, hubsiteId, CharTypeID, countryId, CapmanPlatformID) {

        return $http.post('Search.aspx/GetParentAccessSupplier', { 'CaseID': caseId, 'ProductID': prodId, 'HubSiteID': hubsiteId, 'CaseValidID': 1, 'CountryID': countryId, 'CharTypeID': CharTypeID, 'ParentProductID': parentProdId, 'ValidateParent': 1, 'CapmanPlatformID': CapmanPlatformID })
        .success(function (data, status, headers, config) {


        })
        .error(function (error) {
            console.log("Problem occured while loading access; " + error);
        });
    },

    SubChildProdPortSpeed.getPortSpeed = function (caseId, prodId, parentProdId, hubsiteId, CharTypeID, countryId, CapmanPlatformID) {
        return $http.post('Search.aspx/GetParentPortSpeed', { 'CaseID': caseId, 'ProductID': prodId, 'HubSiteID': hubsiteId, 'CaseValidID': 1, 'CountryID': countryId, 'CharTypeID': CharTypeID, 'ParentProductID': parentProdId, 'ValidateParent': 1, 'CapmanPlatformID': CapmanPlatformID })
        .success(function (data, status, headers, config) {


        })
        .error(function (error) {
            console.log("Problem occured while loading port speed; " + error);
        });
    },

    SubChildProdPortSpeed.ParentPortSpeedGrid = function (caseId, suppId, prodId, CPESuppliers, SelectedPortSpeed, parentProdId,
     AccSpeed, SuppProduct, AccType,CPEExists, CountryID, PageNo) {
        return $http.post('Search.aspx/GetParentSpeeds', { 'CaseID': caseId, 'SupplierID': suppId, 'CPESuppliers': CPESuppliers,
            'SelectedPortSpeed': SelectedPortSpeed, 'ProductID': prodId, 'ParentProductID': parentProdId,
            'AccSpeed': AccSpeed, 'SuppProduct': SuppProduct, 'AccType': AccType,'CountryID': CountryID, 'CPEExists': CPEExists, 'PageNo': PageNo
        })
        .success(function (data, status, headers, config) {


        })
        .error(function (error) {
            console.log("Problem occured while loading port speed grid; " + error);
        });
    }

    SubChildProdPortSpeed.getAccSuppPortSpeed = function (caseId, AccLevel, LDAPGfr, dristId, siteId, countryId) {
        return $http.post('DispSubProduct.aspx/GetAccSuppPortSpeed', { 'caseId': caseId, 'sAccessLevel': AccLevel, 'sLDAPGfr': LDAPGfr, 'dristributorId': dristId,
            'access': 25, 'hubSuteId': siteId, "countryId": countryId
        })
        .success(function (data, status, headers, config) {


        })
        .error(function (error) {
            alert("Problem occured while loading port speed grid; " + error);
        });
    },

    SubChildProdPortSpeed.PortSpeedGrid = function (caseId, SupplierID, CPESuppliers, SelectedPortSpeed, ProductID, AccSpeed, SuppProduct,
     AccType,CPEExists,CountryID,PageNo) {
        return $http.post('Search.aspx/GetChildPortSpeeds', { 'CaseID': caseId, 'SupplierID': SupplierID, 'CPESuppliers': CPESuppliers,
         'SelectedPortSpeed': SelectedPortSpeed, 'ProductID': ProductID, 'AccSpeed': AccSpeed, 'SuppProduct': SuppProduct,
          'AccType': AccType, 'CPEExists': CPEExists,'CountryID': CountryID, 'PageNo': PageNo });
    },

    SubChildProdPortSpeed.getPortspeedSearchCriteria = function (CaseID, HubSiteID, CountryID) {
        return $http.post('Search.aspx/GetAccessSuppliers', { 'CaseID': CaseID, 'ProductID': 25, 'HubSiteID': HubSiteID, 'CaseValidID': 1, 'CountryID': CountryID });
    },
    SubChildProdPortSpeed.getCPESupplier = function (CountryID, ProductID, CityID) {
        return $http.post('Search.aspx/GetSuppliersData', { 'countryID': CountryID, 'ProductID': ProductID, 'CityID': CityID })

    },

    SubChildProdPortSpeed.dispMPLS = function (prodID, subprodID) {
        return $http.post('DispSubProduct.aspx/displayMPLS', { 'ProductID': prodID, 'subProdID': subprodID });
    }

    return SubChildProdPortSpeed;
});


