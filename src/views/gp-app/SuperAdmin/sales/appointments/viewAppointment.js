import { Fragment, useEffect, useState } from "react";

// ** Custom Components

import { X, Check, Trash, ChevronLeft } from "react-feather";

import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  Label,
  CustomInput,
  Input,
  Form,
  Card,
  Row,
  Col,
  CardBody,
  CardText,
} from "reactstrap";
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/libs/flatpickr/flatpickr.scss";

import {
  tConvert24hour,
  endTimeCalculate,
  timeConvert,
  DateFormat,
} from "../../../../../utility/Utils";
import { useDispatch, useSelector } from "react-redux";
import { getOrdersAction } from "../../../../../redux/actions/appoinmentAction";
import SpinnerFlex from "../../../../components/spinners/SpinnerFlex";
import { Link, useParams } from "react-router-dom";
// ** Toast Component

const ViewAppointment = (props) => {
  // ** Props
  const { orderDetail, view, toggleTab } = props;
  const ID = orderDetail?.orderId;
  const dispatch = useDispatch();
  const { branchId, salonId } = useParams();
  const OrderJob = useSelector((state) => state.getOrderJobs);
  const OrdersData = OrderJob?.Order?.data;
  const { loading } = OrderJob;
  useEffect(() => {
    dispatch(getOrdersAction(orderDetail?.orderId));
  }, []);
  // ** Vars
  // console.log(appointmentDetail?._def?.extendedProps?.orderId);

  let OrdersArray = [];
  let OrderDate = [];
  OrdersData?.forEach((fullItem) => {
    let obj2 = {};
    obj2["TotalPrice"] = fullItem?.totalOrderPrice;
    obj2["Date"] = fullItem?.orderDate;
    OrderDate.push(obj2);
    fullItem?.orderJobs?.forEach((item) => {
      let obj = {};
      obj["serviceTitle"] = item?.service[0]?.serviceTitle;
      obj["actualPrice"] = item?.actualPrice;
      obj["serviceDuration"] = timeConvert(item?.duration);
      obj["startTime"] = tConvert24hour(item?.startTime);
      var endTime = endTimeCalculate(item?.startTime, item?.duration);
      obj["EndTime"] = tConvert24hour(endTime);

      OrdersArray.push(obj);
    });
  });
  return (
    // <h1
    //   onClick={() => {
    //     view("1");
    //   }}
    // >
    //   Hello
    // </h1>
    <Card>
      <Row
        className="d-flex align-item-center cursor-pointer justify-content-start w-25 m-1"
        onClick={(event) => {
          event.preventDefault();
          view("1");
        }}
      >
        <ChevronLeft size={20} cursor="pointer" />
        Go Back
      </Row>
      {loading ? (
        <SpinnerFlex />
      ) : (
        <>
          <Col lg="12" className="d-flex flex-row justify-content-center mb-1">
            <h3 style={{ fontWeight: "bolder", color: "black" }}>
              View Appointment
            </h3>
          </Col>
          <Col lg="4 ">
            <h4
              style={{ fontWeight: "bolder", color: "black" }}
              className="mb-25"
            >
              {DateFormat(OrderDate[0]?.Date)}
            </h4>
          </Col>
          {OrdersArray &&
            OrdersArray.map((item) => (
              <CardBody className="invoice-padding pb-0">
                <Row lg="12" className="d-flex  pt-2 pb-2 ">
                  {/* Header */}
                  <Col lg="2">
                    <h5 style={{ fontWeight: "bold", color: "black" }}>
                      {item?.startTime}
                      {/* {startTime} - {endTime} */}
                    </h5>
                  </Col>
                  <Col lg="3" className="d-flex flex-column   ">
                    <h5 style={{ fontWeight: "bold", color: "black" }}>
                      {item?.serviceTitle}
                    </h5>
                    <h5 style={{ color: "gray" }}>
                      {/* 1h with Wendy Smith */}
                      {item?.serviceDuration}
                    </h5>
                    {/* <h5>Service Duration : {duration}</h5> */}
                  </Col>
                  <Col lg="3" className="d-flex justify-content-start ">
                    <h5 style={{ fontWeight: "bold", color: "black" }}>
                      {item?.actualPrice} PKR
                    </h5>
                  </Col>
                  {/* /Header */}
                </Row>
              </CardBody>
            ))}
          <hr className="invoice-spacing" />
          {/* Address and Contact */}
          <CardBody className="invoice-padding pt-0">
            <Row className="invoice-spacing">
              <Col className="p-0" lg="8">
                <h6>Invoice To:</h6>
                <h6>Walk-In</h6>
                {/* <CardText className="mb-0">abc@gmail.com</CardText> */}
              </Col>
              <Col className="p-0 mt-xl-0 mt-2 d-flex flex-column" lg="4">
                <h6>Payment Details</h6>
                <table>
                  <tbody>
                    <tr>
                      <td>Total Amount:</td>
                      <td>
                        <span className="font-weight-bolder">
                          {OrderDate[0]?.TotalPrice} PKR
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </Col>
            </Row>
          </CardBody>
          {/* <Col lg="12" className="d-flex justify-content-end  ">
            <Link
              to={{
                pathname: `/app/${salonId}/branches/${branchId}/sales`,
                state: { ID },
              }}
              onClick={() => {
                if (ID) {
                  // toggleTab("1");
                  // view("1");
                  window.location.reload();
                }
              }}
            > */}
          {/* {orderDetail?.status === "New" ? (
                <Button color="relief-dark" className="mr-2">
                  Checkout
                </Button>
              ) : null} */}
          {/* </Link> */}
          {/* </Col> */}
        </>
      )}
    </Card>
  );
};

export default ViewAppointment;
