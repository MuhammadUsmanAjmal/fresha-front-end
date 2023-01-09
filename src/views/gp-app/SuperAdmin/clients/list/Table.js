// ** React Imports
import { Fragment, useState, useEffect } from "react";

// ** Columns

// ** Store & Actions
import { getAllData, getData } from "../store/action";
import { useDispatch, useSelector } from "react-redux";
import {
  getClients,
  searchClientsAction,
  clientToggleAction,
} from "../../../../../redux/actions/clientsActions";

// ** Third Party Components
import Select from "react-select";
import ReactPaginate from "react-paginate";
import {
  ChevronDown,
  MoreVertical,
  Archive,
  Trash2,
  Edit,
  ChevronRight,
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
  Badge,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import { Link, useLocation, useParams } from "react-router-dom";
import SpinnerFlex from "../../../../components/spinners/SpinnerFlex";
import BreadCrumbs from "../../Components/Breadcrumbs";
// ** Table Header
const CustomHeader = ({
  toggleSidebar,
  handlePerPage,
  rowsPerPage,
  handleFilter,
  searchTerm,
  Detail,
  BranchId,
  SalonId,
}) => {
  return (
    <div className="invoice-list-table-header w-100 mr-1 ml-50 mt-2 mb-75 ">
      <Row>
        <Col xl="6">
          <BreadCrumbs
            breadCrumbParent2={Detail?.SalonTitle}
            breadCrumbParent3={Detail?.branchTitle}
            breadCrumbActive="Clients"
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
          xl="6"
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
              value={searchTerm}
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
  const [clientDetail, setClientDetail] = useState();
  const store = useSelector((state) => state.users);
  const clientsStore = useSelector((state) => state.getClient);
  const { loading } = clientsStore;
  const ClientInfo = clientsStore?.Clients?.data;

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const userInfo = JSON.parse(localStorage.getItem("userData"));

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

  const toggleMode = (id, value) => {
    clientDetail?.forEach((item) => {
      if (item?._id === id) {
        item.isActive = value;
      }
    });
    dispatch(clientToggleAction(id, { isActive: value }));
  };
  useEffect(() => {
    dispatch(getClients(branchId));
  }, []);
  useEffect(() => {
    setClientDetail(ClientInfo);
  }, [ClientInfo]);

  // useEffect(() => {
  //   if (updateSuccess) {
  //     dispatch(getClients(userInfo?.data?.branchId));
  //   }
  //   return () => {
  //     dispatch({ type: "CLIENTS_UPDATE_RESET" });
  //   };
  // }, [updateSuccess]);
  // ** Get data on mount
  // useEffect(() => {
  // dispatch(getAllData());
  // dispatch(
  //   getData({
  //     page: currentPage,
  //     perPage: rowsPerPage,
  //     role: currentRole.value,
  //     currentPlan: currentPlan.value,
  //     status: currentStatus.value,
  //     q: searchTerm,
  //   })
  // );
  // }, []);

  // ** User filter options

  const statusObj = {
    Male: "light-warning",
    Female: "light-success",
  };
  const columns = [
    {
      name: "UserName",
      minWidth: "297px",
      selector: "fullName",
      sortable: true,
      cell: (row) => (
        <span
          className="user-name text-truncate mb-0 font-weight-bold"
          color="black"
          style={{ fontSize: 15, fontWeight: "bolder", color: "#F68D2F" }}
        >
          {row.fullName}
        </span>
      ),
    },
    {
      name: "Email",
      minWidth: "320px",
      selector: "email",
      sortable: true,
      cell: (row) => row?.email,
    },
    {
      name: "Phone No",
      minWidth: "200px",
      selector: "contactNumber",
      sortable: true,
      cell: (row) => row?.contactNumber,
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
    {
      name: "Gender",
      minWidth: "138px",
      selector: "gender",
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
    dispatch(searchClientsAction(branchId, val));
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
    // const filters = {
    //   role: currentRole.value,
    //   currentPlan: currentPlan.value,
    //   status: currentStatus.value,
    //   q: searchTerm,
    // };

    // const isFiltered = Object.keys(filters).some(function (k) {
    //   return filters[k].length > 0;
    // });

    // if (store.data.length > 0) {
    //   return store.data;
    // } else if (store.data.length === 0 && isFiltered) {
    //   return [];
    // } else {
    //   return store.allData.slice(0, rowsPerPage);
    // }
    if (clientDetail?.length > 0) {
      return clientDetail;
    }
    // } else {
    //   return clientsStore.Clients.data.slice(0, rowsPerPage);
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
            className="react-dataTable rounded-lg "
            // paginationComponent={CustomPagination}
            data={dataToRender()}
            subHeaderComponent={
              <CustomHeader
                handlePerPage={handlePerPage}
                rowsPerPage={rowsPerPage}
                searchTerm={searchTerm}
                handleFilter={handleFilter}
                Detail={Info}
                BranchId={branchId}
                SalonId={salonId}
              />
            }
          />
        )}
      </Card>
    </Fragment>
  );
};

export default UsersList;
