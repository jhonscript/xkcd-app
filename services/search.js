const algoliasearch = require("algoliasearch");

const APP_ID = process.env.APP_ID;
const API_KEY = process.env.API_KEY;

const client = algoliasearch(APP_ID, API_KEY);
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
