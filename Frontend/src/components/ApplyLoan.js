// import React, { useState, useEffect } from 'react';
// import { useHref, useNavigate, useParams } from 'react-router-dom';
// import Typography from '@mui/material/Typography';
// import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
// import CardContent from '@mui/material/CardContent';
// import Button from '@mui/material/Button';
// import Box from '@mui/material/Box';
// import TextField from '@mui/material/TextField';
// import EmpDashServices from '../services/EmpDashServices';
// import { useCookies } from 'react-cookie';

// function ApplyLoan() {

//     const history = useNavigate();

//     const effectTriggeredRef = React.useRef(false);
//     const effectTriggeredRef1 = React.useRef(false);
//     const effectTriggeredRef2 = React.useRef(false);

//     const [item_category, setItem_category] = useState('');
//     const [item_make, setItem_make] = useState('');
//     const [item_description, setItem_description] = useState('');
//     const [item_value, setItem_value] = useState('');
//     const [message, setMessage] = useState('');

//     const [cookies, setCookie] = useCookies(['user']);
//     const employee_id = cookies.id;

//     const [type_descriptions, setTypeDescriptions] = useState([]);
//     const [type_makes, setTypeMakes] = useState([]);
//     const description_default = ["--Choose an Item Description--"];
//     const make_default = ["--Choose an Item Make--"];

//     let type_description_initial = description_default;
//     let type_make_initial = make_default;

//     let options_description = null;
//     let options_make = null;

//     const applyForLoan = (event) => {
//         event.preventDefault();
//         const applyLoan = { employee_id, item_category, item_make, item_description, item_value };
//         EmpDashServices.applyForLoan(applyLoan).then((response) => {
//             setMessage(response.data);
//             history('/emploanview');
//         });
//     }

//     useEffect(() => {
//         if (!effectTriggeredRef.current && item_category) {
//             effectTriggeredRef.current = true;
//             setDescriptions();
//         }
//     }, [item_category]);

//     const setDescriptions = async () => {
//         try {
//             EmpDashServices.getDescriptions(item_category).then((response) => {
//                 setTypeDescriptions(response.data);
//             });
//         } catch (error) {
//             console.error('Fetch Error: ', error);
//         }
//     }


//     useEffect(() => {
//         if (!effectTriggeredRef1.current && item_description) {
//             effectTriggeredRef1.current = true;
//             setMakes();
//         }
//     }, [item_description]);

//     const setMakes = async () => {
//         try {
//             EmpDashServices.getMakes(item_category,item_description).then((response) => {
//                 setTypeMakes(response.data);
//             });
//         } catch (error) {
//             console.error('Fetch Error: ', error);
//         }
//     }

//     useEffect(() => {
//         if (!effectTriggeredRef2.current && item_make) {
//             effectTriggeredRef2.current = true;
//             setValue();
//         }
//     }, [item_make]);

//     const setValue= async () => {
//         try {
//             EmpDashServices.getValue(item_category,item_description,item_make).then((response) => {
//                 setItem_value(response.data);
//                 console.log(item_value);
//             });
//         } catch (error) {
//             console.error('Fetch Error: ', error);
//         }
//     }


//     if (type_descriptions.length == 0) {
//         options_description = type_description_initial.map((el) => <option key={el}>{el}</option>);
//     }

//     if (type_descriptions.length != 0) {
//         type_descriptions.unshift("--Choose an Item Description--");
//         options_description = type_descriptions.map((el) => <option key={el}>{el}</option>);
//     }

//     if (type_makes.length == 0) {
//         options_make = type_make_initial.map((el) => <option key={el}>{el}</option>);
//     }

//     if (type_makes.length != 0) {
//         type_makes.unshift("--Choose an Item Make--");
//         options_make = type_makes.map((el) => <option key={el}>{el}</option>);
//     }

//     const changeItem_categoryHandler = (event) => {
//         setItem_category(event.target.value);
//     }

