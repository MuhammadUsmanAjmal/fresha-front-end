// ** React Imports
import { Link } from "react-router-dom";

// ** Third Party Components
import Proptypes from "prop-types";
import {
  Grid,
  CheckSquare,
  MessageSquare,
  Mail,
  Calendar,
} from "react-feather";
import {
  Breadcrumb,
  BreadcrumbItem,
  UncontrolledButtonDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  Col,
} from "reactstrap";

const BreadCrumbs = (props) => {
  // ** Props
  const {
    breadCrumbTitle,
    breadCrumbParent,
    breadCrumbParent2,
    breadCrumbParent3,
    breadCrumbParent4,
    breadCrumbActive,
    Detail,
    BranchId,
    SalonId,
  } = props;

  return (
    <Col className="content-header row" lg="12">
      <Breadcrumb>
        <BreadcrumbItem tag="li">
          <Link to="/">Branches</Link>
        </BreadcrumbItem>
        {/* <BreadcrumbItem tag="li" className="text-warning">
                  {breadCrumbParent}
                </BreadcrumbItem> */}
        {/* {breadCrumbParent2 ? (
          <BreadcrumbItem tag="li" className="text-warning">
            <Link
              to={{
                pathname: `/app/${SalonId}/branches`,
                state: Detail,
              }}
            >
              {breadCrumbParent2}
            </Link>
          </BreadcrumbItem>
        ) : (
          ""
        )} */}
        {breadCrumbParent3 ? (
          <BreadcrumbItem tag="li" className="text-warning">
            <Link
              to={{
                pathname: `/app`,
                state: Detail,
              }}
            >
              {breadCrumbParent3}
            </Link>
          </BreadcrumbItem>
        ) : (
          ""
        )}
        {breadCrumbParent4 ? (
          <BreadcrumbItem tag="li" className="text-warning">
            {breadCrumbParent4}
          </BreadcrumbItem>
        ) : (
          ""
        )}
        <BreadcrumbItem tag="li" active>
          {breadCrumbActive}
        </BreadcrumbItem>
      </Breadcrumb>
    </Col>
  );
};
export default BreadCrumbs;

// ** PropTypes
BreadCrumbs.propTypes = {
  breadCrumbTitle: Proptypes.string.isRequired,
  breadCrumbActive: Proptypes.string.isRequired,
};
