import axios from "axios";


class EmployeeViewServices {
    static getAllEmployees(){
        return axios.get('http://localhost:8090/lms/api/employees');
    }
    
}

export default EmployeeViewServices;