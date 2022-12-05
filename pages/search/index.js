export default function Search({ query }) {
  return (
    <>
      <h1>Resultados para {query}</h1>
    </>
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
