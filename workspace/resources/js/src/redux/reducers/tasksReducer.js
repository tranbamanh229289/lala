import {
    REQUESTING_TASKS,
    GET_TASKS_SUCCESS,
    REQUEST_TASKS_ERROR,
    EXIT_DETAIL_TASK,
    STORE_COMMENT_SUCCESS,
    DELETE_COMMENT_SUCCESS,
    UPDATE_COMMENT_SUCCESS,
    UPDATE_DESCRIPTION_SUCCESS,
    STORE_TODO_SUCCESS,
    UPDATE_TODO_SUCCESS,
    DELETE_TODO_SUCCESS,
    UPDATE_TIME_SUCCESS,
    UPDATE_TASK_SUCCESS,
    DELETE_TASK_SUCCESS,
} from "../constant";

const initTask = {
    requesting: false,
    error: null,
    data: null,
}
const tasksReducer = (state = initTask, action) =>{
    switch (action.type){
        case GET_TASKS_SUCCESS :
            return {
                ...state,
                requesting: false,
                data: action.data,
            };
        case REQUEST_TASKS_ERROR :
            return {
                ...state,
                requesting: false,
                error: action.error
            };
        case REQUESTING_TASKS:
            return {
                ...state,
                requesting: true,
            };
        case UPDATE_TASK_SUCCESS:
            return {
                ...state,
                requesting:false,
                data: {
                    ...state.data,
                    name: action.data.name
                }
            }

        case DELETE_TASK_SUCCESS:
            return {
                ...state,
                requesting:false,
                data: null,
            }

        case STORE_COMMENT_SUCCESS:
            return {
                ...state,
                requesting:false,
                data: {
                    ...state.data,
                    comments:[
                        ...state.data.comments,
                        action.data
                    ]
                }
            }
        case DELETE_COMMENT_SUCCESS:
            return {
                ...state,
                requesting:false,
                data: {
                    ...state.data,
                    comments: state.data.comments.filter(
                        (item, index)=>item.id != action.data)
                }
            }
        case UPDATE_COMMENT_SUCCESS:
            return {
                ...state,
                requesting:false,
                data: {
                    ...state.data,
                    comments: state.data.comments.map((item, index)=>{
                        if(item.id == action.data.id){
                            return {
                                ...item,
                                content: action.data.content,
                            }
                        } else return item;
                    })
                }
            }
        case UPDATE_DESCRIPTION_SUCCESS:
            return {
                ...state,
                requesting:false,
                data: {
                    ...state.data,
                    description : action.data.description,
                }
            }
        case UPDATE_TIME_SUCCESS:
            return {
                ...state,
                requesting:false,
                data: {
                    ...state.data,
                    start_time: action.data.start_time,
                    end_time: action.data.end_time,
                }
            }
        case STORE_TODO_SUCCESS:
            return {
                ...state,
                requesting:false,
                data: {
                    ...state.data,
                    todo_lists: [
                        ...state.data.todo_lists,
                        action.data,
                    ]
                }
            }
        case UPDATE_TODO_SUCCESS:
            return {
                ...state,
                requesting:false,
                data:{
                    ...state.data,
                    todo_lists: state.data.todo_lists.map((item)=>{
                        if(item.id == action.data.id){
                            return {
                                ...item,
                                complete: action.data.complete,
                                description: action.data.description,
                            }
                        }else return item;
                    })
                }
            }
        case DELETE_TODO_SUCCESS:
            return {
                ...state,
                requesting:false,
                data:{
                    ...state.data,
                    todo_lists: state.data.todo_lists.filter((item)=>item.id != action.data)
                }
            }


        case EXIT_DETAIL_TASK:
            return {
                ...state,
                data: null,
            }
        default:
            return state;
    }
}

export default tasksReducer;
