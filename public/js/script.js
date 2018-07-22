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
    let marketCapElements = document.querySelectorAll(".marketcap");
    let priceElements = document.querySelectorAll(".price");
    
    // Elements of the Market Cap
    for (var element of marketCapElements) {
        // Remove the fractional digits from the string.
        element.textContent = element.textContent.replace(".0", "");
            
        // Number spacing with regex
        element.textContent = element.textContent.replace(/(\d)(?=(\d{3})+$)/g, '$1 ');
    }
    
    // Elements of the Price
    for (var element of priceElements) {
        // Number spacing with regex
        element.textContent = element.textContent.replace(/(\d)(?=(\d{3})+\.[^.]*$)/g, '$1 ');  
    }
};

setColor();
numberDisplay();