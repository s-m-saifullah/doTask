"use client";
import { useRouter } from "next/navigation";
import React, { useContext } from "react";
import { toast, ToastContainer } from "react-toastify";
import { AuthContext } from "../contexts/AuthProvider";
import Spinner from "../Spinner";

const AddTask = () => {
  const { user, loading } = useContext(AuthContext);
  const router = useRouter();

  if (loading) {
    return (
      <div className="min-h-[90vh] grid place-items-center">
        <Spinner />
      </div>
    );
  }

  if (!user) {
    return router.push("/");
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const task = form.task.value;
    const time = form.date.value;
    const dateTime = new Date(time);
    const toTimestamp = dateTime.getTime();

    const taskData = {
      user: user.displayName,
      email: user.email,
      task: task,
      taskTime: toTimestamp,
      completed: false,
    };

    fetch("https://do-task-server.vercel.app/tasks", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(taskData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          toast.success("Task Added");
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="my-10 flex justify-center container mx-auto">
      <div className="w-11/12 md:w-1/2 lg:w-1/3 shadow-2xl p-10 rounded-lg">
        <h2 className="mb-5 text-center text-4xl font-bold">Add Task</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label htmlFor="task" className="block text-lg font-medium">
              Your Task:
            </label>
            <input
              type="text"
              name="task"
              className="border-2 w-full rounded-md text-lg px-2 py-1"
            />
          </div>
          <div className="mb-5">
            <label htmlFor="date" className="block text-lg font-medium">
              Choose date and Time
            </label>
            <input
              name="date"
              type="datetime-local"
              placeholder="dd-mm-yyyy"
              className="border-2 w-full rounded-md text-lg px-2 py-1"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-emerald-800 py-2 px-3 rounded text-white"
          >
            Add Task
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddTask;
