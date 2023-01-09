// ** React Imports
import { Fragment, useState, useEffect } from "react";

// ** Invoice List Sidebar
import Sidebar from "./Sidebar";

// ** Columns

// ** Store & Actions
import { getAllData, getData } from "../store/action";
import { useDispatch, useSelector } from "react-redux";

// ** Third Party Components
import Select from "react-select";
import ReactPaginate from "react-paginate";
import { AlertCircle, ChevronDown, Menu } from "react-feather";
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
} from "reactstrap";
// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import { getSalonAction } from "../../../../../redux/actions/saloonActions";
import { Link } from "react-router-dom";
import SpinnerFlex from "../../../../components/spinners/SpinnerFlex";
import {
  getSalonSubscriptionList,
  getSubscription,
} from "../../../../../redux/actions/subscriptionAction";
import { DateFormat } from "../../../../../utility/Utils";
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
          <span style={{ fontSize: 20, color: "black", fontWeight: "bolder" }}>
            Salon Subscription Listing
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
          className="d-flex align-items-sm-center justify-content-lg-end justify-content-start flex-lg-nowrap flex-wrap flex-sm-row flex-column pr-lg-1 p-0 mt-lg-0 mt-1"
        >
          <Button.Ripple
            className="button_slide slide_right "
            color="dark"
            onClick={toggleSidebar}
          >
            <span>Add/Update Subscription </span>
          </Button.Ripple>
        </Col>
      </Row>
    </div>
  );
};

