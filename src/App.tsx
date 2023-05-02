import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';

type CounterProps = {
  title:string,
  initVlaue?:number
}

function Counter({title, initVlaue}:CounterProps) {
  let countState = useState(initVlaue); // 배열 return 
  // 첫번째 원소는 initValue와 같음, 두 번째는 함수
  // state 첫 번째 원소는 읽을 때 쓰고 두 번째 원소는 변경할 때 쓴다
  let [count, setCount] = countState;

  function up() {
    // initValue의 값을 증가
    // 값이 증가되면 컴포넌트가 다시 실행되서 새로운 값이 화면에 표시
    setCount((count === undefined ? 0 : count) + 1)
  }
  
  function down() {
    setCount((count === undefined ? 0 : count) - 1)
  }

  return (
    <div>
      <h1>{title}</h1>
      <button onClick={up}>+</button>
      <button onClick={down}>-</button> {count}
    </div>
  )
}

function App() {
  return (
    <div>
      <Counter title="불면증 카운터" initVlaue={0}/>
    </div>
  );
}

export default App;
