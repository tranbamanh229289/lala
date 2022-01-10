import { REQUESTING_USER, GET_USER_SUCCESS, REQUEST_USER_ERROR } from "../constant";
import { requesting, requestSuccess, requestError, getAction } from './commonAction';

export const getUserSuccess = (data) => requestSuccess(data, GET_USER_SUCCESS);
export const requestUserError = (error)=> requestError(error, REQUEST_USER_ERROR);
export const requestingUser = () => requesting(REQUESTING_USER);

export const getMeAction = () => getAction('post', 'api/me', requestingUser,
    getUserSuccess, requestUserError);
export const getUserAction = (idUser) => getAction('get', `api/me/${idUser}`)

