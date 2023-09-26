import * as React from 'react';
import { useNavigate} from "react-router-dom";
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';


const Admin = () => {
return (
<div className="container-fluid">
<div className="row p-3 pt-5">
    <div className="col-md-12">
    <button type="button" class="btn btn-outline-secondary btn-light">Customer Data Management</button>
    </div>
</div>
<div className="row p-3 ">
    <div className="col-md-12">
    <button type="button" class="btn btn-outline-secondary btn-light">Loan Card Management</button>
    </div>
</div>
<div className="row p-3 pb-5">
    <div className="col-md-12">
    <button type="button" class="btn btn-outline-secondary btn-light">Items Master Data</button>
    </div>
</div>
    
    
</div>
);
}

export default Admin;