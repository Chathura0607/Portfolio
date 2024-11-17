const footerTextElement = document.getElementById("footer_text");
const footerPhrases = ["THANK YOU!", "ALWAYS LEARNING NEW THINGS!"];
let footerIndex = 0;

function updateFooterText() {
  footerIndex = (footerIndex + 1) % footerPhrases.length;
  footerTextElement.textContent = footerPhrases[footerIndex];
}

setInterval(updateFooterText, 1500);
