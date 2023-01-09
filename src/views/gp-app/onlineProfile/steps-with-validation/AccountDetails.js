import * as yup from "yup";
import { Fragment } from "react";
import classnames from "classnames";
import { isObjEmpty } from "@utils";
import { useForm } from "react-hook-form";
import { ArrowLeft, ArrowRight } from "react-feather";
import { yupResolver } from "@hookform/resolvers/yup";
import { Form, Label, Input, FormGroup, Row, Col, Button } from "reactstrap";

const AccountDetails = ({ stepper, type, FirstFormStep, FormDetail }) => {
  const { register, errors, handleSubmit, trigger } = useForm();
  const onSubmit = (data) => {
    trigger();
    if (isObjEmpty(errors)) {
      FirstFormStep(data);
      stepper.next();
      // console.log("First Step", data);
    }
  };
  const normalizeCardNumber = (value) => {
    return (
      value
        .replace(/\s/g, "")
        .match(/.{1,4}/g)
        ?.join("")
        .substr(0, 11) || ""
    );
  };
  return (
    <Fragment>
      <div className="content-header">
        <h5 className="mb-0">Add your business info</h5>
        <small className="text-muted">
          Add key details about your business to display on your online booking
          profile.
        </small>
      </div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <FormGroup tag={Col} md="6">
            <Label className="form-label" for={`salonTitle`}>
              Salon Title
            </Label>
            <Input
              name={`salonTitle`}
              id={`salonTitle`}
              placeholder="salonTitle"
              defaultValue={
                FormDetail && FormDetail[0]?.branchInformation[0]?.branchTitle
              }
              innerRef={register({ required: true })}
              className={classnames({
                "is-invalid": errors[`salonTitle`],
              })}
            />
          </FormGroup>
          <FormGroup tag={Col} md="6">
            <Label className="form-label" for={`phone`}>
              Location phone number
            </Label>
            <Input
              type="tel"
              name={`phone`}
              id={`phone`}
              defaultValue={
                FormDetail && FormDetail[0]?.branchInformation[0]?.contactNumber
              }
              onChange={(event) => {
                const { value } = event.target;
                event.target.value = normalizeCardNumber(value);
              }}
              placeholder="0300XXXXXXX"
              innerRef={register({
                required: true,
                pattern: /^(?!.*[A-Za-z]).*$/g,
              })}
              className={classnames({ "is-invalid": errors[`phone`] })}
            />
          </FormGroup>
        </Row>
        <Row>
          <FormGroup tag={Col} md="6">
            <Label className="form-label" for={`email`}>
              Location email
            </Label>
            <Input
              type="email"
              name={`email`}
              id={`email`}
              defaultValue={FormDetail && FormDetail[0]?.email}
              innerRef={register({ required: true })}
              className={classnames({
                "is-invalid": errors[`email`],
              })}
            />
          </FormGroup>
          {/* <FormGroup tag={Col} md="6">
            <Label className="form-label" for="address">
              Location address
            </Label>
            <Input
              type="text"
              name="address"
              id="address"
              innerRef={register({ required: true })}
              className={classnames({
                "is-invalid": errors["address"],
              })}
            />
          </FormGroup> */}
        </Row>
        <Row>
          <FormGroup tag={Col} md="12">
            <Label className="form-label" for="description">
              Description (optional)
            </Label>
            <Input
              type="textarea"
              rows="3"
              name="description"
              id="description"
              defaultValue={
                FormDetail && FormDetail[0]?.branchInformation[0]?.description
              }
              innerRef={register({ required: false })}
              className={classnames({
                "is-invalid": errors["description"],
              })}
            />
            {errors.description?.type === "required" ? (
              <small className="text-danger">Required Field</small>
            ) : null}
          </FormGroup>
        </Row>

        <div className="d-flex justify-content-between">
          <Button.Ripple color="dark" className="btn-prev" outline disabled>
            <ArrowLeft
              size={14}
              className="align-middle mr-sm-25 mr-0"
            ></ArrowLeft>
            <span className="align-middle d-sm-inline-block d-none">
              Previous
            </span>
          </Button.Ripple>
          <Button.Ripple type="submit" color="dark" className="btn-next">
            <span className="align-middle d-sm-inline-block d-none">Next</span>
            <ArrowRight
              size={14}
              className="align-middle ml-sm-25 ml-0"
            ></ArrowRight>
          </Button.Ripple>
        </div>
      </Form>
    </Fragment>
  );
};

export default AccountDetails;
