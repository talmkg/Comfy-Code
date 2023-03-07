import { Card, Row, Col, Modal, Button, Spinner } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { BiUserPlus } from "react-icons/bi";
import { useSelector } from "react-redux";
import UsersModal from "../Mini_Components/InviteModal";
function CoverView(props) {
  const LoggedInUser = useSelector((state) => state.LoggedInUser[0]);
  const loading = useSelector((state) => state.loading);
  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        animation={false}
      >
        <img src={props.imageurl} />
      </Modal>
    </>
  );
}
export default CoverView;
