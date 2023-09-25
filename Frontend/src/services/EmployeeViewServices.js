import axios from "axios";


class EmployeeViewServices {
    static getAllEmployees(){
        return axios.get('http://localhost:8090/lms/api/employees');
    }

    static createEmployee(employee){
        return axios.post('http://localhost:8090/lms/api/employees',employee);
    }

    static updateEmployee(employee,employeeId){
        return axios.put('http://localhost:8090/lms/api/employees'+'/'+employeeId,employee);
    }

    static getEmployeeById(employeeId){
        return axios.get('http://localhost:8090/lms/api/employees'+'/'+employeeId);
    }

    static deleteEmployee(employeeId){
        return axios.delete('http://localhost:8090/lms/api/employees'+'/'+employeeId);
    }
    
}

export default EmployeeViewServices;