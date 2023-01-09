import { useState, useContext, Fragment, useEffect } from "react";
import classnames from "classnames";
import Avatar from "@components/avatar";
import { useSkin } from "@hooks/useSkin";
import useJwt from "@src/auth/jwt/useJwt";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { toast, Slide } from "react-toastify";
import { loginAction } from "@store/actions/userActions";
import { AbilityContext } from "@src/utility/context/Can";
import { Link, useHistory } from "react-router-dom";
import InputPasswordToggle from "@components/input-password-toggle";
import { getHomeRouteForLoggedInUser, isObjEmpty } from "@utils";

import {
  Alert,
  Row,
  Col,
  CardTitle,
  CardText,
  Form,
  Input,
  FormGroup,
  Label,
  CustomInput,
  Button,
  UncontrolledTooltip,
  Spinner,
} from "reactstrap";
// import  {ReactComponent as FacebookLogo} from '@src/assets/images/icons/facebook-icon.svg'
import "@styles/base/pages/page-auth.scss";
import { ToastContent } from "../components/ToastContent";
// const ToastContent = ({ name, role, success, error }) => (
//   <Fragment>
//     {error && (
//       <>
//         <div className="toastify-header">
//           <div className="title-wrapper">
//             <Avatar
//               size="sm"
//               color="danger"
//               icon={<AlertTriangle size={12} />}
//             />
//             <h6 className="toast-title font-weight-bold"> {error}</h6>
//           </div>
//         </div>
//       </>
//     )}
//   </Fragment>
// );

