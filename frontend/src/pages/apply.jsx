import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';

function Apply() {
  const [loading, setLoading] = useState(false);
  const [Auth, setAuth] = useState(false);
  // const [filename, setFilename] = useState("");
  //----for nodemailer--
  const [mail, setMail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setmessage] = useState("");
  const [file, setFile] = useState(null);

  const location = useLocation();
  const user = location.state;

  useEffect(() => {
    async function Auth() {
      try {
        setLoading(true);
        const res = await axios.post('http://localhost:5000/', {}, { withCredentials: true });
        if (!res.data.success) { toast.error("unAuthorised"); setAuth(false); }
        else {
          setAuth(true);
        }
      } catch (error) {
        toast.error("unAuthorised");
        console.log(error);
        setAuth(false);
      } finally {
        setLoading(false);
      }
    }
    Auth();
  }, [])

  async function handleLogout() {
    try {
      const res = await axios.post('http://localhost:5000/logout', {}, {
        withCredentials: true
      })
      toast.success('Loggedout Success')
    } catch (error) {
      toast.error("unSuccessful")
      console.log(error);
    }
  }
  function handleSend() {

  }
  async function handleSave() {

    try {

    } catch (error) {
      toast.error("error");
    }
  }
  return (<>
    {loading ? 'loading...' :
      <div>
        {Auth ?
          <div className="h-screen bg-gradient-to-br from-sky-400 via-indigo-500 to-blue-700">
            <div className="flex flex-col h-screen w-screen gap-10 justify-center items-center">
              <div className="flex">
                <div className="">
                  <input type="email" className="w-96 p-3 rounded-xl" placeholder="Enter mail" />
                </div>
                <button onClick={() => handleSend()} className="btn btn-info rounded-xl ml-6 p-6 text-lg">Send</button>
                <button onClick={() => handleSave()} className="btn btn-info rounded-xl mx-6 p-6 text-lg">Save</button>
              </div>
              <div>
                <textarea className="rounded-3xl p-4 border "
                  placeHolder="subject.." rows="3" cols="120" />
              </div>
              <div>
                <textarea className="rounded-3xl p-4" placeHolder="Message.." rows="10" cols="120" />
              </div>
              <div>
                <label className="btn btn-info rounded-xl p-4" htmlFor="file-upload">Upload File</label>
                <p className="ml-1 mt-2 font-bold">{file.name}</p>
                <input type="file" id="file-upload" onChange={(event) => setFile(event.target.files[0])} className="w-96 bg-base-100 file:p-1 rounded-xl hidden" />
              </div>
            </div>
            {/* <button onClick={() => { handleLogout() }} className="btn btn-neutral">Logout</button> */}
          </div>
          :
          <h1>Please Login first</h1>
        }
      </div>
    }
  </>);
}

export default Apply;