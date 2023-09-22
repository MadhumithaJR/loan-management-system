import axios from "axios";


class AdminLoginService {
    static async loginAdmin(admin){
        try{
            const response=await axios.post('http://localhost:8090/lms/api/admin/login',admin);
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
    
}

export default AdminLoginService