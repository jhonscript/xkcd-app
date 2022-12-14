const algoliasearch = require("algoliasearch");

const client = algoliasearch("OLCIJRFOMJ", "bafc5abc7e9ab75b631561996f484606");
const index = client.initIndex("prod_comics");

const CACHE = [];

export const search = async ({ query }) => {
  if (query === "") return { results: [] };
  if (CACHE[query]) return CACHE[query];

  const { hits } = await index.search(query, {
    attributesToRetrieve: ["id", "title", "img", "alt"],
    hitsPerPage: 10,
  });

  CACHE[query] = { results: hits };

  return CACHE[query];
};
