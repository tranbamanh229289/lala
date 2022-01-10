import {
    REQUESTING_PROJECTS,
    GET_PROJECTS_SUCCESS,
    REQUEST_PROJECTS_ERROR,
    STORE_PROJECT_SUCCESS,
    UPDATE_PROJECT_SUCCESS, DELETE_PROJECT_SUCCESS
} from "../constant";

const initProject = {
    requesting: false,
    error: null,
    data: [],
}

const projectsReducer = (state = initProject, action) =>{
    switch (action.type){
        case GET_PROJECTS_SUCCESS :
            return {
                ...state,
                requesting: false,
                data: action.data,
            }
        case REQUEST_PROJECTS_ERROR :
            return {
                ...state,
                requesting: false,
                error: action.error,
            }
        case REQUESTING_PROJECTS:
            return {
                ...state,
                requesting: true,
            }
        case STORE_PROJECT_SUCCESS:
            return {
                ...state,
                requesting:false,
                data: [
                    ...state.data,
                    action.data,
                ]
            }
        case UPDATE_PROJECT_SUCCESS:
            return {
                ...state,
                requesting: false,
                data: state.data.map((item, index)=>{
                    if(item.id==action.data.id){
                        return {
                            ...item,
                            name: action.data.name,
                        }
                    }
                    return item;
                })
            }
        case DELETE_PROJECT_SUCCESS:
            return {
                ...state,
                requesting: false,
                data: state.data.filter(item=>item.id != action.data)
            }
        default:
            return state;
    }
}

export default projectsReducer;
