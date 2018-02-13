function setColor() {
    let percentElements = document.querySelectorAll(".percent-change");
    let percentStringArray;
    
    // Loop through all percent-change elements
    for (var element of percentElements) {
        if (element.textContent.charAt(0) == "-") {
            element.style.color = "#D83D2E"; /* red */   
        } else if (element.textContent == "0.0%") {
            element.style.color = "#404040"; /* grey */           
        } else {
            element.style.color = "#27A513"; /* green */   
        }
    }
};

setColor();