// ** React Imports
import { Fragment, useState, useEffect } from "react";

// ** Invoice List Sidebar
// import Sidebar from "./Sidebar";
// import SidebarUpdateStaff from "./SidebarUpdateStaff";

// ** Columns

// ** Store & Actions

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
import { Link } from "react-router-dom";
// import {
//   getStaff,
//   searchStaffAction,
//   updateStaffAction,
// } from "../../../../redux/actions/staffActions";
import SpinnerFlex from "../../../components/spinners/SpinnerFlex";
// import SpinnerFlex from "../../../components/spinners/SpinnerFlex";
import {
  timeConvert,
  tConvert24hour,
  endTimeCalculate,
  DateFormat,
} from "../../../../utility/Utils.js";
import ViewAppointment from "./viewAppointment";
// ** Table Header
const CustomHeader = ({
  toggleSidebar,
  handlePerPage,
  rowsPerPage,
  handleFilter,
  searchTerm,
}) => {
  return (
    <div className="invoice-list-table-header w-100 mr-1 ml-50 mt-2 mb-75">
      <Row>
        <Col xl="6" className="d-flex azlign-items-center p-0">
          <div className="d-flex align-items-center mb-sm-0 mb-1 mr-1">
            {/* <Label className="mb-0" for="search-invoice">
              Search:
            </Label>
            <Input
              id="search-invoice"
              className="ml-50 w-100"
              type="text"
              value={searchTerm}
              onChange={(e) => {
                e.preventDefault();
                handleFilter(e.target.value);
              }}
            /> */}
          </div>
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
          className="d-flex align-items-sm-center justify-content-lg-end justify-content-start flex-lg-nowrap flex-wrap flex-sm-row flex-column pr-lg-1 p-0 mt-lg-0 mt-1"
        >
          {/* <Button.Ripple
            className="button_slide slide_right p-1"
            color="dark"
            onClick={toggleSidebar}
          >
            <span>Add New Beautician </span>
          </Button.Ripple> */}
        </Col>
      </Row>
    </div>
  );
};

