import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { deleteMessage as deleteMessageApi, getConversationMessages } from '../services/api';
import { ConversationMessage, DeleteMessageParams, DeleteMessageResponse, MessageEventPayload } from '../utils/types';

export interface MessagesState {
    messages: ConversationMessage[];
    loading: boolean;
}
const initialState: MessagesState = {
    messages: [],
    loading: false,
};
export const fetchMessagesThunk = createAsyncThunk('messages/fetch', (conversationId: number) => {
    return getConversationMessages(conversationId);
});

export const deleteMessageThunk = createAsyncThunk('messages/delete', (params: DeleteMessageParams) => {
    return deleteMessageApi(params);
});

const messagesSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        addMessage: (state, action: PayloadAction<MessageEventPayload>) => {
            const { conversation, message } = action.payload;
            const conversationMessage = state.messages.find((cm) => cm.id === conversation.id);
            conversationMessage?.messages.unshift(message);
        },
        deleteMessage: (state, action: PayloadAction<DeleteMessageResponse>) => {
            console.log('Inside deleteMessage reducer');
            const { payload } = action;
            const conversationMessages = state.messages.find((cm) => cm.id === payload.conversationId);
            if (!conversationMessages) return;
            const messageIndex = conversationMessages.messages.findIndex((m) => m.id === payload.messageId);
            conversationMessages.messages.splice(messageIndex, 1);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMessagesThunk.fulfilled, (state, action) => {
                const { id } = action.payload.data;
                const index = state.messages.findIndex((cm) => cm.id === id);
                const exists = state.messages.find((cm) => cm.id === id);
                if (exists) {
                    console.log('exists');
                    state.messages[index] = action.payload.data;
                } else {
                    state.messages.push(action.payload.data);
                }
            })
            .addCase(deleteMessageThunk.fulfilled, (state, action) => {
                const { conversationId, messageId } = action.meta.arg;
                const conversationMessages = state.messages.find((cm) => cm.id === conversationId);
                if (!conversationMessages) return;
                const messageIndex = conversationMessages.messages.findIndex((m) => m.id === messageId);
                conversationMessages.messages.splice(messageIndex, 1);
            });
    },
});
export const { addMessage, deleteMessage } = messagesSlice.actions;

export default messagesSlice.reducer;
