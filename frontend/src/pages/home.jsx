import { useState } from 'react';

function Home() {
  const [mail, setMail] = useState('');
  const [pass, setPass] = useState('');
  return (
    <>
      <div className="flex flex-col gap-2 h-screen bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 justify-center items-center">
        <h1 className="">hi this is home</h1>
        <div>
          <label for="mail">Mail : </label>
          <input type="text" className="" value={mail} onChange={(e) => setMail(e.target.value)} placeholder="Enter Mail Here.." />
        </div>
        <div>
          <label for="pass">Pass : </label>
          <input type="text" className="" value={pass} onChange={(e) => setPass(e.target.value)} placeholder="Enter Pass Here.."></input>
        </div>
        {mail}
      </div>
    </>);
}

export default Home;