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
  addSupplier,
  getSupplier,
} from "../../../../../../redux/actions/supplierActions";

// import PhoneInput from "react-phone-number-input/input";

const SidebarNewUsers = ({ open, toggleSidebar, hideSidebar }) => {
  // ** States
  const Supplier = useSelector((state) => state.addSupplier);
  const { loading } = Supplier;
  const success = Supplier?.Supplier?.success;
  const error = Supplier?.Supplier?.error;
  const locale = JSON.parse(localStorage.getItem("userData"));
  const salonID = locale?.data?.salonId;
  // const [phone, setPhone] = useState();
  // ** Store Vars
  const dispatch = useDispatch();
  useEffect(() => {
    if (success) {
      reset();
      dispatch(getSupplier(salonID));
      hideSidebar();
      toast.success(<ToastContent success={Supplier?.Supplier?.message} />, {
        toastId: "success1",
        transition: Slide,
        hideProgressBar: true,
        autoClose: 2000,
      });
    }
    return () => {
      dispatch({ type: "SUPPLIER_ADD_RESET" });
    };
  }, [success]);

  useEffect(() => {
    if (error) {
      toast.error(<ToastContent error={Supplier?.Supplier?.message} />, {
        transition: Slide,
        hideProgressBar: true,
        autoClose: 2000,
      });
    }
    return () => {
      dispatch({ type: "SUPPLIER_ADD_RESET" });
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
      supplierName: data.supplierName,
      supplierDescription: data.supplierdescription,
      contactNumber: data.mobileNumber,
      email: data.email,
      website: data.website,
      address: data.address,
    };
    // console.log("data in supplier", Data);
    dispatch(addSupplier(Data));
  };
  const normalizeCardNumber = (value) => {
    return (
      value
        .replace(/\s/g, "")
        .match(/.{1,4}/g)
        ?.join(" ")
        .substr(0, 13) || ""
    );
  };

  return (
    <Sidebar
      size="lg"
      open={open}
      title="Add Supplier"
      headerClassName="mb-1"
      contentClassName="pt-0"
      toggleSidebar={toggleSidebar}
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Label className="form-label  " for="subscriptionTitle">
            Supplier Name<span className="text-danger">*</span>
          </Label>

          <Input
            autoFocus
            type="text"
            placeholder="name"
            id="supplierName"
            name="supplierName"
            className={classnames({
              "is-invalid": errors["supplierName"],
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
          <Label className="form-label " for="description">
            Supplier description
          </Label>
          <Input
            type="textarea"
            placeholder="Provide description"
            id="supplierdescription"
            name="supplierdescription"
            className={classnames({
              "is-invalid": errors["supplierdescription"],
            })}
            innerRef={register({
              required: false,
              validate: (value) => value !== "",
            })}
          />{" "}
          {errors.address?.type === "required" ? (
            <small className="text-danger">Required Field</small>
          ) : null}
        </FormGroup>
        <FormGroup>
          <Label for="Mobile number">
            Mobile number <span className="text-danger">*</span>
          </Label>

          <Input
            // value={phone}
            placeholder="0300 XXXX XXX"
            type="tel"
            inputMode="numeric"
            name="mobileNumber"
            id="Mobile number"
            onChange={(event) => {
              const { value } = event.target;
              event.target.value = normalizeCardNumber(value);
            }}
            className={classnames({ "is-invalid": errors["mobileNumber"] })}
            innerRef={register({
              required: true,
              validate: (value) => value !== "",
              pattern: /^(?!.*[A-Za-z]).*$/g,
            })}
          />
        </FormGroup>
        <FormGroup>
          <Label for="Email">
            Email (optional) <span className="text-danger"></span>
          </Label>
          <Input
            name="email"
            id="email"
            placeholder="mail@example.com"
            innerRef={register({ required: false })}
            className={classnames({ "is-invalid": errors["Email"] })}
          />
        </FormGroup>
        <FormGroup>
          <Label for="website">
            Website (optional) <span className="text-danger"></span>
          </Label>
          <Input
            name="website"
            id="website"
            placeholder="www.abc.com"
            innerRef={register({ required: false })}
            className={classnames({ "is-invalid": errors["website"] })}
          />
        </FormGroup>
        <FormGroup>
          <Label className="form-label " for="description">
            Address
          </Label>
          <Input
            type="textarea"
            placeholder="address"
            id="address"
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
