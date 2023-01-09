import Chart from "react-apexcharts";
import { Card, CardHeader, CardTitle, CardBody, CardText } from "reactstrap";

import { useDispatch, useSelector } from "react-redux";
const SalesGraph = (props) => {
  const getSalesGraph = useSelector((state) => state?.salesGraph);
  const GraphData = getSalesGraph?.SalesGraphDetails?.data;

  let graphData = [];

  const count = 12;

  for (let i = 0; i < count; i++) {
    graphData.push(0);
  }

  for (let i = 0; i < GraphData?.length; i++) {
    graphData[GraphData[i]?.dateDetails.month - 1] = GraphData[i]?.totalSum
      ? GraphData[i]?.totalSum
      : 0;
  }

  //   console.log("data in sales graph", graphData);

  let sumOfSales = 0;
  for (let i = 0; i < graphData.length; i++) {
    sumOfSales += graphData[i];
  }

  //   console.log("sum of sales:", sumOfSales);

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
        width: 2,
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
      colors: ["#F68D2F"],
      // fill: {
      //   type: "gradient",
      //   gradient: {
      //     shade: "",
      //     inverseColors: false,
      //     gradientToColors: [props.primary],
      //     shadeIntensity: 1,
      //     type: "horizontal",
      //     opacityFrom: 1,
      //     opacityTo: 1,
      //     stops: [0, 100, 100, 100],
      //   },
      // },
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
        name: "Sales",
        data: graphData,
      },
    ];
  return (
    <Card>
      <CardHeader className="align-items-start">
        <div>
          <CardTitle className="mb-25" tag="h4">
            Sales
          </CardTitle>
          <CardText className="mb-0">Total Sales: {sumOfSales}PKR</CardText>
        </div>
        {/* <Settings size={18} className="text-muted cursor-pointer" /> */}
      </CardHeader>
      <CardBody className="pb-0">
        <Chart options={options} series={series} type="line" height={300} />
      </CardBody>
    </Card>
  );
};
export default SalesGraph;
