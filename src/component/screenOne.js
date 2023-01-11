import React, { useState } from "react";
import '../container/layout.scss';
import axios from 'axios'
function ScreenOne() {
    const [step, setStep] = useState(1);
    const [term, setTerm] = useState(false);
    const [termErr, setTermErr] = useState('');
    const [uploadForm, setUploadForm] = useState({
        email: { value: '', error: '' },
        password: { value: '', error: '' },
        firstName: { value: '', error: '' },
        lastName: { value: '', error: '' },
        address: { value: '', error: '' },
        countryCode: { value: '+91', error: '' },
        phoneNumber: { value: '', error: '' }

    });

    const checkEmail = (str) => {
        const pattern = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
        if (pattern.test(str)) {
            return true;
        } else {
            return false;
        }

    }
    const checkPassword = (str) => {
        const pattern = new RegExp(/(?=(.*\d){2})(?=(.*[a-z]){2})(?=(.*[A-Z]){2})(?=(.*[!@#$%]){2})/);
        if (pattern.test(str)) {
            return true;
        } else {
            return false;
        }
    }
    const checkMobile = (value) => {
        var pattern = /^[6789]\d{9}$/;
        if (pattern.test(value) && value.length === 10) {
            return true;
        } else {
            return false;
        }
    }

    const onChangeData = (event) => {
        var name = event.target.name;
        var value = event.target.value;

        setUploadForm({ ...uploadForm, [name]: { value: value, error: '' } })

    }
    const onChangeTerm = (value) => {
        if (value) {
            setTerm(value)
            setTermErr('')
        }

    }

    const submitForm1 = () => {

        if (step === 1 && (uploadForm.email.value === "" || !checkEmail(uploadForm.email.value))) {
            setUploadForm({ ...uploadForm, email: { value: '', error: 'error' } })
            return false
        } else if (step === 1 && (uploadForm.password.value === "" || !checkPassword((uploadForm.password.value)))) {
            setUploadForm({ ...uploadForm, password: { value: '', error: 'error' } })
            return false
        } else {
            return true
        }
    }

    const submitForm2 = () => {
        if (step === 2 && uploadForm.firstName.value === "") {
            setUploadForm({ ...uploadForm, firstName: { value: '', error: 'error' } })
            return false
        } else if (step === 2 && uploadForm.lastName.value === "") {
            setUploadForm({ ...uploadForm, lastName: { value: '', error: 'error' } })
            return false
        } else if (step === 2 && uploadForm.address.value === "") {
            setUploadForm({ ...uploadForm, address: { value: '', error: 'error' } })
            return false
        }
        else {
            return true
        }
    }

    const submitForm3 = () => {
        if (step === 3 && (uploadForm.phoneNumber.value === "" || !checkMobile(uploadForm.phoneNumber.value))) {
            setUploadForm({ ...uploadForm, phoneNumber: { value: '', error: 'error' } })
            return false
        } else if (!term) {
            setTermErr('error')
            return false
        } else {
            return true
        }
    }


    const finalSubmit = () => {
        if (submitForm3()) {
            var formObject = {
                "emailId": uploadForm.email.value,
                "password": uploadForm.password.value,
                "firstName": uploadForm.firstName.value,
                "lastName": uploadForm.lastName.value,
                "address": uploadForm.address.value,
                "countryCode": uploadForm.countryCode.value,
                "phoneNumber": uploadForm.phoneNumber.value
            }
            axios.post('https://codebuddy.review/submit', formObject)
                .then((res) => {
                    console.log(res.data)
                }).catch((error) => {
                    console.log(error)
                });
        }
        else {
            alert('Please check form')
        }
    }
    return (
        <div className="container">
            <div className="d-flex justify-content-around">
                {/* step one */}
                {step === 1 &&
                    <div className="col-md-auto boxStyle">

                        <div className="form-group py-2">
                            <label>Email address</label>
                            <input type="email" name="email"
                                value={uploadForm.email.value}
                                onChange={(e) => onChangeData(e)}
                                className={`form-control ${uploadForm.email.error === 'error' ? 'borderRed' : ''}`}
                                placeholder="Enter email" />
                            {uploadForm.email.error === 'error' &&
                                <div className="errorFont">
                                    Please valid mail id.
                                </div>
                            }
                        </div>
                        <div className="form-group py-2">
                            <label>Password</label>
                            <input type="password" name="password"
                                value={uploadForm.password.value}
                                onChange={(e) => onChangeData(e)}
                                className={`form-control ${uploadForm.password.error === 'error' ? 'borderRed' : ''}`}
                                placeholder="Password" />
                            {uploadForm.password.error === 'error' &&
                                <div className="errorFont">
                                    Please enter valid password like "asWE12$%".
                                </div>
                            }
                        </div>
                        <div className="d-flex justify-content-between my-4">
                            <button type="submit" className="btn btn-primary" onClick={() => alert('first step')}>Back</button>
                            <button type="submit" className="btn btn-primary" onClick={() => submitForm1()}>Save</button>
                            <button type="submit" className="btn btn-primary" onClick={() => submitForm1() ? setStep(2) : alert('please Check form')}>Save and Next</button>
                        </div>
                    </div>
                }

                {step === 2 &&
                    <div className="col-md-auto boxStyle">
                        <div className="form-group py-2">
                            <label>First Name</label>
                            <input type="text"
                                className={`form-control ${uploadForm.firstName.error === 'error' ? 'borderRed' : ''}`}
                                onChange={(e) => onChangeData(e)}
                                placeholder="Enter first name"
                                name='firstName' />
                            {uploadForm.firstName.error === 'error' &&
                                <div className="errorFont">
                                    Please enter First Name.
                                </div>
                            }
                        </div>
                        <div className="form-group py-2">
                            <label>Last Name</label>
                            <input type="text"
                                onChange={(e) => onChangeData(e)}
                                placeholder="Enter first name"
                                className={`form-control ${uploadForm.lastName.error === 'error' ? 'borderRed' : ''}`}
                                name='lastName' />
                            {uploadForm.lastName.error === 'error' &&
                                <div className="errorFont">
                                    Please enter Last Name.
                                </div>
                            }
                        </div>
                        <div className="form-group py-2">
                            <label>Address</label>
                            <input type="text"
                                onChange={(e) => onChangeData(e)}
                                className={`form-control ${uploadForm.address.error === 'error' ? 'borderRed' : ''}`}
                                placeholder="Enter first name"
                                name='address' />
                            {uploadForm.address.error === 'error' &&
                                <div className="errorFont">
                                    Please enter Address.
                                </div>
                            }
                        </div>
                        <div className="d-flex justify-content-between my-4">
                            <button type="submit" className="btn btn-primary" onClick={() => setStep(1)}>Back</button>
                            <button type="submit" className="btn btn-primary" onClick={() => submitForm2()}>Save</button>
                            <button type="submit" className="btn btn-primary" onClick={() => submitForm2() ? setStep(3) : alert('please Check form')}>Save and Next</button>
                        </div>
                    </div>
                }


                {step === 3 &&
                    <div className="col-md-auto boxStyle">
                        <div className="col-md-12">
                            <p>Mobile</p>
                            <div className="mt-2 phoneNumber">
                                <div className={`form-group mt-2 d-inline-block w-100 ${uploadForm.phoneNumber.error === 'error' ? 'borderRed' : ''}`} >
                                    <span className="border-end country-code px-2">
                                        <select className="countrySelect" name="countryCode" onChange={(e) => onChangeData(e)} >
                                            <option value="+91">+91</option>
                                            <option value="+1">+1</option>
                                        </select>
                                    </span>
                                    <input type="text" className="form-control" placeholder="Enter Mobile"
                                        name='phoneNumber'
                                        onChange={(e) => onChangeData(e)}
                                        onKeyPress={(event) => { if (!/[0-9]/.test(event.key)) { event.preventDefault(); } }} maxLength={10} />
                                </div>
                                {uploadForm.phoneNumber.error === 'error' &&
                                    <div className="errorFont">
                                        Please enter valid Mobile Number.
                                    </div>
                                }
                            </div>
                        </div>
                        <div className="form-group form-check pt-3">
                            <input type="checkbox" checked={term} onChange={(e) => onChangeTerm(e.target.checked)} className="form-check-input" name="termAndCondition" />
                            <label className="form-check-label">Check me out</label>
                        </div>
                        {termErr === 'error' &&
                            <div className="errorFont">
                                Please click on check box.
                            </div>
                        }

                        <div className="d-flex justify-content-between my-4">
                            <button type="submit" className="btn btn-primary" onClick={() => setStep(2)}>Back</button>
                            <button type="submit" className="btn btn-primary" onClick={() => submitForm3()}>Save</button>
                            <button type="submit" className="btn btn-primary" onClick={() => finalSubmit()}>Save and Next</button>
                        </div>

                    </div>
                }

            </div>
        </div>
    )
}
export default ScreenOne;