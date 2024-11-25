import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
interface FormData {
  email: string;
  password: string;
}
const Login = () => {
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<FormData>({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorrMessage] = useState("");

  const onSubmit = async (data: any) => {
    try {
      console.log(data);
      const response = await axios.post("/api/user/login", data);
      setSuccessMessage("Login successfull redirecting to homepage");
      console.log("This is my console", response.data.message);
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error: any) {
      console.error(
        "Unexpected error:",
        error.response?.data.message || error.message,
      );
      setErrorrMessage(error.response?.data.message);
    }
  };
  return (
    <div className="min-h-[90vh] flex flex-col items-center justify-center bg-white dark:bg-gray-900">
      <h1 className="text-4xl font-bold mb-8 text-gray-800 dark:text-white">Login to Todois</h1>
      <div className="form bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-md">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <label htmlFor="email" className="text-gray-700 dark:text-white text-lg font-semibold">Email or Username</label>
        <input
          type="text"
          {...register("email", {
            required: "Please enter a email or username",
          })}
          id="email"
          className="w-full px-4 py-2 border-2 mt-1 border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
        />
        {errors.email && <p className="text-red-600">{errors.email.message}</p>}
        <label htmlFor="password" className="text-gray-700 dark:text-white text-lg font-semibold">Password</label>
        <input
          type="password"
          {...register("password", {
            required: "Please enter a password",
          
          })}
          id="password"
          className="w-full px-4 py-2 border-2 mt-1 border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
        />
        {errors.password && (
          <p className="text-red-600">{errors.password.message}</p>
        )}
        {successMessage && <p className="text-green-600">{successMessage}</p>}                
        {errorMessage && <p className="text-red-600">{errorMessage}</p>}                
        <button type="submit" disabled={isSubmitting} className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 transition">
          Login
        </button>
      </form>
    </div>
      </div>
  );
};

export default Login;
