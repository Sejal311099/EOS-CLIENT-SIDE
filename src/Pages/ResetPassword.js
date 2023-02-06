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
import { userResetPasswordStart } from "../Redux/Actions/userActions";
var passwordregx = /^(?=.*[a-z])(?!.* )(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/;

const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const data = useSelector((state) => state?.userData?.resetPassword);
  const [submit, setsubmit] = useState(false);
  const [loaderState, setloaderState] = useState(false);
  const [ResetPasswordInputes, setResetPasswordInputes] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [ErrorResetPasswordInputes, setErrorResetPasswordInputes] = useState({
    ...ResetPasswordInputes,
  });

  const handleResetPasswordFormInputes = (e) => {
    const { name, value } = e.target;

    setResetPasswordInputes({ ...ResetPasswordInputes, [name]: value });

    switch (name) {
      case "newPassword":
        if (!value) {
          ErrorResetPasswordInputes.newPassword = "Please enter your Password";
        }
        else if (value.length < 4) {
          ErrorResetPasswordInputes.newPassword = "Password length must more than 4 character";
        }
        else if (value.length > 16) {
          ErrorResetPasswordInputes.newPassword = "Password length must be less than 16 characters";
        }
        else {
          ErrorResetPasswordInputes.newPassword = passwordregx.test(value) === false && "Enter valid current Password"
        }
        break;
        case "confirmPassword":
          if (!value) {
            ErrorResetPasswordInputes.confirmPassword = "Please enter your Password";
          }
          else if (value.length < 4) {
            ErrorResetPasswordInputes.confirmPassword = "Password length must more than 4 character";
          }
          else if (value.length > 16) {
            ErrorResetPasswordInputes.confirmPassword = "Password length must be less than 16 characters";
          }
          else {
            ErrorResetPasswordInputes.confirmPassword = passwordregx.test(value) === false && "Enter valid confirm Password"
          }
          break;
      default:
        break;
    }
    setErrorResetPasswordInputes(ErrorResetPasswordInputes);
  };

  function validate(value) {
    if (!ResetPasswordInputes.newPassword) {
      ErrorResetPasswordInputes.newPassword = "Enter new Password";
    }
    if (!ResetPasswordInputes.confirmPassword) {
      ErrorResetPasswordInputes.confirmPassword = "Enter confirm Password";
    }
    return ErrorResetPasswordInputes;
  }
  useEffect(() => {
    if (
      Object.keys(ErrorResetPasswordInputes).length === 0 &&
      Object.keys(ResetPasswordInputes).length !== 0
    ) {
    }
  }, []);

  const handleResetPasswordButton = (e) => {
    e.preventDefault();
    setsubmit(true);
    setErrorResetPasswordInputes(validate(ResetPasswordInputes));

    if (
      ResetPasswordInputes.newPassword !== "" &&
      ResetPasswordInputes.confirmPassword !== ""
    ) {
      //  if ( ErrorResetPasswordInputes.newPassword.length == undefined) {
      var resetPasswordPayload = {
        newPassword: ResetPasswordInputes.newPassword,
        confirmPassword: ResetPasswordInputes.confirmPassword,
      };
      setloaderState(true);
      setTimeout(() => {
        setloaderState(false);
        dispatch(userResetPasswordStart(resetPasswordPayload));
      }, 2000);
    }
    //  }
  };
  if (data.status === 200) {
    navigate("/");
  }

  const handleResetPasswordForNav = () => navigate("/");

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
              Reset Your Password Here !! !!
              <br />
              <span style={{ color: "hsl(218, 81%, 75%)" }}>
                for your business
              </span>
            </h1>
            <p className="px-3" style={{ color: "hsl(218, 81%, 85%)" }}>
            </p>
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
                  <h1 className="text-center">Reset Password</h1>
                </div>
                <MDBValidation onSubmit={handleResetPasswordButton}>
                  <div className="sub_div">
                    <label className="lable-cstm">New Password</label>
                    <MDBInput
                      wrapperClass="mb-4"
                      id="newPassword"
                      type="password"
                      name="newPassword"
                      onChange={handleResetPasswordFormInputes}
                      required
                    />
                    <span className="cstm_error">
                      {ErrorResetPasswordInputes.newPassword}
                    </span>
                  </div>
                  <div className="sub_div">
                    <label className="lable-cstm">Confirm Password</label>
                    <MDBInput
                      wrapperClass="mb-4"
                      id="confirmPassword"
                      type="password"
                      name="confirmPassword"
                      onChange={handleResetPasswordFormInputes}
                      required
                    />
                    <span className="cstm_error">
                      {ErrorResetPasswordInputes.confirmPassword}
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
                        onClick={handleResetPasswordForNav}
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

export default ResetPassword;
