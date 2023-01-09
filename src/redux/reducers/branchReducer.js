import {
  BRANCHES_LIST_GET_REQUEST,
  BRANCHES_LIST_GET_SUCCESS,
  BRANCHES_LIST_GET_FAIL,
  BRANCH_ACTIVE_GET_REQUEST,
  BRANCH_ACTIVE_GET_FAIL,
  BRANCH_ACTIVE_GET_SUCCESS,
  BRANCH_CREATE_REQUEST,
  BRANCH_CREATE_SUCCESS,
  BRANCH_CREATE_FAIL,
  BRANCH_CREATE_RESET,
  BRANCHES_ACL_GET_SUCCESS,
  BRANCHES_ACL_GET_REQUEST,
  BRANCHES_ACL_GET_FAIL,
  BRANCH_IMAGE_REQUEST,
  BRANCH_IMAGE_SUCCESS,
  BRANCH_IMAGE_FAIL,
  BRANCH_IMAGE_RESET,
} from "../constants/branchConstants";

export const getBranchReducer = (state = {}, action) => {
  switch (action.type) {
    case BRANCHES_LIST_GET_REQUEST:
      return { loading: true };
    case BRANCHES_LIST_GET_SUCCESS:
      return { loading: false, branches: action.payload };
    case BRANCHES_LIST_GET_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getBranchStatusReducer = (state = {}, action) => {
  switch (action.type) {
    case BRANCH_ACTIVE_GET_REQUEST:
      return { loading: true };
    case BRANCH_ACTIVE_GET_SUCCESS:
      return { loading: false, branchActive: action.payload };
    case BRANCH_ACTIVE_GET_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getBranchAclReducer = (state = {}, action) => {
  switch (action.type) {
    case BRANCHES_ACL_GET_REQUEST:
      return { loading: true };
    case BRANCHES_ACL_GET_SUCCESS:
      return { loading: false, branches: action.payload };
    case BRANCHES_ACL_GET_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const createBranchReducer = (state = {}, action) => {
  switch (action.type) {
    case BRANCH_CREATE_REQUEST:
      return { loading: true };
    case BRANCH_CREATE_SUCCESS:
      return { loading: false, createBranchDetail: action.payload };
    case BRANCH_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case BRANCH_CREATE_RESET:
      return { loading: false, error: false, success: false };
    default:
      return state;
  }
};

export const addBranchImageReducer = (state = {}, action) => {
  switch (action.type) {
    case BRANCH_IMAGE_REQUEST:
      return { loading: true };
    case BRANCH_IMAGE_SUCCESS:
      return { loading: false, ImageUrl: action.payload };
    case BRANCH_IMAGE_FAIL:
      return { loading: false, error: action.payload };
    case BRANCH_IMAGE_RESET:
      return { loading: false, error: false, success: false };
    default:
      return state;
  }
};
