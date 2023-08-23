document.addEventListener("DOMContentLoaded", function () {
    const chatBox = document.getElementById("chat-box");
    const chatMessages = document.getElementById("chat-messages");
    const userInput = document.getElementById("user-input");
    const sendButton = document.getElementById("send-button");

    sendButton.addEventListener("click", sendMessage);

    function sendMessage() {
        const message = userInput.value.trim();

        if (message !== "") {
            addUserMessage(message);
            fetchBotResponse(message);
            userInput.value = "";
        }
    }

    function addUserMessage(message) {
        const messageDiv = document.createElement("div");
        messageDiv.classList.add("message", "user-message");
        messageDiv.textContent = message;
        chatMessages.appendChild(messageDiv);
    }

    function addBotMessage(message) {
        const messageDiv = document.createElement("div");
        messageDiv.classList.add("message", "bot-message");
        messageDiv.textContent = message;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight; // Scroll to bottom
    }

    async function fetchBotResponse(userMessage) {
        const response = await fetch("https://financebox.onrender.com/get_bot_response", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: `user_message=${encodeURIComponent(userMessage)}`,
        });

        const responseData = await response.json();
        const botMessage = responseData.bot_response;
        addBotMessage(botMessage);
    }
});
