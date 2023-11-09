import {useState} from 'react';

const Counter = () => {
  const [count, setCount] = useState(10);

  const increment = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <h2>{count}</h2>
      <div>
        <button onClick={() => setCount(count - 1)}>-</button>
        <button onClick={increment}>+</button>
      </div>
    </div>
  );
};

export default Counter;
