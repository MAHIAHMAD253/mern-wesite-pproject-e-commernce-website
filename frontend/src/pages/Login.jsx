
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";

const Login = () => {
  const [currentState, setCurrentState] = useState("SignUP");
  const { token, setToken, navigate, backURl } = useContext(ShopContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      if (currentState === "SignUp") {
        const resp = await axios.post(backURl + "/api/user/register", { name, email, password });

        if (resp.data.success) {
          setToken(resp.data.token);
          localStorage.setItem("token", resp.data.token);
        } else {
          toast.error(resp.data.message);
        }
      } else {
        const resp = await axios.post(backURl + "/api/user/login", { email, password });

        if (resp.data.success) {
          setToken(resp.data.token);
          localStorage.setItem("token", resp.data.token);
        } else {
          toast.error(resp.data.message);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };



 useEffect(()=>{
  if( token ){
    navigate('/')
  }
 },[token])

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col items-center w-[90%] sm:w-96 m-auto gap-4 mt-14 text-gray-600">
      <div className="inline-flex items-center gap-6 mb-2 mt-14">
        <p className="prata-regular text-3xl">{currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-700" />
      </div>

      {currentState === "Login" ? null : (
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          className="w-full px-3 py-4 border border-gray-400 rounded-lg outline-none"
          type="text"
          placeholder="Enter the name"
          required
        />
      )}
      <input
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        className="w-full px-3 py-4 border border-gray-400 rounded-lg outline-none"
        type="email"
        placeholder="Enter your email"
        required
      />
      <input
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        className="w-full px-3 py-4 border border-gray-400 rounded-lg outline-none"
        type="password"
        placeholder="Password"
        required
      />

      <div className="w-full flex justify-between text-sm mt-[-8px]">
        <p className="cursor-pointer">Forget your password?</p>
        {currentState === "Login" ? (
          <p onClick={() => setCurrentState("SignUp")} className="cursor-pointer">
            Create an account
          </p>
        ) : (
          <p onClick={() => setCurrentState("Login")} className="cursor-pointer">
            Login here
          </p>
        )}
      </div>
      <button className="bg-black text-white py-2 px-8 mt-4 rounded font-light">
        {currentState === "Login" ? "Login" : "Sign Up"}
      </button>
    </form>
  );
};

export default Login;
