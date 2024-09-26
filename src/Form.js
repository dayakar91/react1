import React from "react";
import { useState } from "react";
function Myform(){

  //  const [name,setName]=useState("");
   const [inputs, setInputs] = useState({});

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [age, setAge] = useState("")

    // const responseBody= {firstName: "", lastName: "", age: "0"}
    // const onSubmitHandler = (event) => {
    //     event.preventDefault();
    //    responseBody.firstName = firstName
    //     responseBody.lastName = lastName
    //     responseBody.age = age
    //     alert(JSON.stringify(responseBody))
	// //Form submission happens here
    // // alert(`${firstName}`)
    // }
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
      }
    
      const handleSubmit = (event) => {
        event.preventDefault();
        alert(JSON.stringify(inputs));
      }
    
    return (
        <form onSubmit={handleSubmit}>
            <label>
                {/* <input type="text" value={name} onChange={(e)=>setName(e.target.value)}/> */}
            </label>
            <label>Enter your name:
            <div><label htmlFor="first_name">First Name</label></div>
            <div><input id="first_name" value={firstName} onChange={(e)=>setFirstName(e.target.value)} type="text"/></div>
            <div><label htmlFor="last_name">Last Name</label></div>
            <div><input id="last_name" value={lastName} onChange={(e)=>setLastName(e.target.value)} type="text"/></div>
            <div><label htmlFor="age">Age</label></div>
            <div><input id="age" value={age} onChange={(e)=>setAge(e.target.value)} type="number"/></div>
        </label>
            <input type="submit"/>
        </form>,

<form onSubmit={handleSubmit}>
<label>Enter your name:
<input 
  type="text" 
  name="username" 
  value={inputs.username || ""} 
  onChange={handleChange}
/>
</label>
<label>Enter your age:
  <input 
    type="number" 
    name="age" 
    value={inputs.age || ""} 
    onChange={handleChange}
  />
  </label>
  <input type="submit" />
</form>

    )

}
export default Myform;