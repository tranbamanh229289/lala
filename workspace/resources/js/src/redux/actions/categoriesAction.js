import {
    REQUESTING_CATEGORIES,
    GET_CATEGORIES_SUCCESS,
    REQUEST_CATEGORIES_ERROR,
    UPDATE_CATEGORY_SUCCESS,
    STORE_CATEGORY_SUCCESS,
    DELETE_CATEGORY_SUCCESS
} from "../constant";
import {requesting, requestSuccess, requestError, getAction, postAction} from './commonAction';

export const requestCategoryError = (error)=> requestError(error, REQUEST_CATEGORIES_ERROR);
export const requestingCategory = () => requesting(REQUESTING_CATEGORIES);
export const getCategorySuccess = (data) => requestSuccess(data, GET_CATEGORIES_SUCCESS);
export const updateCategorySuccess = (data) => requestSuccess(data, UPDATE_CATEGORY_SUCCESS);
export const storeCategorySuccess = (data) => requestSuccess(data, STORE_CATEGORY_SUCCESS);
export const deleteCategorySuccess = (data) =>requestSuccess(data, DELETE_CATEGORY_SUCCESS);

export const indexCategoriesAction = (id) => getAction('get', `api/projects/${id}`, requestingCategory,
    getCategorySuccess, requestCategoryError);

export const updateNameCategoryAction = (data, id) => postAction('put', `api/categories/${id}`, data,
    requestingCategory, updateCategorySuccess, requestCategoryError);

export const storeCategoryAction = (data) => postAction('post', 'api/categories', data, requestingCategory,
    storeCategorySuccess, requestCategoryError);

export const deleteCategoryAction = (id) => getAction('delete', `api/categories/${id}`, requestingCategory,
    deleteCategorySuccess, requestCategoryError);

