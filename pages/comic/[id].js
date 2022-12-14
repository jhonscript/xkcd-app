import Image from "next/image";
import { Text, Row, Grid, Card, Button } from "@nextui-org/react";
import { readFile, stat, readdir } from "fs/promises";
import { basename } from "path";
import Link from "next/link";
import Layout from "../../components/Layout";

export default function Comic({ comic, hasPrevious, hasNext, prevId, nexId }) {
  return (
    <Layout title={`xkcd - Comic ${comic}`}>
      <Row justify="center">
        <Text h1>{comic.title}</Text>
      </Row>
      <Row>
        <Grid.Container gap={2} justify="center">
          <Image
            width={comic.width}
            height={comic.height}
            src={comic.img}
            alt={comic.alt}
          ></Image>
        </Grid.Container>
      </Row>
      <Row justify="center">
        <Card css={{ mw: "800px" }}>
          <Card.Body>
            <Text>{comic.alt}</Text>
          </Card.Body>
        </Card>
      </Row>
      <Row justify="center">
        <Button.Group>
          {hasPrevious && (
            <Button>
              <Link href={`/comic/${prevId}`}>
                <p style={{ color: "white" }}>Previus</p>
              </Link>
            </Button>
          )}
          {hasNext && (
            <Button>
              <Link href={`/comic/${nexId}`}>
                <p style={{ color: "white" }}>Next</p>
              </Link>
            </Button>
          )}
        </Button.Group>
      </Row>
    </Layout>
  );
}

export async function getStaticPaths({ locales }) {
  const files = await readdir("./comics");
  let paths = [];

  locales.forEach((locale) => {
    paths = paths.concat(
      files.map((file) => {
        const id = basename(file, ".json");
        return { params: { id }, locale };
      })
    );
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { id } = params;

  const idNumber = +id;
  const prevId = idNumber - 1;
  const nexId = idNumber + 1;

  const [prevResult, nexResult] = await Promise.allSettled([
    stat(`./comics/${prevId}.json`),
    stat(`./comics/${nexId}.json`),
  ]);

  const hasPrevious = prevResult.status === "fulfilled";
  const hasNext = nexResult.status === "fulfilled";

  const content = await readFile(`./comics/${id}.json`, "utf-8");
  const { month, link, year, safe_title, day, ...comic } = JSON.parse(content);

  return { props: { comic, hasPrevious, hasNext, prevId, nexId } };
}
