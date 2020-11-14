import React, { useState } from "react";
import SearchUser from "../../sharedComponents/SearchUser";
import UsersTable from "../../sharedComponents/UsersTable";
import AddUser from "../../sharedComponents/AddUser";
import { Spin, message, Button, Popover } from "antd";
import "./styles.css";
import NoDataMessage from "../../sharedComponents/NoDataMessage";

export default function UsersPage() {
  const content = (
    <div>
      <AddUser addUserResponse={handleAddUser} />
    </div>
  );
  const apiPath = "https://api.github.com/search/users?q=";
  const apiHeaders={
    "Authorization": `Token 53281a41a46fd420664b4d9a02e2ba664e754fb9` 
  }
  const [userFound, setUserFound] = useState(null);
  const [addingUser,setAddingUser]=useState(false);
  const [data, setData] = useState();
  const [fetchingDataFromAPIStarted, setFetchDataFromAPIStarted] = useState(
    false
  );
  const [userName, setUserName] = useState();

  return (
    <div className="page-container">
      <h1>Github Users Page</h1>
      <div className="upper-bar">
        <SearchUser
          apiPath={apiPath}
          apiHeaders={apiHeaders}
          apiResponse={handleApiResponse}
          fetchStarted={handleFetchingStatus}
          handleUserToSearch={handleUserToSearch}
        />
        <Popover placement="bottom"  content={content} trigger="click">
          <Button className="add-user-btn">Add User</Button></Popover>
      </div>
      {addingUser && <AddUser addUserResponse={handleAddUser} />}
      {userFound === false && fetchingDataFromAPIStarted === false && (
        <div>
          <br />
          <NoDataMessage userName={userName} />
        </div>
      )}
      <br />
      {fetchingDataFromAPIStarted && <Spin />}
      {userFound && <UsersTable data={data} />}
    </div>
  );

  //handle add user eventt
  function handleAddUser(response) {
    success();
    setAddingUser(false);
  }

  function success() {
    message.success("The user was successfully added");
  }

  //extract from the search component the user name that was searched
  function handleUserToSearch(userName) {
    setUserName(userName);
  }

  //handle a flag to identify whether the api is trying to fetch the data
  function handleFetchingStatus(status) {
    setFetchDataFromAPIStarted(status);
  }

  //page handler for the response from the API
  function handleApiResponse(response) {

    if (response.length > 0) {
      setData({ response });
      setUserFound(true);
    } else setUserFound(false);
    handleFetchingStatus(false);
  }
}
