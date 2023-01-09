// ** React Import
import { useEffect, useState, useRef } from "react";
import React, { Component } from "react";
// ** Custom Components
import Sidebar from "@components/sidebar";
// import { toast, Slide } from "react-toastify";

// ** Third Party Components
import classnames from "classnames";
import { useForm } from "react-hook-form";
import { Button, FormGroup, Label, Form, Input, Spinner } from "reactstrap";

// ** Store & Actions
import { useDispatch, useSelector } from "react-redux";
// import { getSubscription } from "../../../../../redux/actions/subscriptionAction";
import {
  getSubscription,
  updateSubscriptionAction,
} from "../../../../../redux/actions/subscriptionAction";
// import { ToastContent } from "../../components/ToastContent";
import { toast, Slide } from "react-toastify";
import { ToastContent } from "../../../components/ToastContent";
const SidebarUpdateService = ({ open, toggleSidebar, Data, hideSidebar }) => {
  // ** States

  //   console.log("Data in sidebar", Data);
  const SubscriptionUpdate = useSelector((state) => state.updateSubscription);
  const { loading } = SubscriptionUpdate;
  const updateSuccess = SubscriptionUpdate?.subscription?.success;
  const updateError = SubscriptionUpdate?.subscription?.error;
  //   console.log("console in sidebar update", SubscriptionUpdate?.update?.message);s

  //   const catStore = useSelector((state) => state.getCategory);
  //   const store = catStore?.categories;
  // ** Store Vars
  const dispatch = useDispatch();

  // ** Vars
  const { register, errors, handleSubmit, reset } = useForm();
  const InfoData = JSON.parse(localStorage.getItem("userData"));

  useEffect(() => {
    if (updateSuccess) {
      dispatch(getSubscription());
      reset();
      hideSidebar();
      toast.success(
        <ToastContent success={SubscriptionUpdate?.subscription?.message} />,
        {
          transition: Slide,
          hideProgressBar: true,
          autoClose: 2000,
        }
      );
    }
    return () => {
      dispatch({ type: "SUBSCRIPTION_UPDATE_RESET" });
    };
  }, [updateSuccess]);
  useEffect(() => {
    if (updateError) {
      toast.error(
        <ToastContent error={SubscriptionUpdate?.subscription?.message} />,
        {
          transition: Slide,
          hideProgressBar: true,
          autoClose: 2000,
        }
      );
    }

    return () => {
      dispatch({ type: "SUBSCRIPTION_UPDATE_RESET" });
    };
  }, [updateError]);
  // ** Function to handle form submit
  const onSubmit = (data) => {
    const OBJ = {
      subscriptionTitle: data.subscriptionTitle,
      description: data.description,
      price: data.price,
      expiresInMonth: data.expiryDate,
      numberOfBranches: data?.branches,
    };
    dispatch(updateSubscriptionAction(Data?._id, OBJ));
  };

  return (
    <Sidebar
      size="lg"
      open={open}
      title="Edit Subscription"
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
            defaultValue={Data?.subscriptionTitle}
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
            defaultValue={Data?.description}
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
            defaultValue={Data?.price}
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
            defaultValue={Data?.numberOfBranches}
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
            defaultValue={Data?.expiresInMonth}
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
            <span>Update</span>
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

export default SidebarUpdateService;
