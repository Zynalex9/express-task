import axios from "axios";
import React, { useState } from "react";
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

  const onSubmit = async (data: any) => {
    try {
      console.log(data);
      const response = await axios.post("/api/user/login", data);
      setSuccessMessage("Login successfull redirecting to homepage");

    
        setTimeout(() => {
          navigate("/");
        }, 1000);
      
    } catch (error:any) {
          console.error("Unexpected error:", error.response?.data || error.message);

    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email">Email or Username</label>
        <input
          type="text"
          {...register("email", {
            required: "Please enter a email or username",
          })}
          id="email"
        />
        {errors.email && <p className="text-red-600">{errors.email.message}</p>}
        <label htmlFor="password">Password</label>
        <input
          type="password"
          {...register("password", {
            required: "Please enter a password",
          })}
        />
        {errors.password && (
          <p className="text-red-600">{errors.password.message}</p>
        )}
        <button type="submit" disabled={isSubmitting}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
