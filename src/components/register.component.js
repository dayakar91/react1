import React from "react";
import { useState } from "react";
//import AuthService from "../services/auth.service";
import axios from "axios";
import { render } from "@testing-library/react";
import Login from "./login.component";
import { Navigate,useNavigate } from "react-router-dom";

const Register = (props) => {

    const [username,setUsername]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [success,setSuccess]=useState(false);
    const [message,setMessage]=useState('');
  const navigate=useNavigate();
    const onChangeUsername=(e)=>{
        setUsername(e.target.value)
     }
     const onChangeEmail=(e)=>{
      setEmail(e.target.value);
     }
     const onChangePassword=(e)=>{
      setPassword(e.target.value);
     }

     const handleRegister=(e)=>{
      e.preventDefault();

    // const API_URL="https://639dc5103542a261304f55c2.mockapi.io/test_react";
      const API_URL="http://localhost:9100/empregi";
      // AuthService.Register(username,email,password).then(
      //   response=>{
      //     setMessage(response.data.message);
      //     setSuccess(true);
      //   },error=>{
      //      const resMessage=(error.response);
      //      setMessage(resMessage);
      //      setSuccess(false)
      //   }
      // );

      axios.post(API_URL,{
        username,
        email,
        password
      }).then((respone)=>{
        // alert("Record Inserted Successfully");
        // navigate('/login')
         alert(respone.data.message);
      }).catch(error=>{
          alert("Error in inserting"+error);
      });

      
     }

    // render()
    // {
    //   if(!success){
    return(
        <>
        
        <form onSubmit={handleRegister}>
        <div className="col-md-12">
          <div className="card card-container">
        <div className="form-group">
        <label htmlFor="username">Username</label>
          <input
             type="text"
             className="form-control"
             name="username"
             value={username}
             onChange={onChangeUsername}
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
             type="text"
             className="form-control"
             name="email"
             value={email}
             onChange={onChangeEmail}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="text"
            className="form-control"
            name="password"
            value={password}
            onChange={onChangePassword} 
          />
        </div>
        <div className="form-group">
          <button className="btn btn-primary btn-block">Sign Up</button>
        </div>
        </div>
        </div>
        </form>
        </>
    )
      // }else{
      //   <div>Resigterd Successfully</div>

      // }
    //}


}
export default Register;