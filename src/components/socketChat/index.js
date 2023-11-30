// Importation des modules nécessaires.
import React, {useState, useEffect, useRef} from 'react';
import io from 'socket.io-client';
import styled from 'styled-components';

// Importation du générateur de noms uniques pour créer des pseudonymes aléatoires.
import {
  uniqueNamesGenerator,
  adjectives,
  colors,
  animals,
} from 'unique-names-generator';

// Initialisation de la connexion socket avec l'URL du serveur.
const socket = io(process.env.REACT_APP_SOCKET_HOST);

const SocketChat = () => {
  // Gestion de l'état pour le message actuel, l'ensemble des messages et l'indicateur de frappe.
  const [message, setMessage] = useState('');
  const [username, setUsername] = useState(
    uniqueNamesGenerator({
      dictionaries: [adjectives, colors, animals],
    }),
  );
  const [chat, setChat] = useState([]);
  const [typing, setTyping] = useState('');

  // Référence pour faire défiler automatiquement vers le dernier message.
  const messageEndRef = useRef(null);

  // Écoute des événements socket après le montage du composant.
  useEffect(() => {
    // Enregistrement de l'utilisateur avec son pseudonyme.
    socket.emit('register', username);

    // Mise à jour de l'état lors de la réception d'un message.
    socket.on('chatMessage', msg => {
      setTyping('');
      setChat(prevChat => [...prevChat, msg]);
    });

    // Mise à jour de l'indicateur de frappe.
    socket.on('userTyping', data => {
      setTyping(data.typing ? `${data.user} is typing...` : '');
    });

    // Nettoyage des écouteurs d'événements lors du démontage du composant.
    return () => {
      socket.off('chatMessage');
      socket.off('userTyping');
    };
  }, []);

  // Gestion de l'envoi de messages.
  const handleSendMessage = e => {
    e.preventDefault();
    if (message.trim()) {
      socket.emit('chatMessage', {value: message, user: username});
      setMessage('');
    }
  };

  // Gestion de l'indicateur de frappe.
  const handleTyping = () => {
    socket.emit('userTyping', {user: username, typing: message.length > 0});
  };

  // Défilement automatique vers le dernier message.
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({behavior: 'smooth'});
  }, [chat]);

  return (
    <AppContainer>
      <AppHeader>Chat</AppHeader>
      <ChatSection>
        <MessageForm onSubmit={handleSendMessage}>
          <MessageInput
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            onKeyUp={handleTyping}
            placeholder="choose a username"
            autoFocus
          />
          <SendButton type="submit">Confirm</SendButton>
        </MessageForm>
        <MessageList>
          {chat.map((msg, index) => (
            <Message key={index}>
              <Username>{msg.user}:</Username> {msg.value}
            </Message>
          ))}
          <div ref={messageEndRef} />
        </MessageList>
        <TypingIndicator>{typing}</TypingIndicator>
        <MessageForm onSubmit={handleSendMessage}>
          <MessageInput
            type="text"
            value={message}
            onChange={e => setMessage(e.target.value)}
            onKeyUp={handleTyping}
            placeholder="Type a message..."
            autoFocus
          />
          <SendButton type="submit">Send</SendButton>
        </MessageForm>
      </ChatSection>
    </AppContainer>
  );
};

const Username = styled.span`
  font-weight: bold;
`;

// Styled components
const AppContainer = styled.div`
  text-align: center;
`;

const AppHeader = styled.header`
  background-color: #282c34;
  min-height: 10vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
`;

const ChatSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const MessageList = styled.ul`
  list-style: none;
  padding: 0;
  width: 300px;
  height: 400px;
  overflow-y: auto;
  border: 1px solid #ddd;
  margin-bottom: 10px;
`;

const Message = styled.li`
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
`;

const TypingIndicator = styled.div`
  height: 20px;
  font-style: italic;
`;

const MessageForm = styled.form`
  display: flex;
  gap: 10px;
`;

const MessageInput = styled.input`
  flex-grow: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const SendButton = styled.button`
  padding: 10px 20px;
  background-color: #282c34;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

export default SocketChat;