const UsersList = () => {
  // ** Store Vars
  const dispatch = useDispatch();
  const store = useSelector((state) => state.users);
  const SalonSubscription = useSelector(
    (state) => state.getSalonSubscriptionList
  );
  const { loading } = SalonSubscription;
  const SubscriptionDetail = SalonSubscription?.subscriptionList?.data;

  // console.log("SubscriptionDetail", SubscriptionDetail);
  // ** States
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentRole, setCurrentRole] = useState({
    value: "",
    label: "Filter by location",
  });
  const [currentPlan, setCurrentPlan] = useState({
    value: "",
    label: "Filter by timing",
  });
  const [currentStatus, setCurrentStatus] = useState({
    value: "",
    label: "Select Status",
    number: 0,
  });
  const SalonAdmin = JSON.parse(localStorage.getItem("userData"));
  const PhoneNumber = SalonAdmin?.data?.contactNumber;
  useEffect(() => {
    dispatch(getSalonAction(PhoneNumber));
    dispatch(getSubscription(true));
    dispatch(getSalonSubscriptionList());
  }, []);

  let SubscriptionArray = [];
  SubscriptionDetail?.forEach((item) => {
    let obj = {};
    if (item?.salonSubscription?.length > 0) {
      obj["salonTitle"] = item?.salonTitle;
      obj["subscriptionTitle"] =
        item?.salonSubscription[0]?.subcriptionDetail[0]?.subscriptionTitle;
      obj["paidAmount"] = item?.salonSubscription[0]?.paidAmount;
      obj["expireAt"] = DateFormat(item?.expiredAt);
      obj["subscriptionDetail"] = item?.salonSubscription;
      SubscriptionArray.push(obj);
    }
  });
  // console.log("SubscriptionArray", SubscriptionArray);
  // ** Function to toggle sidebar
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const hideSidebar = () => {
    setSidebarOpen(false);
  };
  // ** Get data on mount
  useEffect(() => {
    dispatch(getAllData());
    dispatch(
      getData({
        page: currentPage,
        perPage: rowsPerPage,
        role: currentRole.value,
        currentPlan: currentPlan.value,
        status: currentStatus.value,
        q: searchTerm,
      })
    );
  }, [dispatch, store.data.length]);

  const ExpandedComponent = (SubscriptionArray) => {
    const statusObj = {
      InActive: "light-warning",
      Active: "light-success",
    };
    return (
      <>
        <Row lg="12">
          <Col
            lg="12"
            className="d-flex border-bottom justify-content-between "
            style={{ backgroundColor: "#F3F2F7" }}
          >
            <Col
              lg="2"
              cursor="pointer"
              className=" p-1  d-flex align-items-center"
            >
              <h5 className="font-weight-bolder">Subscription Title</h5>
            </Col>
            <Col
              lg="2"
              className="p-1 d-flex align-items-center justify-content-between "
            >
              <h5 className="font-weight-bolder">Started At</h5>
            </Col>
            <Col lg="2" className="p-1 d-flex align-items-center">
              <h5 className="font-weight-bolder  ">Expires At</h5>
            </Col>
            <Col lg="2" className=" p-1 d-flex align-items-center ">
              <h5 className="font-weight-bolder">Paid Amount</h5>
            </Col>
            <Col lg="2" className="p-1 d-flex align-items-center ">
              <h5 className="font-weight-bolder ">Status</h5>
            </Col>
          </Col>
        </Row>
        {SubscriptionArray?.data?.subscriptionDetail?.map((item) => {
          return (
            <Row lg="12">
              <Col
                lg="12"
                className="d-flex border-bottom justify-content-between"
              >
                <Col
                  lg="2"
                  cursor="pointer "
                  className=" p-1 d-flex align-items-center"
                >
                  <h5 className="font-weight-bold ">
                    <span>{item?.subcriptionDetail[0]?.subscriptionTitle}</span>
                  </h5>
                </Col>
                <Col
                  lg="2"
                  className="p-1 d-flex align-items-center justify-content-between "
                >
                  <h5 className="font-weight-bold">
                    <span>{DateFormat(item?.startedAt)}</span>
                  </h5>
                </Col>
                <Col lg="2" className="p-1 d-flex align-items-center">
                  <h5 className="font-weight-bold  ">
                    <span> {DateFormat(item?.expiredAt)}</span>
                  </h5>
                </Col>
                <Col lg="2" className="p-1 d-flex align-items-center">
                  <h5 className="font-weight-bold  ">
                    <span>{item?.paidAmount} PKR</span>
                  </h5>
                </Col>
                <Col lg="2" className="d-flex align-items-center">
                  <Badge
                    className="text-capitalize"
                    color={
                      statusObj[item?.isActive === true ? "Active" : "InActive"]
                    }
                  >
                    {item?.isActive === true ? "Active" : "Inactive"}
                  </Badge>
                </Col>
              </Col>
            </Row>
          );
        })}
      </>
    );
  };
  const columns = [
    {
      name: "Salon Name",
      minWidth: "297px",
      selector: "Title",
      sortable: true,
      cell: (row) => (
        <span
          className="user-name text-truncate mb-0 font-weight-bold"
          color="black"
          style={{ fontSize: 15, fontWeight: "bolder", color: "#F68D2F" }}
        >
          {row?.salonTitle}
        </span>
      ),
    },

    {
      name: "Subscription Title",
      minWidth: "100px",
      selector: "fullName",
      sortable: true,
      cell: (row) => row?.subscriptionTitle,
    },
    // {
    //   name: "total subscriptions",
    //   minWidth: "100px",
    //   selector: "contactNumber",
    //   sortable: true,
    //   cell: (row) => row?.paidAmount,
    // },
    {
      name: "Price",
      minWidth: "100px",
      selector: "contactNumber",
      sortable: true,
      cell: (row) => row?.paidAmount,
    },
    {
      name: "Expiry Date",
      minWidth: "138px",
      selector: "email",
      sortable: true,
      cell: (row) => <span className="text-capitalize">{row?.expireAt}</span>,
    },
    {
      name: "Total Subscriptions",
      minWidth: "60px",
      selector: "subscriptionDetail",
      sortable: true,
      cell: (row) => (
        <span className="text-capitalize">
          {row?.subscriptionDetail?.length}
        </span>
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
  const CustomPagination = () => {
    const count = Number(Math.ceil(store.total / rowsPerPage));

    return (
      <ReactPaginate
        previousLabel={""}
        nextLabel={""}
        pageCount={count || 1}
        activeClassName="active"
        forcePage={currentPage !== 0 ? currentPage - 1 : 0}
        onPageChange={(page) => handlePagination(page)}
        pageClassName={"page-item "}
        nextLinkClassName={"page-link "}
        nextClassName={"page-item next "}
        previousClassName={"page-item prev "}
        previousLinkClassName={"page-link "}
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

    if (SubscriptionArray?.length > 0) {
      return SubscriptionArray;
    }
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
            className="react-dataTable rounded-lg"
            // paginationComponent={CustomPagination}
            data={dataToRender()}
            expandableRows={true}
            expandOnRowClicked={true}
            expandableRowsComponent={<ExpandedComponent />}
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
        )}
      </Card>

      <Sidebar
        open={sidebarOpen}
        toggleSidebar={toggleSidebar}
        hideSidebar={hideSidebar}
      />
    </Fragment>
  );
};

export default UsersList;
