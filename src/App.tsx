import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function Counter () {
  const [step, setStep] = useState(1);

  return (
    <div>
      <h1>Counter</h1>
      <input 
        type="number" 
        value={step} 
        onChange={(e) => {
          setStep(Number(e.target.value))
        }}/>
      <button>+</button> 👉 {step}
      <table>
        <thead>
          <tr>
            <td>time</td>
            <td>step</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1:00</td>
            <td>5</td>
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
