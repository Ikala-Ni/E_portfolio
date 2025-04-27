/**
 * chat.js — Gère l’ouverture/fermeture, l’envoi de messages et le déplacement de la chatbox
 */
document.addEventListener("DOMContentLoaded", () => {
    const chatTrigger = document.getElementById("chat-trigger");
    const chatbox = document.getElementById("chatbox");
    const chatCloseBtn = document.querySelector(".chatbox-close");
    const chatForm = document.getElementById("chat-form");
    const chatInput = document.getElementById("chat-input");
    const messagesArea = document.getElementById("chat-messages");
    const botSound = document.getElementById("bot-sound");

    /** Ouvre/ferme la chatbox */
    function toggleChatbox() {
        chatbox.classList.toggle("hidden");
    }
    function closeChatbox() {
        chatbox.classList.add("hidden");
    }

    /** Ajoute un message dans la zone de chat */
    function appendMessage(sender, text) {
        const msg = document.createElement("div");
        msg.className = `message ${sender}`;
        msg.textContent = text;
        messagesArea.appendChild(msg);
        messagesArea.scrollTop = messagesArea.scrollHeight;
        if (sender === "bot" && botSound) {
            botSound.currentTime = 0;
            botSound.play();
        }
    }

    /** Gestion de l’envoi du formulaire */
    chatForm.addEventListener("submit", e => {
        e.preventDefault();
        const text = chatInput.value.trim();
        if (!text) return;
        appendMessage("user", text);
        chatInput.value = "";
        setTimeout(() => appendMessage("bot", "Merci pour votre message ! 😊"), 800);
    });

    /* Événements d’ouverture / fermeture */
    chatTrigger.addEventListener("click", toggleChatbox);
    chatCloseBtn.addEventListener("click", closeChatbox);

    /** Rendre la chatbox déplaçable */
    (function makeChatDraggable() {
        const header = chatbox.querySelector(".chatbox-header");
        let isDragging = false;
        let startX, startY, startLeft, startBottom;

        header.style.cursor = "move";
        header.addEventListener("mousedown", initDrag);
        document.addEventListener("mouseup", stopDrag);
        document.addEventListener("mousemove", doDrag);

        function initDrag(e) {
            isDragging = true;
            startX = e.clientX;
            startY = e.clientY;
            const rect = chatbox.getBoundingClientRect();
            startLeft = rect.left;
            startBottom = window.innerHeight - rect.bottom;
            e.preventDefault();
        }

        function doDrag(e) {
            if (!isDragging) return;
            const dx = e.clientX - startX;
            const dy = e.clientY - startY;
            chatbox.style.left = (startLeft + dx) + "px";
            chatbox.style.bottom = (startBottom - dy) + "px";
        }

        function stopDrag() {
            isDragging = false;
        }
    })();
});
