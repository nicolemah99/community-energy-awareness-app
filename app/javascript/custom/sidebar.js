/** 
// Use the turbolinks:load event instead of DOMContentLoaded
document.addEventListener("DOMContentLoaded",handleScreenSizeChange);
window.addEventListener("resize", handleScreenSizeChange);

// Get references to the slide menu and hamburger button
var slideMenu;
var hamburgerBtn;
var isMenuOpen = false;

// Media queries for different screen sizes
var maxWidth768 = window.matchMedia("(max-width: 768px)");
var minWidth1025 = window.matchMedia("(min-width: 1025px)");
var maxWidth1024 = window.matchMedia("(max-width: 1024px)");


 * Handles the screen size change event and adjusts the layout and display based on the screen size.

function handleScreenSizeChange() {
	// Get references to elements that will be modified
	slideMenu = document.getElementById("slide-menu");
	hamburgerBtn = document.getElementById("hamburger-btn");
	hamburgerBtn.removeEventListener("click", toggleHamburgerMenu);
	hamburgerBtn.addEventListener("click", toggleHamburgerMenu);

	var main = document.getElementById("main-container");
	var sidebar = document.getElementById("sidebar");
	var navNames = document.getElementsByClassName("nav-name");

	if (maxWidth768.matches) {
		// Code for screens with a maximum width of 768px
		sidebar.style.display = "none"; // Hide the sidebar
		main.classList.add("col-auto"); // Add class for smaller screen size
		main.classList.remove("col-10"); // Remove class for larger screen size
		hamburgerBtn.classList.remove("d-none"); // Show the hamburger button
	} else {
		// Code for screens larger than 768px
		sidebar.style.display = "block"; // Show the sidebar
		main.classList.remove("col-auto"); // Remove class for smaller screen size
		main.classList.add("col-10"); // Add class for larger screen size
		hamburgerBtn.classList.add("d-none"); // Hide the hamburger button
	}

	// Iterate over navNames and adjust display based on screen size
	var navNamesArray = [...navNames];
	navNamesArray.forEach(function (name) {
		name.style.display = maxWidth1024.matches ? "none" : "block";
	});
}

/**
 * Toggles the hamburger menu open or closed.
 
function toggleHamburgerMenu() {
	// Toggle the menu open or closed based on the current state
	slideMenu.style.left = isMenuOpen ? "-110%" : "0";
	isMenuOpen = !isMenuOpen;
}
*/