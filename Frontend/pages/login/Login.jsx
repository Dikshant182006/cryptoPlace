import React, { useState } from "react";
import { useNavigate, Link, Navigate } from "react-router-dom";
import {
  FaEye,
  FaEyeSlash,
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

const Login = ({ light, user, setUser }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState({
    email: "",
    password: "",
    login: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  if (user) {
    return <Navigate to='/home' replace />;
  }

  const validationEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      return "Email is required";
    }
    if (!emailRegex.test(email.trim())) {
      return "Enter a valid email Address";
    }
    return "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setError((prev) => ({ ...prev, login: "" }));

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "email") {
      const validationError = validationEmail(value);
      setError((prev) => ({
        ...prev,
        [name]: validationError,
      }));
    }
  };

  const submitData = async (e) => {
    e.preventDefault();
    const emailErr = validationEmail(formData.email);
    if (emailErr) {
      setError((prev) => ({ ...prev, email: emailErr }));
      return;
    }
    if (!formData.password) {
      setError((prev) => ({ ...prev, password: "Password is required" }));
      return;
    }

    setIsLoading(true);
    try {
      const res = await axios.post(`${API_URL}/login`, formData, {
        withCredentials: true,
      });
      if (setUser) {
        setUser(res.data.userData || res.data);
      }
      navigate("/home");
    } catch (err) {
      console.error(err);
      const errMsg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Invalid email or password credentials.";
      setError((prev) => ({
        ...prev,
        login: typeof errMsg === "string" ? errMsg : "Invalid credentials",
      }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`w-full min-h-screen lg:h-screen lg:overflow-hidden py-4 sm:py-6 lg:py-0 flex flex-col justify-center relative overflow-x-hidden no-scrollbar transition-colors duration-300 ${light ? "bg-[#f8fafc] text-slate-900" : "bg-[#070709] text-white"
        }`}
    >
      {/* Background Matrix & Tech Grid */}
      <div
        className={`absolute inset-0 pointer-events-none ${light
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

          {/* ================= LEFT SIDE: CRYPTO SHOWCASE & WELCOME BACK ================= */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-3 xl:space-y-5">

            {/* Live Engine Status Badge */}
            <div className="inline-flex items-center gap-2.5 w-fit px-3 py-1 xl:px-4 xl:py-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 backdrop-blur-md">
              <span className="relative flex h-2 w-2 xl:h-2.5 xl:w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 xl:h-2.5 xl:w-2.5 bg-emerald-500"></span>
              </span>
              <span className="text-xs xl:text-sm font-semibold tracking-wide text-orange-400">
                Live Terminal Sync • 2,400+ Coins Active
              </span>
            </div>

            {/* Hero Headlines */}
            <div className="space-y-1.5 xl:space-y-2.5">
              <h1 className="text-2xl sm:text-3xl lg:text-[2.2rem] xl:text-5xl font-black tracking-tight leading-[1.15]">
                Welcome Back To{" "}
                <span className="bg-gradient-to-r from-orange-500 via-amber-400 to-yellow-400 bg-clip-text text-transparent">
                  CryptoPlace
                </span>
              </h1>
              <p
                className={`text-xs xl:text-sm max-w-xl leading-relaxed ${light ? "text-slate-600" : "text-white/70"
                  }`}
              >
                Log in to resume monitoring your crypto portfolio, track live exchange movements,
                and review AI price predictions in real time.
              </p>
            </div>

            {/* Live Market Mini-Ticker Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 xl:gap-3.5 pt-0.5">
              {/* Bitcoin Card */}
              <div
                className={`p-2.5 xl:p-3.5 rounded-2xl border backdrop-blur-md transition-all duration-300 hover:scale-[1.02] ${light
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
                <div className="mt-2 xl:mt-2.5 flex items-baseline justify-between">
                  <span className="text-base xl:text-lg font-extrabold tracking-tight">$96,420</span>
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
                className={`p-2.5 xl:p-3.5 rounded-2xl border backdrop-blur-md transition-all duration-300 hover:scale-[1.02] ${light
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
                <div className="mt-2 xl:mt-2.5 flex items-baseline justify-between">
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
                className={`p-2.5 xl:p-3.5 rounded-2xl border backdrop-blur-md transition-all duration-300 hover:scale-[1.02] ${light
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
                <div className="mt-2 xl:mt-2.5 flex items-baseline justify-between">
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
                className={`flex items-start gap-2.5 xl:gap-3.5 p-3 xl:p-4 rounded-2xl border backdrop-blur-sm ${light
                  ? "bg-white/60 border-slate-200/60"
                  : "bg-white/[0.02] border-white/[0.08]"
                  }`}
              >
                <div className="p-2 xl:p-2.5 rounded-xl bg-orange-500/10 text-orange-400 text-base xl:text-lg shrink-0">
                  <FaBolt />
                </div>
                <div>
                  <h4 className="font-bold text-xs xl:text-sm">Live Portfolios</h4>
                  <p
                    className={`text-[11px] xl:text-xs mt-0.5 ${light ? "text-slate-500" : "text-white/50"
                      }`}
                  >
                    Track asset growth in your preferred fiat currency.
                  </p>
                </div>
              </div>

              <div
                className={`flex items-start gap-2.5 xl:gap-3.5 p-3 xl:p-4 rounded-2xl border backdrop-blur-sm ${light
                  ? "bg-white/60 border-slate-200/60"
                  : "bg-white/[0.02] border-white/[0.08]"
                  }`}
              >
                <div className="p-2 xl:p-2.5 rounded-xl bg-amber-500/10 text-amber-400 text-base xl:text-lg shrink-0">
                  <FaBrain />
                </div>
                <div>
                  <h4 className="font-bold text-xs xl:text-sm">AI Market Pulse</h4>
                  <p
                    className={`text-[11px] xl:text-xs mt-0.5 ${light ? "text-slate-500" : "text-white/50"
                      }`}
                  >
                    Stay ahead with algorithmic signals & sentiment.
                  </p>
                </div>
              </div>

              <div
                className={`flex items-start gap-2.5 xl:gap-3.5 p-3 xl:p-4 rounded-2xl border backdrop-blur-sm ${light
                  ? "bg-white/60 border-slate-200/60"
                  : "bg-white/[0.02] border-white/[0.08]"
                  }`}
              >
                <div className="p-2 xl:p-2.5 rounded-xl bg-yellow-500/10 text-yellow-400 text-base xl:text-lg shrink-0">
                  <FaShieldAlt />
                </div>
                <div>
                  <h4 className="font-bold text-xs xl:text-sm">Instant Sync</h4>
                  <p
                    className={`text-[11px] xl:text-xs mt-0.5 ${light ? "text-slate-500" : "text-white/50"
                      }`}
                  >
                    Cross-device synchronization with session security.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ================= RIGHT SIDE: AUTH LOGIN PORTAL ================= */}
          <div className="lg:col-span-5 w-full max-w-lg mx-auto lg:max-w-none">
            <div className="relative">

              {/* Outer Ambient Glow Ring */}
              <div className="absolute -inset-1 rounded-[32px] bg-gradient-to-r from-orange-500/25 via-amber-500/15 to-orange-600/25 blur-xl opacity-80" />

              {/* Glass Auth Card */}
              <div
                className={`relative rounded-[22px] xl:rounded-[28px] backdrop-blur-2xl p-4 sm:p-5 lg:p-4.5 xl:p-6 border transition-all duration-300 shadow-2xl ${light
                  ? "bg-white/95 border-slate-200 shadow-orange-500/10 text-slate-900"
                  : "bg-[#111115]/95 border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.7)] text-white"
                  }`}
              >
                {/* Header */}
                <div className="mb-2 xl:mb-3">
                  <div className="inline-block px-2.5 py-0.5 rounded-full text-[10px] xl:text-[11px] font-semibold uppercase tracking-wider mb-1 bg-orange-500/10 text-orange-400 border border-orange-500/20">
                    Welcome Back
                  </div>
                  <h2 className="text-lg sm:text-xl xl:text-2xl font-extrabold tracking-tight">
                    Log In to CryptoPlace
                  </h2>
                  <p
                    className={`mt-0.5 text-xs sm:text-xs xl:text-sm ${light ? "text-slate-500" : "text-white/60"
                      }`}
                  >
                    Enter your credentials to access your live terminal.
                  </p>
                </div>

                {/* Social Quick Login */}
                <div className="grid grid-cols-2 gap-2 mb-2 xl:mb-3">
                  <button
                    type="button"
                    className={`flex items-center justify-center gap-2 py-1.5 px-3 rounded-xl border text-xs font-semibold transition-all duration-200 hover:scale-[1.02] cursor-pointer ${light
                      ? "bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800"
                      : "bg-white/[0.04] hover:bg-white/[0.08] border-white/10 text-white"
                      }`}
                  >
                    <FaGoogle className="text-red-400 text-xs sm:text-sm" />
                    <span>Google</span>
                  </button>

                  <button
                    type="button"
                    className={`flex items-center justify-center gap-2 py-1.5 px-3 rounded-xl border text-xs font-semibold transition-all duration-200 hover:scale-[1.02] cursor-pointer ${light
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
                    className={`w-full border-t ${light ? "border-slate-200" : "border-white/10"
                      }`}
                  />
                  <span
                    className={`absolute px-2 text-[10px] xl:text-xs uppercase tracking-wider font-semibold ${light ? "bg-white text-slate-400" : "bg-[#111115] text-white/40"
                      }`}
                  >
                    Or continue with email
                  </span>
                </div>

                {/* Error Alert */}
                {error.login && (
                  <div className="mb-2 p-2 rounded-xl border border-red-500/30 bg-red-500/10 text-red-400 text-xs flex items-center gap-2">
                    <span className="font-bold">⚠️</span>
                    <span>{error.login}</span>
                  </div>
                )}

                {/* Form */}
                <form onSubmit={submitData} className="space-y-2 xl:space-y-2.5">
                  {/* Email Field */}
                  <div>
                    <label
                      className={`block text-[11px] xl:text-xs font-semibold mb-1 ${light ? "text-slate-700" : "text-white/80"
                        }`}
                    >
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <span
                        className={`absolute left-3 top-1/2 -translate-y-1/2 text-xs ${light ? "text-slate-400" : "text-white/40"
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
                          if (e.key === "Enter") {
                            e.preventDefault();
                            document.querySelector('input[name="password"]')?.focus();
                          }
                        }}
                        className={`w-full rounded-xl pl-8.5 pr-3 py-1.5 xl:py-2 text-xs xl:text-sm outline-none transition-all duration-200 border ${light
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
                    <div className="flex justify-between items-center mb-1">
                      <label
                        className={`block text-[11px] xl:text-xs font-semibold ${light ? "text-slate-700" : "text-white/80"
                          }`}
                      >
                        Password<span className="text-red-500">*</span>
                      </label>
                    </div>
                    <div className="relative">
                      <span
                        className={`absolute left-3 top-1/2 -translate-y-1/2 text-xs ${light ? "text-slate-400" : "text-white/40"
                          }`}
                      >
                        <FaLock />
                      </span>
                      <input
                        onChange={handleChange}
                        value={formData.password}
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••••••"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            submitData(e);
                          }
                        }}
                        className={`w-full rounded-xl pl-8.5 pr-9 py-1.5 xl:py-2 text-xs xl:text-sm outline-none transition-all duration-200 border ${light
                          ? "bg-slate-50/80 border-slate-200 text-slate-900 focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                          : "bg-white/[0.04] border-white/10 text-white placeholder:text-white/30 focus:bg-white/[0.07] focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                          }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className={`absolute right-3 top-1/2 -translate-y-1/2 text-xs transition cursor-pointer ${light
                          ? "text-slate-400 hover:text-slate-700"
                          : "text-white/40 hover:text-white"
                          }`}
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                    {error.password && (
                      <p className="mt-0.5 text-[11px] text-red-500">{error.password}</p>
                    )}
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
                          <span>Signing In...</span>
                        </>
                      ) : (
                        <>
                          <span>Sign In to Terminal</span>
                          <FaArrowRight className="text-xs transition-transform duration-200 group-hover:translate-x-1" />
                        </>
                      )}
                    </div>
                  </button>

                  {/* Switch to Sign Up */}
                  <div className="text-center pt-0.5 xl:pt-1">
                    <p
                      className={`text-xs ${light ? "text-slate-600" : "text-white/60"
                        }`}
                    >
                      Don't have an account?{" "}
                      <Link
                        to="/"
                        className="font-bold text-orange-400 hover:text-orange-300 hover:underline transition ml-1"
                      >
                        Sign Up Free
                      </Link>
                    </p>
                  </div>

                  {/* Security Badge Footnote */}
                  <div
                    className={`mt-1.5 xl:mt-2.5 pt-1.5 xl:pt-2 border-t text-center flex items-center justify-center gap-1.5 text-[10px] xl:text-[11px] ${light
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

export default Login;