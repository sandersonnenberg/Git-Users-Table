import React from "react";
import PropTypes from "prop-types";
import "./styles.css";

export default function NoDataMessage({ userName }) {
  return (
    <>
      <p className="no-data-found">No user found with the name: <span className="user-name">{userName}</span></p>
    </>
  );
}
NoDataMessage.propTypes = {
  userName: PropTypes.string.isRequired,
  };