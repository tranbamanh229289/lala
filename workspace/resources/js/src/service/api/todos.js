import axiosClient from "./axiosClient";

const getTodosComplete = (id)=>{
    try {
        const todos = axiosClient('get', `api/todos/${id}`);
    } catch (e){
        throw(e);
    }
}
