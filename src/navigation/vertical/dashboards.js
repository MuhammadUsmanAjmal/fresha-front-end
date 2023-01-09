import {
  Home,
  User,
  Settings,
  PieChart,
  Archive,
  Calendar,
  BarChart2,
  Gift,
  Users,
  Grid,
  Flag,
  Radio,
  List,
  Rss,
  Briefcase,
  Menu,
  RefreshCcw,
} from "react-feather";

// export default [
//   {
//     id: "home",
//     title: "Home",
//     icon: <Home size={20} />,
//     navLink: "/app",
//   },
//   {
//     id: "calender",
//     title: "Calendar",
//     icon: <Calendar size={20} />,
//     navLink: "/calendar",
//   },
//   {
//     id: "sales",
//     title: "Sales",
//     icon: <BarChart2 size={20} />,
//     navLink: "/sales",
//   },

//   {
//     id: "branches",
//     title: "Branches",
//     icon: <List size={20} />,
//     navLink: "/branches",
//   },

//   // {
//   //   id: 'vouchers',
//   //   title: 'Vouchers',
//   //   icon: <Gift size={20} />,
//   //    navLink: '/vouchers'
//   // },
//   // {
//   //   id: "Salons",
//   //   title: "Salons",
//   //   icon: <Users size={20} />,
//   //   navLink: "/salon",
//   // },
//   {
//     id: "categories",
//     title: "Categories",
//     icon: <Archive size={20} />,
//     navLink: "/categories",
//   },
//   // {
//   //   id: "services",
//   //   title: "Services",
//   //   icon: <Grid size={20} />,
//   //   navLink: "/services",
//   // },
//   {
//     id: "beauticians",
//     title: "Beauticians",
//     icon: <Users size={20} />,
//     navLink: "/staff",
//   },
//   {
//     id: "clients",
//     title: "Clients",
//     icon: <User size={20} />,
//     navLink: "/clients",
//   },
//   // {
//   //   id: 'inventory',
//   //   title: 'Inventory',
//   //   icon: <Archive size={20} />,
//   //    navLink: '/inventory'
//   // },
//   {
//     id: "report",
//     title: "Reports",
//     icon: <Flag size={20} />,
//     navLink: "/report",
//   },
//   {
//     id: "onlineProfile",
//     title: "Online Profile",
//     icon: <Radio size={20} />,
//     navLink: "/onlineprofile",
//   },
//   {
//     id: "setup",
//     title: "Setup",
//     icon: <Settings size={20} />,
//     navLink: "/setup",
//   },
// ];

export const superAdminDashboard = [
  // {
  //   id: "home",
  //   title: "Home",
  //   icon: <Home size={20} />,
  //   navLink: "/app",
  // },
  {
    id: "Salons",
    title: "Salons",
    icon: <List size={20} />,
    navLink: "/app",
  },

  {
    id: "subscriptions",
    title: "Subscriptions",
    icon: <Rss size={20} />,
    navLink: "/subscriptions",
  },
  {
    id: "salonSubscriptions",
    title: "SalonSubscriptions",
    icon: <RefreshCcw size={20} />,
    navLink: "/salonSubscriptions",
  },
];

export const branchAdminDashboard = [
  {
    id: "home",
    title: "Home",
    icon: <Home size={20} />,
    navLink: "/app",
  },
  {
    id: "calender",
    title: "Calendar",
    icon: <Calendar size={20} />,
    navLink: "/calendar",
  },
  {
    id: "sales",
    title: "Sales",
    icon: <BarChart2 size={20} />,
    navLink: "/sales",
  },
  {
    id: "categories",
    title: "Categories",
    icon: <Archive size={20} />,
    navLink: "/categories",
  },
  {
    id: "beauticians",
    title: "Beauticians",
    icon: <Users size={20} />,
    navLink: "/staff",
  },
  {
    id: "clients",
    title: "Clients",
    icon: <User size={20} />,
    navLink: "/clients",
  },
  {
    id: "products",
    title: "Products",
    icon: <Briefcase size={20} />,
    navLink: "/app/products",
  },
  {
    id: "report",
    title: "Reports",
    icon: <Flag size={20} />,
    navLink: "/report",
  },
  {
    id: "onlineProfile",
    title: "Online Profile",
    icon: <Radio size={20} />,
    navLink: "/onlineprofile",
  },
  {
    id: "setup",
    title: "Setup",
    icon: <Settings size={20} />,
    navLink: "/setup",
  },
];

export const salonAdminDashboard = [
  {
    id: "branch",
    title: "Branches",
    icon: <List size={20} />,
    navLink: "/app",
  },
  {
    id: "products",
    title: "Products",
    icon: <Briefcase size={20} />,
    navLink: "/app/products",
  },
  {
    id: "subscriptions",
    title: "Subscriptions",
    icon: <Rss size={20} />,
    navLink: "/subscriptions",
  },

  // {
  //   id: "sales",
  //   title: "Sales",
  //   icon: <BarChart2 size={20} />,
  //   navLink: "/sales",
  // },

  // {
  //   id: "branches",
  //   title: "Branches",
  //   icon: <List size={20} />,
  //   navLink: "/branches",
  // },
  // {
  //   id: "categories",
  //   title: "Categories",
  //   icon: <Archive size={20} />,
  //   navLink: "/categories",
  // },
  // {
  //   id: "beauticians",
  //   title: "Beauticians",
  //   icon: <Users size={20} />,
  //   navLink: "/staff",
  // },
  // {
  //   id: "clients",
  //   title: "Clients",
  //   icon: <User size={20} />,
  //   navLink: "/clients",
  // },
  // {
  //   id: "report",
  //   title: "Reports",
  //   icon: <Flag size={20} />,
  //   navLink: "/report",
  // },
  // {
  //   id: "onlineProfile",
  //   title: "Online Profile",
  //   icon: <Radio size={20} />,
  //   navLink: "/onlineprofile",
  // },
  // {
  //   id: "setup",
  //   title: "Setup",
  //   icon: <Settings size={20} />,
  //   navLink: "/setup",
  // },
];
