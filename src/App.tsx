import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addMessage } from './features/chatSlice';
import { useTriviaQuestion } from './hooks/useTrivia';
import ChatInput from './components/ChatInput';
import type { RootState, AppDispatch } from './store';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './App.module.scss'; // Importamos los estilos de SASS

function App() {
  const messages = useSelector((state: RootState) => state.chat.messages);
  const dispatch = useDispatch<AppDispatch>();
  const { data, isLoading, isError, refetch } = useTriviaQuestion();

  const handleSendMessage = (text: string) => {
    dispatch(addMessage({ id: Date.now().toString(), text, sender: 'user' }));

    if (text.toLowerCase() === 'pregunta') {
      refetch(); // Vuelve a cargar la pregunta
    }

    if (isLoading) {
      dispatch(addMessage({ id: Date.now().toString() + 'bot', text: 'Buscando una pregunta...', sender: 'bot' }));
    } else if (isError) {
      dispatch(addMessage({ id: Date.now().toString() + 'bot', text: 'Ocurrió un error. Intenta de nuevo.', sender: 'bot' }));
    } else if (data) {
      const botResponse = `¡Nueva pregunta! ${data.question}.`;
      dispatch(addMessage({ id: Date.now().toString() + 'bot', text: botResponse, sender: 'bot' }));
    }
  };

  return (
    <div className={styles['chat-container']}>
      <div className={styles['message-list']}>
        {messages.map((msg) => (
          <div key={msg.id} className={`${styles.message} ${msg.sender === 'user' ? styles.user : styles.bot}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
}

export default App;