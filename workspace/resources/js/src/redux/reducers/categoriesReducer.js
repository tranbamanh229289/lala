import {
    REQUESTING_CATEGORIES,
    GET_CATEGORIES_SUCCESS,
    REQUEST_CATEGORIES_ERROR,
    UPDATE_CATEGORY_SUCCESS,
    STORE_TASK_SUCCESS,
    STORE_CATEGORY_SUCCESS,
    DELETE_CATEGORY_SUCCESS,
    UPDATE_PROJECT_SUCCESS, UPDATE_TASK_SUCCESS, DELETE_TASK_SUCCESS, UPDATE_TIME_SUCCESS, DELETE_PROJECT_SUCCESS
} from "../constant";

const initCategory = {
    requesting: false,
    error: null,
    data: {},
}

const categoriesReducer = (state = initCategory, action) =>{
    switch (action.type){
        case GET_CATEGORIES_SUCCESS :
            return {
                ...state,
                requesting: false,
                data: {
                    ...state.data,
                    ...action.data
                },
            }
        case REQUEST_CATEGORIES_ERROR :
            return {
                ...state,
                requesting: false,
                error: action.error,
            }
        case REQUESTING_CATEGORIES:
            return {
                ...state,
                requesting: true,
            }
        case UPDATE_CATEGORY_SUCCESS:
            return {
                ...state,
                requesting : false,
                data: {
                    ...state.data,
                    categories : state.data.categories.map((item, index)=>{
                        if(item.id === action.data.id){
                            return {
                            ...item,
                            name: action.data.name,
                            }
                    }
                    return item;
                })}
            }
        case STORE_TASK_SUCCESS:
            return {
                ...state,
                requesting: false,
                data: {
                    ...state.data,
                    categories : state.data.categories.map((item, index)=>{
                        if(item.id === action.data.id_category){
                            return {
                                ...item,
                                tasks: [
                                    ...item.tasks,
                                    action.data
                                ]
                            }
                        }
                        return item;
                    })
                }
            }
        case STORE_CATEGORY_SUCCESS:
            return {
                ...state,
                requesting: false,
                data: {
                    ...state.data,
                    categories: [
                        ...state.data.categories,
                        action.data
                    ]
                }
            }
        case DELETE_CATEGORY_SUCCESS:
            return {
                ...state,
                requesting: false,
                data: {
                    ...state.data,
                    categories: state.data.categories.filter((item, index)=>{
                        return item.id != action.data
                    })
                }
            }
        case UPDATE_PROJECT_SUCCESS:
            return {
                ...state,
                requesting:false,
                data:{
                    ...state.data,
                    name: action.data.name,
                }
            }
        case UPDATE_TASK_SUCCESS:
            return {
                ...state,
                requesting: false,
                data: {
                    ...state.data,
                    categories: state.data.categories.map((item)=>{
                        if(item.id==action.data.id_category){
                            return {
                                ...item,
                                tasks: item.tasks.map((itemChild)=>{
                                    if(itemChild.id == action.data.id){
                                        return {
                                            ...itemChild,
                                            name: action.data.name,
                                        }
                                    }else return itemChild;
                                })
                            }
                        }
                        return item;
                    })
                }
            }
        case DELETE_TASK_SUCCESS:
            return {
                ...state,
                requesting: false,
                data: {
                    ...state.data,
                    categories: state.data.categories.map((item)=>{
                        return {
                            ...item,
                            tasks: item.tasks.filter(chilItem=>chilItem.id != action.data)
                        }
                    })
                }
            }
        case UPDATE_TIME_SUCCESS :
            return {
                ...state,
                requesting: false,
                data:{
                    ...state.data,
                    categories : state.data.categories.map((item)=>{
                        return {
                            ...item,
                            tasks: item.tasks.map(childItem=>{
                                if(childItem.id == action.data.id){
                                    return {
                                        ...childItem,
                                        start_time: action.data.start_time,
                                        end_time: action.data.end_time,
                                    }
                                }
                                return childItem;
                            })
                        }
                    })
                }
            }
        case DELETE_PROJECT_SUCCESS:
            return {
                ...state,
                requesting: false,
                data:{
                    ...state.data,
                    categories: state.data.categories.filter(item=>item.id_project != action.data),
                }
            }
        default:
            return state;
    }
}

export default categoriesReducer;
