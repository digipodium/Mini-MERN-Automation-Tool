import { Formik } from "formik"
import React, { useContext } from "react"
import Swal from "sweetalert2"
import { NavLink, useNavigate } from "react-router-dom"
import { UserContext } from "../userContext"
import { Link } from "react-router-dom";
// import './login.css';

const Login = () => {

  const navigate = useNavigate();

  const {setLoggedIn} = useContext(UserContext);

  const userSubmit = async (formdata) => {
    console.log(formdata)

    // fetch - url,request method, data, data format

    const res = await fetch("http://localhost:5000/user/authenticate", {
      method: "POST",
      body: JSON.stringify(formdata),
      headers: {
        "Content-Type": "application/json",
      },
    })

    

    if (res.status === 200) {
      Swal.fire({
        icon: "success",
        title: "login successful",
        text: "You are Logged In",
      })
      res.json()
      .then(data => {
        sessionStorage.setItem('user', JSON.stringify(data));
        setLoggedIn(true);
        navigate("/ds");
      })
    } else if (res.status === 400) {
      Swal.fire({
        icon: "error",
        title: "login failed",
        text: "Invalid username or password",
      })
    } else {
      Swal.fire({
        icon: "error",
        title: "login faild",
        text: "Something went wrong",
      })
    }
  }

  return (
    <div className="mycard">
      <div className="col-md-4 mx-auto bg-light">
        <div className="card mt-5">
          <div className="card-body">
            <Formik initialValues={{ email: "", password: "" }} onSubmit={userSubmit}>
              {({ values, handleChange, handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                  <h3 className="text-center">Sign-in Here</h3>
                  <hr />

                  <label className="mt-4">Email</label>
                  <input value={values.email} onChange={handleChange} id="email" className="form-control"  required
                        type="email"/>

                  <label className="mt-4">Password</label>
                  <input value={values.password} onChange={handleChange} id="password" required type="password" className="form-control" />
                       

                    <button className="btn btn-secondary mt-5 px-5">Login Now</button>
                    
                    
                    
                      <Link to="/signup">Don't have an account</Link>
                      
                </form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
