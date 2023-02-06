import axios from "axios";

const token = JSON.parse(sessionStorage.getItem("USEREOS"));
const userId = sessionStorage.getItem("userId")

const headers = {
    "Authorization": `Bearer ${token}`,
};
const url = "http://localhost:9000/api"


let params = (new URL(document.location)).searchParams;
let name = params.get("token");
let id = params.get("id");
export const userLoginApi = async (user) => await axios.post(`${url}/user/Login`, user);

export const userForgotPasswordApi = async (user) => await axios.post(`${url}/user/forgot_password`, user);

export const userResetPasswordApi = async (user) => await axios.post(`${url}/user/reset_password/${name}`, user);

export const userChangePasswordApi = async (user) => await axios.post(`${url}/user/change_password`, user, { headers });

export const projectEstimationApi = async (projectEstimationData) => await axios.post(`${url}/projectEstimation/Create`, projectEstimationData);

export const otpVerificationApi = async (otpVerificationApi) => await axios.post(`${url}/user/verify/${id}`, otpVerificationApi);

// export const otpResendApi = async(otpResend) => await axios.put(`${url}/user/resend/9`, otpResend );

export const registerAsProfessionalApi = async (registerAsProfessionalData) => await axios.post(`${url}/professional/Create`, registerAsProfessionalData);

export const userSignUpApi = async (user) => await axios.post(`${url}/user/Create`, user);

export const UpdateProfileApi = async (UpdateProfileData) => await axios.patch(`${url}/user/${userId}`, UpdateProfileData, { headers });

