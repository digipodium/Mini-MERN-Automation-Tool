



import { Formik } from 'formik';
import React from 'react';
import Swal from 'sweetalert2';
// import './login.css';

const Login = () => {

    const userSubmit =  async (formdata) => {
        console.log(formdata);

        // fetch - url,request method, data, data format

       const res= await fetch('http://localhost:5000/user/authenticate',
        {method: 'POST',
      body : JSON.stringify(formdata),
      headers : {
        'Content-Type' : 'application/json'
      }
    })

    Swal.fire({
  title: 'Enter your name',
  input: 'text',
  customClass: {
    validationMessage: 'my-validation-message'
  },
  preConfirm: (value) => {
    if (!value) {
      Swal.showValidationMessage(
        '<i class="fa fa-info-circle"></i> Your name is required'
      )
    }
  }
})

    if(res.status===200)
    {  Swal.fire({
      icon : 'success',
      title : 'login successful',
       text : 'You are Logged In'
    })
  }else if(res.status===400){ Swal.fire({
    icon : 'error',
    title : 'login failed',
     text : 'Invalid username or password'
  })
    }

    else{
      Swal.fire({
        icon : 'error',
        title : 'login faild',
         text : 'Something went wrong'
      })
       
    }
    
    }

    return (
        <div className="mycard">
            <div className="col-md-4 mx-auto bg-light">
                <div className="card mt-5">
                    <div className="card-body">

                        <Formik initialValues={{email : '', password : ''}} onSubmit={userSubmit}>
                            {({values, handleChange, handleSubmit}) => (
                                <form onSubmit={handleSubmit}>
                                    
                                    <h3 className="text-center">Sign-in Here</h3>
                                    <hr />

                                    <label className='mt-4'>Email</label>
                                    <input value={values.email} onChange={handleChange} id="email" className='form-control' />
                                    
                                    <label className='mt-4'>Password</label>
                                    <input value={values.password} onChange={handleChange} id="password" type="password" className='form-control' />
                                
                                    <button className='btn btn-secondary mt-5'>Login Now</button>

                                </form>
                            )}
                        </Formik>

                    </div>
                </div>
            </div>
        </div>
  )
}

export default Login;