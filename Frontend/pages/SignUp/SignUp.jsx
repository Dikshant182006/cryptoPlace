import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  FaEye,
  FaEyeSlash,
  FaUser,
  FaEnvelope,
  FaLock,
  FaArrowRight,
  FaBolt,
  FaBrain,
  FaShieldAlt,
  FaGoogle,
  FaGithub,
} from "react-icons/fa";
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
    password: "",
  });

  const [serverError, setServerError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(true);

  const navigate = useNavigate();

  const validationName = (name) => {
    if (!name.trim()) {
      return "Name is required";
    }
    if (name.trim().length < 2) {
      return "Name must be at least 2 characters";
    }
    if (name.trim().length > 20) {
      return "Name must not exceed 20 characters";
    }
    if (!/^[A-Za-z]+(?:[ '-][A-Za-z]+)*$/.test(name.trim())) {
      return "Name can contain only letters";
    }
    return "";
  };

  const validationEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      return "Email is required";
    }
    if (!emailRegex.test(email.trim())) {
      return "Enter a valid email address";
    }
    return "";
  };

  const validationPassword = (password) => {
    if (!password) {
      return "Password is required";
    }
    if (password.length < 6) {
      return "Password must be at least 6 characters";
    }
    return "";
  };

  // Calculate password strength (0 to 3)
  const getPasswordStrength = (pass) => {
    if (!pass) return 0;
    let score = 0;
    if (pass.length >= 6) score++;
    if (pass.length >= 10 || /[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass) && /[^A-Za-z0-9]/.test(pass)) score++;
    return score;
  };

  const passwordStrength = getPasswordStrength(formData.password);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setServerError("");

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "firstname" || name === "lastname") {
      const validationError = validationName(value);
      setError((prev) => ({
        ...prev,
        [name]: validationError,
      }));
    }

    if (name === "email") {
      const validationError = validationEmail(value);
      setError((prev) => ({
        ...prev,
        [name]: validationError,
      }));
    }

    if (name === "password") {
      const validationError = validationPassword(value);
      setError((prev) => ({
        ...prev,
        [name]: validationError,
      }));
    }
  };

  const submitData = async (e) => {
    e.preventDefault();
    setServerError("");

    const fnError = validationName(formData.firstname);
    const lnError = validationName(formData.lastname);
    const emError = validationEmail(formData.email);
    const pwError = validationPassword(formData.password);

    if (fnError || lnError || emError || pwError) {
      setError({
        firstname: fnError,
        lastname: lnError,
        email: emError,
        password: pwError,
      });
      return;
    }

    if (!agreedToTerms) {
      setServerError("Please accept the Terms of Service to proceed.");
      return;
    }

    setIsLoading(true);
    try {
      await axios.post(`${API_URL}/register`, formData);
      navigate("/login");
    } catch (err) {
      console.error(err);
      const msg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Registration failed. Email might already be in use.";
      setServerError(typeof msg === "string" ? msg : "Registration failed.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`w-full min-h-screen lg:h-screen lg:overflow-hidden py-4 sm:py-6 lg:py-0 flex flex-col justify-center relative overflow-x-hidden no-scrollbar transition-colors duration-300 ${
        light ? "bg-[#f8fafc] text-slate-900" : "bg-[#070709] text-white"
      }`}
    >
      {/* Background Matrix & Tech Grid */}
      <div
        className={`absolute inset-0 pointer-events-none ${
          light
            ? "bg-[radial-gradient(#0000000a_1px,transparent_1px)]"
            : "bg-[radial-gradient(#ffffff0a_1px,transparent_1px)]"
        } [background-size:32px_32px]`}
      />

      {/* Radiant Ambient Glow Elements */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-orange-500/20 blur-[130px] pointer-events-none" />
      <div className="absolute top-1/2 -right-32 w-96 h-96 rounded-full bg-amber-500/15 blur-[150px] pointer-events-none" />
      <div className="absolute -bottom-32 left-1/3 w-[32rem] h-[32rem] rounded-full bg-orange-600/10 blur-[160px] pointer-events-none" />

      {/* Main Full-Page Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 xl:gap-12 items-center">

          {/* ================= LEFT SIDE: CRYPTO SHOWCASE & BRAND HERO ================= */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-3 xl:space-y-5">

            {/* Live Engine Status Badge */}
            <div className="inline-flex items-center gap-2 w-fit px-3 py-1 xl:px-4 xl:py-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 backdrop-blur-md">
              <span className="relative flex h-2 w-2 xl:h-2.5 xl:w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 xl:h-2.5 xl:w-2.5 bg-emerald-500"></span>
              </span>
              <span className="text-xs xl:text-sm font-semibold tracking-wide text-orange-400">
                Live Market Engine v2.4 • 99.99% Uptime
              </span>
            </div>

            {/* Hero Headlines */}
            <div className="space-y-1.5 xl:space-y-2.5">
              <h1 className="text-2xl sm:text-3xl lg:text-[2.2rem] xl:text-5xl font-black tracking-tight leading-[1.15]">
                Master The Market With{" "}
                <span className="bg-gradient-to-r from-orange-500 via-amber-400 to-yellow-400 bg-clip-text text-transparent">
                  CryptoPlace
                </span>
              </h1>
              <p
                className={`text-xs xl:text-sm max-w-xl leading-relaxed ${
                  light ? "text-slate-600" : "text-white/70"
                }`}
              >
                Join over 180,000+ traders accessing institutional-grade price feeds,
                predictive AI sentiment, and ultra-fast portfolio tracking — all inside one unified terminal.
              </p>
            </div>

            {/* Live Market Mini-Ticker Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 xl:gap-3.5 pt-0.5">
              {/* Bitcoin Card */}
              <div
                className={`p-3 xl:p-4 rounded-2xl border backdrop-blur-md transition-all duration-300 hover:scale-[1.02] ${
                  light
                    ? "bg-white/80 border-slate-200/80 shadow-md shadow-slate-200/50"
                    : "bg-white/[0.04] border-white/10 hover:border-orange-500/30 shadow-lg shadow-black/40"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 xl:w-7 xl:h-7 rounded-full bg-amber-500/20 text-amber-500 font-black text-xs flex items-center justify-center">
                      ₿
                    </span>
                    <span className="font-bold text-xs xl:text-sm">Bitcoin</span>
                  </div>
                  <span className="text-[11px] xl:text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400">
                    +4.82%
                  </span>
                </div>
                <div className="mt-2 xl:mt-3 flex items-baseline justify-between">
                  <span className="text-base xl:text-lg font-extrabold tracking-tight">$96,420</span>
                  {/* Mini Sparkline SVG */}
                  <svg className="w-14 h-5 xl:w-16 xl:h-6 stroke-emerald-400 fill-none" viewBox="0 0 60 20">
                    <path
                      d="M2 16 L12 14 L22 17 L32 9 L42 12 L52 4 L58 5"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>

              {/* Ethereum Card */}
              <div
                className={`p-3 xl:p-4 rounded-2xl border backdrop-blur-md transition-all duration-300 hover:scale-[1.02] ${
                  light
                    ? "bg-white/80 border-slate-200/80 shadow-md shadow-slate-200/50"
                    : "bg-white/[0.04] border-white/10 hover:border-orange-500/30 shadow-lg shadow-black/40"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 xl:w-7 xl:h-7 rounded-full bg-indigo-500/20 text-indigo-400 font-black text-xs flex items-center justify-center">
                      Ξ
                    </span>
                    <span className="font-bold text-xs xl:text-sm">Ethereum</span>
                  </div>
                  <span className="text-[11px] xl:text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400">
                    +3.15%
                  </span>
                </div>
                <div className="mt-2 xl:mt-3 flex items-baseline justify-between">
                  <span className="text-base xl:text-lg font-extrabold tracking-tight">$3,310</span>
                  <svg className="w-14 h-5 xl:w-16 xl:h-6 stroke-emerald-400 fill-none" viewBox="0 0 60 20">
                    <path
                      d="M2 17 L12 15 L22 12 L32 14 L42 8 L52 10 L58 3"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>

              {/* Solana Card */}
              <div
                className={`p-3 xl:p-4 rounded-2xl border backdrop-blur-md transition-all duration-300 hover:scale-[1.02] ${
                  light
                    ? "bg-white/80 border-slate-200/80 shadow-md shadow-slate-200/50"
                    : "bg-white/[0.04] border-white/10 hover:border-orange-500/30 shadow-lg shadow-black/40"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 xl:w-7 xl:h-7 rounded-full bg-purple-500/20 text-purple-400 font-black text-xs flex items-center justify-center">
                      ◎
                    </span>
                    <span className="font-bold text-xs xl:text-sm">Solana</span>
                  </div>
                  <span className="text-[11px] xl:text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400">
                    +7.90%
                  </span>
                </div>
                <div className="mt-2 xl:mt-3 flex items-baseline justify-between">
                  <span className="text-base xl:text-lg font-extrabold tracking-tight">$204.80</span>
                  <svg className="w-14 h-5 xl:w-16 xl:h-6 stroke-emerald-400 fill-none" viewBox="0 0 60 20">
                    <path
                      d="M2 18 L12 16 L22 13 L32 15 L42 7 L52 6 L58 2"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Core Feature Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 xl:gap-4 pt-1">
              <div
                className={`flex items-start gap-2.5 xl:gap-3.5 p-3 xl:p-4 rounded-2xl border backdrop-blur-sm ${
                  light
                    ? "bg-white/60 border-slate-200/60"
                    : "bg-white/[0.02] border-white/[0.08]"
                }`}
              >
                <div className="p-2 xl:p-2.5 rounded-xl bg-orange-500/10 text-orange-400 text-base xl:text-lg shrink-0">
                  <FaBolt />
                </div>
                <div>
                  <h4 className="font-bold text-xs xl:text-sm">Zero Latency</h4>
                  <p
                    className={`text-[11px] xl:text-xs mt-0.5 ${
                      light ? "text-slate-500" : "text-white/50"
                    }`}
                  >
                    Direct WebSocket price tickers with 0ms delay.
                  </p>
                </div>
              </div>

              <div
                className={`flex items-start gap-2.5 xl:gap-3.5 p-3 xl:p-4 rounded-2xl border backdrop-blur-sm ${
                  light
                    ? "bg-white/60 border-slate-200/60"
                    : "bg-white/[0.02] border-white/[0.08]"
                }`}
              >
                <div className="p-2 xl:p-2.5 rounded-xl bg-amber-500/10 text-amber-400 text-base xl:text-lg shrink-0">
                  <FaBrain />
                </div>
                <div>
                  <h4 className="font-bold text-xs xl:text-sm">Smart AI Insights</h4>
                  <p
                    className={`text-[11px] xl:text-xs mt-0.5 ${
                      light ? "text-slate-500" : "text-white/50"
                    }`}
                  >
                    Algorithmic trend forecasts and social sentiment.
                  </p>
                </div>
              </div>

              <div
                className={`flex items-start gap-2.5 xl:gap-3.5 p-3 xl:p-4 rounded-2xl border backdrop-blur-sm ${
                  light
                    ? "bg-white/60 border-slate-200/60"
                    : "bg-white/[0.02] border-white/[0.08]"
                }`}
              >
                <div className="p-2 xl:p-2.5 rounded-xl bg-yellow-500/10 text-yellow-400 text-base xl:text-lg shrink-0">
                  <FaShieldAlt />
                </div>
                <div>
                  <h4 className="font-bold text-xs xl:text-sm">Bank-Grade Privacy</h4>
                  <p
                    className={`text-[11px] xl:text-xs mt-0.5 ${
                      light ? "text-slate-500" : "text-white/50"
                    }`}
                  >
                    Encrypted storage with decentralized access tokens.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ================= RIGHT SIDE: ULTRA-PREMIUM AUTH PORTAL ================= */}
          <div className="lg:col-span-5 w-full max-w-lg mx-auto lg:max-w-none">
            <div className="relative">

              {/* Outer Ambient Glow Ring */}
              <div className="absolute -inset-1 rounded-[32px] bg-gradient-to-r from-orange-500/25 via-amber-500/15 to-orange-600/25 blur-xl opacity-80" />

              {/* Glass Auth Card */}
              <div
                className={`relative rounded-[22px] xl:rounded-[28px] backdrop-blur-2xl p-4 sm:p-5 lg:p-4.5 xl:p-6 border transition-all duration-300 shadow-2xl ${
                  light
                    ? "bg-white/95 border-slate-200 shadow-orange-500/10 text-slate-900"
                    : "bg-[#111115]/95 border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.7)] text-white"
                }`}
              >
                {/* Header */}
                <div className="mb-2 xl:mb-3">
                  <div className="inline-block px-2.5 py-0.5 rounded-full text-[10px] xl:text-[11px] font-semibold uppercase tracking-wider mb-1 bg-orange-500/10 text-orange-400 border border-orange-500/20">
                    Get Started Free
                  </div>
                  <h2 className="text-lg sm:text-xl xl:text-2xl font-extrabold tracking-tight">
                    Create Your Account
                  </h2>
                  <p
                    className={`mt-0.5 text-xs sm:text-xs xl:text-sm ${
                      light ? "text-slate-500" : "text-white/60"
                    }`}
                  >
                    Start tracking crypto assets in under 30 seconds.
                  </p>
                </div>

                {/* Social Quick Sign-Up */}
                <div className="grid grid-cols-2 gap-2 mb-2 xl:mb-3">
                  <button
                    type="button"
                    className={`flex items-center justify-center gap-2 py-1.5 px-3 rounded-xl border text-xs font-semibold transition-all duration-200 hover:scale-[1.02] cursor-pointer ${
                      light
                        ? "bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800"
                        : "bg-white/[0.04] hover:bg-white/[0.08] border-white/10 text-white"
                    }`}
                  >
                    <FaGoogle className="text-red-400 text-xs sm:text-sm" />
                    <span>Google</span>
                  </button>

                  <button
                    type="button"
                    className={`flex items-center justify-center gap-2 py-1.5 px-3 rounded-xl border text-xs font-semibold transition-all duration-200 hover:scale-[1.02] cursor-pointer ${
                      light
                        ? "bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800"
                        : "bg-white/[0.04] hover:bg-white/[0.08] border-white/10 text-white"
                    }`}
                  >
                    <FaGithub className="text-xs sm:text-sm" />
                    <span>GitHub</span>
                  </button>
                </div>

                {/* Divider */}
                <div className="relative flex items-center justify-center mb-2 xl:mb-3">
                  <div
                    className={`w-full border-t ${
                      light ? "border-slate-200" : "border-white/10"
                    }`}
                  />
                  <span
                    className={`absolute px-2 text-[10px] xl:text-xs uppercase tracking-wider font-semibold ${
                      light ? "bg-white text-slate-400" : "bg-[#111115] text-white/40"
                    }`}
                  >
                    Or register with email
                  </span>
                </div>

                {/* Server Error Alert */}
                {serverError && (
                  <div className="mb-2 p-2 rounded-xl border border-red-500/30 bg-red-500/10 text-red-400 text-xs flex items-center gap-2 animate-fadeIn">
                    <span className="font-bold">⚠️</span>
                    <span>{serverError}</span>
                  </div>
                )}

                {/* Registration Form */}
                <form className="space-y-2 xl:space-y-2.5">
                  {/* Name Fields (2 Columns) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {/* First Name */}
                    <div>
                      <label 
                        className={`block text-[11px] xl:text-xs font-semibold mb-1 ${
                          light ? "text-slate-700" : "text-white/80"
                        }`}
                      >
                        First Name
                      </label>
                      <div className="relative">
                        <span
                          className={`absolute left-3 top-1/2 -translate-y-1/2 text-xs ${
                            light ? "text-slate-400" : "text-white/40"
                          }`}
                        >
                          <FaUser />
                        </span>
                        <input
                          onChange={handleChange}
                          value={formData.firstname}
                          maxLength={20}
                          name="firstname"
                          type="text"
                          onKeyDown={(e) => {
                            if(e.key === "Enter") {
                              e.preventDefault();
                              document.querySelector('input[name="lastname"]')?.focus();
                            }
                          }}
                          placeholder="e.g. Dikshant"
                          className={`w-full rounded-xl pl-8.5 pr-3 py-1.5 xl:py-2 text-xs xl:text-sm outline-none transition-all duration-200 border ${
                            light
                              ? "bg-slate-50/80 border-slate-200 text-slate-900 focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                              : "bg-white/[0.04] border-white/10 text-white placeholder:text-white/30 focus:bg-white/[0.07] focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                          }`}
                        />
                      </div>
                      {error.firstname && (
                        <p className="mt-0.5 text-[11px] text-red-500">{error.firstname}</p>
                      )}
                    </div>

                    {/* Last Name */}
                    <div>
                      <label
                        className={`block text-[11px] xl:text-xs font-semibold mb-1 ${
                          light ? "text-slate-700" : "text-white/80"
                        }`}
                      >
                        Last Name
                      </label>
                      <div className="relative">
                        <span
                          className={`absolute left-3 top-1/2 -translate-y-1/2 text-xs ${
                            light ? "text-slate-400" : "text-white/40"
                          }`}
                        >
                          <FaUser />
                        </span>
                        <input
                          onChange={handleChange}
                          value={formData.lastname}
                          maxLength={20}
                          name="lastname"
                          type="text"
                          placeholder="e.g. Nakamoto"
                          onKeyDown={(e) => {
                            
                            if(e.key === "Enter") {
                              e.preventDefault();
                              document.querySelector('input[name="email"]')?.focus();
                            }
                          }}
                          className={`w-full rounded-xl pl-8.5 pr-3 py-1.5 xl:py-2 text-xs xl:text-sm outline-none transition-all duration-200 border ${
                            light
                              ? "bg-slate-50/80 border-slate-200 text-slate-900 focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                              : "bg-white/[0.04] border-white/10 text-white placeholder:text-white/30 focus:bg-white/[0.07] focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                          }`}
                        />
                      </div>
                      {error.lastname && (
                        <p className="mt-0.5 text-[11px] text-red-500">{error.lastname}</p>
                      )}
                    </div>
                  </div>

                  {/* Email Field */}
                  <div>
                    <label
                      className={`block text-[11px] xl:text-xs font-semibold mb-1 ${
                        light ? "text-slate-700" : "text-white/80"
                      }`}
                    >
                      Email Address
                    </label>
                    <div className="relative">
                      <span
                        className={`absolute left-3 top-1/2 -translate-y-1/2 text-xs ${
                          light ? "text-slate-400" : "text-white/40"
                        }`}
                      >
                        <FaEnvelope />
                      </span>
                      <input
                        onChange={handleChange}
                        value={formData.email}
                        name="email"
                        type="email"
                        placeholder="satoshi@cryptoplace.io"
                        onKeyDown={(e) => {
                          if(e.key === "Enter") {
                            e.preventDefault();
                            document.querySelector('input[name="password"]')?.focus();
                          }
                        }}
                        className={`w-full rounded-xl pl-8.5 pr-3 py-1.5 xl:py-2 text-xs xl:text-sm outline-none transition-all duration-200 border ${
                          light
                            ? "bg-slate-50/80 border-slate-200 text-slate-900 focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                            : "bg-white/[0.04] border-white/10 text-white placeholder:text-white/30 focus:bg-white/[0.07] focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                        }`}
                      />
                    </div>
                    {error.email && (
                      <p className="mt-0.5 text-[11px] text-red-500">{error.email}</p>
                    )}
                  </div>

                  {/* Password Field */}
                  <div>
                    <label
                      className={`block text-[11px] xl:text-xs font-semibold mb-1 ${
                        light ? "text-slate-700" : "text-white/80"
                      }`}
                    >
                      Password
                    </label>
                    <div className="relative">
                      <span
                        className={`absolute left-3 top-1/2 -translate-y-1/2 text-xs ${
                          light ? "text-slate-400" : "text-white/40"
                        }`}
                      >
                        <FaLock />
                      </span>
                      <input
                        onChange={handleChange}
                        value={formData.password}
                        name="password"
                        type={showPassword ? "text" : "password"}
                        onKeyDown={(e) => {
                          if(e.key === "Enter") {
                            e.preventDefault();
                            submitData(e);
                          }
                        }}
                        placeholder="••••••••••••"
                        className={`w-full rounded-xl pl-8.5 pr-9 py-1.5 xl:py-2 text-xs xl:text-sm outline-none transition-all duration-200 border ${
                          light
                            ? "bg-slate-50/80 border-slate-200 text-slate-900 focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                            : "bg-white/[0.04] border-white/10 text-white placeholder:text-white/30 focus:bg-white/[0.07] focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className={`absolute right-3 top-1/2 -translate-y-1/2 text-xs transition cursor-pointer ${
                          light
                            ? "text-slate-400 hover:text-slate-700"
                            : "text-white/40 hover:text-white"
                        }`}
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>

                    {/* Dynamic Password Strength Meter */}
                    {formData.password && (
                      <div className="mt-1 space-y-0.5">
                        <div className="flex gap-1.5 h-1 w-full">
                          <div
                            className={`h-full flex-1 rounded-full transition-all duration-300 ${
                              passwordStrength >= 1
                                ? passwordStrength === 1
                                  ? "bg-red-500"
                                  : passwordStrength === 2
                                    ? "bg-amber-500"
                                    : "bg-emerald-500"
                                : "bg-white/10"
                            }`}
                          />
                          <div
                            className={`h-full flex-1 rounded-full transition-all duration-300 ${
                              passwordStrength >= 2
                                ? passwordStrength === 2
                                  ? "bg-amber-500"
                                  : "bg-emerald-500"
                                : "bg-white/10"
                            }`}
                          />
                          <div
                            className={`h-full flex-1 rounded-full transition-all duration-300 ${
                              passwordStrength >= 3 ? "bg-emerald-500" : "bg-white/10"
                            }`}
                          />
                        </div>
                        <div className="flex justify-between items-center text-[10px]">
                          <span
                            className={
                              passwordStrength === 1
                                ? "text-red-400 font-medium"
                                : passwordStrength === 2
                                  ? "text-amber-400 font-medium"
                                  : "text-emerald-400 font-medium"
                            }
                          >
                            {passwordStrength === 1 && "Weak password"}
                            {passwordStrength === 2 && "Good password"}
                            {passwordStrength === 3 && "Strong password"}
                          </span>
                          <span
                            className={light ? "text-slate-400" : "text-white/40"}
                          >
                            Min 6 characters
                          </span>
                        </div>
                      </div>
                    )}

                    {error.password && (
                      <p className="mt-0.5 text-[11px] text-red-500">{error.password}</p>
                    )}
                  </div>

                  {/* Terms & Conditions Checkbox */}
                  <div className="flex items-center gap-2 pt-0.5">
                    <input
                      id="termsCheckbox"
                      type="checkbox"
                      checked={agreedToTerms}
                      onChange={(e) => setAgreedToTerms(e.target.checked)}
                      className="h-3.5 w-3.5 rounded accent-orange-500 cursor-pointer shrink-0"
                    />
                    <label
                      htmlFor="termsCheckbox"
                      className={`text-[11px] leading-tight cursor-pointer ${
                        light ? "text-slate-600" : "text-white/60"
                      }`}
                    >
                      I agree to the{" "}
                      <span className="text-orange-400 hover:underline">
                        Terms of Service
                      </span>{" "}
                      and{" "}
                      <span className="text-orange-400 hover:underline">
                        Privacy Policy
                      </span>
                      .
                    </label>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="relative w-full group overflow-hidden rounded-xl bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 p-[1px] font-semibold text-white shadow-[0_0_20px_rgba(255,115,0,0.3)] transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,115,0,0.5)] hover:scale-[1.01] active:scale-[0.99] cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed mt-1"
                  >
                    <div className="flex items-center justify-center gap-2 rounded-xl bg-transparent py-2 xl:py-2.5 px-4 text-xs xl:text-sm font-bold tracking-wide">
                      {isLoading ? (
                        <>
                          <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Creating Account...</span>
                        </>
                      ) : (
                        <>
                          <span>Create Free Account</span>
                          <FaArrowRight className="text-xs transition-transform duration-200 group-hover:translate-x-1" />
                        </>
                      )}
                    </div>
                  </button>

                  {/* Already have an account link */}
                  <div className="text-center pt-0.5 xl:pt-1">
                    <p
                      className={`text-xs ${
                        light ? "text-slate-600" : "text-white/60"
                      }`}
                    >
                      Already have an account?{" "}
                      <Link
                        to="/login"
                        className="font-bold text-orange-400 hover:text-orange-300 hover:underline transition ml-1"
                      >
                        Log In
                      </Link>
                    </p>
                  </div>

                  {/* Security Badge Footnote */}
                  <div
                    className={`mt-1.5 xl:mt-2.5 pt-1.5 xl:pt-2 border-t text-center flex items-center justify-center gap-1.5 text-[10px] xl:text-[11px] ${
                      light
                        ? "border-slate-100 text-slate-400"
                        : "border-white/5 text-white/40"
                    }`}
                  >
                    <FaShieldAlt className="text-orange-400 text-xs" />
                    <span>256-Bit SSL Encrypted & Decentralized Security</span>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
