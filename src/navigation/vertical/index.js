// ** Navigation sections imports
import apps from "./dashboard-plus";
import pages from "./pages";
import forms from "./forms";
import tables from "./tables";
import others from "./others";
import {
  salonAdminDashboard,
  superAdminDashboard,
  branchAdminDashboard,
} from "./dashboards";
import uiElements from "./ui-elements";
import chartsAndMaps from "./charts-maps";

//dummy
// , ...apps, ...pages, ...uiElements, ...forms, ...tables, ...chartsAndMaps, ...others

// ** Merge & Export
// export default [...dashboards, ...apps];

const currentRole = JSON.parse(localStorage.getItem("userData"));

let dashboard = [];

if (currentRole?.data?.role === "SalonAdmin") {
  dashboard = [...salonAdminDashboard];
} else if (currentRole?.data?.role === "BranchAdmin") {
  dashboard = [...branchAdminDashboard];
} else if (currentRole?.data?.role === "SuperAdmin") {
  dashboard = [...superAdminDashboard];
}
export default [...dashboard];
