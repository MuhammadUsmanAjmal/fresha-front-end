import { Fragment, useEffect, useState } from "react";

// ** Custom Components
import Avatar from "@components/avatar";
import Select, { components } from "react-select";

// ** Third Party Components
import { v4 as uuidv4 } from "uuid";
import classnames from "classnames";
import { Slide, toast } from "react-toastify";
import Flatpickr from "react-flatpickr";
import {
  X,
  Check,
  Trash,
  ChevronLeft,
  ArrowDownLeft,
  ChevronDown,
  Tag,
  Plus,
  User,
} from "react-feather";
import { useForm, Controller } from "react-hook-form";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  Label,
  CustomInput,
  Input,
  Form,
  Card,
  Row,
  Col,
  Tooltip,
  Spinner,
} from "reactstrap";

// ** Utils
import { selectThemeColors, isObjEmpty } from "@utils";

// ** Avatar Images
import img1 from "@src/assets/images/avatars/1-small.png";
import img2 from "@src/assets/images/avatars/3-small.png";
import img3 from "@src/assets/images/avatars/5-small.png";
import img4 from "@src/assets/images/avatars/7-small.png";
import img5 from "@src/assets/images/avatars/9-small.png";
import img6 from "@src/assets/images/avatars/11-small.png";

// ** Styles Imports
import { SlideDown } from "react-slidedown";
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/libs/flatpickr/flatpickr.scss";
import { getServices } from "../../../../redux/actions/servicesActions";
import { useSelector, useDispatch } from "react-redux";
import { getStaffWorkAction } from "../../../../redux/actions/staffActions";
import { get } from "jquery";
import {
  addAppointmentAction,
  getAppointmentAction,
} from "../../../../redux/actions/appoinmentAction";
import { getClients } from "../../../../redux/actions/clientsActions";
import { ToastContent } from "../../components/ToastContent";
import { timeConvert } from "../../../../utility/Utils";
import { Line } from "recharts";
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

