import React from 'react'
import { useEffect, useState } from "react";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import EmployeeViewServices from '../services/EmployeeViewServices';
import { useNavigate } from 'react-router-dom';

import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';



const EmployeeView = () => {

    const history = useNavigate();

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.common.black, //  #87a3f7 "#4b5ee5" 
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
            //backgroundColor: "#fed8d0",
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));


    const [employees, setEmployees] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        try {
            EmployeeViewServices.getAllEmployees().then((response) => {
                setEmployees(response.data);
            });

        } catch (error) {
            console.error('Fetch Error: ', error);
        }
    }

    const backToDashboard = () => {
        console.log("inside")
        history('/admin');
    }

    const addEmployee = () => {
        history('/addEmployee/_create');
    }

    const editEmployee = (eid) => {
        history(`/addEmployee/${eid}`);
    }

    const deleteEmployee = (eid) => {
        EmployeeViewServices.deleteEmployee(eid).then(() => {
            fetchEmployees();
            setMessage('Employee details deleted successfully');
            setTimeout(() => { history('/manage-employee') }, 500);

        });
        history(`/deleteEmployee/${eid}`);
    }


    return (
        <>
            <Stack direction="row" alignItems="center" spacing={1}>
                <IconButton aria-label="delete" size="large" onClick={backToDashboard} >
                    <ArrowBackIosIcon />
                </IconButton>
            </Stack>

            <br></br>
            <h1>Employee List</h1>
            <br />
            <div className="row justify-content-center">
                <Button variant="contained" style={{
                    borderRadius: 2,
                    backgroundColor: "#DCDCDC",
                    padding: "8px 8px",
                    color: "#000000",
                    fontWeight: "bolder",
                    fontSize: "15px",
                    maxWidth: "200px"
                }} onClick={addEmployee}>
                    Add Employee
                </Button>
            </div>
            <TableContainer component={Paper} style={{ alignContent: 'center', justifyContent: "center" }}>
                <Table sx={{ minWidth: 100, maxWidth: 1300, mt: 10, ml: 15, mr: 10 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell width="10%" >Employee Id</StyledTableCell>
                            <StyledTableCell width="10%" align="center" sx={{ width: 50 }}>Employee Name</StyledTableCell>
                            <StyledTableCell width="10%" align="center">Designation</StyledTableCell>
                            <StyledTableCell width="10%" align="center">Department</StyledTableCell>
                            <StyledTableCell width="10%" align="center">Gender</StyledTableCell>
                            <StyledTableCell width="10%" align="center">Date_of_Birth</StyledTableCell>
                            <StyledTableCell width="10%" align="center">Date_of_Joining</StyledTableCell>
                            <StyledTableCell width="10%" align="center">Edit</StyledTableCell>
                            <StyledTableCell width="10%" align="center">Delete</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {employees.map((row) => (
                            <StyledTableRow key={row.id}>
                                <StyledTableCell width="10%" >
                                    {row.id}
                                </StyledTableCell>
                                <StyledTableCell width="10%" align="center">{row.name}</StyledTableCell>
                                <StyledTableCell width="10%" align="center">{row.designation}</StyledTableCell>
                                <StyledTableCell width="10%" align="center">{row.department}</StyledTableCell>
                                <StyledTableCell width="10%" align="center">{row.gender}</StyledTableCell>
                                <StyledTableCell width="10%" align="center">{row.dob}</StyledTableCell>
                                <StyledTableCell width="10%" align="center">{row.doj}</StyledTableCell>
                                <StyledTableCell width="10%" align="center">
                                    <Button variant="contained" style={{
                                        borderRadius: 2,
                                        backgroundColor: "#AFE1AF",
                                        padding: "5px 5px",
                                        color: "#000000",
                                        fontWeight: "bold",
                                        fontSize: "13px"
                                    }} onClick={() => { editEmployee(row.id) }}>
                                        Edit
                                    </Button>
                                </StyledTableCell>
                                <StyledTableCell width="10%" align="center">
                                    <Button variant="contained" style={{
                                        borderRadius: 2,
                                        backgroundColor: "#FFCCCB",
                                        padding: "5px 5px",
                                        color: "#000000",
                                        fontWeight: "bold",
                                        fontSize: "13px"
                                    }} onClick={() => { deleteEmployee(row.id) }}>
                                        Delete
                                    </Button>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

        </>
    )
}

export default EmployeeView