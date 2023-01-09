// ** Routes Imports
import AppRoutes from "./Apps";
import FormRoutes from "./Forms";
import PagesRoutes from "./Pages";
import TablesRoutes from "./Tables";
import ChartMapsRoutes from "./ChartsMaps";
import {
  DashboardSuperAdmin,
  branchAdminDashboard,
  salonAdminDashboard,
} from "./Dashboards";
import UiElementRoutes from "./UiElements";
import ExtensionsRoutes from "./Extensions";
import PageLayoutsRoutes from "./PageLayouts";

// ** Document title
const TemplateTitle = "BeautySAAS";

// ** Default Route
const DefaultRoute = "/app";

// ** Merge Routes
// const Routes = [
//   ...DashboardRoutes,
//   ...AppRoutes,
//   ...PagesRoutes,
//   // ...UiElementRoutes,
//   // ...ExtensionsRoutes,
//   // ...PageLayoutsRoutes,
//   // ...FormRoutes,
//   // ...TablesRoutes,
//   // ...ChartMapsRoutes,
// ];

// ...UiElementRoutes,
// ...ExtensionsRoutes,
// ...PageLayoutsRoutes,
// ...FormRoutes,
// ...TablesRoutes,
// ...ChartMapsRoutes,

const currentRole = JSON.parse(localStorage.getItem("userData"));

let Routes = [];

if (currentRole?.data?.role === "SalonAdmin") {
  Routes = [
    ...salonAdminDashboard,
    ...AppRoutes,
    ...PagesRoutes,
    // ...UiElementRoutes,
    // ...ExtensionsRoutes,
    // ...PageLayoutsRoutes,
    // ...FormRoutes,
    // ...TablesRoutes,
    // ...ChartMapsRoutes,
  ];
} else if (currentRole?.data?.role === "BranchAdmin") {
  Routes = [
    ...branchAdminDashboard,
    ...AppRoutes,
    ...PagesRoutes,
    // ...UiElementRoutes,
    // ...ExtensionsRoutes,
    // ...PageLayoutsRoutes,
    // ...FormRoutes,
    // ...TablesRoutes,
    // ...ChartMapsRoutes,
  ];
} else if (currentRole?.data?.role === "SuperAdmin") {
  Routes = [...DashboardSuperAdmin, ...AppRoutes, ...PagesRoutes];
} else {
  Routes = [...PagesRoutes];
}

export { DefaultRoute, TemplateTitle, Routes };
