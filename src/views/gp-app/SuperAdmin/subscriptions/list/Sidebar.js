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
import { ToastContent } from "../../../components/ToastContent";
import {
  addSubscription,
  getSubscription,
} from "../../../../../redux/actions/subscriptionAction";
const SidebarNewUsers = ({ open, toggleSidebar, hideSidebar }) => {
  // ** States
  const Subscription = useSelector((state) => state.addSubscription);
  const { loading } = Subscription;
  const success = Subscription?.subscription?.success;
  const error = Subscription?.subscription?.error;

  // ** Store Vars
  const dispatch = useDispatch();
  useEffect(() => {
    if (success) {
      reset();
      dispatch(getSubscription());
      hideSidebar();
      toast.success(
        <ToastContent success={Subscription?.subscription?.message} />,
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
      toast.error(<ToastContent error={error} />, {
        transition: Slide,
        hideProgressBar: true,
        autoClose: 2000,
      });
    }
    return () => {
      dispatch({ type: "SUBSCRIPTION_ADD_RESET" });
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
      subscriptionTitle: data.subscriptionTitle,
      description: data.description,
      price: data.price,
      expiresInMonth: data.expiryDate,
      numberOfBranches: data.branches,
    };
    dispatch(addSubscription(Data));
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
      title="New Subscription"
      headerClassName="mb-1"
      contentClassName="pt-0"
      toggleSidebar={toggleSidebar}
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Label className="form-label  " for="subscriptionTitle">
            Subscription Title<span className="text-danger">*</span>
          </Label>

          <Input
            autoFocus
            type="text"
            placeholder="Title"
            id="subscriptionTitle"
            name="subscriptionTitle"
            className={classnames({
              "is-invalid": errors["subscriptionTitle"],
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
            description
          </Label>
          <Input
            type="textarea"
            placeholder="Provide description"
            id="description"
            name="description"
            className={classnames({
              "is-invalid": errors["description"],
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
          <Label for="price">
            Price <span className="text-danger">*</span>
          </Label>
          <Input
            name="price"
            id="price"
            placeholder="PKR 100"
            type="number"
            innerRef={register({ required: true })}
            className={classnames({ "is-invalid": errors["price"] })}
          />
        </FormGroup>
        <FormGroup>
          <Label for="branches">
            No. Branches <span className="text-danger">*</span>
          </Label>
          <Input
            name="branches"
            id="branches"
            placeholder="05"
            type="number"
            innerRef={register({ required: true })}
            className={classnames({ "is-invalid": errors["branches"] })}
          />
        </FormGroup>
        <FormGroup>
          <Label for="expiryDate">
            Expires In(Months) <span className="text-danger">*</span>
          </Label>
          <Input
            name="expiryDate"
            id="expiryDate"
            placeholder="12"
            type="number"
            innerRef={register({ required: true })}
            className={classnames({ "is-invalid": errors["expiryDate"] })}
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
