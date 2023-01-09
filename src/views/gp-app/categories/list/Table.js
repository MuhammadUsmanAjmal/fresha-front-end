// ** React Imports
import { Fragment, useState, useEffect } from "react";

// ** Invoice List Sidebar
import Sidebar from "./Sidebar";
// ** Columns
// import { columns } from "./columns";
// ** Store & Actions
import { getAllData, getData } from "../store/action";
import { updateToggleAction } from "../../../../redux/actions/categoryActions.js";
import { useDispatch, useSelector } from "react-redux";

// ** Third Party Components
import Select from "react-select";
import ReactPaginate from "react-paginate";
import { ChevronDown, Edit, Plus } from "react-feather";
import DataTable from "react-data-table-component";
import { selectThemeColors } from "@utils";
import {
  Card,
  Input,
  Row,
  Col,
  Label,
  CustomInput,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  ButtonDropdown,
} from "reactstrap";

import { MoreVertical, Menu } from "react-feather";
// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import { Link } from "react-router-dom";
import SidebarUpdateCategory from "./SidebarUpdateCategory";
import SidebarNewService from "./SidebarService";
import {
  getServices,
  searchServicesAction,
  serviceToggleAction,
} from "../../../../redux/actions/servicesActions";
import { timeConvert } from "../../../../utility/Utils";
import SidebarUpdateService from "./SidebarUpdateService";
import SpinnerFlex from "../../../components/spinners/SpinnerFlex";
// ** Table Header
const CustomHeader = ({
  toggleSidebar,
  ServiceToggleSidebar,
  handlePerPage,
  rowsPerPage,
  handleFilter,
  searchTerm,
  ChangeState,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="invoice-list-table-header w-100 mr-1 ml-50 mt-2 mb-75 ">
      <Row>
        <Col xl="6" className="d-flex align-items-center p-0">
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
        </Col>
        <Col
          xl="6"
          className="d-flex align-items-sm-center justify-content-lg-end justify-content-start flex-lg-nowrap flex-wrap flex-sm-row flex-column pr-lg-1 p-0 mt-lg-0 mt-1"
        >
          <ButtonDropdown
            isOpen={open}
            toggle={() => {
              setOpen(!open);
            }}
          >
            <DropdownToggle caret size="md" color="dark">
              Add New
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem onClick={toggleSidebar}>New Category</DropdownItem>
              <DropdownItem
                onClick={() => {
                  ChangeState(null);
                  ServiceToggleSidebar();
                }}
              >
                New Service
              </DropdownItem>
            </DropdownMenu>
          </ButtonDropdown>
        </Col>
      </Row>
    </div>
  );
};

