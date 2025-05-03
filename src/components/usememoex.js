import { useMemo, useState, useEffect } from "react";

const ItemList = ({ items }) => {
  // Memoize the sorted items
  const sortedItems = useMemo(() => {
    return [...items].sort((a, b) => a.name.localeCompare(b.name)); // Alphabetical Order
  }, [items]);

  return (
    <ul>
      {sortedItems.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
};

const UsememoEx = () => {
  const [number, setNumber] = useState(0);
  const [count, setCount] = useState(0);

  const [searchTerm, setSearchTerm] = useState("");

  const [items, setItems] = useState([
    { id: 1, name: "Banana" },
    { id: 2, name: "Apple" },
    { id: 3, name: "Orange" },
  ]);

  const squaredNum = useMemo(() => {
    return squareNum(number);
  }, [number]);

  const onChangeHandler = (e) => {
    setNumber(e.target.value);
  };

  const counterHandler = () => {
    setCount(count + 1);
  };

  const expensiveOperation = useMemo(() => {
    console.log("Creating expensive operation..."); // step-1
    return () => {
      console.log("Performing expensive operation..."); // step-3
      let result = 0;
      for (let i = 0; i < 1000000000; i++) {
        result += i;
      }
      console.log("Expensive operation... Done"); // step-4
      return result;
    };
  }, []);

  useEffect(() => {
    console.log("Executing expensive operation..."); // step-2
    const result = expensiveOperation();
    console.log("Expensive operation result:", result); // step-5
  }, [expensiveOperation]);

  const handleClick = () => {
    setItems([...items, { id: items.length + 1, name: "Grape" }]);
  };

  const filteredItems = useMemo(() => {
    return items
      .filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [items, searchTerm]);

  return (
    <div>
      <div>SquaredNum: {squaredNum}</div>

      <input type="number" value={number} onChange={onChangeHandler} />
      {count}

      <button onClick={counterHandler}>Counter++</button>
      <button onClick={handleClick}>Add Item</button>

      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Conditional rendering: Show filtered items only if searchTerm exists */}
      { searchTerm ? (
        <ul>
          {filteredItems.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      ) : (
        <ItemList items={items} />
      )
      
     }
    </div>
  );

  function squareNum(num) {
    return Math.pow(num, 2);
  }
};

export default UsememoEx;
