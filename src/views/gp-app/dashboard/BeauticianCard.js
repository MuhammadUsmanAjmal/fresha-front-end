import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  CardText,
  Row,
  Col,
  Spinner,
} from "reactstrap";
import { Fragment, useState, useEffect } from "react";
import { useSelector } from "react-redux";

const BeauticianCard = () => {
  const StaffDetail = useSelector((state) => state.topStaff);
  const TeamMember = StaffDetail?.Staff?.data;
  const { loading } = StaffDetail;
  return (
    <Card>
      <CardHeader className="align-items-start">
        <div>
          <CardTitle className="mb-25" tag="h4">
            Top team member (Current Month)
          </CardTitle>
          {/* <CardText className="mb-0">Recent Beautician:</CardText> */}
        </div>
      </CardHeader>
      <CardBody className="pb-1">
        <Row lg="12" className="border-bottom border-2 mb-1">
          <Col lg="6">
            <strong>Team member</strong>
          </Col>
          <Col lg="6">
            <strong>No. of jobs </strong>
          </Col>
        </Row>
        {loading ? (
          <Row className="d-flex align-items-center justify-content-center">
            <Spinner />
          </Row>
        ) : TeamMember?.length > 0 ? (
          TeamMember?.map((item, index) => {
            return (
              <Row
                lg="12"
                key={index}
                style={{ backgroundColor: `${index % 2 ? "#E4E6E7" : "none"}` }}
              >
                <Col lg="6">
                  <span>{item?.beautician[0]?.fullName}</span>
                </Col>
                <Col lg="6">
                  <span>{item?.count}</span>
                </Col>
              </Row>
            );
          })
        ) : (
          <Row className="d-flex align-items-center justify-content-center">
            <CardText>No Data Available</CardText>
          </Row>
        )}
      </CardBody>
    </Card>
  );
};
export default BeauticianCard;
