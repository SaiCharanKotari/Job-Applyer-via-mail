import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

function UserA() {
  const [mail, setMail] = useState("");
  const [pass, setPass] = useState("");
  const [loginorsignup, setLoginorsignup] = useState(true);
  const [show, setShow] = useState(true);

  const nav = useNavigate();

  async function handleSignup() {
    try {
      const res = await axios.post('http://localhost:5000/signup', {
        email: mail,
        password: pass
      })
      if (!res.data.success) { return toast.error(res.data.message); }
      toast.success(res.data.message);
    } catch (error) {
      toast.error("Error");
    }
    setMail("");
    setPass("");
  }
  async function handleLogin() {
    try {
      const res = await axios.post('http://localhost:5000/login', {
        mail,
        pass
      }, {
        withCredentials: true
      });
      if (!res.data.success) { return toast.error(res.data.message); }
      toast.success(res.data.message);
      nav('/apply', { state: res.data.user });
    } catch (error) {
      toast.error('error');
    }
    setMail("");
    setPass("");
  }

  return (
    <div className=" bg-slate-600/60 m-4 p-10 rounded-3xl">
      {loginorsignup ?
        <div className="flex flex-col gap-4 items-center justify-center h-[100%]">
          <div>
            <p className="font-serif text-2xl">Login to JA</p>
          </div>
          <input type="email" value={mail} onChange={(event) => setMail(event.target.value)} className="w-[clamp(1.5rem,14rem,14rem)] p-3 mb-4 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition"
            placeholder="Email" />
          <div>
            <div className="flex">
              <input type={show ? "password" : "text"} value={pass} onChange={(event) => setPass(event.target.value)} className="w-[clamp(1.5rem,14rem,14rem)] p-3 mb-4 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition"
                placeholder="Password" />
              <div onClick={() => show ? setShow(false) : setShow(true)} className="mt-3 ml-48 absolute">
                {show ?
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                    <path d="M3.53 2.47a.75.75 0 0 0-1.06 1.06l18 18a.75.75 0 1 0 1.06-1.06l-18-18ZM22.676 12.553a11.249 11.249 0 0 1-2.631 4.31l-3.099-3.099a5.25 5.25 0 0 0-6.71-6.71L7.759 4.577a11.217 11.217 0 0 1 4.242-.827c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113Z" />
                    <path d="M15.75 12c0 .18-.013.357-.037.53l-4.244-4.243A3.75 3.75 0 0 1 15.75 12ZM12.53 15.713l-4.243-4.244a3.75 3.75 0 0 0 4.244 4.243Z" />
                    <path d="M6.75 12c0-.619.107-1.213.304-1.764l-3.1-3.1a11.25 11.25 0 0 0-2.63 4.31c-.12.362-.12.752 0 1.114 1.489 4.467 5.704 7.69 10.675 7.69 1.5 0 2.933-.294 4.242-.827l-2.477-2.477A5.25 5.25 0 0 1 6.75 12Z" />
                  </svg> :
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  </svg>
                }
              </div>
            </div>
            <div className="flex justify-end">
              <p onClick={() => { handleFP() }} className="hover:underline cursor-pointer">forget password</p>
            </div>
          </div>
          <button onClick={() => handleLogin()} className="btn btn-primary">Login</button>
          <p onClick={() => loginorsignup ? setLoginorsignup(false) : setLoginorsignup(true)} className="text-lg hover:underline cursor-pointer">Create new account</p>
        </div> :
        <div className="flex flex-col gap-4 items-center justify-center h-[100%]">
          <div>
            <p className="font-serif text-2xl">Signup to JA</p>
          </div>
          <input type="email" value={mail} onChange={(event) => setMail(event.target.value)} className="w-[clamp(1.5rem,14rem,14rem)] p-3 mb-4 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition"
            placeholder="Email" />
          <div className="flex">
            <input type={show ? "password" : "text"} value={pass} onChange={(event) => setPass(event.target.value)} className="w-[clamp(1.5rem,14rem,14rem)] p-3 mb-4 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition"
              placeholder="Password" />
            <div onClick={() => show ? setShow(false) : setShow(true)} className="mt-3 ml-48 absolute">
              {show ?
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                  <path d="M3.53 2.47a.75.75 0 0 0-1.06 1.06l18 18a.75.75 0 1 0 1.06-1.06l-18-18ZM22.676 12.553a11.249 11.249 0 0 1-2.631 4.31l-3.099-3.099a5.25 5.25 0 0 0-6.71-6.71L7.759 4.577a11.217 11.217 0 0 1 4.242-.827c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113Z" />
                  <path d="M15.75 12c0 .18-.013.357-.037.53l-4.244-4.243A3.75 3.75 0 0 1 15.75 12ZM12.53 15.713l-4.243-4.244a3.75 3.75 0 0 0 4.244 4.243Z" />
                  <path d="M6.75 12c0-.619.107-1.213.304-1.764l-3.1-3.1a11.25 11.25 0 0 0-2.63 4.31c-.12.362-.12.752 0 1.114 1.489 4.467 5.704 7.69 10.675 7.69 1.5 0 2.933-.294 4.242-.827l-2.477-2.477A5.25 5.25 0 0 1 6.75 12Z" />
                </svg> :
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
              }
            </div>
          </div>
          <button onClick={() => handleSignup()} className="btn btn-primary">Signup</button>
          <p onClick={() => loginorsignup ? setLoginorsignup(false) : setLoginorsignup(true)} className="text-lg hover:underline cursor-pointer">Already have account</p>
        </div>
      }

      {/* {loginorsignup ? 1 : 0} */}
    </div>
  );
}
export default UserA;