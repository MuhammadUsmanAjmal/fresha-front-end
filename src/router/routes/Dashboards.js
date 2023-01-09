import { lazy } from "react";

export const DashboardSuperAdmin = [
  // Dashboards
  // {
  //   path: "/app",
  //   component: lazy(() => import("../../views/gp-app/dashboard")),
  //   exact: true,
  // },
  {
    path: "/app",
    component: lazy(() =>
      import("../../views/gp-app/SuperAdmin/Salons/index.js")
    ),
    exact: true,
  },
  {
    path: "/app/:salonId/branches",
    component: lazy(() => import("../../views/gp-app/SuperAdmin/branches")),
    exact: true,
  },

  // {
  //   path: "/app/:salonId/branches/:branchId/home",
  //   component: lazy(() => import("../../views/gp-app/SuperAdmin/dashboard")),
  //   exact: true,
  // },
  // {
  //   path: "/app/:salonId/branches/:branchId/calendar",
  //   component: lazy(() => import("../../views/gp-app/SuperAdmin/calendar")),
  //   exact: true,
  // },
  {
    path: "/app/:salonId/branches/:branchId/sales/:page?",
    component: lazy(() => import("../../views/gp-app/SuperAdmin/sales")),
    exact: true,
  },
  {
    path: "/app/:salonId/branches/:branchId/categories",
    component: lazy(() => import("../../views/gp-app/SuperAdmin/categories")),
    exact: true,
  },
  {
    path: "/app/:salonId/branches/:branchId/beautician",
    component: lazy(() => import("../../views/gp-app/SuperAdmin/Beautician")),
    exact: true,
  },
  {
    path: "/app/:salonId/branches/:branchId/clients",
    component: lazy(() => import("../../views/gp-app/SuperAdmin/clients")),
    exact: true,
  },
  {
    path: "/subscriptions",
    component: lazy(() =>
      import("../../views/gp-app/SuperAdmin/subscriptions")
    ),
    exact: true,
  },
  {
    path: "/salonSubscriptions",
    component: lazy(() =>
      import("../../views/gp-app/SuperAdmin/Salons Subscriptions")
    ),
    exact: true,
  },
  // // {
  // //   path: "/vouchers",
  // //   component: lazy(() => import("../../views/gp-app/voucher")),
  // //   exact: true,
  // // },

  // {
  //   path: "/clients",
  //   component: lazy(() => import("../../views/gp-app/clients")),
  //   exact: true,
  // },
  // {
  //   path: "/staff",
  //   component: lazy(() => import("../../views/gp-app/staff")),
  //   exact: true,
  // },
  // // {
  // //   path: '/services',
  // //   component: lazy(() => import('../../views/gp-app/services')),
  // //   exact: true
  // // },
  // // {
  // //   path: "/inventory",
  // //   component: lazy(() => import("../../views/gp-app/inventory")),
  // //   exact: true,
  // // },
  // {
  //   path: "/report",
  //   component: lazy(() => import("../../views/gp-app/report/reports")),
  //   exact: true,
  // },

  // {
  //   path: "/onlineprofile",
  //   component: lazy(() => import("../../views/gp-app/onlineProfile")),
  //   exact: true,
  // },
  // {
  //   path: "/setup",
  //   component: lazy(() => import("../../views/gp-app/setup/account-settings")),
  //   exact: true,
  // },
  // {
  //   path: "/categories",
  //   component: lazy(() => import("../../views/gp-app/categories/index")),
  //   exact: true,
  // },
];

export const branchAdminDashboard = [
  // Dashboards
  {
    path: "/app",
    component: lazy(() => import("../../views/gp-app/dashboard")),
    exact: true,
  },
  // {
  //   path: "/salon",
  //   component: lazy(() => import("../../views/gp-app/branches/index")),
  //   exact: true,
  // },
  {
    path: "/calendar",
    component: lazy(() => import("../../views/gp-app/calendar")),
    exact: true,
  },
  {
    path: "/sales/:page?",
    component: lazy(() => import("../../views/gp-app/sales")),
    exact: true,
  },
  // {
  //   path: "/vouchers",
  //   component: lazy(() => import("../../views/gp-app/voucher")),
  //   exact: true,
  // },

  // {
  //   path: "/branches",
  //   component: lazy(() => import("../../views/gp-app/multiBranches")),
  //   exact: true,
  // },
  {
    path: "/clients",
    component: lazy(() => import("../../views/gp-app/clients")),
    exact: true,
  },
  {
    path: "/staff",
    component: lazy(() => import("../../views/gp-app/staff")),
    exact: true,
  },
  // {
  //   path: '/services',
  //   component: lazy(() => import('../../views/gp-app/services')),
  //   exact: true
  // },
  // {
  //   path: "/inventory",
  //   component: lazy(() => import("../../views/gp-app/inventory")),
  //   exact: true,
  // },
  {
    path: "/report",
    component: lazy(() => import("../../views/gp-app/report/reports")),
    exact: true,
  },
  {
    path: "/app/products",
    component: lazy(() => import("../../views/gp-app/products")),
    exact: true,
  },

  {
    path: "/onlineprofile",
    component: lazy(() => import("../../views/gp-app/onlineProfile")),
    exact: true,
  },
  {
    path: "/setup",
    component: lazy(() => import("../../views/gp-app/setup/account-settings")),
    exact: true,
  },
  {
    path: "/categories",
    component: lazy(() => import("../../views/gp-app/categories/index")),
    exact: true,
  },
];

