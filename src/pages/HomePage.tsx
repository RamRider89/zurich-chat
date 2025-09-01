// toda la lógica y los componentes de chat
import { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../store';
import { addMessage, startNewConversation, switchConversation } from '../features/chatSlice';
import ChatInput from '../components/chat/ChatInput';
import { useTriviaQuestion } from '../hooks/useTrivia';
import styles from '../App.module.scss'; // mismo estilo

import SpecialNav from '../components/nav/Nav';
import SpecialButton from '../components/button/Button';

function HomePage() {
  const { conversations, currentConversationId } = useSelector((state: RootState) => state.chat);
  const messages = currentConversationId ? conversations[currentConversationId] : [];
  const dispatch = useDispatch<AppDispatch>();
  const { data, isLoading, isError, refetch } = useTriviaQuestion();

  // Guarda todo el estado del chat en localStorage
  useEffect(() => {
    localStorage.setItem('chatState', JSON.stringify({ conversations, currentConversationId }));
  }, [conversations, currentConversationId]);

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

                <button type="button" className={`btn btn-lg w-100 mb-3 ${styles['text-left']}`} 
                onClick={() => dispatch(startNewConversation())}>
                  <i className='bi bi-pencil-square'></i> Nuevo chat
                </button>

                <SpecialButton 
                  title='Recientes'
                  type='btn-lg'
                  icon='bi bi-clock-history'
                />

                <ul id="lista-mensajes" className="list-group list-group-flush">

                  {Object.keys(conversations).map((id) => (
                    <li key={id} className="list-group-item list-group-item-action list-group-item-light">
                      <button
                        //variant={currentConversationId === id ? 'primary' : 'light'}
                        onClick={() => dispatch(switchConversation(id))}
                        className="btn btn-sm w-100 text-start"
                      >
                        Chat #{id.slice(-4)}
                      </button>
                    </li>
                  ))}

                </ul>
                
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

          <ChatInput onSendMessage={handleSendMessage} />

        </div>
    </Fragment>
  );
}

export default HomePage;