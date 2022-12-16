import Link from "next/link";
import Image from "next/image";
import Layout from "../../components/Layout";
import { search } from "services/search.js";
import { useI18N } from "context/i18n";

export default function Search({ query, results }) {
  const { translate } = useI18N();
  return (
    <Layout
      title={translate(
        "SEARCH_RESULTS_TITLE",
        { count: results.length },
        results.length,
        query
      )}
    >
      <h1>
        {translate(
          "SEARCH_RESULTS_TITLE",
          { count: results.length },
          results.length,
          query
        )}
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

  return {
    props: {
      query: q,
      results,
    },
  };
}
