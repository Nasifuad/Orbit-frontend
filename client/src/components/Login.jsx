import { useState } from "react";
import { Button } from "./ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useStore } from "@/store/ZusStore";

const Login = () => {
  const { login } = useStore();
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const handleLogin = async (e) => {
    e.preventDefault();
    const loginData = { userName, password };
    if (loginData) {
      console.log("data for the login", loginData);
      const data = await login(loginData);
      setSuccess(true);
      console.log("Data coming from server", data);
    }
  };
  return (
    <div className="bg-black shadow-gray-800 shadow rounded-2xl  w-[400px] h-[600px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 relative z-50 p-10 flex flex-col gap-6 ">
      <h1 className="text-white text-4xl text-center font-bold">Login</h1>
      <form onSubmit={(e) => handleLogin(e)} className="flex flex-col gap-4">
        <input
          required
          type="text"
          placeholder="Name or Email"
          className="px-4 py-3 rounded-lg bg-[#2c2f33] text-white"
          onChange={(e) => setUsername(e.target.value)}
          value={userName}
        />

        <input
          required
          type="password"
          placeholder="Password"
          className="px-4 py-3 rounded-xl bg-[#2c2f33] text-white"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && (
          <p className="text-red-500 text-center text-sm font-thin">
            Invalid Credentials
          </p>
        )}
        {success && (
          <p className="text-green-500 text-center text-sm font-thin">
            Login Successfull
          </p>
        )}
        <div>
          <div className="items-top flex space-x-2 text-white px-2">
            <Checkbox required id="terms1" className="border-white" />
            <div className="grid gap-1.5 leading-none">
              <label
                htmlFor="terms1"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Accept terms and conditions
              </label>
              <p className="text-sm text-muted-foreground">
                You agree to our Terms of Service and Privacy Policy.
              </p>
            </div>
          </div>
        </div>
        <Button variant="outline" className="w-max mx-auto px-8">
          Login
        </Button>
      </form>
    </div>
  );
};

export default Login;
