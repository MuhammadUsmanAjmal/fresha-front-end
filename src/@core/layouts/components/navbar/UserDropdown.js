// ** React Imports
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// ** Custom Components
import Avatar from "@components/avatar";

// ** Utils
import { isUserLoggedIn } from "@utils";

// ** Store & Actions
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@store/actions/userActions";

// ** Third Party Components
import {
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
} from "reactstrap";
import {
  User,
  Mail,
  CheckSquare,
  MessageSquare,
  Settings,
  CreditCard,
  HelpCircle,
  Power,
} from "react-feather";

// ** Default Avatar Image
import defaultAvatar from "@src/assets/images/avatars/avatar-blank.png";
import { getProfileAction } from "../../../../redux/actions/userActions";
const UserDropdown = () => {
  // ** Store Vars
  const dispatch = useDispatch();
  const update = useSelector((state) => state.updateProfileInfo);
  const Info = useSelector((state) => state.profileInfo);
  const { loading } = Info;
  const Information = Info?.profile?.data;
  const successUpdate = update?.profileUpdate?.success;
  const Profile = useSelector((state) => state.profileInfo);
  const Data = JSON.parse(localStorage.getItem("userData"));
  const UserId = Data?.data?.id;
  // ** State
  const [userData, setUserData] = useState(null);

  //** ComponentDidMount
  useEffect(() => {
    if (isUserLoggedIn() !== null) {
      // dispatch()
      setUserData(JSON.parse(localStorage.getItem("profileInfo")));
    }
  }, []);

  useEffect(() => {
    // console.log("rerender");
    // console.log(JSON.parse(localStorage.getItem("profileInfo")));

    // if (successUpdate) {
    dispatch(getProfileAction(UserId));
    // setUserData(Profile?.profile?.data);
    // window.location.href = "/";
    // }
    return () => {
      dispatch({ type: "PROFILE_UPDATE_RESET" });
    };
  }, []);
  //** Vars
  const userAvatar = (userData && userData.avatar) || defaultAvatar;

  return (
    <UncontrolledDropdown tag="li" className="dropdown-user nav-item">
      <DropdownToggle
        href="/"
        tag="a"
        className="nav-link dropdown-user-link"
        onClick={(e) => e.preventDefault()}
      >
        {/* {Information ? ( */}
        <div className="user-nav d-sm-flex d-none">
          <span className="user-name font-weight-bold">
            {Information && Information?.[0]?.fullName}
          </span>
          <span className="user-status">
            {Information && Information?.[0]?.email}
          </span>
        </div>
        {/* ) : ( */}
        {/* <div className="user-nav d-sm-flex d-none">
          <span className="user-name font-weight-bold">
            {userData ? userData?.[0]?.fullName : "John Doe"}
          </span>
          <span className="user-status">
            {userData ? userData?.[0]?.email : "abc@gmail.com"}
          </span>
        </div> */}
        {/* )} */}
        <Avatar img={userAvatar} imgHeight="40" imgWidth="40" status="online" />
      </DropdownToggle>
      <DropdownMenu right>
        {/* <DropdownItem tag={Link} to='/pages/profile'>
          <User size={14} className='mr-75' />
          <span className='align-middle'>Profile</span>
        </DropdownItem>
        <DropdownItem tag={Link} to='/apps/email'>
          <Mail size={14} className='mr-75' />
          <span className='align-middle'>Inbox</span>
        </DropdownItem>
        <DropdownItem tag={Link} to='/apps/todo'>
          <CheckSquare size={14} className='mr-75' />
          <span className='align-middle'>Tasks</span>
        </DropdownItem>
        <DropdownItem tag={Link} to='/apps/chat'>
          <MessageSquare size={14} className='mr-75' />
          <span className='align-middle'>Chats</span>
        </DropdownItem> */}
        {/* <DropdownItem divider /> */}
        {Data?.data?.role === "BranchAdmin" && (
          <DropdownItem tag={Link} to="/setup">
            <Settings size={14} className="mr-75" />
            <span className="align-middle">Settings</span>
          </DropdownItem>
        )}
        {/* <DropdownItem tag={Link} to='/pages/pricing'>
          <CreditCard size={14} className='mr-75' />
          <span className='align-middle'>Pricing</span>
        </DropdownItem>
        <DropdownItem tag={Link} to='/pages/faq'>
          <HelpCircle size={14} className='mr-75' />
          <span className='align-middle'>FAQ</span>
        </DropdownItem> */}
        <DropdownItem tag={Link} to="/login" onClick={() => dispatch(logout())}>
          <Power size={14} className="mr-75" />
          <span className="align-middle">Logout</span>
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  );
};

export default UserDropdown;
