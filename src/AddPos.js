import axios from "axios";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router,Link, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import Invoice from "./AddInvoice";
const AddPos = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [products, setProducts] = useState([]);
  const [productslist, setProductsList] = useState([]);
  // const [cart, setCart] = useState([]);
  // const [qty,setQty]=useState(0);
  const [prices, setPrices] = useState(new Array(productslist.length).fill(0));

 const navigate=useNavigate();

 //--------------------------------------Search Product---------------------------------- 
  const fetchProducts = (value) => {
    axios.get(`http://localhost:1009/search/${value}`)
      .then((response) => {
       setProducts(response.data.data);
      })
      .catch(err => {
        console.error(err);
      });
  };

  useEffect(() => {
    fetchProducts('');
  }, []);

  //end of search product

  //------------------------------------OnClick Product List Item function---------------------
  const handleChange = (option, id) => {
    if(id>0){
    setSearchTerm('');
    setFilteredOptions([]); // Clear the list when an option is selected
    axios.get(`http://localhost:1009/getproduct/${id}`)
      .then((response) => {
        //alert(JSON.stringify(response))
        const newProduct = response.data.data;
        if(newProduct.length>0){
        setProductsList((prevList) => {
          return prevList.concat(newProduct);
        });
        setProducts([]);
        setSelectedOption(option);

        }else{
          setSelectedOption("option");
          setProducts([]);
        }
        })
      .catch(err => {
        alert(err);
      });
    }
  };
  //End of OnClick Product List Item function
  
  
  //--------------------------OnChange Input function-----------------------
  const handleInputChange = (e) => {
    const inputValue = e.target.value.trim();
    setSearchTerm(inputValue);
    fetchProducts(inputValue);
  };
  //End of Onchange function

  //----------------------------Setting Products for List Items
  useEffect(() => {
    if (Array.isArray(products) && products.length > 0) {
      const filtered = products.map((product) => ({
        id: product.rowid,
        label: product.label,
      }));
      setFilteredOptions(filtered);
    } else {
      setFilteredOptions([]);
    }
  }, [products]);
  //End of Setting Products for List Items

  const addToCart = () => {
    if (selectedOption) {
      
      if (productslist.length === prices.length) {
        let allPricesSelected = true;
        // Iterate over productslist
        for (let i = 0; i < productslist.length; i++) {
          // Check if the price for the current product is missing
          if (!prices[i]) {
            allPricesSelected = false;
            break;
          }
        }
        
        if (allPricesSelected) {
          // Assuming you want to pass productslist and prices to AddInvoice
          navigate('/addinvoice', {
            state: {
              productslist: productslist,
              prices: prices,
            },
          });
          // Alert for testing
          alert("All prices are selected. Proceeding to add invoice...");
        } else {
          alert("Please select Qty for all products");
        }
      } else {
        //alert("Mismatch in product count and price count");
        alert("Please select Qty for all products");

      }  
      // prices.map((v,i)=>{
      //   alert(prices[i])
      //   if(i>0 && productslist.length==prices.length){
      //       // Assuming you want to pass productslist and prices to AddInvoice
      //       // navigate('/addinvoice', {
      //       //   state: {
      //       //     productslist: productslist,
      //       //     prices: prices,
      //       //   },
      //       // });

      //   }else{
      //     alert("Plz Select Qty for all Products")
      //   }
      // });
   }
  };
  

  const removeitem=(index)=>{
    const updatedProductsList = [...productslist];
    const updatedPrices = [...prices];

    updatedProductsList.splice(index, 1);
    updatedPrices.splice(index, 1);

    setProductsList(updatedProductsList);
    setPrices(updatedPrices);

  }

  const chanageqty=(e,price,index)=>{
    const qty = e.target.value;
    
    // Update the quantity for the corresponding item in productsList
    const updatedProductsList = [...productslist];
    updatedProductsList[index] = { ...updatedProductsList[index], qty };
    setProductsList(updatedProductsList);

    // Calculate total price based on quantity and sell_price
    const totalPrice = qty * price;

    // Update the total price for the corresponding row in prices array
    const updatedPrices = [...prices];
    updatedPrices[index] = totalPrice;
    setPrices(updatedPrices);
  }


  return (
    <div className="container card mb-4 box-shadow">
      <div>
        <input
          type="text"
          placeholder="Search for a Product..."
          value={searchTerm}
          onChange={handleInputChange}
        />
        <ul>
          {
            
          filteredOptions.map((option) => (
            <li key={option.id} onClick={() => handleChange(option, option.id)} style={{backgroundColor:"white",width:"250px"}}>
              {option.label}
            </li>
          ))
          }
        </ul>
        {selectedOption && (
          <div>
            <p>You selected: {selectedOption.label}</p>
            <div>
            <table>
            <tr>
                    <td>Label</td>
                    <td>Batch</td>
                    <td>Price</td>
                    <td>Qty</td>
                    <td>Total</td>
            </tr>
              {productslist.map((list, index) => (
                 
                  <tr key={index}>
                    <td><input type="text" value={list.label} readOnly /></td>
                    <td><input type="text" value={list.batch} readOnly /></td>
                    <td><input type="text" value={list.sell_price} readOnly /></td>
                    <td><input type="text"  onChange={(e)=>chanageqty(e,list.sell_price,index)}/></td>
                    <td><input type="text" value={prices[index]}/></td>
                    <td><button onClick={()=>removeitem(index)}>Remove</button></td>
                  </tr>
              ))}
            </table>

            </div>
            <button onClick={addToCart}>Add to Cart</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddPos;


// import axios from "axios";
// import React from "react";
// import { useEffect } from "react";
// import { useState } from "react";

// const AddPos=()=>{
//    // const [options,setOptions1]=useState([]);
   
   
  
//   const [selectedOption, setSelectedOption] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filteredOptions, setFilteredOptions] = useState([]);
//   const [products,setProducts1]=useState([]);

//  const setProducts=(value)=>{
//   //Exmple of search
//   //    const products = [
//   //     { value: 'apple', label: 'Apple' },
//   //     { value: 'banana', label: 'Banana' },
//   //     { value: 'orange', label: 'Orange' },
//   //   // Add more options as needed
//   //   ];
//   // setProducts1(products);

//   axios.get(`http://localhost:1009/search/${value}`).then((response) => {
//     //var data = JSON.parse(response.data);
//      //alert(JSON.stringify(data));
//     setProducts1(response); // No need to parse the response, as it's already parsed by Axios
//   }).catch((err) => {
//     alert(err);
//   });

// }

// useEffect(() => {
//    setProducts();
//  }, []);

//   const handleChange = (option) => {
    
//     setSelectedOption(option);
//     setSearchTerm('');
//     setFilteredOptions([]); // Clear the list when an option is selected
//   };

//   const handleInputChange = (e) => {
   
//     const inputValue = e.target.value.trim(); // Trim to handle whitespace
//     setProducts(inputValue);
//     setSearchTerm(inputValue);
  
//     const filtered = products.filter((option) =>
//       option.label.toLowerCase().includes(inputValue.toLowerCase())
//     );
  
//     setFilteredOptions(inputValue ? filtered : []);
  
//   };

//   // useEffect(()=>{
//   // //   axios.get('http://localhost:1009/search/')
//   //   setProducts()

//   //  },[]);
  
//     return (
//         <div className="container card mb-4 box-shadow">
//             <div>
//                 {/* <ul>
//                 {
//                 options.map((val, ind) => (
//                        <li key={ind}>{val.label}</li>
//                 ))
//                 }

//                 </ul> */}
//                 <select>
//                     {
//                         products.map((val1,ind1)=>(
//                             <option>{val1.label}</option>
//                         ))
//                     }
//                 </select>
//                 <input
//                    type="text"
//                   placeholder="Search for a fruit..."
//                   value={searchTerm}
//                   onChange={handleInputChange}
//         />
//         <ul>
//           {filteredOptions.map((option) => (
//             <li key={option.value} onClick={() => handleChange(option)}>
//               {option.label}
//             </li>
//           ))}
//         </ul>
//         {selectedOption && (
//           <div>
//             <p>You selected: {selectedOption.label}</p>
//           </div>
//         )}

//             </div>
        
//         </div>
//     );
// }

// export default AddPos;