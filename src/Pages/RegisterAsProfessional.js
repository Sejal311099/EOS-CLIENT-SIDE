import React, { useEffect, useState } from 'react';
import './Login.css';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCheckbox,
  MDBIcon,
  MDBValidation
}
  from 'mdb-react-ui-kit';
import { useDispatch, useSelector } from 'react-redux';
import { registerAsProfessionalStart } from '../Redux/Actions/registerAsProfessionalAction';

var passwordregx = /^(?=.*[a-z])(?!.* )(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/;
const emailRegx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

const phoneRegx =  /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[6789]\d{9}$/
const RegisterAsProfessional = () => {
  const dispatch = useDispatch();
  const [submit, setsubmit] = useState(false)
  const [loaderState, setloaderState] = useState(false)

  const [RapInputes, setRapInputes] = useState({
    fullName: "",
    userName: "",
    email: "",
    phoneNumber: "",
    address: "",
    profession: "",
    password: ""
  })

  const [ErrorRapInputes, setErrorRapInputes] = useState({ ...RapInputes })
  const RAP = useSelector((state) => state?.registerAsProfessionalData?.registerAsProfessionalData);
  useEffect(() => {
    if (RAP.status === 200) {
      setRapInputes({
        fullName: "",
        userName: "",
        email: "",
        phoneNumber: "",
        address: "",
        profession: "",
        password: ""
      })
    }
  }, [RAP])




  const handleRapForm = (e) => {
    const { name, value } = e.target
    setRapInputes({ ...RapInputes, [name]: value })
    switch (name) {
      case "fullName":
        ErrorRapInputes.fullName = value.length > 0 ? "" : "Enter your Name"
        break;
      case "userName":
        ErrorRapInputes.userName = value.length > 0 ? "" : "Enter your user name"
        break;
      case "email":
        if (!value) {
          ErrorRapInputes.email = value.length > 0 ? "" : "Enter your email"
        }
        else {
          ErrorRapInputes.email = emailRegx.test(value) === false && "Enter your valid email"
        }
        break;
      case "phoneNumber":
        if (!value) {
          ErrorRapInputes.phoneNumber = value.length > 0 ? "" : "Enter your phone"
        } else {
          ErrorRapInputes.phoneNumber = phoneRegx.test(value) === false && "Enter your valid phone number"
        }
        break;
      case "address":
        ErrorRapInputes.address = value.length > 0 ? "" : "Enter your address"
        break;
      case "password":
        if (!value) {
          ErrorRapInputes.password = "Please enter your Password";
        }
        else if (value.length < 4) {
          ErrorRapInputes.password = "Password length must more than 4 character";

        }
        else if (value.length > 16) {
          ErrorRapInputes.password = "Password length must be less than 16 characters";
        }
        else {
          ErrorRapInputes.password = passwordregx.test(value) === false && "Enter valid password"
        }
        break;
      case "profession":
        ErrorRapInputes.profession = value.length > 0 ? "" : "Enter your profession"
        break;
      default:
        break;
    }
    setErrorRapInputes(ErrorRapInputes)
  }
  function validate(value) {
    if (!RapInputes.fullName) {
      ErrorRapInputes.fullName = "Enter your name"
    }
    if (!RapInputes.userName) {
      ErrorRapInputes.userName = "Enter your user name"
    }
    if (!RapInputes.email) {
      ErrorRapInputes.email = "Enter your email"
    }
    if (!RapInputes.phoneNumber) {
      ErrorRapInputes.phoneNumber = "Enter your phone number"
    }
    if (!RapInputes.address) {
      ErrorRapInputes.address = "Enter your address"
    }
    if (!RapInputes.profession) {
      ErrorRapInputes.profession = "Enter Your profession"
    }
    if (!RapInputes.password) {
      ErrorRapInputes.password = "Enter password"
    }
    return ErrorRapInputes
  }

  useEffect(() => {
    if (Object.keys(ErrorRapInputes).length === 0 && Object.keys(RapInputes).length !== 0) {
      console.log(ErrorRapInputes, "ErrorRapInputes")
    }
  }, [])

  const handleSubmitButton = (e) => {
    e.preventDefault()
    setsubmit(true)
    setErrorRapInputes(validate(RapInputes));
    if (RapInputes.fullName !== "" && RapInputes.phoneNumber !== "" && RapInputes.userName !== "" && RapInputes.email !== "" && RapInputes.password !== "" && RapInputes.phoneNumber !== "" && RapInputes.profession !== "" && RapInputes.address !== "") {
      if (ErrorRapInputes.password === false && ErrorRapInputes.phoneNumber === false) {
        var RegAsProPaylod = {
          name: RapInputes.fullName,
          username: RapInputes.userName,
          email: RapInputes.email,
          password: RapInputes.password,
          phonenumber: RapInputes.phoneNumber,
          professional: RapInputes.profession,
          address: RapInputes.address,
        }
        setloaderState(true)
        setTimeout(() => {
          dispatch(registerAsProfessionalStart(RegAsProPaylod));
          setloaderState(false)
        }, 2000);

      }
    }
  }

  return (
    <>
      {loaderState && <div class="lds-hourglass loader"></div>}

      <MDBContainer fluid className='p-4 background-radial-gradient overflow-hidden custom_div_main custom_div_main'>
        <MDBRow className="justify-content-center align-item-center p-0">
          <MDBCol md='6' className='text-center text-md-start d-flex flex-column justify-content-center'>
            <h1 className="my-5 display-3 fw-bold ls-tight px-3" style={{ color: 'hsl(218, 81%, 95%)' }}>
              Hello There!!<br />
              <span style={{ color: 'hsl(218, 81%, 75%)' }}>Welcome to the team</span>
            </h1>
            <p className='px-3' style={{ color: 'hsl(218, 81%, 85%)' }}>
              We're so happy you're here! <br/>
              We are here to make things as easy as possible for you and us. <br/>
              People like you can done amazing work by register your self here and join us.
            </p>
          </MDBCol>
          <MDBCol md='4' className='position-relative'>
            <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
            <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>
            <MDBCard className='my-1 bg-glass'>
              <MDBCardBody className='p-4'>
                <div><h1 className='text-center'>Join Us As Professional</h1></div>
                <MDBValidation onSubmit={handleSubmitButton}>
                  <div className='sub_div'>
                    <label className='lable-cstm'>Full Name</label>
                    <MDBInput wrapperClass='mb-4' type='text' name='fullName' id='fullName' value={RapInputes.fullName} onChange={handleRapForm} required />
                    <span className='cstm_error'>{ErrorRapInputes.fullName}</span>
                  </div>

                  <div className='sub_div'>
                    <label className='lable-cstm'>User Name</label>
                    <MDBInput wrapperClass='mb-4' type='text' name='userName' id='userName' value={RapInputes.userName} onChange={handleRapForm} required />
                    <span className='cstm_error'>{ErrorRapInputes.userName}</span>
                  </div>

                  <div className='sub_div'>
                    <label className='lable-cstm'>Email</label>
                    <MDBInput wrapperClass='mb-4' type='email' name='email' id='email' value={RapInputes.email} onChange={handleRapForm} required />
                    <span className='cstm_error'>{ErrorRapInputes.email}</span>
                  </div>

                  <div className='sub_div'>
                    <label className='lable-cstm'>Phone</label>
                    <MDBInput wrapperClass='mb-4' type='text' name='phoneNumber' id='phoneNumber' value={RapInputes.phoneNumber} onChange={handleRapForm} required />
                    <span className='cstm_error'>{ErrorRapInputes.phoneNumber}</span>
                  </div>

                  <div className='sub_div'>
                    <label className='lable-cstm'>Address</label>
                    <MDBInput wrapperClass='mb-4' type='text' name='address' id='address' value={RapInputes.address} onChange={handleRapForm} required />
                    <span className='cstm_error'>{ErrorRapInputes.address}</span>
                  </div>

                  <div className='sub_div'>
                    <label className='lable-cstm'>Professional</label>
                    <MDBInput wrapperClass='mb-4' type='text' name='profession' id='profession' value={RapInputes.profession} onChange={handleRapForm} required />
                    <span className='cstm_error'>{ErrorRapInputes.profession}</span>
                  </div>

                  <div className='sub_div'>
                    <label className='lable-cstm'>Password</label>
                    <MDBInput wrapperClass='mb-4' id='password' type='password' name='password' value={RapInputes.password} onChange={handleRapForm} required />
                    <span className='cstm_error'>{ErrorRapInputes.password}</span>
                  </div>

                  <MDBBtn noRipple={true} type='submit' value='Submit' className='mr-2 w-100 mb-4'>Submit</MDBBtn>

                </MDBValidation>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </>
  )
}

export default RegisterAsProfessional