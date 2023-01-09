// ** React Imports
import { Fragment, useState, useEffect } from "react";

// ** Columns

// ** Store & Actions
import { getAllData, getData } from "../store/action";
import { useDispatch, useSelector } from "react-redux";

// ** Third Party Components
import Select from "react-select";
import ReactPaginate from "react-paginate";
import { ChevronDown, Eye } from "react-feather";
import DataTable from "react-data-table-component";
import { selectThemeColors } from "@utils";
import {
  Slack,
  User,
  Settings,
  Database,
  Edit2,
  MoreVertical,
  FileText,
  Trash2,
  Archive,
  Menu,
} from "react-feather";
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Input,
  Row,
  Col,
  Label,
  CustomInput,
  Button,
  CardText,
  Badge,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
} from "reactstrap";

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import { getSubscription } from "../../../../../redux/actions/subscriptionAction";
import { Link } from "react-router-dom";
import SpinnerFlex from "../../../../components/spinners/SpinnerFlex";

import { getSalonSubscriptionList } from "../../../../../redux/actions/subscriptionAction";
import { DateFormat } from "../../../../../utility/Utils";

// ** Table Header
const CustomHeader = () => {
  const dispatch = useDispatch();

  const [modalVisible, setModalVisible] = useState(false);
  const toggle = () => setModalVisible(!modalVisible);

  const SubscriptionInformation = useSelector((state) => state.getSubscription);
  const { loading } = SubscriptionInformation;
  const Subscription = SubscriptionInformation?.subscription?.data;
  const SalonSubscription = useSelector(
    (state) => state.getSalonSubscriptionList
  );
  const SubscriptionDetail = SalonSubscription?.subscriptionList?.data;
  const salonID = JSON.parse(localStorage.getItem("userData"));
  useEffect(() => {
    dispatch(getSubscription(true));
    dispatch(getSalonSubscriptionList(salonID?.data?.salonId));
  }, []);
  const statusObj = {
    Active: "light-success",
    InActive: "light-secondary",
  };

  return (
    <Fragment>
      <Card>
        <CardBody className="invoice-list-table-header w-100   ">
          <Row>
            <Col xl="6" className="d-flex align-items-center p-0">
              <span
                style={{
                  fontSize: 20,
                  color: "black",
                  fontWeight: "bolder",
                  marginLeft: 6,
                }}
              >
                Subscription Packages
              </span>
            </Col>
            <Col
              xl="6"
              className="d-flex align-items-sm-center justify-content-lg-end justify-content-start flex-lg-nowrap flex-wrap flex-sm-row flex-column pr-lg-1 p-0 mt-lg-0 mt-1"
            >
              <Button.Ripple
                className="button_slide slide_right "
                color="dark"
                onClick={toggle}
              >
                <span>
                  {" "}
                  Details <Eye size={16} />
                </span>
              </Button.Ripple>
            </Col>
          </Row>
        </CardBody>
      </Card>
      <Modal
        className="modal-lg modal-dialog-centered"
        isOpen={modalVisible}
        toggle={toggle}
        modalTransition={{ timeout: 500 }}
      >
        <ModalHeader toggle={toggle}>
          <h3
            style={{
              padding: "5px",
            }}
          >
            Subscription Details & Timeline
          </h3>
        </ModalHeader>
        <ModalBody>
          <Row lg="12">
            <Col
              lg="12"
              className="d-flex border-bottom justify-content-between align-items-center"
            >
              <Col
                lg="2"
                cursor="pointer"
                className=" d-flex align-items-center"
              >
                <h5 className="font-weight-bold">
                  <strong>Subscription Title</strong>
                </h5>
              </Col>
              <Col
                lg="2"
                className=" d-flex align-items-center justify-content-between "
              >
                {/* <Col> */}
                <h5 className="font-weight-bold">
                  <strong>Started At</strong>
                </h5>
                {/* </Col> */}
              </Col>
              <Col lg="2" className="  d-flex align-items-center ">
                <h5 className="font-weight-bold">
                  {" "}
                  <strong>Expires At</strong>
                </h5>
              </Col>
              <Col lg="2" className="  d-flex align-items-center">
                <h5 className="font-weight-bold ">
                  <strong>Paid Amount</strong>
                </h5>
              </Col>
              <Col lg="2" className=" d-flex align-items-center">
                <h5 className="font-weight-bold  ">Status</h5>
              </Col>
            </Col>
          </Row>
          {SubscriptionDetail?.length > 0 ? (
            SubscriptionDetail[0]?.salonSubscription?.map((item) => {
              return (
                <Row lg="12" className="p-1">
                  <Col lg="12" className="d-flex border-bottom ">
                    <Col
                      lg="2"
                      cursor="pointer"
                      className=" d-flex align-items-center"
                    >
                      <h5 className="font-weight-bold  ">
                        {item?.subcriptionDetail[0]?.subscriptionTitle}
                      </h5>
                    </Col>
                    <Col lg="3" className="  d-flex align-items-center ">
                      <h5 className="font-weight-bold">
                        {DateFormat(item?.startedAt)}
                      </h5>
                    </Col>
                    <Col lg="3" className="  d-flex align-items-center ">
                      <h5 className="font-weight-bold">
                        {DateFormat(item?.expiredAt)}
                      </h5>
                    </Col>
                    <Col lg="2" className="  d-flex align-items-center">
                      <h5 className="font-weight-bold ">
                        <span> {item?.paidAmount} PKR</span>
                      </h5>
                    </Col>
                    <Col lg="2" className="d-flex align-items-center ">
                      <Badge
                        className="text-capitalize"
                        color={
                          statusObj[
                            item?.isActive === true ? "Active" : "InActive"
                          ]
                        }
                      >
                        {item?.isActive === true ? "Active" : "Inactive"}
                      </Badge>
                    </Col>
                  </Col>
                </Row>
              );
            })
          ) : (
            <Row className="d-flex align-items-center justify-content-center p-2">
              <strong>No Item to Display</strong>
            </Row>
          )}
        </ModalBody>
        {/* <ModalFooter></ModalFooter> */}
      </Modal>

      {loading ? (
        <SpinnerFlex />
      ) : (
        <Row lg="12">
          {Subscription?.length > 0 ? (
            Subscription?.map((item) => {
              return (
                <Col md="4" xs="12" lg="4" className="mt-2" key={item?._id}>
                  <Card className="text-center">
                    <CardBody>
                      <h3>{item?.subscriptionTitle}</h3>
                      <CardText
                        style={{
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {/* {item.subtitle}
                         */}
                        {item?.description}
                      </CardText>
                      <CardText>
                        Valid for {item?.expiresInMonth} Months
                      </CardText>
                      <CardText>
                        Available for upto {item?.numberOfBranches} Branches
                      </CardText>
                      <div className="annual-plan">
                        <div className="plan-price mt-2">
                          <sup className="font-medium-1 font-weight-bold text-warning mr-25">
                            PKR
                          </sup>
                          <span>{item?.price}</span>
                          <span className="pricing-duration text-body font-medium-1 font-weight-bold ml-25">
                            / month
                          </span>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
              );
            })
          ) : (
            <Col md="8" xs="12" lg="12">
              <Card className="text-center">
                <CardBody>
                  <CardText>No Subscription</CardText>
                </CardBody>
              </Card>
            </Col>
          )}
        </Row>
      )}
    </Fragment>
  );
};

export default CustomHeader;
