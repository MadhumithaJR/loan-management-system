import { useNavigate } from "react-router-dom";
import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';


const Employee = () => {
    const history=useNavigate();
return (
<div className="container-fluid">
    <h2>Employee Dashboard</h2>
    <ButtonGroup variant="contained" aria-label="outlined primary button group">
      <Button onClick={() => history('/employee/one')}>View Loans</Button>
      <Button onClick={() => history('/employee/two')}>Apply for Loan</Button>
      <Button onClick={() => history('/employee/three')}>View Items Purchased</Button>
    </ButtonGroup>
</div>
    
);
}

export default Employee;