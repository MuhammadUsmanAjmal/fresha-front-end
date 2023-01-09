// ** React Imports
import { Fragment, useState, useEffect } from "react";

// ** Invoice List Sidebar

// ** Store & Actions
// import { getAllData, getData } from "../store/action";
import { useDispatch, useSelector } from "react-redux";

// ** Third Party Components
import Select from "react-select";
import ReactPaginate from "react-paginate";
import { ChevronDown, ChevronRight } from "react-feather";
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
import { Link, useLocation, useParams } from "react-router-dom";
import {
  getStaff,
  searchStaffAction,
  staffToggleAction,
} from "../../../../../redux/actions/staffActions";
import SpinnerFlex from "../../../../components/spinners/SpinnerFlex";
import BreadCrumbs from "../../Components/Breadcrumbs";
// ** Table Header
const CustomHeader = ({
  handlePerPage,
  rowsPerPage,
  handleFilter,
  Detail,
  BranchId,
  SalonId,
  // searchTerm,
}) => {
  return (
    <div className="invoice-list-table-header w-100 mr-1 ml-50 mt-2 mb-75">
      <Row>
        <Col xl="8">
          <BreadCrumbs
            breadCrumbParent3={Detail?.branchTitle}
            breadCrumbActive="Beauticians"
            Detail={Detail}
            BranchId={BranchId}
            SalonId={SalonId}
          />

          {/* <span style={{ fontSize: 20, fontWeight: "bolder", color: "black" }}>
            {Detail?.SalonTitle}
          </span>
          <ChevronRight size={20} />
          <span style={{ fontSize: 16, fontWeight: "bold", color: "gray" }}>
            {Detail?.branchTitle}
          </span> */}
        </Col>
        <Col
          xl="4"
          className="d-flex align-items-center p-0 justify-content-end"
        >
          <div className="d-flex align-items-center mb-sm-0 mb-1 mr-1">
            <Label className="mb-0" for="search-invoice">
              Search:
            </Label>
            <Input
              id="search-invoice"
              className="ml-50 w-100"
              type="text"
              // value={searchTerm}
              onChange={(e) => {
                e.preventDefault();
                handleFilter(e.target.value);
              }}
            />
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
      </Row>
    </div>
  );
};

