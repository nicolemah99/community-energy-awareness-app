// Use the turbolinks:load event instead of DOMContentLoaded
window.addEventListener("resize", handleScreenSizeChange);

// Get references to the slide menu and hamburger button
var slideMenu;
var hamburgerBtn;
var isMenuOpen = false;

// Media queries for different screen sizes
var maxWidth768 = window.matchMedia("(max-width: 768px)");

// Handles the screen size change event and adjusts the layout and display based on the screen size.

function handleScreenSizeChange() {
	// Get references to elements that will be modified

	if (maxWidth768.matches) {
		// For screens smaller than 768px
		
	} else {
		// For screens larger than 768px
	}
}

// Toggles the hamburger menu open or closed.

function toggleHamburgerMenu() {
	// Toggle the menu open or closed based on the current state
	slideMenu.style.left = isMenuOpen ? "-110%" : "0";
	isMenuOpen = !isMenuOpen;
}

//Add event listeners for sidebar everytime a new page loads
document.addEventListener("turbo:load", () => {
	// Select the body element
	const body = document.body;

	// Select the sidebar element
	const sidebar = document.querySelector("nav");

	// Select the toggle element
	const toggle = document.querySelector(".toggle");

	// Select the mode switch element
	const modeSwitch = document.querySelector(".toggle-switch");

	// Select the mode text element
	const modeText = document.querySelector(".mode-text");

	// Event listener for toggle click
	toggle.addEventListener("click", () => {
		// Toggle the 'close' class on the sidebar element
		sidebar.classList.toggle("close");

		// Rotate the toggle element 180 degrees
		toggle.style.transform = "rotate(180)";
	});

	// Event listener for mode switch click
	modeSwitch.addEventListener("click", () => {
		// Toggle the 'dark' class on the body element
		body.classList.toggle("dark");

		// Update the mode text based on the body class
		modeText.innerText = body.classList.contains("dark")
			? "Light mode"
			: "Dark mode";
	});
});
