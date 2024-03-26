// Focus input on button click
import { useRef } from "react";

export const Focus = () => {
  const inputRef = useRef(null);

  const clickHandler = () => {
    console.log(inputRef.current);
    inputRef.current.focus();
  };

  return (
    <>
      <input ref={inputRef} type="text" />
      <button onClick={clickHandler}>Focus the input</button>
    </>
  );
};
