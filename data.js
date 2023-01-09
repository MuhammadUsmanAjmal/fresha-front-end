// // ** React Import
// import { useEffect, useState, useRef } from "react";
// import Flatpickr from "react-flatpickr";
// import React, { Component } from "react";
// import Select from "react-select";
// import { Edit, Home, Search } from "react-feather";
// import Cleave from "cleave.js/react";

// // ** Custom Components
// import Sidebar from "@components/sidebar";
// import { toast, Slide } from "react-toastify";
// import AutoComplete from "@components/autocomplete";

// // ** Third Party Components
// import classnames from "classnames";
// import { useForm, Controller } from "react-hook-form";
// import {
//   Button,
//   Card,
//   CardBody,
//   FormGroup,
//   Label,
//   FormText,
//   Form,
//   Input,
//   Modal,
//   Row,
//   ModalHeader,
//   ModalBody,
//   ModalFooter,
//   InputGroup,
//   InputGroupAddon,
//   InputGroupText,
//   Spinner,
//   Media,
//   Col,
//   CustomInput,
// } from "reactstrap";
// import InputPasswordToggle from "@components/input-password-toggle";
// // import { MultiSelect } from "react-multi-select-component";
// // import { Modal, Button } from "react-bootstrap";
// // import { Search } from "react-feather";

// // ** Store & Actions
// import { useDispatch, useSelector } from "react-redux";
// import "@styles/react/libs/flatpickr/flatpickr.scss";
// import { getServices } from "../../../../redux/actions/servicesActions";
// import {
//   addStaff,
//   addStaffImageAction,
//   getStaff,
// } from "../../../../redux/actions/staffActions";
// import { ToastContent } from "../../components/ToastContent";
// import defaultAvatar from "@src/assets/images/avatars/avatar-blank.png";
// import ImageUpload from "../../components/imageUpload";
// const SidebarNewUsers = ({ open, toggleSidebar, hideSidebar }) => {
//   // ** States

//   // const allChecked = useRef("");

//   const service = useSelector((state) => state.getServices);
//   const serviceStore = service?.services?.data;
//   const Staffing = useSelector((state) => state.addStaff);
//   const { loading } = Staffing;
//   const success = Staffing?.Staff?.success;
//   const error = Staffing?.Staff?.error;

//   const ImageDetail = useSelector((state) => state.addStaffImage);
//   const ImageUrl = ImageDetail?.Staff?.data;
//   const ImageUrlLoading = ImageDetail && ImageDetail?.loading;
//   const [selectedOption, setSelectedOption] = useState();
//   const [selected, setSelected] = useState([]);
//   const [modal, setModal] = useState(false);
//   const [query, setQuery] = useState("Body");

//   const [cnic, setCnic] = useState("");
//   const handleInput = ({ target: { value } }) => setCnic(value);

//   const [isCheckAll, setIsCheckAll] = useState(false);
//   const [isCheck, setIsCheck] = useState([]);
//   const [list, setList] = useState([]);
//   const [image, setImage] = useState();
//   const [allCheck, setAllCheck] = useState(false);

//   console.log("list", list);
//   console.log("allCheck", allCheck);

//   const setCheckedList = (e, value) => {
//     if (e.target.name === "all" && e.target.checked) {
//       setList([]);
//       Array1.forEach((category) => {
//         category.services.forEach((service) => {
//           setList((prevState) => [...prevState, service._id]);
//         });
//       });
//     } else if (e.target.name === "all" && !e.target.checked) {
//       setList([]);
//     } else if (e.target.name === "service" && list.includes(value)) {
//       const newList = list.filter((item) => item !== value);
//       setList(newList);
//     } else if (e.target.name === "service" && !list.includes(value)) {
//       setList([...list, value]);
//     } else if (e.target.name === "category" && e.target.checked) {
//       const category = Array1.find((item) => item._id === value);
//       category.services.forEach((service) => {
//         setList((prevState) =>
//           prevState.filter((item) => item !== service._id)
//         );
//       });
//       category.services.forEach((service) => {
//         setList((prevState) => [...prevState, service._id]);
//       });
//     } else if (e.target.name === "category" && !e.target.checked) {
//       const category = Array1.find((item) => item._id === value);
//       category.services.forEach((service) => {
//         setList((prevState) =>
//           prevState.filter((item) => item !== service._id)
//         );
//       });
//     }
//   };

//   const isCatgeoryChecked = (id) => {
//     const category = Array1.find((item) => item._id === id);
//     return category?.services.every((service) => list.includes(service._id));
//   }


//   const allServicesIn = () => {
//     setAllCheck(false);

//     let allservices = [];
//     Array1?.forEach((category) => {
//       category.services.forEach((service) => {
//         allservices.push(service._id);
//       });
//     });

