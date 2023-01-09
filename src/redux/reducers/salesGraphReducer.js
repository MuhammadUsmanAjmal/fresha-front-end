import {
  SALES_GRAPH_REQUEST,
  SALES_GRAPH_SUCCESS,
  SALES_GRAPH_FAILURE,
} from "../constants/salesGraphConstants";

export const salesGraphReducer = (state = {}, action) => {
  switch (action.type) {
    case SALES_GRAPH_REQUEST:
      return { loading: true };
    case SALES_GRAPH_SUCCESS:
      return { loading: false, SalesGraphDetails: action.payload };
    case SALES_GRAPH_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
