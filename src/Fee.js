import axios from "axios";
import { useEffect, useState } from "react";
import { useFetcher, useNavigate } from "react-router-dom";
import React from "react";
import { Navigator } from "react-router-dom";

const Fee=()=>{

    const [searchStudentinput,setSearchstudentinput]=useState('');
    const [students,setStudents]=useState([]);
    const [filteredOptions,setFilteredOptions]=useState([]);
    const [studentsfeedatafirst,setStudentsfeedatafirst]=useState([]);
    const [studentsfeedatasecond,setStudentsfeedatasecond]=useState([]);
    const [terms,setTerms]=useState([]);
    const [stdname,setStdname]=useState('');
    const [stdid,setStdid]=useState(0);
    const [stdclass,setStdclass]=useState(0);
    const [amount,setAmount]=useState(0);
    const [option,setOption]=useState(); 
    const [totamt,setTotamt]=useState(0);
    const [paidamt,setPaidamt]=useState(0);

    const navigate=useNavigate();

    const fetchStudents=(value)=>{
        axios.get(`http://localhost:7003/search/${value}`)
        .then((response) => {
          //alert(JSON.stringify(response));
          setStudents(response.data.data);
        })
        .catch(err => {
          console.error(err);
        });
    }

    useEffect(()=>{
        fetchStudents('');
    });

    useEffect(()=>{
        if(Array.isArray(students) && students.length>0){
            //alert(JSON.stringify(students))
            const filtered=students.map((student)=>({
                id:student.id,
                name:student.name,
                class:student.class
            }));
            setFilteredOptions(filtered);
        }else{
            setFilteredOptions([]);
        }
    },[students]);

    const searchStudent=(e)=>{
        const inputValue=e.target.value.trim();
        if(inputValue.length==0){
            setFilteredOptions([])
            setSearchstudentinput('')
            setStudentsfeedatafirst([]);
            setStudentsfeedatasecond([])
            setStdid();
            setStdname('')
        }else{
        setSearchstudentinput(inputValue);
        fetchStudents(inputValue);
        }

    }

    const handleChange=(option,id,class1,stdname)=>{
        if(id>0){
            axios.get(`http://localhost:7003/getstudent/${id}/${class1}`)
            .then((response)=>{
               const option=response.data.option;
               //alert(JSON.stringify(response))
              if(option==0){  
                // alert("0"+JSON.stringify(response))
                setOption(0);
                setStudentsfeedatafirst(response.data.data);
                setTerms([1,2,3]);
                setStdname(response.data.stdname);
                setSearchstudentinput(stdname);
                setStdid(id);
                setStdclass(class1);
              }else{
                // alert("1"+JSON.stringify(response))
                setOption(1)
                setTerms(["first","second","third"]);
                setStdname(response.data.stdname);
                setSearchstudentinput(stdname);
                setStdid(id);
                setStdclass(class1);
                setStudentsfeedatasecond(response.data.data);
                setTotamt(response.data.data[0]['totfee']);
                setPaidamt(response.data.data[0]['firstterm']+response.data.data[0]['secondterm']+response.data.data[0]['thirdterm'])
              }
               setFilteredOptions([])
            })
            .catch((err)=>{
                alert(err);
            })
        }
    }
    const payAamt=()=>{
        

        const payload = {
            id: stdid,
            class: stdclass,
            amount: amount,
          }
//alert(JSON.stringify(payload))

        axios.post("http://localhost:7003/payment",payload).then((response)=>{
            //alert(JSON.stringify(response));
            navigate('/fee')
        }).catch((err)=>{
            alert(err);
        });

    }
     //alert(JSON.stringify(studentsfeedatafirst))
    return (
        <div className="container card mb-4 box-shadow">
            <div>    
                <input 
                type="text" 
                placeholder="Search for Student"
                value={searchStudentinput}
                onChange={searchStudent}
                />
                <ul>
                    {
                        filteredOptions.map((option)=>(
                            <li onClick={()=>handleChange(option,option.id,option.class,option.name)} style={{backgroundColor:"white",width:"250px"}}>
                                <div style={{color:"blue"}}>{option.name}-{toRoman(option.class)} Class</div>
                            </li>
                        ))
                    }
                </ul>
                {
                    stdid?
    <table cellPadding={5} cellSpacing={5} width={500} border={1} class="table table-striped">
    <tbody>
        
        <tr class="table-primary">
            <td colSpan="4" style={{ width: '100%', textAlign: 'center' ,color:'green',fontWeight:'bold'}}>{stdname} {toRoman(stdclass) } </td>
        </tr>
        <tr class="table-info">
            <th style={{ width: '25%', textAlign: 'center', borderTop: '1px solid black' }}>Term</th>
            <th style={{ width: '25%', textAlign: 'center', borderTop: '1px solid black' }}>Amount</th>
            <th style={{ width: '25%', textAlign: 'center', borderTop: '1px solid black' }}>Paid</th>
            <th style={{ width: '25%', textAlign: 'center', borderTop: '1px solid black' }}>Balance</th>
        </tr>

        {

    
        option?<>    
        
      {terms.map((data11, index) => (
        studentsfeedatasecond.map((dataf, inx1) => {
            return dataf[data11 + 'term'] < dataf['totfee']/3 ? (
                <tr key={index} style={{ backgroundColor: "#fcc8bb" }} class="table-danger">
                    <td style={{ width: '25%', textAlign: 'center', border: '1px solid black' }}>Term {index + 1}</td>
                    <td style={{ width: '25%', textAlign: 'center', border: '1px solid black' }}>
                        {/* Render Amount for studentsfeedatafirst */}
                        {studentsfeedatasecond.map((data, idx) => (
                            <div key={idx}>{data['totfee'] / 3}</div>
                        ))}
                    </td>
                    <td style={{ width: '25%', textAlign: 'center', border: '1px solid black' }}>
                        {/* Render Paid Amount */}
                        {studentsfeedatasecond.map((data, idx) => (
                            <div key={idx}>{data[data11 + 'term']}</div>
                        ))}
                    </td>
                    <td style={{ width: '25%', textAlign: 'center', border: '1px solid black' }}>
                        {/* Render Balance Amount */}
                        {studentsfeedatasecond.map((data, idx) => (
                            <div key={idx}>{data['totfee'] / 3 - data[data11 + 'term']}</div>
                        ))}
                    </td>
                </tr>
            ) : <>
            <tr key={index} style={{ backgroundColor: "#d1f0d4" }} class="table-success">
            <td style={{ width: '25%', textAlign: 'center', border: '1px solid black' }}>Term {toRoman(index + 1)}</td>
                    <td style={{ width: '25%', textAlign: 'center', border: '1px solid black' }}>
                        {/* Render Amount for studentsfeedatafirst */}
                        {studentsfeedatasecond.map((data, idx) => (
                            <div key={idx}>{data['totfee'] / 3}</div>
                        ))}
                    </td>
                    <td style={{ width: '25%', textAlign: 'center', border: '1px solid black' }}>
                        {/* Render Paid Amount */}
                        {studentsfeedatasecond.map((data, idx) => (
                            <div key={idx}>{data[data11 + 'term']}</div>
                        ))}
                    </td>
                    <td style={{ width: '25%', textAlign: 'center', border: '1px solid black' }}>
                        {/* Render Balance Amount */}
                        {studentsfeedatasecond.map((data, idx) => (
                            <div key={idx}>{data['totfee'] / 3 - data[data11 + 'term']}</div>
                        ))}
                    </td>
                </tr>
            </>;
        
        })
        
    ))
    
    }
      
        
        </>
        :
        <>
        {
        terms.map((data11, index) => (

            <tr key={index} style={{backgroundColor:"#fcc8bb"}} class="table-danger">
                <td style={{ width: '25%', textAlign: 'center', border: '1px solid black' }}>Term {toRoman(index + 1)}</td>
                <td style={{ width: '25%', textAlign: 'center', border: '1px solid black' }}>
                    {/* Render Amount for studentsfeedatafirst */}
                    {studentsfeedatafirst && studentsfeedatafirst.map((data, idx) => (
                        <div key={idx}>{data.amount / 3}</div>
                    ))}
                    {/* Render Amount for studentsfeedatasecond */}
                                       
                </td>
                <td style={{ width: '25%', textAlign: 'center', border: '1px solid black' }}>
                    {/* Render Paid Amount */}
                    {studentsfeedatafirst && studentsfeedatafirst.map((data, idx) => (
                        <div key={idx}>0</div>
                    ))}
                </td>
                <td style={{ width: '25%', textAlign: 'center', border: '1px solid black' }}>
                    {/* Render Balance Amount */}
                    {studentsfeedatafirst && studentsfeedatafirst.map((data, idx) => (
                        <div key={idx}>{data.amount / 3}</div>
                    ))}
                </td>
            </tr>
        ))

        }
        </>

        }
        <tr><td>{option?studentsfeedatasecond.map((datatot,indtot)=>(<div><b>Total</b>:{datatot['totfee']} <b>PaidFee:</b> {datatot['firstterm']+datatot['secondterm']+datatot['thirdterm']} <b>Balance :</b>{datatot['totfee']-(datatot['firstterm']+datatot['secondterm']+datatot['thirdterm'])}</div>)):studentsfeedatafirst.map((datatot,ind)=>(<div><b>Total</b> {datatot['amount']} <b>PaidFee:</b> 0 <b>Balance:</b>{datatot['amount']}</div>))}</td></tr>
        
        <tr>
            <td colSpan="4" style={{ width: '100%', textAlign: 'center' }}>
                <input type="text" value={amount} onChange={(e) => setAmount(e.target.value)}  disabled={option?totamt==paidamt:''}/>
                <input type="button" onClick={() => payAamt()} value="Pay" disabled={option?totamt==paidamt:''} class="btn btn-primary"/>
            </td>
        </tr>
    </tbody>
</table>
:''
}

            </div>
        </div>
    )
}
function toRoman(num) {
    const romanNumerals = {
        M: 1000,
        CM: 900,
        D: 500,
        CD: 400,
        C: 100,
        XC: 90,
        L: 50,
        XL: 40,
        X: 10,
        IX: 9,
        V: 5,
        IV: 4,
        I: 1
    };

    let roman = '';

    for (let key in romanNumerals) {
        while (num >= romanNumerals[key]) {
            roman += key;
            num -= romanNumerals[key];
        }
    }

    return roman;
}

export default Fee;