
const cadeiras = document.querySelectorAll('.cadeira');
const chatBox = document.querySelector('.chat-box');
const chatInput = document.querySelector('.chat-input');
const sendButton = document.querySelector('.send-button');

// Gerar cor aleatória
const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

const userColor = getRandomColor();

// Bem-vindo
const welcomeMessage = document.createElement('div');
welcomeMessage.textContent = 'Bem-vindo ao Chat Rápido!';
welcomeMessage.style.color = '#00ff00';
chatBox.appendChild(welcomeMessage);

// Gerenciar cadeiras
cadeiras.forEach((cadeira, index) => {
    cadeira.textContent = index + 1;
    cadeira.addEventListener('click', () => {
        cadeiras.forEach(c => {
            if (c !== cadeira) c.classList.remove('ocupada');
        });
        if (cadeira.classList.contains('ocupada')) {
            cadeira.classList.remove('ocupada');
            cadeira.textContent = index + 1;
        } else {
            cadeira.classList.add('ocupada');
            cadeira.textContent = 'Você';
        }
    });
});

// Enviar mensagem
const sendMessage = () => {
    const message = chatInput.value.trim();
    if (message) {
        const newMessage = document.createElement('div');
        newMessage.textContent = `Você: ${message}`;
        newMessage.style.color = userColor;
        chatBox.appendChild(newMessage);
        chatBox.scrollTop = chatBox.scrollHeight;
        chatInput.value = '';
    }
};

sendButton.addEventListener('click', sendMessage);

// Enviar mensagem com "Enter"
chatInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault(); // Prevenir quebra de linha
        sendMessage();
    }
});

// Logout
const logoutButton = document.querySelector('.logout-button');
logoutButton.addEventListener('click', () => {
    window.location.href = 'index.html';
});
