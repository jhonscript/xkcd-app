import { Navbar, Text } from "@nextui-org/react";

export function Header() {
  return (
    <header>
      <Navbar isBordered>
        <Navbar.Brand>
          <Text b color="inherit" hideIn="xs">
            XKCD
          </Text>
        </Navbar.Brand>
        <Navbar.Content hideIn="xs">
          <Navbar.Link isActive href="/">
            Home
          </Navbar.Link>
          <Navbar.Link href="/search">Search</Navbar.Link>
        </Navbar.Content>
      </Navbar>
    </header>
  );
}
