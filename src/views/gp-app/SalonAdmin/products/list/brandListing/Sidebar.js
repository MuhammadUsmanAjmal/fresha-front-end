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
import { toast, Slide } from "react-toastify";
import { ToastContent } from "../../../../components/ToastContent";
import {
  addBrand,
  getBrand,
} from "../../../../../../redux/actions/brandAction";
const SidebarNewUsers = ({ open, toggleSidebar, hideSidebar }) => {
  // ** States
  const Brand = useSelector((state) => state.addBrand);
  const { loading } = Brand;
  const success = Brand?.Brand?.success;
  const error = Brand?.Brand?.error;
  const locale = JSON.parse(localStorage.getItem("userData"));
  const salonID = locale?.data?.salonId;
  // ** Store Vars
  const dispatch = useDispatch();
  useEffect(() => {
    if (success) {
      reset();
      dispatch(getBrand(salonID));
      hideSidebar();
      toast.success(<ToastContent success={Brand?.Brand?.message} />, {
        toastId: "success1",
        transition: Slide,
        hideProgressBar: true,
        autoClose: 2000,
      });
    }
  }, [success]);

  useEffect(() => {
    if (error) {
      toast.error(<ToastContent error={error} />, {
        transition: Slide,
        hideProgressBar: true,
        autoClose: 2000,
      });
    }
    return () => {
      dispatch({ type: "BRAND_ADD_RESET" });
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
      salonId: salonID,
      brandName: data.brandName,
    };
    console.log(Data);
    dispatch(addBrand(Data));
  };
  // const normalizeCardNumber = (value) => {
  //   return (
  //     value
  //       .replace(/\s/g, "")
  //       .match(/.{1,4}/g)
  //       ?.join("")
  //       .substr(0, 11) || ""
  //   );
  // };

  return (
    <Sidebar
      size="lg"
      open={open}
      title="Add Brand"
      headerClassName="mb-1"
      contentClassName="pt-0"
      toggleSidebar={toggleSidebar}
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Label className="form-label  " for="brandName">
            Brand Name<span className="text-danger">*</span>
          </Label>

          <Input
            autoFocus
            type="text"
            placeholder="Title"
            id="brandName"
            name="brandName"
            className={classnames({
              "is-invalid": errors["brandName"],
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