//     const changeItem_makeHandler = (event) => {
//         setItem_make(event.target.value);

//     }

//     const changeItem_descriptionHandler = (event) => {
//         setItem_description(event.target.value);
//     }

//     const cancel = () => {
//         history('/employee');
//     };

//     return (
//         <>

//             <center>
//                 <Card variant='outlined' sx={{ maxWidth: 600, marginTop: '10vh', marginBottom: '10vh' }} style={{ backgroundColor: "#F5F5DC" }}>
//                     <CardContent>
//                         <Typography variant="h4" gutterBottom style={{
//                             borderRadius: 2,
//                             backgroundColor: "#F8DE7E",
//                             padding: "5px 5px",
//                             color: "#000000",
//                             fontWeight: "bold",
//                             fontSize: "30px"
//                         }}>
//                             Apply Loan
//                         </Typography>
//                         <br></br>
//                         <form>
//                             <div className="form-group">
//                                 <label style={{ fontFamily: 'monospace', fontSize: '19px', fontWeight: "normal" }}> Employee Id: </label>


//                                 <input style={{ textAlign: "center", marginTop: "10px", border: '2px solid #F8DE7E', fontSize: '18px', fontFamily: 'monospace' }} placeholder="Employee Id" name="employee_id" className="form-control"
//                                     value={employee_id} defaultValue={employee_id} disabled="disabled" />
//                             </div>
//                             <br></br>
//                             <div className="form-group">
//                                 <label style={{ fontFamily: 'monospace', fontSize: '19px', fontWeight: "normal" }}> Item Category: </label>
//                                 <select style={{ textAlign: "center", marginTop: "10px", border: '2px solid #F8DE7E', fontSize: '18px', fontFamily: 'monospace' }} placeholder="Item Category" name="item_category" className="form-control"
//                                     value={item_category} onChange={changeItem_categoryHandler}>
//                                     <option disabled={true} value=''>--Choose an Item Category--</option>
//                                     <option value="Furniture">Furniture</option>
//                                     <option value="Electronics">Electronics</option>
//                                     <option value="Transport">Transport</option>
//                                 </select>
//                             </div>
//                             <br></br>
//                             <div className="form-group">
//                                 <label style={{ fontFamily: 'monospace', fontSize: '19px', fontWeight: "normal" }} > Item Description: </label>
//                                 <select style={{ textAlign: "center", marginTop: "10px", border: '2px solid #F8DE7E', fontSize: '18px', fontFamily: 'monospace' }} placeholder="Item Description" name="item_description" className="form-control"
//                                     value={item_description} defaultValue={'--Choose an Item Description--'} onChange={changeItem_descriptionHandler}>
//                                     {
//                                         options_description
//                                     }
//                                 </select>
//                             </div>
//                             <br></br>
//                             <div className="form-group">
//                                 <label style={{ fontFamily: 'monospace', fontSize: '19px', fontWeight: "normal" }} > Item Make: </label>
//                                 <select style={{ textAlign: "center", marginTop: "10px", border: '2px solid #F8DE7E', fontSize: '18px', fontFamily: 'monospace' }} placeholder="Item Make" name="item_make" className="form-control"
//                                     value={item_make} onChange={changeItem_makeHandler}>
//                                     {
//                                         options_make
//                                     }
//                                 </select>
//                             </div>
//                             <br></br>
//                             <div className="form-group">
//                                 <label style={{ fontFamily: 'monospace', fontSize: '19px', fontWeight: "normal" }}> Item Value: </label>
//                                 <input style={{ textAlign: "center", marginTop: "10px", border: '2px solid #F8DE7E', fontSize: '18px', fontFamily: 'monospace' }} placeholder="Item Value" name="item_value" className="form-control"
//                                     value={item_value} defaultValue={item_value} disabled="disabled" />
//                             </div>
//                             <br></br>


