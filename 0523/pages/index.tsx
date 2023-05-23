import Layout from "@/components/Layout";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>WEB!</title>
      </Head>
      <Layout>
        {/* 컴포넌트의 자식이 존재하는 경우는 props.children 이 활성화가 된다. 
        이 값을 이용해서 컨텐츠의 위치를 배치할 수 있다. */}
        <h2>Welcome</h2>
        Hello, World!
      </Layout>
    </>
  );
}
