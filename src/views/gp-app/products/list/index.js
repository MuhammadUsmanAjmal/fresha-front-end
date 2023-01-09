/////////////////////// Tabs index /////////////////////////////////

import { Fragment, useState, useEffect } from "react";
import Tabs from "./Tabs";
import axios from "axios";

import TableInventory from "./stockOrder/TableInventory";
import Breadcrumbs from "@components/breadcrumbs";

import { Row, Col, TabContent, TabPane, Card, CardBody } from "reactstrap";

import "@styles/react/libs/flatpickr/flatpickr.scss";
import "@styles/react/pages/page-account-settings.scss";

const AccountSettings = () => {
  const [activeTab, setActiveTab] = useState("1"),
    [data, setData] = useState(null);

  const toggleTab = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    axios
      .get("/account-setting/data")
      .then((response) => setData(response.data));
  }, []);

  return (
    <Fragment>
      <Breadcrumbs
        breadCrumbTitle="Products"
        breadCrumbParent="Pages"
        breadCrumbActive={activeTab === "1" ? "Products" : null}
      />
      {data !== null ? (
        <Row>
          <Col className="mb-2 mb-md-0" md="3">
            <Tabs activeTab={activeTab} toggleTab={toggleTab} />
          </Col>
          <Col md="9">
            <Card>
              <CardBody>
                <TabContent activeTab={activeTab}>
                  <TabPane tabId="1">
                    <TableInventory />
                  </TabPane>
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
