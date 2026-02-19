const usernameInput = document.getElementById("username");
const messageDiv = document.getElementById("message");
const loading = document.getElementById("loading");
const form = document.getElementById("registrationForm");

let isAvailable = false;

usernameInput.addEventListener("input", function () {

    const username = usernameInput.value.trim();

    if (username === "") {
        messageDiv.textContent = "";
        return;
    }

    loading.style.display = "block";

    fetch("users.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("Network error");
            }
            return response.json();
        })
        .then(data => {

            loading.style.display = "none";

            if (data.users.includes(username.toLowerCase())) {
                messageDiv.textContent = "❌ Username already taken";
                messageDiv.className = "taken";
                isAvailable = false;
            } else {
                messageDiv.textContent = "✅ Username available";
                messageDiv.className = "available";
                isAvailable = true;
            }
        })
        .catch(() => {
            loading.style.display = "none";
            messageDiv.textContent = "Error checking username";
            messageDiv.className = "taken";
            isAvailable = false;
        });
});

form.addEventListener("submit", function (e) {

    if (!isAvailable) {
        e.preventDefault();
        alert("Username not available. Please choose another.");
    } else {
        alert("Form submitted successfully!");
    }
});
