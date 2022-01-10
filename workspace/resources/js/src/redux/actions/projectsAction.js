import {
    REQUESTING_PROJECTS,
    GET_PROJECTS_SUCCESS,
    REQUEST_PROJECTS_ERROR,
    STORE_PROJECT_SUCCESS,
    UPDATE_PROJECT_SUCCESS,
    STORE_MEMBER_PROJECT_SUCCESS,
    DELETE_MEMBER_PROJECT_SUCCESS, DELETE_PROJECT_SUCCESS,
} from "../constant";
import { requesting, requestSuccess, requestError, getAction, postAction } from './commonAction';

export const requestProjectError = (error)=> requestError(error, REQUEST_PROJECTS_ERROR);
export const requestingProject = () => requesting(REQUESTING_PROJECTS);
export const getProjectSuccess = (data) => requestSuccess(data, GET_PROJECTS_SUCCESS);
export const storeProjectSuccess = (data) => requestSuccess(data, STORE_PROJECT_SUCCESS);
export const updateProjectSuccess = (data) => requestSuccess(data, UPDATE_PROJECT_SUCCESS);
export const deleteProjectSuccess = (data) => requestSuccess(data, DELETE_PROJECT_SUCCESS);

export const indexProjectsAction = () => getAction('get', 'api/projects', requestingProject,
    getProjectSuccess, requestProjectError);
export const storeProjectAction = (data) => postAction('post', 'api/projects', data, requestingProject,
    storeProjectSuccess, requestProjectError);
export const updateNameProjectAction = (data, id) =>postAction ('put', `api/projects/${id}`, data, requestingProject,
    updateProjectSuccess, requestError);
export const deleteProjectAction = (id) => getAction ('delete', `api/projects/${id}`, requestingProject,
    deleteProjectSuccess, requestError);