const Login = (props) => {
  const [skin, setSkin] = useSkin();
  const ability = useContext(AbilityContext);
  const dispatch = useDispatch();
  const LoginInfo = useSelector((state) => state.Login);
  const { loading } = LoginInfo;
  const LoginSuccess = LoginInfo?.userData?.success;
  const error = LoginInfo?.userData?.error;
  // console.log(LoginInfo?.userData?.success);
  const history = useHistory();

  useEffect(() => {
    if (LoginSuccess) {
      // ability.update([
      //   {
      //     action: "manage",
      //     subject: "all",
      //   },
      // ]);
      // reset();
      // window.history.go("/");
      // document.location.href = "/app";
      if (LoginInfo?.userData?.data?.token) {
        // history.push("/app");
        // history.push(
        getHomeRouteForLoggedInUser(LoginInfo?.userData?.data?.role);
        // );
      }
      reset();
      toast.success(
        <ToastContent
          name={LoginInfo?.userData?.data?.fullName}
          role={LoginInfo?.userData?.data?.role}
          SuccessLogin
        />,
        {
          toastId: "success1",
          transition: Slide,
          hideProgressBar: true,
          autoClose: 2000,
        }
      );
    }
  }, [LoginSuccess]);

  useEffect(() => {
    if (error) {
      toast.error(<ToastContent error={LoginInfo?.userData?.message} />, {
        transition: Slide,
        hideProgressBar: true,
        autoClose: 2000,
      });
    }
    return () => {
      dispatch({ type: "LOGIN_RESET" });
    };
  }, [error]);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const illustration = skin === "semi-dark" ? "login-img.svg" : "login-v2.svg",
    source = require(`@src/assets/images/pages/${illustration}`).default;

  const illustration0 =
      skin === "semi-dark" ? "Logo-Beauty-black.svg" : "login-v2.svg",
    source1 = require(`@src/assets/images/logo/${illustration0}`).default;

  const illustration1 =
      skin === "semi-dark" ? "facebook-icon.svg" : "login-v2.svg",
    logo1 = require(`@src/assets/images/icons/${illustration1}`).default;

  const illustration2 =
      skin === "semi-dark" ? "gmail-icon.svg" : "login-v2.svg",
    logo2 = require(`@src/assets/images/icons/${illustration2}`).default;
  const illustration3 =
      skin === "semi-dark" ? "twitter-icon.svg" : "login-v2.svg",
    logo3 = require(`@src/assets/images/icons/${illustration3}`).default;
  const illustration4 =
      skin === "semi-dark" ? "instagram-icon.svg" : "login-v2.svg",
    logo4 = require(`@src/assets/images/icons/${illustration4}`).default;

  // const normalizeCardNumber = (value) => {
  //   return (
  //     value
  //       .replace(/\s/g, "")
  //       .match(/.{1,4}/g)
  //       ?.join(" ")
  //       .substr(0, 13) || ""
  //   );
  // };

  const onSubmit = (data) => {
    dispatch(loginAction({ email: data.email, password: data.password }));
  };

  return (
    <div className="auth-wrapper auth-v2">
      <Row className="auth-inner m-0 ">
        <Link
          className="brand-logo "
          to="/"
          onClick={(e) => e.preventDefault()}
        >
          <img
            className="img-fluid"
            src={source1}
            alt="Login V2"
            style={{ width: 220 }}
          />
        </Link>
        <Col className="d-none d-lg-flex align-items-center p-5" lg="8" sm="12">
          <div className="w-100 d-lg-flex align-items-center justify-content-center px-5">
            <img className="img-fluid" src={source} alt="Login V2" />
          </div>
        </Col>
        <Col
          className=" d-flex align-items-center auth-bg px-2 p-lg-5 bg-warning"
          lg="4"
          sm="12"
        >
          <Col className="px-xl-2 mx-auto" sm="8" md="6" lg="12">
            <CardTitle className=" mb-10 text-dark font-weight-bold display-3">
              Sign In
            </CardTitle>
            <CardText className="mb-2 text-dark font-weight-bold display-5 ">
              {" "}
              Please sign-in to your account to access
            </CardText>

            <Form
              className="auth-login-form mt-2"
              onSubmit={handleSubmit(onSubmit)}
            >
              <FormGroup className="my-2">
                <Label className="form-label text-dark font-weight-bold blockquote ">
                  Email
                </Label>
                <Input
                  type="email"
                  id="register-email"
                  name="email"
                  placeholder="Enter Email"
                  className={classnames({
                    "is-invalid": errors["email"],
                  })}
                  innerRef={register({ required: true })}
                />
              </FormGroup>
              {/* <FormGroup className="my-2">
                <Label className="form-label text-dark font-weight-bold blockquote ">
                  Contact Number
                </Label>
                <Input
                  // value={phone}
                  placeholder="0300 XXXX XXX"
                  type="tel"
                  inputMode="numeric"
                  id="login-phone"
                  name="phone"
                  onChange={(event) => {
                    const { value } = event.target;
                    event.target.value = normalizeCardNumber(value);
                  }}
                  className={classnames({ "is-invalid": errors["phone"] })}
                  innerRef={register({
                    required: true,
                    validate: (value) => value !== "",
                    pattern: /^(?!.*[A-Za-z]).*$/g,
                  })}
                /> */}
              {/* <Input
                  autoFocus
                  type='text'
                  value={username}
                  id='login-username'
                  name='login-username'
                  // mailto:placeholder='john@example.com'
                  onChange={e => setUsername(e.target.value)}
                  className={classnames({ 'is-invalid': errors['login-username'] })}
                  innerRef={register({ required: true, validate: value => value !== '' })}
                /> */}
              {/* </FormGroup> */}
              <FormGroup className="my-2">
                <div className="d-flex justify-content-between">
                  <Label
                    className="form-label text-dark font-weight-bold blockquote  "
                    for="login-password"
                  >
                    Password
                  </Label>
                </div>
                <InputPasswordToggle
                  // value={password}
                  id="login-password"
                  name="password"
                  placeholder="........"
                  // className='input-group-merge'
                  // onChange={e => setPassword(e.target.value)}
                  className={classnames({
                    "is-invalid input-group-merge ": errors["password"],
                  })}
                  innerRef={register({
                    required: true,
                    validate: (value) => value !== "",
                  })}
                />
                {/* <InputPasswordToggle
                  value={password}
                  id='login-password'
                  name='login-password'
                  // className='input-group-merge'
                  onChange={e => setPassword(e.target.value)}
                  className={classnames({ 'is-invalid': errors['login-password'] })}
                  innerRef={register({ required: true, validate: value => value !== '' })}
                /> */}
              </FormGroup>
              <FormGroup>
                <CustomInput
                  type="checkbox"
                  id="remember-me"
                  name="remember-me"
                  value="remember-me"
                  className="custom-control-dark my-2"
                >
                  <label className="text-dark font-small-4 align-center  font-weight-bold">
                    Remember Me
                  </label>
                  {/* <Link to="/forgot-password">
                    <small className="float-right text-dark font-weight-bold font-small-4">
                      Forgot Password?
                    </small>
                  </Link> */}
                </CustomInput>

                {/* <CustomInput
                  type='checkbox'
                  className='custom-control-dark justify-content-center '
                  id='remember-me'  >
                  <large className='text-dark  font-weight-bold blockquote'>Remember Me</large>
                </CustomInput> */}
              </FormGroup>
              <Button.Ripple
                type="submit"
                color="dark"
                className="p-1 -d-flex align-items-center"
                block
              >
                {loading && (
                  <Spinner className="mr-50" color="white" size="sm" />
                )}

                <small className="blockquote font-weight-bold">Sign In </small>
              </Button.Ripple>
            </Form>

            {/* <div className='divider my-2'>
              <div className='divider-text font-medium-1 text-dark font-weight-bold blockquote'>or</div>
            </div>
            <div className='auth-footer-btn d-flex justify-content-center'>
              <Link href='/'>  
              <img width={40} src={logo1} alt='Login V2' className=' mr-2' />
            </Link>
              <Link href='/'>  
              <img width={40} src={logo2} alt='Login V2' className=' mr-2' />
            </Link>
              <Link href='/'>  
              <img width={40} src={logo3} alt='Login V2' className='  mr-2' />
            </Link>
              <Link href='/'>  
              <img width={40} src={logo4} alt='Login V2' className=' mr-2' />
            </Link>
              
            </div> */}
          </Col>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
