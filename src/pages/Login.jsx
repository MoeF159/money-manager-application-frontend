import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { assets } from "../assets/assets.js";
import Input from "../components/Input.jsx";
import { validateEmail } from "../util/validation.js";

const Login = () => {
  const navigate = useNavigate();

  // Central state for inputs
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  // Central state for errors
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  // Central state for validity
  const [validities, setValidities] = useState({
    email: false,
    password: false,
  });

  // Centralized handler for input changes + validation
  const handleChange = (field, value) => {
    // Update input value
    setForm((prev) => ({ ...prev, [field]: value }));

    // Validate input
    let error = "";
    let isValid = false;

    if (field === "email") {
      if (!value.trim()) error = "Email is required";
      else if (!validateEmail(value)) error = "Enter a valid email";
      else isValid = true;
    }

    if (field === "password") {
      if (!value.trim()) error = "Password is required";
      else if (value.length < 6) error = "Password must be at least 6 characters";
      else isValid = true;
    }

    // Update error and validity
    setErrors((prev) => ({ ...prev, [field]: error }));
    setValidities((prev) => ({ ...prev, [field]: isValid }));
  };

  // Submit handler
  const handleSubmit = (e) => {
    e.preventDefault();

    // Re-validate all fields before submit
    handleChange("email", form.email);
    handleChange("password", form.password);

    // Stop if any field is invalid
    if (!validities.email || !validities.password) return;

    // Everything is valid → proceed
    console.log("Login info:", form);
    // navigate("/dashboard");
  };

  return (
    <div className="h-screen w-full relative flex items-center justify-center overflow-hidden">
      <img
        src={assets.login_bg}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover filter blur-sm"
      />

      <div className="relative z-10 w-full max-w-lg px-6">
        <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-lg shadow-2xl p-8 max-h-[90vh] overflow-y-auto">
          <h3 className="text-2xl font-semibold text-black text-center mb-2">
            Welcome back to Money Manager
          </h3>
          <p className="text-sm text-slate-700 text-center mb-8">
            Please enter your details to log in
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
              label="Email Address"
              placeholder="name@example.com"
              type="text"
              error={errors.email}
              isValid={validities.email}
            />

            <Input
              value={form.password}
              onChange={(e) => handleChange("password", e.target.value)}
              label="Password"
              placeholder="********"
              type="password"
              error={errors.password}
              isValid={validities.password}
            />

            <button
              type="submit"
              className="bg-green-700 text-white w-full py-3 text-lg font-medium rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!(validities.email && validities.password)}
            >
              LOGIN
            </button>

            <p className="text-sm text-slate-800 text-center mt-6">
              Don’t have an account?{" "}
              <Link
                to="/signup"
                className="font-medium text-primary underline hover:text-primary-dark transition-colors"
              >
                Signup!
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;