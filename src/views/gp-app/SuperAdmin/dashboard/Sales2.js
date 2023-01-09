import Chart from "react-apexcharts";
import { Settings } from "react-feather";
import { Card, CardHeader, CardTitle, CardBody, CardText } from "reactstrap";

import { Fragment, useState, useEffect } from "react";

import { getSalesGraphAction } from "../../../../redux/actions/salesGraphAction";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
const Sales2 = (props) => {
  const dispatch = useDispatch();
  const { branchId, salonId } = useParams();

  const [saleGraph, setSaleGraph] = useState([]);
  // const store = useSelector((state) => state.salesGraph);
  const getSalesGraph = useSelector((state) => state?.salesGraph);
  const GraphData = getSalesGraph?.SalesGraphDetails?.data;
  // const { loading } = getSalesGraph;

  useEffect(() => {
    // debugger;
    dispatch(getSalesGraphAction(branchId, "Completed"));
  }, []);

  let graphData = [];

  //   console.log("count:- ", GraphData);

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
        <Chart options={options} series={series} type="line" height={240} />
      </CardBody>
    </Card>
  );
};
export default Sales2;
