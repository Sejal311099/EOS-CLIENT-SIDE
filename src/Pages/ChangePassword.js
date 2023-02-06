import React, { useState, useEffect } from "react";
import "./Login.css";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBValidation,
  MDBValidationItem,
} from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userChangePasswordStart } from "../Redux/Actions/userActions";
var passwordregx = /^(?=.*[a-z])(?!.* )(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/;

const ChangePassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const data = useSelector((state) => state?.userData?.changePassword);

  const [submit, setsubmit] = useState(false);
  const [loaderState, setloaderState] = useState(false);
  const [ChangePasswordInputes, setChangePasswordInputes] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [ErrorChangePasswordInputes, setErrorChangePasswordInputes] = useState({
    ...ChangePasswordInputes,
  });

  const handleChangePasswordFormInputes = (e) => {
    const { name, value } = e.target;

    setChangePasswordInputes({ ...ChangePasswordInputes, [name]: value });

    switch (name) {
      case "currentPassword":
        if (!value) {
          ErrorChangePasswordInputes.currentPassword = "Please enter your Password";
        }
        else if (value.length < 4) {
          ErrorChangePasswordInputes.currentPassword = "Password length must more than 4 character";
        }
        else if (value.length > 16) {
          ErrorChangePasswordInputes.currentPassword = "Password length must be less than 16 characters";
        }
        else {
          ErrorChangePasswordInputes.currentPassword = passwordregx.test(value) === false && "Enter valid current Password"
        }
        break;
        case "newPassword":
          if (!value) {
            ErrorChangePasswordInputes.newPassword = "Please enter your Password";
          }
          else if (value.length < 4) {
            ErrorChangePasswordInputes.newPassword = "Password length must more than 4 character";
          }
          else if (value.length > 16) {
            ErrorChangePasswordInputes.newPassword = "Password length must be less than 16 characters";
          }
          else {
            ErrorChangePasswordInputes.newPassword = passwordregx.test(value) === false && "Enter valid new Password"
          }
          break;
          case "confirmPassword":
            if (!value) {
              ErrorChangePasswordInputes.confirmPassword = "Please enter your Password";
            }
            else if (value.length < 4) {
              ErrorChangePasswordInputes.confirmPassword = "Password length must more than 4 character";
            }
            else if (value.length > 16) {
              ErrorChangePasswordInputes.confirmPassword = "Password length must be less than 16 characters";
            }
            else {
              ErrorChangePasswordInputes.confirmPassword = passwordregx.test(value) === false && "Enter valid confirm Password"
            }
            break;
        // break;
      default:
        break;
    }
    setErrorChangePasswordInputes(ErrorChangePasswordInputes);
  };

  function validate(value) {
    if (!ChangePasswordInputes.currentPassword) {
      ErrorChangePasswordInputes.currentPassword = "Enter  current Password";
    }
    if (!ChangePasswordInputes.newPassword) {
      ErrorChangePasswordInputes.newPassword = "Enter new Password";
    }
    if (!ChangePasswordInputes.confirmPassword) {
      ErrorChangePasswordInputes.confirmPassword = "Enter confirm Password";
    }
    return ErrorChangePasswordInputes;
  }
  useEffect(() => {
    if (
      Object.keys(ErrorChangePasswordInputes).length === 0 &&
      Object.keys(ChangePasswordInputes).length !== 0
    ) {
    }
  }, []);

  const handleChangePasswordButton = (e) => {
    e.preventDefault();
    setsubmit(true);
    setErrorChangePasswordInputes(validate(ChangePasswordInputes));

    if (
      ChangePasswordInputes.currentPassword !== "" &&
      ChangePasswordInputes.newPassword !== "" &&
      ChangePasswordInputes.confirmPassword !== ""
    ) {
      //  if ( ErrorChangePasswordInputes.newPassword.length == undefined) {
      var changePasswordPayload = {
        currentPassword: ChangePasswordInputes.currentPassword,
        newPassword: ChangePasswordInputes.newPassword,
        confirmPassword: ChangePasswordInputes.confirmPassword,
      };
      setloaderState(true);
      setTimeout(() => {
        setloaderState(false);
        dispatch(userChangePasswordStart(changePasswordPayload));
      }, 2000);
    }
    //  }
  };

  if (data.status === 200) {
    navigate("/dashboard");
  }

  const handleChangePasswordForNav = () => navigate("/");

  return (
    <>
      {loaderState && <div class="lds-hourglass loader"></div>}

      <MDBContainer
        fluid
        className="p-0 background-radial-gradient overflow-hidden custom_div_main"
      >
        <MDBRow className="justify-content-center align-item-center p-5 overflow-hidden">
          <MDBCol
            md="6"
            className="text-center text-md-start d-flex flex-column justify-content-center"
          >
            <h1
              className="my-5 display-3 fw-bold ls-tight px-3"
              style={{ color: "hsl(218, 81%, 95%)" }}
            >
              Change Your Password !!
              <br />
              <span style={{ color: "hsl(218, 81%, 75%)" }}>
                for your business
              </span>
            </h1>
            <p className="px-3" style={{ color: "hsl(218, 81%, 85%)" }}></p>
          </MDBCol>
          <MDBCol md="4" className="position-relative">
            <div
              id="radius-shape-1"
              className="position-absolute rounded-circle shadow-5-strong"
            ></div>
            <div
              id="radius-shape-2"
              className="position-absolute shadow-5-strong"
            ></div>
            <MDBCard className="my-1 bg-glass">
              <MDBCardBody className="p-4">
                <div>
                  <h1 className="text-center">Change Password</h1>
                </div>
                <MDBValidation onSubmit={handleChangePasswordButton}>
                  <div className="sub_div">
                    <label className="lable-cstm">Current Password</label>
                    <MDBInput
                      wrapperClass="mb-4"
                      id="currentPassword"
                      type="password"
                      name="currentPassword"
                      onChange={handleChangePasswordFormInputes}
                      required
                    />
                    <span className="cstm_error">
                      {ErrorChangePasswordInputes.currentPassword}
                    </span>
                  </div>
                  <div className="sub_div">
                    <label className="lable-cstm">New Password</label>
                    <MDBInput
                      wrapperClass="mb-4"
                      id="newPassword"
                      type="password"
                      name="newPassword"
                      onChange={handleChangePasswordFormInputes}
                      required
                    />
                    <span className="cstm_error">
                      {ErrorChangePasswordInputes.newPassword}
                    </span>
                  </div>
                  <div className="sub_div">
                    <label className="lable-cstm">Confirm Password</label>
                    <MDBInput
                      wrapperClass="mb-4"
                      id="confirmPassword"
                      type="password"
                      name="confirmPassword"
                      onChange={handleChangePasswordFormInputes}
                      required
                    />
                    <span className="cstm_error">
                      {ErrorChangePasswordInputes.confirmPassword}
                    </span>
                  </div>

                  <MDBBtn
                    noRipple={true}
                    type="submit"
                    value="Submit"
                    className="mr-2 w-100 mb-4"
                  >
                    Update Password
                  </MDBBtn>
                  <div className="text-center">
                    <p>
                      or
                      <span
                        className="sign_in"
                        onClick={handleChangePasswordForNav}
                      >
                        Sign In
                      </span>
                    </p>
                  </div>
                </MDBValidation>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </>
  );
};

export default ChangePassword;
