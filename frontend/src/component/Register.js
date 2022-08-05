import { Formik } from 'formik';
import React from 'react';
import Swal from 'sweetalert2';
 import './register.css';

const Register = () => {

//  1. submission function
const userSubmit = async (formdata) =>{
    console.log(formdata);
    
    //  1. reuest url
    //  2. request method- get put post delete
    //  3. request body
    //  4. data format 

    // await will execute this function synchronously

    const response= await  fetch('http://localhost:5000/user/add', {
        method: 'POST', 
        body : JSON.stringify(formdata),
        headers: {
            'Content-Type': 'application/json'
        }

    })

    // ajax asynchronous javascript n xml
//  ==== type same
     if(response.status===200)
     {console.log(' Success');
     Swal.fire({
        icon : 'success',
        title : 'Success!',
      text: 'Thanks for Signing Up! '
         
      })
    }else{
        console.log('Failed');
        Swal.fire({
            icon : 'error',
            title : 'login faild',
             text : 'Something went wrong'
          })
    }
}

    

// 2. use formik in JSX


  return (
    <div className="main" style={{minHeight : '100vh'}}>
    <div className="container" style={{paddingTop : '15vh'}}>
        <div class="card" >
            <div class="row" >
           
            <div class="card-body col-md-7">
                <div class="signup-bg">

                </div>
            </div>
             
            
            <div class="col-md-5">
                <div class="card-body">
                <b><h2 className="form-title" style={{ textAlign : 'center'}} >Create an account<img src="https://cdn.iconscout.com/icon/premium/png-128-thumb/add-user-2606382-2183808.png" class="logo"/></h2></b>
        
        <hr/>
        <Formik initialValues={{ fullname: '', email: '',  password :'' }} onSubmit={userSubmit}>
        
        { ({ values, handleChange, handleSubmit})=> (
             
             <form onSubmit={handleSubmit} >
            
             <input value={values.fullname} onChange={handleChange} id="name" placeholder="Enter Fullname" className="form-control mb-4"/>
             {/* <input value={values.age} onChange={handleChange} id="age" placeholder="Age" className="form-control mt-4"/> */}
             
             <input value={values.email} onChange={handleChange} id="email" placeholder="Enter Valid Email" className="form-control mb-4"/>
             <input value={values.password} onChange={handleChange} id="password" placeholder="Enter Secure Password" className="form-control mb-4" type="password"/>
             
             <input type="checkbox" />
             <label for="">I agree to the T&C</label>
             <br/>

             {/* type- button , submit, reset */}
             <button type='submit' className='btn btn-lg btn-success mt-5'>REGISTER</button>

             <br/>
            <br/>
            <a href='http://localhost:3000/Loginpage'>Already Registered?Login Here</a>
            
            </form>

        )}
        </Formik>
       
        </div>
        </div>
        </div>
       </div>
       
        </div>
        </div>
  )
}

export default Register;