const UsersList = () => {
  // ** Store Vars
  const dispatch = useDispatch();
  const catStore = useSelector((state) => state.getCategory);
  const categoryStore = catStore?.categories;
  const service = useSelector((state) => state.getServices);
  const { loading } = service;
  const serviceStore = service?.services?.data;
  // console.log(success);
  // const addCat = useSelector((state) => state.addCategory);
  // const AddSuccess = addCat?.categories?.success;
  // const deleteCat = useSelector((state) => state.deleteCategory);
  // const deleteSuccess = deleteCat?.success;

  // ** States
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [updateSidebarOpen, updateSetSidebarOpen] = useState(false);
  const [sidebarServiceOpen, setSidebarServiceOpen] = useState(false);
  const [updateSidebarServiceOpen, updateSetSidebarServiceOpen] =
    useState(false);
  const [Array1, setArray1] = useState(serviceStore);
  const [data, setData] = useState("");
  const [currentRole, setCurrentRole] = useState({
    value: "",
    label: "Select category",
  });
  const [currentStatus, setCurrentStatus] = useState({
    value: "",
    label: "Select Status",
    number: 0,
  });

  // let Array1 = [];
  // serviceStore?.forEach((item) => {
  //   let obj = {};
  //   obj["_id"] = item?._id;
  //   obj["isActive"] = item?.isActive;
  //   obj["categoryTitle"] = item?.categoryTitle;
  //   obj["services"] = item?.allServices;
  //   Array1.push(obj);
  //   //  obj["label"] = item.serviceTitle;
  // });
  useEffect(() => {
    dispatch(getServices(InfoData?.data?.branchId));
  }, []);
  useEffect(() => {
    setArray1(serviceStore);
  }, [serviceStore]);
  // useEffect(() => {
  //   if (success) {
  //     dispatch(getServices(InfoData?.data?.branchId));
  //   }
  // }, [success]);
  // ** Function to toggle sidebar
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const hideSidebar = () => {
    setSidebarOpen(false);
  };
  const updateHideSidebar = () => {
    updateSetSidebarOpen(false);
  };
  const UpdateToggleSidebar = () => {
    updateSetSidebarOpen(!updateSidebarOpen);
  };
  const ServiceToggleSidebar = () => {
    setSidebarServiceOpen(!sidebarServiceOpen);
  };

  const ServiceHideSidebar = () => {
    setSidebarServiceOpen(false);
  };
  const UpdateToggleSidebarService = () => {
    updateSetSidebarServiceOpen(!updateSidebarServiceOpen);
  };
  const updateHideSidebarService = () => {
    updateSetSidebarServiceOpen(false);
  };
  const InfoData = JSON.parse(localStorage.getItem("userData"));

  const ChangeState = (val) => {
    setData(val);
  };
  const toggleMode = (id, value) => {
    Array1.forEach((item) => {
      if (item?._id === id) {
        item.isActive = value;
        item?.allServices?.forEach((service) => {
          service.isActive = value;
        });
      }
    });
    dispatch(updateToggleAction(id, { isActive: value }));
  };
  const toggleModeService = (id, value) => {
    Array1.forEach((array1) => {
      array1?.allServices?.forEach((service) => {
        if (service?._id === id) {
          service.isActive = value;
        }
      });
    });
    dispatch(serviceToggleAction(id, { isActive: value }));
  };
  // ** Get data on mount

  const statusObj = {
    Active: "light-success",
    InActive: "light-danger",
  };

  const columns = [
    {
      name: "Services Menu",
      minWidth: "622px",
      selector: "categoryTitle",
      sortable: true,
      cell: (row) => (
        // <Link className="user-name text-truncate mb-0" onClick={() => {}}>
        <h style={{ fontSize: 17, fontWeight: "bolder", cursor: "default" }}>
          {row?.categoryTitle}
        </h>
        // </Link>
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
      name: "Status",
      minWidth: "158px",
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
          onChange={() => {
            toggleMode(row?._id, !row?.isActive);
          }}
          defaultChecked={row?.isActive}
        />
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
            <DropdownItem
              tag={Link}
              className="w-100"
              onClick={() => {
                setData(row);
                ServiceToggleSidebar();
              }}
            >
              <Plus size={15} className="mr-50" />
              <span className="align-middle">Add new Service</span>
            </DropdownItem>
            <DropdownItem
              tag={Link}
              className="w-100"
              onClick={() => {
                setData(row);
                UpdateToggleSidebar();
              }}
            >
              <Edit size={14} className="mr-50" />
              <span className="align-middle">Edit Category</span>
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

  const ExpandedComponent = (Array1) => {
    return (
      <Row>
        {Array1?.data?.allServices?.map((item) => {
          return (
            <Col
              lg="12"
              className="d-flex border-bottom justify-content-between"
            >
              <Col
                lg="6"
                cursor="pointer"
                onClick={() => {
                  setData(item);
                  UpdateToggleSidebarService();
                }}
              >
                <h5
                  className="font-weight-bold p-2  d-flex align-items-center "
                  key={item._id}
                >
                  <Menu size={14} className="mr-1" />
                  {item?.serviceTitle}
                </h5>
              </Col>
              <Col
                lg="4"
                className="p-2 d-flex align-items-center justify-content-between "
              >
                <Col>
                  <h5 className="font-weight-bold" key={item?._id}>
                    {timeConvert(item?.duration)}
                  </h5>
                </Col>
                <Col>
                  <CustomInput
                    cursor="pointer"
                    className="custom-control-warning d-flex justify-content-end"
                    name="warning"
                    type="switch"
                    id={item?._id}
                    inline
                    onChange={() =>
                      toggleModeService(item?._id, !item?.isActive)
                    }
                    defaultChecked={item?.isActive}
                  />
                </Col>
              </Col>
              <Col lg="2">
                <h5
                  className="font-weight-bold p-2 d-flex align-items-center "
                  key={item?._id}
                >
                  PKR {item?.price}
                </h5>
              </Col>
            </Col>
          );
        })}
      </Row>
    );
  };
  // ** Function in get data on page change
  const handlePagination = (page) => {
    dispatch(
      getData({
        page: page.selected + 1,
        perPage: rowsPerPage,
        role: currentRole.value,
        // currentPlan: currentPlan.value,
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
        status: currentStatus.value,
        q: searchTerm,
      })
    );
    setRowsPerPage(value);
  };

  // ** Function in get data on search query change
  const handleFilter = (val) => {
    // setSearchTerm(val);
    // if (val.length > 3) {
    dispatch(searchServicesAction(InfoData?.data?.branchId, "", val));
    // }
  };

  // ** Custom Pagination
  const CustomPagination = () => {
    const count = Number(Math.ceil(Array1.total / rowsPerPage));

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
      // currentPlan: currentPlan.value,
      status: currentStatus.value,
      q: searchTerm,
    };

    const isFiltered = Object.keys(filters).some(function (k) {
      return filters[k].length > 0;
    });

    if (Array1?.length > 0) {
      return Array1;
    }
    // else if (categoryStore?.data?.length === 0 && isFiltered) {
    //   return [];
    // } else {
    //   return categoryStore?.data.slice(0, rowsPerPage);
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
                // options={
                //   categoryStore &&
                //   categoryStore?.data?.map((data) => data?.categoryTitle)
                // }
                value={currentRole}
                onChange={(data) => {
                  setCurrentRole(data);
                  // dispatch(getCategory())
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
                // value={currentPlan}
                onChange={(data) => {
                  // setCurrentPlan(data)
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
                      // currentPlan: currentPlan.value,
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
            // sortIcon={<ChevronDown />}
            className="react-dataTable rounded-lg "
            // paginationComponent={CustomPagination}
            data={dataToRender()}
            expandableRows={true}
            expandOnRowClicked={true}
            expandableRowsComponent={
              <ExpandedComponent
                UpdateToggleSidebarService={UpdateToggleSidebarService}
              />
            }
            subHeaderComponent={
              <CustomHeader
                toggleSidebar={toggleSidebar}
                handlePerPage={handlePerPage}
                rowsPerPage={rowsPerPage}
                searchTerm={searchTerm}
                handleFilter={handleFilter}
                ServiceToggleSidebar={ServiceToggleSidebar}
                ChangeState={ChangeState}
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
      <SidebarUpdateCategory
        open={updateSidebarOpen}
        toggleSidebar={UpdateToggleSidebar}
        hideSidebar={updateHideSidebar}
        data={data}
      />
      <SidebarNewService
        open={sidebarServiceOpen}
        toggleSidebar={ServiceToggleSidebar}
        hideSidebar={ServiceHideSidebar}
        Data={data}
      />
      <SidebarUpdateService
        open={updateSidebarServiceOpen}
        toggleSidebar={UpdateToggleSidebarService}
        hideSidebar={updateHideSidebarService}
        Data={data}
      />
    </Fragment>
  );
};

export default UsersList;
