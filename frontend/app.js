
const startBtn = document.getElementById("start-btn");
const appMain = document.getElementById("app");
const createBtn = document.getElementById("create-btn");
const chatSection = document.getElementById("chat-section");
const messagesDiv = document.getElementById("messages");
const sendBtn = document.getElementById("send-btn");
const userInput = document.getElementById("user-input");

let aiName = "AUREN";
let aiTone = "Resmi";

startBtn.onclick = () => { appMain.classList.remove("hidden"); startBtn.parentElement.classList.add("hidden"); }
createBtn.onclick = () => {
  aiName = document.getElementById("ai-name").value || "AUREN";
  aiTone = document.getElementById("voice").value || "Resmi";
  document.querySelector(".setup").classList.add("hidden");
  chatSection.classList.remove("hidden");
  addMessage(`${aiName}: Merhaba! Ben senin AI arkadaşın. Konuşmaya başlayabilirsin.`);
}

sendBtn.onclick = sendMessage;
userInput.addEventListener("keypress", e => { if(e.key === "Enter") sendMessage(); });

function sendMessage() {
  const text = userInput.value.trim();
  if(!text) return;
  addMessage(`Sen: ${text}`);
  userInput.value = "";
  fetch('/api/chat', {
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body: JSON.stringify({message:text, aiName, aiTone})
  })
  .then(res=>res.json())
  .then(data=>addMessage(`${aiName}: ${data.reply}`));
}

function addMessage(msg) {
  const p = document.createElement("p");
  p.textContent = msg;
  messagesDiv.appendChild(p);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}
