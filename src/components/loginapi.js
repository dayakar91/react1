import axios from "axios";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
const LoginApi = () =>{
    const [id,setId] =useState(0);
    const [pwd,setPwd] = useState('');
    const [input,setInputs]= useState({id:"",pwd:""});
    const navigate = useNavigate();
    const handleInput=(e)=>{
        const {name,value} = e.target;
        setInputs((values)=>({...values,[name]:value}));
    }

    const handleSubmit= async (e)=>{
        e.preventDefault();
            //alert(JSON.stringify(input));
         const {id,pwd}= input;

        try{
            const response = await axios.post('http://localhost:7003/login',{id:id,pwd:pwd});
            //alert(JSON.stringify(response.data))
            localStorage.setItem('token',response.data.accessToken);
            navigate('/student')
        }catch(error){
            alert(`Login failed: ${error.response?.data?.message || error.message}`);
        }

     
    }
    return (
        <>
        <form onSubmit={handleSubmit}>
        <input type="text" name="id" value={input.id} onChange={handleInput}/>
        <input type="text" name="pwd" value={input.pwd} onChange={handleInput}/>
        <input type="submit" value="Submit" />
        </form>
        </>
    )
}

export default LoginApi;