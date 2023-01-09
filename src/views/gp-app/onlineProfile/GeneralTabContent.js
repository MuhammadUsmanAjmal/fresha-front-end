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
  Spinner,
  InputGroupAddon,
  InputGroup,
  // Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import defaultAvatar from "@src/assets/images/avatars/avatar-blank.png";
import { useDispatch, useSelector } from "react-redux";
import { getBookingAction } from "../../../redux/actions/onlineBookingAction";
import WizardHorizontal from "./WizardHorizontal";
import { BRANCH_URL } from "../../../configs/env";
import { Copy, X } from "react-feather";
const MySwal = withReactContent(Swal);
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Model from "../components/model.js";
import ListingInfoTab from "./ListingInfoTab";
import { getBranchesAction } from "../../../redux/actions/branchActions";
import ActiveListingInfoTab from "./ActiveList";
const GeneralTabs = ({ activeTab }) => {
  const dispatch = useDispatch();
  const [value, setValue] = useState();
  const [copied, setCopied] = useState(false);
  const Booking = useSelector((state) => state.onlineBooking);
  const { loading } = Booking;
  const BookingLink = Booking?.onlineBookingDetail?.data;
  const BookingSuccess = Booking?.onlineBookingDetail?.success;
  const Listing = useSelector((state) => state.branchStatus);
  const branchListing = Listing?.branchActive?.data;
  const branchId = branchListing && branchListing[0]?._id;
  const salonId = branchListing && branchListing[0]?.salonId;

  const [activeForm, setActiveForm] = useState("1");
  const [modal, setModal] = useState(false);
  const [id, setId] = useState("");
  const Info = JSON.parse(localStorage.getItem("userData"));

  const userId = Info?.data?.id;
  useEffect(() => {
    if (
      BookingSuccess &&
      BookingLink[0]?.branchInformation[0]?.isLinkGenerated === true &&
      activeTab === "2"
    ) {
      MySwal.fire({
        title: "Your link is ready",
        icon: "success",
        html: (
          <>
            <span className="p-1">
              You have created a link to your entire menu offer.
            </span>
            <Row className="p-2">
              <InputGroup>
                <Input
                  value={`${BRANCH_URL}${
                    BookingLink && BookingLink?.[0]?.generatedLink
                  }`}
                  onChange={handleCopy}
                />
                <InputGroupAddon addonType="append">
                  <CopyToClipboard
                    onCopy={onCopy}
                    text={`${BRANCH_URL}${
                      BookingLink && BookingLink?.[0]?.generatedLink
                    }`}
                  >
                    <Button.Ripple color="dark" outline>
                      <Copy size={14} />
                    </Button.Ripple>
                  </CopyToClipboard>
                </InputGroupAddon>
              </InputGroup>
            </Row>
          </>
        ),
        customClass: {
          confirmButton: "btn btn-dark",
          title: "p-1",
        },
        buttonsStyling: false,
        confirmButtonText: "Ok,got it",
      });
    }
    return () => {
      dispatch({ type: "BOOKING_GET_RESET" });
    };
  }, [BookingSuccess]);

  const toggleModal = () => {
    setModal(!modal);
  };
  const handleCopy = ({ target: { value } }) => {
    setValue(value);
    setCopied(false);
  };

  const onCopy = () => {
    setCopied(true);
  };
  const toggleRegForm = (tab) => {
    setActiveForm(tab);
  };
  const BranchID = (val) => {
    setId(val);
  };
  const CheckLink = () => {
    if (branchListing?.length === 0) {
      setModal(!modal);
    } else if (branchListing?.length === 1) {
      dispatch(getBookingAction(branchId, userId, salonId));
    } else if (branchListing?.length >= 1) {
      dispatch(getBranchesAction(salonId, true));
      toggleRegForm("4");
    }
  };

  return (
    <Fragment>
      {modal && (
        <Model
          open={modal}
          toggle={toggleModal}
          toggleRegForm={toggleRegForm}
        />
      )}
      {activeForm === "1" && (
        <>
          <Col lg="4">
            <h3 style={{ color: "black", fontWeight: "bold" }}>Link builder</h3>
          </Col>
          <Row>
            <Col md="6">
              <Card className={" rounded  p-1 m-2  w-90 border "}>
                <CardBody>
                  {/* <Col lg="9"> */}
                  <h4 style={{ color: "black", fontWeight: "bold" }}>
                    Link to everything
                  </h4>
                  {/* </Col> */}
                  <p>
                    One simple link covering everything your clients can book or
                    buy online.
                  </p>

                  <hr></hr>
                  <CardBody className="card-body d-flex justify-content-center  my-sm-0 mb-3 ">
                    <Button.Ripple
                      className="button_slide slide_right p-1 d-flex justify-content-center align-items-center"
                      color="dark"
                      block
                      onClick={CheckLink}
                    >
                      {loading && (
                        <Spinner className="mr-50" color="white" size="sm" />
                      )}

                      <span>Get Link</span>
                    </Button.Ripple>
                  </CardBody>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </>
      )}
      {activeForm === "2" && (
        <WizardHorizontal toggleRegForm={toggleRegForm} id={id} />
      )}
      {activeForm === "3" && (
        <ListingInfoTab toggleRegForm={toggleRegForm} BranchID={BranchID} />
      )}
      {activeForm === "4" && (
        <ActiveListingInfoTab
          toggleRegForm={toggleRegForm}
          activeTab={activeTab}
        />
      )}
    </Fragment>
  );
};

export default GeneralTabs;
