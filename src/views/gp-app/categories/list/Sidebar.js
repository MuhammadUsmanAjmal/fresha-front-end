// ** React Import
import { useState, useEffect, Fragment } from "react";

// ** Custom Components
import Sidebar from "@components/sidebar";
// ** Utils
import { isObjEmpty } from "@utils";

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
  addCategory,
  getCategory,
} from "../../../../redux/actions/categoryActions";
import { toast, Slide } from "react-toastify";
import { ToastContent } from "../../components/ToastContent";
import { getServices } from "../../../../redux/actions/servicesActions";

const SidebarNewUsers = ({ open, toggleSidebar, hideSidebar }) => {
  // ** States

  const addCat = useSelector((state) => state.addCategory);
  const { loading } = addCat;
  const error = addCat?.categories?.error;
  const success = addCat?.categories?.success;
  // ** Store Vars
  const dispatch = useDispatch();

  const InfoData = JSON.parse(localStorage.getItem("userData"));
  useEffect(() => {
    if (success) {
      reset();
      dispatch(getServices(InfoData?.data?.branchId));
      hideSidebar();
      toast.success(<ToastContent success={addCat?.categories?.message} />, {
        transition: Slide,
        hideProgressBar: true,
        autoClose: 2000,
      });
    }
    return () => {
      dispatch({ type: "CATEGORY_RESET" });
    };
  }, [success]);

  useEffect(() => {
    if (error) {
      reset();
      toast.error(<ToastContent error={addCat?.categories?.message} />, {
        transition: Slide,
        hideProgressBar: true,
        autoClose: 2000,
      });
    }
    return () => {
      dispatch({ type: "CATEGORY_RESET" });
    };
  }, [error]);

  // ** Vars
  const { register, errors, handleSubmit, reset } = useForm();

  // ** Function to handle form submit
  const onSubmit = (data) => {
    const Obj = {
      categoryTitle: data.Category_Title,
      branchId: InfoData?.data.branchId,
      isActive: data.languages == "Active" ? true : false,
    };
    dispatch(addCategory(Obj));
  };

  return (
    <Sidebar
      size="lg"
      open={open}
      title="New Category"
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
            innerRef={register({ required: true })}
            className={classnames({ "is-invalid": errors["Category_Title"] })}
          />
        </FormGroup>

        <Label for="Status">Status</Label>
        <FormGroup>
          <CustomInput
            type="checkbox"
            id="secondary"
            label="Active"
            name="languages"
            value="Active"
            innerRef={register({ required: false })}
            className={classnames({
              "is-invalid custom-control-secondary": errors["Active"],
            })}
            checked={true}
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
        {/* <FormGroup>
          <Label for="email">
            Email <span className="text-danger">*</span>
          </Label>
          <Input
            type="email"
            name="email"
            id="email"
            mailto:placeholder="john.doe@example.com"
            innerRef={register({ required: true })}
            className={classnames({ "is-invalid": errors["email"] })}
          />
          <FormText color="muted">
            You can use letters, numbers & periods
          </FormText>
        </FormGroup>
        <FormGroup>
          <Label for="company">
            Company <span className="text-danger">*</span>
          </Label>
          <Input
            name="company"
            id="company"
            placeholder="Company Pvt Ltd"
            innerRef={register({ required: true })}
            className={classnames({ "is-invalid": errors["company"] })}
          />
        </FormGroup>
        <FormGroup>
          <Label for="country">
            Country <span className="text-danger">*</span>
          </Label>
          <Input
            name="country"
            id="country"
            placeholder="Australia"
            innerRef={register({ required: true })}
            className={classnames({ "is-invalid": errors["country"] })}
          />
        </FormGroup>
        <FormGroup>
          <Label for="contact">
            Contact <span className="text-danger">*</span>
          </Label>
          <Input
            name="contact"
            id="contact"
            placeholder="(397) 294-5153"
            innerRef={register({ required: true })}
            className={classnames({ "is-invalid": errors["contact"] })}
          />
        </FormGroup>
        <FormGroup>
          <Label for="user-role">User Role</Label>
          <Input
            type="select"
            id="user-role"
            name="user-role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="subscriber">Subscriber</option>
            <option value="editor">Editor</option>
            <option value="maintainer">Maintainer</option>
            <option value="author">Author</option>
            <option value="admin">Admin</option>
          </Input>
        </FormGroup>
        <FormGroup
          className="mb-2"
          value={plan}
          onChange={(e) => setPlan(e.target.value)}
        >
          <Label for="select-plan">Select Plan</Label>
          <Input type="select" id="select-plan" name="select-plan">
            <option value="basic">Basic</option>
            <option value="enterprise">Enterprise</option>
            <option value="company">Company</option>
            <option value="team">Team</option>
          </Input>
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

export default SidebarNewUsers;
