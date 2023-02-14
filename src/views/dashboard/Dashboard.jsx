import React, { useState } from "react";
import { Table } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import AddUser from "../../components/user/AddUser";
import UpdateUser from "../../components/user/UpdateUser";
import { deleteUser } from "../../store/reducer/userSlice";
import "./dashboard.css";

const Dashboard = () => {
  const [show, setShow] = useState(false);
  const [action, setAction] = useState("");
  const [userId, setUserId] = useState("");
  const dispatch = useDispatch();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCloseUpdateModal = () => {
    setAction("");
  };

  const users = useSelector((state) => state.users);
  const handleDeleteUser = (userId) => {
    alert("This will delete the user details");
    dispatch(deleteUser(userId));
    window.location.reload();
  };
  const handleUpdate = (id) => {
    setAction("update");
    setUserId(id);
  };
  return (
    <>
      <div className="pt-3 d-flex justify-content-end">
        <button className="btn btn-primary px-4 py-2" onClick={handleShow}>
          Create User
        </button>
      </div>

      <div className="pt-4" id="my_table">
        <div className="scroll_table">
          <Table>
            <thead>
              <tr>
                <th>User Name</th>
                <th>Email</th>
                <th>Mobile No.</th>
                <th>Address</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((item) => {
                return (
                  <tr key={item.id}>
                    <td className="">{item.user?.name}</td>
                    <td className="">{item.user?.email}</td>
                    <td className="">{item.user?.phone}</td>
                    <td className="">{item.user?.address}</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <i
                          className="fa fa-pencil me-3 cp"
                          onClick={() => handleUpdate(item.id)}
                        ></i>
                        <i
                          className="fa fa-trash cp"
                          onClick={() => handleDeleteUser(item.id)}
                        ></i>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      </div>
      {show ? <AddUser show={show} handleClose={handleClose} /> : null}
      {action === "update" ? (
        <UpdateUser
          userId={userId}
          show={action}
          handleClose={handleCloseUpdateModal}
        />
      ) : null}
    </>
  );
};

export default Dashboard;
