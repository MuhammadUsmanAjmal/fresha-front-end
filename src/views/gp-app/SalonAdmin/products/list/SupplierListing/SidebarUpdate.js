// ** React Import
import { useEffect, useState, useRef } from "react";
import React, { Component } from "react";
// ** Custom Components
import Sidebar from "@components/sidebar";
// import { toast, Slide } from "react-toastify";
import { ToastContent } from "../../../../components/ToastContent";

// ** Third Party Components
import classnames from "classnames";
import { useForm } from "react-hook-form";
import { Button, FormGroup, Label, Form, Input, Spinner } from "reactstrap";

// ** Store & Actions
import { useDispatch, useSelector } from "react-redux";

import {
  getSupplier,
  updateSupplier,
} from "../../../../../../redux/actions/supplierActions";
import { toast, Slide } from "react-toastify";
const SidebarUpdateService = ({ open, toggleSidebar, Data, hideSidebar }) => {
  const SupplierUpdate = useSelector((state) => state.updateSupplier);
  const { loading } = SupplierUpdate;
  const updateSuccess = SupplierUpdate?.Supplier?.success;
  const updateError = SupplierUpdate?.Supplier?.error;
  const locale = JSON.parse(localStorage.getItem("userData"));
  const salonID = locale?.data?.salonId;
  // ** Store Vars
  const dispatch = useDispatch();

  // ** Vars
  const { register, errors, handleSubmit, reset } = useForm();

  useEffect(() => {
    if (updateSuccess) {
      dispatch(getSupplier(salonID));
      reset();
      hideSidebar();
      toast.success(
        <ToastContent success={SupplierUpdate?.Supplier?.message} />,
        {
          transition: Slide,
          hideProgressBar: true,
          autoClose: 2000,
        }
      );
    }
    return () => {
      dispatch({ type: "SUPPLIER_UPDATE_RESET" });
    };
  }, [updateSuccess]);
  useEffect(() => {
    if (updateError) {
      toast.error(<ToastContent error={SupplierUpdate?.Supplier?.message} />, {
        transition: Slide,
        hideProgressBar: true,
        autoClose: 2000,
      });
    }

    return () => {
      dispatch({ type: "SUPPLIER_UPDATE_RESET" });
    };
  }, [updateError]);
  // ** Function to handle form submit
  const onSubmit = (data) => {
    const OBJ = {
      // salonId: salonID,
      supplierName: data.supplierName,
      supplierDescription: data.supplierdescription,
      contactNumber: data.mobileNumber,
      email: data.email,
      website: data.website,
      address: data.address,
    };
    // console.log("updated Data", OBJ);
    dispatch(updateSupplier(Data?._id, OBJ));
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
      title="Edit Supplier"
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
            defaultValue={Data?.supplierName}
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
            defaultValue={Data?.supplierDescription}
            className={classnames({
              "is-invalid": errors["supplierdescription"],
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
          <Label for="Mobile number">
            Mobile number <span className="text-danger">*</span>
          </Label>

          {/* <PhoneInput country="PK" value={phone} onChange={setPhone} /> */}
          <Input
            // value={phone}
            placeholder="0300 XXXX XXX"
            type="tel"
            inputMode="numeric"
            name="mobileNumber"
            id="Mobile number"
            defaultValue={Data?.contactNumber}
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
            type="email"
            defaultValue={Data?.email}
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
            defaultValue={Data?.website}
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
            defaultValue={Data?.address}
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
            <span>update</span>
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
