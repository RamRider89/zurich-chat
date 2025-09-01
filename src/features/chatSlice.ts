import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
}

interface ChatState {
  messages: Message[];
}

// cargar la conversación del localStorage
const persistedState = localStorage.getItem('chatConversation');
const initialState: ChatState = {
  messages: persistedState ? JSON.parse(persistedState) : [],
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<Message>) => {
      state.messages.push(action.payload);
    },
  },
});

export const { addMessage } = chatSlice.actions;
export default chatSlice.reducer;