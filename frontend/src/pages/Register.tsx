import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

interface FormData {
  username: string;
  email: string;
  password: string;
}

const Register = () => {
  const [responseError, setResponseError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: any) => {
    try {
      const response = await axios.post("/api/user/register", data);
      console.log(response.data);
      setSuccessMessage("Registrating successfull redirecting to homepage");
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (error: any) {
      if (error.response && error.response.data) {
        setResponseError(error.response.data.message);
      } else {
        setResponseError("An unexpected error occurred");
      }
    }
  };
  return (
    <div className="min-h-[90vh] flex flex-col items-center justify-center bg-white dark:bg-gray-900">
      <h1 className="text-4xl font-bold mb-8 text-gray-800 dark:text-white">
        Register at Todois
      </h1>
      <div className="form bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-md">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="text-gray-700 dark:text-white text-lg font-semibold"
            >
              Username
            </label>
            <input
              className="w-full px-4 py-2 mt-1 border-2 border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              type="text"
              {...register("username", {
                required: "Please enter a username",
                minLength: {
                  value: 6,
                  message: "Username must be 6 characters long",
                },
              })}
              id="username"
            />
            {errors.username && (
              <p className="text-red-500 text-sm">{errors.username.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="text-gray-700 dark:text-white text-lg font-semibold"
            >
              Email
            </label>
            <input
              className="w-full px-4 py-2 mt-1 border-2 border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              type="email"
              {...register("email", {
                required: "Please enter your email",
              })}
              id="email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="text-gray-700 dark:text-white text-lg font-semibold"
            >
              Password
            </label>
            <input
              className="w-full px-4 py-2 mt-1 border-2 border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              type="password"
              {...register("password", {
                required: "Please enter your password",
                minLength: {
                  value: 6,
                  message: "Password must be 6 characters long",
                },
              })}
              id="password"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>
          {responseError && (
            <p className="text-red-500 text-sm">{responseError}</p>
          )}
          {successMessage && (
            <p className="text-green-500 text-sm">{successMessage}</p>
          )}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
