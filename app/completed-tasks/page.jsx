"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import CompletedTask from "./CompletedTask";

const CompletedTasks = () => {
  const [completedTasks, setCompletedTask] = useState([]);
  const [loading, setLoading] = useState(true);

  //   Load completed tasks
  useEffect(() => {
    setLoading(true);
    fetch("https://do-task-server.vercel.app/tasks?q=completed")
      .then((res) => res.json())
      .then((data) => {
        setCompletedTask(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  //   Incomplete A Task
  const handleIncomplete = (id) => {
    const consent = confirm("Do you want to mark the task as incomplete?");

    if (consent) {
      const remainingCompletedTasks = completedTasks.filter(
        (task) => task._id !== id
      );
      setCompletedTask(remainingCompletedTasks);
    }

    fetch(`https://do-task-server.vercel.app/tasks/${id}?completed=false`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          toast.success("Task Marked as Incomplete");
        }
      });
  };

  return (
    <div className="my-10 flex justify-center container mx-auto">
      <div className="w-11/12 md:w-1/2 shadow-2xl p-10 rounded-lg">
        <h2 className="mb-5 text-center text-4xl font-bold">Completed Tasks</h2>
        <div>
          {loading ? (
            <p>Loading...</p>
          ) : completedTasks.length === 0 ? (
            <h3 className="text-center text-lg">
              No Completed Task Found.{" "}
              <Link className="text-sky-700" href="/my-tasks">
                Complete Some Tasks First.
              </Link>
            </h3>
          ) : (
            completedTasks.map((task, i) => (
              <CompletedTask
                key={task._id}
                sl={i + 1}
                singleTask={task}
                handleIncomplete={handleIncomplete}
              />
            ))
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default CompletedTasks;
