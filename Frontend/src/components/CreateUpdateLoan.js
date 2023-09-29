import React, { useState, useEffect } from 'react';
//import * as React from 'react';
import { useHref, useNavigate, useParams } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import LoanViewServices from '../services/LoanViewServices';

function CreateUpdateLoan() {

    const history = useNavigate();

    const { lid } = useParams();

    const [type, setType] = useState('');
    const [duration, setDuration] = useState('');
    const [errors, setErrors] = useState('');

    console.log(lid)

    useEffect(() => {
        if (lid !== '_create') {
            LoanViewServices.getLoanById(lid).then((response) => {
                const loan = response.data;
                setType(loan.type);
                setDuration(loan.duration);
            });
        }
    }, []);

    const createOrUpdateLoan = (event) => {
        event.preventDefault();
        const loan = { type, duration };
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length === 0) {
    
            if (lid === '_create') {
                const loan = { type, duration };
                LoanViewServices.createLoan(loan).then(() => {
                    history('/manage-loan');
                });
            }
            else {
                const loan_id = parseInt(lid)
                const loan = { loan_id, type, duration };
                LoanViewServices.updateLoan(loan, lid).then(() => {
                    history('/manage-loan');
                });
            }
        }else{
            setErrors(validationErrors);
        }
    }
    const validateForm = () =>{
        let validateErrors={}
        if(!type){
            validateErrors.type="Type is required."
        }
        if(!duration){
            validateErrors.duration="Duration is required."
        }
        return validateErrors;
    };
    const changeTypeHandler = (event) => {
        setType(event.target.value);
    };

    const changeDurationHandler = (event) => {
        setDuration(event.target.value);
    };


    const cancel = () => {
        history('/manage-loan');
    };

    const getTitle = () => {
        console.log(lid)
        if (lid === '_create') {
            return <><Typography variant="h4" gutterBottom style={{
                borderRadius: 2,
                backgroundColor: "#000000",
                padding: "5px 5px",
                color: "#FFFFFF",
                fontWeight: "bold",
                fontSize: "30px"
            }}>
                Add Loan Card
            </Typography></>
        } else {
            return <><Typography variant="h4" gutterBottom style={{
                borderRadius: 2,
                backgroundColor: "#000000",// #97dffc #caf0f8
                padding: "5px 5px",
                color: "#FFFFFF",
                fontWeight: "bold",
                fontSize: "30px"
            }}>
                Update Loan Card
            </Typography></>
        }
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
                                <label style={{ fontFamily: 'monospace', fontSize: '19px', fontWeight: "normal" }}> Loan Id: </label>


                                <input style={{ textAlign: "center", marginTop: "10px", border: '2px solid #ADD8E6', fontSize: '18px', fontFamily: 'monospace' }} placeholder="Loan Card Id" name="loan_id" className="form-control"
                                    value={loan_id} onChange={changeLoan_idHandler} />
                            </div>
                            <br></br> */}
                            <div className="form-group">
                                <label style={{ fontFamily: 'monospace', fontSize: '19px', fontWeight: "normal" }} > Loan Type: </label>
                                <input style={{ textAlign: "center", marginTop: "10px", fontSize: '18px', fontFamily: 'monospace' }} placeholder="Loan Card Type" name="type" className="form-control"
                                    value={type} onChange={changeTypeHandler} />
                                <p style={{color:'red',marginTop: "10px"}}>{errors.type}</p>
                            </div>
                            <br></br>
                            <div className="form-group">
                                <label style={{ fontFamily: 'monospace', fontSize: '19px', fontWeight: "normal" }}> Duration: </label>
                                <input style={{ textAlign: "center", marginTop: "10px", fontSize: '18px', fontFamily: 'monospace' }} placeholder="Duration" name="duration" className="form-control"
                                    value={duration} onChange={changeDurationHandler} />
                                <p style={{color:'red',marginTop: "10px"}}>{errors.duration}</p>
                            </div>
                            <br></br>

                            <button className="btn btn-success" onClick={createOrUpdateLoan}>Save</button>
                            <button className="btn btn-danger" onClick={cancel.bind(this)} style={{ marginLeft: "10px" }}>Cancel</button>
                        </form>
                    </CardContent>
                </Card>
            </center>
            </div>

        </>

    );


}

export default CreateUpdateLoan;