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
import { useNavigate } from 'react-router-dom';
import LoanViewServices from '../services/LoanViewServices';
import Box from '@mui/material/Box';



const LoanView = () => {

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


    const [loans, setLoans] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchLoans();
    }, []);

    const fetchLoans = async () => {
        try {
            LoanViewServices.getAllLoans().then((response) => {
                setLoans(response.data);
            });

        } catch (error) {
            console.error('Fetch Error: ', error);
        }
    }


    const addLoan = () => {
        history('/addLoan/_create');
    }

    const editLoan = (lid) => {
        history(`/addLoan/${lid}`);
    }

    const deleteLoan = (lid) => {
        LoanViewServices.deleteLoan(lid).then(() => {
            fetchLoans();
            setMessage('Loan Card details deleted successfully');
            setTimeout(() => { history('/manage-loan') }, 500);

        });
        history(`/deleteLoan/${lid}`);
    }


    return (
        <>
            
                <br></br>
                <h1>Loan List</h1>
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
                    }} onClick={addLoan}>
                        Add Loan Card
                    </Button>
                </div>
                <TableContainer component={Paper} style={{ alignContent: 'center', justifyContent: "center" }}>
                    <Table sx={{ minWidth: 100, maxWidth: 800, mt: 10, ml: 48, mr: 10 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell width="10%" >Loan Id</StyledTableCell>
                                <StyledTableCell width="10%" align="center" sx={{ width: 50 }}>Loan Type</StyledTableCell>
                                <StyledTableCell width="10%" align="center">Duration</StyledTableCell>
                                <StyledTableCell width="10%" align="center">Edit</StyledTableCell>
                                <StyledTableCell width="10%" align="center">Delete</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {loans.map((row) => (
                                <StyledTableRow key={row.loan_id}>
                                    <StyledTableCell width="10%" >
                                        {row.loan_id}
                                    </StyledTableCell>
                                    <StyledTableCell width="10%" align="center">{row.type}</StyledTableCell>
                                    <StyledTableCell width="10%" align="center">{row.duration}</StyledTableCell>
                                    <StyledTableCell width="10%" align="center">
                                        <Button variant="contained" style={{
                                            borderRadius: 2,
                                            backgroundColor: "#AFE1AF",
                                            padding: "5px 5px",
                                            color: "#000000",
                                            fontWeight: "bold",
                                            fontSize: "13px"
                                        }} onClick={() => { editLoan(row.loan_id) }}>
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
                                        }} onClick={() => { deleteLoan(row.loan_id) }}>
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

export default LoanView