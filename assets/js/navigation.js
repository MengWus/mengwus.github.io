const navigation = document.querySelector(".site-nav");
const menuButton = navigation.querySelector(".site-nav-toggle");
const menuLinks = navigation.querySelector(".site-nav-links");

navigation.classList.add("site-nav-enhanced");

function setMenuOpen(open) {
  menuButton.setAttribute("aria-expanded", String(open));
}

menuButton.addEventListener("click", () => {
  setMenuOpen(menuButton.getAttribute("aria-expanded") === "false");
});

navigation.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menuButton.getAttribute("aria-expanded") === "true") {
    setMenuOpen(false);
    menuButton.focus();
  }
});

menuLinks.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    setMenuOpen(false);
  }
});
