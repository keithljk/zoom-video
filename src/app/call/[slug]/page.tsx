import { getData } from "@/data/getToken";
import dynamic from "next/dynamic";
import Script from "next/script";

const Videocall = dynamic<{ slug: string; JWT: string; role: number }>(
  () => import("../../../components/Videocall"),
  { ssr: false }
);

export default async function Page({ params }: { params: { slug: string } }) {
  const hostJwt = await getData(params.slug, 1);
  const jwt = await getData(params.slug, 0);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Videocall slug={params.slug} JWT={hostJwt} role={1} />
      <Videocall slug={params.slug} JWT={jwt} role={0} />
      <Script src="/coi-serviceworker.js" strategy="beforeInteractive" />
    </main>
  );
}
