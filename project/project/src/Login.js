import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import Dashboard from './page/Dashboard';

// const axios = require('axios');

const LoginPage = () => {
  // State variables to store email and password
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate=useNavigate();

  // Function to handle form submission


  const handleSubmit = async (e) => {
    e.preventDefault();
   
 
    if (!email || !password) {
      console.log('Please fill in all fields.');
      return;
    }
 
    try {
      console.log(email)
      const response = await axios.post(
        'http://localhost:3000/api/auth/login',
        { email, password },
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    );
 
      console.log('bue')
        
      if (response.status === 210) {
        console.log('admin');

        const token = response.data.token;
          
        // Save the token to localStorage
        localStorage.setItem('token', token)

      //   const userRole = response.data.role;
      //  setRole(userRole);
      alert("hello admin");
        navigate('/dashboard');
     
    }


      if (response.status === 220) {
          console.log('user');

          const token = response.data.token;
            
          // Save the token to localStorage
          localStorage.setItem('token', token)

        //   const userRole = response.data.role;
        //  setRole(userRole);
        alert("hello user");
          navigate('/passReset');
       
      } else {
        console.log('Login failed. Please try again.');
       
      }
    } catch (error) {
      console.error('An error occurred:', error.message);
     
    }
 
    setEmail('');
    setPassword('');
  };
// has context menu
// Compose





  // const handleSubmit = (event) => {
  //   event.preventDefault();
   
  
  //   var remail=storedData[0].email;
  //    var rpassword=storedData[0].password;
   
  //   if(storedData){
  //       if (email === remail && password === rpassword) {
  //           // Redirect user to a different page
  //           console.log("matched");
  //           alert('Password matched');

  //           navigate('/RegistrationPage');
  //           // eslint-disable-next-line no-restricted-globals
  //           // 
            
  //         //   history.push('/dashboard'); // Replace '/dashboard' with your desired route
  //         } else {
  //           alert('Invalid email or password. Please try again.');
  //         }
  //   }
   
  // };



  return (
    <section className="vh-100" style={{ backgroundColor: '#508bfc' }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card shadow-2-strong" style={{ borderRadius: '1rem' }}>
              <div className="card-body p-5 text-center">

                <h3 className="mb-5">Sign in</h3>

                <form onSubmit={handleSubmit}>
                  <div className="form-outline mb-4">
                    <input
                      type="email"
                      className="form-control form-control-lg"
                      id="typeEmailX-2"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email"
                      required
                    />
                  </div>

                  <div className="form-outline mb-4">
                    <input
                      type="password"
                      className="form-control form-control-lg"
                      id="typePasswordX-2"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password"
                      required
                    />
                  </div>

                  {/* Checkbox */}
                  <div className="form-check d-flex justify-content-start mb-4">
                    <input className="form-check-input" type="checkbox" value="" id="form1Example3" />
                    <label className="form-check-label" htmlFor="form1Example3"> Remember password </label>
                  </div>

                  <button className="btn btn-primary btn-lg btn-block" type="submit">Login</button>
                </form>

                <hr className="my-4" />

                
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
