// // ** React Import
// import { useEffect, useState, useRef } from "react";
// import React, { Component } from "react";
// // ** Custom Components
// import { Edit, Home, Search } from "react-feather";
// import Sidebar from "@components/sidebar";
// // import { toast, Slide } from "react-toastify";
// import { ToastContent } from "../../../../components/ToastContent";
// import { selectThemeColors } from "@utils";
// // ** Third Party Components
// import classnames from "classnames";
// import Select from "react-select";
// import { useForm } from "react-hook-form";
// import {
//   Button,
//   FormGroup,
//   CustomInput,
//   Label,
//   Form,
//   Input,
//   Spinner,
//   Card,
//   Row,
//   Col,
//   Modal,
//   ModalHeader,
//   ModalBody,
//   ModalFooter,
// } from "reactstrap";

// // ** Store & Actions
// import { useDispatch, useSelector } from "react-redux";

// // import {
// //   getSupplier,
// //   updateStockOrder,
// // } from "../../../../../../redux/actions/supplierActions";
// import {
//   getStockOrder,
//   updateStockOrder,
// } from "../../../../../../redux/actions/stockOrderAction";

// import { toast, Slide } from "react-toastify";
// import { getProductAction } from "../../../../../../redux/actions/productActions";
// // import { ToastContent } from "../../../components/ToastContent";
// const SidebarUpdateService = ({ open, toggleSidebar, Data, hideSidebar }) => {
//   // ** States
//   const [productDetail, setProductDetail] = useState();

//   const [stockOrder, setStockOrder] = useState([]);

//   const [stateData, setStateData] = useState({});

//   console.log("checked prod returned from BE", stateData?.stockOrderJobs);
//   const productInformation = useSelector((state) => state.getProduct);
//   const productLoading = productInformation?.loading;
//   const productsList = productInformation?.product?.data;
//   const productsListSuccess = productInformation?.product?.success;
//   console.log("all prod supplied", productInformation?.product?.data);

//   const StockOrderUpdate = useSelector((state) => state.updateStockOrder);
//   const { loading } = StockOrderUpdate;
//   const updateSuccess = StockOrderUpdate?.StockOrder?.success;
//   const updateError = StockOrderUpdate?.StockOrder?.error;
//   const locale = JSON.parse(localStorage.getItem("userData"));
//   const salonID = locale?.data?.salonId;

//   const [modal2, setModal2] = useState(false);

//   console.log("new stock order status", stockOrder);

//   const toggle2 = () => setModal2(!modal2);
//   // ** Store Vars
//   const dispatch = useDispatch();

//   // ** Vars
//   const { register, errors, handleSubmit, reset } = useForm();

//   useEffect(() => {
//     if (Data) {
//       setStateData(Data);
//       setStockOrder(Data?.stockOrderJobs);
//     } else {
//       setStateData({});
//     }
//   }, [Data]);

//   useEffect(() => {
//     if (Data?.supplierInformation && Data?.supplierInformation[0]?._id) {
//       dispatch(
//         getProductAction(
//           salonID,
//           Data?.supplierInformation && Data?.supplierInformation[0]?._id
//         )
//       );
//     }
//   }, [Data]);
//   let productArray = [];
//   useEffect(() => {
//     if (productsListSuccess) {
//       productsList?.forEach((items) => {
//         let obj = {};
//         obj["isActive"] = false;
//         obj["price"] = items.price;
//         obj["_id"] = items._id;

//         // Object.assign(obj, items);
//         productArray.push(obj);
//       });
//       setProductDetail(productArray);
//     }
//   }, [productsListSuccess]);

//   const handleChecked = (event, id) => {
//     const isIncluded = stockOrder?.some((stockOrderJob) => {
//       const included = stockOrderJob.productInformation?.some(
//         (product) => product._id === id
//       );
//       return included;
//     });

//     if (isIncluded && !event.target.checked) {
//       setStockOrder(
//         stockOrder.filter((stockOrderJob) => {
//           const included = stockOrderJob.productInformation?.some(
//             (product) => product._id !== id
//           );
//           return included;
//         })
//       );
//     } else if (!isIncluded && event.target.checked) {
//       console.log(stockOrder);
//       console.log(
//         "productInformation?.product?.data._id",
//         productInformation?.product?.data
//       );
//       console.log("id", id);
//       // setStockOrder(
//       //   productInformation?.product?.data.map((product) => {
//       //     productDetail?.map((item) => {
//       //       if (item._id === product._id) {
//       //         return {
//       //           ...stockOrder,
//       //           productInformation: [...stockOrder?.productInformation, item],
//       //         };
//       //       }
//       //     });
//       //   })
//       // );
//     }

//     console.log("productDetail", productDetail);

//     // console.log("stockOrder", stockOrder);
//     // if(e.target.name === "orderStock" && stockOrder.(value)) {
//     //     const newList = list.filter((item) => item !== value);
//     //     setList(newList);
//     // }
//     console.log("isActive", isIncluded);
//     return false;
//   };

