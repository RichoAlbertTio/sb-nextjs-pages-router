import "@/styles/globals.css";
import type { AppProps } from "next/app";
import RootLayout from "@/layout";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  // push, back, query, reload, replace
  // console.log('router =>', router);

  const metaTitle = router.pathname === '/' ? 'home' : router.pathname.replace('/', '');
  return (
    // title tidak wajib diisi, karena tidak sudah di handle di layout/index.tsx
    <RootLayout metaTitle={metaTitle}>
      <Component {...pageProps} />
    </RootLayout>
  );
}
