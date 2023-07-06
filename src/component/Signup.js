import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Signup(props) {

  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" })
  let navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = credentials;
     const host = "https://inotebook-h2xf.onrender.com";
    const response = await fetch(
      `${host}/api/auth/createUser`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIwNTk2YjFmODg1N2FmNmM5YmIzMzlhIn0sImlhdCI6MTY0NTE4Mzc0NH0.FYkQshZOA4lbqQH8T0BvpPLv9-JDCZN-L1SYdSeV8JM"
        },
        body: JSON.stringify({ name, email, password }),
      }
    );

    const json = await response.json();
    console.log(json)

    if (json.success) {
      //save the auth token and redirect
      localStorage.setItem('token', json?.authtoken);
      navigate("/");
      props.showAlert("Account Created Successfully", "success")
    }
    else {
      props.showAlert("Invalid Details", "danger")

    }
  }
  console.log(credentials)
  const onChange = (event) => {
    // const { name, value } = event.target
    setCredentials({ ...credentials, [event.target.name]: event.target.value })
  }

  return (
    <>
      <div className='container my-3'>
        <h2>Sign Up to use iNotebook</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group my-3">
            <label htmlFor="name">Name</label>
            <input type="text" className="form-control" id="name" name="name" placeholder="Enter email" onChange={onChange} />
          </div>
          <div className="form-group my-3">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input type="email" className="form-control" id="exampleInputEmail1" name="email" aria-describedby="emailHelp" placeholder="Enter email" autoComplete="username" onChange={onChange} />
            <small id="emailHelp" className="form-text text-muted">We never share your email with anyone else.</small>
          </div>
          <div className="form-group my-3">
            <label htmlFor="password">Password</label>
            <input type="password" className="form-control" id="password" name="password" placeholder="Password" autoComplete="new-password" onChange={onChange} minLength={5} required />
          </div>
          <div className="form-group my-3">
            <label htmlFor="cpassword">Confirm Password</label>
            <input type="password" className="form-control" id="cpassword" name="cpassword" placeholder="Password" autoComplete="new-password" onChange={onChange} minLength={5} required />
          </div>

          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    </>
  )
}

export default Signup