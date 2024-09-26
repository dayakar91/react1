import axios from "axios";

const API_URL="localhost:1900/api/auth/";

class AuthService{
    register(username,email,password){

        axios.post(API_URL+'signup',{
            username,
            email,
            password
        });

    }
}
export default AuthService;