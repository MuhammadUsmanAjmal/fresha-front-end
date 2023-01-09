// ** React Imports
import { Fragment, useState, useEffect } from "react";

// ** Invoice List Sidebar
import Sidebar from "./Sidebar";
import SidebarUpdateService from "./SidebarUpdateService";
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
  Badge,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

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
// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import {
  deleteServiceAction,
  getServices,
} from "../../../../redux/actions/servicesActions";
import { Link } from "react-router-dom";
import { map } from "jquery";

// ** Table Header
const CustomHeader = ({
  toggleSidebar,
  handlePerPage,
  rowsPerPage,
  handleFilter,
  searchTerm,
}) => {
  return (
    <div className="invoice-list-table-header w-100 mr-1 ml-50 mt-2 mb-75 ">
      <Row>
        <Col xl="6" className="d-flex align-items-center p-0">
          <div className="d-flex align-items-center w-100">
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
          </div>
        </Col>
        <Col
          xl="6"
          className="d-flex align-items-sm-center justify-content-lg-end justify-content-start flex-lg-nowrap flex-wrap flex-sm-row flex-column pr-lg-1 p-0 mt-lg-0 mt-1"
        >
          <div className="d-flex align-items-center mb-sm-0 mb-1 mr-1">
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
          </div>
          <Button.Ripple
            className="button_slide slide_right "
            color="dark"
            onClick={toggleSidebar}
          >
            <span> Add New Service</span>
          </Button.Ripple>
        </Col>
      </Row>
    </div>
  );
};

