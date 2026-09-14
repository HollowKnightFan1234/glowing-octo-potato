const loginArea = document.getElementById("loginArea");
const gameArea = document.getElementById("gameArea");

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

const loginButton = document.getElementById("loginButton");
const signupButton = document.getElementById("signupButton");
const resendButton = document.getElementById("resendButton");
const logoutButton = document.getElementById("logoutButton");

const message = document.getElementById("message");


// Check whether someone is already logged in
async function checkLogin() {

    const { data, error } = await window.appSupabase.auth.getSession();

    if (error) {
        console.error(error);
        return;
    }

    if (data.session) {
        showGameArea();
    } else {
        showLoginArea();
    }
}


// Create an account
signupButton.addEventListener("click", async () => {

    const email = emailInput.value;
    const password = passwordInput.value;

    if (!email || !password) {
        message.textContent = "Please enter an email and password.";
        return;
    }

    const { error } = await window.appSupabase.auth.signUp({
        email: email,
        password: password
        options: {
            emailRedirectTo: "https://hollowknightfan1234.github.io/glowing-octo-potato/"
    }
    });

    if (error) {
        message.textContent = error.message;
        return;
    }

    message.textContent =
        "Account created! Check your email if confirmation is required.";
});


// Resend confirmation email
resendButton.addEventListener("click", async () => {

    const email = emailInput.value;

    if (!email) {
        message.textContent = "Enter your email first.";
        return;
    }

    const { error } = await window.appSupabase.auth.resend({
        type: "signup",
        email: email
    });

    if (error) {
        message.textContent = error.message;
        return;
    }

    message.textContent =
        "Confirmation email sent! Check your inbox.";
});


// Log in
loginButton.addEventListener("click", async () => {

    const email = emailInput.value;
    const password = passwordInput.value;

    if (!email || !password) {
        message.textContent = "Please enter an email and password.";
        return;
    }

    const { error } =
        await window.appSupabase.auth.signInWithPassword({
            email: email,
            password: password
        });

    if (error) {
        message.textContent = error.message;
        return;
    }

    showGameArea();
});


// Log out
logoutButton.addEventListener("click", async () => {

    await window.appSupabase.auth.signOut();

    showLoginArea();
});


// Show login screen
function showLoginArea() {

    loginArea.style.display = "block";
    gameArea.style.display = "none";
}


// Show game hub
function showGameArea() {

    loginArea.style.display = "none";
    gameArea.style.display = "block";
}


// Start
checkLogin();
