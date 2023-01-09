// ** React Imports
import { Fragment, useState, useEffect } from "react";

// ** Third Party Components
import classnames from "classnames";
import { Row, Col, Card, CardBody } from "reactstrap";

// ** Calendar App Component Imports
import Calendar from "./Calendar";
import SidebarLeft from "./SidebarLeft";
import AddEventSidebar from "./AddEventSidebar";

// ** Custom Hooks
import { useRTL } from "@hooks/useRTL";

// ** Store & Actions
import { useSelector, useDispatch } from "react-redux";
import {
  fetchEvents,
  selectEvent,
  updateEvent,
  updateFilter,
  updateAllFilters,
  addEvent,
  removeEvent,
} from "./store/actions/index";
// ** Styles
import "@styles/react/apps/app-calendar.scss";
import { getAppointmentAction } from "../../../../redux/actions/appoinmentAction";
import AddAppointment from "./Form.js";
import AppointmentDetail from "./AppointmentDetails";
import SidebarNewUsers from "./AddEventSidebar";
// ** CalendarColors
const calendarsColor = {
  New: "info",
  Completed: "success",
  // Personal: "danger",
  // Family: "warning",
  // ETC: "info",
};

const CalendarComponent = () => {
  // ** Variables
  const dispatch = useDispatch();
  const store = useSelector((state) => state.calendar);

  // ** states
  const [addSidebarOpen, setAddSidebarOpen] = useState(false),
    [leftSidebarOpen, setLeftSidebarOpen] = useState(false),
    [calendarApi, setCalendarApi] = useState(null),
    [appointment, setAppointment] = useState();

  // ** Hooks
  const [isRtl, setIsRtl] = useRTL();
  const [state, setState] = useState(null);
  // ** AddEventSidebar Toggle Function
  const handleAddEventSidebar = () => setAddSidebarOpen(!addSidebarOpen);
  const hideSideBar = () => setAddSidebarOpen(false);
  // ** LeftSidebar Toggle Function
  const toggleSidebar = (val) => setLeftSidebarOpen(val);
  const viewChange = (val) => {
    setState(val);
  };
  const appointmentFetch = (data) => {
    setAppointment(data);
  };
  // ** Blank Event Object
  const blankEvent = {
    title: "",
    start: "",
    end: "",
    allDay: false,
    url: "",
    extendedProps: {
      calendar: "",
      guests: [],
      location: "",
      description: "",
    },
  };

  // ** refetchEvents
  const refetchEvents = () => {
    if (calendarApi !== null) {
      calendarApi.refetchEvents();
    }
  };

  // ** Fetch Events On Mount
  useEffect(() => {
    dispatch(fetchEvents(store.selectedCalendars));
  }, []);

  return (
    <Fragment>
      <div className="app-calendar overflow-hidden border">
        {state === null && (
          <Row noGutters>
            <Col
              id="app-calendar-sidebar"
              className={classnames(
                "col app-calendar-sidebar flex-grow-0 overflow-hidden d-flex flex-column",
                {
                  show: leftSidebarOpen,
                }
              )}
            >
              <SidebarLeft
                store={store}
                dispatch={dispatch}
                updateFilter={updateFilter}
                toggleSidebar={toggleSidebar}
                updateAllFilters={updateAllFilters}
                viewChange={viewChange}
              />
            </Col>
            <Col className="position-relative">
              <Calendar
                isRtl={isRtl}
                store={store}
                dispatch={dispatch}
                blankEvent={blankEvent}
                calendarApi={calendarApi}
                selectEvent={selectEvent}
                updateEvent={updateEvent}
                toggleSidebar={toggleSidebar}
                calendarsColor={calendarsColor}
                setCalendarApi={setCalendarApi}
                viewChange={viewChange}
                appointmentFetch={appointmentFetch}
              />
            </Col>
            <div
              className={classnames("body-content-overlay", {
                show: leftSidebarOpen === true,
              })}
              onClick={() => toggleSidebar(false)}
            ></div>
          </Row>
        )}
      </div>
      {state === "1" && (
        <Card>
          <CardBody>
            <AddAppointment
              store={store}
              dispatch={dispatch}
              addEvent={addEvent}
              open={addSidebarOpen}
              selectEvent={selectEvent}
              updateEvent={updateEvent}
              removeEvent={removeEvent}
              calendarApi={calendarApi}
              refetchEvents={refetchEvents}
              calendarsColor={calendarsColor}
              handleAddEventSidebar={handleAddEventSidebar}
              viewChange={viewChange}
              toggleSidebar={toggleSidebar}
            />
          </CardBody>
        </Card>
      )}
      {state === "2" && (
        <Card>
          <CardBody>
            <AppointmentDetail
              toggleSidebar={toggleSidebar}
              viewChange={viewChange}
              appointmentDetail={appointment}
            />
          </CardBody>
        </Card>
      )}
      <SidebarNewUsers
        toggleSidebar={toggleSidebar}
        open={addSidebarOpen}
        handleAddEventSidebar={handleAddEventSidebar}
        hideSidebar={hideSideBar}
      />
    </Fragment>
  );
};

export default CalendarComponent;
