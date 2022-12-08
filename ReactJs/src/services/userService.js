import axios from "../axios";
// import axios from "axios";

export const handleLogin = (email , password) => {
    return axios.post('/api/login', {
        email , 
    });

    // axios.post('http://localhost:3001/api/login', {
    //     email: 'First name',
    //     password: 'Last name'
    //   })
    //   .then(function (response) {
    //     console.log(response);
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
      
} 
