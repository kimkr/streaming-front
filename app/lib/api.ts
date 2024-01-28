import axios from 'axios';
import { API_URL } from '../config';

console.log(`API_URL:${API_URL}`);

axios.defaults.baseURL = API_URL;
axios.defaults.withCredentials = true;

type SnsType = {
    type: string;
    content: string;
}
type ApplyHostArg = {
    artist_id: number;
    sns: SnsType[];
    introduction: string;
    email: string;
}

const axiosConfig = () => {
    const token = window.localStorage.getItem("userId");
    return { headers: { "Authorization": `Bearer ${token}` } };
}

export const anonymousSignIn = async (userId?: string) => {
    return axios.post('/anonymous/sign_in/', { userId });
}

export const applyHost = async (args: ApplyHostArg) => {
    return axios.post('/streaming/apply_host/', args, axiosConfig());
};

export const listHostApplyStatus = async (page: number, size: number) => {
    return axios.get(`/streaming/list_host_apply_status/${page}/${size}`, axiosConfig());
}

export const cancelHostApply = async (requestId: number) => {
    return axios.patch('/streaming/cancel_host_apply/', { request_id: requestId }, axiosConfig());
}
