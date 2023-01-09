import { useContext, useState, useEffect, Fragment } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";

import { Row, Col, TabContent, TabPane, Card, CardBody } from "reactstrap";
import Tabs from "./Tabs";
import DailySales from "./DailySales";
import NewSales from "./NewSale";
import Appointments from "./appointments/Appointments";
import { getAllSalesAction } from "../../../../redux/actions/appoinmentAction";
import { useDispatch, useSelector } from "react-redux";
import SpinnerFlex from "../../../components/spinners/SpinnerFlex";
import SalesHistory from "./salesHistory/SalesHistory";

const Sale = () => {
  const dispatch = useDispatch();
  const Location = useLocation();
  const { branchId, salonId } = useParams();

  const [activeTab, setActiveTab] = useState(() => {
    if (Location.pathname.split("/")[2] === "appointments") {
      return "3";
    } else if (Location.pathname.split("/")[2] === "saleshistory") {
      return "4";
    } else {
      return "1";
    }
  });
  const Sales = useSelector((state) => state.AllSalesOrder);
  const { loading } = Sales;
  const TotalSales = Sales?.AllSales?.data;

  useEffect(() => {
    // const body = { status: "New" };
    dispatch(getAllSalesAction(branchId, "New"));
  }, []);
  const toggleTab = (tab) => {
    setActiveTab(tab);
  };

  return (
    <Row>
      {/* <Row lg="4" xs="6"> */}
      <Col lg="3">
        <Tabs activeTab={activeTab} toggleTab={toggleTab} />
      </Col>
      {/* </Row> */}
      <Col md="9">
        <Card>
          <CardBody>
            <TabContent activeTab={activeTab}>
              <TabPane tabId="1">
                {loading ? (
                  <SpinnerFlex />
                ) : (
                  <NewSales TotalSales={TotalSales} />
                )}
              </TabPane>
              <TabPane tabId="2">
                <DailySales />
              </TabPane>
              <TabPane tabId="3">
                <Appointments toggleTab={toggleTab} />
              </TabPane>
              <TabPane tabId="4">
                <SalesHistory />
              </TabPane>
            </TabContent>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default Sale;
