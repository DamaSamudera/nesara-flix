import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackgroundImage from "../assets/background_banner.jpg";
import useAuthContext from "../hooks/useAuthContext";
import FormAuth from "../components/FormAuth";
import Logo from "../assets/Logo.png";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuthContext();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      toast.success("Login Success");
      navigate("/");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unknown error occurred");
      }
    }
  };
  return (
    <>
      <div className="w-full h-screen">
        <img
          className="hidden sm:block absolute w-full h-full object-cover"
          src={BackgroundImage}
          alt="/"
        />
        <div className="bg-black/60 fixed top-0 left-0 w-full h-screen"></div>
        <div className="fixed w-full px-4 z-50">
          <div className="max-w-[450px] h-[550px] mx-auto my-8 py-2 bg-black/75 text-white">
            <img className="mx-auto h-20" src={Logo} />
            <div className="max-w-[320px] mx-auto py-4">
              <h1 className="text-3xl font-bold">Sign In</h1>
              <FormAuth
                handleSubmit={handleSubmit}
                setEmail={setEmail}
                setPassword={setPassword}
                type="signIn"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
