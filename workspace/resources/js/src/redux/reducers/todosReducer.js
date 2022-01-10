import {
    DELETE_TODO_SUCCESS,
    GET_TODOS_SUCCESS,
    REQUEST_TODOS_ERROR,
    REQUESTING_TODOS,
    STORE_TODO_SUCCESS,
    UPDATE_TODO_SUCCESS
} from "../constant";

const initTodo = {
    requesting: false,
    error: null,
    data: {},
}

const todosReducer = (state = initTodo, action) => {
    switch (action.type) {
        case GET_TODOS_SUCCESS :
            return {
                ...state,
                requesting: false,
                data: {
                    ...state.data,
                    ...action.data
                },
            }
        case REQUEST_TODOS_ERROR :
            return {
                ...state,
                requesting: false,
                error: action.error,
            }
        case REQUESTING_TODOS:
            return {
                ...state,
                requesting: true,
            }
        case UPDATE_TODO_SUCCESS:
            return {
                ...state,
                requesting:false,
                data: {
                    ...state.data,
                    todos : state.data.todos.map(item=>{
                        if(item.id == action.data.id_task){
                            return {
                                ...item,
                                todo_lists: item.todo_lists.map(itemChild=>{
                                    if(itemChild.id==action.data.id){
                                        return {
                                            ...itemChild,
                                            ...action.data,
                                        }
                                    }else return itemChild;
                                })
                            }
                        }return item;
                    })
                }
            }
        case STORE_TODO_SUCCESS:
            return {
                ...state,
                requesting:false,
                data: {
                    ...state.data,
                    todos: state.data.todos.map(item=>{
                        if(item.id == action.data.id_task){
                            return {
                                ...item,
                                todo_lists: [
                                    ...item.todo_lists,
                                    action.data,
                                ]
                            }
                        }else return item;
                    })
                }
            }
        default : return state;
    }
}
export default todosReducer;
