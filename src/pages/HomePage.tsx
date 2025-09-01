// toda la lógica y los componentes de chat
import { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../store';
import { addMessage } from '../features/chatSlice';
import ChatInput from '../components/chat/ChatInput';
import { useTriviaQuestion } from '../hooks/useTrivia';
import styles from '../App.module.scss'; // mismo estilo

import SpecialNav from '../components/nav/Nav';
import SpecialButton from '../components/button/Button';
import SpecialListGroup from '../components/list-group/ListGroup';

function HomePage() {
  const messages = useSelector((state: RootState) => state.chat.messages);
  const dispatch = useDispatch<AppDispatch>();
  const { data, isLoading, isError, refetch } = useTriviaQuestion();


  // guardar la conversación cada vez que se actualice
  useEffect(() => {
    localStorage.setItem('chatConversation', JSON.stringify(messages));
  }, [messages]);

  const handleSendMessage = (text: string) => {
    dispatch(addMessage({ id: Date.now().toString(), text, sender: 'user' }));

    if (text.toLowerCase() === 'pregunta') {
      refetch();
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
    <Fragment>
        
        <SpecialNav />
        <div className={styles['chat-container']}>

          <div className={styles['message-history']}>

              <div className={styles['historial']}>
                <SpecialButton 
                  title='Nuevo chat'
                  type='btn-lg'
                  icon='bi bi-pencil-square'
                />

                <SpecialButton 
                  title='Recientes'
                  type='btn-lg'
                  icon='bi bi-clock-history'
                />

                <SpecialListGroup />

                
              </div>

              <div className={styles['config']}>
                <SpecialButton 
                  title='Configuración'
                  type='outline-secondary'
                  icon='bi bi-gear'
                />
              </div>
          </div>

          <div className={styles['message-list']}>
              {messages.map((msg) => (
              <div key={msg.id} className={`${styles.message} ${msg.sender === 'user' ? styles.user : styles.bot}`}>
                  {msg.text}
              </div>
              ))}
          </div>


          <ChatInput 
          
          onSendMessage={handleSendMessage} 
          
          />
        </div>
    </Fragment>
  );
}

export default HomePage;