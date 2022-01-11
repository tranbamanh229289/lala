import { getAction, postAction, requestError, requesting, requestSuccess } from "./commonAction";
import {
    REQUEST_MEMBERS_ERROR,
    REQUESTING_MEMBERS,
    STORE_MEMBER_PROJECT_SUCCESS,
    STORE_MEMBER_TASK_SUCCESS,
    DELETE_MEMBER_PROJECT_SUCCESS,
    DELETE_MEMBER_TASK_SUCCESS} from "../constant";


export const requestMemberError = (error)=> requestError(error, REQUEST_MEMBERS_ERROR);
export const requestingMember = () => requesting(REQUESTING_MEMBERS);
export const storeMemberProjectSuccess = (data) =>requestSuccess(data, STORE_MEMBER_PROJECT_SUCCESS);
export const deleteMemberProjectSuccess = (data) =>requestSuccess(data, DELETE_MEMBER_PROJECT_SUCCESS);
export const storeMemberTaskSuccess = (data) =>requestSuccess(data, STORE_MEMBER_TASK_SUCCESS);
export const deleteMemberTaskSuccess = (data) =>requestSuccess(data, DELETE_MEMBER_TASK_SUCCESS);

export const storeMemberProjectAction = (data)=> postAction('post', 'api/project/members', data,requestingMember,
    storeMemberProjectSuccess, requestMemberError);
export const deleteMemberProjectAction = (id)=> getAction('delete', `api/project/members/${id}`, requestingMember,
    deleteMemberProjectSuccess, requestMemberError);
export const storeMemberTaskAction = (data)=> postAction('post', 'api/task/members', data,requestingMember,
    storeMemberTaskSuccess, requestMemberError);
export const deleteMemberTaskAction = (id)=> getAction('delete', `api/task/members/${id}`,requestingMember,
    deleteMemberTaskSuccess, requestMemberError);
