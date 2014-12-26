document.addEventListener("DOMContentLoaded", function() {

    var phoneNumber = document.getElementById("phonenumber");
    var password = document.getElementById("password");

    /* Load phone number from local storage */
    var storedPhoneNumber = localStorage.getItem("simyoPhoneNumber");
    if(storedPhoneNumber != null && storedPhoneNumber.length > 0) {
        phoneNumber.value = storedPhoneNumber;
    }

    /* Process check button press */
    var checkForm = document.getElementById("checkform");
    checkForm.addEventListener("submit", function(e) {
        e.preventDefault();

        /* Check for empty phone number / password */
        if(phoneNumber.value == "") {
            phoneNumber.classList.add("error");        
        }
        else {
            phoneNumber.classList.remove("error");        
        }
        if(password.value == "") {
            password.classList.add("error");        
        }
        else {
            password.classList.remove("error");        
        }

        /* Submit if no errors */
        if(password.value != "" && phoneNumber.value != "") {
            localStorage.setItem("simyoPhoneNumber", phoneNumber.value);
            simyoLogin(phoneNumber.value, password.value, showUsagePage);
        }
    });
    return false;
});


function simyoLogin(number, password, callback) {

    /* Create request */
    var req = new XMLHttpRequest({mozSystem: true, withCredentials: true});
    req.withCredentials = true;
    req.open("POST", "https://noveria.nl/simyo.py", true);
    req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    
    /* Show progress bar etc. */
    var checkButton = document.getElementById("checkStatus");
    var loading = document.getElementById("loadSimyo");
    checkButton.disabled = true;
    loading.style.visibility = "visible";

    /* Process response */
    req.onload = function(e, d) {
        if(req.response != "") {
            var data = JSON.parse(req.response);
            /* If there is response data, it was a success; if not: show an error */
            if(Object.keys(data).length > 0) {
                callback(data);
            }
            else {
                var errorScreen = document.getElementById("remoteError");
                errorScreen.style.display = "block";
                setTimeout(function() { errorScreen.style.display = "none"; }, 3000);
            }
            checkButton.disabled = false;
            loading.style.visibility = "hidden";
        }
    }
    
    endRequest = function() {
        var errorScreen = document.getElementById("networkError");
        errorScreen.style.display = "block";
        setTimeout(function() { errorScreen.style.display = "none"; }, 3000);
        checkButton.disabled = false;
        loading.style.visibility = "hidden";
    }
    
    req.onerror = endRequest;
    req.onabort = endRequest;
    
    /* Send username/password to remote server which contacts Simyo */
    req.send("username=" + number + "&password=" + password);
}

/* Navigate to the page which shows the usage data */
function showUsagePage(data) {
    /*Store usage data in session storage, so it can be retrieved by the usage page, then navigate there. */
    sessionStorage.setItem("simyoUsageData", JSON.stringify(data));
    document.location = "usage.html";
}