//                             <button className="btn btn-success" onClick={applyForLoan}>Apply Loan</button>
//                             <button className="btn btn-danger" onClick={cancel.bind(this)} style={{ marginLeft: "10px" }}>Cancel</button>
//                         </form>
//                     </CardContent>
//                 </Card>
//             </center>
//         </>

//     );
// }

// export default ApplyLoan;

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
    const effectTriggeredRef1 = React.useRef(false);
    const effectTriggeredRef2 = React.useRef(false);

    const [item_category, setItem_category] = useState('');
    const [item_make, setItem_make] = useState('');
    const [item_description, setItem_description] = useState('');
    const [item_value, setItem_value] = useState('');
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState('');

    const [cookies, setCookie] = useCookies(['id']);
    const employee_id = cookies.id;

    const [type_categories, setTypeCategories] = useState([]);
    const [type_descriptions, setTypeDescriptions] = useState([]);
    const [type_makes, setTypeMakes] = useState([]);
    const description_default = ["--Choose an Item Description--"];
    const make_default = ["--Choose an Item Make--"];

    let type_description_initial = description_default;
    let type_make_initial = make_default;

    let options_category = null;
    let options_description = null;
    let options_make = null;

    const applyForLoan = (event) => {
        event.preventDefault();
        const applyLoan = { employee_id, item_category, item_make, item_description, item_value };
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length === 0) {
            EmpDashServices.applyForLoan(applyLoan).then((response) => {
                setMessage(response.data);
                history('/emploanview');
            });
        }else{
            setErrors(validationErrors);
        }
    }

    useEffect(() => {
        getAllLoanCategories();
    }, []);

    const getAllLoanCategories = async () => {
        try {
            EmpDashServices.getAllLoanTypes().then((response) => {
                setTypeCategories(response.data);
            });
        } catch (error) {
            console.error('Fetch Error: ', error);
        }
    }

    useEffect(() => {
        if (!effectTriggeredRef.current && item_category) {
            effectTriggeredRef.current = true;
            setDescriptions();
        }
    }, [item_category]);

    const setDescriptions = async () => {
        try {
            EmpDashServices.getDescriptions(item_category).then((response) => {
                setTypeDescriptions(response.data);
            });
        } catch (error) {
            console.error('Fetch Error: ', error);
        }
    }


    useEffect(() => {
        if (!effectTriggeredRef1.current && item_description) {
            effectTriggeredRef1.current = true;
            setMakes();
        }
    }, [item_description]);

    const setMakes = async () => {
        try {
            EmpDashServices.getMakes(item_category, item_description).then((response) => {
                setTypeMakes(response.data);
            });
        } catch (error) {
            console.error('Fetch Error: ', error);
        }
    }

    useEffect(() => {
        if (!effectTriggeredRef2.current && item_make) {
            effectTriggeredRef2.current = true;
            setValue();
        }
    }, [item_make]);

    const setValue = async () => {
        try {
            EmpDashServices.getValue(item_category, item_description, item_make).then((response) => {
                setItem_value(response.data);
                console.log(item_value);
            });
        } catch (error) {
            console.error('Fetch Error: ', error);
        }
    }

    if (type_categories.length != 0) {
        type_categories.unshift("--Choose an Item Category--");
        options_category = type_categories.map((el) => <option key={el}>{el}</option>);
    }

    if (type_descriptions.length == 0) {
        options_description = type_description_initial.map((el) => <option key={el}>{el}</option>);
    }

    if (type_descriptions.length != 0) {
        type_descriptions.unshift("--Choose an Item Description--");
        options_description = type_descriptions.map((el) => <option key={el}>{el}</option>);
    }

    if (type_makes.length == 0) {
        options_make = type_make_initial.map((el) => <option key={el}>{el}</option>);
    }

    if (type_makes.length != 0) {
        type_makes.unshift("--Choose an Item Make--");
        options_make = type_makes.map((el) => <option key={el}>{el}</option>);
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

    const cancel = () => {
        history('/employee');
    };
    const validateForm=()=>{
        let validateErrors={};

        if(!item_category){
            validateErrors.item_category="Category is required."
        }
        if(!item_make){
            validateErrors.item_make="This field is required."
        }
        if(!item_description){
            validateErrors.item_description="Description is required."
        }
        return validateErrors;
    }

    return (
        <>
        <div>
            <br></br>
            <center>
                <Card variant='outlined' sx={{ maxWidth: 600,marginTop:'5vh', marginBottom: '10vh' }} style={{ backgroundColor: "#E5E4E2" }}>
                    <CardContent>
                        <Typography variant="h4" gutterBottom style={{
                            borderRadius: 2,
                            backgroundColor: "#000000",
                            padding: "5px 5px",
                            color: "#FFFFFF",
                            fontWeight: "bold",
                            fontSize: "30px"
                        }}>
                            Apply Loan
                        </Typography>
                        <br></br>
                        <form>
                            <div className="form-group">
                                <label style={{ fontFamily: 'monospace', fontSize: '19px', fontWeight: "normal" }}> Employee Id: </label>


                                <input style={{ textAlign: "center", marginTop: "10px", fontSize: '18px', fontFamily: 'monospace' }} placeholder="Employee Id" name="employee_id" className="form-control"
                                    value={employee_id} defaultValue={employee_id} disabled="disabled" />
                            </div>
                            <br></br>
                            <div className="form-group">
                                <label style={{ fontFamily: 'monospace', fontSize: '19px', fontWeight: "normal" }}> Item Category: </label>
                                <select style={{ textAlign: "center", marginTop: "10px", fontSize: '18px', fontFamily: 'monospace' }} placeholder="Item Category" name="item_category" className="form-control"
                                    value={item_category} onChange={changeItem_categoryHandler}>
                                        {
                                            options_category
                                        }
                                </select>
                                <p style={{color:'red',marginTop: "10px"}}>{errors.item_category}</p>
                            </div>
                            <br></br>
                            <div className="form-group">
                                <label style={{ fontFamily: 'monospace', fontSize: '19px', fontWeight: "normal" }} > Item Description: </label>
                                <select style={{ textAlign: "center", marginTop: "10px", fontSize: '18px', fontFamily: 'monospace' }} placeholder="Item Description" name="item_description" className="form-control"
                                    value={item_description} defaultValue={'--Choose an Item Description--'} onChange={changeItem_descriptionHandler}>
                                    {
                                        options_description
                                    }
                                </select>
                                <p style={{color:'red',marginTop: "10px"}}>{errors.item_description}</p>
                            </div>
                            <br></br>
                            <div className="form-group">
                                <label style={{ fontFamily: 'monospace', fontSize: '19px', fontWeight: "normal" }} > Item Make: </label>
                                <select style={{ textAlign: "center", marginTop: "10px", fontSize: '18px', fontFamily: 'monospace' }} placeholder="Item Make" name="item_make" className="form-control"
                                    value={item_make} onChange={changeItem_makeHandler}>
                                    {
                                        options_make
                                    }
                                </select>
                                <p style={{color:'red',marginTop: "10px"}}>{errors.item_make}</p>
                            </div>
                            <br></br>
                            <div className="form-group">
                                <label style={{ fontFamily: 'monospace', fontSize: '19px', fontWeight: "normal" }}> Item Value: </label>
                                <input style={{ textAlign: "center", marginTop: "10px", fontSize: '18px', fontFamily: 'monospace' }} placeholder="Item Value" name="item_value" className="form-control"
                                    value={item_value} defaultValue={item_value} disabled="disabled" />
                                    
                            </div>
                            <br></br>


                            <button className="btn btn-success" onClick={applyForLoan}>Apply Loan</button>
                            <button className="btn btn-danger" onClick={cancel.bind(this)} style={{ marginLeft: "10px" }}>Cancel</button>
                        </form>
                    </CardContent>
                </Card>
            </center>
            </div>
        </>

    );
}

export default ApplyLoan;