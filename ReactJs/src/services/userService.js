import axios from "../axios";
// import axios from "axios";

export const handleLogin = (email , password) => {
    return axios.post('/api/login', {
        email , password
    });
} 
