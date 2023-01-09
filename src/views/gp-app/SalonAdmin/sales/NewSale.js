import { Fragment, useEffect, useState } from "react";
import { Row, Col, Card, CardBody, Button } from "reactstrap";
import { CheckCircle } from "react-feather";
import PaymentSelection from "./PaymentSelection";
import {
  timeConvert,
  tConvert24hour,
  endTimeCalculate,
} from "../../../../utility/Utils";
import { useLocation, useParams } from "react-router-dom";
const NewSales = ({ TotalSales }) => {
  const location = useLocation();
  const { branchId, salonId } = useParams();
  const { ID } = location?.state ? location?.state : "";
  const [active, setActive] = useState("");
  const [id, setId] = useState(ID ? ID : "");
  // const [item, setItems] = useState();

  let OrdersArray = [];
  TotalSales?.forEach((fullItem) => {
    let singleOrder = {};
    let services = [];
    singleOrder["orderId"] = fullItem?._id;
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
  // console.log(OrdersArray);
  let array = [];
  OrdersArray?.filter((x) => {
    if (x.orderId === ID) {
      array.push(x);
    }
  });

  return (
    <>
      <Fragment>
        <Col lg="4">
          <h3 style={{ color: "black", fontWeight: "bold" }}>New Sales</h3>

          {/* {/ <DatePicker id="datePicker" value={date} /> /} */}
        </Col>
        {OrdersArray?.map((order, index) => {
          return (
            <Card
              key={index}
              cursor="pointer"
              className={` rounded  p-2 m-3  w-90 border `}
              // className={item?._id === active ? "border-warning" : "border"}
            >
              {order?.services?.map((service, index) => {
                return (
                  <CardBody className="invoice-padding pb-0" key={index}>
                    <Row lg="12" className="d-flex pt-2 pb-2 ">
                      <Col lg="3">
                        <h5 style={{ fontWeight: "bold", color: "black" }}>
                          {/* 02:55 - 03:00 */}
                          {service?.startTime}
                        </h5>
                      </Col>
                      <Col lg="5" className="d-flex flex-column">
                        <h5 style={{ fontWeight: "bold", color: "black" }}>
                          {service?.serviceTitle}
                          {/* Service Title */}
                        </h5>
                        <h5 style={{ color: "gray" }}>
                          {/* 1h with Wendy Smith */}
                          {/* {service?.serviceDuration} */}
                        </h5>
                        <h5>Service Duration : {service?.serviceDuration}</h5>
                      </Col>
                      <Col lg="4" className="d-flex justify-content-center">
                        <h5 style={{ fontWeight: "bold", color: "black" }}>
                          {/* $45 */}
                          {service?.actualPrice} PKR
                        </h5>
                      </Col>
                    </Row>
                  </CardBody>
                );
              })}
            </Card>
          );
        })}
      </Fragment>
    </>
  );
};

export default NewSales;
