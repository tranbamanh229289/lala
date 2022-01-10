import axiosClient from "../../service/api/axiosClient";

export const requestSuccess = (data, type)=>{
    return {
        type : type,
        data : data,
    }
}
export const requestError = (error, type)=>{
    return {
        type : type,
        data : error,
    }
}
export const requesting = (type) => {
    return {
        type : type,
    }
}

//getAction là các request k có data truyền lên,
export const getAction = (method, url, requesting, requestSuccess, requestError) => {
    return async dispatch => {
        dispatch(requesting());
        try {
            const res = await axiosClient(method, url);
            dispatch(requestSuccess(res.data));
        } catch(error){
            dispatch(requestError(error));
        }
    }
}

//postAction là các request có data truyền lên
export const postAction = (method, url, data, requesting, requestSuccess, requestError)=>{
    return async dispatch => {
        dispatch(requesting());
        try {
            const res = await axiosClient(method, url, data);
            dispatch(requestSuccess(res.data));
        } catch(error){
            dispatch(requestError(error));
        }
    }
}


