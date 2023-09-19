import axios from "axios";


class AuthenticationService {
    static async loginEmployee(employee){
        try{
            const response=await axios.post('http://localhost:8090/lms/api/login',employee);
            console.log(response.data);
            if(response.data===true){
                return true;
            }
            else{
                return false;
            }
        }catch(error){
            console.log("Login Error:",error);
        }
    }
    static async registerEmployee(employee){
        try{
            const response =await axios.post("http://localhost:8090/lms/api/employees",employee);
            console.log(response.data);
            return response.data;
        }catch(error){
            console.log("Registration Error:",error);
        }
    }
}

export default AuthenticationService