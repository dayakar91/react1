import React from "react";
import axios from "axios";
const { Component, PropTypes } = React;



class List extends Component {
//   state = {
//           items: [
//             { id: 'item_1001',
//               name:'Apple' ,
//               src: 'https://i.ibb.co/2M74fJY/apple.png',
//               cost: 1,
//               qty: 0
//             },
//             { id: 'item_1002',
//               name:'Beer' ,
//               src: "https://i.ibb.co/7KMsv8K/pint.png",
//               cost: 5,
//               qty: 0
//             },
//             { id: 'item_1003',
//               name:'Lettuce' ,
//               src: "https://i.ibb.co/prQCnx2/salad.png",
//               cost: 3,
//               qty: 0
//             },
//             { id: 'item_1004',
//               name:'Bread' ,
//               src: "https://i.ibb.co/mtSgjfK/bread.png",
//               cost: 2.50,
//               qty: 0
//             },
//             { id: 'item_1005',
//               name:'aubergine' ,
//               src: 'https://i.ibb.co/yqZL7Pj/aubergine.png',
//               cost: 3.50,
//               qty: 0
//             },
//             { id: 'item_1006',
//               name:'cheese' ,
//               src: 'https://i.ibb.co/TbWF0RB/cheese.png',
//               cost: 5.99,
//               qty: 0
//             },
//             {
//               id: 'item_1007',
//               name:'chocolate' ,
//               src: 'https://i.ibb.co/cNmshyn/chocolate.png',
//               cost: 7.80,
//               qty: 0
//             },
//             {
//               id: 'item_1008',
//               name:'fish' ,
//               src: 'https://i.ibb.co/1KWWxmx/fish.png',
//               cost: 10.20,
//               qty: 0
//             },
//             { id: 'item_1009',
//               name:'jawbreaker' ,
//               src: 'https://i.ibb.co/Dfgwn9k/jawbreaker.png',
//               cost: 1.50,
//               qty: 0
//             },
//             { id: 'item_1010',
//               name:'milk' ,
//               src: 'https://i.ibb.co/xzwZPGx/milk.png',
//               cost: 3,
//               qty: 0
//             },
//             {
//               id: 'item_1011',
//               name:'steak' ,
//               src: 'https://i.ibb.co/bXy9Yw4/steak.png',
//               cost: 15,
//               qty: 0
//             },
//             {
//               id: 'item_1012',
//               name:'red chilly' ,
//               src: 'https://i.ibb.co/sWscDrF/mustard.png',
//               cost: 0.50,
//               qty: 0
//             },
//             { id: 'item_1013',
//               name:'tomato' ,
//               src: 'https://i.ibb.co/B4yy9J8/tomato.png',
//               cost: 0.70,
//               qty: 0
//             },
//             { id: 'item_1014',
//               name:'water' ,
//               src: 'https://i.ibb.co/rcf39YY/water.png',
//               cost: 1,
//               qty: 0
//             },
//             { id: 'item_1015',
//               name:'asparagus' ,
//               src: 'https://i.ibb.co/HVJDLym/asparagus.png',
//               cost: 2.50,
//               qty: 0
//             },
//             { id: 'item_1016',
//               name:'avocado' ,
//               src: 'https://i.ibb.co/qdj7Jx1/avocado.png',
//               cost: 4.99,
//               qty: 0
//             },
//             { id: 'item_1017',
//               name:'bacon' ,
//               src: 'https://i.ibb.co/x6f0G4m/bacon.png',
//               cost: 3,
//               qty: 0
//             },
//             { id: 'item_1018',
//               name:'banana' ,
//               src: 'https://i.ibb.co/zZpj7br/banana.png',
//               cost: 1.70,
//               qty: 0
//             },
//             { id: 'item_1019',
//               name:'beans' ,
//               src: 'https://i.ibb.co/n3w2kTc/beans.png',
//               cost: 0.80,
//               qty: 0
//             },
//             { id: 'item_1020',
//               name:'blueberries' ,
//               src: 'https://i.ibb.co/F84Gh4w/blueberries.png',
//               cost: 5.99,
//               qty: 0
//             },
//             { id: 'item_1021',
//               name:'broccoli' ,
//               src: 'https://i.ibb.co/Zf4HYff/broccoli.png',
//               cost: 2,
//               qty: 0
//             },
//             { id: 'item_1022',
//               name:'nutella' ,
//               src: 'https://i.ibb.co/kDfpY0F/butter.png',
//               cost: 7.60,
//               qty: 0
//             },
//             { id: 'item_1023',
//               name:'cabbage' ,
//               src: 'https://i.ibb.co/dc76F50/cabbage.png',
//               cost: 1.50,
//               qty: 0
//             },
//             { id: 'item_1024',
//               name:'Soda' ,
//               src: 'https://i.ibb.co/XDN13fk/can.png',
//               cost: 1.20,
//               qty: 0
//             },
//             { id: 'item_1025',
//               name:'carrot' ,
//               src: 'https://i.ibb.co/RSW2B5r/carrot.png',
//               cost: 4,
//               qty: 0
//             },
//             { id: 'item_1026',
//               name:'cherries' ,
//               src: 'https://i.ibb.co/yVSx2P8/cherries.png',
//               cost: 3.10,
//               qty: 0
//             },
//             { id: 'item_1027',
//               name:'chicken' ,
//               src: 'https://i.ibb.co/x3QbFnF/chicken.png',
//               cost: 6.99,
//               qty: 0
//             },
//             { id: 'item_1028',
//               name:'chili' ,
//               src: 'https://i.ibb.co/9Tdxvj9/chili.png',
//               cost: 0.90,
//               qty: 0
//             },
//             { id: 'item_1029',
//               name:'chives' ,
//               src: 'https://i.ibb.co/PmCZWKF/chives.png',
//               cost: 1.30,
//               qty: 0
//             },
//             { id: 'item_1030',
//               name:'cookies' ,
//               src: 'https://i.ibb.co/F03mpyy/cookies.png',
//               cost: 2.50,
//               qty: 0
//             },
//             { id: 'item_1031',
//               name:'corn' ,
//               src: 'https://i.ibb.co/FWHk4vK/corn.png',
//               cost: 2.60,
//               qty: 0
//             },
//             { id: 'item_1032',
//               name:'croissant' ,
//               src: 'https://i.ibb.co/NZBpGDr/croissant.png',
//               cost: 4.99,
//               qty: 0
//             },
//             { id: 'item_1033',
//               name:'Look Morty, I turned myself into a pickle' ,
//               src: 'https://i.ibb.co/fnL42HT/rick.png',
//               cost: 2,
//               qty: 0
//             },
//             { id: 'item_1034',
//               name:'cupcake' ,
//               src: 'https://i.ibb.co/WkzhhZ4/cupcake.png',
//               cost: 3.50,
//               qty: 0
//             },
//             { id: 'item_1035',
//               name:'doughnut' ,
//               src: 'https://i.ibb.co/2835jMz/doughnut.png',
//               cost: 4,
//               qty: 0
//             },
//             { id: 'item_1036',
//               name:'flour' ,
//               src: 'https://i.ibb.co/tZ20JBz/flour.png',
//               cost: 8,
//               qty: 0
//             },
//             { id: 'item_1037',
//               name:'garlic' ,
//               src: 'https://i.ibb.co/mXDshjJ/garlic.png',
//               cost: 1.10,
//               qty: 0
//             },
//             { id: 'item_1038',
//               name:'gingerbread' ,
//               src: 'https://i.ibb.co/WgN8cp1/gingerbread.png',
//               cost: 5.60,
//               qty: 0
//             },
//             { id: 'item_1039',
//               name:'grapes' ,
//               src: 'https://i.ibb.co/0GR7pMY/grapes.png',
//               cost: 9.99,
//               qty: 0
//             },
//             { id: 'item_1040',
//               name:'honey' ,
//               src: 'https://i.ibb.co/nPksSrm/honey.png',
//               cost: 15.99,
//               qty: 0
//             },
//             { id: 'item_1041',
//               name:'hot dog' ,
//               src: 'https://i.ibb.co/mcYh7KF/hot-dog.png',
//               cost: 2.30,
//               qty: 0
//             },
//             { id: 'item_1042',
//               name:'jam' ,
//               src: 'https://i.ibb.co/g63B5pR/jam.png',
//               cost: 12,
//               qty: 0
//             },
//             { id: 'item_1043',
//               name:'jelly' ,
//               src: 'https://i.ibb.co/527qD1W/jelly.png',
//               cost: 5.80,
//               qty: 0
//             },
//             { id: 'item_1044',
//               name:'kebab' ,
//               src: 'https://i.ibb.co/bv3q652/kebab.png',
//               cost: 7.90,
//               qty: 0
//             },
//             { id: 'item_1045',
//               name:'knives set' ,
//               src: 'https://i.ibb.co/WvDz0GN/knives.png',
//               cost: 30,
//               qty: 0
//             },
//             { id: 'item_1046',
//               name:'lemon' ,
//               src: 'https://i.ibb.co/3CyNzyb/lemon.png',
//               cost: 1,
//               qty: 0
//             },
//             { id: 'item_1047',
//               name:'mustard' ,
//               src: 'https://i.ibb.co/jRgpR7T/mustard.png',
//               cost: 1.10,
//               qty: 0
//             },
//             { id: 'item_1048',
//               name:'octopus' ,
//               src: 'https://i.ibb.co/1JYyFQV/octopus.png',
//               cost: 20,
//               qty: 0
//             },
//             { id: 'item_1049',
//               name:'olives' ,
//               src: 'https://i.ibb.co/6JFD9ry/olives.png',
//               cost: 3,
//               qty: 0
//             },
//             { id: 'item_1050',
//               name:'onion' ,
//               src: 'https://i.ibb.co/rmh91LN/onion.png',
//               cost: 2,
//               qty: 0
//             },
//             { id: 'item_1051',
//               name:'orange' ,
//               src: 'https://i.ibb.co/yqsrBXC/orange.png',
//               cost: 4.70,
//               qty: 0
//             },
//             { id: 'item_1052',
//               name:'pasta' ,
//               src: 'https://i.ibb.co/2MqdGCK/pasta.png',
//               cost: 2.30,
//               qty: 0
//             },
//             { id: 'item_1053',
//               name:'pepper' ,
//               src: 'https://i.ibb.co/MGgzffT/pepper.png',
//               cost: 1.20,
//               qty: 0
//             },
//             { id: 'item_1054',
//               name:'pepper crusher' ,
//               src: 'https://i.ibb.co/LptgYDH/pepperpowder.png',
//               cost: 20.50,
//               qty: 0
//             },
//             { id: 'item_1055',
//               name:'pickles' ,
//               src: 'https://i.ibb.co/D82tdN6/pickles.png',
//               cost: 1,
//               qty: 0
//             },
//             { id: 'item_1056',
//               name:'pineapple' ,
//               src: 'https://i.ibb.co/VtC4xsN/pineapple.png',
//               cost: 5,
//               qty: 0
//             },
//             { id: 'item_1057',
//               name:'pumpkin' ,
//               src: 'https://i.ibb.co/52kdt5y/pumpkin.png',
//               cost: 5,
//               qty: 0
//             },
//             { id: 'item_1058',
//               name:'radish' ,
//               src: 'https://i.ibb.co/hWDq3cP/radish.png',
//               cost: 3,
//               qty: 0
//             },
//             { id: 'item_1059',
//               name:'salmon' ,
//               src: 'https://i.ibb.co/vPL4xyL/salmon.png',
//               cost: 14.80,
//               qty: 0
//             },
//             { id: 'item_1060',
//               name:'sausage' ,
//               src: 'https://i.ibb.co/WDsYdyx/sausage.png',
//               cost: 4.99,
//               qty: 0
//             },
//             { id: 'item_1061',
//               name:'shrimp' ,
//               src: 'https://i.ibb.co/WcrczZx/shrimp.png',
//               cost: 8.90,
//               qty: 0
//             },
//             { id: 'item_1062',
//               name:'strawberry' ,
//               src: 'https://i.ibb.co/R2LcWSx/strawberry.png',
//               cost: 5,
//               qty: 0
//             },
//             { id: 'item_1063',
//               name:'sushi' ,
//               src: 'https://i.ibb.co/2cK13ZQ/sushi.png',
//               cost: 15,
//               qty: 0
//             },
//             { id: 'item_1064',
//               name:'taco' ,
//               src: 'https://i.ibb.co/tx6f2bw/taco.png',
//               cost: 2,
//               qty: 0
//             },
//             { id: 'item_1065',
//               name:'turkey' ,
//               src: 'https://i.ibb.co/FJywW5d/turkey.png',
//               cost: 25,
//               qty: 0
//             },
//           ],
//           total_items: 0,
//           total:0,
//           packaging: 1.99,
//           popup:false,
//           thank_popup:false,
//       }

state = {
    items: [],
    total_items: 0,
    total: 0,
    packaging: 1.99,
    popup: false,
    thank_popup: false,
    addedItems: {}, // Change to an object

  };



componentDidMount() {
    // Fetching data from the API endpoint
    axios.get("https://dummyjson.com/products").then((response) => {
       // alert(JSON.stringify(response))
      this.setState({ items: response.data.products });
    });
  }



//   add = (name,cost) => {
   
//     this.state.items.map((item, id) => {
//         if (item.name == name) {
//             item.qty += 1;
//         }
      

//     })
//     this.setState({
//       total_items: this.state.total_items + 1,
//       total: this.state.total + cost,
//     });
    
//   }
//   remove = (name, cost) => {
//     this.state.items.map((item, id) => {
//       if (item.name == name) {
//         if(item.qty != 0) {
//           item.qty -= 1;
//           this.setState({
//             total_items: this.state.total_items - 1,
//             total: this.state.total - cost,
//           });
//         }
//       }


//     })
//   }
//   popup = () => {
//     this.setState({
//       popup: !this.state.popup
//     });
//   }
//   thank_popup = () => {
//     this.setState({
//       thank_popup: !this.state.thank_popup
//     });
//   }
//   reload = () => {
//       window.location.href = window.location.href;
//   }

// add = (title, cost) => {
//     this.setState((prevState) => ({
//       items: prevState.items.map((item) =>
//         item.title === title ? { ...item, qty: item.qty + 1 } : item
//       ),
//       total_items: prevState.total_items + 1,
//       total: prevState.total + cost,
//     }));
//   };
add = (title, cost,img) => {
    this.setState((prevState) => {
        const { items, addedItems } = prevState;
    
        // Find the item in the state
        const selectedItem = items.find((item) => item.title === title);
    
        // Update the quantity and cost
        const updatedQty = (selectedItem.qty || 0) + 1;
    
        // Update the item in the items array
        const updatedItems = items.map((item) =>
          item.title === title ? { ...item, qty: updatedQty } : item
        );
    
        // Update or add the item to the addedItems object
        const updatedAddedItems = {
          ...addedItems,
          [title]: {
            title,
            cost,
            qty: updatedQty,
            img:img
          },
        };
    
        return {
          items: updatedItems,
          total_items: prevState.total_items + 1,
          total: prevState.total + cost,
          addedItems: updatedAddedItems,
        };
      });
    };
    



//   remove = (name, cost) => {
//     this.setState((prevState) => ({
        
//       items: prevState.items.map((item) =>
      
//         item.title === name && item.qty > 0 ? { ...item, qty: item.qty - 1 } : item
//       ),
//       total_items: prevState.total_items > 0 ? prevState.total_items - 1 : 0,
//       total: prevState.total > 0 ? prevState.total - cost : 0,
//     }));
//   };
remove = (name, cost, img) => {
    this.setState((prevState) => {
      const { items, total_items, total, addedItems } = prevState;
   
      //alert(total_items)
      // If the item is found and the quantity is greater than 0, decrement the quantity
      const updatedItems = items.map((item) =>
        item.title === name && item.qty > 0 ? { ...item, qty: item.qty - 1 } : item
      );
  
      // Filter out the removed items from the remaining items
      const remainingItems = updatedItems.filter((item) => item.qty > 0);
      // Update or remove the item from the addedItems object
      const updatedAddedItems = { ...addedItems };
      if (updatedAddedItems[name]) {
        if (updatedAddedItems[name].qty > 1) {
          updatedAddedItems[name].qty -= 1;
        } else {
          delete updatedAddedItems[name];
        }
      }
  
      return {
        items: updatedItems,
        total_items: total_items > 0 ? total_items - 1 : total_items,
        total: total > 0 ? total - cost : total,
        addedItems: updatedAddedItems, // Update cartItems with remaining items10
      };
    });
  };
  
  
  

