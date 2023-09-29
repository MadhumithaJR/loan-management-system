import axios from "axios";


class EmployeeViewServices {
    static getAllEmployees(){
        return axios.get('http://localhost:8090/lms/api/admin/employees');
    }

    static createEmployee(employee){
        return axios.post('http://localhost:8090/lms/api/admin/employees',employee);
    }

    static updateEmployee(employee,employeeId){
        return axios.put('http://localhost:8090/lms/api/admin/employees'+'/'+employeeId,employee);
    }

    static getEmployeeById(employeeId){
        return axios.get('http://localhost:8090/lms/api/admin/employees'+'/'+employeeId);
    }

    static deleteEmployee(employeeId){
        return axios.delete('http://localhost:8090/lms/api/admin/employees'+'/'+employeeId);
    }
    
}

export default EmployeeViewServices;