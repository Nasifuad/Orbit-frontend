import { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { useStore } from "@/store/ZusStore";
import { ImageIcon } from "lucide-react";

const SignUp = () => {
  const { signup } = useStore();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [coverPhoto, setCoverPhoto] = useState(null);
  const [nameError, setNameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [notMatch, setNotMatch] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();

    setNameError(name.length < 6);
    setPasswordError(password.length < 6);
    setNotMatch(password !== confirmPass);

    if (nameError || passwordError || notMatch) {
      return;
    }

    const formData = new FormData();
    formData.append("userName", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("confirmPass", confirmPass);

    if (avatar) formData.append("avatar", avatar);
    if (coverPhoto) formData.append("cover", coverPhoto);

    console.log("FormData to submit:", formData);

    try {
      await signup(formData);
      navigate("/dashboard");
    } catch (error) {
      console.log("SignUp error:", error);
    }
  };

  return (
    <div className="bg-[#15181c] rounded-2xl w-[400px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 relative z-50 p-6">
      <RxCross1
        className="text-[#71767b] text-xl absolute top-3 right-3 hover:bg-[#2f3336] rounded-full p-1 cursor-pointer"
        onClick={() => navigate("/")}
      />
      <h1 className="text-white text-2xl font-bold text-center mb-6">
        Create your account
      </h1>
      <form className="flex flex-col gap-3" onSubmit={handleSignUp}>
        <input
          type="text"
          placeholder="Name"
          className="px-4 py-2 rounded-full bg-[#202327] text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="px-4 py-2 rounded-full bg-[#202327] text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="px-4 py-2 rounded-full bg-[#202327] text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          className="px-4 py-2 rounded-full bg-[#202327] text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={confirmPass}
          onChange={(e) => setConfirmPass(e.target.value)}
          required
        />

        {nameError && (
          <p className="text-red-500 text-sm px-2">
            Name must be 6 characters or more
          </p>
        )}
        {passwordError && (
          <p className="text-red-500 text-sm px-2">
            Password must be 6 characters or more
          </p>
        )}
        {notMatch && (
          <p className="text-red-500 text-sm px-2">Passwords do not match</p>
        )}

        <div className="flex items-center gap-2">
          <label
            htmlFor="avatar"
            className="px-4 py-2 rounded-full bg-[#202327] text-white cursor-pointer flex items-center gap-2"
          >
            <ImageIcon className="text-[#71767b]" size={20} />
            <span className="text-sm">Avatar</span>
          </label>
          <input
            id="avatar"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => setAvatar(e.target.files[0])}
          />
          {avatar && <span className="text-white text-sm">{avatar.name}</span>}
        </div>

        <div className="flex items-center gap-2">
          <label
            htmlFor="cover"
            className="px-4 py-2 rounded-full bg-[#202327] text-white cursor-pointer flex items-center gap-2"
          >
            <ImageIcon className="text-[#71767b]" size={20} />
            <span className="text-sm">Cover</span>
          </label>
          <input
            id="cover"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => setCoverPhoto(e.target.files[0])}
          />
          {coverPhoto && (
            <span className="text-white text-sm">{coverPhoto.name}</span>
          )}
        </div>

        <Button
          variant="outline"
          type="submit"
          className="w-full py-2 rounded-full text-white border border-[#38444d] hover:bg-[#2f3336]"
        >
          Sign Up
        </Button>

        <p className="text-[#71767b] text-center text-sm">
          Already have an account?{" "}
          <span
            className="text-[#1d9bf0] cursor-pointer hover:underline"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
