import React, { useEffect, useState } from "react";
import Todo from "../components/Todo";
import axios from "axios";

interface Task {
  title: string;
  description: string;
  isCompleted?: boolean;
  updatedAt?: Date;
  createdAt?: Date;
}

const AllTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    async function getTask() {
      try {
        const response = await axios.get("/api/task/all-todos");
        setTasks(response.data.todos);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    }
    getTask();
  }, []);

  return (
    <div className="w-full flex flex-wrap gap-4 items-start justify-center dark:bg-gray-900 bg-gray-50 py-6 min-h-screen">
      {tasks.length > 0 ? (
        tasks.map((task: Task, index) => <Todo key={index} task={task} />)
      ) : (
        <p className="text-center text-gray-600 dark:text-gray-400 w-full">
          No tasks to display.
        </p>
      )}
    </div>
  );
};

export default AllTasks;
