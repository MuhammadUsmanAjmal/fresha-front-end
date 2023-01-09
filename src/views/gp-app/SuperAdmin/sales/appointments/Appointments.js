import { Fragment, useEffect, useState } from "react";

import Table from "./Table";
import { useDispatch, useSelector } from "react-redux";
import Flatpickr from "react-flatpickr";
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
  Card,
  CardBody,
  CardHeader,
} from "reactstrap";
import { getAllAppointmentHistoryAction } from "../../../../../redux/actions/salesAction";
import { useParams } from "react-router-dom";
const Appointments = ({ toggleTab }) => {
  const dispatch = useDispatch();
  const { branchId, salonId } = useParams();
  const appointmentData = useSelector((state) => state.appointmentHistory);
  const { loading } = appointmentData;
  const appointmentArray = appointmentData?.appointment?.data;
  const [startPicker, setStartPicker] = useState(new Date());

  return (
    <div className="app-user-list">
      <Col lg="4">
        <h3 style={{ color: "black", fontWeight: "bold" }}>Appointments</h3>
      </Col>
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
              if (startDate && endDate) {
                dispatch(
                  getAllAppointmentHistoryAction(branchId, startDate, endDate)
                );
              }
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

      <Table
        historyDataArray={appointmentArray}
        loading={loading}
        toggleTab={toggleTab}
      />
    </div>
  );
};

export default Appointments;
