// ** React Imports
import { Fragment, useState, useEffect } from "react";

// ** Invoice List Sidebar
import Sidebar from "./Sidebar";
// import Breadcrumbs from "../../../Components/Breadcrumbs";

// ** Columns

// ** Store & Actions
import { useDispatch, useSelector } from "react-redux";

// ** Third Party Components
import ReactPaginate from "react-paginate";
import {
  Archive,
  BarChart2,
  Calendar,
  ChevronDown,
  Edit,
  Home,
  MoreVertical,
  Plus,
  User,
  Users,
} from "react-feather";
import DataTable from "react-data-table-component";
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
  DropdownToggle,
  UncontrolledDropdown,
  DropdownItem,
  DropdownMenu,
} from "reactstrap";
// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import { getSalonAction } from "../../../../../redux/actions/saloonActions";
import { Link, useLocation, useParams } from "react-router-dom";
import SpinnerFlex from "../../../../components/spinners/SpinnerFlex";
import {
  getBranchesAclAction,
  getBranchesAction,
} from "../../../../../redux/actions/branchActions";

// ** Table Header
const CustomHeader = ({
  toggleSidebar,
  handlePerPage,
  rowsPerPage,
  handleFilter,
  searchTerm,
  branchHead,
  branchTitle,
  Detail,
  BranchId,
  SalonId,
}) => {
  return (
    <div className="invoice-list-table-header w-100 mr-1 ml-50 mt-2 mb-75 ">
      <Row>
        <Col xl="6" className=" p-0">
          {/* <Breadcrumbs
            breadCrumbParent2={branchHead}
            Detail={Detail}
            BranchId={BranchId}
            SalonId={SalonId}
          /> */}
          {/* <span style={{ fontSize: 20, fontWeight: "bolder", color: "black" }}>
            {branchHead}
          </span> */}
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
            <span> Add New Branch</span>
          </Button.Ripple>
        </Col>
      </Row>
    </div>
  );
};

const UsersList = () => {
  // ** Store Vars
  const dispatch = useDispatch();
  // const { salonId, branchId } = useParams();
  const location = useLocation();
  const SalonName = location?.state?.SalonTitle;
  const branchTitle = location?.state?.branchTitle;
  const store = useSelector((state) => state.users);
  const BranchInformation = useSelector((state) => state.branchesDetail);
  const { loading } = BranchInformation;
  const Branch = BranchInformation?.branches?.data;
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
  const Info = JSON.parse(localStorage.getItem("userData"));
  const branchId = Info?.data?.branchId;
  const salonId = Info?.data?.salonId;
  useEffect(() => {
    dispatch(getBranchesAclAction(salonId, ""));
  }, []);

  // ** Function to toggle sidebar
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const hideSidebar = () => {
    setSidebarOpen(false);
  };

  const columns = [
    {
      name: "Branch Name",
      minWidth: "297px",
      selector: "branchTile",
      sortable: true,
      cell: (row) => (
        // <Link className="user-name text-truncate mb-0" cursor="none">
        <span
          className="user-name text-truncate mb-0 font-weight-bold"
          color="black"
          style={{ fontSize: 15, fontWeight: "bolder", color: "#F68D2F" }}
        >
          {row?.branchTitle}
        </span>
        // </Link>
      ),
    },
    // {
    //   name: "Email",
    //   minWidth: "100px",
    //   selector: "email",
    //   sortable: true,
    //   cell: (row) => row?.email,
    // },
    {
      name: "Contact Number",
      minWidth: "200px",
      selector: "contactNumber",
      sortable: true,
      cell: (row) => row?.contactNumber,
    },
    {
      name: "Email",
      minWidth: "200px",
      selector: "Email",
      sortable: true,
      cell: (row) => row?.userInformation[0]?.email,
    },
    {
      name: "Address",
      minWidth: "220px",
      selector: "address",
      sortable: true,
      cell: (row) => (
        <span className="text-capitalize">{row?.branchLocation}</span>
      ),
    },
    {
      name: "Actions",
      minWidth: "100px",
      cell: (row) => (
        <UncontrolledDropdown>
          <DropdownToggle tag="div" className="btn btn-sm">
            <MoreVertical size={14} className="cursor-pointer" />
          </DropdownToggle>
          <DropdownMenu right>
            {/* <DropdownItem tag={Link} className="w-100">
              <Link to={"/app/" + salonId + "/branches/" + row?._id + "/home"}>
                <Home size={15} className="mr-50" />
                <span className="align-middle ">Home</span>
              </Link>
            </DropdownItem> */}
            {/* <DropdownItem tag={Link} className="w-100">
              <Link
                to={"/app/" + salonId + "/branches/" + row?._id + "/calendar"}
              >
                <Calendar size={14} className="mr-50" />
                <span className="align-middle">Calendar</span>
              </Link>
            </DropdownItem> */}
            <DropdownItem
              tag={Link}
              className="w-100"
              to={"/app/" + salonId + "/branches/" + row?._id + "/sales/:page?"}
              style={{ color: "#F68D2F" }}
            >
              <BarChart2 size={14} className="mr-50" />
              <span className="align-middle">Sales</span>
            </DropdownItem>
            <DropdownItem
              tag={Link}
              className="w-100"
              to={{
                pathname:
                  "/app/" + salonId + "/branches/" + row?._id + "/categories",
                Info: {
                  SalonTitle: SalonName,
                  branchTitle: row?.branchTitle,
                },
              }}
              style={{ color: "#F68D2F" }}
            >
              <Archive size={14} className="mr-50" />
              <span className="align-middle">Categories</span>
            </DropdownItem>
            <DropdownItem
              tag={Link}
              className="w-100"
              to={{
                pathname:
                  "/app/" + salonId + "/branches/" + row?._id + "/beautician",
                Info: {
                  SalonTitle: SalonName,
                  branchTitle: row?.branchTitle,
                },
              }}
              style={{ color: "#F68D2F" }}
            >
              <Users size={14} className="mr-50" />
              <span className="align-middle">Beauticians</span>
            </DropdownItem>
            <DropdownItem
              tag={Link}
              className="w-100"
              to={{
                pathname:
                  "/app/" + salonId + "/branches/" + row?._id + "/clients",
                Info: {
                  SalonTitle: SalonName,
                  branchTitle: row?.branchTitle,
                },
              }}
              style={{ color: "#F68D2F" }}
            >
              <User size={14} className="mr-50" />
              <span className="align-middle">Clients</span>
            </DropdownItem>
            {/* <DropdownItem
              className="w-100"
              onClick={() => dispatch(deleteCatAction(row?._id))}
            >
              <Trash2 size={14} className="mr-50" />
              <span className="align-middle">Delete</span>
            </DropdownItem> */}
          </DropdownMenu>
        </UncontrolledDropdown>
      ),
    },
  ];

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

    if (Branch?.length > 0) {
      return Branch;
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
            className="react-dataTable rounded-lg "
            // paginationComponent={CustomPagination}
            data={dataToRender()}
            subHeaderComponent={
              <CustomHeader
                toggleSidebar={toggleSidebar}
                rowsPerPage={rowsPerPage}
                searchTerm={searchTerm}
                branchHead={SalonName}
                branchTitle={branchTitle}
                SalonId={salonId}
                BranchId={branchId}
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
