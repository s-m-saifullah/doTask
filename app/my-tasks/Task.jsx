import React from "react";
import { CheckIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

const Task = ({ sl, singleTask, handleMarkComplete, handleDelete }) => {
  const { _id, task } = singleTask;
  return (
    <div className="flex justify-between py-2 px-5 mb-4 border-2 rounded-md hover:bg-slate-400">
      <p>
        {sl}. {task}
      </p>
      <div className="flex gap-3">
        <div
          onClick={() => handleMarkComplete(_id)}
          className="w-6 cursor-pointer"
        >
          <CheckIcon />
        </div>
        <div className="w-6 cursor-pointer">
          <PencilIcon />
        </div>
        <div onClick={() => handleDelete(_id)} className="w-6 cursor-pointer">
          <TrashIcon />
        </div>
      </div>
    </div>
  );
};

export default Task;
