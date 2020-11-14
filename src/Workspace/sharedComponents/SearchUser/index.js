import "antd/dist/antd.css";
import React, { useState } from "react";
import { Input, Button } from "antd";
import PropTypes from "prop-types";
import "./styles.css";

export default function SearchUser({
  apiPath,
  apiHeaders,
  apiResponse,
  fetchStarted,
  handleUserToSearch
}) {
  const [path] = useState(apiPath);
  const [shouldDisableButton, setShouldDisableButton] = useState(true);
  const [userToSearch, setUserToSearch] = useState("");
  return (
    <>
      <div className="search-section">
        <Input
          className="search-input"
          placeholder="Enter a name"
          size="large"
          onChange={handleOnKeyPress}
          onKeyDown={handleOnKeyDown}
        />
        <Button
          className="search-button"
          onClick={handleOnSearch}
          type="primary"
          disabled={shouldDisableButton}
        >
          Search
        </Button>
      </div>
    </>
  );

  //handle the on key press event
  function handleOnKeyPress(e) {
    e.target.value !== ""
      ? setShouldDisableButton(false)
      : setShouldDisableButton(true);
    setUserToSearch(e.target.value);
  }

  //handle the on key down event
  function handleOnKeyDown(e) {
    if (e.key === "Enter" && userToSearch) {
      handleOnSearch();
    }
  }

  //handle the search event
  function handleOnSearch() {
    handleUserToSearch(userToSearch);
    const fullApiPath = path + userToSearch;
    getDataByUser(fullApiPath);
  }

  //get data for By User ID
  function getDataByUser(path) {
    fetchStarted(true);
    fetch(path)
      .then((response) => response.json())
      .then((data) => {
      
      data.items.forEach(element => {
        fetch("https://api.github.com/users/"+element.login,{
          "method": "GET",
          "headers": apiHeaders
        })
        .then((response) => response.json())
        .then((res => {
          element.public_repos=res.public_repos;
        }))
      })
      apiResponse(data);
      
    })
    
  }
}

SearchUser.propTypes = {
  apiPath: PropTypes.string.isRequired,
  apiHeaders: PropTypes.object.isRequired,
  apiResponse: PropTypes.func.isRequired,
  fetchStarted: PropTypes.func.isRequired,
  handleUserToSearch: PropTypes.func.isRequired
};
