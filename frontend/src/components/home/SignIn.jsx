import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/authProvider";

function SignIn() {
  const [authUser, setAuthUser] = useAuth();
  const { register, handleSubmit } = useForm();

  const onSubmit = async ({ email, password }) => {
    try {
      const response = await fetch("/api/user/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (response.status === 400) {
        toast.error("User not found");
        return;
      }
      if (response.status === 500) {
        toast.error("Invalid authentication credentials");
        return;
      }

      if (response.ok) {
        const responseData = await response.json();
        toast.success("User logged in successfully");
        localStorage.setItem("ChatAppUser", JSON.stringify(responseData));
        setAuthUser(responseData); // Use responseData, not response.data
        window.location.reload();
      }
    } catch (error) {
      console.log(error)
      toast.error(`Network errorr Please try again.`);
    }
  };

  return (
    <div className="bg-gray-900 h-screen w-screen flex flex-col items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="border-2 border-gray-700 bg-gray-800 p-8 rounded-lg shadow-lg w-96 flex flex-col"
      >
        <h1 className="text-white text-center text-2xl font-bold mb-4">
          Chat <span className="text-green-600">App</span>
        </h1>
        <h2 className="text-white">SignIn</h2>
        <div className="flex flex-col gap-4 mt-4">
          {/* Email field */}
          <label className="input validator">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
              </g>
            </svg>
            <input
              type="email"
              placeholder="mail@site.com"
              {...register("email", { required: true })}
            />
          </label>
          {/* Password field */}
          <label className="input validator">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
              </g>
            </svg>
            <input
              type="password"
              required
              placeholder="password"
              minLength={8}
              {...register("password", { required: true })}
            />
          </label>
          <input
            type="submit"
            value="Sign In"
            className="bg-green-500 text-white rounded py-2 px-3 cursor-pointer"
          />
        </div>
        <div className="items-center flex justify-center mt-2">
          <p className="text-gray-400">Don't have an account?</p>
          <Link to="/signup" className="text-blue-500 cursor-pointer ml-1">
            SignUp
          </Link>
        </div>
      </form>
    </div>
  );
}

export default SignIn;
