import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Table, Button, Form, Container, Alert } from "react-bootstrap";
import { useUser } from "./components/context";  // Context for user authentication

const EmployeeDataTable = () => {
  const [employees, setEmployees] = useState([]);
  const [updateState, setUpdateState] = useState(-1);
  const [file, setFile] = useState(null);
  const [img, setImg] = useState("");
  const { user } = useUser();
  const navigate = useNavigate();

  const auth = user?.accessToken || "";

  // Fetch employee data on mount
  useEffect(() => {
    setEmployeeData();
  }, []);

  // Function to set employee data from API
  const setEmployeeData = async () => {
    try {
      const response = await axios.get("http://localhost:9100/getemplist", {
        headers: { Authorization: `Bearer ${auth}` },
      });
      if (response.data.length > 0) {
        setEmployees(response.data);
      } else {
        //alert("Unauthorized Request");
        navigate("/login");
      }
    } catch (error) {
      console.error("Error loading employees:", error);
      //alert("Error loading employees");
    }
  };

  // Handle employee deletion
  const removeEmployee = async (id) => {
    try {
      await axios.delete(`http://localhost:9100/employees/${id}`);
      setEmployeeData(); // Refresh employee list
    } catch (error) {
      console.error("Error deleting employee:", error);
      //alert("Error deleting employee");
    }
  };

  // Handle image upload
  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (file) {
      const formData = new FormData();
      formData.append("image", file);
      const emp = JSON.parse(localStorage.getItem("user"));
      const empId = emp.id;

      try {
        const response = await axios.post(`http://localhost:9100/uploadimg/${empId}`, formData);
        alert("Image uploaded successfully");
        setImg(response.data.image);
      } catch (err) {
        console.error("Error uploading image:", err);
        alert("Error uploading image");
      }
    } else {
      alert("Please choose a file");
    }
  };

  // Fetch employee image on mount
  useEffect(() => {
   const emp = JSON.parse(localStorage.getItem("user"));
if (emp && emp.id) {
  const empId = emp.id;
  axios.get(`http://localhost:9100/profileimg/${empId}`)
    .then((response) => {
      // Handle response
    })
    .catch((error) => {
      console.error("Error fetching profile image:", error);
    });
} else {
  console.error("No user found in localStorage");
}

  }, []);

  // Handle updating employee data
  const handleUpdate = async (employee) => {
    try {
      const { id, name, email, mobile } = employee;
      const response = await axios.post(
        "http://localhost:9100/empupdate",
        { id, name, email, mobile },
        { headers: { Authorization: `Bearer ${auth}` } }
      );
      if (response.data.message === 1) {
        setUpdateState(-1);
        setEmployeeData(); // Refresh employee list
      }
    } catch (error) {
      console.error("Error updating employee:", error);
      //alert("Error updating employee");
    }
  };

  // Edit mode handler
  const handleEdit = (id) => {
    setUpdateState(id);
  };

  return (
    <Container>
      <h4>Employees List</h4>
      <Table striped bordered>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {employees &&
            employees.map((employee) => (
              updateState === employee.id ? (
                <EditEmployeeRow
                  key={employee.id}
                  employee={employee}
                  handleUpdate={handleUpdate}
                  setUpdateState={setUpdateState}
                />
              ) : (
                <EmployeeRow
                  key={employee.id}
                  employee={employee}
                  handleEdit={handleEdit}
                  removeEmployee={removeEmployee}
                />
              )
            ))}
        </tbody>
      </Table>
      <h2>Profile</h2>
      {user ? <p>Welcome, {user.name}!</p> : <p>Please login.</p>}
      {img && <img src={`http://localhost:9100/images/${img}`} alt="Profile" />}
      <Form>
        <Form.Group>
          <Form.Control type="file" name="image" onChange={handleFile} />
        </Form.Group>
        <Button onClick={handleUpload}>Upload</Button>
      </Form>
    </Container>
  );
};

// Employee Table Row (Static)
const EmployeeRow = ({ employee, handleEdit, removeEmployee }) => (
  <tr>
    <td>{employee.id}</td>
    <td>{employee.name}</td>
    <td>{employee.email}</td>
    <td>{employee.mobile}</td>
    <td>
      <Button variant="success" size="sm" onClick={() => handleEdit(employee.id)}>
        Edit
      </Button>
      <Button variant="danger" size="sm" onClick={() => removeEmployee(employee.id)}>
        Remove
      </Button>
    </td>
  </tr>
);

// Editable Employee Row
const EditEmployeeRow = ({ employee, handleUpdate, setUpdateState }) => {
  const [editEmployee, setEditEmployee] = useState({ ...employee });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditEmployee((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <tr>
      <td>{editEmployee.id}</td>
      <td>
        <Form.Control
          type="text"
          name="name"
          value={editEmployee.name}
          onChange={handleInputChange}
        />
      </td>
      <td>
        <Form.Control
          type="email"
          name="email"
          value={editEmployee.email}
          onChange={handleInputChange}
        />
      </td>
      <td>
        <Form.Control
          type="text"
          name="mobile"
          value={editEmployee.mobile}
          onChange={handleInputChange}
        />
      </td>
      <td>
        <Button
          variant="primary"
          size="sm"
          onClick={() => handleUpdate(editEmployee)}
        >
          Update
        </Button>
        <Button variant="secondary" size="sm" onClick={() => setUpdateState(-1)}>
          Cancel
        </Button>
      </td>
    </tr>
  );
};

export default EmployeeDataTable;
