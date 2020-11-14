import React, { useMemo, useState } from "react";
import "./styles.css";
import { Popover } from "antd";
import PropTypes from "prop-types";

export default function UsersTable({ data }) {

  const useSortableData = (items, config = null) => {
    const [sortConfig, setSortConfig] = useState(config);

    const sortedItems = useMemo(() => {
      let sortableItems = [...items];
      if (sortConfig !== null) {
        sortableItems.sort((a, b) => {
          if (typeof (a[sortConfig.key])!== "number")
            return sortByString(a, b, sortConfig);
          else return sortByNumbers(a, b, sortConfig);
        });
      }
      return sortableItems;
    }, [items, sortConfig]);

    const requestSort = (key) => {
      let direction = "ascending";
      if (
        sortConfig &&
        sortConfig.key === key &&
        sortConfig.direction === "ascending"
      ) {
        direction = "descending";
      }
      setSortConfig({ key, direction });
    };

    return { items: sortedItems, requestSort, sortConfig };
  };

  const { items, requestSort, sortConfig } = useSortableData(
    data.response
  );
  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };
  return (
    <table className="users-table">
      <thead>
        <tr>
          <th className="headers">
            <button
              type="button"
              onClick={() => requestSort("id")}
              className={getClassNamesFor("id")}
            >
              ID
            </button>
          </th>
          <th className="headers">
            <button
              type="button"
              onClick={() => requestSort("login")}
              className={getClassNamesFor("login")}
            >
              Login
            </button>
          </th>
          <th className="headers">
            <button
              type="button"
              onClick={() => requestSort("public_repos")}
              className={getClassNamesFor("public_repos")}
            >
              Number of Repositories
            </button>
          </th>
          <th className="headers">
            <p>Avatar</p>
          </th>
        </tr>
      </thead>
      <tbody className="table-body">
        {items.map((item) => (
          <tr className="table-row" key={item.id}>
            <td className="table-cell user-id">{item.id}</td>
            <td className="table-cell">{item.login}</td>
            <td className="table-cell">{item.public_repos}</td>
            <td className="table-cell">
              <Popover content={content(item.avatar_url)}>
                <img
                  alt={item.avatar_url}
                  className="avatar"
                  src={item.avatar_url}
                />
              </Popover>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  function sortByNumbers(a, b, sortConfig) {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? 1 : -1;
    }
    return 0;
  }

  function content (content)  {
    return(
      <img alt={content} className="avatar-big" src={content} />
      )
}

  function sortByString(a, b, sortConfig) {
    if(a[sortConfig.key]===undefined|| b[sortConfig.key]===undefined)
    return 0;
    if (
      a[sortConfig.key].toLowerCase().toString() <
      b[sortConfig.key].toLowerCase().toString()
    ) {
      return sortConfig.direction === "ascending" ? -1 : 1;
    }
    if (
      a[sortConfig.key].toLowerCase().toString() >
      b[sortConfig.key].toLowerCase().toString()
    ) {
      return sortConfig.direction === "ascending" ? 1 : -1;
    }
    return 0;
  }
}

UsersTable.propTypes = {
  data: PropTypes.object.isRequired,
};