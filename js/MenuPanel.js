const burger = document.getElementById("burger");
const menuPanel = document.getElementById("menu_panel_id");
const closeBtn = document.getElementById("btn_close");

burger.addEventListener("click", () => {
  menuPanel.classList.add("active");
});

closeBtn.addEventListener("click", () => {
  menuPanel.classList.remove("active");
});
