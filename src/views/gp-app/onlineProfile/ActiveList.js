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
  InputGroupAddon,
  InputGroup,
} from "reactstrap";
import "@styles/react/libs/flatpickr/flatpickr.scss";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getBookingAction } from "../../../redux/actions/onlineBookingAction";
import { BRANCH_URL } from "../../../configs/env";
import { Copy } from "react-feather";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Swal from "sweetalert2";
const MySwal = withReactContent(Swal);
import withReactContent from "sweetalert2-react-content";
import Avatar from "../../../assets/images/avatars/avatar-blank.png";
import SpinnerFlex from "../../components/spinners/SpinnerFlex";

const ActiveListingInfoTab = ({ toggleRegForm, BranchID, activeTab }) => {
  const dispatch = useDispatch();
  const [active, setActive] = useState("");
  const [value, setValue] = useState();
  const [copied, setCopied] = useState(false);
  const branch = useSelector((state) => state.branchStatus);
  const BranchListing = branch?.branchActive?.data;
  const branchLoading = branch?.loading;
  const Info = JSON.parse(localStorage.getItem("userData"));
  const Booking = useSelector((state) => state.onlineBooking);
  const { loading } = Booking;
  const BookingLink = Booking?.onlineBookingDetail?.data;
  const BookingSuccess = Booking?.onlineBookingDetail?.success;
  const salonId = Info?.data?.salonId;
  const userId = Info?.data?.id;
  const statusObj = {
    false: "light-secondary",
    true: "light-success",
  };

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

  const handleCopy = ({ target: { value } }) => {
    setValue(value);
    setCopied(false);
  };

  const onCopy = () => {
    setCopied(true);
  };
  const formatDate = (date) => {
    const today = new Date(date);
    return today.toLocaleDateString();
  };

  return (
    <>
      {branchLoading ? (
        <SpinnerFlex />
      ) : (
        BranchListing.map((item, index) => {
          return (
            // <Card className="border" key={index}>
            <Row className={`p-2 m-3  rounded border`} key={index}>
              <Col lg="3">
                <img
                  // src={item ? item?.image : Avatar}
                  src={item?.image !== "" ? Avatar : item?.image}
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
                      className="text-capitalize  ml-2"
                      color={
                        statusObj[item?.isActive === true ? "true" : "false"]
                      }
                    >
                      {item?.isActive === true ? "Online" : "Offline"}
                    </Badge>
                    <Button.Ripple
                      color="dark"
                      size="md"
                      onClick={() => {
                        setActive(item);
                        dispatch(getBookingAction(item?._id, userId, salonId));
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
      )}
    </>
  );
};

export default ActiveListingInfoTab;
