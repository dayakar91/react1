import React from "react";

class Employee extends React.Component{
    constructor() {
        super();
        this.state = {desig: "Manager"};
      }
      render() {
        return <h2>I am a {this.state.desig} !</h2>;
      }
    
  }
  
  // ✅ Works
  //const employee = new Employee('James');
  
  //document.write(employee.brand); // 👉️ "James"
  //console.log(employee.salary); // 👉️ 100
  export default Employee;