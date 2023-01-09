// ** React Import
import { useState, useEffect } from "react";

// ** Custom Components
import Sidebar from "@components/sidebar";
import Select, { components } from "react-select";

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
import {
  addSalonSubscriptionAction,
  getSalonSubscriptionList,
} from "../../../../../redux/actions/subscriptionAction";
const SidebarNewUsers = ({ open, toggleSidebar, hideSidebar }) => {
  // ** States
  const dispatch = useDispatch();
  const [subscription, setSubscription] = useState();
  const [salon, setSalon] = useState();
  const subscriptionData = useSelector((state) => state.getSubscription);
  const subscriptionList = subscriptionData?.subscription?.data;

  const SalonInformation = useSelector((state) => state.salonDetail);
  const SalonListing = SalonInformation?.SalonsInfo?.data;
  const addSalonSubscription = useSelector(
    (state) => state.addSalonSubscription
  );
  const { loading } = addSalonSubscription;
  const addSuccess = addSalonSubscription?.subscriptionSalons?.success;
  const addError = addSalonSubscription?.subscriptionSalons?.error;
  useEffect(() => {
    if (addSuccess) {
      reset();
      dispatch(getSalonSubscriptionList());
      hideSidebar();
      toast.success(
        <ToastContent
          success={addSalonSubscription?.subscriptionSalons?.message}
        />,
        {
          transition: Slide,
          hideProgressBar: true,
          autoClose: 2000,
        }
      );
    }
    return () => {
      dispatch({ type: "SALON_SUBSCRIPTION_ADD_RESET" });
    };
  }, [addSuccess]);

  useEffect(() => {
    if (addError) {
      reset();
      toast.error(
        <ToastContent
          error={addSalonSubscription?.subscriptionSalons?.message}
        />,
        {
          transition: Slide,
          hideProgressBar: true,
          autoClose: 2000,
        }
      );
    }
    return () => {
      dispatch({ type: "SALON_SUBSCRIPTION_ADD_RESET" });
    };
  }, [addError]);
  let subOptions = [];
  subscriptionList?.forEach((item) => {
    let obj = {};
    obj["label"] =
      item?.subscriptionTitle +
      " - PKR " +
      item?.price +
      " / " +
      item?.expiresInMonth +
      " Months";
    obj["value"] = item?._id;
    subOptions.push(obj);
  });

  let salonOptions = [];
  SalonListing?.forEach((item) => {
    let obj = {};
    obj["label"] = item?.salonTitle;
    obj["value"] = item?._id;
    salonOptions.push(obj);
  });
  // console.log("salonOptions", salonOptions);
  let price = [];

  // ** Vars
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  // ** Function to handle form submit
  const onSubmit = () => {
    const Obj = {
      salonId: salon,
      subscriptionId: subscription,
    };
    dispatch(addSalonSubscriptionAction(Obj));
  };
  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      borderBottom: "1px solid gray",
      color: "gray",

      padding: 20,
    }),

    menu: (provided, state) => ({
      ...provided,
      zIndex: 99999,
    }),
  };
  return (
    <Sidebar
      size="lg"
      open={open}
      title="Salon Subscription"
      headerClassName="mb-1"
      contentClassName="pt-0"
      toggleSidebar={toggleSidebar}
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Label className="form-label  " for="register-salon">
            Select Salon <span className="text-danger">*</span>
          </Label>
          <Select
            styles={customStyles}
            options={salonOptions}
            id="salon"
            name="salon"
            placeholder="Choose Salon"
            classNamePrefix="select"
            onChange={(v) => {
              setSalon(v.value);
            }}
            innerRef={register({ required: true })}
            className={classnames({
              "is-invalid ": errors["salon"],
            })}
          ></Select>
        </FormGroup>
        <FormGroup>
          <Label className="form-label  " for="register-sub">
            Select Subscription <span className="text-danger">*</span>
          </Label>
          <Select
            styles={customStyles}
            options={subOptions}
            id="subscription"
            name="subscription"
            placeholder="Choose Subscription"
            classNamePrefix="select"
            onChange={(v) => {
              setSubscription(v.value);
            }}
            innerRef={register({ required: true })}
            className={classnames({
              "is-invalid ": errors["subscription"],
            })}
          ></Select>
        </FormGroup>

        <div className="d-flex">
          <Button
            type="submit"
            className="mr-1 button_slide slide_right d-flex align-items-center
"
            color="dark"
          >
            {loading && <Spinner className="mr-50" color="white" size="sm" />}

            <span>Add</span>
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
