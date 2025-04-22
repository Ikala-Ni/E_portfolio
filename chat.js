document.addEventListener("DOMContentLoaded", function () {

    const chatForm = document.getElementById('chat-form');
    const chatInput = document.getElementById('chat-input');

    chatForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const messageText = chatInput.value.trim();

        if (messageText !== "") {
            appendMessage('user', messageText);
            chatInput.value = "";

            setTimeout(() => {
                appendMessage('bot', "Merci pour votre message ! 😊");
            }, 800);
        }
    });

    function appendMessage(sender, text) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message ${ sender }';
        messageDiv.textContent = text;

        const messagesContainer = document.getElementById('chat-messages');
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;

         // 🔊 Joue un son si c’est une réponse du bot
        if (sender === 'bot') {
            const botSound = document.getElementById('bot-sound');
            if (botSound) {
                botSound.currentTime = 0; // remet à zéro si le son est déjà en train de jouer
                botSound.play();
            }
        }
    }

});


function openChatbox() {
    document.getElementById('chatbox').classList.remove('hidden');
}

function closeChatbox() {
    document.getElementById('chatbox').classList.add('hidden');
    document.getElementById('chat-widget').style.display = 'flex'; // Ou 'block' selon le rendu
}