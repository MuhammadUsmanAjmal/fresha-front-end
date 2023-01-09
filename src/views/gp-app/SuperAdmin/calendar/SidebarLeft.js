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
import { getStaff } from "../../../../redux/actions/staffActions";
import { getAppointmentAction } from "../../../../redux/actions/appoinmentAction";
import { useParams } from "react-router-dom";
const SidebarLeft = (props) => {
  // ** Props
  const { viewChange } = props;
  const { branchId, salonId } = useParams();

  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const GetBeautician = useSelector((state) => state.getStaff);
  const Beautician = GetBeautician?.Staff?.data;

  useEffect(() => {
    dispatch(getStaff(branchId, true));
  }, []);
  // ** Function to handle Add Event Click
  const handleAddEventClick = () => {
    viewChange("1");
    // toggleSidebar(false);
    // handleAddEventSidebar();
  };

  let BeautArray = [];
  Beautician?.forEach((item) => {
    let obj = {};
    obj["label"] = item?.fullName;
    obj["value"] = item._id;
    BeautArray.push(obj);
  });

  const Status = [
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
              onChange={(v) =>
                dispatch(getAppointmentAction(branchId, v.value))
              }
            />
          </FormGroup>
          <FormGroup>
            <Select
              options={Status}
              id="status"
              name="status"
              placeholder="Status"
              classNamePrefix="select"
              onChange={(v) =>
                dispatch(getAppointmentAction(branchId, "", v.value))
              }
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
