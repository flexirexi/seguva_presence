// check, whether a saved theme exists
const savedTheme = localStorage.getItem("data-theme") || "dark";
document.documentElement.setAttribute("data-theme", savedTheme);
// themeIcon.classList.add(savedTheme === "light" ? "fa-moon" : "fa-sun");

document.addEventListener("DOMContentLoaded", () => {
    const themeToggle = document.getElementById("theme-toggle");
    const html = document.documentElement;
    
    themeToggle.addEventListener("click", () => {
        const newTheme = html.getAttribute("data-theme") === "dark" ? "light" : "dark";
        html.setAttribute("data-theme", newTheme);
        localStorage.setItem("data-theme", newTheme);

        // themeIcon.classList.remove("fa-moon", "fa-sun");
        // themeIcon.classList.add(newTheme === "dark" ? "fa-sun": "fa-moon");
    });
});
