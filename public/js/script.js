// Functions that are called in a callback after content is loaded
onReady(function() {
    setVisible();
    loadMoreCrypto();
    setColor();
    numberDisplay();
});

// This function is called when all the content is loaded
function onReady(callback) {
    var intervalId = window.setInterval(function() {
        // Wait every 2 seconds until the page content loads
        if (document.getElementsByTagName('body')[0] !== undefined) {
            window.clearInterval(intervalId);
            callback.call(this);
        }
    }, 2000);
}

// Function for creating a counter that increments with every call
function createCounter() {
    let counter = 4;
    const myFunction = function() {
        counter += 5;
        return counter
    }
    return myFunction
};

// Global variable assigned as a return value of the createCounter()
let increment = createCounter();

// Load more cryptocurrencies on a button click
function loadMoreCrypto() {
    let counter = increment();
    let cryptoBlocks = document.querySelectorAll('.crypto-block');
    console.log(counter);
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