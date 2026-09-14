import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { API_URL } from "../../src/config";

const SignUp = ({ light }) => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState({
    firstname: "",
    lastname: "",
    email: "",
  });

  const validationName = (name) => {
    if (!name.trim()) {
      return "Name is required";
    }

    if (name.trim().length < 2) {
      return "Name length is at least 2 characters";
    }

    if (name.trim().length > 20) {
      return "Name must not exceed 20 characters";
    }

    if (!/^[A-Za-z]+(?:[ '-][A-Za-z]+)*$/.test(name.trim())) {
      return "Name can contain only letters";
    }

    return "";
  }

  const validationEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!email.trim()) {
      return "Email is required";
    }

    if(!emailRegex.test(email.trim())) {
      return "Enter a valid email Address";
    }
  }

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev, [name]: value,
    }))

    if(name === "firstname" || name === "lastname") {
      const validationError = validationName(value);

      setError((prev) => ({
        ...prev, [name]: validationError
      }))
    }

    if(name === "email") {
      const validationError = validationEmail(value);

      setError((prev) => ({
        ...prev, [name]: validationError
      }))
    }

  };

  const submitData = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${API_URL}/register`, formData);
      navigate('/login');
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const color = light ? "bg-white text-black" : "bg-[#0f0f0f] text-white";
  const textMain = light ? "text-black/70" : "text-white/60";
  const textSet = light
    ? "text-white/60 placeholder:text-black/70"
    : "text-white/60 placeholder:placeholder:text-white/70";
  const background = light ? "bg-black/5" : "bg-white/5";

  return (
    <div
      className={`min-h-[85vh] px-4 py-16 mt-20 sm:mt-0 ${light ? "bg-white" : "bg-black"}`}
    >
      <div className="mx-auto w-full max-w-6xl overflow-hidden rounded-[32px] border border-white/10 shadow-[0_0_60px_rgba(255,140,0,0.08)]">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Left Side */}
          <div
            className={`relative flex flex-col justify-center px-8 py-10 sm:px-12 lg:px-16 ${color}`}
          >
            <div className="absolute left-10 top-12 opacity-20">
              <div className="space-y-3">
                <div className="h-0.5 w-16 -rotate-45 rounded-full bg-orange-500"></div>
                <div className="ml-3 h-0.5 w-14 -rotate-45 rounded-full bg-orange-500"></div>
                <div className="ml-6 h-0.5 w-12 -rotate-45 rounded-full bg-orange-500"></div>
                <div className="ml-9 h-0.5 w-10 -rotate-45 rounded-full bg-orange-500"></div>
              </div>
            </div>

            <div className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500/10 blur-[110px]"></div>

            <div className="relative z-10 max-w-lg">
              <p className={`text-lg font-medium sm:text-xl ${textMain}`}>
                Join CryptoPlace Today
              </p>

              <h1 className="mt-4 text-4xl font-extrabold leading-tight sm:text-5xl">
                <span className="bg-gradient-to-r from-orange-500 via-amber-400 to-yellow-500 bg-clip-text text-transparent">
                  Create
                </span>
                <br />
                <span>Your Account</span>
              </h1>

              <p className={`mt-5 max-w-md text-base leading-7 ${textMain}`}>
                Start exploring real-time crypto prices, market trends, and
                detailed insights through a clean and modern dashboard.
              </p>

              <div className="mt-8 flex gap-4">
                <div
                  className={`rounded-xl border border-white/10 px-5 py-3 ${background}`}
                >
                  <p className="text-xl font-bold text-orange-400">Live</p>
                  <p className={`mt-1 text-xs ${textMain}`}>Market Data</p>
                </div>

                <div
                  className={`rounded-xl border border-white/10 px-5 py-3 ${background}`}
                >
                  <p className="text-xl font-bold text-orange-400">Fast</p>
                  <p className={`mt-1 text-xs ${textMain}`}>Coin Search</p>
                </div>

                <div
                  className={`rounded-xl border border-white/10 px-5 py-3 ${background}`}
                >
                  <p className="text-xl font-bold text-orange-400">Smart</p>
                  <p className={`mt-1 text-xs ${textMain}`}>AI Access</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div
            className={`flex items-center justify-center px-6 py-10 sm:px-10 ${color}`}
          >
            <div className="w-full max-w-md rounded-[24px] border border-white/10 p-5 shadow-[0_0_30px_rgba(0,0,0,0.35)] sm:p-6">
              <div className="mb-5">
                <h2 className="text-2xl font-bold">Sign Up</h2>
                <p className="mt-2 text-sm">
                  Create your account and get started.
                </p>
              </div>

              <form onSubmit={submitData} className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <input
                      onChange={handleChange}
                      value={formData.firstname}
                      maxLength={20}
                      name="firstname"
                      type="text"
                      placeholder="First Name"
                      className={`w-full rounded-xl border border-white/10 px-4 py-3 text-sm outline-none transition focus:border-orange-500/60 focus:shadow-[0_0_12px_rgba(255,140,0,0.18)] ${textSet}`}
                    />

                    {error.firstname && (
                      <p className="mt-1 text-sm text-red-500">
                        {error.firstname}
                      </p>
                    )}
                  </div>

                  <div>
                    <input
                      onChange={handleChange}
                      value={formData.lastname}
                      maxLength={10}
                      name="lastname"
                      type="text"
                      placeholder="Last Name"
                      className={`w-full rounded-xl border border-white/10 px-4 py-3 text-sm outline-none transition focus:border-orange-500/60 focus:shadow-[0_0_12px_rgba(255,140,0,0.18)] ${textSet}`}
                    />
                    {error.lastname && (
                      <p className="mt-1 text-sm text-red-500">
                        {error.lastname}
                      </p>
                    )}
                  </div>

                </div>

                <div>
                <input
                  onChange={handleChange}
                  value={formData.email}
                  name="email"
                  type="email"
                  placeholder="📧 Email Address"
                  className={`w-full rounded-xl border border-white/10 px-4 py-3 text-sm outline-none transition focus:border-orange-500/60 focus:shadow-[0_0_12px_rgba(255,140,0,0.18)] ${textSet}`}
                />
                {error.email && (
                  <p className="mt-1 text-sm text-red-500">
                    {error.email}
                  </p>
                )}
                </div>

                <div className="flex relative">
                  <input
                    onChange={handleChange}
                    value={formData.password}
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="🔒 Password"
                    className={`w-full rounded-xl border border-white/10 px-4 py-3 text-sm outline-none transition focus:border-orange-500/60 focus:shadow-[0_0_12px_rgba(255,140,0,0.18)] ${textSet}`}
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/3 cursor-pointer"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>

                <button
                  type="submit"
                  className="flex w-full justify-center cursor-pointer rounded-xl bg-orange-600 px-4 py-3 text-sm font-semibold shadow-[0_0_20px_rgba(255,115,0,0.28)] transition duration-300 hover:scale-[1.02] hover:bg-orange-500 hover:shadow-[0_0_25px_rgba(255,115,0,0.36)]"
                >
                  Sign Up
                </button>
                <div className="flex gap-5 pl-20 items-center">
                  <p>Already have an account</p>
                  <Link className="underline" to={"/login"}>
                    Login
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
