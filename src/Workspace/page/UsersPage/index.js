import React, { useState } from "react";
import SearchUser from "../../sharedComponents/SearchUser";
import UsersTable from "../../sharedComponents/UsersTable";
import AddUser from "../../sharedComponents/AddUser";
import { Spin } from "antd";
import "./styles.css";

export default function UsersPage() {
  const apiPath = "https://api.github.com/search/users?q=";
  const [userFound, setUserFound] = useState(null);
  const [data, setData] = useState();
  const [fetchingDataFromAPIStarted, setFetchDataFromAPIStarted] = useState(
    false
  );

  return (
    <div className="page-container">
      <SearchUser
        apiPath={apiPath}
        apiResponse={handleApiResponse}
        fetchStarted={handleFetchingStatus}
      />
      {userFound === false && fetchingDataFromAPIStarted === false && (
        <div>
          <br />
          No data found for the given address id
        </div>
      )}
      <br />
      {fetchingDataFromAPIStarted && <Spin />}
      {userFound && <UsersTable data={data}></UsersTable>}
    </div>
  );

  //handle a flag to identify whether the api is trying to fetch the data
  function handleFetchingStatus(status) {
    setFetchDataFromAPIStarted(status);
  }

  //page handler for the response from the API
  function handleApiResponse(response) {
      
    if (response.total_count > 0) {
      setData({response});
     
      handleFetchingStatus(false);
      setUserFound(true);
    } else if (response.total_count === 0) {
      setUserFound(false);
      handleFetchingStatus(false);
    }
  }
}
