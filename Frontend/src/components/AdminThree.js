import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
const AdminThree = () => {
    const history= useNavigate();
    return (
        <div><h2>Items Master Data</h2>
<Button variant="contained" onClick={() => history('/admin')}>Admin Home</Button>
        </div>
    )
}


export default AdminThree;