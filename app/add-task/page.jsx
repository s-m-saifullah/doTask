"use client";
import React from "react";
import { toast, ToastContainer } from "react-toastify";

const AddTask = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target.date.value);
    const toTimestamp = new Date(e.target.date.value);
    console.log(toTimestamp);
    toast("Wow! It works");
  };
  return (
    <div className="my-10 flex justify-center container mx-auto">
      <div className="w-1/3 shadow-2xl p-10 rounded-lg">
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
