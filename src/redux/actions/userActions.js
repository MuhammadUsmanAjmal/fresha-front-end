import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAIL,
  VERIFY_OTP_REQUEST,
  VERIFY_OTP_SUCCESS,
  VERIFY_OTP_FAIL,
  CHANGE_PASSWORD_REQUEST,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAIL,
  PROFILE_GET_REQUEST,
  PROFILE_GET_SUCCESS,
  PROFILE_GET_FAIL,
  PROFILE_UPDATE_REQUEST,
  PROFILE_UPDATE_SUCCESS,
  PROFILE_UPDATE_FAIL,
  PASSWORD_UPDATE_REQUEST,
  PASSWORD_UPDATE_SUCCESS,
  PASSWORD_UPDATE_FAIL,
} from "../../redux/constants/userConstants.js";
import { SERVER_IP } from "../../configs/env.js";
// ** UseJWT import to get config
import jwtInterceptor from "./jwtInterceptor.js";

// const config = useJwt.jwtConfig

export const loginAction = (login_data) => async (dispatch) => {
  try {
    dispatch({
      type: LOGIN_REQUEST,
    });

    const { data } = await jwtInterceptor.post(
      `${SERVER_IP}/api/v1/users/login`,
      login_data
    );

    dispatch({
      type: LOGIN_SUCCESS,
      payload: data,
    });

    if (data.data.token) {
      const complete = {
        ...data,
        ability: [{ action: "manage", subject: "all" }],
      };
      localStorage.setItem("userData", JSON.stringify(complete));
      localStorage.setItem("profileInfo", JSON.stringify([data?.data]));
      localStorage.setItem("accessToken", data.data.token);
    }
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload: error.response && error.response.data.error,
    });
  }
};

export const SignupAction = (user_info) => async (dispatch) => {
  try {
    dispatch({
      type: SIGNUP_REQUEST,
    });

    const { data } = await jwtInterceptor.post(
      `${SERVER_IP}/api/v1/salons/register`,
      user_info
    );

    dispatch({
      type: SIGNUP_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SIGNUP_FAIL,
      payload: error.response && error.response.data.error,
    });
  }
};

export const forgotPasswordAction = (mobileNumber) => async (dispatch) => {
  try {
    dispatch({ type: FORGOT_PASSWORD_REQUEST });
    const { data } = await jwtInterceptor.post(
      `${SERVER_IP}/api/v1/users/forgotPassword`,
      mobileNumber
    );

    dispatch({
      type: FORGOT_PASSWORD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FORGOT_PASSWORD_FAIL,
      payload: error.response && error.response.data.error,
    });
  }
};

export const verifyPin = (otpCode) => async (dispatch) => {
  try {
    dispatch({
      type: VERIFY_OTP_REQUEST,
    });

    const { data } = await jwtInterceptor.post(
      `${SERVER_IP}/api/v1/users/verifyotp`,
      otpCode
    );
    dispatch({
      type: VERIFY_OTP_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: VERIFY_OTP_FAIL,
      payload: error.response && error.response.data.error,
    });
  }
};

export const ChangePasswordAction = (changedUser) => async (dispatch) => {
  try {
    dispatch({
      type: CHANGE_PASSWORD_REQUEST,
      Accept: "application/json",
    });
    const { data } = await jwtInterceptor.put(
      `${SERVER_IP}/api/v1/users/resetpassword`,
      changedUser
    );
    dispatch({
      type: CHANGE_PASSWORD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CHANGE_PASSWORD_FAIL,
      payload: error.response && error.response.data.error,
    });
  }
};

export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });
  // ** Remove user, accessToken & refreshToken from localStorage
  // localStorage.removeItem("accessToken");
  // localStorage.removeItem("userData");
  // localStorage.removeItem("Ability");
  // localStorage.removeItem("skin");
  // localStorage.removeItem("profileInfo");
  localStorage.clear();
  document.location.href = "/";
};

export const getProfileAction = (Id) => async (dispatch) => {
  try {
    dispatch({
      type: PROFILE_GET_REQUEST,
      Accept: "application/json",
    });
    const { data } = await jwtInterceptor.get(
      `${SERVER_IP}/api/v1/users/profile/${Id}`
    );
    dispatch({
      type: PROFILE_GET_SUCCESS,
      payload: data,
    });
    localStorage.setItem("profileInfo", JSON.stringify(data?.data));
  } catch (error) {
    dispatch({
      type: PROFILE_GET_FAIL,
      payload: error.response && error.response.data.error,
    });
  }
};

export const updateProfileAction = (Id, Body) => async (dispatch) => {
  try {
    dispatch({
      type: PROFILE_UPDATE_REQUEST,
      Accept: "application/json",
    });
    const { data } = await jwtInterceptor.put(
      `${SERVER_IP}/api/v1/users/profile/${Id}`,
      Body
    );
    dispatch({
      type: PROFILE_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PROFILE_UPDATE_FAIL,
      payload: error.response && error.response.data.error,
    });
  }
};

export const passwordUpdateAction = (Id, Body) => async (dispatch) => {
  try {
    dispatch({
      type: PASSWORD_UPDATE_REQUEST,
      Accept: "application/json",
    });
    const { data } = await jwtInterceptor.put(
      `${SERVER_IP}/api/v1/users/profile/${Id}`,
      Body
    );
    dispatch({
      type: PASSWORD_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PASSWORD_UPDATE_FAIL,
      payload: error.response && error.response.data.error,
    });
  }
};
