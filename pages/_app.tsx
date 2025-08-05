import "@/styles/globals.css";
import type { AppProps } from "next/app";
import RootLayout from "@/layout";

export default function App({ Component, pageProps }: AppProps) {
  return (
    // title tidak wajihb diisi, karena tidak sudah di handle di layout/index.tsx
    <RootLayout >
      <Component {...pageProps} />
    </RootLayout>
  );
}
