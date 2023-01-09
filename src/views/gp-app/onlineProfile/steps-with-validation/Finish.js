import { Fragment, useEffect, useState } from "react";
import classnames from "classnames";
import { isObjEmpty } from "@utils";
import { useForm } from "react-hook-form";
import { ArrowLeft, Copy } from "react-feather";
import {
  Label,
  FormGroup,
  Row,
  Col,
  Button,
  Form,
  Input,
  Spinner,
  InputGroup,
  InputGroupAddon,
} from "reactstrap";
import { Tooltip, Popover } from "bootstrap";

import FileUploaderBasic from "../../components/fileUploaderBasic";
import ProfileImageUpload from "../../components/profileImage";
import { createBookingAction } from "../../../../redux/actions/onlineBookingAction";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { BRANCH_URL } from "../../../../configs/env";
import { toast, Slide } from "react-toastify";
import { ToastContent } from "../../components/ToastContent";
import { getBranchesAction } from "../../../../redux/actions/branchActions";
const MySwal = withReactContent(Swal);

const FinalStep = ({
  stepper,
  type,
  FirstFormValue,
  SecondFormValue,
  ThirdFormValue,
  FormDetail,
  toggleRegForm,
  BranchId,
}) => {
  const dispatch = useDispatch();
  const BookingDetail = useSelector((state) => state.createBooking);
  const [value, setValue] = useState();
  const [copied, setCopied] = useState(false);
  const [imgPath, setImgPath] = useState(
    FormDetail && FormDetail[0]?.branchInformation[0]?.image
  );
  const BookingInfo = BookingDetail?.createBookingDetail?.data;
  const { loading } = BookingDetail;
  const createSuccess = BookingDetail?.createBookingDetail?.success;
  const createError = BookingDetail?.createBookingDetail?.error;
  const Image = useSelector((state) => state.branchImage);
  const ImageUrlDetail = Image?.ImageUrl?.data;
  const { handleSubmit } = useForm();
  const Info = JSON.parse(localStorage.getItem("userData"));
  const branchId = Info?.data?.branchId;
  const salonId = Info?.data?.salonId;
  const userId = Info?.data?.id;

  useEffect(() => {
    if (createSuccess) {
      MySwal.fire({
        title: "Your Salon profile is ready!",
        icon: "success",
        html: (
          <>
            <span className="p-1">
              Clients can now book with you online. Share the link below to get
              started.
            </span>
            <Row className="p-2">
              <InputGroup>
                <Input
                  value={`${BRANCH_URL}${BookingInfo}`}
                  onChange={handleCopy}
                />
                <InputGroupAddon addonType="append">
                  <CopyToClipboard
                    onCopy={onCopy}
                    text={`${BRANCH_URL}${BookingInfo}`}
                  >
                    <Button.Ripple color="dark" outline>
                      <Copy size={15} />
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
          closeButton: toggleRegForm("1"),
        },
        buttonsStyling: false,
        confirmButtonText: "Ok,got it",
      });
      dispatch(getBranchesAction(branchId, ""));
    }
    return () => {
      dispatch({ type: "BOOKING_CREATE_RESET" });
    };
  }, [createSuccess]);

  useEffect(() => {
    if (createError) {
      toast.error(
        <ToastContent error={BookingDetail?.createBookingDetail?.message} />,
        {
          transition: Slide,
          hideProgressBar: true,
          autoClose: 2000,
        }
      );
    }
    return () => {
      dispatch({ type: "BOOKING_CREATE_RESET" });
      dispatch({ type: "BRANCH_IMAGE_RESET" });
    };
  }, [createError]);

  /*eslint-enable */

  const handleCopy = ({ target: { value } }) => {
    setValue(value);
    setCopied(false);
  };

  const onCopy = () => {
    setCopied(true);
  };
  const onSubmit = () => {
    const today = new Date(Date.now());
    const formData = {
      email: FirstFormValue?.email,
      description: FirstFormValue?.description,
      branchTitle: FirstFormValue?.salonTitle,
      contactNumber: FirstFormValue?.phone,
      address: SecondFormValue?.address,
      timings: ThirdFormValue,
      image: ImageUrlDetail ? ImageUrlDetail : imgPath,
      lastModifiedDate: today.toLocaleDateString(),
    };
    dispatch(createBookingAction(BranchId, userId, salonId, formData));
  };

  return (
    <Fragment>
      <Form onSubmit={handleSubmit(onSubmit)}>
        {/* <Col className="content-header"> */}
        <h5 className="mb-0" style={{ fontWeight: "bolder" }}>
          You're almost done!
        </h5>

        <small className="d-flex justify-content-center align-items-center">
          Click the button below to get the link which your clients can use to
          visit your online salon, book appointments and much more....
        </small>
        {/* </Col> */}
        <div className="d-flex">
          <Button.Ripple
            color="dark"
            className=" mt-1 mr-2"
            onClick={() => stepper.previous()}
          >
            <ArrowLeft
              size={14}
              className="align-middle mr-sm-25 mr-0"
            ></ArrowLeft>
            {/* <span className="align-middle d-sm-inline-block d-none"> */}
            Previous
            {/* </span> */}
          </Button.Ripple>
          <Button.Ripple
            type="submit"
            color="warning"
            className="btn-submit mt-1 d-flex align-items-center justify-content-center"
          >
            {loading && <Spinner className="mr-50" color="white" size="sm" />}
            Publish
          </Button.Ripple>
        </div>
      </Form>
    </Fragment>
  );
};

export default FinalStep;
