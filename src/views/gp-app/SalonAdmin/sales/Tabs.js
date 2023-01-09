import { Nav, NavItem, NavLink } from "reactstrap";
import {
  User,
  Lock,
  Info,
  Link,
  Bell,
  ShoppingCart,
  Clock,
  ShoppingBag,
} from "react-feather";

const Tabs = ({ activeTab, toggleTab }) => {
  return (
    <Nav className="nav-left" pills vertical>
      <NavItem>
        <NavLink active={activeTab === "1"} onClick={() => toggleTab("1")}>
          <ShoppingCart size={18} className="mr-1" />
          <span className="font-weight-bold">New Sale</span>
        </NavLink>
      </NavItem>

      <NavItem>
        <NavLink active={activeTab === "2"} onClick={() => toggleTab("2")}>
          <Info size={18} className="mr-1" />
          <span className="font-weight-bold">Daily Sale</span>
        </NavLink>
      </NavItem>

      <NavItem>
        <NavLink active={activeTab === "3"} onClick={() => toggleTab("3")}>
          <Clock size={18} className="mr-1" />
          <span className="font-weight-bold">Appointments</span>
        </NavLink>
      </NavItem>

      <NavItem>
        <NavLink active={activeTab === "4"} onClick={() => toggleTab("4")}>
          <ShoppingBag size={18} className="mr-1" />
          <span className="font-weight-bold">Sales History</span>
        </NavLink>
      </NavItem>
    </Nav>
  );
};

export default Tabs;
