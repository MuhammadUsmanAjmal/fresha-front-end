import classnames from "classnames";
import Flatpickr from "react-flatpickr";
import { useForm, Controller } from "react-hook-form";
import {
  Label,
  Input,
  FormGroup,
  Row,
  Col,
  Button,
  Form,
  Spinner,
} from "reactstrap";
import Select from "react-select";
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/libs/flatpickr/flatpickr.scss";
import { useDispatch, useSelector } from "react-redux";
import { updateProfileAction } from "../../../../redux/actions/userActions";
import { useState } from "react";
import { Link } from "react-router-dom";
const InfoTabContent = ({ data }) => {
  const dispatch = useDispatch();
  const [gender, setGender] = useState();
  const Profile = useSelector((state) => state.updateProfileInfo);
  const { loading } = Profile;
  const { register, errors, handleSubmit } = useForm();
  const Data = JSON.parse(localStorage.getItem("userData"));
  const UserId = Data?.data?.id;
  // console.log(Info?.[0]?.fullName);

  const onSubmit = (value, event) => {
    event.preventDefault();
    const obj = { address: value.address, bio: value.bio, gender: gender };
    dispatch(updateProfileAction(UserId, obj));
  };

  const option = [
    { label: "Female", value: "F" },
    { label: "Male", value: "M" },
  ];

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Row>
        <Col sm="12">
          <FormGroup>
            <Label for="bio">Bio (optional)</Label>
            <Input
              id="bio"
              rows="4"
              name="bio"
              type="textarea"
              defaultValue={data?.[0]?.bio}
              innerRef={register({ required: false })}
              className={classnames({ "is-invalid": errors.bio })}
            />
          </FormGroup>
        </Col>
        {/* <Col sm='6'>
          <FormGroup>
            <Label for='birth-date'>Birth Date</Label>
            <Controller
              name='dob'
              as={Flatpickr}
              id='birth-date'
              control={control}
              placeholder='Birth Date'
              className={classnames('form-control', {
                'is-invalid': errors.dob
              })}
            />
          </FormGroup>
        </Col> */}
        <Col sm="6">
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
        <Col sm="6">
          <FormGroup>
            <Label for="gender">Gender</Label>
            <Select
              id="gender"
              options={option}
              placeholder={
                data?.[0]?.gender === "M"
                  ? "Male"
                  : data?.[0]?.gender === "F"
                  ? "Female"
                  : null
              }
              name="gender"
              classNamePrefix="select"
              onChange={(v) => setGender(v.value)}
            />
          </FormGroup>
        </Col>

        <Col className="mt-2 d-flex" sm="12">
          <Button
            type="submit"
            className="mr-1 d-flex align-items-center"
            color="warning"
          >
            {loading && <Spinner className="mr-50" color="white" size="sm" />}
            <span>Save changes</span>
          </Button>
          <Link to="/">
            <Button color="secondary" outline>
              Cancel
            </Button>
          </Link>
        </Col>
      </Row>
    </Form>
  );
};

export default InfoTabContent;