//     if (Array1.length) {
//       let checker = allservices.length === list.length;

//       // console.log("Checker", checker);
//       setAllCheck(checker);
//     }
//   };

//   const checkCategoryChecked = (id) => {
//     let services = [];
//     const category = Array1.find((item) => item._id === id);
//     category?.services.forEach((service) => {
//       services.push(service._id);
//     });

//     const checker = list.every((v) => services.includes(v));
//     // console.log("checker in", checker);
//     return checker;
//   };

//   useEffect(() => {
//     allServicesIn();
//   }, [list, Array1]);

//   // ** Store Vars
//   const dispatch = useDispatch();

//   // ** Vars
//   const { control, register, errors, handleSubmit } = useForm();

//   useEffect(() => {
//     dispatch(getServices(InfoData?.data?.branchId, true));
//   }, []);

//   useEffect(() => {
//     if (error) {
//       toast.error(<ToastContent error={Staffing?.Staff?.message} />, {
//         transition: Slide,
//         hideProgressBar: true,
//         autoClose: 2000,
//       });
//     }
//     return () => {
//       dispatch({ type: "STAFF_ADD_RESET" });
//     };
//   }, [error]);
//   let service_array = [];
//   for (let i = 0; i < serviceStore?.length; i++) {
//     if (serviceStore[i].allServices?.length > 0) {
//       for (let j = 0; j < serviceStore[i].allServices?.length; j++) {
//         service_array.push(serviceStore[i].allServices[j]);
//       }
//     }
//   }
//   let ServiceData = [];
//   service_array?.forEach((item) => {
//     let obj = {};
//     obj["value"] = item._id;
//     obj["label"] = item.serviceTitle;
//     ServiceData.push(obj);
//   });
//   const ServiceID =
//     selectedOption != null ? selectedOption.map((item) => item.value) : null;
//   const InfoData = JSON.parse(localStorage.getItem("userData"));
//   const InfoDataId = InfoData?.data;
//   useEffect(() => {
//     if (success) {
//       dispatch(getStaff(InfoDataId?.branchId));
//       hideSidebar();
//       setList([]);
//       toast.success(<ToastContent success={Staffing?.Staff?.message} />, {
//         transition: Slide,
//         hideProgressBar: true,
//         autoClose: 2000,
//       });
//     }
//     return () => {
//       dispatch({ type: "STAFF_ADD_RESET" });
//     };
//   }, [success]);

//   let Array1 = [];
//   let allServices = [];
//   let allServicesLength = [];
//   serviceStore?.forEach((item) => {
//     let obj = {};
//     obj["_id"] = item?._id;
//     obj["title"] = item?.categoryTitle;
//     obj["services"] = item?.allServices;
//     allServices.push(item?.allServices);
//     Array1.push(obj);
//     //  obj["label"] = item.serviceTitle;
//   });

//   // console.log("Array1", Array1);

//   allServices.forEach((item) => {
//     item.forEach((service) => {
//       allServicesLength.push(service);
//     });
//   });

//   const normalizeCardNumber = (value) => {
//     return (
//       value
//         .replace(/\s/g, "")
//         .match(/.{1,4}/g)
//         ?.join(" ")
//         .substr(0, 13) || ""
//     );
//   };

//   // Modal
//   const toggle = () => setModal(!modal);

//   // ** Function to handle form submit
//   const onSubmit = (value) => {
//     const Obj = {
//       fullName: value.fullName,
//       email: value.email,
//       contactNumber: value.mobileNumber,
//       bio: value.Notes,
//       cnicNo: value.cnic,
//       gender: value.gender,
//       serviceId: list,
//       branchId: InfoDataId?.branchId,
//       salonId: InfoDataId?.salonId,
//       image: ImageUrl ? ImageUrl : "",
//     };
//     // debugger;
//     // formData.append("fullName", value.fullName);
//     // formData.append("cnicNo", value.Cnic);
//     // formData.append("image", image);
//     // formData.append("email", value.email);
//     // for (let i = 0; i <= list.length; i++) {
//     //   console.log("list", list[i]);
//     //   formData.append("serviceId", list[i]);
//     // }
//     // formData.append("gender", value.gender);
//     // formData.append("contactNumber", value.mobileNumber);
//     // formData.append("bio", value.Notes);
//     // formData.append("branchId", InfoDataId?.branchId);
//     // formData.append("salonId", InfoDataId?.salonId);
//     // console.log("formData", formData);
//     dispatch(addStaff(Obj));
//   };

//   const customStyles = {
//     menu: (provided, state) => ({
//       ...provided,
//       zIndex: 99999,
//     }),
//   };

//   // const AutoCompleteSections = () => {
//   //   const [suggestions] =
//   // }

