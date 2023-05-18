import { configureStore, createSlice } from "@reduxjs/toolkit";
import React, { useState } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
const counterInitialState = {
  value: 10,
};
const counterReducers = {
  UP: (state: any) => {
    state.value = state.value + 1;
  },
};
const counterSlice = createSlice({
  name: "counter",
  initialState: counterInitialState,
  reducers: counterReducers,
});
const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
  },
});
function Counter1() {
  const count = useSelector((state: any) => state.counter.value);
  const dispatch = useDispatch();
  return (
    <div>
      <h1>Counter</h1>
      <button
        onClick={() => {
          dispatch(counterSlice.actions.UP());
        }}
      >
        +
      </button>
      {count}
    </div>
  );
}
function Counter2() {
  const count = useSelector((state: any) => state.counter.value);
  return <div>{count}</div>;
}
function App() {
  return (
    <Provider store={store}>
      <div>
        <Counter1></Counter1>
        <Counter2></Counter2>
      </div>
    </Provider>
  );
}


export default App;