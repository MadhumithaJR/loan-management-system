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

    const [loan_id, setLoan_id] = useState('');
    const [type, setType] = useState('');
    const [duration, setDuration] = useState('');

    console.log(lid)

    useEffect(() => {
        if (lid !== '_create') {
            LoanViewServices.getLoanById(lid).then((response) => {
                const loan = response.data;
                setLoan_id(loan.loan_id);
                setType(loan.type);
                setDuration(loan.duration);
            });
        }
    }, []);

    const createOrUpdateLoan = (event) => {
        event.preventDefault();
        const loan = { loan_id, type, duration };

        if (lid === '_create') {
                LoanViewServices.createLoan(loan).then(() => {
                history('/manage-loan');
            });
        }
        else {
            LoanViewServices.updateLoan(loan,lid).then(() => {
                history('/manage-loan');
            });
        }
    }

    const changeLoan_idHandler = (event) => {
        setLoan_id(event.target.value);
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
                backgroundColor: "#91e5f6",
                padding: "5px 5px",
                color: "#000000",
                fontWeight: "bold",
                fontSize: "30px"
            }}>
                Add Loan Card
            </Typography></>
        } else {
            return <><Typography variant="h4" gutterBottom style={{
                borderRadius: 2,
                backgroundColor: "#91e5f6",// #97dffc #caf0f8
                padding: "5px 5px",
                color: "#000000",
                fontWeight: "bold",
                fontSize: "30px"
            }}>
                Update Loan Card
            </Typography></>
        }
    };

    return (
        <>
            <center>
                <Card variant='outlined' sx={{ maxWidth: 600, marginTop: '10vh', marginBottom: '10vh' }} style={{ backgroundColor: "#F0FFFF" }}>
                    <CardContent>
                        {getTitle()}
                        <br></br>
                        <form>
                            <div className="form-group">
                                <label style={{ fontFamily: 'monospace', fontSize: '19px', fontWeight: "normal" }}> Loan Id: </label>


                                <input style={{ textAlign: "center", marginTop: "10px", border: '2px solid #ADD8E6', fontSize: '18px', fontFamily: 'monospace' }} placeholder="Loan Card Id" name="loan_id" className="form-control"
                                    value={loan_id} onChange={changeLoan_idHandler} />
                            </div>
                            <br></br>
                            <div className="form-group">
                                <label style={{ fontFamily: 'monospace', fontSize: '19px', fontWeight: "normal" }} > Loan Type: </label>
                                <input style={{ textAlign: "center", marginTop: "10px", border: '2px solid #ADD8E6', fontSize: '18px', fontFamily: 'monospace' }} placeholder="Loan Card Type" name="type" className="form-control"
                                    value={type} onChange={changeTypeHandler} />
                            </div>
                            <br></br>
                            <div className="form-group">
                                <label style={{ fontFamily: 'monospace', fontSize: '19px', fontWeight: "normal" }}> Duration: </label>
                                <input style={{ textAlign: "center", marginTop: "10px", border: '2px solid #ADD8E6', fontSize: '18px', fontFamily: 'monospace' }} placeholder="Duration" name="duration" className="form-control"
                                    value={duration} onChange={changeDurationHandler} />
                            </div>
                            <br></br>

                            <button className="btn btn-success" onClick={createOrUpdateLoan}>Save</button>
                            <button className="btn btn-danger" onClick={cancel.bind(this)} style={{ marginLeft: "10px" }}>Cancel</button>
                        </form>
                    </CardContent>
                </Card>
            </center>

        </>

    );


}

export default CreateUpdateLoan;