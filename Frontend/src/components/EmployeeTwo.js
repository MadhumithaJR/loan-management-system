import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
const EmployeeTwo = () => {
    const history=useNavigate();
    return (
        <div><h2>Apply for Loan</h2>
<Button variant="contained" onClick={() => history('/employee')}>Employee Home</Button>
        </div>
    )
}


export default EmployeeTwo;