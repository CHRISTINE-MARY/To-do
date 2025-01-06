import React, { useState } from "react";
import axios from "axios";

export default function CreateTask({ refreshTasks, date, closeForm }) {
  const [taskName, setName] = useState("");

  const handleInputChange = (e) => {
    setName(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/task", {
        name: taskName,
        deadline: date,
        status: false,
      });
      console.log(taskName, date);
      if (response.data.success) {
        refreshTasks();
        closeForm();
        console.log(response.data.data);
      }
    } catch (error) {
      console.error("Error creating task", error);
    }
  };

  return (
    <section className="pop-up">
      <div className="top">
        <button class="close-btn">
          <box-icon
            type="solid"
            name="x-circle"
            onClick={closeForm}
            color="yellow"
          ></box-icon>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="bottom">
        <input
          type="text"
          onChange={handleInputChange}
          value={taskName}
          required
        ></input>
        <input type="submit" value="Add Task" />
      </form>
    </section>
  );
}
