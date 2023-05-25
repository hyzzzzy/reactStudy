import Layout from "@/components/Layout";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Read() {
  const router = useRouter();
  const [topic, setTopic] = useState(null);
  const id = router.query.id;
  console.log(router.query.id);
  //debugger;
  useEffect(() => {
    if (id !== undefined) {
      fetch('/api/topics/' + id)
        .then((resp) => resp.json())
        .then((result) => {
          console.log(result);
          setTopic(result);
        });
    }
  }, [id]);

  if (topic === null) {
    return <>Loading...</>
  }

  return (
    <>
      <Head>
        <title>WEB!</title>
      </Head>
      <h2>{topic.title}</h2>
      {topic.body}
    </>
  );
}
