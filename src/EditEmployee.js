import { useEffect,useState } from "react";
import React from "react";
import axios from "axios";
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { useParams } from "react-router-dom";


const EmployeeForm = (props) => {
    const editURL = "https://639dc5103542a261304f55c2.mockapi.io/test_react";
    //const navigate = useNavigate();
    const param = useParams();
    const [empId, setEmpId] = useState('');
    const [empName, setName] = useState('');
    const [empMail, setMail] = useState('');
    const [empMobile, setMobile] = useState('');
  
  useEffect(() => {
  
    axios.get(editURL+"/test_react/"+props.empid).then((response) => {
      const empData = response.data;
      setEmpId(empData.id);
      setName(empData.name);
      setMail(empData.email);
      setMobile(empData.mobile);
    }).catch(error => {
      alert("Error Ocurred getting employee detail:"+ error);
    });

  }, []);
  
  
    const nameChangeHandler = (event) => {
      setName(event.target.value);
    };
    const mailChangeHandler = (event) => {
      setMail(event.target.value);
    };
    const mobileChangeHandler = (event) => {
        setMobile(event.target.value);
    };
    
  
    const submitActionHandler = (event) => {
      event.preventDefault();
      axios
        .put(editURL+param.id, {
          id: empId,
          name: empName,
          mail: empMail,
          mobile:empMobile
        })
        .then((response) => {
          alert("Employee "+ empId +" updated!");
          //navigate('/read')
  
        }).catch(error => {
          alert("Error Ocurred updating employee:"+ error);
        });
  
    };
  
      return(
        <Alert variant='primary'>
        <Container>
        <Form onSubmit={submitActionHandler} id="data">
        <Form.Group  controlId="form.id">
              <Form.Label>Id</Form.Label>
              <Form.Control value={empId} readonly='readonly'/>
          </Form.Group>
          <Form.Group controlId="form.Name">
              <Form.Label>User Name</Form.Label>
              <Form.Control type="text" value={empName} onChange={nameChangeHandler} placeholder="Enter User Name" required/>
          </Form.Group>
          <Form.Group  controlId="form.Role">
              <Form.Label>Mail</Form.Label>
              <Form.Control type="text" value={empMail} onChange={mailChangeHandler} placeholder="Enter Email" required/>
          </Form.Group>
          
          <Form.Group  controlId="form.Role">
              <Form.Label>Mobile</Form.Label>
              <Form.Control type="text" value={empMobile} onChange={mobileChangeHandler} placeholder="Enter Mobile" required/>
          </Form.Group>
          <br></br>
          <Button type='submit'>Update Employee</Button>
          &nbsp;&nbsp;&nbsp;
          <Button type='submit' >Cancel</Button>
        </Form>
      </Container>
      </Alert>
  
      );
  }
  export default EmployeeForm;