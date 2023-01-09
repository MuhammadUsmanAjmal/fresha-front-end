// ** React Import
import { useState, useEffect } from "react";

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
// import { getCategory } from "../../../../redux/actions/categoryActions";
import {
  addClients,
  getClients,
} from "../../../../redux/actions/clientsActions";
import { toast, Slide } from "react-toastify";
import { ToastContent } from "../../components/ToastContent";
import { useParams } from "react-router-dom";
const SidebarNewUsers = ({
  handleAddEventSidebar,
  open,
  toggleSidebar,
  hideSidebar,
}) => {
  // ** States

  const addClient = useSelector((state) => state.addClient);
  const { loading } = addClient;
  const success = addClient?.Clients?.success;
  const error = addClient?.Clients?.error;

  // const { error } = addClient;

  // const catStore = useSelector((state) => state.getCategory);
  // const store = catStore?.categories;
  // ** Store Vars
  const dispatch = useDispatch();
  const { branchId, salonId } = useParams();
  // ** Vars
  const { register, errors, handleSubmit, reset } = useForm();
  // const [sidebarInput, setSidebarInput] = useState("");
  useEffect(() => {
    if (success) {
      reset();
      dispatch(getClients(branchId));
      hideSidebar();
      toast.success(<ToastContent success={addClient?.Clients?.message} />, {
        transition: Slide,
        hideProgressBar: true,
        autoClose: 2000,
      });
    }
    return () => {
      dispatch({ type: "CLIENTS_ADD_RESET" });
    };
  }, [success]);

  useEffect(() => {
    if (error) {
      toast.error(<ToastContent error={addClient?.Clients?.message} />, {
        transition: Slide,
        hideProgressBar: true,
        autoClose: 2000,
      });
    }
    return () => {
      dispatch({ type: "CLIENTS_ADD_RESET" });
    };
  }, [error]);

  // ** Function to handle form submit
  const onSubmit = (values) => {
    const obj = {
      fullName: values.userName,
      contactNumber: values.contactNumber,
      email: values.email,
      gender: values.gender,
      bio: values.bio,
      branchId: branchId,
      salonId: salonId,
    };
    dispatch(addClients(obj));
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
      title="New Client"
      headerClassName="mb-1"
      contentClassName="pt-0"
      toggleSidebar={handleAddEventSidebar}
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Label for="userName">
            UserName <span className="text-danger">*</span>
          </Label>
          <Input
            name="userName"
            id="userName"
            placeholder="Enter Name"
            innerRef={register({ required: true })}
            className={classnames({ "is-invalid": errors["userName"] })}
          />
        </FormGroup>
        <FormGroup>
          <Label for="email">
            Email <span className="text-danger">*</span>
          </Label>
          <Input
            type="email"
            name="email"
            id="email"
            placeholder="abc@gmail.com"
            innerRef={register({ required: true })}
            className={classnames({ "is-invalid": errors["email"] })}
          />
        </FormGroup>

        <FormGroup className="my-2">
          <Label for="Contact Number">
            Contact Number
            <span className="text-danger">*</span>
          </Label>
          <Input
            // value={phone}
            placeholder="0300 XXXX XXX"
            type="tel"
            inputMode="numeric"
            id="contactNumber"
            name="contactNumber"
            onChange={(event) => {
              const { value } = event.target;
              event.target.value = normalizeCardNumber(value);
            }}
            className={classnames({ "is-invalid": errors["contactNumber"] })}
            innerRef={register({
              required: true,
              validate: (value) => value !== "",
              pattern: /^(?!.*[A-Za-z]).*$/g,
            })}
          />
        </FormGroup>

        <FormGroup>
          <Label for="Gender">Gender</Label>
          <Input
            type="select"
            id="gender"
            name="gender"
            placeholder="Select Gender"
            innerRef={register({ required: true })}
            className={classnames({ "is-invalid": errors["gender"] })}
          >
            <option value="F">Female</option>
            <option value="M">Male</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="bio">
            bio <span className="text-danger">*</span>
          </Label>
          <Input
            type="textarea"
            name="bio"
            id="bio"
            placeholder="bio"
            innerRef={register({ required: true })}
            className={classnames({ "is-invalid": errors["bio"] })}
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
            <span>Submit</span>
          </Button>
          <Button
            type="reset"
            color="secondary"
            outline
            onClick={handleAddEventSidebar}
          >
            Cancel
          </Button>
        </div>
      </Form>
    </Sidebar>
  );
};

export default SidebarNewUsers;
