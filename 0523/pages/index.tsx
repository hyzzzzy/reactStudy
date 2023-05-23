import Layout from "@/components/Layout";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>WEB!</title>
      </Head>
      <header>
        <h1><a href="/">WEB</a></h1>
      </header>
      <Layout></Layout>
    </>
  );
}
