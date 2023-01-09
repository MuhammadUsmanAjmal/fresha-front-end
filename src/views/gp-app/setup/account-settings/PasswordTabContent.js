import * as yup from "yup";
import classnames from "classnames";
import { useForm } from "react-hook-form";
import { Form, FormGroup, Row, Col, Button, Spinner } from "reactstrap";
import InputPasswordToggle from "@components/input-password-toggle";
import { toast, Slide } from "react-toastify";
import { ToastContent } from "../../components/ToastContent";
import {
  logout,
  passwordUpdateAction,
} from "../../../../redux/actions/userActions";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const PasswordTabContent = () => {
  const dispatch = useDispatch();
  const PasswordUpdate = useSelector((state) => state.passwordUpdate);
  const { loading } = PasswordUpdate;
  const successPassword = PasswordUpdate?.password?.success;
  const errorPassword = PasswordUpdate?.password?.error;
  const Data = JSON.parse(localStorage.getItem("userData"));
  const UserId = Data?.data?.id;
  const { register, errors, handleSubmit } = useForm();
  useEffect(() => {
    if (successPassword) {
      dispatch(logout());
    }
    return () => {
      dispatch({ type: "PASSWORD_UPDATE_RESET" });
    };
  }, [successPassword]);
  useEffect(() => {
    if (errorPassword) {
      toast.error(<ToastContent error={PasswordUpdate?.password?.message} />, {
        transition: Slide,
        hideProgressBar: true,
        autoClose: 2000,
      });
    }
    return () => {
      dispatch({ type: "PASSWORD_UPDATE_RESET" });
    };
  }, [errorPassword]);
  const onSubmit = (value, event) => {
    if (value.newPassword === value.confirmPassword) {
      event.preventDefault();
      dispatch(
        passwordUpdateAction(UserId, { password: value.confirmPassword })
      );
    } else {
      toast.error(<ToastContent error={"Password does't matched"} />, {
        transition: Slide,
        hideProgressBar: true,
        autoClose: 2000,
      });
    }
    console.log(value);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Row>
        <Col sm="6">
          <FormGroup>
            <InputPasswordToggle
              label="New Password"
              htmlFor="newPassword"
              name="newPassword"
              innerRef={register({ required: true })}
              className={classnames("input-group-merge", {
                "is-invalid": errors["newPassword"],
              })}
            />
          </FormGroup>
        </Col>
        <Col sm="6">
          <FormGroup>
            <InputPasswordToggle
              label="Confirm New Password"
              htmlFor="confirmPassword"
              name="confirmPassword"
              innerRef={register({ required: true })}
              className={classnames("input-group-merge", {
                "is-invalid": errors["confirmPassword"],
              })}
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

export default PasswordTabContent;
