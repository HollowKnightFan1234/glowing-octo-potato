const loginArea = document.getElementById("loginArea");
const gameArea = document.getElementById("gameArea");

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

const loginButton = document.getElementById("loginButton");
const signupButton = document.getElementById("signupButton");
const resendButton = document.getElementById("resendButton");
const logoutButton = document.getElementById("logoutButton");

const message = document.getElementById("message");


// Hub sections
const gamesSection = document.getElementById("gamesSection");
const chatSection = document.getElementById("chatSection");
const accountSection = document.getElementById("accountSection");

const gamesTab = document.getElementById("gamesTab");
const chatTab = document.getElementById("chatTab");
const accountTab = document.getElementById("accountTab");

const accountEmail = document.getElementById("accountEmail");


// Chat
const chatInput = document.getElementById("chatInput");
const sendMessageButton = document.getElementById("sendMessageButton");


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
        password: password,
        options: {
            emailRedirectTo:
                "https://hollowknightfan1234.github.io/glowing-octo-potato/"
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


// Show login
function showLoginArea() {

    loginArea.style.display = "block";
    gameArea.style.display = "none";
}


// Show Game Hub
function showGameArea() {

    loginArea.style.display = "none";
    gameArea.style.display = "block";

    showGames();

    loadAccount();
}


// Games tab
gamesTab.addEventListener("click", () => {

    showGames();

});


// Chat tab
chatTab.addEventListener("click", () => {

    gamesSection.style.display = "none";
    chatSection.style.display = "block";
    accountSection.style.display = "none";

});


// Account tab
accountTab.addEventListener("click", () => {

    gamesSection.style.display = "none";
    chatSection.style.display = "none";
    accountSection.style.display = "block";

    loadAccount();

});


// Show games
function showGames() {

    gamesSection.style.display = "block";
    chatSection.style.display = "none";
    accountSection.style.display = "none";

}


// Load account information
async function loadAccount() {

    const { data, error } =
        await window.appSupabase.auth.getUser();

    if (error) {
        console.error(error);
        return;
    }

    if (data.user) {
        accountEmail.textContent =
            "Logged in as: " + data.user.email;
    }

}


// Send chat message
sendMessageButton.addEventListener("click", () => {

    const text = chatInput.value.trim();

    if (!text) {
        return;
    }

    console.log("Message ready to send:", text);

    chatInput.value = "";

});


// Allow Enter to send
chatInput.addEventListener("keydown", (event) => {

    if (event.key === "Enter") {
        sendMessageButton.click();
    }

});


// Check whether someone is already logged in
async function checkLogin() {

    const { data, error } =
        await window.appSupabase.auth.getSession();

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


// Start
checkLogin();
