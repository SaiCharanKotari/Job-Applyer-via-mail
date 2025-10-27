import { useState, useEffect } from 'react';
import axios from 'axios';
import UserA from '../components/userA.jsx';

function Home() {

  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    async function handleget() {
      try {
        await axios.get('http://localhost:5000');
      } catch (error) {
      }
    }
    handleget();
    function handleresize() {
      setWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleresize);
    return () => window.removeEventListener('resize', handleresize);
  }, [])

  return (
    <>
      <div className="h-screen bg-gradient-to-br from-sky-400 via-indigo-500 to-blue-700">
        {width > 767 ?
          <div id="tab767" className="grid grid-cols-[30%,70%] h-full">
            <div className="bg-slate-700 flex items-center ">
              <p className="flex-1 text-[clamp(1.5rem,8vw,16rem)] opacity-5
            leading-none">
                JOB APPLYER
              </p>
            </div>
            <UserA />
          </div>
          :
          <div id="mobile" className="grid ">
            <UserA />
          </div>
        }
      </div>
    </>);
}

export default Home;
