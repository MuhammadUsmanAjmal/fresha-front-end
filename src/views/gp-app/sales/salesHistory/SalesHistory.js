import { Fragment, useEffect, useState } from "react";

import Table from "./Table";
import { Row, Col, Card, CardBody, Button, FormGroup } from "reactstrap";
import Flatpickr from "react-flatpickr";
import "@styles/react/libs/flatpickr/flatpickr.scss";
import "@styles/react/libs/react-select/_react-select.scss";
import { getAllSalesHistoryAction } from "../../../../redux/actions/salesAction";
import { useDispatch, useSelector } from "react-redux";
const SalesHistory = () => {
  const dispatch = useDispatch();
  const historyData = useSelector((state) => state.salesHistory);
  const { loading } = historyData;
  const historyArray = historyData?.sales?.data;
  // console.log("data in sales hitory: ", historyArray);
  const [startPicker, setStartPicker] = useState(new Date());
  // const [endPicker, setEndPicker] = useState(new Date());
  const branch = JSON.parse(localStorage.getItem("userData"));
  const ID = branch?.data?.branchId;
  return (
    <div className="app-user-list">
      <Col lg="4">
        <h3 style={{ color: "black", fontWeight: "bold" }}>Sales History</h3>
      </Col>
      {/* <Row lg="12"> */}
      <Col lg="7">
        <FormGroup className="d-flex align-items-center flex-direction-row">
          <span for="startDate" className="mr-1" style={{ fontSize: 16 }}>
            SelectDate:
          </span>
          <Flatpickr
            required
            id="Date"
            // tag={Flatpickr}
            name="Date"
            className="form-control font-weight-bolder  border"
            style={{ fontSize: 16 }}
            onChange={(date) => {
              // console.log("date", date);

              const startDate = date[0]?.toLocaleDateString();
              const endDate = date[1]?.toLocaleDateString();
              dispatch(getAllSalesHistoryAction(ID, startDate, endDate));
              // setStartPicker(date[0]);
              // const obj = {
              //   orderDate: date[0].toLocaleDateString(),
              //   status: "Completed",
              // };
              // dispatch(getAllSalesAction(BranchId, obj));
            }}
            value={startPicker}
            options={{
              mode: "range",
              dateFormat: "Y-m-d",
              defaultDate: ["2022-01-10", "2022-04-20"],
            }}
          />
        </FormGroup>
      </Col>
      {/* <Col lg="4">
          <FormGroup className="d-flex align-items-center flex-direction-row">
            <span for="endDate" className="mr-1" style={{ fontSize: 16 }}>
              End Date:
            </span>
            <Flatpickr
              required
              id="Date"
              // tag={Flatpickr}
              name="Date"
              className="form-control font-weight-bolder  border"
              style={{ fontSize: 16 }}
              // onChange={(date) => {
              //   setStartPicker(date[0]);
              //   const obj = {
              //     orderDate: date[0].toLocaleDateString(),
              //     status: "Completed",
              //   };
              //   dispatch(getAllSalesAction(BranchId, obj));
              // }}
              value={endPicker}
              options={{
                enableTime: false,
                dateFormat: "Y-m-d",
              }}
            />
          </FormGroup>
        </Col> */}
      {/* </Row> */}
      <Table dataArray={historyArray} loading={loading} />
    </div>
  );
};

export default SalesHistory;
