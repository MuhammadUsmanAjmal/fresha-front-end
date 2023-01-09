import classnames from "classnames";
import Flatpickr from "react-flatpickr";
import { useForm, Controller } from "react-hook-form";
import {
  Label,
  Input,
  FormGroup,
  Row,
  Col,
  Button,
  Form,
  Card,
  Badge,
} from "reactstrap";
import "@styles/react/libs/flatpickr/flatpickr.scss";
import Avatar from "../../../assets/images/avatars/avatar-blank.png";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { getBookingAction } from "../../../redux/actions/onlineBookingAction";
import { ArrowRight, ChevronRight } from "react-feather";
const ListingInfoTab = ({ toggleRegForm, BranchID }) => {
  const dispatch = useDispatch();
  const [active, setActive] = useState("");
  const branch = useSelector((state) => state.branchListing);
  const BranchListing = branch?.branches?.data;
  const Info = JSON.parse(localStorage.getItem("userData"));

  const salonId = Info?.data?.salonId;
  const userId = Info?.data?.id;
  const statusObj = {
    false: "light-secondary",
    true: "light-success",
  };
  return (
    <>
      {BranchListing
        ? BranchListing.map((item, index) => {
            return (
              // <Card className="border" key={index}>
              <Row
                className={`p-2 m-2  rounded ${
                  item?._id === active?._id ? "border-warning" : "border"
                }`}
                key={index}
                cursor="pointer"
              >
                <Col lg="3">
                  <img
                    src={item?.image !== "" ? item?.image : Avatar}
                    // src={item ? Avatar : item?.image}
                    style={{ height: 100, width: 150, borderRadius: 5 }}
                  ></img>
                </Col>
                <Col lg="9" className="d-flex flex-column">
                  <Col lg="12">
                    <Col className="d-flex justify-content-between " lg="12">
                      <span
                        style={{
                          fontWeight: "bolder",
                          color: "black",
                          fontSize: 15,
                        }}
                      >
                        {item?.branchTitle}
                      </span>
                      {/* <span>{item?.lastModifiedDate}</span> */}
                    </Col>
                    <Col
                      className="d-flex flex-column justify-content-between "
                      lg="12"
                    >
                      <span>{item?.branchLocation}</span>
                    </Col>
                    <Row className="d-flex align-items-center justify-content-between mt-2">
                      <Badge
                        className="text-capitalize  ml-2"
                        color={
                          statusObj[item?.isActive === true ? "true" : "false"]
                        }
                      >
                        {item?.isActive === true ? "Online" : "Offline"}
                      </Badge>
                      <Button
                        color="dark"
                        size="md"
                        onClick={() => {
                          setActive(item);
                          dispatch(
                            getBookingAction(item?._id, userId, salonId)
                          );
                          toggleRegForm("2");
                          BranchID(item?._id);
                        }}
                      >
                        Create Link
                      </Button>
                    </Row>
                  </Col>
                </Col>

                {/* <Col lg="2" className="d-flex align-items-center">
                  <ChevronRight size={22} />
                </Col> */}
              </Row>
              // </Card>
            );
          })
        : null}
    </>
  );
};

export default ListingInfoTab;
