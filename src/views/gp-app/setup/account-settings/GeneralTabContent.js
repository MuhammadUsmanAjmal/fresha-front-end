import { Fragment, useEffect, useState } from "react";
import classnames from "classnames";
import { useForm, Controller } from "react-hook-form";
import {
  Button,
  Media,
  Label,
  Row,
  Col,
  Input,
  FormGroup,
  Alert,
  Form,
  Spinner,
} from "reactstrap";
import { Link } from "react-router-dom";
import defaultAvatar from "@src/assets/images/avatars/avatar-blank.png";
import { useDispatch, useSelector } from "react-redux";
import {
  getProfileAction,
  updateProfileAction,
} from "../../../../redux/actions/userActions";
import { useHistory } from "react-router-dom";
import { toast, Slide } from "react-toastify";
import { ToastContent } from "../../components/ToastContent";
const GeneralTabs = ({ data }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const Profile = useSelector((state) => state.updateProfileInfo);
  const { loading } = Profile;
  const success = Profile?.profileUpdate?.success;
  const error = Profile?.profileUpdate?.error;
  const { register, errors, handleSubmit } = useForm();
  const Data = JSON.parse(localStorage.getItem("userData"));
  const UserId = Data?.data?.id;
  // console.log(Info?.[0]?.fullName);
  useEffect(() => {
    if (success) {
      toast.success(
        <ToastContent success={Profile?.profileUpdate?.message} />,
        {
          transition: Slide,
          hideProgressBar: true,
          autoClose: 2000,
        }
      );
      history.push("/");

      dispatch(getProfileAction(UserId));
    }
    // return () => {
    //   dispatch({ type: "PROFILE_UPDATE_RESET" });
    // };
  }, [success]);
  useEffect(() => {
    if (error) {
      toast.error(<ToastContent error={Profile?.profileUpdate?.message} />, {
        transition: Slide,
        hideProgressBar: true,
        autoClose: 2000,
      });
    }
    return () => {
      dispatch({ type: "PROFILE_UPDATE_RESET" });
    };
  }, [error]);
  const onSubmit = (value, event) => {
    event.preventDefault();
    dispatch(updateProfileAction(UserId, value));
  };
  // const [image, setImage] = useState();

  // const onChange = (e) => {
  //   const reader = new FileReader(),
  //     files = e.target.files;
  //   console.log(reader);
  //   // reader.onload = function () {
  //   //   setAvatar(reader.result);
  //   // };
  //   setImage(files[0].name);
  //   // reader?.readAsDataURL(files[0]);
  // };
  return (
    <Fragment>
      {/* <Media>
        <Media className="mr-25" left>
          <Media
            object
            className="rounded mr-50"
            src={defaultAvatar}
            alt="Generic placeholder image"
            height="80"
            width="80"
          />
        </Media>
        <Media className="mt-75 ml-1" body>
          <Button.Ripple
            tag={Label}
            className="mr-75"
            size="sm"
            color="primary"
          >
            Upload
            <Input type="file" onChange={onChange} hidden accept="image/*" />
          </Button.Ripple>
          <Button.Ripple color="secondary" size="sm" outline>
            Reset
          </Button.Ripple>
          <p>Allowed JPG, GIF or PNG. Max size of 800kB</p>
        </Media>
      </Media> */}
      <Form className="mt-2" onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col sm="6">
            <FormGroup>
              <Label for="fullName">FullName</Label>
              <Input
                id="fullName"
                name="fullName"
                defaultValue={data?.[0]?.fullName}
                innerRef={register({ required: true })}
                className={classnames({
                  "is-invalid": errors.fullName,
                })}
              />
            </FormGroup>
          </Col>
          <Col sm="6">
            <FormGroup>
              <Label for="contactNumber">Contact Number</Label>
              <Input
                // defaultValue="03XX XXXX XXX"
                id="contactNumber"
                name="contactNumber"
                defaultValue={data?.[0]?.contactNumber}
                innerRef={register({ required: true })}
                className={classnames({
                  "is-invalid": errors.contactNumber,
                })}
              />
            </FormGroup>
          </Col>
          <Col sm="6">
            <FormGroup>
              <Label for="email">E-mail</Label>
              <Input
                type="email"
                id="email"
                name="email"
                defaultValue={data?.[0]?.email}
                innerRef={register({ required: true })}
                className={classnames({
                  "is-invalid": errors.email,
                })}
              />
            </FormGroup>
          </Col>
          <Col sm="6">
            <FormGroup>
              <Label for="salonTitle">Salon Name</Label>
              <Input
                // defaultValue={data.company}
                id="salonTitle"
                name="salonTitle"
                defaultValue={data?.[0]?.salon?.[0].salonTitle}
                innerRef={register({ required: true })}
                className={classnames({
                  "is-invalid": errors.salonTitle,
                })}
                disabled
              />
            </FormGroup>
          </Col>
          <Col sm="12">
            <FormGroup>
              <Label for="address">Address</Label>
              <Input
                id="address"
                type="text"
                name="address"
                className={classnames({
                  "is-invalid": errors.address,
                })}
                defaultValue={data?.[0]?.address[0]?.branchLocation}
                innerRef={register({ required: true })}
              ></Input>
            </FormGroup>
          </Col>
          {/* <Col className="mt-75" sm="12">
            <Alert className="mb-50" color="warning">
              <h4 className="alert-heading">
                Your email is not confirmed. Please check your inbox.
              </h4>
              <div className="alert-body">
                <a
                  href="/"
                  className="alert-link"
                  onClick={(e) => e.preventDefault()}
                >
                  Resend confirmation
                </a>
              </div>
            </Alert>
          </Col> */}
          <Col className="mt-2 d-flex" sm="12">
            <Button
              type="submit"
              className="mr-1 d-flex align-items-center"
              color="warning"
            >
              {loading && <Spinner className="mr-50" color="white" size="sm" />}
              <span>Save changes</span>
            </Button>
            {/* <Button.Ripple color="secondary" outline link to="/">
              Cancel
            </Button.Ripple> */}
            <Link to="/">
              <Button color="secondary" type="button">
                Cancel
              </Button>
            </Link>
          </Col>
        </Row>
      </Form>
    </Fragment>
  );
};

export default GeneralTabs;
