// ** React Import
import { useState, useEffect } from "react";

// ** Custom Components
import Sidebar from "@components/sidebar";

// ** Utils

// ** Third Party Components
import classnames from "classnames";
import { useForm } from "react-hook-form";
import {
  Button,
  FormGroup,
  Label,
  FormText,
  Form,
  Input,
  CustomInput,
  Spinner,
} from "reactstrap";
import InputPasswordToggle from "@components/input-password-toggle";
// ** Store & Actions
import { useDispatch, useSelector } from "react-redux";
import { SignupAction } from "../../../../../redux/actions/userActions";
import { toast, Slide } from "react-toastify";
import { ToastContent } from "../../../components/ToastContent";
import { getSalonAction } from "../../../../../redux/actions/saloonActions";
const SidebarNewUsers = ({ open, toggleSidebar, hideSidebar }) => {
  // ** States
  const Saloon = useSelector((state) => state.Signup);
  const { loading } = Saloon;
  const success = Saloon?.userInfo?.success;
  const error = Saloon?.userInfo?.error;
  const SalonAdmin = JSON.parse(localStorage.getItem("userData"));
  const PhoneNumber = SalonAdmin?.data?.contactNumber;
  // ** Store Vars
  const dispatch = useDispatch();
  useEffect(() => {
    if (success) {
      reset();
      dispatch(getSalonAction(PhoneNumber));
      hideSidebar();
      toast.success(<ToastContent success={Saloon?.userInfo?.message} />, {
        toastId: "success1",
        transition: Slide,
        hideProgressBar: true,
        autoClose: 2000,
      });
    }
  }, [success]);

  useEffect(() => {
    if (error) {
      toast.error(<ToastContent error={Saloon?.userInfo?.message} />, {
        transition: Slide,
        hideProgressBar: true,
        autoClose: 2000,
      });
    }
    return () => {
      dispatch({ type: "SIGNUP_RESET" });
    };
  }, [error]);
  // ** Vars
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  // ** Function to handle form submit
  const onSubmit = (data) => {
    const Data = {
      salonTitle: data.SaloonName,
      branchLocation: data.address,
      contactNumber: data.phone,
      fullName: data.fullName,
      email: data.email,
      password: data.password,
    };
    // console.log(Data);
    dispatch(SignupAction(Data));
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

  return (
    <Sidebar
      size="lg"
      open={open}
      title="New Salon"
      headerClassName="mb-1"
      contentClassName="pt-0"
      toggleSidebar={toggleSidebar}
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Label className="form-label  " for="register-fullName">
            Salon Name<span className="text-danger">*</span>
          </Label>

          <Input
            autoFocus
            type="text"
            placeholder="Enter Name"
            id="register-SaloonName"
            name="SaloonName"
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
          <Label className="form-label " for="register-username">
            Address<span className="text-danger">*</span>
          </Label>
          <Input
            type="text"
            placeholder="Enter Address"
            id="register-address"
            name="address"
            className={classnames({
              "is-invalid": errors["address"],
            })}
            innerRef={register({
              required: true,
              validate: (value) => value !== "",
            })}
          />{" "}
          {errors.address?.type === "required" ? (
            <small className="text-danger">Required Field</small>
          ) : null}
        </FormGroup>

        <FormGroup>
          <Label className="form-label " for="register-username">
            Full Name<span className="text-danger">*</span>
          </Label>
          <Input
            type="text"
            placeholder="Full Name"
            id="register-fullName"
            name="fullName"
            className={classnames({
              "is-invalid": errors["fullName"],
            })}
            innerRef={register({
              required: true,
              validate: (value) => value !== "",
            })}
          />{" "}
          {errors.firstName?.type === "required" ? (
            <small className="text-danger">Required Field</small>
          ) : null}
        </FormGroup>
        <FormGroup>
          <Label className="form-label " for="register-phone">
            Contact Number<span className="text-danger">*</span>
          </Label>
          <Input
            placeholder="0300XXXXXXX"
            type="tel"
            inputMode="numeric"
            id="register-phone"
            name="phone"
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
          />{" "}
          {errors.phone?.type === "required" && (
            <small className="text-danger">Required Field</small>
          )}
        </FormGroup>
        <FormGroup>
          <Label className="form-label " for="register-email">
            Email<span className="text-danger">*</span>
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
          {errors.email?.type === "required" ? (
            <small className="text-danger">Required Field</small>
          ) : null}
        </FormGroup>
        <FormGroup>
          <Label className="form-label ">Password</Label>
          <span className="text-danger">*</span>
          <InputPasswordToggle
            id="register-password"
            name="password"
            className={classnames({
              "is-invalid input-group-merge": errors["password"],
            })}
            innerRef={register({
              required: true,
              validate: (value) => value !== "",
            })}
          />
        </FormGroup>

        <div className="d-flex">
          <Button
            type="submit"
            className="mr-1 button_slide slide_right d-flex align-items-center
"
            color="dark"
          >
            {loading && <Spinner className="mr-50" color="white" size="sm" />}
            <span>Create</span>
          </Button>
          <Button
            type="reset"
            color="secondary"
            outline
            onClick={toggleSidebar}
          >
            Cancel
          </Button>
        </div>
      </Form>
    </Sidebar>
  );
};

export default SidebarNewUsers;
