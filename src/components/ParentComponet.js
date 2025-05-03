import Child from "./ChildComponent";
import { useState } from "react";

const Parent = () =>{
  const msg='Hello from Parent';
  const [count,setCount] = useState(0);
  const inc = ()=>{
    setCount(count+1);
  }
  return (
    <>
    <div><Child message ={msg} onClick={inc} count={count}/></div>
    </>
  );
}

export default Parent;