//   const isActive = (id) => {
//     const isIncluded = stockOrder?.some((stockOrderJob) => {
//       const included = stockOrderJob.productInformation?.some(
//         (product) => product._id === id
//       );
//       return included;
//     });
//     console.log("isActive", isIncluded);
//     return isIncluded;
//   };

//   const handleModalValues = () => {
//     let modalArray = [];
//     productDetail.forEach((item) => {
//       let obj = {};
//       obj["productId"] = item?._id;
//       obj["unitCost"] = item?.price;
//       obj["orderQuantity"] = item?.orderQuantity;
//       obj["totalCost"] = item?.totalCost;
//       modalArray.push(obj);
//     });
//     setStockOrder(modalArray);
//     toggle2();
//   };

//   const handleInputChange = (id, event) => {
//     // setOrderQuantity(
//     productDetail?.map((item) => {
//       if (item._id === id) {
//         item[event.target.name] = event.target.value;
//       }
//     });
//     // );
//   };

//   useEffect(() => {
//     if (updateSuccess) {
//       dispatch(getStockOrder(salonID));
//       reset();
//       hideSidebar();
//       toast.success(
//         <ToastContent success={StockOrderUpdate?.StockOrder?.message} />,
//         {
//           transition: Slide,
//           hideProgressBar: true,
//           autoClose: 2000,
//         }
//       );
//     }
//     return () => {
//       dispatch({ type: "STOCK_ORDERS_UPDATE_RESET" });
//     };
//   }, [updateSuccess]);
//   useEffect(() => {
//     if (updateError) {
//       toast.error(
//         <ToastContent error={StockOrderUpdate?.StockOrder?.message} />,
//         {
//           transition: Slide,
//           hideProgressBar: true,
//           autoClose: 2000,
//         }
//       );
//     }

//     return () => {
//       dispatch({ type: "STOCK_ORDERS_UPDATE_RESET" });
//     };
//   }, [updateError]);
//   // ** Function to handle form submit
//   const onSubmit = (data) => {
//     const OBJ = {
//       salonId: salonID,
//       // branchId: branch,
//       // supplierId: supplier,
//       // status: "Ordered",
//       stockOrderJob: stockOrder,
//       totalOrderPrice: totalOrderPrice,
//     };
//     // console.log("updated Data", OBJ);
//     dispatch(updateStockOrder(Data?._id, OBJ));
//   };

//   const isChecked = (id) => {
//     const isActive = stateData.stockOrderJobs?.some((stockOrderJob) => {
//       const active = stockOrderJob.productInformation.some(
//         (product) => product._id === id
//       );
//       return active;
//     });
//     // console.log("isActive", isActive);
//     return isActive;
//   };

//   return (
//     <Sidebar
//       size="lg"
//       open={open}
//       title="Edit Product"
//       headerClassName="mb-1"
//       contentClassName="pt-0"
//       toggleSidebar={toggleSidebar}
//     >
//       <Form onSubmit={handleSubmit(onSubmit)}>
//         <Card className={" rounded  w-90 border "}>
//           <div
//             style={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",

