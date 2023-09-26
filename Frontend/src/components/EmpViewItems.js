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
import { useCookies } from 'react-cookie';
import EmpDashServices from '../services/EmpDashServices';



const EmpViewItems = () => {

    const history = useNavigate();
    const [cookies, setCookie] = useCookies(['user']);
    const empId = cookies.id;
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


    const [items, setItems] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        try {
            EmpDashServices.getEmpLoans(empId).then((response) => {
                setItems(response.data);
                console.log(response.data);
            });

        } catch (error) {
            console.error('Fetch Error: ', error);
        }
    }


    


    return (
        <>
            <br></br>
            <h1>Employee Loan List {cookies.id}</h1>
            <br />
            <TableContainer component={Paper} style={{ alignContent: 'center', justifyContent: "center" }}>
                <Table sx={{ minWidth: 100, maxWidth: 1300, mt: 10, ml: 15, mr: 10 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell width="10%" >Loan Id</StyledTableCell>
                            <StyledTableCell width="10%" align="center" sx={{ width: 50 }}>Loan type</StyledTableCell>
                            <StyledTableCell width="10%" align="center">Duration</StyledTableCell>
                            <StyledTableCell width="10%" align="center">Card issue date</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {items.map((row) => (
                            <StyledTableRow key={row.id}>
                                <StyledTableCell width="10%" >{row.loan_id}</StyledTableCell>
                                <StyledTableCell width="10%" align="center">{row.type}</StyledTableCell>
                                <StyledTableCell width="10%" align="center">{row.duration}</StyledTableCell>
                                <StyledTableCell width="10%" align="center">{row.date}</StyledTableCell>
                                
                                
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

        </>
    )
}

export default EmpViewItems