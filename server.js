
// Importando módulos necessários
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

// Inicializando servidor e socket.io
const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Configurando pasta de arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Rota principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Gerenciando conexões de usuários
io.on('connection', (socket) => {
    console.log('Um usuário se conectou:', socket.id);

    // Mensagem de chat
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg); // Envia a mensagem para todos os usuários
    });

    // Gerenciando evento de entrada em cadeiras
    socket.on('join chair', (chairId, username) => {
        io.emit('chair update', { chairId, username });
    });

    // Evento ao desconectar
    socket.on('disconnect', () => {
        console.log('Usuário desconectado:', socket.id);
    });
});

// Iniciando servidor
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
