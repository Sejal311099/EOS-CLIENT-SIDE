import React, { useState, useEffect } from 'react';
import './Login.css';
import { MDBBtn, MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBValidation, MDBValidationItem } from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userSignUpStart } from '../Redux/Actions/userActions';

const emailRegx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
const phoneRegx = /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[6789]\d{9}$/
var passwordregx = /^(?=.*[a-z])(?!.* )(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/;


const Signup = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loaderState, setloaderState] = useState(false)
  const data = useSelector((state) => state?.userData?.newUser);

  const [submit, setsubmit] = useState(false)
  const [SignupInputes, setSignupInputes] = useState({
    name: "",
    email: "",
    age: "",
    phonenumber: "",
    address: "",
    password: ""
  })
  const [ErrorSignupInputes, setErrorSignupInputes] = useState({ ...SignupInputes })
  // Empty the Form After the Response Getting properly
  useEffect(() => {
    if (data.status === 200) {
      setSignupInputes({
        name: "",
        email: "",
        age: "",
        phonenumber: "",
        address: "",
        password: ""
      })
    }
  }, [data])


  const handleSignupFormInputes = (e) => {
    const { name, value } = e.target
    setSignupInputes({ ...SignupInputes, [name]: value })

    switch (name) {
      case "name":
        ErrorSignupInputes.name = value.length > 0 ? "" : "Enter your name"
        break;
      case "email":
        if (!value) {
          ErrorSignupInputes.email = value.length > 0 ? "" : "Enter your email"
        }
        else {
          ErrorSignupInputes.email = emailRegx.test(value) === false && "Enter your valid email"
        }
        break;
      case "age":
        ErrorSignupInputes.age = value.length > 0 ? "" : "Enter your age"
        break;
      case "phonenumber":
        if (!value) {
          ErrorSignupInputes.phonenumber = value.length > 0 ? "" : "Enter your phone"
        } else {
          ErrorSignupInputes.phonenumber = phoneRegx.test(value) === false && "Enter  valid phone number"
        }
        break;
      case "address":
        ErrorSignupInputes.address = value.length > 0 ? "" : "Enter your address"
        break;
      case "password":
      case "password":
        if (!value) {
          ErrorSignupInputes.password = "Please enter your Password";
        }
        else if (value.length < 4) {
          ErrorSignupInputes.password = "Password length must more than 4 character";
        }
        else if (value.length > 16) {
          ErrorSignupInputes.password = "Password length must be less than 16 characters";
        }
        else {
          ErrorSignupInputes.password = passwordregx.test(value) === false && "Enter valid password"
        }
        break;
        break;
      default:
        break;
    }
    setErrorSignupInputes(ErrorSignupInputes)
  }
 

  function validate(value) {
    if (!SignupInputes.name) {
      ErrorSignupInputes.name = "Enter name"
    }
    if (!SignupInputes.email) {
      ErrorSignupInputes.email = "enter email"
    }
    if (!SignupInputes.phonenumber) {
      ErrorSignupInputes.phonenumber = "Enter phone number"
    }
    if (!SignupInputes.age) {
      ErrorSignupInputes.age = "Enter age"
    }
    if (!SignupInputes.address) {
      ErrorSignupInputes.address = "Enter address"
    }
    if (!SignupInputes.password) {
      ErrorSignupInputes.password = "Enter password"
    }
    return ErrorSignupInputes
  }
  useEffect(() => {
    if (Object.keys(ErrorSignupInputes).length === 0 && Object.keys(SignupInputes).length !== 0) {
      console.log(ErrorSignupInputes, "ErrorSignupInputes")
    }
  }, [])
  
  if (data.status == 200 ) {
    navigate(`/otp-verification?id=${data.userId}`);
    window.location.reload()
  }
  const handleSignupButton = (e) => {
    e.preventDefault()
    setsubmit(true)
    setErrorSignupInputes(validate(SignupInputes));
    if (SignupInputes.name !== "" && SignupInputes.email !== "" && SignupInputes.phonenumber !== "" && SignupInputes.age !== "" && SignupInputes.address !== "" && SignupInputes.password !== '') {
      if (ErrorSignupInputes.password.length == undefined && ErrorSignupInputes.phonenumber.length == undefined) {
        var signupPaylod = {
          name: SignupInputes.name,
          email: SignupInputes.email,
          age: SignupInputes.age,
          phonenumber: SignupInputes.phonenumber,
          address: SignupInputes.address,
          password: SignupInputes.password
        }
        setloaderState(true)

        setTimeout(() => {
          setloaderState(false)
          dispatch(userSignUpStart(signupPaylod));
        }, 2500);
      }
    }
  }

  const handleSignupForNav = () => navigate('/login');

  return (
    <>{loaderState && <div class="lds-hourglass loader"></div>}
      <MDBContainer fluid className='p-0 background-radial-gradient overflow-hidden custom_div_main'>
        <MDBRow className="justify-content-center align-item-center p-5 overflow-hidden">
          <MDBCol md='6' className='text-center text-md-start d-flex flex-column justify-content-center'>
            <h1 className="my-5 display-3 fw-bold ls-tight px-3" style={{ color: 'hsl(218, 81%, 95%)' }}>
              Welcome to<br />
              <span style={{ color: 'hsl(218, 81%, 75%)' }}>Easy on Services</span>
            </h1>
            <p className='px-3' style={{ color: 'hsl(218, 81%, 85%)' }}>
              Where do you go when you need to fix your air conditioner in the middle of the day?
              or what happens when you have an emergency situation like a leaking pipe in your kitchen?

              here we are for your solution,  to leveraging the on-demand economy and eliminating the pain in finding a professional.
            </p>
          </MDBCol>
          <MDBCol md='4' className='position-relative'>
            <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
            <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>
            <MDBCard className='my-1 bg-glass'>
              <MDBCardBody className='p-4'>
                <div><h1 className='text-center'>Signup</h1></div>
                <MDBValidation onSubmit={handleSignupButton}>
                  <div className='sub_div'>
                    <label className='lable-cstm'>Name</label>
                    <MDBInput wrapperClass='mb-4' type='text' name='name' id='name' value={SignupInputes.name} onChange={handleSignupFormInputes} required />
                    <span className='cstm_error'>{ErrorSignupInputes.name}</span>
                  </div>

                  <div className='sub_div'>
                    <label className='lable-cstm'>Email</label>
                    <MDBInput wrapperClass='mb-4' type='email' name='email' id='email' value={SignupInputes.email} onChange={handleSignupFormInputes} required />
                    <span className='cstm_error'>{ErrorSignupInputes.email}</span>

                  </div>

                  <div className='sub_div'>
                    <label className='lable-cstm'>Age</label>
                    <MDBInput wrapperClass='mb-4' type='number' name='age' id='age' value={SignupInputes.age} onChange={handleSignupFormInputes} required />
                    <span className='cstm_error'>{ErrorSignupInputes.age}</span>
                  </div>

                  <div className='sub_div'>
                    <label className='lable-cstm'>Phone</label>
                    <MDBInput wrapperClass='mb-4' type='text' name='phonenumber' id='phonenumber' value={SignupInputes.phonenumber} onChange={handleSignupFormInputes} required />
                    <span className='cstm_error'>{ErrorSignupInputes.phonenumber}</span>
                  </div>

                  <div className='sub_div'>
                    <label className='lable-cstm'>Address</label>
                    <MDBInput wrapperClass='mb-4' type='text' name='address' id='address' value={SignupInputes.address} onChange={handleSignupFormInputes} required />
                    <span className='cstm_error'>{ErrorSignupInputes.address}</span>
                  </div>

                  <div className='sub_div'>
                    <label className='lable-cstm'>Password</label>
                    <MDBInput wrapperClass='mb-4' id='password' type='password' name='password' value={SignupInputes.password} onChange={handleSignupFormInputes} required />
                    <span className='cstm_error'>{ErrorSignupInputes.password}</span>
                  </div>

                  <MDBBtn noRipple={true} type='submit' value='Submit' className='mr-2 w-100 mb-4'>SignUp</MDBBtn>
                  <div className="text-center">
                    <p>Already have an account? <span className='sign_in' onClick={handleSignupForNav}>Sign In</span></p>
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

export default Signup;


