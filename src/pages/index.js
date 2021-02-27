import Head from "next/head";

export default function Home() {
  return (
    <div className="container mx-auto">
      <Head>
        <title>NextJS + Firebase</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className="text-2xl font-bold">NextJS + Firebase</h1>
    </div>
  );
}
