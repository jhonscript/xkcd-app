import { Navbar, Text, Input, Card } from "@nextui-org/react";
import { useRouter } from "next/router";
import { useState, useRef } from "react";
import Link from "next/link";

export function Header() {
  const [results, setResults] = useState([]);
  const searchRef = useRef();
  const { locale, locales } = useRouter();

  const getValueSearch = () => searchRef?.current?.value;

  let q;
  const handleChange = () => {
    q = getValueSearch();

    fetch(`/api/search?q=${q}`)
      .then((res) => res.json())
      .then((searchResults) => {
        setResults(searchResults);
      })
      .catch((error) => {
        console.log("ERROR /api/search?q=: ", error);
      });
  };

  const restOfLocales = locales.filter((item) => item !== locale);

  return (
    <header>
      <Navbar isBordered>
        <Navbar.Brand>
          <Text b color="inherit" hideIn="xs">
            XKCD
          </Text>
        </Navbar.Brand>
        <Navbar.Content hideIn="xs">
          <Navbar.Link href="/">Home</Navbar.Link>
          <Navbar.Item>
            <Link href="/" locale={restOfLocales[0]}>
              {restOfLocales[0]}
            </Link>
          </Navbar.Item>
          <Navbar.Item>
            <>
              <Input
                labelPlaceholder="Search"
                bordered
                ref={searchRef}
                placeholder="Search"
                onChange={handleChange}
              />
              {Boolean(results.length) && q != "" && (
                <Card
                  css={{
                    top: "40px",
                    left: "10px",
                    position: "absolute",
                    padding: "5px",
                  }}
                >
                  <Link
                    key="all-results"
                    href={`/search?q=${getValueSearch()}`}
                  >
                    Ver {results.length} resultado
                    {results.length == 1 ? "" : "s"}
                  </Link>
                  {results.map((result) => {
                    return (
                      <Link key={result.id} href={`/comic/${result.id}`}>
                        {result.title}
                      </Link>
                    );
                  })}
                </Card>
              )}
            </>
          </Navbar.Item>
        </Navbar.Content>
      </Navbar>
    </header>
  );
}
