import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

const AdminOne = () => {
    const history=useNavigate();
    return (
        <div><h2>Customer Data Management</h2>
        <Button variant="contained" onClick={() => history('/admin')}>Admin Home</Button></div>
    )
}


export default AdminOne;