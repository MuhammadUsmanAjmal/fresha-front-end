import { useRef, useState, useEffect } from "react";
import Wizard from "@components/wizard";
import { ArrowRight, X } from "react-feather";
import Address from "./steps-with-validation/Address";
import SocialLinks from "./steps-with-validation/SocialLinks";
import PersonalInfo from "./steps-with-validation/PersonalInfo";
import AccountDetails from "./steps-with-validation/AccountDetails";
import FinalStep from "./steps-with-validation/Finish";
import { Col, Card } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import SpinnerFlex from "../../components/spinners/SpinnerFlex";
import { getBookingAction } from "../../../redux/actions/onlineBookingAction";
const WizardHorizontal = ({ toggleRegForm, id }) => {
  const dispatch = useDispatch();
  const BookingDetail = useSelector((state) => state.onlineBooking);
  const { loading } = BookingDetail;
  const Detail = BookingDetail?.onlineBookingDetail?.data;
  const [stepper, setStepper] = useState(null);
  const ref = useRef(null);
  const [firstStep, setFirstStep] = useState();
  const [secondStep, setSecondStep] = useState();
  const [thirdStep, setThirdStep] = useState();
  const Info = JSON.parse(localStorage.getItem("userData"));

  const salonId = Info?.data?.salonId;
  const userId = Info?.data?.id;
  // useEffect(() => {}, []);
  const FirstFormStep = (val) => {
    setFirstStep(val);
  };
  const SecondFormStep = (val) => {
    setSecondStep(val);
  };
  const ThirdFormStep = (val) => {
    setThirdStep(val);
  };

  const steps = [
    {
      id: "business-details",
      // title: "Business Info",
      // subtitle: "Enter Your Business Details.",
      content: (
        <AccountDetails
          stepper={stepper}
          type="wizard-horizontal"
          FirstFormStep={FirstFormStep}
          FormDetail={Detail}
        />
      ),
    },
    {
      id: "location-info",
      // title: "Location Info",
      // subtitle: "Add Your Address",
      content: (
        <PersonalInfo
          stepper={stepper}
          type="wizard-horizontal"
          SecondFormStep={SecondFormStep}
          FormDetail={Detail}
        />
      ),
    },
    {
      id: "business-hours",
      // title: "Operating hours",
      // subtitle: "Add your business hours",
      content: (
        <Address
          stepper={stepper}
          type="wizard-horizontal"
          ThirdFormStep={ThirdFormStep}
          FormDetail={Detail}
        />
      ),
    },
    {
      id: "add-photo",
      // title: "Business photo",
      // subtitle: "Add business photo",
      content: (
        <SocialLinks
          stepper={stepper}
          type="wizard-horizontal"
          FormDetail={Detail}
        />
      ),
    },
    {
      id: "publish-salon",
      // title: "Generate Link",
      // subtitle: "This link will be visible to your Clients",
      content: (
        <FinalStep
          stepper={stepper}
          type="wizard-horizontal"
          FirstFormValue={firstStep}
          SecondFormValue={secondStep}
          ThirdFormValue={thirdStep}
          FormDetail={Detail}
          toggleRegForm={toggleRegForm}
          BranchId={id ? id : null}
        />
      ),
    },
  ];

  return (
    <Card className="horizontal-wizard">
      {loading ? (
        <SpinnerFlex />
      ) : (
        <Wizard
          instance={(el) => setStepper(el)}
          ref={ref}
          steps={steps}
          toggleRegForm={toggleRegForm}
        />
      )}
    </Card>
  );
};

export default WizardHorizontal;
