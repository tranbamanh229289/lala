import { REQUESTING_USER, GET_USER_SUCCESS, REQUEST_USER_ERROR } from "../constant";

const initUser = {
    requesting: false,
    error: null,
    data: {},
}

const userReducer = (state = initUser, action) =>{
    switch (action.type){
        case GET_USER_SUCCESS :
            return {
                ...state,
                requesting: false,
                data: action.data,
            }
        case REQUEST_USER_ERROR :
            return {
                ...state,
                requesting: false,
                error: action.error,
            }
        case REQUESTING_USER:
            return {
                ...state,
                requesting: true,
            }
        default:
            return state;
    }
}

export default userReducer;
