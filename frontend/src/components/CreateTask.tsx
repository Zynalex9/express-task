import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Bounce, toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

interface FormData {
  title: string;
  description: string;
}

const CreateTask = () => {
  const [apiResponse, setApiResponse] = useState({});
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
  } = useForm<FormData>({
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      const response = await axios.post("/api/task/create-task", data);
      setApiResponse(response);
      console.log(response.data);
      reset();

      // Trigger the toast notification
      toast.success(response.data.message, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    } catch (error:any) {
      toast.error(error.response.data.message, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  return (
    <div>
      <h1>Add Todo</h1>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            {...register("title", {
              required: "Please enter a title",
              minLength: {
                value: 6,
                message: "Title must be 6 characters long",
              },
            })}
            id="title"
          />
          {errors.title && <p className="text-red-600">{errors.title.message}</p>}

          <label htmlFor="description">Description</label>
          <input
            type="text"
            {...register("description", {
              required: "Please enter a description",
              minLength: {
                value: 10,
                message: "Description must be 10 characters long",
              },
            })}
          />
          {errors.description && (
            <p className="text-red-600">{errors.description.message}</p>
          )}

          <button type="submit" className={`${isSubmitting ? "cursor-not-allowed": "cursor-pointer"}`} disabled={isSubmitting}>
            Add Todo
          </button>
        </form>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default CreateTask;
