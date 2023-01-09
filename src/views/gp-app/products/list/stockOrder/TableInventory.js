// ** React Imports
import { Fragment, useState, useEffect } from "react";
// ** Columns

// ** Store & Actions
import { getAllData, getData } from "../../store/action";
import { useDispatch, useSelector } from "react-redux";

// ** Third Party Components
import { DateFormat } from "../../../../../utility/Utils";
import ReactPaginate from "react-paginate";
import { ChevronDown, Eye, MoreVertical } from "react-feather";
import DataTable from "react-data-table-component";
import {
  Card,
  Row,
  Col,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import SpinnerFlex from "../../../../components/spinners/SpinnerFlex";

// ** Table Header
const CustomHeader = () => {
  return (
    <div className="invoice-list-table-header w-100 mr-1 ml-50 mt-2 mb-75 ">
      <Row>
        <Col xl="6" className="d-flex align-items-center p-0">
          <span style={{ fontSize: 20, color: "black", fontWeight: "bolder" }}>
            Stock Order
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
        ></Col>
      </Row>
    </div>
  );
};

const UsersList = () => {
  // ** Store Vars
  const dispatch = useDispatch();
  const store = useSelector((state) => state.users);
  const StockInformation = useSelector((state) => state.getStockOrder);
  const { loading } = StockInformation;
  const Stocks = StockInformation?.StockOrder?.data;
  // ** States
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [productDetail, setProductDetail] = useState();
  console.log(Stocks);
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
  const [modalVisible, setModalVisible] = useState(false);
  const toggle = () => setModalVisible(!modalVisible);
  // console.log("data in supplier table", sup);

  // ** Function to toggle sidebar

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

  const columns = [
    {
      name: "Order #",
      minWidth: "100px",
      selector: "orderNumber",
      sortable: true,
      cell: (row) => row?.orderCode,
    },
    {
      name: "created at",
      minWidth: "200px",
      selector: "createdAt",
      sortable: true,
      // cell: (row) => row?.createdAt,
      cell: (row) => <span>{DateFormat(row?.createdAt)}</span>,
    },
    {
      name: "Delivery from",
      minWidth: "200px",
      selector: "deliveredBy",
      sortable: true,
      cell: (row) => row?.supplierInformation[0]?.supplierName,
    },
    {
      name: "Delivery to",
      minWidth: "200px",
      selector: "branchInformation",
      sortable: true,
      cell: (row) => row?.branchInformation[0].branchTitle,
    },

    {
      name: "Total Cost",
      minWidth: "100px",
      selector: "totalOrderPrice",
      sortable: true,
      cell: (row) => row?.totalOrderPrice,
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
              className="w-100"
              onClick={() => {
                setProductDetail(row?.stockOrderJobs);
                toggle();
              }}
            >
              <Eye size={14} className="mr-50" />
              <span className="align-middle">View Detail</span>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
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

    if (Stocks?.length > 0) {
      return Stocks;
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
                handlePerPage={handlePerPage}
                rowsPerPage={rowsPerPage}
                searchTerm={searchTerm}
                handleFilter={handleFilter}
              />
            }
          />
        )}
      </Card>
      <Modal
        className=" modal-lg modal-dialog-centered"
        isOpen={modalVisible}
        toggle={toggle}
        modalTransition={{ timeout: 500 }}
      >
        <ModalHeader toggle={toggle}>
          <h3
            style={{
              padding: "5px",
              fontWeight: "bolder",
            }}
          >
            StockOrder Product Details
          </h3>
        </ModalHeader>
        <ModalBody>
          <Row lg="12" className="p-1">
            <Col className="d-flex border-bottom justify-content-between align-items-center">
              <Col lg="2" cursor="pointer">
                <h5 className="font-weight-bold d-flex align-items-center">
                  <strong>Product Name</strong>
                </h5>
              </Col>
              <Col
                lg="2"
                className=" d-flex align-items-center justify-content-between "
              >
                {/* <Col> */}
                <h5 className="font-weight-bold">
                  <strong>Supplier</strong>
                </h5>
                {/* </Col> */}
              </Col>
              <Col lg="2">
                <h5 className="font-weight-bold  d-flex align-items-center ">
                  {" "}
                  <strong>Amount</strong>
                </h5>
              </Col>
              <Col lg="2">
                <h5 className="font-weight-bold  d-flex align-items-center ">
                  <strong>Price</strong>
                </h5>
              </Col>
              <Col lg="2">
                <h5 className="font-weight-bold  d-flex align-items-center ">
                  <strong>SKU</strong>
                </h5>
              </Col>
              <Col lg="2">
                <h5 className="font-weight-bold  d-flex align-items-center ">
                  <strong>R-SKU</strong>
                </h5>
              </Col>
              {/* <Col lg="3">
                <h5 className="font-weight-bold  d-flex align-items-center ">
                  Status
                </h5>
              </Col> */}
            </Col>
          </Row>
          {productDetail &&
            productDetail.map((item) => {
              return (
                <Row lg="12" key={item?._id} className="p-1">
                  <Col className="d-flex border-bottom justify-content-between align-items-center">
                    <Col lg="2" cursor="pointer">
                      <h5 className="font-weight-bold d-flex align-items-center">
                        <span>{item?.productInformation[0]?.productName}</span>
                      </h5>
                    </Col>
                    <Col
                      lg="2"
                      className=" d-flex align-items-center justify-content-between "
                    >
                      {/* <Col> */}
                      <h5 className="font-weight-bold">
                        <span>
                          {Stocks &&
                            Stocks[0]?.supplierInformation[0]?.supplierName}
                        </span>
                      </h5>
                      {/* </Col> */}
                    </Col>
                    <Col lg="2">
                      <h5 className="font-weight-bold  d-flex align-items-center ">
                        {" "}
                        <span>
                          {item?.productInformation[0]?.amount +
                            item?.productInformation[0]?.measure}
                        </span>
                      </h5>
                    </Col>
                    <Col lg="2">
                      <h5 className="font-weight-bold  d-flex align-items-center ">
                        <span>{item?.productInformation[0]?.price} PKR</span>
                      </h5>
                    </Col>
                    <Col lg="2">
                      <h5 className="font-weight-bold  d-flex align-items-center ">
                        <span>
                          {item?.productInformation[0]?.stockKeepingUnit}
                        </span>
                      </h5>
                    </Col>
                    <Col lg="2">
                      <h5 className="font-weight-bold  d-flex align-items-center ">
                        <span>
                          {item?.productInformation[0]?.remainingAmount}
                        </span>
                      </h5>
                    </Col>
                    {/* <Col lg="3">
                <h5 className="font-weight-bold  d-flex align-items-center ">
                  Status
                </h5>
              </Col> */}
                  </Col>
                </Row>
              );
            })}
        </ModalBody>
        {/* <ModalFooter></ModalFooter> */}
      </Modal>
    </Fragment>
  );
};

export default UsersList;
