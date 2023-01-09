// ** React Imports
import { Fragment, useState, useEffect } from "react";

// ** Invoice List Sidebar
import Sidebar from "./Sidebar";
import SidebarUpdate from "./SidebarUpdate";
// ** Columns

// ** Store & Actions
import { getAllData, getData } from "../store/action";
import { useDispatch, useSelector } from "react-redux";

// ** Third Party Components
import Select from "react-select";
import ReactPaginate from "react-paginate";
import { ChevronDown } from "react-feather";
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
} from "reactstrap";

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import {
  getSubscription,
  updateSubscriptionAction,
  toggleSubscription,
} from "../../../../../redux/actions/subscriptionAction";
import { Link } from "react-router-dom";
import SpinnerFlex from "../../../../components/spinners/SpinnerFlex";

// ** Table Header
const CustomHeader = () => {
  const dispatch = useDispatch();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [updateSidebarOpen, updateSetSidebarOpen] = useState(false);
  const [data, setData] = useState();
  const SubscriptionInformation = useSelector((state) => state.getSubscription);
  const { loading } = SubscriptionInformation;
  const Subscription = SubscriptionInformation?.subscription?.data;
  console.log("Subscription", Subscription);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const hideSidebar = () => {
    setSidebarOpen(false);
  };

  const UpdateToggleSidebar = () => {
    updateSetSidebarOpen(!updateSidebarOpen);
  };

  const updateHideSidebar = () => {
    updateSetSidebarOpen(false);
  };
  useEffect(() => {
    dispatch(getSubscription());
  }, []);

  const toggleMode = (id, value) => {
    Subscription.forEach((item) => {
      if (item?._id === id) {
        item.isActive = value;
      }
    });
    dispatch(toggleSubscription(id, { isActive: value }));
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
              {/* <div className="d-flex align-items-center mb-sm-0 mb-1 mr-1">
            <Label className="mb-0" for="search-invoice">
              Search:
            </Label>
            <Input
              id="search-invoice"
              className="ml-50 w-100"
              type="text"
              value={searchTerm}
              onChange={(e) => handleFilter(e.target.value)}
            />
          </div> */}
              {/* <div className="d-flex align-items-center w-100">
            <Label for="rows-per-page">Show</Label>
            <CustomInput
              className="form-control mx-50"
              type="select"
              id="rows-per-page"
              value={rowsPerPage}
              onChange={handlePerPage}
              style={{
                width: "5rem",
                padding: "0 0.8rem",
                backgroundPosition:
                  "calc(100% - 3px) 11px, calc(100% - 20px) 13px, 100% 0",
              }}
            >
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
            </CustomInput>
            <Label for="rows-per-page">Entries</Label>
          </div> */}
            </Col>
            <Col
              xl="6"
              className="d-flex align-items-sm-center justify-content-lg-end justify-content-start flex-lg-nowrap flex-wrap flex-sm-row flex-column pr-lg-1 p-0 mt-lg-0 mt-1  "
            >
              <Button.Ripple
                className="button_slide slide_right "
                color="dark"
                onClick={toggleSidebar}
              >
                <span> Add New </span>
              </Button.Ripple>
            </Col>
          </Row>
        </CardBody>
      </Card>
      {/* <Card>
        <CardBody>Hello</CardBody>
      </Card> */}
      {/* <Col md="4" xs="12" lg="4"> */}
      {loading ? (
        <SpinnerFlex />
      ) : (
        <Row lg="12">
          {Subscription?.length > 0 ? (
            Subscription?.map((item) => {
              return (
                <Col md="4" xs="12" lg="4" className="mt-2">
                  <Card className="text-center " key={item?._id}>
                    <div className="d-flex justify-content-between align-items-center">
                      <CustomInput
                        cursor="pointer"
                        className="custom-control-warning d-flex justify-content-start mt-1 ml-1"
                        name="warning"
                        type="switch"
                        id={item?._id}
                        inline
                        onChange={() => toggleMode(item?._id, !item?.isActive)}
                        defaultChecked={item?.isActive}
                      />
                      <UncontrolledDropdown
                        className="d-flex justify-content-end mt-1"
                        cursor="pointer"
                      >
                        <DropdownToggle tag="div" className="btn btn-sm">
                          <MoreVertical size={14} className="cursor-pointer" />
                        </DropdownToggle>
                        <DropdownMenu right>
                          <DropdownItem
                            tag={Link}
                            className="w-100"
                            onClick={() => {
                              setData(item);
                              UpdateToggleSidebar();
                            }}
                          >
                            <Archive size={14} className="mr-50" />
                            <span className="align-middle">Edit</span>
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </div>
                    <CardBody>
                      {/* {item.popular === true ? (
              <div className="pricing-badge text-right">
                <Badge color="light-primary" pill>
                  Popular
                </Badge>
              </div>
            ) : null} */}
                      {/* <img className={imgClasses} src={item.img} alt="pricing svg" /> */}
                      <h3>
                        {/* {item.title} */}
                        {item?.subscriptionTitle}
                      </h3>
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
                          <span
                          // className={`pricing-${item.title.toLowerCase()}-value font-weight-bolder text-primary`}
                          >
                            {/* {monthlyPrice} */}
                            {item?.price}
                          </span>
                          <span className="pricing-duration text-body font-medium-1 font-weight-bold ml-25">
                            / month
                          </span>
                        </div>
                      </div>
                      {/* <ListGroup tag="ul" className="list-group-circle text-left mb-2">
              {item.planBenefits.map((benefit, i) => (
                <ListGroupItem key={i} tag="li">
                  {benefit}
                </ListGroupItem>
              ))}
            </ListGroup> */}
                    </CardBody>
                  </Card>
                </Col>
              );
            })
          ) : (
            <Col lg="12">
              <Card className="text-center">
                <CardBody>
                  <CardText>No Subscription</CardText>
                </CardBody>
              </Card>
            </Col>
          )}
        </Row>
      )}
      {/* </Col> */}
      <Sidebar
        open={sidebarOpen}
        toggleSidebar={toggleSidebar}
        hideSidebar={hideSidebar}
      />
      <SidebarUpdate
        open={updateSidebarOpen}
        toggleSidebar={UpdateToggleSidebar}
        hideSidebar={updateHideSidebar}
        Data={data}
      />
    </Fragment>
  );
};

