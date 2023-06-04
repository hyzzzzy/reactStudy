import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';

/**
 * Atom은 상태(state)의 일부를 나타낸다. 
 * Atoms는 어떤 컴포넌트에서나 읽고 쓸 수 있다. 
 * atom의 값을 읽는 컴포넌트들은 암묵적으로 atom을 구독한다. 
 * 그래서 atom에 어떤 변화가 있으면 그 atom을 구독하는 모든 컴포넌트가 재 렌더링 되는 결과가 발생
 */

const textState = atom({
  key: 'textState', // unique ID (with respect to other atoms/selectors)
  default: '', // default value (aka initial value)
});

/**
 * Selector는 파생된 상태(derived state)의 일부를 나타낸다. 
 * 파생된 상태는 상태의 변화다. 
 * 파생된 상태를 어떤 방법으로든 주어진 상태를 수정하는 순수 함수에 전달된 상태의 결과물로 생각할 수 있다.
 */

const charCountState = selector({
  key: 'charCountState', // unique ID (with respect to other atoms/selectors)
  get: ({get}) => {
    const text = get(textState);

    return text.length;
  },
});

/**
 * 컴포넌트가 atom을 읽고 쓰게 하기 위해서는 useRecoilState() 사용하면 된다.
 */

function TextInput() {
  const [text, setText] = useRecoilState(textState);

  const onChange = (event) => {
    setText(event.target.value);
  };

  return (
    <div>
      <input type="text" value={text} onChange={onChange} />
      <br />
      Echo: {text}
    </div>
  );
}

/**
 * useRecoilValue() 훅을 사용해서 charCountState 값을 읽을 수 있다.
 */
function CharacterCounter() {
  const count = useRecoilValue(charCountState);

  return (
    <div>
      <TextInput />
      Character Count: {count}
    </div>
  );
}

export default function App() {
  return (
    // recoil 상태를 사용하는 컴포넌트는 부모 트리 어딘가에 나타나는 RecoilRoot 가 필요하다. 루트 컴포넌트가 RecoilRoot를 넣기에 가장 좋은 장소
    <RecoilRoot>
      <CharacterCounter />
    </RecoilRoot>
  );
}
