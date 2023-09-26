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
import ItemViewServices from '../services/ItemViewServices';
import { useNavigate } from 'react-router-dom';

import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';



const ItemView = () => {

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


    const [items, setItems] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        try {
            ItemViewServices.getAllItems().then((response) => {
                setItems(response.data);
            });

        } catch (error) {
            console.error('Fetch Error: ', error);
        }
    }

    const backToDashboard = () => {
        console.log("inside")
        history('/admin');
    }

    const addItem = () => {
        history('/addItem/_create');
    }

    const editItem = (Iid) => {
        history(`/addItem/${Iid}`);
    }

    const deleteItem = (Iid) => {
        ItemViewServices.deleteItem(Iid).then(() => {
            fetchItems();
            setMessage('Item details deleted successfully');
            setTimeout(() => { history('/manage-item') }, 500);

        });
        history(`/deleteItem/${Iid}`);
    }


    return (
        <>
            <Stack direction="row" alignItems="center" spacing={1}>
                <IconButton aria-label="delete" size="large" onClick={backToDashboard} >
                    <ArrowBackIosIcon />
                </IconButton>
            </Stack>

            <br></br>
            <h1>Item List</h1>
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
                }} onClick={addItem}>
                    Add Item
                </Button>
            </div>
            <TableContainer component={Paper} style={{ alignContent: 'center', justifyContent: "center" }}>
                <Table sx={{ minWidth: 100, maxWidth: 1200, mt: 10, ml: 20, mr: 10 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell width="10%" >Item Id</StyledTableCell>
                            <StyledTableCell width="10%" align="center" sx={{ width: 50 }}>Description</StyledTableCell>
                            <StyledTableCell width="10%" align="center">Issue Status</StyledTableCell>
                            <StyledTableCell width="10%" align="center">Item Make</StyledTableCell>
                            <StyledTableCell width="10%" align="center">Item Category</StyledTableCell>
                            <StyledTableCell width="10%" align="center">Item Valuation</StyledTableCell>
                            <StyledTableCell width="10%" align="center">Edit</StyledTableCell>
                            <StyledTableCell width="10%" align="center">Delete</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {items.map((row) => (
                            <StyledTableRow key={row.item_id}>
                                <StyledTableCell width="9%" >
                                    {row.item_id}
                                </StyledTableCell>
                                <StyledTableCell width="14%" align="center">{row.description}</StyledTableCell>
                                <StyledTableCell width="11%" align="center">{row.status}</StyledTableCell>
                                <StyledTableCell width="11%" align="center">{row.make}</StyledTableCell>
                                <StyledTableCell width="11%" align="center">{row.category}</StyledTableCell>
                                <StyledTableCell width="11%" align="center">{row.value}</StyledTableCell>
                                <StyledTableCell width="11%" align="center">
                                    <Button variant="contained" style={{
                                        borderRadius: 2,
                                        backgroundColor: "#AFE1AF",
                                        padding: "5px 5px",
                                        color: "#000000",
                                        fontWeight: "bold",
                                        fontSize: "13px"
                                    }} onClick={() => { editItem(row.item_id) }}>
                                        Edit
                                    </Button>
                                </StyledTableCell>
                                <StyledTableCell width="11%" align="center">
                                    <Button variant="contained" style={{
                                        borderRadius: 2,
                                        backgroundColor: "#FFCCCB",
                                        padding: "5px 5px",
                                        color: "#000000",
                                        fontWeight: "bold",
                                        fontSize: "13px"
                                    }} onClick={() => { deleteItem(row.item_id) }}>
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

export default ItemView;