import React, { useState } from "react";

type Counter1Props = {
  value: number;
  onChange: (value: number) => void;
};

function Counter1({ value, onChange }: Counter1Props) {
  return (
    <div>
      <h1>Counter</h1>
      {/* 부모 컴포넌트의 상태를 바꾸기 위해서는 
      자식 컴포넌트로 함수를 props로 전달하고, 
      자식 컴포넌트는 적당한 타이밍에 그 함수를 호출한다. 
      호출된 함수가 state를 바꾼다. */}
      <button
        onClick={() => {
          onChange(value + 1);
        }}
      >
        +
      </button>
      {value}
    </div>
  );
}

type Counter2Props = {
  value: number;
};

function Counter2({ value }: Counter2Props) {
  return <div>{value}</div>;
}

function App() {
  const [count, setCount] = useState(10);
  return (
    <div>
      <Counter1
        value={count}
        onChange={(value) => {
          setCount(value + 1);
        }}
      ></Counter1>
      <Counter2 value={count}></Counter2>
    </div>
  );
}

export default App;