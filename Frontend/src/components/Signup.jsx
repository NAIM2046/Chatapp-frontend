import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthProvider";

const Signup = () => {
  const [authUser, setAuthUser] = useAuth();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password", "");
  const confirmPassword = watch("confirmPassword", "");

  const validatePasswordMatch = (value) => {
    return value === password || "Passwords do not match";
  };

  const onSubmit = async (data) => {
    const userInfo = {
      fullname: data.fullname,
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
    };
    console.log(userInfo);
    await axios
      .post("/api/user/signup", userInfo)
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          alert("Signup successful! (No backend logic)");
        }
        localStorage.setItem("messenger", JSON.stringify(res.data));
        setAuthUser(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-lg shadow-md w-96 space-y-4"
      >
        <h1 className="text-2xl font-bold text-blue-600 text-center">
          Messenger
        </h1>
        <h2 className="text-xl text-center">
          Create a new{" "}
          <span className="text-blue-600 font-semibold">Account</span>
        </h2>

        {/* Email */}
        <div>
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            placeholder="Email"
            {...register("email", { required: "Email is required" })}
            className={`mt-1 p-2 border rounded w-full ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.email && (
            <span className="text-red-500 text-sm">{errors.email.message}</span>
          )}
        </div>

        {/* Username */}
        <div>
          <label className="block text-gray-700">Username</label>
          <input
            type="text"
            placeholder="Username"
            {...register("fullname", { required: "Username is required" })}
            className={`mt-1 p-2 border rounded w-full ${
              errors.fullname ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.fullname && (
            <span className="text-red-500 text-sm">
              {errors.fullname.message}
            </span>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            placeholder="Password"
            {...register("password", { required: "Password is required" })}
            className={`mt-1 p-2 border rounded w-full ${
              errors.password ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.password && (
            <span className="text-red-500 text-sm">
              {errors.password.message}
            </span>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-gray-700">Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm Password"
            {...register("confirmPassword", {
              required: "Confirm Password is required",
              validate: validatePasswordMatch,
            })}
            className={`mt-1 p-2 border rounded w-full ${
              errors.confirmPassword ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.confirmPassword && (
            <span className="text-red-500 text-sm">
              {errors.confirmPassword.message}
            </span>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Signup
        </button>

        {/* Link to Login */}
        <p className="text-center text-gray-600">
          Have any Account?{" "}
          <Link
            to={"/login"}
            className="text-blue-500 underline cursor-pointer ml-1"
          >
            {" "}
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
