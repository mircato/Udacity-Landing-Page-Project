const sectionsArray = document.querySelectorAll("section");
const navigationBarLinks = document.querySelector("#navbar__list");
const backToTop = document.getElementById("BkToTopBtn");
const collapseSection = document.querySelectorAll(".collapse");
const header = document.querySelector("header");
let hideNavbar;

// build the nav
function navBuilder() {
  for (let section of sectionsArray) {
    let listItem = document.createElement("li");
    listItem.className = "menu__link";
    listItem.dataset.nav = section.id;
    listItem.innerText = section.dataset.nav;
    navigationBarLinks.appendChild(listItem);
  }
}

// Scroll to anchor ID using scrollTO event
function scrollToEvent() {
  navigationBarLinks.addEventListener("click", function (event) {
    const setSectionActive = document.querySelector(
      "#" + event.target.dataset.nav
    );
    setSectionActive.scrollIntoView();
  });
}

// Build menu
navBuilder();
// Scroll to section on link click
scrollToEvent();
// Set sections as active & Back to top button & Hide navbar when idle
const navbarLinks = document.querySelectorAll("nav li");
window.onscroll = () => {
  header.classList.remove("hide");
  //Hide navbar when idle
  window.clearTimeout(hideNavbar);
  hideNavbar = setTimeout(() => {
    header.classList.add("hide");
  }, 2500);
  //Set sections as active
  sectionsArray.forEach((currentSection, indx) => {
    let sectionBox = currentSection.getBoundingClientRect().y;
    if (sectionBox < window.innerHeight - 200) {
      navbarLinks.forEach((currentSection) =>
        currentSection.classList.remove("active")
      );
      navbarLinks[indx].classList.add("active");
    }
  });

  // Back to top button
  if (document.documentElement.scrollTop > 500) {
    backToTop.classList.add("show");
  } else {
    backToTop.classList.remove("show");
  }
};
backToTop.addEventListener("click", function () {
  document.documentElement.scrollTop = 0;
});

//Toggle collapse sections
for (let coll of collapseSection) {
  coll.addEventListener("click", function () {
    this.classList.toggle("active");
    const siblingSecetion = this.nextElementSibling;
    siblingSecetion.classList.toggle("hide");
  });
}
