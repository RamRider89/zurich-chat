import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
}

interface ChatState {
  conversations: { [key: string]: Message[] }; // Un objeto que mapea IDs a arrays de mensajes
  currentConversationId: string | null;
}

const getInitialState = (): ChatState => {
  const persistedState = localStorage.getItem('chatState');
  if (persistedState) {
    const state = JSON.parse(persistedState);
    // Asegura que siempre haya una conversación activa al cargar
    if (!state.currentConversationId && Object.keys(state.conversations).length > 0) {
      state.currentConversationId = Object.keys(state.conversations)[0];
    }
    return state;
  }
  
  // Estado inicial si no hay datos en localStorage
  const newConversationId = Date.now().toString();
  return {
    conversations: { [newConversationId]: [] },
    currentConversationId: newConversationId,
  };
};

const chatSlice = createSlice({
  name: 'chat',
  initialState: getInitialState(),
  reducers: {
    addMessage: (state, action: PayloadAction<Message>) => {
      if (state.currentConversationId) {
        state.conversations[state.currentConversationId].push(action.payload);
      }
    },
    startNewConversation: (state) => {
      const newConversationId = Date.now().toString();
      state.conversations[newConversationId] = [];
      state.currentConversationId = newConversationId;
    },
    switchConversation: (state, action: PayloadAction<string>) => {
      if (state.conversations[action.payload]) {
        state.currentConversationId = action.payload;
      }
    },
  },
});

export const { addMessage, startNewConversation, switchConversation } = chatSlice.actions;
export default chatSlice.reducer;