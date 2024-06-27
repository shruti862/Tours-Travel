import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Tour from "./pages/Tour";
import Profile from "./pages/Profile";
import { createContext, useState } from "react";
import { Toaster } from "react-hot-toast";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51PWBvWCbRb0NQUhQriWEI1fIctn283V9uwRwMq0POoRC3497joCYE2FzEMH9HmeeeEVZrxnjpgZ5UXOdwnEHLbTH00UEVlJAp1"
);
export const PostContext = createContext();
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <Elements stripe={stripePromise}>
      <PostContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
        <BrowserRouter>
          <Routes>
            <Route index element={<Homepage />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="me" element={<Profile />} />

            <Route path="tour/:slug" element={<Tour />} />
          </Routes>
        </BrowserRouter>
        <div>
          <Toaster
            position="top-center"
            reverseOrder={false}
            toastOptions={{
              success: {
                duration: 3000,
              },
              // error: {
              //   duration: 5000,
              // },
              style: {
                fontSize: "16px",
                maxWidth: "500px",
                padding: "16px 24px",
                backgroundColor: "#fff",
                color: "#374151",
                marginBottom: "3px",
              },
            }}
          />
        </div>
      </PostContext.Provider>
    </Elements>
  );
}

export default App;
