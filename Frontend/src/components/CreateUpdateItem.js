import React, { useState, useEffect } from 'react';
//import * as React from 'react';
import { useHref, useNavigate, useParams } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import ItemViewServices from '../services/ItemViewServices';

function CreateUpdateItem() {

    const history = useNavigate();

    const { Iid } = useParams();

    //const [item_id, setItem_id] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('');
    const [category, setCategory] = useState('');
    const [value, setValue] = useState('');
    const [make, setMake] = useState('');
    const [errors, setErrors] = useState('');

    console.log(Iid)

    useEffect(() => {
        if (Iid !== '_create') {
            ItemViewServices.getItemById(Iid).then((response) => {
                const item = response.data;
                //setItem_id(item.item_id);
                setDescription(item.description);
                setStatus(item.status);
                setCategory(item.category);
                setValue(item.value);
                setMake(item.make);
            });
        }
    }, []);

    const createOrUpdateItem = (event) => {
        event.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length === 0) {
            console.log("No errors")
            if (Iid === '_create') {
                const item = {description, status, category, value, make };
                ItemViewServices.createItem(item).then(() => {
                    history('/manage-item');
                });
            }
            else {
                const item_id = parseInt(Iid);
                const item = { item_id, description, status, category, value, make };
                ItemViewServices.updateItem(item, Iid).then(() => {
                    history('/manage-item');
                });
            }
        }else{
            setErrors(validationErrors);
        }
    }

    // const furniture = ["Table", "Chair", "Bed", "Tea Table"];
    // const electronics = ["Laptop", "Projector", "Printer", "Refrigerator"];
    // const transport = ["SUV", "Scooty", "Motorcycle"];
    const furniture = ["--Choose an Item Make--", "Wooden","Plastic"];
    const electronics = ["--Choose an Item Make--", "Samsung","Realme","Iphone","Philips","HP"];
    const transport = ["--Choose an Item Make--", "Honda","TVS"];

    let type = null;
    let options = null;

    if (category === "Furniture") {
        type = furniture;
    } else if (category === "Electronics") {
        type = electronics;
    } else if (category === "Transport") {
        type = transport;
    }

    if (type) {
        options = type.map((el) => <option key={el}>{el}</option>);
    }

    // const changeItem_idHandler = (event) => {
    //     setItem_id(event.target.value);
    // };

    const changeDescriptionHandler = (event) => {
        setDescription(event.target.value);
    };

    const changeStatusHandler = (event) => {
        setStatus(event.target.value);
    };

    const changeCategoryHandler = (event) => {
        setCategory(event.target.value);
    };

    const changeValueHandler = (event) => {
        setValue(event.target.value);
    };

    const changeMakeHandler = (event) => {
        setMake(event.target.value);
    };

    const cancel = () => {
        history('/manage-item');
    };

    const getTitle = () => {
        console.log(Iid)
        if (Iid === '_create') {
            return <><Typography variant="h4" gutterBottom style={{
                borderRadius: 2,
                backgroundColor: "#000000",
                padding: "5px 5px",
                color: "#FFFFFF",
                fontWeight: "bold",
                fontSize: "30px"
            }}>
                Add Item
            </Typography></>
        } else {
            return <><Typography variant="h4" gutterBottom style={{
                borderRadius: 2,
                backgroundColor: "#000000",
                padding: "5px 5px",
                color: "#FFFFFF",
                fontWeight: "bold",
                fontSize: "30px"
            }}>
                Update Item
            </Typography></>
        }
    };
    const validateForm = () => {
        console.log("Function Runnign")
        let validationErrors = {};
        if(!description){
            validationErrors.description="Description is required."
        }
        if(!category){
            validationErrors.category="Category is required."
        }
        if(!status){
            validationErrors.status="Status is required."
        }
        if(!value){
            validationErrors.value="Value is required."
        }
        if(!make){
            validationErrors.make="This is a a required field."
        }
        return validationErrors;

    };
    return (
        <>
        <div>
            <br></br>
            <center>
                <Card variant='outlined' sx={{ maxWidth: 600,marginTop:'5vh', marginBottom: '10vh' }} style={{ backgroundColor: "#E5E4E2" }}>
                    <CardContent>
                        {getTitle()}
                        <br></br>
                        <form>
                            {/* <div className="form-group">
                                <label style={{ fontFamily: 'monospace', fontSize: '19px', fontWeight: "normal" }}> Item Id: </label>


                                <input style={{ textAlign: "center", marginTop: "10px", border: '2px solid #2AAA8A', fontSize: '18px', fontFamily: 'monospace' }} placeholder="Item Id" name="item_id" className="form-control"
                                    value={item_id} onChange={changeItem_idHandler} />
                            </div>
                            <br></br> */}
                            <div className="form-group">
                                <label style={{ fontFamily: 'monospace', fontSize: '19px', fontWeight: "normal" }} > Item Description: </label>
                                <input style={{ textAlign: "center", marginTop: "10px", fontSize: '18px', fontFamily: 'monospace' }} placeholder="Item Description" name="description" className="form-control"
                                    value={description} onChange={changeDescriptionHandler} />
                                <p style={{color:'red',marginTop: "10px"}}>{errors.description}</p>
                            </div>
                            <br></br>
                            <div className="form-group">
                                <label style={{ fontFamily: 'monospace', fontSize: '19px', fontWeight: "normal" }}> Item Status: </label>
                                <select style={{ textAlign: "center", marginTop: "10px", fontSize: '18px', fontFamily: 'monospace' }} placeholder="Item Status" name="status" className="form-control"
                                    value={status} onChange={changeStatusHandler}>
                                    <option disabled={true} value=''>--Choose an Option--</option>
                                    <option value="Y">Yes</option>
                                    <option value="N">No</option>
                                </select>
                                <p style={{color:'red',marginTop: "10px"}}>{errors.status}</p>
                            </div>
                            <br></br>
                            <div className="form-group">
                                <label style={{ fontFamily: 'monospace', fontSize: '19px', fontWeight: "normal" }}> Item Category: </label>
                                <select style={{ textAlign: "center", marginTop: "10px", fontSize: '18px', fontFamily: 'monospace' }} placeholder="Item Category" name="category" className="form-control"
                                    value={category} onChange={changeCategoryHandler}>
                                    <option disabled={true} value=''>--Choose an Option--</option>
                                    <option value="Furniture">Furniture</option>
                                    <option value="Electronics">Electronics</option>
                                    <option value="Transport">Transport</option>
                                </select>
                                <p style={{color:'red',marginTop: "10px"}}>{errors.category}</p>
                            </div>
                            <br></br>
                            <div className="form-group">
                                <label style={{ fontFamily: 'monospace', fontSize: '19px', fontWeight: "normal" }}> Item Value: </label>
                                <input style={{ textAlign: "center", marginTop: "10px", fontSize: '18px', fontFamily: 'monospace' }} placeholder="Item Value" name="value" className="form-control"
                                    value={value} onChange={changeValueHandler} />
                                <p style={{color:'red',marginTop: "10px"}}>{errors.value}</p>
                            </div>
                            <br></br>
                            <div className="form-group">
                                <label style={{ fontFamily: 'monospace', fontSize: '19px', fontWeight: "normal" }}> Item Make: </label>
                                <select style={{ textAlign: "center", marginTop: "10px", fontSize: '18px', fontFamily: 'monospace' }} placeholder="Item Make" name="make" className="form-control"
                                    value={make} onChange={changeMakeHandler}>
                                    {
                                        options
                                    }
                                </select>
                                <p style={{color:'red',marginTop: "10px"}}>{errors.make}</p>
                            </div>
                            <br></br>

                            <button className="btn btn-success" onClick={createOrUpdateItem}>Save</button>
                            <button className="btn btn-danger" onClick={cancel.bind(this)} style={{ marginLeft: "10px" }}>Cancel</button>
                        </form>
                    </CardContent>
                </Card>
            </center>
            </div>
        </>

    );


}

export default CreateUpdateItem;