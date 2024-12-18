import { useState } from "react";
import { backendUrl } from "../App";
import axios from 'axios'
import { toast } from "react-toastify";


const Login = ({setToken}) => {

  const [email,setEmail] = useState('');
  const [password, setPassword] = useState('');



const onSubmitHandle = async  (e) =>{
 
// api fetching 

try {
  e.preventDefault()

  const resp = await axios.post(backendUrl + "/api/user/admin", {email, password})
  if (resp.data.success){
    setToken(resp.data.token)
  } else {
  toast.error("your are wrong email and password")
  }

  

} catch (error) {
  console.log(error)
}
}

  return (


    <div className="min-h-screen flex items-center justify-center w-full">
      <div className="bg-white shadow-md px-8 py-6 max-w-md">
        <h1 className="text-2xl font-bold mb-4">Admin panel</h1>

        <form onSubmit={onSubmitHandle}>
          <div className="mb-3 min-w-72">
            <p className="text-sm font-medium text-gray-700 mb-2">Email address</p>
            <input 
               onChange={(e)=> setEmail(e.target.value)}
               value={email}
               className="rounded-md w-full py-3 px-2 outline-none border border-gray-300" type="text" placeholder="Enter a email address" required />
          </div>

          <div  className="mb-3 min-w-72">
            <p className="text-sm font-medium text-gray-700 mb-2">Password</p>
            <input 
            onChange={(e) => setPassword(e.target.value)}
            value={password} 
            className="rounded-md w-full py-3 px-2 outline-none border border-gray-300" type="text" placeholder="Enter a email address "  />
          </div>

          <button  className="  w-full mt-2 py-2 px-4 text-white bg-black rounded-md" type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
