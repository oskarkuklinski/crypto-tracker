// The string containing urls is retrieved and decoded to array
fullUrlsArray = JSON.parse(localStorage.getItem("array"));
const imgElement = document.querySelector('.crypto-img');
// To set the right icon we're gonna use the rank of the cryptocurrency - 1 to match the icon from the array.
let cryptoRank = document.querySelector('.crypto-rank').textContent;
cryptoRank = parseInt(cryptoRank);
imgElement.src = fullUrlsArray[cryptoRank - 1];