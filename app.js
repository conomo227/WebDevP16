// js used in index.html to show the nav on smaller screens
const b = document.querySelector(".abc");
function showNav() {
  document.querySelector("nav ul").classList.toggle("shownav");
}
b.addEventListener("click", showNav);
//
