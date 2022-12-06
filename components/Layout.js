import Head from "next/head";
import { Header } from "../components/Header";
import { Container } from "@nextui-org/react";
import { Footer } from "components/Footer";

export default function Layout({ children, title }) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Comics for developers" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <Container>{children}</Container>
      <Footer />
    </>
  );
}
