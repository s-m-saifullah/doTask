import React from "react";

const CompletedTask = ({ sl, singleTask, handleIncomplete }) => {
  const { _id, task } = singleTask;
  return (
    <div className="flex justify-between py-2 px-5 mb-4 border-2 rounded-md hover:bg-slate-400">
      <p className="line-through">
        {sl}. {task}
      </p>
      <div
        onClick={() => handleIncomplete(_id)}
        className="cursor-pointer text-sky-700"
      >
        <p>Mark Incomplete</p>
      </div>
    </div>
  );
};

export default CompletedTask;
