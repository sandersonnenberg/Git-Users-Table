import "antd/dist/antd.css";
import React from "react";
import PropTypes from "prop-types";
import { Table } from "antd";
import "./styles.css";

export default function UsersTable({ data }) {

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: 'Login',
      dataIndex: 'login',
      sorter:  (a, b) => a.login.toLowerCase() < b.login.toLowerCase()

    },
    {
      title: 'Number of reposetories',
      dataIndex: 'public_repos',
      sorter: (a, b) => a.public_repos - b.public_repos,
    },
    {
      title: 'Avatar',
      dataIndex: 'avatar',
      render: (avatar)=> (
        <>
          <img alt={avatar} className="avatar" src={avatar} />
        </>
      )
    },
  ];

  const tableData = [];
  data.response.items.forEach((element) => {
    tableData.push({
      key: element.id,
      id: element.id.toString(),
      login: element.login.toLowerCase(),
      avatar: element.avatar_url,
      public_repos: element.public_repos,
    });
  });
  return (
    <div>
      <Table columns={columns} className="users-table" dataSource={tableData}>
        {/* <Column title="ID" dataIndex="id" key="id" />
        <Column title="Login" dataIndex="login" key="login" />
        <Column
          title="Number of reposetories"
          dataIndex="public_repos"
          key="public_repos"
        />
        <Column
          title="Avatar"
          dataIndex="avatar"
          key="avatar"
          render={(avatar) => (
            <>
              <img alt={avatar} className="avatar" src={avatar} />
            </>
          )}
        /> */}
      </Table>
    </div>
  );
}

UsersTable.propTypes = {
  data: PropTypes.object.isRequired,
};
