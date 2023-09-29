import React, { useState, useEffect } from 'react';
import { useHref, useNavigate, useParams } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import EmpDashServices from '../services/EmpDashServices';
import { useCookies } from 'react-cookie';

function ApplyLoan() {

    const history = useNavigate();

    const effectTriggeredRef = React.useRef(false);

    const [item_category, setItem_category] = useState('');
    const [item_make, setItem_make] = useState('');
    const [item_description, setItem_description] = useState('');
    const [item_value, setItem_value] = useState('');
    const [message, setMessage] = useState('');

    const [cookies, setCookie] = useCookies(['user']);
    const employee_id = cookies.id;

    const applyForLoan = (event) => {
        event.preventDefault();
        const applyLoan = { employee_id, item_category, item_make, item_description, item_value };
        EmpDashServices.applyForLoan(applyLoan).then((response) => {
            setMessage(response.data);
            history('/emploanview');
        });
    }

    const description_default = ["--Choose an Item Description--"];
    // const furniture_description = ["Table", "Chair", "Bed", "Tea Table"];
    // const electronics_description = ["Laptop", "Projector", "Printer", "Refrigerator"];
    // const transport_description = ["SUV", "Scooty", "Motorcycle"];
    const [descriptions, setDescriptions] = useState('');

    const make_default = ["--Choose an Item Make--"]
    // const furniture_make = ["Wooden", "Plastic"];
    // const electronics_make = ["Samsung", "Realme", "Iphone", "Philips"];
    // const transport_make = ["Honda", "TVS"];
    const [makes, setMakes] = useState('');

    let type_description = null;
    let type_description_initial = description_default;
    let type_make = null;
    let type_make_initial = make_default;
    let options_description = null;
    let options_make = null;


    // if (item_category === "Furniture") {
    //         EmpDashServices.getDescriptions(item_category).then((response) => {
    //         setFurnituredescriptions(response.data);
    //         console.log(response.data);
    //     });
    //     type_description = furnitureDescriptions;
    //     type_make = furniture_make;
    // } else if (item_category === "Electronics") {
    //     type_description = electronics_description;
    //     type_make = electronics_make;
    // } else if (item_category === "Transport") {
    //     type_description = transport_description;
    //     type_make = transport_make;
    // }

    // if (item_category) {
    //     EmpDashServices.getDescriptions(item_category).then((response) => {
    //         setDescriptions(response.data);
    //         console.log(response.data);
    //     });
    //     EmpDashServices.getMakes(item_category).then((response) => {
    //         setMakes(response.data);
    //         console.log(response.data);
    //     });
    //     type_description = descriptions;
    //     type_make = makes;
    // }


    // useEffect(() => {
    //     if(!effectTriggeredRef.current && item_category){
    //         effectTriggeredRef.current = true;
    //         setDescriptionsMakes();
    //     }
    // }, [item_category]);

    // const setDescriptionsMakes = async () => {
    //     try {
    //         EmpDashServices.getDescriptions(item_category).then((response) => {
    //             setDescriptions(response.data);
    //             console.log(response.data);
    //         });
    //         EmpDashServices.getMakes(item_category).then((response) => {
    //             setMakes(response.data);
    //             console.log(response.data);
    //         });
    //         type_description = descriptions;
    //         type_make = makes;

    //     } catch (error) {
    //         console.error('Fetch Error: ', error);
    //     }
    // }


    if (!type_description) {
        options_description = type_description_initial.map((el) => <option key={el}>{el}</option>);
    }

    if (type_description) {
        options_description = type_description.map((el) => <option key={el}>{el}</option>);
    }

    if (!type_make) {
        options_make = type_make_initial.map((el) => <option key={el}>{el}</option>);
    }

    if (type_make) {
        options_make = type_make.map((el) => <option key={el}>{el}</option>);
    }

    const changeItem_categoryHandler = (event) => {
        setItem_category(event.target.value);
    }

    const changeItem_makeHandler = (event) => {
        setItem_make(event.target.value);
    }

    const changeItem_descriptionHandler = (event) => {
        setItem_description(event.target.value);
    }

    const changeItem_valueHandler = (event) => {
        setItem_value(event.target.value);
    }

    const cancel = () => {
        history('/employee');
    };

    return (
        <>
            <center>
                <Card variant='outlined' sx={{ maxWidth: 600, marginTop: '10vh', marginBottom: '10vh' }} style={{ backgroundColor: "#F5F5DC" }}>
                    <CardContent>
                        <Typography variant="h4" gutterBottom style={{
                            borderRadius: 2,
                            backgroundColor: "#F8DE7E",
                            padding: "5px 5px",
                            color: "#000000",
                            fontWeight: "bold",
                            fontSize: "30px"
                        }}>
                            Apply Loan
                        </Typography>
                        <br></br>
                        <form>
                            <div className="form-group">
                                <label style={{ fontFamily: 'monospace', fontSize: '19px', fontWeight: "normal" }}> Employee Id: </label>


                                <input style={{ textAlign: "center", marginTop: "10px", border: '2px solid #F8DE7E', fontSize: '18px', fontFamily: 'monospace' }} placeholder="Employee Id" name="employee_id" className="form-control"
                                    value={employee_id} defaultValue={employee_id} disabled="disabled" />
                            </div>
                            <br></br>
                            <div className="form-group">
                                <label style={{ fontFamily: 'monospace', fontSize: '19px', fontWeight: "normal" }}> Item Category: </label>
                                <select style={{ textAlign: "center", marginTop: "10px", border: '2px solid #F8DE7E', fontSize: '18px', fontFamily: 'monospace' }} placeholder="Item Category" name="item_category" className="form-control"
                                    value={item_category} onChange={changeItem_categoryHandler}>
                                    <option disabled={true} value=''>--Choose an Item Category--</option>
                                    <option value="Furniture">Furniture</option>
                                    <option value="Electronics">Electronics</option>
                                    <option value="Transport">Transport</option>
                                </select>
                            </div>
                            <br></br>
                            <div className="form-group">
                                <label style={{ fontFamily: 'monospace', fontSize: '19px', fontWeight: "normal" }} > Item Description: </label>
                                <select style={{ textAlign: "center", marginTop: "10px", border: '2px solid #F8DE7E', fontSize: '18px', fontFamily: 'monospace' }} placeholder="Item Description" name="item_description" className="form-control"
                                    value={item_description} defaultValue={'--Choose an Item Description--'} onChange={changeItem_descriptionHandler}>
                                    {

                                        options_description
                                    }
                                </select>
                            </div>
                            <br></br>
                            <div className="form-group">
                                <label style={{ fontFamily: 'monospace', fontSize: '19px', fontWeight: "normal" }} > Item Make: </label>
                                <select style={{ textAlign: "center", marginTop: "10px", border: '2px solid #F8DE7E', fontSize: '18px', fontFamily: 'monospace' }} placeholder="Item Make" name="item_make" className="form-control"
                                    value={item_make} onChange={changeItem_makeHandler}>
                                    {
                                        options_make
                                    }
                                </select>
                            </div>
                            <br></br>
                            <div className="form-group">
                                <label style={{ fontFamily: 'monospace', fontSize: '19px', fontWeight: "normal" }}> Item Value: </label>
                                <input style={{ textAlign: "center", marginTop: "10px", border: '2px solid #F8DE7E', fontSize: '18px', fontFamily: 'monospace' }} placeholder="Item Value" name="item_value" className="form-control"
                                    value={item_value} onChange={changeItem_valueHandler} />
                            </div>
                            <br></br>


                            <button className="btn btn-success" onClick={applyForLoan}>Apply Loan</button>
                            <button className="btn btn-danger" onClick={cancel.bind(this)} style={{ marginLeft: "10px" }}>Cancel</button>
                        </form>
                    </CardContent>
                </Card>
            </center>
        </>

    );
}

export default ApplyLoan;