// ** React Import
import { useState, useEffect } from "react";

// ** Custom Components
import Sidebar from "@components/sidebar";
import { selectThemeColors } from "@utils";
import { Edit, Home, Search } from "react-feather";
// ** Utils

// ** Third Party Components
import classnames from "classnames";
import { useForm } from "react-hook-form";
import {
  Button,
  FormGroup,
  Label,
  FormText,
  Form,
  Input,
  CustomInput,
  Spinner,
  Card,
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import InputPasswordToggle from "@components/input-password-toggle";
// ** Store & Actions
import { useDispatch, useSelector } from "react-redux";
import { toast, Slide } from "react-toastify";
import { ToastContent } from "../../../../components/ToastContent";
import {
  addStockOrder,
  getStockOrder,
} from "../../../../../../redux/actions/stockOrderAction";
import { getProductAction } from "../../../../../../redux/actions/productActions";

import Select from "react-select";
import { buildMongoQueryMatcher } from "@casl/ability";

const SidebarNewUsers = ({ open, toggleSidebar, hideSidebar }) => {
  // ** States
  const [supplier, setSupplier] = useState();
  const [branch, setBranch] = useState();
  const [productDetail, setProductDetail] = useState();

  const stock = useSelector((state) => state.addStockOrder);
  const { loading } = stock;
  const success = stock?.StockOrder?.success;
  const error = stock?.StockOrder?.error;
  const locale = JSON.parse(localStorage.getItem("userData"));
  const salonID = locale?.data?.salonId;

  const [modal2, setModal2] = useState(false);

  const productInformation = useSelector((state) => state.getProduct);
  const productLoading = productInformation?.loading;
  const productsList = productInformation?.product?.data;
  const productsListSuccess = productInformation?.product?.success;
  const SupplierInformation = useSelector((state) => state.getSupplier);
  const Suppliers = SupplierInformation?.Supplier?.data;
  const branchInformation = useSelector((state) => state.branchesDetail);
  const branches = branchInformation?.branches?.data;
  const [stockOrder, setStockOrder] = useState("");

  console.log("productDetails Test", productDetail);
  console.log("stockOrder Test", stockOrder);

  // console.log("products", products);

  const toggle2 = () => setModal2(!modal2);
  // ** Store Vars

  let productArray = [];
  useEffect(() => {
    if (productsListSuccess) {
      productsList?.forEach((items) => {
        let obj = {};
        obj["isActive"] = false;
        Object.assign(obj, items);
        productArray.push(obj);
      });
      setProductDetail(productArray);
    }
  }, [productsListSuccess]);

  // console.log("productArray", productArray);

  let SupplierArray = [];
  Suppliers?.forEach((item) => {
    let obj = {};
    obj["value"] = item?._id;
    obj["label"] = item?.supplierName;
    SupplierArray.push(obj);
  });
  let branchArray = [];
  branches?.forEach((item) => {
    let obj = {};
    obj["value"] = item?._id;
    obj["label"] = item?.branchTitle;
    branchArray.push(obj);
  });

  console.log("productDetail", productDetail);

  const handleChecked = (id) => {
    setProductDetail(
      productDetail?.map((item) =>
        item._id === id ? { ...item, isActive: !item.isActive } : item
      )
    );
  };

  const handleInputChange = (id, event) => {
    // setOrderQuantity(
    productDetail?.map((item) => {
      if (item._id === id) {
        item[event.target.name] = event.target.value;
      }
    });
    // );
  };

  const handleModalValues = () => {
    let modalArray = [];
    productDetail.forEach((item) => {
      let obj = {};
      obj["productId"] = item?._id;
      obj["unitCost"] = item?.price;
      obj["orderQuantity"] = item?.orderQuantity
        ? item?.orderQuantity
        : item?.remainingAmount;
      obj["totalCost"] = item?.price * obj["orderQuantity"];
      if (item?.isActive === true) {
        // obj["totalCost"] = item?.totalCost;
        modalArray.push(obj);
      }
    });
    setStockOrder(modalArray);
    toggle2();
  };
  const dispatch = useDispatch();
  useEffect(() => {
    if (success) {
      reset();
      dispatch(getStockOrder(salonID, ""));
      dispatch(getProductAction(salonID, ""));
      hideSidebar();
      setStockOrder(null);
      setProductDetail(null);
      toast.success(<ToastContent success={stock?.StockOrder?.message} />, {
        toastId: "success1",
        transition: Slide,
        hideProgressBar: true,
        autoClose: 5000,
      });
    }
    return () => {
      dispatch({ type: "STOCK_ORDER_ADD_RESET" });
    };
  }, [success]);

  useEffect(() => {
    if (error) {
      toast.error(<ToastContent error={stock?.StockOrder?.message} />, {
        transition: Slide,
        hideProgressBar: true,
        autoClose: 5000,
      });
    }
    return () => {
      dispatch({ type: "STOCK_ORDER_ADD_RESET" });
    };
  }, [error]);
  // ** Vars
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  // ** Function to handle form submit
  const onSubmit = (data) => {
    let price = [];
    stockOrder?.map((item) => {
      price?.push(item?.totalCost);
      // debugger;
    });
    var totalOrderPrice = price.reduce(function (a, b) {
      return a + b;
    }, 0);
    console.log("totalOrderPrice", totalOrderPrice);

    const Data = {
      salonId: salonID,
      branchId: branch,
      supplierId: supplier,
      status: "Ordered",
      stockOrderJob: stockOrder,
      totalOrderPrice: totalOrderPrice,
    };

    console.log("data in supplier", Data);
    dispatch(addStockOrder(Data));
  };

  return (
    <Sidebar
      size="lg"
      open={open}
      title="Add Product"
      headerClassName="mb-1"
      contentClassName="pt-0"
      toggleSidebar={toggleSidebar}
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Label className="form-label  " for="branchInfo">
            To Branch<span className="text-danger">*</span>
          </Label>

          <Select
            id="branch"
            name="branch"
            theme={selectThemeColors}
            className="react-select"
            classNamePrefix="select"
            options={branchArray}
            onChange={(v) => {
              setBranch(v.value);
            }}
            innerRef={register({
              required: true,
              validate: (value) => value !== "",
            })}
          />
          {errors.SaloonName?.type === "required" && (
            <small className="text-danger">Required Field</small>
          )}
        </FormGroup>
        <FormGroup>
          <Label className="form-label  " for="supplier">
            Supplier
          </Label>
          <Select
            id="supplier"
            name="supplier"
            theme={selectThemeColors}
            className="react-select"
            classNamePrefix="select"
            options={SupplierArray}
            onChange={(v) => {
              setSupplier(v.value);
              dispatch(getProductAction(salonID, v.value));
              // setProductDetail(productsList);
            }}
            innerRef={register({
              required: true,
              validate: (value) => value !== "",
            })}
          />
        </FormGroup>

        {/* <FormGroup>
          <Label className="form-label  " for="subscriptionTitle">
            Product<span className="text-danger">*</span>
          </Label>

          <Select
            id="product"
            name="product"
            theme={selectThemeColors}
            className="react-select"
            classNamePrefix="select"
            options={productArray}
            onChange={(v) => {
              setProduct(v.value);
            }}
            innerRef={register({
              required: true,
              validate: (value) => value !== "",
            })}
          />
          {errors.SaloonName?.type === "required" && (
            <small className="text-danger">Required Field</small>
          )}
        </FormGroup> */}

        <Card className={" rounded  w-90 border "}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",

              padding: 20,
            }}
          >
            <h4>
              Products (<span>{productDetail?.length}</span>)
            </h4>
            <div>
              {productLoading ? (
                <Spinner size="md" />
              ) : (
                <a
                  style={{
                    textDecoration: "underline",
                    pointerEvents: `${productLoading ? "none" : ""}`,
                  }}
                  color="primary"
                  onClick={toggle2}
                >
                  <Edit size={16} />
                  Edit
                </a>
              )}
            </div>
            <Modal
              className=" modal-lg"
              isOpen={modal2}
              toggle={toggle2}
              modalTransition={{ timeout: 500 }}
            >
              <ModalHeader>
                <h3
                  style={{
                    padding: "5px",
                  }}
                >
                  Select Product, Quantity & Price
                </h3>
              </ModalHeader>
              <ModalBody>
                {productDetail?.length > 0 ? (
                  productDetail?.map((item, index) => {
                    // console.log("working hours", item);
                    return (
                      <>
                        <Col
                          className="custom-control custom-checkbox border-bottom border-2 rounded p-2 m-1  w-100"
                          key={index}
                          lg="12"
                          sm="12"
                          md="12"
                          xs="12"
                        >
                          <Row lg="12" sm="12" md="12" xs="12">
                            <Col
                              className="custom-control custom-checkbox m-1"
                              style={{
                                padding: "0px 0",
                                // borderBottom: "1px solid #e6e6e6",
                                display: "flex",
                                alignItems: "center",
                              }}
                              lg="2"
                              sm="3"
                              md="3"
                            >
                              <CustomInput
                                type="checkbox"
                                checked={item?.isActive}
                                label={item?.productName}
                                id={index}
                                onChange={() => handleChecked(item?._id)}
                              />
                            </Col>
                            {item?.isActive ? (
                              <>
                                {/* {/ <Col lg="4"> /} */}
                                <Col
                                  className="custom-control custom-checkbox m-1"
                                  style={{
                                    padding: "4px 0",
                                    // borderBottom: "1px solid #e6e6e6",
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                  lg="2"
                                  md="4"
                                  sm="4"
                                  xs="5"
                                >
                                  <FormGroup>
                                    <Label
                                      className="form-label  "
                                      for="PricePerUnit"
                                    >
                                      Price per unit
                                    </Label>
                                    <Input
                                      required
                                      id={item?._id}
                                      name="PricePerUnit"
                                      type="number"
                                      defaultValue={item?.price}
                                      className="form-control"
                                      disabled
                                      // onChange={(e) =>
                                      //   handleInputChange(item?._id, e)
                                      // }
                                    />
                                  </FormGroup>
                                </Col>
                                {/* {/ </Col> /}
                                {/ <Row lg="4"> /} */}
                                <Col
                                  lg="2"
                                  md="4"
                                  sm="4"
                                  xs="5"
                                  className="custom-control custom-checkbox m-1"
                                  style={{
                                    padding: "4px 0",
                                    // borderBottom: "1px solid #e6e6e6",
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  <FormGroup>
                                    <Label
                                      className="form-label  "
                                      for="orderQuantity"
                                    >
                                      Max. Quanity
                                    </Label>
                                    <Input
                                      required
                                      id={item?._id}
                                      defaultValue={item?.remainingAmount}
                                      name="orderQuantity"
                                      type="number"
                                      // value={orderQuantity}
                                      onChange={(e) =>
                                        handleInputChange(item?._id, e)
                                      }
                                      className="form-control"
                                    />
                                  </FormGroup>
                                </Col>
                                <Col
                                  lg="2"
                                  md="4"
                                  sm="4"
                                  xs="5"
                                  className="custom-control custom-checkbox m-1"
                                  style={{
                                    padding: "4px 0",

                                    // borderBottom: "1px solid #e6e6e6",
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  {/* <FormGroup>
                                    <Label
                                      className="form-label  "
                                      for="totalCost"
                                    >
                                      Total Cost
                                    </Label>
                                    <Input
                                      required
                                      id={item?._id}
                                      name="totalCost"
                                      type="number"
                                      disabled
                                      value={item?.price * item?.amount}
                                      // onChange={(e) =>
                                      //   handleInputChange(item?._id, e)
                                      // }
                                      className="form-control"
                                    />
                                  </FormGroup> */}
                                </Col>
                                {/* {/ </Row> /} */}
                              </>
                            ) : (
                              <Col
                                style={{
                                  padding: "10px 0",
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                              >
                                Select Prouct to add information
                              </Col>
                            )}
                          </Row>
                        </Col>
                      </>
                    );
                  })
                ) : (
                  <Col>No Product Information</Col>
                )}
              </ModalBody>
              <ModalFooter>
                <div className="d-flex">
                  <Button
                    // type="submit"
                    className="mr-1 button_slide slide_right"
                    color="dark"
                    onClick={() => {
                      handleModalValues();
                    }}
                  >
                    <span>Submit</span>
                  </Button>
                  <Button onClick={toggle2} color="secondary" outline>
                    Cancel
                  </Button>
                </div>
              </ModalFooter>
            </Modal>
          </div>
        </Card>

        <div className="d-flex">
          <Button
            type="submit"
            className="mr-1 button_slide slide_right d-flex align-items-center
"
            color="dark"
          >
            {loading && <Spinner className="mr-50" color="white" size="sm" />}
            <span>Create</span>
          </Button>
          <Button
            type="reset"
            color="secondary"
            outline
            onClick={toggleSidebar}
          >
            Cancel
          </Button>
        </div>
      </Form>
    </Sidebar>
  );
};

export default SidebarNewUsers;
