"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import Task from "./Task";

const MyTasks = () => {
  const [myTasks, setMyTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  //   Load incomplete tasks
  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:5000/tasks?q=incomplete")
      .then((res) => res.json())
      .then((data) => {
        setMyTasks(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  // Delete a task
  const handleDelete = (id) => {
    const consent = confirm("Do you want to remove the task?");

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

  //   Mark a task as complete
  const handleMarkComplete = (id) => {
    const consent = confirm("Do you want to mark the task as completed?");

    if (consent) {
      const remainingTasks = myTasks.filter((task) => task._id !== id);
      setMyTasks(remainingTasks);

      fetch(`http://localhost:5000/tasks/${id}?completed=true`, {
        method: "PATCH",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.modifiedCount > 0) {
            toast.success("Task Completed");
          }
        });
    }
  };

  return (
    <div className="my-10 flex justify-center container mx-auto">
      <div className="w-11/12 md:w-1/2 shadow-2xl p-10 rounded-lg">
        <h2 className="mb-5 text-center text-4xl font-bold">My Tasks</h2>
        <div>
          {loading ? (
            <p>Loading...</p>
          ) : myTasks.length === 0 ? (
            <h3 className="text-center text-lg">
              No Task Found.{" "}
              <Link className="text-sky-700" href="/add-task">
                Add Some Tasks First.
              </Link>
            </h3>
          ) : (
            myTasks.map((task, i) => (
              <Task
                key={task._id}
                sl={i + 1}
                singleTask={task}
                handleMarkComplete={handleMarkComplete}
                handleDelete={handleDelete}
              />
            ))
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default MyTasks;
