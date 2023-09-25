import axios from "axios";


class LoanViewServices {
    static getAllLoans(){
        return axios.get('http://localhost:8090/lms/api/admin/loan');
    }

    static createLoan(loan){
        return axios.post('http://localhost:8090/lms/api/admin/loan',loan);
    }

    static updateLoan(loan,loanId){
        return axios.put('http://localhost:8090/lms/api/admin/loan'+'/'+loanId,loan);
    }

    static getLoanById(loanId){
        return axios.get('http://localhost:8090/lms/api/admin/loan'+'/'+loanId);
    }

    static deleteLoan(loanId){
        return axios.delete('http://localhost:8090/lms/api/admin/loan'+'/'+loanId);
    }
    
}

export default LoanViewServices;