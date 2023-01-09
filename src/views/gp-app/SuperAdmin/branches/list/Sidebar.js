// ** React Import
import { useState, useEffect } from "react";

// ** Custom Components
import Sidebar from "@components/sidebar";

// ** Third Party Components
import classnames from "classnames";
import { useForm } from "react-hook-form";
import { Button, FormGroup, Label, Form, Input, Spinner } from "reactstrap";
import InputPasswordToggle from "@components/input-password-toggle";
// ** Store & Actions
import { useDispatch, useSelector } from "react-redux";
import { toast, Slide } from "react-toastify";
import { ToastContent } from "../../../components/ToastContent";
import {
  createBranchAction,
  getBranchesAclAction,
  getBranchesAction,
} from "../../../../../redux/actions/branchActions";
import { useParams } from "react-router-dom";
const SidebarNewUsers = ({ open, toggleSidebar, hideSidebar }) => {
  // ** States
  const { salonId } = useParams();
  const Branch = useSelector((state) => state.createBranch);
  const { loading } = Branch;
  const success = Branch?.createBranchDetail?.success;
  const error = Branch?.createBranchDetail?.error;

  // ** Store Vars
  const dispatch = useDispatch();
  useEffect(() => {
    if (success) {
      reset();
      dispatch(getBranchesAclAction(salonId, ""));
      hideSidebar();
      toast.success(
        <ToastContent success={Branch?.createBranchDetail?.message} />,
        {
          toastId: "success1",
          transition: Slide,
          hideProgressBar: true,
          autoClose: 2000,
        }
      );
    }
  }, [success]);

  useEffect(() => {
    if (error) {
      toast.error(
        <ToastContent error={Branch?.createBranchDetail?.message} />,
        {
          transition: Slide,
          hideProgressBar: true,
          autoClose: 2000,
        }
      );
    }
    return () => {
      dispatch({ type: "BRANCH_CREATE_RESET" });
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
    const today = new Date(Date.now());

    const Data = {
      branchTitle: data.branchTitle,
      branchLocation: data.address,
      contactNumber: data.phone,
      fullName: data.fullName,
      email: data.email,
      password: data.password,
      lastModifiedDate: today.toLocaleDateString(),
    };
    dispatch(createBranchAction(salonId, Data));
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
      title="New Branch"
      headerClassName="mb-1"
      contentClassName="pt-0"
      toggleSidebar={toggleSidebar}
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Label className="form-label  " for="register-branchTitle">
            Branch Title<span className="text-danger">*</span>
          </Label>

          <Input
            autoFocus
            type="text"
            placeholder="Enter Name"
            id="register-branchTitle"
            name="branchTitle"
            className={classnames({
              "is-invalid": errors["branchTitle"],
            })}
            innerRef={register({
              required: true,
              validate: (value) => value !== "",
            })}
          />
          {errors.branchTitle?.type === "required" && (
            <small className="text-danger">Required Field</small>
          )}
        </FormGroup>

        <FormGroup>
          <Label className="form-label " for="register-address">
            Address
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
          <Label className="form-label " for="register-fullName">
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
          {errors.fullName?.type === "required" ? (
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
            innerRef={register({ required: false })}
          />
          {errors.email?.type === "required" ? (
            <small className="text-danger">Required Field</small>
          ) : null}
        </FormGroup>
        <FormGroup>
          <Label className="form-label ">Password</Label>
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
