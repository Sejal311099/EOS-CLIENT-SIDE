import React, { useEffect, useState } from 'react';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBValidation,
  MDBValidationItem,
  MDBBtn,
} from 'mdb-react-ui-kit';
import './Login.css'
import { userLoginStart } from '../Redux/Actions/userActions';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const emailRegx =  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

const Login = () => {

  const [loaderState, setloaderState] = useState(false)
  const userLoginData = useSelector((state) => state?.userData?.user)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [ErrorSignupInputes, setErrorSignupInputes] = useState({ ...data })
  const [submit, setsubmit] = useState(false)

  const handleInput = (e) => {
    const { name, value } = e.target
    setData({
      ...data, [name]: value,
    })

    switch (name) {
      case "email":
        if (!value) {
          ErrorSignupInputes.email = value.length > 0 ? "" : "Enter your email"
        }
        else {
          ErrorSignupInputes.email = emailRegx.test(value) === false && "Enter your valid email"
        }
        break;
      case "password":
        ErrorSignupInputes.password = value.length > 0 ? "" : "Enter your password"
        break;

    }
    setErrorSignupInputes(ErrorSignupInputes)
  }

  function validate(value) {
    if (!data.email) {
      ErrorSignupInputes.email = "Enter email"
    }
    if (!data.password) {
      ErrorSignupInputes.password = "Enter password"
    }
    return ErrorSignupInputes
  }

  useEffect(() => {
    if (Object.keys(ErrorSignupInputes).length === 0 && Object.keys(data).length !== 0) {

    }
  }, [])

  const handleSubmit = (e) => { 
    e.preventDefault();
    setsubmit(true)
    setErrorSignupInputes(validate(data));

    if (data.email !== "" && emailRegx.test(data.email) && data.password !== "" ) {
      var loginData = {
        email: data.email,
        password: data.password
      }
      setloaderState(true)
      setTimeout(() => {
        dispatch(userLoginStart(loginData));
        setloaderState(false)
      }, 2000);
    }
  }
    
  if (userLoginData?.message === "Login successful") {
    navigate('/');
    // window.location.reload();
  }

  return (
    <>
      {loaderState && <div class="lds-hourglass loader"></div>}
      <MDBContainer fluid className='p-4 background-radial-gradient overflow-hidden'>

        <MDBRow className="justify-content-center align-item-center p-0">

          <MDBCol md='6' className='text-center text-md-start d-flex flex-column justify-content-center'>

            <h1 className="my-5 display-3 fw-bold ls-tight px-3" style={{ color: 'hsl(218, 81%, 95%)' }}>
              Horray..!!<br />
              <span style={{ color: 'hsl(218, 81%, 75%)' }}>Welcome again</span>
            </h1>

            <h4 className='px-3' style={{ color: 'hsl(218, 81%, 85%)' }}>
              You will never struggle to find a professionals for your home services
            </h4 >

          </MDBCol>

          <MDBCol md='4' className='position-relative'>

            <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
            <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>

            <MDBCard className='my-5 bg-glass'>

              <MDBCardBody className='p-5'>

                <div className='p-2 justify-content-center align-item-center'> <h1 >LogIn</h1> </div>

                <MDBValidation className='row g-3' onSubmit={handleSubmit}>

                  <div className='sub_div'>
                    <label className='lable-cstm'>Email</label>
                    <MDBInput wrapperClass='mb-4' type='email' name='email' id='email' onChange={handleInput} required />
                    <span className='cstm_error'>{ErrorSignupInputes.email}</span>

                  </div>

                <div className='sub_div'>
                  <label className='lable-cstm'>Password</label>
                  <MDBInput wrapperClass='mb-4' id='password' type='password' name='password' onChange={handleInput} required />
                  <span className='cstm_error'>{ErrorSignupInputes.password}</span>
                </div>
                  
                  <MDBBtn noRipple={true} type='submit' value='Submit' className='mr-2'>LogIn</MDBBtn>

                  <div className="text-center">
                    <p>Don’t have an account? <span className='sign_in' onClick={() => navigate('/signup')}> Sign Up </span> </p>
                    <p>Forgot Password? <span className='sign_in' onClick={() => navigate('/forgot-password')}>Forgot Password? </span> </p>
                  </div>
                </MDBValidation>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>

    </>

  );
}

export default Login;

