import axios from "axios";
import { useEffect, useState,useRef } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
// Custom hook to fetch data
const useFetchApi = (url,url1) => {
  
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  const [stdname, setStdname] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0); // Track retries
  const navigate = useNavigate();
  const alertShownRef = useRef(false); // Prevent duplicate alerts

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(false);
        const token = localStorage.getItem('token');
        if (!token) {
          if(!alertShownRef.current){
            alertShownRef.current=true;
          alert('You are not authorized to access this resource...plz Login Again');
          }
          navigate('/loginapi')
          return;

        }
        

        // Decode token to check expiration
        const decoded = jwtDecode(token);
        const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds

        if (decoded.exp < currentTime) {
          // Token expired
          if(!alertShownRef.current){
            alertShownRef.current=true;
          alert("Session expired. Please log in again.");
          }
          localStorage.removeItem("token"); // Remove expired token
          navigate("/loginapi");
          return;
        }


        const headers ={
           Authorization : `Bearer ${token}`,
        }

        // Fetch data from both URLs
        const response = await axios.get(url,{headers});
        const response1 = await axios.get(url1,{headers});
        // Update states with the fetched data
        setData(response.data.data);
        setData1(response1.data.data);
        setStdname(response.data.stdname);
        setError(null); // Clear previous errors
        setLoading(false);
      } catch (err) {
        alert(err)
        console.error("Error fetching data:", err);
        setError("Failed to fetch data. Retrying...");
        // Retry logic: retry after a delay
        setTimeout(() => setRetryCount((prev) => prev + 1), 3000); // Retry every 3 seconds
      }
    };

    fetchData();
  }, [url, url1, retryCount]); // Trigger retry on retryCount change

  return { data, data1, stdname, loading, error };

};

const StudentList = () => {
    const { data, stdname, data1, loading, error } = useFetchApi(
        "http://localhost:7003/getstudent/2/1", 
        "http://localhost:7003/search/bal"
      );

  if (loading) {
    return <div>Loading...</div>;
  }


  if (error) {
    return <div>Error fetching data: {error.message}</div>;
  }

  if (!Array.isArray(data)) {
    return <div>Error: Unexpected data format</div>;
  }

  return (
    <>
      <div>Name : {stdname}</div> {/* Display student's name */}
      <div>
    {
    data1.map((stud, index) => (
      <div key={index}> {/* Provide a key for each element */}
        ID: {stud.id} <br />
        Class: {stud.class}
      </div>
    ))
  }
</div>

      <div>
        {
        data.map((user, index) => (
          <div key={index}>
            Amount :{(user.totfee)}<br/>
            Paid :{(user.firstterm)+(user.secondterm)+(user.thirdterm)}<br/>
            Balance : {user.balfee}
            </div> 
        ))
        }
      </div>
    </>
  );
};

export default StudentList;
