import { useSelector } from "react-redux";
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

const ServicesDetail = () => {
  const Services = useSelector((state) => state.topService);
  const TopServices = Services?.topService?.data;
  const { loading } = Services;
  return (
    <Card>
      <CardHeader className="align-items-start">
        <div>
          <CardTitle className="mb-25" tag="h4">
            Top services (Current Month)
          </CardTitle>
          {/* <CardText className="mb-0">Recent ServicesDetail:</CardText> */}
        </div>
      </CardHeader>
      <CardBody className="pb-1">
        <Row lg="12" className="border-bottom border-2 mb-1">
          <Col lg="6">
            <strong>Services</strong>
          </Col>
          <Col lg="6">
            <strong>Count</strong>
          </Col>
        </Row>
        {loading ? (
          <Row className="d-flex align-items-center justify-content-center">
            <Spinner />
          </Row>
        ) : TopServices?.length > 0 ? (
          TopServices?.map((item, index) => {
            return (
              <Row
                lg="12"
                key={index}
                style={{ backgroundColor: `${index % 2 ? "#E4E6E7" : "none"}` }}
              >
                <Col lg="6">
                  <span>{item?.service[0]?.serviceTitle}</span>
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
export default ServicesDetail;
