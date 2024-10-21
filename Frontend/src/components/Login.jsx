import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthProvider";
const Login = () => {
  const [authUser, setAuthUser] = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // Handle login logic here (e.g., API call)
    const userInfo = {
      email: data.email,
      password: data.password,
    };
    axios
      .post("/api/user/login", userInfo)
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          alert(" Login successful! (No backend logic)");
        }
        localStorage.setItem("messenger", JSON.stringify(res.data));
        setAuthUser(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="border border-gray-300 px-6 py-4 rounded-md shadow-md space-y-4 w-96"
      >
        <h1 className="text-2xl text-blue-600 font-bold">Messenger</h1>
        <h2 className="text-xl">
          Login with your{" "}
          <span className="text-blue-600 font-semibold">Account</span>
        </h2>

        {/* Email */}
        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
            <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
          </svg>
          <input
            type="email"
            className="grow border rounded-md px-2 py-1"
            placeholder="Email"
            {...register("email", { required: true })}
          />
        </label>
        {errors.email && (
          <span className="text-red-500 text-sm font-semibold">
            This field is required
          </span>
        )}

        {/* Password */}
        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd"
            />
          </svg>
          <input
            type="password"
            className="grow border rounded-md px-2 py-1"
            placeholder="Password"
            {...register("password", { required: true })}
          />
        </label>
        {errors.password && (
          <span className="text-red-500 text-sm font-semibold">
            This field is required
          </span>
        )}

        {/* Submit Button */}
        <div className="flex justify-center">
          <input
            type="submit"
            value="Login"
            className="text-white bg-blue-600 cursor-pointer w-full rounded-lg py-2"
          />
        </div>

        {/* Link to Signup */}
        <p className="text-center">
          Don't have an Account?{" "}
          <Link
            to={"/signup"}
            className="text-blue-500 underline cursor-pointer ml-1"
          >
            {" "}
            Signup
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
