import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const AddInvoice = () => {
  const location = useLocation();
  const { state } = location;
  const { productslist: initialProductsList, prices: initialPrices } = state;

  const [productslist, setProductsList] = useState(initialProductsList || []);
  const [prices, setPrices] = useState(initialPrices || []);

  const navigate=useNavigate();



  const removeItem = (index) => {
    const updatedProductsList = [...productslist];
    const updatedPrices = [...prices];

    updatedProductsList.splice(index, 1);
    updatedPrices.splice(index, 1);

    setProductsList(updatedProductsList);
    setPrices(updatedPrices);
  };

  const backtohome=()=>{
    navigate('/addpos');
  }

  const generatePDF = () => {
    const pdf = new jsPDF();

// Add header
pdf.text('Invoice', 20, 10);

// Convert data to a 2D array for the autotable plugin
const tableData = [
  ['Label', 'Batch', 'Price', 'Qty', 'Total'],
  ...productslist.map(item => [item.label, item.batch, item.sell_price, item.qty, prices[productslist.indexOf(item)]]),
];

// Set the width of the first column based on the longest label
const maxLabelWidth = Math.max(...productslist.map(item => pdf.getStringUnitWidth(item.label) * 4)); // Adjusted the multiplier

// Define column widths manually
const columnWidths = [maxLabelWidth, 30, 30, 30, 40]; // Adjust the widths as needed

// Calculate grand total
const grandTotal = prices.reduce((total, price) => total + price, 0);

// Generate the table
pdf.autoTable({
  head: [tableData[0]],
  body: [...tableData.slice(1), ['', '', '', 'Grand Total:', grandTotal]],
  startY: 20,
  theme: 'grid',
  columnStyles: {
    0: { cellWidth: columnWidths[0] },
    1: { cellWidth: columnWidths[1] },
    2: { cellWidth: columnWidths[2] },
    3: { cellWidth: columnWidths[3] },
    4: { cellWidth: columnWidths[4] },
  },
});

pdf.save('invoice.pdf');

    };

  return (
    <div className="container">
      <h2>AddInvoice Component</h2>
      <button onClick={generatePDF}>Generate PDF</button>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Label</th>
            <th>Batch</th>
            <th>Price</th>
            <th>Qty</th>
            <th>Total</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {productslist.map((item, index) => (
            <tr key={index}>
              <td>{item.label}</td>
              <td>{item.batch}</td>
              <td>{item.sell_price}</td>
              {/* <td>{item.qty}</td> */}
              <td>
              <input
                    type="text"
                    value={item.qty}
                    onChange={(e) => {
                      const updatedProductsList = [...productslist];
                      const updatedPrices = [...prices]; // Make a copy of the prices array
                      const newQty = parseInt(e.target.value, 10);
                      updatedProductsList[index].qty = newQty;
                      // Update the corresponding price in the prices array
                      updatedPrices[index] = newQty * updatedProductsList[index].sell_price;
                      setProductsList(updatedProductsList);
                      setPrices(updatedPrices); // Update the prices array
                    }}
            />
            </td>

              <td>{prices[index]}</td>
              <td>
                <button onClick={() => removeItem(index)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={()=>backtohome()}>Back To Home</button>
    </div>
  );
};

export default AddInvoice;
