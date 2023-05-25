import Link from "next/link";
import { useEffect, useState } from "react";

type TopicType = {
  id:number,
  title:string,
  body:string
}

// Link 컴포넌트를 이용하면 캐슁+사용자 경험의 연속성을 유지할 수 있다.
// @ts-ignore
export default function Layout(props) {
  const [topics, setTopics] = useState<TopicType[]>([]);
  useEffect(() => {
    fetch('/api/topics')
      .then(resp => resp.json())
      .then(result => {
        setTopics(result);
      })
  }, []);
 
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
          {topics.map((t) => {
            return ( 
              <li key={t.id}>
                <Link href={`/read/${t.id}`}>{t.title}</Link>
              </li>
            )
          })}
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