export const salonAdminDashboard = [
  // Dashboards
  {
    path: "/app",
    component: lazy(() => import("../../views/gp-app/SalonAdmin/branches")),
    exact: true,
  },
  {
    path: "/app/products",
    component: lazy(() => import("../../views/gp-app/SalonAdmin/products")),
    exact: true,
  },
  // {
  //   path: "/app/:salonId/branches/:branchId/home",
  //   component: lazy(() => import("../../views/gp-app/SuperAdmin/dashboard")),
  //   exact: true,
  // },
  // {
  //   path: "/app/:salonId/branches/:branchId/calendar",
  //   component: lazy(() => import("../../views/gp-app/SuperAdmin/calendar")),
  //   exact: true,
  // },
  {
    path: "/app/:salonId/branches/:branchId/sales/:page?",
    component: lazy(() => import("../../views/gp-app/SalonAdmin/sales")),
    exact: true,
  },
  {
    path: "/app/:salonId/branches/:branchId/categories",
    component: lazy(() => import("../../views/gp-app/SalonAdmin/categories")),
    exact: true,
  },
  {
    path: "/app/:salonId/branches/:branchId/beautician",
    component: lazy(() => import("../../views/gp-app/SalonAdmin/Beautician")),
    exact: true,
  },
  {
    path: "/app/:salonId/branches/:branchId/clients",
    component: lazy(() => import("../../views/gp-app/SalonAdmin/clients")),
    exact: true,
  },
  {
    path: "/subscriptions",
    component: lazy(() =>
      import("../../views/gp-app/SalonAdmin/subscriptions")
    ),
    exact: true,
  },
  // {
  //   path: "/salon",
  //   component: lazy(() => import("../../views/gp-app/branches/index")),
  //   exact: true,
  // },
  // {
  //   path: "/calendar",
  //   component: lazy(() => import("../../views/gp-app/calendar")),
  //   exact: true,
  // },
  // {
  //   path: "/sales/:page?",
  //   component: lazy(() => import("../../views/gp-app/sales")),
  //   exact: true,
  // },
  // {
  //   path: "/vouchers",
  //   component: lazy(() => import("../../views/gp-app/voucher")),
  //   exact: true,
  // },

  // {
  //   path: "/branches",
  //   component: lazy(() => import("../../views/gp-app/multiBranches")),
  //   exact: true,
  // },
  // {
  //   path: "/clients",
  //   component: lazy(() => import("../../views/gp-app/clients")),
  //   exact: true,
  // },
  // {
  //   path: "/staff",
  //   component: lazy(() => import("../../views/gp-app/staff")),
  //   exact: true,
  // },
  // {
  //   path: '/services',
  //   component: lazy(() => import('../../views/gp-app/services')),
  //   exact: true
  // },
  // {
  //   path: "/inventory",
  //   component: lazy(() => import("../../views/gp-app/inventory")),
  //   exact: true,
  // },
  // {
  //   path: "/report",
  //   component: lazy(() => import("../../views/gp-app/report/reports")),
  //   exact: true,
  // },

  // {
  //   path: "/onlineprofile",
  //   component: lazy(() => import("../../views/gp-app/onlineProfile")),
  //   exact: true,
  // },
  // {
  //   path: "/setup",
  //   component: lazy(() => import("../../views/gp-app/setup/account-settings")),
  //   exact: true,
  // },
  // {
  //   path: "/categories",
  //   component: lazy(() => import("../../views/gp-app/categories/index")),
  //   exact: true,
  // },
];