//               padding: 20,
//             }}
//           >
//             <h4>
//               Products (
//               <span>
//                 {Data?.stockOrderJobs && Data?.stockOrderJobs?.length}
//               </span>
//               )
//             </h4>
//             <div>
//               {productLoading ? (
//                 <Spinner size="md" />
//               ) : (
//                 <a
//                   style={{
//                     textDecoration: "underline",
//                     pointerEvents: `${productLoading ? "none" : ""}`,
//                   }}
//                   color="primary"
//                   onClick={toggle2}
//                 >
//                   <Edit size={16} />
//                   Edit
//                 </a>
//               )}
//             </div>
//             <Modal
//               className=" modal-lg"
//               isOpen={modal2}
//               toggle={toggle2}
//               modalTransition={{ timeout: 500 }}
//             >
//               <ModalHeader>
//                 {" "}
//                 <h3
//                   style={{
//                     padding: "5px",
//                   }}
//                 >
//                   Select Product, Quantity & Price
//                 </h3>
//               </ModalHeader>
//               <ModalBody>
//                 {productDetail?.length > 0 ? (
//                   productDetail?.map((item, index) => {
//                     // console.log("isChecked", isChecked(item._id));
//                     // console.log("working hours", item);
//                     return (
//                       <>
//                         <Col
//                           className="custom-control custom-checkbox border-bottom border-2 rounded p-2 m-1  w-100"
//                           key={index}
//                           lg="12"
//                           sm="12"
//                           md="12"
//                           xs="12"
//                         >
//                           <Row lg="12" sm="12" md="12" xs="12">
//                             <Col
//                               className="custom-control custom-checkbox m-1"
//                               style={{
//                                 padding: "0px 0",
//                                 // borderBottom: "1px solid #e6e6e6",
//                                 display: "flex",
//                                 alignItems: "center",
//                               }}
//                               lg="2"
//                               sm="3"
//                               md="3"
//                             >
//                               <CustomInput
//                                 type="checkbox"
//                                 checked={isActive(item._id) ? true : false}
//                                 label={item?.productName}
//                                 name="orderStock"
//                                 // checked={
//                                 //   isChecked(item?._id)
//                                 //     ? true
//                                 //     : false || item?.isActive
//                                 // }
//                                 id={index}
//                                 onChange={(e) => handleChecked(e, item?._id)}
//                               />
//                             </Col>
//                             {item?.isActive ? (
//                               <>
//                                 {/* <Col lg="4"> */}
//                                 <Col
//                                   className="custom-control custom-checkbox m-1"
//                                   style={{
//                                     padding: "4px 0",
//                                     // borderBottom: "1px solid #e6e6e6",
//                                     display: "flex",
//                                     alignItems: "center",
//                                   }}
//                                   lg="2"
//                                   md="4"
//                                   sm="4"
//                                   xs="5"
//                                 >
//                                   <FormGroup>
//                                     <Label
//                                       className="form-label  "
//                                       for="PricePerUnit"
//                                     >
//                                       Price per unit
//                                     </Label>
//                                     <Input
//                                       required
//                                       id={item?._id}
//                                       name="PricePerUnit"
//                                       type="number"
//                                       defaultValue={item?.price}
//                                       className="form-control"
//                                       disabled
//                                       // onChange={(e) =>
//                                       //   handleInputChange(item?._id, e)
//                                       // }
//                                     />
//                                   </FormGroup>
//                                 </Col>
//                                 {/* </Col> */}
//                                 {/* <Row lg="4"> */}
//                                 <Col
//                                   lg="2"
//                                   md="4"
//                                   sm="4"
//                                   xs="5"
//                                   className="custom-control custom-checkbox m-1"
//                                   style={{
//                                     padding: "4px 0",
//                                     // borderBottom: "1px solid #e6e6e6",
//                                     display: "flex",
//                                     alignItems: "center",
//                                   }}
//                                 >
//                                   <FormGroup>
//                                     <Label
//                                       className="form-label  "
//                                       for="orderQuantity"
//                                     >
//                                       Max. Quanity
//                                     </Label>
//                                     <Input
//                                       required
//                                       id={item?._id}
//                                       defaultValue={item?.amount}
//                                       name="orderQuantity"
//                                       type="number"
//                                       // value={orderQuantity}
//                                       onChange={(e) =>
//                                         handleInputChange(item?._id, e)
//                                       }
//                                       className="form-control"
//                                     />
//                                   </FormGroup>
//                                 </Col>
//                                 <Col
//                                   lg="2"
//                                   md="4"
//                                   sm="4"
//                                   xs="5"
//                                   className="custom-control custom-checkbox m-1"
//                                   style={{
//                                     padding: "4px 0",

//                                     // borderBottom: "1px solid #e6e6e6",
//                                     display: "flex",
//                                     alignItems: "center",
//                                   }}
//                                 >
//                                   {/* <FormGroup>
//                                     <Input
//                                       required
//                                       id={item?._id}
//                                       name="totalCost"
//                                       type="number"
//                                       // value={totalCost}
//                                       onChange={(e) =>
//                                         handleInputChange(item?._id, e)
//                                       }
//                                       className="form-control"
//                                     />
//                                   </FormGroup> */}
//                                 </Col>
//                                 {/* </Row> */}
//                               </>
//                             ) : (
//                               <Col
//                                 style={{
//                                   padding: "10px 0",
//                                   display: "flex",
//                                   justifyContent: "center",
//                                   alignItems: "center",
//                                 }}
//                               >
//                                 Select Prouct to add information
//                               </Col>
//                             )}
//                           </Row>
//                         </Col>
//                       </>
//                     );
//                   })
//                 ) : (
//                   <Col>No Product Information</Col>
//                 )}
//               </ModalBody>
//               <ModalFooter>
//                 <div className="d-flex">
//                   <Button
//                     // type="submit"
//                     className="mr-1 button_slide slide_right"
//                     color="dark"
//                     onClick={() => {
//                       handleModalValues();
//                     }}
//                   >
//                     <span>Submit</span>
//                   </Button>
//                   <Button onClick={toggle2} color="secondary" outline>
//                     Cancel
//                   </Button>
//                 </div>
//               </ModalFooter>
//             </Modal>
//           </div>
//         </Card>

//         <div className="d-flex">
//           <Button
//             type="submit"
//             className="mr-1 button_slide slide_right d-flex align-items-center
// "
//             color="dark"
//           >
//             {loading && <Spinner className="mr-50" color="white" size="sm" />}
//             <span>Create</span>
//           </Button>
//           <Button
//             type="reset"
//             color="secondary"
//             outline
//             onClick={toggleSidebar}
//           >
//             Cancel
//           </Button>
//         </div>
//       </Form>
//     </Sidebar>
//   );
// };

// export default SidebarUpdateService;
