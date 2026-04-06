import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { assets } from "../assets/assets.js";
import Input from "../components/Input.jsx";
import { validateFullName, validateEmail } from "../util/validation.js";

const Signup = () => {
  const navigate = useNavigate();

  // Central state for all inputs
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  // Central state for errors
  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  // Central state for validities
  const [validities, setValidities] = useState({
    fullName: false,
    email: false,
    password: false,
  });

  // Reusable validation handler
  const handleChange = (field, value) => {
    // Update input value
    setForm((prev) => ({ ...prev, [field]: value }));

    // Validate input
    let error = "";
    let isValid = false;

    if (field === "fullName") {
      if (!value.trim()) error = "Full name is required";
      else if (!validateFullName(value)) error = "Full name can only contain letters and spaces";
      else isValid = true;
    }

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

    // Update error and validity states
    setErrors((prev) => ({ ...prev, [field]: error }));
    setValidities((prev) => ({ ...prev, [field]: isValid }));
  };

  // Submit handler
  const handleSubmit = (e) => {
    e.preventDefault();

    // Re-validate all fields on submit
    handleChange("fullName", form.fullName);
    handleChange("email", form.email);
    handleChange("password", form.password);

    // If any field is invalid, stop submission
    if (!validities.fullName || !validities.email || !validities.password) return;

    // Everything is valid → submit
    console.log("Signup info:", form);
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
          <h3 className="text-2xl font-semibold text-black text-center mb-2">Create An Account</h3>
          <p className="text-sm text-slate-700 text-center mb-8">
            Start Tracking Your Finances by joining Money Manager
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
              <Input
                value={form.fullName}
                onChange={(e) => handleChange("fullName", e.target.value)}
                label="Full Name"
                placeholder="John Doe"
                type="text"
                error={errors.fullName}
                isValid={validities.fullName}
              />

              <Input
                value={form.email}
                onChange={(e) => handleChange("email", e.target.value)}
                label="Email Address"
                placeholder="name@example.com"
                type="text"
                error={errors.email}
                isValid={validities.email}
              />

              <div className="col-span-2">
                <Input
                  value={form.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                  label="Password"
                  placeholder="********"
                  type="password"
                  error={errors.password}
                  isValid={validities.password}
                />
              </div>
            </div>

            <button
              type="submit"
              className="bg-green-700 text-white w-full py-3 text-lg font-medium rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!(validities.fullName && validities.email && validities.password)}
            >
              SIGN UP
            </button>

            <p className="text-sm text-slate-800 text-center mt-6">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-primary underline hover:text-primary-dark transition-colors"
              >
                Login!
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;