import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addMessage } from './features/chatSlice';
import { useTriviaQuestion } from './hooks/useTrivia';
import ChatInput from './components/ChatInput';
import type { RootState, AppDispatch } from './store';

function App() {
  const messages = useSelector((state: RootState) => state.chat.messages);
  const dispatch = useDispatch<AppDispatch>();
  const { data, isLoading, isError } = useTriviaQuestion();

  const handleSendMessage = (text: string) => {
    dispatch(addMessage({ id: Date.now().toString(), text, sender: 'user' }));

    if (isLoading) {
      dispatch(addMessage({ id: Date.now().toString() + 'bot', text: 'Cargando respuesta...', sender: 'bot' }));
    } else if (isError) {
      dispatch(addMessage({ id: Date.now().toString() + 'bot', text: 'Ocurrió un error. Intenta de nuevo.', sender: 'bot' }));
    } else {
      const botResponse = `La pregunta es: ${data.question}. La respuesta correcta es ${data.correct_answer}.`;
      dispatch(addMessage({ id: Date.now().toString() + 'bot', text: botResponse, sender: 'bot' }));
    }
  };

  return (
    <div className="chat-container">
      <div className="message-list">
        {messages.map((msg) => (
          <div key={msg.id} className={`message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
}

export default App;