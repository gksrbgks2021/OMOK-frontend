// Action types
const SET_MESSAGE = "SET_MESSAGE";
const CLEAR_MESSAGE = "CLEAR_MESSAGE";
const SEND_SESSGAE = "SEND_MESSAGE";
const INIT_MESSAGE = "INIT_MESSAGE";

//변수 초기화
const initialState = {
    messageType: '', // Default to ENTER
    chatRoomId: null,
    senderId: null,
    messageText: '', // renamed from 'message' to avoid naming conflicts
};

export const chatMsgStatus = (state) => state.message ;
export const chatRoomIdStatus = (state) => state.message.chatRoomId ;
export const senderIdStatus = (state) => state.message.senderId ;
//Reducer 정의
const chatReducer = (state = initialState, action) => {
    console.log('Current state:', state);
    console.log('Incoming action:', action);
    switch (action.type) {
        case INIT_MESSAGE:

            return{
                ...state,
                chatRoomId: action.payload.chatRoomId, // Corrected from action.chatRoomId
                senderId: action.payload.senderId,
                messageType: 'ENTER', // This can be hardcoded as 'ENTER' or also taken from action.payload if dynamic
                messageText: '',
            }
        case SET_MESSAGE:
            return {
                ...state,
                ...action.payload, // Spread the payload to update the state
            };
        case CLEAR_MESSAGE:
            return {
                ...initialState, // Reset to initial state
            };
        case SEND_SESSGAE:
            return{

            }
        default:
            return state;
    }
};
// Action 정의
export const setMessage = (message) => ({
    type: SET_MESSAGE,
    payload: message, // Expecting message to be an object with messageType, chatRoomId, senderId, messageText
});

export const clearMessage = () => ({
    type: CLEAR_MESSAGE,
});

export const initMessage = (roomId, senderId) => ({
    type: INIT_MESSAGE,
    payload: {
        chatRoomId: roomId,
        senderId: senderId ,
    }
});

export default chatReducer;