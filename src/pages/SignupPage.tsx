import { MouseEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Input from "../components/Input";
import * as API from "../services/api";
import { handleAPIError, showSuccessToast } from "../utils"

export default function SignupPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signup = async (e: MouseEvent) => {
    e.preventDefault();
    try {
      await API.signup(email, password);
      showSuccessToast("Signup successful! Please log in.");
      navigate("/login");
    } catch (error: unknown) {
      handleAPIError(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat w-full" style={{ backgroundImage: "url('/deep-origin-background.png')" }}>
      <div className="bg-white pt-24 pb-20 px-8 rounded-lg shadow-lg max-w-sm w-full text-center">
        <img src="/Deep-origin-logo.svg" alt="Logo" className="mx-auto mb-4" />
        <h2 className="text-black text-2xl mb-2">Create your account</h2>
        <p className="text-black text-sm mb-6">Sign up to get started</p>
        <form className="space-y-4">
          <div className="mb-4">
            <Input
              type="email"
              placeholder="Email address*"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              size="medium"
              color="bg-white"
              focusColor="focus:ring-[#6D2EB1]"
              className="block w-full"
            />
          </div>
          <div className="mb-4">
            <Input
              type="password"
              placeholder="Password*"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              size="medium"
              color="bg-white"
              focusColor="focus:ring-[#6D2EB1]"
              className="block w-full"
            />
          </div>
          <div className="mb-4">
            <Button text="Sign Up" color="#6D2EB1" size="medium" onClick={signup} className="block w-full" />
          </div>
        </form>
        <p className="text-sm text-gray-600 mt-4">
          Already have an account? <Link to="/login" className="text-[#6D2EB1] hover:underline">Log in</Link>
        </p>
      </div>
    </div>
  );
}