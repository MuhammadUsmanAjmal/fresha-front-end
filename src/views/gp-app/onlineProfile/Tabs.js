import { Nav, NavItem, NavLink } from "reactstrap";
import {
  User,
  Lock,
  Info,
  Link,
  Bell,
  BarChart2,
  UserCheck,
} from "react-feather";
import { useDispatch } from "react-redux";
import { getBookingAction } from "../../../redux/actions/onlineBookingAction";
import { useEffect } from "react";
import {
  getBranchesAction,
  getBranchStatusAction,
} from "../../../redux/actions/branchActions";
const Tabs = ({ activeTab, toggleTab }) => {
  const dispatch = useDispatch();
  const Info = JSON.parse(localStorage.getItem("userData"));
  const branchId = Info?.data?.branchId;
  const salonId = Info?.data?.salonId;
  const userId = Info?.data?.id;
  useEffect(() => {
    if (activeTab === "1") {
      dispatch(getBranchesAction(branchId, ""));
    }
  }, [activeTab]);
  return (
    <Nav className="nav-left" pills vertical>
      <NavItem>
        <NavLink active={activeTab === "1"} onClick={() => toggleTab("1")}>
          <UserCheck size={18} className="mr-1" />
          <span className="font-weight-bold">Marketplace Profile</span>
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink
          active={activeTab === "2"}
          onClick={() => {
            toggleTab("2");
            // dispatch(getBookingAction(branchId, userId, salonId));
            dispatch(getBranchStatusAction(branchId, true));
          }}
        >
          <Link size={18} className="mr-1" />
          <span className="font-weight-bold">Link Builder</span>
        </NavLink>
      </NavItem>
      {/* <NavItem>
        <NavLink active={activeTab === "3"} onClick={() => toggleTab("3")}>
          <Info size={18} className="mr-1" />
          <span className="font-weight-bold">Information</span>
        </NavLink>
      </NavItem> */}
      {/* <NavItem>
        <NavLink active={activeTab === "4"} onClick={() => toggleTab("4")}>
          <Link size={18} className="mr-1" />
          <span className="font-weight-bold">Social</span>
        </NavLink>
      </NavItem> */}
      {/* <NavItem>
        <NavLink active={activeTab === "5"} onClick={() => toggleTab("5")}>
          <Bell size={18} className="mr-1" />
          <span className="font-weight-bold">Notifications</span>
        </NavLink>
      </NavItem> */}
    </Nav>
  );
};

export default Tabs;
