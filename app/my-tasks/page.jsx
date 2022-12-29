"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../contexts/AuthProvider";
import Task from "./Task";

const MyTasks = () => {
  const [myTasks, setMyTasks] = useState([]);
  const [loadingData, setLoadingData] = useState(true);
  const { user, loading } = useContext(AuthContext);
  const router = useRouter();

  //   Load incomplete tasks
  useEffect(() => {
    setLoadingData(true);
    fetch("https://do-task-server.vercel.app/tasks?q=incomplete")
      .then((res) => res.json())
      .then((data) => {
        setMyTasks(data);
        setLoadingData(false);
      })
      .catch((err) => {
        console.log(err);
        setLoadingData(false);
      });
  }, []);

  if (loading) {
    return <h3>Loading...</h3>;
  }

  if (!user) {
    return router.push("/");
  }

  // Delete a task
  const handleDelete = (id) => {
    const consent = confirm("Do you want to remove the task?");

    if (consent) {
      const remainingTasks = myTasks.filter((task) => task._id !== id);
      setMyTasks(remainingTasks);

      fetch(`https://do-task-server.vercel.app/tasks/${id}`, {
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

      fetch(`https://do-task-server.vercel.app/tasks/${id}?completed=true`, {
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
      <div className="w-full md:w-1/2 lg:w-1/3 shadow-2xl mx-2 p-5 md:p-10 rounded-lg">
        <h2 className="mb-5 text-center text-4xl font-bold">My Tasks</h2>
        <div>
          {loadingData ? (
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
    </div>
  );
};

export default MyTasks;
