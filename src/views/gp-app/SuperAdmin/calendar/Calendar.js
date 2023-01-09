// ** React Import
import { useState, useEffect, useRef, memo, Fragment } from "react";

// ** Full Calendar & it's Plugins
import FullCalendar from "@fullcalendar/react";
import listPlugin from "@fullcalendar/list";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
// ** Custom Components
import Avatar from "@components/avatar";

// ** Third Party Components
import { toast } from "react-toastify";
import {
  Card,
  CardBody,
  UncontrolledPopover,
  PopoverHeader,
  PopoverBody,
} from "reactstrap";
import { Menu, Check } from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import { getAppointmentAction } from "../../../../redux/actions/appoinmentAction";
import styled from "styled-components";
import { Tooltip, Popover } from "bootstrap";

import {
  timeFormatConvert,
  endTimeCalculate,
  timeConvert,
} from "../../../../utility/Utils";
import SpinnerFlex from "../../../components/spinners/SpinnerFlex";
import { useParams } from "react-router-dom";

// ** Toast Component
const ToastComponent = ({ title, icon, color }) => (
  <Fragment>
    <div className="toastify-header pb-0">
      <div className="title-wrapper">
        <Avatar size="sm" color={color} icon={icon} />
        <h6 className="toast-title">{title}</h6>
      </div>
    </div>
  </Fragment>
);

