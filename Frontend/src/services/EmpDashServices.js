import axios from "axios";


class EmpDashServices {
    static getEmpLoans(id){
        return axios.get('http://localhost:8090/lms/api/viewLoans/' + id);
    }

    static getEmpItems(id){
        return axios.get('http://localhost:8090/lms/api/viewItems/' + id);
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

    static applyForLoan(applyLoan){
        return axios.post('http://localhost:8090/lms/api/applyLoan',applyLoan);
    }

    static getDescriptions(item_category){
        return axios.get('http://localhost:8090/lms/api/getDescriptions'+'/'+item_category);
    }

    static getMakes(item_category,item_description){
        return axios.get('http://localhost:8090/lms/api/getMakes'+'/'+item_category+'/'+item_description);
    }

    static getValue(item_category,item_description,item_make){
        return axios.get('http://localhost:8090/lms/api/getValue'+'/'+item_category+'/'+item_description+'/'+item_make);
    }

    static getAllLoanTypes(){
        return axios.get('http://localhost:8090/lms/api/getAllLoanTypes');
    }
    
}

export default EmpDashServices;