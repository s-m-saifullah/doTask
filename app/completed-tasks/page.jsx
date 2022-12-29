"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../contexts/AuthProvider";
import CompletedTask from "./CompletedTask";

const CompletedTasks = () => {
  const [completedTasks, setCompletedTask] = useState([]);
  const [loadingData, setLoadingData] = useState(true);
  const { loading, user } = useContext(AuthContext);
  const router = useRouter();

  //   Load completed tasks
  useEffect(() => {
    setLoadingData(true);
    fetch("https://do-task-server.vercel.app/tasks?q=completed")
      .then((res) => res.json())
      .then((data) => {
        setCompletedTask(data);
        setLoadingData(false);
      })
      .catch((err) => {
        console.log(err);
        setLoadingData(false);
      });
  }, []);

  if (loadingData) {
    return <h3>Loading...</h3>;
  }

  if (!user) {
    return router.push("/");
  }

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
      <div className="w-full md:w-1/2 lg:w-1/3 shadow-2xl mx-2 p-5 md:p-10 rounded-lg">
        <h2 className="mb-5 text-center text-4xl font-bold">Completed Tasks</h2>
        <div>
          {loadingData ? (
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
    </div>
  );
};

export default CompletedTasks;
