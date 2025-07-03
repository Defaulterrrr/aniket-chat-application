import React from "react";
import "./App.css"; // Importing the main CSS file
import "./index.css"; // Importing the index CSS file
import Left from "./components/leftside/Left";
import Right from "./components/rightside/Right";
import SignUp from "./components/home/SignUp";
import { Toaster } from "react-hot-toast"; // Importing react-hot-toast for notifications
import UseGetAllUsers from "./context/UseGetAllUsers.jsx";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "./context/authProvider.jsx"; // Importing the Auth context
import SignIn from "./components/home/SignIn.jsx";
// import SignIn from "./components/home/SignIn";

function App() {
  // const [authUser, setAuthUser] = useAuth(); // State to store user data
  const [authUser, setAuthUser] = useAuth(); // State to store user data
  console.log("authentication", authUser);
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            authUser ? (
              <div className="w-[100%] flex h-screen ">
                <Left/>
                <Right/>
              </div>
            ) : (
              <SignIn />
            )
          }
        />

        <Route
          path="/signup"
          element={authUser ? <Navigate to={"/"} /> : <SignUp />}
        />
        <Route
          path="/signin"
          element={authUser ? <Navigate to={"/"} /> : <SignIn />}
        />

        <Route path="/allusers" element={<UseGetAllUsers />} />
      </Routes>
      <Toaster /> {/*Toast notifications*/}
    </>
  );
}

export default App;
