import * as React from 'react';
import { useNavigate} from "react-router-dom";
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';


const Admin = () => {
    const history=useNavigate();
return (
<div className="container-fluid">
    <h2>Admin Dashboard</h2>
    <ButtonGroup variant="contained" aria-label="outlined primary button group">
      <Button onClick={() => history('/admin/one')}>Customer Data Management</Button>
      <Button onClick={() => history('/admin/two')}>Loan Card Management</Button>
      <Button onClick={() => history('/admin/three')}>Items Master Data</Button>
    </ButtonGroup>
</div>
);
}

export default Admin;