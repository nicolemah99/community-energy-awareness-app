let isMenuOpen = false;


// Handles the screen size change and adjusts the layout and display based on the screen size.
function mobileTabletScreen() {
	const homeDiv = document.getElementById("home");
	const sidebar = document.getElementById("sidebar-wrapper");
	const hamburgerBtn = document.getElementById("hamburger-btn");
	const hamburgerBtnWrapper = document.getElementById("hamburger-btn-wrapper");
	const desktopPageTitles = document.querySelectorAll(".desktopPageTitle");

	desktopPageTitles.forEach((title)=>{
		title.classList.add("d-none");
	})

	hamburgerBtn.removeEventListener("click", toggleHamburgerMenu);
	hamburgerBtn.addEventListener("click", toggleHamburgerMenu);
	homeDiv.style.width = "100%";
	homeDiv.style.left = "0";
	sidebar.style.display = "none";
	hamburgerBtnWrapper.classList.remove("d-none"); // Show the hamburger button
}

function desktopScreen() {
	const homeDiv = document.getElementById("home");
	const sidebar = document.getElementById("sidebar-wrapper");
	const hamburgerBtnWrapper = document.getElementById("hamburger-btn-wrapper");
	const desktopPageTitles = document.querySelectorAll(".desktopPageTitle");
	desktopPageTitles.forEach((title) => {
		title.classList.remove("d-none");
	});
	addSidebarEvents();
	homeDiv.style.width = "";
	homeDiv.style.left = "";
	sidebar.style.display = "";
	hamburgerBtnWrapper.classList.add("d-none"); // Hide the hamburger button
}

function addSidebarEvents() {
	const toggle = document.querySelector(".toggle");
	const modeSwitch = document.querySelector(".toggle-switch");
	toggle.addEventListener("click", toggleSidebar);
	modeSwitch.addEventListener("click", toggleDarkMode);
}

// Toggles the hamburger menu open or closed.
function toggleHamburgerMenu() {
	const slideMenu = document.getElementById("slide-menu");
	const hamburgerBtn = document.getElementById("hamburger-btn");
	slideMenu.style.left = isMenuOpen ? "-110%" : "0";
	isMenuOpen = !isMenuOpen;

	if (isMenuOpen){
		hamburgerBtn.classList.add("bx-x");
		hamburgerBtn.classList.remove("bx-menu");
	}else{
		hamburgerBtn.classList.add("bx-menu");
		hamburgerBtn.classList.remove("bx-x");
	}
}

// Toggles the sidebar open or closed.
function toggleSidebar() {
	const sidebar = document.querySelector("nav");
	const toggle = document.querySelector(".toggle");

	sidebar.classList.toggle("close");
	toggle.style.transform = "rotate(180)";
}

// Toggles the mode light or dark.
function toggleDarkMode() {
	const body = document.body;
	const modeText = document.querySelector(".mode-text");

	body.classList.toggle("dark");
	modeText.innerText = body.classList.contains("dark")
		? "Light Mode"
		: "Dark Mode";
}
function handleScreenSize() {
	const maxWidth768 = window.matchMedia("(max-width: 768px)");

	if (maxWidth768.matches) {
		mobileTabletScreen();
	} else {
		desktopScreen();
	}
}
//Add event listeners for sidebar everytime a new page loads
document.addEventListener("DOMContentLoaded", handleScreenSize)
document.addEventListener("turbo:load", handleScreenSize);
window.addEventListener("resize", handleScreenSize);
