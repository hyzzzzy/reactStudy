import TodoItem from "./TodoItem";
import { useRecoilValue } from 'recoil';
import { filteredTodoListState } from "../recoil/selectors";

export default function TodoList() {
  const todoList = useRecoilValue(filteredTodoListState);

  return (
    <>
      {todoList.map((todoItem) => (
        <TodoItem item={todoItem} key={todoItem.id} />
      ))}
    </>
  );
}
