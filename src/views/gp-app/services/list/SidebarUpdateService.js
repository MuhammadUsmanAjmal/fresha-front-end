// ** React Import
import { useEffect, useState } from "react";

// ** Custom Components
import Sidebar from "@components/sidebar";

// ** Third Party Components
import classnames from "classnames";
import { useForm } from "react-hook-form";
import { Button, FormGroup, Label, Form, Input } from "reactstrap";

// ** Store & Actions
import { useDispatch, useSelector } from "react-redux";
import { getCategory } from "../../../../redux/actions/categoryActions";
import {
  getServices,
  updateServiceAction,
} from "../../../../redux/actions/servicesActions";
import { ToastContent } from "../../components/ToastContent";
import { toast, Slide } from "react-toastify";
const SidebarUpdateService = ({ open, toggleSidebar, Data, hideSidebar }) => {
  // ** States

  const ServicesUpdate = useSelector((state) => state.updateService);
  const updateSuccess = ServicesUpdate?.update?.success;
  // console.log(ServicesUpdate?.update?.message);

  const catStore = useSelector((state) => state.getCategory);
  const store = catStore?.categories;
  // ** Store Vars
  const dispatch = useDispatch();

  // ** Vars
  const { register, errors, handleSubmit, reset } = useForm();
  const InfoData = JSON.parse(localStorage.getItem("userData"));

  useEffect(() => {
    dispatch(getCategory(InfoData?.data?.branchId));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      dispatch(getServices(InfoData?.data?.branchId));
      reset();
      hideSidebar();
      toast.success(
        <ToastContent success={ServicesUpdate?.update?.message} />,
        {
          transition: Slide,
          hideProgressBar: true,
          autoClose: 2000,
        }
      );
    }
    return () => {
      dispatch({ type: "SERVICES_UPDATE_RESET" });
    };
  }, [updateSuccess]);
  // ** Function to handle form submit
  const onSubmit = (values) => {
    const updateObj = {
      serviceId: Data?._id,
      serviceTitle: values.serviceName,
      duration: values.duration,
      price: values.price,
      isActive: values.status === "Active" ? true : false,
      isMaleAllowed: values.male === "male" ? true : false,
      isFemaleAllowed: values.female === "female" ? true : false,
    };
    dispatch(updateServiceAction(updateObj));
  };

  return (
    <Sidebar
      size="lg"
      open={open}
      title="New User"
      headerClassName="mb-1"
      contentClassName="pt-0"
      toggleSidebar={toggleSidebar}
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Label for="serviceName">
            Service Name <span className="text-danger">*</span>
          </Label>
          <Input
            name="serviceName"
            id="serviceName"
            placeholder="Enter Service"
            defaultValue={Data?.serviceTitle}
            innerRef={register({ required: true })}
            className={classnames({ "is-invalid": errors["serviceName"] })}
          />
        </FormGroup>
        <FormGroup>
          <Label for="category_type">Category</Label>
          <Input
            type="select"
            id="category"
            name="category"
            innerRef={register({ required: true })}
            className={classnames({ "is-invalid": errors["category"] })}
          >
            {store &&
              store?.data?.map((data) => {
                switch (Data.categoryId) {
                  case data?._id:
                    return (
                      <option value={data?._id}>{data?.categoryTitle}</option>
                    );
                }
                // return <option value={data?._id}>{data?.categoryTitle}</option>;
              })}
          </Input>
        </FormGroup>

        <FormGroup>
          <Label for="duration">Service Duration</Label>
          <Input
            type="select"
            id="duration"
            name="duration"
            innerRef={register({ required: true })}
            className={classnames({ "is-invalid": errors["duration"] })}
          >
            <option value="30">30 Minutes</option>
            <option value="45">45 Minutes</option>
            <option value="60">01 Hour</option>
            <option value="90">1.5 Hours</option>
            <option value="120">02 Hours</option>
            <option value="150">2.5 Hours</option>
            <option value="180">03 Hours</option>
          </Input>
        </FormGroup>

        <Label check for="Service Available For">
          Service Available For
        </Label>
        <FormGroup check>
          <Input
            type="checkbox"
            id="male"
            name="male"
            value="male"
            innerRef={register({ required: false })}
            className={classnames({ "is-invalid": errors["male"] })}
          />
          <Label check for="male">
            Male
          </Label>
        </FormGroup>
        <FormGroup check>
          <Input
            type="checkbox"
            id="female"
            name="female"
            value="female"
            innerRef={register({ required: false })}
            className={classnames({ "is-invalid": errors["female"] })}
          />
          <Label check for="female">
            female
          </Label>
        </FormGroup>
        {/* <FormGroup check>
          <Input
            type="checkbox"
            id="both"
            name="language"
            value="both"
            innerRef={register({ required: false })}
            className={classnames({ "is-invalid": errors["both"] })}
          />
          <Label check for="both">
            both
          </Label>
        </FormGroup> */}
        <br></br>
        {/* <FormGroup>
          <Label for="exampleTime">Time</Label>
          <Input
            id="exampleTime"
            name="time"
            placeholder="time placeholder"
            type="time"
            defaultValue="1"
            innerRef={register({ required: true })}
            className={classnames({ "is-invalid": errors["time"] })}
          />
        </FormGroup> */}
        {/* <FormGroup>
          <Label for="staff">Staff </Label>
          <Input
            type="select"
            id="staff"
            name="staff"
            placeholder="Assign Team Members"
            innerRef={register({ required: true })}
            className={classnames({ "is-invalid": errors["staff"] })}
          >
            <option value="Usman">Usman</option>
            <option value="Haider">Haider</option>
            <option value="Hanan">Hanan</option>
          </Input>
        </FormGroup> */}
        <FormGroup>
          <Label for="price">
            Price <span className="text-danger">*</span>
          </Label>
          <Input
            name="price"
            id="price"
            placeholder="PKR 100"
            type="number"
            defaultValue={Data?.price}
            innerRef={register({ required: true })}
            className={classnames({ "is-invalid": errors["price"] })}
          />
        </FormGroup>
        <Label for="Status">Status</Label>
        <FormGroup check>
          <Input
            type="radio"
            id="Active"
            name="status"
            value="Active"
            innerRef={register({ required: false })}
            className={classnames({ "is-invalid": errors["Active"] })}
          />
          <Label check for="Active">
            Active
          </Label>
        </FormGroup>
        {/* <FormGroup check>
          <Input
            type="radio"
            id="Inactive"
            name="status"
            value="Inactive"
            innerRef={register({ required: false })}
            className={classnames({ "is-invalid": errors["Inactive"] })}
          />
          <Label check for="Inactive">
            Inactive
          </Label>
        </FormGroup> */}
        <br></br>
        <div className="d-flex">
          <Button
            type="submit"
            className="mr-1 button_slide slide_right"
            color="dark"
          >
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
