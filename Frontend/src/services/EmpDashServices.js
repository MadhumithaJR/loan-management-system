import axios from "axios";


class EmpDashServices {
    static getEmpLoans(id){
        return axios.get('http://localhost:8090/lms/api/viewLoans/' + id);
    }

    static getEmpItems(id){
        return axios.get('http://localhost:8090/lms/api/viewItems/' + id);
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

export default EmpDashServices;