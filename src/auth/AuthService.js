import axios from "axios"
import {setAuthToken} from "./auth";


const API_URL = 'https://pharmacy-location.up.railway.app/api/auth';

const AuthService = {
    login: async (email, password) => {

        try {
            const response = await axios.post(`${API_URL}/authenticate`, {email, password});
            const token = response.data.access_token;
            const user = response.data.user;
            console.log(token)
            console.log(user)
            localStorage.setItem('token', token);
            localStorage.setItem('user', user);
            setAuthToken(token);
            return JSON.parse(user)
        } catch (e) {
            console.error(e);
        }
    },
}
export default AuthService;