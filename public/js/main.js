var usernamePage = document.querySelector('#username-page');
var chatPage = document.querySelector('#chat-page');
var usernameForm = document.querySelector('#usernameForm');
var messageForm = document.querySelector('#messageForm');
var messageInput = document.querySelector('#message');
var messageArea = document.querySelector('#messageArea');
var socket = null;

function connect(event) {
    username = document.querySelector('#name').value.trim();

    if (username) {
        usernamePage.classList.add('hidden');
        chatPage.classList.remove('hidden');
        socket = io.connect('http://localhost:9391');

        socket.emit('joinRoom', username);

        socket.on('message', (data) => {
            var messageElement = document.createElement('li');
            messageElement.classList.add('chat-message');
            var usernameElement = document.createElement('span');
            var usernameText = document.createTextNode(data.username);
            usernameElement.appendChild(usernameText);
            messageElement.appendChild(usernameElement);

            var textElement = document.createElement('p');
            var messageText = document.createTextNode(data.message);
            textElement.appendChild(messageText);
            messageElement.appendChild(textElement);

            messageArea.appendChild(messageElement);
            messageArea.scrollTop = messageArea.scrollHeight;
        });
    }
    event.preventDefault();
}

function sendMessage(event) {
    var messageContent = messageInput.value.trim();
    if (messageContent) {
        socket.emit('message', messageInput.value);
        messageInput.value = '';
    }
    event.preventDefault();
}



usernameForm.addEventListener('submit', connect, true)
messageForm.addEventListener('submit', sendMessage, true)