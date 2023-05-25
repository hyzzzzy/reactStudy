import Layout from "@/components/Layout";
import Head from "next/head";

export default function Home() {
  console.log("Home");
  return (
    <>
      <Head>
        <title>WEB!</title>
      </Head>
      <h2>Welcome</h2>
      Hello, World!
    </>
  );
}
