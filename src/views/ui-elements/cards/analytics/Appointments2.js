import Chart from "react-apexcharts";
import { Settings } from "react-feather";
import { Card, CardHeader, CardTitle, CardBody, CardText } from "reactstrap";
import { Fragment, useState, useEffect } from "react";

import { getAppointmentGraphAction } from "../../../../redux/actions/appointmentGraphAction";
import { useDispatch, useSelector } from "react-redux";

const Appointment2 = (props) => {
  const dispatch = useDispatch();
  const [appointmentGraph, setAppointmentGraph] = useState([]);
  const getAppointmentGraph = useSelector((state) => state.appointmentGraph);
  // const { loading } = getAppointmentGraph;

  const appointmentGraphStore =
    getAppointmentGraph?.appointmentGraphDetails?.data;
  const Branch = JSON.parse(localStorage.getItem("userData"));


  // console.log("complete data", appointmentGraphStore);
  useEffect(() => {
    // debugger;
    dispatch(getAppointmentGraphAction(Branch?.data?.branchId, "New"));
  }, []);

  let appointmentData = [];

  // console.log("data in appointment graph", appointmentGraph);

  const count = 12;

  for (let i = 0; i < count; i++) {
    appointmentData.push(0);
  }

  for (let i = 0; i < appointmentGraphStore?.length; i++) {
    appointmentData[appointmentGraphStore[i]?.dateDetails.month - 1] =
      appointmentGraphStore[i]?.count
        ? appointmentGraphStore[i]?.count
        : 0;
  }

  // console.log("final data in appointment ", appointmentData);

  const options = {
      chart: {
        toolbar: { show: false },
        zoom: { enabled: false },
        type: "line",
        dropShadow: {
          enabled: true,
          top: 18,
          left: 2,
          blur: 5,
          opacity: 0.2,
        },
        offsetX: -10,
      },
      stroke: {
        curve: "smooth",
        width: 4,
      },
      grid: {
        borderColor: "#ebe9f1",
        padding: {
          top: -20,
          bottom: 5,
          left: 20,
        },
      },
      legend: {
        show: false,
      },
      colors: ["#df87f2"],
      fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          inverseColors: false,
          gradientToColors: [props.primary],
          shadeIntensity: 1,
          type: "horizontal",
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100, 100, 100],
        },
      },
      markers: {
        size: 0,
        hover: {
          size: 5,
        },
      },
      xaxis: {
        labels: {
          offsetY: 5,
          style: {
            colors: "#b9b9c3",
            fontSize: "0.857rem",
            fontFamily: "Montserrat",
          },
        },
        axisTicks: {
          show: false,
        },
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "July",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        axisBorder: {
          show: false,
        },
        tickPlacement: "on",
      },
      yaxis: {
        tickAmount: 5,
        labels: {
          style: {
            colors: "#b9b9c3",
            fontSize: "0.857rem",
            fontFamily: "Montserrat",
          },
          formatter(val) {
            return val > 999 ? `${(val / 1000).toFixed(1)}k` : val;
          },
        },
      },
      tooltip: {
        x: { show: false },
      },
    },
    series = [
      {
        name: "appointments",
        data: appointmentData,
        // data: [3, 5, 7, 1, 4, 0, 3, 15, 18, 14, 10, 12, 6],
      },
    ];
  return (
    <Card>
      <CardHeader className="align-items-start">
        <div>
          <CardTitle className="mb-25" tag="h4">
            Appointments
          </CardTitle>
          <CardText className="mb-0">Pending Appointments</CardText>
        </div>
        {/* <Settings size={18} className="text-muted cursor-pointer" /> */}
      </CardHeader>
      <CardBody className="pb-0">
        <Chart options={options} series={series} type="line" height={240} />
      </CardBody>
    </Card>
  );
};
export default Appointment2;
