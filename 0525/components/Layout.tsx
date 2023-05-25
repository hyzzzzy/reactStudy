import Link from "next/link";
// Link 컴포넌트를 이용하면 캐슁+사용자 경험의 연속성을 유지할 수 있다.
// @ts-ignore
export default function Layout(props) {
  return (
    <>
      <header>
        <h1>
          <Link href="/">WEB</Link>
        </h1>
      </header>
      <input type="text" placeholder="search"></input>
      <nav>
        <ol>
          <li>
            <Link href="/read/1">html</Link>
          </li>
          <li>
            <Link href="/read/2">css</Link>
          </li>
        </ol>
      </nav>
      <article>{props.children}</article>
      <ul>
        <li>
          <Link href="/create">Create</Link>
        </li>
        <li>
          <Link href="/update">Update</Link>
        </li>
        <li>
          <Link href="/delete">Delete</Link>
        </li>
      </ul>
    </>
  );
}