// const UsersList = () => {
//   // ** Store Vars
//   const dispatch = useDispatch();
//   const [subs, setSubs] = useState();
//   const store = useSelector((state) => state.users);

//   // ** States
//   const [searchTerm, setSearchTerm] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [rowsPerPage, setRowsPerPage] = useState(10);

//   const [currentRole, setCurrentRole] = useState({
//     value: "",
//     label: "Filter by location",
//   });
//   const [currentPlan, setCurrentPlan] = useState({
//     value: "",
//     label: "Filter by timing",
//   });
//   const [currentStatus, setCurrentStatus] = useState({
//     value: "",
//     label: "Select Status",
//     number: 0,
//   });
//   const [data, setData] = useState({});

//   useEffect(() => {
//     setSubs(Subscription);
//   }, [Subscription]);
//   console.log("data in subscription table", subs);

//   // let filteredData = [];
//   // Salon?.forEach((fullItem) => {
//   //   let obj = {};
//   //   obj["Title"] = fullItem?.salonTitle;
//   //   obj["id"] = fullItem?._id;
//   //   fullItem?.user_information?.forEach((item) => {
//   //     obj["contactNumber"] = item?.contactNumber;
//   //     obj["fullName"] = item?.fullName;
//   //     obj["email"] = item?.email;
//   //   });
//   //   filteredData.push(obj);
//   // });

//   // ** Function to toggle sidebar
//

