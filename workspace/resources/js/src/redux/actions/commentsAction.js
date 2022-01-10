import {
    REQUESTING_COMMENTS,
    GET_COMMENTS_SUCCESS,
    REQUEST_COMMENTS_ERROR,
    STORE_COMMENT_SUCCESS,
    DELETE_COMMENT_SUCCESS, UPDATE_COMMENT_SUCCESS
} from "../constant";
import {requesting, requestSuccess, requestError, getAction ,postAction} from './commonAction';

export const requestCommentError = (error)=> requestError(error, REQUEST_COMMENTS_ERROR);
export const requestingComment = () => requesting(REQUESTING_COMMENTS);
export const getCommentSuccess = (data) => requestSuccess(data, GET_COMMENTS_SUCCESS);
export const storeCommentSuccess = (data) => requestSuccess(data, STORE_COMMENT_SUCCESS);
export const deleteCommentSuccess = (data) => requestSuccess(data, DELETE_COMMENT_SUCCESS);
export const updateCommentSuccess = (data) => requestSuccess(data, UPDATE_COMMENT_SUCCESS);

export const indexCommentsAction = (id) => getAction('get', `api/comments/${id}`, requestingComment,
    getCommentSuccess, requestCommentError);
export const storeCommentAction = (data) => postAction('post', 'api/comments', data, requestingComment,
    storeCommentSuccess, requestCommentError);
export const deleteCommentAction = (id) =>getAction('delete', `api/comments/${id}`, requestingComment,
    deleteCommentSuccess, requestCommentError);
export const updateCommentAction = (id, data) =>postAction ('put', `api/comments/${id}`, data, requestingComment,
    updateCommentSuccess, requestCommentError);
