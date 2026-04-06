import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

/**
 * Reusable Input component
 * Supports:
 *  - Text / password inputs
 *  - Password show/hide toggle
 *  - Error and success states (with border and message)
 */
const Input = ({ label, value, onChange, placeholder, type, error, isValid }) => {
  // State for toggling password visibility
  const [showPassword, setShowPassword] = useState(false);

  // Toggle function for password visibility
  const toggleShowPassword = () => setShowPassword(!showPassword);

  return (
    <div className="mb-4">
      {/* Label */}
      <label className="text-[13px] text-slate-800 mb-1 block">{label}</label>

      <div className="relative">
        {/* Input field */}
        <input
          type={type === 'password' ? (showPassword ? 'text' : 'password') : type} // toggle password type
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`w-full bg-transparent outline-none border rounded-md py-2 px-3 pr-10 leading-tight
            ${error ? "border-red-500 focus:border-red-500" : ""}
            ${isValid && !error ? "border-green-500 focus:border-green-500" : "border-gray-300 focus:border-blue-500"}
            transition-colors
          `}
        />

        {/* Password show/hide toggle */}
        {type === 'password' && (
          <span
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
            onClick={toggleShowPassword}
          >
            {showPassword ? (
              <Eye size={20} className="text-green-700" />
            ) : (
              <EyeOff size={20} className="text-slate-400" />
            )}
          </span>
        )}
      </div>

      {/* Error message */}
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}

      {/* Success message */}
      {isValid && !error && <p className="text-green-600 text-xs mt-1">Looks good ✓</p>}
    </div>
  );
};

export default Input;