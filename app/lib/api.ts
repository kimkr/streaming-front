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

export const applyHost = async (args: ApplyHostArg) => {
    return axios.post('/streaming/apply_host/', args);
};

