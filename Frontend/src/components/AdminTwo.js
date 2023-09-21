import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
const AdminTwo = () => {
    const history=useNavigate();
    return (
        <div><h2>Loan Card Management</h2>
<Button variant="contained" onClick={() => history('/admin')}>Admin Home</Button>
        </div>
    )
}


export default AdminTwo;