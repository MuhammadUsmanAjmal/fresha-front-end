// ** React Import
import { useEffect, useState } from "react";

// ** Custom Components
import Sidebar from "@components/sidebar";

// ** Third Party Components
import classnames from "classnames";
import { useForm } from "react-hook-form";
import {
  Button,
  FormGroup,
  Label,
  Form,
  Input,
  CustomInput,
  Spinner,
} from "reactstrap";

// ** Store & Actions
import { useDispatch, useSelector } from "react-redux";
// import { getClients } from "../../../../redux/actions/clientsActions";
import {
  updateClientsAction,
  getClients,
} from "../../../../redux/actions/clientsActions";
import { toast, Slide } from "react-toastify";
import { ToastContent } from "../../components/ToastContent";
const SidebarUpdateClients = ({ open, toggleSidebar, hideSidebar, data }) => {
  // ** States
  const ClientsUpdate = useSelector((state) => state.updateClient);
  const { loading } = ClientsUpdate;
  const updateSuccess = ClientsUpdate?.Clients?.success;
  const updateError = ClientsUpdate?.Clients?.error;
  // ** Store Vars
  const dispatch = useDispatch();

  // // ** Vars
  const { register, errors, handleSubmit, reset } = useForm();
  const InfoData = JSON.parse(localStorage.getItem("userData"));

  useEffect(() => {
    if (updateSuccess) {
      reset();
      dispatch(getClients(InfoData?.data?.branchId));
      hideSidebar();
      toast.success(
        <ToastContent success={ClientsUpdate?.Clients?.message} />,
        {
          transition: Slide,
          hideProgressBar: true,
          autoClose: 2000,
        }
      );
    }
    return () => {
      dispatch({ type: "CLIENTS_UPDATE_RESET" });
    };
  }, [updateSuccess]);

  useEffect(() => {
    if (updateError) {
      toast.error(<ToastContent error={updateError} />, {
        transition: Slide,
        hideProgressBar: true,
        autoClose: 2000,
      });
    }
    return () => {
      dispatch({ type: "CLIENTS_UPDATE_RESET" });
    };
  }, [updateError]);
  // ** Function to handle form submit
  const onSubmit = (values) => {
    const updateObj = {
      clientId: data?._id,
      fullName: values.userName,
      contactNumber: values.contactNumber,
      email: values.email,
      bio: values.bio,
      gender: values.gender,
      branchId: InfoData?.data.branchId,
    };
    // debugger;
    dispatch(updateClientsAction(data?._id, updateObj));
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
      title="Update Client"
      headerClassName="mb-1"
      contentClassName="pt-0"
      toggleSidebar={toggleSidebar}
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Label for="userName">
            UserName <span className="text-danger">*</span>
          </Label>
          <Input
            name="userName"
            id="userName"
            defaultValue={data?.fullName}
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
            defaultValue={data?.email}
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
            defaultValue={data?.contactNumber}
            onChange={(event) => {
              const { value } = event.target;
              event.target.value = normalizeCardNumber(value);
            }}
            className={classnames("form-control", {
              "is-invalid": errors["contactNumber"],
            })}
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
            defaultValue={data?.gender}
            innerRef={register({ required: true })}
            className={classnames({ "is-invalid": errors["gender"] })}
          >
            <option value="F">Female</option>
            <option value="M">Male</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="bio">
            bio <span>(optional)</span>
          </Label>
          <Input
            type="textarea"
            name="bio"
            id="bio"
            defaultValue={data?.bio}
            innerRef={register({ required: false })}
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
            onClick={toggleSidebar}
          >
            Cancel
          </Button>
        </div>
      </Form>
    </Sidebar>
  );
};

export default SidebarUpdateClients;
