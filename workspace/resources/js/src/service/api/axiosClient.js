import axios from 'axios';
import storage from '../storage/tokenStorage';

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.common['Accept'] = 'application/json';

const axiosClient = (method, url, data={}) => {
    const headers= {};
    const accessToken= storage.getAccessToken();

    if (accessToken){
        headers['Authorization'] = 'Bearer ' + accessToken;
    }
    return axios({
        method: method,
        baseURL: window.location.origin,
        url: url,
        data: data,
        headers: headers,
    })
};

export default axiosClient;
