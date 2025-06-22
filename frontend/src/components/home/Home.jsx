import SignUp from "./SignUp";
import SignIn from "./SignIn";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
function Home() {
  // Log the authUser state to the console
  return (
    <Routes>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
    </Routes>
  );
}

export default Home;