  popup = () => {
    this.setState({
      popup: !this.state.popup,
    });
  };

  thank_popup = () => {
    this.setState({
      thank_popup: !this.state.thank_popup,
    });
  };

  reload = () => {
    window.location.href = window.location.href;
  };
  render() {
    const { items,addedItems } = this.state;

    return (
      <div>
        <div className='navbar'>
          <span className='logo'>
            <img src='https://i.ibb.co/s3t3Gm8/watermelon.png' alt="logo" />
            <h1>Shopping Cart</h1>
          </span>
          <button className="popup_btn"><img src='https://i.ibb.co/BcSC34f/cart.png' />
          {this.state.total_items != 0 ? (<span>{this.state.total_items}</span>):null }</button>
        </div>
        <div className="list-container">
  {items.map((item, id) => (
    <div className='item-container' key={id}>
      <img src={item.thumbnail} alt={item.title} className="img" />
      <h3>{item.title}</h3>
      <b>${(item.price).toFixed(2)}</b>
      <button onClick={() => this.add(item.title, item.price,item.thumbnail)}>Add to Cart</button>
      <button onClick={() => this.remove(item.title, item.price,item.thumbnail)}>Remove</button>
    </div>
  ))}
</div>

        <div className="sidecart">
          {
          this.state.total_items != 0 ? (<div className="popup" >
            <div className="cart">
              <h2>Your Cart</h2>
                {/* {this.state.items.map((item1, id1) => {

                  return(
                    <div key={id1}>
                      {item1.qty != 0 ?
                        (<div key={id1} className="cart_item">
                           <span><h3>{item1.title} ({item1.qty})</h3><h3>${(item1.price * item1.qty).toFixed(2)}</h3></span>
                        </div>): null}
                    </div>
                  );

                })} */}
            <ul>
            {Object.values(addedItems).map((item, index) => (
              <li key={index}>
                {item.title} x {item.qty} - {item.cost * item.qty} <button onClick={() => this.remove(item.title, item.cost,item.img)}>X</button>
              </li>
            ))}
          </ul>


              </div>
            <div>
              <div className="final_price">
                <div className="cart_item">
                  <h3>Items Price:</h3>
                  <h3>${(this.state.total).toFixed(2)}</h3>
                </div>
                <div className="cart_item">
                  <h3>Delivery Charges:</h3>
                  <h3>Free</h3>
                </div>
                <div  className="cart_item">
                  <h3>Packaging:</h3>
                  <h3>${(this.state.packaging).toFixed(2)}</h3>
                </div>
              </div>
              <div className="final_price">
                <h3>Total Price:</h3>
                <h3>${(this.state.total + this.state.packaging).toFixed(2)}</h3>
              </div>
              <button className="order_btn" onClick={() => this.popup()}>order now</button>
            </div>
          </div>) : this.state.total_items != 0?(<div className="popup" ><b>You cart looks empty...</b></div>):''}
        </div>
        <div className="orderpage">

          {
            this.state.popup ?
          (this.state.total_items != 0 ? (<div className="order" >
            <div className="cart">
              <h1>Your Cart</h1>
                <div className="cart_left">
                    {Object.values(addedItems).map((item1, id1) => {

                      return(
                        <div key={id1}>
                        {item1.qty != 0 ?
                          (<div key={id1} className="cart_item">
                             <img src={item1.img} />
                             <span className="cart_info">
                                <h3>{item1.title} x {item1.qty}</h3>
                                <h3>Cost : ${item1.cost}</h3>
                                <h3>Total Cost1 : ${(item1.cost * item1.qty).toFixed(2)}</h3>
                             </span>
                          </div>): null}
                          <button onClick={() => this.remove(item1.title, item1.cost,item1.img)}>X</button>

                        </div>
                        );

                    })}
                  </div>
                </div>
                <div className="cart_right">
                  <div className="final_price">
                        <div className="cart_item">
                          <h3>Items Price:</h3>
                          <h3>${(this.state.total).toFixed(2)}</h3>
                        </div>
                        <div className="cart_item">
                          <h3>Delivery Charges:</h3>
                          <h3>Free</h3>
                        </div>
                        <div  className="cart_item">
                          <h3>Packaging:</h3>
                          <h3>${(this.state.packaging).toFixed(2)}</h3>
                        </div>
                  </div>
                  <div className="final_price">
                    <h3>Total Price:</h3>
                    <h3>${(this.state.total + this.state.packaging).toFixed(2)}</h3>
                  </div>
                
                  <button className="order_btn" onClick={() => this.thank_popup()}>order now</button>
                </div>
          </div>) : null):null}

          {
            this.state.thank_popup ? (<div className="thank_you">
              <h1>thank you</h1>
              <p>We will deliver your package at your doorstep shortly.</p>
              <button className="order_btn" onClick={() => this.reload()}>Go Back to Shopping</button>
            </div>) : null
          }
        </div>        
      </div>
    );

  }
}


export default List;


//ReactDOM.render(<List />, document.getElementById('root10'));