const AddAppointment = (props) => {
  // ** Props
  const {
    store,
    handleAddEventSidebar,
    calendarApi,
    refetchEvents,
    addEvent,
    selectEvent,
    updateEvent,
    removeEvent,
    viewChange,
    toggleSidebar,
  } = props;

  // ** Vars
  const selectedEvent = store.selectedEvent;
  const { register, errors, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const { branchId, salonId } = useParams();

  // ** States
  const [url, setUrl] = useState("");
  const [desc, setDesc] = useState("");
  const [title, setTitle] = useState("");
  const [guests, setGuests] = useState({});
  const [allDay, setAllDay] = useState(false);
  const [location, setLocation] = useState("");
  const [endPicker, setEndPicker] = useState(new Date());
  const [startPicker, setStartPicker] = useState(new Date());
  const [value, setValue] = useState([
    { value: "Business", label: "Business", color: "warning" },
  ]);
  const [client, setClient] = useState();
  const [staff, setStaff] = useState();
  // console.log(option);
  const service = useSelector((state) => state.getServices);
  const serviceStore = service?.services?.data;

  const OrderDetail = useSelector((state) => state.addAppointment);
  const { loading } = OrderDetail;
  const success = OrderDetail?.appointment?.success;

  const ServiceProvider = useSelector((state) => state.getWorkStaff);
  const ServiceProviderStaff = ServiceProvider?.Staff?.data;

  const getStaffError = ServiceProvider?.Staff?.error;
  const formError = OrderDetail?.appointment?.error;

  const clients = useSelector((state) => state.getClient);
  const ClientDetail = clients?.Clients?.data;

  const addClient = useSelector((state) => state.addClient);
  const ClientData = addClient?.Clients?.data;

  useEffect(() => {
    dispatch(getServices(branchId, true));
  }, []);
  useEffect(() => {
    dispatch(getClients(branchId, true));
  }, []);
  useEffect(() => {
    if (success) {
      setStaff("");
      toast.success(
        <ToastContent success={OrderDetail?.appointment?.message} />,
        {
          transition: Slide,
          hideProgressBar: true,
          autoClose: 2000,
        }
      );
      viewChange(null);
      dispatch(getAppointmentAction(branchId));
      return () => {
        dispatch({ type: "APPOINTMENT_ADD_RESET" });
      };
    }
  }, [success]);

  useEffect(() => {
    if (formError) {
      toast.error(<ToastContent error={OrderDetail?.appointment?.message} />, {
        transition: Slide,
        hideProgressBar: true,
        autoClose: 2000,
      });

      return () => {
        dispatch({ type: "APPOINTMENT_ADD_RESET" });
      };
    }
  }, [formError]);
  useEffect(() => {
    if (getStaffError) {
      toast.error(<ToastContent error={ServiceProvider?.Staff?.message} />, {
        transition: Slide,
        hideProgressBar: true,
        autoClose: 2000,
      });
    }

    return () => {
      dispatch({ type: "STAFF_WORK_RESET" });
    };
  }, [getStaffError]);

  let ClientArray = [];
  ClientDetail?.forEach((item) => {
    let obj = {};
    obj["value"] = item?._id;
    obj["label"] = item?.fullName;
    obj["contactNumber"] = item?.contactNumber;
    obj["email"] = item?.email;
    obj["role"] = item?.role;
    ClientArray.push(obj);
  });
  let DummyArray = [];
  serviceStore?.forEach((fullItem) => {
    fullItem?.allServices?.forEach((item) => {
      let obj = {};
      obj["value"] = item?._id;
      obj["label"] = item?.serviceTitle?.concat(
        " ( ",
        item?.duration,
        "min ",
        ",",
        item?.price,
        "PKR )"
      );
      obj["serviceTitle"] = item?.serviceTitle;
      obj["duration"] = item?.duration;
      obj["price"] = item?.price;

      DummyArray?.push(obj);
    });
  });
  let ServiceStaffData = [];
  ServiceProviderStaff?.forEach((item) => {
    let obj = {};
    obj["value"] = item._id;
    obj["label"] = item.fullName;
    ServiceStaffData.push(obj);
  });
  // ** Select Options
  const options = [
    { value: "Business", label: "Business", color: "primary" },
    { value: "Personal", label: "Personal", color: "danger" },
    { value: "Family", label: "Family", color: "warning" },
    { value: "Holiday", label: "Holiday", color: "success" },
    { value: "ETC", label: "ETC", color: "info" },
  ];

  const guestsOptions = [
    { value: "Donna Frank", label: "Donna Frank", avatar: img1 },
    { value: "Jane Foster", label: "Jane Foster", avatar: img2 },
    {
      value: "Gabrielle Robertson",
      label: "Gabrielle Robertson",
      avatar: img3,
    },
    { value: "Lori Spears", label: "Lori Spears", avatar: img4 },
    { value: "Sandy Vega", label: "Sandy Vega", avatar: img5 },
    { value: "Cheryl May", label: "Cheryl May", avatar: img6 },
  ];

  // ** Custom select components
  const OptionComponent = ({ data, ...props }) => {
    return (
      <components.Option {...props} className="border">
        <Col lg="12" className="d-flex justify-content-between flex-1 ">
          <Col className="d-flex flex-column flex-1" lg="7">
            <h5>{data?.serviceTitle}</h5>
            <h5>{timeConvert(data?.duration)}</h5>
          </Col>
          <Col lg="5">PKR {data?.price}</Col>
        </Col>
      </components.Option>
    );
  };

  const ClientComponent = ({ data, ...props }) => {
    return (
      <components.Option {...props} className="border">
        <div className="d-flex flex-wrap align-items-center p-1">
          <Avatar
            color="light-secondary"
            className="my-0 mr-1 d-flex align-items-center justify-content-center"
            size="lg"
            icon={data?.label?.split("").splice(0, 1).join("")}
          />
          <Col className="d-flex flex-column" lg="8">
            <h5>{data?.label}</h5>
            <h6>{data?.contactNumber}</h6>
          </Col>
        </div>
      </components.Option>
    );
  };

  // ** Adds New Event
  const handleAddEvent = () => {
    const obj = {
      title,
      start: startPicker,
      end: endPicker,
      allDay,
      display: "block",
      extendedProps: {
        calendar: value[0].label,
        url: url.length ? url : undefined,
        guests: guests.length ? guests : undefined,
        location: location.length ? location : undefined,
        desc: desc.length ? desc : undefined,
      },
    };
    dispatch(addEvent(obj));
    refetchEvents();
    // handleAddEventSidebar();
    toast.success(
      <ToastComponent title="Event Added" color="success" icon={<Check />} />,
      {
        autoClose: 2000,
        hideProgressBar: true,
        closeButton: false,
      }
    );
  };

  // ** Reset Input Values on Close
  const handleResetInputValues = () => {
    dispatch(selectEvent({}));
    setTitle("");
    setAllDay(false);
    setUrl("");
    setLocation("");
    setDesc("");
    setGuests({});
    setValue([{ value: "Business", label: "Business", color: "dark" }]);
    setStartPicker(new Date());
    setEndPicker(new Date());
  };

  // ** (UI) updateEventInCalendar
  const updateEventInCalendar = (
    updatedEventData,
    propsToUpdate,
    extendedPropsToUpdate
  ) => {
    const existingEvent = calendarApi.getEventById(updatedEventData.id);

    // ** Set event properties except date related
    // ? Docs: https://fullcalendar.io/docs/Event-setProp
    // ** dateRelatedProps => ['start', 'end', 'allDay']
    // ** eslint-disable-next-line no-plusplus
    for (let index = 0; index < propsToUpdate.length; index++) {
      const propName = propsToUpdate[index];
      existingEvent.setProp(propName, updatedEventData[propName]);
    }

    // ** Set date related props
    // ? Docs: https://fullcalendar.io/docs/Event-setDates
    existingEvent.setDates(updatedEventData.start, updatedEventData.end, {
      allDay: updatedEventData.allDay,
    });

    // ** Set event's extendedProps
    // ? Docs: https://fullcalendar.io/docs/Event-setExtendedProp
    // ** eslint-disable-next-line no-plusplus
    for (let index = 0; index < extendedPropsToUpdate.length; index++) {
      const propName = extendedPropsToUpdate[index];
      existingEvent.setExtendedProp(
        propName,
        updatedEventData.extendedProps[propName]
      );
    }
  };

  // ** Updates Event in Store
  const handleUpdateEvent = () => {
    const eventToUpdate = {
      id: selectedEvent.id,
      title,
      allDay,
      start: startPicker,
      end: endPicker,
      url,
      extendedProps: {
        location,
        description: desc,
        guests,
        calendar: value[0].label,
      },
    };

    const propsToUpdate = ["id", "title", "url"];
    const extendedPropsToUpdate = [
      "calendar",
      "guests",
      "location",
      "description",
    ];

    dispatch(updateEvent(eventToUpdate));
    updateEventInCalendar(eventToUpdate, propsToUpdate, extendedPropsToUpdate);
    // handleAddEventSidebar();
    toast.success(
      <ToastComponent title="Event Updated" color="success" icon={<Check />} />,
      {
        autoClose: 2000,
        hideProgressBar: true,
        closeButton: false,
      }
    );
  };

  // ** (UI) removeEventInCalendar
  const removeEventInCalendar = (eventId) => {
    calendarApi.getEventById(eventId).remove();
  };
  const handleDeleteEvent = () => {
    dispatch(removeEvent(selectedEvent.id));
    removeEventInCalendar(selectedEvent.id);
    // handleAddEventSidebar();
    toast.error(
      <ToastComponent title="Event Removed" color="danger" icon={<Trash />} />,
      {
        autoClose: 2000,
        hideProgressBar: true,
        closeButton: false,
      }
    );
  };

  // ** Close BTN
  const CloseBtn = (
    <X className="cursor-pointer" size={15} onClick={handleAddEventSidebar} />
  );
  const InfoData = JSON.parse(localStorage.getItem("userData"));
  const Values = InfoData.data;

  const onsubmit = (data) => {
    let jobs = [];
    inputFields?.map((item) => {
      delete item.id;
      jobs?.push(item);
    });
    let price = [];
    inputFields?.map((item) => {
      price?.push(parseInt(item?.actualPrice));
    });
    var TotalPrice = price.reduce(function (a, b) {
      return a + b;
    }, 0);
    const Obj = {
      userId: client ? client?.value : ClientData ? ClientData?.id : Values?.id,
      createdBy: client
        ? client?.role
        : ClientData
        ? ClientData?.role
        : Values?.role,
      branchId: Values?.branchId,
      orderDate: startPicker.toLocaleDateString(),
      actualOrderPrice: TotalPrice,
      totalOrderPrice: TotalPrice,
      specialNotes: data?.Notes,
      orderJob: jobs,
    };
    dispatch(addAppointmentAction(Obj));
  };

  const handleRemoveFields = (id) => {
    // console.log("delete id", id);
    // const values = [...inputFields];
    // values.filter(
    const values = inputFields.filter((item) => item.id !== id);
    //   1
    // );
    setInputFields(values);
    // console.log(values);
  };
  const handleAddFields = () => {
    // console.log(inputFields.length);
    setInputFields([...inputFields, templateFields]);
  };

  const templateFields = {
    id: uuidv4(),
  };
  const onChangeService = (v, index) => {
    const obj = {
      serviceId: v.value,
      actualPrice: v.price,
      duration: v.duration,
      totalPrice: v.price,
    };
    inputFields.map((user, i) =>
      index == i ? Object.assign(user, obj) : user
    );
  };
  const onChangeBeautician = (v, index) => {
    const obj = {
      userId: v.value,
    };
    inputFields.map((user, i) =>
      index == i ? Object.assign(user, obj) : user
    );
  };
  const onChangeTime = (e, index) => {
    const obj = {
      startTime: e.target.value,
    };
    inputFields.map((user, i) =>
      index == i ? Object.assign(user, obj) : user
    );
  };
  const [inputFields, setInputFields] = useState([templateFields]);
  // console.log("i/p fields: ", inputFields);
  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      borderBottom: "1px dotted gray",
      color: "gray",

      padding: 20,
    }),

    menu: (provided, state) => ({
      ...provided,
      zIndex: 99999,
    }),
  };
  const customStyleStaff = {
    option: (provided, state) => ({
      ...provided,
      color: "gray",
      padding: 15,
    }),

    menu: (provided, state) => ({
      ...provided,
    }),
  };

  const customStyleClient = {
    option: (provided, state) => ({
      ...provided,
      color: "gray",
    }),

    menu: (provided, state) => ({
      ...provided,
      zIndex: 99999,
    }),
  };
  return (
    <Form onSubmit={handleSubmit(onsubmit)}>
      <Row
        sm="12"
        className="d-flex align-item-center cursor-pointer justify-content-start w-25 m-1"
        onClick={(event) => {
          event.preventDefault();
          viewChange(null);
        }}
      >
        <ChevronLeft size={20} />
        Go Back
      </Row>
      <Col
        sm="5"
        lg="12"
        className="d-flex flex-row justify-content-center mb-1"
      >
        <h3>New Appointment</h3>
      </Col>
      <Row lg="3">
        <Col>
          <FormGroup className="d-flex align-items-center flex-direction-row">
            <span for="selectDate" className="mr-1" style={{ fontSize: 16 }}>
              SelectDate:
            </span>
            <Flatpickr
              required
              id="Date"
              name="Date"
              className="form-control font-weight-bolder  border"
              style={{ fontSize: 16 }}
              onChange={(date) => {
                setStartPicker(date[0]);
              }}
              value={startPicker}
              options={{
                enableTime: false,
                dateFormat: "Y-m-d",
              }}
            />
          </FormGroup>
        </Col>
      </Row>

      <Row lg="12">
        <Col lg="8">
          {inputFields?.map((inputField, index) => (
            <div
              key={index === 0 ? "div" : SlideDown}
              className="d-flex flex-row align-items-center"
            >
              <div className="d-flex flex-column align-items-center">
                <span
                  for="selectDate"
                  className="rounded-circle border border-2 mt-3 "
                  style={{
                    fontSize: 14,
                    color: "gray",
                    fontWeight: "bolder",
                    height: 30,
                    width: 30,
                    display: "flex",
                    alignItems: "center",
                    paddingLeft: 10,
                  }}
                >
                  {index + 1}
                </span>

                <span
                  style={{
                    borderLeft: 10,
                    border: 2,
                    marginTop: 20,
                    height: 150,
                    borderWidth: 1,
                    borderStyle: "dashed",
                    color: "lightgray",
                  }}
                ></span>
              </div>
              <Card className=" border border-2 rounded p-2 m-3  w-100">
                {inputFields.length > 1 && (
                  <div className="d-flex justify-content-end ">
                    <X
                      className="cursor-pointer"
                      size={16}
                      onClick={() => {
                        handleRemoveFields(inputField.id);
                      }}
                    ></X>
                  </div>
                )}
                <Row lg="12">
                  <Col lg="4">
                    <FormGroup>
                      <Label for="startTime">Start Time</Label>
                      <Input
                        required
                        id="startTime"
                        name="startTime"
                        onChange={(e) => {
                          onChangeTime(e, index);
                        }}
                        type="time"
                        className="form-control"
                        innerRef={register({ required: true })}
                      />
                    </FormGroup>
                  </Col>
                  <Col lg="8">
                    <FormGroup>
                      <Label for="service_type">Service Title</Label>
                      <Select
                        styles={customStyles}
                        components={{ Option: OptionComponent }}
                        id="service"
                        name="service"
                        placeholder="Choose a service"
                        classNamePrefix="select"
                        onChange={(v) => {
                          onChangeService(v, index);
                          dispatch(getStaffWorkAction(v.value));
                        }}
                        innerRef={register({ required: true })}
                        options={DummyArray}
                        className={classnames({
                          "is-invalid ": errors["service"],
                        })}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row lg="12">
                  <Col lg="4">
                    <FormGroup>
                      <Label for="serviceDuration">Service Duration</Label>
                      <Input
                        required
                        id="serviceTime"
                        name="serviceTime"
                        type="text"
                        className="form-control"
                        value={
                          inputField?.duration
                            ? timeConvert(inputField?.duration)
                            : "00:00"
                        }
                        disabled
                      />
                    </FormGroup>
                  </Col>
                  <Col lg="8">
                    <FormGroup>
                      <Label for="Beautician">Beautician</Label>
                      <Select
                        id="beautician"
                        name="beautician"
                        styles={customStyleStaff}
                        classNamePrefix="select"
                        onChange={(v) => {
                          onChangeBeautician(v, index);
                        }}
                        options={ServiceStaffData && ServiceStaffData}
                        className={classnames({
                          "is-invalid": errors["beautician"],
                        })}
                        innerRef={register({ required: true })}
                      />
                    </FormGroup>
                  </Col>
                </Row>
              </Card>
            </div>
          ))}
          <Col lg="11" className="m-3">
            <Col lg="8">
              <p
                className="d-flex align-items-center cursor-pointer justify-content-start"
                onClick={(event) => {
                  event.preventDefault();
                  handleAddFields();
                }}
              >
                <span
                  className="d-flex align-items-center justify-content-center rounded-circle "
                  style={{
                    height: 16,
                    width: 16,
                    backgroundColor: "gray",
                  }}
                >
                  <Plus size={11} color="white" />
                </span>
                <a
                  href="#"
                  className="border-bottom-gray"
                  style={{
                    color: "gray",
                    fontWeight: "bold",
                    marginLeft: 4,
                  }}
                >
                  Add more services
                </a>
              </p>
            </Col>

            <Col lg="12">
              <FormGroup>
                <Label for="Notes">Notes (optional)</Label>
                <Input
                  type="textarea"
                  name="Notes"
                  id="Notes"
                  rows="2"
                  className={classnames({ "is-invalid": errors["Notes"] })}
                  innerRef={register({ required: false })}
                  placeholder="Description..."
                />
              </FormGroup>
            </Col>

            <Col lg="8" className="d-flex">
              <FormGroup className="d-flex mt-1">
                <Button.Ripple
                  className="mr-1 button_slide slide_right d-flex "
                  type="submit"
                  color="dark"
                >
                  {loading && (
                    <Spinner className="mr-50" color="white" size="sm" />
                  )}

                  <span>Add </span>
                </Button.Ripple>
                <Button.Ripple
                  color="secondary"
                  type="reset"
                  onClick={() => viewChange(null)}
                  outline
                >
                  Cancel
                </Button.Ripple>
              </FormGroup>
            </Col>
          </Col>
        </Col>

        <Col lg="4" className="p-2 mt-2 border-left">
          <FormGroup>
            <Select
              styles={customStyleClient}
              components={{ Option: ClientComponent }}
              id="client"
              name="client"
              placeholder="Select Client"
              classNamePrefix="select"
              onChange={(v) => {
                setClient(v);
              }}
              innerRef={register({ required: false })}
              options={ClientArray}
              className={classnames({
                "is-invalid ": errors["client"],
              })}
            />
          </FormGroup>

          <Card className="p-2">
            <Row>
              <Avatar
                className="d-flex align-items-center justify-content-center"
                icon={<User />}
                size="lg"
                color="light-secondary"
                style={{ height: 70, width: 70 }}
              />
              <Col lg="8">
                <h4 style={{ fontWeight: "bold" }}>
                  {client
                    ? client?.label
                    : ClientData
                    ? ClientData?.fullName
                    : "XYZ"}
                </h4>
                <h6 style={{ color: "gray" }}>
                  {client
                    ? client?.email
                    : ClientData
                    ? ClientData?.email
                    : "xyz@gmail.com"}
                </h6>
                <h6 style={{ color: "gray" }}>
                  {client
                    ? client?.contactNumber
                    : ClientData
                    ? ClientData?.contactNumber
                    : "0300 XXXX XXX"}
                </h6>
              </Col>
            </Row>
          </Card>

          {/* <Button.Ripple
            className="button_slide slide_right  "
            color="dark"
            onClick={handleAddEventSidebar}
          >
            <span> Add New Client</span>
          </Button.Ripple> */}
          <Col>
            <Button.Ripple
              size="sm"
              color="dark"
              onClick={handleAddEventSidebar}
            >
              Add New Client
            </Button.Ripple>
          </Col>
        </Col>
      </Row>
    </Form>
  );
};

export default AddAppointment;
