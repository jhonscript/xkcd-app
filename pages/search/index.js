import Layout from "../../components/Layout";

export default function Search({ query }) {
  return (
    <Layout title={`Resultados para ${query}`}>
      <h1>Resultados para {query}</h1>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { query } = context;
  const { q = "" } = query;
  console.log(q);

  return {
    props: {
      query: q,
    },
  };
}
