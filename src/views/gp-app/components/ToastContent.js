import { Fragment } from "react";
import { AlertTriangle, Check } from "react-feather";
import Avatar from "@components/avatar";
export const ToastContent = ({ error, success, SuccessLogin, name, role }) => (
  <Fragment>
    <>
      {error && (
        <div className="toastify-header">
          <div className="title-wrapper">
            <Avatar
              size="sm"
              color="danger"
              icon={<AlertTriangle size={12} />}
            />
            <h6 className="toast-title font-weight-bold"> {error}</h6>
          </div>
        </div>
      )}
      {success && (
        <div className="toastify-header">
          <div className="title-wrapper">
            <Avatar size="sm" color="success" icon={<Check size={12} />} />
            <h6 className="toast-title font-weight-bold"> {success}</h6>
          </div>
        </div>
      )}
      {SuccessLogin && (
        <>
          <div className="toastify-header">
            <div className="title-wrapper">
              <Avatar size="sm" color="success" icon={<Check size={12} />} />
              <h6 className="toast-title font-weight-bold">Welcome, {name}</h6>
            </div>
          </div>
          <div className="toastify-body">
            <span>
              You have successfully logged in as an {role} to GharPar. Now you
              can start to explore. Enjoy!
            </span>
          </div>
        </>
      )}
    </>
  </Fragment>
);
