import { toast } from 'react-toastify';

const config = {
    autoClose: 2000,
}
export const showToastSuccess = (message)=>{
    toast.success(message, config);
}
export const showToastError = (message)=>{
    toast.error(message, config);
}
export const showToastInfo = (message)=>{
    toast.info(message, config);
}
export const showToastWarn = (message)=>{
    toast.warn(message, config);
}

