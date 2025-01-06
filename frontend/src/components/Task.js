import React, { useEffect, useState } from "react";
import axios from "axios";
import CreateTask from "./CreateTask";
import "boxicons";

export default function Task({ date }) {
  const [tasks, setTasks] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
  const [showCreateTask, setShowCreateTask] = useState(false);
  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/task", {
        params: { date },
      });
      console.log(response.data.data);
      setTasks(response.data.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };
  useEffect(() => {
    if (date) {
      fetchTasks();
    }
  }, [date]);

  const deleteTask = async (taskID) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/task/${taskID}`
      );
      if (response.data.success) {
        setTasks((prevTasks) => prevTasks.filter((task) => task._id != taskID));
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const updateTask = async (taskID, currentStatus) => {
    const updatedStatus = !currentStatus;
    try {
      const response = await axios.patch(
        `http://localhost:5000/api/task/${taskID}`,
        { status: updatedStatus }
      );

      if (response.data.success) {
        fetchTasks();
      }
    } catch (error) {
      console.log("Error sending data:", error);
    }
  };

  return (
    <div className="task-box">
      {showCreateTask && (
        <div className="modal-overlay">
          <CreateTask
            refreshTasks={fetchTasks}
            date={date}
            closeForm={() => setShowCreateTask(false)}
          />
        </div>
      )}
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            <div className="task">
              <div
                className="name"
                style={{ color: task.status ? "green" : "red" }}
              >
                {task.name}
              </div>
            </div>
            <div className="btns">
              <box-icon
                name={task.status ? "checkbox-checked" : "checkbox"}
                size="30px"
                className="btn"
                onClick={() => updateTask(task._id, task.status)}
              ></box-icon>
              <box-icon
                name="x-circle"
                color="#ae0022"
                className="btn"
                onClick={() => deleteTask(task._id)}
              ></box-icon>
            </div>
          </li>
        ))}
      </ul>
      <button onClick={() => setShowCreateTask(true)} className="Add-btn">
        <box-icon
          type="regualar"
          color="turquoise"
          size="md"
          name={isHovered ? "plus-circle" : "plus"}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{ cursor: "pointer" }}
        ></box-icon>
      </button>
    </div>
  );
}
