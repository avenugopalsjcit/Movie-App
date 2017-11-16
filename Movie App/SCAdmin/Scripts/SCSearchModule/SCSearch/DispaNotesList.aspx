<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="DispaNotesList.aspx.cs"
    Inherits="SCSearch.DispaNotesList" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head>
    <title></title>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link href="BootStrap/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
    <link href="BootStrap/css/styles.css" rel="stylesheet" type="text/css" />
</head>
<body ng-app="appNotes">
    <div class="container" ng-controller="DispNotesController">
        <div class="row">
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <div class="panel-heading">
                    <h3 class="bg-primary text-center" style="font-size: 18px">
                        <label ng-show="isProduct==0" style="margin-top:5px">
                            Notes for {{ProductName}} / {{RegionName}}/ {{CountryName}}
                        </label>
                        <label ng-show="isProduct==1" style="margin-top:5px">
                            Notes for {{ProductName}}
                        </label>
                        <label ng-show="isProduct==2" style="margin-top:5px">
                            Notes for {{ProductName}} / {{RegionName}}
                        </label>
                    </h3>
                </div>
                <table cellpadding="0" cellspacing="0" class="table table-bordered">
                    <tr>
                        <td width="25%" rowspan="1" colspan="1" class="Arrow">
                            <b>Note Owner:</b>
                        </td>
                        <td width="25%" rowspan="1" colspan="3" class="Arrow">
                            {{UserName}}
                        </td>
                    </tr>
                    <tr>
                        <td width="25%" rowspan="1" colspan="1" class="Arrow">
                            <b>Note Priority:</b>
                        </td>
                        <td width="25%" rowspan="1" colspan="1" class="Arrow">
                            {{NotePriority}}
                        </td>
                        <td width="25%" rowspan="1" colspan="1" class="Arrow">
                            <b>Note Category:</b>
                        </td>
                        <td width="25%" rowspan="1" colspan="1" class="Arrow">
                            {{NoteCatageroy}}
                        </td>
                    </tr>
                    <tr>
                        <td width="25%" rowspan="1" colspan="1" class="Arrow">
                            <b>Effective Begin Date:</b>
                        </td>
                        <td width="25%" rowspan="1" colspan="1" class="Arrow">
                            {{NOTEEFFBEGDATE}}
                        </td>
                        <td width="25%" rowspan="1" colspan="1" class="Arrow">
                            <b>Effective End Date:</b>
                        </td>
                        <td width="25%" rowspan="1" colspan="1" class="Arrow">
                            {{NOTEEFFENDDATE}}
                        </td>
                    </tr>
                    <tr>
                        <td width="25%" rowspan="1" colspan="1" class="Arrow">
                            <b>Note Title:</b>
                        </td>
                        <td width="25%" rowspan="1" colspan="3" class="Arrow">
                            <b>{{NoteTitle}}</b>
                        </td>
                    </tr>
                   
                    <tr>
                        <td width="25%" rowspan="1" colspan="4" class="Arrow">
                            <div ng-bind-html="to_trusted()">
                            </div>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
    <div class="pageLoaderOverlay">
    </div>
    <script src="Scripts/angular.js" type="text/javascript"></script>
    <%-- <script src="/Scripts/angular-sanitize.js" type="text/javascript"></script>--%>
    <script src="Scripts/app/DispNotes.js" type="text/javascript"></script>
    <script src="Scripts/angular-sanitize.min.js" type="text/javascript"></script>  
    <script src="Scripts/jquery-1.9.1.js" type="text/javascript"></script>
</body>
</html>
