/**
 * Este componente manejará la entrada del usuario.
 */
import { Fragment, useState } from 'react';
import { useSelector } from 'react-redux';
import { createAbility } from '../../abilities';
import styles from './ChatInput.module.scss';
import type { RootState } from '../../store';
import type { FC, FormEvent } from 'react';
import SpecialButton from '../button/Button';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
}

const ChatInput: FC<ChatInputProps> = ({ onSendMessage }) => {
  const [input, setInput] = useState('');
  const user = useSelector((state: RootState) => state.auth.user);
  const ability = createAbility(user?.roles); // Crea la habilidad basada en los roles del usuario

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (input.trim() && ability.can('send', 'message')) { // Verifica si el usuario puede enviar un mensaje
      onSendMessage(input);
      setInput('');
    }
  };

  if (!ability.can('send', 'message')) {
    return <div className={styles['chat-input-disabled']}>No tienes permiso para enviar mensajes.</div>;
  }

  return (
    <Fragment>
      <div className={styles['chat-input-container']}>
        <form onSubmit={handleSubmit} className={styles['chat-input']}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Escribe tu mensaje..."
            className={`${styles['input-field']} form-control`}
          />

          <div className={styles['acciones']}>
            
            <div className={styles['buttons']}>
              <SpecialButton 
                title=''
                type='btn-light'
                icon='bi bi-plus-lg'
              />

              <SpecialButton 
                title='Busqueda Avanzada'
                type='btn-light'
                icon='bi bi-binoculars'
              />

              <SpecialButton 
                title='Imagen'
                type='btn-light'
                icon='bi bi-image'
              />

              <SpecialButton 
                title='Video'
                type='btn-light'
                icon='bi bi-play-btn'
              />

              <SpecialButton 
                title='Audio'
                type='btn-light'
                icon='bi bi-mic'
              />
            </div>


            <SpecialButton 
                title=''
                type='btn-light'
                icon='bi bi-send'
              />
          </div>
          
        </form>
      </div>

    </Fragment>
    
  );
};

export default ChatInput;