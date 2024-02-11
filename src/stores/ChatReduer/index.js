// Action types
export const SET_MESSAGE = "SET_MESSAGE";
export const CLEAR_MESSAGE = "CLEAR_MESSAGE";
export const SEND_SESSGAE = "SEND_MESSAGE";
export const INIT_MESSAGE = "INIT_MESSAGE";

//변수 초기화
const initialState = {
    messageType: 'ENTER', // Default to ENTER
    chatRoomId: '',
    senderId: '',
    messageText: '', // renamed from 'message' to avoid naming conflicts
};


//Reducer 정의
const chatReducer = (state = initialState, action) => {
    switch (action.type) {
        case INIT_MESSAGE:
            return{
                ...state,
                chatRoomId: action.payload.chatRoomId,
                senderId: action.payload.senderId,
                messageType: 'ENTER',
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
    payload: { chatRoomId: roomId, senderId: senderId },
});
export default chatReducer;