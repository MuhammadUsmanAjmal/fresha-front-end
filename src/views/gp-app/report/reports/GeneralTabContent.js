import { Fragment, useState, useEffect } from "react";
import classnames from "classnames";
import { useForm, Controller } from "react-hook-form";
import { Link, useLocation } from "react-router-dom";
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
} from "reactstrap";
import defaultAvatar from "@src/assets/images/avatars/avatar-blank.png";

const GeneralTabs = ({ data }) => {
  return (
    <Fragment>
      <Col lg="4">
        <h3 style={{ color: "black", fontWeight: "bold" }}>Reports</h3>
      </Col>
      <Row>
        {/* <Col md="6">
          <Card className={" rounded  p-1 m-2  w-90 border "}>
            <CardBody>
              <Col lg="6">
                <h5 style={{ color: "black", fontWeight: "bold" }}>Finances</h5>
              </Col>

              <hr></hr>
              <p
                className="d-flex cursor-pointer"
                onClick={(event) => {
                  event.preventDefault();
                  console.log("Ask Danish to give you APIs :)");
                }}
              >
                <Link
                  href="#"
                  className="border-bottom-orange"
                  style={{
                    color: "orange",
                    fontWeight: "bold",
                    marginLeft: 4,
                  }}
                >
                  Financial Summary
                </Link>
              </p>
              <hr></hr>
              <p
                className="d-flex cursor-pointer"
                onClick={(event) => {
                  event.preventDefault();
                  console.log("Ask Danish to give you APIs :)");
                }}
              >
                <Link
                  href="#"
                  className="border-bottom-orange"
                  style={{
                    color: "orange",
                    fontWeight: "bold",
                    marginLeft: 4,
                  }}
                >
                  Payment Summary
                </Link>
              </p>
              <hr></hr>
              <p
                className="d-flex cursor-pointer"
                onClick={(event) => {
                  event.preventDefault();
                  console.log("Ask Danish to give you APIs :)");
                }}
              >
                <Link
                  href="#"
                  className="border-bottom-orange"
                  style={{
                    color: "orange",
                    fontWeight: "bold",
                    marginLeft: 4,
                  }}
                >
                  Transaction Log
                </Link>
              </p>

              <hr></hr>
              <p
                className="d-flex cursor-pointer"
                onClick={(event) => {
                  event.preventDefault();
                  console.log("Ask Danish to give you APIs :)");
                }}
              >
                <Link
                  href="#"
                  className="border-bottom-orange"
                  style={{
                    color: "orange",
                    fontWeight: "bold",
                    marginLeft: 4,
                  }}
                >
                  Taxes Summary
                </Link>
              </p>

              <hr></hr>
              <p
                className="d-flex cursor-pointer"
                onClick={(event) => {
                  event.preventDefault();
                  console.log("Ask Danish to give you APIs :)");
                }}
              >
                <Link
                  href="#"
                  className="border-bottom-orange"
                  style={{
                    color: "orange",
                    fontWeight: "bold",
                    marginLeft: 4,
                  }}
                >
                  Outstanding Invoices
                </Link>
              </p>
            </CardBody>
          </Card>
        </Col>*/}
        <Col md="6">
          <Card className={" rounded  p-1 m-2  w-90 border "}>
            <CardBody>
              <Col lg="6">
                <h5 style={{ color: "black", fontWeight: "bold" }}>Sales</h5>
              </Col>

              <hr></hr>
              <p
                className="d-flex cursor-pointer"
                onClick={(event) => {
                  event.preventDefault();
                  console.log("Ask Danish to give you APIs :)");
                }}
              >
                {/* <Link
                  href="#"
                  className="border-bottom-orange"
                  style={{
                    color: "orange",
                    fontWeight: "bold",
                    marginLeft: 4,
                  }}
                >
                  Sales by Item
                </Link>
              </p>
              <hr></hr>
              <p
                className="d-flex cursor-pointer"
                onClick={(event) => {
                  event.preventDefault();
                  console.log("Ask Danish to give you APIs :)");
                }}
              >
                <Link
                  href="#"
                  className="border-bottom-orange"
                  style={{
                    color: "orange",
                    fontWeight: "bold",
                    marginLeft: 4,
                  }}
                >
                  Sales by Type
                </Link>
              </p>
              <hr></hr>
              <p
                className="d-flex cursor-pointer warning"
                onClick={(event) => {
                  event.preventDefault();
                  console.log("Ask Danish to give you APIs :)");
                }}
              >
                <Link
                  href="#"
                  className="border-bottom-orange"
                  style={{
                    color: "orange",
                    fontWeight: "bold",
                    marginLeft: 4,
                  }}
                >
                  Sales by Service
                </Link>
              </p>

              <hr></hr>
              <p
                className="d-flex cursor-pointer"
                onClick={(event) => {
                  event.preventDefault();
                  console.log("Ask Danish to give you APIs :)");
                }}
              >
                <Link
                  href="#"
                  className="border-bottom-orange"
                  style={{
                    color: "orange",
                    fontWeight: "bold",
                    marginLeft: 4,
                  }}
                >
                  Sales by product
                </Link>
              </p>

              <hr></hr>
              <p
                className="d-flex cursor-pointer"
                onClick={(event) => {
                  event.preventDefault();
                  console.log("Ask Danish to give you APIs :)");
                }}
              >
                <Link
                  href="#"
                  className="border-bottom-orange"
                  style={{
                    color: "orange",
                    fontWeight: "bold",
                    marginLeft: 4,
                  }}
                >
                  Sales by Location and Time
                </Link>
              </p>

              <hr></hr>
              <p
                className="d-flex cursor-pointer"
                onClick={(event) => {
                  event.preventDefault();
                  console.log("Ask Danish to give you APIs :)");
                }}
              > */}
                <Link
                  to="/sales/saleshistory"
                  className="border-bottom-orange"
                  style={{
                    color: "orange",
                    fontWeight: "bold",
                    marginLeft: 4,
                  }}
                >
                  Sales Log
                </Link>
              </p>
            </CardBody>
          </Card>
        </Col>
        <Col md="6">
          <Card className={"rounded  p-1 m-2  w-90 border "}>
            <CardBody>
              <Col lg="6">
                <h5 style={{ color: "black", fontWeight: "bold" }}>
                  <span>Appointments</span>
                </h5>
              </Col>

              <hr></hr>
              <p className="d-flex cursor-pointer">
                <Link
                  to="/sales/appointments"
                  className="border-bottom-orange"
                  style={{
                    color: "orange",
                    fontWeight: "bold",
                    marginLeft: 4,
                  }}
                >
                  Appointments list
                </Link>
              </p>
              {/* <hr></hr>
              <p
                className="d-flex cursor-pointer"
                onClick={(event) => {
                  event.preventDefault();
                  console.log("Ask Danish to give you APIs :)");
                }}
              > */}
              {/* <Link
                  href="#"
                  className="border-bottom-orange"
                  style={{
                    color: "orange",
                    fontWeight: "bold",
                    marginLeft: 4,
                  }}
                >
                  Appointments Summary
                </Link>
              </p>
              <hr></hr>
              <p
                className="d-flex cursor-pointer warning"
                onClick={(event) => {
                  event.preventDefault();
                  console.log("Ask Danish to give you APIs :)");
                }}
              >
                <Link
                  href="#"
                  className="border-bottom-orange"
                  style={{
                    color: "orange",
                    fontWeight: "bold",
                    marginLeft: 4,
                  }}
                >
                  Appointment cancellations
                </Link> */}
              {/* </p> */}
            </CardBody>
          </Card>
        </Col>
        {/* <Col md="6">
          <Card className={" rounded  p-1 m-2  w-90 border "}>
            <CardBody>
              <Col lg="6">
                <h5 style={{ color: "black", fontWeight: "bold" }}>Clients</h5>
              </Col>

              <hr></hr>
              <p
                className="d-flex cursor-pointer"
                onClick={(event) => {
                  event.preventDefault();
                  console.log("Ask Danish to give you APIs :)");
                }}
              >
                <Link
                  href="#"
                  className="border-bottom-orange"
                  style={{
                    color: "orange",
                    fontWeight: "bold",
                    marginLeft: 4,
                  }}
                >
                  Client list
                </Link>
              </p>
              <hr></hr>
              <p
                className="d-flex cursor-pointer"
                onClick={(event) => {
                  event.preventDefault();
                  console.log("Ask Danish to give you APIs :)");
                }}
              >
                <Link
                  href="#"
                  className="border-bottom-orange"
                  style={{
                    color: "orange",
                    fontWeight: "bold",
                    marginLeft: 4,
                  }}
                >
                  Client relations
                </Link>
              </p>
            </CardBody>
          </Card>
        </Col>
        <Col md="6">
          <Card className={" rounded  p-1 m-2  w-90 border "}>
            <CardBody>
              <Col lg="6">
                <h5 style={{ color: "black", fontWeight: "bold" }}>Team</h5>
              </Col>

              <hr></hr>
              <p
                className="d-flex cursor-pointer"
                onClick={(event) => {
                  event.preventDefault();
                  console.log("Ask Danish to give you APIs :)");
                }}
              >
                <Link
                  href="#"
                  className="border-bottom-orange"
                  style={{
                    color: "orange",
                    fontWeight: "bold",
                    marginLeft: 4,
                  }}
                >
                  Team members working hours
                </Link>
              </p>
              <hr></hr>
              <p
                className="d-flex cursor-pointer"
                onClick={(event) => {
                  event.preventDefault();
                  console.log("Ask Danish to give you APIs :)");
                }}
              >
                <Link
                  href="#"
                  className="border-bottom-orange"
                  style={{
                    color: "orange",
                    fontWeight: "bold",
                    marginLeft: 4,
                  }}
                >
                  Team members funds details
                </Link>
              </p>
            </CardBody>
          </Card>
        </Col>
        <Col md="6">
          <Card className={" rounded  p-1 m-2  w-90 border "}>
            <CardBody>
              <Col lg="6">
                <h5 style={{ color: "black", fontWeight: "bold" }}>Deposit</h5>
              </Col>

              <hr></hr>
              <p
                className="d-flex cursor-pointer"
                onClick={(event) => {
                  event.preventDefault();
                  console.log("Ask Danish to give you APIs :)");
                }}
              >
                <Link
                  href="#"
                  className="border-bottom-orange"
                  style={{
                    color: "orange",
                    fontWeight: "bold",
                    marginLeft: 4,
                  }}
                >
                  Deposit outstanding balance
                </Link>
              </p>
              <hr></hr>
              <p
                className="d-flex cursor-pointer"
                onClick={(event) => {
                  event.preventDefault();
                  console.log("Ask Danish to give you APIs :)");
                }}
              >
                <Link
                  href="#"
                  className="border-bottom-orange"
                  style={{
                    color: "orange",
                    fontWeight: "bold",
                    marginLeft: 4,
                  }}
                >
                  deposit activities
                </Link>
              </p>
            </CardBody>
          </Card>
        </Col> */}
      </Row>
    </Fragment>
  );
};

export default GeneralTabs;
