import Link from "next/link";
import Image from "next/image";
import { Card, Row, Text, Grid } from "@nextui-org/react";
import Layout from "../components/Layout";

import fs from "fs";

export default function Home({ latestComics }) {
  return (
    <Layout title="xkcd - Comics for developers">
      <Row justify="center">
        <Text
          h1
          size={60}
          css={{
            textGradient: "45deg, $blue600 -20%, $pink600 50%",
          }}
          weight="bold"
        >
          Latest Comics
        </Text>
      </Row>
      <Row>
        <Grid.Container gap={2} justify="center">
          {latestComics.map((comic) => {
            return (
              <Grid key={comic.id}>
                <Text h3>{comic.title}</Text>
                <Link href={`/comic/${comic.id}`}>
                  <Image
                    width={300}
                    height={300}
                    layout="intrinsic"
                    objectFit="contain"
                    src={comic.img}
                    alt={comic.alt}
                  ></Image>
                </Link>
              </Grid>
            );
          })}
        </Grid.Container>
      </Row>
      <Row>
        <Card css={{ $$cardColor: "$colors$primary" }}>
          <Card.Body>
            <Row justify="center" align="center">
              <Text h6 size={15} color="white" css={{ m: 0 }}>
                NextUI gives you the best developer experience with all the
                features you need for building beautiful and modern websites and
                applications.
              </Text>
            </Row>
          </Card.Body>
        </Card>
      </Row>
    </Layout>
  );
}

export async function getStaticProps(context) {
  const files = fs.readdirSync("./comics");
  const lastestComics = files.slice(-8, files.length);

  const promisesReadFiles = lastestComics.map(async (file) => {
    const content = fs.readFileSync(`./comics/${file}`, "utf-8");
    return JSON.parse(content);
  });
  const latestComics = await Promise.all(promisesReadFiles);
  console.log(latestComics);
  return {
    props: { latestComics },
  };
}
