import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Employee from './Test1';
import Car from './Car';
import Myform from './Form';
import Layout from './pages/Layout';
import Home from './pages/Home';
import Blogs from './pages/Blogs';
import Contact from './pages/Contact';
import NoPage from './pages/NoPage';
import EmployeeForm from './EditEmployee';
import { Navigate, useLocation } from 'react-router-dom';
import axios from 'axios';

import { jwtDecode } from 'jwt-decode';
import Login from './components/login.component';
const root = ReactDOM.createRoot(document.getElementById('root'));
const root1 = ReactDOM.createRoot(document.getElementById('root1'));
const root2 = ReactDOM.createRoot(document.getElementById('root2'));
const root3 = ReactDOM.createRoot(document.getElementById('root3'));
const root4 = ReactDOM.createRoot(document.getElementById('root4'));
const root5 = ReactDOM.createRoot(document.getElementById('root5'));
//const root10 = ReactDOM.createRoot(document.getElementById('root10'));


var tokenuser= JSON.parse(localStorage.getItem('user'));
//var token=tokenuser.accessToken;
if(!tokenuser){
  //window.location.href='/login';
}else{
  var token=tokenuser.accessToken;
  const decodedJwt = jwtDecode(token)
  if (decodedJwt.exp * 1000 < Date.now()) {
    alert("Token Expired");
    localStorage.removeItem('user');
    <Login/>
  }
// if(token){
//   axios.defaults.headers.common["Authorization"]=`Bearer ${token}`;
// }else{
//   //axios.defaults.headers.common["Authorization"];
// }
// let decodedToken = jwtDecode(token);
//   console.log("Decoded Token", decodedToken);
//   let currentDate = new Date();

//   // JWT exp is in seconds
//   if (decodedToken.exp * 1000 < currentDate.getTime()) {
//     alert("Token expired.");
//   } else {
//     alert("Valid token");   
//    // result = true;
//   }
}
const x = 5;
let text = "Goodbye";
if (x < 10) {
  text = "Goodmorning";
}
const myElement = <h5>{text}</h5>;
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

root1.render(
  <React.StrictMode>
    {/* <Employee/> */}
  </React.StrictMode>
);

const carinfo={name:'Verna',model:'Hyndai'};
const cars=['Ford','BMW','Audi','Hyndai'];

// root2.render(myElement);
// root3.render(<Car brand={carinfo} cars={cars}/>);
// root4.render(<Myform />);
//var eid=5;
var url=window.location.href;
var spliturl=url.split('/');
var sp1=spliturl.toString().split(',');
var eid=sp1[4];
// root5.render(<EmployeeForm empid={eid}/>);

reportWebVitals();
