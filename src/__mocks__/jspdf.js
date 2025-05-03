const jsPDF = jest.fn(() => ({
    text: jest.fn(),
    save: jest.fn(),
    autoTable: jest.fn(),
  }));
  
  export default jsPDF;
  