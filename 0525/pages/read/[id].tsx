import Layout from "@/components/Layout";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

/**
 * SSR을 위한 코드
 * 꼭 비동기 함수여야 함
 * return 값은 꼭 객체여야 함
 * 그 return 값을 현재 페이지 컴포넌트의 props 매개변수로 보내주기
 * 
 * 해당 함수는 서버 쪽에만 실행되니 로그를 찍으면 터미널에만 표시됨
 * 
 * context로 router 값을 얻을 수 있음
 * 
 * 서버쪽에서 실행하는 fetch 이니 절대경로를 적어야함
 * 
 * 컴포넌트가 랜더링 되기 전에 서버 쪽에서 처리해야 할 작업은 getServerSideProps 를 구현해서 미리 처리한다.
 */
export const getServerSideProps = async (context) => {
  const resp = await fetch(
    process.env.API_URL + '/api/topics/' + context.query.id
  );
  const result = await resp.json();
  return {
    props: result,
  }
};

export default function Read(props) {
  // const router = useRouter();
  // const [topic, setTopic] = useState(null);
  // const id = router.query.id;
  // console.log(router.query.id);
  // //debugger;
  // useEffect(() => {
  //   if (id !== undefined) {
  //     fetch('/api/topics/' + id)
  //       .then((resp) => resp.json())
  //       .then((result) => {
  //         console.log(result);
  //         setTopic(result);
  //       });
  //   }
  // }, [id]);

  // if (topic === null) {
  //   return <>Loading...</>
  // }

  return (
    <>
      <Head>
        <title>WEB!</title>
      </Head>
      <h2>{props.title}</h2>
      {props.body}
    </>
  );
}
