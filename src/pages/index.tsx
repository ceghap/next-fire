import { Loader } from "@/components/Loader";
import Head from "next/head";
import toast from "react-hot-toast";

export default function Home() {
  return (
    <div className="container mx-auto">
      <Head>
        <title>NextJS + Firebase</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className="text-2xl font-bold">NextJS + Firebase</h1>
      <Loader show />
      <button
        onClick={() => toast.success("hello toast!")}
        type="button"
        className="flex items-center justify-center px-3 py-2 border border-transparent text-base font-semibold rounded-md text-white  bg-indigo-600 hover:bg-indigo-500 hover:shadow-lg"
      >
        Toast me
      </button>
    </div>
  );
}
