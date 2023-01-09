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
  CHANGE_PASSWORD_RESET,
  LOGIN_RESET,
  SIGNUP_RESET,
  FORGET_RESET,
  PROFILE_GET_REQUEST,
  PROFILE_GET_SUCCESS,
  PROFILE_GET_FAIL,
  PROFILE_UPDATE_REQUEST,
  PROFILE_UPDATE_SUCCESS,
  PROFILE_UPDATE_FAIL,
  PROFILE_UPDATE_RESET,
  PASSWORD_UPDATE_REQUEST,
  PASSWORD_UPDATE_SUCCESS,
  PASSWORD_UPDATE_FAIL,
  PASSWORD_UPDATE_RESET,
} from "../../redux/constants/userConstants.js";
// **  Initial State
// const initialState = {
//   userData: {}
// }

export const LoginReducer = (state = {}, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { loading: true };
    case LOGIN_SUCCESS:
      return { loading: false, userData: action.payload };
    case LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case LOGIN_RESET: {
      return { loading: false, error: false };
    }
    // return {
    //   ...state,
    //   userData: action.data,
    //   [action.config.storageTokenKeyName]: action[action.config.storageTokenKeyName],
    //   [action.config.storageRefreshTokenKeyName]: action[action.config.storageRefreshTokenKeyName]
    // }
    case LOGOUT:
      const obj = { ...action };
      delete obj.type;
      return { ...state, userData: {}, ...obj };
    default:
      return state;
  }
};

export const SignupReducer = (state = {}, action) => {
  switch (action.type) {
    case SIGNUP_REQUEST:
      return { loading: true };
    case SIGNUP_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case SIGNUP_FAIL:
      return { loading: false, error: action.payload };
    case SIGNUP_RESET: {
      return { loading: false, error: false };
    }
    default:
      return state;
  }
};

export const forgotPasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case FORGOT_PASSWORD_REQUEST:
      return { loading: true };
    case FORGOT_PASSWORD_SUCCESS:
      return { loading: false, userData: action.payload };
    case FORGOT_PASSWORD_FAIL:
      return { loading: false, error: action.payload };
    case FORGET_RESET: {
      return { loading: false, error: false, success: false };
    }
    default:
      return state;
  }
};

export const verifyOtpReducer = (state = {}, action) => {
  switch (action.type) {
    case VERIFY_OTP_REQUEST:
      return { loading: true };
    case VERIFY_OTP_SUCCESS:
      return { loading: false, otpVerifying: action.payload };
    case VERIFY_OTP_FAIL:
      return { loading: false, success: false, error: action.payload };
    default:
      return state;
  }
};

export const changePasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case CHANGE_PASSWORD_REQUEST:
      return { loading: true };
    case CHANGE_PASSWORD_SUCCESS:
      return { loading: false, password: action.payload };
    case CHANGE_PASSWORD_FAIL:
      return { loading: false, error: action.payload };
    case CHANGE_PASSWORD_RESET:
      return { loading: false, error: false, success: false };
    default:
      return state;
  }
};

export const userProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case PROFILE_GET_REQUEST:
      return { loading: true };
    case PROFILE_GET_SUCCESS:
      return { loading: false, profile: action.payload };
    case PROFILE_GET_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const profileUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case PROFILE_UPDATE_REQUEST:
      return { loading: true };
    case PROFILE_UPDATE_SUCCESS:
      return { loading: false, profileUpdate: action.payload };
    case PROFILE_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case PROFILE_UPDATE_RESET:
      return { loading: false, error: false, success: false };
    default:
      return state;
  }
};

export const passwordUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case PASSWORD_UPDATE_REQUEST:
      return { loading: true };
    case PASSWORD_UPDATE_SUCCESS:
      return { loading: false, password: action.payload };
    case PASSWORD_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case PASSWORD_UPDATE_RESET:
      return { loading: false, error: false, success: false };
    default:
      return state;
  }
};