const Calendar = (props) => {
  // ** Refs
  const calendarRef = useRef(null);
  const dispatch = useDispatch();
  const { branchId, salonId } = useParams();

  // ** Props
  const {
    store,
    isRtl,
    // dispatch,
    calendarsColor,
    calendarApi,
    setCalendarApi,
    handleAddEventSidebar,
    blankEvent,
    toggleSidebar,
    selectEvent,
    updateEvent,
    viewChange,
    appointmentFetch,
  } = props;

  // ** UseEffect checks for CalendarAPI Update
  // useEffect(() => {
  //   if (calendarApi === null) {
  //     setCalendarApi(calendarRef.current.getApi());
  //   }
  // }, [calendarApi]);
  const storeAppoint = useSelector((state) => state.getAppointment);
  const { loading } = storeAppoint;
  const FullData = storeAppoint?.appointment?.data;

  useEffect(() => {
    dispatch(getAppointmentAction(branchId));
  }, []);

  // let appoint_array = [];
  // for (let i = 0; i < FullData?.length; i++) {
  //   if (FullData[i].orderJobs?.length > 0) {
  //     for (let j = 0; j < FullData[i].orderJobs?.length; j++) {
  //       appoint_array.push(FullData[i].orderJobs, FullData[i].orderJobs[j]);
  //     }
  //   }
  // }
  let Array1 = [];
  FullData?.forEach((fullItem) => {
    fullItem?.orderJobs?.forEach((item) => {
      let obj = {};
      obj["date"] = fullItem.orderDate.split("T")[0];
      obj["editable"] = false;
      obj["clickable"] = false;
      obj["overlap"] = true;
      obj["title"] = item?.service[0]?.serviceTitle;
      obj["price"] = item?.service[0]?.price;
      obj["content"] = item?.BeauticianDetails[0]?.fullName;
      obj["start"] = obj["date"] + "T".concat(item.startTime);
      obj["description"] =
        obj?.title?.concat(" ") + timeConvert(item?.duration);
      var endTime = endTimeCalculate(item?.startTime, item?.duration);
      obj["end"] = obj["date"] + "T".concat(endTime);
      obj["orderId"] = fullItem?._id;
      obj["orderStatus"] = fullItem?.status;
      obj["createdBy"] = fullItem?.createdBy;
      obj["ClientName"] = fullItem?.user[0]?.fullName;
      obj["ClientContact"] = fullItem?.user[0]?.contactNumber;
      Array1.push(obj);
    });
  });
  // ** calendarOptions(Props)
  const calendarOptions = {
    events: Array1?.length ? Array1 : [],
    plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin],
    initialView: "listMonth",
    headerToolbar: {
      start: "sidebarToggle, prev,next, title",
      end: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
    },

    /*
      Enable dragging and resizing event
      ? Docs: https://fullcalendar.io/docs/editable
    */
    editable: false,

    /*
      Enable resizing event from start
      ? Docs: https://fullcalendar.io/docs/eventResizableFromStart
    */
    eventResizableFromStart: true,

    /*
      Automatically scroll the scroll-containers during event drag-and-drop and date selecting
      ? Docs: https://fullcalendar.io/docs/dragScroll
    */
    dragScroll: true,

    /*
      Max number of events within a given day
      ? Docs: https://fullcalendar.io/docs/dayMaxEvents
    */
    dayMaxEvents: 2,

    /*
      Determines if day names and week names are clickable
      ? Docs: https://fullcalendar.io/docs/navLinks
    */
    navLinks: true,
    eventClassNames({ event: calendarEvent }) {
      // eslint-disable-next-line no-underscore-dangle
      const colorName =
        calendarsColor[calendarEvent?._def?.extendedProps?.orderStatus];

      return [
        // Background Color
        `bg-light-${colorName}`,
      ];
    },

    eventClick({ event: clickedEvent }) {
      appointmentFetch(clickedEvent);
      dispatch(selectEvent(clickedEvent));
      viewChange("2");
      handleMouseLeave();

      // handleAddEventSidebar();

      // * Only grab required field otherwise it goes in infinity loop
      // ! Always grab all fields rendered by form (even if it get `undefined`) otherwise due to Vue3/Composition API you might get: "object is not extensible"
      // event.value = grabEventDataFromEventApi(clickedEvent)

      // eslint-disable-next-line no-use-before-define
      // isAddNewEventSidebarActive.value = true
    },

    customButtons: {
      sidebarToggle: {
        text: <Menu className="d-xl-none d-block" />,
        click() {
          toggleSidebar(true);
        },
      },
    },

    dateClick(info) {
      const ev = blankEvent;
      ev.start = info.date;
      ev.end = info.date;
      dispatch(selectEvent(ev));
      viewChange("1");
      // handleAddEventSidebar();
    },

    /*
      Handle event drop (Also include dragged event)
      ? Docs: https://fullcalendar.io/docs/eventDrop
      ? We can use `eventDragStop` but it doesn't return updated event so we have to use `eventDrop` which returns updated event
    */
    eventDrop({ event: droppedEvent }) {
      dispatch(updateEvent(droppedEvent));
      toast.success(
        <ToastComponent
          title="Event Updated"
          color="success"
          icon={<Check />}
        />,
        {
          autoClose: 2000,
          hideProgressBar: true,
          closeButton: false,
        }
      );
    },

    /*
      Handle event resize
      ? Docs: https://fullcalendar.io/docs/eventResize
    */
    eventResize({ event: resizedEvent }) {
      dispatch(updateEvent(resizedEvent));
      toast.success(
        <ToastComponent
          title="Event Updated"
          color="success"
          icon={<Check />}
        />,
        {
          autoClose: 2000,
          hideProgressBar: true,
          closeButton: false,
        }
      );
    },

    ref: calendarRef,

    // Get direction from app state (store)
    direction: isRtl ? "rtl" : "ltr",
  };

  const StyleWrapper = styled.div`
    .fc-event-title {
      color: white;
    }

    .fc-event-time {
      display: none;
    }
    .fc-daygrid-event-dot {
      display: none;
    }
    .fc-event-title {
      color: #aeb4b6;
    }
  `;

  let PopoverInstance = null;

  const handleMouseEnter = (info) => {
    if (info.event.extendedProps.description) {
      PopoverInstance = new Popover(info.el, {
        title: info.event.extendedProps.description,
        content: `With ${info.event.extendedProps.content} for ${info.event.extendedProps.price} PKR`,
        html: true,
        placement: "top",
        trigger: "hover",
        container: "body",
      });
      PopoverInstance.show();
    }
  };

  const handleMouseLeave = (info) => {
    if (PopoverInstance) {
      PopoverInstance.dispose();
      PopoverInstance = null;
    }
  };
  return (
    <Card className="shadow-none border-0 mb-0 rounded-0">
      <CardBody className="pb-0 ">
        <StyleWrapper>
          {loading ? (
            <SpinnerFlex />
          ) : (
            <FullCalendar
              {...calendarOptions}
              eventMouseEnter={handleMouseEnter}
              eventMouseLeave={handleMouseLeave}
            />
          )}
        </StyleWrapper>
      </CardBody>
    </Card>
  );
};

export default memo(Calendar);
