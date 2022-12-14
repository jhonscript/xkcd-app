import Link from "next/link";
import Image from "next/image";
import Layout from "../../components/Layout";
import { search } from "services/search.js";

export default function Search({ query, results }) {
  return (
    <Layout title={`Resultados para ${query}`}>
      <h1>
        {results.length} resultados para {query}
      </h1>
      {results.map((result) => {
        return (
          <Link key={result.id} href={`/comic/${result.id}`}>
            <Image
              width={50}
              height={50}
              alt={result.alt}
              src={result.img}
            ></Image>
            <h2>{result.title}</h2>
          </Link>
        );
      })}
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { query } = context;
  const { q = "" } = query;

  const { results } = await search({ query: q });

  console.log(results);
  return {
    props: {
      query: q,
      results,
    },
  };
}