//   const inputHandler = (id, pickedImage, isValid) => {
//     const formData1 = new FormData();
//     formData1.append("image", pickedImage);
//     setImage(pickedImage);
//     dispatch(addStaffImageAction(formData1));
//   };

//   const options = {
//     delimiters: ["-", "-", "-"],
//     blocks: [5, 7, 1],
//     // uppercase: true,
//   };
//   return (
//     <Sidebar
//       size="lg"
//       open={open}
//       title="New Beautician"
//       headerClassName="mb-1"
//       contentClassName="pt-0"
//       toggleSidebar={toggleSidebar}
//     >
//       <Form onSubmit={handleSubmit(onSubmit)}>
//         <FormGroup>
//           <ImageUpload id="image" onInput={inputHandler} />
//         </FormGroup>
//         <FormGroup>
//           <Label for="first name">
//             Full Name <span className="text-danger">*</span>
//           </Label>
//           <Input
//             name="fullName"
//             id="full name"
//             // placeholder='John Doe'
//             innerRef={register({ required: true })}
//             className={classnames({ "is-invalid": errors["full name"] })}
//           />
//         </FormGroup>
//         <FormGroup>
//           <Label for="cnic">CNIC (optional)</Label>
//           <Controller
//             name="cnic"
//             control={control}
//             // defaultValue=""
//             as={
//               <Cleave
//                 placeholder="XXXXX-XXXXXXX-X"
//                 options={options}
//                 className="form-control"
//               />
//             }
//             rules={{ pattern: /^(?!.*[A-Za-z]).*$/g }}
//           ></Controller>
//           {/* <ErrorMessage errors={errors} name="Cnic"></ErrorMessage> */}
//         </FormGroup>

//         <FormGroup>
//           <Label for="Email">
//             Email (optional) <span className="text-danger"></span>
//           </Label>
//           <Input
//             name="email"
//             id="Email"
//             placeholder="mail@example.com"
//             innerRef={register({ required: false })}
//             className={classnames({ "is-invalid": errors["Email"] })}
//           />
//         </FormGroup>
//         <FormGroup>
//           <Label for="Mobile number">
//             Mobile number <span className="text-danger">*</span>
//           </Label>

//           <Input
//             // value={phone}
//             placeholder="0300 XXXX XXX"
//             type="tel"
//             inputMode="numeric"
//             name="mobileNumber"
//             id="Mobile number"
//             onChange={(event) => {
//               const { value } = event.target;
//               event.target.value = normalizeCardNumber(value);
//             }}
//             className={classnames({ "is-invalid": errors["mobileNumber"] })}
//             innerRef={register({
//               required: true,
//               validate: (value) => value !== "",
//               pattern: /^(?!.*[A-Za-z]).*$/g,
//             })}
//           />
//         </FormGroup>
//         <FormGroup>
//           <Label for="Gender">Gender</Label>
//           <Input
//             type="select"
//             id="gender"
//             name="gender"
//             placeholder="Select Gender"
//             innerRef={register({ required: true })}
//             className={classnames({ "is-invalid": errors["gender"] })}
//           >
//             <option value="F">Female</option>
//             <option value="M">Male</option>
//           </Input>
//         </FormGroup>

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
//               Services (<span>{list.length}</span>)
//             </h4>
//             <div>
//               <a
//                 style={{ textDecoration: "underline" }}
//                 color="primary"
//                 onClick={toggle}
//               >
//                 <Edit size={16} />
//                 Edit
//               </a>
//             </div>
//             <Modal
//               scrollable
//               isOpen={modal}
//               toggle={toggle}
//               modalTransition={{ timeout: 500 }}
//             >
//               <ModalBody>
//                 <h3
//                   style={{
//                     padding: "10px 0 30px 0",
//                     borderBottom: "1px solid #e6e6e6",
//                   }}
//                 >
//                   Services
//                 </h3>
//                 {/* <div className="d-flex align-items-center mb-sm-0 mb-1 mr-1"> */}
//                 {/* <Label className="mb-0" for="search">
//                     Search:
//                   </Label> */}
//                 {/* <Input
//                     id="searchService"
//                     className="ml-50 w-100"
//                     type="text"
//                     // value={searchTerm}
//                     // onChange={(e) => handleFilter(e.target.value)}
//                   /> */}
//                 {/* </div> */}
//                 {/* <br></br> */}

//                 {/* <AutoComplete
//                   suggestions={Array1}
//                   className="form-control"
//                   filterKey="serviceTitle"
//                   filterHeaderKey="title"
//                   grouped={true}
//                   placeholder="Type 'haircut'"
//                 /> */}

