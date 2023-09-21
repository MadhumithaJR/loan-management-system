import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
const EmployeeThree = () => {
    const history=useNavigate();
    return (
        <div><h2>View Items Purchased</h2>
<Button variant="contained" onClick={() => history('/employee')}>Employee Home</Button>
        </div>
    )
}


export default EmployeeThree;