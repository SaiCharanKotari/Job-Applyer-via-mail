import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';

function Apply() {
  const [loading, setLoading] = useState(false);
  const [sendloading, setSendloading] = useState(false);
  const [Auth, setAuth] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  //----for nodemailer--
  const [mail, setMail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);
  const [filename, setFilename] = useState("");

  const nav = useNavigate();
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
    async function Retrive() {
      try {
        const res = await axios.get(`http://localhost:5000/apply`, { withCredentials: true })
        setSubject(res.data.subject);
        setMessage(res.data.message);
        setFilename(res.data.filename);
        toast.success("Successfully retrived")
      } catch {
        toast.error("Cant retrive data");
      }
    }
    Auth();
    Retrive();
    function handleresize() {
      setWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleresize);
    return () => window.removeEventListener('resize', handleresize);
  }, [])

  async function handleLogout() {
    try {
      const res = await axios.post('http://localhost:5000/logout', {}, {
        withCredentials: true
      })
      toast.success('Loggedout Success')
      nav('/');
    } catch (error) {
      toast.error("unSuccessful")
      console.log(error);
    }
  }
  async function handleSend() {
    setSendloading(true);
    try {
      const res = await axios.post('http://localhost:5000/send', {
        subject,
        message,
        mail
      }, { withCredentials: true })
      if (!res.data.success) return toast.error("bad Request");
      toast.success("Message sent successfully");
    } catch (error) {
      toast.error("Failed to send");
    } finally {
      setSendloading(false);
    }
  }
  async function handleSave() {
    if (!file) { return toast.error("no file exist") };
    const formData = new FormData();
    formData.append('pdf', file);
    formData.append('subject', subject);
    formData.append('message', message);
    formData.append('filename', filename);
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
    {width > 767 ?
      <div>
        {
          loading ? 'loading...' :
            <div>
              {Auth ?
                <div className="h-screen bg-gradient-to-br from-sky-400 via-indigo-500 to-blue-700">
                  <div className="flex flex-col h-screen w-screen gap-10 justify-center items-center">
                    <button onClick={() => { handleLogout() }} className="btn btn-neutral absolute top-[8%] right-[5%]">Logout</button>
                    <div className="flex">
                      <div className="">
                        <input type="email" value={mail} onChange={(event) => setMail(event.target.value)} className="w-96 p-3 rounded-xl" placeholder="Enter mail" />
                      </div>
                      <button onClick={() => handleSend()} className="btn btn-info rounded-xl ml-6 p-6 text-lg">{sendloading ? "Sending.." : "Send"}</button>
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
                </div>
                :
                <div className="flex flex-col justify-center items-center h-screen w-screen">
                  <h1>Please Login first</h1>
                  <button className="btn btn-warning" onClick={() => nav('/')}>To Login in page</button>
                </div>
              }
            </div>
        }
      </div> : <p>only in laptop</p>
    }
  </>);
}

export default Apply;