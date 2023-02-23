import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Image Artisan</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1 className="text-5xl">
          <span className="uppercase text-teal-800 -tracking-[5px]">Image</span>
          <span className="italic text-teal-500 tracking-wide ml-3">
            artisan
          </span>
        </h1>
      </main>
    </>
  );
}