//                 <div
//                   style={{
//                     padding: "20px 0",
//                     borderBottom: "1px solid #e6e6e6",
//                     display: "flex",
//                     alignItems: "center",
//                   }}
//                 >
//                   <CustomInput
//                     checked={allCheck}
//                     type="checkbox"
//                     name="all"
//                     id="all"
//                     onChange={(e) => setCheckedList(e, "all")}
//                     // handleClick={handleSelectAll}
//                     // isChecked={isCheckAll}
//                   />
//                   <label
//                     className=" font-weight-bold p-1 font-size-lg text-dark"
//                     htmlFor="all"
//                     style={{ fontSize: 20 }}
//                   >
//                     Select All Services
//                   </label>
//                 </div>
//                 {Array1.map((item, index) => {
//                   return (
//                     <div>
//                       {item?.services?.length !== 0 && (
//                         <div className="category ">
//                           <div
//                             style={{
//                               padding: "20px 0",
//                               borderBottom: "1px solid #e6e6e6",
//                               display: "flex",
//                               alignItems: "center",
//                             }}
//                           >
//                             <CustomInput
//                             checked={isCatgeoryChecked(item._id) ? true : false}
//                               // checked={checkCategoryChecked(item.id)}
//                               type="checkbox"
//                               id={item._id}
//                               name="category"
//                               onChange={(e) => {
//                                 setCheckedList(e, item._id);
//                               }}
//                             />
//                             <label
//                               className=" font-weight-bold p-1 font-size-lg text-dark"
//                               htmlFor={item._id}
//                               style={{ fontSize: 20 }}
//                             >
//                               {item.title}
//                             </label>
//                           </div>
//                         </div>
//                       )}
//                       {item.services.map((service, index) => {
//                         return (
//                           <div
//                             style={{
//                               padding: "20px 0",
//                               borderBottom: "1px solid #e6e6e6",
//                               display: "flex",
//                               alignItems: "center",
//                             }}
//                           >
//                             <CustomInput
//                               type="checkbox"
//                               onChange={(e) => setCheckedList(e, service._id)}
//                               checked={
//                                 list.includes(service._id) ? true : false
//                               }
//                               id={service._id}
//                               name="service"
//                             />
//                             <label
//                               className=" p-1 font-size-lg text-dark"
//                               htmlFor={service._id}
//                               style={{
//                                 width: "100%",
//                               }}
//                             >
//                               <div
//                                 style={{
//                                   display: "flex",
//                                   alignItems: "flex-start",
//                                   justifyContent: "space-between",
//                                 }}
//                               >
//                                 <div>
//                                   {service.serviceTitle}
//                                   <br></br>
//                                   <span>{service.duration} Minutes </span>
//                                 </div>

//                                 <div>{service.price} Pkr</div>
//                               </div>
//                             </label>
//                           </div>
//                         );
//                       })}
//                     </div>
//                   );
//                 })}
//               </ModalBody>
//               <ModalFooter>
//                 <div className="d-flex">
//                   <Button
//                     className="mr-1 button_slide slide_right"
//                     color="dark"
//                     onClick={toggle}
//                   >
//                     <span>Select Services</span>
//                   </Button>
//                   {/* <Button onClick={toggle} color="secondary" outline>
//                     Cancel
//                   </Button> */}
//                 </div>
//               </ModalFooter>
//             </Modal>
//           </div>
//         </Card>

//         <FormGroup>
//           <Label for="Notes (optional)">
//             Bio (optional) <span className="text-danger"></span>
//           </Label>
//           <Input
//             type="textarea"
//             name="Notes"
//             id="Notes"
//             innerRef={register({ required: false })}
//             className={classnames({ "is-invalid": errors["Notes"] })}
//           />
//         </FormGroup>

//         {/* <FormGroup>
//           <h5>Employment</h5>
//           <Label for="startDate">Start date</Label>
//           <Flatpickr
//             required
//             id="startDate"
//             name="startDate"
//             className="form-control"
//             onChange={(date) => setStartPicker(date[0])}
//             value={startPicker}
//           />
//         </FormGroup>
//         <FormGroup>
//           <Label for="endDate">End Date</Label>
//           <Flatpickr
//             required
//             id="endDate"
//             // tag={Flatpickr}
//             name="endDate"
//             className="form-control"
//             onChange={(date) => setEndPicker(date[0])}
//             value={endPicker}
//           />
//         </FormGroup> */}
//         <Col className="d-flex">
//           <Button
//             type="submit"
//             className="mr-1 button_slide slide_right d-flex align-items-center"
//             color="dark"
//             disabled={ImageUrlLoading}
//           >
//             {loading && <Spinner className="mr-50" color="white" size="sm" />}

//             <span> Submit </span>
//           </Button>
//           <Button
//             type="reset"
//             color="secondary"
//             outline
//             onClick={toggleSidebar}
//           >
//             Cancel
//           </Button>
//         </Col>
//       </Form>
//     </Sidebar>
//   );
// };

// export default SidebarNewUsers;
