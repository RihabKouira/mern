import axios from "axios";

export const  GET_CHATS = "GET_CHATS";
export const  AFTER_POST_MESSAGE= "AFTER_POST_MESSAGE";

// export function getChats(){
//     const request = axios.get(`${process.env.REACT_APP_API_URL}api/chat/getChats`)
//         .then(response => response.data);
    
//     return {
//         type: GET_CHATS,
//         payload: request,
//     }
    
// }

export const getChats = () => {
    return (dispatch) => {
      return axios
        .get(`${process.env.REACT_APP_API_URL}api/chat/getChats`)
        .then((res) => {
          dispatch({ type: GET_CHATS, payload: res.data });
        })
        .catch((err) => console.log(err));
    };
  };

  export function afterPostMessage(data){

    return {
        type: AFTER_POST_MESSAGE,
        payload: data
    }
}