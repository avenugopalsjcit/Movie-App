﻿

app.factory('JSONToCSVConvertor', function () {

    var JSONToCSVConvertor = {};
    JSONToCSVConvertor.ConvertJSONToCSV = function (JSONData, ShowLabel, fileName, iFrameId) {
        var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
        var CSV = '';
        if (ShowLabel) {
            var row = "";
            for (var index in arrData[0]) {
                row += index + ',';
            }
            row = row.slice(0, -1);
            CSV += row + '\r\n';
        }
        for (var i = 0; i < arrData.length; i++) {
            var row = "";
            for (var index in arrData[i]) {
                var arrValue = arrData[i][index] == null ? "" : '="' + arrData[i][index] + '"';
                row += arrValue + ',';
            }
            row.slice(0, row.length - 1);
            CSV += row + '\r\n';
        }
        if (CSV == '') {
            growl.error("Invalid data");
            return;
        }
        if (JSONToCSVConvertor.msieversion()) {
            var iframe = document.getElementById(iFrameId);            
            iframe = iframe.contentWindow || iframe.contentDocument;

            csvData = 'sep=,\r\n' + CSV;

            iframe.document.open("text/html", "replace");
            iframe.document.write(csvData);
            iframe.document.close();
            iframe.focus();
            iframe.document.execCommand('SaveAs', true, fileName + '.xls');
        } else {
            var uri = 'data:application/csv;charset=utf-8,' + escape(CSV);
            var link = document.createElement("a");
            link.href = uri;
            link.style = "visibility:hidden";
            link.download = fileName + ".csv";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }

    JSONToCSVConvertor.msieversion = function () {
        var ua = window.navigator.userAgent;
        var msie = ua.indexOf("MSIE ");
        if (msie != -1 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) // If Internet Explorer, return version number 
        {
            return true;
        } else { // If another browser, 
            return false;
        }
        return false;
    }

    return JSONToCSVConvertor;

});