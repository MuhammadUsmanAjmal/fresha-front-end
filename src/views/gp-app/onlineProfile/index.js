import { Fragment, useState, useEffect } from "react";
import Tabs from "./Tabs";
import axios from "axios";
import InfoTabContent from "./InfoTabContent";
import Breadcrumbs from "@components/breadcrumbs";
// import SocialTabContent from "./SocialTabContent";
import GeneralTabContent from "./GeneralTabContent";
// import PasswordTabContent from "./PasswordTabContent";
// import NotificationsTabContent from './NotificationsTabContent'
import { Row, Col, TabContent, TabPane, Card, CardBody } from "reactstrap";
import Register from "./registrationForm";

import "@styles/react/libs/flatpickr/flatpickr.scss";
import "@styles/react/pages/page-account-settings.scss";
import { useSelector } from "react-redux";
import SpinnerFlex from "../../components/spinners/SpinnerFlex";
const AccountSettings = () => {
  const [activeTab, setActiveTab] = useState("1");
  const Booking = useSelector((state) => state.branchStatus);
  const { loading } = Booking;
  const branch = useSelector((state) => state.branchListing);
  const branchLoading = branch?.loading;
  // [activeForm, setActiveForm] = useState("1");
  // [data, setData] = useState(null);

  const toggleTab = (tab) => {
    setActiveTab(tab);
  };
  // const toggleRegForm = (tab) => {
  //   setActiveForm(tab);
  // };

  return (
    <Fragment>
      <Breadcrumbs
        breadCrumbTitle="Online Profile"
        breadCrumbParent="Pages"
        breadCrumbActive={
          activeTab === "1"
            ? "Marketplace Profile"
            : activeTab === "2"
            ? "Link Builder"
            : null
        }
      />
      <Row>
        <Col className="mb-2 mb-md-0" md="3">
          <Tabs activeTab={activeTab} toggleTab={toggleTab} />
        </Col>
        <Col md="9">
          <TabContent activeTab={activeTab}>
            {
              <TabPane tabId="1">
                <Card>
                  {branchLoading ? (
                    <SpinnerFlex />
                  ) : (
                    <CardBody>
                      <InfoTabContent />
                    </CardBody>
                  )}
                </Card>
              </TabPane>
            }
            {
              <TabPane tabId="2">
                <Card>
                  {loading ? (
                    <SpinnerFlex />
                  ) : (
                    <CardBody>
                      <GeneralTabContent activeTab={activeTab} />
                    </CardBody>
                  )}
                </Card>
              </TabPane>
            }
            {/* {activeForm === "2" && ( */}
            {/* <WizardHorizontal toggleRegForm={toggleRegForm} /> */}
            {/* )} */}
            {/* <TabPane tabId="3">
                    <InfoTabContent data={data.info} />
                  </TabPane> */}
            {/* <TabPane tabId="4">
                    <SocialTabContent data={data.social} />
                  </TabPane> */}
            {/* <TabPane tabId="5">
                    <NotificationsTabContent data={data.notification} />
                  </TabPane> */}
          </TabContent>
        </Col>
      </Row>
    </Fragment>
  );
};

export default AccountSettings;
