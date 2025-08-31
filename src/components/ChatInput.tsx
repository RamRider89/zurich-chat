/**
 * Este componente manejará la entrada del usuario.
 */
import React, { useState } from 'react';
import styles from './ChatInput.module.scss'; // Importamos los estilos

interface ChatInputProps {
  onSendMessage: (message: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSendMessage(input);
      setInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles['chat-input-container']}>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Escribe tu mensaje..."
        className={`${styles['input-field']} form-control`} // Clases de SASS y Bootstrap
      />
      <button type="submit" className={`${styles['send-button']} btn btn-primary`}>
        Enviar
      </button>
    </form>
  );
};

export default ChatInput;