const UsersList = () => {
  // ** Store Vars
  const dispatch = useDispatch();

  const service = useSelector((state) => state.getServices);
  const serviceStore = service?.services?.data;

  // let service_array = [];
  // for (let i = 0; i < serviceStore?.length; i++) {
  //   if (serviceStore[i].allServices?.length > 0) {
  //     for (let j = 0; j < serviceStore[i].allServices?.length; j++) {
  //       service_array.push(serviceStore[i].allServices[j]);
  //     }
  //   }
  // }
  // console.log(service_array);
  let Array1 = [];
  serviceStore?.forEach((item) => {
    let obj = {};
    obj["categoryTitle"] = item?.categoryTitle;
    obj["services"] = item?.allServices;
    Array1.push(obj);
    //  obj["label"] = item.serviceTitle;
  });
  // console.log(Array1);

  const addService = useSelector((state) => state.addServices);
  const AddSuccess = addService?.services?.success;

  const delService = useSelector((state) => state.deleteService);
  const deleteSuccess = delService?.success;
  // ** States
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [updateSidebarOpen, updateSetSidebarOpen] = useState(false);
  const [data, setData] = useState("");
  const [commentOnArticle, setCommentOnArticle] = useState("");
  const [currentRole, setCurrentRole] = useState({
    value: "",
    label: "Select Role",
  });
  const [currentPlan, setCurrentPlan] = useState({
    value: "",
    label: "Select Plan",
  });
  const [currentStatus, setCurrentStatus] = useState({
    value: "",
    label: "Select Status",
    number: 0,
  });

  // ** Function to toggle sidebar
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const UpdateToggleSidebar = () => {
    updateSetSidebarOpen(!updateSidebarOpen);
  };
  const updateHideSidebar = () => {
    updateSetSidebarOpen(false);
  };

  const hideSidebar = () => {
    setSidebarOpen(false);
  };
  const InfoData = JSON.parse(localStorage.getItem("userData"));

  // ** Get data on mount
  useEffect(() => {
    dispatch(getServices(InfoData?.data?.branchId));
  }, [AddSuccess]);

  useEffect(() => {
    if (deleteSuccess) {
      dispatch(getServices(InfoData?.data?.branchId));
    }
  }, [deleteSuccess]);

  // ** User filter options
  const roleOptions = [
    { value: "admin", label: "Admin" },
    { value: "author", label: "Author" },
    { value: "editor", label: "Editor" },
    { value: "maintainer", label: "Maintainer" },
    { value: "subscriber", label: "Subscriber" },
  ];

  const planOptions = [
    { value: "basic", label: "Basic" },
    { value: "company", label: "Company" },
    { value: "enterprise", label: "Enterprise" },
    { value: "team", label: "Team" },
  ];

  const statusOptions = [
    { value: "pending", label: "Pending", number: 1 },
    { value: "active", label: "Active", number: 2 },
    { value: "inactive", label: "Inactive", number: 3 },
  ];

  const statusObj = {
    Male: "light-warning",
    Female: "light-success",
    Unspecified: "light-secondary",
    Everyone: "light-info",
    Active: "light-success",
    InActive: "light-warning",
  };

  const columns = [
    {
      name: "Service Menu",
      minWidth: "900px",

      cell: (row) => (
        <Link className="user-name text-truncate mb-0">
          <span className="font-weight-bold" style={{ fontSize: 17 }}>
            {row.categoryTitle}
          </span>
        </Link>
      ),
    },
    // {
    //   name: "Gender",
    //   minWidth: "130px",
    //   selector: "status",
    //   sortable: true,
    //   cell: (row) => (
    //     <text
    //       className="text-capitalize "
    //       // color={
    //       //   statusObj[
    //       //     row?.isMaleAllowed === true && row?.isFemaleAllowed === true
    //       //       ? "Everyone"
    //       //       : row?.isMaleAllowed === false && row?.isFemaleAllowed === true
    //       //       ? "Female"
    //       //       : row?.isMaleAllowed === true && row?.isFemaleAllowed === false
    //       //       ? "Male"
    //       //       : "Unspecified"
    //       //   ]
    //       // }
    //     >
    //       {row?.isMaleAllowed === true && row?.isFemaleAllowed === true
    //         ? "Everyone"
    //         : row?.isMaleAllowed === false && row?.isFemaleAllowed === true
    //         ? "Female"
    //         : row?.isMaleAllowed === true && row?.isFemaleAllowed === false
    //         ? "Male"
    //         : "UnSpecified"}
    //     </text>
    //   ),
    // },
    // {
    //   name: "Duration(min)",
    //   minWidth: "280px",
    //   selector: "email",
    //   sortable: true,
    //   cell: (row) => row?.duration,
    // },
    // // {
    // //   name: "Status",
    // //   minWidth: "138px",
    // //   selector: "status",
    // //   sortable: true,
    // //   cell: (row) => (
    // //     <Badge
    // //       className="text-capitalize"
    // //       color={statusObj[row.isActive === true ? "Active" : "InActive"]}
    // //       pill
    // //     >
    // //       {row.isActive === true ? "Active" : "InActive"}
    // //     </Badge>
    // //   ),
    // // },
    // {
    //   name: "Price(Rs)",
    //   minWidth: "172px",
    //   selector: "role",
    //   sortable: true,
    //   cell: (row) => row?.price,
    // },

    {
      name: "Actions",
      minWidth: "100px",
      cell: (row) => (
        <UncontrolledDropdown>
          <DropdownToggle tag="div" className="btn btn-sm">
            <MoreVertical size={14} className="cursor-pointer" />
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem
              tag={Link}
              className="w-100"
              onClick={() => {
                setData(row);
                UpdateToggleSidebar();
              }}
            >
              <Archive size={14} className="mr-50" />
              <span className="align-middle">Edit</span>
            </DropdownItem>
            <DropdownItem
              className="w-100"
              onClick={() => dispatch(deleteServiceAction(row._id))}
            >
              <Trash2 size={14} className="mr-50" />
              <span className="align-middle">Delete</span>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      ),
    },
  ];
  function timeConvert(n) {
    var num = n;
    var hours = num / 60;
    var rhours = Math.floor(hours);
    var minutes = (hours - rhours) * 60;
    var rminutes = Math.round(minutes);
    return rhours == 0
      ? rminutes + "min"
      : rminutes == 0
      ? rhours + "h"
      : rhours + "h " + rminutes + "min";
  }
  const ExpandedComponent = (Array1) => {
    return (
      <Col lg="12">
        {Array1?.data?.services?.map((item) => {
          return (
            <Link
              className="d-flex border-bottom justify-content-between"
              cursor="pointer"
              onClick={() => {
                setData(item);
                Array1.UpdateToggleSidebar();
              }}
            >
              <Col lg="6">
                <h5
                  className="font-weight-bold p-2  d-flex align-items-center "
                  key={item._id}
                >
                  <Menu size={14} className="mr-1" />
                  {item?.serviceTitle}
                </h5>
              </Col>
              <Col lg="4">
                <h5
                  className="font-weight-bold p-2 d-flex align-items-center "
                  key={item._id}
                >
                  {timeConvert(item.duration)}
                </h5>
              </Col>
              <Col lg="2">
                <h5
                  className="font-weight-bold p-2 d-flex align-items-center "
                  key={item._id}
                >
                  PKR {item?.price}
                </h5>
              </Col>
            </Link>
          );
        })}
      </Col>
    );
  };
  // ** Function in get data on page change
  const handlePagination = (page) => {
    dispatch(
      getData({
        page: page.selected + 1,
        perPage: rowsPerPage,
        role: currentRole.value,
        currentPlan: currentPlan.value,
        status: currentStatus.value,
        q: searchTerm,
      })
    );
    setCurrentPage(page.selected + 1);
  };

  // ** Function in get data on rows per page
  const handlePerPage = (e) => {
    const value = parseInt(e.currentTarget.value);
    dispatch(
      getData({
        page: currentPage,
        perPage: value,
        role: currentRole.value,
        currentPlan: currentPlan.value,
        status: currentStatus.value,
        q: searchTerm,
      })
    );
    setRowsPerPage(value);
  };

  // ** Function in get data on search query change
  const handleFilter = (val) => {
    setSearchTerm(val);
    dispatch(
      getData({
        page: currentPage,
        perPage: rowsPerPage,
        role: currentRole.value,
        currentPlan: currentPlan.value,
        status: currentStatus.value,
        q: val,
      })
    );
  };

  // ** Custom Pagination
  // const CustomPagination = () => {
  //   const count = Number(Math.ceil(serviceStore.total / rowsPerPage));

  //   return (
  //     <ReactPaginate
  //       previousLabel={""}
  //       nextLabel={""}
  //       pageCount={count || 1}
  //       activeClassName="active"
  //       forcePage={currentPage !== 0 ? currentPage - 1 : 0}
  //       onPageChange={(page) => handlePagination(page)}
  //       pageClassName={"page-item "}
  //       nextLinkClassName={"page-link "}
  //       nextClassName={"page-item next "}
  //       previousClassName={"page-item prev "}
  //       previousLinkClassName={"page-link "}
  //       pageLinkClassName={"page-link"}
  //       containerClassName={
  //         "pagination react-paginate justify-content-end my-2 pr-1"
  //       }
  //     />
  //   );
  // };

  // ** Table data to render
  const dataToRender = () => {
    const filters = {
      role: currentRole.value,
      currentPlan: currentPlan.value,
      status: currentStatus.value,
      q: searchTerm,
    };

    const isFiltered = Object.keys(filters).some(function (k) {
      return filters[k].length > 0;
    });

    if (Array1?.length > 0) {
      return Array1;
    }
    // else if (serviceStore?.data?.length === 0 && isFiltered) {
    //   return [];
    // } else {
    //   return serviceStore?.data?.slice(0, rowsPerPage);
    // }
  };

  return (
    <Fragment>
      {/* <Card>
        <CardHeader>
          <CardTitle tag="h4">Search Filter</CardTitle>
        </CardHeader>
        <CardBody>
          <Row>
            <Col md="4">
              <Select
                isClearable={false}
                theme={selectThemeColors}
                className="react-select"
                classNamePrefix="select"
                options={roleOptions}
                value={currentRole}
                onChange={(data) => {
                  setCurrentRole(data);
                  dispatch(
                    getData({
                      page: currentPage,
                      perPage: rowsPerPage,
                      role: data.value,
                      currentPlan: currentPlan.value,
                      status: currentStatus.value,
                      q: searchTerm,
                    })
                  );
                }}
              />
            </Col>
            <Col className="my-md-0 my-1" md="4">
              <Select
                theme={selectThemeColors}
                isClearable={false}
                className="react-select"
                classNamePrefix="select"
                options={planOptions}
                value={currentPlan}
                onChange={(data) => {
                  setCurrentPlan(data);
                  dispatch(
                    getData({
                      page: currentPage,
                      perPage: rowsPerPage,
                      role: currentRole.value,
                      currentPlan: data.value,
                      status: currentStatus.value,
                      q: searchTerm,
                    })
                  );
                }}
              />
            </Col>
            <Col md="4">
              <Select
                theme={selectThemeColors}
                isClearable={false}
                className="react-select"
                classNamePrefix="select"
                options={statusOptions}
                value={currentStatus}
                onChange={(data) => {
                  setCurrentStatus(data);
                  dispatch(
                    getData({
                      page: currentPage,
                      perPage: rowsPerPage,
                      role: currentRole.value,
                      currentPlan: currentPlan.value,
                      status: data.value,
                      q: searchTerm,
                    })
                  );
                }}
              />
            </Col>
          </Row>
        </CardBody>
      </Card> */}

      <Card>
        <DataTable
          noHeader
          pagination
          subHeader
          responsive
          paginationServer
          columns={columns}
          sortIcon={<ChevronDown />}
          className="react-dataTable rounded-lg "
          // paginationComponent={CustomPagination}
          data={Array1 && Array1}
          expandableRows
          expandableRowsComponent={
            <ExpandedComponent UpdateToggleSidebar={UpdateToggleSidebar} />
          }
          subHeaderComponent={
            <CustomHeader
              toggleSidebar={toggleSidebar}
              handlePerPage={handlePerPage}
              rowsPerPage={rowsPerPage}
              searchTerm={searchTerm}
              handleFilter={handleFilter}
            />
          }
        />
      </Card>

      <Sidebar
        open={sidebarOpen}
        toggleSidebar={toggleSidebar}
        hideSidebar={hideSidebar}
      />
      <SidebarUpdateService
        open={updateSidebarOpen}
        toggleSidebar={UpdateToggleSidebar}
        hideSidebar={updateHideSidebar}
        Data={data}
      />
    </Fragment>
  );
};

export default UsersList;
