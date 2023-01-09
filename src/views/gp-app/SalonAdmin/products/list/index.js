/////////////////////// Tabs index /////////////////////////////////

import { Fragment, useState, useEffect } from "react";
import Tabs from "./Tabs";
import axios from "axios";
import TableProducts from "./productsListing/TableProducts";
import TableBrands from "./brandListing/TableBrands";
import TableCategory from "./categoryListing/TableCategory";
import TableSupplier from "./SupplierListing/TableSupplier";
import TableInventory from "./stockOrder/TableInventory";
// import InfoTabContent from "./InfoTabContent";
import Breadcrumbs from "@components/breadcrumbs";
// import SocialTabContent from "./SocialTabContent";
// import GeneralTabContent from "./GeneralTabContent";
// import PasswordTabContent from "./PasswordTabContent";
// import NotificationsTabContent from './NotificationsTabContent'
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
        breadCrumbActive={
          activeTab === "1"
            ? "Products"
            : activeTab === "2"
            ? "Brands"
            : activeTab === "3"
            ? "Categories"
            : activeTab === "4"
            ? "Suppliers"
            : activeTab === "5"
            ? "Inventory"
            : null
        }
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
                    <TableProducts />
                  </TabPane>
                  <TabPane tabId="2">
                    <TableBrands />
                  </TabPane>
                  <TabPane tabId="3">
                    <TableCategory />
                  </TabPane>
                  <TabPane tabId="4">
                    <TableSupplier />
                  </TabPane>
                  <TabPane tabId="5">
                    <TableInventory />
                  </TabPane>
                  {/* <TabPane tabId="5">
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
