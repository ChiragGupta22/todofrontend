import { Link, useLocation } from "react-router-dom";
import "../style/list.css";
import { useEffect, useState } from "react";
import api from "../lib/axios";

export default function List() {
  const [taskdata, setTaskData] = useState([]);
  const [user, setUser] = useState(null);
  const location = useLocation();

  const getListdata = async () => {
    try {
      const res = await api.get("/todo/get-todo");
      const data = res.data;

      console.log("API RESPONSE:", data);

      if (Array.isArray(data.todos)) {
        setTaskData(data.todos);
      } else {
        setTaskData([]);
      }
    } catch (error) {
      // alert("no data");
    }
  };

  useEffect(() => {
    getListdata();
  }, [location.state]);

  useEffect(() => {
    const getUser = async () => {
      const res = await api.get("/auth/me");
      setUser(res.data.user);
    };
    getUser();
  }, []);

  const deleteTask = async (id) => {
    try {
      await api.delete(`/todo/delete-todo/${id}`);
      setTaskData((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  return (
    <div className="list-page">
      <h2 className="heading">Todo List</h2>

      <table className="task-table">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Title</th>
            <th>Description</th>
            <th>Delete</th>
            <th>Update</th>

            {user?.role === "admin" && (
              <>
                <th>Username</th>
                <th>Email</th>
              </>
            )}
          </tr>
        </thead>

        <tbody>
          {taskdata.map((item, index) => (
            <tr key={item._id || index}>
              <td>{index + 1}</td>
              <td>{item.title}</td>
              <td>{item.description}</td>
              <td>
                <button
                  onClick={() => deleteTask(item._id)}
                  className="btn-delete"
                >
                  Delete
                </button>
              </td>
              <td>
                <Link to={`/update/${item._id}`} className="btn-update">
                  Update
                </Link>
              </td>
              {user?.role === "admin" && (
                <>
                  <td>{item.user?.username}</td>
                  <td>{item.user?.email}</td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
