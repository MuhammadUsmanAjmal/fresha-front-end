import { Row, Col, Badge, Button } from "reactstrap";
import "@styles/react/libs/flatpickr/flatpickr.scss";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import WizardHorizontal from "./WizardHorizontal";
import { getBookingAction } from "../../../redux/actions/onlineBookingAction";
import Avatar from "../../../assets/images/avatars/avatar-blank.png";
const InfoTabContent = () => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("1");
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
  const toggleRegForm = (val) => {
    setActiveTab(val);
  };
  const formatDate = (date) => {
    const today = new Date(date);
    return today.toLocaleDateString();
  };
  return (
    <>
      {activeTab === "1" && (
        <>
          <Col lg="4">
            <h3 style={{ color: "black", fontWeight: "bold" }}>
              Marketplace Profile
            </h3>
          </Col>
          {BranchListing
            ? BranchListing.map((item, index) => {
                return (
                  // <Card className="border" key={index}>
                  <Row
                    className={`p-2 m-3  rounded border d-flex flex-row`}
                    key={index}
                  >
                    <Col lg="3" className="d-flex align-items-center">
                      <img
                        src={item?.image !== "" ? item?.image : Avatar}
                        // src={item ? Avatar : item?.image}
                        style={{ height: 100, width: 150, borderRadius: 5 }}
                      ></img>
                    </Col>

                    <Col lg="9" className="d-flex flex-column">
                      <Col lg="12">
                        <Col
                          className="d-flex justify-content-between "
                          lg="12"
                        >
                          <span
                            style={{
                              fontWeight: "bolder",
                              color: "black",
                              fontSize: 15,
                            }}
                          >
                            {item?.branchTitle}
                          </span>
                          <span>
                            Updated{" "}
                            {item?.lastModifiedDate &&
                              formatDate(item?.lastModifiedDate)}
                          </span>
                        </Col>
                        <Col
                          className="d-flex flex-column justify-content-between "
                          lg="12"
                        >
                          <span>{item?.branchLocation}</span>
                        </Col>
                        <Row className="d-flex align-items-center justify-content-between mt-2">
                          <Badge
                            className="text-capitalize   ml-2"
                            color={
                              statusObj[
                                item?.isActive === true ? "true" : "false"
                              ]
                            }
                          >
                            {item?.isActive === true ? "Online" : "Offline"}
                          </Badge>

                          <Button.Ripple
                            color="dark"
                            size="md"
                            onClick={() => {
                              setActive(item);
                              dispatch(
                                getBookingAction(item?._id, userId, salonId)
                              );
                              toggleRegForm("2");
                            }}
                          >
                            Update
                          </Button.Ripple>
                        </Row>
                      </Col>
                    </Col>
                  </Row>
                  // </Card>
                );
              })
            : null}
        </>
      )}
      {activeTab === "2" && (
        <WizardHorizontal toggleRegForm={toggleRegForm} id={active?._id} />
      )}
    </>
  );
};

export default InfoTabContent;
