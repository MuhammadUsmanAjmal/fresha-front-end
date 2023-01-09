// ** React Import
import { useState, useEffect } from "react";

// ** Custom Components
import Sidebar from "@components/sidebar";

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
import {
  getCategory,
  updateCatAction,
} from "../../../../redux/actions/categoryActions";
import { ToastContent } from "../../components/ToastContent";
import { toast, Slide } from "react-toastify";
import { getServices } from "../../../../redux/actions/servicesActions";
const SidebarUpdateCategory = ({ open, toggleSidebar, data, hideSidebar }) => {
  // ** States
  const [role, setRole] = useState("subscriber");
  const [plan, setPlan] = useState("basic");
  const updateCat = useSelector((state) => state.updateCategory);
  const { loading } = updateCat;
  const updateSuccess = updateCat?.updateCate?.success;
  const updateError = updateCat?.updateCate?.error;
  // console.log(update);
  // ** Store Vars
  const dispatch = useDispatch();
  const InfoData = JSON.parse(localStorage.getItem("userData"));

  useEffect(() => {
    if (updateSuccess) {
      reset();
      dispatch(getServices(InfoData?.data?.branchId));
      hideSidebar();
      toast.success(<ToastContent success={updateCat?.updateCate?.message} />, {
        transition: Slide,
        hideProgressBar: true,
        autoClose: 2000,
      });
    }
    return () => {
      dispatch({ type: "CATEGORY_UPDATE_RESET" });
    };
  }, [updateSuccess]);

  useEffect(() => {
    if (updateError) {
      reset();
      toast.error(<ToastContent error={updateCat?.updateCate?.message} />, {
        transition: Slide,
        hideProgressBar: true,
        autoClose: 2000,
      });
    }
    return () => {
      dispatch({ type: "CATEGORY_UPDATE_RESET" });
    };
  }, [updateError]);
  // ** Vars
  const { register, errors, handleSubmit, reset } = useForm();

  // ** Function to handle form submit
  const onSubmit = (value) => {
    const obj = {
      categoryId: data?._id,
      newCategoryTitle: value?.Category_Title,
      isActive: value?.languages == "Active" ? true : false,
    };
    dispatch(updateCatAction(data?._id, obj));
  };

  return (
    <Sidebar
      size="lg"
      open={open}
      title="Update Category"
      headerClassName="mb-1"
      contentClassName="pt-0"
      toggleSidebar={toggleSidebar}
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Label for="Category Title">
            Category Title <span className="text-danger">*</span>
          </Label>
          <Input
            name="Category_Title"
            id="Category_Title"
            placeholder="Enter Category Title"
            defaultValue={data?.categoryTitle}
            innerRef={register({ required: true })}
            className={classnames({ "is-invalid": errors["Category_Title"] })}
          />
        </FormGroup>

        <Label for="Status">Status</Label>
        <FormGroup>
          <CustomInput
            type="checkbox"
            id="Active"
            name="languages"
            value="Active"
            defaultChecked={data?.isActive}
            label="Active"
            innerRef={register({ required: false })}
            className={classnames({
              "is-invalid  custom-control-secondary": errors["Active"],
            })}
            // checked={true}
          />
        </FormGroup>
        {/* <FormGroup check>
          <Input
            type="radio"
            id="Inactive"
            name="languages"
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

export default SidebarUpdateCategory;
