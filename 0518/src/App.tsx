import { PayloadAction, configureStore, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";

// 초기 상태 값 정의
const counterInitialState = {
  value: 11,
  step: 2,
  // 통신 상태를 표시하는 값
  loading: false,
};

// action과 state의 값에 따라서 다음 state의 값을 결정하는 reducer 함수
const counterReducers = {
  // UP, STEP은 action
  UP: (state: any) => {
    state.value = state.value + state.step;
  },
  STEP: (state: any, action: PayloadAction<number>) => {
    console.log(action)
    state.step = action.payload;
  },
};

// 서버 통신용 값을 읽을 때 사용하는 thunk
// couter/read는 action.type (액션명)
const counterRead = createAsyncThunk("counter/read", async () => {
  const res = await fetch("http://localhost:9999/counter/");
  const result = await res.json();
  return result;
});

// 서버 통신 비동기 로직 change action
const counterChange = createAsyncThunk(
  "counter/change",
  async (value: number) => {
    const res = await fetch("http://localhost:9999/counter/", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ value }),
    });
    const result = await res.json();
    return result;
  }
);

const counterExtraReducers = (builder: any) => {
  builder
    // 비동기 로직이 미완성 (로딩중)
    .addCase(counterRead.pending, (state: any) => {
      console.log("loading...");
      state.loading = true;
    })
    // @ts-ignore
    // 비동기 로직이 성공적으로 이행됐을 때 
    .addCase(counterRead.fulfilled, (state: any, action) => {
      console.log("loaded", action);
      state.loading = false;
      state.value = action.payload.value;
    })
    // change action 로딩중
    .addCase(counterChange.pending, (state: any) => {
      state.loading = true;
    })
    // change action 성공
    .addCase(
      counterChange.fulfilled,
      (state: any, action: PayloadAction<number>) => {
        state.loading = false;
        // @ts-ignore
        state.value = action.payload.value;
      }
    );
};

// 목적에 맞는 state와 reducer를 그룹핑 한 것이 slice, slice를 정의
const counterSlice = createSlice({
  // action 명: counter
  name: "counter",
  initialState: counterInitialState,
  reducers: counterReducers,
  extraReducers: counterExtraReducers,
});

// slice를 store에 등록(형성)
const store = configureStore({
  reducer: {
    // 여기의 counter 프로퍼티가 rename 되면 
    // selector에서 사용되는 state.couter.XXX 의 couter도 변경되어야함
    counter: counterSlice.reducer,
  },
});

function Counter1() {
  /**
   * 여기서의 state = { value: 10 } XXX
   * state = { counter: { value: 10 } } OOO
   * 
   * state는 global state이다.
   * 따라서 state.counter.value로 접근해야한다.
   * 
   * any는 임시로 에러를 막기위한 명시적으로 지정
   * 혹은 @ts-ignore 주석을 통해 우회
   */
  const count = useSelector((state: any) => state.counter.value);
  const step = useSelector((state: any) => state.counter.step);
  const loading = useSelector((state: any) => state.counter.loading);
  
  const dispatch = useDispatch();

  useEffect(() => {
    // @ts-ignore
    dispatch(counterRead());
  }, []);


  if (loading) return <div>Loading...</div>

  return (
    <div>
      <h1>Counter</h1>
      <input
        type="number"
        value={step}
        onChange={(evt) => {
          const step = Number(evt.target.value);
          dispatch(counterSlice.actions.STEP(step));
        }}
      />
      <button
        onClick={() => {
          // UP을 reducer에게 명령하는 action {type: 'counter/UP', payload: undefined}
          const action = counterSlice.actions.UP();
          // action 값을 store로 전송
          dispatch(action);
          // @ts-ignore
          dispatch(counterChange(count + step));
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
  const loading = useSelector((state: any) => state.counter.loading);

  if (loading) return <div>Loading...</div>
  return <div>{count}</div>;
}

// Provider를 이용하여 store의 영향력 아래에 들어갈 컴포넌트를 지정한다
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