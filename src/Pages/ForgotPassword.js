import React, { useEffect, useState } from 'react';
import './Login.css';
import { MDBBtn, MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBCheckbox, MDBIcon, MDBValidation, MDBValidationItem } from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userForgotPasswordStart } from '../Redux/Actions/userActions';

const emailRegx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

const ForgotPassword = () => {
    const data = useSelector((state) => state?.userData?.forgotPassword);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [submit, setsubmit] = useState(false)
    const [loaderState, setloaderState] = useState(false)
    const [formInputes, setformInputes] = useState({
        email: "",
    })
    const [ErrorInputes, setErrorInputes] = useState({ ...formInputes })
    const handleProjectEstFormInputes = (e) => {
        const { name, value } = e.target
        setformInputes({ ...formInputes, [name]: value })
        switch (name) {
            case "email":
                if (!value) {
                    ErrorInputes.email = value.length > 0 ? "" : "Enter your email"
                }
                else {
                    ErrorInputes.email = emailRegx.test(value) === false && "Enter your valid email"
                }
                break;
            default:
                break;
        }
        setErrorInputes(ErrorInputes)
    }

    function validate(value) {
        if (!formInputes.email) {
            ErrorInputes.email = "Enter email"
        }
        return ErrorInputes
    }
    useEffect(() => {
        if (data.status === 200) {
            setformInputes({
            email: "",
          })
        }
      }, [data])
    
    useEffect(() => {
        if (Object.keys(ErrorInputes).length === 0 && Object.keys(formInputes).length !== 0) {
            console.log(ErrorInputes, "ErrorInputes")
        }
    }, [])

    const handleProjectEstForm = (e) => {
        e.preventDefault()
        setsubmit(true)
        setErrorInputes(validate(formInputes));
        if (formInputes.email !== "") {
           if ( ErrorInputes.email.length == undefined) {
            var ForgotPasswordPayload={
                email:formInputes.email,
            }
            setloaderState(true)
            setTimeout(() => {
                setloaderState(false)
                dispatch(userForgotPasswordStart(ForgotPasswordPayload));
              }, 2000); 
           }
         }
    }

    return (
        <>
         {loaderState && <div className="lds-hourglass loader"></div>}
            <MDBContainer fluid className='p-4 background-radial-gradient overflow-hidden custom_div_main'>
                <MDBRow className="justify-content-center align-item-center p-0">
                    <MDBCol md='6' className='text-center text-md-start d-flex flex-column justify-content-center'>
                        <h1 className="my-5 display-3 fw-bold ls-tight px-3" style={{ color: 'hsl(218, 81%, 95%)' }}>

                        Update Your Password Here !!<br />
                            <span style={{ color: 'hsl(218, 81%, 75%)' }}>for your business</span>
                        </h1>
                        <p className='px-3' style={{ color: 'hsl(218, 81%, 85%)' }}></p>
                    </MDBCol>
                    <MDBCol md='4' className='position-relative'>
                        <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
                        <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>
                        <MDBCard className='my-1 bg-glass'>
                            <MDBCardBody className='p-4'>
                                <div><h1 className='text-center'>Forgot Password</h1></div>
                                <MDBValidation onSubmit={handleProjectEstForm}>
                                    <div className='sub_div'>
                                        <label className='lable-cstm'>Email</label>
                                        <MDBInput wrapperClass='mb-4' type='email' name='email' id='email' onChange={handleProjectEstFormInputes} required />
                                        <span className='cstm_error'>{ErrorInputes.email}</span>
                                    </div>

                                    <MDBBtn noRipple={true} type='submit' value='Submit' className='mr-2 w-100 mb-4'>Submit</MDBBtn>
                                    <div className="text-center"> <p>Already have an account? <span className='sign_in' onClick={() => navigate('/login')}>Sign In</span> </p>
                                        <p>Don’t have an account? <span className='sign_in' onClick={() => navigate('/signup')}>sign up </span> </p>
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

export default ForgotPassword