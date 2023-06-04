import { useState } from 'react';
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from 'recoil';

/**
 * Atom은 상태(state)의 일부를 나타낸다. 
 * Atoms는 어떤 컴포넌트에서나 읽고 쓸 수 있다. 
 * atom의 값을 읽는 컴포넌트들은 암묵적으로 atom을 구독한다. 
 * 그래서 atom에 어떤 변화가 있으면 그 atom을 구독하는 모든 컴포넌트가 재 렌더링 되는 결과가 발생
 */
const todoListState = atom({
  key: 'todoListState',
  default: [],
});

/**
 * Selector는 파생된 상태(derived state)의 일부를 나타낸다. 
 * 파생된 상태는 상태의 변화다. 
 * 파생된 상태를 어떤 방법으로든 주어진 상태를 수정하는 순수 함수에 전달된 상태의 결과물로 생각할 수 있다.
 */

const todoListFilterState = atom({
  key: 'todoListFilterState',
  default: 'Show All',
});

const filteredTodoListState = selector({
  /**
   * filteredTodoListState는 내부적으로 2개의 의존성 todoListFilterState와 todoListState을 추적한다. 
   * 그래서 둘 중 하나라도 변하면 filteredTodoListState는 재 실행된다.
   */
  key: 'filteredTodoListState',
  get: ({get}) => {
    const filter = get(todoListFilterState);
    const list = get(todoListState);

    switch (filter) {
      case 'Show Completed':
        return list.filter((item) => item.isComplete);
      case 'Show Uncompleted':
        return list.filter((item) => !item.isComplete);
      default:
        return list;
    }
  },
});

/**
 * 통계를 표시하기 위한 selector
 * todo 항목들의 총개수
 * 완료된 todo 항목들의 총개수
 * 완료되지 않은 todo 항목들의 총개수
 * 완료된 항목의 백분율
 */
const todoListStatsState = selector({
  key: 'todoListStatsState',
  get: ({get}) => {
    const todoList = get(todoListState);
    const totalNum = todoList.length;
    const totalCompletedNum = todoList.filter((item) => item.isComplete).length;
    const totalUncompletedNum = totalNum - totalCompletedNum;
    const percentCompleted = totalNum === 0 ? 0 : totalCompletedNum / totalNum;

    return {
      totalNum,
      totalCompletedNum,
      totalUncompletedNum,
      percentCompleted,
    };
  },
});

/**
 * 컴포넌트가 atom을 읽고 쓰게 하기 위해서는 useRecoilState() 사용하면 된다.
 */



/**
 * useRecoilValue() 훅을 사용해서 selector의 state 값을 읽을 수 있다.
 */

function TodoListStats() {
  const {
    totalNum,
    totalCompletedNum,
    totalUncompletedNum,
    percentCompleted,
  } = useRecoilValue(todoListStatsState);

  const formattedPercentCompleted = Math.round(percentCompleted * 100);

  return (
    <ul>
      <li>Total items: {totalNum}</li>
      <li>Items completed: {totalCompletedNum}</li>
      <li>Items not completed: {totalUncompletedNum}</li>
      <li>Percent completed: {formattedPercentCompleted}</li>
    </ul>
  );
}

function TodoItem({item}) {
  const [todoList, setTodoList] = useRecoilState(todoListState);
  const index = todoList.findIndex((listItem) => listItem === item);

  const editItemText = ({target: {value}}) => {
    const newList = replaceItemAtIndex(todoList, index, {
      ...item,
      text: value,
    });

    setTodoList(newList);
  };

  const toggleItemCompletion = () => {
    const newList = replaceItemAtIndex(todoList, index, {
      ...item,
      isComplete: !item.isComplete,
    });

    setTodoList(newList);
  };

  const deleteItem = () => {
    const newList = removeItemAtIndex(todoList, index);

    setTodoList(newList);
  };

  return (
    <div>
      <input type="text" value={item.text} onChange={editItemText} />
      <input
        type="checkbox"
        checked={item.isComplete}
        onChange={toggleItemCompletion}
      />
      <button onClick={deleteItem}>X</button>
    </div>
  );
}

function replaceItemAtIndex(arr, index, newValue) {
  return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
}

function removeItemAtIndex(arr, index) {
  return [...arr.slice(0, index), ...arr.slice(index + 1)];
}

function TodoItemCreator() {
  const [inputValue, setInputValue] = useState('');
  /**
   * 새로운 todo 아이템을 생성하기 위해 
   * 우리는 todoListState 내용을 업데이트하는 setter 함수에 접근해야 한다. 
   * 우리는 TodoItemCreator 컴포넌트의 setter 함수를 얻기 위해 
   * useSetRecoilState() 훅을 사용할 수 있다.
   */
  const setTodoList = useSetRecoilState(todoListState);

  const addItem = () => {
    setTodoList((oldTodoList) => [
      ...oldTodoList,
      {
        id: getId(),
        text: inputValue,
        isComplete: false,
      },
    ]);
    setInputValue('');
  };

  const onChange = ({target: {value}}) => {
    setInputValue(value);
  };

  return (
    <div>
      <input type="text" value={inputValue} onChange={onChange} />
      <button onClick={addItem}>Add</button>
    </div>
  );
}

// 고유한 Id 생성을 위한 유틸리티
let id = 0;
function getId() {
  return id++;
}

function TodoListFilters() {
  const [filter, setFilter] = useRecoilState(todoListFilterState);

  const updateFilter = ({target: {value}}) => {
    setFilter(value);
  };

  return (
    <>
      Filter:
      <select value={filter} onChange={updateFilter}>
        <option value="Show All">All</option>
        <option value="Show Completed">Completed</option>
        <option value="Show Uncompleted">Uncompleted</option>
      </select>
    </>
  );
}

function TodoList() {
  const todoList = useRecoilValue(filteredTodoListState);

  return (
    <>
      <TodoListStats />
      <TodoListFilters />
      <TodoItemCreator />

      {todoList.map((todoItem) => (
        <TodoItem item={todoItem} key={todoItem.id} />
      ))}
    </>
  );
}

export default function App() {
  return (
    // recoil 상태를 사용하는 컴포넌트는 부모 트리 어딘가에 나타나는 RecoilRoot 가 필요하다. 루트 컴포넌트가 RecoilRoot를 넣기에 가장 좋은 장소
    <RecoilRoot>
      <TodoList />
    </RecoilRoot>
  );
}
