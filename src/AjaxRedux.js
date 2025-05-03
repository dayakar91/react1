import axios from "axios";
import React, { useEffect, useState } from "react";

import { useDispatch,useSelector } from "react-redux";
import { fetchUsers,usersPost } from "./AjaxReduxActions";

const AjaxRedux = () => {

    const  [userId,setUserId] = useState(0);

    //with Redux
    const dispatch = useDispatch();
    const select1 = useSelector((state) => state.dropdowns.users.options);
    const select2 = useSelector((state) => state.dropdowns.posts.options);
    const errorMessage= useSelector((state)=>state.dropdowns.users.errors)

    useEffect(() => {
        dispatch(fetchUsers()); // Fetch users on component mount
    }, [dispatch]);

    useEffect(() => {
        if (userId !== 0) {
            dispatch(usersPost(userId)); // Fetch posts when userId is selected
        }
    }, [userId, dispatch]);



    // without Redux
    //const [select1, setSelect1] = useState([]);
    //const [select2,setSelect2] =useState([]);
    //const [errorMessage, setErrorMessage] = useState(""); // Track network errors
    // useEffect(() => {
    //     axios.get(`https://jsonplaceholder.typicode.com/users`)
    //     .then((response)=>{
    //         //alert(JSON.stringify(response))
    //         setSelect1(response.data);
    //     })
    //     .catch((error)=>{
    //         setErrorMessage("Network problem"); 
    //     });
    // }, []); 
    // // without Redux
    // useEffect(()=>{
    //     axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
    //     .then((response)=>{
    //         //alert(JSON.stringify(response))
    //         setSelect2(response.data)
    //     })
    //     .catch((error)=>{
    //         setErrorMessage("Network problem");
    //     })
    // },[userId]);

    const handleUserById = (e) =>{
        setUserId(e.target.value);
    }



    return (
        <div>
        {errorMessage && <div style={{color: "red"}}>{errorMessage}</div>} {/* Display error message if there is one */}

            { select1.length>0 && 
            <select onChange={handleUserById}>
                <option>---Select User---</option>
                {
                    select1.map((users,index1)=>{
                        return(
                            <option key={index1} value={users.id}>{users.name}</option>
                        );
                    })
                }
            </select>
            }
            { select2.length>0 && 
            <select>
                <option>---Select Post---</option>
                {
                    select2.map((user, index2) => (
                        <option key={index2}>{user.title}</option> // Use "title" for post display
                    ))
                }
            </select>
            }
        </div>
    );
}

export default AjaxRedux;
