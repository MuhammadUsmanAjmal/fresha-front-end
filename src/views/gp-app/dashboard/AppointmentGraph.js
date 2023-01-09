import { Bar } from "react-chartjs-2";
import { Card, CardHeader, CardTitle, CardBody, CardText } from "reactstrap";

import { useSelector } from "react-redux";

const AppointmentGraph = ({ tooltipShadow, gridLineColor, labelColor }) => {
  const getAppointmentGraph = useSelector((state) => state.appointmentGraph);

  const appointmentGraphStore =
    getAppointmentGraph?.appointmentGraphDetails?.data;

  let appointmentData = [];

  const count = 12;

  for (let i = 0; i < count; i++) {
    appointmentData.push(0);
  }

  for (let i = 0; i < appointmentGraphStore?.length; i++) {
    appointmentData[appointmentGraphStore[i]?.dateDetails.month - 1] =
      appointmentGraphStore[i]?.count ? appointmentGraphStore[i]?.count : 0;
  }

  function getMax(a) {
    return Math.max(...a.map((e) => (Array.isArray(e) ? getMax(e) : e)));
  }
  const Max_Value = getMax(appointmentData);

  function getMin(a) {
    return Math.min(...a.map((e) => (Array.isArray(e) ? getMin(e) : e)));
  }
  const Min_Value = getMin(appointmentData);
  let sumOfAppointments = 0;
  for (let i = 0; i < appointmentData.length; i++) {
    sumOfAppointments += appointmentData[i];
  }
  const options = {
      elements: {
        rectangle: {
          borderWidth: 2,
          borderSkipped: "bottom",
        },
      },
      responsive: true,
      maintainAspectRatio: false,
      responsiveAnimationDuration: 500,
      legend: {
        display: false,
      },
      tooltips: {
        // Updated default tooltip UI
        shadowOffsetX: 1,
        shadowOffsetY: 1,
        shadowBlur: 8,
        shadowColor: tooltipShadow,
        backgroundColor: "#fff",
        titleFontColor: "#000",
        bodyFontColor: "#000",
      },
      scales: {
        xAxes: [
          {
            display: true,
            gridLines: {
              display: true,
              color: gridLineColor,
              zeroLineColor: gridLineColor,
            },
            scaleLabel: {
              display: false,
            },
            ticks: {
              fontColor: labelColor,
            },
          },
        ],
        yAxes: [
          {
            display: true,
            gridLines: {
              color: gridLineColor,
              zeroLineColor: gridLineColor,
            },
            ticks: {
              stepSize: 10,
              min: 0,
              //   max: sumOfAppointments + 10,
              //   fontColor: labelColor,
            },
          },
        ],
      },
    },
    data = {
      labels: [
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
      datasets: [
        {
          // data: [275, 90, 190, 205, 125, 85, 55, 87, 127, 150, 230, 280, 190],
          data: appointmentData,
          backgroundColor: "#F68D2F",
          borderColor: "transparent",
          barThickness: 15,
        },
      ],
    };
  return (
    <Card>
      <CardHeader className="align-items-start">
        <div>
          <CardTitle className="mb-25" tag="h4">
            Upcoming Appointments
          </CardTitle>
          <CardText className="mb-0">
            Total Appointments: {sumOfAppointments}
          </CardText>
        </div>
      </CardHeader>
      <CardBody className="pb-0">
        <div style={{ height: "300px" }}>
          <Bar data={data} options={options} height={300} />
        </div>
      </CardBody>
    </Card>
  );
};
export default AppointmentGraph;
