//import logo from './logo.svg';
//import './App.css';
import React from 'react';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import Layout from './pages/Layout';
import Home from './pages/Home';
import Blogs from './pages/Blogs';
import Contact from './pages/Contact';
import NoPage from './pages/NoPage';
import { useState } from 'react';
import Todos from './memo';
import "bootstrap/dist/css/bootstrap.min.css";
import EmployeeDataTable from './AddEmployee';
import EmployeeForm from './EditEmployee';
import { useParams } from 'react-router-dom';
import Register from './components/register.component';
import Login from './components/login.component';
import logout from './logout';
import Logout from './logout';
import List from './Addcart';
import { createContext } from 'react';
import { UserProvider } from './components/context';
import AddPos from './AddPos';
import Invoice from './AddInvoice';
//import { gapi } from 'gapi-script';
import Fee from './Fee';
import AjaxRedux from './AjaxRedux';
import Tabs from './components/CompoundTabs';
import Parent from './components/ParentComponet';
import Child from './components/ChildComponent';
import StudentList from './components/customapi';
import LoginApi from './components/loginapi';
import UsememoEx from './components/usememoex';
import UsecallbackEx from './components/usecallbacex';
export const UsernameContext = createContext();
function App() {

  // gapi.load("client:auth2", () => {
  //   gapi.client.init({
  //     clientId:
  //       "423146661767-8qma2nmn1h9drsvjknvp8qgmdipak5jj.apps.googleusercontent.com",
  //     plugin_name: "chat",
  //   });
  // });

const [count,setCount]=useState(0);
const [todos,setTodos]=useState(["ToDo1","ToDo2"]);
const [color,setColor]=useState("red")
const increment=()=>{
  setCount((c)=>c+1)
}
  return (
    <div className="App">
    {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      
    </div>,
       <>
       <Todos todos={todos} />
       <hr />
       <div>
         Count: {count}
         <button onClick={increment}>+</button>
       </div>
     </>,
     <>
     <h1>My favourate color is : {color}</h1>
     <button type='button' onClick={()=>setColor('Blue')}>Blue</button>
     <button type='button' onClick={()=>setColor('Yellow')}>Yellow</button>
     <button type='button' onClick={()=>setColor('Pink')}>Pink</button>
     </>,
    <>
    <div  className="container card mb-4 box-shadow">

  <div className="card-header">
    <h4 className="my-0 font-weight-normal">React CRUD Example</h4>
  </div>

  <BrowserRouter>
  <UserProvider>
  <Routes>
          <Route path='/' element={<Layout/>}>
            <Route index element={<Home/>}/>
            <Route path='blogs' element={<Blogs/>}/>
            <Route path='home' element={<Home/>}/>
            <Route path='contact' element={<Contact/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='*' element={<NoPage/>}/>
            <Route path='/logout' element={<Logout/>}/>
            <Route path='/employees' element={<EmployeeDataTable/>}/>
            <Route path='/addcart' element={<List/>}/>
            <Route path='/addpos' element={<AddPos/>}/>
            <Route path='/fee' element={<Fee/>}/>
            <Route path='/addinvoice' element={<Invoice/>}/>
            <Route path='/AjaxRedux' element={<AjaxRedux/>}/>
			      <Route path='/Tabs' element={<Tabs/>}/>
			      <Route path='/parent' element={<Parent/>}/>
			      <Route path='/student' element={<StudentList/>}/>
            <Route path='/loginapi' element={<LoginApi/>}/>
            <Route path='/usememoex' element={<UsememoEx/>}/>
            <Route path='/usecallbackex' element={<UsecallbackEx/>}/>
            {/* <Route path='edit/:id' element={<EmployeeForm />} render={(props) => <EmployeeForm {...props} />} /> */}
          </Route>
  </Routes>
      {/* <EmployeeDataTable/>  */}
      {/* <EmployeeForm/> */}
      {/* Other components */}
      </UserProvider>
</BrowserRouter>


</div>

    </>
  );
}

export default App;
