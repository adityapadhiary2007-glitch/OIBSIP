const registerBox = document.getElementById("register");
const loginBox = document.getElementById("login");
const dashboard = document.getElementById("dashboard");
const message = document.getElementById("message");

function register() {
    let name = document.getElementById("name").value.trim();
    let pass = document.getElementById("pass").value;

    if (!name || !pass) return message.textContent = "Fill all fields";

    if (pass.length < 8 || !/\d/.test(pass))
        return message.textContent = "Password: 8 characters + 1 number";

    if (localStorage.getItem("user"))
        return message.textContent = "User already exists";

    localStorage.setItem("user", JSON.stringify({ name, pass }));
    message.textContent = "Registered successfully!";
    showLogin();
}

function login() {
    let user = JSON.parse(localStorage.getItem("user"));
    let name = document.getElementById("user").value;
    let pass = document.getElementById("password").value;

    if (!user || name !== user.name || pass !== user.pass)
        return message.textContent = "Invalid username or password";

    localStorage.setItem("loggedIn", "true");
    showDashboard();
}

function logout() {
    localStorage.removeItem("loggedIn");
    showLogin();
}

function showLogin() {
    registerBox.style.display = "none";
    loginBox.style.display = "block";
    dashboard.style.display = "none";
}

function showRegister() {
    registerBox.style.display = "block";
    loginBox.style.display = "none";
    dashboard.style.display = "none";
}

function showDashboard() {
    registerBox.style.display = "none";
    loginBox.style.display = "none";
    dashboard.style.display = "block";
    message.textContent = "";
}

if (localStorage.getItem("loggedIn")) showDashboard();