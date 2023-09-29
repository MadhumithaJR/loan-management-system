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
import { Cookies, useCookies } from 'react-cookie';
import EmpDashServices from '../services/EmpDashServices';
import ProSidebar from './ProSidebar';


const EmpViewItems = () => {

    const history = useNavigate();
    const [id, setId] = useCookies(['id']);
    const name = localStorage.getItem('name')
    const dept = localStorage.getItem('department')
    const designation = localStorage.getItem('designation')

    const empId = id.id;
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
            EmpDashServices.getEmpItems(empId).then((response) => {
                setItems(response.data);
                console.log(response.data);
            });

        } catch (error) {
            console.error('Fetch Error: ', error);
        }
    }


    return (
        <div >
            <ProSidebar name={name} id={id.id} department={dept} designation={designation} />
            <br></br>
            <div >
                <h1 style={{marginTop:'1vh'}}>Employee Items List</h1>
                
                <div style={{ marginLeft: '15%' }}>
                    <TableContainer style={{ alignContent: 'center', justifyContent: "center", maxWidth: "100%" }}>
                        <Table style={{backgroundColor: "#FFFFFF" }} sx={{ minWidth: 100, maxWidth: "75%", mt: 10, ml: 15, mr: 10 }} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell width="1.2%" >Issue Id</StyledTableCell>
                                    <StyledTableCell width="5%" align="center" sx={{ width: 50 }}>Item Value</StyledTableCell>
                                    <StyledTableCell width="5%" align="center">Item category</StyledTableCell>
                                    <StyledTableCell width="5%" align="center">Item make </StyledTableCell>
                                    <StyledTableCell width="5%" align="center">Item description </StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {items.map((row) => (
                                    <StyledTableRow key={row.issue_id}>
                                        <StyledTableCell width="1.2%" >{row.issue_id}</StyledTableCell>
                                        <StyledTableCell width="5%" align="center">{row.item_value}</StyledTableCell>
                                        <StyledTableCell width="5%" align="center">{row.item_category}</StyledTableCell>
                                        <StyledTableCell width="5%" align="center">{row.item_make}</StyledTableCell>
                                        <StyledTableCell width="5%" align="center">{row.item_description}</StyledTableCell>


                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
        </div>
    )
}

export default EmpViewItems