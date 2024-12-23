const socket = io();

// Função para subir na cadeira
function subirNaCadeira(cadeira) {
  const usuario = "Visitante " + Math.floor(Math.random() * 1000); // Nome fictício
  socket.emit("subirNaCadeira", { cadeira, usuario });
}

// Ouve atualização de cadeira
socket.on("atualizarCadeira", (data) => {
  const cadeira = document.getElementById(`cadeira${data.cadeira}`);
  cadeira.innerText = `${data.usuario} está na cadeira ${data.cadeira}`;
});

// Envia mensagem no chat
function enviarMensagem() {
  const mensagem = document.getElementById("mensagem").value;
  socket.emit("enviarMensagem", { mensagem });
  document.getElementById("mensagem").value = ""; // Limpa o campo
}

// Ouve novas mensagens
socket.on("novaMensagem", (data) => {
  const chat = document.getElementById("chat");
  const novaMensagem = document.createElement("p");
  novaMensagem.innerText = data.mensagem;
  chat.appendChild(novaMensagem);
});

