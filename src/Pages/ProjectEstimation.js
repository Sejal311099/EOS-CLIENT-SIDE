import React, { useEffect, useState } from 'react';
import './Login.css';
import { MDBBtn, MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBCheckbox, MDBIcon, MDBValidation, MDBValidationItem } from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { projectEstimationStart } from '../Redux/Actions/projectEstimationActions';

const emailRegx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
const phoneRegx =  /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[6789]\d{9}$/

const ProjectEstimation = () => {
    const [loaderState, setloaderState] = useState(false)

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [submit, setsubmit] = useState(false)
    const estdata = useSelector((state) => state?.projectEstimationData?.projectEstimationData);

    const [formInputes, setformInputes] = useState({
        fullName: "",
        city: "",
        email: "",
        phoneNumber: "",
        message: "",
    })
    const [ErrorInputes, setErrorInputes] = useState({ ...formInputes })
    // Empty the Form After the Response Getting properly
    useEffect(() => {
         if (estdata.status === 200) {
            setformInputes({
                fullName: "",
                city: "",
                email: "",
                phoneNumber: "",
                message: "",
            })
        }
    }, [estdata])
    const handleSignupForNav = () => navigate('/signup');

    const handleProjectEstFormInputes = (e) => {
        const { name, value } = e.target
        setformInputes({ ...formInputes, [name]: value })
        switch (name) {
            case "fullName":
                ErrorInputes.fullName = value.length > 0 ? "" : "Enter your name"
                break;
            case "email":
                if (!value) {
                    ErrorInputes.email = value.length > 0 ? "" : "Enter your email"
                }
                else {
                    ErrorInputes.email = emailRegx.test(value) === false && "Enter your valid email"
                }
                break;
            case "city":
                ErrorInputes.city = value.length > 0 ? "" : "Enter your city"
                break;
            case "phoneNumber":
                if (!value) {
                    ErrorInputes.phoneNumber = value.length > 0 ? "" : "Enter your phone"
                } else {
                    ErrorInputes.phoneNumber = phoneRegx.test(value) === false && "Enter your valid phone number"
                }
                break;
            default:
                break;
        }
        setErrorInputes(ErrorInputes)
    }

    function validate(value) {
        if (!formInputes.fullName) {
            ErrorInputes.fullName = "Enter name"
        }
        if (!formInputes.email) {
            ErrorInputes.email = "Enter email"
        }
        if (!formInputes.phoneNumber) {
            ErrorInputes.phoneNumber = "Enter phone number"
        }
        if (!formInputes.city) {
            ErrorInputes.city = "Enter city"
        }
        return ErrorInputes
    }
    useEffect(() => {
        if (Object.keys(ErrorInputes).length === 0 && Object.keys(formInputes).length !== 0) {
            console.log(ErrorInputes, "ErrorInputes")
        }
    }, [])

    const handleProjectEstForm = (e) => {
        e.preventDefault()
        setsubmit(true)
        setErrorInputes(validate(formInputes));
        if (formInputes.fullName !== "" && formInputes.city !== "" && formInputes.email !== "" && formInputes.phoneNumber !== "") {
            var projectEstPaylod = {
                name: formInputes.fullName,
                city: formInputes.city,
                email: formInputes.email,
                phonenumber: formInputes.phoneNumber,
                message: formInputes.message,
            }
            setloaderState(true)
            setTimeout(() => {
                dispatch(projectEstimationStart(projectEstPaylod));
                setloaderState(false)
            }, 2000);
        }
    }

    return (
        <>
            {loaderState && <div class="lds-hourglass loader"></div>}
            <MDBContainer fluid className='p-4 background-radial-gradient overflow-hidden custom_div_main'>
                <MDBRow className="justify-content-center align-item-center p-0">
                    <MDBCol md='6' className='text-center text-md-start d-flex flex-column justify-content-center'>
                        <h1 className="my-5 display-3 fw-bold ls-tight px-3" style={{ color: 'hsl(218, 81%, 95%)' }}>

                            Give your estimation<br />
                            <span style={{ color: 'hsl(218, 81%, 75%)' }}>and get best Professionals</span>
                        </h1>
                        <p className='px-3' style={{ color: 'hsl(218, 81%, 85%)' }}>
                            We're thrilled you decided to join the Easy on Services.! <br/>
                            Hat's off on making an excellent decision
                        </p>
                    </MDBCol>
                    <MDBCol md='4' className='position-relative'>
                        <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
                        <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>
                        <MDBCard className='my-1 bg-glass'>
                            <MDBCardBody className='p-4'>
                                <div><h1 className='text-center'>Get your Project Estimation</h1></div>
                                <MDBValidation onSubmit={handleProjectEstForm}>
                                    <div className='sub_div'>
                                        <label className='lable-cstm'>Name</label>
                                        <MDBInput wrapperClass='mb-4' type='text' name='fullName' id='fullName' value={formInputes.fullName} onChange={handleProjectEstFormInputes} required />
                                        <span className='cstm_error'>{ErrorInputes.fullName}</span>
                                    </div>

                                    <div className='sub_div'>
                                        <label className='lable-cstm'>City</label>
                                        <MDBInput wrapperClass='mb-4' id='city' type='city' name='city' value={formInputes.city} onChange={handleProjectEstFormInputes} required />
                                        <span className='cstm_error'>{ErrorInputes.city}</span>
                                    </div>

                                    <div className='sub_div'>
                                        <label className='lable-cstm'>Email</label>
                                        <MDBInput wrapperClass='mb-4' type='email' name='email' id='email' value={formInputes.email} onChange={handleProjectEstFormInputes} required />
                                        <span className='cstm_error'>{ErrorInputes.email}</span>
                                    </div>

                                    <div className='sub_div'>
                                        <label className='lable-cstm'>Phone</label>
                                        <MDBInput wrapperClass='mb-4' type='text' name='phoneNumber' id='phoneNumber' value={formInputes.phoneNumber} onChange={handleProjectEstFormInputes} required />
                                        <span className='cstm_error'>{ErrorInputes.phoneNumber}</span>
                                    </div>

                                    <div className='sub_div'>
                                        <label className='lable-cstm'>Message...</label>
                                        <MDBInput wrapperClass='mb-4' type='text' name='message' id='message' value={formInputes.message} onChange={handleProjectEstFormInputes} />
                                        <span className='cstm_error'>{ErrorInputes.message}</span>
                                    </div>

                                    <MDBBtn noRipple={true} type='submit' value='Submit' className='mr-2 w-100 mb-4'>Submit</MDBBtn>
                                    <div className="text-center">
                                        <p>Not Registered Yet? <span className='sign_in' onClick={handleSignupForNav}>Sign Up</span></p>
                                    </div>
                                </MDBValidation>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </>
    )
}

export default ProjectEstimation