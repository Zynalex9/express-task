import React from "react";

interface Task {
  title: string;
  description: string;
  isCompleted?: boolean;
  updatedAt?: Date;
  createdAt?: Date;
}

interface TodoProps {
  task: Task;
}

const Todo: React.FC<TodoProps> = ({ task }: TodoProps) => {
  return (
    <div className="flex flex-col border border-blue-500 dark:border-gray-700 w-[30%] rounded-lg dark:bg-gray-800 bg-gray-50 shadow-md p-4 hover:scale-105 transform transition duration-300 ease-in-out">
      <h1 className="text-lg font-bold text-blue-600 dark:text-blue-400 mb-2">
        {task.title}
      </h1>
      <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
        {task.description}
      </p>
      {task.isCompleted !== undefined && (
        <p className={`text-sm font-semibold ${task.isCompleted ? "text-green-500" : "text-red-500"}`}>
          {task.isCompleted ? "Completed" : "Pending"}
        </p>
      )}
      {task.updatedAt && (
        <p className="text-xs text-gray-500 mt-2">
          Last Updated: {new Date(task.updatedAt).toLocaleDateString()}
        </p>
      )}
    </div>
  );
};

export default Todo;
