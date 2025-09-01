/**
 * Este componente manejará la entrada del usuario.
 */
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { createAbility } from '../abilities';
import styles from './ChatInput.module.scss';
import type { RootState } from '../store';
import type { FC, FormEvent } from 'react';

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
    <form onSubmit={handleSubmit} className={styles['chat-input-container']}>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Escribe tu mensaje..."
        className={`${styles['input-field']} form-control`}
      />
      <button type="submit" className={`${styles['send-button']} btn btn-primary`}>
        Enviar
      </button>
    </form>
  );
};

export default ChatInput;