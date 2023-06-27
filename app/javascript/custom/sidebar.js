// Add event listener to handle the initial screen size and any subsequent changes
document.addEventListener("DOMContentLoaded", handleScreenSizeChange);
window.addEventListener("resize", handleScreenSizeChange);

// Get references to the slide menu and hamburger button
var slideMenu = document.getElementById("slide-menu");
var hamburgerBtn = document.getElementById("hamburger-btn");
var isMenuOpen = false;

// Add event listener to toggle the hamburger menu
hamburgerBtn.addEventListener("click", toggleHamburgerMenu);

// Media queries for different screen sizes
var maxWidth768 = window.matchMedia("(max-width: 768px)");
var minWidth1025 = window.matchMedia("(min-width: 1025px)");
var maxWidth1024 = window.matchMedia("(max-width: 1024px)");

/**
 * Toggles the hamburger menu open or closed.
 */
function toggleHamburgerMenu() {
	// Toggle the menu open or closed based on the current state
	slideMenu.style.left = isMenuOpen ? "-110%" : "0";
	isMenuOpen = !isMenuOpen;
}

/**
 * Handles the screen size change event and adjusts the layout and display based on the screen size.
 */
function handleScreenSizeChange() {
	// Get references to elements that will be modified
	var main = document.getElementById("main-container");
	var sidebar = document.querySelector(".sidebar");
	var navIcons = document.querySelectorAll(".nav-icon");
	var navFulls = document.querySelectorAll(".nav-full");

	if (maxWidth768.matches) {
		// Code for screens with a maximum width of 768px
		sidebar.style.display = "none"; // Hide the sidebar
		main.classList.add("col-auto"); // Add class for smaller screen size
		main.classList.remove("col-10"); // Remove class for larger screen size
		hamburgerBtn.style.display = "block"; // Show the hamburger button
	} else {
		// Code for screens larger than 768px
		sidebar.style.display = "block"; // Show the sidebar
		main.classList.remove("col-auto"); // Remove class for smaller screen size
		main.classList.add("col-10"); // Add class for larger screen size
		hamburgerBtn.style.display = "none"; // Hide the hamburger button
	}

	// Iterate over navIcons and adjust display based on screen size
	navIcons.forEach(function (icon) {
		icon.style.display = minWidth1025.matches ? "none" : "block";
	});

	// Iterate over navFulls and adjust display based on screen size
	navFulls.forEach(function (full) {
		full.style.display = maxWidth1024.matches ? "none" : "block";
	});
	
}
