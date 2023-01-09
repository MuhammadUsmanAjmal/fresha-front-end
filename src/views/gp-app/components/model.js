import { Fragment, useState, useEffect } from "react";
import { Check } from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Col,
} from "reactstrap";
import { getBranchesAction } from "../../../redux/actions/branchActions";
const Model = ({ open, toggle, toggleRegForm }) => {
  // console.log(branchListing);
  const HandleCheck = () => {
    toggle();
    toggleRegForm("3");
  };
  return (
    <Fragment>
      <Modal
        isOpen={open}
        toggle={toggle}
        className={`modal-dialog-centered modal-lg`}
      >
        <ModalHeader toggle={toggle}></ModalHeader>

        <ModalBody style={{ height: 250, padding: 25 }}>
          <Col lg="8">
            <span
              style={{ fontWeight: "bolder", color: "black", fontSize: 25 }}
            >
              To create a link for the entire service menu, publish your Beauty
              profile
            </span>
          </Col>
          <Col lg="9" className="d-flex flex-column p-1">
            <span className="pt-1 pb-1">
              Join the world’s largest beauty and wellness marketplace
            </span>
            <span>
              <Check size={14} color="black" className=" mr-1" />
              Get your business listed on the Beauty app
            </span>
            <span>
              <Check size={14} color="black" className=" mr-1" />
              Reach thousands of new clients who visit Beauty every day
            </span>
            <span>
              <Check size={14} color="black" className=" mr-1" />
              Free up time and get your clients self-booking online
            </span>
          </Col>
        </ModalBody>
        <ModalFooter>
          <Col className="p-1">
            <Button color="dark" onClick={HandleCheck}>
              Start Now
            </Button>
          </Col>
        </ModalFooter>
      </Modal>
    </Fragment>
  );
};

export default Model;
