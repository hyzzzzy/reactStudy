import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

type countItemType = {
  time: string;
  step: number;
};

function Counter () {
  const [step, setStep] = useState(1);
  const [count, setCount] = useState<countItemType[]>([]);

  return (
    <div>
      <h1>Counter</h1>
      <input 
        type="number" 
        value={step} 
        onChange={(e) => {
          setStep(Number(e.target.value))
        }}/>
      <button onClick={() => {
        const newCountItem: countItemType = { 
          time: new Date().toLocaleTimeString(), 
          step,
        };

        setCount([...count, newCountItem]);
      }}>+</button> 👉 {count.reduce((prev, curr) => {
        return prev + curr.step
      }, 0)}
      <table>
        <thead>
          <tr>
            <td>time</td>
            <td>step</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            {count.map((value, index) => {
              return (
                <tr key={index}>
                  <td>{value.time}</td>
                  <td>{value.step}</td>
                </tr>
                )
            })}
          </tr>
        </tbody>
      </table>
    </div>
  )
}

function App() {
  return (
    <div className="App">
      <Counter></Counter>
    </div>
  );
}

export default App;
