// Increment the count when the button is clicked
import { useState } from "react";

export const Counter = () => {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount((curr) => curr + 1);
  };

  return (
    <>
      <button onClick={handleClick}>Clcked {count} times</button>
    </>
  );
};
