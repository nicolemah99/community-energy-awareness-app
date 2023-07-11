// Use the turbo:load event
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
	const homeDiv = document.getElementById("home");
	const sidebar = document.getElementById("sidebarWrapper");
	slideMenu = document.getElementById("slide-menu");
	hamburgerBtn = document.getElementById("hamburger-btn");
	hamburgerBtn.removeEventListener("click", toggleHamburgerMenu);
	hamburgerBtn.addEventListener("click", toggleHamburgerMenu);

	if (maxWidth768.matches) {
		homeDiv.style.width = "100%";
		homeDiv.style.left = "0";
		sidebar.style.display = "none";
		hamburgerBtn.classList.remove("d-none"); // Show the hamburger button

		// For screens smaller than 768px
	} else {
		// For screens larger than 768px
		homeDiv.style.width = "";
		homeDiv.style.left = "";
		sidebar.style.display = "";
		hamburgerBtn.classList.add("d-none"); // Hide the hamburger button
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
	handleScreenSizeChange();
	// Selectors
	const body = document.body;
	const sidebar = document.querySelector("nav");
	const toggle = document.querySelector(".toggle");
	const modeSwitch = document.querySelector(".toggle-switch");
	const modeText = document.querySelector(".mode-text");

	// Event listener for toggle click
	toggle.addEventListener("click", () => {
		// Toggle the 'close' class on the sidebar element
		sidebar.classList.toggle("close");
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
