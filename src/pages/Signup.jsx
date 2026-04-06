/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {assets} from "../assets/assets.js"
import Input from "../components/Input.jsx";

const Signup = () => {

    const[fullName, setFullName] = useState("");
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const[error, setError] = useState(null);

    const navigate = useNavigate();

    return (
        <div className="h-screen w-full relative flex items-center justify-center overflow-hidden">
            {/* Background image with blur */}
            <img src={assets.login_bg} alt="Background" className="absolute inset-0 w-full h-full object-cover filter blur-sm"/>
            
            <div className="relative z-10 w-full max-w-lg px-6">
                <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-lg shaodw-2xl p-8 max-h-[90vh] overflow-y-auto">
                    <h3 className="text-2xl font-semibold text-black text-center mb-2">
                        Create An Account
                    </h3>
                    <p className="text-sm text-slate-700 text-center mb-8">
                        Start Tracking Your Finances by joining Money Manager
                    </p>

                    <form onSubmit="" className="space-y-4">
                        <div className="flex justify-center mb-6">
                            {/* Profile Image */}
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
                            {/* Input Component */}
                            <Input 
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                label={"Full Name"}
                                placeholder={"John Doe"}
                                type={"text"}
                            />
                            <Input 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                label={"Email Address"}
                                placeholder={"name@example.com"}
                                type={"text"}
                            />
                            
                            <div className="col-span-2">
                                <Input 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                label={"Password"}
                                placeholder={"********"}
                                type={"password"}
                                />
                            </div>

                        </div>
                        {error && (
                            <p className="text-red-800 text-sm text-center bg-red-50 p-2 rounded">
                                {error}
                            </p>
                        )}
                        <button 
                        className="bg-green-800 text-white w-full py-3 text-lg font-medium rounded-lg" 
                        type="submit"
                        >
                            SIGN UP
                        </button>

                        <p className="text-sm text-slate-800 text-center mt-6">
                            Already have an account?{" "}
                            <Link 
                            to="/login"
                            className="font-medium text-primary underline hover:text-primary-dark transition-colors"
                            > 
                                Login
                            </Link>
                        </p>

                    </form>
                </div>
            </div>

        </div>
    )
}
export default Signup;