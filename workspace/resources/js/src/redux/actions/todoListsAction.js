import {requestError, requesting, requestSuccess, postAction, getAction} from "./commonAction";
import {
    DELETE_TODO_SUCCESS,
    GET_TODOS_SUCCESS,
    REQUEST_TODOS_ERROR,
    REQUESTING_TODOS,
    STORE_TODO_SUCCESS, UPDATE_TODO_SUCCESS
} from "../constant";

export const requestTodoError = (error)=> requestError(error, REQUEST_TODOS_ERROR);
export const requestingTodo = () => requesting(REQUESTING_TODOS);
export const getTodoSuccess = (data) => requestSuccess(data, GET_TODOS_SUCCESS);
export const storeTodoSuccess = (data) => requestSuccess(data, STORE_TODO_SUCCESS);
export const deleteTodoSuccess = (data) => requestSuccess(data, DELETE_TODO_SUCCESS);
export const updateTodoSuccess = (data) => requestSuccess(data, UPDATE_TODO_SUCCESS);

export const storeTodoAction = (data) => postAction('post', 'api/todos', data, requestingTodo,
    storeTodoSuccess, requestTodoError)
export const updateTodoAction = (id, data) => postAction('put', `api/todos/${id}`, data, requestingTodo,
    updateTodoSuccess, requestTodoError)
export const deleteTodoAction = (id) => getAction('delete', `api/todos/${id}`, requestingTodo,
   deleteTodoSuccess, requestTodoError)
export const indexTodosAction = (id) => getAction('get', `api/todos/${id}`, requestingTodo,
    getTodoSuccess, requestTodoError);
