import { useContext, useEffect } from "react";
import { Row, Col } from "reactstrap";
import { ThemeColors } from "@src/utility/context/ThemeColors";

import AppointmentGraph from "./AppointmentGraph";
import SalesGraph from "./SalesGraph";
import BeauticianCard from "./BeauticianCard";
import ServicesDetail from "./Services";
import { useSkin } from "@hooks/useSkin";

import "@styles/react/libs/charts/apex-charts.scss";
import "@styles/base/pages/dashboard-ecommerce.scss";
import { getAppointmentGraphAction } from "../../../redux/actions/appointmentGraphAction";
import { useDispatch } from "react-redux";
import { getSalesGraphAction } from "../../../redux/actions/salesGraphAction";
import { topStaffAction } from "../../../redux/actions/staffActions";
import { topServicesAction } from "../../../redux/actions/servicesActions";

const EcommerceDashboard = () => {
  const dispatch = useDispatch();

  const { colors } = useContext(ThemeColors),
    [skin, setSkin] = useSkin(),
    trackBgColor = "#e9ecef",
    labelColor = skin === "dark" ? "#b4b7bd" : "#6e6b7b",
    tooltipShadow = "rgba(0, 0, 0, 0.25)",
    gridLineColor = "rgba(200, 200, 200, 0.2)";
  const Branch = JSON.parse(localStorage.getItem("userData"));
  const BranchId = Branch?.data?.branchId;
  useEffect(() => {
    dispatch(getAppointmentGraphAction(BranchId, "New"));
    dispatch(getSalesGraphAction(BranchId, "Completed"));
    dispatch(topStaffAction(BranchId));
    dispatch(topServicesAction(BranchId));
  }, []);

  return (
    <div id="dashboard-ecommerce">
      <Row className="match-height">
        <Col lg="6" xs="12" md="12" xl="6" sm="12">
          <SalesGraph primary={colors.primary.main} />
        </Col>

        <Col lg="6" xs="12" md="12" xl="6" sm="12">
          <AppointmentGraph
            labelColor={labelColor}
            tooltipShadow={tooltipShadow}
            gridLineColor={gridLineColor}
          />
        </Col>
      </Row>

      <Row className="match-height">
        <Col lg="6" xs="12" md="12" xl="6" sm="12">
          <ServicesDetail />
        </Col>
        <Col lg="6" xs="12" md="12" xl="6" sm="12">
          <BeauticianCard />
        </Col>
      </Row>
    </div>
  );
};

export default EcommerceDashboard;
