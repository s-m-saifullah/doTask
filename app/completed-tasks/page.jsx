import React from "react";

const CompletedTasks = () => {
  return (
    <div className="my-10 flex justify-center container mx-auto">
      <div className="w-11/12 md:w-1/2 shadow-2xl p-10 rounded-lg">
        <h2 className="mb-5 text-center text-4xl font-bold">My Tasks</h2>
        <div>
          {myTasks.length === 0 ? (
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

export default CompletedTasks;
