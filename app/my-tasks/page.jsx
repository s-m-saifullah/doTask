"use client";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import Task from "./Task";

const MyTasks = () => {
  const [myTasks, setMyTasks] = useState([]);
  const [localMyTasks, setLocalMyTasks] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/tasks")
      .then((res) => res.json())
      .then((data) => {
        setMyTasks(data);
        setLocalMyTasks(data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    const consent = confirm("Do you want to remove the task");

    if (consent) {
      const remainingTasks = myTasks.filter((task) => task._id !== id);
      setMyTasks(remainingTasks);

      fetch(`http://localhost:5000/tasks/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.deletedCount > 0) {
            toast.success("Task Deleted");
          }
        });
    }
  };
  return (
    <div className="my-10 flex justify-center container mx-auto">
      <div className="w-11/12 md:w-1/2 shadow-2xl p-10 rounded-lg">
        <h2 className="mb-5 text-center text-4xl font-bold">My Tasks</h2>
        <div>
          {myTasks.map((task, i) => (
            <Task
              key={task._id}
              sl={i + 1}
              singleTask={task}
              handleDelete={handleDelete}
            />
          ))}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default MyTasks;
