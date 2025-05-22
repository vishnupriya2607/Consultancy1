import { useState } from "react";
import { ShieldCheck, Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async () => {
    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        alert("Login successful");
        navigate("/admin-dashboard");
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Server error. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Left side */}
      <div className="hidden md:flex w-1/2 relative bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-900 rounded-tr-3xl rounded-br-3xl overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80"
          alt="School building"
          className="absolute inset-0 w-full h-full object-cover opacity-25"
          loading="lazy"
        />
        <div className="relative z-10 flex flex-col justify-center items-center text-white text-center px-8 py-8 h-full w-full">
  <h1 className="text-5xl font-extrabold mb-4 leading-tight">
    Welcome Back
  </h1>
  <p className="text-lg max-w-md font-light tracking-wide">
    Sign in to your admin account to manage the school and keep operations running smoothly.
  </p>
  <ShieldCheck className="mt-12 w-20 h-20 text-indigo-400" />
</div>

      </div>

      {/* Right side */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 p-12 bg-white rounded-tl-3xl rounded-bl-3xl shadow-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <h2 className="text-4xl font-semibold text-gray-900 mb-10 text-center tracking-tight">
            Admin Login
          </h2>

          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-600 text-center mb-6 text-sm font-medium"
            >
              {error}
            </motion.p>
          )}

          <label className="block mb-2 text-gray-700 font-semibold">Email</label>
          <input
            type="email"
            placeholder="admin@example.com"
            className="w-full mb-8 px-5 py-4 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="username"
            required
          />

          <label className="block mb-2 text-gray-700 font-semibold">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className="w-full mb-8 px-5 py-4 pr-14 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
            <button
              type="button"
              className="absolute top-1/2 right-5 -translate-y-1/2 text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              tabIndex={0}
            >
              {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
            </button>
          </div>

          <motion.button
            onClick={handleLogin}
            disabled={loading}
            whileTap={{ scale: 0.97 }}
            className={`w-full py-4 rounded-xl font-semibold text-white text-lg transition duration-300 ${
              loading
                ? "bg-indigo-300 cursor-not-allowed"
                : "bg-indigo-600"
            }`}
            aria-busy={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </motion.button>

          <p className="mt-10 text-center text-sm text-gray-400 select-none">
            &copy; {new Date().getFullYear()} Chanakya HiTech Metric School. All rights reserved.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
