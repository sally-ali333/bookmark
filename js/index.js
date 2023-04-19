var siteName = document.getElementById("SiteName");
var siteURL = document.getElementById("SiteURL");
var submitBtn = document.getElementById("submitBtn");
var updateBtn = document.getElementById("updateBtn");
var newIndex = 0;
var siteList = [];
var requiredName = document.getElementById("requiredName");
var existName = document.getElementById("existName");

var requiredURL = document.getElementById("requiredURL");
var existURL = document.getElementById("existURL");
var invalidURL = document.getElementById("invalidURL");




if (getSite() != null) {
    siteList = getSite();
    displaySite(siteList);
}

function addSite() {
    if (validateName() & validateURL() & validateRegexURL()) {
        var site = {
            name: siteName.value,
            url: siteURL.value,
        }
        siteList.push(site);
        displaySite(siteList);
        storeSite();
        clearValue();
    }
}

function displaySite(list) {
    var box = ``;
    for (var i = 0; i < list.length; i++) {
        box += ` <div class="item p-5 mb-4 d-flex align-items-center flex-wrap">
        <h3 class="w-50 fw-bold mb-0 py-2">${list[i].name}</h3>
        <a href="${list[i].url}" class="btn btn-primary btn-sm me-2" target="_blank">Visit</a>
        <button class="btn btn-warning btn-sm me-2" onclick="updateSite(${i})">update</button>
        <button class="btn btn-danger btn-sm" onclick="deleteSite(${i})">Delete</button>
    </div>`
    }
    document.getElementById("bookmarkList").innerHTML = box;
}

function deleteSite(deletedIndex) {
    siteList.splice(deletedIndex, 1);
    displaySite(siteList);
    storeSite();
}

function clearValue() {
    siteName.value = "";
    siteURL.value = "";
}

function storeSite() {
    localStorage.setItem("siteList", JSON.stringify(siteList));
}

function getSite() {
    return JSON.parse(localStorage.getItem("siteList"));
}


function updateSite(updatedIndex) {
    newIndex = updatedIndex;
    siteName.value = siteList[updatedIndex].name;
    siteURL.value = siteList[updatedIndex].url;
    submitBtn.classList.add("d-none");
    updateBtn.classList.remove("d-none");
}


function displayUpdatedsite(newUpdatedIndex) {
    if (validateName() & validateURL() & validateRegexURL()) {
        siteList[newUpdatedIndex].name = siteName.value;
        siteList[newUpdatedIndex].url = siteURL.value;

        submitBtn.classList.remove("d-none");
        updateBtn.classList.add("d-none");

        displaySite(siteList);
        storeSite();
        clearValue();
    }
}


function searchSiteName(term) {
    var searchList = [];
    for (var i = 0; i < siteList.length; i++) {
        if (siteList[i].name.toLowerCase().includes(term.toLowerCase())) {
            searchList.push(siteList[i]);
        }
    }
    displaySite(searchList);
}


//validation


function validateName() {
    var res = false;

    for (var i = 0; i < siteList.length; i++) {
        if (siteList[i].name === siteName.value) {
            res = true;
        }
    }

    if (siteName.value !== "") {
        requiredName.classList.add("d-none");
        if (res == true) {
            existName.classList.remove("d-none");
            return false;
        } else {
            existName.classList.add("d-none");
            return true;
        }
    } else {
        requiredName.classList.remove("d-none");
        return false;
    }
}

function validateURL() {
    var res = false;

    for (var i = 0; i < siteList.length; i++) {
        if (siteList[i].url === siteURL.value) {
            res = true;
        }
    }

    if (siteURL.value !== "") {
        requiredURL.classList.add("d-none");
        if (res == true) {
            existURL.classList.remove("d-none");
            return false;
        } else {
            existURL.classList.add("d-none");
            return true;
        }
    } else {
        requiredURL.classList.remove("d-none");
        return false;
    }
}


function validateRegexURL() {
    var regex = /^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/;
    if (regex.test(siteURL.value) == true) {
        invalidURL.classList.add("d-none");
        return true;
    } else {
        invalidURL.classList.remove("d-none");
        return false;
    }
}
