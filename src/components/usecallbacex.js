import React, { lazy, Suspense, useCallback, useState } from "react";
import GoogleLogin from "react-google-login";

const Button =React.memo(({onClick,children})=>{
    console.log(`Rendering Button ${children}`);

    return(
        <button onClick={onClick}>{children}</button>
    )
});

const UsecallbackEx = () =>{

 const [count, setCount] = useState(0);
 const [cnt1,setCnt1] = useState(0);
 const [cnt2,setCnt2] = useState(0);
  console.log("Rendering Counter..."); // Logs every time the component renders or re-renders.

 const increment1 = useCallback(()=>{
    setCnt1((prevcnt1)=>prevcnt1+1);
 },[]);

 const increment2 = useCallback(()=>{
    setCnt2((prevcnt2)=>prevcnt2+1);
 },[]);

 const Login = React.lazy(()=> import("./loginapi"));
 return (

    <div>
        <h1>UseCallback Example</h1>
        <div>
            <p>re-render Counter: {count}</p>
            <p>Count : {cnt1}</p>
            <p>Count : {cnt2}</p>
           {/* Passing memoized callbacks to prevent unnecessary renders */}

            <Button onClick={increment1}>increment1</Button>
            <Button onClick={increment2}>increment2</Button>
            <button onClick={() => setCount(count + 1)}>Increment</button>

        <Suspense fallback={<div>Login Page Loading Please wait...</div>}>
            <Login/>
        </Suspense>

        </div>
    </div>
 )


}



export default UsecallbackEx;