import React from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/authProvider";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";

const SignUp = React.memo(() => {
  const [, setAuthUser] = useAuth();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  // Fast password confirmation validation
  const confirmPasswordValidate = (value) =>
    watch("Password") !== value ? "Your passwords do not match" : true;

  const onSubmit = async ({ fullname, email, Password, confirmPassword }) => {
    const userInfo = {
      fullname,
      email,
      password: Password,
      confirmPassword,
    };

    try {
      const response = await fetch("/api/user/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userInfo),
      });

      if (response.status === 500) {
        toast.error("User already exists");
        return;
      }

      if (response.ok) {
        const responseData = await response.json();
        toast.success("User registered successfully");
        localStorage.setItem("ChatAppUser", JSON.stringify(responseData));
        setAuthUser(responseData);
        window.location.reload();
      }
    } catch {
      toast.error("Error registering user. Please try again.");
    }
  };

  return (
    <div className="bg-gray-900 h-screen w-screen flex flex-col items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="border-2 border-gray-700 bg-gray-800 p-8 rounded-lg shadow-lg w-96 flex flex-col"
      >
        <h1 className="text-white text-center text-2xl font-bold mb-4">
          Chat <span className="text-green-400">App</span>
        </h1>
        <h2 className="text-white">SignUp</h2>
        <div className="flex flex-col gap-4 mt-4">
          {/* Fullname Field */}
          <label className="input validator">
            <input
              type="text"
              placeholder="fullname"
              {...register("fullname", { required: true })}
            />
          </label>
          {errors.fullname && (
            <span className="text-red-400">This field is required</span>
          )}

          {/* Email Field */}
          <label className="input validator">
            <input
              type="email"
              placeholder="Email"
              {...register("email", { required: true })}
            />
          </label>
          {errors.email && (
            <span className="text-red-400">This field is required</span>
          )}

          {/* Password Field */}
          <label className="input validator">
            <input
              type="password"
              placeholder="Password"
              {...register("Password", { required: true, minLength: 8 })}
            />
          </label>
          {errors.Password && (
            <span className="text-red-400">Password is required (min 8 chars)</span>
          )}

          {/* Confirm Password Field */}
          <label className="input validator">
            <input
              type="password"
              placeholder="Confirm Password"
              {...register("confirmPassword", {
                required: true,
                validate: confirmPasswordValidate,
              })}
            />
          </label>
          {errors.confirmPassword && (
            <span className="text-red-400">
              {errors.confirmPassword.message}
            </span>
          )}

          <input
            value="SignUp"
            type="submit"
            className="bg-green-500 text-white rounded py-3 px-3 cursor-pointer"
          />
        </div>
        <div className="flex-col justify-between">
          <p className="text-zinc-400 text-center mt-4">
            Already have an account?{" "}
            <Link to="/signin" className="text-blue-500">
              SignIn
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
});

export default SignUp;