//   // ** Get data on mount
//   useEffect(() => {
//     dispatch(getAllData());
//     dispatch(
//       getData({
//         page: currentPage,
//         perPage: rowsPerPage,
//         role: currentRole.value,
//         currentPlan: currentPlan.value,
//         status: currentStatus.value,
//         q: searchTerm,
//       })
//     );
//   }, [dispatch, store.data.length]);

//   // ** User filter options
//   const roleOptions = [
//     { value: "admin", label: "Admin" },
//     { value: "author", label: "Author" },
//     { value: "editor", label: "Editor" },
//     { value: "maintainer", label: "Maintainer" },
//     { value: "subscriber", label: "Subscriber" },
//   ];

//   const planOptions = [
//     { value: "basic", label: "Basic" },
//     { value: "company", label: "Company" },
//     { value: "enterprise", label: "Enterprise" },
//     { value: "team", label: "Team" },
//   ];

//   const statusOptions = [
//     { value: "pending", label: "Pending", number: 1 },
//     { value: "active", label: "Active", number: 2 },
//     { value: "inactive", label: "Inactive", number: 3 },
//   ];

//   const columns = [
//     {
//       name: "Subscription title",
//       minWidth: "100px",
//       selector: "subscriptionTitle",
//       sortable: true,
//       cell: (row) => row?.subscriptionTitle,
//     },
//     {
//       name: "Price",
//       minWidth: "200px",
//       selector: "price",
//       sortable: true,
//       cell: (row) => row?.price,
//     },
//     {
//       name: "Expires In",
//       minWidth: "200px",
//       selector: "expiresInMonth",
//       sortable: true,
//       cell: (row) => row?.expiresInMonth + " Months",
//     },
//     {
//       name: "Actions",
//       minWidth: "100px",
//       cell: (row) => (
//         <UncontrolledDropdown>
//           <DropdownToggle tag="div" className="btn btn-sm">
//             <MoreVertical size={14} className="cursor-pointer" />
//           </DropdownToggle>
//           <DropdownMenu right>
//             <DropdownItem
//               tag={Link}
//               className="w-100"
//               onClick={() => {
//                 setData(row);
//                 UpdateToggleSidebar();
//               }}
//             >
//               <Archive size={14} className="mr-50" />
//               <span className="align-middle">Edit</span>
//             </DropdownItem>
//           </DropdownMenu>
//         </UncontrolledDropdown>
//       ),
//     },
//   ];
//   // ** Function in get data on page change
//   const handlePagination = (page) => {
//     dispatch(
//       getData({
//         page: page.selected + 1,
//         perPage: rowsPerPage,
//         role: currentRole.value,
//         currentPlan: currentPlan.value,
//         status: currentStatus.value,
//         q: searchTerm,
//       })
//     );
//     setCurrentPage(page.selected + 1);
//   };

//   // ** Function in get data on rows per page
//   const handlePerPage = (e) => {
//     const value = parseInt(e.currentTarget.value);
//     dispatch(
//       getData({
//         page: currentPage,
//         perPage: value,
//         role: currentRole.value,
//         currentPlan: currentPlan.value,
//         status: currentStatus.value,
//         q: searchTerm,
//       })
//     );
//     setRowsPerPage(value);
//   };

//   // ** Function in get data on search query change
//   const handleFilter = (val) => {
//     setSearchTerm(val);
//     dispatch(
//       getData({
//         page: currentPage,
//         perPage: rowsPerPage,
//         role: currentRole.value,
//         currentPlan: currentPlan.value,
//         status: currentStatus.value,
//         q: val,
//       })
//     );
//   };

//   // ** Custom Pagination
//   const CustomPagination = () => {
//     const count = Number(Math.ceil(store.total / rowsPerPage));

