const maxWidth768 = window.matchMedia("(max-width: 768px)");
let homeDiv;
let sidebar;
let hamburgerBtn;
let hamburgerBtnWrapper;
let desktopPageTitles;
let toggle;
let modeSwitch;
let modeText;
let slideMenu;
let body;

// Handles the screen size change and adjusts the layout and display based on the screen size.
function mobileTabletScreen() {
	desktopPageTitles.forEach((title) => {
		title.classList.add("d-none");
	});

	hamburgerBtn.addEventListener("click", () => {
		toggleHamburgerMenu();
	});
	homeDiv.style.width = "100%";
	homeDiv.style.left = "0";
	sidebar.style.display = "none";
	hamburgerBtnWrapper.classList.remove("d-none"); // Show the hamburger button
}

function desktopScreen() {
	desktopPageTitles.forEach((title) => {
		title.classList.remove("d-none");
	});

	modeSwitch.addEventListener("click", toggleDarkMode);
	homeDiv.style.width = "";
	homeDiv.style.left = "";
	sidebar.style.display = "";
	sidebar.addEventListener("mouseover", toggleSidebar);
	sidebar.addEventListener("mouseout", toggleSidebar);
	hamburgerBtnWrapper.classList.add("d-none"); // Hide the hamburger button
}

// Toggles the hamburger menu open or closed.
function toggleHamburgerMenu() {
	slideMenu.classList.toggle("close");

	if (slideMenu.classList.contains("close")) {
		hamburgerBtn.classList.add("bx-menu");
		hamburgerBtn.classList.remove("bx-x");
	} else {
		hamburgerBtn.classList.add("bx-x");
		hamburgerBtn.classList.remove("bx-menu");
	}
}

// Toggles the sidebar open or closed.
function toggleSidebar() {
	sidebar.classList.toggle("close");
	toggle.style.transform = "rotate(180)";
}

// Toggles the mode light or dark.
function toggleDarkMode() {
	body.classList.toggle("dark");
	modeText.innerText = body.classList.contains("dark")
		? "Light Mode"
		: "Dark Mode";
}

function handleScreenSize() {
	homeDiv = document.getElementById("home");
	sidebar = document.getElementById("sidebar-wrapper");
	hamburgerBtnWrapper = document.getElementById("hamburger-btn-wrapper");
	desktopPageTitles = document.querySelectorAll(".desktopPageTitle");

	if (maxWidth768.matches) {
		hamburgerBtn = document.getElementById("hamburger-btn");
		slideMenu = document.getElementById("slide-menu");
		mobileTabletScreen();
	} else {
		body = document.body;
		modeText = document.querySelector(".mode-text");
		sidebar = document.querySelector("nav");
		toggle = document.querySelector(".toggle");
		modeSwitch = document.querySelector(".toggle-switch");
		desktopScreen();
	}
}

//Add event listeners for sidebar everytime a new page loads
document.addEventListener("turbo:load", handleScreenSize);
window.addEventListener("resize", handleScreenSize);
