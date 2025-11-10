import { useState, useEffect} from 'react';
import './App.css';

function MyComponent() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8080/hello') // Replace with your backend API URL
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []); // Empty dependency array means this runs once on mount

  return (
    <div>
      {data ? <p>Data: {data.message}</p> : <p>Loading data...</p>}
    </div>
  );
}

function Square() {
  const [value, setValue] = useState(" ");
  return <button className="square" onClick={handleClick} >{value}</button>
  function handleClick() {
    setValue('X');
  }
}
export default function Board() {
  return (
    <>
      <MyComponent/>
      <Square />
      <Square />
      <div>
        <Square />
        <Square />
        <Square />
      </div>
      <div>
        <Square />
        <Square />
        <Square />
      </div>
    </>
  );
}
