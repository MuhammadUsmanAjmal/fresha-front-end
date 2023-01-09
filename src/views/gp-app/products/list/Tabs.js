import { Nav, NavItem, NavLink } from "reactstrap";
import { Briefcase, Bold, Bookmark, Users, Archive } from "react-feather";
import { useEffect } from "react";

import { useDispatch } from "react-redux";
import { getStockOrder } from "../../../../redux/actions/stockOrderAction";

const Tabs = ({ activeTab, toggleTab }) => {
  const dispatch = useDispatch();
  const locale = JSON.parse(localStorage.getItem("userData"));
  const salonID = locale?.data?.salonId;
  const branchId = locale?.data?.branchId;
  useEffect(() => {
    if (activeTab === "1") {
      dispatch(getStockOrder(salonID, branchId));
    } else {
      console.log("All Active");
    }
  }, [activeTab]);
  return (
    <Nav className="nav-left" pills vertical>
      <NavItem>
        <NavLink active={activeTab === "1"} onClick={() => toggleTab("1")}>
          <Archive size={18} className="mr-1" />
          <span className="font-weight-bold">Stock Orders</span>
        </NavLink>
      </NavItem>

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
