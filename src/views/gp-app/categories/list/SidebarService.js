// ** React Import
import { useEffect, Fragment } from "react";

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

// ** Store & Actions
import { useDispatch, useSelector } from "react-redux";
import { getCategory } from "../../../../redux/actions/categoryActions";
import {
  addServices,
  getServices,
} from "../../../../redux/actions/servicesActions";
import { SortingArray } from "../../../../utility/Utils";
import { toast, Slide } from "react-toastify";
import { ToastContent } from "../../components/ToastContent";
const SidebarNewService = ({ Data, open, toggleSidebar, hideSidebar }) => {
  // ** States
  const updateCat = useSelector((state) => state.updateCategory);
  const updateCatSuccess = updateCat?.updateCate?.success;

  const addCat = useSelector((state) => state.addCategory);
  const addCatSuccess = addCat?.categories?.success;

  const addService = useSelector((state) => state.addServices);
  const { loading } = addService;
  const success = addService?.services?.success;
  const error = addService?.services?.error;
  // const { error } = addService;
  // console.log(error);
  const catStore = useSelector((state) => state.getCategory);
  const store = catStore?.categories;

  // ** Store Vars
  const dispatch = useDispatch();

  // ** Vars
  const { register, errors, handleSubmit, reset } = useForm();

  const InfoData = JSON.parse(localStorage.getItem("userData"));

  useEffect(() => {
    if (updateCatSuccess || addCatSuccess) {
      dispatch(getCategory(InfoData?.data?.branchId));
    }
  }, [updateCatSuccess, addCatSuccess]);

  useEffect(() => {
    if (success) {
      dispatch(getServices(InfoData?.data?.branchId));
      reset();
      hideSidebar();
      toast.success(<ToastContent success={addService?.services?.message} />, {
        transition: Slide,
        hideProgressBar: true,
        autoClose: 2000,
      });
    }
    return () => {
      dispatch({ type: "SERVICES_RESET" });
    };
  }, [success]);
  useEffect(() => {
    if (error) {
      reset();
      toast.error(<ToastContent error={addService?.services?.message} />, {
        transition: Slide,
        hideProgressBar: true,
        autoClose: 2000,
      });
    }
    return () => {
      dispatch({ type: "SERVICES_RESET" });
    };
  }, [error]);

  // ** Function to handle form submit
  const onSubmit = (values) => {
    const Data = {
      categoryId: values.category,
      serviceTitle: values.serviceName,
      duration: values.duration,
      price: values.price,
      isMaleAllowed: values.male,
      isFemaleAllowed: values.female,
      isActive: values.status,
    };
    dispatch(addServices(Data));
  };

  return (
    <Sidebar
      size="lg"
      open={open}
      title="New Service"
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
            placeholder="Hair cut"
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
            placeholder="select category"
            innerRef={register({ required: true })}
            className={classnames({ "is-invalid": errors["category"] })}
          >
            {Data ? (
              <option value={Data?._id}>{Data?.categoryTitle}</option>
            ) : (
              store &&
              store?.data?.map((data) => {
                return <option value={data?._id}>{data.categoryTitle}</option>;
              })
            )}
          </Input>
        </FormGroup>

        <FormGroup>
          <Label for="duration">Service Duration</Label>
          <Input
            type="select"
            id="duration"
            name="duration"
            placeholder="select duration"
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
        <FormGroup>
          <CustomInput
            type="checkbox"
            id="female"
            name="female"
            // value="female"
            label="Female"
            defaultChecked
            innerRef={register({ required: false })}
            className={classnames({
              "is-invalid custom-control-secondary": errors["female"],
            })}
          />
          {/* </FormGroup>
        <FormGroup> */}
          <CustomInput
            type="checkbox"
            id="male"
            name="male"
            // value="male"
            label="Male"
            defaultChecked
            innerRef={register({ required: false })}
            className={classnames({
              "is-invalid custom-control-secondary": errors["male"],
            })}
          />
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
            innerRef={register({ required: true })}
            className={classnames({ "is-invalid": errors["price"] })}
          />
        </FormGroup>
        <Label for="Status">Status</Label>
        <FormGroup>
          <CustomInput
            type="checkbox"
            id="Active"
            name="status"
            // value="Active"
            label="Active"
            innerRef={register({ required: true })}
            className={classnames({
              "is-invalid custom-control-secondary ": errors["Active"],
            })}
            checked={true}
          />
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
        <div className="d-flex">
          <Button
            type="submit"
            className="mr-1 button_slide slide_right d-flex align-items-center"
            color="dark"
          >
            {loading && <Spinner className="mr-50" color="white" size="sm" />}
            <span>Submit</span>
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

export default SidebarNewService;
