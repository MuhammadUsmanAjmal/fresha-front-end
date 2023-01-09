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
  getProdCatAction,
  updateProdCatAction,
} from "../../../../../../redux/actions/prodCategoryAction";
import { ToastContent } from "../../../../components/ToastContent";
import { toast, Slide } from "react-toastify";

const SidebarUpdateService = ({ open, toggleSidebar, Data, hideSidebar }) => {
  // ** States

  //   console.log("Data in sidebar", Data);
  const updateCategory = useSelector((state) => state.updateProdCategory);
  const { loading } = updateCategory;
  const updateSuccess = updateCategory?.ProdCat?.success;
  const updateError = updateCategory?.ProdCat?.error;
  const success = updateCategory?.ProdCat?.success;
  const error = updateCategory?.ProdCat?.error;
  const locale = JSON.parse(localStorage.getItem("userData"));
  const salonID = locale?.data?.salonId;
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
      dispatch(getProdCatAction(salonID));
      reset();
      hideSidebar();
      toast.success(
        <ToastContent success={updateCategory?.ProdCat?.message} />,
        {
          transition: Slide,
          hideProgressBar: true,
          autoClose: 2000,
        }
      );
    }
    return () => {
      // dispatch({ type: "SUBSCRIPTION_UPDATE_RESET" });
    };
  }, [updateSuccess]);
  useEffect(() => {
    if (updateError) {
      toast.error(<ToastContent error={updateCategory?.ProdCat?.message} />, {
        transition: Slide,
        hideProgressBar: true,
        autoClose: 2000,
      });
    }

    return () => {
      dispatch({ type: "PRODCATEGORY_UPDATE_RESET" });
    };
  }, [updateError]);
  // ** Function to handle form submit
  const onSubmit = (data) => {
    const OBJ = {
      categoryName: data.categoryName,
      salonId: salonID,
    };
    // console.log("updated Data", OBJ);
    dispatch(updateProdCatAction(Data?._id, OBJ));
  };

  return (
    <Sidebar
      size="lg"
      open={open}
      title="Edit Category"
      headerClassName="mb-1"
      contentClassName="pt-0"
      toggleSidebar={toggleSidebar}
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Label className="form-label  " for="categoryName">
            Category Name<span className="text-danger">*</span>
          </Label>

          <Input
            autoFocus
            type="text"
            placeholder="Name"
            id="categoryName"
            name="categoryName"
            defaultValue={Data?.categoryName}
            className={classnames({
              "is-invalid": errors["categoryName"],
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
