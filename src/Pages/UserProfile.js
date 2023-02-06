import React, { useState, useEffect } from 'react';
import './Login.css';
import { MDBBtn, MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBValidation, MDBValidationItem } from 'mdb-react-ui-kit';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { UpdateProfileStart } from '../Redux/Actions/UpdateProfileActions';
var passwordregx = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

const emailRegx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
const phoneRegx = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/

const UserProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [submit, setsubmit] = useState(false)
  const [UserUpdateInputes, setUserUpdateInputes] = useState({
    fullName: "",
    age: "",
    address: "",
  })
  const [ErrorUserUpdateInputes, setErrorUserUpdateInputes] = useState({ ...UserUpdateInputes })

  const handleUpdateProfileInputes = (e) => {
    const { name, value } = e.target
    setUserUpdateInputes({ ...UserUpdateInputes, [name]: value })

    switch (name) {
      case "fullName":
        ErrorUserUpdateInputes.fullName = value.length > 0 ? "" : "Enter your name"
        break;
      case "age":
        ErrorUserUpdateInputes.age = value.length > 0 ? "" : "Enter your age"
        break;
      case "address":
        ErrorUserUpdateInputes.address = value.length > 0 ? "" : "Enter your address"
        break;
      default:
        break;
    }
    setErrorUserUpdateInputes(ErrorUserUpdateInputes)
  }
  
  function validate(value) {
    if (!UserUpdateInputes.fullName) {
      ErrorUserUpdateInputes.fullName = "Enter your name"
    }
    if (!UserUpdateInputes.age) {
      ErrorUserUpdateInputes.age = "Enter your age"
    }
    if (!UserUpdateInputes.address) {
      ErrorUserUpdateInputes.address = "Enter your address"
    }
    return ErrorUserUpdateInputes
  }

  useEffect(() => {
    if (Object.keys(ErrorUserUpdateInputes).length === 0 && Object.keys(UserUpdateInputes).length !== 0) {
      console.log(ErrorUserUpdateInputes, "ErrorUserUpdateInputes")
    }
  }, [])

  useEffect(() => {
    const userId = sessionStorage.getItem("userId");
    axios({ url: `http://localhost:9000/api/user/${userId}`, method: "GET", })
      .then((res) => {
        var Updatepaylod = {
          fullName: res.data.postData.name,
          age: res.data.postData.age,
          address: res.data.postData.address,
        }
        setUserUpdateInputes(Updatepaylod)
      })
      .catch((err) => { console.log(err) });
  }, [])

  const handleUpdateProfileButton = (e) => {
    e.preventDefault()
    setsubmit(true)
    setErrorUserUpdateInputes(validate(UserUpdateInputes));
    if (UserUpdateInputes.fullName !== "" && UserUpdateInputes.age !== "" && UserUpdateInputes.address !== "") {
      var UpProfilePaylod = {
        name: UserUpdateInputes.fullName,
        age: UserUpdateInputes.age,
        address: UserUpdateInputes.address,
      }
      dispatch(UpdateProfileStart(UpProfilePaylod));
      console.log(UpProfilePaylod, "UpProfilePaylod");
    }
  }
  // 
  return (
    <>
      <MDBContainer fluid className='p-5 background-radial-gradient overflow-hidden custom_div_main'>
        <MDBRow className="justify-content-center align-item-center p-5 overflow-hidden">
          <MDBCol md='6' className='text-center text-md-start d-flex flex-column justify-content-center'>
            <h1 className="my-5 display-3 fw-bold ls-tight px-3" style={{ color: 'hsl(218, 81%, 95%)' }}>
              Update Your Profile Here !!<br />
              <span style={{ color: 'hsl(218, 81%, 75%)' }}> </span>
            </h1>
            <p className='px-3' style={{ color: 'hsl(218, 81%, 85%)' }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Eveniet, itaque accusantium odio, soluta, corrupti aliquam
              quibusdam tempora at cupiditate quis eum maiores libero
              veritatis? Dicta facilis sint aliquid ipsum atque?
            </p>
          </MDBCol>
          <MDBCol md='4' className='position-relative'>
            <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
            <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>
            <MDBCard className='my-1 bg-glass'>
              <MDBCardBody className='p-4'>
                <div><h1 className='text-center'>Update Profile</h1></div>
                <MDBValidation onSubmit={handleUpdateProfileButton}>
                  <div className='sub_div'>
                    <label className='lable-cstm'>Name</label>
                    <MDBInput wrapperClass='mb-4' type='text' name='fullName' id='fullName' value={UserUpdateInputes.fullName} onChange={handleUpdateProfileInputes} required />
                    <span className='cstm_error'>{ErrorUserUpdateInputes.fullName}</span>
                  </div>

                  <div className='sub_div'>
                    <label className='lable-cstm'>Age</label>
                    <MDBInput wrapperClass='mb-4' type='number' name='age' id='age' value={UserUpdateInputes.age} onChange={handleUpdateProfileInputes} required />
                    <span className='cstm_error'>{ErrorUserUpdateInputes.age}</span>
                  </div>

                  <div className='sub_div'>
                    <label className='lable-cstm'>Address</label>
                    <MDBInput wrapperClass='mb-4' type='text' name='address' id='address' value={UserUpdateInputes.address} onChange={handleUpdateProfileInputes} required />
                    <span className='cstm_error'>{ErrorUserUpdateInputes.address}</span>
                  </div>

                  {/* <button type='submit' className='w-100 mb-4 loginBtn' size='md'></button> */}
                  <MDBBtn noRipple={true} type='submit' value='Submit' className='mr-2 w-100 mb-4'>Submit</MDBBtn>
                  <div className="text-center">
                  <div className="text-center"> <p>or <span  style={{cursor: 'pointer'}} onClick={()=> navigate('/change-password')}>changePassword </span> </p> </div>
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

export default UserProfile