//     return (
//       <ReactPaginate
//         previousLabel={""}
//         nextLabel={""}
//         pageCount={count || 1}
//         activeClassName="active"
//         forcePage={currentPage !== 0 ? currentPage - 1 : 0}
//         onPageChange={(page) => handlePagination(page)}
//         pageClassName={"page-item "}
//         nextLinkClassName={"page-link "}
//         nextClassName={"page-item next "}
//         previousClassName={"page-item prev "}
//         previousLinkClassName={"page-link "}
//         pageLinkClassName={"page-link"}
//         containerClassName={
//           "pagination react-paginate justify-content-end my-2 pr-1"
//         }
//       />
//     );
//   };

//   // ** Table data to render
//   const dataToRender = () => {
//     const filters = {
//       role: currentRole.value,
//       currentPlan: currentPlan.value,
//       status: currentStatus.value,
//       q: searchTerm,
//     };

//     const isFiltered = Object.keys(filters).some(function (k) {
//       return filters[k].length > 0;
//     });

//     if (Subscription?.length > 0) {
//       return Subscription;
//     }
//   };

//   return (
//     <Fragment>
//       {/* <Card>
//         <CardHeader>
//           <CardTitle tag="h4">Search Filter</CardTitle>
//         </CardHeader>
//         <CardBody>
//           <Row>
//             <Col md="4">
//               <Select
//                 isClearable={false}
//                 theme={selectThemeColors}
//                 className="react-select"
//                 classNamePrefix="select"
//                 options={roleOptions}
//                 value={currentRole}
//                 onChange={(data) => {
//                   setCurrentRole(data);
//                   dispatch(
//                     getData({
//                       page: currentPage,
//                       perPage: rowsPerPage,
//                       role: data.value,
//                       currentPlan: currentPlan.value,
//                       status: currentStatus.value,
//                       q: searchTerm,
//                     })
//                   );
//                 }}
//               />
//             </Col>
//             <Col className="my-md-0 my-1" md="4">
//               <Select
//                 theme={selectThemeColors}
//                 isClearable={false}
//                 className="react-select"
//                 classNamePrefix="select"
//                 options={planOptions}
//                 value={currentPlan}
//                 onChange={(data) => {
//                   setCurrentPlan(data);
//                   dispatch(
//                     getData({
//                       page: currentPage,
//                       perPage: rowsPerPage,
//                       role: currentRole.value,
//                       currentPlan: data.value,
//                       status: currentStatus.value,
//                       q: searchTerm,
//                     })
//                   );
//                 }}
//               />
//             </Col>
//             <Col md="4">
//               <Select
//                 theme={selectThemeColors}
//                 isClearable={false}
//                 className="react-select"
//                 classNamePrefix="select"
//                 options={statusOptions}
//                 value={currentStatus}
//                 onChange={(data) => {
//                   setCurrentStatus(data);
//                   dispatch(
//                     getData({
//                       page: currentPage,
//                       perPage: rowsPerPage,
//                       role: currentRole.value,
//                       currentPlan: currentPlan.value,
//                       status: data.value,
//                       q: searchTerm,
//                     })
//                   );
//                 }}
//               />
//             </Col>
//           </Row>
//         </CardBody>
//       </Card> */}

//       <Card>
//         {loading ? (
//           <SpinnerFlex />
//         ) : (
//           <DataTable
//             noHeader
//             // pagination
//             subHeader
//             responsive
//             // paginationServer
//             columns={columns}
//             sortIcon={<ChevronDown />}
//             className="react-dataTable rounded-lg "
//             // paginationComponent={CustomPagination}
//             data={dataToRender()}
//             subHeaderComponent={

/* <CustomHeader
  toggleSidebar={toggleSidebar}
  handlePerPage={handlePerPage}
  rowsPerPage={rowsPerPage}
  searchTerm={searchTerm}
  handleFilter={handleFilter}
/>; */

//             }
//           />
//         )}
//       </Card>

//
//     </Fragment>
//   );
// };

export default CustomHeader;
