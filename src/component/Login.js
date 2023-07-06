import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"

function Login(props) {

    const [credentials, setCredentials] = useState({ email: "", password: "" })

    let navigate = useNavigate();
    const handleOnSubmit = async (e) => {
         const host = "https://inotebook-h2xf.onrender.com/";
        e.preventDefault();
        const response = await fetch(
          `${host}/api/auth/loginUser`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              // "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIwNTk2YjFmODg1N2FmNmM5YmIzMzlhIn0sImlhdCI6MTY0NTE4Mzc0NH0.FYkQshZOA4lbqQH8T0BvpPLv9-JDCZN-L1SYdSeV8JM"
            },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          }
        );

        const json = await response.json();
        console.log(json)
        if (json.success) {
            //save the auth token and redirect
            localStorage.setItem('token', json.authtoken);
            props.showAlert("Login Successfully", "success")
            navigate("/");
            // navigate("/");
        }
        else {
            props.showAlert("Invalid Credential", "danger")

        }
    }
   

    const handleOnChange = (event) => {
        // const { name, value } = event.target
        setCredentials({ ...credentials, [event.target.name]: event.target.value })
    }

    console.log(credentials)
    return (
        <div className='container' style={{ margin: "2cm" }}>
            <h2>Login in to continue using iNotebook</h2>
            <form onSubmit={handleOnSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label ">EMAIL ADRESS</label>
                    <input type="email" className="form-control" value={credentials.email} onChange={handleOnChange} id="email" aria-describedby="emailHelp" name="email" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">PASSWORD</label>
                    <input type="password" className="form-control" value={credentials.password} onChange={handleOnChange} id="password" name='password' autoComplete='current-password"' />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login