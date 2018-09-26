// Functions that are called after content is loaded
onReady(function() {
    setVisible();
    readIcons();
    loadMoreCrypto();
    setColor();
    numberDisplay();
});

// GLOBALS
const searchField = document.getElementById('search-field');
const cryptoNameArray = Array.from(document.getElementsByClassName('crypto-name'));
const mainWrapper = document.getElementById('main-crypto');

searchField.onkeyup = function(event) {
    cryptoNameArray.forEach(function(cryptoName) {
        // Creates non case sensitive search.
        if (cryptoName.innerHTML.toLowerCase().includes(searchField.value.toLowerCase())) {
            cryptoName.parentElement.style.display = 'flex';
        } else {
            cryptoName.parentElement.style.display = 'none';
        }
    });
    
    // Set the searh error message if the counter value after loop stays 0 - no elements with a display flex.
    let errorText = mainWrapper.querySelector('#search-error');
    let counter = 0;
    cryptoNameArray.forEach(function(cryptoName) {
        if (cryptoName.parentElement.style.display == 'flex') {
            counter++;
        }
    });
    if (counter === 0) {
        errorText.innerHTML = 'There is no data about cryptocurrency searched by you.';
    } else {
        errorText.innerHTML = '';
    }
}

// This function is called when all the content is loaded
function onReady(callback) {
    var intervalId = window.setInterval(function() {
        // Wait every 2 seconds until the page content loads
        if (document.getElementsByTagName('body')[0] !== undefined) {
            window.clearInterval(intervalId);
            callback.call(this);
        }
    }, 1000);
}

// Function used after positive connecting to the API to insert the links to the img elements.
function saveIcons(cryptoObjects) {
    let symbol;
    let cryptoImageUrls = [];
    // Convert an HTMLCollection to an array.
    let cryptoImageArr = Array.from(document.getElementsByClassName('crypto-img'));
    let cryptoNameArr = Array.from(document.getElementsByClassName('crypto-name'));
    cryptoNameArr.forEach(function(crypto) {
        symbol = crypto.id;
        // Use eval() to define the path to links with logos
        if (eval("cryptoObjects."+symbol) != undefined) {
            cryptoImageUrls.push(eval("cryptoObjects."+symbol+".ImageUrl"));
        } else {
            cryptoImageUrls.push("No existing logo");
        }
    });
    
    // This array will hold full urls to the icons to save them later in the local storage
    let fullUrlsArray = [];
    // Loop through the array and insert the src attribute for every crypto img element.
    for (let i = 0; i < cryptoImageArr.length; i++) {
        cryptoImageArr[i].src = "https://www.cryptocompare.com" + cryptoImageUrls[i];
        fullUrlsArray[i] = "https://www.cryptocompare.com" + cryptoImageUrls[i];
    }
    // Urls are saved in the local storage for later use in a pages containing crypto details, so the it will not require another request to the API of cryptocompare.com.
    // The array is also converted to the string to store it in a local storage.
    localStorage.setItem("array", JSON.stringify(fullUrlsArray));
}

// Connect to the cryptocompare.com API to collect the links for images of coins
function readIcons() {
    // Getting API using XMLHttpRequest
    const xhr = new XMLHttpRequest();
    xhr.open("GET", 'https://min-api.cryptocompare.com/data/all/coinlist');
    xhr.onload = function() {
        if (this.status === 200) {
            // it works
            saveIcons(JSON.parse(this.responseText).Data);
        } else {
            // throw error if not
            console.log('Error loading data.');
        }
    }
    xhr.send();
}

// Function for creating a counter that increments with every call
function createCounter() {
    let counter = 4;
    const countUp = function() {
        counter += 5;
        return counter;
    }
    return countUp;
};
// Global variable assigned as a return value of the createCounter()
let increment = createCounter();

// Load more cryptocurrencies on a button click
function loadMoreCrypto() {
    let counter = increment();
    let cryptoBlocks = document.querySelectorAll('.crypto-block');
    for (var i=0; i<cryptoBlocks.length; i++) {
        if (i > counter) {
            cryptoBlocks[i].style.display = 'none';   
        } else {
            cryptoBlocks[i].style.display = 'flex';   
        }
    }
}

// Change the style of loading page and the main page
function setVisible() {
    document.querySelector('#main-crypto').style.display = "flex";
    document.querySelector('#loading').style.zIndex = "-1";
    setTimeout(function() {
        document.querySelector('#loading').style.display = "none";
        document.querySelector('#main-crypto').style.opacity = "1";
    }, 500);
}

// Setting colors of procents
function setColor() {
    let percentElements = document.querySelectorAll(".percent-change");
    
    // Loop through all percent-change elements
    for (var element of percentElements) {
        // Change the color depending on plus or minus value
        if (element.textContent.charAt(0) == "-") {
            element.style.color = "#D83D2E"; /* red */   
        } else if (element.textContent == "0.0%") {
            element.style.color = "#404040"; /* grey */           
        } else {
            element.style.color = "#27A513"; /* green */   
        }
        
        // Handle the null result
        if (element.textContent.charAt(0) == "%") {
            element.textContent = "n/a";
            element.style.color = "#404040";
        }
    }
};

// Changing the display of prices
function numberDisplay() {
    let marketCapElements = document.querySelectorAll(".crypto-marketcap");
    let priceElements = document.querySelectorAll(".crypto-price");
    
    // Elements of the Market Cap
    for (var element of marketCapElements) {
        // Remove the fractional digits from the string.
        element.textContent = element.textContent.replace(".0", "");
            
        // Coma in the thousands with regex
        element.textContent = element.textContent.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    
    // Elements of the Price
    for (var element of priceElements) {
        // Coma in the thousands with regex
        element.textContent = element.textContent.replace(/\B(?=(\d{3})+(?!\d))/g, ",");  
    }
};