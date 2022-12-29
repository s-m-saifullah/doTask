"use client";
import React, { useRef, useState } from "react";
import { CheckIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { toast } from "react-toastify";

const Task = ({ sl, singleTask, handleMarkComplete, handleDelete }) => {
  const [localTask, setLocalTask] = useState(singleTask.task);
  const [editMode, setEditMode] = useState(false);
  const inputRef = useRef();

  //   Edit a Task
  const handleEditModeOn = () => {
    setEditMode(true);
    inputRef.current.focus();
  };

  const handleEdit = (e, id) => {
    e.preventDefault();
    const task = e.target.task.value;
    const taskData = {
      task: task,
    };

    setEditMode(false);
    if (task !== localTask) {
      setLocalTask(task);
      fetch(`https://do-task-server.vercel.app/tasks/edit/${id}`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(taskData),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.modifiedCount > 0) {
            toast.success("Task Edited");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const { _id } = singleTask;

  return (
    <div
      className={`flex justify-between py-2 px-5 mb-4 border-2 rounded-md ${
        editMode ? "hover:bg-white ring-2 ring-black" : "hover:bg-slate-400"
      }`}
    >
      <div className={`w-full ${editMode ? "flex" : "hidden"}`}>
        <span className="mr-1 py-1"> {sl}. </span>
        <form
          onSubmit={(e) => handleEdit(e, _id)}
          className="w-full flex justify-between gap-1"
        >
          <input
            ref={inputRef}
            name="task"
            className="focus:outline-0 bg-inherit w-full"
            type="text"
            defaultValue={localTask}
          />
          <div className="flex gap-1 md:gap-3">
            <button
              type="submit"
              className="py-1 px-2 rounded bg-green-500 text-white"
            >
              Update
            </button>
            <button
              onClick={() => setEditMode(!editMode)}
              className="py-1 px-2 rounded bg-red-600 text-white"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
      <div className={`${editMode ? "hidden" : "flex justify-between w-full"}`}>
        <p>
          <span>{sl}.</span> <span>{localTask}</span>
        </p>
        <div className="flex gap-1 md:gap-3">
          <div
            onClick={() => handleMarkComplete(_id)}
            className="w-6 cursor-pointer"
          >
            <CheckIcon />
          </div>
          <div
            onClick={() => {
              handleEditModeOn();
            }}
            className="w-6 p-1 cursor-pointer"
          >
            <PencilIcon />
          </div>
          <div onClick={() => handleDelete(_id)} className="w-6 cursor-pointer">
            <TrashIcon />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Task;
