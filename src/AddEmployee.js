import React, { useContext } from "react";
import { useNavigate,Link, Navigate } from "react-router-dom";
import axios from "axios";
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { useState,useEffect } from "react";
import EmployeeForm from "./EditEmployee";
import { Route } from "react-router-dom";
import { BrowserRouter,Routes } from 'react-router-dom';
import { ReactDOM } from "react";
import { useUser } from "./components/context";
const EmployeeDataTable=()=>{
   // const navigate = useNavigate();
   // changed for testing in Git
   // changed for testing
    const baseURL = "https://639dc5103542a261304f55c2.mockapi.io/test_react";
    const [employees, setEmployees] = useState([]);
    const [updateState,setUpdateState]=useState(-1);
    const [file,setFile]=useState();
    const [img,setImg]=useState('');
    const { user } = useUser();

    const handleFile=(e)=>{
      setFile(e.target.files[0]);
    }

    const handleUpload=()=>{
      if(file){
       const formData=new FormData();
       formData.append('image',file);
       var emp=JSON.parse(localStorage.getItem('user'));
       var empid=emp.id;
       //formData.append('id',empid)

       axios.post('http://localhost:9100/uploadimg/'+empid,formData).
       then((response)=>{
        //alert(JSON.stringify(localStorage.getItem('user')));
        alert(JSON.stringify(response));
        window.location.reload();
       }).catch((err)=>{
        alert(err);
       })
      }else{
        alert("Please Choose file")
      }
    }

    useEffect(()=>{
      var emp=JSON.parse(localStorage.getItem('user'));
      var empid=emp.id;
      axios.get('http://localhost:9100/profileimg/'+empid).
      then((response)=>{
          var dataparse=response
          var img=dataparse.data.image;
          setImg(img);
      }).catch((err)=>{
        alert(err)
      })

    },[]);
    const navigate=useNavigate();
    var tokenuser= JSON.parse(localStorage.getItem('user'));
      var auth='';
      if(tokenuser){
        auth=tokenuser.accessToken;
      }else{
        auth='';
      }
    const setEmployeeData = () => {
      
    // alert(auth)
     // if(tokenuser){
      //var token=tokenuser.accessToken;
     
     // axios.get(baseURL+"/test_react").then((response) => {
      axios.get("http://localhost:9100/getemplist", { headers: {"Authorization" : `Bearer ${auth}`}}
      ).then((response) => {
        var datalen=response.data.length;
        if(datalen>0){
          setEmployees(response.data);
        }else{
          alert("Unauthorized Request");
          window.location.href='/login';
        }
      }).catch(error => {
        alert("Error Ocurred while loading data:" + error);
      });
   // }
    }
    useEffect(() => {
      setEmployeeData();
    }, []);
    
    const removeEmployee = (id) => {
        axios.delete(baseURL + "/test_react/" + id).then((response) => {
          alert("Employee record " + id + " deleted!");
          setEmployeeData();
         // navigate('/read')
    
        }).catch(error => {
          alert("Error Ocurred in removeEmployee:" + error);
        });
      }

      const removeAllEmployee = (id) => {
        axios.delete(baseURL + "/employees").then((response) => {
          alert("All Employees deleted!");
          setEmployeeData();
          //navigate('/read')
        }).catch(error => {
          alert("Error Ocurred in removeEmployee:" + error);
        });
      }
    const editrec=(id)=>{
      const root5 = ReactDOM.createRoot(document.getElementById('root5'));
      root5.render(<EmployeeForm empid={id}/>);

    }

    const handleEdit=(id)=>{
      setUpdateState(id);
    }
    
    const EditList=({employee,employees,setEmployees})=>{
    //  const [name,setEname]=useState('');

      const hanldeInput = (e) => {
        const { name, value } = e.target;
        const newEmployees = employees.map((li) =>
          li.id === employee.id ? { ...li, [name]: value } : li
        );
        setEmployees(newEmployees);
      }
    const handleUpdate=(e)=>{
      const id=employee.id;
      const name=employee.name;
      const email=employee.email;
      const mobile=employee.mobile;
      const API_URL="http://localhost:9100/empupdate";
      axios.post(API_URL,{
        id,
        name,
        email,
        mobile
      },{ headers: {"Authorization" : `Bearer ${auth}`}}).then((response)=>{
        var res=response.data.message;
        if(res==1){
          window.location.reload();
        }
      }).catch(error=>{
        alert("Error in inserting"+error)
      });
    }
  return (
    <>
    <tr>{employee.id}<td><input type="text" onChange={hanldeInput} name="name" value={employee.name}/></td>
    <td><input type="text" name="email" onChange={hanldeInput} value={employee.email}/></td>
    <td><input type="text" name="mobile" onChange={hanldeInput} value={employee.mobile}/></td>
    <td><button className="btn btn-sm btn-primary" onClick={handleUpdate}>Update</button><button className="btn btn-sm btn-danger">Cancel</button></td></tr>
    </>
  )
  }

     

    return (
        <div className="col-md-6">
        <h4>Employees List</h4>
        <div class="container">
          <div class="row">
            <div class="col-12">
              <table class="table table-bordered table-striped">
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Mobile</th>
                    <th scope="col">Action</th>

                  </tr>
                </thead>
                <tbody>

                  {
                    employees &&
                    employees.map((employee, index) => (
                      updateState===employee.id ?<EditList employee={employee} employees={employees} setEmployees={setEmployees}/>:
                      <tr>
                        <th scope="row">{employee.id}</th>
                        <td>{employee.name}</td>
                        <td>{employee.email}</td>
                        <td>{employee.mobile}</td>


                        <td>
                        {/* 

                        <Link to={"/edit/" + employee.id} >
                          Edit
                        </Link> */}

                          {/* <Link to={"/edit/" + employee.id} onClick={()=>editrec(employee.id)}>Edit1</Link> */}
                          
                          <button onClick={()=>handleEdit(employee.id)} className="btn btn-sm btn-success">Edit</button>
                          <button
                            onClick={() => removeEmployee(employee.id)} className="btn btn-sm btn-danger"
                          >
                            Remove
                          </button>

                        </td>
                      </tr>

                    ))
                  }

                </tbody>
              </table>
            </div>
          </div>
        </div>
        <button className="btn btn-sm btn-danger"
          onClick={() => removeAllEmployee()}>
          Remove All
        </button>
        <div>
        <h2>Profile</h2>
      {user ? <p>Welcome, {user.name}!</p> : <p>Please login.</p>}
        <div >
          <img src={"http://localhost:9100/images/"+img} alt="img"/>
        </div>
        <form encType="multipart/form-data">
        <input type="file" name="image" onChange={handleFile} />
        <button type="button" onClick={handleUpload}>Upload</button>
        </form>
        
      </div>
      </div>



    );
}


export default EmployeeDataTable;
