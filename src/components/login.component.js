import React, { createContext, useRef } from "react";
import { useState,useEffect } from "react";
//import AuthService from "../services/auth.service";
import axios from "axios";
import { Link, json } from "react-router-dom";
import { Navigate,useNavigate } from "react-router-dom";
import { useContext } from "react";
import EmployeeDataTable from "../AddEmployee";
import { useUser } from "./context";
import GoogleLogin from "react-google-login";
import { GoogleLogout } from "react-google-login";

const UsernameContext = createContext();

const Login = (props) => {

    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [success,setSuccess]=useState(false);
    const [message,setMessage]=useState('');
    const [EmailValid,setEmailValid]=useState('')
    const [pwdValid,setPwdValid]=useState('')
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showLoginForm, setShowLoginForm] = useState(false);
    const [ profile, setProfile ] = useState([]);
    const [ user, setUser ] = useState([]);


    const clientId = '423146661767-8qma2nmn1h9drsvjknvp8qgmdipak5jj.apps.googleusercontent.com'; // Replace 'your-client-id' with your actual Google client ID


    const emailref=useRef(null);
    const { loginUser } = useUser();

    const navigate=useNavigate();

    

     const onChangeEmail=(e)=>{
      setEmail(e.target.value);
     }
     const onChangePassword=(e)=>{
      setPassword(e.target.value);
     }

    const validate=()=>{
        if(!email){
            setEmailValid("Please Enter Email");
            return false;
        }else{
            setEmailValid("")
        }
        if(!password){
            setPwdValid("Please Enter Password");
            return false;
        }else{
            setPwdValid("");
        }
        //if(email && password){
            return true;
        //}
     }

     const handleLogin=(e)=>{
      e.preventDefault();

      let isValid=validate();
       if(!isValid){ 

       }else{
       // alert("Ok");
        //const API_URL="https://639dc5103542a261304f55c2.mockapi.io/test_react";
        const API_URL="http://localhost:9100/emplogin";
      
         //axios.get(API_URL+'/signup').then((respone)=>{
          axios.post(API_URL,{
            email,
            password
          }).then((respone)=>{
            var msg=respone.data.message;
           // alert(respone.data.accessToken);
            // alert(JSON.stringify(respone))
             if(msg=="Wrong Mail"){
              setEmailValid("Wrong Email");
              setEmail('')
              emailref.current.value=''
             }else if(msg=="Wrong Password"){
              setPwdValid("Wrong Password")
             }else if(msg==1){
              alert("Welcome");
              localStorage.setItem('user',JSON.stringify(respone.data));
              navigate('/employees')
             }
            //alert("Record Fetched Successfully");
         }).catch(error=>{
             alert("Error in inserting"+error)
         });
       
       }
       const userData = { name: email, email: 'john@example.com' };

       loginUser(userData);
   
     }
     const onSuccess = (response) => {
      console.log('Login success:', response);
      setIsLoggedIn(true);
      setUser(response)
     // navigate('/employees')

    };

  
    const onFailure = (error) => {
      console.error('Login failure:', error);
    };

    const logout = () => {
      const auth2 = window.gapi.auth2.getAuthInstance();
      auth2.signOut().then(() => {
        console.log('User signed out.');
        setIsLoggedIn(false); // Update the login status
        setShowLoginForm(true); // Show the email login form after logout

      });
    };
  
    
    const handleLogoutFailure = (error) => {
      console.error('Logout Failure:', error);
    };
  
    useEffect(
      () => {
          if (user) {
            const token=user.accessToken
            // const jsonObject = JSON.parse(user);
            // const singleValue = jsonObject.access_token;
            // alert(singleValue)
            axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${token}`, {
                      headers: {
                          Authorization: `Bearer ${user.access_token}`,
                          Accept: 'application/json'
                      }
                  })
                  .then((res) => {
                      setProfile(res.data);
                  })
                  .catch((err) => alert(err));
          }
      },
      [user]
  );

  
    return(
        <>
        <UsernameContext.Provider value={email}>
        <form onSubmit={handleLogin}>
        <div className="col-md-12">
          <div className="card card-container">
        
        <div className="form-group">
          <label>Email</label>
          <input
             type="text"
             className="form-control"
             name="email"
             value={email}
             onChange={onChangeEmail}
             ref={emailref}
          />
        </div>
        <div >{EmailValid}</div>
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
        <div>{pwdValid}</div>
        <div className="form-group">
          <button className="btn btn-primary btn-block">Login</button>
          <Link to="/register" >Register</Link>
          
          {isLoggedIn ? (
        <>
          <p>User is logged in.</p>
          <p>Name: {profile.name}</p>
                    <p>Email Address: {profile.email}</p>
                    <br />
                    <br />

          <GoogleLogout
            clientId={clientId}
            buttonText="Logout"
            onLogoutSuccess={logout}
            onFailure={handleLogoutFailure}
          />
        </>
      ) : (
        <GoogleLogin
          clientId={clientId}
          buttonText="Login with Google"
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy={'single_host_origin'}
          prompt="select_account" // Ensure users are prompted to select an account
        />
      )}
        </div>
        </div>
        </div>
        <div>
     
    </div>


        </form>
        </UsernameContext.Provider>
        </>
    )
}
export default Login;
export {UsernameContext};
