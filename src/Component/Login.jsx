import React, { useState } from "react";
import { FaEyeSlash } from "react-icons/fa";
import './login.css';
import { auth } from '../Firebase/firebase'; 
import { signInWithEmailAndPassword } from "firebase/auth";
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [PasswordCheck, setPasswordcheck] = useState(false);
  const [logged, setLogged] = useState(false);

  const Navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handlepasswordcheck = () => {
    setPasswordcheck(!PasswordCheck);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (typeof window !== "undefined") {
        localStorage.setItem("Access-Token", user.stsTokenManager.accessToken);
      }

      swal({
        title: "Logged In",
        text: "You Have Logged In Successfully",
        icon: "success",
      });
      Navigate('/Home');
      setLogged(true);
      setEmail("");
      setPassword("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <section>
        {logged && (
          <div className="alert alert-primary" role="alert">
            Logged in
          </div>
        )}

        <div className="container-fluid">
          <div className="row justify-content-center align-items-center" style={{ height: "100vh" }}>
            <div className="col-12 col-sm-8 col-md-6 col-lg-4">
              <div className="card p-4 shadow-sm">
                <h1 className="text-center display-6">Login</h1>
                <form className="mt-3">
                  <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Your Email"
                      value={email}
                      onChange={handleEmailChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">
                      Password
                    </label>
                    <div className='icon_container'>
                      <input
                        type={PasswordCheck ? "text" : "password"}
                        className="form-control"
                        id="exampleInputPassword1"
                        placeholder="Your Password"
                        value={password}
                        onChange={handlePasswordChange}
                      />
                      <div className='icon' onClick={handlepasswordcheck}>
                        <FaEyeSlash />
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={handleSubmit}
                    className="btn btn-primary mt-2 w-100"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
