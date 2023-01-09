// ** React Imports
import { Fragment, useEffect, useState } from "react";
// ** Custom Components
import classnames from "classnames";
import { CardBody, Button, FormGroup, Input } from "reactstrap";
import Select, { components } from "react-select";
import "@styles/react/libs/react-select/_react-select.scss";

// ** illustration import
import illustration from "@src/assets/images/pages/login-img.svg";
import { useDispatch, useSelector } from "react-redux";
import { getStaff } from "../../../redux/actions/staffActions";
import { getAppointmentAction } from "../../../redux/actions/appoinmentAction";
const SidebarLeft = (props) => {
  // ** Props
  const { viewChange } = props;
  const [searchTerm, setSearchTerm] = useState("");
  const [beautician, setBeautician] = useState("");
  const [status, setStatus] = useState("");
  const dispatch = useDispatch();
  const GetBeautician = useSelector((state) => state.getStaff);
  const Beautician = GetBeautician?.Staff?.data;
  const branchId = JSON.parse(localStorage.getItem("userData"));
  const Id = branchId?.data?.branchId;
  const Beauty = JSON.parse(sessionStorage.getItem("BeauticianID"));
  const StatusSearch = JSON.parse(sessionStorage.getItem("StatusSearch"));
  // const InfoData = JSON.parse(localStorage.getItem("userData"));
  useEffect(() => {
    if (Beauty !== null && StatusSearch !== null) {
      dispatch(getAppointmentAction(Id, Beauty.value, StatusSearch.value));
    } else if (Beauty !== null) {
      dispatch(getAppointmentAction(Id, Beauty.value));
    } else if (StatusSearch !== null) {
      dispatch(getAppointmentAction(Id, "", StatusSearch.value));
    } else {
      dispatch(getAppointmentAction(Id));
    }
  }, [beautician, status]);
  // useEffect(() => {
  //   if (StatusSearch === null) {
  //
  //     dispatch(getAppointmentAction(Id));
  //   } else {
  //
  //     dispatch(getAppointmentAction(Id, "", StatusSearch.value));
  //   }
  // }, [status]);
  useEffect(() => {
    dispatch(getStaff(Id, true));
  }, []);
  // ** Function to handle Add Event Click
  const handleAddEventClick = () => {
    viewChange("1");
    // toggleSidebar(false);
    // handleAddEventSidebar();
  };

  let BeautArray = [{ label: "All Beauticians", value: "" }];
  Beautician?.forEach((item) => {
    let obj = {};
    obj["label"] = item?.fullName;
    obj["value"] = item._id;
    BeautArray.push(obj);
  });

  const Status = [
    { label: "Both", value: "" },
    { label: "New", value: "New" },
    { label: "Completed", value: "Completed" },
  ];

  const handleFilter = (val) => {
    setSearchTerm(val);
    if (val.length > 3) {
      dispatch(getAppointmentAction(Id, "", "", val));
    }
  };
  return (
    <Fragment>
      <div className="sidebar-wrapper">
        <CardBody className="card-body d-flex justify-content-center my-sm-0 mb-3 ">
          <Button.Ripple
            className="button_slide slide_right p-1"
            color="dark"
            block
            onClick={handleAddEventClick}
          >
            <span> Add Appointment </span>
          </Button.Ripple>
        </CardBody>
        <CardBody>
          <h5 className="section-label ">
            <span className="align-middle">Filter</span>
          </h5>
          <FormGroup>
            <Select
              options={BeautArray}
              id="beautician"
              name="beautician"
              placeholder="Select Beautician"
              classNamePrefix="select"
              defaultValue={Beauty}
              onChange={(v) => {
                setBeautician(v);
                sessionStorage.setItem("BeauticianID", JSON.stringify(v));
                // dispatch(getAppointmentAction(Id, v.value));
              }}
            />
          </FormGroup>
          <FormGroup>
            <Select
              options={Status}
              id="status"
              name="status"
              placeholder="Status"
              classNamePrefix="select"
              defaultValue={StatusSearch}
              onChange={(v) => {
                setStatus(v);
                sessionStorage.setItem("StatusSearch", JSON.stringify(v));
                // dispatch(getAppointmentAction(Id, "", v.value))
              }}
            />
          </FormGroup>
          <FormGroup>
            <Input
              id="search-appointment"
              type="text"
              value={searchTerm}
              onChange={(e) => {
                e.preventDefault();
                handleFilter(e.target.value);
              }}
              placeholder="Search"
            />
          </FormGroup>
        </CardBody>
      </div>
      <div className="mt-auto">
        <img className="img-fluid" src={illustration} alt="illustration" />
      </div>
    </Fragment>
  );
};

export default SidebarLeft;
