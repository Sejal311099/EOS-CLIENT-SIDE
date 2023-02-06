import React, { useEffect, useState } from "react";
import axios from "axios";
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
} from "mdb-react-ui-kit";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { otpVerificationStart } from "../Redux/Actions/userActions";

let number = new RegExp("^[0-9]+$");

const ProjectEstimation = () => {
  const [otp, setOtp] = useState("");
  const [minutes, setMinutes] = useState(1);
  const [seconds, setSeconds] = useState(59);

  let params = (new URL(document.location)).searchParams;
  let id = params.get("id");
  const [loaderState, setloaderState] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [submit, setsubmit] = useState(false);
  const estdata = useSelector((state) => state?.userData?.otpVerification);
  const [formInputes, setformInputes] = useState({
    otp: "",
  });
  const [ErrorInputes, setErrorInputes] = useState({ ...formInputes });
  // Empty the Form After the Response Getting properly
  useEffect(() => {
    if (estdata.status === 200) {
      setformInputes({
        otp: "",
      });
    }
  }, [estdata]);
  const handleSignupForNav = () => navigate("/signup");

  const handleOtpVerificationFormInputes = (e) => {
    const { name, value } = e.target;
    setformInputes({ ...formInputes, [name]: value });
    switch (name) {
      case "otp":
        if (!value) {
          ErrorInputes.otp = value.length > 0 ? "" : "Enter your otp";
        } else {
          ErrorInputes.otp =
            number.test(value) === false && "Enter your valid otp";
        }
        break;
      default:
        break;
    }
    setErrorInputes(ErrorInputes);
  };

  function validate(value) {
    if (!formInputes.otp) {
      ErrorInputes.otp = "Enter otp";
    }
    return ErrorInputes;
  }
  useEffect(() => {
    if (
      Object.keys(ErrorInputes).length === 0 &&
      Object.keys(formInputes).length !== 0
    ) {
      console.log(ErrorInputes, "ErrorInputes");
    }
  }, []);
  if (estdata.status === 200) {
    navigate("/");
  }

  const handleOtpVerifyForm = (e) => {
    e.preventDefault();
    setsubmit(true);
    setErrorInputes(validate(formInputes));
    if (formInputes.otp !== "") {
      var projectEstPaylod = {
        otp: formInputes.otp,
      };
      setloaderState(true);
      setTimeout(() => {
        dispatch(otpVerificationStart(projectEstPaylod));
        setloaderState(false);
      }, 2000);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }

      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval);
        } else {
          setSeconds(59);
          setMinutes(minutes - 1);
        }
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [seconds]);

  const resendOTP = () => {
    setMinutes(1);
    setSeconds(59);
    const result = axios.put(`http://localhost:9000/api/user/resend/${id}`);

    // navigate("/resend-otp")
  };

  return (
    <>
      {loaderState && <div class="lds-hourglass loader"></div>}
      <MDBContainer
        fluid
        className="p-4 background-radial-gradient overflow-hidden custom_div_main"
      >
        <MDBRow className="justify-content-center align-item-center p-0">
          <MDBCol
            md="6"
            className="text-center text-md-start d-flex flex-column justify-content-center"
          >
            <h1
              className="my-5 display-3 fw-bold ls-tight px-3"
              style={{ color: "hsl(218, 81%, 95%)" }}
            >
              Give your estimation
              <br />
              <span style={{ color: "hsl(218, 81%, 75%)" }}>
                and get best Professionals
              </span>
            </h1>
            <p className="px-3" style={{ color: "hsl(218, 81%, 85%)" }}>
              We're thrilled you decided to join the Easy on Services.! <br />
              Hat's off on making an excellent decision
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
                  <h1 className="text-center">Otp Verification</h1>
                </div>
                <MDBValidation onSubmit={handleOtpVerifyForm}>
                  <div className="sub_div">
                    <label className="lable-cstm">Enter four digit otp</label>
                    <MDBInput
                      wrapperClass="mb-4"
                      type="text"
                      name="otp"
                      id="otp"
                      value={formInputes.otp}
                      onChange={handleOtpVerificationFormInputes}
                      required
                    />
                    <span className="cstm_error">{ErrorInputes.otp}</span>
                  </div>
                  <div className="countdown-text">
                    {seconds > 0 || minutes > 0 ? (
                      <p>
                        Time Remaining: {minutes < 10 ? `0${minutes}` : minutes}
                        :{seconds < 10 ? `0${seconds}` : seconds}
                      </p>
                    ) : (
                      <p>Didn't recieve code?</p>
                    )}
                    <button
                      disabled={seconds > 0 || minutes > 0}
                      style={{ color: seconds > 0 || minutes > 0 ? "#DFE3E8" : "#19253a" }} onClick={resendOTP} >
                      Resend OTP
                    </button>
                  </div>
                  <MDBBtn
                    noRipple={true}
                    type="submit"
                    value="Submit"
                    className="mr-2 w-100 mb-4"
                  >
                    Submit
                  </MDBBtn>
                  <div className="text-center">
                    <p>
                      Not Registered Yet?{" "}
                      <span className="sign_in" onClick={handleSignupForNav}>
                        Sign Up
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

export default ProjectEstimation;
