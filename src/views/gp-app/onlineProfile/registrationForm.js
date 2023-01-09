import { Fragment, useState, useContext, useEffect } from "react";
import { isObjEmpty, getHomeRouteForLoggedInUser } from "@utils";
import classnames from "classnames";
import PerfectScrollbar from "react-perfect-scrollbar";
import { useSkin } from "@hooks/useSkin";
import useJwt from "@src/auth/jwt/useJwt";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
// import { loginAction } from "@store/actions/userActions";
import { SignupAction } from "@store/actions/userActions";
import { Link, useHistory } from "react-router-dom";
import { AbilityContext } from "@src/utility/context/Can";
import InputPasswordToggle from "@components/input-password-toggle";
import { Facebook, Twitter, Mail, GitHub, Instagram, X } from "react-feather";
import {
  Row,
  Col,
  CardTitle,
  CardText,
  FormGroup,
  Label,
  Button,
  Form,
  Input,
  CustomInput,
  CardBody,
} from "reactstrap";

import "@styles/base/pages/page-auth.scss";
import { toast, Slide } from "react-toastify";
import { ToastContent } from "../components/ToastContent.js";
// import PlacesAutocomplete, {
//   geocodeByAddress,
//   getLatLng,
// } from "react-places-autocomplete";
import { event } from "jquery";
const Register = ({ toggleRegForm }) => {
  const [skin, setSkin] = useSkin();
  const [days, setDays] = useState([
    {
      day: "Monday",
      checked: true,
    },
    {
      day: "Tuesday",
      checked: true,
    },
    {
      day: "Wednesday",
      checked: true,
    },
    {
      day: "Thursday",
      checked: true,
    },
    {
      day: "Friday",
      checked: true,
    },
    {
      day: "Saturday",
      checked: true,
    },
    {
      day: "Sunday",
      checked: false,
    },
  ]);
  const [address, setAddress] = useState("");
  const handleChecked = (day) => {
    setDays(
      days.map((item) =>
        item.day === day ? { ...item, checked: !item.checked } : item
      )
    );
  };

  // const saloon_ID = Saloon?.SaloonInfo?.data?.id;

  const dispatch = useDispatch();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    getValues,
  } = useForm();

  const [step, setStep] = useState("1");
  const [value, setValue] = useState("");
  const [value1, setValue1] = useState("");

  const illustration = skin === "semi-dark" ? "login-img.svg" : "login-v2.svg",
    source = require(`@src/assets/images/pages/${illustration}`).default;

  const illustration0 =
      skin === "semi-dark" ? "logo-login.svg" : "login-v2.svg",
    source1 = require(`@src/assets/images/pages/${illustration0}`).default;

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

  const onSubmit = (data) => {
    console.log("This is a project developed by noobs");
  };

  // function for going to next step by increasing step state by 1
  const nextStep = (value) => {
    // setStep(step + 1);
    if (value.LocationName !== "" && value.Notes !== "") {
      setStep("3");
    } else if (value.startTime !== "" && value.endTime !== "") {
      setStep("4");
    } else {
      return toast.error(<ToastContent error={"Enter the Required Field"} />, {
        transition: Slide,
        hideProgressBar: true,
        autoClose: 2000,
      });
    }
  };

  // function for going to previous step by decreasing step state by 1
  const prevStep = (value) => {
    setStep(step - 1);
  };

  const normalizeCardNumber = (value) => {
    return (
      value
        .replace(/\s/g, "")
        .match(/.{1,4}/g)
        ?.join("")
        .substr(0, 11) || ""
    );
  };

  // const handleChange = (event) => {
  //   console.log(event.target.value);
  // };

  const handleSelect = (address) => {
    console.log(address);
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => console.log("Success", latLng))
      .catch((error) => console.error("Error", error));
  };

  return (
    <Fragment>
      <X
        onClick={() => {
          toggleRegForm("1");
        }}
      ></X>
      <div className="auth-wrapper auth-v2 ">
        <div className="auth-inner m-0">
          <PerfectScrollbar className="w-100">
            <Col
              className="d-flex align-items-center justify-content-center auth-bg px-5 p-lg-5"
              lg="12"
              sm="12"
            >
              <Col className="w-100" sm="8" md="6" lg="12">
                <CardTitle
                  tag="h3"
                  className=" text-dark font-weight-bold display-4 "
                >
                  Set up Beauty Profile
                </CardTitle>

                <Form
                  action="/"
                  className="auth-register-form my-2 "
                  onSubmit={handleSubmit(onSubmit)}
                >
                  {step === "1" && (
                    <div style={{ height: "100vh" }}>
                      <CardTitle
                        tag="h3"
                        className="text-dark font-weight-bold font-medium-5"
                      >
                        Add your business info
                      </CardTitle>
                      <FormGroup>
                        <Label
                          className="form-label text-dark font-weight-bold blockquote "
                          for="location-name"
                        >
                          Location name
                        </Label>

                        <Input
                          autoFocus
                          type="text"
                          placeholder="Enter Name"
                          id="register-LocationName"
                          name="LocationName"
                          defaultValue={value.LocationName}
                          className={classnames({
                            "is-invalid": errors["SaloonName"],
                          })}
                          innerRef={register({
                            required: true,
                            validate: (value) => value !== "",
                          })}
                        />
                        {errors.SaloonName?.type === "required" && (
                          <small className="text-danger">Required Field</small>
                        )}
                      </FormGroup>
                      <FormGroup>
                        <Label
                          className="form-label text-dark font-weight-bold blockquote "
                          for="location-phone"
                        >
                          Location contact Number
                        </Label>
                        <Input
                          placeholder="0300XXXXXXX"
                          type="tel"
                          inputMode="numeric"
                          id="location-phone"
                          name="phone"
                          defaultValue={value.phone}
                          onChange={(event) => {
                            const { value } = event.target;
                            event.target.value = normalizeCardNumber(value);
                          }}
                          className={classnames({
                            "is-invalid": errors["phone"],
                          })}
                          innerRef={register({
                            required: true,
                            validate: (value) => value !== "",
                            pattern: /^(?!.*[A-Za-z]).*$/g,
                          })}
                        />
                        {errors.phone?.type === "required" && (
                          <small className="text-danger">Required Field</small>
                        )}
                      </FormGroup>
                      <FormGroup>
                        <Label
                          className="form-label text-dark font-weight-bold blockquote "
                          for="register-username"
                        >
                          Location address
                        </Label>
                        <Input
                          type="text"
                          placeholder="Enter Address"
                          id="register-address"
                          name="address"
                          defaultValue={value.address}
                          className={classnames({
                            "is-invalid": errors["address"],
                          })}
                          innerRef={register({
                            required: true,
                            validate: (value) => value !== "",
                          })}
                        />
                        {errors.address?.type === "required" ? (
                          <small className="text-danger">Required Field</small>
                        ) : null}
                      </FormGroup>
                      <FormGroup>
                        <Label
                          className="form-label text-dark font-weight-bold blockquote "
                          for="location-email"
                        >
                          Location email
                        </Label>
                        <Input
                          type="email"
                          id="location-email"
                          name="email"
                          defaultValue={value.email}
                          placeholder="Enter Email"
                          className={classnames({
                            "is-invalid": errors["email"],
                          })}
                          innerRef={register({ required: false })}
                        />
                        {errors.email?.type === "required" ? (
                          <small className="text-danger">Required Field</small>
                        ) : null}
                      </FormGroup>

                      <FormGroup>
                        <Label
                          className="form-label text-dark font-weight-bold blockquote "
                          for="Notes"
                        >
                          Notes
                        </Label>
                        <Input
                          type="textarea"
                          name="Notes"
                          id="Notes"
                          rows="2"
                          defaultValue={value.Notes}
                          className={classnames({
                            "is-invalid": errors["Notes"],
                          })}
                          innerRef={register({ required: true })}
                          placeholder="Description..."
                        />
                      </FormGroup>

                      <Button.Ripple
                        block
                        type="button"
                        className="p-1 mt-2"
                        color="dark"
                        onClick={() => {
                          const values = getValues();
                          setValue(values);
                          nextStep(values);
                        }}
                      >
                        <small
                          className="blockquote font-weight-bold"
                          color="white"
                        >
                          Next
                        </small>
                      </Button.Ripple>
                    </div>
                  )}

                  {/* {step === 2 && (
                    <div>
                      <CardTitle
                        tag="h3"
                        className="text-dark font-weight-bold font-medium-5"
                      >
                        Where is your business located?
                      </CardTitle>
                      <PlacesAutocomplete
                        value={address}
                        onChange={(e) => {
                          setAddress(e);
                        }}
                        onSelect={handleSelect}
                      >
                        {({
                          getInputProps,
                          suggestions,
                          getSuggestionItemProps,
                          loading,
                        }) => (
                          <div>
                            <input
                              {...getInputProps({
                                placeholder: "Search Places ...",
                                className: "location-search-input",
                              })}
                            />
                            <div className="autocomplete-dropdown-container">
                              {loading && <div>Loading...</div>}
                              {suggestions.map((suggestion) => {
                                const className = suggestion.active
                                  ? "suggestion-item--active"
                                  : "suggestion-item";
                                // inline style for demonstration purpose
                                const style = suggestion.active
                                  ? {
                                      backgroundColor: "#fafafa",
                                      cursor: "pointer",
                                    }
                                  : {
                                      backgroundColor: "#ffffff",
                                      cursor: "pointer",
                                    };
                                return (
                                  <div
                                    {...getSuggestionItemProps(suggestion, {
                                      className,
                                      style,
                                    })}
                                  >
                                    <span>{suggestion.description}</span>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </PlacesAutocomplete>
                      <Button.Ripple
                        type="submit"
                        block
                        className="p-1"
                        color="dark"
                        onClick={() => {
                          const values = getValues();
                          setValue1(values);
                          prevStep();
                        }}
                      >
                        <small
                          className="blockquote font-weight-bold"
                          color="white"
                        >
                          Previous
                        </small>
                      </Button.Ripple>
                      <Button.Ripple
                        block
                        type="button"
                        className="p-1 mt-2"
                        color="dark"
                        onClick={() => {
                          const values = getValues();
                          setValue1(values);
                          nextStep(values);
                        }}
                      >
                        <small
                          className="blockquote font-weight-bold"
                          color="white"
                        >
                          Next
                        </small>
                      </Button.Ripple>
                    </div>
                  )} */}
                  {step === "3" && (
                    <div>
                      <CardTitle
                        tag="h3"
                        className="text-dark font-weight-bold font-medium-5"
                      >
                        Add your opening hours
                      </CardTitle>
                      <CardBody>
                        <Row>
                          <Col>
                            {days.map((item, index) => {
                              return (
                                <>
                                  <div className="custom-control custom-checkbox border-bottom border-2 rounded p-2 m-1  w-100">
                                    <Row>
                                      <Col lg="5">
                                        <div
                                          className="custom-control custom-checkbox"
                                          style={{
                                            padding: "10px 0",
                                            // borderBottom: "1px solid #e6e6e6",
                                            display: "flex",
                                            alignItems: "center",
                                          }}
                                        >
                                          <CustomInput
                                            type="checkbox"
                                            checked={item.checked}
                                            label={item?.day}
                                            id={index}
                                            onChange={() =>
                                              handleChecked(item?.day)
                                            }
                                          />
                                        </div>
                                      </Col>
                                      {item.checked ? (
                                        <>
                                          <Col lg="3">
                                            <div
                                              className="custom-control custom-checkbox"
                                              style={{
                                                padding: "4px 0",
                                                // borderBottom: "1px solid #e6e6e6",
                                                display: "flex",
                                                alignItems: "center",
                                              }}
                                            >
                                              <FormGroup>
                                                <Input
                                                  required
                                                  id="startTime"
                                                  name="startTime"
                                                  type="time"
                                                  defaultValue="08:00"
                                                  className="form-control"
                                                  innerRef={register({
                                                    required: true,
                                                  })}
                                                />
                                              </FormGroup>
                                            </div>
                                          </Col>
                                          <Col lg="3">
                                            <div
                                              className="custom-control custom-checkbox"
                                              style={{
                                                padding: "4px 0",
                                                // borderBottom: "1px solid #e6e6e6",
                                                display: "flex",
                                                alignItems: "center",
                                              }}
                                            >
                                              <FormGroup>
                                                <Input
                                                  required
                                                  id="endTime"
                                                  name="endTime"
                                                  type="time"
                                                  defaultValue="22:00"
                                                  className="form-control"
                                                  innerRef={register({
                                                    required: true,
                                                  })}
                                                />
                                              </FormGroup>
                                            </div>
                                          </Col>
                                        </>
                                      ) : (
                                        "Closed"
                                      )}
                                    </Row>
                                  </div>
                                </>
                              );
                            })}
                          </Col>
                        </Row>
                      </CardBody>

                      <Button.Ripple
                        type="submit"
                        block
                        className="p-1"
                        color="dark"
                        onClick={() => {
                          const values = getValues();
                          setValue1(values);
                          prevStep();
                        }}
                      >
                        <small
                          className="blockquote font-weight-bold"
                          color="white"
                        >
                          Previous
                        </small>
                      </Button.Ripple>
                      <Button.Ripple
                        block
                        type="button"
                        className="p-1 mt-2"
                        color="dark"
                        onClick={() => {
                          const values = getValues();
                          setValue1(values);
                          nextStep(values);
                        }}
                      >
                        <small
                          className="blockquote font-weight-bold"
                          color="white"
                        >
                          Next
                        </small>
                      </Button.Ripple>
                    </div>
                  )}
                  {step === "4" && (
                    <div>
                      <CardTitle
                        tag="h3"
                        className="text-dark font-weight-bold font-medium-5"
                      >
                        Add your business photos
                      </CardTitle>
                      <CardBody></CardBody>
                    </div>
                  )}
                </Form>
              </Col>
            </Col>
          </PerfectScrollbar>
        </div>
      </div>
    </Fragment>
  );
};

export default Register;
