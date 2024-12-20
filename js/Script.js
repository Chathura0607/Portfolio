//footer change
const footerTextElement = document.getElementById("footer_text");
const footerPhrases = ["THANK YOU!", "ALWAYS LEARNING NEW THINGS!"];
let footerIndex = 0;

function updateFooterText() {
  footerIndex = (footerIndex + 1) % footerPhrases.length;
  footerTextElement.textContent = footerPhrases[footerIndex];
}

setInterval(updateFooterText, 1500);

//hello change
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

//menu panel
const burger = document.getElementById("burger");
const menuPanel = document.getElementById("menu_panel_id");
const closeBtn = document.getElementById("btn_close");

burger.addEventListener("click", () => {
  menuPanel.classList.add("active");
});

closeBtn.addEventListener("click", () => {
  menuPanel.classList.remove("active");
});

//project change
const slides = document.querySelectorAll(".project_slide");
const leftArrow = document.querySelector(".arrow.left");
const rightArrow = document.querySelector(".arrow.right");

let currentIndex = 0;

function updateSlides() {
  slides.forEach((slide, index) => {
    slide.classList.toggle("active", index === currentIndex);
  });
}

leftArrow.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  updateSlides();
});

rightArrow.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % slides.length;
  updateSlides();
});
