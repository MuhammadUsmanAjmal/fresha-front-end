import { Fragment, useEffect, useState } from "react";
import { Row, Col, Card, CardBody, Button, Spinner } from "reactstrap";
import {
  Archive,
  ArrowLeft,
  CheckCircle,
  CreditCard,
  DollarSign,
  Inbox,
} from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import { paymentModeAction } from "../../../../redux/actions/paymentModeAction";
import Avatar from "@components/avatar";
import SpinnerFlex from "../../../components/spinners/SpinnerFlex";
import { orderUpdateAction } from "../../../../redux/actions/orderUpdateAction";
import { ToastContent } from "../../components/ToastContent";
import { toast, Slide } from "react-toastify";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { getAllSalesAction } from "../../../../redux/actions/appoinmentAction";
import { useParams } from "react-router-dom";
const MySwal = withReactContent(Swal);
const PaymentSelection = ({ viewChange, orderID }) => {
  const [detail, setDetail] = useState();
  const [active, setActive] = useState(null);

  const dispatch = useDispatch();
  const { branchId, salonId } = useParams();

  const Mode = useSelector((state) => state.PaymentMethod);
  const Order = useSelector((state) => state.updateOrder);
  const UpdateOrderLoading = Order?.loading;

  const OrderSuccess = Order?.OrderUpdate?.success;
  const PayMethod = Mode?.payMode?.data;
  const { loading } = Mode;

  useEffect(() => {
    dispatch(paymentModeAction(salonId));
  }, []);
  useEffect(() => {
    if (OrderSuccess) {
      MySwal.fire({
        title: "Checkout completed",
        icon: "success",

        customClass: {
          confirmButton: "btn btn-success",
          closeButton: viewChange("1"),
        },
        buttonsStyling: false,
      });
      dispatch(getAllSalesAction(branchId, "New"));
    }
    return () => {
      dispatch({ type: "UPDATE_ORDER_RESET" });
    };
    // viewChange("1");
  }, [OrderSuccess]);
  const orderSubmit = () => {
    if (detail) {
      dispatch(
        orderUpdateAction(orderID, {
          paymentModeId: detail?._id,
        })
      );
    } else {
      MySwal.fire({
        title: "Select Payment",
        icon: "warning",
        iconColor: "warning",

        customClass: {
          confirmButton: "btn btn-warning",
        },
        buttonsStyling: false,
      });
    }
  };
  return (
    <Fragment>
      <Col className="d-flex justify-content-between align-items-center" lg="5">
        <h3 style={{ color: "black", fontWeight: "bold" }}>
          <ArrowLeft
            className="mr-1"
            onClick={() => {
              viewChange("1");
            }}
          />
          Select payment
        </h3>
      </Col>
      {loading ? (
        <SpinnerFlex />
      ) : (
        <Row lg="12" className="d-flex align-items-center ">
          {PayMethod &&
            PayMethod?.map((item, index) => {
              return (
                <Row lg="8" className="ml-4 mt-3" key={item?._id}>
                  <Card
                    cursor="pointer"
                    key={index + item?._id}
                    className={
                      item?._id === active ? "border-warning" : "border"
                    }
                    style={{ height: 100, width: 150, position: "relative" }}
                    onClick={(event) => {
                      event.preventDefault();
                      setActive(item?._id);
                      setDetail(item);
                    }}
                  >
                    {item?._id === active && (
                      <span
                        className="d-flex flex-end "
                        style={{
                          position: "absolute",
                          top: -10,
                          right: -10,
                        }}
                      >
                        <CheckCircle
                          size={20}
                          style={{
                            color: "#F68D2F",
                          }}
                        />
                      </span>
                    )}
                    <CardBody className=" d-flex align-items-center flex-column justify-content-center ">
                      <Avatar
                        icon={
                          item?.modeType === "Cash" ? (
                            <Archive />
                          ) : item?.modeType === "Bank" ? (
                            <CreditCard />
                          ) : null
                        }
                        color={`${
                          item?.modeType === "Cash"
                            ? "light-success"
                            : item?.modeType === "Bank"
                            ? "light-warning"
                            : null
                        }`}
                      />
                      <span style={{ fontWeight: "bold", color: "black" }}>
                        {item?.modeType === "Cash"
                          ? "Cash"
                          : item?.modeType === "Bank"
                          ? "Bank"
                          : null}
                      </span>
                    </CardBody>
                  </Card>
                </Row>
              );
            })}
        </Row>
      )}
      <Col lg="12" className="d-flex justify-content-end  ">
        <Button
          color="relief-dark"
          className="mr-2 d-flex align-items-center"
          onClick={orderSubmit}
        >
          {UpdateOrderLoading && (
            <Spinner className="mr-50" color="white" size="sm" />
          )}
          <span>Pay</span>
        </Button>
      </Col>
    </Fragment>
  );
};

export default PaymentSelection;
