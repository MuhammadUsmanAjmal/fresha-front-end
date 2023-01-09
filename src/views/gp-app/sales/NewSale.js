import { Fragment, useEffect, useState } from "react";
import { Row, Col, Card, CardBody, Button, CardText } from "reactstrap";
import { CheckCircle } from "react-feather";
import PaymentSelection from "./PaymentSelection";
import {
  timeConvert,
  tConvert24hour,
  endTimeCalculate,
  DateAppointView,
} from "../../../utility/Utils";
import { useLocation } from "react-router-dom";
const NewSales = ({ TotalSales }) => {
  const location = useLocation();
  const { ID } = location?.state ? location?.state : "";
  const [active, setActive] = useState("");
  const [id, setId] = useState(ID ? ID : "");
  // const [item, setItems] = useState();
  const [view, setView] = useState("1");
  const viewChange = (val) => {
    setView(val);
  };
  let OrdersArray = [];
  TotalSales?.forEach((fullItem) => {
    let singleOrder = {};
    let services = [];
    singleOrder["orderId"] = fullItem?._id;
    singleOrder["orderDate"] = fullItem?.orderDate;
    fullItem?.orderJobs?.forEach((item) => {
      let obj = {};
      obj["serviceTitle"] = item?.service[0]?.serviceTitle;
      obj["actualPrice"] = item?.actualPrice;
      obj["serviceDuration"] = timeConvert(item?.duration);
      obj["startTime"] = tConvert24hour(item?.startTime);
      var endTime = endTimeCalculate(item?.startTime, item?.duration);
      obj["EndTime"] = tConvert24hour(endTime);

      services.push(obj);
    });
    singleOrder["services"] = services;
    OrdersArray.push(singleOrder);
  });
  let array = [];
  OrdersArray?.filter((x) => {
    if (x.orderId === ID) {
      array.push(x);
    }
  });
  console.log(OrdersArray);
  // console.log(array);

  return (
    <>
      {view === "1" && (
        <Fragment>
          <Col lg="4">
            <h3 style={{ color: "black", fontWeight: "bold" }}>New Sales</h3>

            {/* {/ <DatePicker id="datePicker" value={date} /> /} */}
          </Col>
          {array?.length > 0
            ? array?.map((order, index) => {
                return (
                  <Card
                    key={index}
                    cursor="pointer"
                    className={` rounded  p-2 m-3  w-90 ${
                      order?.orderId === active
                        ? "border-warning"
                        : id === order?.orderId
                        ? "border-warning"
                        : "border"
                    }`}
                    // className={item?._id === active ? "border-warning" : "border"}
                    onClick={() => {
                      setActive(order?.orderId);
                      setId(order?.orderId);
                    }}
                    style={{ position: "relative" }}
                  >
                    {(order?.orderId === active || id === order?.orderId) && (
                      <span
                        className="d-flex flex-end "
                        style={{
                          position: "absolute",
                          top: -10,
                          right: -10,
                        }}
                      >
                        <CheckCircle
                          size={23}
                          style={{
                            color: "#F68D2F",
                          }}
                        />
                      </span>
                    )}
                    {order?.services?.map((service, index) => {
                      return (
                        <CardBody className="invoice-padding pb-0" key={index}>
                          <Row lg="12" className="d-flex pt-2 pb-2 ">
                            <Col lg="3">
                              <h5
                                style={{ fontWeight: "bold", color: "black" }}
                              >
                                {/* 02:55 - 03:00 */}
                                {service?.startTime}
                              </h5>
                            </Col>
                            <Col lg="5" className="d-flex flex-column">
                              <h5
                                style={{ fontWeight: "bold", color: "black" }}
                              >
                                {service?.serviceTitle}
                                {/* Service Title */}
                              </h5>
                              <h5 style={{ color: "gray" }}>
                                {/* 1h with Wendy Smith */}
                                {/* {service?.serviceDuration} */}
                              </h5>
                              <h5>
                                Service Duration : {service?.serviceDuration}
                              </h5>
                            </Col>
                            <Col
                              lg="4"
                              className="d-flex justify-content-center"
                            >
                              <h5
                                style={{ fontWeight: "bold", color: "black" }}
                              >
                                {/* $45 */}
                                {service?.actualPrice} PKR
                              </h5>
                            </Col>
                          </Row>
                        </CardBody>
                      );
                    })}
                    {(order?.orderId === active || id === order?.orderId) && (
                      <Col lg="12" className="d-flex justify-content-end  ">
                        {/* <Link to="/sales"> */}
                        <Button
                          color="relief-dark"
                          className="mr-2"
                          onClick={() => {
                            setView("2");
                          }}
                        >
                          Continue
                        </Button>
                        {/* </Link> */}
                      </Col>
                    )}
                  </Card>
                );
              })
            : OrdersArray.map((order, index) => {
                return (
                  <Card
                    key={index}
                    cursor="pointer"
                    className={` rounded  p-2 m-3  w-90 ${
                      order?.orderId === active
                        ? "border-warning"
                        : id === order?.orderId
                        ? "border-warning"
                        : "border"
                    }`}
                    // className={item?._id === active ? "border-warning" : "border"}
                    onClick={() => {
                      setActive(order?.orderId);
                      setId(order?.orderId);
                    }}
                    style={{ position: "relative" }}
                  >
                    {(order?.orderId === active || id === order?.orderId) && (
                      <span
                        className="d-flex flex-end "
                        style={{
                          position: "absolute",
                          top: -10,
                          right: -10,
                        }}
                      >
                        <CheckCircle
                          size={23}
                          style={{
                            color: "#F68D2F",
                          }}
                        />
                      </span>
                    )}
                    <CardText>{DateAppointView(order?.orderDate)}</CardText>
                    {order?.services?.map((service, index) => {
                      return (
                        <CardBody className="invoice-padding pb-0" key={index}>
                          <Row lg="12" className="d-flex pt-2 pb-2 ">
                            <Col lg="3">
                              <h5
                                style={{ fontWeight: "bold", color: "black" }}
                              >
                                {/* 02:55 - 03:00 */}
                                {service?.startTime}
                              </h5>
                            </Col>
                            <Col lg="5" className="d-flex flex-column">
                              <h5
                                style={{ fontWeight: "bold", color: "black" }}
                              >
                                {service?.serviceTitle}
                                {/* Service Title */}
                              </h5>
                              <h5 style={{ color: "gray" }}>
                                {/* 1h with Wendy Smith */}
                                {/* {service?.serviceDuration} */}
                              </h5>
                              <h5>
                                Service Duration : {service?.serviceDuration}
                              </h5>
                            </Col>
                            <Col
                              lg="4"
                              className="d-flex justify-content-center"
                            >
                              <h5
                                style={{ fontWeight: "bold", color: "black" }}
                              >
                                {/* $45 */}
                                {service?.actualPrice} PKR
                              </h5>
                            </Col>
                          </Row>
                        </CardBody>
                      );
                    })}
                    {(order?.orderId === active || id === order?.orderId) && (
                      <Col lg="12" className="d-flex justify-content-end  ">
                        {/* <Link to="/sales"> */}
                        <Button
                          color="relief-dark"
                          className="mr-2"
                          onClick={() => {
                            setView("2");
                          }}
                        >
                          Continue
                        </Button>
                        {/* </Link> */}
                      </Col>
                    )}
                  </Card>
                );
              })}
        </Fragment>
      )}
      {view === "2" && (
        <PaymentSelection viewChange={viewChange} orderID={active || id} />
      )}
    </>
  );
};

export default NewSales;
