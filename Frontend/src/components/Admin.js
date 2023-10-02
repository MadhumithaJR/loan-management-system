import { useNavigate } from "react-router-dom";
import * as React from 'react';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import { Grid } from "@mui/material";
import { useCookies } from 'react-cookie';
import ProSidebar_Admin from './ProSidebar_Admin';
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

        <>
            <center>
                <div style={{ display: 'flex' }}>
                    <div className="col-lg-4 p-0" emp-sidebar>
                        <ProSidebar_Admin name="Admin" />
                    </div>
                    <div className="emp-heading ">
                        <h2 style={{ marginLeft: '-5vw', marginTop: '5vh' }}> Hello Admin!</h2>
                        <h2 style={{ marginLeft: '-5vw', marginTop: '11vh' }}>Welcome Back</h2>
                        <div style={{ display: 'flex' }}>
                            <div style={{ marginLeft: '-1vw', marginTop: '42vh' }}>
                                <button style={{ height: '7vh', width: '8vw', border: '2px solid black', fontWeight: 'bolder' }} class="btn btn-outline-secondary btn-light" >
                                    Administration
                                </button>
                            </div>
                            <div style={{ marginLeft: '3vw', marginTop: '42vh' }}>
                                <button style={{ height: '7vh', width: '8vw', border: '2px solid black', fontWeight: 'bolder' }} class="btn btn-outline-secondary btn-light" >
                                    Admin
                                </button>
                            </div>

                        </div>
                    </div>
                    <div>
                        <img src="https://communityservices.humber.ca/assets/images/home/program-cards/psi-card600x400.jpg" style={{ width: '20vw', height: '40vh', borderRadius: '50%', objectFit: 'cover', marginLeft: '7vw', marginTop: '13vh' }}></img>
                    </div>

                </div>
            </center>
        </>
        // <div>
        //     <div className="col-lg-4 p-0" emp-sidebar>
        //         <ProSidebar_Admin name="Admin" />
        //     </div>
        //     <div className="emp-heading ">
        //         <h2> Welcome, Admin </h2>
        //     </div>

        // </div>
        // <div style={{backgroundImage:'url(https://d2lwtouoc9qh9n.cloudfront.net/wp-content/uploads/2023/01/wordpress-basics-featured-image-jpg.webp)',
        // width: '180vh',height:'135vh'}}>
        // <div><h1 style={{color:"white", fontFamily:"Lobster"}}>   Admin Dashboard</h1></div>
        // <div className="container-fluid" style={{ width: "70%", marginTop: '5%', }}>
        //     <Box sx={{ width: '100%', display: 'grid', gap: 1, }}>
        //         <Grid container xs={12}>
        //             <Grid item xs={4}>
        //                 <Card variant="solid" invertedColors onClick={customerManagement} style={{ padding: "5vh", cursor: "pointer", width: "22vw",}}>
        //                     <CardContent>
        //                         <Typography style={{color:"white", fontFamily:"Lobster"}}>Customer Data Management</Typography>
        //                     </CardContent>
        //                 </Card>
        //             </Grid>
        //             <Grid item xs={4}>
        //                 <Card variant="solid" invertedColors  onClick={loanManagement} style={{ padding: "5vh", cursor: "pointer", width: "22vw" }}>
        //                     <CardContent>
        //                         <Typography style={{color:"white", fontFamily:"Lobster"}}>Loan Card Management</Typography>
        //                     </CardContent>
        //                 </Card>
        //             </Grid>
        //             <Grid item xs={4}>
        //                 <Card variant="solid" invertedColors onClick={itemManagement} style={{ padding: "5vh", cursor: "pointer", width: "22vw" }}>
        //                     <CardContent>
        //                         <Typography style={{color:"white", fontFamily:"Lobster"}}>Items Master Data</Typography>
        //                     </CardContent>
        //                 </Card>
        //             </Grid>
        //         </Grid>
        //     </Box>
        // </div>
        // </div>
    );
}

export default Admin;

