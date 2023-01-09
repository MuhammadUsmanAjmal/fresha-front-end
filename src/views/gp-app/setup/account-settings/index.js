import { Fragment, useState, useEffect } from "react";
import Tabs from "./Tabs";
import axios from "axios";
import InfoTabContent from "./InfoTabContent";
import Breadcrumbs from "@components/breadcrumbs";
import SocialTabContent from "./SocialTabContent";
import GeneralTabContent from "./GeneralTabContent";
import PasswordTabContent from "./PasswordTabContent";
import NotificationsTabContent from "./NotificationsTabContent";
import { Row, Col, TabContent, TabPane, Card, CardBody } from "reactstrap";
import "@styles/react/libs/flatpickr/flatpickr.scss";
import "@styles/react/pages/page-account-settings.scss";
import { useDispatch, useSelector } from "react-redux";
import { getProfileAction } from "../../../../redux/actions/userActions";
const AccountSettings = () => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("1");
  const Profile = useSelector((state) => state.profileInfo);
  const InfoUser = Profile?.profile?.data;
  const toggleTab = (tab) => {
    setActiveTab(tab);
  };

  const Data = JSON.parse(localStorage.getItem("userData"));
  const UserId = Data?.data?.id;
  useEffect(() => {
    dispatch(getProfileAction(UserId));
  }, []);

  return (
    <Fragment>
      <Breadcrumbs
        breadCrumbTitle="Account Settings"
        breadCrumbParent="Pages"
        breadCrumbActive="Account Settings"
      />
      {InfoUser !== null ? (
        <Row>
          <Col className="mb-2 mb-md-0" md="3">
            <Tabs activeTab={activeTab} toggleTab={toggleTab} />
          </Col>
          <Col md="9">
            <Card>
              <CardBody>
                <TabContent activeTab={activeTab}>
                  <TabPane tabId="1">
                    <GeneralTabContent data={InfoUser} />
                  </TabPane>
                  <TabPane tabId="2">
                    <PasswordTabContent />
                  </TabPane>
                  <TabPane tabId="3">
                    <InfoTabContent data={InfoUser} />
                  </TabPane>
                  {/* <TabPane tabId="4">
                    <SocialTabContent data={data.social} />
                  </TabPane>
                  <TabPane tabId="5">
                    <NotificationsTabContent data={data.notification} />
                  </TabPane> */}
                </TabContent>
              </CardBody>
            </Card>
          </Col>
        </Row>
      ) : null}
    </Fragment>
  );
};

export default AccountSettings;
