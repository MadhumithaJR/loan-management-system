import { useNavigate } from "react-router-dom";

const Admin = () => {

    const history = useNavigate();

    const customerManagement = () => {
        history('/manage-employee');
    }

    const loanManagement = () => {
        history('/manage-loan');
    }

    const itemManagement = () => {
        history('/manage-item');
    }

    return (
        <div className="container-fluid">
            <div className="row p-3 pt-5">
                <div className="col-md-12">
                    <button type="button" class="btn btn-outline-secondary btn-light" onClick={customerManagement}>Customer Data Management</button>
                </div>
            </div>
            <div className="row p-3 ">
                <div className="col-md-12">
                    <button type="button" class="btn btn-outline-secondary btn-light" onClick={loanManagement}>Loan Card Management</button>
                </div>
            </div>
            <div className="row p-3 pb-5">
                <div className="col-md-12">
                    <button type="button" class="btn btn-outline-secondary btn-light" onClick={itemManagement}>Items Master Data</button>
                </div>
            </div>


        </div>
    );
}

export default Admin;