const UsersList = ({ historyDataArray, loading, toggleTab }) => {
  // ** Store Vars
  const dispatch = useDispatch();

  // const { loading } = GetBeautician;
  // const BeauticianStore = GetBeautician?.Staff;
  // ** States
  const [view, setView] = useState("1");
  const [order, setOrder] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [data, setData] = useState("");
  const [updateSidebarOpen, updateSetSidebarOpen] = useState(false);
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
  const InfoData = JSON.parse(localStorage.getItem("userData"));

  // useEffect(() => {
  //   dispatch(getStaff(InfoData?.data?.branchId));
  // }, []);
  // console.log("data in appointments:");
  // ** Function ViewChange
  const ViewChange = (val) => {
    setView(val);
  };

  const statusObj = {
    Completed: "light-success",
    New: "light-info",
  };

  let filteredData = [];
  historyDataArray?.forEach((fullItem) => {
    let obj = {};
    obj["createdBy"] = fullItem?.createdBy;
    obj["status"] = fullItem?.status;
    obj["orderDate"] = fullItem?.orderDate;
    obj["client"] = fullItem?.user[0]?.fullName;
    fullItem?.orderJobs?.forEach((item) => {
      obj["orderJobId"] = item?._id;
      obj["duration"] = item?.duration;
      obj["orderId"] = item?.orderId;
      obj["startTime"] = item?.startTime;
      obj["totalPrice"] = item?.totalPrice;
      obj["serviceTitle"] = item?.service[0]?.serviceTitle;
      obj["teamMember"] = item?.beauticianUser[0]?.fullName;
    });
    filteredData.push(obj);
  });

  const columns = [
    {
      name: "Ref No",
      minWidth: "150px",
      selector: "orderJobId",
      sortable: true,
      cell: (row) => (
        <span
          className="user-name text-truncate mb-0 font-weight-bold"
          color="black"
          style={{ fontSize: 15, fontWeight: "bolder", color: "#F68D2F" }}
          onClick={() => {
            setView("2");
            setOrder(row);
          }}
          cursor="pointer"
        >
          #{row?.orderJobId.split("").splice(0, 7).join("")}
          {/* {row.lastName} */}
        </span>
      ),
    },
    {
      name: "Client",
      minWidth: "150px",
      selector: "createdBy",
      sortable: true,
      cell: (row) => (
        <div className="d-flex justify-content-left align-items-center">
          {/* {renderClient(row)} */}
          <div className="d-flex flex-column">
            {/* <Link
              // to={`/gp-app/staff/view/${row.id}`}
              className="user-name text-truncate mb-0"
              // onClick={() => store.dispatch(getUser(row.id))}
            > */}
            <span className="font-weight-bold">
              {row?.createdBy === "Admin" ? "Walk-in" : row?.client}
              {/* {row.lastName} */}
            </span>
            {/* </Link> */}
          </div>
        </div>
      ),
    },
    {
      name: "Service",
      minWidth: "150px",
      selector: "serviceTitle",
      sortable: true,
      cell: (row) => (
        <div className="d-flex justify-content-left align-items-center">
          {/* {renderClient(row)} */}
          <div className="d-flex flex-column">
            {/* <Link
              // to={`/gp-app/staff/view/${row.id}`}
              className="user-name text-truncate mb-0"
              // onClick={() => store.dispatch(getUser(row.id))}
            > */}
            <span className="font-weight-bold">
              {row?.serviceTitle}
              {/* {row.lastName} */}
            </span>
            {/* </Link> */}
            {/* <small className="text-truncate text-muted mb-0">
            @{row.username}
          </small> */}
          </div>
        </div>
      ),
    },
    {
      name: "Date",
      minWidth: "120px",
      selector: "orderDate",
      sortable: true,
      cell: (row) => <span>{DateFormat(row?.orderDate)}</span>,
    },
    {
      name: "Time",
      minWidth: "100px",
      selector: "startTime",
      sortable: true,
      cell: (row) => tConvert24hour(row?.startTime),
    },
    {
      name: "Duration",
      minWidth: "100px",
      selector: "duration",
      sortable: true,
      cell: (row) => (
        <span className="text-capitalize">{timeConvert(row?.duration)} </span>
      ),
    },
    {
      name: "Price",
      minWidth: "100px",
      selector: "totalPrice",
      sortable: true,
      cell: (row) => <span className="text-capitalize">{row?.totalPrice}</span>,
    },
    {
      name: "status",
      minWidth: "100px",
      selector: "status",
      sortable: true,
      cell: (row) => (
        <Badge className="text-capitalize" color={statusObj[row?.status]}>
          {row.status}
        </Badge>
      ),
    },
  ];

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
    // dispatch(searchStaffAction(InfoData?.data?.branchId, val));
  };

  // ** Custom Pagination
  const CustomPagination = () => {
    const count = Number(Math.ceil(BeauticianStore.total / rowsPerPage));

    return (
      <ReactPaginate
        previousLabel={""}
        nextLabel={""}
        pageCount={count || 1}
        activeClassName="active"
        forcePage={currentPage !== 0 ? currentPage - 1 : 0}
        onPageChange={(page) => handlePagination(page)}
        pageClassName={"page-item"}
        nextLinkClassName={"page-link"}
        nextClassName={"page-item next"}
        previousClassName={"page-item prev"}
        previousLinkClassName={"page-link"}
        pageLinkClassName={"page-link"}
        containerClassName={
          "pagination react-paginate justify-content-end my-2 pr-1"
        }
      />
    );
  };

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

    if (filteredData?.length > 0) {
      return filteredData;
    }
    // else if (BeauticianStore?.data.length === 0 && isFiltered) {
    //   return [];
    // } else {
    //   return BeauticianStore?.allData.slice(0, rowsPerPage);
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
        {view === "1" && (
          <>
            {loading ? (
              <SpinnerFlex />
            ) : (
              <DataTable
                noHeader
                // pagination
                subHeader
                responsive
                // paginationServer
                columns={columns}
                sortIcon={<ChevronDown />}
                className="react-dataTable "
                // paginationComponent={CustomPagination}
                data={dataToRender()}
                subHeaderComponent={
                  <CustomHeader
                    // toggleSidebar={toggleSidebar}
                    handlePerPage={handlePerPage}
                    rowsPerPage={rowsPerPage}
                    searchTerm={searchTerm}
                    handleFilter={handleFilter}
                  />
                }
              />
            )}
          </>
        )}
        {view === "2" && (
          <ViewAppointment
            view={ViewChange}
            orderDetail={order}
            toggleTab={toggleTab}
          />
        )}
      </Card>

      {/* <Sidebar
        open={sidebarOpen}
        toggleSidebar={toggleSidebar}
        hideSidebar={hideSidebar}
      /> */}

      {/* <SidebarUpdateStaff
        open={updateSidebarOpen}
        toggleSidebar={UpdateToggleSidebar}
        hideSidebar={updateHideSidebar}
        Data={data}
      /> */}
    </Fragment>
  );
};

export default UsersList;
