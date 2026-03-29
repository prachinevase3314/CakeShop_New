import React from "react";
import { userDetails } from "../../utils/constants";
import "./AdminPages.scss";
import { fetchUsers } from "../../api/commonAPIs";

const Users = () => {
  const [users, setUsers] = React.useState([]);

  React.useEffect(() => {
    const fetchAllUsers = async () => {
      const usersResObj = await fetchUsers();
      setUsers(usersResObj.data);
    };
    fetchAllUsers();
  }, []);

  return (
    <div className="admin-page">
      <h1>Users Management</h1>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>
                {user.firstName} {user.lastName}
              </td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.address}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
