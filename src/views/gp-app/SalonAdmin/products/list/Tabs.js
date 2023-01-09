import { Nav, NavItem, NavLink } from "reactstrap";
import {
  User,
  Lock,
  Info,
  Link,
  Bell,
  BarChart2,
  Briefcase,
  Bold,
  Bookmark,
  Users,
  Archive,
} from "react-feather";
import { useEffect } from "react";
import { getProductAction } from "../../../../../redux/actions/productActions";
import { getBrand } from "../../../../../redux/actions/brandAction";
import { getProdCatAction } from "../../../../../redux/actions/prodCategoryAction";
import { useDispatch } from "react-redux";
import { getSupplier } from "../../../../../redux/actions/supplierActions";
import { getStockOrder } from "../../../../../redux/actions/stockOrderAction";
import { getBranchesAclAction } from "../../../../../redux/actions/branchActions";

const Tabs = ({ activeTab, toggleTab }) => {
  const dispatch = useDispatch();
  const locale = JSON.parse(localStorage.getItem("userData"));
  const salonID = locale?.data?.salonId;
  useEffect(() => {
    if (activeTab === "1") {
      dispatch(getProductAction(salonID, ""));
      dispatch(getBrand(salonID));
      dispatch(getProdCatAction(salonID));
      dispatch(getSupplier(salonID));
    }
    //  else if (activeTab === "2") {
    //   dispatch(getBrand(salonID));
    // } else if (activeTab === "3") {
    //   dispatch(getProdCatAction(salonID));
    // } else if (activeTab === "4") {
    //   dispatch(getSupplier(salonID));
    // }
    else if (activeTab === "5") {
      dispatch(getStockOrder(salonID, ""));
      dispatch(getBranchesAclAction(salonID, "true"));
      dispatch(getProductAction(salonID, ""));
      dispatch(getSupplier(salonID));
    } else {
      console.log("All Active");
    }
  }, [activeTab]);
  return (
    <Nav className="nav-left" pills vertical>
      <NavItem>
        <NavLink active={activeTab === "1"} onClick={() => toggleTab("1")}>
          <Briefcase size={18} className="mr-1" />
          <span className="font-weight-bold">Products</span>
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink active={activeTab === "2"} onClick={() => toggleTab("2")}>
          <Bold size={18} className="mr-1" />
          <span className="font-weight-bold">Brands</span>
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink active={activeTab === "3"} onClick={() => toggleTab("3")}>
          <Bookmark size={18} className="mr-1" />
          <span className="font-weight-bold">Category</span>
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink active={activeTab === "4"} onClick={() => toggleTab("4")}>
          <Users size={18} className="mr-1" />
          <span className="font-weight-bold">Supplier</span>
        </NavLink>
        <NavLink active={activeTab === "5"} onClick={() => toggleTab("5")}>
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
