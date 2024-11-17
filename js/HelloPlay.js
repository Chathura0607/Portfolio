const text = "Hello there!";
const textElement = document.getElementById("hello_text");

let index = 0;
let direction = 1;

function animateText() {
  if (direction === 1 && index < text.length) {
    index++;
  } else if (direction === -1 && index > 0) {
    index--;
  } else {
    direction *= -1;
  }

  textElement.textContent = `"${text.substring(0, index)}"`;
  setTimeout(animateText, 200);
}

animateText();
