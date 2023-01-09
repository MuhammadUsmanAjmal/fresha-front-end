import { Fragment } from "react";
import Select from "react-select";
import classnames from "classnames";
import { useForm } from "react-hook-form";
import { ArrowLeft, ArrowRight } from "react-feather";
import { selectThemeColors, isObjEmpty } from "@utils";
import { Label, FormGroup, Row, Col, Button, Form, Input } from "reactstrap";

import "@styles/react/libs/react-select/_react-select.scss";

const PersonalInfo = ({ stepper, type, SecondFormStep, FormDetail }) => {
  const { register, errors, handleSubmit, trigger } = useForm();

  const onSubmit = (data) => {
    trigger();
    if (isObjEmpty(errors)) {
      SecondFormStep(data);
      stepper.next();
    }
  };

  return (
    <Fragment>
      <div className="content-header">
        <h5 className="mb-0">Where is office per located?</h5>
        <small>
          Add your business location so your clients can easily find you.
        </small>
      </div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <FormGroup tag={Col} md="6">
            <Label className="form-label" for="address">
              Location address
            </Label>
            <Input
              type="text"
              name="address"
              id="address"
              defaultValue={
                FormDetail &&
                FormDetail[0]?.branchInformation[0]?.branchLocation
              }
              innerRef={register({ required: true })}
              className={classnames({
                "is-invalid": errors["address"],
              })}
            />
          </FormGroup>
        </Row>

        <div className="d-flex justify-content-between">
          <Button.Ripple
            color="dark"
            className="btn-prev"
            onClick={() => stepper.previous()}
          >
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

export default PersonalInfo;
