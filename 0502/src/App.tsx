import * as React from 'react';
import { useState } from 'react';
import './index.css';

type counterProps = {
  title: string;
  initValue?: number;
};

function Counter({ title, initValue = 0 }: counterProps) {
  let [value, setValue] = useState(initValue);

  function up() {
    setValue(value + 1);
  }

  function down() {
    setValue(value - 1);
  }

  return (
    <div>
      <h1>{title}</h1>
      <button onClick={up}>+</button> {value}&nbsp;
      <button onClick={down}>-</button>
    </div>
  );
}

function getCurrentTime() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  return `${hours}:${minutes}:${seconds}`;
}

function Counter2() {
  // 1. state가 배열이나 객체일 때는 값을 변경할 때 복제본을 변경한다.
  // 2. for, map을 이용해 목록을 생성할 때 key 값을 재공한다.
  // 3. state가 배열일 때 값이 없다면 추론을 사용할 수 없기 때문에 제네릭을 명시적으로 입력한다.
  const [times, setTimes] = useState<string[]>([]);
  function up() {
    const newTimes = [...times];
    newTimes.push(getCurrentTime());
    setTimes(newTimes);
  }

  return (
    <div>
      <h1>시간 찍기 카운터</h1>
      <button onClick={up}>⏰</button>
      <ol>{times.map((value, index) => {
        return <li key={index}>{value}</li>
      })}</ol>
    </div>
  );
}

function Counter3() {
  // input과 같은 form 태그와 state를 연동해서 react에서 사용하는 방법
  const [count, setCount] = useState<number>(0);
  const [step, setStep] = useState<number>(1);

  return (
    <div>
      <h1>Counter3</h1>
      <input type="number" defaultValue={step} onChange={(event) => {
        setStep(Number(event.target.value))
      }}/>
      <button onClick={() => setCount(count + step)}>+</button>{count}
    </div>
  )
}

export default function App() {
  return (
    <div>
      <Counter title="카운터" initValue={0} />
      <Counter title="불면증 카운터" />
      <Counter2 />
      <Counter3 />
    </div>
  );
}
