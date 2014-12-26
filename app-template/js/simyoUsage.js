document.addEventListener("DOMContentLoaded", function() {
    /* Load the usage data from the session storage (we can safely assume it's there ) */
    var data = sessionStorage.getItem("simyoUsageData");
    var usageData = JSON.parse(data);

    /* Format the data and show it */
    var rows = "";
    for(var i in usageData["GPRS_USAGE"]) {
        var l = usageData["GPRS_USAGE"].length - 1 - i; //Reverse the array

        if(l < 12) { //Show max. 12 months.
            rows = "<tr><td>"+ usageData["GPRS_USAGE"][i]["MONTH"] + "</td><td>"+ usageData["GPRS_USAGE"][i]["VALUE"] + " " + usageData["GPRS_USAGE"][i]["UNITS"] + "</td><td>" + usageData["VOICE_USAGE"][i]["VALUE"] + " " + usageData["VOICE_USAGE"][i]["UNITS"] + "</td><td>" + usageData["SMS_USAGE"][i]["VALUE"] + "</td></tr>" + rows;
        }
    }

    var table = document.getElementById("usageData");
    table.innerHTML = rows;
});
