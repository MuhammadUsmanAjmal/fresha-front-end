import { Fragment, useEffect, useState } from "react";
import classnames from "classnames";
import { useForm, Controller } from "react-hook-form";
import Flatpickr from "react-flatpickr";
import "@styles/react/libs/flatpickr/flatpickr.scss";
import "@styles/react/libs/react-select/_react-select.scss";

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
  Table,
} from "reactstrap";
import defaultAvatar from "@src/assets/images/avatars/avatar-blank.png";
import DatePicker from "react-flatpickr";
import { useDispatch, useSelector } from "react-redux";
import { getAllSalesAction } from "../../../../redux/actions/salesAction";
import SpinnerFlex from "../../../components/spinners/SpinnerFlex";
import { useParams } from "react-router-dom";

const DailySales = () => {
  const dispatch = useDispatch();
  const { branchId, salonId } = useParams();

  const Sales = useSelector((state) => state.SalesOrder);
  const { loading } = Sales;
  const data = Sales?.SalesDetail?.data;
  const [startPicker, setStartPicker] = useState(new Date());

  // const [endPicker, setEndPicker] = useState(new Date());
  // const [date, setDate] = useState(new Date());
  useEffect(() => {
    const obj = {
      orderDate: startPicker?.toLocaleDateString(),
      status: "Completed",
    };
    dispatch(getAllSalesAction(branchId, obj));
  }, []);
  return (
    <Fragment>
      <Col lg="4">
        <h3 style={{ color: "black", fontWeight: "bold" }}>Daily Sales</h3>
      </Col>
      {/* <Row lg="7"> */}
      <Col lg="5">
        <FormGroup className="d-flex align-items-center flex-direction-row">
          <span for="selectDate" className="mr-1" style={{ fontSize: 16 }}>
            Select Date:
          </span>
          <Flatpickr
            required
            id="Date"
            // tag={Flatpickr}
            name="Date"
            className="form-control font-weight-bolder  border"
            style={{ fontSize: 16 }}
            onChange={(date) => {
              setStartPicker(date[0]);
              const obj = {
                orderDate: date[0].toLocaleDateString(),
                status: "Completed",
              };
              dispatch(getAllSalesAction(branchId, obj));
            }}
            value={startPicker}
            options={{
              enableTime: false,
              dateFormat: "Y-m-d",
            }}
          />
        </FormGroup>
      </Col>
      {/* </Row> */}
      {loading ? (
        <SpinnerFlex />
      ) : (
        <Row>
          <Col>
            <Card>
              <CardBody>
                <h3>Transaction summary</h3>

                <Table hover>
                  <thead>
                    <tr>
                      <th>Item Type</th>
                      <th>Sales qty</th>
                      <th>Refund qty </th>
                      <th>Gross total </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{data?.transactionSummary?.itemType}</td>
                      <td>{data?.transactionSummary?.salesQuantity}</td>
                      <td>{data?.transactionSummary?.refundQuantity}</td>
                      <td>{data?.transactionSummary?.grossTotal}</td>
                    </tr>
                    <tr>
                      <td>Total Sales</td>
                      <td></td>
                      <td></td>
                      <td>{data?.transactionSummary?.totalSales}</td>
                    </tr>
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
          <Col>
            <Card>
              <CardBody>
                <h3>Cash movement summary</h3>
                <Table hover>
                  <thead>
                    <tr>
                      <th>Payment type</th>
                      <th>Payments collected</th>
                      <th>Refunds paid</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th>Cash</th>
                      <td>{data?.cashMovementSummary?.cashPaymentCollected}</td>
                      <td>0</td>
                    </tr>
                    <tr>
                      <th>Bank</th>
                      <td>{data?.cashMovementSummary?.bankPaymentCollected}</td>
                      <td>0</td>
                    </tr>
                    <tr>
                      <th>Payments collected</th>
                      <td>{data?.cashMovementSummary?.paymentsCollected}</td>
                      <td>0</td>
                    </tr>
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      )}
    </Fragment>
  );
};

export default DailySales;
