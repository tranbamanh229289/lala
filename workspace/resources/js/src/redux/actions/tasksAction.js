import {
    REQUESTING_TASKS,
    GET_TASKS_SUCCESS,
    REQUEST_TASKS_ERROR,
    EXIT_DETAIL_TASK,
    STORE_TASK_SUCCESS,
    UPDATE_DESCRIPTION_SUCCESS,
    UPDATE_TIME_SUCCESS, UPDATE_TASK_SUCCESS, DELETE_TASK_SUCCESS
} from "../constant";
import {requesting, requestSuccess, requestError, getAction, postAction} from './commonAction';

export const requestTaskError = (error)=> requestError(error, REQUEST_TASKS_ERROR);
export const requestingTask = () => requesting(REQUESTING_TASKS);
export const getTaskSuccess = (data) => requestSuccess(data, GET_TASKS_SUCCESS);
export const storeTaskSuccess = (data) => requestSuccess(data, STORE_TASK_SUCCESS);
export const updateTaskSuccess = (data) => requestSuccess(data, UPDATE_TASK_SUCCESS);
export const deleteTaskSuccess = (data) => requestSuccess(data, DELETE_TASK_SUCCESS);

export const updateDescriptionSuccess = (data) =>requestSuccess(data, UPDATE_DESCRIPTION_SUCCESS);
export const updateTimeSuccess = (data) => requestSuccess(data, UPDATE_TIME_SUCCESS);

export const showTasksAction = (id) => getAction('get', `api/tasks/${id}`, requestingTask,
    getTaskSuccess, requestTaskError);

export const storeTaskAction = (data) => postAction('post', 'api/tasks', data, requestingTask,
    storeTaskSuccess, requestTaskError);

export const updateNameTaskAction = (id, data) =>postAction('put', `api/tasks/${id}`, data, requestingTask,
    updateTaskSuccess, requestTaskError);

export const deleteTaskAction = (id) => getAction('delete', `api/tasks/${id}`, requestingTask, deleteTaskSuccess,
    requestTaskError);

export const updateDescriptionAction = (id, data)=> postAction('put', `api/description/${id}`, data, requestingTask,
    updateDescriptionSuccess, requestTaskError);

export const updateTimeAction = (id, data)=>postAction('put', `api/time/${id}`, data, requestingTask,
    updateTimeSuccess, requestTaskError);

export const getUserNames = (id) => getAction('get', `api/tasks/getUserNames/${id}`)

export const exitDetailTaskAction = () => {
    return {
        type: EXIT_DETAIL_TASK,
    }
}
