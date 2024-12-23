const socket = io();

let localStream;
let peers = {};

async function joinSeat(seat) {
    const btn = document.getElementById(`btn${seat}`);
    if (!localStream) {
        try {
            localStream = await navigator.mediaDevices.getUserMedia({ audio: true });
            btn.textContent = "Conectado!";
            setupWebRTC(seat);
        } catch (err) {
            alert("Erro ao acessar o microfone: " + err.message);
        }
    }
}

function setupWebRTC(seat) {
    const peer = new RTCPeerConnection();
    peers[seat] = peer;

    localStream.getTracks().forEach((track) => {
        peer.addTrack(track, localStream);
    });

    peer.onicecandidate = (event) => {
        if (event.candidate) {
            socket.emit("signal", {
                to: seat,
                signal: event.candidate,
            });
        }
    };

    peer.ontrack = (event) => {
        const audio = new Audio();
        audio.srcObject = event.streams[0];
        audio.play();
    };

    socket.on("signal", async ({ from, signal }) => {
        if (signal.type === "offer") {
            await peer.setRemoteDescription(new RTCSessionDescription(signal));
            const answer = await peer.createAnswer();
            await peer.setLocalDescription(answer);
            socket.emit("signal", {
                to: from,
                signal: answer,
            });
        } else if (signal.type === "answer") {
            await peer.setRemoteDescription(new RTCSessionDescription(signal));
        } else {
            peer.addIceCandidate(new RTCIceCandidate(signal));
        }
    });
}

function sendMessage() {
    const chatInput = document.getElementById("chat-input");
    const chatWindow = document.getElementById("chat-window");
    const message = chatInput.value.trim();
    if (message) {
        const msgElement = document.createElement("p");
        msgElement.textContent = message;
        chatWindow.appendChild(msgElement);
        chatInput.value = "";
    }
}