const UsersList = () => {
  // ** Store Vars
  const dispatch = useDispatch();
  const { branchId, salonId } = useParams();
  const { Info } = useLocation();
  const [SalonStaff, setSalonStaff] = useState();
  const GetBeautician = useSelector((state) => state.getStaff);
  const { loading } = GetBeautician;
  const BeauticianStore = GetBeautician?.Staff?.data;
  // const Toggle = useSelector((state) => state.staffToggle);
  // const success = Toggle?.Staff?.success;
  // ** States
  // const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [data, setData] = useState({});
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
  // useEffect(() => {
  //   if (success) {
  //     dispatch(getStaff(InfoData?.data?.branchId));
  //   }
  // }, [success]);
  useEffect(() => {
    dispatch(getStaff(branchId));
  }, []);

  useEffect(() => {
    setSalonStaff(BeauticianStore);
  }, [BeauticianStore]);
  // ** Function to toggle sidebar

  const toggleMode = (id, value) => {
    SalonStaff.forEach((item) => {
      if (item?._id === id) {
        item.isActive = value;
      }
    });
    dispatch(staffToggleAction(id, { isActive: value }));
  };

  const statusObj = {
    Male: "light-warning",
    Female: "light-success",
  };
  const columns = [
    {
      name: "B-Code",
      minWidth: "150px",
      selector: "code",
      sortable: true,
      cell: (row) => (
        <span
          className="user-name text-truncate mb-0 font-weight-bold"
          color="black"
          style={{ fontSize: 15, fontWeight: "bolder", color: "#F68D2F" }}
        >
          {row.code}
        </span>
      ),
    },
    {
      name: "Beautician Name",
      minWidth: "297px",
      selector: "fullName",
      sortable: true,
      cell: (row) => (
        <div className="d-flex justify-content-left align-items-center">
          {/* <Link className="user-name text-truncate mb-0"> */}
          <span className="font-weight-bold">{row.fullName}</span>
          {/* </Link> */}
        </div>
      ),
    },
    {
      name: "Email",
      minWidth: "250px",
      selector: "email",
      sortable: true,
      cell: (row) => row.email,
    },
    {
      name: "Contact",
      minWidth: "172px",
      selector: "role",
      sortable: true,
      cell: (row) => (
        <span className="text-capitalize">{row.contactNumber}</span>
      ),
    },
    {
      name: "Gender",
      minWidth: "138px",
      selector: "currentPlan",
      sortable: true,
      cell: (row) => (
        <Badge
          className="text-capitalize"
          color={statusObj[row.gender === "M" ? "Male" : "Female"]}
        >
          {row.gender === "M" ? "Male" : "Female"}
        </Badge>
      ),
    },
    {
      name: "Status",
      minWidth: "138px",
      selector: "status",
      sortable: true,
      cell: (row) => (
        <CustomInput
          cursor="pointer"
          className="custom-control-warning"
          name="warning"
          type="switch"
          id={row?._id}
          inline
          onChange={() => toggleMode(row?._id, !row?.isActive)}
          defaultChecked={row?.isActive}
        />
      ),
    },
    // {
    //   name: "Salary",
    //   minWidth: "138px",
    //   selector: "status",
    //   sortable: true,
    //   cell: (row) => (
    //     <Badge className="text-capitalize" color={statusObj[row.status]} pill>
    //       {row.status}
    //     </Badge>
    //   ),
    // },
    // {
    //   name: "Actions",
    //   minWidth: "100px",
    //   cell: (row) => (
    //     <UncontrolledDropdown>
    //       <DropdownToggle tag="div" className="btn btn-sm">
    //         <MoreVertical size={14} className="cursor-pointer" />
    //       </DropdownToggle>
    //       <DropdownMenu right>
    //         <DropdownItem
    //           // tag={Link}
    //           // to={`/gp-app/staff/view/${row.id}`}
    //           className="w-100"
    //           onClick={() => {
    //             setData(row);
    //             UpdateToggleSidebar();
    //             // console.log(row);
    //           }}
    //         >
    //           <Archive size={14} className="mr-50" />
    //           <span className="align-middle">Edit</span>
    //         </DropdownItem>
    //         {/* <DropdownItem
    //           className="w-100"
    //           onClick={() => store.dispatch(deleteUser(row.id))}
    //         >
    //           <Trash2 size={14} className="mr-50" />
    //           <span className="align-middle">Delete</span>
    //         </DropdownItem> */}
    //       </DropdownMenu>
    //     </UncontrolledDropdown>
    //   ),
    // },
  ];

  // ** Function in get data on page change
  const handlePagination = (page) => {
    // dispatch(
    //   getData({
    //     page: page.selected + 1,
    //     perPage: rowsPerPage,
    //     role: currentRole.value,
    //     currentPlan: currentPlan.value,
    //     status: currentStatus.value,
    //     q: searchTerm,
    //   })
    // );
    // setCurrentPage(page.selected + 1);
  };

  // ** Function in get data on rows per page
  const handlePerPage = (e) => {
    const value = parseInt(e.currentTarget.value);
    // dispatch(
    //   getData({
    //     page: currentPage,
    //     perPage: value,
    //     role: currentRole.value,
    //     currentPlan: currentPlan.value,
    //     status: currentStatus.value,
    //     q: searchTerm,
    //   })
    // );
    setRowsPerPage(value);
  };

  // ** Function in get data on search query change
  const handleFilter = (val) => {
    // setSearchTerm(val);
    dispatch(searchStaffAction(branchId, val));
  };

  // ** Custom Pagination
  const CustomPagination = () => {
    const count = Number(Math.ceil(SalonStaff.total / rowsPerPage));

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
      // q: searchTerm,
    };

    const isFiltered = Object.keys(filters).some(function (k) {
      return filters[k].length > 0;
    });

    if (SalonStaff?.length > 0) {
      return SalonStaff;
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
                handlePerPage={handlePerPage}
                rowsPerPage={rowsPerPage}
                // searchTerm={searchTerm}
                handleFilter={handleFilter}
                Detail={Info}
                SalonId={salonId}
                BranchId={branchId}
              />
            }
          />
        )}
      </Card>
    </Fragment>
  );
};

export default UsersList;
