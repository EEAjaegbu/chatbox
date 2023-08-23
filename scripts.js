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
        // Replace 'YOUR_OPENAI_API_KEY' with your actual API key
        const apiKey = "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";
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                messages: [{ role: "user", content: userMessage }],
            }),
        });

        const responseData = await response.json();
        const botMessage = responseData.choices[0].message.content;
        addBotMessage(botMessage);
    }
});
