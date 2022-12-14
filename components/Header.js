import { Navbar, Text, Input, Link, Card } from "@nextui-org/react";
import { useState, useRef } from "react";

export function Header() {
  const [results, setResults] = useState([]);
  const searchRef = useRef();

  const getValueSearch = () => searchRef?.current?.value;

  var q;
  const handleChange = () => {
    q = getValueSearch();
    console.log(q);
    fetch(`/api/search?q=${q}`)
      .then((res) => res.json())
      .then((searchResults) => {
        console.log(searchResults);
        setResults(searchResults);
      })
      .catch((error) => {
        console.log(error);
      });
  };
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
