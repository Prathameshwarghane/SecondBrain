import react from "react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { Button } from "../Components/Button";

export function Signin() {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  async function signin() {
    const username = usernameRef.current?.value;
    console.log(username);
    const password = passwordRef.current?.value;
    const response = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
      username: username,
      password: password,
    });
    const jwt = response.data.token;
    localStorage.setItem("token", jwt);
    navigate("/dashboard");
  }

  return (
    <div className="h-[100vh] w-[100vw] flex items-center justify-center">
      <div className="bg-slate-100 p-4 rounded-lg shadow-lg">
        <div className="flex flex-col justify-center items-center mb-5">
          <h1 className="text-3xl ">Sign in</h1>
          <h2>Sign in to continue</h2>
        </div>
        <div className="flex flex-col gap-2">
          <Input ref={usernameRef} placeholder="Name" />
          <Input ref={passwordRef} placeholder="Password" />
          <Button
            varient="primary"
            text="Sign up"
            loading={false}
            onClick={signin}
          />
        </div>
      </div>
    </div>
  );
}

const Input = react.forwardRef<HTMLInputElement, { placeholder: string }>(
  ({ placeholder }, ref) => (
    <div>
      <input
        ref={ref}
        placeholder={placeholder}
        type="text"
        className="px-4 py-2 rounded border-b-2 shadow-md"
      />
    </div>
  )
);
