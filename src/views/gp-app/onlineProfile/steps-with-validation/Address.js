import { Fragment, useState } from "react";
import classnames from "classnames";
import { isObjEmpty } from "@utils";
import { useForm } from "react-hook-form";
import { ArrowLeft, ArrowRight } from "react-feather";
import {
  Label,
  FormGroup,
  Row,
  Col,
  Button,
  Form,
  Input,
  CustomInput,
} from "reactstrap";

const Address = ({ stepper, type, ThirdFormStep, FormDetail }) => {
  const [days, setDays] = useState(
    FormDetail && FormDetail[0]?.branchInformation[0]?.branchWorkingHours
  );
  const { register, errors, handleSubmit, trigger } = useForm();

  const onSubmit = () => {
    trigger();
    if (isObjEmpty(errors)) {
      ThirdFormStep(days);
      stepper.next();
    }
  };
  const handleChecked = (day) => {
    setDays(
      days?.map((item) =>
        item.workingDay === day ? { ...item, isActive: !item.isActive } : item
      )
    );
  };
  const handleInputChange = (id, event) => {
    days?.map((item) => {
      if (item._id === id) {
        item[event.target.name] = event.target.value;
      }
    });
  };

  return (
    <Fragment>
      <div className="content-header">
        <h5 className="mb-0">Add your opening hours</h5>
        <small>
          Set standard opening hours to show on your profile page, these hours
          do not impact your calendar availability.
        </small>
      </div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col>
            {days?.map((item, index) => {
              return (
                <>
                  <Col
                    className="custom-control custom-checkbox border-bottom border-2 rounded p-2 m-1  w-100"
                    key={item?._id}
                  >
                    <Row>
                      <Col lg="5">
                        <div
                          className="custom-control custom-checkbox"
                          style={{
                            padding: "10px 0",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <CustomInput
                            type="checkbox"
                            checked={item.isActive}
                            label={item?.workingDay}
                            id={index}
                            onChange={() => handleChecked(item?.workingDay)}
                          />
                        </div>
                      </Col>
                      {item?.isActive ? (
                        <>
                          <Col lg="3">
                            <FormGroup>
                              <Input
                                required
                                id={item?._id}
                                name="startTime"
                                type="time"
                                defaultValue={item?.startTime}
                                className="form-control"
                                onChange={(e) =>
                                  handleInputChange(item?._id, e)
                                }
                              />
                            </FormGroup>
                          </Col>
                          <Col lg="3">
                            <FormGroup>
                              <Input
                                required
                                id={item?._id}
                                name="endTime"
                                type="time"
                                defaultValue={item?.endTime}
                                className="form-control"
                                onChange={(e) =>
                                  handleInputChange(item?._id, e)
                                }
                              />
                            </FormGroup>
                          </Col>
                        </>
                      ) : (
                        <Col
                          style={{
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          Closed
                        </Col>
                      )}
                    </Row>
                  </Col>
                </>
              );
            })}
          </Col>
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

export default Address;
