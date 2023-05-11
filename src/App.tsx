import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Container, Grid } from "@mui/material";

type countItemType = {
  time: string;
  step: number;
};

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function Counter () {
  const [step, setStep] = useState(1);
  const [count, setCount] = useState<countItemType[]>([]);

  return (
    <div style={{
      border: "10px solid " + getRandomColor(),
      padding: "20px"
    }}>
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
      <Container>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6} md={4}>
            <Counter></Counter>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Counter></Counter>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Counter></Counter>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Counter></Counter>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default App;
