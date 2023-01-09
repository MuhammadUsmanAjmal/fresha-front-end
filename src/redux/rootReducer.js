// ** Redux Imports
import { combineReducers } from "redux";

// ** Reducers Imports
import {
  LoginReducer,
  SignupReducer,
  forgotPasswordReducer,
  verifyOtpReducer,
  changePasswordReducer,
  userProfileReducer,
  profileUpdateReducer,
  passwordUpdateReducer,
} from "../redux/reducers/userReducer";
// import {SaloonSignupReducer,BranchSignupReducer} from "../redux/reducers/saloonReducer"
import {
  addCategoryReducer,
  getCategoryReducer,
  updateCatReducer,
  updateToggleReducer,
} from "./reducers/categoryReducer";
import {
  addServicesReducer,
  getServicesReducer,
  updateServiceReducer,
  searchServiceReducer,
  serviceToggleReducer,
  topServicesReducer,
} from "./reducers/serviceReducer";
import {
  addStaffReducer,
  getStaffReducer,
  getStaffWorkReducer,
  updateStaffReducer,
  updateHoursReducer,
  searchStaffReducer,
  staffToggleReducer,
  addStaffImageReducer,
  topStaffReducer,
} from "./reducers/staffReducer";
import {
  addClientsReducer,
  getClientsReducer,
  updateClientsReducer,
  searchClientsReducer,
  clientToggleReducer,
} from "./reducers/clientsReducer";
import {
  createOnlineBookingReducer,
  getOnlineBookingReducer,
} from "./reducers/onlineBookingReducer";
import navbar from "./reducers/navbar";
import layout from "./reducers/layout";
import chat from "@src/views/apps/chat/store/reducer";
import todo from "@src/views/apps/todo/store/reducer";
import users from "@src/views/apps/user/store/reducer";
import email from "@src/views/apps/email/store/reducer";
import invoice from "@src/views/apps/invoice/store/reducer";
import calendar from "@src/views/apps/calendar/store/reducer";
// import ecommerce from '@src/views/apps/ecommerce/store/reducer'
import dataTables from "@src/views/tables/data-tables/store/reducer";
import {
  addAppointmentReducer,
  AllSalesReducer,
  getAppointmentReducer,
  getOrderReducer,
} from "./reducers/appointmentReducer";
import { paymentModeReducer } from "./reducers/paymentSelectReducer";
import { orderUpdateReducer } from "./reducers/orderUpdateReducer";
// import { salesTableReducer } from "./reducers/salesReducer";
import { getSalonReducer } from "./reducers/saloonReducer";
import {
  salesTableReducer,
  salesHistoryReducer,
  appointmentHistoryReducer,
} from "./reducers/salesReducer";
import {
  addBranchImageReducer,
  createBranchReducer,
  getBranchAclReducer,
  getBranchReducer,
  getBranchStatusReducer,
} from "./reducers/branchReducer";

import {
  addSubscriptionReducer,
  getSubscriptionReducer,
  updateSubscriptionReducer,
  searchSubscriptionReducer,
  getSalonSubscriptionListReducer,
  addSalonSubscriptionReducer,
  toggleSubscriptionReducer,
} from "./reducers/subscriptionReducer";

import { salesGraphReducer } from "./reducers/salesGraphReducer";
import { appointmentGraphReducer } from "./reducers/appointmentGraphReducer";

import {
  addSupplierReducer,
  getSupplierReducer,
  updateSupplierReducer,
} from "./reducers/supplierReducer";

import {
  addBrandReducer,
  getBrandReducer,
  updateBrandReducer,
} from "./reducers/brandReducer";

import {
  addProdCatReducer,
  getProdCatReducer,
  updateProdCatReducer,
} from "./reducers/prodCategoryReducer";

import {
  addProductReducer,
  getProductReducer,
  updateProductReducer,
  addProductImageReducer,
} from "./reducers/productReducer";

import {
  addStockOrderReducer,
  getStockOrderReducer,
  updateStockOrderReducer,
} from "./reducers/stockOrderReducer";

const rootReducer = combineReducers({
  Login: LoginReducer,
  Signup: SignupReducer,
  Forget: forgotPasswordReducer,
  otp: verifyOtpReducer,
  changePassword: changePasswordReducer,
  profileInfo: userProfileReducer,
  updateProfileInfo: profileUpdateReducer,
  passwordUpdate: passwordUpdateReducer,
  salonDetail: getSalonReducer,

  createBranch: createBranchReducer,
  branchListing: getBranchReducer,
  branchStatus: getBranchStatusReducer,
  branchesDetail: getBranchAclReducer,
  branchImage: addBranchImageReducer,

  addCategory: addCategoryReducer,
  getCategory: getCategoryReducer,
  updateCategory: updateCatReducer,
  updateToggle: updateToggleReducer,

  addServices: addServicesReducer,
  getServices: getServicesReducer,
  getWorkStaff: getStaffWorkReducer,
  updateService: updateServiceReducer,
  serviceToggle: serviceToggleReducer,
  searchService: searchServiceReducer,
  topService: topServicesReducer,

  addStaff: addStaffReducer,
  getStaff: getStaffReducer,
  updateStaff: updateStaffReducer,
  staffToggle: staffToggleReducer,
  searchStaff: searchStaffReducer,
  updateHours: updateHoursReducer,
  addStaffImage: addStaffImageReducer,
  topStaff: topStaffReducer,

  addClient: addClientsReducer,
  getClient: getClientsReducer,
  updateClient: updateClientsReducer,
  clientToggle: clientToggleReducer,
  searchClient: searchClientsReducer,

  addAppointment: addAppointmentReducer,
  getAppointment: getAppointmentReducer,
  getOrderJobs: getOrderReducer,
  updateOrder: orderUpdateReducer,
  AllSalesOrder: AllSalesReducer,

  PaymentMethod: paymentModeReducer,

  SalesOrder: salesTableReducer,
  salesHistory: salesHistoryReducer,
  appointmentHistory: appointmentHistoryReducer,

  onlineBooking: getOnlineBookingReducer,
  createBooking: createOnlineBookingReducer,

  salesGraph: salesGraphReducer,
  appointmentGraph: appointmentGraphReducer,

  addSubscription: addSubscriptionReducer,
  getSubscription: getSubscriptionReducer,
  updateSubscription: updateSubscriptionReducer,
  addSalonSubscription: addSalonSubscriptionReducer,
  getSalonSubscriptionList: getSalonSubscriptionListReducer,
  subscriptionToggle: toggleSubscriptionReducer,
  // searchSubscription: searchSubscriptionReducer,

  addSupplier: addSupplierReducer,
  getSupplier: getSupplierReducer,
  updateSupplier: updateSupplierReducer,

  addBrand: addBrandReducer,
  getBrand: getBrandReducer,
  updateBrand: updateBrandReducer,

  addProdCategory: addProdCatReducer,
  getProdCategory: getProdCatReducer,
  updateProdCategory: updateProdCatReducer,

  addProduct: addProductReducer,
  getProduct: getProductReducer,
  updateProduct: updateProductReducer,
  addProductImage: addProductImageReducer,

  addStockOrder: addStockOrderReducer,
  getStockOrder: getStockOrderReducer,
  updateStockOrder: updateStockOrderReducer,

  todo,
  chat,
  email,
  users,
  navbar,
  layout,
  invoice,
  calendar,
  // ecommerce,
  dataTables,
});

export default rootReducer;
