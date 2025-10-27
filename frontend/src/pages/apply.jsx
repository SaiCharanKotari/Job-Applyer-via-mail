import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';

function Apply() {
  const [loading, setLoading] = useState(false);
  const [Auth, setAuth] = useState(false);
  const [filename, setFilename] = useState("");
  //----for nodemailer--
  const [mail, setMail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
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
    const formData = new FormData();
    formData.append('pdf', file);
    formData.append('subject', subject);
    formData.append('message', message);
    try {
      const res = await axios.post(`http://localhost:5000/apply/${user.id}`, formData, { withCredentials: true }, {
        "Content-Type": "multipart/form-data"
      });
      if (!res.data.success) { toast.error(res.data.message); }
      toast.success("successfully Saved");
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
                  <input type="email" value={mail} onChange={(event) => setMail(event.target.value)} className="w-96 p-3 rounded-xl" placeholder="Enter mail" />
                </div>
                <button onClick={() => handleSend()} className="btn btn-info rounded-xl ml-6 p-6 text-lg">Send</button>
                <button onClick={() => handleSave()} className="btn btn-info rounded-xl mx-6 p-6 text-lg">Save</button>
              </div>
              <div>
                <textarea value={subject} onChange={(event) => setSubject(event.target.value)} className="rounded-3xl p-4 border "
                  placeholder="subject.." rows="3" cols="120" />
              </div>
              <div>
                <textarea value={message} onChange={(event) => setMessage(event.target.value)} className="rounded-3xl p-4" placeholder="Message.." rows="10" cols="120" />
              </div>
              <div className="flex flex-col w-40">
                <label className="btn btn-info rounded-xl p-4 " htmlFor="file-upload">Upload File</label>
                <p className="ml-1 mt-2 w-full font-bold">{filename}</p>
                <input type="file" id="file-upload"
                  onChange={(event) => { setFile(event.target.files[0]); setFilename(event.target.files[0]?.name) }}
                  className=" bg-base-100 file:p-1 w-96 rounded-xl hidden" />
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