import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { 
  Container, Grid, Button, Dialog, DialogTitle, DialogContent, DialogActions
} from "@mui/material";

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
      padding: "20px",
      backgroundColor: getRandomColor(),
      boxShadow: "5px 5px 5px #888888"
    }}>
      <h1>Counter</h1>
      <input 
        type="number" 
        value={step} 
        onChange={(e) => {
          setStep(Number(e.target.value))
        }}/>
      <Button variant="contained">+</Button>
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

function Counter2() {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ border: "10px solid black", padding: "20px" }}>
      <h1>Counter - Dialog</h1>
      <Button variant="contained" onClick={() => {
        setOpen(true);
      }}>Run</Button>

      <Dialog 
        open={open}
        // esc, 다른 배경을 누르면 창이 꺼짐
        onClose={() => {
          setOpen(false)
        }}>
        <DialogTitle>Counter - Dialog</DialogTitle>
        <DialogContent>
          <button>+</button> 👉 0
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsa voluptatibus beatae suscipit laborum expedita optio? Omnis inventore, praesentium voluptatibus optio blanditiis voluptas illum temporibus, labore ratione sequi minus deserunt voluptatum!
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            setOpen(false);
          }}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <Container>
        <Grid container spacing={1}>
        <Grid item xs={12} sm={6} md={4}>
            <Counter2></Counter2>
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
          <Grid item xs={12} sm={6} md={4}>
            <Counter></Counter>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default App;
