import { useNavigate } from "react-router-dom";
import * as React from 'react';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import { Grid } from "@mui/material";
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
        <div style={{backgroundImage:'url(https://d2lwtouoc9qh9n.cloudfront.net/wp-content/uploads/2023/01/wordpress-basics-featured-image-jpg.webp)',
        width: '180vh',height:'135vh'}}>
        <div><h1 style={{color:"white", fontFamily:"Lobster"}}>   Admin Dashboard</h1></div>
        <div className="container-fluid" style={{ width: "70%", marginTop: '5%', }}>
            <Box sx={{ width: '100%', display: 'grid', gap: 1, }}>
                <Grid container xs={12}>
                    <Grid item xs={4}>
                        <Card variant="solid" invertedColors onClick={customerManagement} style={{ padding: "5vh", cursor: "pointer", width: "22vw",}}>
                            <CardContent>
                                <Typography style={{color:"white", fontFamily:"Lobster"}}>Customer Data Management</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={4}>
                        <Card variant="solid" invertedColors  onClick={loanManagement} style={{ padding: "5vh", cursor: "pointer", width: "22vw" }}>
                            <CardContent>
                                <Typography style={{color:"white", fontFamily:"Lobster"}}>Loan Card Management</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={4}>
                        <Card variant="solid" invertedColors onClick={itemManagement} style={{ padding: "5vh", cursor: "pointer", width: "22vw" }}>
                            <CardContent>
                                <Typography style={{color:"white", fontFamily:"Lobster"}}>Items Master Data</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </div>
        </div>
    );
}

export default Admin;

